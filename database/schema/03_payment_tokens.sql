-- =====================================================
-- PAYMENT & TOKEN MANAGEMENT TABLES
-- =====================================================
-- This file contains all payment and token related tables for SeraGPT
-- Tables: payment_methods, payments, token_purchases, subscriptions
-- Author: SeraGPT Development Team
-- Created: 2024-12-01
-- =====================================================

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- PAYMENT METHODS TABLE
-- Stores user payment methods (credit cards, etc.)
-- =====================================================

CREATE TABLE IF NOT EXISTS payment_methods (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    
    -- Payment method details
    stripe_payment_method_id VARCHAR(255) UNIQUE, -- Stripe PM ID
    type VARCHAR(50) NOT NULL CHECK (type IN ('card', 'bank_account', 'wallet')),
    provider VARCHAR(50) NOT NULL DEFAULT 'stripe' CHECK (provider IN ('stripe', 'paypal', 'bank_transfer')),
    
    -- Card details (encrypted/tokenized)
    last_four_digits VARCHAR(4),
    brand VARCHAR(50), -- visa, mastercard, amex, etc.
    exp_month INTEGER CHECK (exp_month >= 1 AND exp_month <= 12),
    exp_year INTEGER CHECK (exp_year >= EXTRACT(YEAR FROM CURRENT_DATE)),
    
    -- Status and metadata
    is_default BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    country VARCHAR(2), -- ISO country code
    currency VARCHAR(3) DEFAULT 'USD', -- ISO currency code
    
    -- Billing details
    billing_name VARCHAR(255),
    billing_email VARCHAR(255),
    billing_address JSONB, -- {street, city, state, postal_code, country}
    
    -- Security and compliance
    fingerprint VARCHAR(255), -- Payment method fingerprint
    security_score INTEGER DEFAULT 100 CHECK (security_score >= 0 AND security_score <= 100),
    fraud_score INTEGER DEFAULT 0 CHECK (fraud_score >= 0 AND fraud_score <= 100),
    
    -- Metadata
    metadata JSONB DEFAULT '{}',
    
    -- Timestamps
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    last_used_at TIMESTAMPTZ,
    
    -- Constraints
    CONSTRAINT unique_default_per_user UNIQUE (user_id, is_default) DEFERRABLE INITIALLY DEFERRED
);

-- =====================================================
-- PAYMENTS TABLE
-- Records all payment transactions
-- =====================================================

CREATE TABLE IF NOT EXISTS payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    payment_method_id UUID REFERENCES payment_methods(id) ON DELETE SET NULL,
    
    -- Payment identifiers
    stripe_payment_intent_id VARCHAR(255) UNIQUE,
    stripe_charge_id VARCHAR(255),
    invoice_number VARCHAR(50) UNIQUE,
    
    -- Amount details
    amount_cents INTEGER NOT NULL CHECK (amount_cents > 0), -- Amount in cents
    currency VARCHAR(3) NOT NULL DEFAULT 'USD',
    amount_usd_cents INTEGER, -- Converted to USD for reporting
    exchange_rate DECIMAL(10, 6), -- Exchange rate used for conversion
    
    -- Fee breakdown
    platform_fee_cents INTEGER DEFAULT 0 CHECK (platform_fee_cents >= 0),
    stripe_fee_cents INTEGER DEFAULT 0 CHECK (stripe_fee_cents >= 0),
    net_amount_cents INTEGER GENERATED ALWAYS AS (amount_cents - platform_fee_cents - stripe_fee_cents) STORED,
    
    -- Payment details
    status VARCHAR(50) NOT NULL DEFAULT 'pending' CHECK (
        status IN ('pending', 'processing', 'succeeded', 'failed', 'canceled', 'refunded', 'partially_refunded')
    ),
    payment_type VARCHAR(50) NOT NULL CHECK (
        payment_type IN ('token_purchase', 'subscription', 'one_time', 'consulting', 'premium_feature')
    ),
    
    -- Product details
    product_type VARCHAR(100), -- 'tokens', 'subscription_pro', 'consultation_hour', etc.
    product_quantity INTEGER DEFAULT 1 CHECK (product_quantity > 0),
    product_metadata JSONB DEFAULT '{}',
    
    -- Payment method details (snapshot)
    payment_method_type VARCHAR(50),
    payment_method_brand VARCHAR(50),
    payment_method_last_four VARCHAR(4),
    
    -- Transaction details
    description TEXT,
    receipt_url VARCHAR(500),
    receipt_email VARCHAR(255),
    
    -- Refund information
    refunded_amount_cents INTEGER DEFAULT 0 CHECK (refunded_amount_cents >= 0),
    refund_reason TEXT,
    refunded_at TIMESTAMPTZ,
    
    -- Risk assessment
    risk_score INTEGER DEFAULT 0 CHECK (risk_score >= 0 AND risk_score <= 100),
    risk_level VARCHAR(20) DEFAULT 'normal' CHECK (risk_level IN ('low', 'normal', 'elevated', 'highest')),
    
    -- Processing details
    processed_at TIMESTAMPTZ,
    failed_at TIMESTAMPTZ,
    failure_code VARCHAR(100),
    failure_message TEXT,
    
    -- Billing details (snapshot)
    billing_details JSONB,
    
    -- Metadata and tracking
    metadata JSONB DEFAULT '{}',
    tracking_id VARCHAR(100), -- For analytics/tracking
    referral_code VARCHAR(50), -- If payment came from referral
    
    -- Timestamps
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    
    -- Constraints
    CONSTRAINT valid_refund_amount CHECK (refunded_amount_cents <= amount_cents),
    CONSTRAINT refund_fields_consistency CHECK (
        (refunded_amount_cents = 0 AND refunded_at IS NULL AND refund_reason IS NULL) OR
        (refunded_amount_cents > 0 AND refunded_at IS NOT NULL)
    )
);

