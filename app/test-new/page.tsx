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
            <div className="flex items-center">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2F2c7ec7c93776440b923d3518963fc941%2F01c1e8a05ef6424b912d584875377957?format=webp&width=800"
                alt="SeraGPT Logo"
                className="h-12 w-auto object-contain"
              />
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

      {/* 2. �� Cevap: SeraGPT ile Tanışın */}
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
            {/* Corporate AI Icon with animated shadow */}
            <div className="flex justify-center mb-6">
              <div
                className="ai-icon-animated w-16 h-16 rounded-2xl flex items-center justify-center"
                style={{
                  backgroundColor: '#1e3237',
                  background: 'linear-gradient(135deg, #1e3237 0%, #2d4a3a 50%, #146448 100%)'
                }}
              >
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="#baf200" opacity="0.8"/>
                  <path d="M2 17L12 22L22 17" stroke="#baf200" strokeWidth="2" fill="none"/>
                  <path d="M2 12L12 17L22 12" stroke="#baf200" strokeWidth="2" fill="none"/>
                  <circle cx="12" cy="9" r="2" fill="#1e3237"/>
                </svg>
              </div>
            </div>

            {/* Title and description with 576px limit */}
            <div className="max-w-[576px] mx-auto mb-12">
              <h2
                className="mb-8 text-center"
                style={{
                  color: '#1e3237',
                  fontSize: '36px',
                  fontWeight: '400'
                }}
              >
                AI ASISTAN
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
                    <div className="bg-white rounded-[2rem] overflow-hidden" style={{ aspectRatio: '9/16', width: '300px' }}>
                      {/* Mobile AI Assistant Interface - ROI Analysis Chat */}
                      <div className="h-full flex flex-col bg-gray-50">
                        {/* Chat Header */}
                        <div className="bg-white border-b p-4 flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-400 to-green-600 flex items-center justify-center">
                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                            </svg>
                          </div>
                          <div>
                            <h3 className="text-sm font-semibold text-gray-900">SeraGPT AI</h3>
                            <p className="text-xs text-gray-500">ROI Analiz Uzmanı</p>
                          </div>
                        </div>

                        {/* Chat Messages */}
                        <div className="flex-1 p-3 space-y-3 overflow-y-auto">
                          {/* AI Message */}
                          <div className="flex space-x-2">
                            <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                              <span className="text-xs text-white">AI</span>
                            </div>
                            <div className="bg-white rounded-lg p-2 shadow-sm max-w-[80%]">
                              <p className="text-xs text-gray-800">
                                Merhaba! Sera ROI analiziniz için lokasyon ve bitki türü bilgilerinizi paylaşır mısınız?
                              </p>
                            </div>
                          </div>

                          {/* User Message */}
                          <div className="flex justify-end">
                            <div className="bg-green-500 rounded-lg p-2 max-w-[80%]">
                              <p className="text-xs text-white">
                                Antalya'da 5000m² domates serası kurma maliyeti nedir?
                              </p>
                            </div>
                          </div>

                          {/* AI Response with Analysis */}
                          <div className="flex space-x-2">
                            <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                              <span className="text-xs text-white">AI</span>
                            </div>
                            <div className="bg-white rounded-lg p-2 shadow-sm max-w-[80%]">
                              <p className="text-xs text-gray-800 mb-2">
                                Antalya 5000m² domates serası analizi:
                              </p>
                              <div className="bg-gray-50 rounded p-2 text-xs">
                                <div className="flex justify-between mb-1">
                                  <span>Kurulum:</span>
                                  <span className="font-semibold">₺2.800.000</span>
                                </div>
                                <div className="flex justify-between mb-1">
                                  <span>Yıllık Gelir:</span>
                                  <span className="font-semibold text-green-600">₺1.950.000</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>ROI:</span>
                                  <span className="font-bold text-green-600">%34.2</span>
                                </div>
                              </div>
                              <p className="text-xs text-gray-600 mt-2">
                                Detaylı rapor PDF'i oluşturayım mı?
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Chat Input */}
                        <div className="border-t p-3">
                          <div className="flex items-center space-x-2">
                            <input
                              type="text"
                              placeholder="Mesaj yazın..."
                              className="flex-1 px-3 py-2 text-xs border rounded-full focus:outline-none focus:ring-1 focus:ring-green-500"
                              readOnly
                            />
                            <button className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"/>
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
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
                  Ücretsiz ve adil kullanım kotası ile birlikte sınırsızdır.
                </p>
              </div>
            </div>

            <Link
              href="/chat"
              className="inline-block px-8 py-4 rounded-xl font-medium transition-all hover:opacity-90"
              style={{
                backgroundColor: '#baf200',
                color: '#1e3237',
                fontSize: '16px',
                fontWeight: '600',
                boxShadow: '0 10px 25px rgba(186, 242, 0, 0.3), 0 0 20px rgba(186, 242, 0, 0.2)'
              }}
            >
              AI Asistanı Test Et
            </Link>
          </div>
        </div>
      </section>

      {/* 4. 💥 Anahtar Teslim Sera Kurulumu */}
      <section className="py-20">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <div className="max-w-[800px] mx-auto">
            {/* Main title */}
            <div className="max-w-[576px] mx-auto mb-16">
              <h2
                className="leading-tight text-center mb-8"
                style={{
                  color: '#f6f8f9',
                  fontSize: '36px',
                  fontWeight: '600'
                }}
              >
                Anahtar Teslim Sera Kurulumu
              </h2>

              <div
                className="space-y-6 text-center"
                style={{
                  color: '#f6f8f9',
                  fontSize: '16px',
                  fontWeight: '400'
                }}
              >
                <p style={{ color: '#f6f8f9', fontSize: '16px', fontWeight: '400' }}>
                  Sera yatırımınız için SeraGPT ile analiz yaptınız. Şimdi sıra, bu verileri sahaya taşımakta. ISITMAX ve XXXXX İspanya ortaklığıyla yürüttüğümüz anahtar teslim proje sistemimizde:
                </p>

                <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
                  <p style={{ color: '#f6f8f9', fontSize: '16px', fontWeight: '400' }}>Keşif, projelendirme ve süpervizörlük hizmetleri ISITMAX tarafından. Tüm imalat, ekipman, otomasyon ve saha kurulum süreçleri ise XXXXX Spain tarafından sağlanır</p>
                </div>
              </div>
            </div>

            {/* Key Benefits Grid */}
            <div className="grid md:grid-cols-3 gap-6 mb-16 max-w-[800px] mx-auto">
              <div
                className="p-6 rounded-xl border-2 border-white/20 bg-white/5 backdrop-blur-sm"
                style={{ borderColor: '#baf200' }}
              >
                <h4
                  className="font-semibold mb-3"
                  style={{ color: '#baf200', fontSize: '18px' }}
                >
                  Türkiye Avantajı
                </h4>
                <p style={{ color: '#f6f8f9', fontSize: '14px', fontWeight: '400' }}>
                  Yerinde planlama ve süpervizörlük hizmetleri
                </p>
              </div>

              <div
                className="p-6 rounded-xl border-2 border-white/20 bg-white/5 backdrop-blur-sm"
                style={{ borderColor: '#baf200' }}
              >
                <h4
                  className="font-semibold mb-3"
                  style={{ color: '#baf200', fontSize: '18px' }}
                >
                  Avrupa Standardı
                </h4>
                <p style={{ color: '#f6f8f9', fontSize: '14px', fontWeight: '400' }}>
                  Kaliteli malzeme ve profesyonel kurulum
                </p>
              </div>

              <div
                className="p-6 rounded-xl border-2 border-white/20 bg-white/5 backdrop-blur-sm"
                style={{ borderColor: '#baf200' }}
              >
                <h4
                  className="font-semibold mb-3"
                  style={{ color: '#baf200', fontSize: '18px' }}
                >
                  Tek Elden Yönetim
                </h4>
                <p style={{ color: '#f6f8f9', fontSize: '14px', fontWeight: '400' }}>
                  Zamanında teslim edilen projeler
                </p>
              </div>
            </div>

            {/* Two Column Layout for Services and Target */}
            <div className="grid lg:grid-cols-2 gap-12 mb-16 max-w-[900px] mx-auto">
              {/* Service Scope */}
              <div className="text-center">
                <h3
                  className="mb-6"
                  style={{
                    color: '#f6f8f9',
                    fontSize: '24px',
                    fontWeight: '600'
                  }}
                >
                  Hizmet Kapsamı
                </h3>
                <div
                  className="space-y-4 bg-white/5 rounded-xl p-6"
                  style={{
                    color: '#f6f8f9',
                    fontSize: '14px',
                    fontWeight: '400'
                  }}
                >
                  <p style={{ color: '#f6f8f9' }}>Yerinde keşif ve teknik analiz (ISITMAX)</p>
                  <p style={{ color: '#f6f8f9' }}>Statik & yapısal proje çizimleri</p>
                  <p style={{ color: '#f6f8f9' }}>XXXXX menşeli otomasyon, ekipman ve kurulum hizmeti</p>
                  <p style={{ color: '#f6f8f9' }}>ISITMAX s��pervizörlüğünde şantiye yönetimi</p>
                  <p style={{ color: '#f6f8f9' }}>Tam kapsamlı fiyat teklifi ve mühendislik dosyası (PDF)</p>
                </div>
              </div>

              {/* Target Audience */}
              <div className="text-center">
                <h3
                  className="mb-6"
                  style={{
                    color: '#f6f8f9',
                    fontSize: '24px',
                    fontWeight: '600'
                  }}
                >
                  Kimler İçin Uygun?
                </h3>
                <div
                  className="space-y-4 bg-white/5 rounded-xl p-6"
                  style={{
                    color: '#f6f8f9',
                    fontSize: '14px',
                    fontWeight: '400'
                  }}
                >
                  <p style={{ color: '#f6f8f9' }}>1.000 m² ve üzeri yatırım düşünen profesyonel üreticiler</p>
                  <p style={{ color: '#f6f8f9' }}>Hibe/destek başvurusu için teknik dosya gereksinimi olanlar</p>
                  <p style={{ color: '#f6f8f9' }}>Sera projelerinde uzun ömür, otomasyon ve enerji verimliliğini öncelikleyen yatırımcılar</p>
                </div>
              </div>
            </div>

            {/* Experience Stats */}
            <div className="mb-16">
              <h3
                className="mb-8 text-center"
                style={{
                  color: '#f6f8f9',
                  fontSize: '24px',
                  fontWeight: '600'
                }}
              >
                Güvence ve Tecrübe
              </h3>
              <div className="grid md:grid-cols-3 gap-6 max-w-[600px] mx-auto">
                <div className="text-center">
                  <div
                    className="text-4xl font-bold mb-2"
                    style={{ color: '#baf200' }}
                  >
                    500+
                  </div>
                  <p style={{ color: '#f6f8f9', fontSize: '14px', fontWeight: '400' }}>
                    Tamamlanmış Sera Projesi
                  </p>
                </div>
                <div className="text-center">
                  <div
                    className="text-4xl font-bold mb-2"
                    style={{ color: '#baf200' }}
                  >
                    3
                  </div>
                  <p style={{ color: '#f6f8f9', fontSize: '14px', fontWeight: '400' }}>
                    Ülkede Uygulanan Sistem
                  </p>
                </div>
                <div className="text-center">
                  <div
                    className="text-4xl font-bold mb-2"
                    style={{ color: '#baf200' }}
                  >
                    %100
                  </div>
                  <p style={{ color: '#f6f8f9', fontSize: '14px', fontWeight: '400' }}>
                    Standartlara Uygunluk
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="mb-6">
              <Link
                href="/anahtar-teslim-proje"
                className="hero-cta-button inline-block px-8 py-4 rounded-xl font-medium transition-all hover:opacity-90 hover:scale-105 transform"
                style={{
                  backgroundColor: '#baf200',
                  color: '#1e3237',
                  fontSize: '16px',
                  fontWeight: '600'
                }}
              >
                KURUMSAL TEKLİF AL
              </Link>
            </div>

            {/* Bottom slogan */}
            <p
              className="text-center"
              style={{
                color: '#f6f8f9',
                fontSize: '14px',
                fontWeight: '400'
              }}
            >
              Profesyonel sera kurulumunda güvenilir ortaklık.
            </p>
          </div>
        </div>
      </section>

      {/* 4.5. 📋 Proje Danışmanlık Hizmetimiz */}
      <section className="py-20">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <div className="max-w-[800px] mx-auto">
            {/* Main title */}
            <div className="max-w-[576px] mx-auto mb-16">
              <h2
                className="leading-tight text-center mb-12"
                style={{
                  color: '#f6f8f9',
                  fontSize: '36px',
                  fontWeight: '600'
                }}
              >
                Proje Danışmanlık Hizmetimiz
              </h2>
            </div>

            {/* Consultation Packages */}
            <div className="grid lg:grid-cols-2 gap-12 mb-16 max-w-[1000px] mx-auto">
              {/* Package 1: Ön Fizibilite */}
              <div className="text-left">
                <div
                  className="bg-white/5 rounded-xl p-8 border-2"
                  style={{ borderColor: '#baf200' }}
                >
                  <h3
                    className="mb-6 text-center"
                    style={{
                      color: '#baf200',
                      fontSize: '24px',
                      fontWeight: '600'
                    }}
                  >
                    1. Ön Fizibilite Paketi
                  </h3>

                  <div className="space-y-4 mb-8">
                    <div className="flex items-start space-x-3">
                      <span style={{ color: '#baf200', fontSize: '16px' }}>•</span>
                      <p style={{ color: '#f6f8f9', fontSize: '16px', fontWeight: '400' }}>
                        Lokasyon, iklim ve ürün analizi
                      </p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <span style={{ color: '#baf200', fontSize: '16px' }}>•</span>
                      <p style={{ color: '#f6f8f9', fontSize: '16px', fontWeight: '400' }}>
                        Tahmini yatırım maliyeti
                      </p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <span style={{ color: '#baf200', fontSize: '16px' }}>•</span>
                      <p style={{ color: '#f6f8f9', fontSize: '16px', fontWeight: '400' }}>
                        Beklenen ROI (yatırım geri dönüş süresi)
                      </p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <span style={{ color: '#baf200', fontSize: '16px' }}>•</span>
                      <p style={{ color: '#f6f8f9', fontSize: '16px', fontWeight: '400' }}>
                        Uygun sera tipleri önerisi
                      </p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <span style={{ color: '#baf200', fontSize: '16px' }}>•</span>
                      <p style={{ color: '#f6f8f9', fontSize: '16px', fontWeight: '400' }}>
                        Devlet teşvik ve hibe uygunluğu değerlendirmesi
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-white/20 pt-6">
                    <div className="flex justify-between items-center mb-2">
                      <span style={{ color: '#f6f8f9', fontSize: '14px', fontWeight: '500' }}>
                        Teslim Süresi:
                      </span>
                      <span style={{ color: '#baf200', fontSize: '14px', fontWeight: '600' }}>
                        5 iş günü
                      </span>
                    </div>
                    <div className="mt-4">
                      <p style={{ color: '#f6f8f9', fontSize: '14px', fontWeight: '400' }}>
                        <strong style={{ color: '#baf200' }}>Amaç:</strong> Yatır��mcıya "başlamaya değer mi?" sorusunun cevabını vermek
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Package 2: Teknik Projelendirme */}
              <div className="text-left">
                <div
                  className="bg-white/5 rounded-xl p-8 border-2"
                  style={{ borderColor: '#baf200' }}
                >
                  <h3
                    className="mb-6 text-center"
                    style={{
                      color: '#baf200',
                      fontSize: '24px',
                      fontWeight: '600'
                    }}
                  >
                    2. Teknik Projelendirme Paketi
                  </h3>

                  <div className="space-y-4 mb-8">
                    <div className="flex items-start space-x-3">
                      <span style={{ color: '#baf200', fontSize: '16px' }}>•</span>
                      <p style={{ color: '#f6f8f9', fontSize: '16px', fontWeight: '400' }}>
                        Ön Fizibilite + detaylı teknik çizimler
                      </p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <span style={{ color: '#baf200', fontSize: '16px' }}>•</span>
                      <p style={{ color: '#f6f8f9', fontSize: '16px', fontWeight: '400' }}>
                        Ekipman listesi ve marka/model önerileri
                      </p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <span style={{ color: '#baf200', fontSize: '16px' }}>•</span>
                      <p style={{ color: '#f6f8f9', fontSize: '16px', fontWeight: '400' }}>
                        Isıtma, soğutma, sulama, otomasyon projeleri
                      </p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <span style={{ color: '#baf200', fontSize: '16px' }}>•</span>
                      <p style={{ color: '#f6f8f9', fontSize: '16px', fontWeight: '400' }}>
                        Enerji ve su tüketim hesapları
                      </p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <span style={{ color: '#baf200', fontSize: '16px' }}>•</span>
                      <p style={{ color: '#f6f8f9', fontSize: '16px', fontWeight: '400' }}>
                        Üretim kapasitesi planı
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-white/20 pt-6">
                    <div className="flex justify-between items-center mb-2">
                      <span style={{ color: '#f6f8f9', fontSize: '14px', fontWeight: '500' }}>
                        Teslim Süresi:
                      </span>
                      <span style={{ color: '#baf200', fontSize: '14px', fontWeight: '600' }}>
                        10–15 iş günü
                      </span>
                    </div>
                    <div className="mt-4">
                      <p style={{ color: '#f6f8f9', fontSize: '14px', fontWeight: '400' }}>
                        <strong style={{ color: '#baf200' }}>Amaç:</strong> Yatırımın tüm teknik altyapısını netleştirmek
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="mb-6">
              <Link
                href="/danismanlik"
                className="hero-cta-button inline-block px-8 py-4 rounded-xl font-medium transition-all hover:opacity-90 hover:scale-105 transform"
                style={{
                  backgroundColor: '#baf200',
                  color: '#1e3237',
                  fontSize: '16px',
                  fontWeight: '600'
                }}
              >
                DANIŞMANLIK TALEBİ OLUŞTUR
              </Link>
            </div>

            {/* Bottom note */}
            <p
              className="text-center"
              style={{
                color: '#f6f8f9',
                fontSize: '14px',
                fontWeight: '400'
              }}
            >
              Profesyonel danışmanlık ile doğru adımları atın.
            </p>
          </div>
        </div>
      </section>

      {/* 5. 🎁 Sürprizimiz Var */}
      <section className="py-16">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <div className="max-w-[800px] mx-auto flex flex-col">
            <h2
              className="mx-auto mb-8"
              style={{
                color: '#f6f8f9',
                fontSize: '36px',
                fontWeight: '600'
              }}
            >
              Referanslarımız
            </h2>

            <div className="max-w-[576px] mx-auto mb-12">
              <p
                className="leading-relaxed text-center"
                style={{
                  color: '#f6f8f9',
                  fontSize: '20px',
                  fontWeight: '400'
                }}
              >
                Fikir aşamasından projelendirmeye; Kurulum'dan üretim danışmanlığına kadar profesyonel hizmet
              </p>
            </div>

            {/* Image Gallery - 900px with horizontal scrolling */}
            <div className="max-w-[900px] mx-auto mb-8 relative">
              <div className="overflow-x-auto scrollbar-hide" id="gallery-container">
                <div className="flex space-x-4 pb-4" style={{ width: 'fit-content' }}>
                  <div className="flex-shrink-0 w-[580px] h-[300px] rounded-xl overflow-hidden">
                    <img
                      src="https://cdn.builder.io/api/v1/image/assets%2F2c7ec7c93776440b923d3518963fc941%2F9d3332e2ad3c411884d29aa35f7a626d"
                      alt="Sera Projesi 1"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-shrink-0 w-[580px] h-[300px] rounded-xl overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-green-400 via-green-500 to-green-600 flex items-center justify-center">
                      <div className="text-center text-white">
                        <div className="text-4xl mb-2">🌱</div>
                        <p className="text-lg font-semibold">Domates Serası</p>
                        <p className="text-sm opacity-90">Antalya - 5000m²</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex-shrink-0 w-[580px] h-[300px] rounded-xl overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 flex items-center justify-center">
                      <div className="text-center text-white">
                        <div className="text-4xl mb-2">🥒</div>
                        <p className="text-lg font-semibold">Salatalık Serası</p>
                        <p className="text-sm opacity-90">İzmir - 3000m²</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation Arrows */}
              <button
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110"
                style={{ backgroundColor: '#baf200' }}
                onClick={() => {
                  const container = document.getElementById('gallery-container');
                  container?.scrollBy({ left: -300, behavior: 'smooth' });
                }}
              >
                <svg className="w-6 h-6" style={{ color: '#1e3237' }} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </button>

              <button
                className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110"
                style={{ backgroundColor: '#baf200' }}
                onClick={() => {
                  const container = document.getElementById('gallery-container');
                  container?.scrollBy({ left: 300, behavior: 'smooth' });
                }}
              >
                <svg className="w-6 h-6" style={{ color: '#1e3237' }} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </button>
            </div>

            <Link
              href="/anahtar-teslim-proje"
              className="inline-block px-8 py-4 rounded-xl font-medium transition-all hover:opacity-90 mx-auto"
              style={{
                backgroundColor: '#baf200',
                color: '#1e3237',
                fontSize: '16px',
                fontWeight: '600'
              }}
            >
              Anahtar Teslim Sera
            </Link>
          </div>
        </div>
      </section>

      {/* 6. 💬 Sormak İstedikleriniz Vardır */}
      <section className="py-16">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <div className="max-w-[800px] mx-auto">
            <h2
              className="mb-8 text-center"
              style={{
                color: '#f6f8f9',
                fontSize: '36px',
                fontWeight: '600'
              }}
            >
              Hemen Destek Alın
            </h2>

            <div className="max-w-[576px] mx-auto mb-12">
              <p
                className="leading-relaxed text-center"
                style={{
                  color: '#f6f8f9',
                  fontSize: '26px',
                  fontWeight: '400'
                }}
              >
                Sera yatırımınızla ilgili her konuda uzman ekibimiz size destek vermeye hazır.
              </p>
            </div>

            {/* FAQ Section */}
            <div className="max-w-[800px] mx-auto mb-12">
              <h3
                className="mb-8 text-center"
                style={{
                  color: '#f6f8f9',
                  fontSize: '24px',
                  fontWeight: '600'
                }}
              >
                Sıkça Sorulan Sorular
              </h3>

              <div className="space-y-4">
                {/* FAQ 1 */}
                <div className="bg-white/5 rounded-xl border border-white/20">
                  <button
                    className="w-full text-left p-6 flex justify-between items-center"
                    onClick={() => {
                      const content = document.getElementById('faq-1');
                      const arrow = document.getElementById('arrow-1');
                      if (content.style.display === 'none' || !content.style.display) {
                        content.style.display = 'block';
                        arrow.style.transform = 'rotate(180deg)';
                      } else {
                        content.style.display = 'none';
                        arrow.style.transform = 'rotate(0deg)';
                      }
                    }}
                  >
                    <span style={{ color: '#f6f8f9', fontSize: '16px', fontWeight: '400' }}>
                      1. Raporlarınız hangi veriler ve metotlarla hazırlanıyor?
                    </span>
                    <svg id="arrow-1" className="w-5 h-5 transition-transform" style={{ color: '#baf200' }} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                  <div id="faq-1" style={{ display: 'none' }} className="px-6 pb-6">
                    <div className="space-y-3 text-left" style={{ color: '#f6f8f9', fontSize: '16px', fontWeight: '400' }}>
                      <p>Raporlarımız; bölgenize ait gerçek zamanlı iklim verileri, TÜİK tarım istatistikleri, Copernicus uydu görüntüleri, FAO ve yerel pazar fiyat verileri gibi güvenilir kaynaklar kullanılarak hazırlanır.</p>
                      <p>Enerji ihtiyacı ve iklimlendirme hesaplamalarında ASHRAE tabloları ve mühendislik formülleri uygulanır.</p>
                      <p>Bu sayede sonuçlar yalnızca tahmini değil, sahada uygulanabilir ve yatırım kararına doğrudan temel oluşturacak nitelikte olur.</p>
                    </div>
                  </div>
                </div>

                {/* FAQ 2 */}
                <div className="bg-white/5 rounded-xl border border-white/20">
                  <button
                    className="w-full text-left p-6 flex justify-between items-center"
                    onClick={() => {
                      const content = document.getElementById('faq-2');
                      const arrow = document.getElementById('arrow-2');
                      if (content.style.display === 'none' || !content.style.display) {
                        content.style.display = 'block';
                        arrow.style.transform = 'rotate(180deg)';
                      } else {
                        content.style.display = 'none';
                        arrow.style.transform = 'rotate(0deg)';
                      }
                    }}
                  >
                    <span style={{ color: '#f6f8f9', fontSize: '16px', fontWeight: '400' }}>
                      2. Sera tipini ve ekipman seçimlerini nasıl belirliyorsunuz?
                    </span>
                    <svg id="arrow-2" className="w-5 h-5 transition-transform" style={{ color: '#baf200' }} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                  <div id="faq-2" style={{ display: 'none' }} className="px-6 pb-6">
                    <div className="space-y-3 text-left" style={{ color: '#f6f8f9', fontSize: '16px', fontWeight: '400' }}>
                      <p>Sera tipini ve ekipmanlarını belirlerken şu parametreler analiz edilir:</p>
                      <ul className="space-y-2 ml-4">
                        <li>• Lokasyonun yıllık ortalama ve ekstrem sıcaklık/soğuk değerleri</li>
                        <li>• Güneşlenme süresi ve ışık şiddeti</li>
                        <li>• Ürün tipi ve yetiştirme modeli (topraklı/hidroponik)</li>
                        <li>• Su kaynağı ve sulama kapasitesi</li>
                        <li>• Enerji kaynakları ve maliyetleri</li>
                      </ul>
                      <p>Tüm bu veriler yapay zeka ve mühendis ekibimizin değerlendirmesiyle optimum yatırım modeli olarak raporlanır.</p>
                    </div>
                  </div>
                </div>

                {/* FAQ 3 */}
                <div className="bg-white/5 rounded-xl border border-white/20">
                  <button
                    className="w-full text-left p-6 flex justify-between items-center"
                    onClick={() => {
                      const content = document.getElementById('faq-3');
                      const arrow = document.getElementById('arrow-3');
                      if (content.style.display === 'none' || !content.style.display) {
                        content.style.display = 'block';
                        arrow.style.transform = 'rotate(180deg)';
                      } else {
                        content.style.display = 'none';
                        arrow.style.transform = 'rotate(0deg)';
                      }
                    }}
                  >
                    <span style={{ color: '#f6f8f9', fontSize: '16px', fontWeight: '400' }}>
                      3. Devlet hibeleri ve teşvikler için uygunluk analizi nasıl yapılıyor?
                    </span>
                    <svg id="arrow-3" className="w-5 h-5 transition-transform" style={{ color: '#baf200' }} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                  <div id="faq-3" style={{ display: 'none' }} className="px-6 pb-6">
                    <div className="space-y-3 text-left" style={{ color: '#f6f8f9', fontSize: '16px', fontWeight: '400' }}>
                      <p>Raporlarımızda TKDK, IPARD ve Ziraat Bankası gibi kurumların kriterleri dikkate alınır.</p>
                      <p>Bölgesel hibe oranları, yatırım bütçesi limitleri ve teknik gereklilikler proje dosyasına eklenir.</p>
                      <p>Eğer yatırımınız uygun bulunursa, hibe başvurusu sırasında gerekli teknik çizim ve fizibilite raporları tarafımızdan hazırlanabilir.</p>
                    </div>
                  </div>
                </div>

                {/* FAQ 4 */}
                <div className="bg-white/5 rounded-xl border border-white/20">
                  <button
                    className="w-full text-left p-6 flex justify-between items-center"
                    onClick={() => {
                      const content = document.getElementById('faq-4');
                      const arrow = document.getElementById('arrow-4');
                      if (content.style.display === 'none' || !content.style.display) {
                        content.style.display = 'block';
                        arrow.style.transform = 'rotate(180deg)';
                      } else {
                        content.style.display = 'none';
                        arrow.style.transform = 'rotate(0deg)';
                      }
                    }}
                  >
                    <span style={{ color: '#f6f8f9', fontSize: '16px', fontWeight: '400' }}>
                      4. Ekipman listesinde yer alan markalar ve modeller nasıl seçiliyor?
                    </span>
                    <svg id="arrow-4" className="w-5 h-5 transition-transform" style={{ color: '#baf200' }} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                  <div id="faq-4" style={{ display: 'none' }} className="px-6 pb-6">
                    <div className="space-y-3 text-left" style={{ color: '#f6f8f9', fontSize: '16px', fontWeight: '400' }}>
                      <p>Ekipman seçiminde aşağıdaki kriterler uygulanır:</p>
                      <ul className="space-y-2 ml-4">
                        <li>• Enerji verimliliği (A++ veya üzeri)</li>
                        <li>• Türkiye'de servis ve yedek parça desteği</li>
                        <li>• Uluslararası kalite belgeleri (CE, ISO, TÜV)</li>
                        <li>• Daha önce kurduğumuz projelerdeki performans verileri</li>
                      </ul>
                      <p>Liste yalnızca tavsiye niteliğindedir, yatırımcı dilerse alternatif markalar talep edebilir.</p>
                    </div>
                  </div>
                </div>

                {/* FAQ 5 */}
                <div className="bg-white/5 rounded-xl border border-white/20">
                  <button
                    className="w-full text-left p-6 flex justify-between items-center"
                    onClick={() => {
                      const content = document.getElementById('faq-5');
                      const arrow = document.getElementById('arrow-5');
                      if (content.style.display === 'none' || !content.style.display) {
                        content.style.display = 'block';
                        arrow.style.transform = 'rotate(180deg)';
                      } else {
                        content.style.display = 'none';
                        arrow.style.transform = 'rotate(0deg)';
                      }
                    }}
                  >
                    <span style={{ color: '#f6f8f9', fontSize: '16px', fontWeight: '400' }}>
                      5. Raporlarda görsel ve teknik çizim desteği var mı?
                    </span>
                    <svg id="arrow-5" className="w-5 h-5 transition-transform" style={{ color: '#baf200' }} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                  <div id="faq-5" style={{ display: 'none' }} className="px-6 pb-6">
                    <div className="space-y-3 text-left" style={{ color: '#f6f8f9', fontSize: '16px', fontWeight: '400' }}>
                      <p>Evet. Teknik projelendirme ve anahtar teslim paketlerde:</p>
                      <ul className="space-y-2 ml-4">
                        <li>• 2D yerleşim planı</li>
                        <li>• 3D sera modeli</li>
                        <li>• Elektrik tesisat şeması</li>
                        <li>• Sulama ve drenaj hattı planı</li>
                        <li>• Isıtma hattı ve ekipman yerleşimi</li>
                      </ul>
                      <p>gibi detaylı görseller PDF rapora dahil edilir.</p>
                      <p>Bu çizimler hem yatırımcı sunumlarında hem de yüklenici firmalara teklif alırken kullanılabilir.</p>
                    </div>
                  </div>
                </div>
              </div>
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
                Destek Sayfamız
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
                20 yılı aşkın süredir 50+ ilde yüzlerce projeye imza attık. Şimdi bu deneyimle size özel danışmanlık veriyoruz.
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

      {/* 7.5. 📝 Blog Yazılarımız */}
      <section className="py-20">
        <div className="max-w-[1200px] mx-auto px-6">
          {/* Section Title */}
          <div className="text-center mb-12">
            <h2
              className="mb-8 text-center"
              style={{
                color: '#f6f8f9',
                fontSize: '36px',
                fontWeight: '600'
              }}
            >
              Blog Yazılarımız
            </h2>
            <p
              className="max-w-[576px] mx-auto leading-relaxed text-center"
              style={{
                color: '#f6f8f9',
                fontSize: '18px',
                fontWeight: '400'
              }}
            >
              Sera yatırımı ve tarım teknolojileri hakkında güncel bilgiler ve uzman görüşleri
            </p>
          </div>

          {/* Horizontal Scrolling Blog Cards */}
          <div className="relative">
            <div className="overflow-x-auto scrollbar-hide" id="blog-container">
              <div className="flex space-x-6 pb-4" style={{ width: 'fit-content' }}>

                {/* Blog Post 1 */}
                <div className="flex-shrink-0 w-[350px]">
                  <Link href="/blog/gizli-maliyetler-sera-yatirimi" className="block group">
                    <div className="bg-white/5 rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all">
                      <div className="mb-4">
                        <span
                          className="text-xs px-3 py-1 rounded-full"
                          style={{ backgroundColor: '#baf200', color: '#1e3237', fontWeight: '500' }}
                        >
                          Yatırım
                        </span>
                      </div>
                      <h3
                        className="mb-3 group-hover:opacity-80 transition-opacity"
                        style={{ color: '#f6f8f9', fontSize: '18px', fontWeight: '600', lineHeight: '1.4' }}
                      >
                        Sera Yatırımının Gizli Maliyetleri: Başlamadan Bilmeniz Gerekenler
                      </h3>
                      <p
                        className="mb-4 opacity-80"
                        style={{ color: '#f6f8f9', fontSize: '14px', fontWeight: '400', lineHeight: '1.6' }}
                      >
                        Sera kurulumunda görünmeyen masraflar yatırım bütçenizi nasıl etkiler? Elektrik, su, işçilik ve bakım maliyetlerini önceden hesaplayın.
                      </p>
                      <div className="flex items-center justify-between">
                        <span
                          className="opacity-60"
                          style={{ color: '#f6f8f9', fontSize: '12px', fontWeight: '400' }}
                        >
                          5 dk okuma
                        </span>
                        <span
                          className="text-xs group-hover:translate-x-1 transition-transform"
                          style={{ color: '#baf200' }}
                        >
                          →
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>

                {/* Blog Post 2 */}
                <div className="flex-shrink-0 w-[350px]">
                  <Link href="/blog/iklim-krizi-tarim" className="block group">
                    <div className="bg-white/5 rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all">
                      <div className="mb-4">
                        <span
                          className="text-xs px-3 py-1 rounded-full"
                          style={{ backgroundColor: '#baf200', color: '#1e3237', fontWeight: '500' }}
                        >
                          İklim
                        </span>
                      </div>
                      <h3
                        className="mb-3 group-hover:opacity-80 transition-opacity"
                        style={{ color: '#f6f8f9', fontSize: '18px', fontWeight: '600', lineHeight: '1.4' }}
                      >
                        İklim Krizi ve Tarım: Seracılığın Rolü ve Geleceği
                      </h3>
                      <p
                        className="mb-4 opacity-80"
                        style={{ color: '#f6f8f9', fontSize: '14px', fontWeight: '400', lineHeight: '1.6' }}
                      >
                        Değişen iklim koşulları tarımı nasıl etkiliyor? Sera teknolojileri ile sürdürülebilir üretim modelleri ve çözüm önerileri.
                      </p>
                      <div className="flex items-center justify-between">
                        <span
                          className="opacity-60"
                          style={{ color: '#f6f8f9', fontSize: '12px', fontWeight: '400' }}
                        >
                          7 dk okuma
                        </span>
                        <span
                          className="text-xs group-hover:translate-x-1 transition-transform"
                          style={{ color: '#baf200' }}
                        >
                          →
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>

                {/* Blog Post 3 */}
                <div className="flex-shrink-0 w-[350px]">
                  <Link href="/blog/roi-maliyet-analizi" className="block group">
                    <div className="bg-white/5 rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all">
                      <div className="mb-4">
                        <span
                          className="text-xs px-3 py-1 rounded-full"
                          style={{ backgroundColor: '#baf200', color: '#1e3237', fontWeight: '500' }}
                        >
                          Analiz
                        </span>
                      </div>
                      <h3
                        className="mb-3 group-hover:opacity-80 transition-opacity"
                        style={{ color: '#f6f8f9', fontSize: '18px', fontWeight: '600', lineHeight: '1.4' }}
                      >
                        ROI Maliyet Analizi: Sera Yatırımınız Ne Zaman Geri Döner?
                      </h3>
                      <p
                        className="mb-4 opacity-80"
                        style={{ color: '#f6f8f9', fontSize: '14px', fontWeight: '400', lineHeight: '1.6' }}
                      >
                        Sera yatırımınızın karlılığını nasıl hesaplarsınız? Domates, salatalık ve diğer ürünler için gerçek ROI hesaplamaları.
                      </p>
                      <div className="flex items-center justify-between">
                        <span
                          className="opacity-60"
                          style={{ color: '#f6f8f9', fontSize: '12px', fontWeight: '400' }}
                        >
                          6 dk okuma
                        </span>
                        <span
                          className="text-xs group-hover:translate-x-1 transition-transform"
                          style={{ color: '#baf200' }}
                        >
                          →
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>

                {/* Blog Post 4 */}
                <div className="flex-shrink-0 w-[350px]">
                  <Link href="/blog/sera-mimarligi-tasarim" className="block group">
                    <div className="bg-white/5 rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all">
                      <div className="mb-4">
                        <span
                          className="text-xs px-3 py-1 rounded-full"
                          style={{ backgroundColor: '#baf200', color: '#1e3237', fontWeight: '500' }}
                        >
                          Tasarım
                        </span>
                      </div>
                      <h3
                        className="mb-3 group-hover:opacity-80 transition-opacity"
                        style={{ color: '#f6f8f9', fontSize: '18px', fontWeight: '600', lineHeight: '1.4' }}
                      >
                        Sera Mimarliği ve Tasarım: Verimli Üretim için Doğru Planlama
                      </h3>
                      <p
                        className="mb-4 opacity-80"
                        style={{ color: '#f6f8f9', fontSize: '14px', fontWeight: '400', lineHeight: '1.6' }}
                      >
                        Sera tasarımı nasıl yapılır? Yönlendirme, boyutlandırma ve iç mekân düzenlemesi ile üretim verimliliğini artırın.
                      </p>
                      <div className="flex items-center justify-between">
                        <span
                          className="opacity-60"
                          style={{ color: '#f6f8f9', fontSize: '12px', fontWeight: '400' }}
                        >
                          8 dk okuma
                        </span>
                        <span
                          className="text-xs group-hover:translate-x-1 transition-transform"
                          style={{ color: '#baf200' }}
                        >
                          →
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>

                {/* Blog Post 5 */}
                <div className="flex-shrink-0 w-[350px]">
                  <Link href="/blog/sera-teknolojilerinde-2025-yenilikleri" className="block group">
                    <div className="bg-white/5 rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all">
                      <div className="mb-4">
                        <span
                          className="text-xs px-3 py-1 rounded-full"
                          style={{ backgroundColor: '#baf200', color: '#1e3237', fontWeight: '500' }}
                        >
                          Teknoloji
                        </span>
                      </div>
                      <h3
                        className="mb-3 group-hover:opacity-80 transition-opacity"
                        style={{ color: '#f6f8f9', fontSize: '18px', fontWeight: '600', lineHeight: '1.4' }}
                      >
                        Sera Teknolojilerinde 2025 Yenilikleri ve Geleceğin Tarımı
                      </h3>
                      <p
                        className="mb-4 opacity-80"
                        style={{ color: '#f6f8f9', fontSize: '14px', fontWeight: '400', lineHeight: '1.6' }}
                      >
                        Yapay zeka, IoT sensörleri ve otomasyon sistemleri ile sera üretiminde devrim. 2025 teknolojik trendleri ve uygulamaları.
                      </p>
                      <div className="flex items-center justify-between">
                        <span
                          className="opacity-60"
                          style={{ color: '#f6f8f9', fontSize: '12px', fontWeight: '400' }}
                        >
                          9 dk okuma
                        </span>
                        <span
                          className="text-xs group-hover:translate-x-1 transition-transform"
                          style={{ color: '#baf200' }}
                        >
                          →
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>

              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              className="absolute left-0 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110 opacity-80 hover:opacity-100"
              style={{ backgroundColor: '#baf200' }}
              onClick={() => {
                const container = document.getElementById('blog-container');
                container?.scrollBy({ left: -370, behavior: 'smooth' });
              }}
            >
              <svg className="w-6 h-6" style={{ color: '#1e3237' }} fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </button>

            <button
              className="absolute right-0 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110 opacity-80 hover:opacity-100"
              style={{ backgroundColor: '#baf200' }}
              onClick={() => {
                const container = document.getElementById('blog-container');
                container?.scrollBy({ left: 370, behavior: 'smooth' });
              }}
            >
              <svg className="w-6 h-6" style={{ color: '#1e3237' }} fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </button>
          </div>

          {/* CTA Button */}
          <div className="text-center mt-12">
            <Link
              href="/blog"
              className="inline-block px-8 py-4 rounded-xl font-medium transition-all hover:opacity-90"
              style={{
                backgroundColor: 'transparent',
                border: '2px solid #baf200',
                color: '#baf200',
                fontSize: '16px',
                fontWeight: '600'
              }}
            >
              Tüm Blog Yazılarını Gör
            </Link>
          </div>
        </div>
      </section>

      {/* 8. 💪 Final CTA Section */}
      <section className="py-20">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <div className="max-w-[800px] mx-auto">
            {/* Inspiring title */}
            <div className="max-w-[576px] mx-auto mb-8">
              <h2
                className="leading-tight text-center mb-8"
                style={{
                  color: '#f6f8f9',
                  fontSize: '36px',
                  fontWeight: '600'
                }}
              >
                Vizyonunuza ve Azminize Hayranız.
              </h2>
            </div>

            {/* Motivational message */}
            <div className="max-w-[576px] mx-auto mb-8">
              <p
                className="leading-relaxed text-center mb-6"
                style={{
                  color: '#f6f8f9',
                  fontSize: '20px',
                  fontWeight: '400'
                }}
              >
                Siz ürettikçe bu ülke büyür. Biz de yatırımınızı güçlendirecek doğru verileri, mühendisliği ve yapay zekâyı bir araya getiriyoruz.
              </p>

              <p
                className="leading-relaxed text-center"
                style={{
                  color: '#f6f8f9',
                  fontSize: '18px',
                  fontWeight: '400'
                }}
              >
                Hemen raporunuzu oluşturun, geleceğinizi şekillendirin.
              </p>
            </div>

            {/* Final CTA Button */}
            <div className="mb-8">
              <Link
                href="/auth/login"
                className="hero-cta-button inline-block px-12 py-5 rounded-xl font-medium transition-all hover:opacity-90 hover:scale-105 transform"
                style={{
                  backgroundColor: '#baf200',
                  color: '#1e3237',
                  fontSize: '18px',
                  fontWeight: '600'
                }}
              >
                Ücretsiz Rapor Al
              </Link>
            </div>

            {/* Supporting visual element */}
            <div className="max-w-[600px] mx-auto">
              <div className="flex justify-center items-center space-x-6 opacity-80">
                <div className="text-center">
                  <div className="text-3xl mb-2">🌱</div>
                  <p style={{ color: '#f6f8f9', fontSize: '12px', fontWeight: '400' }}>
                    Doğru Yatırım
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-2">📊</div>
                  <p style={{ color: '#f6f8f9', fontSize: '12px', fontWeight: '400' }}>
                    Doğru Analiz
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-2">🚀</div>
                  <p style={{ color: '#f6f8f9', fontSize: '12px', fontWeight: '400' }}>
                    Doğru Gelecek
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12" style={{ backgroundColor: '#146448' }}>
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">

            {/* Company Info */}
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center overflow-hidden"
                  style={{ backgroundColor: '#baf200' }}
                >
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets%2F2c7ec7c93776440b923d3518963fc941%2F8e66dc449c7e47c59dff0ff61984ff12"
                    alt="SeraGPT Logo"
                    className="w-full h-full object-cover"
                  />
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
                  0850 888 8110
                </p>
                <p
                  className="leading-relaxed"
                  style={{
                    color: '#f6f8f9',
                    fontSize: '14px',
                    fontWeight: '400'
                  }}
                >
                  Perpa Trade Centre, No:1458<br />
                  Şişli / İstanbul
                </p>
              </div>
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
