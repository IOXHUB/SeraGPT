-- =====================================================
-- CHAT & COMMUNICATION TABLES MIGRATION
-- =====================================================
-- Migration: 20241201000004_create_chat_tables
-- Description: Creates chat_sessions, chat_messages, ai_usage_logs, chat_templates, and user_notifications tables
-- Author: SeraGPT Development Team
-- Created: 2024-12-01
-- Dependencies: auth tables must exist
-- =====================================================

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- CREATE CHAT SESSIONS TABLE
-- =====================================================

CREATE TABLE chat_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    
    -- Session identification
    session_title VARCHAR(255) NOT NULL DEFAULT 'New Chat',
    session_type VARCHAR(50) NOT NULL DEFAULT 'general' CHECK (
        session_type IN ('general', 'roi_analysis', 'climate_analysis', 'equipment_selection', 'market_analysis', 'layout_planning', 'consultation')
    ),
    
    -- Session context
    analysis_id UUID,
    project_context JSONB DEFAULT '{}',
    
    -- AI model configuration
    ai_model VARCHAR(100) DEFAULT 'gpt-4' CHECK (
        ai_model IN ('gpt-3.5-turbo', 'gpt-4', 'gpt-4-turbo', 'claude-3-sonnet', 'claude-3-opus')
    ),
    temperature DECIMAL(3,2) DEFAULT 0.7 CHECK (temperature >= 0 AND temperature <= 2),
    max_tokens INTEGER DEFAULT 4000 CHECK (max_tokens > 0 AND max_tokens <= 32000),
    
    -- Session state
    status VARCHAR(50) NOT NULL DEFAULT 'active' CHECK (
        status IN ('active', 'completed', 'archived', 'error', 'timeout')
    ),
    is_pinned BOOLEAN DEFAULT FALSE,
    is_starred BOOLEAN DEFAULT FALSE,
    
    -- Usage tracking
    total_messages INTEGER DEFAULT 0 CHECK (total_messages >= 0),
    total_tokens_used INTEGER DEFAULT 0 CHECK (total_tokens_used >= 0),
    total_cost_cents INTEGER DEFAULT 0 CHECK (total_cost_cents >= 0),
    
    -- Performance metrics
    average_response_time_ms INTEGER DEFAULT 0 CHECK (average_response_time_ms >= 0),
    error_count INTEGER DEFAULT 0 CHECK (error_count >= 0),
    
    -- Session lifecycle
    started_at TIMESTAMPTZ DEFAULT NOW(),
    last_activity_at TIMESTAMPTZ DEFAULT NOW(),
    completed_at TIMESTAMPTZ,
    archived_at TIMESTAMPTZ,
    
    -- Sharing and collaboration
    is_shared BOOLEAN DEFAULT FALSE,
    shared_token VARCHAR(100) UNIQUE,
    shared_at TIMESTAMPTZ,
    shared_expires_at TIMESTAMPTZ,
    
    -- Session settings
    auto_archive_after_days INTEGER DEFAULT 30 CHECK (auto_archive_after_days > 0),
    enable_analytics BOOLEAN DEFAULT TRUE,
    language_code VARCHAR(10) DEFAULT 'tr-TR',
    
    -- Metadata
    metadata JSONB DEFAULT '{}',
    tags TEXT[] DEFAULT '{}',
    
    -- Timestamps
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    
    -- Constraints
    CONSTRAINT valid_shared_token CHECK (
        (is_shared = FALSE AND shared_token IS NULL AND shared_at IS NULL) OR
        (is_shared = TRUE AND shared_token IS NOT NULL AND shared_at IS NOT NULL)
    ),
    CONSTRAINT valid_completion CHECK (
        (status != 'completed' AND completed_at IS NULL) OR
        (status = 'completed' AND completed_at IS NOT NULL)
    )
);

-- =====================================================
-- CREATE CHAT MESSAGES TABLE
-- =====================================================

