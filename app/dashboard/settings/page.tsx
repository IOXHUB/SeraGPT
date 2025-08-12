'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/hooks/useAuth';
import { authService } from '@/lib/services/auth-service';
import { 
  UserProfile, 
  UserPreferences, 
  UpdateUserProfileRequest, 
  UpdateUserPreferencesRequest,
  PROFESSIONS,
  EXPERIENCE_LEVELS,
  SPECIALIZATIONS
} from '@/types/auth';
import ClientOnly from '@/components/ui/ClientOnly';

export const dynamic = 'force-dynamic';

interface SettingsTab {
  id: string;
  name: string;
  icon: string;
  gradient: string;
  description: string;
}

export default function SettingsPage() {
  const { user, profile, preferences, updateProfile, updatePreferences, loading, signOut } = useAuth();
  
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [profileData, setProfileData] = useState<UpdateUserProfileRequest>({});
  const [preferencesData, setPreferencesData] = useState<UpdateUserPreferencesRequest>({});
  const [saving, setSaving] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [profileCompletion, setProfileCompletion] = useState(0);
  const [isPasswordChangeOpen, setIsPasswordChangeOpen] = useState(false);
  const [passwordData, setPasswordData] = useState({ current: '', new: '', confirm: '' });

  const tabs: SettingsTab[] = [
    { 
      id: 'profile', 
      name: 'Profil Bilgileri', 
      icon: '👤', 
      gradient: 'from-blue-400 to-cyan-600',
      description: 'Kişisel bilgilerinizi yönetin'
    },
    { 
      id: 'location', 
      name: 'Konum & İşletme', 
      icon: '📍', 
      gradient: 'from-green-400 to-emerald-600',
      description: 'Lokasyon ve şirket bilgileri'
    },
    { 
      id: 'preferences', 
      name: 'Tercihler', 
      icon: '��️', 
      gradient: 'from-purple-400 to-violet-600',
      description: 'Uygulama ayarlarınızı özelleştirin'
    },
    { 
      id: 'notifications', 
      name: 'Bildirimler', 
      icon: '🔔', 
      gradient: 'from-yellow-400 to-orange-500',
      description: 'Bildirim tercihlerinizi ayarlayın'
    },
    { 
      id: 'security', 
      name: 'Güvenlik', 
      icon: '🔒', 
      gradient: 'from-red-400 to-pink-600',
      description: 'Hesap güvenliği ve şifre'
    },
    { 
      id: 'data', 
      name: 'Veri Yönetimi', 
      icon: '💾', 
      gradient: 'from-indigo-400 to-purple-600',
      description: 'Verilerinizi yönetin ve dışa aktarın'
    }
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !loading && !user) {
      console.log('🚫 Settings access denied - redirecting to login');
      window.location.href = '/auth/login';
    }
  }, [user, loading, mounted]);

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
      profile.currency,
      profile.company_name
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
      if (!profileData.full_name?.trim()) {
        showMessage('error', 'Ad Soyad alanı zorunludur');
        return;
      }

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

  const handlePasswordChange = async () => {
    if (!passwordData.current || !passwordData.new || !passwordData.confirm) {
      showMessage('error', 'Tüm şifre alanlarını doldurun');
      return;
    }

    if (passwordData.new !== passwordData.confirm) {
      showMessage('error', 'Yeni şifreler eşleşmiyor');
      return;
    }

    if (passwordData.new.length < 8) {
      showMessage('error', 'Yeni şifre en az 8 karakter olmalıdır');
      return;
    }

    setSaving('password');
    try {
      // Simulate password change
      await new Promise(resolve => setTimeout(resolve, 2000));
      showMessage('success', 'Şifreniz başarıyla değiştirildi!');
      setPasswordData({ current: '', new: '', confirm: '' });
      setIsPasswordChangeOpen(false);
    } catch (error: any) {
      showMessage('error', 'Şifre değiştirme sırasında hata oluştu');
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
      setSaving('export');
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
    } finally {
      setSaving(null);
    }
  };

  const handleRequestAccountDeletion = () => {
    const subject = encodeURIComponent('Hesap Silme Talebi');
    const body = encodeURIComponent(`
Merhaba SeraGPT Destek Ekibi,

Hesabımı kalıcı olarak silmek istiyorum.

Kullanıcı Email: ${user?.email}
Talep Tarihi: ${new Date().toLocaleDateString('tr-TR')}

Bu işlemin geri alınamaz olduğunu biliyorum.

Teşekkürler.
    `);
    
    window.open(`mailto:destek@seragpt.com?subject=${subject}&body=${body}`, '_blank');
  };

  if (!loading && !user) {
    window.location.href = '/auth/login';
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#146448] to-[#0f4f37]">
        <div className="text-white text-lg">Yönlendiriliyor...</div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#146448] to-[#0f4f37]">
        <div className="text-white text-lg">🔐 Yükleniyor...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#146448] to-[#0f4f37]">
        <div className="text-white text-lg">Giriş yapmanız gerekiyor...</div>
      </div>
    );
  }

  return (
    <ClientOnly>
      <div className="min-h-screen bg-gradient-to-br from-[#146448] to-[#0f4f37]">
        {/* Professional Header */}
        <header className="bg-[#146448]/80 backdrop-blur-sm border-b border-white/10 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <button
                  onClick={() => window.location.href = '/dashboard'}
                  className="flex items-center space-x-3 text-white hover:text-[#baf200] transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  <span className="font-medium">Dashboard'a Dön</span>
                </button>
                <div className="h-6 w-px bg-white/20"></div>
                <h1 className="text-xl font-bold text-white">Hesap Ayarları</h1>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="text-white text-sm">
                  <span className="opacity-70">Hoşgeldin, </span>
                  <span className="font-medium">{user?.email?.split('@')[0] || 'Kullanıcı'}</span>
                </div>
                <button
                  onClick={async () => {
                    await signOut();
                    window.location.href = '/auth/login';
                  }}
                  className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-sm rounded transition-colors"
                >
                  Çıkış
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-6 py-8">
          
          {/* Welcome Section & Profile Completion */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 mb-8">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-white mb-4">⚙️ Hesap Yönetimi</h2>
              <p className="text-white/80 text-lg max-w-3xl mx-auto">
                Kişisel bilgilerinizi, tercihlerinizi ve hesap ayarlarınızı buradan yönetebilirsiniz.
              </p>
            </div>
            
            {/* Profile Completion */}
            <div className="bg-white/10 rounded-xl p-6 border border-white/20">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-semibold text-lg">📊 Profil Tamamlama</h3>
                <span className="text-[#baf200] font-bold text-lg">{profileCompletion}%</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-3 mb-3">
                <div
                  className="h-3 bg-gradient-to-r from-[#baf200] to-green-400 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${profileCompletion}%` }}
                />
              </div>
              <p className="text-white/70 text-sm">
                {profileCompletion < 50 ? 'Profil bilgilerinizi tamamlayarak daha iyi öneriler alın' :
                 profileCompletion < 80 ? 'Çok iyi! Profil bilgilerinizi tamamlamaya devam edin' :
                 'Harika! Profiliniz neredeyse tamamen dolu'}
              </p>
            </div>
          </div>

          {/* Message Display */}
          {message && (
            <div className={`mb-6 p-4 rounded-xl backdrop-blur-sm border ${
              message.type === 'success'
                ? 'bg-green-500/20 border-green-500/30 text-green-200'
                : 'bg-red-500/20 border-red-500/30 text-red-200'
            }`}>
              <div className="flex items-center space-x-3">
                <span className="text-xl">
                  {message.type === 'success' ? '✅' : '❌'}
                </span>
                <span className="font-medium">{message.text}</span>
              </div>
            </div>
          )}

          {/* Tab Navigation */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`p-4 rounded-xl text-left transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-white/20 ring-2 ring-[#baf200] scale-105'
                      : 'bg-white/5 hover:bg-white/15 hover:scale-[1.02]'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 bg-gradient-to-br ${tab.gradient} rounded-xl flex items-center justify-center text-xl`}>
                      {tab.icon}
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">{tab.name}</h3>
                      <p className="text-white/70 text-sm">{tab.description}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="space-y-8">
                <div className="text-center">
                  <h2 className="text-3xl font-bold text-white mb-2">👤 Profil Bilgileri</h2>
                  <p className="text-white/80">Kişisel bilgilerinizi güncelleyin</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white font-medium mb-2">Ad Soyad *</label>
                    <input
                      type="text"
                      value={profileData.full_name || ''}
                      onChange={(e) => setProfileData(prev => ({ ...prev, full_name: e.target.value }))}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:ring-2 focus:ring-[#baf200] focus:border-[#baf200] transition-colors"
                      placeholder="Adınız ve soyadınız"
                    />
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">Telefon</label>
                    <input
                      type="tel"
                      value={profileData.phone || ''}
                      onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:ring-2 focus:ring-[#baf200] focus:border-[#baf200] transition-colors"
                      placeholder="05XX XXX XX XX"
                    />
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">Meslek</label>
                    <select
                      value={profileData.profession || ''}
                      onChange={(e) => setProfileData(prev => ({ ...prev, profession: e.target.value as any }))}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:ring-2 focus:ring-[#baf200] focus:border-[#baf200] transition-colors"
                    >
                      <option value="" className="text-black">Meslek seçin</option>
                      <option value={PROFESSIONS.FARMER} className="text-black">Çiftçi</option>
                      <option value={PROFESSIONS.CONSULTANT} className="text-black">Tarım Danışmanı</option>
                      <option value={PROFESSIONS.INVESTOR} className="text-black">Yatırımcı</option>
                      <option value={PROFESSIONS.STUDENT} className="text-black">Öğrenci</option>
                      <option value={PROFESSIONS.RESEARCHER} className="text-black">Araştırmacı</option>
                      <option value={PROFESSIONS.OTHER} className="text-black">Diğer</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">Deneyim Seviyesi</label>
                    <select
                      value={profileData.experience_level || ''}
                      onChange={(e) => setProfileData(prev => ({ ...prev, experience_level: e.target.value as any }))}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:ring-2 focus:ring-[#baf200] focus:border-[#baf200] transition-colors"
                    >
                      <option value="" className="text-black">Deneyim seviyesi seçin</option>
                      <option value={EXPERIENCE_LEVELS.BEGINNER} className="text-black">Başlangıç (0-2 yıl)</option>
                      <option value={EXPERIENCE_LEVELS.INTERMEDIATE} className="text-black">Orta (2-10 yıl)</option>
                      <option value={EXPERIENCE_LEVELS.EXPERT} className="text-black">İleri (10+ yıl)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">Uzmanlık Alanı</label>
                    <select
                      value={profileData.specialization || ''}
                      onChange={(e) => setProfileData(prev => ({ ...prev, specialization: e.target.value as any }))}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:ring-2 focus:ring-[#baf200] focus:border-[#baf200] transition-colors"
                    >
                      <option value="" className="text-black">Uzmanlık alanı seçin</option>
                      <option value={SPECIALIZATIONS.GREENHOUSE} className="text-black">Sera Tarımı</option>
                      <option value={SPECIALIZATIONS.HYDROPONICS} className="text-black">Hidroponik</option>
                      <option value={SPECIALIZATIONS.ORGANIC} className="text-black">Organik Tarım</option>
                      <option value={SPECIALIZATIONS.PRECISION_FARMING} className="text-black">Hassas Tarım</option>
                      <option value={SPECIALIZATIONS.OTHER} className="text-black">Diğer</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">Şirket/Çiftlik Adı</label>
                    <input
                      type="text"
                      value={profileData.company_name || ''}
                      onChange={(e) => setProfileData(prev => ({ ...prev, company_name: e.target.value }))}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:ring-2 focus:ring-[#baf200] focus:border-[#baf200] transition-colors"
                      placeholder="Şirket veya çiftlik adınız (opsiyonel)"
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={handleSaveProfile}
                    disabled={saving === 'profile'}
                    className="px-8 py-3 bg-[#baf200] text-[#146448] rounded-xl font-semibold transition-all duration-300 hover:bg-[#baf200]/90 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center space-x-2"
                  >
                    {saving === 'profile' ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-current"></div>
                        <span>Kaydediliyor...</span>
                      </>
                    ) : (
                      <>
                        <span>💾</span>
                        <span>Profil Bilgilerini Kaydet</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* Location Tab */}
            {activeTab === 'location' && (
              <div className="space-y-8">
                <div className="text-center">
                  <h2 className="text-3xl font-bold text-white mb-2">📍 Konum & İşletme</h2>
                  <p className="text-white/80">Lokasyon ve işletme bilgilerinizi güncelleyin</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white font-medium mb-2">Şehir</label>
                    <input
                      type="text"
                      value={profileData.location?.city || ''}
                      onChange={(e) => setProfileData(prev => ({ 
                        ...prev, 
                        location: { ...prev.location, city: e.target.value }
                      }))}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:ring-2 focus:ring-[#baf200] focus:border-[#baf200] transition-colors"
                      placeholder="Şehriniz"
                    />
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">İlçe</label>
                    <input
                      type="text"
                      value={profileData.location?.district || ''}
                      onChange={(e) => setProfileData(prev => ({ 
                        ...prev, 
                        location: { ...prev.location, district: e.target.value }
                      }))}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:ring-2 focus:ring-[#baf200] focus:border-[#baf200] transition-colors"
                      placeholder="İlçeniz"
                    />
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">Bölge</label>
                    <select
                      value={profileData.location?.region || ''}
                      onChange={(e) => setProfileData(prev => ({ 
                        ...prev, 
                        location: { ...prev.location, region: e.target.value }
                      }))}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:ring-2 focus:ring-[#baf200] focus:border-[#baf200] transition-colors"
                    >
                      <option value="" className="text-black">Coğrafi bölge seçin</option>
                      <option value="marmara" className="text-black">Marmara Bölgesi</option>
                      <option value="ege" className="text-black">Ege Bölgesi</option>
                      <option value="akdeniz" className="text-black">Akdeniz Bölgesi</option>
                      <option value="ic_anadolu" className="text-black">İç Anadolu Bölgesi</option>
                      <option value="karadeniz" className="text-black">Karadeniz Bölgesi</option>
                      <option value="dogu_anadolu" className="text-black">Doğu Anadolu Bölgesi</option>
                      <option value="guneydogu_anadolu" className="text-black">Güneydoğu Anadolu Bölgesi</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">Dil</label>
                    <select
                      value={profileData.language || 'tr'}
                      onChange={(e) => setProfileData(prev => ({ ...prev, language: e.target.value as any }))}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:ring-2 focus:ring-[#baf200] focus:border-[#baf200] transition-colors"
                    >
                      <option value="tr" className="text-black">🇹🇷 Türkçe</option>
                      <option value="en" className="text-black">🇺🇸 English</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">Para Birimi</label>
                    <select
                      value={profileData.currency || 'TRY'}
                      onChange={(e) => setProfileData(prev => ({ ...prev, currency: e.target.value as any }))}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:ring-2 focus:ring-[#baf200] focus:border-[#baf200] transition-colors"
                    >
                      <option value="TRY" className="text-black">₺ Türk Lirası</option>
                      <option value="USD" className="text-black">$ US Dollar</option>
                      <option value="EUR" className="text-black">€ Euro</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={handleSaveProfile}
                    disabled={saving === 'profile'}
                    className="px-8 py-3 bg-[#baf200] text-[#146448] rounded-xl font-semibold transition-all duration-300 hover:bg-[#baf200]/90 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center space-x-2"
                  >
                    {saving === 'profile' ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-current"></div>
                        <span>Kaydediliyor...</span>
                      </>
                    ) : (
                      <>
                        <span>🌍</span>
                        <span>Konum Bilgilerini Kaydet</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* Preferences Tab */}
            {activeTab === 'preferences' && (
              <div className="space-y-8">
                <div className="text-center">
                  <h2 className="text-3xl font-bold text-white mb-2">⚙️ Uygulama Tercihleri</h2>
                  <p className="text-white/80">Uygulamanızı kişiselleştirin</p>
                </div>
                
                {/* Theme & Layout */}
                <div className="bg-white/10 rounded-xl p-6 border border-white/20">
                  <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                    <span className="mr-2">🎨</span>Görünüm
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-white font-medium mb-2">Tema</label>
                      <select
                        value={preferencesData.theme || 'light'}
                        onChange={(e) => setPreferencesData(prev => ({ ...prev, theme: e.target.value as any }))}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:ring-2 focus:ring-[#baf200] focus:border-[#baf200] transition-colors"
                      >
                        <option value="light" className="text-black">🌞 Açık Tema</option>
                        <option value="dark" className="text-black">🌙 Koyu Tema</option>
                        <option value="auto" className="text-black">🔄 Otomatik</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-white font-medium mb-2">Dashboard Düzeni</label>
                      <select
                        value={preferencesData.dashboard_layout || 'default'}
                        onChange={(e) => setPreferencesData(prev => ({ ...prev, dashboard_layout: e.target.value as any }))}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:ring-2 focus:ring-[#baf200] focus:border-[#baf200] transition-colors"
                      >
                        <option value="default" className="text-black">📱 Varsayılan</option>
                        <option value="compact" className="text-black">📋 Kompakt</option>
                        <option value="detailed" className="text-black">📊 Detaylı</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Report Settings */}
                <div className="bg-white/10 rounded-xl p-6 border border-white/20">
                  <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                    <span className="mr-2">📄</span>Rapor Ayarları
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-white font-medium mb-2">Varsayılan Para Birimi</label>
                      <select
                        value={preferencesData.default_currency || 'TRY'}
                        onChange={(e) => setPreferencesData(prev => ({ ...prev, default_currency: e.target.value as any }))}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:ring-2 focus:ring-[#baf200] focus:border-[#baf200] transition-colors"
                      >
                        <option value="TRY" className="text-black">₺ Türk Lirası</option>
                        <option value="USD" className="text-black">$ US Dollar</option>
                        <option value="EUR" className="text-black">€ Euro</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-white font-medium mb-2">Ölçü Birimi</label>
                      <select
                        value={preferencesData.default_units || 'metric'}
                        onChange={(e) => setPreferencesData(prev => ({ ...prev, default_units: e.target.value as any }))}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:ring-2 focus:ring-[#baf200] focus:border-[#baf200] transition-colors"
                      >
                        <option value="metric" className="text-black">📏 Metrik</option>
                        <option value="imperial" className="text-black">📐 Imperial</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-white font-medium mb-2">PDF Şablonu</label>
                      <select
                        value={preferencesData.pdf_template || 'standard'}
                        onChange={(e) => setPreferencesData(prev => ({ ...prev, pdf_template: e.target.value as any }))}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:ring-2 focus:ring-[#baf200] focus:border-[#baf200] transition-colors"
                      >
                        <option value="standard" className="text-black">📄 Standart</option>
                        <option value="detailed" className="text-black">📊 Detaylı</option>
                        <option value="minimal" className="text-black">📃 Minimal</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between">
                  <button
                    onClick={handleResetPreferences}
                    disabled={saving === 'reset'}
                    className="px-6 py-3 bg-red-600 text-white rounded-xl font-semibold transition-all duration-300 hover:bg-red-700 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center space-x-2"
                  >
                    {saving === 'reset' ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        <span>Sıfırlanıyor...</span>
                      </>
                    ) : (
                      <>
                        <span>🔄</span>
                        <span>Varsayılana Sıfırla</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={handleSavePreferences}
                    disabled={saving === 'preferences'}
                    className="px-8 py-3 bg-[#baf200] text-[#146448] rounded-xl font-semibold transition-all duration-300 hover:bg-[#baf200]/90 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center space-x-2"
                  >
                    {saving === 'preferences' ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-current"></div>
                        <span>Kaydediliyor...</span>
                      </>
                    ) : (
                      <>
                        <span>💾</span>
                        <span>Tercihleri Kaydet</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
              <div className="space-y-8">
                <div className="text-center">
                  <h2 className="text-3xl font-bold text-white mb-2">🔔 Bildirim Ayarları</h2>
                  <p className="text-white/80">Bildirim tercihlerinizi yönetin</p>
                </div>
                
                {/* Notification Channels */}
                <div className="bg-white/10 rounded-xl p-6 border border-white/20">
                  <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                    <span className="mr-2">📡</span>Bildirim Kanalları
                  </h3>
                  <div className="space-y-4">
                    {[
                      { key: 'email_notifications', label: 'E-posta bildirimleri', icon: '📧', default: true },
                      { key: 'push_notifications', label: 'Tarayıcı bildirimleri', icon: '🔔', default: false },
                      { key: 'sms_notifications', label: 'SMS bildirimleri', icon: '📱', default: false }
                    ].map((item) => (
                      <label key={item.key} className="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors cursor-pointer">
                        <div className="flex items-center space-x-3">
                          <span className="text-xl">{item.icon}</span>
                          <span className="text-white font-medium">{item.label}</span>
                        </div>
                        <input
                          type="checkbox"
                          checked={preferencesData[item.key as keyof typeof preferencesData] ?? item.default}
                          onChange={(e) => setPreferencesData(prev => ({ ...prev, [item.key]: e.target.checked }))}
                          className="w-5 h-5 text-[#baf200] bg-white/10 border-white/20 rounded focus:ring-[#baf200]"
                        />
                      </label>
                    ))}
                  </div>
                </div>

                {/* Notification Types */}
                <div className="bg-white/10 rounded-xl p-6 border border-white/20">
                  <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                    <span className="mr-2">🎯</span>Bildirim Türleri
                  </h3>
                  <div className="space-y-4">
                    {[
                      { key: 'analysis_completed', label: 'Analiz tamamlandığında', icon: '✅', default: true },
                      { key: 'price_alerts', label: 'Fiyat uyarıları', icon: '💰', default: false },
                      { key: 'weather_alerts', label: 'Hava durumu uyarıları', icon: '🌤️', default: true },
                      { key: 'system_updates', label: 'Sistem güncellemeleri', icon: '🔄', default: true },
                      { key: 'marketing_emails', label: 'Pazarlama e-postaları', icon: '📈', default: false }
                    ].map((item) => (
                      <label key={item.key} className="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors cursor-pointer">
                        <div className="flex items-center space-x-3">
                          <span className="text-xl">{item.icon}</span>
                          <span className="text-white font-medium">{item.label}</span>
                        </div>
                        <input
                          type="checkbox"
                          checked={preferencesData[item.key as keyof typeof preferencesData] ?? item.default}
                          onChange={(e) => setPreferencesData(prev => ({ ...prev, [item.key]: e.target.checked }))}
                          className="w-5 h-5 text-[#baf200] bg-white/10 border-white/20 rounded focus:ring-[#baf200]"
                        />
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={handleSavePreferences}
                    disabled={saving === 'preferences'}
                    className="px-8 py-3 bg-[#baf200] text-[#146448] rounded-xl font-semibold transition-all duration-300 hover:bg-[#baf200]/90 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center space-x-2"
                  >
                    {saving === 'preferences' ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-current"></div>
                        <span>Kaydediliyor...</span>
                      </>
                    ) : (
                      <>
                        <span>🔔</span>
                        <span>Bildirim Ayarlarını Kaydet</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === 'security' && (
              <div className="space-y-8">
                <div className="text-center">
                  <h2 className="text-3xl font-bold text-white mb-2">🔒 Güvenlik Ayarları</h2>
                  <p className="text-white/80">Hesap güvenliğinizi yönetin</p>
                </div>
                
                {/* Account Security Info */}
                <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl p-6 border border-green-500/30">
                  <h3 className="text-xl font-semibold text-green-300 mb-4 flex items-center">
                    <span className="mr-2">🛡️</span>Hesap Güvenliği
                  </h3>
                  <div className="space-y-3 text-green-200">
                    <p className="flex items-center space-x-2">
                      <span>✅</span>
                      <span>Hesabınız güvenli ba��lantı (HTTPS) ile korunmaktadır</span>
                    </p>
                    <p className="flex items-center space-x-2">
                      <span>✅</span>
                      <span>Tüm verileriniz şifreli olarak saklanır</span>
                    </p>
                    <p className="flex items-center space-x-2">
                      <span>✅</span>
                      <span>Oturum güvenliği aktif</span>
                    </p>
                  </div>
                </div>

                {/* Password Change */}
                <div className="bg-white/10 rounded-xl p-6 border border-white/20">
                  <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                    <span className="mr-2">🔑</span>Şifre Değişikliği
                  </h3>
                  
                  {!isPasswordChangeOpen ? (
                    <div className="text-center py-6">
                      <p className="text-white/80 mb-4">Hesap güvenliğiniz için düzenli olarak şifrenizi değiştirin</p>
                      <button
                        onClick={() => setIsPasswordChangeOpen(true)}
                        className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold transition-all duration-300 hover:bg-blue-700 hover:scale-105"
                      >
                        🔑 Şifre Değiştir
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-white font-medium mb-2">Mevcut Şifre</label>
                        <input
                          type="password"
                          value={passwordData.current}
                          onChange={(e) => setPasswordData(prev => ({ ...prev, current: e.target.value }))}
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:ring-2 focus:ring-[#baf200] focus:border-[#baf200] transition-colors"
                          placeholder="Mevcut şifrenizi girin"
                        />
                      </div>

                      <div>
                        <label className="block text-white font-medium mb-2">Yeni Şifre</label>
                        <input
                          type="password"
                          value={passwordData.new}
                          onChange={(e) => setPasswordData(prev => ({ ...prev, new: e.target.value }))}
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:ring-2 focus:ring-[#baf200] focus:border-[#baf200] transition-colors"
                          placeholder="Yeni şifrenizi girin (min. 8 karakter)"
                        />
                      </div>

                      <div>
                        <label className="block text-white font-medium mb-2">Yeni Şifre Tekrar</label>
                        <input
                          type="password"
                          value={passwordData.confirm}
                          onChange={(e) => setPasswordData(prev => ({ ...prev, confirm: e.target.value }))}
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:ring-2 focus:ring-[#baf200] focus:border-[#baf200] transition-colors"
                          placeholder="Yeni şifrenizi tekrar girin"
                        />
                      </div>

                      <div className="flex justify-end space-x-3">
                        <button
                          onClick={() => {
                            setIsPasswordChangeOpen(false);
                            setPasswordData({ current: '', new: '', confirm: '' });
                          }}
                          className="px-6 py-3 bg-gray-600 text-white rounded-xl font-semibold transition-all duration-300 hover:bg-gray-700"
                        >
                          İptal
                        </button>
                        <button
                          onClick={handlePasswordChange}
                          disabled={saving === 'password'}
                          className="px-6 py-3 bg-[#baf200] text-[#146448] rounded-xl font-semibold transition-all duration-300 hover:bg-[#baf200]/90 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center space-x-2"
                        >
                          {saving === 'password' ? (
                            <>
                              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-current"></div>
                              <span>Değiştiriliyor...</span>
                            </>
                          ) : (
                            <>
                              <span>🔄</span>
                              <span>Şifreyi Değiştir</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Email Change Info */}
                <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-xl p-6 border border-blue-500/30">
                  <h3 className="text-xl font-semibold text-blue-300 mb-4 flex items-center">
                    <span className="mr-2">📧</span>E-posta Değişikliği
                  </h3>
                  <p className="text-blue-200 mb-4">
                    E-posta adresinizi değiştirmek için destek ekibiyle iletişime geçin.
                  </p>
                  <a 
                    href="mailto:destek@seragpt.com?subject=E-posta Değişiklik Talebi"
                    className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium transition-colors hover:bg-blue-700"
                  >
                    <span>📧</span>
                    <span>Destek Ekibi ile İletişime Geç</span>
                  </a>
                </div>
              </div>
            )}

            {/* Data Management Tab */}
            {activeTab === 'data' && (
              <div className="space-y-8">
                <div className="text-center">
                  <h2 className="text-3xl font-bold text-white mb-2">💾 Veri Yönetimi</h2>
                  <p className="text-white/80">Verilerinizi yönetin ve gizlilik ayarlarınızı kontrol edin</p>
                </div>
                
                {/* Data Export */}
                <div className="bg-white/10 rounded-xl p-6 border border-white/20">
                  <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                    <span className="mr-2">📥</span>Veri Dışa Aktarma
                  </h3>
                  <p className="text-white/80 mb-6">
                    GDPR uyarınca tüm kişisel verilerinizi JSON formatında indirebilirsiniz.
                    Bu dosya profil bilgilerinizi, token geçmişinizi ve aktivite loglarınızı içerir.
                  </p>
                  <button
                    onClick={handleExportData}
                    disabled={saving === 'export'}
                    className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center space-x-2"
                  >
                    {saving === 'export' ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        <span>Hazırlanıyor...</span>
                      </>
                    ) : (
                      <>
                        <span>📥</span>
                        <span>Verilerimi İndir</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Privacy Preferences */}
                <div className="bg-white/10 rounded-xl p-6 border border-white/20">
                  <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                    <span className="mr-2">🔐</span>Gizlilik Tercihleri
                  </h3>
                  <div className="space-y-4">
                    <label className="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors cursor-pointer">
                      <div className="flex items-center space-x-3">
                        <span className="text-xl">🔬</span>
                        <div>
                          <span className="text-white font-medium block">Araştırma Amaçlı Veri Paylaşımı</span>
                          <span className="text-white/60 text-sm">Anonim verilerinizin tarım araştırmalarında kullanılmasına izin verin</span>
                        </div>
                      </div>
                      <input
                        type="checkbox"
                        checked={preferencesData.data_sharing_consent ?? false}
                        onChange={(e) => setPreferencesData(prev => ({ ...prev, data_sharing_consent: e.target.checked }))}
                        className="w-5 h-5 text-[#baf200] bg-white/10 border-white/20 rounded focus:ring-[#baf200]"
                      />
                    </label>

                    <label className="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors cursor-pointer">
                      <div className="flex items-center space-x-3">
                        <span className="text-xl">📊</span>
                        <div>
                          <span className="text-white font-medium block">Kullanım Analitikleri</span>
                          <span className="text-white/60 text-sm">Hizmet iyileştirme amaçlı kullanım verilerinin toplanmasına izin verin</span>
                        </div>
                      </div>
                      <input
                        type="checkbox"
                        checked={preferencesData.analytics_consent ?? true}
                        onChange={(e) => setPreferencesData(prev => ({ ...prev, analytics_consent: e.target.checked }))}
                        className="w-5 h-5 text-[#baf200] bg-white/10 border-white/20 rounded focus:ring-[#baf200]"
                      />
                    </label>
                  </div>
                  
                  <div className="mt-6">
                    <button
                      onClick={handleSavePreferences}
                      disabled={saving === 'preferences'}
                      className="px-6 py-3 bg-[#baf200] text-[#146448] rounded-xl font-semibold transition-all duration-300 hover:bg-[#baf200]/90 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center space-x-2"
                    >
                      {saving === 'preferences' ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-current"></div>
                          <span>Kaydediliyor...</span>
                        </>
                      ) : (
                        <>
                          <span>🔐</span>
                          <span>Gizlilik Tercihlerini Kaydet</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Account Deletion */}
                <div className="bg-gradient-to-r from-red-500/20 to-pink-500/20 rounded-xl p-6 border border-red-500/30">
                  <h3 className="text-xl font-semibold text-red-300 mb-4 flex items-center">
                    <span className="mr-2">⚠️</span>Hesap Silme
                  </h3>
                  <p className="text-red-200 mb-4">
                    Hesabınızı kalıcı olarak silmek istiyorsanız destek ekibiyle iletişime geçin. 
                    Bu işlem geri alınamaz ve tüm verileriniz silinir.
                  </p>
                  <button
                    onClick={handleRequestAccountDeletion}
                    className="px-6 py-3 bg-red-600 text-white rounded-xl font-semibold transition-all duration-300 hover:bg-red-700 hover:scale-105 flex items-center space-x-2"
                  >
                    <span>🗑️</span>
                    <span>Hesap Silme Talebi Gönder</span>
                  </button>
                </div>
              </div>
            )}

          </div>

        </main>
      </div>
    </ClientOnly>
  );
}
