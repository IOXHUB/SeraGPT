'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import BlogCardsSection from './BlogCardsSection';
import Footer from '../Footer';

export default function UserjotCloneSection() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openFAQ, setOpenFAQ] = useState<number | null>(0); // First FAQ open by default

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header - Full width with 960px content container */}
      <header className="w-full bg-gray-50">
        <div className="navbar-footer-container">
          {/* Logo - clickable to homepage */}
          <div className="flex items-center space-x-3">
            <a href="/" className="flex items-center space-x-3">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2F2c7ec7c93776440b923d3518963fc941%2F96da5382e9584c3fb2d32eca60944359?format=webp&width=800"
                alt="SeraGPT Logo"
                className="h-8 w-auto"
              />
            </a>
          </div>

          {/* Center navigation - 3 links */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
              Danışmanlık
            </a>
            <a href="#" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
              Anahtar Teslim Proje
            </a>
            <a href="#" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
              Destek
            </a>
          </nav>

          {/* Right menu - conditional based on user state */}
          <div className="hidden md:flex items-center space-x-4">
            {/* For logged in users */}
            <a href="/dashboard" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
              Dashboard
            </a>

            {/* For logged out users - first time visitors */}
            <a href="/auth/login" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
              Giriş Yap
            </a>

            {/* CTA Button for new users */}
            <a href="/dashboard" className="bg-black text-white px-6 py-2 rounded-xl font-semibold hover:bg-gray-800 transition-colors">
              Ücretsiz Başla
            </a>
          </div>

          {/* Mobile menu button - hamburger icon */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-gray-50 border-t border-gray-200"
          >
            <div className="text-section-container py-4 space-y-4">
              {/* Center navigation links */}
              <div className="space-y-3">
                <a
                  href="#"
                  className="block text-gray-700 hover:text-gray-900 font-medium transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Danışmanlık
                </a>
                <a
                  href="#"
                  className="block text-gray-700 hover:text-gray-900 font-medium transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Anahtar Teslim Proje
                </a>
                <a
                  href="#"
                  className="block text-gray-700 hover:text-gray-900 font-medium transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Destek
                </a>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-200 my-4"></div>

              {/* Right menu actions */}
              <div className="space-y-3">
                <a
                  href="/dashboard"
                  className="block text-gray-700 hover:text-gray-900 font-medium transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Dashboard
                </a>
                <a
                  href="/auth/login"
                  className="block text-gray-700 hover:text-gray-900 font-medium transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Giriş Yap
                </a>
                <a
                  href="/dashboard"
                  className="block bg-black hover:bg-gray-800 text-white px-4 py-3 rounded-xl font-medium transition-colors text-center"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Ücretsiz Başla
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </header>

      {/* Main content - Full viewport hero */}
      <main className="min-h-screen flex items-center justify-center px-4 sm:px-6" style={{marginTop: '-50px'}}>
        <div className="max-w-[576px] mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-5"
          >
            {/* Small text above headline */}
            <p className="text-gray-500 text-sm font-medium uppercase tracking-wider">
              +20 YIL, +500 PROJE, +110 VERİ SETİ
            </p>

            {/* Main headline */}
            <h1 className="text-4xl font-bold text-gray-900 leading-tight space-y-2">
              <div className="text-gray-600">🚀 60 Saniyede</div>
              <div className="text-gray-600">Sera Yatırım Raporun Hazır!</div>
            </h1>

            {/* Description paragraph */}
            <p className="text-sm text-gray-600 leading-relaxed px-4 mt-5">
              SeraGPT; 20 yılı aşkın mühendislik deneyimi, 500'den fazla
              tamamlanmış proje ve 110'dan fazla gerçek zamanlı veri
              setiyle, tarımsal yatırım kararlarınızı saniyeler içinde
              analiz eder.
            </p>

            {/* CTA Button */}
            <div className="mt-5">
              <motion.a
                href="https://17ddca60910e4daea7522c0f6038c4a4-dd51946acbf540e29f8c9d1d0.fly.dev/dashboard"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-black hover:bg-gray-800 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-colors inline-flex items-center space-x-3"
              >
                <span className="text-center">Şimdi Oluştur – İlk 5 Rapor Ücretsiz</span>
              </motion.a>
            </div>

            {/* Small text under button */}
            <p className="text-gray-500 text-sm pb-10">
              Doğru yatırım, doğru analizle başlar.
            </p>
          </motion.div>
        </div>
      </main>

      {/* AI Chat Section */}
      <div className="py-20 text-gray-600">
        <div className="text-section-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Tarımsal Zeka Panelinizde Sizi Bekliyor!
            </h2>
            <p className="text-sm text-gray-600 text-section-container leading-relaxed">
              Proje çıktılarınız üzerine sohbet edebileceğiniz, derinlemesine araştırma yapabileceğiniz özel asistanınız panelinizde sizi bekliyor, üstelik tamamen ücretsiz
            </p>
          </motion.div>

          {/* AI Chat Flow */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative max-w-[900px] mx-auto"
          >
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-8" style={{boxShadow: '0 25px 50px -12px rgba(59, 130, 246, 0.25), 0 0 0 1px rgba(59, 130, 246, 0.05)'}}>
              <div className="bg-gray-50 rounded-xl p-6 space-y-6">
                
                {/* ROI Analysis Display */}
                <div className="p-4 bg-white rounded-lg border border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-3">ROI Analiz Raporu - Antalya Sera Projesi</h3>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">%24</div>
                      <div className="text-gray-600">Yıllık Getiri</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">3.2</div>
                      <div className="text-gray-600">Geri Dönüş (Yıl)</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">₺2.1M</div>
                      <div className="text-gray-600">Toplam Yatırım</div>
                    </div>
                  </div>
                </div>

                {/* Chat Messages Flow */}
                <div className="space-y-6">
                  
                  {/* User Message 1 */}
                  <div className="flex justify-end">
                    <div className="bg-blue-600 text-white px-4 py-2 rounded-lg max-w-sm">
                      <p className="text-sm">Bu ROI hesabında enerji maliyetleri nasıl değerlendirildi?</p>
                    </div>
                  </div>

                  {/* AI Response 1 */}
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs">🤖</span>
                    </div>
                    <div className="bg-white border border-gray-200 px-4 py-3 rounded-lg max-w-lg">
                      <p className="text-sm text-gray-700 mb-2">
                        Enerji maliyetleri hesaplamasında şu faktörleri dikkate aldım:
                      </p>
                      <ul className="text-xs text-gray-600 space-y-1 mb-3">
                        <li>• Antalya elektrik tarifesi: 2.18 ₺/kWh</li>
                        <li>• Sera ısıtma ihtiyacı: 180 gün/yıl</li>
                        <li>• LED aydınlatma: 12 saat/gün</li>
                        <li>• Soğutma sistemi: Mayıs-Ekim arası</li>
                      </ul>
                      <div className="bg-gray-50 p-2 rounded text-xs">
                        <strong>Yıllık enerji maliyeti: ₺142,000</strong>
                      </div>
                    </div>
                  </div>

                  {/* User Message 2 */}
                  <div className="flex justify-end">
                    <div className="bg-blue-600 text-white px-4 py-2 rounded-lg max-w-sm">
                      <p className="text-sm">Güneş paneli yatırımı ROI'yi nasıl etkiler?</p>
                    </div>
                  </div>

                  {/* AI Response 2 with Technical Analysis */}
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs">🤖</span>
                    </div>
                    <div className="bg-white border border-gray-200 px-4 py-3 rounded-lg max-w-lg">
                      <p className="text-sm text-gray-700 mb-3">
                        100kW güneş paneli sistemi ile önemli iyileşmeler görülüyor:
                      </p>
                      <div className="bg-green-50 p-3 rounded border border-green-200 text-xs space-y-2">
                        <div className="flex justify-between">
                          <span>Enerji tasarrufu:</span>
                          <span className="font-semibold">₺89,000/yıl</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Yeni ROI:</span>
                          <span className="font-semibold text-green-600">%31.2 (↗7.2%)</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Geri dönüş süresi:</span>
                          <span className="font-semibold text-green-600">2.4 yıl (↘0.8 yıl)</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Net bugünkü değer:</span>
                          <span className="font-semibold">₺1.8M</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* User Message 3 */}
                  <div className="flex justify-end">
                    <div className="bg-blue-600 text-white px-4 py-2 rounded-lg max-w-sm">
                      <p className="text-sm">İklim riskleri bu hesaplamalara nasıl yansıyor?</p>
                    </div>
                  </div>

                  {/* AI Response 3 with Risk Analysis */}
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs">🤖</span>
                    </div>
                    <div className="bg-white border border-gray-200 px-4 py-3 rounded-lg max-w-lg">
                      <p className="text-sm text-gray-700 mb-3">
                        Antalya için iklim risk analizi:
                      </p>
                      <div className="space-y-2 text-xs">
                        <div className="bg-yellow-50 p-2 rounded border border-yellow-200">
                          <div className="font-semibold text-yellow-800">Orta Risk Faktörleri:</div>
                          <div className="text-yellow-700">• Yıllık 3-4 dolu riski (%2-3 hasar)</div>
                          <div className="text-yellow-700">• Aşırı sıcaklık (40°C+) : 15-20 gün</div>
                        </div>
                        <div className="bg-blue-50 p-2 rounded border border-blue-200">
                          <div className="font-semibold text-blue-800">Risk Azaltma:</div>
                          <div className="text-blue-700">• Sigorta maliyeti: ₺12,000/yıl</div>
                          <div className="text-blue-700">• Dayanıklı cam: +₺180,000 yatırım</div>
                        </div>
                        <div className="bg-gray-50 p-2 rounded border border-gray-200">
                          <div className="font-semibold">Düzeltilmiş ROI: <span className="text-green-600">%28.5</span></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* User Message 4 */}
                  <div className="flex justify-end">
                    <div className="bg-blue-600 text-white px-4 py-2 rounded-lg max-w-sm">
                      <p className="text-sm">5 yıllık finansal projeksiyon verebilir misin?</p>
                    </div>
                  </div>

                  {/* AI Response 4 with Financial Projection */}
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs">🤖</span>
                    </div>
                    <div className="bg-white border border-gray-200 px-4 py-3 rounded-lg max-w-lg">
                      <p className="text-sm text-gray-700 mb-3">
                        5 Yıllık Finansal Projeksiyon:
                      </p>
                      <div className="bg-gray-50 p-3 rounded text-xs">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b">
                              <th className="text-left py-1">Yıl</th>
                              <th className="text-right py-1">Gelir</th>
                              <th className="text-right py-1">Maliyet</th>
                              <th className="text-right py-1">Net Kar</th>
                            </tr>
                          </thead>
                          <tbody className="text-xs">
                            <tr><td>2024</td><td className="text-right">₺580K</td><td className="text-right">₺420K</td><td className="text-right font-semibold text-green-600">₺160K</td></tr>
                            <tr><td>2025</td><td className="text-right">₺612K</td><td className="text-right">₺441K</td><td className="text-right font-semibold text-green-600">₺171K</td></tr>
                            <tr><td>2026</td><td className="text-right">₺646K</td><td className="text-right">₺463K</td><td className="text-right font-semibold text-green-600">₺183K</td></tr>
                            <tr><td>2027</td><td className="text-right">₺681K</td><td className="text-right">₺486K</td><td className="text-right font-semibold text-green-600">₺195K</td></tr>
                            <tr><td>2028</td><td className="text-right">₺718K</td><td className="text-right">₺510K</td><td className="text-right font-semibold text-green-600">₺208K</td></tr>
                          </tbody>
                        </table>
                        <div className="mt-2 pt-2 border-t font-semibold">
                          Toplam 5 yıl kar: <span className="text-green-600">₺917K</span>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Chat Input */}
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex items-center space-x-3">
                    <input
                      type="text"
                      placeholder="Analiz sonuçları hakkında teknik soru sorun..."
                      className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button className="bg-black text-white p-2 rounded-lg hover:bg-gray-800">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-black hover:bg-gray-800 text-white px-10 py-4 rounded-xl text-xl font-bold transition-colors shadow-lg hover:shadow-xl"
            >
              AI Asistanla Sohbet Başlat
            </motion.button>
            <p className="text-gray-500 text-sm mt-4">
              Analizleriniz üzerine derinlemesine konuşun, tamamen ücretsiz
            </p>
          </motion.div>
        </div>
      </div>

      {/* How It Works Section - Horizontal Scrolling */}
      <div className="py-20 bg-gray-50 text-gray-600">
        <div className="page-section-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Panelde Sizi Bekleyen Analiz Türleri ve Özellikleri
            </h2>
          </motion.div>

          {/* Horizontal Scrolling Cards */}
          <div className="relative">
            <div className="flex overflow-x-auto scrollbar-hide space-x-6 pb-6">
              {/* Card 1 - ROI Simülasyonu */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="flex-shrink-0 w-80 bg-white rounded-2xl p-8 border border-gray-200 relative"
              >
                <div className="absolute top-6 left-6 text-6xl font-bold text-gray-100">01</div>
                <div className="mt-16">
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4">Yatırım Geri Dönüş (ROI) Simülasyonu</h3>

                  <div className="space-y-3 mb-4">
                    <div>
                      <p className="text-gray-800 text-xs font-semibold mb-1">🎯 3 Önemli Fayda:</p>
                      <p className="text-gray-600 text-xs">• Yatırımın geri dönüş süresi</p>
                      <p className="text-gray-600 text-xs">• Kar marjı ve yıllık getiri tahmini</p>
                      <p className="text-gray-600 text-xs">• İşletme maliyetleri kıyaslaması</p>
                    </div>

                    <div>
                      <p className="text-gray-800 text-xs font-semibold mb-1">🔗 Veri Kaynakları:</p>
                      <p className="text-gray-600 text-xs">• OpenWeather, FAO & TUİK</p>
                      <p className="text-gray-600 text-xs">• Seraburada / e-Tarım API</p>
                    </div>

                    <div>
                      <p className="text-gray-800 text-xs font-semibold mb-1">👤 Kullanıcı Girdisi:</p>
                      <p className="text-gray-600 text-xs">• Lokasyon, bitki türü, üretim hedefi</p>
                    </div>

                    <div>
                      <p className="text-gray-800 text-xs font-semibold mb-1">📄 PDF İçeriği:</p>
                      <p className="text-gray-600 text-xs">• ROI tablosu ve 3 yıllık projeksiyonu</p>
                    </div>
                  </div>

                  <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                    <p className="text-gray-700 text-sm font-medium">"Yatırımınız size ne zaman geri döner?"</p>
                    <button className="mt-2 text-blue-600 text-xs font-medium hover:underline">[PDF'yi Örnekle Gör]</button>
                  </div>
                </div>
              </motion.div>

              {/* Card 2 - İklim Analizi */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="flex-shrink-0 w-80 bg-white rounded-2xl p-8 border border-gray-200 relative"
              >
                <div className="absolute top-6 left-6 text-6xl font-bold text-gray-100">02</div>
                <div className="mt-16">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">İklim Uyumu & Risk Analizi</h3>

                  <div className="space-y-3 mb-4">
                    <div>
                      <p className="text-gray-800 text-xs font-semibold mb-1">🎯 3 Önemli Fayda:</p>
                      <p className="text-gray-600 text-xs">• Seçilen ürün için uygunluk skoru</p>
                      <p className="text-gray-600 text-xs">• Don, rüzgar, nem riskleri</p>
                      <p className="text-gray-600 text-xs">• Geçmiş yıllardaki iklim olayları</p>
                    </div>

                    <div>
                      <p className="text-gray-800 text-xs font-semibold mb-1">🔗 Veri Kaynakları:</p>
                      <p className="text-gray-600 text-xs">• Open-Meteo, Copernicus Climate</p>
                      <p className="text-gray-600 text-xs">• ERA5 verileri, MGMT</p>
                    </div>

                    <div>
                      <p className="text-gray-800 text-xs font-semibold mb-1">👤 Kullanıcı Girdisi:</p>
                      <p className="text-gray-600 text-xs">• İl/ilçe, bitki türü, sera tipi</p>
                    </div>

                    <div>
                      <p className="text-gray-800 text-xs font-semibold mb-1">📄 PDF İçeriği:</p>
                      <p className="text-gray-600 text-xs">• Uygunluk skoru ve risk matrisi</p>
                    </div>
                  </div>

                  <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                    <p className="text-gray-700 text-sm font-medium">"İklim bu yatırıma uygun mu?"</p>
                    <button className="mt-2 text-blue-600 text-xs font-medium hover:underline">[İklim Skorunu Gör]</button>
                  </div>
                </div>
              </motion.div>

              {/* Card 3 - Ekipman Listesi */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="flex-shrink-0 w-80 bg-white rounded-2xl p-8 border border-gray-200 relative"
              >
                <div className="absolute top-6 left-6 text-6xl font-bold text-gray-100">03</div>
                <div className="mt-16">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Mühendis Onaylı Ekipman Listesi</h3>

                  <div className="space-y-3 mb-4">
                    <div>
                      <p className="text-gray-800 text-xs font-semibold mb-1">🎯 3 Önemli Fayda:</p>
                      <p className="text-gray-600 text-xs">• Bölgeye uygun yapı ve iklimlendirme</p>
                      <p className="text-gray-600 text-xs">• Anahtar teslim modüler öneriler</p>
                      <p className="text-gray-600 text-xs">• Genişletilebilirlik alternatifleri</p>
                    </div>

                    <div>
                      <p className="text-gray-800 text-xs font-semibold mb-1">🔗 Veri Kaynakları:</p>
                      <p className="text-gray-600 text-xs">• Internal equipment DB</p>
                      <p className="text-gray-600 text-xs">• Mühendis doğrulama kütüphanesi</p>
                    </div>

                    <div>
                      <p className="text-gray-800 text-xs font-semibold mb-1">👤 Kullanıcı Girdisi:</p>
                      <p className="text-gray-600 text-xs">• Sera büyüklüğü, yapı tipi, enerji</p>
                    </div>

                    <div>
                      <p className="text-gray-800 text-xs font-semibold mb-1">📄 PDF İçeriği:</p>
                      <p className="text-gray-600 text-xs">• Modüler ekipman ve maliyet listesi</p>
                    </div>
                  </div>

                  <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                    <p className="text-gray-700 text-sm font-medium">"Mühendislerin önerdiği en doğru sistem"</p>
                    <button className="mt-2 text-blue-600 text-xs font-medium hover:underline">[Ekipman Listesine Bak]</button>
                  </div>
                </div>
              </motion.div>

              {/* Card 4 - Pazar Verisi */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="flex-shrink-0 w-80 bg-white rounded-2xl p-8 border border-gray-200 relative"
              >
                <div className="absolute top-6 left-6 text-6xl font-bold text-gray-100">04</div>
                <div className="mt-16">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Pazar ve Tarım Verisi Entegrasyonu</h3>

                  <div className="space-y-3 mb-4">
                    <div>
                      <p className="text-gray-800 text-xs font-semibold mb-1">🎯 3 Önemli Fayda:</p>
                      <p className="text-gray-600 text-xs">• Bitki türüne göre pazar fiyat analizi</p>
                      <p className="text-gray-600 text-xs">• Bölgeye göre verim ortalamaları</p>
                      <p className="text-gray-600 text-xs">• Hasat-zamanlama optimizasyonu</p>
                    </div>

                    <div>
                      <p className="text-gray-800 text-xs font-semibold mb-1">🔗 Veri Kaynakları:</p>
                      <p className="text-gray-600 text-xs">• TUİK, FAO, Türkiye Hal Fiyatları</p>
                      <p className="text-gray-600 text-xs">• TMO & Ziraat Odası verileri</p>
                    </div>

                    <div>
                      <p className="text-gray-800 text-xs font-semibold mb-1">👤 Kullanıcı Girdisi:</p>
                      <p className="text-gray-600 text-xs">• Bitki türü, sezon, pazarlama hedefi</p>
                    </div>

                    <div>
                      <p className="text-gray-800 text-xs font-semibold mb-1">📄 PDF İçeriği:</p>
                      <p className="text-gray-600 text-xs">• Fiyat analizi ve hasat çizelgesi</p>
                    </div>
                  </div>

                  <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                    <p className="text-gray-700 text-sm font-medium">"Pazarlar ne diyor? Bitkiniz değerli mi?"</p>
                    <button className="mt-2 text-blue-600 text-xs font-medium hover:underline">[Verileri Göster]</button>
                  </div>
                </div>
              </motion.div>

              {/* Card 5 - Teknik Plan */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                className="flex-shrink-0 w-80 bg-white rounded-2xl p-8 border border-gray-200 relative"
              >
                <div className="absolute top-6 left-6 text-6xl font-bold text-gray-100">05</div>
                <div className="mt-16">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Yerleşim ve Teknik Plan Görselleştirmesi</h3>

                  <div className="space-y-3 mb-4">
                    <div>
                      <p className="text-gray-800 text-xs font-semibold mb-1">🎯 3 Önemli Fayda:</p>
                      <p className="text-gray-600 text-xs">• Sera yerleşim planı (2D çizim)</p>
                      <p className="text-gray-600 text-xs">• Elektrik ve sulama hat planı</p>
                      <p className="text-gray-600 text-xs">• Teknik kabin, depo gösterimi</p>
                    </div>

                    <div>
                      <p className="text-gray-800 text-xs font-semibold mb-1">🔗 Veri Kaynakları:</p>
                      <p className="text-gray-600 text-xs">• Planner 2D, CAD AI Tools</p>
                      <p className="text-gray-600 text-xs">• HerbaTools yerleşim kütüphanesi</p>
                    </div>

                    <div>
                      <p className="text-gray-800 text-xs font-semibold mb-1">👤 Kullanıcı Girdisi:</p>
                      <p className="text-gray-600 text-xs">• Parsel ölçüleri, teknik bölmeler</p>
                    </div>

                    <div>
                      <p className="text-gray-800 text-xs font-semibold mb-1">📄 PDF İçeriği:</p>
                      <p className="text-gray-600 text-xs">• Teknik çizim ve montaj önerileri</p>
                    </div>
                  </div>

                  <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                    <p className="text-gray-700 text-sm font-medium">"2D/3D Yerleşim Planı Hazır!"</p>
                    <button className="mt-2 text-blue-600 text-xs font-medium hover:underline">[Planı Önizle]</button>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Navigation Arrows */}
            <div className="flex justify-end mt-6 space-x-2">
              <button className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
