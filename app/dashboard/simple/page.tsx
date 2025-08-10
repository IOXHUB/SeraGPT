'use client';

import { useSimpleAuth } from '@/lib/hooks/useSimpleAuth';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import Link from 'next/link';

// Force dynamic rendering to prevent SSR
export const dynamic = 'force-dynamic';

export default function SimpleDashboard() {
  const { user, isAdmin } = useSimpleAuth();

  if (!user) {
    return (
      <DashboardLayout title="Giriş Gerekli" subtitle="Lütfen giriş yapın">
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-[#146448]/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-[#146448]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-[#1e3237] mb-4">Giriş Yapmanız Gerekiyor</h2>
          <p className="text-[#1e3237]/70 mb-6">SeraGPT dashboard'a erişim için lütfen giriş yapın</p>
          <div className="space-x-4">
            <button 
              onClick={() => window.location.reload()}
              className="bg-[#146448] text-white px-6 py-2 rounded-lg hover:bg-[#146448]/90 transition-colors"
            >
              Sayfayı Yenile
            </button>
            <Link 
              href="/auth/login"
              className="bg-[#baf200] text-[#1e3237] px-6 py-2 rounded-lg hover:bg-[#baf200]/90 transition-colors inline-block"
            >
              Giriş Yap
            </Link>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout 
      title="Basit Dashboard" 
      subtitle={`Hoş geldiniz ${user.email}`}
    >
      <div className="space-y-6">
        {/* User Info Card */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-[#146448]/10">
          <h2 className="text-lg font-bold text-[#1e3237] mb-4">Kullanıcı Bilgileri</h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-[#1e3237]/70">Email:</span>
              <span className="text-[#1e3237]">{user.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#1e3237]/70">Role:</span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                isAdmin 
                  ? 'bg-red-100 text-red-800' 
                  : 'bg-[#146448]/10 text-[#146448]'
              }`}>
                {user.role.toUpperCase()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#1e3237]/70">Status:</span>
              <span className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-[#1e3237]">Aktif</span>
              </span>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: 'AI Asistan', href: '/dashboard/ai-chat', description: 'Sera danışmanınız' },
            { title: 'ROI Analizi', href: '/dashboard/analysis/roi', description: 'Yatırım hesaplama' },
            { title: 'Token Yönetimi', href: '/dashboard/tokens', description: 'Token durumu' },
            { title: 'Ayarlar', href: '/dashboard/settings', description: 'Hesap ayarları' },
            { title: 'Yardım', href: '/dashboard/help', description: 'Destek merkezi' },
            { title: 'Ana Dashboard', href: '/dashboard', description: 'Tam dashboard' }
          ].map((link, index) => (
            <Link 
              key={index}
              href={link.href}
              className="bg-white p-6 rounded-xl shadow-lg border border-[#146448]/10 hover:shadow-xl hover:border-[#146448]/20 transition-all duration-200 group"
            >
              <h3 className="font-semibold text-[#1e3237] mb-2 group-hover:text-[#146448] transition-colors">
                {link.title}
              </h3>
              <p className="text-sm text-[#1e3237]/70">{link.description}</p>
              <div className="mt-3 flex items-center text-[#146448] text-sm">
                <span>Git</span>
                <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>

        {/* Admin Panel Access */}
        {isAdmin && (
          <div className="bg-gradient-to-r from-red-50 to-red-100 border border-red-200 rounded-xl p-6">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-red-900 mb-2">Admin Erişimi</h3>
                <p className="text-red-700 text-sm mb-4">
                  Admin olarak sistemi yönetme yetkiniz bulunmaktadır.
                </p>
                <Link 
                  href="/admin"
                  className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors inline-block"
                >
                  Admin Panel
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
