export default function Footer() {
  return (
    <footer className="bg-gray-50 text-gray-900 py-16">
      <div className="max-w-[960px] mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8">
          {/* 1. Menü */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-gray-900">Menü</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Nasıl Çalışır?
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Danışmanlık
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Anahtar Teslim Proje
                </a>
              </li>
              <li>
                <a href="/dashboard" className="text-gray-300 hover:text-white transition-colors">
                  Kullanıcı Paneli
                </a>
              </li>
              <li>
                <a href="/blog" className="text-gray-300 hover:text-white transition-colors">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* 2. DESTEK */}
          <div>
            <h3 className="text-lg font-semibold mb-6">DESTEK</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Destek Kaydı
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Dokümantasyon
                </a>
              </li>
            </ul>
          </div>

          {/* 3. YASAL */}
          <div>
            <h3 className="text-lg font-semibold mb-6">YASAL</h3>
            <ul className="space-y-3">
              <li>
                <a href="/privacy" className="text-gray-300 hover:text-white transition-colors">
                  Gizlilik Politikası
                </a>
              </li>
              <li>
                <a href="/terms" className="text-gray-300 hover:text-white transition-colors">
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
            </ul>
          </div>

          {/* 4. Kaynaklar */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Kaynaklar</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Servisler
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Data
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Hermisan
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                  ISITMAX
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright area */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2F2c7ec7c93776440b923d3518963fc941%2F96da5382e9584c3fb2d32eca60944359?format=webp&width=800"
                alt="SeraGPT Logo"
                className="h-6 w-auto"
              />
              <span className="text-gray-400 text-sm">
                © 2024 SeraGPT. Tüm hakları saklıdır.
              </span>
            </div>
            <div className="text-gray-400 text-sm">
              Hermisan & ISITMAX iş birliğiyle
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
