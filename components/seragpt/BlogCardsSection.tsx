'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { BlogService, BlogPost } from '@/lib/blog';

export default function BlogCardsSection() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const latestPosts = await BlogService.getLatestPosts(5);
        setPosts(latestPosts);
      } catch (error) {
        console.error('Blog yazıları yüklenirken hata:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="py-20 bg-gray-50 text-gray-600">
        <div className="max-w-[960px] mx-auto px-6">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Son Blog Yazıları
              </h2>
              <p className="text-lg text-gray-600">
                Sera teknolojileri ve yatırım analizi üzerine en güncel içerikler
              </p>
            </motion.div>
          </div>
          
          <div className="flex space-x-6 overflow-x-auto pb-6">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="flex-shrink-0 w-80 animate-pulse">
                <div className="bg-gray-200 rounded-2xl h-48 mb-4"></div>
                <div className="space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-3 bg-gray-200 rounded w-full"></div>
                  <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-20 bg-white text-gray-600">
      <div className="max-w-[960px] mx-auto px-6">
        <div className="text-left mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Sera Teknolojilerinde İnovasyon ve Geleceğin Tarımı
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Modern tarım teknolojileri, sürdürülebilir sera çözümleri ve akıllı yatırım stratejileri ile tarımsal dönüşümün merkezindeyiz.
            </p>
          </motion.div>
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
              <motion.article
                key={index}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
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
              </motion.article>
            ))}
          </div>

          {/* All Blog Posts Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
            className="text-center mt-8"
          >
            <a
              href="/blog"
              className="inline-flex items-center space-x-2 bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              <span>Tüm Blog Yazılarımız</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