CREATE TABLE chat_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id UUID NOT NULL REFERENCES chat_sessions(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    
    -- Message identification
    message_order INTEGER NOT NULL CHECK (message_order > 0),
    parent_message_id UUID REFERENCES chat_messages(id) ON DELETE SET NULL,
    
    -- Message content
    role VARCHAR(20) NOT NULL CHECK (role IN ('user', 'assistant', 'system', 'function')),
    content TEXT NOT NULL,
    content_type VARCHAR(50) DEFAULT 'text' CHECK (
        content_type IN ('text', 'markdown', 'html', 'code', 'json', 'image', 'file', 'function_call')
    ),
    
    -- AI-specific fields
    ai_model VARCHAR(100),
    prompt_tokens INTEGER DEFAULT 0 CHECK (prompt_tokens >= 0),
    completion_tokens INTEGER DEFAULT 0 CHECK (completion_tokens >= 0),
    total_tokens INTEGER GENERATED ALWAYS AS (prompt_tokens + completion_tokens) STORED,
    
    -- Processing details
    response_time_ms INTEGER DEFAULT 0 CHECK (response_time_ms >= 0),
    cost_cents INTEGER DEFAULT 0 CHECK (cost_cents >= 0),
    
    -- Function calling
    function_name VARCHAR(100),
    function_arguments JSONB,
    function_result JSONB,
    
    -- Message status
    status VARCHAR(50) NOT NULL DEFAULT 'completed' CHECK (
        status IN ('pending', 'processing', 'completed', 'error', 'cancelled')
    ),
    error_message TEXT,
    retry_count INTEGER DEFAULT 0 CHECK (retry_count >= 0),
    
    -- Content analysis
    sentiment_score DECIMAL(4,3) CHECK (sentiment_score >= -1 AND sentiment_score <= 1),
    confidence_score DECIMAL(4,3) CHECK (confidence_score >= 0 AND confidence_score <= 1),
    intent_classification VARCHAR(100),
    
    -- User interaction
    is_edited BOOLEAN DEFAULT FALSE,
    original_content TEXT,
    edit_count INTEGER DEFAULT 0 CHECK (edit_count >= 0),
    
    -- Rating and feedback
    user_rating INTEGER CHECK (user_rating >= 1 AND user_rating <= 5),
    user_feedback TEXT,
    is_helpful BOOLEAN,
    
    -- Visibility and moderation
    is_visible BOOLEAN DEFAULT TRUE,
    is_flagged BOOLEAN DEFAULT FALSE,
    flag_reason VARCHAR(200),
    moderated_at TIMESTAMPTZ,
    moderated_by UUID REFERENCES auth.users(id),
    
    -- Attachments and references
    attachments JSONB DEFAULT '[]',
    references JSONB DEFAULT '[]',
    
    -- Metadata
    metadata JSONB DEFAULT '{}',
    
    -- Timestamps
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    
    -- Constraints
    CONSTRAINT unique_message_order_per_session UNIQUE (session_id, message_order),
    CONSTRAINT no_self_parent CHECK (id != parent_message_id),
    CONSTRAINT valid_ai_fields CHECK (
        (role != 'assistant' AND ai_model IS NULL) OR
        (role = 'assistant' AND ai_model IS NOT NULL)
    ),
    CONSTRAINT valid_function_call CHECK (
        (function_name IS NULL AND function_arguments IS NULL AND function_result IS NULL) OR
        (function_name IS NOT NULL)
    )
);

-- =====================================================
-- CREATE AI USAGE LOGS TABLE
-- =====================================================

