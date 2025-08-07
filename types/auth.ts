// =====================================================
// SERAGPT AUTH & USER TYPES
// =====================================================
// TypeScript types and interfaces for user authentication,
// profiles, tokens, and related functionality
// =====================================================

import { User as SupabaseUser } from '@supabase/supabase-js';

// =====================================================
// CORE USER TYPES
// =====================================================

export interface UserProfile {
  id: string; // UUID from auth.users
  
  // Personal Information
  full_name?: string;
  company_name?: string;
  phone?: string;
  
  // Location Information
  location: {
    city?: string;
    district?: string;
    region?: string;
    coordinates?: {
      lat: number;
      lon: number;
    };
  };
  
  // Professional Information
  profession?: 'farmer' | 'consultant' | 'investor' | 'student' | 'researcher' | 'other';
  experience_level: 'beginner' | 'intermediate' | 'expert';
  specialization?: 'greenhouse' | 'hydroponics' | 'organic' | 'precision_farming' | 'other';
  
  // Subscription Information
  subscription_type: 'free' | 'premium' | 'enterprise' | 'admin';
  subscription_start_date?: string;
  subscription_end_date?: string;
  
  // Preferences
  language: 'tr' | 'en';
  currency: 'TRY' | 'USD' | 'EUR';
  timezone: string;
  
  // Marketing & Communication
  marketing_consent: boolean;
  newsletter_consent: boolean;
  
  // Profile Completion & Status
  profile_completed: boolean;
  email_verified: boolean;
  phone_verified: boolean;
  
  // Metadata
  onboarding_completed: boolean;
  last_login_at?: string;
  login_count: number;
  
  // Audit fields
  created_at: string;
  updated_at: string;
}

export interface UserTokens {
  id: string;
  user_id: string;
  
  // Token Balance
  total_tokens: number;
  used_tokens: number;
  remaining_tokens: number; // Generated field
  
  // Free Token Tracking
  free_tokens_granted: number;
  free_tokens_used: number;
  
  // Purchase History Summary
  total_purchased: number;
  total_spent: number;
  
  // Last Purchase Information
  last_purchase_date?: string;
  last_purchase_amount: number;
  last_purchase_price: number;
  
  // Usage Statistics
  tokens_used_today: number;
  tokens_used_this_month: number;
  last_token_usage?: string;
  
  // Token Expiry
  expiry_date?: string;
  
  // Audit fields
  created_at: string;
  updated_at: string;
}

export interface UserSession {
  id: string;
  user_id: string;
  
  // Session Information
  session_token: string;
  refresh_token?: string;
  
  // Device & Browser Information
  device_info: {
    device_type?: 'desktop' | 'mobile' | 'tablet';
    os?: string;
    browser?: string;
    version?: string;
  };
  ip_address?: string;
  user_agent?: string;
  
  // Location Information
  location_info: {
    country?: string;
    city?: string;
    isp?: string;
    timezone?: string;
  };
  
  // Session Status
  is_active: boolean;
  last_activity: string;
  
  // Session Lifecycle
  expires_at: string;
  logged_out_at?: string;
  
  // Audit fields
  created_at: string;
  updated_at: string;
}

export interface UserPreferences {
  id: string;
  user_id: string;
  
  // UI Preferences
  theme: 'light' | 'dark' | 'auto';
  dashboard_layout: 'default' | 'compact' | 'detailed';
  
  // Notification Preferences
  email_notifications: boolean;
  push_notifications: boolean;
  sms_notifications: boolean;
  
  // Notification Types
  analysis_completed: boolean;
  price_alerts: boolean;
  weather_alerts: boolean;
  system_updates: boolean;
  marketing_emails: boolean;
  
  // Report Preferences
  default_currency: 'TRY' | 'USD' | 'EUR';
  default_units: 'metric' | 'imperial';
  pdf_template: 'standard' | 'detailed' | 'minimal';
  
  // Analysis Defaults
  default_location: {
    city?: string;
    district?: string;
    coordinates?: {
      lat: number;
      lon: number;
    };
  };
  preferred_crops: string[];
  default_greenhouse_type: 'plastic' | 'polycarbonate' | 'glass';
  
  // Privacy Preferences
  profile_visibility: 'public' | 'private' | 'contacts';
  data_sharing_consent: boolean;
  analytics_consent: boolean;
  
