'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import DashboardLayout from '@/components/dashboard/DashboardLayout';

// Force dynamic rendering for dashboard pages
export const dynamic = 'force-dynamic';

export default function DashboardPage() {
  const [userTokens, setUserTokens] = useState(5); // 5 free tokens for new users

  const analysisTools = [
    {
      id: 'roi-simulation',
      title: 'Yatırım Geri Dönüş (ROI) Simülasyonu',
      description: 'Yatırımın geri dönüş süresi ve kar marjı analizi',
      icon: '🧮',
      tokensRequired: 1,
      status: 'available',
      benefits: [
        'Yatır��mın geri dönüş süresi (amortisman)',
        'Kar marjı ve yıllık getiri tahmini',
        'İşletme maliyetleri kıyaslaması'
      ],
      dataSources: ['OpenWeather', 'FAO & TUİK', 'Seraburada API'],
      userInputs: ['Lokasyon', 'Bitki türü', 'Üretim hedefi', 'Yıllık bütçe'],
      pdfOutput: 'ROI tablosu ve 3 yıllık projeksiyonu',
      href: '/dashboard/analysis/roi'
    },
    {
      id: 'climate-analysis',
      title: 'İklim Uyumu & Risk Analizi',
      description: 'Don, rüzgar, nem riskleri ve uygunluk skorları',
      icon: '🌦️',
      tokensRequired: 1,
      status: 'available',
      benefits: [
        'Seçilen ürün için uygunluk skoru',
        'Don, rüzgar, nem riskleri',
        'Geçmiş yıllardaki iklim olayları'
      ],
      dataSources: ['Open-Meteo', 'Copernicus Climate', 'ERA5 verileri'],
      userInputs: ['İl/ilçe', 'Bitki türü', 'Sera tipi'],
      pdfOutput: 'Uygunluk skoru ve risk matrisi',
      href: '/dashboard/analysis/climate'
    },
    {
      id: 'equipment-list',
      title: 'Mühendis Onaylı Ekipman Listesi',
      description: 'Bölgeye uygun yapı ve iklimlendirme ekipmanları',
      icon: '🧰',
      tokensRequired: 1,
      status: 'available',
      benefits: [
        'Bölgeye uygun yapı ve iklimlendirme',
        'Anahtar teslim modüler öneriler',
        'Genişletilebilirlik alternatifleri'
      ],
      dataSources: ['Internal equipment DB', 'Mühendis doğrulama kütüphanesi'],
      userInputs: ['Sera büyüklüğü', 'Yapı tipi', 'Enerji türü'],
      pdfOutput: 'Modüler ekipman ve maliyet listesi',
      href: '/dashboard/analysis/equipment'
    },
    {
      id: 'market-data',
      title: 'Pazar ve Tarım Verisi Entegrasyonu',
      description: 'Fiyat analizi ve verim ortalamaları',
      icon: '🛰️',
      tokensRequired: 1,
      status: 'available',
      benefits: [
        'Bitki türüne göre pazar fiyat analizi',
        'Bölgeye göre verim ortalamaları',
        'Hasat-zamanlama optimizasyonu'
      ],
      dataSources: ['TUİK', 'FAO', 'Türkiye Hal Fiyatları', 'TMO'],
      userInputs: ['Bitki türü', 'Sezon planı', 'Pazarlama hedefi'],
      pdfOutput: 'Fiyat analizi ve hasat çizelgesi',
      href: '/dashboard/analysis/market'
    },
    {
      id: 'layout-plan',
      title: 'Yerleşim ve Teknik Plan Görselleştirmesi',
      description: '2D/3D yerleşim planı ve teknik çizimler',
      icon: '📐',
      tokensRequired: 1,
      status: 'available',
      benefits: [
        'Sera yerleşim planı (2D çizim)',
        'Elektrik ve sulama hat planı',
        'Teknik kabin, depo gösterimi'
      ],
      dataSources: ['Planner 2D', 'CAD AI Tools', 'HerbaTools kütüphanesi'],
      userInputs: ['Parsel ölçüleri', 'Teknik bölmeler', 'Sulama kaynağı'],
      pdfOutput: 'Teknik çizim ve montaj önerileri',
      href: '/dashboard/analysis/layout'
    }
  ];

  const stats = [
    { name: 'Kullanılabilir Jeton', value: userTokens.toString(), change: `${userTokens} analiz hakkınız var`, changeType: 'neutral' },
    { name: 'Toplam Analizler', value: '0', change: 'Henüz analiz yapılmadı', changeType: 'neutral' },
    { name: 'Tamamlanan Raporlar', value: '0', change: 'İlk raporunuzu oluşturun', changeType: 'neutral' },
    { name: 'Ortalama ROI', value: '-', change: 'Analiz sonrası görünür', changeType: 'neutral' },
  ];

  const recentActivity = [
    {
      type: 'welcome',
      title: 'SeraGPT\'ye hoş geldiniz!',
      description: '5 ücretsiz analiz hakkınız ile başlayabilirsiniz',
      time: 'Şimdi',
      color: 'bg-blue-100 text-blue-600'
    },
    {
      type: 'tip',
      title: 'İpucu: ROI Analizinden Başlayın',
      description: 'En popüler analiz aracımız ile yatırımınızın geri dönüşünü hesaplayın',
      time: '1 dk önce',
      color: 'bg-yellow-100 text-yellow-600'
    }
  ];

  const quickActions = [
    {
      name: 'Ücretsiz Jeton Al',
      description: 'İlk 5 analiz ücretsiz, hemen başlayın',
      href: '/dashboard/analysis/roi',
      primary: true
    },
    {
      name: 'AI Sohbet',
      description: 'SeraGPT AI ile sera sorularınızı sorun',
      href: '/dashboard/ai-chat',
      primary: false
    },
    {
      name: 'Örnek Rapor Görüntüle',
      description: 'Hangi raporları alabileceğinizi görün',
      href: '/dashboard/examples',
      primary: false
    },
    {
      name: 'Mühendis Desteği',
      description: 'Uzman desteği için randevu alın',
      href: '/dashboard/consulting',
      primary: false
    },
  ];

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gray-50 text-gray-600">
        <div className="space-y-8">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              SeraGPT Kontrol Paneli
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              20 y��llık mühendislik deneyimi ve 110+ veri setiyle desteklenen yapay zeka analizleri ile 
              yatırım kararlarınızı bilimsel verilerle destekleyin.
            </p>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative group"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 rounded-2xl opacity-60 group-hover:opacity-100 transition duration-300"></div>
                <div className="relative bg-white rounded-2xl p-6 border-0">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{stat.name}</p>
                    <p className="text-2xl font-bold text-gray-900 mb-2">{stat.value}</p>
                    <p className="text-sm text-gray-500">
                      {stat.change}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Analysis Tools Grid */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center mb-8"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Kullanıma Hazır Analizler
              </h2>
              <p className="text-gray-600">
                Her analiz için 1 jeton harcanır. İlk 5 analiziniz ücretsizdir.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
              {analysisTools.map((tool, index) => (
                <motion.div
                  key={tool.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative group h-full"
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 rounded-2xl opacity-70 group-hover:opacity-100 transition duration-300"></div>
                  <div className="relative bg-white rounded-2xl p-6 border-0 h-full flex flex-col">
                    <div className="text-center mb-4">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                        <span className="text-2xl">{tool.icon}</span>
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2 leading-tight">{tool.title}</h3>
                      <p className="text-gray-600 text-sm">{tool.description}</p>
                    </div>

                    <div className="mt-auto">
                      <a
                        href={tool.href}
                        className={`w-full inline-flex items-center justify-center px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                          userTokens >= tool.tokensRequired
                            ? 'bg-gradient-to-r from-gray-900 to-gray-800 hover:from-gray-800 hover:to-gray-700 text-white'
                            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        }`}
                      >
                        {userTokens >= tool.tokensRequired ? (
                          <>
                            <span className="mr-2">🪙</span>
                            Analizi Başlat
                          </>
                        ) : (
                          'Yetersiz jeton'
                        )}
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Quick Actions */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-white rounded-2xl shadow-sm border border-gray-200"
              >
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">Hızlı İşlemler</h3>
                </div>
                <div className="p-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    {quickActions.map((action, index) => (
                      <a
                        key={index}
                        href={action.href}
                        className={`block p-4 rounded-xl transition-colors ${
                          action.primary
                            ? 'bg-gray-600 hover:bg-gray-700 text-white'
                            : 'bg-gray-50 hover:bg-gray-100 text-gray-900'
                        }`}
                      >
                        <div>
                          <h4 className={`font-medium mb-2 ${action.primary ? 'text-white' : 'text-gray-900'}`}>
                            {action.name}
                          </h4>
                          <p className={`text-sm ${action.primary ? 'text-gray-200' : 'text-gray-600'}`}>
                            {action.description}
                          </p>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Recent Activity */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="bg-white rounded-2xl shadow-sm border border-gray-200"
              >
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">Son Aktiviteler</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {recentActivity.map((activity, index) => (
                      <div key={index} className="flex items-start space-x-4">
                        <div className={`w-3 h-3 rounded-full mt-2 ${activity.color}`}></div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                          <p className="text-xs text-gray-600">{activity.description}</p>
                          <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Jeton Management Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-200"
          >
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Jeton Yönetimi</h3>
            </div>
            <div className="p-6">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <h4 className="font-semibold text-gray-900 mb-1">Mevcut Jetonlar</h4>
                  <p className="text-2xl font-bold text-gray-900 mb-2">{userTokens}</p>
                  <p className="text-sm text-gray-600">Kullanılabilir jeton</p>
                </div>
                <div className="text-center">
                  <h4 className="font-semibold text-gray-900 mb-1">Ücretsiz Hak</h4>
                  <p className="text-2xl font-bold text-green-600 mb-2">5</p>
                  <p className="text-sm text-gray-600">Başlangıç jetonu</p>
                </div>
                <div className="text-center">
                  <h4 className="font-semibold text-gray-900 mb-3">Jeton Satın Al</h4>
                  <button className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                    Paketleri Gör
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
}
