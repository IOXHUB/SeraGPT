'use client';

import { useState } from 'react';
import SeraGPTLogo from '@/components/ui/SeraGPTLogo';

interface DashboardLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
}

export default function DashboardLayout({ children, title, subtitle }: DashboardLayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [analysisDropdownOpen, setAnalysisDropdownOpen] = useState(false);

  // Header navigation items
  const headerNavItems = [
    { name: 'Anasayfa', href: '/' },
    { name: 'Destek', href: '/destek' },
    { name: 'Danışmanlık', href: '/danismanlik' },
    { name: 'Anahtar Teslim Sera', href: '/anahtar-teslim-proje' },
    { name: 'Blog', href: '/blog' }
  ];

  // Analysis dropdown items
  const analysisItems = [
    { name: 'ROI Analizi', href: '/dashboard/analysis/roi' },
    { name: 'İklim Analizi', href: '/dashboard/analysis/climate' },
    { name: 'Ekipman Analizi', href: '/dashboard/analysis/equipment' },
    { name: 'Pazar Analizi', href: '/dashboard/analysis/market' },
    { name: 'Layout Analizi', href: '/dashboard/analysis/layout' }
  ];

  // Dashboard navigation items (subheader)
  const dashboardNavItems = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'AI Asistan', href: '/dashboard/ai-chat' },
    { name: 'Analizler', href: '#', dropdown: true },
    { name: 'Token', href: '/dashboard/tokens' },
    { name: 'Projeler', href: '/dashboard/projects' },
    { name: 'Raporlar', href: '/dashboard/reports' },
    { name: 'Ayarlar', href: '/dashboard/settings' }
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#146448' }}>
      {/* Header - Homepage Style */}
      <header className="py-4" style={{ backgroundColor: '#146448' }}>
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <SeraGPTLogo variant="white" size="sm" priority />
            </div>

            {/* Homepage Navigation - Desktop */}
            <nav className="hidden lg:flex items-center space-x-8">
              {homepageNavItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="font-medium text-white transition-opacity hover:opacity-80"
                  style={{ fontSize: '15px' }}
                >
                  {item.name}
                </a>
              ))}
            </nav>

            {/* User Actions */}
            <div className="hidden md:flex items-center space-x-4">
              {/* User Info */}
              <div className="flex items-center space-x-3">
                <span className="text-white font-medium">Volkan Ş.</span>
                <span className="px-3 py-1 text-xs font-medium bg-[#baf200] text-[#1e3237] rounded-full">
                  Premium
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-2">
                <a
                  href="/dashboard/settings"
                  className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all"
                  title="Ayarlar"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </a>

                <button className="p-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-lg transition-all">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-md text-[#f6f8f9] hover:bg-[#f6f8f9]/10"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 py-4 border-t border-white/20">
              <div className="space-y-2">
                {/* User Info Mobile */}
                <div className="flex items-center space-x-3 px-4 py-2">
                  <h2 className="text-lg font-semibold text-white">Volkan Ş.</h2>
                  <span className="px-2 py-1 text-xs font-medium bg-[#baf200] text-[#1e3237] rounded-full">
                    Premium
                  </span>
                </div>

                {/* Homepage Nav Mobile */}
                {homepageNavItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="block px-4 py-2 text-white hover:bg-white/10 rounded-lg mx-2 transition-all"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Dashboard Subheader */}
      <div className="bg-[#f6f8f9] border-b border-[#f6f8f9]/20">
        <div className="max-w-[1200px] mx-auto px-6">
          <nav className="flex items-center space-x-8 py-4 overflow-x-auto">
            {dashboardNavItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="whitespace-nowrap font-medium text-[#1e3237] hover:text-[#146448] transition-colors border-b-2 border-transparent hover:border-[#146448] pb-1"
                style={{ fontSize: '14px' }}
              >
                {item.name}
              </a>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="py-8" style={{ minHeight: '1000px' }}>
        <div className="max-w-[1200px] mx-auto px-6">
          {/* Page Header & Subheader */}
      {(title || subtitle) && (
        <div className="mb-8 text-center">
          {title && (
            <h1 className="text-4xl font-bold text-[#f6f8f9] mb-4">{title}</h1>
          )}
          {subtitle && (
            <p className="text-[#f6f8f9]/90 text-xl leading-relaxed max-w-4xl mx-auto">{subtitle}</p>
          )}
        </div>
      )}

          {/* Content Container */}
          <div className="bg-[#146448] rounded-xl shadow-lg p-6 min-h-[600px]">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