-- =====================================================
-- TOKEN PURCHASES TABLE
-- Links payments to token allocations
-- =====================================================

CREATE TABLE IF NOT EXISTS token_purchases (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    payment_id UUID NOT NULL REFERENCES payments(id) ON DELETE CASCADE,
    
    -- Token details
    token_amount INTEGER NOT NULL CHECK (token_amount > 0),
    bonus_tokens INTEGER DEFAULT 0 CHECK (bonus_tokens >= 0),
    total_tokens INTEGER GENERATED ALWAYS AS (token_amount + bonus_tokens) STORED,
    
    -- Pricing details
    unit_price_cents INTEGER NOT NULL CHECK (unit_price_cents > 0), -- Price per token in cents
    total_price_cents INTEGER NOT NULL CHECK (total_price_cents > 0),
    discount_applied_cents INTEGER DEFAULT 0 CHECK (discount_applied_cents >= 0),
    final_price_cents INTEGER GENERATED ALWAYS AS (total_price_cents - discount_applied_cents) STORED,
    
    -- Package details
    package_type VARCHAR(100), -- 'starter', 'professional', 'enterprise', 'custom'
    package_name VARCHAR(200),
    package_description TEXT,
    
    -- Promotional details
    promo_code VARCHAR(50),
    discount_percentage INTEGER CHECK (discount_percentage >= 0 AND discount_percentage <= 100),
    discount_type VARCHAR(50) CHECK (discount_type IN ('percentage', 'fixed_amount', 'bonus_tokens')),
    
    -- Token allocation
    tokens_allocated BOOLEAN DEFAULT FALSE,
    allocated_at TIMESTAMPTZ,
    allocation_details JSONB DEFAULT '{}',
    
    -- Expiry details
    tokens_expire_at TIMESTAMPTZ,
    expiry_warning_sent BOOLEAN DEFAULT FALSE,
    
    -- Usage tracking
    tokens_used INTEGER DEFAULT 0 CHECK (tokens_used >= 0),
    tokens_remaining INTEGER GENERATED ALWAYS AS (total_tokens - tokens_used) STORED,
    first_token_used_at TIMESTAMPTZ,
    last_token_used_at TIMESTAMPTZ,
    
    -- Metadata
    purchase_source VARCHAR(100), -- 'dashboard', 'api', 'mobile_app', 'onboarding'
    metadata JSONB DEFAULT '{}',
    
    -- Timestamps
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    
    -- Constraints
    CONSTRAINT valid_token_usage CHECK (tokens_used <= total_tokens),
    CONSTRAINT pricing_consistency CHECK (final_price_cents = total_price_cents - discount_applied_cents),
    CONSTRAINT allocation_consistency CHECK (
        (tokens_allocated = FALSE AND allocated_at IS NULL) OR
        (tokens_allocated = TRUE AND allocated_at IS NOT NULL)
    )
);

-- =====================================================
-- SUBSCRIPTIONS TABLE
-- Manages recurring subscription plans
-- =====================================================

