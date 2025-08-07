// =====================================================
// PAYMENT & TOKEN MANAGEMENT TYPES
// =====================================================
// TypeScript interfaces for payment, subscription, and token management
// Author: SeraGPT Development Team
// Created: 2024-12-01
// =====================================================

// =====================================================
// BASE TYPES AND ENUMS
// =====================================================

export type PaymentMethodType = 'card' | 'bank_account' | 'wallet';
export type PaymentProvider = 'stripe' | 'paypal' | 'bank_transfer';
export type CardBrand = 'visa' | 'mastercard' | 'amex' | 'discover' | 'diners' | 'jcb' | 'unionpay' | 'unknown';

export type PaymentStatus = 
  | 'pending' 
  | 'processing' 
  | 'succeeded' 
  | 'failed' 
  | 'canceled' 
  | 'refunded' 
  | 'partially_refunded';

export type PaymentType = 
  | 'token_purchase' 
  | 'subscription' 
  | 'one_time' 
  | 'consulting' 
  | 'premium_feature';

export type SubscriptionStatus = 
  | 'trialing' 
  | 'active' 
  | 'past_due' 
  | 'canceled' 
  | 'unpaid' 
  | 'incomplete' 
  | 'incomplete_expired';

export type SubscriptionPlanType = 
  | 'free' 
  | 'starter' 
  | 'professional' 
  | 'enterprise' 
  | 'custom';

export type BillingInterval = 'day' | 'week' | 'month' | 'year';

export type RiskLevel = 'low' | 'normal' | 'elevated' | 'highest';

export type DiscountType = 'percentage' | 'fixed_amount' | 'bonus_tokens';

export type PurchaseSource = 
  | 'dashboard' 
  | 'api' 
  | 'mobile_app' 
  | 'onboarding' 
  | 'upgrade_prompt' 
  | 'referral';

// =====================================================
// CORE INTERFACES
// =====================================================

export interface BillingAddress {
  street: string;
  city: string;
  state?: string;
  postal_code: string;
  country: string; // ISO country code
}

export interface PaymentMethodBase {
  id: string;
  user_id: string;
  stripe_payment_method_id?: string;
  type: PaymentMethodType;
  provider: PaymentProvider;
  is_default: boolean;
  is_active: boolean;
  country?: string;
  currency: string;
  billing_name?: string;
  billing_email?: string;
  billing_address?: BillingAddress;
  fingerprint?: string;
  security_score: number;
  fraud_score: number;
  metadata: Record<string, any>;
  created_at: string;
  updated_at: string;
  last_used_at?: string;
}

export interface CardPaymentMethod extends PaymentMethodBase {
  type: 'card';
  last_four_digits?: string;
  brand?: CardBrand;
  exp_month?: number;
  exp_year?: number;
}

export interface BankAccountPaymentMethod extends PaymentMethodBase {
  type: 'bank_account';
  bank_name?: string;
  account_type?: 'checking' | 'savings';
  routing_number_last_four?: string;
  account_number_last_four?: string;
}

export interface WalletPaymentMethod extends PaymentMethodBase {
  type: 'wallet';
  wallet_type?: 'paypal' | 'apple_pay' | 'google_pay' | 'samsung_pay';
  wallet_email?: string;
}

export type PaymentMethod = CardPaymentMethod | BankAccountPaymentMethod | WalletPaymentMethod;

// =====================================================
// PAYMENT INTERFACES
// =====================================================

export interface Payment {
  id: string;
  user_id: string;
  payment_method_id?: string;
  
  // Payment identifiers
  stripe_payment_intent_id?: string;
  stripe_charge_id?: string;
  invoice_number?: string;
  
  // Amount details
  amount_cents: number;
  currency: string;
  amount_usd_cents?: number;
  exchange_rate?: number;
  
  // Fee breakdown
  platform_fee_cents: number;
  stripe_fee_cents: number;
  net_amount_cents: number;
  
  // Payment details
  status: PaymentStatus;
  payment_type: PaymentType;
  
  // Product details
  product_type?: string;
  product_quantity: number;
  product_metadata: Record<string, any>;
  
  // Payment method snapshot
  payment_method_type?: PaymentMethodType;
  payment_method_brand?: string;
  payment_method_last_four?: string;
  
  // Transaction details
  description?: string;
  receipt_url?: string;
  receipt_email?: string;
  
  // Refund information
  refunded_amount_cents: number;
  refund_reason?: string;
  refunded_at?: string;
  
  // Risk assessment
  risk_score: number;
  risk_level: RiskLevel;
  
