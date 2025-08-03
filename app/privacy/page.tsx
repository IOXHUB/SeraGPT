'use client';

import { motion } from 'framer-motion';

export default function PrivacyPage() {
  const sections = [
    { title: "Neleri topladığımız ve neden", href: "#what-we-collect" },
    { title: "Bilgilerinize ne zaman erişiriz veya açıklarız", href: "#when-we-access" },
    { title: "Bilgilerinizle ilgili haklarınız", href: "#your-rights" },
    { title: "Verilerinizi nasıl güvence altına alırız", href: "#how-we-secure" },
    { title: "Ürün hesaplarınızdaki içeriği sildiğinizde ne olur", href: "#what-happens-when-delete" },
    { title: "Veri saklama", href: "#data-retention" },
    { title: "Site ve veri konumu", href: "#location" },
    { title: "AB'den kişisel veri aktarırken", href: "#eu-transfer" },
    { title: "Değişiklikler ve sorular", href: "#changes-questions" }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="w-full border-b border-gray-100">
        <div className="flex justify-between items-center p-6 max-w-[960px] mx-auto">
        <img
          src="https://cdn.builder.io/api/v1/image/assets%2F2c7ec7c93776440b923d3518963fc941%2F96da5382e9584c3fb2d32eca60944359?format=webp&width=800"
          alt="SeraGPT Logo"
          className="h-8 w-auto"
        />

        <nav className="hidden md:flex items-center space-x-8">
          <a href="/" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
            Ana Sayfa
          </a>
          <a href="#" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
            Fiyatlar
          </a>
          <a href="#" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
            Yardım
          </a>
          <a href="/blog" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
            Blog
          </a>
          <button className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
            Giriş Yap
          </button>
        </nav>

        <button className="md:hidden">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[960px] mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Gizlilik Politikası
          </h1>
          <p className="text-gray-500 text-lg">
            Son Güncelleme: 23 Mayıs 2024
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="prose prose-lg max-w-none"
        >
          <div className="space-y-8">
            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
              <p className="text-lg leading-relaxed text-gray-700">
                Bu politikada şunları açıklıyoruz: hangi verileri topladığımız ve neden; verilerinizin 
                nasıl işlendiği; ve verilerinizle ilgili haklarınız. <strong>Verilerinizi asla satmayız.</strong>
              </p>
            </div>

            <p className="text-lg leading-relaxed text-gray-700">
              Bu politika bölümlere ayrılmıştır. Kolaylığınız için, bu bölümlerin her birine bağlantılar 
              aşağıdaki gibidir:
            </p>

            {/* Table of Contents */}
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Bu Sayfada</h3>
              <ul className="space-y-2">
                {sections.map((section, index) => (
                  <li key={index}>
                    <a 
                      href={section.href} 
                      className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                    >
                      {section.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <p className="text-lg leading-relaxed text-gray-700">
              Bu politika özellikle SeraGPT A.Ş. tarafından oluşturulan ve sürdürülen SeraGPT ürünü 
              için geçerlidir. Bu politika, site ziyaretçileri, potansiyel müşteriler ve müşteriler 
              ve yetkili kullanıcılar hakkındaki bilgilerin işlenmesine uygulanır (hizmetlerin tedariki 
              ve SeraGPT ile ilişkilerinin yönetimi ile ilgili olarak). Bu politika boyunca bu kategorilerdeki 
              bireyleri topluca "siz" olarak adlandırıyoruz.
            </p>

            <section id="what-we-collect">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Neleri Topladığımız ve Neden</h2>
              
              <div className="space-y-6">
                <div className="border-l-4 border-green-200 pl-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Hesap Bilgileri</h3>
                  <p className="text-lg leading-relaxed text-gray-700 mb-3">
                    SeraGPT hesabı oluştururken aşağıdaki bilgileri topluyoruz:
                  </p>
                  <ul className="space-y-2 text-gray-700">
                    <li>• <strong>E-posta adresi:</strong> Giriş yapmak ve önemli hesap bildirimleri için</li>
                    <li>• <strong>Ad ve soyad:</strong> Kişiselleştirilmiş deneyim için</li>
                    <li>• <strong>Şirket bilgileri:</strong> Sera işletmenizle ilgili analizler için</li>
                    <li>• <strong>Şifre:</strong> Güvenli hesap erişimi için (şifrelenmiş olarak saklanır)</li>
                  </ul>
                </div>

                <div className="border-l-4 border-blue-200 pl-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Sera Analizi Verileri</h3>
                  <p className="text-lg leading-relaxed text-gray-700">
                    Sera projelerinizi analiz etmek için sera büyüklüğü, konum, mahsul türü, 
                    mevcut altyapı ve yatırım bütçesi gibi teknik bilgileri topluyoruz. Bu veriler 
                    size özelleştirilmiş öneriler sunmak için kullanılır.
                  </p>
                </div>

                <div className="border-l-4 border-purple-200 pl-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Kullanım Verileri</h3>
                  <p className="text-lg leading-relaxed text-gray-700">
                    Platform kullanımınızı iyileştirmek için hangi özellikleri kullandığınız, 
                    ne kadar süre geçirdiğiniz ve hangi raporları incelediğiniz gibi anonim 
                    kullanım verilerini topluyoruz.
                  </p>
                </div>
              </div>
            </section>

            <section id="when-we-access">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Bilgilerinize Ne Zaman Erişiriz</h2>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
                <p className="text-lg leading-relaxed text-gray-700">
                  <strong>Kişisel verilerinize yalnızca aşağıdaki durumlarda erişiriz:</strong>
                </p>
                <ul className="mt-4 space-y-2 text-gray-700">
                  <li>• Teknik destek sağlamak için (sizin onayınızla)</li>
                  <li>• Güvenlik ihlali şüphesi durumunda</li>
                  <li>• Yasal yükümlülükler gereği</li>
                  <li>• Hizmet iyileştirmeleri için (anonim veriler)</li>
                </ul>
              </div>
            </section>

            <section id="your-rights">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Bilgilerinizle İlgili Haklarınız</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-green-800 mb-3">Erişim Hakkı</h3>
                  <p className="text-green-700 text-sm">
                    Hakkınızda sakladığımız tüm kişisel verileri görme hakkına sahipsiniz.
                  </p>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-blue-800 mb-3">Düzeltme Hakkı</h3>
                  <p className="text-blue-700 text-sm">
                    Yanlış veya eksik bilgilerin düzeltilmesini talep edebilirsiniz.
                  </p>
                </div>
                <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-red-800 mb-3">Silme Hakkı</h3>
                  <p className="text-red-700 text-sm">
                    Hesabınızı ve tüm verilerinizi kalıcı olarak silme hakkına sahipsiniz.
                  </p>
                </div>
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-purple-800 mb-3">Taşınabilirlik Hakkı</h3>
                  <p className="text-purple-700 text-sm">
                    Verilerinizi başka bir platforma aktarabilir formatta alabilirsiniz.
                  </p>
                </div>
              </div>
            </section>

            <section id="how-we-secure">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Verilerinizi Nasıl Güvence Altına Alırız</h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-1">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-lg text-gray-700"><strong>SSL Şifrelemesi:</strong> Tüm veri aktarımları 256-bit SSL ile şifrelenir</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-1">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-lg text-gray-700"><strong>Düzenli Yedekleme:</strong> Verileriniz günlük olarak yedeklenir</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-1">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-lg text-gray-700"><strong>Erişim Kontrolü:</strong> Sınırlı personel erişimi ve iki faktörlü kimlik doğrulama</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-1">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-lg text-gray-700"><strong>Güvenlik Denetimleri:</strong> Düzenli güvenlik taramaları ve sızma testleri</p>
                </div>
              </div>
            </section>

            <section id="data-retention">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Veri Saklama</h2>
              <p className="text-lg leading-relaxed text-gray-700 mb-4">
                Kişisel verilerinizi yalnızca gerekli olduğu sürece saklarız:
              </p>
              <ul className="space-y-2 text-gray-700 mb-4">
                <li>• <strong>Aktif hesaplar:</strong> Hesap aktif olduğu sürece</li>
                <li>• <strong>İptal edilen hesaplar:</strong> İptal sonrası 30 gün</li>
                <li>• <strong>Yasal yükümlülükler:</strong> Gerekli yasal süre boyunca</li>
                <li>• <strong>Anonim analitik veriler:</strong> İstatistiksel amaçlarla süresiz</li>
              </ul>
            </section>

            <section id="changes-questions">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Değişiklikler ve Sorular</h2>
              <p className="text-lg leading-relaxed text-gray-700 mb-4">
                Bu gizlilik politikasını gerektiğinde güncelliyoruz. Önemli değişiklikler olduğunda 
                size e-posta ile bildirimde bulunuruz.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <p className="text-lg leading-relaxed text-gray-700">
                  Gizlilik politikamız hakkında sorularınız varsa, 
                  <a href="mailto:gizlilik@seragpt.com" className="text-blue-600 hover:text-blue-800 font-medium"> gizlilik@seragpt.com</a> 
                  adresinden bizimle iletişime geçebilirsiniz.
                </p>
              </div>
            </section>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 py-12 mt-20">
        <div className="max-w-[960px] mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2F2c7ec7c93776440b923d3518963fc941%2F96da5382e9584c3fb2d32eca60944359?format=webp&width=800"
              alt="SeraGPT Logo"
              className="h-8 w-auto mb-4 md:mb-0"
            />
            <div className="text-center md:text-right">
              <p className="text-sm text-gray-500">
                © 2025 SeraGPT. Tüm hakları saklıdır.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
