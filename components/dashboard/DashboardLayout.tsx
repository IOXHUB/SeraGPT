'use client';

import { useState } from 'react';

interface DashboardLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
}

export default function DashboardLayout({ children, title, subtitle }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { name: 'Dashboard', href: '/dashboard', active: false },
    { name: 'AI Asistan', href: '/dashboard/ai-chat', active: false },
    { name: 'ROI Simülasyonu', href: '/dashboard/analysis/roi', active: false },
    { name: 'İklim Analizi', href: '/dashboard/analysis/climate', active: false },
    { name: 'Ekipman Listesi', href: '/dashboard/analysis/equipment', active: false },
    { name: 'Pazar Analizi', href: '/dashboard/analysis/market', active: false },
    { name: 'Teknik Planlar', href: '/dashboard/analysis/layout', active: false },
    { name: 'Raporlar', href: '/dashboard/reports', active: false },
    { name: 'Projeler', href: '/dashboard/projects', active: false },
    { name: 'Token Yönetimi', href: '/dashboard/tokens', active: false },
    { name: 'Danışmanlık', href: '/danismanlik', active: false },
    { name: 'Destek', href: '/destek', active: false },
    { name: 'Anahtar Teslim Sera', href: '/anahtar-teslim-proje', active: false },
    { name: 'Ayarlar', href: '/dashboard/settings', active: false },
    { name: 'Yardım', href: '/dashboard/help', active: false },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
            <a href="/dashboard" className="text-xl font-bold text-gray-900 hover:text-green-600 transition-colors">
              SeraGPT
            </a>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500"
            >
              ✕
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
            {menuItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  item.active
                    ? 'bg-green-600 text-white shadow-md'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <span>{item.name}</span>
              </a>
            ))}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200">
            <button className="w-full px-3 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors">
              Çıkış Yap
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:ml-64 flex flex-col min-h-screen">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-4 py-2 lg:px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500"
              >
                ☰
              </button>
              {title && (
                <div className="ml-4 lg:ml-0">
                  <h1 className="text-lg font-semibold text-gray-900">{title}</h1>
                  {subtitle && (
                    <p className="text-xs text-gray-600">{subtitle}</p>
                  )}
                </div>
              )}
            </div>

            {/* Header Actions */}
            <div className="flex items-center space-x-3">
              {/* AI Chat Button */}
              <a
                href="/dashboard/ai-chat"
                className="flex items-center space-x-1 px-2 py-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-md font-medium transition-all duration-200 transform hover:scale-105 shadow-sm"
              >
                <span className="text-sm">🤖</span>
                <span className="hidden sm:inline text-xs">AI Asistan</span>
                <span className="sm:hidden text-xs">AI</span>
              </a>

              {/* User Menu */}
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-gray-600 text-xs">👤</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 px-4 py-3 lg:px-6">
          {children}
        </main>
      </div>
    </div>
  );
}