CREATE TABLE IF NOT EXISTS subscriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    
    -- Stripe subscription details
    stripe_subscription_id VARCHAR(255) UNIQUE,
    stripe_customer_id VARCHAR(255),
    stripe_product_id VARCHAR(255),
    stripe_price_id VARCHAR(255),
    
    -- Subscription details
    plan_type VARCHAR(100) NOT NULL CHECK (
        plan_type IN ('free', 'starter', 'professional', 'enterprise', 'custom')
    ),
    plan_name VARCHAR(200) NOT NULL,
    plan_description TEXT,
    
    -- Billing details
    billing_interval VARCHAR(20) NOT NULL CHECK (billing_interval IN ('month', 'year', 'week', 'day')),
    billing_interval_count INTEGER NOT NULL DEFAULT 1 CHECK (billing_interval_count > 0),
    amount_cents INTEGER NOT NULL CHECK (amount_cents >= 0), -- 0 for free plans
    currency VARCHAR(3) NOT NULL DEFAULT 'USD',
    
    -- Trial details
    trial_period_days INTEGER DEFAULT 0 CHECK (trial_period_days >= 0),
    trial_start_at TIMESTAMPTZ,
    trial_end_at TIMESTAMPTZ,
    trial_used BOOLEAN DEFAULT FALSE,
    
    -- Subscription lifecycle
    status VARCHAR(50) NOT NULL DEFAULT 'active' CHECK (
        status IN ('trialing', 'active', 'past_due', 'canceled', 'unpaid', 'incomplete', 'incomplete_expired')
    ),
    
    -- Subscription periods
    current_period_start TIMESTAMPTZ NOT NULL,
    current_period_end TIMESTAMPTZ NOT NULL,
    next_billing_date TIMESTAMPTZ,
    
    -- Cancellation details
    cancel_at_period_end BOOLEAN DEFAULT FALSE,
    canceled_at TIMESTAMPTZ,
    cancellation_reason VARCHAR(200),
    cancellation_feedback TEXT,
    
    -- Feature entitlements
    monthly_token_allowance INTEGER DEFAULT 0 CHECK (monthly_token_allowance >= 0),
    analysis_limit INTEGER DEFAULT -1, -- -1 means unlimited
    report_sharing_enabled BOOLEAN DEFAULT TRUE,
    priority_support BOOLEAN DEFAULT FALSE,
    custom_branding BOOLEAN DEFAULT FALSE,
    api_access BOOLEAN DEFAULT FALSE,
    
    -- Usage tracking
    tokens_used_this_period INTEGER DEFAULT 0 CHECK (tokens_used_this_period >= 0),
    analyses_created_this_period INTEGER DEFAULT 0 CHECK (analyses_created_this_period >= 0),
    last_usage_reset_at TIMESTAMPTZ DEFAULT NOW(),
    
    -- Discount and promotions
    discount_percentage INTEGER DEFAULT 0 CHECK (discount_percentage >= 0 AND discount_percentage <= 100),
    discount_end_date TIMESTAMPTZ,
    promo_code VARCHAR(50),
    
    -- Notifications
    renewal_reminder_sent BOOLEAN DEFAULT FALSE,
    payment_failed_notifications_sent INTEGER DEFAULT 0,
    
    -- Metadata and tracking
    metadata JSONB DEFAULT '{}',
    created_via VARCHAR(100) DEFAULT 'dashboard', -- 'dashboard', 'api', 'mobile', 'upgrade'
    
    -- Timestamps
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    started_at TIMESTAMPTZ DEFAULT NOW(),
    ended_at TIMESTAMPTZ,
    
    -- Constraints
    CONSTRAINT valid_subscription_period CHECK (current_period_end > current_period_start),
    CONSTRAINT trial_period_logic CHECK (
        (trial_period_days = 0 AND trial_start_at IS NULL AND trial_end_at IS NULL) OR
        (trial_period_days > 0 AND trial_start_at IS NOT NULL AND trial_end_at IS NOT NULL AND trial_end_at > trial_start_at)
    ),
    CONSTRAINT cancellation_logic CHECK (
        (canceled_at IS NULL AND cancellation_reason IS NULL) OR
        (canceled_at IS NOT NULL)
    ),
    CONSTRAINT usage_limits CHECK (
        tokens_used_this_period <= monthly_token_allowance OR monthly_token_allowance = -1
    )
);

-- =====================================================
-- INDEXES FOR PERFORMANCE
-- =====================================================

