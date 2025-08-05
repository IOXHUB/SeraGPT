'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import SEOHead from '@/components/SEOHead';
import { SEOService } from '@/lib/seo';

// Force dynamic rendering for blog pages
export const dynamic = 'force-dynamic';

interface BlogPostProps {
  params: {
    slug: string;
  };
}

export default function BlogPostPage({ params }: BlogPostProps) {
  const [seoConfig, setSeoConfig] = useState(SEOService.generateBlogPageSEO());
  const [activeSection, setActiveSection] = useState('overview');

  useEffect(() => {
    setSeoConfig(SEOService.generateBlogPageSEO());
  }, []);

  // Demo blog post data based on the screenshot
  const blogPost = {
    title: "Sera Teknolojilerinde En İyi 8 Alternatif - 2025",
    date: "15 Ocak 2025",
    category: "Tarım Teknolojisi",
    author: "SeraGPT Ekibi",
    readTime: "12 dk okuma",
    image: "https://cdn.builder.io/api/v1/image/assets%2F2c7ec7c93776440b923d3518963fc941%2F32d5d8425b2244eb96f6e31a0d411e44?format=webp&width=800",
    excerpt: "Sera teknolojilerinde en etkili çözümleri karşılaştırıyoruz. Fiyat, özellik ve kullanım kolaylığı açısından en iyi 8 alternatifi keşfedin.",
    content: {
      overview: "Sera yönetimi için doğru teknoloji seçimi kritik önem taşır. 500₺'lık planlarla başlayan çözümler mevcut. Modern sera işletmeleri için en uygun alternatifleri değerlendiriyoruz.",
      sections: [
        {
          id: "seragpt",
          title: "1. SeraGPT: Modern Analiz, Basit Fiyatlandırma",
          content: "SeraGPT, sera yöneticileri için güçlı araçlar sunan kapsamlı bir platform. Harika özellikler sunuyor ancak bazı kullanıcılar için deneyim karmaşık olabilir."
        },
        {
          id: "farmtech",
          title: "2. FarmTech",
          content: "FarmTech, ücretsiz plan ile başlayıp 250₺/ay'a kadar çıkan modern tasarım, daha basit kurulum veya sadece keşfetmek isteyenler için seçenekler sunar."
        },
        {
          id: "agromaster",
          title: "3. AgroMaster",
          content: "AgroMaster, orta ölçekli seralar için tasarlanmış kullanıcı dostu bir çözüm."
        },
        {
          id: "greenhouse-pro",
          title: "4. Greenhouse Pro",
          content: "Profesyonel sera işletmeleri için gelişmiş raporlama ve analiz özellikleri."
        },
        {
          id: "smart-farm",
          title: "5. SmartFarm",
          content: "IoT entegrasyonu ile öne çıkan akıllı sera yönetim sistemi."
        },
        {
          id: "agritech",
          title: "6. AgriTech Solutions",
          content: "Kurumsal sera işletmeleri için ölçeklenebilir çözümler."
        },
        {
          id: "cropwise",
          title: "7. CropWise",
          content: "Veri analizi odaklı sera optimizasyon platformu."
        },
        {
          id: "harvestmax",
          title: "8. HarvestMax",
          content: "Verim artırıcı sera teknolojileri ve otomasyon çözümleri."
        }
      ]
    }
  };

  const tableOfContents = [
    { id: 'overview', title: 'Bu sayfada', level: 0 },
    { id: 'seragpt', title: 'SeraGPT: Modern Analiz, Basit Fiyatlandırma', level: 1 },
    { id: 'farmtech', title: 'FarmTech', level: 1 },
    { id: 'agromaster', title: 'AgroMaster', level: 1 },
    { id: 'greenhouse-pro', title: 'Greenhouse Pro', level: 1 },
    { id: 'smart-farm', title: 'SmartFarm', level: 1 },
    { id: 'agritech', title: 'AgriTech Solutions', level: 1 },
    { id: 'cropwise', title: 'CropWise', level: 1 },
    { id: 'harvestmax', title: 'HarvestMax', level: 1 },
    { id: 'faq', title: 'SSS', level: 0 }
  ];

  return (
    <>
      <SEOHead config={seoConfig} />
      <div className="min-h-screen bg-white">
        {/* Header */}
        <header className="w-full border-b border-gray-200">
          <div className="flex justify-between items-center p-6 max-w-7xl mx-auto">
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
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Table of Contents - Left Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <nav className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wider">
                    Bu sayfada
                  </h3>
                  <ul className="space-y-2">
                    {tableOfContents.map((item) => (
                      <li key={item.id}>
                        <a
                          href={`#${item.id}`}
                          onClick={(e) => {
                            e.preventDefault();
                            setActiveSection(item.id);
                            document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
                          }}
                          className={`block text-sm py-1 px-2 rounded transition-colors ${
                            activeSection === item.id
                              ? 'bg-blue-100 text-blue-900 font-medium'
                              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                          } ${item.level === 1 ? 'ml-4' : ''}`}
                        >
                          {item.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Article Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-8"
              >
                <h1 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
                  {blogPost.title}
                </h1>
                
                <div className="flex items-center space-x-6 text-sm text-gray-500 mb-8">
                  <span>{blogPost.date}</span>
                  <span className="font-medium text-gray-700">{blogPost.category}</span>
                  <span>{blogPost.readTime}</span>
                </div>

                {/* Featured Image */}
                <div className="relative overflow-hidden rounded-lg mb-8">
                  <img
                    src={blogPost.image}
                    alt={blogPost.title}
                    className="w-full h-64 object-cover"
                  />
                </div>
              </motion.div>

              {/* Article Content */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="prose prose-lg max-w-none"
              >
                {/* Overview Section */}
                <div id="overview" className="mb-12">
                  <p className="text-lg text-gray-700 leading-relaxed mb-6">
                    {blogPost.content.overview}
                  </p>
                  
                  <div className="bg-blue-50 border-l-4 border-blue-400 p-6 mb-8">
                    <p className="text-blue-900">
                      <strong>TL;DR:</strong> En iyi sera teknolojisi alternatifleri 2025'te:
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    <div className="space-y-2">
                      <h4 className="font-semibold text-gray-900">Ücretsiz Planlar:</h4>
                      <ul className="list-disc list-inside text-gray-700 space-y-1">
                        <li>SeraGPT - 5 ücretsiz analiz</li>
                        <li>FarmTech - Temel özellikler</li>
                        <li>AgroMaster - 14 günlük deneme</li>
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-gray-900">Premium Çözümler:</h4>
                      <ul className="list-disc list-inside text-gray-700 space-y-1">
                        <li>Greenhouse Pro - 850₺/ay</li>
                        <li>SmartFarm - 1.200₺/ay</li>
                        <li>CropWise - 750₺/ay</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Dynamic Sections */}
                {blogPost.content.sections.map((section, index) => (
                  <motion.div
                    key={section.id}
                    id={section.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="mb-12"
                  >
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">
                      {section.title}
                    </h2>
                    
                    <p className="text-gray-700 leading-relaxed mb-6">
                      {section.content}
                    </p>

                    {/* Features List for first section */}
                    {section.id === 'seragpt' && (
                      <div className="bg-gray-50 rounded-lg p-6 mb-6">
                        <h4 className="font-semibold text-gray-900 mb-4">Nedir?</h4>
                        <ul className="space-y-2 text-gray-700">
                          <li><strong>Modern, minimal arayüz</strong> - 2023 yılında kurulmuş, Next.js</li>
                          <li><strong>Giriş seviyesi limitler yok</strong> - 500₺'den başlayan ücretsiz plan</li>
                          <li><strong>Basit fiyatlandırma</strong> - 625₺ sera özel domainleri (38₺ ek SeraGPT)</li>
                          <li><strong>6 dakikalık kurulum</strong> - Manuel konfigürasyon yok</li>
                          <li><strong>AI destekli özellikler</strong> - Akıllı kategorizasyon, içgörüler</li>
                          <li><strong>Daha iyi performans</strong> - Modern tech stack, hızlı yükleme</li>
                          <li><strong>Sezgisel UX</strong> - Manuel gerekli değil</li>
                        </ul>
                        
                        <div className="mt-6">
                          <h5 className="font-semibold text-gray-900 mb-2">Tasarım Farkı:</h5>
                          <p className="text-gray-700 text-sm">
                            SeraGPT'nin sezgisel arayüzü işlerin kolaylaştırır. Kullanıcı dostu tasarım ile deneyimi keyifli hale getirir, temiz layout'lar, düşünceli etkileşimler ve kullanıcıların gerçekten kullanmak isteyeceği modern estetik sunar.
                          </p>
                        </div>

                        <div className="mt-6">
                          <h5 className="font-semibold text-gray-900 mb-2">Fiyatlandırma:</h5>
                          <p className="text-gray-700 text-sm">
                            Ücretsiz plan (ilk progressive limit), 250₺/aylık Starter (custom domain, 5 toprak), 500₺/aylık Professional (unlimited everything, 500₺).
                          </p>
                        </div>

                        <div className="mt-6">
                          <h5 className="font-semibold text-gray-900 mb-2">Ekiplar için En İyi:</h5>
                          <p className="text-gray-700 text-sm">
                            Sera teknolojisi konusunda modern tasarım, daha basit kurulum veya sadece kullanıcılarına değer proposition'u isteyenler ancak modern tasarım ve daha basit kurulum.
                          </p>
                        </div>

                        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                          <p className="text-blue-900 text-sm font-medium">
                            💡 Ne zaman SeraGPT'yi deneyeceğinizi sorun. Kullanıcılarınıza ne söylüyorsunuz.
                          </p>
                          <button className="mt-2 text-blue-600 text-sm font-medium hover:underline">
                            Try SeraGPT Free →
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Screenshot placeholder for SeraGPT */}
                    {section.id === 'seragpt' && (
                      <div className="bg-gray-100 rounded-lg p-8 mb-6 text-center">
                        <div className="w-full h-64 bg-white rounded-lg shadow-lg flex items-center justify-center">
                          <span className="text-gray-500">SeraGPT Dashboard Önizlemesi</span>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}

                {/* FAQ Section */}
                <motion.div
                  id="faq"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="mb-12"
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-8">
                    Sıkça Sorulan Sorular
                  </h2>
                  
                  <div className="space-y-6">
                    <div className="border-b border-gray-200 pb-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">
                        Hangi sera teknolojisi en uygun maliyetli?
                      </h3>
                      <p className="text-gray-700">
                        SeraGPT ücretsiz planı ile başlamak ideal, daha sonra ihtiyaçlarınıza göre ölçeklendirebilirsiniz. FarmTech de iyi bir başlangıç seçeneği.
                      </p>
                    </div>
                    
                    <div className="border-b border-gray-200 pb-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">
                        Kurumsal sera işletmeleri için en iyi çözüm hangisi?
                      </h3>
                      <p className="text-gray-700">
                        Greenhouse Pro ve AgriTech Solutions kurumsal ihtiyaçlar için optimize edilmiş özellikler sunar. Ölçeklenebilirlik ve güvenlik açısından önde giderler.
                      </p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Related Articles */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="border-t border-gray-200 pt-8"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-6">İlgili Makaleler</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <a href="/blog/roi-maliyet-analizi" className="group">
                    <div className="bg-gray-50 rounded-lg p-6 group-hover:bg-gray-100 transition-colors">
                      <h4 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600">
                        ROI & Maliyet Analizi Rehberi
                      </h4>
                      <p className="text-gray-600 text-sm">
                        Sera yatırımlarının karlılık analizi ve geri dönüş hesaplamaları.
                      </p>
                    </div>
                  </a>
                  <a href="/blog/akilli-sera-modelleri" className="group">
                    <div className="bg-gray-50 rounded-lg p-6 group-hover:bg-gray-100 transition-colors">
                      <h4 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600">
                        Akıllı Sera Modelleri Karşılaştırması
                      </h4>
                      <p className="text-gray-600 text-sm">
                        2025'in en popüler akıllı sera teknolojileri ve özellikleri.
                      </p>
                    </div>
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
