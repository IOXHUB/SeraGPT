'use client';

import { motion } from 'framer-motion';
import SEOHead from '@/components/SEOHead';
import { SEOService } from '@/lib/seo';
import { useState, useEffect } from 'react';

// Force dynamic rendering for blog pages
export const dynamic = 'force-dynamic';

export default function BlogPage() {
  const [seoConfig, setSeoConfig] = useState(SEOService.generateBlogPageSEO());

  useEffect(() => {
    setSeoConfig(SEOService.generateBlogPageSEO());
  }, []);

  const featuredPost = {
    id: 1,
    title: "Sera Teknolojilerinde 2025 Yenilikleri",
    excerpt: "Modern sera teknolojileri ile tarımsal verimliliği artırmanın yolları. İklim kontrolü, otomasyon sistemleri ve sürdürülebilir tarım uygulamalarında son gelişmeler.",
    image: "https://cdn.builder.io/api/v1/image/assets%2F2c7ec7c93776440b923d3518963fc941%2F8d7e72b1c294492c836f9b95c0d5196d?format=webp&width=800",
    date: "15 Ocak 2025",
    category: "Tarım Teknolojisi"
  };

  const categories = [
    { name: "Veriye Dayalı Tarım", color: "bg-blue-100", textColor: "text-blue-900" },
    { name: "Akıllı Sera Modelleri", color: "bg-purple-100", textColor: "text-purple-900" },
    { name: "Tarımsal Zeka", color: "bg-yellow-100", textColor: "text-yellow-900" }
  ];

  const latestPosts = [
    {
      id: 2,
      title: "Gizli Maliyetler: Sera Yatırımında Dikkat Edilmesi Gerekenler",
      excerpt: "Sera kurulumunda öngörülmeyen masraflar ve bunlardan nasıl kaçınılır?",
      image: "https://cdn.builder.io/api/v1/image/assets%2F2c7ec7c93776440b923d3518963fc941%2F8d7e72b1c294492c836f9b95c0d5196d?format=webp&width=800",
      date: "12 Ocak 2025"
    },
    {
      id: 3,
      title: "ROI & Maliyet Analizi: Sera Yatırımının Geri Dönüşü",
      excerpt: "Sera yatırımının karlılık analizi ve geri dönüş süresi hesaplamaları.",
      image: "https://cdn.builder.io/api/v1/image/assets%2F2c7ec7c93776440b923d3518963fc941%2F8d7e72b1c294492c836f9b95c0d5196d?format=webp&width=800",
      date: "10 Ocak 2025"
    },
    {
      id: 4,
      title: "İklim Krizi ve Tarım: Sürdürülebilir Çözümler",
      excerpt: "İklim değişikliğinin tarıma etkileri ve sera teknolojileri ile alınacak önlemler.",
      image: "https://cdn.builder.io/api/v1/image/assets%2F2c7ec7c93776440b923d3518963fc941%2F8d7e72b1c294492c836f9b95c0d5196d?format=webp&width=800",
      date: "8 Ocak 2025"
    },
    {
      id: 5,
      title: "Ticari Ürün Rehberi: Hangi Sebze En Karlı?",
      excerpt: "Sera üretiminde en karlı sebze türleri ve pazar analizi.",
      image: "https://cdn.builder.io/api/v1/image/assets%2F2c7ec7c93776440b923d3518963fc941%2F8d7e72b1c294492c836f9b95c0d5196d?format=webp&width=800",
      date: "5 Ocak 2025"
    },
    {
      id: 6,
      title: "Tarımda Kadın Eli: Teknoloji ve Fırsat Eşitliği",
      excerpt: "Tarım sektöründe kadın girişimciler ve teknolojinin rolü.",
      image: "https://cdn.builder.io/api/v1/image/assets%2F2c7ec7c93776440b923d3518963fc941%2F8d7e72b1c294492c836f9b95c0d5196d?format=webp&width=800",
      date: "3 Ocak 2025"
    },
    {
      id: 7,
      title: "Sera Mimarlığı & Tasarım: Verimlilik Odaklı Yaklaşım",
      excerpt: "Modern sera tasarımında dikkat edilmesi gereken kriterler ve mimari detaylar.",
      image: "https://cdn.builder.io/api/v1/image/assets%2F2c7ec7c93776440b923d3518963fc941%2F8d7e72b1c294492c836f9b95c0d5196d?format=webp&width=800",
      date: "1 Ocak 2025"
    }
  ];

  return (
    <>
      <SEOHead config={seoConfig} />
      <div className="min-h-screen bg-white">
        {/* Header */}
        <header className="w-full border-b border-gray-200">
          <div className="flex justify-between items-center p-6 max-w-6xl mx-auto">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                <span className="text-white text-sm font-bold">S</span>
              </div>
              <span className="text-lg font-semibold">SeraGPT</span>
            </div>

            <nav className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-gray-700 hover:text-gray-900 transition-colors">
                Fiyatlandırma
              </a>
              <a href="/dashboard/help" className="text-gray-700 hover:text-gray-900 transition-colors">
                Yardım
              </a>
              <a href="/blog" className="text-gray-900 font-medium">
                Blog
              </a>
              <a href="#" className="text-gray-700 hover:text-gray-900 transition-colors">
                Güncellemeler
              </a>
            </nav>

            <a href="/auth/login" className="text-gray-700 hover:text-gray-900 transition-colors font-medium">
              Giriş Yap
            </a>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-6xl mx-auto px-6 py-12">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <p className="text-gray-600 text-sm mb-4">
              Tarım & Teknoloji
            </p>
            <h1 className="text-4xl font-normal text-gray-900 mb-12">
              Sera teknolojileri, tarım analizi ve yatırım stratejileri üzerine düşünceler.
            </h1>
          </motion.div>

          {/* Featured Post */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-16"
          >
            <div className="flex gap-8 items-start">
              <div className="w-80 flex-shrink-0">
                <div className="relative overflow-hidden rounded-lg">
                  <img
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    className="w-full h-48 object-cover"
                  />
                </div>
              </div>
              <div className="flex-1 space-y-4">
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span>{featuredPost.date}</span>
                  <span>{featuredPost.category}</span>
                </div>
                <h2 className="text-2xl font-semibold text-gray-900 leading-tight">
                  {featuredPost.title}
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  {featuredPost.excerpt}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Categories */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-16"
          >
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-6">
              KATEGORİLER
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {categories.map((category, index) => (
                <motion.div
                  key={category.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  className={`${category.color} rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer`}
                >
                  <h3 className={`text-lg font-semibold ${category.textColor}`}>
                    {category.name}
                  </h3>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Latest Posts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-6">
              SON YAZILAR
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {latestPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  className="group cursor-pointer"
                >
                  <div className="relative overflow-hidden rounded-lg mb-4">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="space-y-3">
                    <div className="text-sm text-gray-500">
                      {post.date}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-gray-700 transition-colors leading-tight">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>
                </motion.article>
              ))}
            </div>
          </motion.div>
        </main>
      </div>
    </>
  );
}