-- Payment Methods indexes
CREATE INDEX IF NOT EXISTS idx_payment_methods_user_id ON payment_methods(user_id);
CREATE INDEX IF NOT EXISTS idx_payment_methods_stripe_id ON payment_methods(stripe_payment_method_id);
CREATE INDEX IF NOT EXISTS idx_payment_methods_active ON payment_methods(is_active) WHERE is_active = TRUE;
CREATE INDEX IF NOT EXISTS idx_payment_methods_default ON payment_methods(user_id, is_default) WHERE is_default = TRUE;

-- Payments indexes
CREATE INDEX IF NOT EXISTS idx_payments_user_id ON payments(user_id);
CREATE INDEX IF NOT EXISTS idx_payments_status ON payments(status);
CREATE INDEX IF NOT EXISTS idx_payments_type ON payments(payment_type);
CREATE INDEX IF NOT EXISTS idx_payments_created_at ON payments(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_payments_stripe_intent ON payments(stripe_payment_intent_id);
CREATE INDEX IF NOT EXISTS idx_payments_invoice ON payments(invoice_number);
CREATE INDEX IF NOT EXISTS idx_payments_amount ON payments(amount_cents);

-- Token Purchases indexes
CREATE INDEX IF NOT EXISTS idx_token_purchases_user_id ON token_purchases(user_id);
CREATE INDEX IF NOT EXISTS idx_token_purchases_payment_id ON token_purchases(payment_id);
CREATE INDEX IF NOT EXISTS idx_token_purchases_allocated ON token_purchases(tokens_allocated);
CREATE INDEX IF NOT EXISTS idx_token_purchases_expiry ON token_purchases(tokens_expire_at);
CREATE INDEX IF NOT EXISTS idx_token_purchases_package ON token_purchases(package_type);

-- Subscriptions indexes
CREATE INDEX IF NOT EXISTS idx_subscriptions_user_id ON subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_stripe_id ON subscriptions(stripe_subscription_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_status ON subscriptions(status);
CREATE INDEX IF NOT EXISTS idx_subscriptions_plan_type ON subscriptions(plan_type);
CREATE INDEX IF NOT EXISTS idx_subscriptions_current_period ON subscriptions(current_period_start, current_period_end);
CREATE INDEX IF NOT EXISTS idx_subscriptions_billing_date ON subscriptions(next_billing_date);

-- =====================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE payment_methods ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE token_purchases ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

-- Payment Methods policies
CREATE POLICY "Users can view their own payment methods" ON payment_methods
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own payment methods" ON payment_methods
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own payment methods" ON payment_methods
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own payment methods" ON payment_methods
    FOR DELETE USING (auth.uid() = user_id);

-- Payments policies
CREATE POLICY "Users can view their own payments" ON payments
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Service role can manage all payments" ON payments
    FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');

-- Token Purchases policies
CREATE POLICY "Users can view their own token purchases" ON token_purchases
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Service role can manage all token purchases" ON token_purchases
    FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');

-- Subscriptions policies
CREATE POLICY "Users can view their own subscriptions" ON subscriptions
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Service role can manage all subscriptions" ON subscriptions
    FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');

-- =====================================================
-- TRIGGERS FOR AUTOMATIC UPDATES
-- =====================================================

-- Update timestamps
CREATE OR REPLACE FUNCTION update_payment_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_payment_methods_updated_at
    BEFORE UPDATE ON payment_methods
    FOR EACH ROW
    EXECUTE FUNCTION update_payment_updated_at();

CREATE TRIGGER trigger_payments_updated_at
    BEFORE UPDATE ON payments
    FOR EACH ROW
    EXECUTE FUNCTION update_payment_updated_at();

CREATE TRIGGER trigger_token_purchases_updated_at
    BEFORE UPDATE ON token_purchases
    FOR EACH ROW
    EXECUTE FUNCTION update_payment_updated_at();

CREATE TRIGGER trigger_subscriptions_updated_at
    BEFORE UPDATE ON subscriptions
    FOR EACH ROW
    EXECUTE FUNCTION update_payment_updated_at();

-- Ensure only one default payment method per user
CREATE OR REPLACE FUNCTION ensure_single_default_payment_method()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.is_default = TRUE THEN
        UPDATE payment_methods 
        SET is_default = FALSE 
        WHERE user_id = NEW.user_id 
        AND id != NEW.id 
        AND is_default = TRUE;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_single_default_payment_method
    AFTER INSERT OR UPDATE ON payment_methods
    FOR EACH ROW
    WHEN (NEW.is_default = TRUE)
    EXECUTE FUNCTION ensure_single_default_payment_method();

-- Update token usage when tokens are used
CREATE OR REPLACE FUNCTION update_token_usage()
RETURNS TRIGGER AS $$
BEGIN
    -- Update token purchases when tokens are used
    IF TG_TABLE_NAME = 'user_tokens' AND OLD.total_tokens != NEW.total_tokens THEN
        -- This would be called from a token consumption trigger
        UPDATE token_purchases 
        SET tokens_used = token_amount - (NEW.total_tokens - OLD.total_tokens),
            last_token_used_at = NOW(),
            updated_at = NOW()
        WHERE user_id = NEW.user_id 
        AND tokens_remaining > 0
        ORDER BY created_at ASC
        LIMIT 1;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- UTILITY FUNCTIONS
-- =====================================================

-- Function to get user's active subscription
CREATE OR REPLACE FUNCTION get_user_active_subscription(p_user_id UUID)
RETURNS subscriptions AS $$
DECLARE
    subscription subscriptions;
BEGIN
    SELECT * INTO subscription
    FROM subscriptions
    WHERE user_id = p_user_id
    AND status IN ('active', 'trialing')
    AND current_period_end > NOW()
    ORDER BY current_period_end DESC
    LIMIT 1;
    
    RETURN subscription;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to calculate user's total token balance
CREATE OR REPLACE FUNCTION get_user_token_balance(p_user_id UUID)
RETURNS INTEGER AS $$
DECLARE
    total_balance INTEGER := 0;
BEGIN
    SELECT COALESCE(SUM(tokens_remaining), 0) INTO total_balance
    FROM token_purchases
    WHERE user_id = p_user_id
    AND tokens_allocated = TRUE
    AND (tokens_expire_at IS NULL OR tokens_expire_at > NOW());
    
    RETURN total_balance;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get payment statistics
CREATE OR REPLACE FUNCTION get_payment_stats(p_user_id UUID DEFAULT NULL)
RETURNS TABLE (
    total_payments INTEGER,
    total_amount_cents BIGINT,
    successful_payments INTEGER,
    failed_payments INTEGER,
    total_refunded_cents BIGINT,
    last_payment_date TIMESTAMPTZ
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        COUNT(*)::INTEGER as total_payments,
        COALESCE(SUM(amount_cents), 0)::BIGINT as total_amount_cents,
        COUNT(*) FILTER (WHERE status = 'succeeded')::INTEGER as successful_payments,
        COUNT(*) FILTER (WHERE status = 'failed')::INTEGER as failed_payments,
        COALESCE(SUM(refunded_amount_cents), 0)::BIGINT as total_refunded_cents,
        MAX(created_at) as last_payment_date
    FROM payments
    WHERE (p_user_id IS NULL OR user_id = p_user_id);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- SAMPLE DATA INSERTION (FOR DEVELOPMENT)
-- =====================================================

-- Insert sample subscription plans (commented out for production)
/*
INSERT INTO subscriptions (
    id, user_id, plan_type, plan_name, plan_description, 
    billing_interval, amount_cents, monthly_token_allowance,
    current_period_start, current_period_end, status
) VALUES 
(
    uuid_generate_v4(), 
    '00000000-0000-0000-0000-000000000000', -- Replace with actual user ID
    'free', 
    'Free Plan', 
    'Basic access with limited tokens',
    'month', 
    0, 
    100,
    NOW(), 
    NOW() + INTERVAL '1 month',
    'active'
);
*/

-- =====================================================
-- COMMENTS AND DOCUMENTATION
-- =====================================================

COMMENT ON TABLE payment_methods IS 'Stores user payment methods (credit cards, bank accounts, etc.) with security tokenization';
COMMENT ON TABLE payments IS 'Records all payment transactions with detailed tracking and risk assessment';
COMMENT ON TABLE token_purchases IS 'Links payments to token allocations with detailed usage tracking';
COMMENT ON TABLE subscriptions IS 'Manages recurring subscription plans with feature entitlements';

COMMENT ON COLUMN payments.amount_cents IS 'Payment amount in cents to avoid floating point precision issues';
COMMENT ON COLUMN payments.net_amount_cents IS 'Automatically calculated net amount after fees';
COMMENT ON COLUMN token_purchases.total_tokens IS 'Automatically calculated sum of token_amount + bonus_tokens';
COMMENT ON COLUMN subscriptions.monthly_token_allowance IS 'Number of tokens included in subscription, -1 means unlimited';