CREATE TABLE ai_usage_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    session_id UUID REFERENCES chat_sessions(id) ON DELETE SET NULL,
    message_id UUID REFERENCES chat_messages(id) ON DELETE SET NULL,
    
    -- API call details
    provider VARCHAR(50) NOT NULL CHECK (provider IN ('openai', 'anthropic', 'azure', 'local')),
    model_name VARCHAR(100) NOT NULL,
    endpoint VARCHAR(100) NOT NULL,
    
    -- Request details
    request_id VARCHAR(255),
    prompt_text TEXT,
    prompt_tokens INTEGER NOT NULL CHECK (prompt_tokens >= 0),
    completion_text TEXT,
    completion_tokens INTEGER NOT NULL CHECK (completion_tokens >= 0),
    total_tokens INTEGER GENERATED ALWAYS AS (prompt_tokens + completion_tokens) STORED,
    
    -- Model parameters
    temperature DECIMAL(3,2),
    max_tokens INTEGER,
    top_p DECIMAL(3,2),
    frequency_penalty DECIMAL(3,2),
    presence_penalty DECIMAL(3,2),
    model_parameters JSONB DEFAULT '{}',
    
    -- Performance metrics
    request_start_time TIMESTAMPTZ NOT NULL,
    request_end_time TIMESTAMPTZ NOT NULL,
    response_time_ms INTEGER GENERATED ALWAYS AS (
        EXTRACT(MILLISECONDS FROM (request_end_time - request_start_time))::INTEGER
    ) STORED,
    
    -- Cost tracking
    cost_per_token_input DECIMAL(10,8),
    cost_per_token_output DECIMAL(10,8),
    total_cost_usd DECIMAL(10,6) GENERATED ALWAYS AS (
        prompt_tokens * cost_per_token_input + completion_tokens * cost_per_token_output
    ) STORED,
    total_cost_cents INTEGER GENERATED ALWAYS AS (
        ROUND((prompt_tokens * cost_per_token_input + completion_tokens * cost_per_token_output) * 100)::INTEGER
    ) STORED,
    
    -- Request status
    status VARCHAR(50) NOT NULL DEFAULT 'completed' CHECK (
        status IN ('pending', 'completed', 'error', 'timeout', 'cancelled', 'rate_limited')
    ),
    error_code VARCHAR(100),
    error_message TEXT,
    http_status_code INTEGER,
    
    -- Rate limiting
    rate_limit_requests INTEGER,
    rate_limit_tokens INTEGER,
    rate_limit_reset_at TIMESTAMPTZ,
    
    -- Quality metrics
    finish_reason VARCHAR(50),
    safety_scores JSONB DEFAULT '{}',
    
    -- Usage context
    usage_type VARCHAR(100) NOT NULL CHECK (
        usage_type IN ('chat', 'analysis', 'translation', 'summarization', 'code_generation', 'image_analysis', 'embedding')
    ),
    feature_used VARCHAR(100),
    
    -- Token tracking
    tokens_deducted INTEGER DEFAULT 0 CHECK (tokens_deducted >= 0),
    user_balance_before INTEGER,
    user_balance_after INTEGER,
    
    -- Metadata
    metadata JSONB DEFAULT '{}',
    
    -- Timestamps
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    
    -- Constraints
    CONSTRAINT valid_response_time CHECK (request_end_time >= request_start_time),
    CONSTRAINT valid_token_balance CHECK (
        (user_balance_before IS NULL AND user_balance_after IS NULL) OR
        (user_balance_before IS NOT NULL AND user_balance_after IS NOT NULL AND 
         user_balance_after = user_balance_before - tokens_deducted)
    )
);

-- =====================================================
-- CREATE CHAT TEMPLATES TABLE
-- =====================================================

