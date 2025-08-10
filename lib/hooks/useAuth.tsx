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
import { authService } from '@/lib/services/auth-service';
import { getSupabaseClient, isSupabaseConfigured } from '@/lib/supabase';

export function useAuth(): AuthContextType {
  const [user, setUser] = useState<ExtendedUser | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [tokens, setTokens] = useState<UserTokens | null>(null);
  const [preferences, setPreferences] = useState<UserPreferences | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const supabase = typeof window !== 'undefined' ? createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  ) : null;

  // Fetch user profile data using API endpoints
  const fetchUserData = useCallback(async (userId: string) => {
    try {
      // Use enhanced auth service that includes API integration
      const [profileData, tokensData, preferencesData] = await Promise.all([
        authService.getUserProfile(userId),
        authService.getUserTokens(userId),
        authService.getUserPreferences(userId)
      ]);

      setProfile(profileData);
      setTokens(tokensData);
      setPreferences(preferencesData);

    } catch (error) {
      console.warn('Error fetching user data:', error);
    }
  }, []);

  // Test authentication status using API
  const testAuthStatus = useCallback(async () => {
    try {
      const result = await authService.getAuthStatus();
      console.log('Auth status check result:', result);
      return result;
    } catch (error) {
      console.warn('Auth status test failed:', error);
      return { isAuthenticated: false, user: null, profile: null };
    }
  }, []);

  useEffect(() => {
    const getUser = async () => {
      try {
        setLoading(true);
        setError(null);

        // Use enhanced development mock system (browser only)
        const isDev = typeof window !== 'undefined' && (
          process.env.NODE_ENV === 'development' ||
          window.location.hostname.includes('fly.dev') ||
          window.location.hostname.includes('builder.my') ||
          window.location.hostname.includes('localhost')
        );

        if (isDev) {
          // Import and initialize development mock system
          const { DevMockSystem, MOCK_TOKENS } = await import('@/lib/utils/dev-mock-system');

          const mockUser = DevMockSystem.getCurrentUser();
          if (mockUser) {
            console.log('🚀 Development mock user found:', mockUser);

            const extendedUser: ExtendedUser = {
              id: mockUser.id,
              email: mockUser.email,
              user_metadata: { role: mockUser.role, name: mockUser.name },
              created_at: new Date('2024-01-01T12:00:00.000Z').toISOString(),
              updated_at: new Date('2024-01-16T15:00:00.000Z').toISOString(),
              aud: 'authenticated',
              app_metadata: {},
              role: 'authenticated'
            } as any;

            setUser(extendedUser);

            // Create comprehensive mock profile data
            const mockProfile: UserProfile = {
              id: mockUser.id,
              full_name: mockUser.name,
              location: { city: 'İstanbul', country: 'Turkey' },
              experience_level: mockUser.role === 'admin' ? 'expert' : 'intermediate',
              subscription_type: mockUser.role === 'admin' ? 'admin' : mockUser.role === 'premium' ? 'premium' : 'free',
              language: 'tr',
              currency: 'TRY',
              timezone: 'Europe/Istanbul',
              marketing_consent: false,
              newsletter_consent: true,
              profile_completed: true,
              email_verified: true,
              phone_verified: mockUser.role !== 'user',
              onboarding_completed: true,
              login_count: 23,
              created_at: new Date('2024-01-01T12:00:00.000Z').toISOString(),
              updated_at: new Date('2024-01-16T15:00:00.000Z').toISOString()
            };
            setProfile(mockProfile);

            // Use mock tokens from development system
            const tokenData = MOCK_TOKENS[mockUser.role];
            const mockTokens: UserTokens = {
              id: `dev-tokens-${mockUser.id}`,
              user_id: mockUser.id,
              total_tokens: tokenData.total,
              used_tokens: tokenData.used,
              remaining_tokens: tokenData.remaining,
              free_tokens_granted: 5,
              free_tokens_used: tokenData.freeUsed,
              total_purchased: tokenData.purchased,
              total_spent: tokenData.purchased * 0.1, // Mock price per token
              last_purchase_amount: tokenData.purchased > 0 ? Math.floor(tokenData.purchased / 2) : 0,
              last_purchase_price: tokenData.purchased > 0 ? tokenData.purchased * 0.05 : 0,
              tokens_used_today: 2,
              tokens_used_this_month: tokenData.used,
              created_at: new Date('2024-01-01T12:00:00.000Z').toISOString(),
              updated_at: new Date('2024-01-16T15:00:00.000Z').toISOString()
            };
            setTokens(mockTokens);

            setLoading(false);
            return;
          }
        }

        // Test authentication status using API first
        const authStatus = await testAuthStatus();
        if (authStatus.isAuthenticated && authStatus.user) {
          setUser(authStatus.user);
          setProfile(authStatus.profile);
          setLoading(false);
          return;
        }

        // Fallback to Supabase session check
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
  }, [supabase.auth, fetchUserData, testAuthStatus]);

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
      const isDev = typeof window !== 'undefined' && (
        process.env.NODE_ENV === 'development' ||
        window.location.hostname.includes('fly.dev') ||
        window.location.hostname.includes('builder.my') ||
        window.location.hostname.includes('localhost')
      );

      if (isDev) {
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

  // Profile management using API endpoints
  const updateProfile = async (updates: UpdateUserProfileRequest) => {
    try {
      if (!user) {
        return { data: null, error: { message: 'User not authenticated' } };
      }

      setError(null);
      
      // Use enhanced auth service
      const data = await authService.updateUserProfile(user.id, updates);

      if (data) {
        setProfile(data);
        await logActivity('profile_updated', { fields: Object.keys(updates) });
        return { data, error: null };
      } else {
        const error = { message: 'Failed to update profile' };
        setError(error.message);
        return { data: null, error };
      }
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
      
      // Use enhanced auth service
      const data = await authService.updateUserPreferences(user.id, updates);

      if (data) {
        setPreferences(data);
        await logActivity('preferences_updated', { fields: Object.keys(updates) });
        return { data, error: null };
      } else {
        const error = { message: 'Failed to update preferences' };
        setError(error.message);
        return { data: null, error };
      }
    } catch (error: any) {
      setError(error.message);
      return { data: null, error };
    }
  };

  // Token management using API endpoints
  const consumeToken = async (amount: number = 1, activityType: ActivityType = 'token_used'): Promise<TokenUsageResponse> => {
    try {
      if (!user) {
        return { success: false, remaining_tokens: 0, error: AUTH_ERROR_CODES.PERMISSION_DENIED };
      }

      // For development, allow unlimited tokens
      const isDev = typeof window !== 'undefined' && (
        process.env.NODE_ENV === 'development' ||
        window.location.hostname.includes('fly.dev') ||
        window.location.hostname.includes('builder.my') ||
        window.location.hostname.includes('localhost')
      );

      if (isDev) {
        await logActivity(activityType, { tokens_consumed: amount });
        return { success: true, remaining_tokens: 999 };
      }

      // Use enhanced auth service
      const result = await authService.consumeTokens({
        user_id: user.id,
        amount,
        activity_type: activityType
      });

      if (result.success) {
        // Refresh token data
        await refreshTokens();
      }

      return result;
    } catch (error: any) {
      setError(error.message);
      return { success: false, remaining_tokens: 0, error: error.message };
    }
  };

  const refreshTokens = async () => {
    if (user) {
      const tokensData = await authService.getUserTokens(user.id);
      setTokens(tokensData);
    }
  };

  // Utility methods
  const isAdmin = () => {
    // Check development bypass in localStorage first
    const isDev = typeof window !== 'undefined' && (
      process.env.NODE_ENV === 'development' ||
      window.location.hostname.includes('fly.dev') ||
      window.location.hostname.includes('builder.my') ||
      window.location.hostname.includes('localhost')
    );

    if (isDev) {
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
    const isDev = typeof window !== 'undefined' && (
      process.env.NODE_ENV === 'development' ||
      window.location.hostname.includes('fly.dev') ||
      window.location.hostname.includes('builder.my') ||
      window.location.hostname.includes('localhost')
    );

    if (isDev) {
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

      // Use enhanced auth service for logging
      await authService.logUserActivity(
        user.id,
        activityType,
        getActivityCategory(activityType),
        details
      );
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
    isAuthenticated: !!user,

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
