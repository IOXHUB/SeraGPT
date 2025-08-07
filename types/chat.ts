// =====================================================
// CHAT & COMMUNICATION TYPES
// =====================================================
// TypeScript interfaces for chat, AI usage, and notification management
// Author: SeraGPT Development Team
// Created: 2024-12-01
// =====================================================

// =====================================================
// BASE TYPES AND ENUMS
// =====================================================

export type ChatSessionType = 
  | 'general' 
  | 'roi_analysis' 
  | 'climate_analysis' 
  | 'equipment_selection' 
  | 'market_analysis' 
  | 'layout_planning' 
  | 'consultation';

export type ChatSessionStatus = 'active' | 'completed' | 'archived' | 'error' | 'timeout';

export type AIModel = 
  | 'gpt-3.5-turbo' 
  | 'gpt-4' 
  | 'gpt-4-turbo' 
  | 'claude-3-sonnet' 
  | 'claude-3-opus';

export type MessageRole = 'user' | 'assistant' | 'system' | 'function';

export type MessageContentType = 
  | 'text' 
  | 'markdown' 
  | 'html' 
  | 'code' 
  | 'json' 
  | 'image' 
  | 'file' 
  | 'function_call';

export type MessageStatus = 'pending' | 'processing' | 'completed' | 'error' | 'cancelled';

export type AIProvider = 'openai' | 'anthropic' | 'azure' | 'local';

export type AIUsageStatus = 
  | 'pending' 
  | 'completed' 
  | 'error' 
  | 'timeout' 
  | 'cancelled' 
  | 'rate_limited';

export type AIUsageType = 
  | 'chat' 
  | 'analysis' 
  | 'translation' 
  | 'summarization' 
  | 'code_generation' 
  | 'image_analysis' 
  | 'embedding';

export type NotificationType = 
  | 'info' 
  | 'success' 
  | 'warning' 
  | 'error' 
  | 'chat_message' 
  | 'analysis_complete' 
  | 'payment_success' 
  | 'payment_failed' 
  | 'token_expiry' 
  | 'subscription_renewal' 
  | 'system_maintenance';

export type NotificationPriority = 'low' | 'normal' | 'high' | 'urgent';

export type NotificationStatus = 'pending' | 'sent' | 'delivered' | 'read' | 'dismissed' | 'failed';

export type TemplateCategory = 
  | 'roi_analysis' 
  | 'climate_analysis' 
  | 'equipment_selection' 
  | 'market_analysis' 
  | 'layout_planning' 
  | 'general' 
  | 'consultation';

export type ComplexityLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert';

// =====================================================
// CHAT SESSION INTERFACES
// =====================================================

export interface ChatSession {
  id: string;
  user_id: string;
  
  // Session identification
  session_title: string;
  session_type: ChatSessionType;
  
  // Session context
  analysis_id?: string;
  project_context: Record<string, any>;
  
  // AI model configuration
  ai_model: AIModel;
  temperature: number;
  max_tokens: number;
  
  // Session state
  status: ChatSessionStatus;
  is_pinned: boolean;
  is_starred: boolean;
  
  // Usage tracking
  total_messages: number;
  total_tokens_used: number;
  total_cost_cents: number;
  
  // Performance metrics
  average_response_time_ms: number;
  error_count: number;
  
  // Session lifecycle
  started_at: string;
  last_activity_at: string;
  completed_at?: string;
  archived_at?: string;
  
  // Sharing and collaboration
  is_shared: boolean;
  shared_token?: string;
  shared_at?: string;
  shared_expires_at?: string;
  
  // Session settings
  auto_archive_after_days: number;
  enable_analytics: boolean;
  language_code: string;
  
  // Metadata
  metadata: Record<string, any>;
  tags: string[];
  
  // Timestamps
  created_at: string;
  updated_at: string;
}

export interface ChatMessage {
  id: string;
  session_id: string;
  user_id: string;
  