CREATE TABLE chat_templates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    
    -- Template identification
    name VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(100) NOT NULL CHECK (
        category IN ('roi_analysis', 'climate_analysis', 'equipment_selection', 'market_analysis', 'layout_planning', 'general', 'consultation')
    ),
    
    -- Template content
    system_prompt TEXT NOT NULL,
    user_prompt_template TEXT NOT NULL,
    example_inputs JSONB DEFAULT '[]',
    expected_outputs JSONB DEFAULT '[]',
    
    -- Template configuration
    ai_model VARCHAR(100) DEFAULT 'gpt-4',
    temperature DECIMAL(3,2) DEFAULT 0.7,
    max_tokens INTEGER DEFAULT 4000,
    model_parameters JSONB DEFAULT '{}',
    
    -- Template variables
    variables JSONB DEFAULT '[]',
    required_variables TEXT[] DEFAULT '{}',
    variable_validations JSONB DEFAULT '{}',
    
    -- Usage permissions
    is_public BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    
    -- Template versioning
    version VARCHAR(20) DEFAULT '1.0',
    parent_template_id UUID REFERENCES chat_templates(id) ON DELETE SET NULL,
    is_latest_version BOOLEAN DEFAULT TRUE,
    
    -- Usage statistics
    usage_count INTEGER DEFAULT 0 CHECK (usage_count >= 0),
    success_rate DECIMAL(5,2) DEFAULT 0 CHECK (success_rate >= 0 AND success_rate <= 100),
    average_rating DECIMAL(3,2) CHECK (average_rating >= 1 AND average_rating <= 5),
    
    -- Template metadata
    tags TEXT[] DEFAULT '{}',
    language_code VARCHAR(10) DEFAULT 'tr-TR',
    industry_focus VARCHAR(100),
    complexity_level VARCHAR(20) DEFAULT 'intermediate' CHECK (
        complexity_level IN ('beginner', 'intermediate', 'advanced', 'expert')
    ),
    
    -- Quality assurance
    is_verified BOOLEAN DEFAULT FALSE,
    verified_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    verified_at TIMESTAMPTZ,
    quality_score INTEGER CHECK (quality_score >= 0 AND quality_score <= 100),
    
    -- Metadata
    metadata JSONB DEFAULT '{}',
    
    -- Timestamps
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    
    -- Constraints
    CONSTRAINT no_self_parent_template CHECK (id != parent_template_id),
    CONSTRAINT valid_verification CHECK (
        (is_verified = FALSE AND verified_by IS NULL AND verified_at IS NULL) OR
        (is_verified = TRUE AND verified_by IS NOT NULL AND verified_at IS NOT NULL)
    )
);

-- =====================================================
-- CREATE USER NOTIFICATIONS TABLE
-- =====================================================

CREATE TABLE user_notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    
    -- Notification content
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    notification_type VARCHAR(50) NOT NULL CHECK (
        notification_type IN ('info', 'success', 'warning', 'error', 'chat_message', 'analysis_complete', 'payment_success', 'payment_failed', 'token_expiry', 'subscription_renewal', 'system_maintenance')
    ),
    
    -- Notification priority
    priority VARCHAR(20) DEFAULT 'normal' CHECK (
        priority IN ('low', 'normal', 'high', 'urgent')
    ),
    
    -- Notification channels
    send_email BOOLEAN DEFAULT FALSE,
    send_push BOOLEAN DEFAULT TRUE,
    send_in_app BOOLEAN DEFAULT TRUE,
    send_sms BOOLEAN DEFAULT FALSE,
    
    -- Related entities
    related_entity_type VARCHAR(100),
    related_entity_id UUID,
    
    -- Notification status
    status VARCHAR(50) NOT NULL DEFAULT 'pending' CHECK (
        status IN ('pending', 'sent', 'delivered', 'read', 'dismissed', 'failed')
    ),
    
    -- Delivery tracking
    sent_at TIMESTAMPTZ,
    delivered_at TIMESTAMPTZ,
    read_at TIMESTAMPTZ,
    dismissed_at TIMESTAMPTZ,
    
    -- Email delivery details
    email_sent BOOLEAN DEFAULT FALSE,
    email_delivered BOOLEAN DEFAULT FALSE,
    email_opened BOOLEAN DEFAULT FALSE,
    email_clicked BOOLEAN DEFAULT FALSE,
    
    -- Push notification details
    push_sent BOOLEAN DEFAULT FALSE,
    push_delivered BOOLEAN DEFAULT FALSE,
    push_clicked BOOLEAN DEFAULT FALSE,
    
    -- Actions and buttons
    action_buttons JSONB DEFAULT '[]',
    primary_action_url VARCHAR(500),
    primary_action_text VARCHAR(100),
    
    -- Scheduling
    scheduled_for TIMESTAMPTZ,
    expires_at TIMESTAMPTZ,
    
    -- Grouping and batching
    group_key VARCHAR(255),
    batch_id UUID,
    
    -- Template information
    template_id VARCHAR(100),
    template_variables JSONB DEFAULT '{}',
    
    -- User preferences override
    respect_user_preferences BOOLEAN DEFAULT TRUE,
    force_send BOOLEAN DEFAULT FALSE,
    
    -- Retry logic
    retry_count INTEGER DEFAULT 0 CHECK (retry_count >= 0),
    max_retries INTEGER DEFAULT 3 CHECK (max_retries >= 0),
    next_retry_at TIMESTAMPTZ,
    
    -- Metadata
    metadata JSONB DEFAULT '{}',
    
    -- Timestamps
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    
    -- Constraints
    CONSTRAINT valid_delivery_sequence CHECK (
        (sent_at IS NULL OR delivered_at IS NULL OR sent_at <= delivered_at) AND
        (delivered_at IS NULL OR read_at IS NULL OR delivered_at <= read_at)
    ),
    CONSTRAINT valid_scheduling CHECK (
        scheduled_for IS NULL OR scheduled_for >= created_at
    ),
    CONSTRAINT valid_expiry CHECK (
        expires_at IS NULL OR expires_at > created_at
    )
);

