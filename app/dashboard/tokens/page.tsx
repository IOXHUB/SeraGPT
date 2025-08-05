'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { tokenService, TokenPackage, UserTokens, TokenTransaction } from '@/lib/services/token-service';

export default function TokensPage() {
  const [packages, setPackages] = useState<TokenPackage[]>([]);
  const [userTokens, setUserTokens] = useState<UserTokens | null>(null);
  const [tokenHistory, setTokenHistory] = useState<TokenTransaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    
    try {
      // Load token packages
      const packagesResponse = await tokenService.getTokenPackages();
      if (packagesResponse.success && packagesResponse.data) {
        setPackages(packagesResponse.data);
      }

      // Load user tokens
      const userTokensResponse = await tokenService.getUserTokens('user_123');
      if (userTokensResponse.success && userTokensResponse.data) {
        setUserTokens(userTokensResponse.data);
      }

      // Load token history
      const historyResponse = await tokenService.getTokenHistory('user_123');
      if (historyResponse.success && historyResponse.data) {
        setTokenHistory(historyResponse.data);
      }
    } catch (err) {
      setError('Veriler yüklenirken hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const handlePurchasePackage = async (packageId: string) => {
    setLoading(true);
    setError('');
    setSelectedPackage(packageId);

    try {
      // Create payment intent
      const paymentResponse = await tokenService.createPaymentIntent(packageId, 'user_123');
      
      if (paymentResponse.success && paymentResponse.data) {
        // In production, integrate with Stripe Elements for actual payment
        // For demo, simulate successful payment
        setTimeout(async () => {
          const purchaseResponse = await tokenService.processTokenPurchase(
            paymentResponse.data!.id,
            'user_123',
            packageId
          );
          
          if (purchaseResponse.success) {
            // Reload user tokens
            const userTokensResponse = await tokenService.getUserTokens('user_123');
            if (userTokensResponse.success && userTokensResponse.data) {
              setUserTokens(userTokensResponse.data);
            }
            
            // Reload history
            const historyResponse = await tokenService.getTokenHistory('user_123');
            if (historyResponse.success && historyResponse.data) {
              setTokenHistory(historyResponse.data);
            }

            alert(`Paket başarıyla satın alındı! ${purchaseResponse.data?.tokensAdded} jeton hesabınıza eklendi.`);
          } else {
            setError(purchaseResponse.error || 'Satın alma işlemi başarısız');
          }
          
          setLoading(false);
          setSelectedPackage(null);
        }, 2000); // Simulate processing time
      } else {
        setError(paymentResponse.error || 'Ödeme başlatılamadı');
        setLoading(false);
        setSelectedPackage(null);
      }
    } catch (err) {
      setError('Beklenmeyen bir hata oluştu');
      setLoading(false);
      setSelectedPackage(null);
    }
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'purchase': return '💳';
      case 'usage': return '📊';
      case 'refund': return '↩️';
      case 'bonus': return '🎁';
      default: return '📝';
    }
  };

  const getTransactionTypeText = (type: string) => {
    switch (type) {
      case 'purchase': return 'Satın Alma';
      case 'usage': return 'Kullanım';
      case 'refund': return 'İade';
      case 'bonus': return 'Bonus';
      default: return type;
    }
  };

  if (loading && !packages.length) {
    return (
      <DashboardLayout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="animate-pulse text-gray-500">Jeton bilgileri yükleniyor...</div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gray-50 text-gray-600">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl font-bold text-gray-900">Jeton Satın Al</h1>
            <p className="text-gray-600 mt-1">Analiz paketleri satın alın ve jetonlarınızı yönetin</p>
          </motion.div>

          {/* Current Balance */}
          {userTokens && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-gradient-to-r from-gray-600 to-gray-700 rounded-2xl text-white p-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <p className="text-3xl font-bold">{userTokens.remainingTokens}</p>
                  <p className="text-gray-300">Kalan Jeton</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold">{userTokens.usedTokens}</p>
                  <p className="text-gray-300">Kullanılan</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold">{userTokens.freeTokens}</p>
                  <p className="text-gray-300">Ücretsiz</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold">{userTokens.purchasedTokens}</p>
                  <p className="text-gray-300">Satın Alınan</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-600">{error}</p>
            </div>
          )}

          {/* Token Packages */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {packages.map((pkg, index) => (
              <div
                key={pkg.id}
                className={`relative bg-white rounded-2xl shadow-sm border-2 p-6 transition-all ${
                  pkg.popular 
                    ? 'border-gray-600 shadow-lg transform scale-105' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gray-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      En Popüler
                    </span>
                  </div>
                )}

                <div className="text-center mb-4">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{pkg.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{pkg.description}</p>
                  
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-gray-900">₺{pkg.price}</span>
                    <div className="text-sm text-gray-600 mt-1">
                      {pkg.tokenCount} jeton
                    </div>
                    {pkg.discountPercentage > 0 && (
                      <div className="text-sm text-green-600 font-medium">
                        %{pkg.discountPercentage} indirim
                      </div>
                    )}
                  </div>

                  <div className="text-center text-sm text-gray-600 mb-4">
                    ₺{pkg.pricePerToken.toFixed(2)} / jeton
                  </div>
                </div>

                <div className="space-y-2 mb-6">
                  {pkg.features.map((feature, i) => (
                    <div key={i} className="flex items-center text-sm">
                      <span className="text-green-500 mr-2">✓</span>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => handlePurchasePackage(pkg.id)}
                  disabled={loading && selectedPackage === pkg.id}
                  className={`w-full py-3 rounded-lg font-medium transition-colors ${
                    pkg.popular
                      ? 'bg-gray-600 hover:bg-gray-700 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {loading && selectedPackage === pkg.id ? (
                    <div className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-current" fill="none" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25"></circle>
                        <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" className="opacity-75"></path>
                      </svg>
                      İşleniyor...
                    </div>
                  ) : (
                    'Satın Al'
                  )}
                </button>

                {tokenService.calculateSavings(pkg.id) > 0 && (
                  <div className="mt-2 text-center text-sm text-green-600">
                    ₺{tokenService.calculateSavings(pkg.id).toFixed(2)} tasarruf
                  </div>
                )}
              </div>
            ))}
          </motion.div>

          {/* Token Usage Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Jeton Kullanımı</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-blue-600 text-xl">📊</span>
                </div>
                <h3 className="font-medium text-gray-900">ROI Analizi</h3>
                <p className="text-sm text-gray-600 mt-1">1 jeton</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-green-600 text-xl">🌤️</span>
                </div>
                <h3 className="font-medium text-gray-900">İklim Analizi</h3>
                <p className="text-sm text-gray-600 mt-1">1 jeton</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-purple-600 text-xl">📈</span>
                </div>
                <h3 className="font-medium text-gray-900">Pazar Analizi</h3>
                <p className="text-sm text-gray-600 mt-1">1 jeton</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-yellow-600 text-xl">🔧</span>
                </div>
                <h3 className="font-medium text-gray-900">Ekipman Listesi</h3>
                <p className="text-sm text-gray-600 mt-1">1 jeton</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-red-600 text-xl">📐</span>
                </div>
                <h3 className="font-medium text-gray-900">Layout Planlama</h3>
                <p className="text-sm text-gray-600 mt-1">1 jeton</p>
              </div>
            </div>

            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-2">💬 AI Sohbet</h3>
              <p className="text-sm text-gray-600">
                AI sohbet özelliği <strong>sınırsız</strong> kullanım sunar. 
                Yapılan analizler hakkında istediğiniz kadar soru sorabilirsiniz.
              </p>
            </div>
          </motion.div>

          {/* Token History */}
          {tokenHistory.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Jeton Geçmişi</h2>
              
              <div className="space-y-4">
                {tokenHistory.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{getTransactionIcon(transaction.type)}</span>
                      <div>
                        <p className="font-medium text-gray-900">{transaction.description}</p>
                        <p className="text-sm text-gray-600">
                          {transaction.timestamp.toLocaleDateString('tr-TR', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <p className={`font-medium ${
                        transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {transaction.amount > 0 ? '+' : ''}{transaction.amount} jeton
                      </p>
                      <p className="text-sm text-gray-600">
                        {getTransactionTypeText(transaction.type)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 text-center">
                <button className="text-gray-600 hover:text-gray-900 text-sm font-medium">
                  Tüm geçmişi görüntüle →
                </button>
              </div>
            </motion.div>
          )}

          {/* FAQ */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Sık Sorulan Sorular</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Jetonlar ne kadar süre geçerli?</h3>
                <p className="text-gray-600 text-sm">
                  Jetonlar satın alma tarihinden itibaren paket türüne göre 30-90 gün geçerlidir. 
                  Ücretsiz jetonlar sınırsız geçerliliğe sahiptir.
                </p>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Kullanılmayan jetonlar iade edilir mi?</h3>
                <p className="text-gray-600 text-sm">
                  Kullanılmayan jetonlar 14 gün içinde tam iade garantisi ile iade edilebilir.
                  Bu süre sonunda jetonlar hesabınızda kalır.
                </p>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Fatura alabilir miyim?</h3>
                <p className="text-gray-600 text-sm">
                  Evet, tüm satın alımlarınız için fatura düzenlenebilir. 
                  Satın alma sırasında fatura bilgilerinizi girebilirsiniz.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
}
