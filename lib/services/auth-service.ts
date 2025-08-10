// =====================================================
// AUTH SERVICE - ENHANCED WITH API INTEGRATION
// =====================================================
// Service for handling authentication and user management
// operations using both direct database access and API endpoints
// =====================================================

import { supabase } from '@/lib/supabase';
import {
  UserProfile,
  UserTokens,
  UserPreferences,
  UserActivityLog,
  CreateUserProfileRequest,
  UpdateUserProfileRequest,
  UpdateUserPreferencesRequest,
  TokenUsageRequest,
  TokenUsageResponse,
  ActivityType,
  ActivityCategory,
  AUTH_ERROR_CODES
} from '@/types/auth';

class AuthService {
  private baseUrl = '/api';

  // =====================================================
  // API HELPER METHODS
  // =====================================================

  private async apiCall<T>(endpoint: string, options: RequestInit = {}): Promise<{ data: T | null; error: any }> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers
        },
        ...options
      });

      const result = await response.json();

      if (!response.ok) {
        return { data: null, error: result.error || 'API request failed' };
      }

      return { data: result.data || result, error: null };
    } catch (error: any) {
      console.error(`API call failed for ${endpoint}:`, error);
      return { data: null, error: error.message };
    }
  }

  private async getAuthToken(): Promise<string | null> {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      return session?.access_token || null;
    } catch (error) {
      console.error('Failed to get auth token:', error);
      return null;
    }
  }

  // =====================================================
  // USER PROFILE OPERATIONS - API ENHANCED
  // =====================================================

  async getUserProfile(userId: string): Promise<UserProfile | null> {
    try {
      // Try API first
      const token = await this.getAuthToken();
      if (token) {
        const { data, error } = await this.apiCall<UserProfile>('/auth/profile', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        
        if (!error && data) {
          return data;
        }
      }

      // Fallback to direct database access
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.warn('Error fetching user profile:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Failed to fetch user profile:', error);
      return null;
    }
  }

  async createUserProfile(userId: string, profileData: CreateUserProfileRequest): Promise<UserProfile | null> {
    try {
      const token = await this.getAuthToken();
      if (token) {
        // Use API endpoint
        const { data, error } = await this.apiCall<UserProfile>('/auth/profile', {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${token}` },
          body: JSON.stringify(profileData)
        });

        if (!error && data) {
          return data;
        }
      }

      // Fallback to direct database access
      const { data, error } = await supabase
        .from('user_profiles')
        .insert({
          id: userId,
          ...profileData,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .select()
        .single();

      if (error) {
        console.error('Error creating user profile:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Failed to create user profile:', error);
      return null;
    }
  }

  async updateUserProfile(userId: string, updates: UpdateUserProfileRequest): Promise<UserProfile | null> {
    try {
      const token = await this.getAuthToken();
      if (token) {
        // Use API endpoint
        const { data, error } = await this.apiCall<{success: boolean; data: UserProfile; message?: string}>('/auth/profile', {
          method: 'PUT',
          headers: { 'Authorization': `Bearer ${token}` },
          body: JSON.stringify(updates)
        });

        if (error) {
          console.error('API profile update error:', error);
          throw new Error(typeof error === 'string' ? error : error.message || 'API güncelleme başarısız');
        }

        if (data && data.success && data.data) {
          return data.data;
        }
      }

      // Fallback to direct database access
      const { data, error } = await supabase
        .from('user_profiles')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', userId)
        .select()
        .single();

      if (error) {
        console.error('Database profile update error:', error);
        throw new Error(`Profil güncelleme hatası: ${error.message}`);
      }

      return data;
    } catch (error: any) {
      console.error('Failed to update user profile:', error);
      throw error; // Re-throw to let the calling component handle it
    }
  }

  async completeOnboarding(userId: string): Promise<boolean> {
    try {
      return await this.updateUserProfile(userId, {
        onboarding_completed: true
      }) !== null;
    } catch (error) {
      console.error('Failed to complete onboarding:', error);
      return false;
    }
  }

  // =====================================================
  // USER TOKEN OPERATIONS - API ENHANCED
  // =====================================================

  async getUserTokens(userId: string): Promise<UserTokens | null> {
    try {
      const token = await this.getAuthToken();
      if (token) {
        // Use API endpoint
        const { data, error } = await this.apiCall<UserTokens>('/auth/tokens', {
          headers: { 'Authorization': `Bearer ${token}` }
        });

        if (!error && data) {
          return data;
        }
      }

      // Fallback to direct database access
      const { data, error } = await supabase
        .from('user_tokens')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error) {
        console.warn('Error fetching user tokens:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Failed to fetch user tokens:', error);
      return null;
    }
  }

  async consumeTokens(request: TokenUsageRequest): Promise<TokenUsageResponse> {
    try {
      const token = await this.getAuthToken();
      if (token) {
        // Use API endpoint
        const { data, error } = await this.apiCall<TokenUsageResponse>('/auth/tokens', {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${token}` },
          body: JSON.stringify(request)
        });

        if (!error && data) {
          return data;
        }
      }

      // Fallback to direct database access
      const { data, error } = await supabase.rpc('consume_user_token', {
        user_uuid: request.user_id,
        amount: request.amount || 1,
        activity_type_param: request.activity_type,
        resource_type_param: request.resource_type,
        resource_id_param: request.resource_id
      });

      if (error) {
        console.error('Error consuming tokens:', error);
        return {
          success: false,
          remaining_tokens: 0,
          error: error.message
        };
      }

      if (data) {
        const tokens = await this.getUserTokens(request.user_id);
        return {
          success: true,
          remaining_tokens: tokens?.remaining_tokens || 0
        };
      } else {
        return {
          success: false,
          remaining_tokens: 0,
          error: AUTH_ERROR_CODES.INSUFFICIENT_TOKENS
        };
      }
    } catch (error: any) {
      console.error('Failed to consume tokens:', error);
      return {
        success: false,
        remaining_tokens: 0,
        error: error.message
      };
    }
  }

  async addTokens(userId: string, amount: number, purchasePrice: number = 0): Promise<boolean> {
    try {
      const token = await this.getAuthToken();
      if (token) {
        // Use API endpoint
        const { data, error } = await this.apiCall('/auth/tokens', {
          method: 'PUT',
          headers: { 'Authorization': `Bearer ${token}` },
          body: JSON.stringify({
            amount,
            purchasePrice
          })
        });

        if (!error) {
          return true;
        }
      }

      // Fallback to direct database access
      const { error } = await supabase
        .from('user_tokens')
        .update({
          total_tokens: amount,
          total_purchased: amount,
          total_spent: purchasePrice,
          last_purchase_date: new Date().toISOString(),
          last_purchase_amount: amount,
          last_purchase_price: purchasePrice,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', userId);

      if (error) {
        console.error('Error adding tokens:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Failed to add tokens:', error);
      return false;
    }
  }

  // =====================================================
  // USER PREFERENCES OPERATIONS - API ENHANCED
  // =====================================================

  async getUserPreferences(userId: string): Promise<UserPreferences | null> {
    try {
      const token = await this.getAuthToken();
      if (token) {
        // Use API endpoint
        const { data, error } = await this.apiCall<UserPreferences>('/auth/preferences', {
          headers: { 'Authorization': `Bearer ${token}` }
        });

        if (!error && data) {
          return data;
        }
      }

      // Fallback to direct database access
      const { data, error } = await supabase
        .from('user_preferences')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error) {
        console.warn('Error fetching user preferences:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Failed to fetch user preferences:', error);
      return null;
    }
  }

  async updateUserPreferences(userId: string, updates: UpdateUserPreferencesRequest): Promise<UserPreferences | null> {
    try {
      const token = await this.getAuthToken();
      if (token) {
        // Use API endpoint
        const { data, error } = await this.apiCall<UserPreferences>('/auth/preferences', {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${token}` },
          body: JSON.stringify(updates)
        });

        if (!error && data) {
          return data;
        }
      }

      // Fallback to direct database access
      const { data, error } = await supabase
        .from('user_preferences')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', userId)
        .select()
        .single();

      if (error) {
        console.error('Error updating user preferences:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Failed to update user preferences:', error);
      return null;
    }
  }

  async resetUserPreferences(userId: string): Promise<UserPreferences | null> {
    try {
      const token = await this.getAuthToken();
      if (token) {
        // Use API endpoint
        const { data, error } = await this.apiCall<UserPreferences>('/auth/preferences', {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` }
        });

        if (!error && data) {
          return data;
        }
      }

      // Fallback: Update with default values
      const defaultPreferences: UpdateUserPreferencesRequest = {
        theme: 'light',
        dashboard_layout: 'default',
        email_notifications: true,
        push_notifications: false,
        sms_notifications: false,
        analysis_completed: true,
        price_alerts: false,
        weather_alerts: true,
        system_updates: true,
        marketing_emails: false,
        default_currency: 'TRY',
        default_units: 'metric',
        pdf_template: 'standard'
      };

      return await this.updateUserPreferences(userId, defaultPreferences);
    } catch (error) {
      console.error('Failed to reset user preferences:', error);
      return null;
    }
  }

  // =====================================================
  // SESSION MANAGEMENT
  // =====================================================

  async createUserSession(userId: string, sessionData: {
    session_token: string;
    refresh_token?: string;
    device_info?: Record<string, any>;
    ip_address?: string;
    user_agent?: string;
    location_info?: Record<string, any>;
    expires_at: string;
  }): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('user_sessions')
        .insert({
          user_id: userId,
          ...sessionData,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        });

      if (error) {
        console.error('Error creating user session:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Failed to create user session:', error);
      return false;
    }
  }

  async updateSessionActivity(sessionToken: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('user_sessions')
        .update({
          last_activity: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .eq('session_token', sessionToken);

      if (error) {
        console.error('Error updating session activity:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Failed to update session activity:', error);
      return false;
    }
  }

  async endUserSession(sessionToken: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('user_sessions')
        .update({
          is_active: false,
          logged_out_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .eq('session_token', sessionToken);

      if (error) {
        console.error('Error ending user session:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Failed to end user session:', error);
      return false;
    }
  }

  async cleanupExpiredSessions(): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('user_sessions')
        .update({
          is_active: false,
          updated_at: new Date().toISOString()
        })
        .lt('expires_at', new Date().toISOString())
        .eq('is_active', true);

      if (error) {
        console.error('Error cleaning up expired sessions:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Failed to cleanup expired sessions:', error);
      return false;
    }
  }

  // =====================================================
  // ACTIVITY LOGGING
  // =====================================================

  async logUserActivity(
    userId: string,
    activityType: ActivityType,
    activityCategory: ActivityCategory,
    details: Record<string, any> = {},
    resourceType?: string,
    resourceId?: string
  ): Promise<boolean> {
    try {
      const deviceInfo = typeof window !== 'undefined' ? {
        device_type: /Mobile|Android|iPhone|iPad/.test(navigator.userAgent) ? 'mobile' : 'desktop',
        os: navigator.platform,
        browser: navigator.userAgent.split(' ').pop(),
      } : {};

      const { error } = await supabase
        .from('user_activity_log')
        .insert({
          user_id: userId,
          activity_type: activityType,
          activity_category: activityCategory,
          details: details,
          resource_type: resourceType,
          resource_id: resourceId,
          user_agent: typeof window !== 'undefined' ? navigator.userAgent : undefined,
          device_info: deviceInfo,
          created_at: new Date().toISOString()
        });

      if (error) {
        console.warn('Error logging user activity:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.warn('Failed to log user activity:', error);
      return false;
    }
  }

  async getUserActivity(
    userId: string,
    limit: number = 50,
    activityCategory?: ActivityCategory
  ): Promise<UserActivityLog[]> {
    try {
      let query = supabase
        .from('user_activity_log')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(limit);

      if (activityCategory) {
        query = query.eq('activity_category', activityCategory);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching user activity:', error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('Failed to fetch user activity:', error);
      return [];
    }
  }

  // =====================================================
  // ADMIN OPERATIONS
  // =====================================================

  async getAllUsers(limit: number = 100, offset: number = 0): Promise<UserProfile[]> {
    try {
      const token = await this.getAuthToken();
      if (token) {
        // Use API endpoint
        const { data, error } = await this.apiCall<UserProfile[]>(`/admin/users?limit=${limit}&offset=${offset}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });

        if (!error && data) {
          return data;
        }
      }

      // Fallback to direct database access
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .order('created_at', { ascending: false })
        .range(offset, offset + limit - 1);

      if (error) {
        console.error('Error fetching all users:', error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('Failed to fetch all users:', error);
      return [];
    }
  }

  async updateUserSubscription(
    userId: string,
    subscriptionType: 'free' | 'premium' | 'enterprise' | 'admin',
    startDate?: string,
    endDate?: string
  ): Promise<boolean> {
    try {
      const updates: any = {
        subscription_type: subscriptionType,
        updated_at: new Date().toISOString()
      };

      if (startDate) updates.subscription_start_date = startDate;
      if (endDate) updates.subscription_end_date = endDate;

      const { error } = await supabase
        .from('user_profiles')
        .update(updates)
        .eq('id', userId);

      if (error) {
        console.error('Error updating user subscription:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Failed to update user subscription:', error);
      return false;
    }
  }

  async getUserStats(userId: string): Promise<{
    totalAnalyses: number;
    tokensUsed: number;
    activeSession: boolean;
    lastActivity: string | null;
  }> {
    try {
      // Get token usage
      const tokens = await this.getUserTokens(userId);
      
      // Get recent activity
      const recentActivity = await this.getUserActivity(userId, 1);
      
      // Get analysis count
      const { count: analysisCount } = await supabase
        .from('user_activity_log')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', userId)
        .in('activity_type', ['analysis_created']);

      // Check for active session
      const { data: activeSessions } = await supabase
        .from('user_sessions')
        .select('id')
        .eq('user_id', userId)
        .eq('is_active', true)
        .gt('expires_at', new Date().toISOString())
        .limit(1);

      return {
        totalAnalyses: analysisCount || 0,
        tokensUsed: tokens?.used_tokens || 0,
        activeSession: (activeSessions?.length || 0) > 0,
        lastActivity: recentActivity[0]?.created_at || null
      };
    } catch (error) {
      console.error('Failed to get user stats:', error);
      return {
        totalAnalyses: 0,
        tokensUsed: 0,
        activeSession: false,
        lastActivity: null
      };
    }
  }

  // =====================================================
  // UTILITY METHODS
  // =====================================================

  async resetDailyTokenUsage(): Promise<boolean> {
    try {
      const { error } = await supabase.rpc('reset_daily_token_usage');
      
      if (error) {
        console.error('Error resetting daily token usage:', error);
        return false;
      }
      
      return true;
    } catch (error) {
      console.error('Failed to reset daily token usage:', error);
      return false;
    }
  }

  async resetMonthlyTokenUsage(): Promise<boolean> {
    try {
      const { error } = await supabase.rpc('reset_monthly_token_usage');
      
      if (error) {
        console.error('Error resetting monthly token usage:', error);
        return false;
      }
      
      return true;
    } catch (error) {
      console.error('Failed to reset monthly token usage:', error);
      return false;
    }
  }

  // =====================================================
  // AUTH STATUS OPERATIONS - NEW API INTEGRATION
  // =====================================================

  async getAuthStatus(): Promise<{ isAuthenticated: boolean; user: any; profile: any }> {
    try {
      const token = await this.getAuthToken();
      if (!token) {
        return { isAuthenticated: false, user: null, profile: null };
      }

      const { data, error } = await this.apiCall('/auth/status', {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (error) {
        console.warn('Auth status check failed:', error);
        return { isAuthenticated: false, user: null, profile: null };
      }

      return (data as { isAuthenticated: boolean; user: any; profile: any }) || { isAuthenticated: false, user: null, profile: null };
    } catch (error) {
      console.error('Failed to get auth status:', error);
      return { isAuthenticated: false, user: null, profile: null };
    }
  }

  async testAuthConnection(): Promise<{ success: boolean; message: string }> {
    try {
      // For unauthenticated connection test, directly call the API without token
      const response = await fetch(`${this.baseUrl}/auth/test`, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        return { success: false, message: `Connection failed: ${response.status} ${response.statusText}` };
      }

      const data = await response.json();

      // Check if the response indicates successful connection
      if (data.error) {
        return { success: false, message: data.error };
      }

      // If we got here, the API endpoint is reachable
      return {
        success: true,
        message: `Connection successful (Environment: ${data.environment?.NODE_ENV || 'unknown'})`
      };
    } catch (error: any) {
      return { success: false, message: `Network error: ${error.message}` };
    }
  }

  async testAuthConnectionWithToken(): Promise<{ success: boolean; message: string }> {
    try {
      const token = await this.getAuthToken();
      if (!token) {
        return { success: false, message: 'No authentication token available' };
      }

      const { data, error } = await this.apiCall('/auth/test', {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (error) {
        return { success: false, message: error.toString() };
      }

      return (data as { success: boolean; message: string }) || { success: false, message: 'Unknown error' };
    } catch (error: any) {
      return { success: false, message: error.message };
    }
  }
}

// Export singleton instance
export const authService = new AuthService();