  // Processing details
  processed_at?: string;
  failed_at?: string;
  failure_code?: string;
  failure_message?: string;
  
  // Billing details
  billing_details?: Record<string, any>;
  
  // Metadata and tracking
  metadata: Record<string, any>;
  tracking_id?: string;
  referral_code?: string;
  
  // Timestamps
  created_at: string;
  updated_at: string;
}

// =====================================================
// TOKEN PURCHASE INTERFACES
// =====================================================

export interface TokenPurchase {
  id: string;
  user_id: string;
  payment_id: string;
  
  // Token details
  token_amount: number;
  bonus_tokens: number;
  total_tokens: number;
  
  // Pricing details
  unit_price_cents: number;
  total_price_cents: number;
  discount_applied_cents: number;
  final_price_cents: number;
  
  // Package details
  package_type?: string;
  package_name?: string;
  package_description?: string;
  
  // Promotional details
  promo_code?: string;
  discount_percentage?: number;
  discount_type?: DiscountType;
  
  // Token allocation
  tokens_allocated: boolean;
  allocated_at?: string;
  allocation_details: Record<string, any>;
  
  // Expiry details
  tokens_expire_at?: string;
  expiry_warning_sent: boolean;
  
  // Usage tracking
  tokens_used: number;
  tokens_remaining: number;
  first_token_used_at?: string;
  last_token_used_at?: string;
  
  // Metadata
  purchase_source?: PurchaseSource;
  metadata: Record<string, any>;
  
  // Timestamps
  created_at: string;
  updated_at: string;
}

// =====================================================
// SUBSCRIPTION INTERFACES
// =====================================================

export interface SubscriptionFeatures {
  monthly_token_allowance: number; // -1 means unlimited
  analysis_limit: number; // -1 means unlimited
  report_sharing_enabled: boolean;
  priority_support: boolean;
  custom_branding: boolean;
  api_access: boolean;
}

export interface Subscription {
  id: string;
  user_id: string;
  
  // Stripe subscription details
  stripe_subscription_id?: string;
  stripe_customer_id?: string;
  stripe_product_id?: string;
  stripe_price_id?: string;
  
  // Subscription details
  plan_type: SubscriptionPlanType;
  plan_name: string;
  plan_description?: string;
  
  // Billing details
  billing_interval: BillingInterval;
  billing_interval_count: number;
  amount_cents: number;
  currency: string;
  
  // Trial details
  trial_period_days: number;
  trial_start_at?: string;
  trial_end_at?: string;
  trial_used: boolean;
  
  // Subscription lifecycle
  status: SubscriptionStatus;
  
  // Subscription periods
  current_period_start: string;
  current_period_end: string;
  next_billing_date?: string;
  
  // Cancellation details
  cancel_at_period_end: boolean;
  canceled_at?: string;
  cancellation_reason?: string;
  cancellation_feedback?: string;
  
  // Feature entitlements
  monthly_token_allowance: number;
  analysis_limit: number;
  report_sharing_enabled: boolean;
  priority_support: boolean;
  custom_branding: boolean;
  api_access: boolean;
  
  // Usage tracking
  tokens_used_this_period: number;
  analyses_created_this_period: number;
  last_usage_reset_at: string;
  
  // Discount and promotions
  discount_percentage: number;
  discount_end_date?: string;
  promo_code?: string;
  
  // Notifications
  renewal_reminder_sent: boolean;
  payment_failed_notifications_sent: number;
  
  // Metadata and tracking
  metadata: Record<string, any>;
  created_via: string;
  
  // Timestamps
  created_at: string;
  updated_at: string;
  started_at: string;
  ended_at?: string;
}

// =====================================================
// REQUEST/RESPONSE TYPES
// =====================================================

export interface CreatePaymentMethodRequest {
  stripe_payment_method_id: string;
  type: PaymentMethodType;
  is_default?: boolean;
  billing_name?: string;
  billing_email?: string;
  billing_address?: BillingAddress;
  metadata?: Record<string, any>;
}

export interface UpdatePaymentMethodRequest {
  is_default?: boolean;
  is_active?: boolean;
  billing_name?: string;
  billing_email?: string;
  billing_address?: BillingAddress;
  metadata?: Record<string, any>;
}

export interface CreatePaymentRequest {
  payment_method_id?: string;
  amount_cents: number;
  currency?: string;
  payment_type: PaymentType;
  product_type?: string;
  product_quantity?: number;
  product_metadata?: Record<string, any>;
  description?: string;
  receipt_email?: string;
  metadata?: Record<string, any>;
}

