'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/hooks/useAuth';
import { authService } from '@/lib/services/auth-service';
import { UserTokens, UserActivityLog } from '@/types/auth';
import ClientOnly from '@/components/ui/ClientOnly';

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
  gradient: string;
  icon: string;
  savings?: number;
}

export default function TokensPage() {
  const { user, tokens, refreshTokens, loading, signOut } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [tokenHistory, setTokenHistory] = useState<UserActivityLog[]>([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [purchaseLoading, setPurchaseLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const tokenPackages: TokenPackage[] = [
    {
      id: 'free',
      name: 'Free',
      tokens: 5,
      price: 0,
      badge: 'Ücretsiz',
      description: 'Yeni kullanıcılar için başlangıç paketi',
      gradient: 'from-gray-400 to-gray-600',
      icon: '🆓',
      features: [
        '5 analiz token\'ı',
        'Temel raporlar',
        'AI Asistan ücretsiz',
        'Email desteği',
        '30 gün geçerlilik'
      ]
    },
    {
      id: 'user',
      name: 'User',
      tokens: 10,
      price: 890,
      originalPrice: 1200,
      savings: 25,
      description: 'Bireysel kullanıcılar için ideal paket',
      gradient: 'from-blue-400 to-cyan-600',
      icon: '👤',
      features: [
        '10 analiz token\'ı',
        'Gelişmiş raporlar',
        'AI Asistan ücretsiz',
        'Öncelikli destek',
        '45 gün geçerlilik',
        'PDF raporlar'
      ]
    },
    {
      id: 'pro',
      name: 'Pro',
      tokens: 50,
      price: 3500,
      originalPrice: 5000,
      popular: true,
      savings: 30,
      badge: 'En Popüler',
      description: 'Profesyonel kullanıcılar için güçlü paket',
      gradient: 'from-green-400 to-emerald-600',
      icon: '⚡',
      features: [
        '50 analiz token\'ı',
        'Premium raporlar',
        'AI Asistan ücretsiz',
        'Öncelikli email desteği',
        '75 gün geçerlilik',
        'Detaylı analizler',
        'Telefon desteği'
      ]
    },
    {
      id: 'premium',
      name: 'Premium',
      tokens: 100,
      price: 5500,
      originalPrice: 8000,
      savings: 31,
      badge: 'En İyi Değer',
      description: 'Kurumsal kullanıcılar için sınırsız güç',
      gradient: 'from-purple-400 to-violet-600',
      icon: '👑',
      features: [
        '100 analiz token\'ı',
        'Tüm premium özellikler',
        'AI Asistan ücretsiz',
        '7/24 telefon desteği',
        '120 gün geçerlilik',
        'Gelişmiş raporlama',
        'Özel danışmanlık',
        'API erişimi'
      ]
    }
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !loading && !user) {
      console.log('🚫 Tokens access denied - redirecting to login');
      window.location.href = '/auth/login';
    }
  }, [user, loading, mounted]);

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

      const isDev = process.env.NODE_ENV === 'development';

      if (isDev) {
        const mockActivity = [
          {
            id: '1',
            activity_type: 'token_used',
            activity_category: 'payment',
            details: { tokens_consumed: 1, analysis_type: 'ROI Analizi', purpose: 'ROI Analizi' },
            created_at: '2024-01-16T14:30:00.000Z'
          },
          {
            id: '2',
            activity_type: 'token_purchased',
            activity_category: 'payment',
            details: { tokens_purchased: 50, amount_paid: 3500, package_name: 'Pro' },
            created_at: '2024-01-15T15:00:00.000Z'
          },
          {
            id: '3',
            activity_type: 'token_used',
            activity_category: 'payment',
            details: { tokens_consumed: 1, analysis_type: 'İklim Analizi', purpose: 'İklim Analizi' },
            created_at: '2024-01-16T13:00:00.000Z'
          },
          {
            id: '4',
            activity_type: 'token_used',
            activity_category: 'payment',
            details: { tokens_consumed: 1, analysis_type: 'Pazar Analizi', purpose: 'Pazar Analizi' },
            created_at: '2024-01-16T10:15:00.000Z'
          }
        ];
        setTokenHistory(mockActivity as any);
      } else {
        const activity = await authService.getUserActivity(user.id, 50, 'payment');
        const activityArray = Array.isArray(activity) ? activity : [];
        setTokenHistory(activityArray.filter(a =>
          a.activity_type === 'token_used' ||
          a.activity_type === 'token_purchased'
        ));
      }

    } catch (error: any) {
      console.error('Failed to load token data:', error);
      setError('Token verileri yüklenirken hata oluştu');
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
      await new Promise(resolve => setTimeout(resolve, 2000));

      const success = await authService.addTokens(
        user.id, 
        selectedPackage.tokens, 
        selectedPackage.price
      );

      if (success) {
        await refreshTokens();
        await loadTokenData();
        
        alert(`✅ ${selectedPackage.tokens} 🪙 token başarıyla hesabınıza eklendi!`);
        
        await authService.logUserActivity(
          user.id,
          'token_purchased',
          'payment',
          {
            package_id: packageId,
            tokens_purchased: selectedPackage.tokens,
            amount_paid: selectedPackage.price,
            package_name: selectedPackage.name
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
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('tr-TR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
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
      const packageName = activity.details?.package_name || 'Paket';
      return `${tokens} token satın alındı (${packageName})`;
    } else if (activity.activity_type === 'token_used') {
      const tokens = activity.details?.tokens_consumed || 1;
      const purpose = activity.details?.purpose || activity.details?.analysis_type || 'Analiz';
      return `${tokens} token kullanıldı - ${purpose}`;
    }
    return 'Token aktivitesi';
  };

  const getUsagePercentage = () => {
    if (!tokens || tokens.total_tokens === 0) return 0;
    return Math.round((tokens.remaining_tokens / tokens.total_tokens) * 100);
  };

  const getDaysRemaining = () => {
    if (!tokens?.expiry_date) return '∞';
    const now = new Date();
    const expiry = new Date(tokens.expiry_date);
    const diffTime = expiry.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  if (!loading && !user) {
    window.location.href = '/auth/login';
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#146448] to-[#0f4f37]">
        <div className="text-white text-lg">Yönlendiriliyor...</div>
      </div>
    );
  }

  if (loading || dataLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#146448] to-[#0f4f37]">
        <div className="text-white text-lg">🔐 Yükleniyor...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#146448] to-[#0f4f37]">
        <div className="text-white text-lg">Giriş yapmanız gerekiyor...</div>
      </div>
    );
  }

  return (
    <ClientOnly>
      <div className="min-h-screen bg-gradient-to-br from-[#146448] to-[#0f4f37]">
        {/* Professional Header */}
        <header className="bg-[#146448]/80 backdrop-blur-sm border-b border-white/10 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <button
                  onClick={() => window.location.href = '/dashboard'}
                  className="flex items-center space-x-3 text-white hover:text-[#baf200] transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  <span className="font-medium">Dashboard'a Dön</span>
                </button>
                <div className="h-6 w-px bg-white/20"></div>
                <h1 className="text-xl font-bold text-white">Token Yönetimi</h1>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="text-white text-sm">
                  <span className="opacity-70">Hoşgeldin, </span>
                  <span className="font-medium">{user?.email?.split('@')[0] || 'Kullanıcı'}</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/10 rounded-lg px-3 py-2">
                  <span className="text-[#baf200]">🪙</span>
                  <span className="text-white font-medium">{tokens?.remaining_tokens || 0} Token</span>
                </div>
                <button
                  onClick={async () => {
                    await signOut();
                    window.location.href = '/auth/login';
                  }}
                  className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-sm rounded transition-colors"
                >
                  Çıkış
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
          
          {/* Welcome Section & Current Token Status */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-white mb-4">🪙 Token Yönetim Merkezi</h2>
              <p className="text-white/80 text-lg max-w-3xl mx-auto">
                Analiz token'lerinizi yönetin, kullanım geçmişinizi görüntüleyin ve 
                ihtiyacınıza göre yeni token paketleri satın alın.
              </p>
            </div>
            
            {/* Token Status Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20 hover:bg-white/15 transition-colors">
                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl">
                  🪙
                </div>
                <div className="text-3xl font-bold text-[#baf200] mb-2">{tokens?.remaining_tokens || 0}</div>
                <div className="text-white/80 text-sm">Kullanılabilir Token</div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20 hover:bg-white/15 transition-colors">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl">
                  📊
                </div>
                <div className="text-3xl font-bold text-[#baf200] mb-2">{tokens?.used_tokens || 0}</div>
                <div className="text-white/80 text-sm">Kullanılan Token</div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20 hover:bg-white/15 transition-colors">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-violet-600 rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl">
                  💎
                </div>
                <div className="text-3xl font-bold text-[#baf200] mb-2">{tokens?.total_tokens || 0}</div>
                <div className="text-white/80 text-sm">Toplam Token</div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20 hover:bg-white/15 transition-colors">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl">
                  ⏰
                </div>
                <div className="text-3xl font-bold text-[#baf200] mb-2" suppressHydrationWarning>
                  {getDaysRemaining()}
                </div>
                <div className="text-white/80 text-sm">Gün Kaldı</div>
              </div>
            </div>

            {/* Token Usage Progress */}
            {tokens && tokens.total_tokens > 0 && (
              <div className="mt-8 bg-white/10 rounded-xl p-6 border border-white/20">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white font-semibold">Token Kullanım Durumu</h3>
                  <span className="text-[#baf200] font-bold">{getUsagePercentage()}%</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-4 mb-2">
                  <div 
                    className="h-4 bg-gradient-to-r from-[#baf200] to-green-400 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${getUsagePercentage()}%` }}
                  />
                </div>
                <div className="flex justify-between text-white/70 text-sm">
                  <span>{tokens.remaining_tokens} token kaldı</span>
                  <span>{tokens.total_tokens} toplam token</span>
                </div>
              </div>
            )}

            {/* Low Token Warning */}
            {tokens && tokens.remaining_tokens <= 5 && tokens.remaining_tokens > 0 && (
              <div className="mt-6 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-sm rounded-xl p-6 border border-yellow-500/30">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center text-2xl">
                    ⚠️
                  </div>
                  <div>
                    <h4 className="text-yellow-300 font-bold text-lg mb-2">Token Azalıyor!</h4>
                    <p className="text-yellow-200 text-sm">
                      Sadece {tokens.remaining_tokens} token kaldı. Analizlerinize devam etmek için 
                      yeni token satın almayı düşünün.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Key Information */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <h3 className="text-white font-semibold mb-4 text-center">💡 Token Kullanım Bilgileri</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-3 text-white">
                <div className="w-8 h-8 bg-[#baf200] rounded-full flex items-center justify-center">
                  <span className="text-[#146448] text-sm font-bold">1</span>
                </div>
                <span className="text-sm">Her analiz raporu 1 token harcar</span>
              </div>
              <div className="flex items-center space-x-3 text-white">
                <div className="w-8 h-8 bg-[#baf200] rounded-full flex items-center justify-center">
                  <span className="text-[#146448] text-sm">🤖</span>
                </div>
                <span className="text-sm">AI Asistan tamamen ücretsiz</span>
              </div>
              <div className="flex items-center space-x-3 text-white">
                <div className="w-8 h-8 bg-[#baf200] rounded-full flex items-center justify-center">
                  <span className="text-[#146448] text-sm">⚡</span>
                </div>
                <span className="text-sm">Tüm analizler aynı fiyat</span>
              </div>
            </div>
          </div>

          {/* Token Packages */}
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-3xl font-bold text-white mb-4">💎 Token Paketleri</h3>
              <p className="text-white/80 text-lg">İhtiyacınıza uygun paketi seçin ve analizlerinize hız verin</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {tokenPackages.map((pkg) => (
                <div 
                  key={pkg.id} 
                  className={`relative bg-white/10 backdrop-blur-sm rounded-2xl p-6 border transition-all duration-300 hover:scale-[1.02] cursor-pointer ${
                    pkg.popular 
                      ? 'border-[#baf200] ring-2 ring-[#baf200]/30 hover:ring-[#baf200]/50' 
                      : 'border-white/20 hover:border-white/40'
                  } ${selectedPlan === pkg.id ? 'ring-2 ring-[#baf200]' : ''}`}
                  onClick={() => setSelectedPlan(selectedPlan === pkg.id ? null : pkg.id)}
                >
                  {/* Badge */}
                  {pkg.badge && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                      <span className={`px-4 py-1 text-xs font-bold rounded-full ${
                        pkg.popular 
                          ? 'bg-[#baf200] text-[#146448]' 
                          : pkg.price === 0 
                            ? 'bg-gray-600 text-white' 
                            : 'bg-gradient-to-r from-purple-500 to-violet-600 text-white'
                      }`}>
                        {pkg.badge}
                      </span>
                    </div>
                  )}

                  {/* Package Header */}
                  <div className="text-center mb-6">
                    <div className={`w-20 h-20 bg-gradient-to-br ${pkg.gradient} rounded-2xl flex items-center justify-center mx-auto mb-4 text-3xl`}>
                      {pkg.icon}
                    </div>
                    <h4 className="text-2xl font-bold text-white mb-2">{pkg.name}</h4>
                    <p className="text-white/70 text-sm">{pkg.description}</p>
                  </div>

                  {/* Tokens & Price */}
                  <div className="text-center mb-6">
                    <div className="text-4xl font-bold text-[#baf200] mb-2">{pkg.tokens}</div>
                    <div className="text-white/60 text-sm mb-4">Token</div>
                    
                    <div className="space-y-2">
                      {pkg.price === 0 ? (
                        <div className="text-2xl font-bold text-white">Ücretsiz</div>
                      ) : (
                        <>
                          <div className="flex items-center justify-center space-x-2">
                            <span className="text-2xl font-bold text-white">
                              ₺{pkg.price.toLocaleString('tr-TR')}
                            </span>
                            {pkg.originalPrice && (
                              <span className="text-lg text-white/50 line-through">
                                ₺{pkg.originalPrice.toLocaleString('tr-TR')}
                              </span>
                            )}
                          </div>
                          {pkg.savings && (
                            <div className="text-green-400 text-sm font-medium">
                              %{pkg.savings} tasarruf!
                            </div>
                          )}
                          <div className="text-white/60 text-sm">
                            ₺{(pkg.price / pkg.tokens).toFixed(0)}/token
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-3 mb-6">
                    {pkg.features.map((feature, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="w-5 h-5 bg-[#baf200] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <svg className="w-3 h-3 text-[#146448]" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-white/80 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Purchase Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePurchase(pkg.id);
                    }}
                    disabled={purchaseLoading === pkg.id || pkg.price === 0}
                    className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-300 ${
                      pkg.price === 0
                        ? 'bg-white/20 text-white/60 cursor-default'
                        : pkg.popular
                          ? 'bg-[#baf200] hover:bg-[#baf200]/90 text-[#146448] hover:scale-105 shadow-lg'
                          : 'bg-white/20 hover:bg-white/30 text-white border border-white/30 hover:border-white/50'
                    } disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100`}
                  >
                    {pkg.price === 0 ? (
                      'Aktif Paket'
                    ) : purchaseLoading === pkg.id ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-current mr-2"></div>
                        Satın Alınıyor...
                      </div>
                    ) : (
                      'Satın Al'
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Token History & Tips */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Usage History */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                <span className="mr-3">📊</span>
                Kullanım Geçmişi
              </h3>
              
              {tokenHistory.length > 0 ? (
                <div className="space-y-4 max-h-80 overflow-y-auto">
                  {tokenHistory.slice(0, 10).map((activity, index) => (
                    <div key={index} className="bg-white/10 rounded-xl p-4 flex items-center space-x-4 hover:bg-white/15 transition-colors">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-cyan-600 rounded-xl flex items-center justify-center text-xl">
                        {getActivityIcon(activity.activity_type)}
                      </div>
                      <div className="flex-1">
                        <p className="text-white font-medium text-sm">
                          {getActivityDescription(activity)}
                        </p>
                        <p className="text-white/60 text-xs mt-1">
                          {formatDate(activity.created_at)}
                        </p>
                      </div>
                      {activity.activity_type === 'token_purchased' && (
                        <div className="text-green-400 font-bold text-sm">
                          +{activity.details?.tokens_purchased}
                        </div>
                      )}
                      {activity.activity_type === 'token_used' && (
                        <div className="text-orange-400 font-bold text-sm">
                          -{activity.details?.tokens_consumed || 1}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">📈</span>
                  </div>
                  <h4 className="text-xl font-semibold text-white mb-2">Henüz aktivite yok</h4>
                  <p className="text-white/70 text-sm">İlk token satın alımınızı yapın</p>
                </div>
              )}
            </div>

            {/* Token Tips & Info */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                <span className="mr-3">💡</span>
                Token İpuçları
              </h3>
              
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-xl p-4 border border-blue-500/30">
                  <h4 className="font-semibold text-blue-300 mb-2 flex items-center">
                    <span className="mr-2">💰</span>Token Tasarrufu
                  </h4>
                  <p className="text-blue-200 text-sm">
                    Büyük paketler satın alarak token başına daha az ödeyebilirsiniz. 
                    Premium paket en iyi değeri sunar.
                  </p>
                </div>
                
                <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl p-4 border border-green-500/30">
                  <h4 className="font-semibold text-green-300 mb-2 flex items-center">
                    <span className="mr-2">🤖</span>AI Ücretsiz
                  </h4>
                  <p className="text-green-200 text-sm">
                    AI Asistan kullanımı tamamen ücretsiz! Sadece raporlar için token gerekir.
                  </p>
                </div>
                
                <div className="bg-gradient-to-r from-purple-500/20 to-violet-500/20 rounded-xl p-4 border border-purple-500/30">
                  <h4 className="font-semibold text-purple-300 mb-2 flex items-center">
                    <span className="mr-2">⚡</span>Eşit Fiyat
                  </h4>
                  <p className="text-purple-200 text-sm">
                    Tüm raporlar 1 token harcar. ROI, iklim, pazar - hepsi aynı fiyat!
                  </p>
                </div>
                
                <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-xl p-4 border border-orange-500/30">
                  <h4 className="font-semibold text-orange-300 mb-2 flex items-center">
                    <span className="mr-2">⏰</span>Süre Uyarısı
                  </h4>
                  <p className="text-orange-200 text-sm">
                    Token'lerinizin son kullanma tarihi var. Vaktinde kullanmayı unutmayın!
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">⚡ Hızlı İşlemler</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <button
                onClick={() => window.location.href = '/dashboard/analysis'}
                className="bg-gradient-to-r from-green-400 to-emerald-600 rounded-xl p-6 text-center hover:scale-105 transition-transform"
              >
                <div className="text-3xl mb-3">🔬</div>
                <h4 className="font-bold text-white mb-2">Analiz Yap</h4>
                <p className="text-white/90 text-sm">Token kullanarak yeni analiz başlat</p>
              </button>
              
              <button
                onClick={() => window.location.href = '/dashboard/reports'}
                className="bg-gradient-to-r from-blue-400 to-cyan-600 rounded-xl p-6 text-center hover:scale-105 transition-transform"
              >
                <div className="text-3xl mb-3">📊</div>
                <h4 className="font-bold text-white mb-2">Raporlar</h4>
                <p className="text-white/90 text-sm">Önceki analizlerinizi görüntüle</p>
              </button>
              
              <button
                onClick={() => window.location.href = '/dashboard/ai-chat'}
                className="bg-gradient-to-r from-purple-400 to-violet-600 rounded-xl p-6 text-center hover:scale-105 transition-transform"
              >
                <div className="text-3xl mb-3">🤖</div>
                <h4 className="font-bold text-white mb-2">AI Asistan</h4>
                <p className="text-white/90 text-sm">Ücretsiz AI desteği al</p>
              </button>
            </div>
          </div>

        </main>
      </div>
    </ClientOnly>
  );
}
