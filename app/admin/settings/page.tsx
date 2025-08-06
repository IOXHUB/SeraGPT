'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import DashboardLayout from '@/components/dashboard/DashboardLayout';

export default function AdminSettingsPage() {
  const [systemSettings, setSystemSettings] = useState({
    maintenanceMode: false,
    newUserSignups: true,
    emailNotifications: true,
    apiRateLimit: 1000,
    maxTokensPerUser: 100,
    defaultFreeTokens: 5,
    autoBackup: true,
    logRetentionDays: 30
  });

  const [apiKeys, setApiKeys] = useState({
    openweather: '••••••••••••••••',
    supabase: '••••••••••••••••',
    stripe: '••••••••••••••••',
    sendgrid: '••••••••••••••••'
  });

  const handleSystemSettingChange = (key: string, value: boolean | number) => {
    setSystemSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSaveSettings = () => {
    console.log('Admin settings saved');
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gray-50 text-gray-600">
        <div className="body-content-container space-y-8">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl font-bold text-gray-900">Sistem Ayarları</h1>
            <p className="text-gray-600 mt-1">Platform genelinde geçerli olan sistem ayarları</p>
          </motion.div>

          {/* System Status */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Sistem Durumu</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-4 h-4 bg-green-500 rounded-full mx-auto mb-2"></div>
                <h3 className="font-medium text-gray-900">API Servisleri</h3>
                <p className="text-sm text-green-600">Çalışıyor</p>
              </div>
              <div className="text-center">
                <div className="w-4 h-4 bg-green-500 rounded-full mx-auto mb-2"></div>
                <h3 className="font-medium text-gray-900">Veritabanı</h3>
                <p className="text-sm text-green-600">Çalışıyor</p>
              </div>
              <div className="text-center">
                <div className="w-4 h-4 bg-yellow-500 rounded-full mx-auto mb-2"></div>
                <h3 className="font-medium text-gray-900">Yedekleme</h3>
                <p className="text-sm text-yellow-600">İşlemde</p>
              </div>
            </div>
          </motion.div>

          {/* General Settings */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Genel Ayarlar</h2>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Bakım Modu</h3>
                  <p className="text-sm text-gray-600">Sistemi geçici olarak devre dışı bırak</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={systemSettings.maintenanceMode}
                    onChange={(e) => handleSystemSettingChange('maintenanceMode', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gray-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Yeni Kullanıcı Kayıtları</h3>
                  <p className="text-sm text-gray-600">Yeni hesap oluşturmaya izin ver</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={systemSettings.newUserSignups}
                    onChange={(e) => handleSystemSettingChange('newUserSignups', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gray-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">E-posta Bildirimleri</h3>
                  <p className="text-sm text-gray-600">Sistem e-posta gönderimini etkinleştir</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={systemSettings.emailNotifications}
                    onChange={(e) => handleSystemSettingChange('emailNotifications', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gray-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Otomatik Yedekleme</h3>
                  <p className="text-sm text-gray-600">Günlük otomatik veri yedeklemesi</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={systemSettings.autoBackup}
                    onChange={(e) => handleSystemSettingChange('autoBackup', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gray-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-600"></div>
                </label>
              </div>
            </div>
          </motion.div>

          {/* Limits and Quotas */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Limitler ve Kotalar</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  API İstek Limiti (dakika/istek)
                </label>
                <input
                  type="number"
                  value={systemSettings.apiRateLimit}
                  onChange={(e) => handleSystemSettingChange('apiRateLimit', parseInt(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Kullanıcı Başına Maksimum Jeton
                </label>
                <input
                  type="number"
                  value={systemSettings.maxTokensPerUser}
                  onChange={(e) => handleSystemSettingChange('maxTokensPerUser', parseInt(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Varsayılan Ücretsiz Jeton
                </label>
                <input
                  type="number"
                  value={systemSettings.defaultFreeTokens}
                  onChange={(e) => handleSystemSettingChange('defaultFreeTokens', parseInt(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Log Saklama Süresi (gün)
                </label>
                <input
                  type="number"
                  value={systemSettings.logRetentionDays}
                  onChange={(e) => handleSystemSettingChange('logRetentionDays', parseInt(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                />
              </div>
            </div>
          </motion.div>

          {/* API Keys */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-6">API Anahtarları</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-medium text-gray-900">OpenWeather API</h3>
                  <p className="text-sm text-gray-600">Hava durumu verileri için</p>
                </div>
                <div className="flex items-center space-x-2">
                  <code className="bg-white px-3 py-1 rounded text-sm font-mono">{apiKeys.openweather}</code>
                  <button className="text-gray-600 hover:text-gray-900 text-sm">Düzenle</button>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-medium text-gray-900">Supabase API</h3>
                  <p className="text-sm text-gray-600">Veritabanı bağlantısı için</p>
                </div>
                <div className="flex items-center space-x-2">
                  <code className="bg-white px-3 py-1 rounded text-sm font-mono">{apiKeys.supabase}</code>
                  <button className="text-gray-600 hover:text-gray-900 text-sm">Düzenle</button>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-medium text-gray-900">Stripe API</h3>
                  <p className="text-sm text-gray-600">Ödeme işlemleri için</p>
                </div>
                <div className="flex items-center space-x-2">
                  <code className="bg-white px-3 py-1 rounded text-sm font-mono">{apiKeys.stripe}</code>
                  <button className="text-gray-600 hover:text-gray-900 text-sm">Düzenle</button>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-medium text-gray-900">SendGrid API</h3>
                  <p className="text-sm text-gray-600">E-posta gönderimi için</p>
                </div>
                <div className="flex items-center space-x-2">
                  <code className="bg-white px-3 py-1 rounded text-sm font-mono">{apiKeys.sendgrid}</code>
                  <button className="text-gray-600 hover:text-gray-900 text-sm">Düzenle</button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* System Actions */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Sistem İşlemleri</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                Veritabanı Yedekle
              </button>
              <button className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                Cache Temizle
              </button>
              <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                Sistemi Yeniden Başlat
              </button>
            </div>
          </motion.div>

          {/* Save Button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex justify-end"
          >
            <button
              onClick={handleSaveSettings}
              className="bg-gray-600 hover:bg-gray-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
            >
              Ayarları Kaydet
            </button>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
}
