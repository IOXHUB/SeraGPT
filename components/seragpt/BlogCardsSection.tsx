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

        {/* Single Featured Blog Card */}
        <div className="relative">
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row gap-6 group cursor-pointer"
          >
            <a href="/blog/sera-teknolojilerinde-yenilikler" className="flex flex-col md:flex-row gap-6 w-full">
              {/* Image */}
              <div className="relative overflow-hidden rounded-lg md:w-80 flex-shrink-0">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2F2c7ec7c93776440b923d3518963fc941%2F96da5382e9584c3fb2d32eca60944359?format=webp&width=800"
                  alt="Sera Teknolojilerinde Yenilikler"
                  className="w-full h-48 md:h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="flex-1 space-y-3">
                {/* Date */}
                <div className="flex items-center space-x-2 text-sm">
                  <span className="text-gray-500">15 Ocak 2025</span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold text-gray-900 group-hover:text-gray-700 transition-colors leading-tight">
                  Sera Teknolojilerinde 2025 Yenilikleri ve Sürdürülebilir Tarım
                </h3>

                {/* Excerpt */}
                <p className="text-gray-600 leading-relaxed">
                  Modern sera teknolojileri ile tarımsal verimliliği artırmanın yolları. İklim kontrolü, otomasyon sistemleri ve sürdürülebilir tarım uygulamalarında son gelişmeler.
                </p>
              </div>
            </a>
          </motion.article>

          {/* All Blog Posts Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
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
