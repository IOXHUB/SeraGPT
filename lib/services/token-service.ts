import { API_CONFIG, ApiResponse } from '../api-config';

export interface TokenPackage {
  id: string;
  name: string;
  description: string;
  tokenCount: number;
  price: number; // TL
  pricePerToken: number;
  discountPercentage: number;
  popular: boolean;
  features: string[];
  validityDays: number;
}

export interface UserTokens {
  userId: string;
  totalTokens: number;
  usedTokens: number;
  remainingTokens: number;
  freeTokens: number;
  purchasedTokens: number;
  expiryDate?: Date;
  lastUsed?: Date;
}

export interface TokenTransaction {
  id: string;
  userId: string;
  type: 'purchase' | 'usage' | 'refund' | 'bonus';
  amount: number;
  description: string;
  analysisType?: 'roi' | 'climate' | 'market' | 'equipment' | 'layout';
  timestamp: Date;
  status: 'completed' | 'pending' | 'failed';
}

export interface PaymentIntent {
  id: string;
  amount: number;
  currency: string;
  clientSecret: string;
  status: 'pending' | 'processing' | 'succeeded' | 'failed';
}

class TokenService {
  private stripePublicKey = API_CONFIG.STRIPE.publicKey;
  private stripeSecretKey = API_CONFIG.STRIPE.secretKey;

  // Token packages configuration
  private readonly tokenPackages: TokenPackage[] = [
    {
      id: 'starter',
      name: 'Başlangıç Paketi',
      description: 'Bireysel kullanıcılar için ideal',
      tokenCount: 10,
      price: 99,
      pricePerToken: 9.9,
      discountPercentage: 0,
      popular: false,
      features: [
        '10 analiz hakkı',
        'Tüm analiz türleri',
        'PDF rapor indirme',
        '30 gün geçerlilik'
      ],
      validityDays: 30
    },
    {
      id: 'professional',
      name: 'Profesyonel Paket',
      description: 'Küçük işletmeler için',
      tokenCount: 25,
      price: 199,
      pricePerToken: 7.96,
      discountPercentage: 20,
      popular: true,
      features: [
        '25 analiz hakkı',
        'Tüm analiz türleri',
        'PDF rapor indirme',
        'AI sohbet desteği',
        '60 gün geçerlilik',
        '%20 indirim'
      ],
      validityDays: 60
    },
    {
      id: 'enterprise',
      name: 'Kurumsal Paket',
      description: 'Büyük işletmeler için',
      tokenCount: 100,
      price: 599,
      pricePerToken: 5.99,
      discountPercentage: 40,
      popular: false,
      features: [
        '100 analiz hakkı',
        'Tüm analiz türleri',
        'PDF rapor indirme',
        'AI sohbet desteği',
        'Öncelikli destek',
        '90 gün geçerlilik',
        '%40 indirim'
      ],
      validityDays: 90
    },
    {
      id: 'unlimited',
      name: 'Sınırsız Paket',
      description: 'Aylık sınırsız kullanım',
      tokenCount: 1000,
      price: 999,
      pricePerToken: 0.999,
      discountPercentage: 90,
      popular: false,
      features: [
        'Sınırsız analiz',
        'Tüm analiz türleri',
        'PDF rapor indirme',
        'AI sohbet desteği',
        'Öncelikli destek',
        'Özel danışmanlık',
        '30 gün geçerlilik'
      ],
      validityDays: 30
    }
  ];

  async getTokenPackages(): Promise<ApiResponse<TokenPackage[]>> {
    try {
      return {
        success: true,
        data: this.tokenPackages
      };
    } catch (error) {
      return {
        success: false,
        error: 'Token paketleri alınamadı'
      };
    }
  }

  async getUserTokens(userId: string): Promise<ApiResponse<UserTokens>> {
    try {
      // In production, fetch from database
      const mockUserTokens: UserTokens = {
        userId,
        totalTokens: 5,
        usedTokens: 0,
        remainingTokens: 5,
        freeTokens: 5,
        purchasedTokens: 0,
        lastUsed: undefined
      };

      return {
        success: true,
        data: mockUserTokens
      };
    } catch (error) {
      return {
        success: false,
        error: 'Kullanıcı jeton bilgileri alınamadı'
      };
    }
  }

