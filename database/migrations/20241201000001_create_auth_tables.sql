-- Migration: Create Auth and User Tables
-- Version: 20241201000001
-- Description: Creates user profiles, tokens, sessions, preferences, and activity log tables

BEGIN;

-- =====================================================
-- CREATE TABLES
-- =====================================================

-- 1. User Profiles Table
CREATE TABLE IF NOT EXISTS public.user_profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    full_name VARCHAR(255),
    company_name VARCHAR(255),
    phone VARCHAR(20),
    location JSONB DEFAULT '{}',
    profession VARCHAR(100),
    experience_level VARCHAR(50) DEFAULT 'beginner',
    specialization VARCHAR(100),
    subscription_type VARCHAR(50) DEFAULT 'free',
    subscription_start_date TIMESTAMPTZ,
    subscription_end_date TIMESTAMPTZ,
    language VARCHAR(10) DEFAULT 'tr',
    currency VARCHAR(10) DEFAULT 'TRY',
    timezone VARCHAR(50) DEFAULT 'Europe/Istanbul',
    marketing_consent BOOLEAN DEFAULT FALSE,
    newsletter_consent BOOLEAN DEFAULT FALSE,
    profile_completed BOOLEAN DEFAULT FALSE,
    email_verified BOOLEAN DEFAULT FALSE,
    phone_verified BOOLEAN DEFAULT FALSE,
    onboarding_completed BOOLEAN DEFAULT FALSE,
    last_login_at TIMESTAMPTZ,
    login_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. User Tokens Table
CREATE TABLE IF NOT EXISTS public.user_tokens (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    total_tokens INTEGER DEFAULT 5,
    used_tokens INTEGER DEFAULT 0,
    remaining_tokens INTEGER GENERATED ALWAYS AS (total_tokens - used_tokens) STORED,
    free_tokens_granted INTEGER DEFAULT 5,
    free_tokens_used INTEGER DEFAULT 0,
    total_purchased INTEGER DEFAULT 0,
    total_spent DECIMAL(10,2) DEFAULT 0.00,
    last_purchase_date TIMESTAMPTZ,
    last_purchase_amount INTEGER DEFAULT 0,
    last_purchase_price DECIMAL(10,2) DEFAULT 0.00,
    tokens_used_today INTEGER DEFAULT 0,
    tokens_used_this_month INTEGER DEFAULT 0,
    last_token_usage TIMESTAMPTZ,
    expiry_date TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT positive_tokens CHECK (total_tokens >= 0),
    CONSTRAINT positive_used CHECK (used_tokens >= 0),
    CONSTRAINT used_not_exceed_total CHECK (used_tokens <= total_tokens),
    CONSTRAINT positive_free_used CHECK (free_tokens_used >= 0),
    CONSTRAINT free_used_not_exceed_granted CHECK (free_tokens_used <= free_tokens_granted)
);

-- 3. User Sessions Table
CREATE TABLE IF NOT EXISTS public.user_sessions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    session_token VARCHAR(255) UNIQUE NOT NULL,
    refresh_token VARCHAR(255),
    device_info JSONB DEFAULT '{}',
    ip_address INET,
    user_agent TEXT,
    location_info JSONB DEFAULT '{}',
    is_active BOOLEAN DEFAULT TRUE,
    last_activity TIMESTAMPTZ DEFAULT NOW(),
    expires_at TIMESTAMPTZ NOT NULL,
    logged_out_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. User Preferences Table