-- =====================================================
-- CREATE INDEXES
-- =====================================================

-- Chat Sessions indexes
CREATE INDEX idx_chat_sessions_user_id ON chat_sessions(user_id);
CREATE INDEX idx_chat_sessions_status ON chat_sessions(status);
CREATE INDEX idx_chat_sessions_type ON chat_sessions(session_type);
CREATE INDEX idx_chat_sessions_last_activity ON chat_sessions(last_activity_at DESC);
CREATE INDEX idx_chat_sessions_analysis_id ON chat_sessions(analysis_id) WHERE analysis_id IS NOT NULL;
CREATE INDEX idx_chat_sessions_shared ON chat_sessions(shared_token) WHERE is_shared = TRUE;
CREATE INDEX idx_chat_sessions_tags ON chat_sessions USING GIN(tags);

-- Chat Messages indexes
CREATE INDEX idx_chat_messages_session_id ON chat_messages(session_id);
CREATE INDEX idx_chat_messages_user_id ON chat_messages(user_id);
CREATE INDEX idx_chat_messages_order ON chat_messages(session_id, message_order);
CREATE INDEX idx_chat_messages_role ON chat_messages(role);
CREATE INDEX idx_chat_messages_created_at ON chat_messages(created_at DESC);
CREATE INDEX idx_chat_messages_parent ON chat_messages(parent_message_id) WHERE parent_message_id IS NOT NULL;

-- AI Usage Logs indexes
CREATE INDEX idx_ai_usage_logs_user_id ON ai_usage_logs(user_id);
CREATE INDEX idx_ai_usage_logs_session_id ON ai_usage_logs(session_id);
CREATE INDEX idx_ai_usage_logs_provider_model ON ai_usage_logs(provider, model_name);
CREATE INDEX idx_ai_usage_logs_created_at ON ai_usage_logs(created_at DESC);
CREATE INDEX idx_ai_usage_logs_cost ON ai_usage_logs(total_cost_cents DESC);
CREATE INDEX idx_ai_usage_logs_tokens ON ai_usage_logs(total_tokens DESC);
CREATE INDEX idx_ai_usage_logs_usage_type ON ai_usage_logs(usage_type);

-- Chat Templates indexes
CREATE INDEX idx_chat_templates_category ON chat_templates(category);
CREATE INDEX idx_chat_templates_active ON chat_templates(is_active) WHERE is_active = TRUE;
CREATE INDEX idx_chat_templates_public ON chat_templates(is_public) WHERE is_public = TRUE;
CREATE INDEX idx_chat_templates_created_by ON chat_templates(created_by);
CREATE INDEX idx_chat_templates_usage_count ON chat_templates(usage_count DESC);
CREATE INDEX idx_chat_templates_tags ON chat_templates USING GIN(tags);

-- User Notifications indexes
CREATE INDEX idx_user_notifications_user_id ON user_notifications(user_id);
CREATE INDEX idx_user_notifications_status ON user_notifications(status);
CREATE INDEX idx_user_notifications_type ON user_notifications(notification_type);
CREATE INDEX idx_user_notifications_priority ON user_notifications(priority);
CREATE INDEX idx_user_notifications_created_at ON user_notifications(created_at DESC);
CREATE INDEX idx_user_notifications_scheduled ON user_notifications(scheduled_for) WHERE scheduled_for IS NOT NULL;
CREATE INDEX idx_user_notifications_group ON user_notifications(group_key) WHERE group_key IS NOT NULL;

