'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/hooks/useAuth';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

interface SecurityLog {
  id: string;
  timestamp: string;
  type: 'login_attempt' | 'failed_login' | 'suspicious_activity' | 'password_change' | 'role_change';
  userId?: string;
  userEmail?: string;
  ipAddress: string;
  userAgent: string;
  details: string;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
}

interface AuthSettings {
  passwordPolicy: {
    minLength: number;
    requireUppercase: boolean;
    requireLowercase: boolean;
    requireNumbers: boolean;
    requireSymbols: boolean;
    passwordExpiry: number; // days
  };
  loginSecurity: {
    maxFailedAttempts: number;
    lockoutDuration: number; // minutes
    requireEmailVerification: boolean;
    require2FA: boolean;
    sessionTimeout: number; // hours
  };
  rateLimiting: {
    loginAttempts: { requests: number; window: number }; // requests per window (minutes)
    apiCalls: { requests: number; window: number };
    analysisRequests: { requests: number; window: number };
  };
}

export default function AuthSettingsPage() {
  const { user, isAdmin, loading } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [securityLogs, setSecurityLogs] = useState<SecurityLog[]>([]);
  const [authSettings, setAuthSettings] = useState<AuthSettings | null>(null);
  const [dataLoading, setDataLoading] = useState(true);

  const tabs = [
    { id: 'overview', title: 'Genel Bakış', icon: '📊' },
    { id: 'settings', title: 'Auth Ayarları', icon: '⚙️' },
    { id: 'security', title: 'Güvenlik Günlükleri', icon: '🔒' },
    { id: 'sessions', title: 'Aktif Oturumlar', icon: '👥' },
    { id: 'permissions', title: 'Yetkilendirme', icon: '🛡️' }
  ];

  useEffect(() => {
    if (user && !loading) {
      loadAuthData();
    }
  }, [user, loading]);

  const loadAuthData = async () => {
    if (!isAdmin()) {
      window.location.href = '/admin';
      return;
    }

    try {
      setDataLoading(true);
      
      // Mock security logs
      const mockLogs: SecurityLog[] = [
        {
          id: 'sec-001',
          timestamp: '2024-03-15 15:45:23',
          type: 'failed_login',
          userEmail: 'suspicious@example.com',
          ipAddress: '192.168.1.100',
          userAgent: 'curl/7.68.0',
          details: 'Multiple failed login attempts with different passwords',
          riskLevel: 'high'
        },
        {
          id: 'sec-002',
          timestamp: '2024-03-15 14:20:15',
          type: 'login_attempt',
          userId: 'user-123',
          userEmail: 'ahmet@example.com',
          ipAddress: '10.0.0.15',
          userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
          details: 'Successful login from new device',
          riskLevel: 'medium'
        },
        {
          id: 'sec-003',
          timestamp: '2024-03-15 13:10:45',
          type: 'suspicious_activity',
          userId: 'user-456',
          userEmail: 'fatma@example.com',
          ipAddress: '185.220.101.182',
          userAgent: 'Mozilla/5.0 (Windows NT 6.1)',
          details: 'Login from Tor exit node',
          riskLevel: 'critical'
        },
        {
          id: 'sec-004',
          timestamp: '2024-03-15 12:30:12',
          type: 'password_change',
          userId: 'user-789',
          userEmail: 'mehmet@example.com',
          ipAddress: '192.168.1.50',
          userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
          details: 'Password changed successfully',
          riskLevel: 'low'
        },
        {
          id: 'sec-005',
          timestamp: '2024-03-15 11:15:30',
          type: 'role_change',
          userId: 'user-321',
          userEmail: 'ayse@example.com',
          ipAddress: '10.0.0.1',
          userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
          details: 'User role changed from user to premium by admin',
          riskLevel: 'medium'
        }
      ];

      const mockSettings: AuthSettings = {
        passwordPolicy: {
          minLength: 8,
          requireUppercase: true,
          requireLowercase: true,
          requireNumbers: true,
          requireSymbols: false,
          passwordExpiry: 90
        },
        loginSecurity: {
          maxFailedAttempts: 5,
          lockoutDuration: 15,
          requireEmailVerification: true,
          require2FA: false,
          sessionTimeout: 24
        },
        rateLimiting: {
          loginAttempts: { requests: 5, window: 15 },
          apiCalls: { requests: 1000, window: 60 },
          analysisRequests: { requests: 50, window: 60 }
        }
      };
      
      setSecurityLogs(mockLogs);
      setAuthSettings(mockSettings);
      
    } catch (error) {
      console.error('Failed to load auth data:', error);
    } finally {
      setDataLoading(false);
    }
  };

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'critical': return '#DC2626';
      case 'high': return '#EF4444';
      case 'medium': return '#F59E0B';
      case 'low': return '#10B981';
      default: return '#6B7280';
    }
  };

  const getRiskText = (riskLevel: string) => {
    switch (riskLevel) {
      case 'critical': return 'Kritik';
      case 'high': return 'Yüksek';
      case 'medium': return 'Orta';
      case 'low': return 'Düşük';
      default: return 'Bilinmiyor';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'login_attempt': return '🔐';
      case 'failed_login': return '❌';
      case 'suspicious_activity': return '⚠️';
      case 'password_change': return '🔑';
      case 'role_change': return '👤';
      default: return '📝';
    }
  };

  const getTypeText = (type: string) => {
    switch (type) {
      case 'login_attempt': return 'Giriş Denemesi';
      case 'failed_login': return 'Başarısız Giriş';
      case 'suspicious_activity': return 'Şüpheli Aktivite';
      case 'password_change': return 'Şifre Değişikliği';
      case 'role_change': return 'Rol Değişikliği';
      default: return type;
    }
  };

  const updateAuthSettings = (newSettings: Partial<AuthSettings>) => {
    if (authSettings) {
      setAuthSettings({ ...authSettings, ...newSettings });
    }
  };

  if (loading || dataLoading) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: '#146448' }}>
        <div className="p-8">
          <div className="max-w-7xl mx-auto">
            <div className="animate-pulse space-y-6">
              <div className="h-8 bg-white/10 rounded w-1/4"></div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6].map(i => (
                  <div key={i} className="h-32 bg-white/10 rounded"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#146448' }}>
      <header className="border-b border-white/10 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link 
                href="/admin" 
                className="text-2xl hover:opacity-70 transition-opacity"
                style={{ color: '#f6f8f9' }}
              >
                ←
              </Link>
              <div>
                <h1 className="text-2xl font-bold" style={{ color: '#f6f8f9' }}>Güvenlik & Yetkilendirme</h1>
                <p style={{ color: '#f6f8f9', opacity: '0.8' }}>Authentication ve security yönetimi</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                className="px-4 py-2 rounded-lg font-medium transition-all hover:opacity-90"
                style={{ backgroundColor: '#baf200', color: '#1e3237' }}
              >
                🔄 Güvenlik Taraması
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        {/* Security Overview Stats */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-6" style={{ color: '#f6f8f9' }}>Güvenlik Durumu</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-70" style={{ color: '#1e3237' }}>Güvenlik Skoru</p>
                  <p className="text-2xl font-bold" style={{ color: '#10B981' }}>87%</p>
                </div>
                <div className="text-2xl">🛡️</div>
              </div>
              <p className="text-sm mt-2" style={{ color: '#146448' }}>İyi seviye</p>
            </div>

            <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-70" style={{ color: '#1e3237' }}>Şüpheli Aktivite</p>
                  <p className="text-2xl font-bold" style={{ color: '#EF4444' }}>
                    {securityLogs.filter(log => log.riskLevel === 'high' || log.riskLevel === 'critical').length}
                  </p>
                </div>
                <div className="text-2xl">⚠️</div>
              </div>
              <p className="text-sm mt-2" style={{ color: '#146448' }}>Son 24 saat</p>
            </div>

            <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-70" style={{ color: '#1e3237' }}>Başarısız Giriş</p>
                  <p className="text-2xl font-bold" style={{ color: '#F59E0B' }}>
                    {securityLogs.filter(log => log.type === 'failed_login').length}
                  </p>
                </div>
                <div className="text-2xl">❌</div>
              </div>
              <p className="text-sm mt-2" style={{ color: '#146448' }}>Bu gün</p>
            </div>

            <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-70" style={{ color: '#1e3237' }}>Aktif Oturum</p>
                  <p className="text-2xl font-bold" style={{ color: '#1e3237' }}>24</p>
                </div>
                <div className="text-2xl">👥</div>
              </div>
              <p className="text-sm mt-2" style={{ color: '#146448' }}>Çevrimiçi kullanıcılar</p>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  activeTab === tab.id
                    ? 'shadow-lg transform scale-105'
                    : 'hover:opacity-80'
                }`}
                style={{
                  backgroundColor: activeTab === tab.id ? '#baf200' : '#f6f8f9',
                  color: '#1e3237'
                }}
              >
                {tab.icon} {tab.title}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="space-y-8">
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
                <h3 className="text-xl font-semibold mb-4" style={{ color: '#1e3237' }}>Son Güvenlik Olayları</h3>
                <div className="space-y-4">
                  {securityLogs.slice(0, 5).map((log) => (
                    <div key={log.id} className="flex items-center justify-between p-3 border rounded-lg" style={{ borderColor: '#146448' }}>
                      <div className="flex items-center space-x-3">
                        <span className="text-xl">{getTypeIcon(log.type)}</span>
                        <div>
                          <p className="font-medium" style={{ color: '#1e3237' }}>{getTypeText(log.type)}</p>
                          <p className="text-sm opacity-70" style={{ color: '#1e3237' }}>
                            {log.userEmail || log.ipAddress} • {new Date(log.timestamp).toLocaleString('tr-TR')}
                          </p>
                        </div>
                      </div>
                      <span 
                        className="px-2 py-1 rounded text-xs font-medium text-white"
                        style={{ backgroundColor: getRiskColor(log.riskLevel) }}
                      >
                        {getRiskText(log.riskLevel)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
                <h3 className="text-xl font-semibold mb-4" style={{ color: '#1e3237' }}>Güvenlik Durumu</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span style={{ color: '#1e3237' }}>Şifre Politikası</span>
                    <span className="text-green-600 font-semibold">✅ Aktif</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span style={{ color: '#1e3237' }}>Email Doğrulama</span>
                    <span className="text-green-600 font-semibold">✅ Aktif</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span style={{ color: '#1e3237' }}>2FA Zorunluluğu</span>
                    <span className="text-yellow-600 font-semibold">⚠️ Pasif</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span style={{ color: '#1e3237' }}>Rate Limiting</span>
                    <span className="text-green-600 font-semibold">✅ Aktif</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span style={{ color: '#1e3237' }}>Session Timeout</span>
                    <span className="text-green-600 font-semibold">✅ 24 saat</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && authSettings && (
            <div className="max-w-4xl mx-auto space-y-8">
              {/* Password Policy */}
              <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
                <h3 className="text-xl font-semibold mb-6" style={{ color: '#1e3237' }}>Şifre Politikası</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#1e3237' }}>
                      Minimum Uzunluk
                    </label>
                    <input 
                      type="number" 
                      value={authSettings.passwordPolicy.minLength}
                      onChange={(e) => updateAuthSettings({
                        passwordPolicy: { ...authSettings.passwordPolicy, minLength: parseInt(e.target.value) }
                      })}
                      className="w-full p-3 border rounded-lg" 
                      style={{ borderColor: '#146448' }}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#1e3237' }}>
                      Şifre Süresi (Gün)
                    </label>
                    <input 
                      type="number" 
                      value={authSettings.passwordPolicy.passwordExpiry}
                      onChange={(e) => updateAuthSettings({
                        passwordPolicy: { ...authSettings.passwordPolicy, passwordExpiry: parseInt(e.target.value) }
                      })}
                      className="w-full p-3 border rounded-lg" 
                      style={{ borderColor: '#146448' }}
                    />
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <label className="flex items-center">
                    <input 
                      type="checkbox" 
                      checked={authSettings.passwordPolicy.requireUppercase}
                      onChange={(e) => updateAuthSettings({
                        passwordPolicy: { ...authSettings.passwordPolicy, requireUppercase: e.target.checked }
                      })}
                      className="mr-2" 
                    />
                    <span style={{ color: '#1e3237' }}>Büyük harf zorunlu</span>
                  </label>
                  <label className="flex items-center">
                    <input 
                      type="checkbox" 
                      checked={authSettings.passwordPolicy.requireLowercase}
                      onChange={(e) => updateAuthSettings({
                        passwordPolicy: { ...authSettings.passwordPolicy, requireLowercase: e.target.checked }
                      })}
                      className="mr-2" 
                    />
                    <span style={{ color: '#1e3237' }}>Küçük harf zorunlu</span>
                  </label>
                  <label className="flex items-center">
                    <input 
                      type="checkbox" 
                      checked={authSettings.passwordPolicy.requireNumbers}
                      onChange={(e) => updateAuthSettings({
                        passwordPolicy: { ...authSettings.passwordPolicy, requireNumbers: e.target.checked }
                      })}
                      className="mr-2" 
                    />
                    <span style={{ color: '#1e3237' }}>Rakam zorunlu</span>
                  </label>
                  <label className="flex items-center">
                    <input 
                      type="checkbox" 
                      checked={authSettings.passwordPolicy.requireSymbols}
                      onChange={(e) => updateAuthSettings({
                        passwordPolicy: { ...authSettings.passwordPolicy, requireSymbols: e.target.checked }
                      })}
                      className="mr-2" 
                    />
                    <span style={{ color: '#1e3237' }}>Özel karakter zorunlu</span>
                  </label>
                </div>
              </div>

              {/* Login Security */}
              <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
                <h3 className="text-xl font-semibold mb-6" style={{ color: '#1e3237' }}>Giriş Güvenliği</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#1e3237' }}>
                      Max Başarısız Giriş
                    </label>
                    <input 
                      type="number" 
                      value={authSettings.loginSecurity.maxFailedAttempts}
                      onChange={(e) => updateAuthSettings({
                        loginSecurity: { ...authSettings.loginSecurity, maxFailedAttempts: parseInt(e.target.value) }
                      })}
                      className="w-full p-3 border rounded-lg" 
                      style={{ borderColor: '#146448' }}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#1e3237' }}>
                      Kilitleme Süresi (Dakika)
                    </label>
                    <input 
                      type="number" 
                      value={authSettings.loginSecurity.lockoutDuration}
                      onChange={(e) => updateAuthSettings({
                        loginSecurity: { ...authSettings.loginSecurity, lockoutDuration: parseInt(e.target.value) }
                      })}
                      className="w-full p-3 border rounded-lg" 
                      style={{ borderColor: '#146448' }}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#1e3237' }}>
                      Oturum Süresi (Saat)
                    </label>
                    <input 
                      type="number" 
                      value={authSettings.loginSecurity.sessionTimeout}
                      onChange={(e) => updateAuthSettings({
                        loginSecurity: { ...authSettings.loginSecurity, sessionTimeout: parseInt(e.target.value) }
                      })}
                      className="w-full p-3 border rounded-lg" 
                      style={{ borderColor: '#146448' }}
                    />
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <label className="flex items-center">
                    <input 
                      type="checkbox" 
                      checked={authSettings.loginSecurity.requireEmailVerification}
                      onChange={(e) => updateAuthSettings({
                        loginSecurity: { ...authSettings.loginSecurity, requireEmailVerification: e.target.checked }
                      })}
                      className="mr-2" 
                    />
                    <span style={{ color: '#1e3237' }}>Email doğrulama zorunlu</span>
                  </label>
                  <label className="flex items-center">
                    <input 
                      type="checkbox" 
                      checked={authSettings.loginSecurity.require2FA}
                      onChange={(e) => updateAuthSettings({
                        loginSecurity: { ...authSettings.loginSecurity, require2FA: e.target.checked }
                      })}
                      className="mr-2" 
                    />
                    <span style={{ color: '#1e3237' }}>2FA zorunlu</span>
                  </label>
                </div>
              </div>

              {/* Rate Limiting */}
              <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
                <h3 className="text-xl font-semibold mb-6" style={{ color: '#1e3237' }}>Rate Limiting</h3>
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: '#1e3237' }}>
                        Giriş Denemeleri (Sayı)
                      </label>
                      <input 
                        type="number" 
                        value={authSettings.rateLimiting.loginAttempts.requests}
                        className="w-full p-3 border rounded-lg" 
                        style={{ borderColor: '#146448' }}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: '#1e3237' }}>
                        Zaman Penceresi (Dakika)
                      </label>
                      <input 
                        type="number" 
                        value={authSettings.rateLimiting.loginAttempts.window}
                        className="w-full p-3 border rounded-lg" 
                        style={{ borderColor: '#146448' }}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: '#1e3237' }}>
                        API Çağrıları (Sayı)
                      </label>
                      <input 
                        type="number" 
                        value={authSettings.rateLimiting.apiCalls.requests}
                        className="w-full p-3 border rounded-lg" 
                        style={{ borderColor: '#146448' }}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: '#1e3237' }}>
                        Zaman Penceresi (Dakika)
                      </label>
                      <input 
                        type="number" 
                        value={authSettings.rateLimiting.apiCalls.window}
                        className="w-full p-3 border rounded-lg" 
                        style={{ borderColor: '#146448' }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  className="px-6 py-3 rounded-lg font-medium transition-all hover:opacity-90"
                  style={{ backgroundColor: '#baf200', color: '#1e3237' }}
                >
                  💾 Ayarları Kaydet
                </button>
                <button
                  className="px-6 py-3 rounded-lg font-medium transition-all hover:opacity-90"
                  style={{ backgroundColor: '#6B7280', color: '#f6f8f9' }}
                >
                  🔄 Varsayılana Dön
                </button>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div>
              <h3 className="text-xl font-semibold mb-6" style={{ color: '#f6f8f9' }}>Güvenlik Günlükleri</h3>
              <div className="space-y-4">
                {securityLogs.map((log) => (
                  <div key={log.id} className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <span className="text-2xl">{getTypeIcon(log.type)}</span>
                          <h4 className="text-lg font-semibold" style={{ color: '#1e3237' }}>
                            {getTypeText(log.type)}
                          </h4>
                          <span 
                            className="px-2 py-1 rounded-full text-xs font-medium text-white"
                            style={{ backgroundColor: getRiskColor(log.riskLevel) }}
                          >
                            {getRiskText(log.riskLevel)}
                          </span>
                        </div>
                        
                        <p className="text-sm mb-3" style={{ color: '#1e3237' }}>
                          {log.details}
                        </p>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <p className="opacity-70" style={{ color: '#1e3237' }}>Zaman</p>
                            <p className="font-medium" style={{ color: '#146448' }}>
                              {new Date(log.timestamp).toLocaleString('tr-TR')}
                            </p>
                          </div>
                          <div>
                            <p className="opacity-70" style={{ color: '#1e3237' }}>Kullanıcı</p>
                            <p className="font-medium" style={{ color: '#146448' }}>
                              {log.userEmail || 'Bilinmiyor'}
                            </p>
                          </div>
                          <div>
                            <p className="opacity-70" style={{ color: '#1e3237' }}>IP Adresi</p>
                            <p className="font-medium" style={{ color: '#146448' }}>{log.ipAddress}</p>
                          </div>
                          <div>
                            <p className="opacity-70" style={{ color: '#1e3237' }}>User Agent</p>
                            <p className="font-medium text-xs" style={{ color: '#146448' }}>
                              {log.userAgent.substring(0, 30)}...
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="ml-6">
                        <button
                          className="px-3 py-2 rounded-lg font-medium transition-all hover:opacity-90"
                          style={{ backgroundColor: '#146448', color: '#f6f8f9' }}
                        >
                          📋 Detaylar
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'sessions' && (
            <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
              <h3 className="text-xl font-semibold mb-6" style={{ color: '#1e3237' }}>Aktif Kullanıcı Oturumları</h3>
              <div className="space-y-4">
                {/* Mock active sessions */}
                {[
                  { user: 'admin@seragpt.com', ip: '192.168.1.1', device: 'Chrome/Windows', lastActivity: '2 dk önce', location: 'Istanbul, TR' },
                  { user: 'ahmet@example.com', ip: '10.0.0.15', device: 'Safari/macOS', lastActivity: '15 dk önce', location: 'Ankara, TR' },
                  { user: 'fatma@example.com', ip: '192.168.1.100', device: 'Firefox/Linux', lastActivity: '1 saat önce', location: 'Izmir, TR' }
                ].map((session, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg" style={{ borderColor: '#146448' }}>
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center text-white font-semibold">
                          {session.user.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-medium" style={{ color: '#1e3237' }}>{session.user}</p>
                          <p className="text-sm opacity-70" style={{ color: '#1e3237' }}>
                            {session.device} • {session.ip} • {session.location}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm" style={{ color: '#146448' }}>{session.lastActivity}</p>
                      <button className="text-sm text-red-600 hover:text-red-800">Oturumu Sonlandır</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'permissions' && (
            <div className="max-w-4xl mx-auto">
              <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
                <h3 className="text-xl font-semibold mb-6" style={{ color: '#1e3237' }}>Rol Bazlı Yetkilendirme</h3>
                
                <div className="space-y-6">
                  {/* Admin Role */}
                  <div className="border rounded-lg p-4" style={{ borderColor: '#146448' }}>
                    <h4 className="font-semibold mb-3 text-red-600">👑 Admin Rolleri</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {[
                        'Tüm kullanıcıları görüntüleme',
                        'Kullanıcı rolleri değiştirme',
                        'Sistem ayarları değiştirme',
                        'Güvenlik günlüklerini görüntüleme',
                        'API test araçlarını kullanma',
                        'Backup ve restore işlemleri'
                      ].map((permission, index) => (
                        <label key={index} className="flex items-center">
                          <input type="checkbox" defaultChecked className="mr-2" />
                          <span className="text-sm" style={{ color: '#1e3237' }}>{permission}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Premium Role */}
                  <div className="border rounded-lg p-4" style={{ borderColor: '#146448' }}>
                    <h4 className="font-semibold mb-3 text-purple-600">⭐ Premium Kullanıcı Rolleri</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {[
                        'Sınırsız analiz yapma',
                        'Gelişmiş raporlara erişim',
                        'Öncelikli destek',
                        'API kullanımı',
                        'Toplu analiz işlemleri',
                        'Veri dışa aktarma'
                      ].map((permission, index) => (
                        <label key={index} className="flex items-center">
                          <input type="checkbox" defaultChecked className="mr-2" />
                          <span className="text-sm" style={{ color: '#1e3237' }}>{permission}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Regular User Role */}
                  <div className="border rounded-lg p-4" style={{ borderColor: '#146448' }}>
                    <h4 className="font-semibold mb-3 text-green-600">👤 Standart Kullanıcı Rolleri</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {[
                        'Temel analiz yapma (5 adet/ay)',
                        'Profil bilgilerini güncelleme',
                        'Geçmiş analizleri görüntüleme',
                        'Temel raporlara erişim',
                        'Destek sistemi kullanma',
                        'Şifre değiştirme'
                      ].map((permission, index) => (
                        <label key={index} className="flex items-center">
                          <input type="checkbox" defaultChecked className="mr-2" />
                          <span className="text-sm" style={{ color: '#1e3237' }}>{permission}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <button
                    className="px-6 py-3 rounded-lg font-medium transition-all hover:opacity-90"
                    style={{ backgroundColor: '#baf200', color: '#1e3237' }}
                  >
                    💾 Yetkileri Kaydet
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
