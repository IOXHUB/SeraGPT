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
  badge?: string;
}

export default function TokensPage() {
  const { user, tokens, refreshTokens, loading } = useAuth();
  const [tokenHistory, setTokenHistory] = useState<UserActivityLog[]>([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [purchaseLoading, setPurchaseLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Updated Token packages according to user requirements
  const tokenPackages: TokenPackage[] = [
    {
      id: 'free',
      name: 'Free',
      tokens: 5,
      price: 0,
      badge: 'Ücretsiz',
      description: 'Yeni kullanıcılar için başlangıç paketi',
      features: [
        '5 analiz token\'ı',
        'Her rapor 1 token harcar',
        'AI Asistan ücretsiz kullanım',
        'Temel raporlar',
        'Email desteği'
      ]
    },
    {
      id: 'user',
      name: 'User',
      tokens: 10,
      price: 890,
      description: 'Bireysel kullanıcılar için ideal',
      features: [
        '10 analiz token\'ı',
        'Her rapor 1 token harcar',
        'AI Asistan ücretsiz kullanım',
        'Gelişmiş raporlar',
        'Email desteği',
        '30 gün geçerlilik'
      ]
    },
    {
      id: 'pro',
      name: 'Pro',
      tokens: 50,
      price: 3500,
      popular: true,
      badge: 'En Popüler',
      description: 'Profesyonel kullanıcılar için',
      features: [
        '50 analiz token\'ı',
        'Her rapor 1 token harcar',
        'AI Asistan ücretsiz kullanım',
        'Premium raporlar',
        'Öncelikli email desteği',
        '60 gün geçerlilik',
        'Detaylı analizler'
      ]
    },
    {
      id: 'premium',
      name: 'Premium',
      tokens: 100,
      price: 5500,
      badge: 'En İyi Değer',
      description: 'Kurumsal kullanıcılar için',
      features: [
        '100 analiz token\'ı',
        'Her rapor 1 token harcar',
        'AI Asistan ücretsiz kullanım',
        'Tüm premium özellikler',
        '7/24 telefon desteği',
        '90 gün geçerlilik',
        'Mühendis danışmanlığı',
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

      // Check if we're in development mode
      const isDev = typeof window !== 'undefined' && (
        process.env.NODE_ENV === 'development' ||
        window.location.hostname.includes('fly.dev') ||
        window.location.hostname.includes('builder.my') ||
        window.location.hostname.includes('localhost')
      );

      if (isDev) {
        // Use mock data in development
        const mockActivity = [
          {
            id: '1',
            activity_type: 'token_used',
            activity_category: 'payment',
            details: { tokens_consumed: 1, analysis_type: 'roi' },
            created_at: new Date(Date.now() - 1000 * 60 * 30).toISOString()
          },
          {
            id: '2',
            activity_type: 'token_purchased',
            activity_category: 'payment',
            details: { tokens_purchased: 50, amount_paid: 3500 },
            created_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString()
          },
          {
            id: '3',
            activity_type: 'token_used',
            activity_category: 'payment',
            details: { tokens_consumed: 2, analysis_type: 'climate' },
            created_at: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString()
          }
        ];
        setTokenHistory(mockActivity);
      } else {
        // Load token usage history from API
        const activity = await authService.getUserActivity(user.id, 50, 'payment');

        // Ensure activity is an array before filtering
        const activityArray = Array.isArray(activity) ? activity : [];
        setTokenHistory(activityArray.filter(a =>
          a.activity_type === 'token_used' ||
          a.activity_type === 'token_purchased'
        ));
      }

    } catch (error: any) {
      console.error('Failed to load token data:', error);
      setError('Token verileri yüklenirken hata oluştu');

      // Fallback to empty array to prevent crashes
      setTokenHistory([]);
    } finally {
      setDataLoading(false);
    }
  };

  const handlePurchase = async (packageId: string) => {
    const selectedPackage = tokenPackages.find(p => p.id === packageId);
    if (!selectedPackage || !user) return;

    if (selectedPackage.price === 0) {
      alert('✅ Ücretsiz paket zaten aktif!');
      return;
    }

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
        alert(`✅ ${selectedPackage.tokens} 🧠 token başarıyla hesabınıza eklendi!`);
        
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
      case 'token_used': return '🧠';
      default: return '📝';
    }
  };

  const getActivityDescription = (activity: UserActivityLog) => {
    if (activity.activity_type === 'token_purchased') {
      const tokens = activity.details?.tokens_purchased || 'N/A';
      const amount = activity.details?.amount_paid || 'N/A';
      return `${tokens} 🧠 token satın alındı (${amount} TL)`;
    } else if (activity.activity_type === 'token_used') {
      const tokens = activity.details?.tokens_consumed || 1;
      const purpose = activity.details?.purpose || 'Analiz';
      return `${tokens} 🧠 token kullanıldı - ${purpose}`;
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
      title="Token Yönetimi" 
      subtitle="Analiz token'lerinizi yönetin ve yeni paketler satın alın"
    >
      <div className="space-y-6">

        {/* Current Token Status */}
        <div className="bg-[#f6f8f9] rounded-xl p-6 border border-gray-200 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-[#1e3237] mb-2">🧠 Mevcut Token Durumu</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-[#146448]">{tokens?.remaining_tokens || 0}</p>
                  <p className="text-sm text-[#1e3237]/70">Kullanılabilir</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-[#1e3237]">{tokens?.used_tokens || 0}</p>
                  <p className="text-sm text-[#1e3237]/70">Kullanılan</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-[#146448]">{tokens?.total_tokens || 0}</p>
                  <p className="text-sm text-[#1e3237]/70">Toplam</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-[#baf200]">
                    {tokens?.expiry_date ? 
                      Math.ceil((new Date(tokens.expiry_date).getTime() - Date.now()) / (1000 * 60 * 60 * 24)) 
                      : '∞'
                    }
                  </p>
                  <p className="text-sm text-[#1e3237]/70">Gün kaldı</p>
                </div>
              </div>
            </div>
            
            {tokens && tokens.remaining_tokens > 0 && (
              <div className="text-right hidden md:block">
                <div className="w-20 h-20 relative">
                  <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 100 100">
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
                      stroke="#146448" 
                      strokeWidth="8"
                      strokeDasharray={`${(tokens.remaining_tokens / tokens.total_tokens) * 251.2} 251.2`}
                      strokeDashoffset="0"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-lg font-bold text-[#146448]">
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
                    🧠 Token bakiyeniz azalıyor. Analiz yapmaya devam etmek için yeni token satın alın.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Key Info */}
        <div className="bg-[#f6f8f9] rounded-lg border border-gray-200 p-4 shadow-lg">
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-2">
              <span className="text-lg">🧠</span>
              <span className="text-[#1e3237]/70">Her rapor 1 token harcar</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-lg">🤖</span>
              <span className="text-[#1e3237]/70">AI Asistan ücretsiz</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-lg">📊</span>
              <span className="text-[#1e3237]/70">Tüm analizler aynı fiyat</span>
            </div>
          </div>
        </div>

        {/* Token Packages */}
        <div>
          <h2 className="text-xl font-bold text-[#1e3237] mb-4">🛒 Token Paketleri</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {tokenPackages.map((pkg) => (
              <div 
                key={pkg.id} 
                className={`relative bg-[#f6f8f9] rounded-xl border-2 transition-all duration-300 hover:shadow-md ${
                  pkg.popular ? 'border-[#baf200] ring-2 ring-[#baf200]/20' : 'border-gray-200 hover:border-[#146448]'
                }`}
              >
                {pkg.badge && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className={`text-[#1e3237] text-xs px-3 py-1 rounded-full ${
                      pkg.popular ? 'bg-[#baf200]' : pkg.price === 0 ? 'bg-[#146448] text-white' : 'bg-[#1e3237] text-white'
                    }`}>
                      {pkg.badge}
                    </span>
                  </div>
                )}

                <div className="p-5">
                  <h3 className="text-lg font-bold text-[#1e3237] mb-2">{pkg.name}</h3>
                  <p className="text-[#1e3237]/70 text-sm mb-4">{pkg.description}</p>
                  
                  <div className="text-center mb-4">
                    <div className="text-2xl font-bold text-[#146448] mb-2 flex items-center justify-center">
                      <span className="mr-2">🧠</span>
                      {pkg.tokens}
                    </div>
                    <div className="flex items-center justify-center space-x-2">
                      {pkg.price === 0 ? (
                        <span className="text-2xl font-bold text-[#146448]">Ücretsiz</span>
                      ) : (
                        <span className="text-2xl font-bold text-[#1e3237]">
                          {pkg.price.toLocaleString('tr-TR')} ₺
                        </span>
                      )}
                    </div>
                    {pkg.price > 0 && (
                      <div className="text-sm text-[#1e3237]/60 mt-1">
                        {(pkg.price / pkg.tokens).toFixed(0)} ₺/token
                      </div>
                    )}
                  </div>

                  <ul className="space-y-2 mb-6 text-sm">
                    {pkg.features.map((feature, index) => (
                      <li key={index} className="flex items-start text-gray-600">
                        <span className="text-green-500 mr-2 mt-0.5">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => handlePurchase(pkg.id)}
                    disabled={purchaseLoading === pkg.id || pkg.price === 0}
                    className={`w-full py-2.5 px-4 rounded-lg font-medium transition-all duration-200 text-sm ${
                      pkg.price === 0
                        ? 'bg-[#baf200]/30 text-[#1e3237] cursor-default'
                        : pkg.popular
                        ? 'bg-[#baf200] hover:bg-[#baf200]/90 text-[#1e3237] hover:scale-105'
                        : 'bg-[#146448] hover:bg-[#146448]/90 text-white hover:scale-105'
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {pkg.price === 0 ? (
                      'Aktif Paket'
                    ) : purchaseLoading === pkg.id ? (
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Usage History */}
          <div className="bg-[#f6f8f9] rounded-xl p-6 border border-gray-200 shadow-lg">
            <h3 className="text-lg font-semibold text-[#1e3237] mb-4">📊 Kullanım Geçmişi</h3>
            
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
                <div className="text-4xl mb-2">🧠</div>
                <p className="text-sm">Henüz token aktivitesi yok</p>
                <p className="text-xs mt-1">İlk token satın alımınızı yapın</p>
              </div>
            )}
          </div>

          {/* Token Tips */}
          <div className="bg-[#f6f8f9] rounded-xl p-6 border border-gray-200 shadow-lg">
            <h3 className="text-lg font-semibold text-[#1e3237] mb-4">💡 Token İpuçları</h3>
            
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="font-medium text-blue-900 mb-2">�� Token Tasarrufu</h4>
                <p className="text-sm text-blue-800">
                  Büyük paketler satın alarak token başına daha az ödeyebilirsiniz. 
                  Premium paket en iyi değeri sunar.
                </p>
              </div>
              
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <h4 className="font-medium text-green-900 mb-2">🤖 AI Ücretsiz</h4>
                <p className="text-sm text-green-800">
                  AI Asistan kullanımı tamamen ücretsiz! Raporlar için token gerekir.
                </p>
              </div>
              
              <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                <h4 className="font-medium text-purple-900 mb-2">📊 Eşit Fiyat</h4>
                <p className="text-sm text-purple-800">
                  Tüm raporlar 1 token harcar. ROI, iklim, pazar - hepsi aynı fiyat!
                </p>
              </div>
              
              <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                <h4 className="font-medium text-orange-900 mb-2">⏰ Süre Uyarısı</h4>
                <p className="text-sm text-orange-800">
                  Token'lerinizin son kullanma tarihi var. Vaktinde kullanmayı unutmayın!
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}
