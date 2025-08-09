'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/hooks/useAuth';
import { authService } from '@/lib/services/auth-service';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { 
  UserProfile, 
  UserPreferences, 
  UpdateUserProfileRequest, 
  UpdateUserPreferencesRequest,
  PROFESSIONS,
  EXPERIENCE_LEVELS,
  SPECIALIZATIONS
} from '@/types/auth';

export const dynamic = 'force-dynamic';

interface SettingsTab {
  id: string;
  name: string;
  icon: string;
}

export default function SettingsPage() {
  const { user, profile, preferences, updateProfile, updatePreferences, loading } = useAuth();
  
  const [activeTab, setActiveTab] = useState('profile');
  const [profileData, setProfileData] = useState<UpdateUserProfileRequest>({});
  const [preferencesData, setPreferencesData] = useState<UpdateUserPreferencesRequest>({});
  const [saving, setSaving] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [profileCompletion, setProfileCompletion] = useState(0);

  const tabs: SettingsTab[] = [
    { id: 'profile', name: 'Profil Bilgileri', icon: '👤' },
    { id: 'location', name: 'Konum & İşletme', icon: '📍' },
    { id: 'preferences', name: 'Tercihler', icon: '⚙️' },
    { id: 'notifications', name: 'Bildirimler', icon: '🔔' },
    { id: 'security', name: 'Güvenlik', icon: '🔒' },
    { id: 'data', name: 'Veri Yönetimi', icon: '💾' }
  ];

  useEffect(() => {
    if (profile) {
      setProfileData({
        full_name: profile.full_name || '',
        company_name: profile.company_name || '',
        phone: profile.phone || '',
        profession: profile.profession,
        experience_level: profile.experience_level,
        specialization: profile.specialization,
        location: profile.location || {},
        language: profile.language,
        currency: profile.currency,
        marketing_consent: profile.marketing_consent,
        newsletter_consent: profile.newsletter_consent
      });

      // Calculate profile completion
      calculateProfileCompletion(profile);
    }
  }, [profile]);

  useEffect(() => {
    if (preferences) {
      setPreferencesData({
        theme: preferences.theme,
        dashboard_layout: preferences.dashboard_layout,
        email_notifications: preferences.email_notifications,
        push_notifications: preferences.push_notifications,
        sms_notifications: preferences.sms_notifications,
        analysis_completed: preferences.analysis_completed,
        price_alerts: preferences.price_alerts,
        weather_alerts: preferences.weather_alerts,
        system_updates: preferences.system_updates,
        marketing_emails: preferences.marketing_emails,
        default_currency: preferences.default_currency,
        default_units: preferences.default_units,
        pdf_template: preferences.pdf_template,
        profile_visibility: preferences.profile_visibility,
        data_sharing_consent: preferences.data_sharing_consent,
        analytics_consent: preferences.analytics_consent
      });
    }
  }, [preferences]);

  const calculateProfileCompletion = (profile: UserProfile) => {
    const fields = [
      profile.full_name,
      profile.phone,
      profile.profession,
      profile.experience_level,
      profile.location?.city,
      profile.language,
      profile.currency
    ];
    
    const completed = fields.filter(field => field && field !== '').length;
    const percentage = Math.round((completed / fields.length) * 100);
    setProfileCompletion(percentage);
  };

  const showMessage = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 5000);
  };

  const handleSaveProfile = async () => {
    setSaving('profile');
    try {
      const result = await updateProfile(profileData);
      if (result.error) {
        showMessage('error', result.error.message || 'Profil güncellenirken hata oluştu');
      } else {
        showMessage('success', 'Profil bilgileriniz başarıyla güncellendi!');
        if (result.data) {
          calculateProfileCompletion(result.data);
        }
      }
    } catch (error: any) {
      showMessage('error', error.message || 'Beklenmeyen hata oluştu');
    } finally {
      setSaving(null);
    }
  };

  const handleSavePreferences = async () => {
    setSaving('preferences');
    try {
      const result = await updatePreferences(preferencesData);
      if (result.error) {
        showMessage('error', result.error.message || 'Tercihler güncellenirken hata oluştu');
      } else {
        showMessage('success', 'Tercihleriniz başarıyla güncellendi!');
      }
    } catch (error: any) {
      showMessage('error', error.message || 'Beklenmeyen hata oluştu');
    } finally {
      setSaving(null);
    }
  };

  const handleResetPreferences = async () => {
    if (!user || !window.confirm('Tüm tercihleri varsayılan değerlere sıfırlamak istediğinizden emin misiniz?')) {
      return;
    }

    setSaving('reset');
    try {
      const result = await authService.resetUserPreferences(user.id);
      if (result) {
        showMessage('success', 'Tercihleriniz varsayılan değerlere sıfırlandı!');
        // Refresh preferences data
        window.location.reload();
      } else {
        showMessage('error', 'Tercihler sıfırlanırken hata oluştu');
      }
    } catch (error: any) {
      showMessage('error', error.message || 'Beklenmeyen hata oluştu');
    } finally {
      setSaving(null);
    }
  };

  const handleExportData = async () => {
    if (!user) return;

    try {
      // Get user data
      const [userProfile, userTokens, userActivity] = await Promise.all([
        authService.getUserProfile(user.id),
        authService.getUserTokens(user.id),
        authService.getUserActivity(user.id, 1000)
      ]);

      const exportData = {
        profile: userProfile,
        tokens: userTokens,
        activity: userActivity,
        export_date: new Date().toISOString(),
        export_by: user.email
      };

      // Create and download file
      const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `seragpt-data-${new Date().toISOString().split('T')[0]}.json`;
      link.click();
      URL.revokeObjectURL(url);

      showMessage('success', 'Verileriniz başarıyla indirildi!');
    } catch (error: any) {
      showMessage('error', 'Veri dışa aktarımı sırasında hata oluştu');
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Ayarlar yükleniyor...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Ayarlar" subtitle="Hesap ve uygulama ayarlarınızı yönetin">
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Sidebar */}
        <div className="lg:w-64 flex-shrink-0">
          <div className="bg-[#f6f8f9] rounded-xl border border-gray-200 p-4 shadow-lg">
            <h3 className="font-semibold text-[#1e3237] mb-4">Ayar Kategorileri</h3>
            <nav className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'bg-[#baf200]/30 text-[#1e3237] border border-[#baf200]'
                      : 'text-[#1e3237]/70 hover:text-[#1e3237] hover:bg-white'
                  }`}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.name}
                </button>
              ))}
            </nav>

            {/* Profile Completion */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h4 className="text-sm font-medium text-[#1e3237] mb-2">Profil Tamamlanma</h4>
              <div className="flex items-center">
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-[#146448] h-2 rounded-full transition-all duration-300"
                    style={{ width: `${profileCompletion}%` }}
                  />
                </div>
                <span className="ml-2 text-sm font-medium text-[#1e3237]">{profileCompletion}%</span>
              </div>
              <p className="text-xs text-[#1e3237]/60 mt-1">
                Profil tamamlama oranınızı artırarak daha iyi öneriler alın
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Message */}
          {message && (
            <div className={`mb-6 p-4 rounded-lg ${
              message.type === 'success'
                ? 'bg-[#baf200]/20 text-[#1e3237] border border-[#baf200]'
                : 'bg-red-50 text-red-800 border border-red-200'
            }`}>
              {message.text}
            </div>
          )}

          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="bg-[#f6f8f9] rounded-xl border border-gray-200 p-6 shadow-lg">
              <h2 className="text-xl font-semibold text-[#1e3237] mb-6">👤 Profil Bilgileri</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Ad Soyad</label>
                  <input
                    type="text"
                    value={profileData.full_name || ''}
                    onChange={(e) => setProfileData(prev => ({ ...prev, full_name: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#146448] bg-white"
                    placeholder="Adınız ve soyadınız"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Telefon</label>
                  <input
                    type="tel"
                    value={profileData.phone || ''}
                    onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#146448] bg-white"
                    placeholder="05XX XXX XX XX"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Meslek</label>
                  <select
                    value={profileData.profession || ''}
                    onChange={(e) => setProfileData(prev => ({ ...prev, profession: e.target.value as any }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#146448] bg-white"
                  >
                    <option value="">Meslek seçin</option>
                    <option value={PROFESSIONS.FARMER}>Çiftçi</option>
                    <option value={PROFESSIONS.CONSULTANT}>Tarım Danışmanı</option>
                    <option value={PROFESSIONS.INVESTOR}>Yatırımcı</option>
                    <option value={PROFESSIONS.STUDENT}>Öğrenci</option>
                    <option value={PROFESSIONS.RESEARCHER}>Araştırmacı</option>
                    <option value={PROFESSIONS.OTHER}>Diğer</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Deneyim Seviyesi</label>
                  <select
                    value={profileData.experience_level || ''}
                    onChange={(e) => setProfileData(prev => ({ ...prev, experience_level: e.target.value as any }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#146448] bg-white"
                  >
                    <option value="">Deneyim seviyesi seçin</option>
                    <option value={EXPERIENCE_LEVELS.BEGINNER}>Başlangıç (0-2 yıl)</option>
                    <option value={EXPERIENCE_LEVELS.INTERMEDIATE}>Orta (2-10 yıl)</option>
                    <option value={EXPERIENCE_LEVELS.EXPERT}>İleri (10+ yıl)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Uzmanlık Alanı</label>
                  <select
                    value={profileData.specialization || ''}
                    onChange={(e) => setProfileData(prev => ({ ...prev, specialization: e.target.value as any }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#146448] bg-white"
                  >
                    <option value="">Uzmanlık alanı seçin</option>
                    <option value={SPECIALIZATIONS.GREENHOUSE}>Sera Tarımı</option>
                    <option value={SPECIALIZATIONS.HYDROPONICS}>Hidroponik</option>
                    <option value={SPECIALIZATIONS.ORGANIC}>Organik Tarım</option>
                    <option value={SPECIALIZATIONS.PRECISION_FARMING}>Hassas Tarım</option>
                    <option value={SPECIALIZATIONS.OTHER}>Diğer</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Şirket/Çiftlik Adı</label>
                  <input
                    type="text"
                    value={profileData.company_name || ''}
                    onChange={(e) => setProfileData(prev => ({ ...prev, company_name: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#146448] bg-white"
                    placeholder="Şirket veya çiftlik adınız (opsiyonel)"
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={handleSaveProfile}
                  disabled={saving === 'profile'}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  {saving === 'profile' ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Kaydediliyor...
                    </>
                  ) : (
                    'Profil Bilgilerini Kaydet'
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Location Tab */}
          {activeTab === 'location' && (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">📍 Konum & İşletme Bilgileri</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Şehir</label>
                  <input
                    type="text"
                    value={profileData.location?.city || ''}
                    onChange={(e) => setProfileData(prev => ({ 
                      ...prev, 
                      location: { ...prev.location, city: e.target.value }
                    }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#146448] bg-white"
                    placeholder="Şehriniz"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">İlçe</label>
                  <input
                    type="text"
                    value={profileData.location?.district || ''}
                    onChange={(e) => setProfileData(prev => ({ 
                      ...prev, 
                      location: { ...prev.location, district: e.target.value }
                    }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#146448] bg-white"
                    placeholder="İlçeniz"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Bölge</label>
                  <select
                    value={profileData.location?.region || ''}
                    onChange={(e) => setProfileData(prev => ({ 
                      ...prev, 
                      location: { ...prev.location, region: e.target.value }
                    }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#146448] bg-white"
                  >
                    <option value="">Coğrafi bölge seçin</option>
                    <option value="marmara">Marmara Bölgesi</option>
                    <option value="ege">Ege Bölgesi</option>
                    <option value="akdeniz">Akdeniz Bölgesi</option>
                    <option value="ic_anadolu">İç Anadolu Bölgesi</option>
                    <option value="karadeniz">Karadeniz Bölgesi</option>
                    <option value="dogu_anadolu">Doğu Anadolu Bölgesi</option>
                    <option value="guneydogu_anadolu">Güneydoğu Anadolu Bölgesi</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Dil</label>
                  <select
                    value={profileData.language || ''}
                    onChange={(e) => setProfileData(prev => ({ ...prev, language: e.target.value as any }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#146448] bg-white"
                  >
                    <option value="tr">Türkçe</option>
                    <option value="en">English</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Para Birimi</label>
                  <select
                    value={profileData.currency || ''}
                    onChange={(e) => setProfileData(prev => ({ ...prev, currency: e.target.value as any }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#146448] bg-white"
                  >
                    <option value="TRY">Türk Lirası (₺)</option>
                    <option value="USD">US Dollar ($)</option>
                    <option value="EUR">Euro (€)</option>
                  </select>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={handleSaveProfile}
                  disabled={saving === 'profile'}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  {saving === 'profile' ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Kaydediliyor...
                    </>
                  ) : (
                    'Konum Bilgilerini Kaydet'
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Preferences Tab */}
          {activeTab === 'preferences' && (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">⚙️ Uygulama Tercihleri</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Görünüm</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Tema</label>
                      <select
                        value={preferencesData.theme || 'light'}
                        onChange={(e) => setPreferencesData(prev => ({ ...prev, theme: e.target.value as any }))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#146448] bg-white"
                      >
                        <option value="light">Açık Tema</option>
                        <option value="dark">Koyu Tema</option>
                        <option value="auto">Otomatik</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Dashboard Düzeni</label>
                      <select
                        value={preferencesData.dashboard_layout || 'default'}
                        onChange={(e) => setPreferencesData(prev => ({ ...prev, dashboard_layout: e.target.value as any }))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#146448] bg-white"
                      >
                        <option value="default">Varsayılan</option>
                        <option value="compact">Kompakt</option>
                        <option value="detailed">Detaylı</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Rapor Ayarları</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Varsayılan Para Birimi</label>
                      <select
                        value={preferencesData.default_currency || 'TRY'}
                        onChange={(e) => setPreferencesData(prev => ({ ...prev, default_currency: e.target.value as any }))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#146448] bg-white"
                      >
                        <option value="TRY">Türk Lirası (₺)</option>
                        <option value="USD">US Dollar ($)</option>
                        <option value="EUR">Euro (€)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Ölçü Birimi</label>
                      <select
                        value={preferencesData.default_units || 'metric'}
                        onChange={(e) => setPreferencesData(prev => ({ ...prev, default_units: e.target.value as any }))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#146448] bg-white"
                      >
                        <option value="metric">Metrik</option>
                        <option value="imperial">Imperial</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">PDF Şablonu</label>
                      <select
                        value={preferencesData.pdf_template || 'standard'}
                        onChange={(e) => setPreferencesData(prev => ({ ...prev, pdf_template: e.target.value as any }))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#146448] bg-white"
                      >
                        <option value="standard">Standart</option>
                        <option value="detailed">Detaylı</option>
                        <option value="minimal">Minimal</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between">
                  <button
                    onClick={handleResetPreferences}
                    disabled={saving === 'reset'}
                    className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                  >
                    {saving === 'reset' ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Sıfırlanıyor...
                      </>
                    ) : (
                      'Varsayılana Sıfırla'
                    )}
                  </button>

                  <button
                    onClick={handleSavePreferences}
                    disabled={saving === 'preferences'}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                  >
                    {saving === 'preferences' ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Kaydediliyor...
                      </>
                    ) : (
                      'Tercihleri Kaydet'
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">🔔 Bildirim Ayarları</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Bildirim Kanalları</h3>
                  <div className="space-y-4">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={preferencesData.email_notifications ?? true}
                        onChange={(e) => setPreferencesData(prev => ({ ...prev, email_notifications: e.target.checked }))}
                        className="mr-3 h-4 w-4 text-blue-600 border-gray-300 rounded"
                      />
                      <span className="text-sm text-gray-700">E-posta bildirimleri</span>
                    </label>

                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={preferencesData.push_notifications ?? false}
                        onChange={(e) => setPreferencesData(prev => ({ ...prev, push_notifications: e.target.checked }))}
                        className="mr-3 h-4 w-4 text-blue-600 border-gray-300 rounded"
                      />
                      <span className="text-sm text-gray-700">Tarayıcı bildirimleri</span>
                    </label>

                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={preferencesData.sms_notifications ?? false}
                        onChange={(e) => setPreferencesData(prev => ({ ...prev, sms_notifications: e.target.checked }))}
                        className="mr-3 h-4 w-4 text-blue-600 border-gray-300 rounded"
                      />
                      <span className="text-sm text-gray-700">SMS bildirimleri</span>
                    </label>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Bildirim Türleri</h3>
                  <div className="space-y-4">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={preferencesData.analysis_completed ?? true}
                        onChange={(e) => setPreferencesData(prev => ({ ...prev, analysis_completed: e.target.checked }))}
                        className="mr-3 h-4 w-4 text-blue-600 border-gray-300 rounded"
                      />
                      <span className="text-sm text-gray-700">Analiz tamamlandığında</span>
                    </label>

                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={preferencesData.price_alerts ?? false}
                        onChange={(e) => setPreferencesData(prev => ({ ...prev, price_alerts: e.target.checked }))}
                        className="mr-3 h-4 w-4 text-blue-600 border-gray-300 rounded"
                      />
                      <span className="text-sm text-gray-700">Fiyat uyarıları</span>
                    </label>

                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={preferencesData.weather_alerts ?? true}
                        onChange={(e) => setPreferencesData(prev => ({ ...prev, weather_alerts: e.target.checked }))}
                        className="mr-3 h-4 w-4 text-blue-600 border-gray-300 rounded"
                      />
                      <span className="text-sm text-gray-700">Hava durumu uyarıları</span>
                    </label>

                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={preferencesData.system_updates ?? true}
                        onChange={(e) => setPreferencesData(prev => ({ ...prev, system_updates: e.target.checked }))}
                        className="mr-3 h-4 w-4 text-blue-600 border-gray-300 rounded"
                      />
                      <span className="text-sm text-gray-700">Sistem güncellemeleri</span>
                    </label>

                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={preferencesData.marketing_emails ?? false}
                        onChange={(e) => setPreferencesData(prev => ({ ...prev, marketing_emails: e.target.checked }))}
                        className="mr-3 h-4 w-4 text-blue-600 border-gray-300 rounded"
                      />
                      <span className="text-sm text-gray-700">Pazarlama e-postaları</span>
                    </label>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={handleSavePreferences}
                    disabled={saving === 'preferences'}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                  >
                    {saving === 'preferences' ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Kaydediliyor...
                      </>
                    ) : (
                      'Bildirim Ayarlarını Kaydet'
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">🔒 Güvenlik Ayarları</h2>
              
              <div className="space-y-6">
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h3 className="font-medium text-blue-900 mb-2">E-posta Değişikliği</h3>
                  <p className="text-sm text-blue-800 mb-3">
                    E-posta adresinizi değiştirmek için destek ekibiyle iletişime geçin.
                  </p>
                  <a 
                    href="mailto:destek@seragpt.com" 
                    className="text-blue-600 hover:text-blue-500 text-sm font-medium"
                  >
                    destek@seragpt.com
                  </a>
                </div>

                <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <h3 className="font-medium text-yellow-900 mb-2">Şifre Değişikliği</h3>
                  <p className="text-sm text-yellow-800 mb-3">
                    Şifrenizi değiştirmek için çıkış yapıp giriş sayfasında "Şifremi Unuttum" seçeneğini kullanın.
                  </p>
                  <a 
                    href="/auth/login" 
                    className="text-yellow-600 hover:text-yellow-500 text-sm font-medium"
                  >
                    Giriş Sayfasına Git
                  </a>
                </div>

                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <h3 className="font-medium text-green-900 mb-2">Hesap Güvenliği</h3>
                  <p className="text-sm text-green-800">
                    Hesabınız güvenli bağlantı (HTTPS) ile korunmaktadır. 
                    Tüm verileriniz şifreli olarak saklanır.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Data Management Tab */}
          {activeTab === 'data' && (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">💾 Veri Yönetimi</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Veri Dışa Aktarma</h3>
                  <p className="text-gray-600 mb-4">
                    Tüm kişisel verilerinizi JSON formatında indirebilirsiniz.
                  </p>
                  <button
                    onClick={handleExportData}
                    className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    📥 Verilerimi İndir
                  </button>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Gizlilik Tercihleri</h3>
                  <div className="space-y-4">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={preferencesData.data_sharing_consent ?? false}
                        onChange={(e) => setPreferencesData(prev => ({ ...prev, data_sharing_consent: e.target.checked }))}
                        className="mr-3 h-4 w-4 text-blue-600 border-gray-300 rounded"
                      />
                      <span className="text-sm text-gray-700">
                        Anonim veri paylaşımına izin veriyorum (araştırma amaçlı)
                      </span>
                    </label>

                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={preferencesData.analytics_consent ?? true}
                        onChange={(e) => setPreferencesData(prev => ({ ...prev, analytics_consent: e.target.checked }))}
                        className="mr-3 h-4 w-4 text-blue-600 border-gray-300 rounded"
                      />
                      <span className="text-sm text-gray-700">
                        Kullanım analitiklerine izin veriyorum (hizmet iyileştirme amaçlı)
                      </span>
                    </label>
                  </div>
                  
                  <button
                    onClick={handleSavePreferences}
                    disabled={saving === 'preferences'}
                    className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Gizlilik Tercihlerini Kaydet
                  </button>
                </div>

                <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                  <h3 className="font-medium text-red-900 mb-2">Hesap Silme</h3>
                  <p className="text-sm text-red-800 mb-3">
                    Hesabınızı kalıcı olarak silmek istiyorsanız destek ekibiyle iletişime geçin. 
                    Bu işlem geri alınamaz.
                  </p>
                  <a 
                    href="mailto:destek@seragpt.com?subject=Hesap Silme Talebi" 
                    className="text-red-600 hover:text-red-500 text-sm font-medium"
                  >
                    Hesap Silme Talebi Gönder
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
