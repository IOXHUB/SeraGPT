'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import DashboardLayout from '@/components/dashboard/DashboardLayout';

export default function DemoDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  const menuItems = [
    { id: 'overview', name: 'Dashboard', icon: '📊' },
    { id: 'ai', name: 'SeraGPT AI', icon: '🤖' },
    { id: 'roi', name: 'ROI Simülasyonu', icon: '💰' },
    { id: 'climate', name: 'İklim Analizi', icon: '🌡️' },
    { id: 'equipment', name: 'Ekipman Listesi', icon: '🛠️' },
    { id: 'market', name: 'Pazar Analizi', icon: '📈' },
    { id: 'reports', name: 'Raporlarım', icon: '📋' },
  ];

  const stats = [
    { name: 'Toplam Analiz', value: '24', change: '+12 bu hafta', changeType: 'positive' },
    { name: 'Kullanılabilir Jeton', value: '156', change: '+89 bu ay', changeType: 'positive' },
    { name: 'Projeler', value: '8', change: '+3 yeni', changeType: 'positive' },
    { name: 'Başarı Oranı', value: '94%', change: '+2.1%', changeType: 'positive' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-sm">
        <div className="p-6">
          <img 
            src="https://cdn.builder.io/api/v1/image/assets%2F2c7ec7c93776440b923d3518963fc941%2F96da5382e9584c3fb2d32eca60944359?format=webp&width=800" 
            alt="SeraGPT" 
            className="h-8 w-auto"
          />
        </div>

        <div className="px-6 py-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold text-lg">V</span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Volkan Şimşirkaya</p>
              <p className="text-xs text-gray-500">info@isitmax.com</p>
            </div>
          </div>
        </div>

        <nav className="px-6 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                activeTab === item.id
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <span>{item.icon}</span>
              <span>{item.name}</span>
            </button>
          ))}
        </nav>

        <div className="mt-8 px-6 py-4 border-t border-gray-200">
          <a
            href="/admin"
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium text-purple-700 hover:bg-purple-50 transition-colors"
          >
            <span>👑</span>
            <span>Admin Panel</span>
          </a>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">SeraGPT ile tarımsal analizlerinizi yönetin</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-6 rounded-lg shadow"
            >
              <h3 className="text-sm font-medium text-gray-500">{stat.name}</h3>
              <div className="mt-2 flex items-baseline">
                <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                <p className={`ml-2 text-sm ${
                  stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.change}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Content based on active tab */}
        <div className="bg-white rounded-lg shadow p-6">
          {activeTab === 'overview' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Hoş Geldiniz!</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-2">🤖 SeraGPT AI</h3>
                  <p className="text-sm text-gray-600 mb-3">AI destekli tarım danışmanınız</p>
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                    Başla →
                  </button>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-2">💰 ROI Analizi</h3>
                  <p className="text-sm text-gray-600 mb-3">Yatırım geri dönüş hesaplamaları</p>
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                    Hesapla →
                  </button>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-2">🌡️ İklim Analizi</h3>
                  <p className="text-sm text-gray-600 mb-3">Bölgesel iklim verileri</p>
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                    Analiz Et →
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'ai' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">🤖 SeraGPT AI</h2>
              <div className="bg-gray-50 rounded-lg p-6">
                <p className="text-gray-600 mb-4">AI destekli tarım danışmanınızla sohbet edin</p>
                <div className="bg-white rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-500 mb-2">SeraGPT:</p>
                  <p className="text-gray-700">Merhaba! Size nasıl yardımcı olabilirim? Sera kurulumu, ürün seçimi veya iklim analizi hakkında sorularınızı yanıtlayabilirim.</p>
                </div>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="Sorunuzu yazın..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                    Gönder
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab !== 'overview' && activeTab !== 'ai' && (
            <div className="text-center py-12">
              <h2 className="text-xl font-semibold mb-4">{menuItems.find(item => item.id === activeTab)?.name}</h2>
              <p className="text-gray-600 mb-6">Bu bölüm yakında kullanıma sunulacak.</p>
              <button 
                onClick={() => setActiveTab('overview')}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
              >
                Dashboard'a Dön
              </button>
            </div>
          )}
        </div>

        {/* Quick Access */}
        <div className="mt-8 p-6 bg-white rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">🚀 Hızlı Erişim</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <a href="/auth/login" className="p-4 text-center border border-gray-200 rounded-lg hover:bg-gray-50">
              <div className="text-2xl mb-2">🔐</div>
              <div className="text-sm font-medium">Login Sayfası</div>
            </a>
            <a href="/admin" className="p-4 text-center border border-gray-200 rounded-lg hover:bg-gray-50">
              <div className="text-2xl mb-2">👑</div>
              <div className="text-sm font-medium">Admin Panel</div>
            </a>
            <a href="/dashboard" className="p-4 text-center border border-gray-200 rounded-lg hover:bg-gray-50">
              <div className="text-2xl mb-2">📊</div>
              <div className="text-sm font-medium">Ana Dashboard</div>
            </a>
            <a href="/auth/debug-supabase" className="p-4 text-center border border-gray-200 rounded-lg hover:bg-gray-50">
              <div className="text-2xl mb-2">🔧</div>
              <div className="text-sm font-medium">Debug</div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
