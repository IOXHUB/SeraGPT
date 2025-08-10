'use client';

import { motion } from 'framer-motion';
import SEOHead from '@/components/SEOHead';
import Footer from '@/components/Footer';
import Link from 'next/link';
import OptimizedImage from '@/components/ui/OptimizedImage';
import { SEOService } from '@/lib/seo';
import { useState, useEffect } from 'react';

// Force dynamic rendering for blog pages
export const dynamic = 'force-dynamic';

export default function BlogPage() {
  const [seoConfig, setSeoConfig] = useState(SEOService.generateBlogPageSEO());
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    setSeoConfig(SEOService.generateBlogPageSEO());
  }, []);

  const categories = [
    { name: "Tümü", color: "bg-[#146448]", textColor: "text-white", slug: "all", count: 6 },
    { name: "Veriye Dayalı Tarım", color: "bg-[#146448]/10", textColor: "text-[#1e3237]", slug: "veriye-dayali-tarim", count: 2 },
    { name: "Gizli Maliyetler", color: "bg-[#baf200]/20", textColor: "text-[#1e3237]", slug: "gizli-maliyetler", count: 1 },
    { name: "ROI & Maliyet", color: "bg-[#146448]/15", textColor: "text-[#1e3237]", slug: "roi-maliyet", count: 1 },
    { name: "İklim & Tarım", color: "bg-[#baf200]/25", textColor: "text-[#1e3237]", slug: "iklim-krizi-tarim", count: 1 },
    { name: "Sera Mimarlığı", color: "bg-[#146448]/12", textColor: "text-[#1e3237]", slug: "sera-mimarligi-tasarim", count: 1 }
  ];

  const allPosts = [
    {
      id: 1,
      slug: "sera-teknolojilerinde-2025-yenilikleri",
      title: "Sera Teknolojilerinde 2025 Yenilikleri",
      excerpt: "Modern sera teknolojileri ile tarımsal verimliliği artırmanın yolları. İklim kontrolü, otomasyon sistemleri ve sürdürülebilir tarım.",
      image: "https://cdn.builder.io/api/v1/image/assets%2F2c7ec7c93776440b923d3518963fc941%2F382157220f6b4482a9c765091441c587",
      date: "15 Ocak 2025",
      category: "veriye-dayali-tarim"
    },
    {
      id: 2,
      slug: "gizli-maliyetler-sera-yatirimi",
      title: "Gizli Maliyetler: Sera Yatırımında Dikkat Edilmesi Gerekenler",
      excerpt: "Sera kurulumunda öngörülmeyen masraflar ve bunlardan nasıl kaçınılır?",
      image: "https://cdn.builder.io/api/v1/image/assets%2F2c7ec7c93776440b923d3518963fc941%2Fa9783275f0b14277aa1513bc9ca47a7b",
      date: "12 Ocak 2025",
      category: "gizli-maliyetler"
    },
    {
      id: 3,
      slug: "roi-maliyet-analizi",
      title: "ROI & Maliyet Analizi: Sera Yatırımının Geri Dönüşü",
      excerpt: "Sera yatırımının karlılık analizi ve geri dönüş süresi hesaplamaları.",
      image: "https://cdn.builder.io/api/v1/image/assets%2F2c7ec7c93776440b923d3518963fc941%2Fd1956ad26a134fa1b292da0acfb10217",
      date: "10 Ocak 2025",
      category: "roi-maliyet"
    },
    {
      id: 4,
      slug: "iklim-krizi-tarim",
      title: "İklim Krizi ve Tarım: Sürdürülebilir Çözümler",
      excerpt: "İklim değişikliğinin tarıma etkileri ve sera teknolojileri ile alınacak önlemler.",
      image: "https://cdn.builder.io/api/v1/image/assets%2F2c7ec7c93776440b923d3518963fc941%2F10278e2b44aa42168429a20e4e5a9fb8",
      date: "8 Ocak 2025",
      category: "iklim-krizi-tarim"
    },
    {
      id: 5,
      slug: "ticari-urun-rehberi",
      title: "Ticari Ürün Rehberi: Hangi Sebze En Karlı?",
      excerpt: "Sera üretiminde en karlı sebze türleri ve pazar analizi.",
      image: "https://cdn.builder.io/api/v1/image/assets%2F2c7ec7c93776440b923d3518963fc941%2F4abcdd109aff4ed9bb3759b448e84aef",
      date: "5 Ocak 2025",
      category: "veriye-dayali-tarim"
    },
    {
      id: 6,
      slug: "sera-mimarligi-tasarim",
      title: "Sera Mimarlığı & Tasarım: Verimlilik Odaklı Yaklaşım",
      excerpt: "Modern sera tasarımında dikkat edilmesi gereken kriterler ve mimari detaylar.",
      image: "https://cdn.builder.io/api/v1/image/assets%2F2c7ec7c93776440b923d3518963fc941%2Fc9cd6cb37b81445aabef80d84b74e313",
      date: "1 Ocak 2025",
      category: "sera-mimarligi-tasarim"
    }
  ];

  const filteredPosts = selectedCategory && selectedCategory !== 'all'
    ? allPosts.filter(post => post.category === selectedCategory)
    : allPosts;

  return (
    <>
      <SEOHead config={seoConfig} />
      <div className="min-h-screen bg-[#f6f8f9]">
        {/* Header */}
        <Header />

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-6 py-8">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl font-light text-[#1e3237] mb-4 tracking-wide">
              BLOG
            </h1>
            <p className="text-[#1e3237]/60 text-lg max-w-2xl mx-auto">
              Sera teknolojileri, tarımsal verimlilik ve sürdürülebilir tarım hakkında uzman içerikleri
            </p>
          </motion.div>

          {/* Categories Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12"
          >
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category, index) => (
                <motion.button
                  key={category.slug}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.1 * index }}
                  onClick={() => setSelectedCategory(category.slug === 'all' ? null : category.slug)}
                  className={`
                    ${selectedCategory === category.slug || (selectedCategory === null && category.slug === 'all')
                      ? category.color === 'bg-[#146448]' ? 'bg-[#146448] text-white' : 'bg-[#146448] text-white'
                      : category.color + ' ' + category.textColor
                    }
                    px-6 py-3 rounded-full text-sm font-medium transition-all duration-300
                    hover:shadow-lg hover:scale-105 cursor-pointer
                    border border-transparent hover:border-[#146448]/20
                  `}
                >
                  {category.name}
                  <span className="ml-2 text-xs opacity-70">({category.count})</span>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Posts Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  className="group cursor-pointer"
                >
                  <a href={`/blog/${post.slug}`} className="block">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                      <div className="relative overflow-hidden">
                        <OptimizedImage
                          src={post.image}
                          alt={post.title}
                          width={400}
                          height={240}
                          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                          preset="thumbnail"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                      <div className="p-6 space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-[#146448] font-medium uppercase tracking-wider">
                            {post.date}
                          </span>
                          <span className="px-2 py-1 bg-[#baf200]/20 text-[#1e3237] text-xs rounded-full font-medium">
                            {categories.find(cat => cat.slug === post.category)?.name.split(' ')[0] || 'Blog'}
                          </span>
                        </div>
                        <h3 className="text-xl font-semibold text-[#1e3237] group-hover:text-[#146448] transition-colors leading-tight line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="text-[#1e3237]/70 text-sm leading-relaxed line-clamp-3">
                          {post.excerpt}
                        </p>
                        <div className="pt-2">
                          <span className="text-[#146448] text-sm font-medium group-hover:underline">
                            Devamını Oku →
                          </span>
                        </div>
                      </div>
                    </div>
                  </a>
                </motion.article>
              ))}
            </div>

            {/* Empty State */}
            {filteredPosts.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <div className="text-[#1e3237]/40 text-lg mb-4">
                  Bu kategoride henüz içerik bulunmuyor.
                </div>
                <button
                  onClick={() => setSelectedCategory(null)}
                  className="text-[#146448] font-medium hover:underline"
                >
                  Tüm yazıları görüntüle
                </button>
              </motion.div>
            )}
          </motion.div>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}
