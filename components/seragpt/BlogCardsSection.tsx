'use client';

export default function BlogCardsSection() {
  return (
    <div className="section">
      <div className="body-container">
        <div className="text-center mb-12">
          <div className="text-container">
            <h2 className="heading-2 text-center">
              BLOG
            </h2>
          </div>
        </div>

        {/* Horizontal Scrolling Blog Cards */}
        <div className="relative">
          <div className="visual-container">
            <div className="flex overflow-x-auto scrollbar-hide space-x-6 pb-6">
              {[
                {
                  date: "15 Ocak 2025",
                  category: "Tarım Teknolojisi",
                  title: "Sera Teknolojilerinde 2025 Yenilikleri ve Sürdürülebilir Tarım",
                  excerpt: "Modern sera teknolojileri ile tarımsal verimliliği artırmanın yolları."
                },
                {
                  date: "12 Ocak 2025",
                  category: "Yatırım Analizi",
                  title: "Sera Yatırımlarında ROI Hesaplama Stratejileri",
                  excerpt: "Doğru analiz yöntemleri ile sera yatırımlarında maksimum getiri."
                },
                {
                  date: "8 Ocak 2025",
                  category: "İklim Kontrolü",
                  title: "Akıllı İklim Kontrol Sistemleri ve Enerji Verimliliği",
                  excerpt: "Otomatik iklim kontrol sistemleri ile %30 enerji tasarrufu."
                },
                {
                  date: "5 Ocak 2025",
                  category: "Pazarlama",
                  title: "Sera Ürünlerinde Dijital Pazarlama Trendleri",
                  excerpt: "Online satış kanalları ile sera ürünlerinde başarılı pazarlama."
                },
                {
                  date: "2 Ocak 2025",
                  category: "Hidroponik",
                  title: "Hidroponik Sera Sistemlerinde Son Gelişmeler",
                  excerpt: "Su ve besin tasarrufu sağlayan hidroponik sistemlerin avantajları."
                }
              ].map((post, index) => (
                <article
                  key={index}
                  className="flex-shrink-0 w-80 group cursor-pointer"
                >
                  <a href={`/blog/post-${index + 1}`} className="block">
                    {/* Placeholder Image */}
                    <div className="relative overflow-hidden rounded-lg mb-4">
                      <div className="w-full h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-4xl mb-2">📚</div>
                          <p className="text-sm text-gray-600">Blog Görseli</p>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="space-y-3">
                      {/* Date and Category */}
                      <div className="flex items-center space-x-2 text-sm">
                        <span className="text-gray-500">{post.date}</span>
                        <span className="text-gray-400">•</span>
                        <span className="text-gray-700 font-medium">{post.category}</span>
                      </div>

                      {/* Title */}
                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-gray-700 transition-colors leading-tight line-clamp-2">
                        {post.title}
                      </h3>

                      {/* Excerpt */}
                      <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                        {post.excerpt}
                      </p>
                    </div>
                  </a>
                </article>
              ))}
            </div>
          </div>

          {/* All Blog Posts Button */}
          <div className="text-center mt-8">
            <a
              href="/blog"
              className="btn btn-primary"
            >
              <span>Tüm Blog Yazılarımız</span>
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
