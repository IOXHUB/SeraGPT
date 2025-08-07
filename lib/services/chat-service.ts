// =====================================================
// AI CHAT SERVICE
// =====================================================
// Comprehensive chat service handling OpenAI/Anthropic integration,
// chat sessions, messages, templates, and usage tracking
// Author: SeraGPT Development Team
// Created: 2024-12-01
// =====================================================

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import type {
  ChatSession,
  ChatMessage,
  ChatTemplate,
  UserNotification,
  AIUsageLog,
  CreateChatSessionRequest,
  UpdateChatSessionRequest,
  CreateChatMessageRequest,
  UpdateChatMessageRequest,
  CreateTemplateRequest,
  UpdateTemplateRequest,
  CreateNotificationRequest,
  ChatSessionResponse,
  ChatSessionsResponse,
  ChatMessageResponse,
  ChatMessagesResponse,
  TemplateResponse,
  TemplatesResponse,
  NotificationResponse,
  NotificationsResponse,
  ChatStatistics,
  AIUsageStatistics,
  ChatError,
  OpenAIMessage,
  OpenAICompletionRequest,
  OpenAICompletionResponse,
  AnthropicMessage,
  AnthropicCompletionRequest,
  AnthropicCompletionResponse,
  AIModel,
  MessageRole,
  ChatSessionType,
  TemplateCategory,
  NotificationType,
  AIProvider,
  AIUsageType,
  CHAT_ERROR_CODES
} from '@/types/chat';

import { AI_MODEL_COSTS } from '@/types/chat';

// =====================================================
// AI PROVIDERS CONFIGURATION
// =====================================================

interface AIProviderConfig {
  openai: {
    apiKey: string;
    baseUrl: string;
    organization?: string;
  };
  anthropic: {
    apiKey: string;
    baseUrl: string;
  };
}

// =====================================================
// CHAT TEMPLATES LIBRARY
// =====================================================

