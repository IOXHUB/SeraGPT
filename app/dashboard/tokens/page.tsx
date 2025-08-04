'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import DashboardLayout from '@/components/dashboard/DashboardLayout';

interface TokenPackage {
  id: string;
  name: string;
  tokens: number;
  price: number;
  popular?: boolean;
  features: string[];
}

export default function TokensPage() {
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [userTokens] = useState(5); // Current user tokens

  const tokenPackages: TokenPackage[] = [
    {
      id: 'starter',
      name: 'Starter',
      tokens: 25,
      price: 49,
      features: [
        '25 analiz hakkı',
        'Temel PDF raporları',
        'Email desteği',
        '1 ay geçerlilik'
      ]
    },
    {
      id: 'pro',
      name: 'Pro',
      tokens: 100,
      price: 149,
      popular: true,
      features: [
        '100 analiz hakkı',
        'Detaylı PDF raporları',
        'Öncelikli destek',
        '6 ay geçerlilik',
        'AI sohbet sınırsız'
      ]
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      tokens: 500,
      price: 599,
      features: [
        '500 analiz hakkı',
        'Özel raporlar',
        'Mühendis danışmanlığı',
        '1 yıl geçerlilik',
        'Öncelikli işlem',
        'Özel fiyat listesi'
      ]
    }
  ];

  const purchaseHistory = [
    {
      id: '1',
      packageName: 'Pro',
      tokens: 100,
      price: 149,
      date: '2024-01-10',
      status: 'completed'
    },
    {
      id: '2',
      packageName: 'Starter',
      tokens: 25,
      price: 49,
      date: '2024-01-05',
      status: 'completed'
    }
  ];

  const handlePurchase = (packageId: string) => {
    setSelectedPackage(packageId);
    // Here you would integrate with payment system
    alert(`${packageId} paketi satın alma işlemi başlatıldı!`);
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gray-50 text-gray-600">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Jeton Satın Al</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Sera analizleriniz için jeton satın alın. Her analiz 1 jeton harcar ve 
              jetonlarınız süresiz geçerlidir.
            </p>
          </motion.div>

          {/* Current Tokens */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6"
          >
            <div className="text-center">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Mevcut Bakiyeniz</h2>
              <div className="text-4xl font-bold text-gray-900 mb-2">{userTokens}</div>
              <p className="text-gray-600">Kullanılabilir jeton</p>
            </div>
          </motion.div>

          {/* Token Packages */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center mb-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Jeton Paketleri</h2>
              <p className="text-gray-600">İhtiyacınıza uygun paketi seçin</p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {tokenPackages.map((pkg, index) => (
                <motion.div
                  key={pkg.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  className={`bg-white rounded-2xl shadow-sm border-2 transition-colors ${
                    pkg.popular 
                      ? 'border-gray-600' 
                      : 'border-gray-200'
                  } relative`}
                >
                  {pkg.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="bg-gray-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                        En Popüler
                      </span>
                    </div>
                  )}
                  
                  <div className="p-6">
                    <div className="text-center mb-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{pkg.name}</h3>
                      <div className="text-3xl font-bold text-gray-900 mb-1">₺{pkg.price}</div>
                      <p className="text-gray-600">{pkg.tokens} jeton</p>
                    </div>

                    <ul className="space-y-3 mb-6">
                      {pkg.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-sm text-gray-600">
                          <svg className="w-4 h-4 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <button
                      onClick={() => handlePurchase(pkg.id)}
                      className={`w-full py-3 px-6 rounded-xl font-semibold transition-colors ${
                        pkg.popular
                          ? 'bg-gray-600 hover:bg-gray-700 text-white'
                          : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                      }`}
                    >
                      Satın Al
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Purchase History */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-200"
          >
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Satın Alma Geçmişi</h2>
            </div>
            <div className="p-6">
              {purchaseHistory.length === 0 ? (
                <div className="text-center py-8">
                  <div className="text-gray-400 mb-4">
                    <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                  </div>
                  <p className="text-gray-600">Henüz jeton satın almamışsınız</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {purchaseHistory.map((purchase) => (
                    <div key={purchase.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
                      <div>
                        <h3 className="font-medium text-gray-900">{purchase.packageName} Paketi</h3>
                        <p className="text-sm text-gray-600">
                          {purchase.tokens} jeton • {new Date(purchase.date).toLocaleDateString('tr-TR')}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">₺{purchase.price}</p>
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Tamamlandı
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>

          {/* Payment Methods */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-200"
          >
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Ödeme Yöntemleri</h2>
            </div>
            <div className="p-6">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                  </div>
                  <h3 className="font-medium text-gray-900 mb-1">Kredi Kartı</h3>
                  <p className="text-sm text-gray-600">Visa, Mastercard kabul edilir</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                  </div>
                  <h3 className="font-medium text-gray-900 mb-1">Havale/EFT</h3>
                  <p className="text-sm text-gray-600">Banka transferi ile ödeme</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h3 className="font-medium text-gray-900 mb-1">Güvenli Ödeme</h3>
                  <p className="text-sm text-gray-600">SSL şifreli güvenli altyapı</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
}
