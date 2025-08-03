'use client';

import { motion } from 'framer-motion';

export default function BlogPage() {
  const featuredPost = {
    id: 1,
    title: "Sera Yatırımları: 2025'te 500₺/m² Plan Değer mi? (Yeni Trend Analizi)",
    excerpt: "Sera maliyetleri analizi: 300₺ vs 500₺/m² planları. Yeni trend limitleri ne anlama geliyor ve sera yatırımcıları neden endişeli.",
    image: "https://cdn.builder.io/api/v1/image/assets%2F2c7ec7c93776440b923d3518963fc941%2F3beecd14d0864cae823f643eeacb9705?format=webp&width=800",
    date: "29 Aralık 2025",
    category: "Yatırım",
    readTime: "8 dk okuma"
  };

  const categories = [
    { name: "Sera Yönetimi", color: "bg-blue-100", count: 12 },
    { name: "Yatırım Analizi", color: "bg-purple-100", count: 8 },
    { name: "Teknoloji", color: "bg-yellow-100", count: 15 }
  ];

  const latestPosts = [
    {
      id: 2,
      title: "UAT (Kullanıcı Kabul Testi) için Komple Rehber - Sera Projelerinde 2025",
      excerpt: "Sera projelerinde kullanıcı kabul testlerinin önemi ve uygulama rehberi...",
      image: "/api/placeholder/300/200",
      date: "29 Aralık 2025",
      category: "Teknoloji",
      readTime: "6 dk okuma"
    },
    {
      id: 3,
      title: "2025'te En İyi 8 Sera Monitoring Alternatifi",
      excerpt: "FarmScope'un 250₺/aylık fiyatı cazip, alternatifler nasıl karşılaştırılır...",
      image: "/api/placeholder/300/200",
      date: "28 Aralık 2025", 
      category: "Yatırım",
      readTime: "10 dk okuma"
    },
    {
      id: 4,
      title: "2025'te En İyi 6 Sera Otomasyonu Alternatifi",
      excerpt: "Sera otomasyonu ücretleri 650₺/aylık başlıyor, hangi alternatifleri değerlendirmeli...",
      image: "/api/placeholder/300/200",
      date: "28 Aralık 2025",
      category: "Teknoloji", 
      readTime: "7 dk okuma"
    }
  ];

  return (
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
          <a href="#" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
            Fiyatlar
          </a>
          <a href="#" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
            Yard��m
          </a>
          <a href="#" className="text-gray-900 font-medium border-b-2 border-gray-900 pb-1">
            Blog
          </a>
          <a href="#" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
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

      {/* Main Content */}
      <main className="max-w-[960px] mx-auto px-6 py-16">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-gray-500 text-sm font-medium uppercase tracking-wider mb-4">
            Ürün ve Süreç
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Sera yönetimi, yatırım analizi ve teknoloji üzerine düşünceler.
          </h1>
        </motion.div>

        {/* Featured Post */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-20"
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="relative overflow-hidden rounded-2xl">
              <img
                src={featuredPost.image}
                alt={featuredPost.title}
                className="w-full h-64 md:h-80 object-cover"
              />
            </div>
            <div className="space-y-4">
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span>{featuredPost.date}</span>
                <span>{featuredPost.category}</span>
                <span>{featuredPost.readTime}</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
                {featuredPost.title}
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {featuredPost.excerpt}
              </p>
              <button className="text-black font-medium hover:underline inline-flex items-center space-x-2">
                <span>Makaleyi oku</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
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
          <h2 className="text-lg font-semibold text-gray-900 uppercase tracking-wider mb-8">
            Kategoriler
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className={`${category.color} rounded-2xl p-8 hover:shadow-lg transition-shadow cursor-pointer group`}
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">
                  {category.name}
                </h3>
                <p className="text-gray-600 text-sm">
                  {category.count} makale
                </p>
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
          <h2 className="text-lg font-semibold text-gray-900 uppercase tracking-wider mb-8">
            Son Yazılar
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {latestPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className="group cursor-pointer"
              >
                <div className="relative overflow-hidden rounded-xl mb-4">
                  <div className="w-full h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                    <div className="text-6xl">📊</div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <span>{post.date}</span>
                    <span>{post.category}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-gray-700 transition-colors leading-tight">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">{post.readTime}</span>
                    <button className="text-black text-sm font-medium hover:underline">
                      Oku →
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.div>

        {/* Load More */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <button className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-3 rounded-lg font-medium transition-colors">
            Daha Fazla Makale Yükle
          </button>
        </motion.div>
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
  );
}
