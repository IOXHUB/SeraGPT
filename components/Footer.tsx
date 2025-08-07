export default function Footer() {
  return (
    <footer className="bg-white text-gray-900 py-16">
      {/* Thin line separator - 1200px */}
      <div className="header-footer-container">
        <div className="border-t border-gray-200 mb-12"></div>
      </div>
      
      {/* 4 Columns - centered container, left-aligned content */}
      <div className="header-footer-container">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* 1. Ürün */}
          <div>
            <h3 className="text-base font-semibold mb-4 text-gray-900">Ürün</h3>
            <ul className="space-y-2">
              <li>
                <a href="/dashboard" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  Başlangıç
                </a>
              </li>
              <li>
                <a href="/dashboard/tokens" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  Fiyatlandırma
                </a>
              </li>
              <li>
                <a href="/destek" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  Geri Bildirim
                </a>
              </li>
              <li>
                <a href="/blog" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  Güncellemeler
                </a>
              </li>
              <li>
                <a href="/blog" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  Yol Haritası
                </a>
              </li>
              <li>
                <a href="/dashboard/help" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  Kullanım Örnekleri
                </a>
              </li>
              <li>
                <a href="/dashboard/analytics" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  Araçlar
                </a>
              </li>
            </ul>
          </div>

          {/* 2. Destek */}
          <div>
            <h3 className="text-base font-semibold mb-4 text-gray-900">Destek</h3>
            <ul className="space-y-2">
              <li>
                <a href="/destek" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  İletişim
                </a>
              </li>
              <li>
                <a href="/dashboard/help" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  Dökümanlar
                </a>
              </li>
              <li>
                <a href="/blog" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="/dashboard/analytics" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  Durum
                </a>
              </li>
              <li>
                <a href="/blog" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  Hikayeler
                </a>
              </li>
              <li>
                <a href="/dashboard/help" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  Tanımlar
                </a>
              </li>
            </ul>
          </div>

          {/* 3. Yasal */}
          <div>
            <h3 className="text-base font-semibold mb-4 text-gray-900">Yasal</h3>
            <ul className="space-y-2">
              <li>
                <a href="/privacy" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  Gizlilik
                </a>
              </li>
              <li>
                <a href="/terms" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  Şartlar
                </a>
              </li>
            </ul>
          </div>

          {/* 4. Kaynaklar */}
          <div>
            <h3 className="text-base font-semibold mb-4 text-gray-900">Kaynaklar</h3>
            <ul className="space-y-2">
              <li>
                <a href="/danismanlik" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  Sera Alternatifleri
                </a>
              </li>
              <li>
                <a href="/anahtar-teslim-proje" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  Anahtar Teslim Alternatifi
                </a>
              </li>
              <li>
                <a href="/dashboard" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  Panel Alternatifleri
                </a>
              </li>
              <li>
                <a href="/dashboard/analytics" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  Karşılaştır
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom logo and copyright section */}
        <div className="flex items-center justify-between pt-8 border-t border-gray-200">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">© 2025 SeraGPT. Tüm hakları saklıdır.</span>
          </div>
          <div className="text-gray-400">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
            </svg>
          </div>
        </div>
      </div>
    </footer>
  );
}