CREATE TABLE IF NOT EXISTS public.user_preferences (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    theme VARCHAR(20) DEFAULT 'light',
    dashboard_layout VARCHAR(20) DEFAULT 'default',
    email_notifications BOOLEAN DEFAULT TRUE,
    push_notifications BOOLEAN DEFAULT FALSE,
    sms_notifications BOOLEAN DEFAULT FALSE,
    analysis_completed BOOLEAN DEFAULT TRUE,
    price_alerts BOOLEAN DEFAULT TRUE,
    weather_alerts BOOLEAN DEFAULT TRUE,
    system_updates BOOLEAN DEFAULT TRUE,
    marketing_emails BOOLEAN DEFAULT FALSE,
    default_currency VARCHAR(10) DEFAULT 'TRY',
    default_units VARCHAR(20) DEFAULT 'metric',
    pdf_template VARCHAR(50) DEFAULT 'standard',
    default_location JSONB DEFAULT '{}',
    preferred_crops TEXT[] DEFAULT '{}',
    default_greenhouse_type VARCHAR(50) DEFAULT 'plastic',
    profile_visibility VARCHAR(20) DEFAULT 'private',
    data_sharing_consent BOOLEAN DEFAULT FALSE,
    analytics_consent BOOLEAN DEFAULT TRUE,
    api_access_enabled BOOLEAN DEFAULT FALSE,
    webhook_url VARCHAR(500),
    custom_settings JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. User Activity Log Table
CREATE TABLE IF NOT EXISTS public.user_activity_log (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    activity_type VARCHAR(100) NOT NULL,
    activity_category VARCHAR(50) NOT NULL,
    details JSONB DEFAULT '{}',
    resource_type VARCHAR(100),
    resource_id UUID,
    ip_address INET,
    user_agent TEXT,
    device_info JSONB DEFAULT '{}',
    duration_ms INTEGER,
    success BOOLEAN DEFAULT TRUE,
    error_message TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- CREATE INDEXES
-- =====================================================

-- User Profiles Indexes
CREATE INDEX IF NOT EXISTS idx_user_profiles_subscription_type ON user_profiles(subscription_type);
CREATE INDEX IF NOT EXISTS idx_user_profiles_profession ON user_profiles(profession);
CREATE INDEX IF NOT EXISTS idx_user_profiles_location_city ON user_profiles USING GIN ((location->>'city'));
CREATE INDEX IF NOT EXISTS idx_user_profiles_created_at ON user_profiles(created_at);

-- User Tokens Indexes
CREATE INDEX IF NOT EXISTS idx_user_tokens_user_id ON user_tokens(user_id);
CREATE INDEX IF NOT EXISTS idx_user_tokens_remaining ON user_tokens(remaining_tokens);
CREATE INDEX IF NOT EXISTS idx_user_tokens_last_usage ON user_tokens(last_token_usage);
CREATE UNIQUE INDEX IF NOT EXISTS idx_user_tokens_unique_user ON user_tokens(user_id);

-- User Sessions Indexes
CREATE INDEX IF NOT EXISTS idx_user_sessions_user_id ON user_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_user_sessions_token ON user_sessions(session_token);
CREATE INDEX IF NOT EXISTS idx_user_sessions_active ON user_sessions(is_active, expires_at);
CREATE INDEX IF NOT EXISTS idx_user_sessions_activity ON user_sessions(last_activity);

-- User Preferences Indexes
CREATE INDEX IF NOT EXISTS idx_user_preferences_user_id ON user_preferences(user_id);
CREATE INDEX IF NOT EXISTS idx_user_preferences_theme ON user_preferences(theme);
CREATE UNIQUE INDEX IF NOT EXISTS idx_user_preferences_unique_user ON user_preferences(user_id);

-- User Activity Log Indexes
CREATE INDEX IF NOT EXISTS idx_user_activity_user_id ON user_activity_log(user_id);
CREATE INDEX IF NOT EXISTS idx_user_activity_type ON user_activity_log(activity_type);
CREATE INDEX IF NOT EXISTS idx_user_activity_category ON user_activity_log(activity_category);
CREATE INDEX IF NOT EXISTS idx_user_activity_created_at ON user_activity_log(created_at);
CREATE INDEX IF NOT EXISTS idx_user_activity_resource ON user_activity_log(resource_type, resource_id);

-- =====================================================
-- CREATE FUNCTIONS
-- =====================================================

-- Function to update updated_at column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Function to handle new user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.user_profiles (id, full_name, email_verified)
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
        NEW.email_confirmed_at IS NOT NULL
    );
    
    INSERT INTO public.user_tokens (user_id, free_tokens_granted, total_tokens)
    VALUES (NEW.id, 5, 5);
    
    INSERT INTO public.user_preferences (user_id)
    VALUES (NEW.id);
    
    -- Log user creation activity
    INSERT INTO public.user_activity_log (user_id, activity_type, activity_category, details)
    VALUES (NEW.id, 'signup', 'auth', jsonb_build_object('email', NEW.email));
    
    RETURN NEW;
END;
$$ language plpgsql security definer;

-- Function to update login statistics
CREATE OR REPLACE FUNCTION public.update_user_login_stats(user_uuid UUID)
RETURNS VOID AS $$
BEGIN
    UPDATE public.user_profiles 
    SET 
        last_login_at = NOW(),
        login_count = login_count + 1,
        updated_at = NOW()
    WHERE id = user_uuid;
    
    -- Log login activity
    INSERT INTO public.user_activity_log (user_id, activity_type, activity_category, details)
    VALUES (user_uuid, 'login', 'auth', jsonb_build_object('timestamp', NOW()));
END;
$$ language plpgsql security definer;

-- Function to consume user tokens
CREATE OR REPLACE FUNCTION public.consume_user_token(
    user_uuid UUID, 
    amount INTEGER DEFAULT 1,
    activity_type_param VARCHAR(100) DEFAULT 'token_used',
    resource_type_param VARCHAR(100) DEFAULT NULL,
    resource_id_param UUID DEFAULT NULL
)
RETURNS BOOLEAN AS $$
DECLARE
    current_remaining INTEGER;
BEGIN
    -- Get current remaining tokens
    SELECT remaining_tokens INTO current_remaining 
    FROM public.user_tokens 
    WHERE user_id = user_uuid;
    
    -- Check if user has enough tokens
    IF current_remaining >= amount THEN
        -- Consume tokens
        UPDATE public.user_tokens 
        SET 
            used_tokens = used_tokens + amount,
            last_token_usage = NOW(),
            tokens_used_today = tokens_used_today + amount,
            tokens_used_this_month = tokens_used_this_month + amount,
            updated_at = NOW()
        WHERE user_id = user_uuid;
        
        -- Log token usage activity
        INSERT INTO public.user_activity_log (
            user_id, 
            activity_type, 
            activity_category, 
            details,
            resource_type,
            resource_id
        )
        VALUES (
            user_uuid, 
            activity_type_param, 
            'token', 
            jsonb_build_object(
                'tokens_consumed', amount,
                'remaining_after', current_remaining - amount
            ),
            resource_type_param,
            resource_id_param
        );
        
        RETURN TRUE;
    ELSE
        -- Log failed token usage attempt
        INSERT INTO public.user_activity_log (
            user_id, 
            activity_type, 
            activity_category, 
            details,
            success,
            error_message
        )
        VALUES (
            user_uuid, 
            'token_usage_failed', 
            'token', 
            jsonb_build_object(
                'tokens_requested', amount,
                'tokens_available', current_remaining
            ),
            FALSE,
            'Insufficient tokens'
        );
        
        RETURN FALSE;
    END IF;
END;
$$ language plpgsql security definer;

-- Function to reset daily token usage (to be called by cron)
CREATE OR REPLACE FUNCTION public.reset_daily_token_usage()
RETURNS VOID AS $$
BEGIN
    UPDATE public.user_tokens 
    SET tokens_used_today = 0
    WHERE tokens_used_today > 0;
END;
$$ language plpgsql security definer;

-- Function to reset monthly token usage (to be called by cron)
CREATE OR REPLACE FUNCTION public.reset_monthly_token_usage()
RETURNS VOID AS $$
BEGIN
    UPDATE public.user_tokens 
    SET tokens_used_this_month = 0
    WHERE tokens_used_this_month > 0;
END;
$$ language plpgsql security definer;

-- =====================================================
-- CREATE TRIGGERS
-- =====================================================

-- Trigger to update updated_at on user_profiles
CREATE TRIGGER update_user_profiles_updated_at 
    BEFORE UPDATE ON user_profiles 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Trigger to update updated_at on user_tokens
CREATE TRIGGER update_user_tokens_updated_at 
    BEFORE UPDATE ON user_tokens 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Trigger to update updated_at on user_sessions
CREATE TRIGGER update_user_sessions_updated_at 
    BEFORE UPDATE ON user_sessions 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Trigger to update updated_at on user_preferences
CREATE TRIGGER update_user_preferences_updated_at 
    BEFORE UPDATE ON user_preferences 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Trigger to create profile automatically for new users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- =====================================================
-- ENABLE ROW LEVEL SECURITY
-- =====================================================

ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_tokens ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_activity_log ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- CREATE RLS POLICIES
-- =====================================================

-- User Profiles Policies
CREATE POLICY "Users can view own profile" ON public.user_profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.user_profiles
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.user_profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

-- User Tokens Policies
CREATE POLICY "Users can view own tokens" ON public.user_tokens
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own tokens" ON public.user_tokens
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own tokens" ON public.user_tokens
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- User Sessions Policies
CREATE POLICY "Users can view own sessions" ON public.user_sessions
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own sessions" ON public.user_sessions
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own sessions" ON public.user_sessions
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- User Preferences Policies
CREATE POLICY "Users can view own preferences" ON public.user_preferences
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own preferences" ON public.user_preferences
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own preferences" ON public.user_preferences
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- User Activity Log Policies
CREATE POLICY "Users can view own activity" ON public.user_activity_log
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own activity" ON public.user_activity_log
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Admin Policies
CREATE POLICY "Admins can view all profiles" ON public.user_profiles
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.user_profiles 
            WHERE id = auth.uid() AND subscription_type = 'admin'
        )
    );

-- =====================================================
-- CREATE VIEWS
-- =====================================================

-- User Dashboard Summary View
CREATE OR REPLACE VIEW public.user_dashboard_summary AS
SELECT 
    p.id,
    p.full_name,
    p.company_name,
    p.subscription_type,
    p.profile_completed,
    p.onboarding_completed,
    t.total_tokens,
    t.used_tokens,
    t.remaining_tokens,
    t.last_token_usage,
    p.last_login_at,
    p.login_count,
    p.created_at as user_since
FROM public.user_profiles p
LEFT JOIN public.user_tokens t ON p.id = t.user_id;

-- =====================================================
-- GRANT PERMISSIONS
-- =====================================================

-- Grant necessary permissions to authenticated users
GRANT SELECT ON public.user_dashboard_summary TO authenticated;
GRANT USAGE ON SCHEMA public TO authenticated;

-- Grant execute permissions on functions
GRANT EXECUTE ON FUNCTION public.update_user_login_stats(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION public.consume_user_token(UUID, INTEGER, VARCHAR, VARCHAR, UUID) TO authenticated;

COMMIT;