  // Message identification
  message_order: number;
  parent_message_id?: string;
  
  // Message content
  role: MessageRole;
  content: string;
  content_type: MessageContentType;
  
  // AI-specific fields
  ai_model?: AIModel;
  prompt_tokens: number;
  completion_tokens: number;
  total_tokens: number;
  
  // Processing details
  response_time_ms: number;
  cost_cents: number;
  
  // Function calling
  function_name?: string;
  function_arguments?: Record<string, any>;
  function_result?: Record<string, any>;
  
  // Message status
  status: MessageStatus;
  error_message?: string;
  retry_count: number;
  
  // Content analysis
  sentiment_score?: number;
  confidence_score?: number;
  intent_classification?: string;
  
  // User interaction
  is_edited: boolean;
  original_content?: string;
  edit_count: number;
  
  // Rating and feedback
  user_rating?: number;
  user_feedback?: string;
  is_helpful?: boolean;
  
  // Visibility and moderation
  is_visible: boolean;
  is_flagged: boolean;
  flag_reason?: string;
  moderated_at?: string;
  moderated_by?: string;
  
  // Attachments and references
  attachments: any[];
  references: any[];
  
  // Metadata
  metadata: Record<string, any>;
  
  // Timestamps
  created_at: string;
  updated_at: string;
}

// =====================================================
// AI USAGE TRACKING INTERFACES
// =====================================================

export interface AIUsageLog {
  id: string;
  user_id: string;
  session_id?: string;
  message_id?: string;
  
  // API call details
  provider: AIProvider;
  model_name: string;
  endpoint: string;
  
  // Request details
  request_id?: string;
  prompt_text?: string;
  prompt_tokens: number;
  completion_text?: string;
  completion_tokens: number;
  total_tokens: number;
  
  // Model parameters
  temperature?: number;
  max_tokens?: number;
  top_p?: number;
  frequency_penalty?: number;
  presence_penalty?: number;
  model_parameters: Record<string, any>;
  
  // Performance metrics
  request_start_time: string;
  request_end_time: string;
  response_time_ms: number;
  
  // Cost tracking
  cost_per_token_input?: number;
  cost_per_token_output?: number;
  total_cost_usd: number;
  total_cost_cents: number;
  
  // Request status
  status: AIUsageStatus;
  error_code?: string;
  error_message?: string;
  http_status_code?: number;
  
  // Rate limiting
  rate_limit_requests?: number;
  rate_limit_tokens?: number;
  rate_limit_reset_at?: string;
  
  // Quality metrics
  finish_reason?: string;
  safety_scores: Record<string, any>;
  
  // Usage context
  usage_type: AIUsageType;
  feature_used?: string;
  
  // Token tracking
  tokens_deducted: number;
  user_balance_before?: number;
  user_balance_after?: number;
  
  // Metadata
  metadata: Record<string, any>;
  
  // Timestamps
  created_at: string;
}

// =====================================================
// CHAT TEMPLATE INTERFACES
// =====================================================

export interface TemplateVariable {
  name: string;
  type: 'string' | 'number' | 'boolean' | 'array' | 'object';
  description: string;
  required?: boolean;
  default?: any;
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
    options?: string[];
  };
}

export interface ChatTemplate {
  id: string;
  
  // Template identification
  name: string;
  description?: string;
  category: TemplateCategory;
  
  // Template content
  system_prompt: string;
  user_prompt_template: string;
  example_inputs: any[];
  expected_outputs: any[];
  
  // Template configuration
  ai_model: AIModel;
  temperature: number;
  max_tokens: number;
  model_parameters: Record<string, any>;
  
  // Template variables
  variables: TemplateVariable[];
  required_variables: string[];
  variable_validations: Record<string, any>;
  
  // Usage permissions
  is_public: boolean;
  is_active: boolean;
  created_by?: string;
  
