// =====================================================
// PAYMENT SERVICE
// =====================================================
// Comprehensive payment service handling Stripe integration,
// token purchases, subscriptions, and payment management
// Author: SeraGPT Development Team
// Created: 2024-12-01
// =====================================================

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import type {
  PaymentMethod,
  Payment,
  TokenPurchase,
  Subscription,
  CreatePaymentMethodRequest,
  UpdatePaymentMethodRequest,
  CreatePaymentRequest,
  PurchaseTokensRequest,
  CreateSubscriptionRequest,
  UpdateSubscriptionRequest,
  PaymentMethodResponse,
  PaymentMethodsResponse,
  PaymentResponse,
  PaymentsResponse,
  TokenPurchaseResponse,
  TokenPurchasesResponse,
  SubscriptionResponse,
  SubscriptionsResponse,
  PaymentStatistics,
  TokenUsageStatistics,
  SubscriptionStatistics,
  UserPaymentProfile,
  StripePaymentIntentCreateRequest,
  StripePaymentIntentResponse,
  TokenPackage,
  SubscriptionPlan,
  PaymentError,
  PaymentErrorCode,
  PAYMENT_ERROR_CODES
} from '@/types/payment';

// =====================================================
// STRIPE CONFIGURATION
// =====================================================

interface StripeConfig {
  publishableKey: string;
  apiVersion: string;
  webhookSecret: string;
}

// =====================================================
// TOKEN PACKAGES CONFIGURATION
// =====================================================

export const TOKEN_PACKAGES: TokenPackage[] = [
  {
    id: 'starter',
    name: 'Starter Pack',
    description: '1,000 tokens for getting started',
    token_amount: 1000,
    bonus_tokens: 0,
    price_cents: 999, // $9.99
    is_popular: false,
    is_active: true,
    metadata: { category: 'starter' }
  },
  {
    id: 'professional',
    name: 'Professional Pack',
    description: '5,000 tokens with 500 bonus tokens',
    token_amount: 5000,
    bonus_tokens: 500,
    price_cents: 3999, // $39.99
    discount_percentage: 20,
    is_popular: true,
    is_active: true,
    metadata: { category: 'professional' }
  },
  {
    id: 'enterprise',
    name: 'Enterprise Pack',
    description: '20,000 tokens with 3,000 bonus tokens',
    token_amount: 20000,
    bonus_tokens: 3000,
    price_cents: 12999, // $129.99
    discount_percentage: 30,
    is_popular: false,
    is_active: true,
    metadata: { category: 'enterprise' }
  }
];

// =====================================================
// SUBSCRIPTION PLANS CONFIGURATION
// =====================================================

export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: 'free',
    name: 'Free Plan',
    description: 'Basic features with limited tokens',
    plan_type: 'free',
    billing_interval: 'month',
    price_cents: 0,
    currency: 'USD',
    features: {
      monthly_token_allowance: 100,
      analysis_limit: 5,
      report_sharing_enabled: true,
      priority_support: false,
      custom_branding: false,
      api_access: false
    },
    trial_period_days: 0,
    is_popular: false,
    is_active: true,
    metadata: { tier: 'basic' }
  },
  {
    id: 'starter',
    name: 'Starter Plan',
    description: 'Perfect for individuals and small projects',
    plan_type: 'starter',
    billing_interval: 'month',
    price_cents: 1999, // $19.99
    currency: 'USD',
    features: {
      monthly_token_allowance: 1000,
      analysis_limit: 50,
      report_sharing_enabled: true,
      priority_support: false,
      custom_branding: false,
      api_access: false
    },
    trial_period_days: 14,
    is_popular: false,
    is_active: true,
    metadata: { tier: 'starter' }
  },
  {
    id: 'professional',
    name: 'Professional Plan',
    description: 'Advanced features for professionals',
    plan_type: 'professional',
    billing_interval: 'month',
    price_cents: 4999, // $49.99
    currency: 'USD',
    features: {
      monthly_token_allowance: 5000,
      analysis_limit: -1,
      report_sharing_enabled: true,
      priority_support: true,
      custom_branding: true,
      api_access: true
    },
    trial_period_days: 14,
    is_popular: true,
    is_active: true,
    metadata: { tier: 'professional' }
  },
  {
    id: 'enterprise',
    name: 'Enterprise Plan',
    description: 'Unlimited features for large organizations',
    plan_type: 'enterprise',
    billing_interval: 'month',
    price_cents: 9999, // $99.99
    currency: 'USD',
    features: {
      monthly_token_allowance: -1,
      analysis_limit: -1,
      report_sharing_enabled: true,
      priority_support: true,
      custom_branding: true,
      api_access: true
    },
    trial_period_days: 30,
    is_popular: false,
    is_active: true,
    metadata: { tier: 'enterprise' }
  }
];

