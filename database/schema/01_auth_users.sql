-- =====================================================
-- SERAGPT AUTH & USER TABLES SCHEMA
-- =====================================================
-- This file contains the database schema for user authentication,
-- profiles, and token management in the SeraGPT application.
-- 
-- Tables created:
-- 1. user_profiles - Extended user information
-- 2. user_tokens - Token balance and usage tracking
-- 3. user_sessions - Active session management
-- 4. user_preferences - User-specific settings
-- =====================================================

-- Enable Row Level Security
ALTER DEFAULT PRIVILEGES REVOKE EXECUTE ON FUNCTIONS FROM PUBLIC;

-- =====================================================
-- 1. USER PROFILES TABLE
-- =====================================================
-- Extends Supabase auth.users with additional profile information
CREATE TABLE IF NOT EXISTS public.user_profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    
    -- Personal Information
    full_name VARCHAR(255),
    company_name VARCHAR(255),
    phone VARCHAR(20),
    
    -- Location Information
    location JSONB DEFAULT '{}', -- {city, district, region, coordinates}
    
    -- Professional Information
    profession VARCHAR(100), -- 'farmer', 'consultant', 'investor', 'student', etc.
    experience_level VARCHAR(50) DEFAULT 'beginner', -- 'beginner', 'intermediate', 'expert'
    specialization VARCHAR(100), -- 'greenhouse', 'hydroponics', 'organic', etc.
    
    -- Subscription Information
    subscription_type VARCHAR(50) DEFAULT 'free', -- 'free', 'premium', 'enterprise'
    subscription_start_date TIMESTAMPTZ,
    subscription_end_date TIMESTAMPTZ,
    
    -- Preferences
    language VARCHAR(10) DEFAULT 'tr', -- 'tr', 'en'
    currency VARCHAR(10) DEFAULT 'TRY', -- 'TRY', 'USD', 'EUR'
    timezone VARCHAR(50) DEFAULT 'Europe/Istanbul',
    
    -- Marketing & Communication
    marketing_consent BOOLEAN DEFAULT FALSE,
    newsletter_consent BOOLEAN DEFAULT FALSE,
    
    -- Profile Completion & Status
    profile_completed BOOLEAN DEFAULT FALSE,
    email_verified BOOLEAN DEFAULT FALSE,
    phone_verified BOOLEAN DEFAULT FALSE,
    
    -- Metadata
    onboarding_completed BOOLEAN DEFAULT FALSE,
    last_login_at TIMESTAMPTZ,
    login_count INTEGER DEFAULT 0,
    
    -- Audit fields
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_user_profiles_subscription_type ON user_profiles(subscription_type);
CREATE INDEX IF NOT EXISTS idx_user_profiles_profession ON user_profiles(profession);
CREATE INDEX IF NOT EXISTS idx_user_profiles_location_city ON user_profiles USING GIN ((location->>'city'));
CREATE INDEX IF NOT EXISTS idx_user_profiles_created_at ON user_profiles(created_at);

-- Add trigger to update updated_at automatically
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_user_profiles_updated_at 
    BEFORE UPDATE ON user_profiles 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- 2. USER TOKENS TABLE
-- =====================================================
-- Tracks user token balance, usage, and purchase history
CREATE TABLE IF NOT EXISTS public.user_tokens (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    
    -- Token Balance
    total_tokens INTEGER DEFAULT 5, -- Total tokens owned
    used_tokens INTEGER DEFAULT 0, -- Tokens consumed
    remaining_tokens INTEGER GENERATED ALWAYS AS (total_tokens - used_tokens) STORED,
    
    -- Free Token Tracking
    free_tokens_granted INTEGER DEFAULT 5, -- Initial free tokens
    free_tokens_used INTEGER DEFAULT 0,
    
    -- Purchase History Summary
    total_purchased INTEGER DEFAULT 0, -- Total tokens ever purchased
    total_spent DECIMAL(10,2) DEFAULT 0.00, -- Total money spent (TRY)
    
    -- Last Purchase Information
    last_purchase_date TIMESTAMPTZ,
    last_purchase_amount INTEGER DEFAULT 0,
    last_purchase_price DECIMAL(10,2) DEFAULT 0.00,
    
    -- Usage Statistics
    tokens_used_today INTEGER DEFAULT 0,
    tokens_used_this_month INTEGER DEFAULT 0,
    last_token_usage TIMESTAMPTZ,
    
    -- Token Expiry (for promotional tokens)
    expiry_date TIMESTAMPTZ,
    
    -- Audit fields
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    -- Constraints
    CONSTRAINT positive_tokens CHECK (total_tokens >= 0),
    CONSTRAINT positive_used CHECK (used_tokens >= 0),
    CONSTRAINT used_not_exceed_total CHECK (used_tokens <= total_tokens),
    CONSTRAINT positive_free_used CHECK (free_tokens_used >= 0),
    CONSTRAINT free_used_not_exceed_granted CHECK (free_tokens_used <= free_tokens_granted)
);