-- =====================================================
-- ENABLE ROW LEVEL SECURITY
-- =====================================================

ALTER TABLE chat_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_usage_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_notifications ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- CREATE RLS POLICIES
-- =====================================================

-- Chat Sessions policies
CREATE POLICY "chat_sessions_select_own" ON chat_sessions
    FOR SELECT USING (
        auth.uid() = user_id OR 
        (is_shared = TRUE AND shared_expires_at > NOW())
    );

CREATE POLICY "chat_sessions_insert_own" ON chat_sessions
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "chat_sessions_update_own" ON chat_sessions
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "chat_sessions_delete_own" ON chat_sessions
    FOR DELETE USING (auth.uid() = user_id);

-- Chat Messages policies
CREATE POLICY "chat_messages_select_own" ON chat_messages
    FOR SELECT USING (
        auth.uid() = user_id OR 
        EXISTS (
            SELECT 1 FROM chat_sessions cs 
            WHERE cs.id = chat_messages.session_id 
            AND (cs.user_id = auth.uid() OR (cs.is_shared = TRUE AND cs.shared_expires_at > NOW()))
        )
    );

CREATE POLICY "chat_messages_insert_own" ON chat_messages
    FOR INSERT WITH CHECK (
        auth.uid() = user_id AND
        EXISTS (SELECT 1 FROM chat_sessions WHERE id = session_id AND user_id = auth.uid())
    );

CREATE POLICY "chat_messages_update_own" ON chat_messages
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "chat_messages_delete_own" ON chat_messages
    FOR DELETE USING (auth.uid() = user_id);

-- AI Usage Logs policies
CREATE POLICY "ai_usage_logs_select_own" ON ai_usage_logs
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "ai_usage_logs_service_role" ON ai_usage_logs
    FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');

-- Chat Templates policies
CREATE POLICY "chat_templates_select_public_or_own" ON chat_templates
    FOR SELECT USING (
        is_public = TRUE OR 
        created_by = auth.uid() OR
        auth.jwt() ->> 'role' = 'service_role'
    );

CREATE POLICY "chat_templates_insert_authenticated" ON chat_templates
    FOR INSERT WITH CHECK (auth.uid() = created_by);

CREATE POLICY "chat_templates_update_own" ON chat_templates
    FOR UPDATE USING (created_by = auth.uid());

CREATE POLICY "chat_templates_delete_own" ON chat_templates
    FOR DELETE USING (created_by = auth.uid());

-- User Notifications policies
CREATE POLICY "user_notifications_select_own" ON user_notifications
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "user_notifications_update_own" ON user_notifications
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "user_notifications_service_role" ON user_notifications
    FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');

-- Admin access policies
CREATE POLICY "chat_sessions_admin_all" ON chat_sessions
    FOR ALL USING (
        auth.uid() IN (
            SELECT id FROM auth.users 
            WHERE raw_user_meta_data ->> 'role' = 'admin'
        )
    );

CREATE POLICY "chat_messages_admin_all" ON chat_messages
    FOR ALL USING (
        auth.uid() IN (
            SELECT id FROM auth.users 
            WHERE raw_user_meta_data ->> 'role' = 'admin'
        )
    );

CREATE POLICY "ai_usage_logs_admin_select" ON ai_usage_logs
    FOR SELECT USING (
        auth.uid() IN (
            SELECT id FROM auth.users 
            WHERE raw_user_meta_data ->> 'role' = 'admin'
        )
    );

-- =====================================================
-- CREATE TRIGGERS
-- =====================================================

-- Update timestamps function
CREATE OR REPLACE FUNCTION update_chat_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply timestamp triggers
CREATE TRIGGER trigger_chat_sessions_updated_at
    BEFORE UPDATE ON chat_sessions
    FOR EACH ROW
    EXECUTE FUNCTION update_chat_updated_at();

