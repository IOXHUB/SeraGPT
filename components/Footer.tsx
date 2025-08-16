export default function Footer() {
  return (
    <footer className="py-16" style={{ backgroundColor: '#146448' }}>
      {/* Thin line separator - 1200px */}
      <div className="header-footer-container">
        <div className="border-t border-white/20 mb-12"></div>
      </div>
      
      {/* 4 Columns - centered container, left-aligned content */}
      <div className="header-footer-container" style={{ 
        justifyContent: 'center', 
        lineHeight: '24px'
      }}>
        <div className="flex flex-col">
          <div className="flex gap-5 max-md:flex-col max-md:gap-0">
            <div className="flex flex-col line-height-normal w-full ml-0 max-md:w-full max-md:ml-0">
              <div className="flex gap-8 justify-center items-start mx-auto mb-12 max-md:flex-wrap max-md:gap-6">
                {/* 1. Menü */}
                <div className="max-md:w-1/2 max-md:mb-6">
                  <h3 className="text-base font-semibold mb-4 text-white">Menü</h3>
                  <ul className="space-y-2">
                    <li>
                      <a href="/destek" className="text-sm text-white/70 hover:text-[#baf200] transition-colors">
                        Destek
                      </a>
                    </li>
                    <li>
                      <a href="/danismanlik" className="text-sm text-white/70 hover:text-[#baf200] transition-colors">
                        Danışmanlık
                      </a>
                    </li>
                    <li>
                      <a href="/anahtar-teslim-proje" className="text-sm text-white/70 hover:text-[#baf200] transition-colors">
                        Anahtar Teslim Sera
                      </a>
                    </li>
                    <li>
                      <a href="/dashboard/direct" className="text-sm text-white/70 hover:text-[#baf200] transition-colors">
                        Kullanıcı Paneli
                      </a>
                    </li>
                    <li>
                      <a href="/blog" className="text-sm text-white/70 hover:text-[#baf200] transition-colors">
                        Blog
                      </a>
                    </li>
                  </ul>
                </div>

                {/* 2. Blog */}
                <div className="max-md:w-1/2 max-md:mb-6">
                  <h3 className="text-base font-semibold mb-4 text-white">Blog</h3>
                  <ul className="space-y-2">
                    <li>
                      <a href="/blog/veriye-dayali-tarim" className="text-sm text-white/70 hover:text-[#baf200] transition-colors">
                        Veriye Dayalı Tarım
                      </a>
                    </li>
                    <li>
                      <a href="/blog/gizli-maliyetler" className="text-sm text-white/70 hover:text-[#baf200] transition-colors">
                        Gizli Maliyetler
                      </a>
                    </li>
                    <li>
                      <a href="/blog/akilli-sera-modelleri" className="text-sm text-white/70 hover:text-[#baf200] transition-colors">
                        Akıllı Sera Modelleri
                      </a>
                    </li>
                    <li>
                      <a href="/blog/tarimsal-zeka" className="text-sm text-white/70 hover:text-[#baf200] transition-colors">
                        Tarımsal Zeka
                      </a>
                    </li>
                    <li>
                      <a href="/blog/roi-maliyet" className="text-sm text-white/70 hover:text-[#baf200] transition-colors">
                        ROI & Maliyet İçerikleri
                      </a>
                    </li>
                    <li>
                      <a href="/blog/iklim-krizi-tarim" className="text-sm text-white/70 hover:text-[#baf200] transition-colors">
                        İklim Krizi ve Tarım
                      </a>
                    </li>
                    <li>
                      <a href="/blog/sera-mimarligi-tasarim" className="text-sm text-white/70 hover:text-[#baf200] transition-colors">
                        Sera Mimarlığı & Tasarım
                      </a>
                    </li>
                  </ul>
                </div>

                {/* 3. Yasal */}
                <div className="max-md:w-1/2 max-md:mb-6">
                  <h3 className="text-base font-semibold mb-4 text-white">Yasal</h3>
                  <ul className="space-y-2">
                    <li>
                      <a href="/privacy" className="text-sm text-white/70 hover:text-[#baf200] transition-colors">
                        Gizlilik Politikası
                      </a>
                    </li>
                    <li>
                      <a href="/terms" className="text-sm text-white/70 hover:text-[#baf200] transition-colors">
                        Kullanım Koşulları
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-sm text-white/70 hover:text-[#baf200] transition-colors">
                        Veri İşleme Politikası
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-sm text-white/70 hover:text-[#baf200] transition-colors">
                        API Kullanım Şartları
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-sm text-white/70 hover:text-[#baf200] transition-colors">
                        Çerez Tercihleri
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-sm text-white/70 hover:text-[#baf200] transition-colors">
                        IYZICO
                      </a>
                    </li>
                  </ul>
                </div>

                {/* 4. Çözüm Ortaklarımız */}
                <div className="max-md:w-1/2 max-md:mb-6">
                  <h3 className="text-base font-semibold mb-4 text-white">Çözüm Ortaklarımız</h3>
                  <ul className="space-y-2">
                    <li>
                      <a href="#" className="text-sm text-white/70 hover:text-[#baf200] transition-colors">
                        ISITMAX
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-sm text-white/70 hover:text-[#baf200] transition-colors">
                        SERAPOLI
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-sm text-white/70 hover:text-[#baf200] transition-colors">
                        SISELTARIM
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-sm text-white/70 hover:text-[#baf200] transition-colors">
                        IOX
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-sm text-white/70 hover:text-[#baf200] transition-colors">
                        KAIZEN
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-sm text-white/70 hover:text-[#baf200] transition-colors">
                        DHERMA
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom copyright section - centered */}
      <div className="text-center pt-8 border-t border-white/20 max-w-1200 mx-auto px-6">
        <div className="flex items-center justify-center space-x-2">
          <span className="text-sm text-white/70">© 2025 SeraGPT. Tüm hakları saklıdır.</span>
          <div className="text-white/50">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
            </svg>
          </div>
        </div>
      </div>
    </footer>
  );
}
