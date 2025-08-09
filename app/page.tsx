'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Home() {
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

      {/* Footer */}
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