CREATE TRIGGER trigger_chat_messages_updated_at
    BEFORE UPDATE ON chat_messages
    FOR EACH ROW
    EXECUTE FUNCTION update_chat_updated_at();

CREATE TRIGGER trigger_chat_templates_updated_at
    BEFORE UPDATE ON chat_templates
    FOR EACH ROW
    EXECUTE FUNCTION update_chat_updated_at();

CREATE TRIGGER trigger_user_notifications_updated_at
    BEFORE UPDATE ON user_notifications
    FOR EACH ROW
    EXECUTE FUNCTION update_chat_updated_at();

-- Update session statistics when messages are added/removed
CREATE OR REPLACE FUNCTION update_session_stats()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE chat_sessions 
        SET 
            total_messages = total_messages + 1,
            total_tokens_used = total_tokens_used + COALESCE(NEW.total_tokens, 0),
            total_cost_cents = total_cost_cents + COALESCE(NEW.cost_cents, 0),
            last_activity_at = NOW(),
            updated_at = NOW()
        WHERE id = NEW.session_id;
        
        RETURN NEW;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE chat_sessions 
        SET 
            total_messages = GREATEST(0, total_messages - 1),
            total_tokens_used = GREATEST(0, total_tokens_used - COALESCE(OLD.total_tokens, 0)),
            total_cost_cents = GREATEST(0, total_cost_cents - COALESCE(OLD.cost_cents, 0)),
            updated_at = NOW()
        WHERE id = OLD.session_id;
        
        RETURN OLD;
    END IF;
    
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_session_stats
    AFTER INSERT OR DELETE ON chat_messages
    FOR EACH ROW
    EXECUTE FUNCTION update_session_stats();

-- Auto-generate shared tokens for public sessions
CREATE OR REPLACE FUNCTION generate_shared_token()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.is_shared = TRUE AND NEW.shared_token IS NULL THEN
        NEW.shared_token := 'share_' || encode(gen_random_bytes(16), 'hex');
        NEW.shared_at := NOW();
        IF NEW.shared_expires_at IS NULL THEN
            NEW.shared_expires_at := NOW() + INTERVAL '7 days';
        END IF;
    ELSIF NEW.is_shared = FALSE THEN
        NEW.shared_token := NULL;
        NEW.shared_at := NULL;
        NEW.shared_expires_at := NULL;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_generate_shared_token
    BEFORE INSERT OR UPDATE ON chat_sessions
    FOR EACH ROW
    EXECUTE FUNCTION generate_shared_token();

-- =====================================================
-- CREATE UTILITY FUNCTIONS
-- =====================================================

