'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import SEOHead from '@/components/SEOHead';
import Link from 'next/link';
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
          content: "SeraGPT, sera yöneticileri için güçlü araçlar sunan kapsamlı bir platform. Harika özellikler sunuyor ancak bazı kullanıcılar için deneyim karmaşık olabilir."
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
    { id: 'cropwise', title: 'CropWise', level:1 },
    { id: 'harvestmax', title: 'HarvestMax', level: 1 },
    { id: 'faq', title: 'SSS', level: 0 }
  ];

  return (
    <>
      <SEOHead config={seoConfig} />
      <div className="min-h-screen" style={{ backgroundColor: '#146448' }}>
        {/* Header - matching blog page */}
        <header className="py-4" style={{ backgroundColor: '#146448' }}>
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <div className="flex items-center">
                <Link href="/">
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets%2F2c7ec7c93776440b923d3518963fc941%2F01c1e8a05ef6424b912d584875377957?format=webp&width=800"
                    alt="SeraGPT Logo"
                    className="h-12 w-auto object-contain"
                  />
                </Link>
              </div>

              {/* Navigation */}
              <nav className="hidden md:flex items-center space-x-8">
                <Link
                  href="/danismanlik"
                  className="font-medium transition-opacity hover:opacity-70"
                  style={{ color: '#f6f8f9', fontSize: '14px', fontWeight: '400' }}
                >
                  Danışmanlık
                </Link>
                <Link
                  href="/anahtar-teslim-proje"
                  className="font-medium transition-opacity hover:opacity-70"
                  style={{ color: '#f6f8f9', fontSize: '14px', fontWeight: '400' }}
                >
                  Anahtar Teslim Proje
                </Link>
                <Link
                  href="/destek"
                  className="font-medium transition-opacity hover:opacity-70"
                  style={{ color: '#f6f8f9', fontSize: '14px', fontWeight: '400' }}
                >
                  Destek
                </Link>
              </nav>

              {/* CTA Button */}
              <div className="hidden md:flex items-center">
                <Link
                  href="/auth/login"
                  className="px-6 py-3 rounded-xl font-medium transition-all hover:opacity-90"
                  style={{
                    backgroundColor: '#baf200',
                    color: '#1e3237',
                    fontSize: '14px',
                    fontWeight: '600'
                  }}
                >
                  Ücretsiz Başla
                </Link>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Background */}
        <div style={{ backgroundColor: '#f6f8f9', minHeight: '100vh' }}>
          {/* Breadcrumb */}
          <div className="max-w-7xl mx-auto px-6 pt-6">
            <nav className="flex items-center space-x-2 text-sm">
              <Link href="/" style={{ color: '#1e3237' }} className="opacity-60 hover:opacity-100">
                Ana Sayfa
              </Link>
              <span style={{ color: '#1e3237' }} className="opacity-40">/</span>
              <Link href="/blog" style={{ color: '#1e3237' }} className="opacity-60 hover:opacity-100">
                Blog
              </Link>
              <span style={{ color: '#1e3237' }} className="opacity-40">/</span>
              <span style={{ color: '#1e3237' }} className="opacity-80">
                {blogPost.title}
              </span>
            </nav>
          </div>

          {/* Main Content */}
          <main className="max-w-7xl mx-auto px-6 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Table of Contents - Left Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-8">
                  <nav className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                    <h3 
                      className="text-sm font-semibold mb-4 uppercase tracking-wider"
                      style={{ color: '#1e3237' }}
                    >
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
                            className={`block text-sm py-2 px-3 rounded-lg transition-all duration-200 ${
                              activeSection === item.id
                                ? 'text-white font-medium'
                                : 'hover:bg-gray-50'
                            } ${item.level === 1 ? 'ml-4' : ''}`}
                            style={{
                              backgroundColor: activeSection === item.id ? '#146448' : 'transparent',
                              color: activeSection === item.id ? '#ffffff' : '#1e3237'
                            }}
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
                  <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
                    <h1 
                      className="text-4xl font-bold mb-6 leading-tight"
                      style={{ color: '#1e3237' }}
                    >
                      {blogPost.title}
                    </h1>
                    
                    <div className="flex items-center space-x-6 text-sm mb-8" style={{ color: '#1e3237' }}>
                      <span className="opacity-70">{blogPost.date}</span>
                      <span 
                        className="px-3 py-1 rounded-full text-xs font-medium"
                        style={{ backgroundColor: '#baf200', color: '#1e3237' }}
                      >
                        {blogPost.category}
                      </span>
                      <span className="opacity-70">{blogPost.readTime}</span>
                    </div>

                    {/* Featured Image */}
                    <div className="relative overflow-hidden rounded-lg">
                      <img
                        src={blogPost.image}
                        alt={blogPost.title}
                        className="w-full h-64 object-cover"
                      />
                    </div>
                  </div>
                </motion.div>

                {/* Article Content */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="space-y-8"
                >
                  {/* Overview Section */}
                  <div id="overview" className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
                    <p 
                      className="text-lg leading-relaxed mb-6"
                      style={{ color: '#1e3237' }}
                    >
                      {blogPost.content.overview}
                    </p>
                    
                    <div 
                      className="border-l-4 p-6 mb-8 rounded-r-lg"
                      style={{ borderColor: '#146448', backgroundColor: '#146448', opacity: 0.05 }}
                    >
                      <div style={{ backgroundColor: '#f6f8f9', padding: '1.5rem', borderRadius: '0.5rem' }}>
                        <p style={{ color: '#1e3237' }} className="font-medium">
                          <strong>TL;DR:</strong> En iyi sera teknolojisi alternatifleri 2025'te:
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <h4 className="font-semibold" style={{ color: '#1e3237' }}>Ücretsiz Planlar:</h4>
                        <ul className="space-y-2" style={{ color: '#1e3237' }}>
                          <li className="flex items-start">
                            <span style={{ color: '#146448' }} className="mr-2">•</span>
                            SeraGPT - 5 ücretsiz analiz
                          </li>
                          <li className="flex items-start">
                            <span style={{ color: '#146448' }} className="mr-2">•</span>
                            FarmTech - Temel özellikler
                          </li>
                          <li className="flex items-start">
                            <span style={{ color: '#146448' }} className="mr-2">•</span>
                            AgroMaster - 14 günlük deneme
                          </li>
                        </ul>
                      </div>
                      <div className="space-y-3">
                        <h4 className="font-semibold" style={{ color: '#1e3237' }}>Premium Çözümler:</h4>
                        <ul className="space-y-2" style={{ color: '#1e3237' }}>
                          <li className="flex items-start">
                            <span style={{ color: '#146448' }} className="mr-2">•</span>
                            Greenhouse Pro - 850₺/ay
                          </li>
                          <li className="flex items-start">
                            <span style={{ color: '#146448' }} className="mr-2">•</span>
                            SmartFarm - 1.200₺/ay
                          </li>
                          <li className="flex items-start">
                            <span style={{ color: '#146448' }} className="mr-2">•</span>
                            CropWise - 750₺/ay
                          </li>
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
                      className="bg-white rounded-xl shadow-sm p-8 border border-gray-100"
                    >
                      <h2 
                        className="text-2xl font-bold mb-6"
                        style={{ color: '#1e3237' }}
                      >
                        {section.title}
                      </h2>
                      
                      <p 
                        className="leading-relaxed mb-6"
                        style={{ color: '#1e3237' }}
                      >
                        {section.content}
                      </p>

                      {/* Features List for first section */}
                      {section.id === 'seragpt' && (
                        <div 
                          className="rounded-lg p-6 mb-6"
                          style={{ backgroundColor: '#f6f8f9' }}
                        >
                          <h4 className="font-semibold mb-4" style={{ color: '#1e3237' }}>Nedir?</h4>
                          <ul className="space-y-3" style={{ color: '#1e3237' }}>
                            <li className="flex items-start">
                              <span style={{ color: '#146448' }} className="mr-2 mt-1">•</span>
                              <span><strong>Modern, minimal arayüz</strong> - 2023 yılında kurulmuş, Next.js</span>
                            </li>
                            <li className="flex items-start">
                              <span style={{ color: '#146448' }} className="mr-2 mt-1">•</span>
                              <span><strong>Giriş seviyesi limitler yok</strong> - 500₺'den başlayan ücretsiz plan</span>
                            </li>
                            <li className="flex items-start">
                              <span style={{ color: '#146448' }} className="mr-2 mt-1">•</span>
                              <span><strong>Basit fiyatlandırma</strong> - 625₺ sera özel domainleri (38₺ ek SeraGPT)</span>
                            </li>
                            <li className="flex items-start">
                              <span style={{ color: '#146448' }} className="mr-2 mt-1">•</span>
                              <span><strong>6 dakikalık kurulum</strong> - Manuel konfigürasyon yok</span>
                            </li>
                            <li className="flex items-start">
                              <span style={{ color: '#146448' }} className="mr-2 mt-1">•</span>
                              <span><strong>AI destekli özellikler</strong> - Akıllı kategorizasyon, içgörüler</span>
                            </li>
                            <li className="flex items-start">
                              <span style={{ color: '#146448' }} className="mr-2 mt-1">•</span>
                              <span><strong>Daha iyi performans</strong> - Modern tech stack, hızlı yükleme</span>
                            </li>
                            <li className="flex items-start">
                              <span style={{ color: '#146448' }} className="mr-2 mt-1">•</span>
                              <span><strong>Sezgisel UX</strong> - Manuel gerekli değil</span>
                            </li>
                          </ul>
                          
                          <div className="mt-6 space-y-4">
                            <div>
                              <h5 className="font-semibold mb-2" style={{ color: '#1e3237' }}>Tasarım Farkı:</h5>
                              <p className="text-sm opacity-80" style={{ color: '#1e3237' }}>
                                SeraGPT'nin sezgisel arayüzü işlerin kolaylaştırır. Kullanıcı dostu tasarım ile deneyimi keyifli hale getirir, temiz layout'lar, düşünceli etkileşimler ve kullanıcıların gerçekten kullanmak isteyeceği modern estetik sunar.
                              </p>
                            </div>

                            <div>
                              <h5 className="font-semibold mb-2" style={{ color: '#1e3237' }}>Fiyatlandırma:</h5>
                              <p className="text-sm opacity-80" style={{ color: '#1e3237' }}>
                                Ücretsiz plan (ilk progressive limit), 250₺/aylık Starter (custom domain, 5 toprak), 500₺/aylık Professional (unlimited everything, 500₺).
                              </p>
                            </div>
                          </div>

                          <div className="mt-6 p-4 rounded-lg" style={{ backgroundColor: '#146448', opacity: 0.05 }}>
                            <div style={{ backgroundColor: '#f6f8f9', padding: '1rem', borderRadius: '0.5rem' }}>
                              <p className="text-sm font-medium mb-2" style={{ color: '#1e3237' }}>
                                💡 Ne zaman SeraGPT'yi deneyeceğinizi sorun. Kullanıcılarınıza ne söylüyorsunuz.
                              </p>
                              <Link
                                href="/auth/login"
                                className="inline-block px-4 py-2 rounded-lg text-sm font-medium transition-all hover:opacity-90"
                                style={{ backgroundColor: '#baf200', color: '#1e3237' }}
                              >
                                Try SeraGPT Free →
                              </Link>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Screenshot placeholder for SeraGPT */}
                      {section.id === 'seragpt' && (
                        <div className="rounded-lg p-8 text-center" style={{ backgroundColor: '#f6f8f9' }}>
                          <div className="w-full h-64 bg-white rounded-lg shadow-sm flex items-center justify-center border border-gray-100">
                            <span style={{ color: '#1e3237' }} className="opacity-60">SeraGPT Dashboard Önizlemesi</span>
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
                    className="bg-white rounded-xl shadow-sm p-8 border border-gray-100"
                  >
                    <h2 
                      className="text-2xl font-bold mb-8"
                      style={{ color: '#1e3237' }}
                    >
                      Sıkça Sorulan Sorular
                    </h2>
                    
                    <div className="space-y-6">
                      <div className="border-b border-gray-100 pb-6">
                        <h3 className="text-lg font-semibold mb-3" style={{ color: '#1e3237' }}>
                          Hangi sera teknolojisi en uygun maliyetli?
                        </h3>
                        <p style={{ color: '#1e3237' }} className="opacity-80">
                          SeraGPT ücretsiz planı ile başlamak ideal, daha sonra ihtiyaçlarınıza göre ölçeklendirebilirsiniz. FarmTech de iyi bir başlangıç seçeneği.
                        </p>
                      </div>
                      
                      <div className="border-b border-gray-100 pb-6">
                        <h3 className="text-lg font-semibold mb-3" style={{ color: '#1e3237' }}>
                          Kurumsal sera işletmeleri için en iyi çözüm hangisi?
                        </h3>
                        <p style={{ color: '#1e3237' }} className="opacity-80">
                          Greenhouse Pro ve AgriTech Solutions kurumsal ihtiyaçlar için optimize edilmiş özellikler sunar. Ölçeklenebilirlik ve güvenlik açısından önde giderler.
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Related Articles */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-xl shadow-sm p-8 border border-gray-100"
                  >
                    <h3 className="text-xl font-bold mb-6" style={{ color: '#1e3237' }}>İlgili Makaleler</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Link href="/blog/roi-maliyet-analizi" className="group">
                        <div 
                          className="rounded-lg p-6 transition-all duration-200 hover:shadow-md border border-gray-50"
                          style={{ backgroundColor: '#f6f8f9' }}
                        >
                          <h4 
                            className="font-semibold mb-2 group-hover:opacity-80 transition-opacity"
                            style={{ color: '#1e3237' }}
                          >
                            ROI & Maliyet Analizi Rehberi
                          </h4>
                          <p className="text-sm opacity-70" style={{ color: '#1e3237' }}>
                            Sera yatırımlarının karlılık analizi ve geri dönüş hesaplamaları.
                          </p>
                        </div>
                      </Link>
                      <Link href="/blog/akilli-sera-modelleri" className="group">
                        <div 
                          className="rounded-lg p-6 transition-all duration-200 hover:shadow-md border border-gray-50"
                          style={{ backgroundColor: '#f6f8f9' }}
                        >
                          <h4 
                            className="font-semibold mb-2 group-hover:opacity-80 transition-opacity"
                            style={{ color: '#1e3237' }}
                          >
                            Akıllı Sera Modelleri Karşılaştırması
                          </h4>
                          <p className="text-sm opacity-70" style={{ color: '#1e3237' }}>
                            2025'in en popüler akıllı sera teknolojileri ve özellikleri.
                          </p>
                        </div>
                      </Link>
                    </div>
                  </motion.div>

                  {/* Back to Blog */}
                  <div className="text-center">
                    <Link
                      href="/blog"
                      className="inline-block px-6 py-3 rounded-xl font-medium transition-all hover:opacity-90"
                      style={{ backgroundColor: '#baf200', color: '#1e3237' }}
                    >
                      ← Tüm Blog Yazılarına Dön
                    </Link>
                  </div>
                </motion.div>
              </div>
            </div>
          </main>
        </div>

        {/* Footer - matching homepage */}
        <footer className="py-12" style={{ backgroundColor: '#146448' }}>
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="grid md:grid-cols-4 gap-8">

              {/* Company Info */}
              <div>
                <div className="mb-4">
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets%2F2c7ec7c93776440b923d3518963fc941%2F01c1e8a05ef6424b912d584875377957?format=webp&width=800"
                    alt="SeraGPT Logo"
                    className="h-12 w-auto object-contain"
                  />
                </div>
                <p
                  className="leading-relaxed"
                  style={{
                    color: '#f6f8f9',
                    fontSize: '14px',
                    fontWeight: '400'
                  }}
                >
                  AI destekli sera analiz platformu. Doğru yatırım, doğru analizle başlar.
                </p>
              </div>

              {/* Services */}
              <div>
                <h3
                  className="mb-4"
                  style={{
                    color: '#f6f8f9',
                    fontSize: '14px',
                    fontWeight: '600'
                  }}
                >
                  Hizmetler
                </h3>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="/auth/login"
                      className="transition-opacity hover:opacity-70"
                      style={{ color: '#f6f8f9', fontSize: '14px', fontWeight: '400' }}
                    >
                      Ücretsiz Analiz Başlat
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/danismanlik"
                      className="transition-opacity hover:opacity-70"
                      style={{ color: '#f6f8f9', fontSize: '14px', fontWeight: '400' }}
                    >
                      Danışmanlık AL
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/anahtar-teslim-proje"
                      className="transition-opacity hover:opacity-70"
                      style={{ color: '#f6f8f9', fontSize: '14px', fontWeight: '400' }}
                    >
                      Anahtar Teslim Sera Teklifi İste
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Support */}
              <div>
                <h3
                  className="mb-4"
                  style={{
                    color: '#f6f8f9',
                    fontSize: '14px',
                    fontWeight: '600'
                  }}
                >
                  Destek
                </h3>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="/auth/login"
                      className="transition-opacity hover:opacity-70"
                      style={{ color: '#f6f8f9', fontSize: '14px', fontWeight: '400' }}
                    >
                      Kullanıcı Paneli Giriş
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/destek"
                      className="transition-opacity hover:opacity-70"
                      style={{ color: '#f6f8f9', fontSize: '14px', fontWeight: '400' }}
                    >
                      Destek Kaydı Aç
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/privacy"
                      className="transition-opacity hover:opacity-70"
                      style={{ color: '#f6f8f9', fontSize: '14px', fontWeight: '400' }}
                    >
                      Gizlilik Politikası
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/terms"
                      className="transition-opacity hover:opacity-70"
                      style={{ color: '#f6f8f9', fontSize: '14px', fontWeight: '400' }}
                    >
                      Kullanım Koşulları
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Contact */}
              <div>
                <h3
                  className="mb-4"
                  style={{
                    color: '#f6f8f9',
                    fontSize: '14px',
                    fontWeight: '600'
                  }}
                >
                  İletişim
                </h3>
                <div className="space-y-2">
                  <p
                    style={{
                      color: '#f6f8f9',
                      fontSize: '14px',
                      fontWeight: '400'
                    }}
                  >
                    info@seragpt.com
                  </p>
                  <p
                    style={{
                      color: '#f6f8f9',
                      fontSize: '14px',
                      fontWeight: '400'
                    }}
                  >
                    0850 303 0 GPT
                  </p>
                  <p
                    style={{
                      color: '#f6f8f9',
                      fontSize: '14px',
                      fontWeight: '400'
                    }}
                  >
                    Türkiye
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom */}
            <div className="border-t border-white/20 mt-8 pt-8 text-center">
              <p
                style={{
                  color: '#f6f8f9',
                  fontSize: '14px',
                  fontWeight: '400'
                }}
              >
                © 2025 SeraGPT. Tüm hakları saklıdır.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