  // Template versioning
  version: string;
  parent_template_id?: string;
  is_latest_version: boolean;
  
  // Usage statistics
  usage_count: number;
  success_rate: number;
  average_rating?: number;
  
  // Template metadata
  tags: string[];
  language_code: string;
  industry_focus?: string;
  complexity_level: ComplexityLevel;
  
  // Quality assurance
  is_verified: boolean;
  verified_by?: string;
  verified_at?: string;
  quality_score?: number;
  
  // Metadata
  metadata: Record<string, any>;
  
  // Timestamps
  created_at: string;
  updated_at: string;
}

// =====================================================
// NOTIFICATION INTERFACES
// =====================================================

export interface NotificationActionButton {
  text: string;
  url: string;
  action: string;
  style?: 'primary' | 'secondary' | 'danger';
}

export interface UserNotification {
  id: string;
  user_id: string;
  
  // Notification content
  title: string;
  message: string;
  notification_type: NotificationType;
  
  // Notification priority
  priority: NotificationPriority;
  
  // Notification channels
  send_email: boolean;
  send_push: boolean;
  send_in_app: boolean;
  send_sms: boolean;
  
  // Related entities
  related_entity_type?: string;
  related_entity_id?: string;
  
  // Notification status
  status: NotificationStatus;
  
  // Delivery tracking
  sent_at?: string;
  delivered_at?: string;
  read_at?: string;
  dismissed_at?: string;
  
  // Email delivery details
  email_sent: boolean;
  email_delivered: boolean;
  email_opened: boolean;
  email_clicked: boolean;
  
  // Push notification details
  push_sent: boolean;
  push_delivered: boolean;
  push_clicked: boolean;
  
  // Actions and buttons
  action_buttons: NotificationActionButton[];
  primary_action_url?: string;
  primary_action_text?: string;
  
  // Scheduling
  scheduled_for?: string;
  expires_at?: string;
  
  // Grouping and batching
  group_key?: string;
  batch_id?: string;
  
  // Template information
  template_id?: string;
  template_variables: Record<string, any>;
  
  // User preferences override
  respect_user_preferences: boolean;
  force_send: boolean;
  
  // Retry logic
  retry_count: number;
  max_retries: number;
  next_retry_at?: string;
  
  // Metadata
  metadata: Record<string, any>;
  
  // Timestamps
  created_at: string;
  updated_at: string;
}

// =====================================================
// REQUEST/RESPONSE TYPES
// =====================================================

export interface CreateChatSessionRequest {
  session_title?: string;
  session_type?: ChatSessionType;
  analysis_id?: string;
  project_context?: Record<string, any>;
  ai_model?: AIModel;
  temperature?: number;
  max_tokens?: number;
  language_code?: string;
  metadata?: Record<string, any>;
  tags?: string[];
}

export interface UpdateChatSessionRequest {
  session_title?: string;
  status?: ChatSessionStatus;
  is_pinned?: boolean;
  is_starred?: boolean;
  is_shared?: boolean;
  shared_expires_at?: string;
  auto_archive_after_days?: number;
  enable_analytics?: boolean;
  metadata?: Record<string, any>;
  tags?: string[];
}

export interface CreateChatMessageRequest {
  session_id: string;
  role: MessageRole;
  content: string;
  content_type?: MessageContentType;
  parent_message_id?: string;
  function_name?: string;
  function_arguments?: Record<string, any>;
  attachments?: any[];
  references?: any[];
  metadata?: Record<string, any>;
}

export interface UpdateChatMessageRequest {
  content?: string;
  is_visible?: boolean;
  is_flagged?: boolean;
  flag_reason?: string;
  user_rating?: number;
  user_feedback?: string;
  is_helpful?: boolean;
  metadata?: Record<string, any>;
}

