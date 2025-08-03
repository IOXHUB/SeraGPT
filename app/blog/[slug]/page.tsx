'use client';

import { motion } from 'framer-motion';

export default function BlogArticlePage() {
  const article = {
    title: "Sera Projelerinde UAT (Kullanıcı Kabul Testi) için Komple Rehber - 2025",
    publishedDate: "29 Aralık 2025",
    author: "Volkan Şimşirkaya",
    authorBio: "20 yıllık sera ve ziraat mühendisi, SeraGPT kurucusu",
    readTime: "12 dk okuma",
    category: "Teknoloji",
    image: "https://cdn.builder.io/api/v1/image/assets%2F2c7ec7c93776440b923d3518963fc941%2Fc7c9024610334b899cbc23e907d8ef5f?format=webp&width=800"
  };

  const tableOfContents = [
    { title: "UAT Nedir? (Basit Açıklama)", href: "#what-is-uat" },
    { title: "Sera Projelerinde UAT'ın Önemi", href: "#why-uat-matters" },
    { title: "Modern UAT Süreci (Adım Adım)", href: "#modern-uat-process" },
    { title: "UAT ve Beta Testi: Karışıklığı Gidermek", href: "#uat-vs-beta" },
    { title: "Yaygın UAT Hataları (Ve Nasıl Önlenir)", href: "#common-mistakes" },
    { title: "Modern UAT Araçları ve Şablonları", href: "#uat-tools" },
    { title: "Farklı Takımların UAT Yaklaşımı", href: "#team-approaches" },
    { title: "İyi UAT Geri Bildirimi Almanın Psikolojisi", href: "#psychology" },
    { title: "UAT Kültürü Oluşturmak", href: "#building-culture" },
    { title: "��evik ve DevOps Ortamlarında UAT", href: "#agile-devops" },
    { title: "UAT Unutulmaması", href: "#memorability" }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="w-full">
        <div className="flex justify-between items-center p-6 max-w-[960px] mx-auto">
        <img
          src="https://cdn.builder.io/api/v1/image/assets%2F2c7ec7c93776440b923d3518963fc941%2F96da5382e9584c3fb2d32eca60944359?format=webp&width=800"
          alt="SeraGPT Logo"
          className="h-8 w-auto"
        />

        <nav className="hidden md:flex items-center space-x-8">
          <a href="#" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
            Fiyatlar
          </a>
          <a href="#" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
            Yardım
          </a>
          <a href="/blog" className="text-gray-900 font-medium border-b-2 border-gray-900 pb-1">
            Blog
          </a>
          <a href="#" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
            Güncellemeler
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

      {/* Article Content */}
      <main className="max-w-[960px] mx-auto px-6 py-16">
        {/* Article Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-8">
            {article.title}
          </h1>
          
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div className="flex items-center space-x-6 mb-4 md:mb-0">
              <div className="text-sm text-gray-500">
                <span className="font-medium">Yayınlanma:</span> {article.publishedDate}
              </div>
              <div className="text-sm text-gray-500">
                <span className="font-medium">Yazan:</span> {article.author}
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {article.category}
              </span>
              <span className="text-sm text-gray-500">{article.readTime}</span>
            </div>
          </div>
        </motion.div>

        {/* Featured Image */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12"
        >
          <div className="relative overflow-hidden rounded-2xl">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-64 md:h-96 object-cover"
            />
          </div>
        </motion.div>

        {/* Article Body Layout */}
        <div className="grid lg:grid-cols-4 gap-12">
          {/* Table of Contents - Sidebar */}
          <motion.aside
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-1"
          >
            <div className="sticky top-8">
              <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
                Bu Sayfada
              </h2>
              <nav className="space-y-2">
                {tableOfContents.map((item, index) => (
                  <a
                    key={index}
                    href={item.href}
                    className="block text-sm text-gray-600 hover:text-gray-900 transition-colors py-1 border-l-2 border-transparent hover:border-gray-300 pl-3"
                  >
                    {item.title}
                  </a>
                ))}
              </nav>
            </div>
          </motion.aside>

          {/* Main Content */}
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="lg:col-span-3 prose prose-lg max-w-none"
          >
            {/* Introduction */}
            <div className="mb-8 p-6 bg-blue-50 rounded-xl border-l-4 border-blue-500">
              <p className="text-lg leading-relaxed text-gray-700 mb-0">
                Her bir sera projesi mükemmel görünse de gerçek dünyada kullanıcılarla tanıştığında 
                sorunlarla karşılaşır. "Benim makinemde çalışıyor" ve "kullanıcılar gerçekten bunu 
                seviyor" tam da UAT'ın var olma sebebi ve bu kadar çok takımın hala yanlış yapma nedeni.
              </p>
            </div>

            <div className="space-y-8">
              <p className="text-lg leading-relaxed text-gray-700">
                İşte önemli olan şey: UAT'ın acı verici, kaotik bir süreç olması gerekmiyor. 
                Doğru yapıldığında, insanların gerçekten istediği sera çözümleri oluşturmak için 
                gizli silahınız olur. Modern takımlar için elektronik tablo kabusları ve e-posta 
                çığ düşmelerini yaşamadan UAT'ı nasıl çalıştıracağımızı açıklayalım.
              </p>

              {/* What is UAT Section */}
              <section id="what-is-uat" className="scroll-mt-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  UAT Nedir? (Basit Açıklama)
                </h2>
                <p className="text-lg leading-relaxed text-gray-700 mb-4">
                  UAT, Kullanıcı Kabul Testi anlamına gelir. Gerçek kullanıcıların (veya onların 
                  temsilcilerinin) sera yazılımınızı test ederek gerçekte yapması gerekeni 
                  yapıp yapmadığından emin olduğu son kontrol noktasıdır. Bunu ürününüzün 
                  final sınavı olarak düşünün.
                </p>
                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    UAT'ın Temel Prensipleri:
                  </h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start space-x-3">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span>Gerçek kullanıcı senaryolarıyla test edilir</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span>Üretim benzeri ortamda gerçekleştirilir</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span>İş gereksinimlerinin karşılanıp karşılanmadığını doğrular</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span>Son kullanıcı perspektifinden yapılır</span>
                    </li>
                  </ul>
                </div>
              </section>

              {/* Why UAT Matters Section */}
              <section id="why-uat-matters" className="scroll-mt-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Sera Projelerinde UAT'ın Önemi
                </h2>
                <p className="text-lg leading-relaxed text-gray-700 mb-6">
                  Sera teknolojilerinde UAT, özellikle kritik olmaktan çıkıp hayati hale gelir. 
                  Çünkü sera sistemlerinde bir hata, sadece yazılım problemi değil, aynı zamanda 
                  mahsul kaybı ve ekonomik zarar anlamına gelir.
                </p>
                
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-red-50 p-6 rounded-xl border border-red-200">
                    <h3 className="text-lg font-semibold text-red-800 mb-3">
                      UAT Olmadan Riskleri:
                    </h3>
                    <ul className="space-y-2 text-red-700 text-sm">
                      <li>• İklim kontrol sistemlerinde beklenmedik hatalar</li>
                      <li>• Sulama zamanlamasında yanlış hesaplamalar</li>
                      <li>• Alarm sistemlerinin geç uyarı vermesi</li>
                      <li>• Veri raporlarında hatalı analiz sonuçları</li>
                    </ul>
                  </div>
                  
                  <div className="bg-green-50 p-6 rounded-xl border border-green-200">
                    <h3 className="text-lg font-semibold text-green-800 mb-3">
                      UAT ile Faydalar:
                    </h3>
                    <ul className="space-y-2 text-green-700 text-sm">
                      <li>• Gerçek koşullarda test edilmiş güvenilir sistem</li>
                      <li>• Kullanıcı dostu arayüz ve iş akışları</li>
                      <li>• Beklenmedik durumlara hazırlıklı çözümler</li>
                      <li>• Üretici güveni ve müşteri memnuniyeti</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Author Bio */}
              <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200 mt-12">
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold text-gray-600">VS</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {article.author}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {article.authorBio}. Sera teknolojileri ve yapay zeka konularında 
                      uzmanlaşmış, 500+ sera projesinde danışmanlık yapmış deneyimli bir mühendis.
                    </p>
                  </div>
                </div>
              </div>

              {/* Related Articles */}
              <div className="border-t border-gray-200 pt-12 mt-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-8">İlgili Makaleler</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <a href="#" className="group block p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-gray-700 mb-2">
                      Sera Otomasyonu için En İyi Test Stratejileri
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Modern sera sistemlerinde test süreçlerini optimize etmek...
                    </p>
                  </a>
                  <a href="#" className="group block p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-gray-700 mb-2">
                      DevOps Ortamlarında Sera Yazılım Geliştirme
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Çevik metodolojiler ile sera teknolojilerini birleştirme...
                    </p>
                  </a>
                </div>
              </div>
            </div>
          </motion.article>
        </div>
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
