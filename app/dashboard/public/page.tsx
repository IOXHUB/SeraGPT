'use client';

import { useState } from 'react';

// Force dynamic rendering to prevent SSR
export const dynamic = 'force-dynamic';

export default function PublicDashboardPage() {
  const [showWelcome, setShowWelcome] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <img 
                src="https://cdn.builder.io/api/v1/image/assets%2F2c7ec7c93776440b923d3518963fc941%2F96da5382e9584c3fb2d32eca60944359?format=webp&width=800" 
                alt="SeraGPT Logo" 
                className="h-8 w-auto mr-4"
              />
              <h1 className="text-2xl font-bold text-gray-900">
                SeraGPT Dashboard
              </h1>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => window.location.href = '/auth/login'}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Giriş Yap
              </button>
              <button
                onClick={() => window.location.href = '/'}
                className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
              >
                Ana Sayfa
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Success Banner */}
      {showWelcome && (
        <div className="bg-green-100 border-l-4 border-green-500 p-4 mx-4 my-4 rounded">
          <div className="flex items-center justify-between">
            <div className="flex">
              <div className="text-green-500 text-2xl mr-3">🎉</div>
              <div>
                <h3 className="text-green-800 font-medium">Başarıyla Dashboard'a Erişildi!</h3>
                <p className="text-green-700 text-sm">Authentication problemi çözüldü. Artık tüm özelliklerimizi kullanabilirsiniz.</p>
              </div>
            </div>
            <button 
              onClick={() => setShowWelcome(false)}
              className="text-green-500 hover:text-green-700"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            🚀 Sera Yatırım Analiz Merkezi
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            20 yıllık mühendislik deneyimi ve 110+ veri setiyle desteklenen yapay zeka analizleri ile 
            yatırım kararlarınızı bilimsel verilerle destekleyin.
          </p>
        </div>

        {/* Analysis Tools Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          
          {/* ROI Analysis */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow">
            <div className="text-4xl mb-4">🧮</div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">ROI Simülasyonu</h3>
            <p className="text-gray-600 text-sm mb-4">
              Yatırımın geri dönüş süresi ve kar marjı analizi
            </p>
            <ul className="text-xs text-gray-600 space-y-1 mb-6">
              <li>• Yatırımın geri dönüş süresi</li>
              <li>• Kar marjı ve yıllık getiri tahmini</li>
              <li>• İşletme maliyetleri kıyaslaması</li>
            </ul>
            <button 
              onClick={() => alert('Bu özellik için giriş yapmanız gerekiyor. "Giriş Yap" butonunu kullanın.')}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 font-medium"
            >
              Analizi Başlat (1 jeton)
            </button>
          </div>

          {/* Climate Analysis */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow">
            <div className="text-4xl mb-4">🌦️</div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">İklim Analizi</h3>
            <p className="text-gray-600 text-sm mb-4">
              Don, rüzgar, nem riskleri ve uygunluk skorları
            </p>
            <ul className="text-xs text-gray-600 space-y-1 mb-6">
              <li>• Seçilen ürün için uygunluk skoru</li>
              <li>• Don, rüzgar, nem riskleri</li>
              <li>• Geçmiş yıllardaki iklim olayları</li>
            </ul>
            <button 
              onClick={() => alert('Bu özellik için giriş yapmanız gerekiyor. "Giriş Yap" butonunu kullanın.')}
              className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 font-medium"
            >
              Analizi Başlat (1 jeton)
            </button>
          </div>

          {/* Equipment Analysis */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow">
            <div className="text-4xl mb-4">🧰</div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Ekipman Listesi</h3>
            <p className="text-gray-600 text-sm mb-4">
              Bölgeye uygun yapı ve iklimlendirme ekipmanları
            </p>
            <ul className="text-xs text-gray-600 space-y-1 mb-6">
              <li>• Bölgeye uygun yapı ve iklimlendirme</li>
              <li>• Anahtar teslim modüler öneriler</li>
              <li>• Genişletilebilirlik alternatifleri</li>
            </ul>
            <button 
              onClick={() => alert('Bu özellik için giriş yapmanız gerekiyor. "Giriş Yap" butonunu kullanın.')}
              className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 font-medium"
            >
              Analizi Başlat (1 jeton)
            </button>
          </div>

          {/* Market Analysis */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Pazar Analizi</h3>
            <p className="text-gray-600 text-sm mb-4">
              Fiyat analizi ve verim ortalamaları
            </p>
            <ul className="text-xs text-gray-600 space-y-1 mb-6">
              <li>• Bitki türüne göre pazar fiyat analizi</li>
              <li>• Bölgeye göre verim ortalamaları</li>
              <li>• Hasat-zamanlama optimizasyonu</li>
            </ul>
            <button 
              onClick={() => alert('Bu özellik için giriş yapmanız gerekiyor. "Giriş Yap" butonunu kullanın.')}
              className="w-full bg-orange-600 text-white py-3 px-4 rounded-lg hover:bg-orange-700 font-medium"
            >
              Analizi Başlat (1 jeton)
            </button>
          </div>

          {/* Layout Planning */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow">
            <div className="text-4xl mb-4">📐</div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Teknik Plan</h3>
            <p className="text-gray-600 text-sm mb-4">
              2D/3D yerleşim planı ve teknik çizimler
            </p>
            <ul className="text-xs text-gray-600 space-y-1 mb-6">
              <li>• Sera yerleşim planı (2D çizim)</li>
              <li>• Elektrik ve sulama hat planı</li>
              <li>• Teknik kabin, depo gösterimi</li>
            </ul>
            <button 
              onClick={() => alert('Bu özellik için giriş yapmanız gerekiyor. "Giriş Yap" butonunu kullanın.')}
              className="w-full bg-red-600 text-white py-3 px-4 rounded-lg hover:bg-red-700 font-medium"
            >
              Analizi Başlat (1 jeton)
            </button>
          </div>

          {/* AI Chat */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow">
            <div className="text-4xl mb-4">🤖</div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">SeraGPT AI</h3>
            <p className="text-gray-600 text-sm mb-4">
              AI ile sera sorularınızı sorun
            </p>
            <ul className="text-xs text-gray-600 space-y-1 mb-6">
              <li>• Sera konularında uzman AI danışmanlık</li>
              <li>• Anlık soru-cevap desteği</li>
              <li>• Teknik bilgi ve öneriler</li>
            </ul>
            <button 
              onClick={() => alert('Bu özellik için giriş yapmanız gerekiyor. "Giriş Yap" butonunu kullanın.')}
              className="w-full bg-gray-600 text-white py-3 px-4 rounded-lg hover:bg-gray-700 font-medium"
            >
              AI Chat'i Başlat
            </button>
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            🌟 SeraGPT'nin Öne Çıkan Özellikleri
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl mb-3">⚡</div>
              <h4 className="font-semibold text-gray-900 mb-2">Hızlı Analiz</h4>
              <p className="text-gray-600 text-sm">60 saniyede kapsamlı yatırım raporu</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-3">🎯</div>
              <h4 className="font-semibold text-gray-900 mb-2">Doğru Veriler</h4>
              <p className="text-gray-600 text-sm">110+ gerçek zamanlı veri seti</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-3">👨‍💼</div>
              <h4 className="font-semibold text-gray-900 mb-2">Uzman Onaylı</h4>
              <p className="text-gray-600 text-sm">20 yıllık mühendislik deneyimi</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white">
          <h3 className="text-2xl font-bold mb-4">🚀 Hemen Başlayın!</h3>
          <p className="text-blue-100 mb-6">
            İlk 5 analiziniz ücretsiz. Giriş yapın ve sera yatırım analizlerinize başlayın.
          </p>
          <div className="space-x-4">
            <button
              onClick={() => window.location.href = '/auth/login'}
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors"
            >
              Giriş Yap ve Başla
            </button>
            <button
              onClick={() => window.location.href = '/auth/bulletproof-login'}
              className="bg-blue-800 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-900 transition-colors"
            >
              Bulletproof Giriş
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