-- Add indexes for token queries
CREATE INDEX IF NOT EXISTS idx_user_tokens_user_id ON user_tokens(user_id);
CREATE INDEX IF NOT EXISTS idx_user_tokens_remaining ON user_tokens(remaining_tokens);
CREATE INDEX IF NOT EXISTS idx_user_tokens_last_usage ON user_tokens(last_token_usage);

-- Add trigger to update updated_at
CREATE TRIGGER update_user_tokens_updated_at 
    BEFORE UPDATE ON user_tokens 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Ensure one record per user
CREATE UNIQUE INDEX IF NOT EXISTS idx_user_tokens_unique_user ON user_tokens(user_id);

-- =====================================================
-- 3. USER SESSIONS TABLE
-- =====================================================
-- Tracks active user sessions and device information
CREATE TABLE IF NOT EXISTS public.user_sessions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    
    -- Session Information
    session_token VARCHAR(255) UNIQUE NOT NULL,
    refresh_token VARCHAR(255),
    
    -- Device & Browser Information
    device_info JSONB DEFAULT '{}', -- {device_type, os, browser, version}
    ip_address INET,
    user_agent TEXT,
    
    -- Location Information
    location_info JSONB DEFAULT '{}', -- {country, city, isp, timezone}
    
    -- Session Status
    is_active BOOLEAN DEFAULT TRUE,
    last_activity TIMESTAMPTZ DEFAULT NOW(),
    
    -- Session Lifecycle
    expires_at TIMESTAMPTZ NOT NULL,
    logged_out_at TIMESTAMPTZ,
    
    -- Audit fields
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add indexes for session management
CREATE INDEX IF NOT EXISTS idx_user_sessions_user_id ON user_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_user_sessions_token ON user_sessions(session_token);
CREATE INDEX IF NOT EXISTS idx_user_sessions_active ON user_sessions(is_active, expires_at);
CREATE INDEX IF NOT EXISTS idx_user_sessions_activity ON user_sessions(last_activity);

-- Add trigger to update updated_at
CREATE TRIGGER update_user_sessions_updated_at 
    BEFORE UPDATE ON user_sessions 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- 4. USER PREFERENCES TABLE
-- =====================================================
-- Stores user-specific application preferences and settings
CREATE TABLE IF NOT EXISTS public.user_preferences (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    
    -- UI Preferences
    theme VARCHAR(20) DEFAULT 'light', -- 'light', 'dark', 'auto'
    dashboard_layout VARCHAR(20) DEFAULT 'default', -- 'default', 'compact', 'detailed'
    
    -- Notification Preferences
    email_notifications BOOLEAN DEFAULT TRUE,
    push_notifications BOOLEAN DEFAULT FALSE,
    sms_notifications BOOLEAN DEFAULT FALSE,
    
    -- Notification Types
    analysis_completed BOOLEAN DEFAULT TRUE,
    price_alerts BOOLEAN DEFAULT TRUE,
    weather_alerts BOOLEAN DEFAULT TRUE,
    system_updates BOOLEAN DEFAULT TRUE,
    marketing_emails BOOLEAN DEFAULT FALSE,
    
    -- Report Preferences
    default_currency VARCHAR(10) DEFAULT 'TRY',
    default_units VARCHAR(20) DEFAULT 'metric', -- 'metric', 'imperial'
    pdf_template VARCHAR(50) DEFAULT 'standard',
    
    -- Analysis Defaults
    default_location JSONB DEFAULT '{}',
    preferred_crops TEXT[] DEFAULT '{}',
    default_greenhouse_type VARCHAR(50) DEFAULT 'plastic',
    
    -- Privacy Preferences
    profile_visibility VARCHAR(20) DEFAULT 'private', -- 'public', 'private', 'contacts'
    data_sharing_consent BOOLEAN DEFAULT FALSE,
    analytics_consent BOOLEAN DEFAULT TRUE,
    
    -- Advanced Settings
    api_access_enabled BOOLEAN DEFAULT FALSE,
    webhook_url VARCHAR(500),
    
    -- Custom Settings (JSON for flexibility)
    custom_settings JSONB DEFAULT '{}',
    
    -- Audit fields
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add indexes for preferences
CREATE INDEX IF NOT EXISTS idx_user_preferences_user_id ON user_preferences(user_id);
CREATE INDEX IF NOT EXISTS idx_user_preferences_theme ON user_preferences(theme);

-- Add trigger to update updated_at
CREATE TRIGGER update_user_preferences_updated_at 
    BEFORE UPDATE ON user_preferences 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Ensure one record per user
CREATE UNIQUE INDEX IF NOT EXISTS idx_user_preferences_unique_user ON user_preferences(user_id);

-- =====================================================
-- 5. USER ACTIVITY LOG TABLE
-- =====================================================
-- Tracks user actions for analytics and audit purposes
CREATE TABLE IF NOT EXISTS public.user_activity_log (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    
    -- Activity Information
    activity_type VARCHAR(100) NOT NULL, -- 'login', 'analysis_created', 'token_used', etc.
    activity_category VARCHAR(50) NOT NULL, -- 'auth', 'analysis', 'payment', 'ui'
    
    -- Activity Details
    details JSONB DEFAULT '{}', -- Flexible data storage for activity specifics
    resource_type VARCHAR(100), -- 'roi_analysis', 'climate_report', etc.
    resource_id UUID, -- ID of the resource being acted upon
    
    -- Context Information
    ip_address INET,
    user_agent TEXT,
    device_info JSONB DEFAULT '{}',
    
    -- Performance Metrics
    duration_ms INTEGER, -- How long the action took
    success BOOLEAN DEFAULT TRUE,
    error_message TEXT,
    
    -- Audit fields
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add indexes for activity log
CREATE INDEX IF NOT EXISTS idx_user_activity_user_id ON user_activity_log(user_id);
CREATE INDEX IF NOT EXISTS idx_user_activity_type ON user_activity_log(activity_type);
CREATE INDEX IF NOT EXISTS idx_user_activity_category ON user_activity_log(activity_category);
CREATE INDEX IF NOT EXISTS idx_user_activity_created_at ON user_activity_log(created_at);
CREATE INDEX IF NOT EXISTS idx_user_activity_resource ON user_activity_log(resource_type, resource_id);

-- =====================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_tokens ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_activity_log ENABLE ROW LEVEL SECURITY;

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

-- Admin Policies (for users with admin role)
CREATE POLICY "Admins can view all profiles" ON public.user_profiles
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.user_profiles 
            WHERE id = auth.uid() AND (
                (custom_settings->>'role') = 'admin' OR 
                subscription_type = 'admin'
            )
        )
    );