export interface CreateTemplateRequest {
  name: string;
  description?: string;
  category: TemplateCategory;
  system_prompt: string;
  user_prompt_template: string;
  example_inputs?: any[];
  expected_outputs?: any[];
  ai_model?: AIModel;
  temperature?: number;
  max_tokens?: number;
  variables?: TemplateVariable[];
  required_variables?: string[];
  is_public?: boolean;
  tags?: string[];
  language_code?: string;
  industry_focus?: string;
  complexity_level?: ComplexityLevel;
  metadata?: Record<string, any>;
}

export interface UpdateTemplateRequest {
  name?: string;
  description?: string;
  system_prompt?: string;
  user_prompt_template?: string;
  example_inputs?: any[];
  expected_outputs?: any[];
  ai_model?: AIModel;
  temperature?: number;
  max_tokens?: number;
  variables?: TemplateVariable[];
  required_variables?: string[];
  is_public?: boolean;
  is_active?: boolean;
  tags?: string[];
  complexity_level?: ComplexityLevel;
  metadata?: Record<string, any>;
}

export interface CreateNotificationRequest {
  user_id: string;
  title: string;
  message: string;
  notification_type: NotificationType;
  priority?: NotificationPriority;
  send_email?: boolean;
  send_push?: boolean;
  send_in_app?: boolean;
  send_sms?: boolean;
  related_entity_type?: string;
  related_entity_id?: string;
  action_buttons?: NotificationActionButton[];
  primary_action_url?: string;
  primary_action_text?: string;
  scheduled_for?: string;
  expires_at?: string;
  group_key?: string;
  template_id?: string;
  template_variables?: Record<string, any>;
  respect_user_preferences?: boolean;
  force_send?: boolean;
  metadata?: Record<string, any>;
}

export interface UpdateNotificationRequest {
  status?: NotificationStatus;
  read_at?: string;
  dismissed_at?: string;
  user_rating?: number;
  user_feedback?: string;
  metadata?: Record<string, any>;
}

// =====================================================
// RESPONSE TYPES
// =====================================================

export interface ChatSessionResponse {
  data: ChatSession | null;
  error: string | null;
}

export interface ChatSessionsResponse {
  data: ChatSession[];
  error: string | null;
  total_count: number;
  pagination?: {
    page: number;
    page_size: number;
    total_pages: number;
  };
}

export interface ChatMessageResponse {
  data: ChatMessage | null;
  error: string | null;
}

export interface ChatMessagesResponse {
  data: ChatMessage[];
  error: string | null;
  total_count: number;
  session_stats?: {
    total_tokens: number;
    total_cost_cents: number;
    message_count: number;
  };
}

export interface TemplateResponse {
  data: ChatTemplate | null;
  error: string | null;
}

export interface TemplatesResponse {
  data: ChatTemplate[];
  error: string | null;
  total_count: number;
  categories: TemplateCategory[];
}

export interface NotificationResponse {
  data: UserNotification | null;
  error: string | null;
}

export interface NotificationsResponse {
  data: UserNotification[];
  error: string | null;
  total_count: number;
  unread_count: number;
}

export interface AIUsageResponse {
  data: AIUsageLog | null;
  error: string | null;
}

export interface AIUsageStatsResponse {
  data: {
    total_requests: number;
    total_tokens: number;
    total_cost_cents: number;
    average_response_time: number;
    success_rate: number;
    most_used_model: string;
    daily_usage: Record<string, any>;
  } | null;
  error: string | null;
}

// =====================================================
// ANALYTICS AND STATISTICS TYPES
// =====================================================

export interface ChatStatistics {
  total_sessions: number;
  total_messages: number;
  total_tokens_used: number;
  total_cost_cents: number;
  active_sessions: number;
  average_session_length: number;
  most_used_model: string;
  last_chat_date?: string;
  session_types: Record<ChatSessionType, number>;
  daily_usage: Record<string, {
    sessions: number;
    messages: number;
    tokens: number;
    cost_cents: number;
  }>;
}

