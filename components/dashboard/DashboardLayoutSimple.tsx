'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import SeraGPTLogo from '@/components/ui/SeraGPTLogo';

interface DashboardLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
}

interface MenuItem {
  name: string;
  href: string;
  badge?: string;
}

export default function DashboardLayout({ children, title, subtitle }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const pathname = usePathname();

  const menuItems: MenuItem[] = [
    { name: 'Anasayfa', href: '/dashboard' },
    { name: 'AI Asistan', href: '/dashboard/ai-chat', badge: 'AI' },
    { name: 'ROI Analizi', href: '/dashboard/analysis/roi' },
    { name: 'İklim Analizi', href: '/dashboard/analysis/climate' },
    { name: 'Ekipman Listesi', href: '/dashboard/analysis/equipment' },
    { name: 'Pazar Analizi', href: '/dashboard/analysis/market' },
    { name: 'Teknik Planlar', href: '/dashboard/analysis/layout' },
    { name: 'Token Yönetimi', href: '/dashboard/tokens' },
    { name: 'Projeler', href: '/dashboard/projects' },
  ];

  // Navigation items for header
  const headerNavItems = [
    { name: 'Danışmanlık', href: '/danismanlik' },
    { name: 'Anahtar Teslim Proje', href: '/anahtar-teslim-proje' },
    { name: 'Destek', href: '/destek' }
  ];

  // Close mobile sidebar when route changes
  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === '/dashboard') {
      return pathname === '/dashboard';
    }
    return pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-[#146448]">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Desktop Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-40 bg-[#f6f8f9] border-r border-[#146448]/20 shadow-lg transition-all duration-300 ease-in-out hidden lg:block ${
        sidebarCollapsed ? 'w-16' : 'w-64'
      }`}>
        <div className="flex flex-col h-full">
          {/* Logo Header */}
          <div className={`flex items-center justify-between h-16 px-4 border-b border-[#146448]/20 ${sidebarCollapsed ? 'px-2' : ''}`}>
            <a href="/dashboard" className="flex items-center space-x-3">
              {sidebarCollapsed ? (
                <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm font-bold">S</span>
                </div>
              ) : (
                <SeraGPTLogo size="sm" priority />
              )}
            </a>
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-1.5 rounded-md text-[#1e3237]/60 hover:text-[#146448] hover:bg-[#146448]/10 transition-colors"
            >
              <svg className={`w-4 h-4 transition-transform ${sidebarCollapsed ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-4 px-2">
            <div className="space-y-1">
              {menuItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className={`group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all ${
                    isActive(item.href)
                      ? 'bg-[#146448]/10 text-[#146448]'
                      : 'text-[#1e3237]/70 hover:bg-[#146448]/5 hover:text-[#146448]'
                  }`}
                  title={sidebarCollapsed ? item.name : undefined}
                >
                  {!sidebarCollapsed && (
                    <>
                      <span className="flex-1">{item.name}</span>
                      {item.badge && (
                        <span className="px-1.5 py-0.5 text-xs bg-[#baf200] text-[#1e3237] rounded-full font-medium">
                          {item.badge}
                        </span>
                      )}
                    </>
                  )}
                  {sidebarCollapsed && (
                    <span className="text-sm font-bold text-center w-full">
                      {item.name.charAt(0)}
                    </span>
                  )}
                </a>
              ))}
            </div>
          </nav>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-72 bg-[#f6f8f9] border-r border-[#146448]/20 shadow-lg transform transition-transform duration-300 ease-in-out lg:hidden ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          {/* Mobile Header */}
          <div className="flex items-center justify-between h-16 px-4 border-b border-[#146448]/20">
            <SeraGPTLogo size="sm" priority />
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-2 rounded-md text-[#1e3237]/60 hover:text-[#146448] hover:bg-[#146448]/10 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Mobile Navigation */}
          <nav className="flex-1 overflow-y-auto py-4 px-2">
            <div className="space-y-1">
              {menuItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className={`group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all ${
                    isActive(item.href)
                      ? 'bg-[#146448]/10 text-[#146448]'
                      : 'text-[#1e3237]/70 hover:bg-[#146448]/5 hover:text-[#146448]'
                  }`}
                >
                  <span className="flex-1">{item.name}</span>
                  {item.badge && (
                    <span className="px-2 py-1 text-xs bg-[#baf200] text-[#1e3237] rounded-full font-medium">
                      {item.badge}
                    </span>
                  )}
                </a>
              ))}
            </div>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className={`flex flex-col min-h-screen transition-all duration-300 ${
        sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'
      }`}>
        {/* Top Header - Homepage Style */}
        <header className="bg-[#146448] border-b border-[#146448]/20 sticky top-0 z-30 shadow-sm">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="flex items-center justify-between h-16">
              {/* Mobile menu button and user info */}
              <div className="flex items-center min-w-0 flex-1">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden p-2 rounded-md text-[#f6f8f9]/60 hover:text-[#f6f8f9] hover:bg-[#f6f8f9]/10 mr-3 flex-shrink-0 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>

                <div className="min-w-0">
                  <div className="flex items-center space-x-3">
                    <h1 className="text-lg font-semibold text-[#f6f8f9] truncate leading-tight">Volkan Ş.</h1>
                    <span className="px-2 py-1 text-xs font-medium bg-[#baf200] text-[#1e3237] rounded-full shadow-sm">
                      Premium
                    </span>
                  </div>
                  <p className="text-sm text-[#f6f8f9]/70 truncate leading-tight -mt-0.5">Hoş Geldiniz</p>
                </div>
              </div>

              {/* Header Navigation - Homepage Style */}
              <nav className="hidden md:flex items-center space-x-8">
                {headerNavItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="font-medium transition-opacity hover:opacity-70"
                    style={{ color: '#f6f8f9', fontSize: '14px', fontWeight: '400' }}
                  >
                    {item.name}
                  </a>
                ))}
              </nav>

              {/* Header Actions */}
              <div className="flex items-center space-x-4 flex-shrink-0">
                {/* Settings */}
                <a
                  href="/dashboard/settings"
                  className="hidden sm:flex p-2.5 bg-[#f6f8f9]/10 hover:bg-[#f6f8f9]/20 text-[#f6f8f9] rounded-lg transition-all duration-200"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </a>

                {/* Help */}
                <a
                  href="/dashboard/help"
                  className="hidden sm:flex p-2.5 bg-[#f6f8f9]/10 hover:bg-[#f6f8f9]/20 text-[#f6f8f9] rounded-lg transition-all duration-200"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </a>

                {/* Logout */}
                <button className="p-2.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-all duration-200">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 max-w-full overflow-auto">
          <div className="p-6 bg-[#146448] min-h-full">
            <div className="bg-[#f6f8f9] rounded-xl shadow-lg min-h-[calc(100vh-8rem)]">
              {(title || subtitle) && (
                <div className="p-6 border-b border-[#146448]/10">
                  {title && (
                    <h1 className="text-2xl font-bold text-[#1e3237] mb-2">{title}</h1>
                  )}
                  {subtitle && (
                    <p className="text-[#1e3237]/70">{subtitle}</p>
                  )}
                </div>
              )}
              <div className="p-6">
                {children}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