export interface PurchaseTokensRequest {
  package_type: string;
  token_amount: number;
  payment_method_id?: string;
  promo_code?: string;
  purchase_source?: PurchaseSource;
  metadata?: Record<string, any>;
}

export interface CreateSubscriptionRequest {
  plan_type: SubscriptionPlanType;
  billing_interval: BillingInterval;
  payment_method_id?: string;
  promo_code?: string;
  trial_period_days?: number;
  metadata?: Record<string, any>;
}

export interface UpdateSubscriptionRequest {
  plan_type?: SubscriptionPlanType;
  cancel_at_period_end?: boolean;
  cancellation_reason?: string;
  cancellation_feedback?: string;
  metadata?: Record<string, any>;
}

// =====================================================
// RESPONSE TYPES
// =====================================================

export interface PaymentMethodResponse {
  data: PaymentMethod | null;
  error: string | null;
}

export interface PaymentMethodsResponse {
  data: PaymentMethod[];
  error: string | null;
  total_count: number;
}

export interface PaymentResponse {
  data: Payment | null;
  error: string | null;
}

export interface PaymentsResponse {
  data: Payment[];
  error: string | null;
  total_count: number;
  total_amount_cents: number;
}

export interface TokenPurchaseResponse {
  data: TokenPurchase | null;
  error: string | null;
}

export interface TokenPurchasesResponse {
  data: TokenPurchase[];
  error: string | null;
  total_count: number;
  total_tokens_purchased: number;
  total_amount_spent_cents: number;
}

export interface SubscriptionResponse {
  data: Subscription | null;
  error: string | null;
}

export interface SubscriptionsResponse {
  data: Subscription[];
  error: string | null;
  total_count: number;
}

// =====================================================
// ANALYTICS AND STATISTICS TYPES
// =====================================================

export interface PaymentStatistics {
  total_payments: number;
  total_amount_cents: number;
  successful_payments: number;
  failed_payments: number;
  total_refunded_cents: number;
  last_payment_date?: string;
  average_payment_amount_cents: number;
  payment_success_rate: number;
}

export interface TokenUsageStatistics {
  total_tokens_purchased: number;
  total_tokens_used: number;
  tokens_remaining: number;
  total_amount_spent_cents: number;
  average_cost_per_token_cents: number;
  first_purchase_date?: string;
  last_purchase_date?: string;
  expiring_tokens_count: number; // tokens expiring in next 30 days
}

export interface SubscriptionStatistics {
  current_plan: SubscriptionPlanType;
  is_active: boolean;
  days_remaining?: number;
  usage_this_period: {
    tokens_used: number;
    tokens_remaining: number;
    analyses_created: number;
    analyses_remaining: number;
  };
  billing_info: {
    next_billing_date?: string;
    next_billing_amount_cents: number;
    billing_interval: BillingInterval;
  };
}

export interface UserPaymentProfile {
  payment_statistics: PaymentStatistics;
  token_statistics: TokenUsageStatistics;
  subscription_statistics: SubscriptionStatistics;
  default_payment_method?: PaymentMethod;
  risk_profile: {
    overall_risk_score: number;
    payment_failure_rate: number;
    fraud_flags: string[];
  };
}

// =====================================================
// STRIPE INTEGRATION TYPES
// =====================================================

export interface StripePaymentIntentCreateRequest {
  amount: number;
  currency: string;
  payment_method?: string;
  customer?: string;
  description?: string;
  metadata?: Record<string, any>;
  receipt_email?: string;
  setup_future_usage?: 'on_session' | 'off_session';
}

export interface StripePaymentIntentResponse {
  id: string;
  client_secret: string;
  status: string;
  amount: number;
  currency: string;
  metadata: Record<string, any>;
}

export interface StripeCustomerCreateRequest {
  email: string;
  name?: string;
  phone?: string;
  address?: BillingAddress;
  metadata?: Record<string, any>;
}

export interface StripeSubscriptionCreateRequest {
  customer: string;
  items: Array<{
    price: string;
    quantity?: number;
  }>;
  payment_behavior?: 'default_incomplete' | 'allow_incomplete' | 'error_if_incomplete';
  trial_period_days?: number;
  metadata?: Record<string, any>;
  promo_code?: string;
}

// =====================================================
// WEBHOOK TYPES
// =====================================================

export interface StripeWebhookEvent {
  id: string;
  type: string;
  data: {
    object: any;
    previous_attributes?: any;
  };
  created: number;
  livemode: boolean;
  pending_webhooks: number;
  request: {
    id: string;
    idempotency_key?: string;
  };
}