export const DEFAULT_CHAT_TEMPLATES: Omit<ChatTemplate, 'id' | 'created_at' | 'updated_at' | 'created_by'>[] = [
  {
    name: 'ROI Analysis Assistant',
    description: 'Comprehensive ROI analysis for greenhouse investments',
    category: 'roi_analysis',
    system_prompt: `You are an expert agricultural investment advisor specializing in greenhouse projects in Turkey. 

Your expertise includes:
- Financial analysis and ROI calculations
- Market analysis for agricultural products
- Cost estimation for greenhouse construction and operation
- Revenue projections based on crop yields and market prices
- Risk assessment and mitigation strategies

Provide detailed, data-driven analysis with specific numbers, timeframes, and actionable recommendations. Always consider Turkish market conditions, regulations, and economic factors.`,
    user_prompt_template: `Please analyze the ROI for a greenhouse project with these details:

Location: {{location}}
Crop Type: {{crop}}
Greenhouse Size: {{size}} m²
Investment Budget: {{budget}} TL
Target Market: {{market}}
Experience Level: {{experience}}

Provide a comprehensive analysis including initial investment breakdown, operational costs, revenue projections, payback period, and risk factors.`,
    example_inputs: [
      { location: 'Antalya', crop: 'Domates', size: 1000, budget: 500000, market: 'Yerel pazar', experience: 'Orta seviye' }
    ],
    expected_outputs: [
      'Detailed ROI analysis with 3-5 year projections, break-even analysis, and risk assessment'
    ],
    ai_model: 'gpt-4',
    temperature: 0.3,
    max_tokens: 4000,
    model_parameters: {},
    variables: [
      { name: 'location', type: 'string', description: 'Project location in Turkey', required: true },
      { name: 'crop', type: 'string', description: 'Type of crop to be grown', required: true },
      { name: 'size', type: 'number', description: 'Greenhouse size in square meters', required: true },
      { name: 'budget', type: 'number', description: 'Total investment budget in TL', required: true },
      { name: 'market', type: 'string', description: 'Target market (local, export, etc.)', required: false },
      { name: 'experience', type: 'string', description: 'Farmer experience level', required: false }
    ],
    required_variables: ['location', 'crop', 'size', 'budget'],
    variable_validations: {},
    is_public: true,
    is_active: true,
    version: '1.0',
    parent_template_id: undefined,
    is_latest_version: true,
    usage_count: 0,
    success_rate: 0,
    average_rating: undefined,
    tags: ['roi', 'analysis', 'investment', 'greenhouse'],
    language_code: 'tr-TR',
    industry_focus: 'greenhouse',
    complexity_level: 'intermediate',
    is_verified: true,
    verified_by: undefined,
    verified_at: undefined,
    quality_score: 95,
    metadata: { category: 'financial' }
  },
  {
    name: 'Climate Analysis Expert',
    description: 'Climate condition analysis for optimal growing conditions',
    category: 'climate_analysis',
    system_prompt: `You are a climate and agricultural meteorology expert specializing in greenhouse cultivation in Mediterranean and Anatolian climates.

Your expertise includes:
- Climate data analysis and interpretation
- Microclimate management in greenhouses
- Seasonal planning and crop timing
- Climate risk assessment
- HVAC and climate control system recommendations

Provide specific, actionable advice based on local climate conditions, seasonal patterns, and optimal growing parameters for different crops.`,
    user_prompt_template: `Analyze the climate conditions for greenhouse cultivation:

Location: {{location}}
Crop: {{crop}}
Greenhouse Type: {{greenhouse_type}}
Target Season: {{season}}
Climate Control Budget: {{climate_budget}} TL

Please provide recommendations for optimal climate management, including temperature, humidity, ventilation requirements, and seasonal adjustments.`,
    example_inputs: [
      { location: 'İzmir', crop: 'Salatalık', greenhouse_type: 'Cam sera', season: 'Kış', climate_budget: 50000 }
    ],
    expected_outputs: [
      'Detailed climate management plan with specific parameters and equipment recommendations'
    ],
    ai_model: 'gpt-4',
    temperature: 0.2,
    max_tokens: 3500,
    model_parameters: {},
    variables: [
      { name: 'location', type: 'string', description: 'Location for climate analysis', required: true },
      { name: 'crop', type: 'string', description: 'Crop to be grown', required: true },
      { name: 'greenhouse_type', type: 'string', description: 'Type of greenhouse structure', required: true },
      { name: 'season', type: 'string', description: 'Target growing season', required: true },
      { name: 'climate_budget', type: 'number', description: 'Budget for climate control systems', required: false }
    ],
    required_variables: ['location', 'crop', 'greenhouse_type', 'season'],
    variable_validations: {},
    is_public: true,
    is_active: true,
    version: '1.0',
    parent_template_id: undefined,
    is_latest_version: true,
    usage_count: 0,
    success_rate: 0,
    average_rating: undefined,
    tags: ['climate', 'analysis', 'greenhouse', 'agriculture'],
    language_code: 'tr-TR',
    industry_focus: 'greenhouse',
    complexity_level: 'intermediate',
    is_verified: true,
    verified_by: undefined,
    verified_at: undefined,
    quality_score: 90,
    metadata: { category: 'technical' }
  },
  {
    name: 'General Greenhouse Consultant',
    description: 'General purpose greenhouse farming assistant',
    category: 'general',
    system_prompt: `You are a friendly and knowledgeable greenhouse farming consultant with expertise in all aspects of protected cultivation.

Your role is to:
- Answer questions about greenhouse farming
- Provide practical advice and solutions
- Share best practices and tips
- Help troubleshoot common problems
- Guide farmers through decision-making processes

Always provide helpful, accurate, and actionable advice. Use simple language and explain technical concepts clearly. Consider the Turkish agricultural context and local conditions.`,
    user_prompt_template: `{{user_question}}

Please provide detailed guidance and practical advice.`,
    example_inputs: [
      { user_question: 'Seralarımda yaprak biti problemi yaşıyorum. Ne önerirsiniz?' }
    ],
    expected_outputs: [
      'Comprehensive advice with multiple solutions, preventive measures, and follow-up recommendations'
    ],
    ai_model: 'gpt-4',
    temperature: 0.7,
    max_tokens: 3000,
    model_parameters: {},
    variables: [
      { name: 'user_question', type: 'string', description: 'User question or problem description', required: true }
    ],
    required_variables: ['user_question'],
    variable_validations: {},
    is_public: true,
    is_active: true,
    version: '1.0',
    parent_template_id: undefined,
    is_latest_version: true,
    usage_count: 0,
    success_rate: 0,
    average_rating: undefined,
    tags: ['general', 'consultation', 'advice', 'greenhouse'],
    language_code: 'tr-TR',
    industry_focus: 'greenhouse',
    complexity_level: 'beginner',
    is_verified: true,
    verified_by: undefined,
    verified_at: undefined,
    quality_score: 85,
    metadata: { category: 'general' }
  }
];