  async createPaymentIntent(
    packageId: string,
    userId: string
  ): Promise<ApiResponse<PaymentIntent>> {
    try {
      const tokenPackage = this.tokenPackages.find(pkg => pkg.id === packageId);
      if (!tokenPackage) {
        return {
          success: false,
          error: 'Geçersiz paket ID'
        };
      }

      if (!this.stripeSecretKey) {
        // Mock payment intent for demo
        return {
          success: true,
          data: {
            id: `pi_mock_${Date.now()}`,
            amount: tokenPackage.price * 100, // Convert to kuruş
            currency: 'try',
            clientSecret: `pi_mock_${Date.now()}_secret`,
            status: 'pending'
          }
        };
      }

      // Create Stripe payment intent
      const response = await fetch('https://api.stripe.com/v1/payment_intents', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.stripeSecretKey}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          amount: (tokenPackage.price * 100).toString(), // Convert to kuruş
          currency: 'try',
          'metadata[userId]': userId,
          'metadata[packageId]': packageId,
          'metadata[tokenCount]': tokenPackage.tokenCount.toString(),
        }),
      });

      if (!response.ok) {
        throw new Error('Stripe payment intent creation failed');
      }

      const data = await response.json();

      return {
        success: true,
        data: {
          id: data.id,
          amount: data.amount,
          currency: data.currency,
          clientSecret: data.client_secret,
          status: data.status
        }
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Ödeme oluşturulamadı'
      };
    }
  }

  async processTokenPurchase(
    paymentIntentId: string,
    userId: string,
    packageId: string
  ): Promise<ApiResponse<{ tokensAdded: number; newBalance: number }>> {
    try {
      const tokenPackage = this.tokenPackages.find(pkg => pkg.id === packageId);
      if (!tokenPackage) {
        return {
          success: false,
          error: 'Geçersiz paket ID'
        };
      }

      // In production, verify payment with Stripe and update database
      // For demo, simulate successful purchase
      const currentTokens = await this.getUserTokens(userId);
      if (!currentTokens.success || !currentTokens.data) {
        return {
          success: false,
          error: 'Kullanıcı jeton bilgileri alınamadı'
        };
      }

      const newBalance = currentTokens.data.remainingTokens + tokenPackage.tokenCount;

      // Record transaction
      const transaction: TokenTransaction = {
        id: `txn_${Date.now()}`,
        userId,
        type: 'purchase',
        amount: tokenPackage.tokenCount,
        description: `${tokenPackage.name} satın alımı`,
        timestamp: new Date(),
        status: 'completed'
      };

      // In production, save to database
      console.log('Token purchase transaction:', transaction);

      return {
        success: true,
        data: {
          tokensAdded: tokenPackage.tokenCount,
          newBalance
        }
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Jeton satın alma işlemi başarısız'
      };
    }
  }

  async useToken(
    userId: string,
    analysisType: 'roi' | 'climate' | 'market' | 'equipment' | 'layout',
    description?: string
  ): Promise<ApiResponse<{ remainingTokens: number }>> {
    try {
      const currentTokens = await this.getUserTokens(userId);
      if (!currentTokens.success || !currentTokens.data) {
        return {
          success: false,
          error: 'Kullanıcı jeton bilgileri alınamadı'
        };
      }

      if (currentTokens.data.remainingTokens <= 0) {
        return {
          success: false,
          error: 'Yetersiz jeton bakiyesi'
        };
      }

      // Record token usage
      const transaction: TokenTransaction = {
        id: `usage_${Date.now()}`,
        userId,
        type: 'usage',
        amount: -1,
        description: description || `${analysisType} analizi`,
        analysisType,
        timestamp: new Date(),
        status: 'completed'
      };

      // In production, update database
      console.log('Token usage transaction:', transaction);

      const remainingTokens = currentTokens.data.remainingTokens - 1;

      return {
        success: true,
        data: { remainingTokens }
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Jeton kullanımı başarısız'
      };
    }
  }

  async getTokenHistory(userId: string): Promise<ApiResponse<TokenTransaction[]>> {
    try {
      // Mock transaction history
      const mockTransactions: TokenTransaction[] = [
        {
          id: 'txn_001',
          userId,
          type: 'bonus',
          amount: 5,
          description: 'Kayıt bonusu - Ücretsiz jetonlar',
          timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
          status: 'completed'
        },
        {
          id: 'usage_001',
          userId,
          type: 'usage',
          amount: -1,
          description: 'ROI analizi',
          analysisType: 'roi',
          timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
          status: 'completed'
        }
      ];

      return {
        success: true,
        data: mockTransactions
      };
    } catch (error) {
      return {
        success: false,
        error: 'Jeton geçmişi alınamadı'
      };
    }
  }

  async refundTokens(
    userId: string,
    amount: number,
    reason: string
  ): Promise<ApiResponse<{ newBalance: number }>> {
    try {
      const currentTokens = await this.getUserTokens(userId);
      if (!currentTokens.success || !currentTokens.data) {
        return {
          success: false,
          error: 'Kullanıcı jeton bilgileri alınamadı'
        };
      }

      // Record refund transaction
      const transaction: TokenTransaction = {
        id: `refund_${Date.now()}`,
        userId,
        type: 'refund',
        amount,
        description: `Jeton iadesi: ${reason}`,
        timestamp: new Date(),
        status: 'completed'
      };

      const newBalance = currentTokens.data.remainingTokens + amount;

      return {
        success: true,
        data: { newBalance }
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Jeton iadesi başarısız'
      };
    }
  }

  // Utility methods
  getPackageById(packageId: string): TokenPackage | undefined {
    return this.tokenPackages.find(pkg => pkg.id === packageId);
  }

  calculateSavings(packageId: string): number {
    const tokenPackage = this.getPackageById(packageId);
    if (!tokenPackage) return 0;

    const basePrice = 9.9; // Base price per token
    const totalBasePrice = tokenPackage.tokenCount * basePrice;
    const savings = totalBasePrice - tokenPackage.price;
    
    return Math.max(0, savings);
  }

  isTokenExpired(userTokens: UserTokens): boolean {
    if (!userTokens.expiryDate) return false;
    return new Date() > userTokens.expiryDate;
  }

  getRecommendedPackage(usage: 'light' | 'moderate' | 'heavy'): TokenPackage {
    switch (usage) {
      case 'light':
        return this.tokenPackages[0]; // Starter
      case 'moderate':
        return this.tokenPackages[1]; // Professional
      case 'heavy':
        return this.tokenPackages[2]; // Enterprise
      default:
        return this.tokenPackages[1]; // Professional as default
    }
  }
}

export const tokenService = new TokenService();
