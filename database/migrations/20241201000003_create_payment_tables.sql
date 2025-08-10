-- =====================================================
-- PAYMENT & TOKEN TABLES MIGRATION
-- =====================================================
-- Migration: 20241201000003_create_payment_tables
-- Description: Creates payment_methods, payments, token_purchases, and subscriptions tables
-- Author: SeraGPT Development Team
-- Created: 2024-12-01
-- Dependencies: auth tables must exist
-- =====================================================

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- CREATE PAYMENT METHODS TABLE
-- =====================================================

CREATE TABLE payment_methods (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    
    -- Payment method details
    stripe_payment_method_id VARCHAR(255) UNIQUE,
    type VARCHAR(50) NOT NULL CHECK (type IN ('card', 'bank_account', 'wallet')),
    provider VARCHAR(50) NOT NULL DEFAULT 'stripe' CHECK (provider IN ('stripe', 'paypal', 'bank_transfer')),
    
    -- Card details (encrypted/tokenized)
    last_four_digits VARCHAR(4),
    brand VARCHAR(50),
    exp_month INTEGER CHECK (exp_month >= 1 AND exp_month <= 12),
    exp_year INTEGER CHECK (exp_year >= EXTRACT(YEAR FROM CURRENT_DATE)),
    
    -- Status and metadata
    is_default BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    country VARCHAR(2),
    currency VARCHAR(3) DEFAULT 'USD',
    
    -- Billing details
    billing_name VARCHAR(255),
    billing_email VARCHAR(255),
    billing_address JSONB,
    
    -- Security and compliance
    fingerprint VARCHAR(255),
    security_score INTEGER DEFAULT 100 CHECK (security_score >= 0 AND security_score <= 100),
    fraud_score INTEGER DEFAULT 0 CHECK (fraud_score >= 0 AND fraud_score <= 100),
    
    -- Metadata
    metadata JSONB DEFAULT '{}',
    
    -- Timestamps
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    last_used_at TIMESTAMPTZ
);

-- =====================================================
-- CREATE PAYMENTS TABLE
-- =====================================================

CREATE TABLE payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    payment_method_id UUID REFERENCES payment_methods(id) ON DELETE SET NULL,
    
    -- Payment identifiers
    stripe_payment_intent_id VARCHAR(255) UNIQUE,
    stripe_charge_id VARCHAR(255),
    invoice_number VARCHAR(50) UNIQUE,
    
    -- Amount details
    amount_cents INTEGER NOT NULL CHECK (amount_cents > 0),
    currency VARCHAR(3) NOT NULL DEFAULT 'USD',
    amount_usd_cents INTEGER,
    exchange_rate DECIMAL(10, 6),
    
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
    product_type VARCHAR(100),
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
    tracking_id VARCHAR(100),
    referral_code VARCHAR(50),
    
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
-- CREATE TOKEN PURCHASES TABLE
-- =====================================================

