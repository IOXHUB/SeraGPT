export default function Footer() {
  return (
    <div>
      <footer className="bg-gray-50 text-gray-900 py-12 sm:py-16 flex flex-col">
        <div className="navbar-footer-container flex justify-center flex-col items-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 w-full">
            {/* 1. Menü */}
            <div>
              <h3 className="text-lg mb-6 text-gray-900">Menü</h3>
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

            {/* 2. Blog Kategorileri */}
            <div>
              <h3 className="text-lg mb-6 text-gray-900">Blog</h3>
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
              <h3 className="text-lg mb-6 text-gray-900">YASAL</h3>
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
          </div>
        </div>
      </footer>

      {/* Bottom copyright area - outside of footer */}
      <div className="bg-gray-50 border-t border-gray-200 py-6">
        <div className="navbar-footer-container">
          <div className="flex items-center justify-center space-x-3">
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2F2c7ec7c93776440b923d3518963fc941%2F96da5382e9584c3fb2d32eca60944359?format=webp&width=800"
              alt="SeraGPT Logo"
              className="h-6 w-auto mt-0.5"
            />
            <span className="text-gray-600 text-sm">
              © 2024 SeraGPT. Tüm hakları saklıdır. ISITMAX A.Ş.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
