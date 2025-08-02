'use client';

import { motion } from 'framer-motion';

export default function UserjotCloneSection() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header - Exact match to Userjot */}
      <header className="flex justify-between items-center p-6 max-w-7xl mx-auto">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-bold">S</span>
          </div>
          <span className="text-xl font-semibold text-gray-900">SeraGPT</span>
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
      </header>

      {/* Main content - Exact match to Userjot layout */}
      <main className="flex-1 flex items-center justify-center px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
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
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
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
    </div>
  );
}
