export default function Footer() {
  return (
    <footer className="bg-gray-50 text-gray-900 py-12 sm:py-16">
      <div className="navbar-footer-container">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {/* 1. Menü */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-gray-900">Menü</h3>
            <ul className="space-y-3">
              <li>
                <a href="/support" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Destek
                </a>
              </li>
              <li>
                <a href="/consulting" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Danışmanlık
                </a>
              </li>
              <li>
                <a href="/turnkey" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Anahtar Teslim Proje
                </a>
              </li>
              <li>
                <a href="/dashboard" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Kullanıcı Paneli
                </a>
              </li>
              <li>
                <a href="/blog" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* 2. Blog Kategorileri - ROI & İklim */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-gray-900">Analiz & Blog</h3>
            <ul className="space-y-3">
              <li>
                <a href="/blog/roi-analizi" className="text-gray-600 hover:text-gray-900 transition-colors">
                  ROI Analizi
                </a>
              </li>
              <li>
                <a href="/blog/iklim-analizi" className="text-gray-600 hover:text-gray-900 transition-colors">
                  İklim Analizi
                </a>
              </li>
              <li>
                <a href="/blog/ekipman-listesi" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Ekipman Listesi
                </a>
              </li>
              <li>
                <a href="/blog/pazar-analizi" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Pazar Analizi
                </a>
              </li>
              <li>
                <a href="/blog/yerlesim-planlari" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Yerleşim Planları
                </a>
              </li>
            </ul>
          </div>

          {/* 3. YASAL */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-gray-900">YASAL</h3>
            <ul className="space-y-3">
              <li>
                <a href="/privacy" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Gizlilik Politikası
                </a>
              </li>
              <li>
                <a href="/terms" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Kullanım Koşulları
                </a>
              </li>
              <li>
                <a href="/privacy" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Veri İşleme Politikası
                </a>
              </li>
              <li>
                <a href="/terms" className="text-gray-600 hover:text-gray-900 transition-colors">
                  API Kullanım Şartları
                </a>
              </li>
              <li>
                <a href="/privacy" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Çerez Tercihleri
                </a>
              </li>
            </ul>
          </div>

          {/* 4. İletişim & Şirket */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-gray-900">İletişim</h3>
            <ul className="space-y-3">
              <li>
                <a href="/support" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Destek Merkezi
                </a>
              </li>
              <li>
                <a href="mailto:info@seragpt.com" className="text-gray-600 hover:text-gray-900 transition-colors">
                  info@seragpt.com
                </a>
              </li>
              <li>
                <a href="tel:+902125550123" className="text-gray-600 hover:text-gray-900 transition-colors">
                  +90 (212) 555-0123
                </a>
              </li>
              <li>
                <a href="/consulting" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Proje Danışmanlığı
                </a>
              </li>
              <li>
                <a href="https://isitmax.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900 transition-colors">
                  ISITMAX A.Ş.
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright area */}
        <div className="border-t border-gray-200 mt-12 pt-8 text-center">
          <div className="navbar-footer-container flex-col md:flex-row">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2F2c7ec7c93776440b923d3518963fc941%2F96da5382e9584c3fb2d32eca60944359?format=webp&width=800"
                alt="SeraGPT Logo"
                className="h-6 w-auto"
              />
              <span className="text-gray-600 text-sm mt-0.5 ml-3">
                © 2024 SeraGPT. Tüm hakları saklıdır.
              </span>
            </div>
            <div className="text-gray-600 text-sm">
              <p>ISITMAX A.Ş.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
