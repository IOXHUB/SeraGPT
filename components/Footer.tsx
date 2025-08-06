export default function Footer() {
  return (
    <footer className="bg-gray-50 text-gray-900 py-12 sm:py-16">
      <div className="page-section-container">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {/* 1. Menü */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-gray-900">Menü</h3>
            <ul className="space-y-3">
              <li>
                <a href="/destek" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Destek
                </a>
              </li>
              <li>
                <a href="/danismanlik" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Danışmanlık
                </a>
              </li>
              <li>
                <a href="/anahtar-teslim-proje" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Anahtar Teslim Sera
                </a>
              </li>
              <li>
                <a href="/dashboard/direct" className="text-gray-600 hover:text-gray-900 transition-colors">
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

          {/* 2. Blog */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-gray-900">Blog</h3>
            <ul className="space-y-3">
              <li>
                <a href="/blog/veriye-dayali-tarim" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Veriye Dayalı Tarım
                </a>
              </li>
              <li>
                <a href="/blog/gizli-maliyetler" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Gizli Maliyetler
                </a>
              </li>
              <li>
                <a href="/blog/akilli-sera-modelleri" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Akıllı Sera Modelleri
                </a>
              </li>
              <li>
                <a href="/blog/tarimsal-zeka" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Tarımsal Zeka
                </a>
              </li>
              <li>
                <a href="/blog/roi-maliyet" className="text-gray-600 hover:text-gray-900 transition-colors">
                  ROI & Maliyet İçerikleri
                </a>
              </li>
              <li>
                <a href="/blog/iklim-krizi-tarim" className="text-gray-600 hover:text-gray-900 transition-colors">
                  İklim Krizi ve Tarım
                </a>
              </li>
              <li>
                <a href="/blog/ticari-urun-rehberi" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Ticari Ürün Rehberi
                </a>
              </li>
              <li>
                <a href="/blog/tarimda-kadin-eli" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Tarımda Kadın Eli
                </a>
              </li>
              <li>
                <a href="/blog/sera-mimarligi-tasarim" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Sera Mimarlığı & Tasarım
                </a>
              </li>
            </ul>
          </div>

          {/* 3. Yasal */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-gray-900">Yasal</h3>
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
                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Veri İşleme Politikası
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                  API Kullanım Şartları
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Çerez Tercihleri
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                  IYZICO
                </a>
              </li>
            </ul>
          </div>

          {/* 4. Çözüm Ortaklarımız */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-gray-900">Çözüm Ortaklarımız</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                  ISITMAX
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                  SERAPOLI
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                  SISELTARIM
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                  IOX
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                  KAIZEN
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                  DHERMA
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
              Hermisan & ISITMAX iş birliğiyle
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
