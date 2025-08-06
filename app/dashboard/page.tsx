'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';

// Force dynamic rendering for dashboard pages
export const dynamic = 'force-dynamic';

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="flex-1 bg-gray-50 p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-green-50 p-6 rounded-xl border border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-gray-600 text-sm font-medium">Analizler</h3>
                <p className="text-3xl font-bold text-gray-900 mt-1">1,534</p>
                <p className="text-green-600 text-sm mt-1">+4.8%</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-gray-600 text-sm font-medium">Beklemede</h3>
                <p className="text-3xl font-bold text-gray-900 mt-1">869</p>
                <p className="text-blue-600 text-sm mt-1">+2.1%</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                  <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-purple-50 p-6 rounded-xl border border-purple-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-gray-600 text-sm font-medium">Tamamlanan</h3>
                <p className="text-3xl font-bold text-gray-900 mt-1">236</p>
                <p className="text-purple-600 text-sm mt-1">+4.8%</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-red-50 p-6 rounded-xl border border-red-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-gray-600 text-sm font-medium">Reddedilen</h3>
                <p className="text-3xl font-bold text-gray-900 mt-1">429</p>
                <p className="text-red-600 text-sm mt-1">-1.2%</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"/>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Bar Chart */}
          <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Analizler</h3>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-500">Aktif</span>
                <span className="text-sm text-gray-500">Beklemede</span>
              </div>
            </div>
            <div className="h-64 flex items-end justify-between space-x-2">
              <div className="flex flex-col items-center space-y-2">
                <div className="flex flex-col space-y-1">
                  <div className="w-8 h-24 bg-blue-500 rounded-t"></div>
                  <div className="w-8 h-16 bg-green-300 rounded-t"></div>
                </div>
                <span className="text-xs text-gray-500">Oca</span>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <div className="flex flex-col space-y-1">
                  <div className="w-8 h-32 bg-blue-500 rounded-t"></div>
                  <div className="w-8 h-20 bg-green-300 rounded-t"></div>
                </div>
                <span className="text-xs text-gray-500">Şub</span>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <div className="flex flex-col space-y-1">
                  <div className="w-8 h-28 bg-blue-500 rounded-t"></div>
                  <div className="w-8 h-18 bg-green-300 rounded-t"></div>
                </div>
                <span className="text-xs text-gray-500">Mar</span>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <div className="flex flex-col space-y-1">
                  <div className="w-8 h-36 bg-blue-500 rounded-t"></div>
                  <div className="w-8 h-24 bg-green-300 rounded-t"></div>
                </div>
                <span className="text-xs text-gray-500">Nis</span>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <div className="flex flex-col space-y-1">
                  <div className="w-8 h-40 bg-blue-500 rounded-t"></div>
                  <div className="w-8 h-28 bg-green-300 rounded-t"></div>
                </div>
                <span className="text-xs text-gray-500">May</span>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <div className="flex flex-col space-y-1">
                  <div className="w-8 h-44 bg-blue-500 rounded-t"></div>
                  <div className="w-8 h-32 bg-green-300 rounded-t"></div>
                </div>
                <span className="text-xs text-gray-500">Haz</span>
              </div>
            </div>
          </div>

          {/* Pie Chart */}
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Departmana Göre Analizler</h3>
            </div>
            <div className="flex items-center justify-center mb-4">
              <div className="relative w-32 h-32">
                <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke="#e5e7eb" strokeWidth="8"/>
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke="#3b82f6" strokeWidth="8" strokeDasharray="40 60" strokeDashoffset="0"/>
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke="#10b981" strokeWidth="8" strokeDasharray="30 70" strokeDashoffset="-40"/>
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke="#f59e0b" strokeWidth="8" strokeDasharray="20 80" strokeDashoffset="-70"/>
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke="#ef4444" strokeWidth="8" strokeDasharray="10 90" strokeDashoffset="-90"/>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">525</div>
                    <div className="text-xs text-gray-500">Toplam</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                  <span className="text-sm text-gray-600">Mühendislik</span>
                </div>
                <span className="text-sm font-medium text-gray-900">120</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-sm text-gray-600">Pazarlama</span>
                </div>
                <span className="text-sm font-medium text-gray-900">110</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                  <span className="text-sm text-gray-600">Satış</span>
                </div>
                <span className="text-sm font-medium text-gray-900">95</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                  <span className="text-sm text-gray-600">Müşteri Desteği</span>
                </div>
                <span className="text-sm font-medium text-gray-900">85</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Current Projects */}
          <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Mevcut Projeler</h3>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">Popüler</span>
                <span className="text-sm text-gray-500">Tümünü Gör</span>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-blue-600 font-semibold">SD</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Sera Tasarım Projesi</h4>
                    <p className="text-sm text-gray-500">Tam zamanlı • Uzaktan</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">₺70K - ₺90K</p>
                  <p className="text-sm text-gray-500">120 Analiz</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-green-600 font-semibold">GD</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Grafik Tasarımcı</h4>
                    <p className="text-sm text-gray-500">Yarı zamanlı • Hibrit</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">₺40K - ₺55K</p>
                  <p className="text-sm text-gray-500">75 Analiz</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-purple-600 font-semibold">SM</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Satış Müdürü</h4>
                    <p className="text-sm text-gray-500">Tam zamanlı • Ofiste</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">₺65K - ₺80K</p>
                  <p className="text-sm text-gray-500">75 Analiz</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-orange-600 font-semibold">HC</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">İK Koordinatörü</h4>
                    <p className="text-sm text-gray-500">Tam zamanlı • Uzaktan</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">₺50K - ₺60K</p>
                  <p className="text-sm text-gray-500">60 Analiz</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side Panel */}
          <div className="space-y-6">
            {/* Analiz Kaynakları */}
            <div className="bg-purple-50 p-6 rounded-xl border border-purple-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Analiz Kaynakları</h3>
              <div className="flex items-center justify-center mb-4">
                <div className="relative w-24 h-24">
                  <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="35" fill="transparent" stroke="#e5e7eb" strokeWidth="6"/>
                    <circle cx="50" cy="50" r="35" fill="transparent" stroke="#8b5cf6" strokeWidth="6" strokeDasharray="75 25" strokeDashoffset="0"/>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-xl font-bold text-gray-900">1,000</div>
                      <div className="text-xs text-gray-500">Toplam Analiz</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">350</span>
                  <span className="text-sm text-gray-600">200</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-gray-500">ROI Analizi</span>
                  <span className="text-xs text-gray-500">İklim Analizi</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">300</span>
                  <span className="text-sm text-gray-600">150</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-gray-500">Pazar Analizi</span>
                  <span className="text-xs text-gray-500">Teknik Analiz</span>
                </div>
              </div>
            </div>

            {/* Görevler */}
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Görevler</h3>
                <span className="text-sm text-gray-500">Bugün</span>
              </div>
              <div className="space-y-3">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  <span className="text-sm text-gray-600">Resume Screening</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  <span className="text-sm text-gray-600">Interview Scheduling</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  <span className="text-sm text-gray-600">Candidate Communication</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
                  <span className="text-sm text-gray-600">Offer Management</span>
                </div>
              </div>
            </div>

            {/* Program */}
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Program</h3>
                <span className="text-sm text-gray-500">Mart 17, 2024</span>
              </div>
              <div className="space-y-3">
                <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-900">Pazarlama Stratejisi Toplantısı</span>
                    <span className="text-xs text-gray-500">09:30</span>
                  </div>
                </div>
                <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-900">HR Video Mülakat Oturumu</span>
                    <span className="text-xs text-gray-500">11:30</span>
                  </div>
                </div>
                <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-900">Müşteri Geri Bildirimi Analizi</span>
                    <span className="text-xs text-gray-500">14:30</span>
                  </div>
                </div>
                <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-900">Mali Raporlama Oturumu</span>
                    <span className="text-xs text-gray-500">16:00</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