// =====================================================
// CHAT SERVICE CLASS
// =====================================================

export class ChatService {
  private supabase = createClientComponentClient();
  private aiConfig: AIProviderConfig;

  constructor() {
    this.aiConfig = {
      openai: {
        apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY || '',
        baseUrl: 'https://api.openai.com/v1',
        organization: process.env.NEXT_PUBLIC_OPENAI_ORG_ID
      },
      anthropic: {
        apiKey: process.env.NEXT_PUBLIC_ANTHROPIC_API_KEY || '',
        baseUrl: 'https://api.anthropic.com/v1'
      }
    };
  }

  // =====================================================
  // CHAT SESSION MANAGEMENT
  // =====================================================

  /**
   * Create a new chat session
   */
  async createChatSession(
    userId: string,
    request: CreateChatSessionRequest
  ): Promise<ChatSessionResponse> {
    try {
      const { data, error } = await this.supabase
        .from('chat_sessions')
        .insert({
          user_id: userId,
          session_title: request.session_title || 'New Chat',
          session_type: request.session_type || 'general',
          analysis_id: request.analysis_id,
          project_context: request.project_context || {},
          ai_model: request.ai_model || 'gpt-4',
          temperature: request.temperature || 0.7,
          max_tokens: request.max_tokens || 4000,
          language_code: request.language_code || 'tr-TR',
          metadata: request.metadata || {},
          tags: request.tags || [],
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .select()
        .single();

      if (error) {
        return { data: null, error: error.message };
      }

      return { data, error: null };
    } catch (error) {
      return {
        data: null,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  /**
   * Get chat session by ID
   */
  async getChatSession(sessionId: string): Promise<ChatSessionResponse> {
    try {
      const { data, error } = await this.supabase
        .from('chat_sessions')
        .select('*')
        .eq('id', sessionId)
        .single();

      if (error) {
        return { data: null, error: error.message };
      }

      return { data, error: null };
    } catch (error) {
      return {
        data: null,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  /**
   * Get all chat sessions for a user
   */
  async getChatSessions(
    userId: string,
    limit = 50,
    offset = 0,
    sessionType?: ChatSessionType
  ): Promise<ChatSessionsResponse> {
    try {
      let query = this.supabase
        .from('chat_sessions')
        .select('*', { count: 'exact' })
        .eq('user_id', userId)
        .order('last_activity_at', { ascending: false })
        .range(offset, offset + limit - 1);

      if (sessionType) {
        query = query.eq('session_type', sessionType);
      }

      const { data, error, count } = await query;

      if (error) {
        return { data: [], error: error.message, total_count: 0 };
      }

      return {
        data: data || [],
        error: null,
        total_count: count || 0,
        pagination: {
          page: Math.floor(offset / limit) + 1,
          page_size: limit,
          total_pages: Math.ceil((count || 0) / limit)
        }
      };
    } catch (error) {
      return {
        data: [],
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        total_count: 0
      };
    }
  }

  /**
   * Update chat session
   */
  async updateChatSession(
    sessionId: string,
    request: UpdateChatSessionRequest
  ): Promise<ChatSessionResponse> {
    try {
      const { data, error } = await this.supabase
        .from('chat_sessions')
        .update({
          ...request,
          updated_at: new Date().toISOString()
        })
        .eq('id', sessionId)
        .select()
        .single();

      if (error) {
        return { data: null, error: error.message };
      }

      return { data, error: null };
    } catch (error) {
      return {
        data: null,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  /**
   * Delete chat session
   */
  async deleteChatSession(sessionId: string): Promise<{ error: string | null }> {
    try {
      const { error } = await this.supabase
        .from('chat_sessions')
        .delete()
        .eq('id', sessionId);

      return { error: error?.message || null };
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  // =====================================================
  // CHAT MESSAGE MANAGEMENT
  // =====================================================

  /**
   * Create a new chat message
   */
  async createChatMessage(
    request: CreateChatMessageRequest
  ): Promise<ChatMessageResponse> {
    try {
      // Get the next message order for this session
      const { data: lastMessage } = await this.supabase
        .from('chat_messages')
        .select('message_order')
        .eq('session_id', request.session_id)
        .order('message_order', { ascending: false })
        .limit(1)
        .single();

      const nextOrder = (lastMessage?.message_order || 0) + 1;

      // Get session to get user_id
      const sessionResponse = await this.getChatSession(request.session_id);
      if (!sessionResponse.data) {
        return { data: null, error: 'Session not found' };
      }

      const { data, error } = await this.supabase
        .from('chat_messages')
        .insert({
          session_id: request.session_id,
          user_id: sessionResponse.data.user_id,
          message_order: nextOrder,
          role: request.role,
          content: request.content,
          content_type: request.content_type || 'text',
          parent_message_id: request.parent_message_id,
          function_name: request.function_name,
          function_arguments: request.function_arguments,
          attachments: request.attachments || [],
          references: request.references || [],
          metadata: request.metadata || {},
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .select()
        .single();

      if (error) {
        return { data: null, error: error.message };
      }

      return { data, error: null };
    } catch (error) {
      return {
        data: null,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  /**
   * Get messages for a chat session
   */
  async getChatMessages(sessionId: string): Promise<ChatMessagesResponse> {
    try {
      const { data, error, count } = await this.supabase
        .from('chat_messages')
        .select('*', { count: 'exact' })
        .eq('session_id', sessionId)
        .order('message_order', { ascending: true });

      if (error) {
        return { data: [], error: error.message, total_count: 0 };
      }

      // Calculate session stats
      const totalTokens = data?.reduce((sum, msg) => sum + msg.total_tokens, 0) || 0;
      const totalCost = data?.reduce((sum, msg) => sum + msg.cost_cents, 0) || 0;

      return {
        data: data || [],
        error: null,
        total_count: count || 0,
        session_stats: {
          total_tokens: totalTokens,
          total_cost_cents: totalCost,
          message_count: count || 0
        }
      };
    } catch (error) {
      return {
        data: [],
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        total_count: 0
      };
    }
  }

  /**
   * Update chat message
   */
  async updateChatMessage(
    messageId: string,
    request: UpdateChatMessageRequest
  ): Promise<ChatMessageResponse> {
    try {
      const { data, error } = await this.supabase
        .from('chat_messages')
        .update({
          ...request,
          updated_at: new Date().toISOString()
        })
        .eq('id', messageId)
        .select()
        .single();

      if (error) {
        return { data: null, error: error.message };
      }

      return { data, error: null };
    } catch (error) {
      return {
        data: null,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  // =====================================================
  // AI INTEGRATION
  // =====================================================

  /**
   * Send message to AI and get response
   */
  async sendMessageToAI(
    sessionId: string,
    userMessage: string,
    context?: {
      sessionType?: ChatSessionType;
      templateId?: string;
      projectContext?: Record<string, any>;
    }
  ): Promise<ChatMessageResponse> {
    try {
      // Get session details
      const sessionResponse = await this.getChatSession(sessionId);
      if (!sessionResponse.data) {
        return { data: null, error: 'Session not found' };
      }

      const session = sessionResponse.data;

      // Create user message
      const userMessageResponse = await this.createChatMessage({
        session_id: sessionId,
        role: 'user',
        content: userMessage,
        metadata: { context }
      });

      if (!userMessageResponse.data) {
        return { data: null, error: 'Failed to create user message' };
      }

      // Get conversation history
      const messagesResponse = await this.getChatMessages(sessionId);
      const conversationHistory = messagesResponse.data || [];

      // Generate AI response
      const aiResponse = await this.generateAIResponse(
        session,
        conversationHistory,
        context
      );

      if (!aiResponse.success) {
        return { data: null, error: aiResponse.error };
      }

      // Create AI message
      const aiMessageResponse = await this.createChatMessage({
        session_id: sessionId,
        role: 'assistant',
        content: aiResponse.content,
        metadata: {
          ai_provider: aiResponse.provider,
          ai_model: session.ai_model,
          prompt_tokens: aiResponse.usage?.prompt_tokens || 0,
          completion_tokens: aiResponse.usage?.completion_tokens || 0,
          response_time_ms: aiResponse.response_time_ms || 0,
          cost_cents: aiResponse.cost_cents || 0,
          model_config: {
            temperature: session.temperature,
            max_tokens: session.max_tokens
          }
        }
      });

      // Log AI usage
      if (aiResponse.usage) {
        await this.logAIUsage({
          user_id: session.user_id,
          session_id: sessionId,
          message_id: aiMessageResponse.data?.id,
          provider: aiResponse.provider,
          model_name: session.ai_model,
          endpoint: 'chat/completions',
          prompt_tokens: aiResponse.usage.prompt_tokens,
          completion_tokens: aiResponse.usage.completion_tokens,
          cost_cents: aiResponse.cost_cents || 0,
          response_time_ms: aiResponse.response_time_ms || 0,
          usage_type: this.getUsageTypeFromSessionType(session.session_type)
        });
      }

      return aiMessageResponse;
    } catch (error) {
      return {
        data: null,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  /**
   * Generate AI response using configured provider
   */
  private async generateAIResponse(
    session: ChatSession,
    conversationHistory: ChatMessage[],
    context?: any
  ): Promise<{
    success: boolean;
    content: string;
    provider: AIProvider;
    usage?: { prompt_tokens: number; completion_tokens: number };
    cost_cents?: number;
    response_time_ms?: number;
    error?: string;
  }> {
    const startTime = Date.now();

    try {
      // Prepare messages for AI API
      const messages = this.prepareMessagesForAI(conversationHistory, session.session_type);

      // Determine provider based on model
      const provider = this.getProviderForModel(session.ai_model);

      let response;
      if (provider === 'openai') {
        response = await this.callOpenAI({
          model: session.ai_model,
          messages,
          temperature: session.temperature,
          max_tokens: session.max_tokens
        });
      } else if (provider === 'anthropic') {
        response = await this.callAnthropic({
          model: session.ai_model,
          messages: this.convertToAnthropicMessages(messages),
          max_tokens: session.max_tokens,
          temperature: session.temperature
        });
      } else {
        throw new Error(`Unsupported AI provider: ${provider}`);
      }

      const responseTime = Date.now() - startTime;
      const cost = this.calculateCost(session.ai_model, response.usage);

      return {
        success: true,
        content: response.content,
        provider,
        usage: response.usage,
        cost_cents: Math.round(cost * 100),
        response_time_ms: responseTime
      };
    } catch (error) {
      return {
        success: false,
        content: '',
        provider: this.getProviderForModel(session.ai_model),
        error: error instanceof Error ? error.message : 'AI request failed'
      };
    }
  }

  /**
   * Call OpenAI API
   */
  private async callOpenAI(request: OpenAICompletionRequest): Promise<{
    content: string;
    usage: { prompt_tokens: number; completion_tokens: number };
  }> {
    const response = await fetch(`${this.aiConfig.openai.baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.aiConfig.openai.apiKey}`,
        'Content-Type': 'application/json',
        ...(this.aiConfig.openai.organization && {
          'OpenAI-Organization': this.aiConfig.openai.organization
        })
      },
      body: JSON.stringify(request)
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status} ${response.statusText}`);
    }

    const data: OpenAICompletionResponse = await response.json();
    
    return {
      content: data.choices[0]?.message?.content || '',
      usage: {
        prompt_tokens: data.usage.prompt_tokens,
        completion_tokens: data.usage.completion_tokens
      }
    };
  }

  /**
   * Call Anthropic API
   */
  private async callAnthropic(request: AnthropicCompletionRequest): Promise<{
    content: string;
    usage: { prompt_tokens: number; completion_tokens: number };
  }> {
    const response = await fetch(`${this.aiConfig.anthropic.baseUrl}/messages`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.aiConfig.anthropic.apiKey}`,
        'Content-Type': 'application/json',
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify(request)
    });

    if (!response.ok) {
      throw new Error(`Anthropic API error: ${response.status} ${response.statusText}`);
    }

    const data: AnthropicCompletionResponse = await response.json();
    
    return {
      content: data.content[0]?.text || '',
      usage: {
        prompt_tokens: data.usage.input_tokens,
        completion_tokens: data.usage.output_tokens
      }
    };
  }

  // =====================================================
  // TEMPLATE MANAGEMENT
  // =====================================================

  /**
   * Get all chat templates
   */
  async getChatTemplates(
    category?: TemplateCategory,
    isPublic?: boolean
  ): Promise<TemplatesResponse> {
    try {
      let query = this.supabase
        .from('chat_templates')
        .select('*', { count: 'exact' })
        .eq('is_active', true)
        .order('usage_count', { ascending: false });

      if (category) {
        query = query.eq('category', category);
      }

      if (isPublic !== undefined) {
        query = query.eq('is_public', isPublic);
      }

      const { data, error, count } = await query;

      if (error) {
        return { data: [], error: error.message, total_count: 0, categories: [] };
      }

      // Get unique categories
      const categorySet = new Set(data?.map(t => t.category) || []);
      const categories = Array.from(categorySet) as TemplateCategory[];

      return {
        data: data || [],
        error: null,
        total_count: count || 0,
        categories
      };
    } catch (error) {
      return {
        data: [],
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        total_count: 0,
        categories: []
      };
    }
  }

  /**
   * Get template by ID
   */
  async getChatTemplate(templateId: string): Promise<TemplateResponse> {
    try {
      const { data, error } = await this.supabase
        .from('chat_templates')
        .select('*')
        .eq('id', templateId)
        .single();

      if (error) {
        return { data: null, error: error.message };
      }

      return { data, error: null };
    } catch (error) {
      return {
        data: null,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  /**
   * Create chat template
   */
  async createChatTemplate(
    userId: string,
    request: CreateTemplateRequest
  ): Promise<TemplateResponse> {
    try {
      const { data, error } = await this.supabase
        .from('chat_templates')
        .insert({
          ...request,
          created_by: userId,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .select()
        .single();

      if (error) {
        return { data: null, error: error.message };
      }

      return { data, error: null };
    } catch (error) {
      return {
        data: null,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  // =====================================================
  // ANALYTICS AND STATISTICS
  // =====================================================

  /**
   * Get chat statistics for a user
   */
  async getChatStatistics(userId: string): Promise<ChatStatistics> {
    try {
      const { data } = await this.supabase.rpc('get_user_chat_stats', {
        p_user_id: userId
      });

      const stats = data?.[0] || {};
      
      // Get session type breakdown
      const { data: sessionTypes } = await this.supabase
        .from('chat_sessions')
        .select('session_type')
        .eq('user_id', userId);

      const sessionTypeCount: Partial<Record<ChatSessionType, number>> = {};
      sessionTypes?.forEach(session => {
        const type = session.session_type as ChatSessionType;
        sessionTypeCount[type] = (sessionTypeCount[type] || 0) + 1;
      });

      return {
        total_sessions: stats.total_sessions || 0,
        total_messages: stats.total_messages || 0,
        total_tokens_used: stats.total_tokens_used || 0,
        total_cost_cents: stats.total_cost_cents || 0,
        active_sessions: stats.active_sessions || 0,
        average_session_length: stats.average_session_length || 0,
        most_used_model: stats.most_used_model || 'gpt-4',
        last_chat_date: stats.last_chat_date,
        session_types: sessionTypeCount as Record<ChatSessionType, number>,
        daily_usage: {} // This would need additional implementation
      };
    } catch (error) {
      return {
        total_sessions: 0,
        total_messages: 0,
        total_tokens_used: 0,
        total_cost_cents: 0,
        active_sessions: 0,
        average_session_length: 0,
        most_used_model: 'gpt-4',
        session_types: {
          general: 0,
          roi_analysis: 0,
          climate_analysis: 0,
          equipment_selection: 0,
          market_analysis: 0,
          layout_planning: 0,
          consultation: 0
        },
        daily_usage: {}
      };
    }
  }

  // =====================================================
  // UTILITY METHODS
  // =====================================================

  /**
   * Log AI usage for tracking and billing
   */
  private async logAIUsage(usage: {
    user_id: string;
    session_id?: string;
    message_id?: string;
    provider: AIProvider;
    model_name: string;
    endpoint: string;
    prompt_tokens: number;
    completion_tokens: number;
    cost_cents: number;
    response_time_ms: number;
    usage_type: AIUsageType;
  }): Promise<void> {
    try {
      const startTime = new Date();
      const endTime = new Date(startTime.getTime() + usage.response_time_ms);

      await this.supabase
        .from('ai_usage_logs')
        .insert({
          ...usage,
          request_start_time: startTime.toISOString(),
          request_end_time: endTime.toISOString(),
          status: 'completed',
          created_at: new Date().toISOString()
        });
    } catch (error) {
      console.error('Failed to log AI usage:', error);
    }
  }

  /**
   * Calculate cost based on model and usage
   */
  private calculateCost(model: AIModel, usage: { prompt_tokens: number; completion_tokens: number }): number {
    const modelCosts = AI_MODEL_COSTS[model];
    if (!modelCosts) return 0;

    const inputCost = (usage.prompt_tokens / 1000) * modelCosts.input_cost_per_1k_tokens;
    const outputCost = (usage.completion_tokens / 1000) * modelCosts.output_cost_per_1k_tokens;
    
    return inputCost + outputCost;
  }

  /**
   * Get AI provider for model
   */
  private getProviderForModel(model: AIModel): AIProvider {
    if (model.startsWith('gpt')) return 'openai';
    if (model.startsWith('claude')) return 'anthropic';
    return 'openai'; // default
  }

  /**
   * Prepare messages for AI API
   */
  private prepareMessagesForAI(messages: ChatMessage[], sessionType: ChatSessionType): OpenAIMessage[] {
    // Add system message based on session type
    const systemMessage = this.getSystemMessageForSessionType(sessionType);
    
    const aiMessages: OpenAIMessage[] = [
      { role: 'system', content: systemMessage }
    ];

    // Convert chat messages to AI format
    messages.forEach(msg => {
      if (msg.role === 'user' || msg.role === 'assistant') {
        aiMessages.push({
          role: msg.role,
          content: msg.content
        });
      }
    });

    return aiMessages;
  }

  /**
   * Convert OpenAI messages to Anthropic format
   */
  private convertToAnthropicMessages(messages: OpenAIMessage[]): AnthropicMessage[] {
    return messages
      .filter(msg => msg.role !== 'system')
      .map(msg => ({
        role: msg.role as 'user' | 'assistant',
        content: msg.content
      }));
  }

  /**
   * Get system message based on session type
   */
  private getSystemMessageForSessionType(sessionType: ChatSessionType): string {
    const systemMessages = {
      general: 'You are a helpful greenhouse farming assistant. Provide practical advice and solutions for greenhouse cultivation.',
      roi_analysis: 'You are an expert agricultural investment advisor. Analyze ROI and provide detailed financial projections for greenhouse projects.',
      climate_analysis: 'You are a climate and agricultural meteorology expert. Analyze climate conditions and provide greenhouse management recommendations.',
      equipment_selection: 'You are a greenhouse equipment specialist. Recommend optimal equipment and systems for greenhouse operations.',
      market_analysis: 'You are a market research expert for agricultural products. Analyze market conditions and opportunities.',
      layout_planning: 'You are a greenhouse design expert. Provide optimal layout and space planning recommendations.',
      consultation: 'You are an experienced greenhouse farming consultant. Provide comprehensive advice and guidance.'
    };

    return systemMessages[sessionType] || systemMessages.general;
  }

  /**
   * Get usage type from session type
   */
  private getUsageTypeFromSessionType(sessionType: ChatSessionType): AIUsageType {
    const typeMapping = {
      general: 'chat' as AIUsageType,
      roi_analysis: 'analysis' as AIUsageType,
      climate_analysis: 'analysis' as AIUsageType,
      equipment_selection: 'analysis' as AIUsageType,
      market_analysis: 'analysis' as AIUsageType,
      layout_planning: 'analysis' as AIUsageType,
      consultation: 'chat' as AIUsageType
    };

    return typeMapping[sessionType] || 'chat';
  }

  /**
   * Initialize default templates
   */
  async initializeDefaultTemplates(): Promise<void> {
    try {
      // Check if templates already exist
      const { data: existingTemplates } = await this.supabase
        .from('chat_templates')
        .select('name')
        .in('name', DEFAULT_CHAT_TEMPLATES.map(t => t.name));

      // Only insert templates that don't exist
      const templatesToInsert = DEFAULT_CHAT_TEMPLATES.filter(
        template => !existingTemplates?.some(existing => existing.name === template.name)
      );

      if (templatesToInsert.length > 0) {
        await this.supabase
          .from('chat_templates')
          .insert(templatesToInsert.map(template => ({
            ...template,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          })));
      }
    } catch (error) {
      console.error('Failed to initialize default templates:', error);
    }
  }
}

// =====================================================
// SINGLETON INSTANCE
// =====================================================

export const chatService = new ChatService();
export default chatService;
