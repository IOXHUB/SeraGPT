'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function TestNewPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#146448' }}>
      {/* Header */}
      <header className="py-4" style={{ backgroundColor: '#146448' }}>
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center overflow-hidden"
                style={{ backgroundColor: '#baf200' }}
              >
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2F2c7ec7c93776440b923d3518963fc941%2F01c1e8a05ef6424b912d584875377957?format=webp&width=800"
                  alt="SeraGPT Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <h1
                className="text-2xl font-semibold"
                style={{ color: '#f6f8f9', fontSize: '24px', fontWeight: '600' }}
              >
                SeraGPT
              </h1>
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

      {/* 1. 🎯 Hero Bölüm: En Büyük Soru (Acı Noktası) */}
      <section className="py-20">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <div className="max-w-[800px] mx-auto">
            {/* Main headline - Problem focused */}
            <div className="max-w-[576px] mx-auto mb-8">
              <h1
                className="leading-tight text-center"
                style={{
                  color: '#f6f8f9',
                  fontSize: '36px',
                  fontWeight: '600'
                }}
              >
                Sera Yatırımı Yapmak İstiyorum, Ama Nereden Başlayacağımı Bilmiyorum!
              </h1>
            </div>

            {/* Problem description */}
            <div className="max-w-[576px] mx-auto mb-12">
              <p
                className="leading-relaxed text-center"
                style={{
                  color: '#f6f8f9',
                  fontSize: '16px',
                  fontWeight: '400'
                }}
              >
                Onlarca bitki türü, bilinmeyen iklim koşulları, yüksek maliyetler… Bir karar vermeden önce güvenilir bir analiz sunabilecek bir araca ihtiyacınız var, değil mi?
              </p>
            </div>

            {/* CTA Button with animated shadow */}
            <div className="mb-6">
              <Link
                href="/auth/login"
                className="hero-cta-button inline-block px-8 py-4 rounded-xl font-medium transition-all hover:opacity-90 hover:scale-105 transform"
                style={{
                  backgroundColor: '#baf200',
                  color: '#1e3237',
                  fontSize: '16px',
                  fontWeight: '600'
                }}
              >
                60 Saniyede Sera Raporunu Al
              </Link>
            </div>

            {/* Slogan */}
            <p
              className="text-center mb-12"
              style={{
                color: '#f6f8f9',
                fontSize: '14px',
                fontWeight: '400'
              }}
            >
              Doğru yatırım, doğru analizle başlar.
            </p>

            {/* Analysis simulation screen */}
            <div className="max-w-[800px] mx-auto mt-12">
              <div className="rounded-2xl p-8 shadow-lg" style={{ backgroundColor: '#f6f8f9' }}>
                <div
                  className="w-full h-80 bg-center bg-cover bg-no-repeat flex items-center justify-center rounded-xl"
                  style={{
                    backgroundImage: "url(https://cdn.builder.io/api/v1/image/assets%2F2c7ec7c93776440b923d3518963fc941%2F1cd1d24d2413420fa7c24610e14c9006)"
                  }}
                >
                  <div className="text-center p-4">
                    <div className="bg-black bg-opacity-20 rounded-lg p-3 backdrop-blur-sm">
                      <p 
                        className="font-medium"
                        style={{ color: '#f6f8f9', fontSize: '14px', fontWeight: '400' }}
                      >
                        📊 Analiz Simülasyon Ekranı
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. 🤖 Cevap: SeraGPT ile Tanışın */}
      <section className="py-16">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <div className="max-w-[800px] mx-auto">
            {/* Title and description with 567px limit */}
            <div className="max-w-[567px] mx-auto mb-12">
              <h2
                className="mb-8 text-center"
                style={{
                  color: '#f6f8f9',
                  fontSize: '30px',
                  fontWeight: '600'
                }}
              >
                Cevap Basit: SeraGPT ile Yatırımınızı Bilgiye Dayalı Planlayın
              </h2>

              <p
                className="leading-relaxed text-center"
                style={{
                  color: '#f6f8f9',
                  fontSize: '16px',
                  fontWeight: '400'
                }}
              >
                Lokasyon, iklim, bitki türü ve yatırım bütçenizi girin. Size özel analizle geri dönüş süresinden kurulum maliyetine kadar tüm detayları öğrenin.
              </p>
            </div>

            {/* Features with icons - centered */}
            <div className="grid md:grid-cols-5 gap-6 mb-12 max-w-[800px] mx-auto">
              <div className="flex flex-col items-center text-center">
                <div className="text-4xl mb-3">📊</div>
                <p
                  className="text-center"
                  style={{ color: '#f6f8f9', fontSize: '16px', fontWeight: '400' }}
                >
                  ROI Hesaplama
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="text-4xl mb-3">🌡️</div>
                <p
                  className="text-center"
                  style={{ color: '#f6f8f9', fontSize: '16px', fontWeight: '400' }}
                >
                  İklim Uygunluğu
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="text-4xl mb-3">⚙️</div>
                <p
                  className="text-center"
                  style={{ color: '#f6f8f9', fontSize: '16px', fontWeight: '400' }}
                >
                  Mühendis Onaylı Ekipmanlar
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="text-4xl mb-3">📈</div>
                <p
                  className="text-center"
                  style={{ color: '#f6f8f9', fontSize: '16px', fontWeight: '400' }}
                >
                  Pazara Uygunluk
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="text-4xl mb-3">🔢</div>
                <p
                  className="text-center"
                  style={{ color: '#f6f8f9', fontSize: '16px', fontWeight: '400' }}
                >
                  110+ Veri Seti
                </p>
              </div>
            </div>

            <Link
              href="/auth/login"
              className="hero-cta-button inline-block px-8 py-4 rounded-xl font-medium transition-all hover:opacity-90 hover:scale-105 transform"
              style={{
                backgroundColor: '#baf200',
                color: '#1e3237',
                fontSize: '16px',
                fontWeight: '400'
              }}
            >
              İlk Raporu Hemen Al (Ücretsiz)
            </Link>
          </div>
        </div>
      </section>

      {/* 3. 💎 Bizde Bunlar da Var */}
      <section className="py-16" style={{ backgroundColor: '#ffffff' }}>
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <div
            className="max-w-[800px] mx-auto rounded-2xl p-8 shadow-lg"
            style={{
              backgroundColor: '#f6f8f9',
              border: '3px solid #baf200'
            }}
          >
            {/* AI Icon with animated shadow */}
            <div className="flex justify-center mb-6">
              <div
                className="ai-icon-animated w-16 h-16 rounded-2xl flex items-center justify-center overflow-hidden"
                style={{ backgroundColor: '#baf200' }}
              >
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2F2c7ec7c93776440b923d3518963fc941%2F7bea4b82baf14e29a0d5bf80ccec9613?format=webp&width=800"
                  alt="AI Icon"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Title and description with 576px limit */}
            <div className="max-w-[576px] mx-auto mb-12">
              <h2
                className="mb-8 text-center"
                style={{
                  color: '#1e3237',
                  fontSize: '30px',
                  fontWeight: '600'
                }}
              >
                Sadece Rapor Değil, Aynı Zamanda Akıllı Tavsiyeler de Sunuyoruz
              </h2>

              <p
                className="leading-relaxed text-center"
                style={{
                  color: '#454b4b',
                  fontSize: '16px',
                  fontWeight: '400'
                }}
              >
                AI Asistanımızla analizlerinizi yorumlayın. İklim verileri, yatırım tipi ve riskleri hakkında öneriler alın.
              </p>
            </div>

            {/* Mobile AI Assistant Mock Up - 800px */}
            <div className="max-w-[800px] mx-auto mb-8">
              <div className="flex justify-center">
                <div className="relative max-w-sm mx-auto">
                  {/* Mobile Phone Frame */}
                  <div className="relative bg-black rounded-[2.5rem] p-2 shadow-2xl">
                    <div className="bg-white rounded-[2rem] overflow-hidden">
                      {/* Mobile AI Assistant Interface */}
                      <img
                        src="https://cdn.builder.io/api/v1/image/assets%2F2c7ec7c93776440b923d3518963fc941%2F01c1e8a05ef6424b912d584875377957?format=webp&width=800"
                        alt="Mobile AI Asistan Mockup"
                        className="w-full h-auto object-cover"
                        style={{ aspectRatio: '9/16' }}
                      />
                    </div>
                    {/* Phone Details */}
                    <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gray-800 rounded-full"></div>
                    <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-gray-800 rounded-full"></div>
                  </div>

                  {/* Floating Elements */}
                  <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full animate-bounce opacity-80"></div>
                  <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full animate-pulse opacity-80"></div>
                </div>
              </div>

              <div className="mt-6 text-center">
                <p
                  style={{ color: '#454b4b', fontSize: '14px', fontWeight: '400' }}
                >
                  📱 Mobile AI Asistan Özelliği Simülasyonu
                </p>
              </div>
            </div>

            <Link
              href="/chat"
              className="hero-cta-button inline-block px-8 py-4 rounded-xl font-medium transition-all hover:opacity-90 hover:scale-105 transform"
              style={{
                backgroundColor: '#baf200',
                color: '#1e3237',
                fontSize: '16px',
                fontWeight: '400'
              }}
            >
              AI Asistanı Test Et
            </Link>
          </div>
        </div>
      </section>

      {/* 4. 💥 Peki Ya Buna Ne Dersiniz? */}
      <section className="py-16">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <div className="max-w-[800px] mx-auto">
            <h2 
              className="mb-8"
              style={{ 
                color: '#f6f8f9', 
                fontSize: '24px', 
                fontWeight: '600' 
              }}
            >
              🔧 Anahtar Teslim Sera mı Arıyorsunuz?
            </h2>

            <div className="max-w-[576px] mx-auto mb-12">
              <p 
                className="leading-relaxed"
                style={{ 
                  color: '#f6f8f9', 
                  fontSize: '14px', 
                  fontWeight: '400' 
                }}
              >
                Sadece fikir değil, uygulama da bizden. Hazır sera paketlerimizi görün veya tamamen size özel çözümler üretelim.
              </p>
            </div>

            <Link 
              href="/anahtar-teslim-proje" 
              className="inline-block px-8 py-4 rounded-xl font-medium transition-all hover:opacity-90"
              style={{ 
                backgroundColor: '#baf200', 
                color: '#1e3237', 
                fontSize: '14px', 
                fontWeight: '600' 
              }}
            >
              🏗️ Anahtar Teslim Sera Fiyatlarını Gör
            </Link>
          </div>
        </div>
      </section>

      {/* 5. 🎁 Sürprizimiz Var */}
      <section className="py-16">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <div className="max-w-[800px] mx-auto">
            <h2 
              className="mb-8"
              style={{ 
                color: '#f6f8f9', 
                fontSize: '24px', 
                fontWeight: '600' 
              }}
            >
              📚 Sizin İçin Hazırladığımız Rehberler
            </h2>

            <div className="max-w-[576px] mx-auto mb-12">
              <p 
                className="leading-relaxed"
                style={{ 
                  color: '#f6f8f9', 
                  fontSize: '14px', 
                  fontWeight: '400' 
                }}
              >
                Sera yatırım süreci hakkında tüm sorularınıza cevap bulabileceğiniz teknik ve stratejik rehberler.
              </p>
            </div>

            {/* Blog mockup visual */}
            <div className="max-w-[600px] mx-auto mb-8">
              <div className="rounded-2xl p-8 shadow-lg" style={{ backgroundColor: '#f6f8f9' }}>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-100 h-24 rounded-lg flex items-center justify-center">
                    <span style={{ color: '#1e3237', fontSize: '14px' }}>📄 PDF Rehber</span>
                  </div>
                  <div className="bg-gray-100 h-24 rounded-lg flex items-center justify-center">
                    <span style={{ color: '#1e3237', fontSize: '14px' }}>📖 Blog Yazıları</span>
                  </div>
                </div>
              </div>
            </div>

            <Link 
              href="/blog" 
              className="inline-block px-8 py-4 rounded-xl font-medium transition-all hover:opacity-90"
              style={{ 
                backgroundColor: '#baf200', 
                color: '#1e3237', 
                fontSize: '14px', 
                fontWeight: '600' 
              }}
            >
              📖 Rehberleri İncele
            </Link>
          </div>
        </div>
      </section>

      {/* 6. 💬 Sormak İstedikleriniz Vardır */}
      <section className="py-16">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <div className="max-w-[800px] mx-auto">
            <h2 
              className="mb-8"
              style={{ 
                color: '#f6f8f9', 
                fontSize: '24px', 
                fontWeight: '600' 
              }}
            >
              🧑‍💼 Hemen Destek Alın
            </h2>

            <div className="max-w-[576px] mx-auto mb-12">
              <p 
                className="leading-relaxed"
                style={{ 
                  color: '#f6f8f9', 
                  fontSize: '14px', 
                  fontWeight: '400' 
                }}
              >
                Sera yatırımınızla ilgili her konuda uzman ekibimiz size destek vermeye hazır.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/destek" 
                className="inline-block px-8 py-4 rounded-xl font-medium transition-all hover:opacity-90"
                style={{ 
                  backgroundColor: '#baf200', 
                  color: '#1e3237', 
                  fontSize: '14px', 
                  fontWeight: '600' 
                }}
              >
                📞 Bize Ulaşın
              </Link>
              <Link 
                href="/destek" 
                className="inline-block px-8 py-4 rounded-xl font-medium transition-all hover:opacity-90"
                style={{ 
                  backgroundColor: '#baf200', 
                  color: '#1e3237', 
                  fontSize: '14px', 
                  fontWeight: '600' 
                }}
              >
                🧠 Destek Sayfasını Ziyaret Et
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 7. 🛠️ Peki Ya Tecrübemiz? */}
      <section className="py-16">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <div className="max-w-[800px] mx-auto">
            <h2 
              className="mb-8"
              style={{ 
                color: '#f6f8f9', 
                fontSize: '24px', 
                fontWeight: '600' 
              }}
            >
              🚀 500'ün Üzerinde Sera Projesinin İçindeydik
            </h2>

            <div className="max-w-[576px] mx-auto mb-12">
              <p 
                className="leading-relaxed"
                style={{ 
                  color: '#f6f8f9', 
                  fontSize: '14px', 
                  fontWeight: '400' 
                }}
              >
                20 yılı aşkın süredir 50+ ilde y��zlerce projeye imza attık. Şimdi bu deneyimle size özel danışmanlık veriyoruz.
              </p>
            </div>

            {/* Experience visual */}
            <div className="max-w-[600px] mx-auto mb-12">
              <div className="rounded-2xl p-8 shadow-lg" style={{ backgroundColor: '#f6f8f9' }}>
                <div className="grid grid-cols-3 gap-6 text-center">
                  <div>
                    <div className="text-3xl font-bold mb-2" style={{ color: '#1e3237' }}>20+</div>
                    <p style={{ color: '#1e3237', fontSize: '14px' }}>Yıl Deneyim</p>
                  </div>
                  <div>
                    <div className="text-3xl font-bold mb-2" style={{ color: '#1e3237' }}>500+</div>
                    <p style={{ color: '#1e3237', fontSize: '14px' }}>Tamamlanan Proje</p>
                  </div>
                  <div>
                    <div className="text-3xl font-bold mb-2" style={{ color: '#1e3237' }}>50+</div>
                    <p style={{ color: '#1e3237', fontSize: '14px' }}>İl Genelinde</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/danismanlik" 
                className="inline-block px-8 py-4 rounded-xl font-medium transition-all hover:opacity-90"
                style={{ 
                  backgroundColor: '#baf200', 
                  color: '#1e3237', 
                  fontSize: '14px', 
                  fontWeight: '600' 
                }}
              >
                📄 Teklif Alın
              </Link>
              <Link 
                href="/danismanlik" 
                className="inline-block px-8 py-4 rounded-xl font-medium transition-all hover:opacity-90"
                style={{ 
                  backgroundColor: '#baf200', 
                  color: '#1e3237', 
                  fontSize: '14px', 
                  fontWeight: '600' 
                }}
              >
                📝 Danışmanlık Formunu Doldurun
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12" style={{ backgroundColor: '#146448' }}>
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 max-w-[800px] mx-auto">
            
            {/* Company Info */}
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div 
                  className="w-8 h-8 rounded-lg flex items-center justify-center font-bold"
                  style={{ backgroundColor: '#baf200', color: '#1e3237' }}
                >
                  🌱
                </div>
                <span 
                  className="font-semibold"
                  style={{ color: '#f6f8f9', fontSize: '14px', fontWeight: '600' }}
                >
                  SeraGPT
                </span>
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
                    href="/danismanlik" 
                    className="transition-opacity hover:opacity-70"
                    style={{ color: '#f6f8f9', fontSize: '14px', fontWeight: '400' }}
                  >
                    Danışmanlık
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/anahtar-teslim-proje" 
                    className="transition-opacity hover:opacity-70"
                    style={{ color: '#f6f8f9', fontSize: '14px', fontWeight: '400' }}
                  >
                    Anahtar Teslim Proje
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/destek" 
                    className="transition-opacity hover:opacity-70"
                    style={{ color: '#f6f8f9', fontSize: '14px', fontWeight: '400' }}
                  >
                    Destek
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 
                className="mb-4"
                style={{ 
                  color: '#f6f8f9', 
                  fontSize: '14px', 
                  fontWeight: '600' 
                }}
              >
                Yasal
              </h3>
              <ul className="space-y-2">
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
              <p 
                className="leading-relaxed"
                style={{ 
                  color: '#f6f8f9', 
                  fontSize: '14px', 
                  fontWeight: '400' 
                }}
              >
                info@seragpt.com<br />
                www.seragpt.com
              </p>
            </div>
          </div>

          <div className="border-t border-white/20 mt-8 pt-6 text-center">
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
  );
}
