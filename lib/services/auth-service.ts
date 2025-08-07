// =====================================================
// AUTH SERVICE
// =====================================================
// Service for handling authentication and user management
// operations with the database
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
  // =====================================================
  // USER PROFILE OPERATIONS
  // =====================================================

  async getUserProfile(userId: string): Promise<UserProfile | null> {
    try {
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

      // Log profile creation
      await this.logUserActivity(userId, 'profile_updated', 'profile', {
        action: 'profile_created',
        fields: Object.keys(profileData)
      });

      return data;
    } catch (error) {
      console.error('Failed to create user profile:', error);
      return null;
    }
  }

  async updateUserProfile(userId: string, updates: UpdateUserProfileRequest): Promise<UserProfile | null> {
    try {
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
        console.error('Error updating user profile:', error);
        return null;
      }

      // Log profile update
      await this.logUserActivity(userId, 'profile_updated', 'profile', {
        fields: Object.keys(updates)
      });

      return data;
    } catch (error) {
      console.error('Failed to update user profile:', error);
      return null;
    }
  }

  async completeOnboarding(userId: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('user_profiles')
        .update({
          onboarding_completed: true,
          profile_completed: true,
          updated_at: new Date().toISOString()
        })
        .eq('id', userId);

      if (error) {
        console.error('Error completing onboarding:', error);
        return false;
      }

      await this.logUserActivity(userId, 'profile_updated', 'profile', {
        action: 'onboarding_completed'
      });

      return true;
    } catch (error) {
      console.error('Failed to complete onboarding:', error);
      return false;
    }
  }

  // =====================================================
  // USER TOKEN OPERATIONS
  // =====================================================

  async getUserTokens(userId: string): Promise<UserTokens | null> {
    try {
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
      // Call the database function to consume tokens
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
        // Get updated token count
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
      const { error } = await supabase
        .from('user_tokens')
        .update({
          total_tokens: supabase.raw(`total_tokens + ${amount}`),
          total_purchased: supabase.raw(`total_purchased + ${amount}`),
          total_spent: supabase.raw(`total_spent + ${purchasePrice}`),
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

      // Log token purchase
      await this.logUserActivity(userId, 'token_purchased', 'payment', {
        tokens_added: amount,
        price_paid: purchasePrice
      });

      return true;
    } catch (error) {
      console.error('Failed to add tokens:', error);
      return false;
    }
  }

  // =====================================================
  // USER PREFERENCES OPERATIONS
  // =====================================================

  async getUserPreferences(userId: string): Promise<UserPreferences | null> {
    try {
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

      // Log preferences update
      await this.logUserActivity(userId, 'preferences_updated', 'profile', {
        fields: Object.keys(updates)
      });

      return data;
    } catch (error) {
      console.error('Failed to update user preferences:', error);
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

      // Log subscription change
      await this.logUserActivity(userId, 'subscription_changed', 'profile', {
        new_subscription: subscriptionType,
        start_date: startDate,
        end_date: endDate
      });

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
      
      // Get analysis count (you'll need to implement this based on your analysis tables)
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
}

// Export singleton instance
export const authService = new AuthService();