// =====================================================
// PAYMENT SERVICE CLASS
// =====================================================

export class PaymentService {
  private supabase = createClientComponentClient();
  private stripeConfig: StripeConfig;

  constructor() {
    this.stripeConfig = {
      publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '',
      apiVersion: '2023-10-16',
      webhookSecret: process.env.STRIPE_WEBHOOK_SECRET || ''
    };
  }

  // =====================================================
  // PAYMENT METHODS MANAGEMENT
  // =====================================================

  /**
   * Get all payment methods for a user
   */
  async getPaymentMethods(userId: string): Promise<PaymentMethodsResponse> {
    try {
      const { data, error, count } = await this.supabase
        .from('payment_methods')
        .select('*', { count: 'exact' })
        .eq('user_id', userId)
        .eq('is_active', true)
        .order('is_default', { ascending: false })
        .order('created_at', { ascending: false });

      if (error) {
        return { data: [], error: error.message, total_count: 0 };
      }

      return {
        data: data || [],
        error: null,
        total_count: count || 0
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
   * Get a specific payment method
   */
  async getPaymentMethod(paymentMethodId: string): Promise<PaymentMethodResponse> {
    try {
      const { data, error } = await this.supabase
        .from('payment_methods')
        .select('*')
        .eq('id', paymentMethodId)
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
   * Add a new payment method
   */
  async createPaymentMethod(
    userId: string,
    request: CreatePaymentMethodRequest
  ): Promise<PaymentMethodResponse> {
    try {
      // If this is being set as default, first unset any existing default
      if (request.is_default) {
        await this.supabase
          .from('payment_methods')
          .update({ is_default: false })
          .eq('user_id', userId)
          .eq('is_default', true);
      }

      const { data, error } = await this.supabase
        .from('payment_methods')
        .insert({
          user_id: userId,
          ...request,
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
   * Update a payment method
   */
  async updatePaymentMethod(
    paymentMethodId: string,
    request: UpdatePaymentMethodRequest
  ): Promise<PaymentMethodResponse> {
    try {
      const { data, error } = await this.supabase
        .from('payment_methods')
        .update({
          ...request,
          updated_at: new Date().toISOString()
        })
        .eq('id', paymentMethodId)
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
   * Delete a payment method
   */
  async deletePaymentMethod(paymentMethodId: string): Promise<{ error: string | null }> {
    try {
      const { error } = await this.supabase
        .from('payment_methods')
        .delete()
        .eq('id', paymentMethodId);

      return { error: error?.message || null };
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  // =====================================================
  // PAYMENT PROCESSING
  // =====================================================

  /**
   * Create a new payment
   */
  async createPayment(
    userId: string,
    request: CreatePaymentRequest
  ): Promise<PaymentResponse> {
    try {
      // Generate invoice number
      const invoiceNumber = `INV-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${Math.random().toString(36).substr(2, 8).toUpperCase()}`;

      const { data, error } = await this.supabase
        .from('payments')
        .insert({
          user_id: userId,
          invoice_number: invoiceNumber,
          ...request,
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
   * Get payment by ID
   */
  async getPayment(paymentId: string): Promise<PaymentResponse> {
    try {
      const { data, error } = await this.supabase
        .from('payments')
        .select('*')
        .eq('id', paymentId)
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
   * Get all payments for a user
   */
  async getPayments(userId: string, limit = 50, offset = 0): Promise<PaymentsResponse> {
    try {
      const { data, error, count } = await this.supabase
        .from('payments')
        .select('*', { count: 'exact' })
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .range(offset, offset + limit - 1);

      if (error) {
        return { data: [], error: error.message, total_count: 0, total_amount_cents: 0 };
      }

      const totalAmount = data?.reduce((sum, payment) => sum + payment.amount_cents, 0) || 0;

      return {
        data: data || [],
        error: null,
        total_count: count || 0,
        total_amount_cents: totalAmount
      };
    } catch (error) {
      return {
        data: [],
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        total_count: 0,
        total_amount_cents: 0
      };
    }
  }

  /**
   * Update payment status
   */
  async updatePaymentStatus(
    paymentId: string,
    status: Payment['status'],
    metadata?: Record<string, any>
  ): Promise<PaymentResponse> {
    try {
      const updateData: any = {
        status,
        updated_at: new Date().toISOString()
      };

      if (status === 'succeeded') {
        updateData.processed_at = new Date().toISOString();
      } else if (status === 'failed') {
        updateData.failed_at = new Date().toISOString();
      }

      if (metadata) {
        updateData.metadata = metadata;
      }

      const { data, error } = await this.supabase
        .from('payments')
        .update(updateData)
        .eq('id', paymentId)
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
  // TOKEN PURCHASES
  // =====================================================

  /**
   * Purchase tokens
   */
  async purchaseTokens(
    userId: string,
    request: PurchaseTokensRequest
  ): Promise<TokenPurchaseResponse> {
    try {
      // Get token package details
      const tokenPackage = TOKEN_PACKAGES.find(pkg => pkg.id === request.package_type);
      if (!tokenPackage) {
        return { data: null, error: 'Invalid token package' };
      }

      // Calculate pricing
      const unitPriceCents = Math.floor(tokenPackage.price_cents / tokenPackage.token_amount);
      const totalPriceCents = tokenPackage.price_cents;
      const discountAppliedCents = tokenPackage.discount_percentage 
        ? Math.floor(totalPriceCents * (tokenPackage.discount_percentage / 100))
        : 0;

      // Create payment first
      const paymentRequest: CreatePaymentRequest = {
        payment_method_id: request.payment_method_id,
        amount_cents: totalPriceCents - discountAppliedCents,
        payment_type: 'token_purchase',
        product_type: 'tokens',
        product_quantity: tokenPackage.token_amount,
        description: `Purchase of ${tokenPackage.name}`,
        product_metadata: {
          package_type: request.package_type,
          token_amount: tokenPackage.token_amount,
          bonus_tokens: tokenPackage.bonus_tokens
        },
        metadata: request.metadata || {}
      };

      const paymentResponse = await this.createPayment(userId, paymentRequest);
      if (paymentResponse.error || !paymentResponse.data) {
        return { data: null, error: paymentResponse.error || 'Failed to create payment' };
      }

      // Create token purchase record
      const { data, error } = await this.supabase
        .from('token_purchases')
        .insert({
          user_id: userId,
          payment_id: paymentResponse.data.id,
          token_amount: tokenPackage.token_amount,
          bonus_tokens: tokenPackage.bonus_tokens,
          unit_price_cents: unitPriceCents,
          total_price_cents: totalPriceCents,
          discount_applied_cents: discountAppliedCents,
          package_type: tokenPackage.id,
          package_name: tokenPackage.name,
          package_description: tokenPackage.description,
          promo_code: request.promo_code,
          discount_percentage: tokenPackage.discount_percentage,
          discount_type: tokenPackage.discount_percentage ? 'percentage' : undefined,
          purchase_source: request.purchase_source || 'dashboard',
          tokens_expire_at: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(), // 1 year expiry
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
   * Get token purchases for a user
   */
  async getTokenPurchases(userId: string): Promise<TokenPurchasesResponse> {
    try {
      const { data, error, count } = await this.supabase
        .from('token_purchases')
        .select('*', { count: 'exact' })
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) {
        return { 
          data: [], 
          error: error.message, 
          total_count: 0, 
          total_tokens_purchased: 0,
          total_amount_spent_cents: 0
        };
      }

      const totalTokens = data?.reduce((sum, purchase) => sum + purchase.total_tokens, 0) || 0;
      const totalSpent = data?.reduce((sum, purchase) => sum + purchase.final_price_cents, 0) || 0;

      return {
        data: data || [],
        error: null,
        total_count: count || 0,
        total_tokens_purchased: totalTokens,
        total_amount_spent_cents: totalSpent
      };
    } catch (error) {
      return {
        data: [],
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        total_count: 0,
        total_tokens_purchased: 0,
        total_amount_spent_cents: 0
      };
    }
  }

  /**
   * Allocate tokens from a purchase to user's balance
   */
  async allocateTokens(tokenPurchaseId: string): Promise<{ error: string | null }> {
    try {
      const { data, error } = await this.supabase.rpc('allocate_tokens_from_purchase', {
        p_token_purchase_id: tokenPurchaseId
      });

      if (error) {
        return { error: error.message };
      }

      if (!data) {
        return { error: 'Failed to allocate tokens' };
      }

      return { error: null };
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  // =====================================================
  // SUBSCRIPTION MANAGEMENT
  // =====================================================

  /**
   * Create a new subscription
   */
  async createSubscription(
    userId: string,
    request: CreateSubscriptionRequest
  ): Promise<SubscriptionResponse> {
    try {
      const plan = SUBSCRIPTION_PLANS.find(p => p.plan_type === request.plan_type);
      if (!plan) {
        return { data: null, error: 'Invalid subscription plan' };
      }

      const currentPeriodStart = new Date();
      const currentPeriodEnd = new Date();
      currentPeriodEnd.setMonth(currentPeriodEnd.getMonth() + 1); // Monthly billing

      const { data, error } = await this.supabase
        .from('subscriptions')
        .insert({
          user_id: userId,
          plan_type: plan.plan_type,
          plan_name: plan.name,
          plan_description: plan.description,
          billing_interval: request.billing_interval || plan.billing_interval,
          amount_cents: plan.price_cents,
          currency: plan.currency,
          trial_period_days: request.trial_period_days || plan.trial_period_days,
          current_period_start: currentPeriodStart.toISOString(),
          current_period_end: currentPeriodEnd.toISOString(),
          next_billing_date: currentPeriodEnd.toISOString(),
          monthly_token_allowance: plan.features.monthly_token_allowance,
          analysis_limit: plan.features.analysis_limit,
          report_sharing_enabled: plan.features.report_sharing_enabled,
          priority_support: plan.features.priority_support,
          custom_branding: plan.features.custom_branding,
          api_access: plan.features.api_access,
          promo_code: request.promo_code,
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
   * Get user's active subscription
   */
  async getActiveSubscription(userId: string): Promise<SubscriptionResponse> {
    try {
      const { data, error } = await this.supabase.rpc('get_user_active_subscription', {
        p_user_id: userId
      });

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
   * Get all subscriptions for a user
   */
  async getSubscriptions(userId: string): Promise<SubscriptionsResponse> {
    try {
      const { data, error, count } = await this.supabase
        .from('subscriptions')
        .select('*', { count: 'exact' })
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) {
        return { data: [], error: error.message, total_count: 0 };
      }

      return {
        data: data || [],
        error: null,
        total_count: count || 0
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
   * Update subscription
   */
  async updateSubscription(
    subscriptionId: string,
    request: UpdateSubscriptionRequest
  ): Promise<SubscriptionResponse> {
    try {
      const { data, error } = await this.supabase
        .from('subscriptions')
        .update({
          ...request,
          updated_at: new Date().toISOString()
        })
        .eq('id', subscriptionId)
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
   * Cancel subscription
   */
  async cancelSubscription(
    subscriptionId: string,
    reason?: string,
    feedback?: string
  ): Promise<SubscriptionResponse> {
    try {
      const { data, error } = await this.supabase
        .from('subscriptions')
        .update({
          status: 'canceled',
          cancel_at_period_end: true,
          canceled_at: new Date().toISOString(),
          cancellation_reason: reason,
          cancellation_feedback: feedback,
          updated_at: new Date().toISOString()
        })
        .eq('id', subscriptionId)
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
   * Get payment statistics for a user
   */
  async getPaymentStatistics(userId: string): Promise<PaymentStatistics> {
    try {
      const { data, error } = await this.supabase.rpc('get_payment_stats', {
        p_user_id: userId
      });

      if (error) {
        throw new Error(error.message);
      }

      const stats = data[0] || {};
      return {
        total_payments: stats.total_payments || 0,
        total_amount_cents: parseInt(stats.total_amount_cents) || 0,
        successful_payments: stats.successful_payments || 0,
        failed_payments: stats.failed_payments || 0,
        total_refunded_cents: parseInt(stats.total_refunded_cents) || 0,
        last_payment_date: stats.last_payment_date,
        average_payment_amount_cents: stats.total_payments > 0 
          ? Math.floor(parseInt(stats.total_amount_cents) / stats.total_payments)
          : 0,
        payment_success_rate: stats.total_payments > 0
          ? Math.round((stats.successful_payments / stats.total_payments) * 100)
          : 0
      };
    } catch (error) {
      return {
        total_payments: 0,
        total_amount_cents: 0,
        successful_payments: 0,
        failed_payments: 0,
        total_refunded_cents: 0,
        average_payment_amount_cents: 0,
        payment_success_rate: 0
      };
    }
  }

  /**
   * Get token usage statistics for a user
   */
  async getTokenStatistics(userId: string): Promise<TokenUsageStatistics> {
    try {
      const tokenPurchasesResponse = await this.getTokenPurchases(userId);
      const tokenPurchases = tokenPurchasesResponse.data;

      const totalTokensPurchased = tokenPurchases.reduce((sum, purchase) => sum + purchase.total_tokens, 0);
      const totalTokensUsed = tokenPurchases.reduce((sum, purchase) => sum + purchase.tokens_used, 0);
      const tokensRemaining = tokenPurchases.reduce((sum, purchase) => sum + purchase.tokens_remaining, 0);
      const totalAmountSpent = tokenPurchases.reduce((sum, purchase) => sum + purchase.final_price_cents, 0);

      const expiringTokens = tokenPurchases.filter(purchase => {
        if (!purchase.tokens_expire_at) return false;
        const expiryDate = new Date(purchase.tokens_expire_at);
        const thirtyDaysFromNow = new Date();
        thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);
        return expiryDate <= thirtyDaysFromNow && purchase.tokens_remaining > 0;
      });

      const expiringTokensCount = expiringTokens.reduce((sum, purchase) => sum + purchase.tokens_remaining, 0);

      return {
        total_tokens_purchased: totalTokensPurchased,
        total_tokens_used: totalTokensUsed,
        tokens_remaining: tokensRemaining,
        total_amount_spent_cents: totalAmountSpent,
        average_cost_per_token_cents: totalTokensPurchased > 0 
          ? Math.floor(totalAmountSpent / totalTokensPurchased)
          : 0,
        first_purchase_date: tokenPurchases.length > 0 
          ? tokenPurchases[tokenPurchases.length - 1].created_at
          : undefined,
        last_purchase_date: tokenPurchases.length > 0
          ? tokenPurchases[0].created_at
          : undefined,
        expiring_tokens_count: expiringTokensCount
      };
    } catch (error) {
      return {
        total_tokens_purchased: 0,
        total_tokens_used: 0,
        tokens_remaining: 0,
        total_amount_spent_cents: 0,
        average_cost_per_token_cents: 0,
        expiring_tokens_count: 0
      };
    }
  }

  /**
   * Get subscription statistics for a user
   */
  async getSubscriptionStatistics(userId: string): Promise<SubscriptionStatistics> {
    try {
      const subscriptionResponse = await this.getActiveSubscription(userId);
      const subscription = subscriptionResponse.data;

      if (!subscription) {
        return {
          current_plan: 'free',
          is_active: false,
          usage_this_period: {
            tokens_used: 0,
            tokens_remaining: 0,
            analyses_created: 0,
            analyses_remaining: 0
          },
          billing_info: {
            next_billing_amount_cents: 0,
            billing_interval: 'month'
          }
        };
      }

      const currentPeriodEnd = new Date(subscription.current_period_end);
      const now = new Date();
      const daysRemaining = Math.ceil((currentPeriodEnd.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

      return {
        current_plan: subscription.plan_type,
        is_active: subscription.status === 'active' || subscription.status === 'trialing',
        days_remaining: daysRemaining > 0 ? daysRemaining : 0,
        usage_this_period: {
          tokens_used: subscription.tokens_used_this_period,
          tokens_remaining: subscription.monthly_token_allowance === -1 
            ? -1 
            : Math.max(0, subscription.monthly_token_allowance - subscription.tokens_used_this_period),
          analyses_created: subscription.analyses_created_this_period,
          analyses_remaining: subscription.analysis_limit === -1
            ? -1
            : Math.max(0, subscription.analysis_limit - subscription.analyses_created_this_period)
        },
        billing_info: {
          next_billing_date: subscription.next_billing_date,
          next_billing_amount_cents: subscription.amount_cents,
          billing_interval: subscription.billing_interval
        }
      };
    } catch (error) {
      return {
        current_plan: 'free',
        is_active: false,
        usage_this_period: {
          tokens_used: 0,
          tokens_remaining: 0,
          analyses_created: 0,
          analyses_remaining: 0
        },
        billing_info: {
          next_billing_amount_cents: 0,
          billing_interval: 'month'
        }
      };
    }
  }

  /**
   * Get comprehensive user payment profile
   */
  async getUserPaymentProfile(userId: string): Promise<UserPaymentProfile> {
    try {
      const [paymentStats, tokenStats, subscriptionStats, paymentMethodsResponse] = await Promise.all([
        this.getPaymentStatistics(userId),
        this.getTokenStatistics(userId),
        this.getSubscriptionStatistics(userId),
        this.getPaymentMethods(userId)
      ]);

      const defaultPaymentMethod = paymentMethodsResponse.data.find(pm => pm.is_default);

      return {
        payment_statistics: paymentStats,
        token_statistics: tokenStats,
        subscription_statistics: subscriptionStats,
        default_payment_method: defaultPaymentMethod,
        risk_profile: {
          overall_risk_score: paymentStats.total_payments > 0 
            ? Math.max(0, 100 - paymentStats.payment_success_rate)
            : 0,
          payment_failure_rate: paymentStats.total_payments > 0
            ? Math.round((paymentStats.failed_payments / paymentStats.total_payments) * 100)
            : 0,
          fraud_flags: []
        }
      };
    } catch (error) {
      throw new Error(`Failed to get user payment profile: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  // =====================================================
  // UTILITY METHODS
  // =====================================================

  /**
   * Get available token packages
   */
  getTokenPackages(): TokenPackage[] {
    return TOKEN_PACKAGES.filter(pkg => pkg.is_active);
  }

  /**
   * Get available subscription plans
   */
  getSubscriptionPlans(): SubscriptionPlan[] {
    return SUBSCRIPTION_PLANS.filter(plan => plan.is_active);
  }

  /**
   * Calculate token package pricing with discounts
   */
  calculateTokenPackagePricing(packageId: string, promoCode?: string) {
    const tokenPackage = TOKEN_PACKAGES.find(pkg => pkg.id === packageId);
    if (!tokenPackage) {
      throw new Error('Invalid token package');
    }

    const basePriceCents = tokenPackage.price_cents;
    const discountPercentage = tokenPackage.discount_percentage || 0;
    const discountAmountCents = Math.floor(basePriceCents * (discountPercentage / 100));
    const finalPriceCents = basePriceCents - discountAmountCents;

    return {
      package: tokenPackage,
      base_price_cents: basePriceCents,
      discount_percentage: discountPercentage,
      discount_amount_cents: discountAmountCents,
      final_price_cents: finalPriceCents,
      total_tokens: tokenPackage.token_amount + tokenPackage.bonus_tokens,
      cost_per_token_cents: Math.floor(finalPriceCents / (tokenPackage.token_amount + tokenPackage.bonus_tokens))
    };
  }

  /**
   * Format currency amount for display
   */
  formatCurrency(amountCents: number, currency = 'USD'): string {
    const amount = amountCents / 100;
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount);
  }

  /**
   * Validate payment amount
   */
  validatePaymentAmount(amountCents: number): PaymentError | null {
    if (amountCents < 50) {
      return {
        code: PAYMENT_ERROR_CODES.INVALID_AMOUNT,
        message: 'Payment amount must be at least $0.50',
        type: 'validation'
      };
    }

    if (amountCents > 100000000) {
      return {
        code: PAYMENT_ERROR_CODES.INVALID_AMOUNT,
        message: 'Payment amount cannot exceed $1,000,000',
        type: 'validation'
      };
    }

    return null;
  }
}

// =====================================================
// SINGLETON INSTANCE
// =====================================================

export const paymentService = new PaymentService();
export default paymentService;
