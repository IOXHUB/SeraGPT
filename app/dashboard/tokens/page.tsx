'use client';

import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';

export default function TokensPage() {
  const [loading, setLoading] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [userTokens, setUserTokens] = useState({
    remainingTokens: 5,
    usedTokens: 0,
    freeTokens: 5
  });

  // Jeton paketleri - Kullanıcı fiyatlandırması
  const tokenPackages = [
    {
      id: 'small',
      name: '10 Jeton',
      tokens: 10,
      price: 500,
      originalPrice: 500,
      popular: false
    },
    {
      id: 'medium',
      name: '50 Jeton',
      tokens: 50,
      price: 3500,
      originalPrice: 3500,
      popular: true
    },
    {
      id: 'large',
      name: '100 Jeton',
      tokens: 100,
      price: 4900,
      originalPrice: 5000,
      popular: false,
      savings: 100
    }
  ];

  const handlePurchase = async (packageId: string) => {
    setLoading(true);
    setSelectedPackage(packageId);
    
    // Simulate iyzico redirect
    setTimeout(() => {
      // Bu gerçek uygulamada iyzico ödeme linkine yönlendirecek
      alert('İyzico ödeme sayfasına yönlendiriliyorsunuz...');
      setLoading(false);
      setSelectedPackage(null);
    }, 1000);
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-white user-panel-container">
        <div className="user-panel-content space-y-modern">
          
          {/* Header */}
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">🪙 Jeton Yükle</h1>
            <p className="text-gray-600">Her rapor 1 jeton kullanır. AI sohbet sınırsızdır.</p>
          </div>

          {/* Current Balance - Neon Border Card */}
          <div className="relative bg-gray-900 rounded-2xl p-6 text-white">
            {/* Neon border effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 rounded-2xl blur opacity-20 -z-10"></div>
            <div className="absolute inset-0.5 bg-gray-900 rounded-2xl -z-10"></div>
            
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">{userTokens.remainingTokens}</div>
              <div className="text-gray-300">Kalan Jeton</div>
              <div className="text-sm text-gray-400 mt-2">
                ({userTokens.freeTokens} ücretsiz • {userTokens.usedTokens} kullanılan)
              </div>
            </div>
          </div>

          {/* Jeton Yetersizse Uyarı */}
          {userTokens.remainingTokens === 0 && (
            <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-lg">
              <div className="flex">
                <div className="text-red-400 text-xl mr-3">⚠️</div>
                <div>
                  <h3 className="text-red-800 font-medium">Jetonunuz Kalmadı!</h3>
                  <p className="text-red-700 text-sm">Yeni rapor oluşturmak için jeton satın almanız gerekiyor.</p>
                </div>
              </div>
            </div>
          )}

          {/* Token Packages */}
          <div className="grid md:grid-cols-3 gap-6">
            {tokenPackages.map((pkg) => (
              <div 
                key={pkg.id}
                className={`relative bg-white rounded-2xl p-6 border-2 transition-all hover:shadow-lg ${
                  pkg.popular 
                    ? 'border-purple-400 shadow-purple-100' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {/* Popular Badge */}
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                      ⭐ En Popüler
                    </div>
                  </div>
                )}

                {/* Neon glow for popular */}
                {pkg.popular && (
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 rounded-2xl blur opacity-10 -z-10"></div>
                )}

                <div className="text-center">
                  {/* Package Name */}
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{pkg.name}</h3>
                  
                  {/* Price */}
                  <div className="mb-4">
                    <div className="text-3xl font-bold text-gray-900">₺{pkg.price.toLocaleString()}</div>
                    {pkg.originalPrice && pkg.originalPrice > pkg.price && (
                      <div className="text-sm text-gray-500 line-through">₺{pkg.originalPrice.toLocaleString()}</div>
                    )}
                    <div className="text-sm text-gray-600 mt-1">{pkg.tokens} jeton</div>
                  </div>

                  {/* Savings */}
                  {pkg.savings && (
                    <div className="mb-4 text-sm text-green-600 font-medium">
                      💰 ₺{pkg.savings.toLocaleString()} tasarruf
                    </div>
                  )}

                  {/* Per Token Price */}
                  <div className="text-sm text-gray-500 mb-6">
                    ₺{Math.round(pkg.price / pkg.tokens)} / jeton
                  </div>

                  {/* Buy Button */}
                  <button
                    onClick={() => handlePurchase(pkg.id)}
                    disabled={loading && selectedPackage === pkg.id}
                    className={`w-full py-3 rounded-xl font-medium transition-all ${
                      pkg.popular
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg'
                        : 'bg-gray-900 hover:bg-gray-800 text-white'
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {loading && selectedPackage === pkg.id ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                        İşleniyor...
                      </div>
                    ) : (
                      'Satın Al'
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Payment Info */}
          <div className="bg-gray-50 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">💳 Ödeme Bilgileri</h3>
            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                <span>Güvenli ödeme - İyzico altyapısı</span>
              </div>
              <div className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                <span>Kredi kartı ve banka kartı kabul edilir</span>
              </div>
              <div className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                <span>Ödeme onayından sonra jetonlar otomatik yüklenir</span>
              </div>
              <div className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                <span>E-posta ile onay bildirimi gönderilir</span>
              </div>
            </div>
          </div>

          {/* Usage Info */}
          <div className="bg-white border-2 border-gray-200 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">📊 Jeton Kullanımı</h3>
            
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
              <div>
                <div className="text-2xl mb-2">📈</div>
                <div className="text-sm font-medium text-gray-900">ROI Analizi</div>
                <div className="text-xs text-gray-600">1 jeton</div>
              </div>
              <div>
                <div className="text-2xl mb-2">🌤️</div>
                <div className="text-sm font-medium text-gray-900">İklim Analizi</div>
                <div className="text-xs text-gray-600">1 jeton</div>
              </div>
              <div>
                <div className="text-2xl mb-2">📊</div>
                <div className="text-sm font-medium text-gray-900">Pazar Analizi</div>
                <div className="text-xs text-gray-600">1 jeton</div>
              </div>
              <div>
                <div className="text-2xl mb-2">🔧</div>
                <div className="text-sm font-medium text-gray-900">Ekipman Listesi</div>
                <div className="text-xs text-gray-600">1 jeton</div>
              </div>
              <div>
                <div className="text-2xl mb-2">📐</div>
                <div className="text-sm font-medium text-gray-900">Layout Planlama</div>
                <div className="text-xs text-gray-600">1 jeton</div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-200">
              <div className="flex items-center">
                <div className="text-2xl mr-3">💬</div>
                <div>
                  <div className="font-medium text-gray-900">AI Sohbet - Sınırsız</div>
                  <div className="text-sm text-gray-600">Raporlarınız üzerinde sınırsız soru sorabilirsiniz</div>
                </div>
              </div>
            </div>
          </div>

          {/* Support */}
          <div className="text-center text-sm text-gray-500">
            <p>Sorun yaşıyorsanız <a href="/destek" className="text-blue-600 hover:underline">destek ekibimizle</a> iletişime geçin.</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