export interface AIUsageStatistics {
  total_requests: number;
  total_tokens: number;
  total_cost_cents: number;
  average_response_time: number;
  success_rate: number;
  most_used_model: string;
  provider_breakdown: Record<AIProvider, {
    requests: number;
    tokens: number;
    cost_cents: number;
    success_rate: number;
  }>;
  usage_by_type: Record<AIUsageType, {
    requests: number;
    tokens: number;
    cost_cents: number;
  }>;
  daily_usage: Record<string, {
    requests: number;
    tokens: number;
    cost_cents: number;
  }>;
}

export interface NotificationStatistics {
  total_notifications: number;
  unread_count: number;
  delivery_rate: number;
  open_rate: number;
  click_rate: number;
  type_breakdown: Record<NotificationType, number>;
  channel_performance: {
    email: { sent: number; delivered: number; opened: number; clicked: number };
    push: { sent: number; delivered: number; clicked: number };
    in_app: { sent: number; read: number; dismissed: number };
    sms: { sent: number; delivered: number };
  };
}

// =====================================================
// AI INTEGRATION TYPES
// =====================================================

export interface OpenAIMessage {
  role: 'system' | 'user' | 'assistant' | 'function';
  content: string;
  name?: string;
  function_call?: {
    name: string;
    arguments: string;
  };
}

export interface OpenAICompletionRequest {
  model: string;
  messages: OpenAIMessage[];
  temperature?: number;
  max_tokens?: number;
  top_p?: number;
  frequency_penalty?: number;
  presence_penalty?: number;
  functions?: any[];
  function_call?: any;
  user?: string;
  stream?: boolean;
}

export interface OpenAICompletionResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: Array<{
    index: number;
    message: OpenAIMessage;
    finish_reason: string;
  }>;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

export interface AnthropicMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface AnthropicCompletionRequest {
  model: string;
  messages: AnthropicMessage[];
  max_tokens: number;
  temperature?: number;
  top_p?: number;
  top_k?: number;
  system?: string;
}

export interface AnthropicCompletionResponse {
  id: string;
  type: string;
  role: string;
  content: Array<{
    type: string;
    text: string;
  }>;
  model: string;
  stop_reason: string;
  stop_sequence?: string;
  usage: {
    input_tokens: number;
    output_tokens: number;
  };
}

// =====================================================
// UTILITY TYPES
// =====================================================

export interface ChatError {
  code: string;
  message: string;
  type: 'validation' | 'ai_provider' | 'network' | 'server' | 'rate_limit';
  details?: Record<string, any>;
}

export interface TemplateValidationResult {
  is_valid: boolean;
  errors: string[];
  warnings: string[];
  missing_variables: string[];
  unused_variables: string[];
}

export interface MessageValidationResult {
  is_valid: boolean;
  errors: string[];
  content_score: number;
  safety_level: 'safe' | 'moderate' | 'unsafe';
  detected_language?: string;
}

export interface ChatMetrics {
  session_metrics: {
    duration_ms: number;
    message_count: number;
    user_messages: number;
    ai_messages: number;
    average_response_time_ms: number;
    total_tokens: number;
    total_cost_cents: number;
  };
  quality_metrics: {
    user_satisfaction_score?: number;
    conversation_completion_rate: number;
    error_rate: number;
    retry_rate: number;
  };
  engagement_metrics: {
    messages_per_session: number;
    session_length_minutes: number;
    return_sessions: number;
    template_usage_rate: number;
  };
}

// =====================================================
// CONSTANTS
// =====================================================

export const CHAT_CONSTANTS = {
  MAX_MESSAGE_LENGTH: 10000,
  MAX_SESSION_DURATION_HOURS: 24,
  DEFAULT_MAX_TOKENS: 4000,
  DEFAULT_TEMPERATURE: 0.7,
  AUTO_ARCHIVE_DAYS: 30,
  SHARED_LINK_EXPIRY_DAYS: 7,
  MAX_RETRIES: 3,
  RATE_LIMIT_REQUESTS_PER_MINUTE: 60,
  RATE_LIMIT_TOKENS_PER_MINUTE: 40000,
} as const;

