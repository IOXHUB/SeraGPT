'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import SEOHead from '@/components/SEOHead';
import { BlogService } from '@/lib/blog';
import { SEOService } from '@/lib/seo';

// Force dynamic rendering for blog article pages
export const dynamic = 'force-dynamic';

export default function BlogArticlePage() {
  const params = useParams();
  const [post, setPost] = useState<any>(null);
  const [seoConfig, setSeoConfig] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPost = async () => {
      try {
        const slug = params.slug as string;
        const postData = await BlogService.getPostBySlug(slug);
        
        if (postData) {
          setPost(postData);
          setSeoConfig(SEOService.generateBlogPostSEO(postData));
        }
      } catch (error) {
        console.error('Post yüklenirken hata:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [params.slug]);

  // Fallback article data for static content
  const fallbackArticle = {
    title: "Sera Projelerinde UAT (Kullanıcı Kabul Testi) için Komple Rehber - 2025",
    publishedDate: "29 Aralık 2025",
    author: "Volkan Şimşirkaya",
    authorBio: "20 yıllık sera ve ziraat mühendisi, SeraGPT kurucusu",
    readTime: "12 dk okuma",
    category: "Teknoloji",
    image: "https://cdn.builder.io/api/v1/image/assets%2F2c7ec7c93776440b923d3518963fc941%2Fc7c9024610334b899cbc23e907d8ef5f?format=webp&width=800"
  };

  const article = post || fallbackArticle;

  const tableOfContents = [
    { title: "UAT Nedir? (Basit Açıklama)", href: "#what-is-uat" },
    { title: "Sera Projelerinde UAT'ın Önemi", href: "#why-uat-matters" },
    { title: "Modern UAT Süreci (Adım Adım)", href: "#modern-uat-process" },
    { title: "UAT ve Beta Testi: Karışıklığı Gidermek", href: "#uat-vs-beta" },
    { title: "UAT Test Senaryoları ve Örnekler", href: "#uat-scenarios" },
    { title: "Sera Projelerinde UAT Best Practices", href: "#best-practices" },
    { title: "Sık Yapılan UAT Hataları", href: "#common-mistakes" },
    { title: "UAT Araçları ve Teknolojiler", href: "#uat-tools" },
    { title: "Sonuç ve Öneriler", href: "#conclusion" }
  ];

  const relatedArticles = [
    {
      title: "2025'te En İyi 6 Sera Otomasyonu Alternatifi",
      href: "/blog/en-iyi-6-sera-otomasyonu-alternatifi-2025",
      category: "Otomasyon"
    },
    {
      title: "Sera Yatırımları: 2025'te 500₺/m² Plan Değer mi?",
      href: "/blog/sera-yatirimlari-2025-500tl-m2-plan-analizi",
      category: "Yatırım"
    },
    {
      title: "2025'te En İyi 8 Sera Monitoring Alternatifi",
      href: "/blog/en-iyi-8-sera-monitoring-alternatifi-2025",
      category: "Araçlar"
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="loading-corporate mx-auto mb-4"></div>
          <p className="text-gray-600">Makale yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {seoConfig && <SEOHead config={seoConfig} />}
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="w-full">
          <div className="flex justify-between items-center p-6 max-w-[960px] mx-auto">
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2F2c7ec7c93776440b923d3518963fc941%2F96da5382e9584c3fb2d32eca60944359?format=webp&width=800"
              alt="SeraGPT Logo"
              className="h-8 w-auto"
            />

            <nav className="hidden md:flex items-center space-x-8">
              <a href="/#" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
                Fiyatlar
              </a>
              <a href="/#" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
                Yardım
              </a>
              <a href="/blog" className="text-gray-900 font-medium border-b-2 border-gray-900 pb-1">
                Blog
              </a>
              <a href="/#" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
                Güncellemeler
              </a>
              <a href="/auth/login" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
                Giriş Yap
              </a>
            </nav>

            <button className="md:hidden">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </header>

        {/* Breadcrumb */}
        <div className="max-w-[960px] mx-auto px-6 py-4">
          <nav className="flex items-center space-x-2 text-sm text-gray-500">
            <a href="/" className="hover:text-gray-700">Ana Sayfa</a>
            <span>/</span>
            <a href="/blog" className="hover:text-gray-700">Blog</a>
            <span>/</span>
            <span className="text-gray-900">{article.title}</span>
          </nav>
        </div>

        {/* Main Content */}
        <main className="max-w-[960px] mx-auto px-6 pb-16">
          <div className="grid lg:grid-cols-4 gap-12">
            {/* Main Article */}
            <article className="lg:col-span-3">
              {/* Article Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-8"
              >
                <div className="mb-4">
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    {article.category}
                  </span>
                </div>
                
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                  {article.title}
                </h1>
                
                <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
                  <div className="flex items-center space-x-4">
                    <span>{article.publishedDate}</span>
                    <span>{article.readTime}</span>
                    <span>Yazar: {article.author}</span>
                  </div>
                </div>

                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-64 md:h-80 object-cover rounded-2xl"
                />
              </motion.div>

              {/* Article Content */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="prose prose-lg max-w-none"
              >
                {post?.content ? (
                  <div dangerouslySetInnerHTML={{ __html: post.content }} />
                ) : (
                  <>
                    <section id="what-is-uat" className="mb-12">
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">UAT Nedir? (Basit Açıklama)</h2>
                      
                      <p className="text-gray-700 leading-relaxed mb-6">
                        UAT (User Acceptance Testing), Türkçe karşılığıyla "Kullanıcı Kabul Testi", 
                        sera projelerinde son kullanıcıların (çiftçiler, sera işletmecileri, tarım 
                        mühendisleri) sistemi gerçek koşullarda test etmesidir.
                      </p>

                      <div className="bg-blue-50 border-l-4 border-blue-400 p-6 mb-6">
                        <p className="text-blue-800">
                          <strong>Basit Tanım:</strong> UAT, "Bu sera yönetim sistemi gerçekten 
                          ihtiyaçlarımızı karşılıyor mu?" sorusuna cevap arayan test sürecidir.
                        </p>
                      </div>

                      <p className="text-gray-700 leading-relaxed">
                        Sera projelerinde UAT özellikle kritiktir çünkü teknik ekipler sera 
                        işletmecilerinin günlük zorlukları hakkında her zaman doğru bilgiye sahip 
                        olmayabilir. UAT, bu boşluğu kapatır.
                      </p>
                    </section>

                    <section id="why-uat-matters" className="mb-12">
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">Sera Projelerinde UAT'ın Önemi</h2>
                      
                      <p className="text-gray-700 leading-relaxed mb-6">
                        Sera teknolojileri karmaşık sistemlerdir ve kullanıcı deneyimi başarının 
                        anahtarıdır. İşte UAT'ın sera projelerinde neden vazgeçilmez olduğu:
                      </p>

                      <div className="grid md:grid-cols-2 gap-6 mb-6">
                        <div className="bg-white p-6 rounded-xl border border-gray-200">
                          <h3 className="text-lg font-semibold text-gray-900 mb-3">Gerçek Senaryolar</h3>
                          <p className="text-gray-600 text-sm">
                            Sera işletmecileri sistemleri beklenmedik şekillerde kullanabilir. 
                            UAT bu durumları önceden tespit eder.
                          </p>
                        </div>
                        
                        <div className="bg-white p-6 rounded-xl border border-gray-200">
                          <h3 className="text-lg font-semibold text-gray-900 mb-3">Kullanılabilirlik</h3>
                          <p className="text-gray-600 text-sm">
                            Teknik olarak mükemmel sistem, kullanıcı dostu değilse 
                            benimsenmez. UAT bunu önler.
                          </p>
                        </div>
                      </div>
                    </section>

                    <section id="modern-uat-process" className="mb-12">
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">Modern UAT Süreci (Adım Adım)</h2>
                      
                      <div className="space-y-8">
                        <div className="flex items-start space-x-4">
                          <div className="bg-green-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                            1
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Planlama ve Hazırlık</h3>
                            <p className="text-gray-700">
                              UAT planı oluşturun, test senaryolarını belirleyin ve kullanıcı 
                              gruplarını seçin. Sera işletmecilerinin farklı profillerini 
                              (küçük, orta, büyük işletmeler) dahil edin.
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start space-x-4">
                          <div className="bg-green-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                            2
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Test Ortamı Kurulumu</h3>
                            <p className="text-gray-700">
                              Gerçek sera verilerine benzer test verilerini hazırlayın. 
                              Farklı sera türleri, iklim koşulları ve ürün çeşitlerini 
                              simüle edin.
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start space-x-4">
                          <div className="bg-green-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                            3
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Kullanıcı Eğitimi</h3>
                            <p className="text-gray-700">
                              Test kullanıcılarına sistem hakkında temel bilgiler verin. 
                              Ancak çok detaya girmeyin - doğal kullanım şekillerini 
                              gözlemlemek önemlidir.
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start space-x-4">
                          <div className="bg-green-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                            4
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Test Yürütme</h3>
                            <p className="text-gray-700">
                              Kullanıcıların sistemi günlük iş akışlarında kullanmalarini sağlayın. 
                              Gözlemleyin, notlar alın ve geri bildirimlerini kaydedin.
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start space-x-4">
                          <div className="bg-green-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                            5
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Sonuçların Değerlendirilmesi</h3>
                            <p className="text-gray-700">
                              Toplanan geri bildirimleri kategorize edin, öncelik sırası 
                              oluşturun ve gerekli değişiklikleri planlayın.
                            </p>
                          </div>
                        </div>
                      </div>
                    </section>

                    <section id="conclusion" className="mb-12">
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">Sonuç ve Öneriler</h2>
                      
                      <p className="text-gray-700 leading-relaxed mb-6">
                        UAT, sera projelerinin başarısı için kritik bir süreçtir. Doğru 
                        planlandığında ve yürütüldüğünde, hem kullanıcı memnuniyetini artırır 
                        hem de projenin ROI'sını yükseltir.
                      </p>

                      <div className="bg-green-50 border-l-4 border-green-400 p-6">
                        <p className="text-green-800">
                          <strong>Temel Tavsiye:</strong> UAT'ı bir seferlik test süreci olarak 
                          görmeyın. Sürekli geri bildirim toplama ve iyileştirme kültürünün 
                          başlangıcı olarak değerlendirin.
                        </p>
                      </div>
                    </section>
                  </>
                )}
              </motion.div>

              {/* Author Bio */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-8 border border-gray-200 mt-12"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
                    <span className="text-xl font-bold text-gray-600">
                      {article.author.split(' ').map((n: string) => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{article.author}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {article.authorBio}
                    </p>
                  </div>
                </div>
              </motion.div>
            </article>

            {/* Sidebar */}
            <aside className="lg:col-span-1">
              {/* Table of Contents */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="sticky top-8"
              >
                <div className="bg-white rounded-2xl p-6 border border-gray-200 mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">İçindekiler</h3>
                  <nav className="space-y-2">
                    {tableOfContents.map((item, index) => (
                      <a
                        key={index}
                        href={item.href}
                        className="block text-sm text-gray-600 hover:text-gray-900 py-1 transition-colors"
                      >
                        {item.title}
                      </a>
                    ))}
                  </nav>
                </div>

                {/* Related Articles */}
                <div className="bg-white rounded-2xl p-6 border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">İlgili Makaleler</h3>
                  <div className="space-y-4">
                    {relatedArticles.map((relatedArticle, index) => (
                      <a
                        key={index}
                        href={relatedArticle.href}
                        className="block p-3 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="text-xs text-gray-500 mb-1">{relatedArticle.category}</div>
                        <div className="text-sm font-medium text-gray-900">{relatedArticle.title}</div>
                      </a>
                    ))}
                  </div>
                </div>
              </motion.div>
            </aside>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-gray-50 py-16">
          <div className="max-w-[960px] mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
              {/* Product Column */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
                  Ürün
                </h3>
                <div className="space-y-3">
                  <a href="#" className="block text-sm text-gray-600 hover:text-gray-900 transition-colors">
                    Başlayın
                  </a>
                  <a href="#" className="block text-sm text-gray-600 hover:text-gray-900 transition-colors">
                    Fiyatlandırma
                  </a>
                  <a href="#" className="block text-sm text-gray-600 hover:text-gray-900 transition-colors">
                    Sera Analizi
                  </a>
                  <a href="#" className="block text-sm text-gray-600 hover:text-gray-900 transition-colors">
                    Güncellemeler
                  </a>
                  <a href="#" className="block text-sm text-gray-600 hover:text-gray-900 transition-colors">
                    Yol Haritası
                  </a>
                  <a href="#" className="block text-sm text-gray-600 hover:text-gray-900 transition-colors">
                    Kullanım Senaryoları
                  </a>
                  <a href="#" className="block text-sm text-gray-600 hover:text-gray-900 transition-colors">
                    Araçlar
                  </a>
                </div>
              </div>

              {/* Support Column */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
                  Destek
                </h3>
                <div className="space-y-3">
                  <a href="#" className="block text-sm text-gray-600 hover:text-gray-900 transition-colors">
                    İletişim
                  </a>
                  <a href="#" className="block text-sm text-gray-600 hover:text-gray-900 transition-colors">
                    Dokümantasyon
                  </a>
                  <a href="/blog" className="block text-sm text-gray-600 hover:text-gray-900 transition-colors">
                    Blog
                  </a>
                  <a href="#" className="block text-sm text-gray-600 hover:text-gray-900 transition-colors">
                    Durum
                  </a>
                  <a href="#" className="block text-sm text-gray-600 hover:text-gray-900 transition-colors">
                    Başarı Hikayeleri
                  </a>
                  <a href="#" className="block text-sm text-gray-600 hover:text-gray-900 transition-colors">
                    Tanımlar
                  </a>
                </div>
              </div>

              {/* Legal Column */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
                  Yasal
                </h3>
                <div className="space-y-3">
                  <a href="/privacy" className="block text-sm text-gray-600 hover:text-gray-900 transition-colors">
                    Gizlilik
                  </a>
                  <a href="/terms" className="block text-sm text-gray-600 hover:text-gray-900 transition-colors">
                    Koşullar
                  </a>
                </div>
              </div>

              {/* Resources Column */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
                  Kaynaklar
                </h3>
                <div className="space-y-3">
                  <a href="#" className="block text-sm text-gray-600 hover:text-gray-900 transition-colors">
                    AgroConsult Alternatifi
                  </a>
                  <a href="#" className="block text-sm text-gray-600 hover:text-gray-900 transition-colors">
                    FarmScope Alternatifi
                  </a>
                  <a href="#" className="block text-sm text-gray-600 hover:text-gray-900 transition-colors">
                    SeraVision Alternatifi
                  </a>
                  <a href="#" className="block text-sm text-gray-600 hover:text-gray-900 transition-colors">
                    Karşılaştır
                  </a>
                </div>
              </div>
            </div>

            {/* Bottom Footer */}
            <div className="pt-8">
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
          </div>
        </footer>
      </div>
    </>
  );
}