  // Advanced Settings
  api_access_enabled: boolean;
  webhook_url?: string;
  
  // Custom Settings
  custom_settings: Record<string, any>;
  
  // Audit fields
  created_at: string;
  updated_at: string;
}

export interface UserActivityLog {
  id: string;
  user_id: string;
  
  // Activity Information
  activity_type: ActivityType;
  activity_category: ActivityCategory;
  
  // Activity Details
  details: Record<string, any>;
  resource_type?: string;
  resource_id?: string;
  
  // Context Information
  ip_address?: string;
  user_agent?: string;
  device_info: Record<string, any>;
  
  // Performance Metrics
  duration_ms?: number;
  success: boolean;
  error_message?: string;
  
  // Audit fields
  created_at: string;
}

// =====================================================
// ENUMS AND CONSTANTS
// =====================================================

export type ActivityType = 
  // Authentication
  | 'login'
  | 'logout'
  | 'signup'
  | 'password_reset'
  | 'email_verification'
  
  // Analysis
  | 'analysis_created'
  | 'analysis_viewed'
  | 'analysis_downloaded'
  | 'analysis_shared'
  
  // Tokens
  | 'token_used'
  | 'token_purchased'
  | 'token_expired'
  
  // Profile
  | 'profile_updated'
  | 'preferences_updated'
  | 'subscription_changed'
  
  // Chat
  | 'chat_started'
  | 'chat_message_sent'
  | 'report_selected'
  
  // UI
  | 'page_viewed'
  | 'feature_clicked'
  | 'search_performed';

export type ActivityCategory = 
  | 'auth'
  | 'analysis'
  | 'payment'
  | 'ui'
  | 'chat'
  | 'profile'
  | 'system';

export const SUBSCRIPTION_TYPES = {
  FREE: 'free',
  PREMIUM: 'premium',
  ENTERPRISE: 'enterprise',
  ADMIN: 'admin'
} as const;

export const EXPERIENCE_LEVELS = {
  BEGINNER: 'beginner',
  INTERMEDIATE: 'intermediate',
  EXPERT: 'expert'
} as const;

export const PROFESSIONS = {
  FARMER: 'farmer',
  CONSULTANT: 'consultant',
  INVESTOR: 'investor',
  STUDENT: 'student',
  RESEARCHER: 'researcher',
  OTHER: 'other'
} as const;

export const SPECIALIZATIONS = {
  GREENHOUSE: 'greenhouse',
  HYDROPONICS: 'hydroponics',
  ORGANIC: 'organic',
  PRECISION_FARMING: 'precision_farming',
  OTHER: 'other'
} as const;

// =====================================================
// EXTENDED USER TYPE
// =====================================================

export interface ExtendedUser extends SupabaseUser {
  profile?: UserProfile;
  tokens?: UserTokens;
  preferences?: UserPreferences;
  activeSession?: UserSession;
}

// =====================================================
// DASHBOARD SUMMARY TYPE
// =====================================================

export interface UserDashboardSummary {
  id: string;
  full_name?: string;
  company_name?: string;
  subscription_type: string;
  profile_completed: boolean;
  total_tokens: number;
  used_tokens: number;
  remaining_tokens: number;
  last_token_usage?: string;
  last_login_at?: string;
  user_since: string;
}

// =====================================================
// API REQUEST/RESPONSE TYPES
// =====================================================

export interface CreateUserProfileRequest {
  full_name?: string;
  company_name?: string;
  phone?: string;
  location?: UserProfile['location'];
  profession?: UserProfile['profession'];
  experience_level?: UserProfile['experience_level'];
  specialization?: UserProfile['specialization'];
  language?: UserProfile['language'];
  currency?: UserProfile['currency'];
  marketing_consent?: boolean;
  newsletter_consent?: boolean;
  preferences?: Partial<UserPreferences>;
}

export interface UpdateUserProfileRequest extends Partial<CreateUserProfileRequest> {
  onboarding_completed?: boolean;
  preferences?: Partial<UserPreferences>;
}

export interface UpdateUserPreferencesRequest extends Partial<UserPreferences> {
  // All fields are optional for updates
}

export interface TokenUsageRequest {
  user_id: string;
  amount?: number;
  activity_type: ActivityType;
  resource_type?: string;
  resource_id?: string;
}

