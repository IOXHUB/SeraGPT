'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/hooks/useAuth';
import Link from 'next/link';

interface UserSettings {
  name: string;
  email: string;
  language: string;
  notifications: boolean;
  theme: string;
  autoSave: boolean;
}

export default function SettingsPage() {
  const { user, loading, signOut, isAdmin } = useAuth();
  const [settings, setSettings] = useState<UserSettings>({
    name: '',
    email: '',
    language: 'tr',
    notifications: true,
    theme: 'minimal',
    autoSave: true
  });
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (user && !loading) {
      setSettings(prev => ({
        ...prev,
        name: user.user_metadata?.name || '',
        email: user.email || ''
      }));
    }
  }, [user, loading]);

  const handleSave = async () => {
    setIsSaving(true);
    
    // Simulate save delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setSaved(true);
    setIsSaving(false);
    
    setTimeout(() => setSaved(false), 2000);
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center" style={{ backgroundColor: '#146448' }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 mx-auto mb-2" style={{ borderColor: '#baf200' }}></div>
          <p className="text-xs" style={{ color: '#1e3237' }}>Yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#146448' }}>
      {/* Header */}
      <div className="border-b border-white/10 p-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Link
              href="/dashboard"
              className="text-xs hover:opacity-70 transition-opacity"
              style={{ color: '#baf200' }}
            >
              ← Geri
            </Link>
            <h1 className="text-sm font-medium" style={{ color: '#baf200' }}>
              Ayarlar
            </h1>
          </div>
          <div className="text-xs text-white opacity-60">
            {user?.email}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto p-6">
        <div className="space-y-6">
          
          {/* Profile Section */}
          <div className="rounded-lg p-4 border border-white/10">
            <h2 className="text-sm font-medium mb-4" style={{ color: '#baf200' }}>
              Profil Bilgileri
            </h2>
            <div className="space-y-3">
              <div>
                <label className="block text-xs mb-1 text-white opacity-80">
                  Ad Soyad
                </label>
                <input
                  type="text"
                  value={settings.name}
                  onChange={(e) => setSettings(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full p-2 rounded-md border border-white/10 focus:outline-none focus:border-white/30 text-xs text-white placeholder-white/50"
                  style={{ backgroundColor: 'transparent' }}
                  placeholder="Adınızı girin"
                />
              </div>
              <div>
                <label className="block text-xs mb-1 text-white opacity-80">
                  E-posta
                </label>
                <input
                  type="email"
                  value={settings.email}
                  onChange={(e) => setSettings(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full p-2 rounded-md border border-white/10 focus:outline-none focus:border-white/30 text-xs text-white placeholder-white/50"
                  style={{ backgroundColor: 'transparent' }}
                  placeholder="E-posta adresiniz"
                />
              </div>
            </div>
          </div>

          {/* Preferences Section */}
          <div className="rounded-lg p-4 border border-white/10">
            <h2 className="text-sm font-medium mb-4" style={{ color: '#baf200' }}>
              Tercihler
            </h2>
            <div className="space-y-3">
              <div>
                <label className="block text-xs mb-1 text-white opacity-80">
                  Dil
                </label>
                <select
                  value={settings.language}
                  onChange={(e) => setSettings(prev => ({ ...prev, language: e.target.value }))}
                  className="w-full p-2 rounded-md border border-white/10 focus:outline-none focus:border-white/30 text-xs text-white"
                  style={{ backgroundColor: 'transparent' }}
                >
                  <option value="tr" style={{ backgroundColor: '#146448', color: 'white' }}>Türkçe</option>
                  <option value="en" style={{ backgroundColor: '#146448', color: 'white' }}>English</option>
                </select>
              </div>
              
              <div className="flex items-center justify-between py-2">
                <div>
                  <div className="text-xs font-medium text-white">
                    Bildirimler
                  </div>
                  <div className="text-xs text-white opacity-60">
                    E-posta bildirimleri al
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.notifications}
                    onChange={(e) => setSettings(prev => ({ ...prev, notifications: e.target.checked }))}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-green-600" style={{ backgroundColor: settings.notifications ? '#baf200' : 'rgba(255,255,255,0.1)' }}></div>
                </label>
              </div>

              <div className="flex items-center justify-between py-2">
                <div>
                  <div className="text-xs font-medium text-white">
                    Otomatik Kaydet
                  </div>
                  <div className="text-xs text-white opacity-60">
                    Sohbetleri otomatik kaydet
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.autoSave}
                    onChange={(e) => setSettings(prev => ({ ...prev, autoSave: e.target.checked }))}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-green-600" style={{ backgroundColor: settings.autoSave ? '#baf200' : 'rgba(255,255,255,0.1)' }}></div>
                </label>
              </div>
            </div>
          </div>

          {/* Account Section */}
          <div className="bg-white/5 rounded-lg p-4 border border-white/5">
            <h2 className="text-sm font-medium mb-4" style={{ color: '#1e3237' }}>
              Hesap
            </h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between py-2">
                <div>
                  <div className="text-xs font-medium" style={{ color: '#1e3237' }}>
                    Hesap Türü
                  </div>
                  <div className="text-xs opacity-60" style={{ color: '#1e3237' }}>
                    {isAdmin() ? 'Yönetici' : 'Kullanıcı'}
                  </div>
                </div>
                <span 
                  className="px-2 py-1 rounded-md text-xs font-medium"
                  style={{ 
                    backgroundColor: isAdmin() ? '#baf200' : 'rgba(255,255,255,0.1)',
                    color: '#1e3237'
                  }}
                >
                  {isAdmin() ? 'Admin' : 'User'}
                </span>
              </div>

              {isAdmin() && (
                <div className="pt-2 border-t border-white/5">
                  <Link
                    href="/admin"
                    className="inline-flex items-center px-3 py-2 rounded-md text-xs font-medium transition-colors hover:opacity-80"
                    style={{ backgroundColor: '#baf200', color: '#1e3237' }}
                  >
                    👑 Admin Paneli
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="flex-1 p-2 rounded-md text-xs font-medium transition-colors disabled:opacity-50"
              style={{ backgroundColor: '#baf200', color: '#1e3237' }}
            >
              {isSaving ? '⏳ Kaydediliyor...' : saved ? '✅ Kaydedildi' : '💾 Kaydet'}
            </button>
            
            <button
              onClick={signOut}
              className="px-4 py-2 rounded-md text-xs font-medium transition-colors border hover:bg-white/5"
              style={{ 
                borderColor: 'rgba(255,255,255,0.1)',
                color: '#1e3237'
              }}
            >
              🚪 Çıkış Yap
            </button>
          </div>

          {/* Footer */}
          <div className="text-center pt-4 border-t border-white/5">
            <p className="text-xs opacity-50" style={{ color: '#1e3237' }}>
              SeraGPT v1.0 • © 2025
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
