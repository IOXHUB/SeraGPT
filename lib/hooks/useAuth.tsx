'use client';

import { useEffect, useState, useCallback } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import type { User } from '@supabase/supabase-js';
import {
  ExtendedUser,
  UserProfile,
  UserTokens,
  UserPreferences,
  AuthContextType,
  CreateUserProfileRequest,
  UpdateUserProfileRequest,
  UpdateUserPreferencesRequest,
  TokenUsageResponse,
  ActivityType,
  AUTH_ERROR_CODES
} from '@/types/auth';

export function useAuth(): AuthContextType {
  const [user, setUser] = useState<ExtendedUser | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [tokens, setTokens] = useState<UserTokens | null>(null);
  const [preferences, setPreferences] = useState<UserPreferences | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  // Fetch user profile data
  const fetchUserData = useCallback(async (userId: string) => {
    try {
      // Fetch profile
      const { data: profileData, error: profileError } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (profileError && profileError.code !== 'PGRST116') {
        console.warn('Profile fetch error:', profileError);
      } else {
        setProfile(profileData);
      }

      // Fetch tokens
      const { data: tokensData, error: tokensError } = await supabase
        .from('user_tokens')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (tokensError && tokensError.code !== 'PGRST116') {
        console.warn('Tokens fetch error:', tokensError);
      } else {
        setTokens(tokensData);
      }

      // Fetch preferences
      const { data: preferencesData, error: preferencesError } = await supabase
        .from('user_preferences')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (preferencesError && preferencesError.code !== 'PGRST116') {
        console.warn('Preferences fetch error:', preferencesError);
      } else {
        setPreferences(preferencesData);
      }

    } catch (error) {
      console.warn('Error fetching user data:', error);
    }
  }, [supabase]);

  useEffect(() => {
    const getUser = async () => {
      try {
        setLoading(true);
        setError(null);

        // Check for development bypass in localStorage first (browser only)
        if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
          const devUser = localStorage.getItem('seragpt_user');
          if (devUser) {
            try {
              const parsedUser = JSON.parse(devUser);
              console.log('🚀 Development bypass user found:', parsedUser);

              const mockUser: ExtendedUser = {
                id: parsedUser.id,
                email: parsedUser.email,
                user_metadata: { role: parsedUser.role },
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
                aud: 'authenticated',
                app_metadata: {},
                role: 'authenticated'
              } as any;

              setUser(mockUser);
              // Create mock profile data for development
              const mockProfile: UserProfile = {
                id: parsedUser.id,
                full_name: 'Development User',
                location: {},
                experience_level: 'intermediate',
                subscription_type: parsedUser.role === 'admin' ? 'admin' : 'free',
                language: 'tr',
                currency: 'TRY',
                timezone: 'Europe/Istanbul',
                marketing_consent: false,
                newsletter_consent: false,
                profile_completed: true,
                email_verified: true,
                phone_verified: false,
                onboarding_completed: true,
                login_count: 1,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
              };
              setProfile(mockProfile);

              // Mock tokens
              const mockTokens: UserTokens = {
                id: 'dev-tokens',
                user_id: parsedUser.id,
                total_tokens: 100,
                used_tokens: 10,
                remaining_tokens: 90,
                free_tokens_granted: 5,
                free_tokens_used: 2,
                total_purchased: 95,
                total_spent: 0,
                last_purchase_amount: 0,
                last_purchase_price: 0,
                tokens_used_today: 2,
                tokens_used_this_month: 10,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
              };
              setTokens(mockTokens);

              setLoading(false);
              return;
            } catch (e) {
              console.warn('Failed to parse dev user from localStorage:', e);
            }
          }
        }

        const { data: { session }, error } = await supabase.auth.getSession();
        console.log('useAuth session check:', {
          hasSession: !!session,
          hasUser: !!session?.user,
          error: error?.message,
          userEmail: session?.user?.email
        });

        if (session?.user) {
          const extendedUser: ExtendedUser = session.user;
          setUser(extendedUser);
          await fetchUserData(session.user.id);

          // Update login stats
          try {
            await supabase.rpc('update_user_login_stats', { user_uuid: session.user.id });
          } catch (loginError) {
            console.warn('Failed to update login stats:', loginError);
          }
        } else {
          setUser(null);
          setProfile(null);
          setTokens(null);
          setPreferences(null);
        }

        setLoading(false);
      } catch (error) {
        console.warn('Auth session check failed:', error);
        setError('Authentication check failed');
        setUser(null);
        setProfile(null);
        setTokens(null);
        setPreferences(null);
        setLoading(false);
      }
    };

    getUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state change:', { event, hasUser: !!session?.user });

      if (session?.user) {
        const extendedUser: ExtendedUser = session.user;
        setUser(extendedUser);
        await fetchUserData(session.user.id);
      } else {
        setUser(null);
        setProfile(null);
        setTokens(null);
        setPreferences(null);
      }

      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [supabase.auth, fetchUserData]);

  // Authentication methods
  const signIn = async (email: string, password: string) => {
    try {
      setError(null);
      const result = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (result.error) {
        setError(result.error.message);
      }

      return result;
    } catch (error: any) {
      setError(error.message);
      return { data: null, error };
    }
  };

  const signUp = async (email: string, password: string, userData?: CreateUserProfileRequest) => {
    try {
      setError(null);
      const result = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: userData || {}
        }
      });

      if (result.error) {
        setError(result.error.message);
      }

      return result;
    } catch (error: any) {
      setError(error.message);
      return { data: null, error };
    }
  };

  const signOut = async () => {
    try {
      setError(null);

      // Log activity before signing out
      if (user) {
        await logActivity('logout');
      }

      // Clear localStorage for development
      if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
        localStorage.removeItem('seragpt_user');
      }

      const result = await supabase.auth.signOut();

      // Clear all state
      setUser(null);
      setProfile(null);
      setTokens(null);
      setPreferences(null);

      return result;
    } catch (error: any) {
      setError(error.message);
      return { error };
    }
  };

  const resetPassword = async (email: string) => {
    try {
      setError(null);
      const result = await supabase.auth.resetPasswordForEmail(email);

      if (result.error) {
        setError(result.error.message);
      }

      return result;
    } catch (error: any) {
      setError(error.message);
      return { data: null, error };
    }
  };

  // Profile management
  const updateProfile = async (updates: UpdateUserProfileRequest) => {
    try {
      if (!user) {
        return { data: null, error: { message: 'User not authenticated' } };
      }

      setError(null);
      const { data, error } = await supabase
        .from('user_profiles')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', user.id)
        .select()
        .single();

      if (error) {
        setError(error.message);
        return { data: null, error };
      }

      setProfile(data);
      await logActivity('profile_updated', { fields: Object.keys(updates) });

      return { data, error: null };
    } catch (error: any) {
      setError(error.message);
      return { data: null, error };
    }
  };

  const updatePreferences = async (updates: UpdateUserPreferencesRequest) => {
    try {
      if (!user) {
        return { data: null, error: { message: 'User not authenticated' } };
      }

      setError(null);
      const { data, error } = await supabase
        .from('user_preferences')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) {
        setError(error.message);
        return { data: null, error };
      }

      setPreferences(data);
      await logActivity('preferences_updated', { fields: Object.keys(updates) });

      return { data, error: null };
    } catch (error: any) {
      setError(error.message);
      return { data: null, error };
    }
  };

  // Token management
  const consumeToken = async (amount: number = 1, activityType: ActivityType = 'token_used'): Promise<TokenUsageResponse> => {
    try {
      if (!user) {
        return { success: false, remaining_tokens: 0, error: AUTH_ERROR_CODES.PERMISSION_DENIED };
      }

      // For development, allow unlimited tokens
      if (process.env.NODE_ENV === 'development') {
        await logActivity(activityType, { tokens_consumed: amount });
        return { success: true, remaining_tokens: 999 };
      }

      const { data, error } = await supabase.rpc('consume_user_token', {
        user_uuid: user.id,
        amount: amount,
        activity_type_param: activityType
      });

      if (error) {
        setError(error.message);
        return { success: false, remaining_tokens: tokens?.remaining_tokens || 0, error: error.message };
      }

      if (data) {
        // Refresh token data
        await refreshTokens();
        return { success: true, remaining_tokens: tokens?.remaining_tokens || 0 };
      } else {
        return { success: false, remaining_tokens: tokens?.remaining_tokens || 0, error: AUTH_ERROR_CODES.INSUFFICIENT_TOKENS };
      }
    } catch (error: any) {
      setError(error.message);
      return { success: false, remaining_tokens: 0, error: error.message };
    }
  };

  const refreshTokens = async () => {
    if (user) {
      await fetchUserData(user.id);
    }
  };

  // Utility methods
  const isAdmin = () => {
    // Check development bypass in localStorage first
    if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
      const devUser = localStorage.getItem('seragpt_user');
      if (devUser) {
        try {
          const parsedUser = JSON.parse(devUser);
          if (parsedUser.role === 'admin') {
            return true;
          }
        } catch (e) {}
      }
    }

    const adminEmails = ['admin@seragpt.com', 'info@isitmax.com'];
    return (
      profile?.subscription_type === 'admin' ||
      user?.user_metadata?.role === 'admin' ||
      adminEmails.includes(user?.email || '')
    );
  };

  const hasTokens = (amount: number = 1) => {
    if (process.env.NODE_ENV === 'development') {
      return true; // Unlimited tokens in development
    }
    return (tokens?.remaining_tokens || 0) >= amount;
  };

  const getSubscriptionStatus = () => {
    if (!profile) return 'none';

    if (profile.subscription_type === 'free') return 'none';

    if (profile.subscription_end_date) {
      const endDate = new Date(profile.subscription_end_date);
      return endDate > new Date() ? 'active' : 'expired';
    }

    return 'active';
  };

  // Activity logging
  const logActivity = async (activityType: ActivityType, details: Record<string, any> = {}) => {
    try {
      if (!user) return;

      const deviceInfo = typeof window !== 'undefined' ? {
        device_type: /Mobile|Android|iPhone|iPad/.test(navigator.userAgent) ? 'mobile' : 'desktop',
        os: navigator.platform,
        browser: navigator.userAgent.split(' ').pop(),
      } : {};

      await supabase
        .from('user_activity_log')
        .insert({
          user_id: user.id,
          activity_type: activityType,
          activity_category: getActivityCategory(activityType),
          details: details,
          user_agent: typeof window !== 'undefined' ? navigator.userAgent : undefined,
          device_info: deviceInfo
        });
    } catch (error) {
      console.warn('Failed to log activity:', error);
    }
  };

  const getActivityCategory = (activityType: ActivityType) => {
    if (['login', 'logout', 'signup', 'password_reset', 'email_verification'].includes(activityType)) {
      return 'auth';
    }
    if (['analysis_created', 'analysis_viewed', 'analysis_downloaded', 'analysis_shared'].includes(activityType)) {
      return 'analysis';
    }
    if (['token_used', 'token_purchased', 'token_expired'].includes(activityType)) {
      return 'payment';
    }
    if (['chat_started', 'chat_message_sent', 'report_selected'].includes(activityType)) {
      return 'chat';
    }
    if (['profile_updated', 'preferences_updated', 'subscription_changed'].includes(activityType)) {
      return 'profile';
    }
    return 'ui';
  };

  return {
    // State
    user,
    profile,
    tokens,
    preferences,
    loading,
    error,

    // Authentication methods
    signIn,
    signUp,
    signOut,
    resetPassword,

    // Profile methods
    updateProfile,
    updatePreferences,

    // Token methods
    consumeToken,
    refreshTokens,

    // Utility methods
    isAdmin,
    hasTokens,
    getSubscriptionStatus,

    // Activity tracking
    logActivity
  };
}
