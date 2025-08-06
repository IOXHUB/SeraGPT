'use client';

import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="body-content-container py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Kullanım Koşulları
          </h1>
          <p className="text-gray-500 text-lg">
            Son Güncelleme: 23 Mayıs 2024
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="prose prose-lg text-section-container"
        >
          <div className="space-y-8">
            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
              <p className="text-lg leading-relaxed text-gray-700">
                SeraGPT ürünlerini veya hizmetlerini kullandığınızda, bu en son Kullanım Koşulları'nı 
                ("Koşullar") kabul etmiş olursunuz. Bu koşulların ihlali, takdirimize bağlı olarak 
                hesabınızın sonlandırılmasına neden olabilir.
              </p>
            </div>

            <p className="text-lg leading-relaxed text-gray-700">
              Bu Kullanım Koşulları'nı istediğimiz zaman güncelleyebiliriz. Önemli değişiklikler yaparsak, 
              bu sayfanın üst kısmındaki tarihi yeniler ve politika güncellemeleri e-posta listesine 
              kayıt olan kullanıcılara bildirimde bulunuruz.
            </p>

            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Tanımlar</h2>
              <div className="space-y-6">
                <div className="border-l-4 border-gray-200 pl-6">
                  <p className="text-lg leading-relaxed text-gray-700">
                    <strong>"Şirket"</strong>, <strong>"biz"</strong>, <strong>"bizim"</strong> veya 
                    <strong>"bize"</strong> politikalarımızda veya koşullarımızda yapılan herhangi bir 
                    atıfta SeraGPT A.Ş., SeraGPT'nin arkasındaki şirketi ifade eder.
                  </p>
                </div>

                <div className="border-l-4 border-gray-200 pl-6">
                  <p className="text-lg leading-relaxed text-gray-700">
                    <strong>"Hizmetler"</strong> web sitemizi, seragpt.com'u ve SeraGPT A.Ş. tarafından 
                    oluşturulan ve sürdürülen sera analizi toplama, tartışma, oylama, yol haritası oluşturma 
                    ve değişiklik günlüğü özellikleri dahil olmak üzere herhangi bir ürünü ifade eder; 
                    ister web tarayıcısı, masaüstü uygulaması, mobil uygulama veya başka bir format 
                    içinde sunulsun.
                  </p>
                </div>

                <div className="border-l-4 border-gray-200 pl-6">
                  <p className="text-lg leading-relaxed text-gray-700">
                    <strong>"Siz"</strong> veya <strong>"sizin"</strong> Hizmetlerimizden bir veya 
                    daha fazlasına sahip bir hesaba sahip kişi veya kuruluşları ifade eder.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Hesap Koşulları</h2>
              <div className="space-y-6">
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                  <p className="text-lg leading-relaxed text-gray-700">
                    Hesabınızın ve şifrenizin güvenliğini sağlamaktan ve kullanıcılarınızın da aynısını 
                    yapmasını sağlamaktan siz sorumlusunuz. Şirket, bu güvenlik yükümlülüğüne uymamanızdan 
                    kaynaklanan herhangi bir kayıp veya hasar için sorumlu tutulamaz ve sorumlu olmayacaktır. 
                    Ek güvenlik için tüm kullanıcıların iki faktörlü kimlik doğrulama kurmasını öneririz.
                  </p>
                </div>

                <p className="text-lg leading-relaxed text-gray-700">
                  Hizmetleri herhangi bir yasa dışı amaç için veya hizmetin işleyişine zarar verebilecek, 
                  kesintiye uğratabilecek veya bozabilecek herhangi bir şekilde kullanamazsınız.
                </p>

                <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-red-800 mb-3">Yasaklanan Kullanımlar:</h3>
                  <ul className="space-y-2 text-red-700">
                    <li>• Yanıltıcı sera analizi verileri göndermek</li>
                    <li>• Spam veya istenmeyen içerik paylaşmak</li>
                    <li>• Başkalarının hesaplarına yetkisiz erişim sağlamaya çalışmak</li>
                    <li>• Telif hakkı ihlali yapan içerik yüklemek</li>
                    <li>• Sistemi aşırı yükleyecek otomatik araçlar kullanmak</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Gizlilik ve Veri Koruma</h2>
              <p className="text-lg leading-relaxed text-gray-700 mb-4">
                Gizliliğinizi ciddiye alıyoruz. Kişisel verilerinizin nasıl toplandığı, kullanıldığı 
                ve korunduğu hakkında ayrıntılı bilgi için 
                <a href="/privacy" className="text-blue-600 hover:text-blue-800 font-medium"> Gizlilik Politikamızı</a> 
                inceleyin.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Hizmet Düzeyi ve Garanti</h2>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <p className="text-lg leading-relaxed text-gray-700">
                  Hizmetlerimizi "olduğu gibi" ve "mevcut olduğu şekliyle" sağlıyoruz. SeraGPT, 
                  hizmetin kesintisiz, hatasız veya güvenli olacağına dair herhangi bir garanti vermez. 
                  Sera analizlerinizin düzenli olarak yedeklenmesini öneririz.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Hesap İptali</h2>
              <p className="text-lg leading-relaxed text-gray-700">
                Hesabınızı istediğiniz zaman iptal edebilirsiniz. Hesap iptali durumunda verileriniz 
                30 gün içinde güvenli bir şekilde silinir. Premium planlar için iptal işlemi sonrasında 
                mevcut fatura döneminin sonuna kadar hizmete erişiminiz devam eder.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">İletişim</h2>
              <p className="text-lg leading-relaxed text-gray-700">
                Bu Kullanım Koşulları hakkında sorularınız varsa, 
                <a href="mailto:destek@seragpt.com" className="text-blue-600 hover:text-blue-800 font-medium"> destek@seragpt.com</a> 
                adresinden bizimle iletişime geçebilirsiniz.
              </p>
            </section>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