export interface TokenUsageResponse {
  success: boolean;
  remaining_tokens: number;
  error?: string;
}

// =====================================================
// AUTH HOOK TYPES
// =====================================================

export interface AuthState {
  user: ExtendedUser | null;
  profile: UserProfile | null;
  tokens: UserTokens | null;
  preferences: UserPreferences | null;
  loading: boolean;
  error: string | null;
}

export interface AuthContextType extends AuthState {
  // Authentication methods
  signIn: (email: string, password: string) => Promise<{ data: any; error: any }>;
  signUp: (email: string, password: string, userData?: CreateUserProfileRequest) => Promise<{ data: any; error: any }>;
  signOut: () => Promise<{ error: any }>;
  resetPassword: (email: string) => Promise<{ data: any; error: any }>;
  
  // Profile methods
  updateProfile: (updates: UpdateUserProfileRequest) => Promise<{ data: UserProfile | null; error: any }>;
  updatePreferences: (updates: UpdateUserPreferencesRequest) => Promise<{ data: UserPreferences | null; error: any }>;
  
  // Token methods
  consumeToken: (amount?: number, activityType?: ActivityType) => Promise<TokenUsageResponse>;
  refreshTokens: () => Promise<void>;
  
  // Utility methods
  isAdmin: () => boolean;
  hasTokens: (amount?: number) => boolean;
  getSubscriptionStatus: () => 'active' | 'expired' | 'none';
  
  // Activity tracking
  logActivity: (activityType: ActivityType, details?: Record<string, any>) => Promise<void>;
}

// =====================================================
// FORM TYPES
// =====================================================

export interface OnboardingFormData {
  step1: {
    full_name: string;
    company_name?: string;
    phone?: string;
  };
  step2: {
    profession: UserProfile['profession'];
    experience_level: UserProfile['experience_level'];
    specialization?: UserProfile['specialization'];
  };
  step3: {
    location: UserProfile['location'];
  };
  step4: {
    preferences: {
      language: UserProfile['language'];
      currency: UserProfile['currency'];
      newsletter_consent: boolean;
      marketing_consent: boolean;
    };
  };
}

export interface LoginFormData {
  email: string;
  password: string;
  remember_me?: boolean;
}

export interface SignupFormData {
  email: string;
  password: string;
  confirm_password: string;
  full_name: string;
  terms_accepted: boolean;
  newsletter_consent?: boolean;
}

export interface ProfileFormData extends Omit<UserProfile, 'id' | 'created_at' | 'updated_at'> {
  // Form-specific fields can be added here
}

export interface PreferencesFormData extends Omit<UserPreferences, 'id' | 'user_id' | 'created_at' | 'updated_at'> {
  // Form-specific fields can be added here
}

// =====================================================
// VALIDATION SCHEMAS (for use with libraries like Zod)
// =====================================================

export interface ValidationRules {
  email: RegExp;
  password: {
    minLength: number;
    mustContain: string[];
  };
  phone: RegExp;
  name: {
    minLength: number;
    maxLength: number;
  };
}

export const VALIDATION_RULES: ValidationRules = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  password: {
    minLength: 8,
    mustContain: ['uppercase', 'lowercase', 'number']
  },
  phone: /^(\+90|0)?[5][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]$/,
  name: {
    minLength: 2,
    maxLength: 100
  }
};

// =====================================================
// ERROR TYPES
// =====================================================

export interface AuthError {
  code: string;
  message: string;
  details?: any;
}

export const AUTH_ERROR_CODES = {
  INVALID_CREDENTIALS: 'invalid_credentials',
  USER_NOT_FOUND: 'user_not_found',
  EMAIL_ALREADY_EXISTS: 'email_already_exists',
  WEAK_PASSWORD: 'weak_password',
  INSUFFICIENT_TOKENS: 'insufficient_tokens',
  PROFILE_INCOMPLETE: 'profile_incomplete',
  PERMISSION_DENIED: 'permission_denied',
  SESSION_EXPIRED: 'session_expired',
  RATE_LIMIT_EXCEEDED: 'rate_limit_exceeded'
} as const;

// =====================================================
// UTILITY TYPES
// =====================================================

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type RequireFields<T, K extends keyof T> = T & Required<Pick<T, K>>;

export type OptionalFields<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
