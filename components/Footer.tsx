export default function Footer() {
  return (
    <footer className="relative py-16">
      {/* Glass morphism background */}
      <div className="bg-white/5 backdrop-blur-sm border-t border-white/20">
        
        {/* Main footer content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* 1. Menü */}
            <div>
              <h3 className="text-base font-semibold mb-6 text-white">Menü</h3>
              <ul className="space-y-3">
                <li>
                  <a href="/destek" className="text-sm text-white/70 hover:text-white transition-colors">
                    Destek
                  </a>
                </li>
                <li>
                  <a href="/danismanlik" className="text-sm text-white/70 hover:text-white transition-colors">
                    Danışmanlık
                  </a>
                </li>
                <li>
                  <a href="/anahtar-teslim-proje" className="text-sm text-white/70 hover:text-white transition-colors">
                    Anahtar Teslim Sera
                  </a>
                </li>
                <li>
                  <a href="/dashboard/direct" className="text-sm text-white/70 hover:text-white transition-colors">
                    Kullanıcı Paneli
                  </a>
                </li>
                <li>
                  <a href="/blog" className="text-sm text-white/70 hover:text-white transition-colors">
                    Blog
                  </a>
                </li>
              </ul>
            </div>

            {/* 2. Blog */}
            <div>
              <h3 className="text-base font-semibold mb-6 text-white">Blog</h3>
              <ul className="space-y-3">
                <li>
                  <a href="/blog/veriye-dayali-tarim" className="text-sm text-white/70 hover:text-white transition-colors">
                    Veriye Dayalı Tarım
                  </a>
                </li>
                <li>
                  <a href="/blog/gizli-maliyetler" className="text-sm text-white/70 hover:text-white transition-colors">
                    Gizli Maliyetler
                  </a>
                </li>
                <li>
                  <a href="/blog/akilli-sera-modelleri" className="text-sm text-white/70 hover:text-white transition-colors">
                    Akıllı Sera Modelleri
                  </a>
                </li>
                <li>
                  <a href="/blog/tarimsal-zeka" className="text-sm text-white/70 hover:text-white transition-colors">
                    Tarımsal Zeka
                  </a>
                </li>
                <li>
                  <a href="/blog/roi-maliyet" className="text-sm text-white/70 hover:text-white transition-colors">
                    ROI & Maliyet İçerikleri
                  </a>
                </li>
                <li>
                  <a href="/blog/iklim-krizi-tarim" className="text-sm text-white/70 hover:text-white transition-colors">
                    İklim Krizi ve Tarım
                  </a>
                </li>
                <li>
                  <a href="/blog/sera-mimarligi-tasarim" className="text-sm text-white/70 hover:text-white transition-colors">
                    Sera Mimarlığı & Tasarım
                  </a>
                </li>
              </ul>
            </div>

            {/* 3. Yasal */}
            <div>
              <h3 className="text-base font-semibold mb-6 text-white">Yasal</h3>
              <ul className="space-y-3">
                <li>
                  <a href="/privacy" className="text-sm text-white/70 hover:text-white transition-colors">
                    Gizlilik Politikası
                  </a>
                </li>
                <li>
                  <a href="/terms" className="text-sm text-white/70 hover:text-white transition-colors">
                    Kullanım Koşulları
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-white/70 hover:text-white transition-colors">
                    Veri İşleme Politikası
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-white/70 hover:text-white transition-colors">
                    API Kullanım Şartları
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-white/70 hover:text-white transition-colors">
                    Çerez Tercihleri
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-white/70 hover:text-white transition-colors">
                    IYZICO
                  </a>
                </li>
              </ul>
            </div>

            {/* 4. Çözüm Ortaklarımız */}
            <div>
              <h3 className="text-base font-semibold mb-6 text-white">Çözüm Ortaklarımız</h3>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-sm text-white/70 hover:text-white transition-colors">
                    ISITMAX
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-white/70 hover:text-white transition-colors">
                    SERAPOLI
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-white/70 hover:text-white transition-colors">
                    SISELTARIM
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-white/70 hover:text-white transition-colors">
                    IOX
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-white/70 hover:text-white transition-colors">
                    KAIZEN
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-white/70 hover:text-white transition-colors">
                    DHERMA
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom copyright section */}
        <div className="border-t border-white/20 px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 mb-4 sm:mb-0">
              <span className="text-sm text-white/70">© 2025 SeraGPT. Tüm hakları saklıdır.</span>
            </div>
            
            {/* Social icons */}
            <div className="flex items-center space-x-4">
              <div className="text-white/50 hover:text-white/70 transition-colors cursor-pointer">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
                </svg>
              </div>
              <div className="text-white/50 hover:text-white/70 transition-colors cursor-pointer">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </div>
              <div className="text-white/50 hover:text-white/70 transition-colors cursor-pointer">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