-- =====================================================
-- FUNCTIONS FOR USER MANAGEMENT
-- =====================================================

-- Function to create user profile after signup
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
    
    RETURN NEW;
END;
$$ language plpgsql security definer;

-- Trigger to create profile automatically
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update login statistics
CREATE OR REPLACE FUNCTION public.update_user_login_stats(user_uuid UUID)
RETURNS VOID AS $$
BEGIN
    UPDATE public.user_profiles 
    SET 
        last_login_at = NOW(),
        login_count = login_count + 1
    WHERE id = user_uuid;
END;
$$ language plpgsql security definer;

-- Function to consume user tokens
CREATE OR REPLACE FUNCTION public.consume_user_token(user_uuid UUID, amount INTEGER DEFAULT 1)
RETURNS BOOLEAN AS $$
DECLARE
    current_remaining INTEGER;
BEGIN
    SELECT remaining_tokens INTO current_remaining 
    FROM public.user_tokens 
    WHERE user_id = user_uuid;
    
    IF current_remaining >= amount THEN
        UPDATE public.user_tokens 
        SET 
            used_tokens = used_tokens + amount,
            last_token_usage = NOW(),
            tokens_used_today = tokens_used_today + amount,
            tokens_used_this_month = tokens_used_this_month + amount
        WHERE user_id = user_uuid;
        
        RETURN TRUE;
    ELSE
        RETURN FALSE;
    END IF;
END;
$$ language plpgsql security definer;

-- =====================================================
-- INITIAL DATA & VIEWS
-- =====================================================

-- Create a view for user dashboard summary
CREATE OR REPLACE VIEW public.user_dashboard_summary AS
SELECT 
    p.id,
    p.full_name,
    p.company_name,
    p.subscription_type,
    p.profile_completed,
    t.total_tokens,
    t.used_tokens,
    t.remaining_tokens,
    t.last_token_usage,
    p.last_login_at,
    p.created_at as user_since
FROM public.user_profiles p
LEFT JOIN public.user_tokens t ON p.id = t.user_id;

-- Grant necessary permissions
GRANT SELECT ON public.user_dashboard_summary TO authenticated;

-- =====================================================
-- COMMENTS FOR DOCUMENTATION
-- =====================================================

COMMENT ON TABLE public.user_profiles IS 'Extended user profile information beyond Supabase auth.users';
COMMENT ON TABLE public.user_tokens IS 'User token balance and usage tracking for SeraGPT services';
COMMENT ON TABLE public.user_sessions IS 'Active user session management with device tracking';
COMMENT ON TABLE public.user_preferences IS 'User-specific application preferences and settings';
COMMENT ON TABLE public.user_activity_log IS 'Comprehensive user activity tracking for analytics';

COMMENT ON FUNCTION public.handle_new_user() IS 'Automatically creates profile, tokens, and preferences for new users';
COMMENT ON FUNCTION public.consume_user_token(UUID, INTEGER) IS 'Safely consumes user tokens with balance checking';
COMMENT ON FUNCTION public.update_user_login_stats(UUID) IS 'Updates user login statistics and timestamps';
