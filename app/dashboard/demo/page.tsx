'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import DashboardLayout from '@/components/dashboard/DashboardLayout';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export default function DemoDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    { name: 'Toplam Analiz', value: '24', change: '+12 bu hafta', changeType: 'positive' },
    { name: 'Kullanılabilir Token', value: '156', change: '+89 bu ay', changeType: 'positive' },
    { name: 'Projeler', value: '8', change: '+3 yeni', changeType: 'positive' },
    { name: 'Başarı Oranı', value: '94%', change: '+2.1%', changeType: 'positive' },
  ];

  const features = [
    {
      title: 'AI Asistan',
      description: 'AI destekli tarım danışmanınız',
      href: '/dashboard/ai-chat'
    },
    {
      title: 'ROI Analizi',
      description: 'Yatırım geri dönüş hesaplamaları',
      href: '/dashboard/analysis/roi'
    },
    {
      title: 'İklim Analizi',
      description: 'Bölgesel iklim değerlendirmesi',
      href: '/dashboard/analysis/climate'
    },
    {
      title: 'Ekipman Seçimi',
      description: 'Optimal ekipman önerileri',
      href: '/dashboard/analysis/equipment'
    },
    {
      title: 'Pazar Analizi',
      description: 'Ürün pazarı değerlendirmesi',
      href: '/dashboard/analysis/market'
    },
    {
      title: 'Teknik Planlar',
      description: 'Sera yerleşim planlaması',
      href: '/dashboard/analysis/layout'
    }
  ];

  return (
    <DashboardLayout 
      title="Demo Dashboard" 
      subtitle="SeraGPT ile tarımsal analizlerinizi yönetin"
    >
      <div className="space-y-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-6 rounded-xl shadow-lg border border-[#146448]/10"
            >
              <h3 className="text-sm font-medium text-[#1e3237]/70">{stat.name}</h3>
              <div className="mt-2 flex items-baseline">
                <p className="text-2xl font-bold text-[#1e3237]">{stat.value}</p>
                <p className={`ml-2 text-sm ${
                  stat.changeType === 'positive' ? 'text-[#146448]' : 'text-red-600'
                }`}>
                  {stat.change}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-xl font-bold text-[#1e3237] mb-6">Hızlı Başlat</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.a
                key={feature.title}
                href={feature.href}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-lg border border-[#146448]/10 hover:shadow-xl hover:border-[#146448]/20 transition-all duration-200 group"
              >
                <h3 className="font-semibold text-[#1e3237] mb-2 group-hover:text-[#146448] transition-colors">
                  {feature.title}
                </h3>
                <p className="text-sm text-[#1e3237]/70 mb-4">{feature.description}</p>
                <div className="flex items-center text-[#146448] text-sm font-medium">
                  <span>Başla</span>
                  <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </motion.a>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <h2 className="text-xl font-bold text-[#1e3237] mb-6">Son Aktiviteler</h2>
          <div className="bg-white rounded-xl shadow-lg border border-[#146448]/10 p-6">
            <div className="space-y-4">
              {[
                { action: 'ROI analizi tamamlandı', time: '2 saat önce', status: 'completed' },
                { action: 'İklim analizi başlatıldı', time: '4 saat önce', status: 'in-progress' },
                { action: 'Yeni proje oluşturuldu', time: '1 gün önce', status: 'completed' },
                { action: 'Token paketi satın alındı', time: '2 gün önce', status: 'completed' }
              ].map((activity, index) => (
                <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                  <div className="flex items-center space-x-3">
                    <div className={`w-2 h-2 rounded-full ${
                      activity.status === 'completed' ? 'bg-[#146448]' : 'bg-[#baf200]'
                    }`}></div>
                    <span className="text-[#1e3237]">{activity.action}</span>
                  </div>
                  <span className="text-sm text-[#1e3237]/60">{activity.time}</span>
                </div>
              ))}
            </div>
            
            <div className="mt-6 pt-4 border-t border-gray-100">
              <a 
                href="/dashboard/analytics"
                className="text-[#146448] text-sm font-medium hover:text-[#146448]/80 transition-colors"
              >
                Tüm aktiviteleri görüntüle →
              </a>
            </div>
          </div>
        </div>

        {/* Help Section */}
        <div className="bg-gradient-to-r from-[#146448]/5 to-[#baf200]/5 rounded-xl p-6 border border-[#146448]/10">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-[#146448]/10 rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-[#146448]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-[#1e3237] mb-2">Yardıma mı ihtiyacınız var?</h3>
              <p className="text-[#1e3237]/70 text-sm mb-4">
                SeraGPT kullanımı hakkında sorularınız varsa veya teknik destek almak istiyorsanız, 
                yardım merkezimizi ziyaret edebilir veya doğrudan bizimle iletişime geçebilirsiniz.
              </p>
              <div className="flex space-x-3">
                <a 
                  href="/dashboard/help"
                  className="bg-[#146448] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#146448]/90 transition-colors"
                >
                  Yardım Merkezi
                </a>
                <a 
                  href="/destek"
                  className="bg-[#baf200] text-[#1e3237] px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#baf200]/90 transition-colors"
                >
                  İletişim
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