export const AI_MODEL_COSTS = {
  'gpt-3.5-turbo': {
    input_cost_per_1k_tokens: 0.0015,
    output_cost_per_1k_tokens: 0.002,
  },
  'gpt-4': {
    input_cost_per_1k_tokens: 0.03,
    output_cost_per_1k_tokens: 0.06,
  },
  'gpt-4-turbo': {
    input_cost_per_1k_tokens: 0.01,
    output_cost_per_1k_tokens: 0.03,
  },
  'claude-3-sonnet': {
    input_cost_per_1k_tokens: 0.003,
    output_cost_per_1k_tokens: 0.015,
  },
  'claude-3-opus': {
    input_cost_per_1k_tokens: 0.015,
    output_cost_per_1k_tokens: 0.075,
  },
} as const;

export const NOTIFICATION_TEMPLATES = {
  CHAT_MESSAGE: 'chat_message',
  ANALYSIS_COMPLETE: 'analysis_complete',
  PAYMENT_SUCCESS: 'payment_success',
  PAYMENT_FAILED: 'payment_failed',
  TOKEN_EXPIRY: 'token_expiry_warning',
  SUBSCRIPTION_RENEWAL: 'subscription_renewal',
  SYSTEM_MAINTENANCE: 'system_maintenance',
} as const;

export const TEMPLATE_CATEGORIES_META = {
  roi_analysis: {
    name: 'ROI Analysis',
    description: 'Templates for return on investment calculations',
    icon: '📊',
    color: '#10B981'
  },
  climate_analysis: {
    name: 'Climate Analysis',
    description: 'Weather and climate condition analysis templates',
    icon: '🌡️',
    color: '#3B82F6'
  },
  equipment_selection: {
    name: 'Equipment Selection',
    description: 'Greenhouse equipment recommendation templates',
    icon: '🔧',
    color: '#F59E0B'
  },
  market_analysis: {
    name: 'Market Analysis',
    description: 'Market research and analysis templates',
    icon: '📈',
    color: '#8B5CF6'
  },
  layout_planning: {
    name: 'Layout Planning',
    description: 'Greenhouse layout and design templates',
    icon: '📐',
    color: '#EF4444'
  },
  general: {
    name: 'General',
    description: 'General purpose conversation templates',
    icon: '💬',
    color: '#6B7280'
  },
  consultation: {
    name: 'Consultation',
    description: 'Expert consultation and advice templates',
    icon: '👨‍💼',
    color: '#06B6D4'
  }
} as const;

// =====================================================
// ERROR CODES
// =====================================================

export const CHAT_ERROR_CODES = {
  SESSION_NOT_FOUND: 'session_not_found',
  MESSAGE_NOT_FOUND: 'message_not_found',
  TEMPLATE_NOT_FOUND: 'template_not_found',
  INVALID_MESSAGE_ROLE: 'invalid_message_role',
  INVALID_CONTENT_TYPE: 'invalid_content_type',
  MESSAGE_TOO_LONG: 'message_too_long',
  SESSION_ARCHIVED: 'session_archived',
  RATE_LIMIT_EXCEEDED: 'rate_limit_exceeded',
  AI_PROVIDER_ERROR: 'ai_provider_error',
  INSUFFICIENT_TOKENS: 'insufficient_tokens',
  TEMPLATE_VALIDATION_FAILED: 'template_validation_failed',
  NOTIFICATION_DELIVERY_FAILED: 'notification_delivery_failed',
  INVALID_TEMPLATE_VARIABLES: 'invalid_template_variables',
  UNAUTHORIZED_TEMPLATE_ACCESS: 'unauthorized_template_access',
} as const;

export type ChatErrorCode = keyof typeof CHAT_ERROR_CODES;