export interface PaymentWebhookHandler {
  handlePaymentSucceeded: (payment: any) => Promise<void>;
  handlePaymentFailed: (payment: any) => Promise<void>;
  handleSubscriptionCreated: (subscription: any) => Promise<void>;
  handleSubscriptionUpdated: (subscription: any) => Promise<void>;
  handleSubscriptionDeleted: (subscription: any) => Promise<void>;
  handleInvoicePaid: (invoice: any) => Promise<void>;
  handleInvoicePaymentFailed: (invoice: any) => Promise<void>;
}

// =====================================================
// VALIDATION SCHEMAS
// =====================================================

export interface TokenPackage {
  id: string;
  name: string;
  description: string;
  token_amount: number;
  bonus_tokens: number;
  price_cents: number;
  discount_percentage?: number;
  is_popular?: boolean;
  is_active: boolean;
  metadata: Record<string, any>;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  plan_type: SubscriptionPlanType;
  billing_interval: BillingInterval;
  price_cents: number;
  currency: string;
  features: SubscriptionFeatures;
  trial_period_days: number;
  is_popular?: boolean;
  is_active: boolean;
  metadata: Record<string, any>;
}

// =====================================================
// UTILITY TYPES
// =====================================================

export interface PaymentError {
  code: string;
  message: string;
  type: 'validation' | 'payment' | 'stripe' | 'network' | 'server';
  details?: Record<string, any>;
}

export interface PaymentFormData {
  amount_cents: number;
  currency: string;
  payment_method_id?: string;
  description?: string;
  metadata?: Record<string, any>;
}

export interface TokenPurchaseFormData {
  package_id: string;
  payment_method_id?: string;
  promo_code?: string;
}

export interface SubscriptionFormData {
  plan_id: string;
  payment_method_id?: string;
  promo_code?: string;
  billing_interval: BillingInterval;
}

// =====================================================
// API CONFIGURATION
// =====================================================

export interface PaymentAPIConfig {
  stripe_publishable_key: string;
  api_base_url: string;
  webhook_endpoint_secret: string;
  default_currency: string;
  supported_currencies: string[];
  payment_success_redirect_url: string;
  payment_cancel_redirect_url: string;
}

// =====================================================
// CONSTANTS
// =====================================================

export const PAYMENT_CONSTANTS = {
  MIN_PAYMENT_AMOUNT_CENTS: 50, // $0.50 minimum
  MAX_PAYMENT_AMOUNT_CENTS: 100000000, // $1M maximum
  DEFAULT_CURRENCY: 'USD',
  TOKEN_EXPIRY_DAYS: 365,
  DEFAULT_TRIAL_DAYS: 14,
  PAYMENT_TIMEOUT_SECONDS: 300,
  MAX_RETRY_ATTEMPTS: 3,
} as const;

export const RISK_THRESHOLDS = {
  LOW_RISK_SCORE: 25,
  MEDIUM_RISK_SCORE: 50,
  HIGH_RISK_SCORE: 75,
  FRAUD_THRESHOLD: 90,
} as const;

export const PLAN_LIMITS = {
  free: {
    monthly_tokens: 100,
    analysis_limit: 5,
    api_access: false,
  },
  starter: {
    monthly_tokens: 1000,
    analysis_limit: 50,
    api_access: false,
  },
  professional: {
    monthly_tokens: 5000,
    analysis_limit: -1,
    api_access: true,
  },
  enterprise: {
    monthly_tokens: -1,
    analysis_limit: -1,
    api_access: true,
  },
} as const;

// =====================================================
// ERROR CODES
// =====================================================

export const PAYMENT_ERROR_CODES = {
  INVALID_AMOUNT: 'invalid_amount',
  PAYMENT_METHOD_NOT_FOUND: 'payment_method_not_found',
  INSUFFICIENT_FUNDS: 'insufficient_funds',
  PAYMENT_DECLINED: 'payment_declined',
  STRIPE_ERROR: 'stripe_error',
  INVALID_CURRENCY: 'invalid_currency',
  SUBSCRIPTION_NOT_FOUND: 'subscription_not_found',
  PLAN_NOT_FOUND: 'plan_not_found',
  PROMO_CODE_INVALID: 'promo_code_invalid',
  PROMO_CODE_EXPIRED: 'promo_code_expired',
  TOKEN_ALLOCATION_FAILED: 'token_allocation_failed',
  WEBHOOK_VERIFICATION_FAILED: 'webhook_verification_failed',
} as const;

export type PaymentErrorCode = keyof typeof PAYMENT_ERROR_CODES;
