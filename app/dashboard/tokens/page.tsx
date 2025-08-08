'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/hooks/useAuth';
import { authService } from '@/lib/services/auth-service';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { UserTokens, UserActivityLog } from '@/types/auth';

export const dynamic = 'force-dynamic';

interface TokenPackage {
  id: string;
  name: string;
  tokens: number;
  price: number;
  originalPrice?: number;
  popular?: boolean;
  description: string;
  features: string[];
}

export default function TokensPage() {
  const { user, tokens, refreshTokens, loading } = useAuth();
  const [tokenHistory, setTokenHistory] = useState<UserActivityLog[]>([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [purchaseLoading, setPurchaseLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Token packages
  const tokenPackages: TokenPackage[] = [
    {
      id: 'starter',
      name: 'Başlangıç Paketi',
      tokens: 10,
      price: 29.99,
      description: 'Küçük çiftlikler için ideal',
      features: [
        '10 analiz hakkı',
        'Temel raporlar',
        'Email desteği',
        '30 gün geçerlilik'
      ]
    },
    {
      id: 'professional',
      name: 'Profesyonel',
      tokens: 25,
      price: 69.99,
      originalPrice: 79.99,
      popular: true,
      description: 'Orta ölçekli işletmeler için',
      features: [
        '25 analiz hakkı',
        'Gelişmiş raporlar',
        'Öncelikli destek',
        '60 gün geçerlilik',
        'AI chat desteği'
      ]
    },
    {
      id: 'enterprise',
      name: 'Kurumsal',
      tokens: 50,
      price: 129.99,
      originalPrice: 149.99,
      description: 'Büyük çiftlikler ve şirketler için',
      features: [
        '50 analiz hakkı',
        'Premium raporlar',
        '7/24 telefon desteği',
        '90 gün geçerlilik',
        'Özel AI eğitimi',
        'Mühendis danışmanlığı'
      ]
    },
    {
      id: 'unlimited',
      name: 'Sınırsız',
      tokens: 100,
      price: 199.99,
      originalPrice: 249.99,
      description: 'Sınırsız kullanım isteyenler için',
      features: [
        '100 analiz hakkı',
        'Tüm premium özellikler',
        'Özel hesap yöneticisi',
        '1 yıl geçerlilik',
        'API erişimi',
        'Özel raporlama'
      ]
    }
  ];

  useEffect(() => {
    if (user && !loading) {
      loadTokenData();
    }
  }, [user, loading]);

  const loadTokenData = async () => {
    if (!user) return;

    try {
      setDataLoading(true);
      setError(null);

      // Load token usage history
      const activity = await authService.getUserActivity(user.id, 50, 'payment');

      // Ensure activity is an array before filtering
      const activityArray = Array.isArray(activity) ? activity : [];
      setTokenHistory(activityArray.filter(a =>
        a.activity_type === 'token_used' ||
        a.activity_type === 'token_purchased'
      ));

    } catch (error: any) {
      console.error('Failed to load token data:', error);
      setError('Token verileri yüklenirken hata oluştu');
    } finally {
      setDataLoading(false);
    }
  };

  const handlePurchase = async (packageId: string) => {
    const selectedPackage = tokenPackages.find(p => p.id === packageId);
    if (!selectedPackage || !user) return;

    setPurchaseLoading(packageId);

    try {
      // Simulate purchase process
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Add tokens to user account
      const success = await authService.addTokens(
        user.id, 
        selectedPackage.tokens, 
        selectedPackage.price
      );

      if (success) {
        // Refresh token data
        await refreshTokens();
        await loadTokenData();
        
        // Show success message
        alert(`✅ ${selectedPackage.tokens} token başarıyla hesabınıza eklendi!`);
        
        // Log the purchase
        await authService.logUserActivity(
          user.id,
          'token_purchased',
          'payment',
          {
            package_id: packageId,
            tokens_purchased: selectedPackage.tokens,
            amount_paid: selectedPackage.price
          }
        );
      } else {
        throw new Error('Token satın alma işlemi başarısız');
      }

    } catch (error: any) {
      console.error('Purchase failed:', error);
      alert(`❌ Satın alma hatası: ${error.message}`);
    } finally {
      setPurchaseLoading(null);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getActivityIcon = (activityType: string) => {
    switch (activityType) {
      case 'token_purchased': return '💰';
      case 'token_used': return '🪙';
      default: return '📝';
    }
  };

  const getActivityDescription = (activity: UserActivityLog) => {
    if (activity.activity_type === 'token_purchased') {
      const tokens = activity.details?.tokens_purchased || 'N/A';
      const amount = activity.details?.amount_paid || 'N/A';
      return `${tokens} token satın alındı (${amount} TL)`;
    } else if (activity.activity_type === 'token_used') {
      const tokens = activity.details?.tokens_consumed || 1;
      const purpose = activity.details?.purpose || 'Analiz';
      return `${tokens} token kullanıldı - ${purpose}`;
    }
    return 'Token aktivitesi';
  };

  if (loading || dataLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Token bilgileri yükleniyor...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout 
      title="Token Y��netimi" 
      subtitle="Analiz token'lerinizi yönetin ve yeni paketler satın alın"
    >
      <div className="space-y-8">

        {/* Current Token Status */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-100 rounded-xl p-6 border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">💎 Mevcut Token Durumu</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">{tokens?.remaining_tokens || 0}</p>
                  <p className="text-sm text-gray-600">Kullanılabilir</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-purple-600">{tokens?.used_tokens || 0}</p>
                  <p className="text-sm text-gray-600">Kullanılan</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">{tokens?.total_tokens || 0}</p>
                  <p className="text-sm text-gray-600">Toplam</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-orange-600">
                    {tokens?.expiry_date ? 
                      Math.ceil((new Date(tokens.expiry_date).getTime() - Date.now()) / (1000 * 60 * 60 * 24)) 
                      : '∞'
                    }
                  </p>
                  <p className="text-sm text-gray-600">Gün kaldı</p>
                </div>
              </div>
            </div>
            
            {tokens && tokens.remaining_tokens > 0 && (
              <div className="text-right">
                <div className="w-24 h-24 relative">
                  <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                    <circle 
                      cx="50" 
                      cy="50" 
                      r="40" 
                      fill="transparent" 
                      stroke="#e5e7eb" 
                      strokeWidth="8"
                    />
                    <circle 
                      cx="50" 
                      cy="50" 
                      r="40" 
                      fill="transparent" 
                      stroke="#3b82f6" 
                      strokeWidth="8"
                      strokeDasharray={`${(tokens.remaining_tokens / tokens.total_tokens) * 251.2} 251.2`}
                      strokeDashoffset="0"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-lg font-bold text-blue-600">
                      {Math.round((tokens.remaining_tokens / tokens.total_tokens) * 100)}%
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {tokens && tokens.remaining_tokens <= 5 && (
            <div className="mt-4 p-4 bg-yellow-100 border border-yellow-300 rounded-lg">
              <div className="flex items-center">
                <span className="text-yellow-600 mr-2">⚠️</span>
                <div>
                  <h4 className="text-sm font-medium text-yellow-800">Token Uyarısı</h4>
                  <p className="text-sm text-yellow-700 mt-1">
                    Token bakiyeniz azalıyor. Analiz yapmaya devam etmek için yeni token satın alın.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Token Packages */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">🛒 Token Paketleri</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tokenPackages.map((pkg) => (
              <div 
                key={pkg.id} 
                className={`relative bg-white rounded-xl border-2 transition-all duration-300 hover:shadow-lg ${
                  pkg.popular ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-500 text-white text-xs px-4 py-1 rounded-full">
                      En Popüler
                    </span>
                  </div>
                )}

                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{pkg.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{pkg.description}</p>
                  
                  <div className="text-center mb-4">
                    <div className="text-3xl font-bold text-blue-600 mb-1">
                      {pkg.tokens} Token
                    </div>
                    <div className="flex items-center justify-center space-x-2">
                      {pkg.originalPrice && (
                        <span className="text-gray-400 line-through text-sm">
                          ₺{pkg.originalPrice}
                        </span>
                      )}
                      <span className="text-2xl font-bold text-gray-900">
                        ₺{pkg.price}
                      </span>
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      {(pkg.price / pkg.tokens).toFixed(2)} ₺/token
                    </div>
                  </div>

                  <ul className="space-y-2 mb-6 text-sm">
                    {pkg.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-gray-600">
                        <span className="text-green-500 mr-2">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => handlePurchase(pkg.id)}
                    disabled={purchaseLoading === pkg.id}
                    className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
                      pkg.popular
                        ? 'bg-blue-600 hover:bg-blue-700 text-white'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {purchaseLoading === pkg.id ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></div>
                        Satın Alınıyor...
                      </div>
                    ) : (
                      'Satın Al'
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Token Usage Statistics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Usage History */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">📊 Kullanım Geçmişi</h3>
            
            {tokenHistory.length > 0 ? (
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {tokenHistory.slice(0, 10).map((activity, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="text-2xl">{getActivityIcon(activity.activity_type)}</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">
                        {getActivityDescription(activity)}
                      </p>
                      <p className="text-xs text-gray-500">
                        {formatDate(activity.created_at)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <div className="text-4xl mb-2">📈</div>
                <p className="text-sm">Henüz token aktivitesi yok</p>
                <p className="text-xs mt-1">İlk token satın alımınızı yapın</p>
              </div>
            )}
          </div>

          {/* Token Tips */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">💡 Token İpuçları</h3>
            
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="font-medium text-blue-900 mb-2">Token Tasarrufu</h4>
                <p className="text-sm text-blue-800">
                  Büyük paketler satın alarak token başına daha az ödeyebilirsiniz. 
                  Kurumsal paket %35'e varan tasarruf sağlar.
                </p>
              </div>
              
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <h4 className="font-medium text-green-900 mb-2">Süre Uyarısı</h4>
                <p className="text-sm text-green-800">
                  Token'lerinizin son kullanma tarihi var. Vaktinde kullanmayı unutmayın!
                </p>
              </div>
              
              <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                <h4 className="font-medium text-purple-900 mb-2">Premium Avantajlar</h4>
                <p className="text-sm text-purple-800">
                  Profesyonel ve üzeri paketlerde AI chat desteği ve öncelikli analiz hizmeti.
                </p>
              </div>
              
              <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                <h4 className="font-medium text-orange-900 mb-2">Toplu Analiz</h4>
                <p className="text-sm text-orange-800">
                  Birden fazla analiz yapmayı planlıyorsanız büyük paketler tercih edin.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Help & Support */}
        <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">❓ Yardım & Destek</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-3xl mb-2">📞</div>
              <h4 className="font-medium text-gray-900 mb-1">Telefon Desteği</h4>
              <p className="text-sm text-gray-600 mb-2">
                Profesyonel ve üzeri paketlerde mevcut
              </p>
              <a 
                href="tel:+905551234567" 
                className="text-blue-600 hover:text-blue-500 text-sm font-medium"
              >
                +90 555 123 45 67
              </a>
            </div>
            
            <div className="text-center">
              <div className="text-3xl mb-2">💬</div>
              <h4 className="font-medium text-gray-900 mb-1">Canlı Destek</h4>
              <p className="text-sm text-gray-600 mb-2">
                Anında yardım alın
              </p>
              <a 
                href="/dashboard/help" 
                className="text-blue-600 hover:text-blue-500 text-sm font-medium"
              >
                Canlı Sohbeti Başlat
              </a>
            </div>
            
            <div className="text-center">
              <div className="text-3xl mb-2">📧</div>
              <h4 className="font-medium text-gray-900 mb-1">Email Desteği</h4>
              <p className="text-sm text-gray-600 mb-2">
                24 saat içinde yanıt
              </p>
              <a 
                href="mailto:destek@seragpt.com" 
                className="text-blue-600 hover:text-blue-500 text-sm font-medium"
              >
                destek@seragpt.com
              </a>
            </div>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}
