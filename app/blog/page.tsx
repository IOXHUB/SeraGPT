'use client';

import { motion } from 'framer-motion';
import SEOHead from '@/components/SEOHead';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
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
    slug: "sera-teknolojilerinde-2025-yenilikleri",
    title: "Sera Teknolojilerinde 2025 Yenilikleri",
    excerpt: "Modern sera teknolojileri ile tarımsal verimliliği artırmanın yolları. İklim kontrolü, otomasyon sistemleri ve sürdürülebilir tarım uygulamalarında son gelişmeler.",
    image: "https://cdn.builder.io/api/v1/image/assets%2F2c7ec7c93776440b923d3518963fc941%2F382157220f6b4482a9c765091441c587",
    date: "15 Ocak 2025",
    category: "Tarım Teknolojisi"
  };

  const categories = [
    { name: "Veriye Dayalı Tarım", color: "bg-blue-100", textColor: "text-blue-900", slug: "veriye-dayali-tarim" },
    { name: "Gizli Maliyetler", color: "bg-red-100", textColor: "text-red-900", slug: "gizli-maliyetler" },
    { name: "Akıllı Sera Modelleri", color: "bg-purple-100", textColor: "text-purple-900", slug: "akilli-sera-modelleri" },
    { name: "Tarımsal Zeka", color: "bg-yellow-100", textColor: "text-yellow-900", slug: "tarimsal-zeka" },
    { name: "ROI & Maliyet İçerikleri", color: "bg-green-100", textColor: "text-green-900", slug: "roi-maliyet" },
    { name: "İklim Krizi ve Tarım", color: "bg-orange-100", textColor: "text-orange-900", slug: "iklim-krizi-tarim" },
    { name: "Ticari Ürün Rehberi", color: "bg-teal-100", textColor: "text-teal-900", slug: "ticari-urun-rehberi" },
    { name: "Tarımda Kadın Eli", color: "bg-pink-100", textColor: "text-pink-900", slug: "tarimda-kadin-eli" },
    { name: "Sera Mimarlığı & Tasarım", color: "bg-indigo-100", textColor: "text-indigo-900", slug: "sera-mimarligi-tasarim" }
  ];

  const latestPosts = [
    {
      id: 2,
      slug: "gizli-maliyetler-sera-yatirimi",
      title: "Gizli Maliyetler: Sera Yatırımında Dikkat Edilmesi Gerekenler",
      excerpt: "Sera kurulumunda öngörülmeyen masraflar ve bunlardan nasıl kaçınılır?",
      image: "https://cdn.builder.io/api/v1/image/assets%2F2c7ec7c93776440b923d3518963fc941%2F8d7e72b1c294492c836f9b95c0d5196d?format=webp&width=800",
      date: "12 Ocak 2025"
    },
    {
      id: 3,
      slug: "roi-maliyet-analizi",
      title: "ROI & Maliyet Analizi: Sera Yatırımının Geri Dönüşü",
      excerpt: "Sera yatırımının karlılık analizi ve geri dönüş süresi hesaplamaları.",
      image: "https://cdn.builder.io/api/v1/image/assets%2F2c7ec7c93776440b923d3518963fc941%2F8d7e72b1c294492c836f9b95c0d5196d?format=webp&width=800",
      date: "10 Ocak 2025"
    },
    {
      id: 4,
      slug: "iklim-krizi-tarim",
      title: "İklim Krizi ve Tarım: Sürdürülebilir Çözümler",
      excerpt: "İklim değişikliğinin tarıma etkileri ve sera teknolojileri ile alınacak önlemler.",
      image: "https://cdn.builder.io/api/v1/image/assets%2F2c7ec7c93776440b923d3518963fc941%2F8d7e72b1c294492c836f9b95c0d5196d?format=webp&width=800",
      date: "8 Ocak 2025"
    },
    {
      id: 5,
      slug: "ticari-urun-rehberi",
      title: "Ticari Ürün Rehberi: Hangi Sebze En Karlı?",
      excerpt: "Sera üretiminde en karlı sebze türleri ve pazar analizi.",
      image: "https://cdn.builder.io/api/v1/image/assets%2F2c7ec7c93776440b923d3518963fc941%2F8d7e72b1c294492c836f9b95c0d5196d?format=webp&width=800",
      date: "5 Ocak 2025"
    },
    {
      id: 6,
      slug: "tarimda-kadin-eli",
      title: "Tarımda Kadın Eli: Teknoloji ve Fırsat Eşitliği",
      excerpt: "Tarım sektöründe kadın girişimciler ve teknolojinin rolü.",
      image: "https://cdn.builder.io/api/v1/image/assets%2F2c7ec7c93776440b923d3518963fc941%2F8d7e72b1c294492c836f9b95c0d5196d?format=webp&width=800",
      date: "3 Ocak 2025"
    },
    {
      id: 7,
      slug: "sera-mimarligi-tasarim",
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
        <Header />

        {/* Main Content */}
        <main className="max-w-6xl mx-auto px-6 py-12">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12 flex flex-col"
          >
            <h1 className="text-4xl font-semibold text-gray-900 mb-12 self-center">
              BLOG
            </h1>
          </motion.div>

          {/* Featured Post */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-16"
          >
            <a href={`/blog/${featuredPost.slug}`} className="flex gap-8 items-start group">
              <div className="w-80 flex-shrink-0">
                <div className="relative overflow-hidden rounded-lg">
                  <img
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
              <div className="flex-1 space-y-4">
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span>{featuredPost.date}</span>
                  <span>{featuredPost.category}</span>
                </div>
                <h2 className="text-2xl font-semibold text-gray-900 leading-tight group-hover:text-gray-700 transition-colors">
                  {featuredPost.title}
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  {featuredPost.excerpt}
                </p>
              </div>
            </a>
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
                <motion.a
                  key={category.name}
                  href={`/blog/category/${category.slug}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  className={`${category.color} rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer block group`}
                >
                  <h3 className={`text-lg font-semibold ${category.textColor} group-hover:opacity-80 transition-opacity`}>
                    {category.name}
                  </h3>
                </motion.a>
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
                  <a href={`/blog/${post.slug}`} className="block">
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
                  </a>
                </motion.article>
              ))}
            </div>
          </motion.div>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}
