'use client';

import { motion } from 'framer-motion';
import BlogCardsSection from './BlogCardsSection';

export default function UserjotCloneSection() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header - Full width with 960px content container */}
      <header className="w-full">
        <div className="flex justify-between items-center p-6 max-w-[960px] mx-auto">
          <div className="flex items-center space-x-3">
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2F2c7ec7c93776440b923d3518963fc941%2F96da5382e9584c3fb2d32eca60944359?format=webp&width=800"
              alt="SeraGPT Logo"
              className="h-8 w-auto"
            />
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
              Fiyatlar
            </a>
            <a href="#" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
              Yardım
            </a>
            <a href="#" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
              Blog
            </a>
            <a href="#" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
              Güncellemeler
            </a>
            <a href="/dashboard" className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
              Dashboard
            </a>
            <a href="/auth/login" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
              Giriş Yap
            </a>
          </nav>

          {/* Mobile menu button */}
          <button className="md:hidden">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </header>

      {/* Main content - 960px container */}
      <main className="flex-1 flex items-center justify-center px-6 py-20">
        <div className="max-w-[960px] mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Small text above headline */}
            <p className="text-gray-500 text-sm font-medium uppercase tracking-wider">
              <strong>+20 YIL, +500 PROJE, +110 VERİ SETİ</strong>
            </p>

            {/* Main headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
              <p>🚀 60 Saniyede </p>
              <p>Sera Yatırım Raporun Hazır!</p>
            </h1>

            {/* Description paragraph */}
            <p className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-5xl mx-auto">
              SeraGPT; 20 yılı aşkın mühendislik deneyimi, 500'den fazla
              tamamlanmış proje ve 110'dan fazla gerçek zamanlı veri
              setiyle, tarımsal yatırım kararlarınızı saniyeler içinde
              analiz eder.
            </p>

            {/* CTA Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-black hover:bg-gray-800 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors inline-flex items-center space-x-3"
            >
              <span>Şimdi Oluştur – İlk 5 Rapor Ücretsiz</span>
            </motion.button>

            {/* Small text under button */}
            <p className="text-gray-500 text-sm">
              <strong>Doğru yatırım, doğru analizle başlar.</strong>
            </p>
          </motion.div>
        </div>
      </main>



      {/* How It Works Section - 5 Steps */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-[960px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-gray-500 text-sm font-medium uppercase tracking-wider mb-4">
              ⚙️ NASIL ÇALIŞIR?
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              🧭 5 Adımda Yatırım<br />
              Fizibiliteni Al
            </h2>
          </motion.div>

          {/* 5 Step Process */}
          <div className="space-y-8">
            {/* Step 1 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 border border-gray-200 flex items-start space-x-6"
            >
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center">
                  <span className="text-2xl">📍</span>
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-3">
                  <span className="bg-green-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  <h3 className="text-xl font-bold text-gray-900">Lokasyonunu ve Ürünü Gir</h3>
                </div>
                <p className="text-gray-600">
                  Bulunduğun yeri ve yetiştirmek istediğin ��rünü belirt.
                  İl, ilçe, ürün türü ve hedef pazar bilgilerini girerek analiz sürecini başlat.
                </p>
              </div>
            </motion.div>

            {/* Step 2 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 border border-gray-200 flex items-start space-x-6"
            >
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center">
                  <span className="text-2xl">🧠</span>
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-3">
                  <span className="bg-green-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <h3 className="text-xl font-bold text-gray-900">SeraGPT Analiz Etsin</h3>
                </div>
                <p className="text-gray-600">
                  Yapay zekâ destekli motorumuz, 110+ veri kaynağını tarar.
                  İklim, altyapı, ROI, ticaret verileri ve ekipman ihtiyaçlarını saniyeler içinde analiz eder.
                </p>
              </div>
            </motion.div>

            {/* Step 3 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 border border-gray-200 flex items-start space-x-6"
            >
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center">
                  <span className="text-2xl">📄</span>
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-3">
                  <span className="bg-green-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  <h3 className="text-xl font-bold text-gray-900">PDF Raporunu İndir</h3>
                </div>
                <p className="text-gray-600">
                  Profesyonel raporun saniyeler içinde hazır.
                  Yatırım fizibiliteni detaylı analiz i��eren PDF formatında indir ve kararını ver.
                </p>
              </div>
            </motion.div>

            {/* Step 4 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 border border-gray-200 flex items-start space-x-6"
            >
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center">
                  <span className="text-2xl">🛠️</span>
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-3">
                  <span className="bg-green-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">4</span>
                  <h3 className="text-xl font-bold text-gray-900">Dilersen Proje Danışmanlık Paketimizi İncele</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Yatırım sürecinde yalnız değilsin.
                  Sera planlama, mühendislik doğrulama, bütçe optimizasyonu ve hibe danışmanlığı dahil olan danışmanlık paketimizle yatırımını profesyonelleştir.
                </p>
                <a href="#" className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium">
                  Proje Danışmanlık Paketi
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </motion.div>

            {/* Step 5 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 border border-gray-200 flex items-start space-x-6"
            >
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-yellow-100 rounded-2xl flex items-center justify-center">
                  <span className="text-2xl">🚜</span>
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-3">
                  <span className="bg-green-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">5</span>
                  <h3 className="text-xl font-bold text-gray-900">Dilersen Saha Ziyareti Yapalım ve Anahtar Teslim Sera Teklifi Oluşturalım</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Uzman ekibimiz lokasyonunu yerinde inceleyebilir.
                  Arazi yapına özel olarak tam uyumlu anahtar teslim sera projeni planlayıp detaylı teknik teklif hazırlarız.
                </p>
                <a href="#" className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium">
                  📅 Saha Ziyareti Talep Et
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* 6 Analysis Features - Horizontal Sliding Section */}
      <div className="py-20 bg-white">
        <div className="max-w-[960px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              6 Analiz ile Kapsamlı<br />
              Raporlama
            </h2>
          </motion.div>

          {/* Horizontal Sliding Cards */}
          <div className="relative">
            <div className="flex overflow-x-auto scrollbar-hide gap-8 pb-6">

              {/* Card 1 - ROI Hesabı */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="flex-shrink-0 w-96 bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-8 border border-gray-200"
              >
                <div className="text-3xl mb-4">✅</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Yatırım Geri Dönüş (ROI) Hesabı
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Sera yatırımınızın finansal analizini detaylı şekilde hesaplar.
                  Kurulum maliyeti, yıllık üretim kapasitesi ve geri dönüş sürelerini analiz eder.
                </p>
                {/* Placeholder Screenshot */}
                <div className="bg-gray-100 rounded-lg h-48 flex items-center justify-center border-2 border-dashed border-gray-300">
                  <div className="text-center">
                    <div className="text-4xl mb-2">📊</div>
                    <span className="text-gray-500 text-sm">ROI Analiz Ekranı</span>
                  </div>
                </div>
              </motion.div>

              {/* Card 2 - İklim Uyumu */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="flex-shrink-0 w-96 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 border border-gray-200"
              >
                <div className="text-3xl mb-4">✅</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  İklim Uyumu ve Risk Skoru
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  110+ veri kaynağından lokasyonunuzun iklim profili çıkarılır.
                  Don riski, sıcaklık aralığı ve ürün-iklim uyum skoru hesaplanır.
                </p>
                {/* Placeholder Screenshot */}
                <div className="bg-gray-100 rounded-lg h-48 flex items-center justify-center border-2 border-dashed border-gray-300">
                  <div className="text-center">
                    <div className="text-4xl mb-2">🌤️</div>
                    <span className="text-gray-500 text-sm">İklim Analiz Ekranı</span>
                  </div>
                </div>
              </motion.div>

              {/* Card 3 - Ekipman Listesi */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="flex-shrink-0 w-96 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 border border-gray-200"
              >
                <div className="text-3xl mb-4">✅</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Mühendis Onaylı Ekipman Listesi
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Uzman mühendisler tarafından onaylanmış sera ekipmanları ve malzeme listesi.
                  Sera tipine özel öneriler ve teknik spesifikasyonlar.
                </p>
                {/* Placeholder Screenshot */}
                <div className="bg-gray-100 rounded-lg h-48 flex items-center justify-center border-2 border-dashed border-gray-300">
                  <div className="text-center">
                    <div className="text-4xl mb-2">🔧</div>
                    <span className="text-gray-500 text-sm">Ekipman Listesi Ekranı</span>
                  </div>
                </div>
              </motion.div>

              {/* Card 4 - Tarım ve Ticaret Verileri */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="flex-shrink-0 w-96 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-8 border border-gray-200"
              >
                <div className="text-3xl mb-4">✅</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Gerçek Zamanlı Tarım ve Ticaret Verileri
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Güncel pazar fiyatları, ithalat-ihracat verileri ve talep tahminleri.
                  Son 3 yıla ait piyasa analizi ve trend projeksiyonları.
                </p>
                {/* Placeholder Screenshot */}
                <div className="bg-gray-100 rounded-lg h-48 flex items-center justify-center border-2 border-dashed border-gray-300">
                  <div className="text-center">
                    <div className="text-4xl mb-2">📈</div>
                    <span className="text-gray-500 text-sm">Ticaret Verileri Ekranı</span>
                  </div>
                </div>
              </motion.div>

              {/* Card 5 - PDF Raporu */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                className="flex-shrink-0 w-96 bg-gradient-to-br from-red-50 to-pink-50 rounded-2xl p-8 border border-gray-200"
              >
                <div className="text-3xl mb-4">✅</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  PDF Raporu – Anında İndirilebilir
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Tüm analizlerin bir araya geldiği profesyonel PDF raporu.
                  Yatırımcılara sunum yapmak için hazır, detaylı fizibilite belgesi.
                </p>
                {/* Placeholder Screenshot */}
                <div className="bg-gray-100 rounded-lg h-48 flex items-center justify-center border-2 border-dashed border-gray-300">
                  <div className="text-center">
                    <div className="text-4xl mb-2">📄</div>
                    <span className="text-gray-500 text-sm">PDF Rapor Önizleme</span>
                  </div>
                </div>
              </motion.div>

              {/* Card 6 - API Simülasyon */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: true }}
                className="flex-shrink-0 w-96 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl p-8 border border-gray-200"
              >
                <div className="text-3xl mb-4">✅</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  API ile Lokasyon ve Pazar Bazlı Simülasyon
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  API entegrasyonu ile lokasyon ve pazar verilerinin gerçek zamanlı simülasyonu.
                  Dinamik analiz ve güncellenen pazar koşulları.
                </p>
                {/* Placeholder Screenshot */}
                <div className="bg-gray-100 rounded-lg h-48 flex items-center justify-center border-2 border-dashed border-gray-300">
                  <div className="text-center">
                    <div className="text-4xl mb-2">🔗</div>
                    <span className="text-gray-500 text-sm">API Dashboard Ekranı</span>
                  </div>
                </div>
              </motion.div>

            </div>

            {/* Navigation Indicators */}
            <div className="flex justify-center mt-8 space-x-2">
              <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
              <div className="w-2 h-2 bg-gray-900 rounded-full"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Roadmap Section */}
      <div className="py-20">
        <div className="max-w-[960px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Yatırım sürecinizi yapay zekâ destekli<br />
              kullanıcı panelinden yönetin
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Panelinizden tüm raporlarınıza, danışmanlık taleplerinize ve teknik teklif süreçlerinize anlık erişim sağlayın.
              <span className="font-semibold text-gray-900"> Yapay zekâ analizleri, mühendislik değerlendirmeleri ve saha hizmetleri</span>
              artık tek bir merkezden yönetilebilir.
            </p>
          </motion.div>

          {/* Roadmap Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-gray-100 rounded-2xl p-8 shadow-2xl">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                {/* Header */}
                <div className="bg-white border-b border-gray-200 px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                          <span className="text-white text-sm font-bold">S</span>
                        </div>
                        <span className="text-lg font-semibold text-gray-900">SeraGPT</span>
                      </div>

                      <nav className="flex space-x-6">
                        <a href="#" className="text-gray-500 hover:text-gray-700 font-medium">Geri Bildirim</a>
                        <a href="#" className="text-gray-900 font-medium border-b-2 border-gray-900 pb-1">Geliştirme Planı</a>
                        <a href="#" className="text-gray-500 hover:text-gray-700 font-medium">Güncellemeler</a>
                      </nav>
                    </div>

                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gray-800 rounded-full"></div>
                      <div className="w-8 h-8 bg-gray-600 rounded-full"></div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold text-gray-900">Ürün Geliştirme Planı</h1>
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>

                  <div className="space-y-6">
                    {/* Feature 1 */}
                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">Mobil uygulama sık sık çöküyor.</h3>
                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                          </div>
                          <p className="text-gray-600 text-sm mb-3">
                            Android uygulaması sera fotoğrafları yüklenmeye çalışıldığında çöküyor.
                            Bu ASAP düzeltilmesi gerekiyor.
                          </p>
                          <div className="flex items-center space-x-2">
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                              • Devam Ediyor
                            </span>
                          </div>
                        </div>

                        <div className="ml-4 text-right">
                          <div className="text-sm text-gray-500 mb-1">Bir şey eksik mi?</div>
                          <button className="bg-black text-white px-4 py-2 rounded text-sm font-medium">
                            Gönderi Oluştur
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Feature 2 */}
                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">Google Calendar ile entegrasyon.</h3>
                          <p className="text-gray-600 text-sm mb-3">
                            Sera bakım zamanlaması için Google Calendar ile senkronizasyon olsa harika olur.
                          </p>
                          <div className="flex items-center space-x-2">
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              • Planlandı
                            </span>
                          </div>
                        </div>

                        <div className="ml-4 text-right">
                          <div className="text-sm text-gray-500 mb-2">Uygulama sorunu çözülemiyor,</div>
                          <div className="text-sm text-gray-500 mb-2">geçerli şifreler tanınmıyor.</div>
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
                            <div>
                              <div className="font-medium">Şeyran Taslın</div>
                              <div className="text-xs text-gray-500">3 gün önce</div>
                            </div>
                          </div>
                          <div className="mt-2">
                            <button className="text-sm text-blue-600 hover:text-blue-700">
                              Tüm Güncellemeler
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Feature 3 */}
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">'Tümünü okundu işaretle' butonu ekle.</h3>
                      <p className="text-gray-600 text-sm">
                        Bildirimler bölümüne toplu işaretleme özelliği.
                      </p>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="mt-8 pt-6 border-t border-gray-200 text-center">
                    <p className="text-xs text-gray-500">SeraGPT tarafından desteklenmektedir</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Visual Gallery Section */}
      <div className="py-20 bg-white">
        <div className="max-w-[960px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              🏗️ Projelerimizden<br />
              Görüntüler
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Hermisan & ISITMAX iş birliğiyle tamamlanan sera projelerinden seçilmiş görüntüler.
              <span className="font-semibold text-gray-900">500+ başarılı proje</span> deneyimimizden örnekler.
            </p>
          </motion.div>

          {/* Horizontal Scrolling Gallery */}
          <div className="relative mb-12">
            <div className="flex overflow-x-auto scrollbar-hide gap-6 pb-6">
              {/* Gallery Image 1 */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="flex-shrink-0 w-80 h-60 bg-gray-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="w-full h-full bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl mb-3">🏢</div>
                    <p className="text-gray-700 font-medium">Modern Sera Kompleksi</p>
                    <p className="text-gray-500 text-sm">Antalya, 5.000 m²</p>
                  </div>
                </div>
              </motion.div>

              {/* Gallery Image 2 */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="flex-shrink-0 w-80 h-60 bg-gray-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="w-full h-full bg-gradient-to-br from-orange-100 to-red-100 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl mb-3">🍅</div>
                    <p className="text-gray-700 font-medium">Domates Üretim Serası</p>
                    <p className="text-gray-500 text-sm">Mersin, 3.200 m²</p>
                  </div>
                </div>
              </motion.div>

              {/* Gallery Image 3 */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="flex-shrink-0 w-80 h-60 bg-gray-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="w-full h-full bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl mb-3">🌿</div>
                    <p className="text-gray-700 font-medium">Hidroponik Sera Sistemi</p>
                    <p className="text-gray-500 text-sm">İzmir, 2.800 m²</p>
                  </div>
                </div>
              </motion.div>

              {/* Gallery Image 4 */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="flex-shrink-0 w-80 h-60 bg-gray-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="w-full h-full bg-gradient-to-br from-yellow-100 to-orange-100 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl mb-3">🌱</div>
                    <p className="text-gray-700 font-medium">Fide Üretim Tesisi</p>
                    <p className="text-gray-500 text-sm">Bursa, 4.500 m²</p>
                  </div>
                </div>
              </motion.div>

              {/* Gallery Image 5 */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                className="flex-shrink-0 w-80 h-60 bg-gray-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="w-full h-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl mb-3">❄️</div>
                    <p className="text-gray-700 font-medium">İklim Kontrollü Sera</p>
                    <p className="text-gray-500 text-sm">Konya, 6.000 m²</p>
                  </div>
                </div>
              </motion.div>

              {/* Gallery Image 6 */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: true }}
                className="flex-shrink-0 w-80 h-60 bg-gray-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="w-full h-full bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl mb-3">🥒</div>
                    <p className="text-gray-700 font-medium">Salatalık Üretim Serası</p>
                    <p className="text-gray-500 text-sm">Muğla, 2.100 m²</p>
                  </div>
                </div>
              </motion.div>

              {/* Gallery Image 7 */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
                className="flex-shrink-0 w-80 h-60 bg-gray-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="w-full h-full bg-gradient-to-br from-rose-100 to-pink-100 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl mb-3">🌹</div>
                    <p className="text-gray-700 font-medium">Çiçek Üretim Serası</p>
                    <p className="text-gray-500 text-sm">Isparta, 1.800 m²</p>
                  </div>
                </div>
              </motion.div>

              {/* Gallery Image 8 */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                viewport={{ once: true }}
                className="flex-shrink-0 w-80 h-60 bg-gray-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="w-full h-full bg-gradient-to-br from-amber-100 to-yellow-100 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl mb-3">🥬</div>
                    <p className="text-gray-700 font-medium">Organik Sebze Serası</p>
                    <p className="text-gray-500 text-sm">Çanakkale, 3.700 m²</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Scroll indicators */}
            <div className="flex justify-center mt-6 space-x-2">
              <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
              <div className="w-2 h-2 bg-gray-900 rounded-full"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
            </div>
          </div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-green-600 hover:bg-green-700 text-white px-10 py-4 rounded-xl text-xl font-bold transition-colors shadow-lg hover:shadow-xl"
            >
              🏗️ Anahtar Teslim Fiyat Alın
            </motion.button>
            <p className="text-gray-500 text-sm mt-4">
              Uzman ekibimiz size özel teklifini hazırlayacak
            </p>
          </motion.div>
        </div>
      </div>

      {/* Anahtar Teslim Sera Proje Teklifi Section */}
      <div className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-[960px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
              🏗️ Anahtar Teslim Sera<br />
              Proje Teklifi
            </h2>

            {/* Slogan Section */}
            <div className="bg-white rounded-2xl p-8 mb-12 shadow-lg border border-gray-200">
              <div className="border-l-4 border-blue-500 pl-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">📐 Slogan</h3>
                <p className="text-xl text-gray-700 leading-relaxed font-medium">
                  Keşiften kurulum teslimine kadar tüm süreç, mühendislik verisiyle planlanır,
                  <span className="text-blue-600 font-bold"> Avrupa standartlarında</span> inşa edilir.
                </p>
              </div>
            </div>

            {/* Main Description */}
            <div className="bg-white rounded-2xl p-8 mb-12 shadow-lg border border-gray-200">
              <div className="text-left space-y-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">🧾 Proje Açıklaması</h3>

                <p className="text-lg text-gray-700 leading-relaxed">
                  <strong className="text-blue-600">ISITMAX'ın</strong> sağladığı mühendislik, keşif, projelendirme ve süpervizörlük hizmetleri;
                </p>

                <p className="text-lg text-gray-700 leading-relaxed">
                  <strong className="text-green-600">Hermisan Spain'in</strong> üstlendiği tüm yapısal imalat, ekipman tedariği,
                  otomasyon sistemleri ve kurulum süreçleriyle birleşerek,
                </p>

                <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-6 border-l-4 border-blue-500">
                  <p className="text-lg text-gray-800 font-semibold">
                    size tam entegre, sahaya özel, performans garantili
                    <span className="text-blue-600"> anahtar teslim sera çözümleri</span> sunuyoruz.
                  </p>
                </div>
              </div>
            </div>

            {/* System Features */}
            <div className="bg-white rounded-2xl p-8 mb-12 shadow-lg border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Bu sistem dahilinde:</h3>

              <div className="grid md:grid-cols-2 gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="bg-blue-50 rounded-xl p-6 border border-blue-200"
                >
                  <div className="flex items-start space-x-4">
                    <span className="text-3xl">📍</span>
                    <div>
                      <p className="text-gray-800 leading-relaxed">
                        Projeniz, lokasyon, iklim ve üretim hedeflerine göre
                        <strong className="text-blue-600"> teknik olarak modellenir</strong>
                      </p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="bg-green-50 rounded-xl p-6 border border-green-200"
                >
                  <div className="flex items-start space-x-4">
                    <span className="text-3xl">📊</span>
                    <div>
                      <p className="text-gray-800 leading-relaxed">
                        Yatırım fizibilitesi ve enerji/otomasyon senaryoları
                        <strong className="text-green-600"> optimize edilir</strong>
                      </p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="bg-orange-50 rounded-xl p-6 border border-orange-200"
                >
                  <div className="flex items-start space-x-4">
                    <span className="text-3xl">🏗️</span>
                    <div>
                      <p className="text-gray-800 leading-relaxed">
                        Malzeme ve ekipmanlar
                        <strong className="text-orange-600"> Hermisan'ın İspanya üretim hatlarından</strong> sağlanır
                      </p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                  className="bg-purple-50 rounded-xl p-6 border border-purple-200"
                >
                  <div className="flex items-start space-x-4">
                    <span className="text-3xl">🛠️</span>
                    <div>
                      <p className="text-gray-800 leading-relaxed">
                        Kurulum <strong className="text-purple-600">ISITMAX süpervizörlüğünde</strong>,
                        saha yönetimiyle gerçekleştirilir
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Results Section */}
            <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-8 mb-12 text-white shadow-xl">
              <h3 className="text-2xl font-bold mb-6">🎯 Sonuç:</h3>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-4xl mb-3">🛡️</div>
                  <p className="text-lg font-semibold">En düşük yatırım riski</p>
                </div>
                <div>
                  <div className="text-4xl mb-3">📈</div>
                  <p className="text-lg font-semibold">En yüksek verim garantisi</p>
                </div>
                <div>
                  <div className="text-4xl mb-3">✅</div>
                  <p className="text-lg font-semibold">Mühendislik onaylı saha teslimi</p>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-5 rounded-xl text-xl font-bold transition-colors shadow-lg hover:shadow-xl inline-flex items-center space-x-3"
              >
                <span className="text-2xl">📄</span>
                <span>Detaylı Teknik Teklif Talep Et</span>
              </motion.button>
              <p className="text-gray-600 text-sm mt-4">
                Uzman mühendislerimiz size özel teknik teklif hazırlayacak
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Corporate Consulting Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-[960px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              🏛️ Kurumsal Sera<br />
              Danışmanlığı
            </h2>
            <div className="bg-white rounded-2xl p-8 max-w-5xl mx-auto border border-gray-200 shadow-lg">
              <div className="text-lg text-gray-700 leading-relaxed space-y-6">
                <p>
                  <strong>Hermisan & ISITMAX</strong> iş birliğiyle <strong>+500 projede test edilmiş</strong> 
                  mühendislik gücüyle tanışın.
                </p>
                
                <div className="border-l-4 border-blue-500 pl-6">
                  <p className="mb-4">
                    📌 Her sera yatırımı, yerinde analiz ve mühendislik doğrulaması ister. 
                    SeraGPT üzerinden alınan veriler size güçlü bir temel sunar. 
                    Ama arazi koşulları, özel amaçlı üretim hedefleri ve yatırım büyüklüğü arttıkça;
                  </p>
                  <div className="grid md:grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-green-500">✅</span>
                      <span className="font-medium">mühendislik hesapları</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-green-500">✅</span>
                      <span className="font-medium">proje planlama</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-green-500">✅</span>
                      <span className="font-medium">doğru bütçe çıkartımı</span>
                    </div>
                  </div>
                  <p>uzmanlık gerektirir.</p>
                </div>

                <div className="bg-blue-50 rounded-xl p-6">
                  <p className="mb-4">
                    🛠️ İ��te bu noktada, <strong>Hermisan ve ISITMAX</strong> iş birliğiyle sunduğumuz 
                    <strong>"Kurumsal Danışmanlık"</strong> devreye giriyor:
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-3">
                      <span className="text-blue-600">🔹</span>
                      <span className="font-semibold">+20 Yıllık Proje Deneyimi</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-blue-600">🔹</span>
                      <span className="font-semibold">500'den Fazla Tamamlanmış Proje</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Feature Cards Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Engineering Analysis Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 border border-gray-200 hover:shadow-lg transition-shadow"
            >
              <div className="mb-6">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                  <span className="text-2xl">🔧</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Mühendislik Hesapları
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Arazi koşullarına özel statik ve hidrolik hesaplamalar ile 
                  teknik doğrulama süreçleri.
                </p>
              </div>
            </motion.div>

            {/* Project Planning Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 border border-gray-200 hover:shadow-lg transition-shadow"
            >
              <div className="mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                  <span className="text-2xl">📋</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Proje Planlama
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Detaylı zaman çizelgesi, kaynak planlaması ve 
                  aşamalı uygulama stratejileri.
                </p>
              </div>
            </motion.div>

            {/* Budget Optimization Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 border border-gray-200 hover:shadow-lg transition-shadow"
            >
              <div className="mb-6">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                  <span className="text-2xl">💰</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Doğru Bütçe Çıkartımı
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Gerçek piyasa verileri ile optimize edilmiş 
                  maliyet analizi ve bütçe planlaması.
                </p>
              </div>
            </motion.div>

            {/* Site Analysis Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 border border-gray-200 hover:shadow-lg transition-shadow"
            >
              <div className="mb-6">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-4">
                  <span className="text-2xl">🗺️</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Yerinde Analiz
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Uzman ekip tarafından arazi koşulları, 
                  altyapı durumu ve çevresel faktörlerin incelenmesi.
                </p>
              </div>
            </motion.div>

            {/* Custom Production Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 border border-gray-200 hover:shadow-lg transition-shadow"
            >
              <div className="mb-6">
                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mb-4">
                  <span className="text-2xl">🎯</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Özel Üretim Hedefleri
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Hedef ürün ve pazar analizine özel 
                  sera tasarımı ve ekipman seçimi.
                </p>
              </div>
            </motion.div>

            {/* Experience Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 border border-gray-200 hover:shadow-lg transition-shadow"
            >
              <div className="mb-6">
                <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center mb-4">
                  <span className="text-2xl">🏆</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Kanıtlanmış Deneyim
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  20+ yıllık deneyim ve 500+ başarılı proje ile 
                  test edilmiş mühendislik çözümleri.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-8 md:p-12 text-white">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Kurumsal Sera Danışmanlığı Paketinizi İnceleyin
              </h3>
              <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
                SeraGPT verilerinizi Hermisan & ISITMAX uzmanlığı ile birleştirerek 
                profesyonel sera projelerinizi hayata geçirin.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-gray-900 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Kurumsal Danışmanlık Paketi
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Blog Cards Section */}
      <BlogCardsSection />

      {/* Pricing Section */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-[960px] mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Ücretsiz başlayın, hazır olduğunuzda yükseltme yapın
            </h2>
            <p className="text-xl text-gray-600 mb-2">
              Bugün geri bildirim toplamaya başlayın. <span className="font-semibold text-gray-900">Daha iyi ürünler oluşturmak için ihtiyacınız olan her şey ücretsiz</span>.
            </p>
            <p className="text-lg text-gray-500">
              Büyüdükçe yalnızca gelişmiş özellikler için yükseltme yapın.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* Free Plan */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200"
            >
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Ücretsiz</h3>
                <div className="flex items-baseline mb-4">
                  <span className="text-gray-600 text-lg">₺</span>
                  <span className="text-4xl font-bold text-gray-900">0</span>
                  <span className="text-gray-600 text-lg ml-1">aylık</span>
                </div>
                <p className="text-gray-600">Ücretsiz, sonsuza kadar.</p>
              </div>

              <div className="mb-8">
                <p className="text-sm font-medium text-gray-900 mb-4">Dahil olanlar</p>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-sm text-gray-700">Sınırsız Sera Analizü</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-sm text-gray-700">Sınırsız Kullanıcı</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-sm text-gray-700">3 Yönetici Rolü</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-sm text-gray-700">2 Geri Bildirim Panosu</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-sm text-gray-700">Geliştirme Planı</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-sm text-gray-700">Değişiklik Günlüğü</span>
                  </div>
                </div>
              </div>

              <button className="w-full bg-gray-900 text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors">
                Ücretsiz Başla
              </button>
            </motion.div>

            {/* Starter Plan */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200"
            >
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Başlangıç</h3>
                <div className="flex items-baseline mb-4">
                  <span className="text-gray-600 text-lg">₺</span>
                  <span className="text-4xl font-bold text-gray-900">150</span>
                  <span className="text-gray-600 text-lg ml-1">aylık</span>
                </div>
                <p className="text-gray-600">Küçük takımlar için.</p>
              </div>

              <div className="mb-8">
                <p className="text-sm font-medium text-gray-900 mb-4">Dahil olanlar</p>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-sm text-gray-700">Özel Domain</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-sm text-gray-700">Özel Markalama</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-sm text-gray-700">Konuk Gönderileri</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-sm text-gray-700">5 Geri Bildirim Panosu</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-sm text-gray-700">Özel Panolar</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-sm text-gray-700">Bir Entegrasyon</span>
                  </div>
                </div>
              </div>

              <button className="w-full bg-gray-900 text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors">
                Başlangıç Al
              </button>
            </motion.div>

            {/* Professional Plan */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200"
            >
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Profesyonel</h3>
                <div className="flex items-baseline mb-4">
                  <span className="text-gray-600 text-lg">₺</span>
                  <span className="text-4xl font-bold text-gray-900">305</span>
                  <span className="text-gray-600 text-lg ml-1">aylık</span>
                </div>
                <p className="text-gray-600">Büyüyen takımlar için.</p>
              </div>

              <div className="mb-8">
                <p className="text-sm font-medium text-gray-900 mb-4">Dahil olanlar</p>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-sm text-gray-700">Sınırsız Panolar</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-sm text-gray-700">Gelişmiş Arama</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-sm text-gray-700">Konuk Gönderileri</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-sm text-gray-700">Tek Oturum Açma</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-sm text-gray-700">Sınırsız Entegrasyonlar</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-sm text-gray-700">Sınırsız Yönetici Rolleri</span>
                  </div>
                </div>
              </div>

              <button className="w-full bg-gray-900 text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors">
                Pro Al
              </button>
            </motion.div>
          </div>

          {/* Bottom section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <p className="text-gray-600 mb-4">
              Ne kadar tasarruf edersiniz? <span className="font-semibold text-gray-900">%10 daha düşük dönem</span> tasarruf edin?
            </p>
            <button className="text-gray-900 font-medium hover:underline">
              Tasarruflarınızı hesaplayın →
            </button>
          </motion.div>
        </div>
      </div>

      {/* Vision Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-20"
      >
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <div className="w-20 h-20 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-8">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                <span className="text-2xl">🌱</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6 mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Kullanıcılarınızın bir vizyonu var.<br />
              Onların hayata geçirmesine yardım edin.
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
              Birisi bir fikir paylaştığında, inşa ettiğiniz şeye inandığını söylüyor.
              Gerçekten dinlediğinizde, sadece ürün geliştirmiyorsunuz.
              <span className="font-semibold text-gray-900"> İlişkiler kuruyorsunuz</span>.
              İşte fark yaratan bu.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <button className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors inline-flex items-center space-x-3">
              <span>Başlayın</span>
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </button>
            <p className="text-gray-500 text-sm mt-4">
              kredi kartı gerekmez. kurulum baş ağrısı yok.
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* FAQ Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="bg-gray-50 py-20"
      >
        <div className="max-w-[960px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Sıkça sorulan sorular
            </h2>
          </motion.div>

          <div className="space-y-4">
            {[
              {
                question: "Ne kadar hızlı sera analizi toplamaya başlayabilirim?",
                answer: "SeraGPT'yi dakikalar içinde kurabilir ve hemen sera projelerinizi analiz etmeye başlayabilirsiniz."
              },
              {
                question: "Analiz deneyimini özelleştirebilir miyim?",
                answer: "Evet, SeraGPT'yi markanıza uygun şekilde özelleştirebilir ve kendi domain adresinizi kullanabilirsiniz."
              },
              {
                question: "Çok fazla geri bildirim alırsam ne olur?",
                answer: "SeraGPT otomatik olarak geri bildirimleri önceliklendirir ve en önemli konulara odaklanmanızı sağlar."
              },
              {
                question: "SeraGPT kullanıcı geri bildirimlerini önceliklendirmeme nasıl yardımcı olur?",
                answer: "Akıllı algoritma sistemi, kullanıcı oyları ve etkileşim verilerine dayanarak en kritik konuları öne çıkarır."
              },
              {
                question: "SeraGPT müşteri kaybını azaltmaya yardımcı olabilir mi?",
                answer: "Evet, müşteri ihtiyaçlarını önceden tespit ederek ve hızlı çözümler sunarak müşteri memnuniyetini artırır."
              },
              {
                question: "SeraGPT SaaS şirketleri için uygun mu?",
                answer: "Kesinlikle. SeraGPT özellikle hızla büyüyen teknoloji şirketleri için tasarlanmıştır."
              },
              {
                question: "SeraGPT'yi ürün yol haritası yazılımı olarak kullanabilir miyim?",
                answer: "Evet, toplanan geri bildirimler otomatik olarak ürün yol haritanızla entegre edilir."
              },
              {
                question: "SeraGPT geri bildirim takibi sunuyor mu?",
                answer: "Her geri bildirim başından sonuna kadar izlenir ve müşteriler ilerleme hakkında bilgilendirilir."
              },
              {
                question: "SeraGPT ile ürün değişiklik günlüğü oluşturabilir miyim?",
                answer: "Evet, tüm güncellemeler otomatik olarak profesyonel değişiklik günlüklerine dönüştürülür."
              },
              {
                question: "SeraGPT müşteri deneyimi yönetimini nasıl geliştirir?",
                answer: "Merkezi bir platform sağlayarak müşteri sesini dinleme ve yanıtlama sürecini kolaylaştırır."
              },
              {
                question: "SeraGPT konuk veya anonim geri bildirimleri destekliyor mu?",
                answer: "Evet, hem kayıtlı kullanıcılardan hem de anonim ziyaretçilerden geri bildirim toplayabilirsiniz."
              },
              {
                question: "SeraGPT'yi markama uygun şekilde özelleştirebilir miyim?",
                answer: "Tamamen. Logonuzdan renklerinize kadar her detayı markanıza uygun şekilde düzenleyebilirsiniz."
              },
              {
                question: "SeraGPT hangi entegrasyonları sunuyor?",
                answer: "Slack, Teams, Jira, GitHub ve daha birçok popüler araçla entegrasyon imkanı sunar."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl border border-gray-200 overflow-hidden"
              >
                <button className="w-full p-6 text-left hover:bg-gray-50 transition-colors group">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-gray-900 group-hover:text-gray-700">
                      {faq.question}
                    </h3>
                    <svg
                      className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-transform group-hover:rotate-180"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Footer */}
      <footer className="bg-gray-50 py-16">
        <div className="max-w-[960px] mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            {/* Product Column */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
                Ürün
              </h3>
              <div className="space-y-3">
                <a href="#" className="block text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  Başlayın
                </a>
                <a href="#" className="block text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  Fiyatlandırma
                </a>
                <a href="#" className="block text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  Sera Analizi
                </a>
                <a href="#" className="block text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  Güncellemeler
                </a>
                <a href="#" className="block text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  Yol Haritası
                </a>
                <a href="#" className="block text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  Kullanım Senaryoları
                </a>
                <a href="#" className="block text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  Araçlar
                </a>
              </div>
            </div>

            {/* Support Column */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
                Destek
              </h3>
              <div className="space-y-3">
                <a href="#" className="block text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  İletişim
                </a>
                <a href="#" className="block text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  Dokümantasyon
                </a>
                <a href="#" className="block text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  Blog
                </a>
                <a href="#" className="block text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  Durum
                </a>
                <a href="#" className="block text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  Başarı Hikayeleri
                </a>
                <a href="#" className="block text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  Tanımlar
                </a>
              </div>
            </div>

            {/* Legal Column */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
                Yasal
              </h3>
              <div className="space-y-3">
                <a href="/privacy" className="block text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  Gizlilik
                </a>
                <a href="/terms" className="block text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  Koşullar
                </a>
              </div>
            </div>

            {/* Resources Column */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
                Kaynaklar
              </h3>
              <div className="space-y-3">
                <a href="#" className="block text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  AgroConsult Alternatifi
                </a>
                <a href="#" className="block text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  FarmScope Alternatifi
                </a>
                <a href="#" className="block text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  SeraVision Alternatifi
                </a>
                <a href="#" className="block text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  Karşılaştır
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2F2c7ec7c93776440b923d3518963fc941%2F96da5382e9584c3fb2d32eca60944359?format=webp&width=800"
                alt="SeraGPT Logo"
                className="h-8 w-auto"
              />
            </div>

              <div className="text-center md:text-right">
                <p className="text-sm text-gray-500">
                  © 2025 SeraGPT. Tüm hakları saklıdır.
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
