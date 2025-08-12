'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/hooks/useAuth';

export default function HomePage() {
  const [mounted, setMounted] = useState(false);
  const { user, loading } = useAuth();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#146448' }}>
      {/* Header */}
      <header className="py-4" style={{ backgroundColor: '#146448' }}>
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2F2c7ec7c93776440b923d3518963fc941%2F01c1e8a05ef6424b912d584875377957?format=webp&width=800"
                alt="SeraGPT Logo"
                className="h-12 w-auto object-contain"
              />
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/danismanlik" className="font-medium transition-opacity hover:opacity-70" style={{ color: '#f6f8f9', fontSize: '14px', fontWeight: '400' }}>
                Danışmanlık
              </Link>
              <Link href="/anahtar-teslim-proje" className="font-medium transition-opacity hover:opacity-70" style={{ color: '#f6f8f9', fontSize: '14px', fontWeight: '400' }}>
                Anahtar Teslim Proje
              </Link>
              <Link href="/destek" className="font-medium transition-opacity hover:opacity-70" style={{ color: '#f6f8f9', fontSize: '14px', fontWeight: '400' }}>
                Destek
              </Link>
              <Link href="/blog" className="font-medium transition-opacity hover:opacity-70" style={{ color: '#f6f8f9', fontSize: '14px', fontWeight: '400' }}>
                Blog
              </Link>
            </nav>

            {/* CTA Button */}
            <div className="hidden md:flex items-center">
              {mounted && !loading ? (
                user ? (
                  <Link href="/dashboard" className="px-6 py-3 rounded-xl font-medium transition-all hover:opacity-90" style={{ backgroundColor: '#baf200', color: '#1e3237', fontSize: '14px', fontWeight: '600' }}>
                    Dashboard
                  </Link>
                ) : (
                  <Link href="/auth/login" className="px-6 py-3 rounded-xl font-medium transition-all hover:opacity-90" style={{ backgroundColor: '#baf200', color: '#1e3237', fontSize: '14px', fontWeight: '600' }}>
                    Ücretsiz Başla
                  </Link>
                )
              ) : (
                <div className="px-6 py-3 rounded-xl" style={{ backgroundColor: '#baf200', color: '#1e3237' }}>
                  Yükleniyor...
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <div className="max-w-[800px] mx-auto">
            <h1 className="leading-tight text-center mb-8" style={{ color: '#f6f8f9', fontSize: '36px', fontWeight: '600' }}>
              Sera Yatırımı Yapmak İstiyorum, Ama Nereden Başlayacağımı Bilmiyorum!
            </h1>
            <p className="text-center mb-12" style={{ color: '#f6f8f9', fontSize: '18px', fontWeight: '400', lineHeight: '1.6' }}>
              SeraGPT ile sera yatırımınızı planlamak artık çok kolay. AI destekli analizler ve uzman tavsiyeleriyle doğru kararlar verin.
            </p>
            <div className="flex justify-center">
              <Link href="/auth/login" className="px-8 py-4 rounded-xl font-medium transition-all hover:opacity-90 text-lg" style={{ backgroundColor: '#baf200', color: '#1e3237', fontWeight: '600' }}>
                Hemen Başla - Ücretsiz
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16" style={{ backgroundColor: '#f6f8f9' }}>
        <div className="max-w-[1200px] mx-auto px-6">
          <h2 className="text-center mb-12" style={{ color: '#1e3237', fontSize: '28px', fontWeight: '600' }}>
            Neler Sunuyoruz?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-xl shadow-lg">
              <div className="text-4xl mb-4">🏗️</div>
              <h3 className="mb-3" style={{ color: '#1e3237', fontSize: '20px', fontWeight: '600' }}>ROI Analizi</h3>
              <p style={{ color: '#1e3237', fontSize: '16px' }}>
                Yatırım geri dönüş süresi ve kârlılık hesaplamaları
              </p>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-lg">
              <div className="text-4xl mb-4">🌤️</div>
              <h3 className="mb-3" style={{ color: '#1e3237', fontSize: '20px', fontWeight: '600' }}>İklim Analizi</h3>
              <p style={{ color: '#1e3237', fontSize: '16px' }}>
                Bölgenize özel iklim değerlendirmesi ve öneriler
              </p>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-lg">
              <div className="text-4xl mb-4">🔧</div>
              <h3 className="mb-3" style={{ color: '#1e3237', fontSize: '20px', fontWeight: '600' }}>Ekipman Seçimi</h3>
              <p style={{ color: '#1e3237', fontSize: '16px' }}>
                İhtiyacınıza uygun ekipman önerileri ve fiyat karşılaştırması
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16" style={{ backgroundColor: '#146448' }}>
        <div className="max-w-[800px] mx-auto px-6 text-center">
          <h2 className="mb-6" style={{ color: '#f6f8f9', fontSize: '28px', fontWeight: '600' }}>
            Sera Yatırımınızı Planlayın
          </h2>
          <p className="mb-8" style={{ color: '#f6f8f9', fontSize: '18px', lineHeight: '1.6' }}>
            Uzman analizler ve AI desteği ile doğru kararlar verin. Hemen başlayın!
          </p>
          <Link href="/auth/login" className="px-8 py-4 rounded-xl font-medium transition-all hover:opacity-90 text-lg" style={{ backgroundColor: '#baf200', color: '#1e3237', fontWeight: '600' }}>
            Ücretsiz Başla
          </Link>
        </div>
      </section>
    </div>
  );
}
