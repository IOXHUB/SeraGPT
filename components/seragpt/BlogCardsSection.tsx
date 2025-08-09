'use client';

export default function BlogCardsSection() {
  return (
    <div className="relative px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            BLOG
          </h2>
        </div>

        {/* Horizontal Scrolling Blog Cards */}
        <div className="relative">
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
                  {/* Card with glass morphism */}
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 overflow-hidden hover:bg-white/20 transition-all shadow-xl">
                    
                    {/* Placeholder Image */}
                    <div className="relative overflow-hidden">
                      <div className="w-full h-48 bg-gradient-to-br from-white/20 to-white/10 flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-4xl mb-2">📚</div>
                          <p className="text-sm text-white/70">Blog Görseli</p>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 space-y-3">
                      {/* Date and Category */}
                      <div className="flex items-center space-x-2 text-sm">
                        <span className="text-white/70">{post.date}</span>
                        <span className="text-white/50">•</span>
                        <span className="text-white/90 font-medium">{post.category}</span>
                      </div>

                      {/* Title */}
                      <h3 className="text-lg font-semibold text-white group-hover:text-white/90 transition-colors leading-tight line-clamp-2">
                        {post.title}
                      </h3>

                      {/* Excerpt */}
                      <p className="text-white/80 text-sm leading-relaxed line-clamp-3">
                        {post.excerpt}
                      </p>
                    </div>
                  </div>
                </a>
              </article>
            ))}
          </div>

          {/* All Blog Posts Button */}
          <div className="text-center mt-8">
            <a
              href="/blog"
              className="inline-flex items-center bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-6 py-3 rounded-2xl font-medium transition-colors border border-white/30"
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
