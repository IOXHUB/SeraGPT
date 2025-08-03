'use client';

import { motion } from 'framer-motion';

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
            <button className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
              Giriş Yap
            </button>
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
              BİR SERA MÜHENDİSİ BANA SON ZAMANLARDA SORDU
            </p>
            
            {/* Main headline with quotes */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
              <span className="text-gray-400">"</span>
              Neden yanlış sera projeleri için zaman kaybediyoruz?
              <span className="text-gray-400">"</span>
            </h1>
            
            {/* Description paragraph */}
            <p className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-5xl mx-auto">
              Sera yatırım kararlarınız dağınık analizler, belirsiz veriler ve 
              güvenilmez danışmanlıklar arasında kayboldu. SeraGPT merkezi bir 
              platform yaratıyor; <span className="font-semibold text-gray-900">
              mühendisler analiz yapar, oy verir ve projeleri tartışır</span>, 
              böylece her zaman bir sonraki doğru adımı bilirsiniz.
            </p>
            
            {/* CTA Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-black hover:bg-gray-800 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors inline-flex items-center space-x-3"
            >
              <span>Ücretsiz Başla</span>
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            </motion.button>
            
            {/* Small text under button */}
            <p className="text-gray-500 text-sm">
              Kredi kartı gerekmez. Kurulum gerektirmez.
            </p>
          </motion.div>
        </div>
      </main>

      {/* Bottom illustration area - matching Userjot's rounded container */}
      <div className="px-6 pb-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl border border-gray-200 p-8 md:p-12"
          >
            <div className="text-center text-gray-400">
              <div className="text-6xl mb-4">📊</div>
              <p className="text-lg font-medium">SeraGPT Analiz Platformu</p>
              <p className="text-sm mt-2">Sera yatırım kararlarınız için merkezi analiz merkezi</p>
              
              {/* Simple dashboard mockup */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <div className="text-2xl mb-2">🌱</div>
                  <div className="text-sm text-gray-600">Proje Analizi</div>
                </div>
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <div className="text-2xl mb-2">📈</div>
                  <div className="text-sm text-gray-600">ROI Hesaplama</div>
                </div>
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <div className="text-2xl mb-2">👨‍💼</div>
                  <div className="text-sm text-gray-600">Uzman Görüşü</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Horizontal Scrolling Features Section */}
      <div className="py-20">
        <div className="max-w-[960px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-gray-500 text-sm font-medium uppercase tracking-wider mb-4">
              PEKİ, TAM OLARAK NE YAPABILIRSINIZ
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              kullanıcıların gerçekten<br />
              istediği projeleri nasıl yaparsınız?
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              SeraGPT, sera analizlerine bir yuva veriyor; mühendisler oy verir,
              tartışır ve projenizi şekillendirmeye yardımcı olur.
              <span className="font-semibold text-gray-900"> popüler taleplerin nasıl
              ortaya çıktığını ve mühendislerin sevdiği özelliklere dönüştüğünü</span> izleyin.
            </p>
          </motion.div>

          {/* Horizontal scrolling cards */}
          <div className="relative">
            <div className="flex overflow-x-auto scrollbar-hide gap-6 pb-6">
              {/* Card 1 */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="flex-shrink-0 w-80 bg-gray-50 rounded-2xl p-8 border border-gray-200"
              >
                <div className="text-8xl font-bold text-gray-200 mb-6">01</div>
                <div className="text-4xl mb-6">📊</div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Analiz Toplama
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Kullanıcılar sera projelerini ve geri bildirimlerini basit,
                  sezgisel bir arayüz üzerinden gönderir. Her gönderim takip edilir.
                </p>
              </motion.div>

              {/* Card 2 */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="flex-shrink-0 w-80 bg-gray-50 rounded-2xl p-8 border border-gray-200"
              >
                <div className="text-8xl font-bold text-gray-200 mb-6">02</div>
                <div className="text-4xl mb-6">👍</div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Oylama & Önceliklendirme
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Topluluk en önemli konulara oy verir. Hangi özelliklerin
                  10'dan 100'e oy aldığını anında görün.
                </p>
              </motion.div>

              {/* Card 3 */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="flex-shrink-0 w-80 bg-gray-50 rounded-2xl p-8 border border-gray-200"
              >
                <div className="text-8xl font-bold text-gray-200 mb-6">03</div>
                <div className="text-4xl mb-6">💬</div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Tartışma & İyileştirme
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Zengin tartışmalar her talebin arkasındaki neden anlamanıza
                  yardımcı olur. Önemli olan bağlamı edinin.
                </p>
              </motion.div>

              {/* Card 4 */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="flex-shrink-0 w-80 bg-gray-50 rounded-2xl p-8 border border-gray-200"
              >
                <div className="text-8xl font-bold text-gray-200 mb-6">04</div>
                <div className="text-4xl mb-6">🚀</div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Uygulama & Takip
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Onaylanan projeler geliştirme sürecine alınır. Müşteriler
                  ilerlemeyi takip edebilir ve sonuçları görür.
                </p>
              </motion.div>
            </div>

            {/* Navigation arrows */}
            <div className="flex justify-center mt-8 space-x-4">
              <button className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Understanding Section with Product Mockup */}
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
              Her sera projesinin arkasındaki<br />
              gerçek ihtiyacı anlayın
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Analizler hangi projelerin popüler olduğunu gösterir, tartışmalar neden önemli olduğunu ortaya çıkarır.
              <span className="font-semibold text-gray-900"> Her müşterinin hangi özelliklere ihtiyacı olduğunu görün,
              iş akışlarını anlayın ve gerçekten sorunları çözen sera çözümleri</span> geliştirin.
              Tahminlerle değil, güvenle proje yapın.
            </p>
          </motion.div>

          {/* Product Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
              {/* Browser Header */}
              <div className="bg-gray-100 px-4 py-3 flex items-center space-x-2 border-b border-gray-200">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="bg-white rounded px-3 py-1 text-sm text-gray-600 border border-gray-300 min-w-64 text-center">
                    seragpt.com
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                  </svg>
                </div>
              </div>

              {/* App Content */}
              <div className="flex">
                {/* Sidebar */}
                <div className="w-64 bg-gray-50 border-r border-gray-200 p-4">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">S</span>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">SeraGPT</div>
                      <div className="text-xs text-gray-500">Pro Plan</div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">PROJELER</h3>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between py-2">
                          <div className="flex items-center space-x-3">
                            <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                            <span className="text-sm text-gray-700">Beklemede</span>
                          </div>
                          <span className="text-xs text-gray-500">24</span>
                        </div>
                        <div className="flex items-center justify-between py-2">
                          <div className="flex items-center space-x-3">
                            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                            <span className="text-sm text-gray-700">İnceleniyor</span>
                          </div>
                          <span className="text-xs text-gray-500">8</span>
                        </div>
                        <div className="flex items-center justify-between py-2 bg-gray-100 rounded px-2 -mx-2">
                          <div className="flex items-center space-x-3">
                            <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                            <span className="text-sm font-medium text-gray-900">Planlandı</span>
                          </div>
                          <span className="text-xs font-medium text-gray-900">30</span>
                        </div>
                        <div className="flex items-center justify-between py-2">
                          <div className="flex items-center space-x-3">
                            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                            <span className="text-sm text-gray-700">Tamamlandı</span>
                          </div>
                          <span className="text-xs text-gray-500">74</span>
                        </div>
                        <div className="flex items-center justify-between py-2">
                          <div className="flex items-center space-x-3">
                            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                            <span className="text-sm text-gray-700">Kapalı</span>
                          </div>
                          <span className="text-xs text-gray-500">25</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">HİZMETLER</h3>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-3 py-1">
                          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                          <span className="text-sm text-gray-700">Danışmanlık</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">ÇALIŞMA ALANLARI</h3>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-3 py-1">
                          <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                          <span className="text-sm text-gray-700">Branding</span>
                        </div>
                        <div className="flex items-center space-x-3 py-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                          <span className="text-sm text-gray-700">Ayarlar</span>
                        </div>
                        <div className="flex items-center space-x-3 py-1">
                          <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                          <span className="text-sm text-gray-700">Pano</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 p-6">
                  <div className="mb-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-2">
                      Sera içi widget'ları için geri bildirim toplama.
                    </h2>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Sera içi gömülü widget'ları uygulayın; geri bildirim toplamak, roadmap'i görüntülemek ve
                      güncellemeleri doğrudan uygulama içinde almak için.
                    </p>
                  </div>

                  {/* User Comment */}
                  <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-bold">ŞT</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-medium text-gray-900">Şeyran Taşlın</span>
                          <span className="text-xs text-gray-500">21 May 2024</span>
                        </div>
                        <div className="flex items-center space-x-4 mb-3">
                          <div className="flex items-center space-x-1">
                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            <span className="text-xs text-gray-500">15</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                            </svg>
                            <span className="text-xs text-gray-500">39</span>
                          </div>
                        </div>
                        <div className="border-b border-gray-200">
                          <div className="flex space-x-6 mb-4">
                            <button className="text-sm font-medium text-gray-900 border-b-2 border-gray-900 pb-2">
                              Yorumlar
                            </button>
                            <button className="text-sm text-gray-500 pb-2">
                              Reaksiyonlar
                            </button>
                            <button className="text-sm text-gray-500 pb-2">
                              Detaylar
                            </button>
                          </div>
                        </div>
                        <div className="mt-4">
                          <input
                            type="text"
                            placeholder="Bir yorum yazın..."
                            className="w-full p-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            suppressHydrationWarning={true}
                          />
                          <div className="flex justify-end mt-2">
                            <button className="bg-black text-white px-4 py-2 rounded text-sm font-medium">
                              Gönder
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Additional Comment */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-bold">AS</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="font-medium text-gray-900">Adem Smith</span>
                          <span className="text-xs text-gray-500">about 3 hours ago</span>
                        </div>
                        <p className="text-sm text-gray-700 leading-relaxed">
                          Bu sera yönetim sistemi için oldukça kullanışlı, ancak mevcut sera verilerimle entegrasyon konusunda endişelerim var.
                          Mevcut sensörlerle uyumlu olup olmadığını ve özellikle yeni özellikleri duyurmak için nasıl bir widget kullanacağımızı bilmek istiyorum.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
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
              Geliştirme planınızı<br />
              kalma sebebine dönüştürün
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Herkese açık geliştirme planı, kullanıcılara <span className="font-semibold text-gray-900">talep ettikleri özelliklerin
              gerçekten yapıldığını</span> gösterir. Zaman çizelgelerini görürler, ilerlemeyi takip ederler ve
              hayal kırıklığı yerine heyecanlanırlar. Artık "bu ne zaman gelecek?" e-postaları yok.
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

      {/* Features Announcement Section */}
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
              Kullanıcıların istediği özellikleri<br />
              geliştirin ve onlara anlatın
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Ürün geliştirmedeki en güzel an? Birine <span className="font-semibold text-gray-900">"Bunu istedin,
              biz de yaptık"</span> demek. Güzel değişiklik günlükleri <span className="font-semibold text-gray-900">her sürümü sergiler</span>
              ve istekte bulunanları otomatik olarak bilgilendirir. Müşterileri savunucuya dönüştürün.
            </p>
          </motion.div>

          {/* Feature Cards Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Build Trust Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-50 rounded-2xl p-8 border border-gray-200 hover:shadow-lg transition-shadow"
            >
              <div className="mb-6">
                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Güven Oluşturun
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Kullanıcılara geri bildirimlerini dinlediğinizi ve talepleri üzerinde
                  aktif olarak çalıştığınızı gösterin.
                </p>
              </div>
            </motion.div>

            {/* Engage Users Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-gray-50 rounded-2xl p-8 border border-gray-200 hover:shadow-lg transition-shadow"
            >
              <div className="mb-6">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Kullanıcıları Meşgul Edin
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Otomatik güncelleme bildirimleri ile konuşmayı devam ettirin.
                </p>
              </div>
            </motion.div>

            {/* Control Access Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-gray-50 rounded-2xl p-8 border border-gray-200 hover:shadow-lg transition-shadow"
            >
              <div className="mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Erişimi Kontrol Edin
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Kullanıcılarınızla neyi ve ne zaman paylaşacağınızı seçin.
                </p>
              </div>
            </motion.div>

            {/* Stay Organized Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-gray-50 rounded-2xl p-8 border border-gray-200 hover:shadow-lg transition-shadow"
            >
              <div className="mb-6">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Düzenli Kalın
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Geliştirme planınızla otomatik senkronize olan güzel değişiklik günlükleri.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <div className="bg-gray-900 rounded-2xl p-8 md:p-12 text-white">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Sera projelerinizi şeffaf şekilde yönetin
              </h3>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Kullanıcılarınız her adımda ne olduğunu bilsin, güven oluşsun ve
                başarılı sera projeleri birlikte geliştirelim.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-gray-900 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Hemen Başlayın
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>

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
              Tasarruflarınızı hesaplayın ��
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