-- Function to get user's chat statistics
CREATE OR REPLACE FUNCTION get_user_chat_stats(p_user_id UUID)
RETURNS TABLE (
    total_sessions INTEGER,
    total_messages INTEGER,
    total_tokens_used INTEGER,
    total_cost_cents INTEGER,
    active_sessions INTEGER,
    average_session_length DECIMAL,
    most_used_model VARCHAR,
    last_chat_date TIMESTAMPTZ
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        COUNT(DISTINCT cs.id)::INTEGER as total_sessions,
        COALESCE(SUM(cs.total_messages), 0)::INTEGER as total_messages,
        COALESCE(SUM(cs.total_tokens_used), 0)::INTEGER as total_tokens_used,
        COALESCE(SUM(cs.total_cost_cents), 0)::INTEGER as total_cost_cents,
        COUNT(DISTINCT cs.id) FILTER (WHERE cs.status = 'active')::INTEGER as active_sessions,
        COALESCE(AVG(cs.total_messages), 0) as average_session_length,
        (SELECT ai_model FROM chat_sessions WHERE user_id = p_user_id GROUP BY ai_model ORDER BY COUNT(*) DESC LIMIT 1) as most_used_model,
        MAX(cs.last_activity_at) as last_chat_date
    FROM chat_sessions cs
    WHERE cs.user_id = p_user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get AI usage statistics
CREATE OR REPLACE FUNCTION get_ai_usage_stats(p_user_id UUID, p_days INTEGER DEFAULT 30)
RETURNS TABLE (
    total_requests INTEGER,
    total_tokens INTEGER,
    total_cost_cents INTEGER,
    average_response_time DECIMAL,
    success_rate DECIMAL,
    most_used_model VARCHAR,
    daily_usage JSONB
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        COUNT(*)::INTEGER as total_requests,
        COALESCE(SUM(total_tokens), 0)::INTEGER as total_tokens,
        COALESCE(SUM(total_cost_cents), 0)::INTEGER as total_cost_cents,
        COALESCE(AVG(response_time_ms), 0) as average_response_time,
        ROUND((COUNT(*) FILTER (WHERE status = 'completed')::DECIMAL / NULLIF(COUNT(*), 0)) * 100, 2) as success_rate,
        (SELECT model_name FROM ai_usage_logs WHERE user_id = p_user_id GROUP BY model_name ORDER BY COUNT(*) DESC LIMIT 1) as most_used_model,
        (
            SELECT jsonb_object_agg(
                date_trunc('day', created_at)::date,
                jsonb_build_object(
                    'requests', COUNT(*),
                    'tokens', SUM(total_tokens),
                    'cost_cents', SUM(total_cost_cents)
                )
            )
            FROM ai_usage_logs 
            WHERE user_id = p_user_id 
            AND created_at >= NOW() - (p_days || ' days')::INTERVAL
            GROUP BY date_trunc('day', created_at)
        ) as daily_usage
    FROM ai_usage_logs
    WHERE user_id = p_user_id
    AND created_at >= NOW() - (p_days || ' days')::INTERVAL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to cleanup old notifications
CREATE OR REPLACE FUNCTION cleanup_old_notifications()
RETURNS INTEGER AS $$
DECLARE
    deleted_count INTEGER;
BEGIN
    DELETE FROM user_notifications
    WHERE status IN ('read', 'dismissed')
    AND (expires_at IS NOT NULL AND expires_at < NOW())
    OR (expires_at IS NULL AND created_at < NOW() - INTERVAL '90 days');
    
    GET DIAGNOSTICS deleted_count = ROW_COUNT;
    RETURN deleted_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- ADD COMMENTS
-- =====================================================

COMMENT ON TABLE chat_sessions IS 'Chat conversation sessions between users and AI with context and configuration';
COMMENT ON TABLE chat_messages IS 'Individual messages in chat conversations with AI response tracking';
COMMENT ON TABLE ai_usage_logs IS 'Detailed tracking of AI API usage, costs, and performance metrics';
COMMENT ON TABLE chat_templates IS 'Pre-defined chat templates and prompts for different use cases';
COMMENT ON TABLE user_notifications IS 'System notifications with multi-channel delivery tracking';

COMMENT ON COLUMN chat_sessions.total_tokens_used IS 'Total tokens consumed across all messages in this session';
COMMENT ON COLUMN chat_messages.total_tokens IS 'Automatically calculated sum of prompt and completion tokens';
COMMENT ON COLUMN ai_usage_logs.total_cost_usd IS 'Automatically calculated cost in USD based on token usage';
COMMENT ON COLUMN user_notifications.batch_id IS 'Groups notifications for batch processing and delivery';

-- =====================================================
-- GRANT PERMISSIONS
-- =====================================================

-- Grant appropriate permissions to authenticated users
GRANT SELECT, INSERT, UPDATE, DELETE ON chat_sessions TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON chat_messages TO authenticated;
GRANT SELECT ON ai_usage_logs TO authenticated;
GRANT SELECT ON chat_templates TO authenticated;
GRANT SELECT, UPDATE ON user_notifications TO authenticated;

-- Service role gets full access
GRANT ALL ON ALL TABLES IN SCHEMA public TO service_role;
GRANT ALL ON ALL FUNCTIONS IN SCHEMA public TO service_role;

-- =====================================================
-- MIGRATION COMPLETE
-- =====================================================

-- Log successful migration
DO $$ 
BEGIN 
    RAISE NOTICE 'Chat & Communication tables migration completed successfully at %', NOW();
END $$;