CREATE TABLE token_purchases (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    payment_id UUID NOT NULL REFERENCES payments(id) ON DELETE CASCADE,
    
    -- Token details
    token_amount INTEGER NOT NULL CHECK (token_amount > 0),
    bonus_tokens INTEGER DEFAULT 0 CHECK (bonus_tokens >= 0),
    total_tokens INTEGER GENERATED ALWAYS AS (token_amount + bonus_tokens) STORED,
    
    -- Pricing details
    unit_price_cents INTEGER NOT NULL CHECK (unit_price_cents > 0),
    total_price_cents INTEGER NOT NULL CHECK (total_price_cents > 0),
    discount_applied_cents INTEGER DEFAULT 0 CHECK (discount_applied_cents >= 0),
    final_price_cents INTEGER GENERATED ALWAYS AS (total_price_cents - discount_applied_cents) STORED,
    
    -- Package details
    package_type VARCHAR(100),
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
    purchase_source VARCHAR(100),
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
-- CREATE SUBSCRIPTIONS TABLE
-- =====================================================

CREATE TABLE subscriptions (
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
    amount_cents INTEGER NOT NULL CHECK (amount_cents >= 0),
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
    analysis_limit INTEGER DEFAULT -1,
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
    created_via VARCHAR(100) DEFAULT 'dashboard',
    
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
-- CREATE INDEXES
-- =====================================================

-- Payment Methods indexes
CREATE INDEX idx_payment_methods_user_id ON payment_methods(user_id);
CREATE INDEX idx_payment_methods_stripe_id ON payment_methods(stripe_payment_method_id);
CREATE INDEX idx_payment_methods_active ON payment_methods(is_active) WHERE is_active = TRUE;
CREATE INDEX idx_payment_methods_default ON payment_methods(user_id, is_default) WHERE is_default = TRUE;

-- Payments indexes
CREATE INDEX idx_payments_user_id ON payments(user_id);
CREATE INDEX idx_payments_status ON payments(status);
CREATE INDEX idx_payments_type ON payments(payment_type);
CREATE INDEX idx_payments_created_at ON payments(created_at DESC);
CREATE INDEX idx_payments_stripe_intent ON payments(stripe_payment_intent_id);
CREATE INDEX idx_payments_invoice ON payments(invoice_number);
CREATE INDEX idx_payments_amount ON payments(amount_cents);

-- Token Purchases indexes
CREATE INDEX idx_token_purchases_user_id ON token_purchases(user_id);
CREATE INDEX idx_token_purchases_payment_id ON token_purchases(payment_id);
CREATE INDEX idx_token_purchases_allocated ON token_purchases(tokens_allocated);
CREATE INDEX idx_token_purchases_expiry ON token_purchases(tokens_expire_at);
CREATE INDEX idx_token_purchases_package ON token_purchases(package_type);

-- Subscriptions indexes
CREATE INDEX idx_subscriptions_user_id ON subscriptions(user_id);
CREATE INDEX idx_subscriptions_stripe_id ON subscriptions(stripe_subscription_id);
CREATE INDEX idx_subscriptions_status ON subscriptions(status);
CREATE INDEX idx_subscriptions_plan_type ON subscriptions(plan_type);
CREATE INDEX idx_subscriptions_current_period ON subscriptions(current_period_start, current_period_end);
CREATE INDEX idx_subscriptions_billing_date ON subscriptions(next_billing_date);

-- =====================================================
-- ENABLE ROW LEVEL SECURITY
-- =====================================================

ALTER TABLE payment_methods ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE token_purchases ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- CREATE RLS POLICIES
-- =====================================================

-- Payment Methods policies
CREATE POLICY "payment_methods_select_own" ON payment_methods
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "payment_methods_insert_own" ON payment_methods
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "payment_methods_update_own" ON payment_methods
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "payment_methods_delete_own" ON payment_methods
    FOR DELETE USING (auth.uid() = user_id);

-- Admin access to payment methods
CREATE POLICY "payment_methods_admin_all" ON payment_methods
    FOR ALL USING (
        auth.jwt() ->> 'role' = 'service_role' OR
        (auth.uid() IN (
            SELECT id FROM auth.users 
            WHERE raw_user_meta_data ->> 'role' = 'admin'
        ))
    );

-- Payments policies
CREATE POLICY "payments_select_own" ON payments
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "payments_service_role" ON payments
    FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');

-- Admin access to payments
CREATE POLICY "payments_admin_select" ON payments
    FOR SELECT USING (
        auth.uid() IN (
            SELECT id FROM auth.users 
            WHERE raw_user_meta_data ->> 'role' = 'admin'
        )
    );

-- Token Purchases policies
CREATE POLICY "token_purchases_select_own" ON token_purchases
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "token_purchases_service_role" ON token_purchases
    FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');

-- Admin access to token purchases
CREATE POLICY "token_purchases_admin_select" ON token_purchases
    FOR SELECT USING (
        auth.uid() IN (
            SELECT id FROM auth.users 
            WHERE raw_user_meta_data ->> 'role' = 'admin'
        )
    );

-- Subscriptions policies
CREATE POLICY "subscriptions_select_own" ON subscriptions
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "subscriptions_service_role" ON subscriptions
    FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');

-- Admin access to subscriptions
CREATE POLICY "subscriptions_admin_select" ON subscriptions
    FOR SELECT USING (
        auth.uid() IN (
            SELECT id FROM auth.users 
            WHERE raw_user_meta_data ->> 'role' = 'admin'
        )
    );

-- =====================================================
-- CREATE TRIGGERS
-- =====================================================

-- Function to update timestamps
CREATE OR REPLACE FUNCTION update_payment_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply update timestamp triggers
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

-- Function to ensure only one default payment method per user
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

-- Function to auto-generate invoice numbers
CREATE OR REPLACE FUNCTION generate_invoice_number()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.invoice_number IS NULL AND NEW.payment_type = 'token_purchase' THEN
        NEW.invoice_number := 'INV-' || TO_CHAR(NEW.created_at, 'YYYYMMDD') || '-' || UPPER(SUBSTRING(NEW.id::text, 1, 8));
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_generate_invoice_number
    BEFORE INSERT ON payments
    FOR EACH ROW
    EXECUTE FUNCTION generate_invoice_number();

-- =====================================================
-- CREATE UTILITY FUNCTIONS
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

-- Function to allocate tokens from purchase
CREATE OR REPLACE FUNCTION allocate_tokens_from_purchase(p_token_purchase_id UUID)
RETURNS BOOLEAN AS $$
DECLARE
    purchase_record token_purchases;
    current_tokens INTEGER;
BEGIN
    -- Get the token purchase record
    SELECT * INTO purchase_record
    FROM token_purchases
    WHERE id = p_token_purchase_id
    AND tokens_allocated = FALSE;
    
    IF NOT FOUND THEN
        RETURN FALSE;
    END IF;
    
    -- Get current token balance
    SELECT total_tokens INTO current_tokens
    FROM user_tokens
    WHERE user_id = purchase_record.user_id;
    
    -- If no user_tokens record exists, create one
    IF NOT FOUND THEN
        INSERT INTO user_tokens (
            user_id,
            total_tokens,
            total_purchased,
            last_purchase_date,
            last_purchase_amount,
            created_at,
            updated_at
        ) VALUES (
            purchase_record.user_id,
            purchase_record.total_tokens,
            purchase_record.total_tokens,
            NOW(),
            purchase_record.total_tokens,
            NOW(),
            NOW()
        );
    ELSE
        -- Update existing token balance
        UPDATE user_tokens
        SET 
            total_tokens = total_tokens + purchase_record.total_tokens,
            total_purchased = total_purchased + purchase_record.total_tokens,
            last_purchase_date = NOW(),
            last_purchase_amount = purchase_record.total_tokens,
            updated_at = NOW()
        WHERE user_id = purchase_record.user_id;
    END IF;
    
    -- Mark tokens as allocated
    UPDATE token_purchases
    SET 
        tokens_allocated = TRUE,
        allocated_at = NOW(),
        allocation_details = jsonb_build_object(
            'allocated_by', 'system',
            'allocated_at', NOW(),
            'previous_balance', COALESCE(current_tokens, 0),
            'new_balance', COALESCE(current_tokens, 0) + purchase_record.total_tokens
        ),
        updated_at = NOW()
    WHERE id = p_token_purchase_id;
    
    RETURN TRUE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- ADD COMMENTS
-- =====================================================

COMMENT ON TABLE payment_methods IS 'Stores user payment methods with security tokenization';
COMMENT ON TABLE payments IS 'Records all payment transactions with detailed tracking';
COMMENT ON TABLE token_purchases IS 'Links payments to token allocations with usage tracking';
COMMENT ON TABLE subscriptions IS 'Manages recurring subscription plans with feature entitlements';

COMMENT ON COLUMN payments.amount_cents IS 'Payment amount in cents to avoid floating point issues';
COMMENT ON COLUMN payments.net_amount_cents IS 'Automatically calculated net amount after fees';
COMMENT ON COLUMN token_purchases.total_tokens IS 'Automatically calculated sum of token_amount + bonus_tokens';
COMMENT ON COLUMN subscriptions.monthly_token_allowance IS 'Number of tokens included in subscription, -1 means unlimited';

-- =====================================================
-- GRANT PERMISSIONS
-- =====================================================

-- Grant appropriate permissions to authenticated users
GRANT SELECT, INSERT, UPDATE, DELETE ON payment_methods TO authenticated;
GRANT SELECT ON payments TO authenticated;
GRANT SELECT ON token_purchases TO authenticated;
GRANT SELECT ON subscriptions TO authenticated;

-- Service role gets full access
GRANT ALL ON ALL TABLES IN SCHEMA public TO service_role;
GRANT ALL ON ALL FUNCTIONS IN SCHEMA public TO service_role;

-- =====================================================
-- MIGRATION COMPLETE
-- =====================================================

-- Log successful migration
DO $$ 
BEGIN 
    RAISE NOTICE 'Payment & Token tables migration completed successfully at %', NOW();
END $$;
