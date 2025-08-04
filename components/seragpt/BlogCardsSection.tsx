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
      <div className="py-20 bg-gray-50">
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
    <div className="py-20 bg-gray-50">
      <div className="max-w-[960px] mx-auto px-6">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Son Blog Yazıları
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Sera teknolojileri ve yatırım analizi üzerine en güncel içerikler
            </p>
            
            <div className="flex justify-center">
              <a 
                href="/blog"
                className="inline-flex items-center space-x-2 text-gray-900 font-medium hover:underline transition-colors"
              >
                <span>Tüm yazıları görüntüle</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </motion.div>
        </div>

        {/* Horizontal Scrolling Cards */}
        <div className="relative">
          <div className="flex overflow-x-auto scrollbar-hide space-x-6 pb-6">
            {posts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex-shrink-0 w-80 group cursor-pointer"
              >
                <a href={`/blog/${post.slug}`} className="block">
                  {/* Image */}
                  <div className="relative overflow-hidden rounded-2xl mb-4">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    

                  </div>

                  {/* Content */}
                  <div className="space-y-3">
                    {/* Date */}
                    <div className="text-sm text-gray-500">
                      {post.date}
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-gray-700 transition-colors leading-tight line-clamp-2">
                      {post.title}
                    </h3>
                    
                    {/* Excerpt */}
                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                    
                    {/* Read More */}
                    <div className="flex items-center justify-between pt-2">
                      {post.author && (
                        <span className="text-xs text-gray-500">
                          {post.author}
                        </span>
                      )}
                      <span className="text-sm font-medium text-gray-900 group-hover:underline">
                        Oku →
                      </span>
                    </div>
                  </div>
                </a>
              </motion.article>
            ))}
          </div>

          {/* Navigation Hint */}
          <div className="flex justify-center mt-8">
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
              </svg>
              <span>Kaydırarak daha fazla yazı görüntüleyin</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
