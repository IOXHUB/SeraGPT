'use client';

import { useState } from 'react';
import Link from 'next/link';
import TurnkeyProjectModal from '../../components/TurnkeyProjectModal';

export default function AnahtarTeslimProjePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#146448' }}>
      {/* Header - matching homepage */}
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

      {/* 💥 Anahtar Teslim Sera Kurulumu Section */}
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
                  <p style={{ color: '#f6f8f9' }}>ISITMAX süpervizörlüğünde şantiye yönetimi</p>
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

            {/* CTA Button - Updated to open modal */}
            <div className="mb-6">
              <button
                onClick={() => setIsModalOpen(true)}
                className="hero-cta-button inline-block px-8 py-4 rounded-xl font-medium transition-all hover:opacity-90 hover:scale-105 transform"
                style={{
                  backgroundColor: '#baf200',
                  color: '#1e3237',
                  fontSize: '16px',
                  fontWeight: '600'
                }}
              >
                KURUMSAL TEKLİF AL
              </button>
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

      {/* Turnkey Project Modal */}
      <TurnkeyProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
