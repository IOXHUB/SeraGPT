'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function KullaniciIslemleriPage() {
  const [selectedOperation, setSelectedOperation] = useState<string | null>(null);

  const userOperations = [
    {
      id: 'profile',
      title: 'Profil Yönetimi',
      description: 'Kişisel bilgilerinizi düzenleyin',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
        </svg>
      ),
      action: () => setSelectedOperation('profile')
    },
    {
      id: 'security',
      title: 'Güvenlik Ayarları',
      description: 'Şifre ve güvenlik seçenekleri',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,7C13.4,7 14.8,8.6 14.8,10V11H16V16H8V11H9.2V10C9.2,8.6 10.6,7 12,7M12,8.2C11.2,8.2 10.4,8.7 10.4,10V11H13.6V10C13.6,8.7 12.8,8.2 12,8.2Z"/>
        </svg>
      ),
      action: () => setSelectedOperation('security')
    },
    {
      id: 'notifications',
      title: 'Bildirim Tercihleri',
      description: 'E-posta ve sistem bildirimleri',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M11,9V7H13V9H11M11,17V11H13V17H11Z"/>
        </svg>
      ),
      action: () => setSelectedOperation('notifications')
    },
    {
      id: 'subscription',
      title: 'Abonelik Yönetimi',
      description: 'Plan ve faturalandırma',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3M19,5V19H5V5H19M16.5,16.25C16.5,16.8 16.05,17.25 15.5,17.25H14.5C13.95,17.25 13.5,16.8 13.5,16.25V15.75C13.5,15.2 13.95,14.75 14.5,14.75H15.5C16.05,14.75 16.5,15.2 16.5,15.75V16.25M16.5,13.5C16.5,14.05 16.05,14.5 15.5,14.5H14.5C13.95,14.5 13.5,14.05 13.5,13.5V6.75C13.5,6.2 13.95,5.75 14.5,5.75H15.5C16.05,5.75 16.5,6.2 16.5,6.75V13.5M11,16.25C11,16.8 10.55,17.25 10,17.25H9C8.45,17.25 8,16.8 8,16.25V15.75C8,15.2 8.45,14.75 9,14.75H10C10.55,14.75 11,15.2 11,15.75V16.25M11,13.5C11,14.05 10.55,14.5 10,14.5H9C8.45,14.5 8,14.05 8,13.5V6.75C8,6.2 8.45,5.75 9,5.75H10C10.55,5.75 11,6.2 11,6.75V13.5Z"/>
        </svg>
      ),
      action: () => setSelectedOperation('subscription')
    },
    {
      id: 'activity',
      title: 'Hesap Aktivitesi',
      description: 'Giriş kayıtları ve aktivite geçmişi',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M13.5,8H12V13L16.28,15.54L17,14.33L13.5,12.25V8M13,3A9,9 0 0,0 4,12H1L4.96,16.03L9,12H6A7,7 0 0,1 13,5A7,7 0 0,1 20,12A7,7 0 0,1 13,19C11.07,19 9.32,18.21 8.06,16.94L6.64,18.36C8.27,20 10.5,21 13,21A9,9 0 0,0 22,12A9,9 0 0,0 13,3"/>
        </svg>
      ),
      action: () => setSelectedOperation('activity')
    },
    {
      id: 'data',
      title: 'Veri Yönetimi',
      description: 'Veri dışa aktarma ve silme',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M6,2A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2H6M6,4H13V9H18V20H6V4M8,12V14H16V12H8M8,16V18H13V16H8Z"/>
        </svg>
      ),
      action: () => setSelectedOperation('data')
    }
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#146448' }}>
      {/* Header */}
      <div className="border-b" style={{ backgroundColor: '#146448', borderBottomColor: '#f6f8f9' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link href="/dashboard/ai-chat" className="hover:opacity-70 transition-opacity" style={{ color: '#f6f8f9' }}>
                ← Geri
              </Link>
              <h1 className="text-xl font-semibold" style={{ color: '#f6f8f9' }}>Kullanıcı İşlemleri</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {userOperations.map((operation) => (
            <button
              key={operation.id}
              onClick={operation.action}
              className="rounded-lg p-6 hover:shadow-lg transition-all duration-200 text-left group border"
              style={{ backgroundColor: '#f6f8f9', borderColor: '#146448' }}
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="transition-colors" style={{ color: '#1e3237' }}>
                  {operation.icon}
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2" style={{ color: '#1e3237' }}>
                    {operation.title}
                  </h3>
                  <p className="text-sm opacity-70" style={{ color: '#1e3237' }}>
                    {operation.description}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Modal Content */}
        {selectedOperation && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="rounded-lg p-8 max-w-lg w-full mx-4 max-h-[80vh] overflow-y-auto" style={{ backgroundColor: '#f6f8f9' }}>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold" style={{ color: '#1e3237' }}>
                  {selectedOperation === 'profile' && 'Profil Yönetimi'}
                  {selectedOperation === 'security' && 'Güvenlik Ayarları'}
                  {selectedOperation === 'notifications' && 'Bildirim Tercihleri'}
                  {selectedOperation === 'subscription' && 'Abonelik Yönetimi'}
                  {selectedOperation === 'activity' && 'Hesap Aktivitesi'}
                  {selectedOperation === 'data' && 'Veri Yönetimi'}
                </h2>
                <button
                  onClick={() => setSelectedOperation(null)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>

              {/* Profile Management */}
              {selectedOperation === 'profile' && (
                <div>
                  <div className="space-y-4 mb-6">
                    <div className="p-4 rounded-lg" style={{ backgroundColor: '#146448' }}>
                      <h4 className="font-medium mb-2" style={{ color: '#f6f8f9' }}>Kişisel Bilgiler</h4>
                      <p className="text-sm opacity-90" style={{ color: '#f6f8f9' }}>
                        Ad, soyad, e-posta ve telefon bilgilerinizi güncelleyin.
                      </p>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm font-medium" style={{ color: '#1e3237' }}>Ad Soyad</label>
                        <input type="text" placeholder="Volkan Şimşirkaya" className="w-full p-3 rounded-lg border mt-1" style={{ borderColor: '#146448' }} />
                      </div>
                      <div>
                        <label className="text-sm font-medium" style={{ color: '#1e3237' }}>E-posta</label>
                        <input type="email" placeholder="volkan@seragpt.com" className="w-full p-3 rounded-lg border mt-1" style={{ borderColor: '#146448' }} />
                      </div>
                      <div>
                        <label className="text-sm font-medium" style={{ color: '#1e3237' }}>Telefon</label>
                        <input type="tel" placeholder="+90 5XX XXX XX XX" className="w-full p-3 rounded-lg border mt-1" style={{ borderColor: '#146448' }} />
                      </div>
                      <div>
                        <label className="text-sm font-medium" style={{ color: '#1e3237' }}>Bio</label>
                        <textarea placeholder="Kendiniz hakkında..." className="w-full p-3 rounded-lg border mt-1 h-20" style={{ borderColor: '#146448' }}></textarea>
                      </div>
                    </div>
                  </div>
                  <button
                    className="w-full py-3 px-4 rounded-lg font-medium transition-all"
                    style={{ backgroundColor: '#baf200', color: '#1e3237' }}
                  >
                    Profili Güncelle
                  </button>
                </div>
              )}

              {/* Security Settings */}
              {selectedOperation === 'security' && (
                <div>
                  <div className="space-y-4 mb-6">
                    <div className="p-4 rounded-lg" style={{ backgroundColor: '#146448' }}>
                      <h4 className="font-medium mb-2" style={{ color: '#f6f8f9' }}>Hesap Güvenliği</h4>
                      <p className="text-sm opacity-90" style={{ color: '#f6f8f9' }}>
                        Şifrenizi değiştirin ve iki faktörlü doğrulamayı etkinleştirin.
                      </p>
                    </div>
                    <div className="space-y-4">
                      <div className="p-4 rounded-lg border" style={{ borderColor: '#146448' }}>
                        <h4 className="font-medium mb-2" style={{ color: '#1e3237' }}>Şifre Değiştir</h4>
                        <div className="space-y-3">
                          <input type="password" placeholder="Mevcut şifre" className="w-full p-3 rounded-lg border" style={{ borderColor: '#146448' }} />
                          <input type="password" placeholder="Yeni şifre" className="w-full p-3 rounded-lg border" style={{ borderColor: '#146448' }} />
                          <input type="password" placeholder="Yeni şifre (tekrar)" className="w-full p-3 rounded-lg border" style={{ borderColor: '#146448' }} />
                        </div>
                        <button className="mt-3 w-full py-2 px-4 rounded-lg font-medium" style={{ backgroundColor: '#baf200', color: '#1e3237' }}>
                          Şifreyi Güncelle
                        </button>
                      </div>
                      <div className="p-4 rounded-lg border" style={{ borderColor: '#146448' }}>
                        <h4 className="font-medium mb-2" style={{ color: '#1e3237' }}>İki Faktörlü Doğrulama</h4>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm" style={{ color: '#1e3237' }}>2FA Durumu</p>
                            <p className="text-xs opacity-70" style={{ color: '#1e3237' }}>Hesabınızı daha güvenli hale getirin</p>
                          </div>
                          <button className="py-2 px-4 rounded-lg font-medium" style={{ backgroundColor: '#146448', color: '#f6f8f9' }}>
                            Etkinleştir
                          </button>
                        </div>
                      </div>
                      <div className="p-4 rounded-lg border" style={{ borderColor: '#146448' }}>
                        <h4 className="font-medium mb-2" style={{ color: '#1e3237' }}>Aktif Oturumlar</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                            <div>
                              <p className="text-sm font-medium" style={{ color: '#1e3237' }}>Bu Cihaz</p>
                              <p className="text-xs opacity-70" style={{ color: '#1e3237' }}>Son erişim: Şimdi</p>
                            </div>
                            <span className="text-xs px-2 py-1 rounded" style={{ backgroundColor: '#baf200', color: '#1e3237' }}>Aktif</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Notifications */}
              {selectedOperation === 'notifications' && (
                <div>
                  <div className="space-y-4 mb-6">
                    <div className="p-4 rounded-lg" style={{ backgroundColor: '#146448' }}>
                      <h4 className="font-medium mb-2" style={{ color: '#f6f8f9' }}>Bildirim Ayarları</h4>
                      <p className="text-sm opacity-90" style={{ color: '#f6f8f9' }}>
                        Hangi bildirimleri almak istediğinizi seçin.
                      </p>
                    </div>
                    <div className="space-y-4">
                      <div className="p-4 rounded-lg border" style={{ borderColor: '#146448' }}>
                        <h4 className="font-medium mb-3" style={{ color: '#1e3237' }}>E-posta Bildirimleri</h4>
                        <div className="space-y-3">
                          <label className="flex items-center justify-between">
                            <span style={{ color: '#1e3237' }}>Analiz tamamlandığında</span>
                            <input type="checkbox" className="ml-2" defaultChecked />
                          </label>
                          <label className="flex items-center justify-between">
                            <span style={{ color: '#1e3237' }}>Token satın alımında</span>
                            <input type="checkbox" className="ml-2" defaultChecked />
                          </label>
                          <label className="flex items-center justify-between">
                            <span style={{ color: '#1e3237' }}>Haftalık rapor</span>
                            <input type="checkbox" className="ml-2" />
                          </label>
                          <label className="flex items-center justify-between">
                            <span style={{ color: '#1e3237' }}>Yeni özellik duyuruları</span>
                            <input type="checkbox" className="ml-2" defaultChecked />
                          </label>
                        </div>
                      </div>
                      <div className="p-4 rounded-lg border" style={{ borderColor: '#146448' }}>
                        <h4 className="font-medium mb-3" style={{ color: '#1e3237' }}>Push Bildirimleri</h4>
                        <div className="space-y-3">
                          <label className="flex items-center justify-between">
                            <span style={{ color: '#1e3237' }}>Tarayıcı bildirimleri</span>
                            <input type="checkbox" className="ml-2" />
                          </label>
                          <label className="flex items-center justify-between">
                            <span style={{ color: '#1e3237' }}>Mobil bildirimler</span>
                            <input type="checkbox" className="ml-2" />
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button
                    className="w-full py-3 px-4 rounded-lg font-medium transition-all"
                    style={{ backgroundColor: '#baf200', color: '#1e3237' }}
                  >
                    Ayarları Kaydet
                  </button>
                </div>
              )}

              {/* Subscription */}
              {selectedOperation === 'subscription' && (
                <div>
                  <div className="space-y-4 mb-6">
                    <div className="p-4 rounded-lg" style={{ backgroundColor: '#146448' }}>
                      <h4 className="font-medium mb-2" style={{ color: '#f6f8f9' }}>Mevcut Plan</h4>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-lg font-bold" style={{ color: '#baf200' }}>👑 Admin Plan</p>
                          <p className="text-sm opacity-90" style={{ color: '#f6f8f9' }}>Sınırsız erişim</p>
                        </div>
                        <span className="text-xs px-2 py-1 rounded" style={{ backgroundColor: '#baf200', color: '#1e3237' }}>Aktif</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="p-4 rounded-lg border" style={{ borderColor: '#146448' }}>
                        <h4 className="font-medium mb-2" style={{ color: '#1e3237' }}>Plan Özellikleri</h4>
                        <ul className="space-y-1 text-sm" style={{ color: '#1e3237' }}>
                          <li>✅ Sınırsız analiz</li>
                          <li>✅ Sınırsız token</li>
                          <li>✅ Öncelikli destek</li>
                          <li>✅ Gelişmiş raporlar</li>
                          <li>✅ API erişimi</li>
                        </ul>
                      </div>
                      <div className="p-4 rounded-lg border" style={{ borderColor: '#146448' }}>
                        <h4 className="font-medium mb-2" style={{ color: '#1e3237' }}>Fatura Geçmişi</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center text-sm">
                            <span style={{ color: '#1e3237' }}>Ocak 2025</span>
                            <span style={{ color: '#146448' }}>Ücretsiz</span>
                          </div>
                          <div className="flex justify-between items-center text-sm">
                            <span style={{ color: '#1e3237' }}>Aralık 2024</span>
                            <span style={{ color: '#146448' }}>Ücretsiz</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button
                    className="w-full py-3 px-4 rounded-lg font-medium transition-all"
                    style={{ backgroundColor: '#baf200', color: '#1e3237' }}
                  >
                    Plan Yönetimi
                  </button>
                </div>
              )}

              {/* Activity */}
              {selectedOperation === 'activity' && (
                <div>
                  <div className="space-y-4 mb-6">
                    <div className="p-4 rounded-lg" style={{ backgroundColor: '#146448' }}>
                      <h4 className="font-medium mb-2" style={{ color: '#f6f8f9' }}>Hesap Aktivitesi</h4>
                      <p className="text-sm opacity-90" style={{ color: '#f6f8f9' }}>
                        Hesabınızdaki son giriş ve işlem kayıtları.
                      </p>
                    </div>
                    <div className="space-y-3">
                      <div className="p-3 rounded-lg" style={{ backgroundColor: '#146448' }}>
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="font-medium text-sm" style={{ color: '#f6f8f9' }}>Başarılı Giriş</h4>
                          <span className="text-xs opacity-80" style={{ color: '#f6f8f9' }}>15 Ocak 2025, 14:30</span>
                        </div>
                        <p className="text-xs opacity-90" style={{ color: '#f6f8f9' }}>IP: 192.168.1.1 • Chrome, Windows</p>
                      </div>
                      <div className="p-3 rounded-lg" style={{ backgroundColor: '#146448' }}>
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="font-medium text-sm" style={{ color: '#f6f8f9' }}>ROI Analizi Başlatıldı</h4>
                          <span className="text-xs opacity-80" style={{ color: '#f6f8f9' }}>15 Ocak 2025, 14:25</span>
                        </div>
                        <p className="text-xs opacity-90" style={{ color: '#f6f8f9' }}>Antalya domates serası analizi</p>
                      </div>
                      <div className="p-3 rounded-lg" style={{ backgroundColor: '#146448' }}>
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="font-medium text-sm" style={{ color: '#f6f8f9' }}>Profil Güncellendi</h4>
                          <span className="text-xs opacity-80" style={{ color: '#f6f8f9' }}>14 Ocak 2025, 16:45</span>
                        </div>
                        <p className="text-xs opacity-90" style={{ color: '#f6f8f9' }}>Telefon numarası eklendi</p>
                      </div>
                      <div className="p-3 rounded-lg" style={{ backgroundColor: '#146448' }}>
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="font-medium text-sm" style={{ color: '#f6f8f9' }}>Başarılı Giriş</h4>
                          <span className="text-xs opacity-80" style={{ color: '#f6f8f9' }}>14 Ocak 2025, 09:15</span>
                        </div>
                        <p className="text-xs opacity-90" style={{ color: '#f6f8f9' }}>IP: 192.168.1.1 • Safari, macOS</p>
                      </div>
                    </div>
                  </div>
                  <button
                    className="w-full py-3 px-4 rounded-lg font-medium transition-all"
                    style={{ backgroundColor: '#baf200', color: '#1e3237' }}
                  >
                    Tam Geçmişi Görüntüle
                  </button>
                </div>
              )}

              {/* Data Management */}
              {selectedOperation === 'data' && (
                <div>
                  <div className="space-y-4 mb-6">
                    <div className="p-4 rounded-lg" style={{ backgroundColor: '#146448' }}>
                      <h4 className="font-medium mb-2" style={{ color: '#f6f8f9' }}>Veri Yönetimi</h4>
                      <p className="text-sm opacity-90" style={{ color: '#f6f8f9' }}>
                        Verilerinizi dışa aktarın veya hesabınızı silin.
                      </p>
                    </div>
                    <div className="space-y-4">
                      <div className="p-4 rounded-lg border" style={{ borderColor: '#146448' }}>
                        <h4 className="font-medium mb-2" style={{ color: '#1e3237' }}>Veri Dışa Aktarma</h4>
                        <p className="text-sm mb-3 opacity-70" style={{ color: '#1e3237' }}>
                          Tüm verilerinizi indirin
                        </p>
                        <div className="space-y-2">
                          <label className="flex items-center">
                            <input type="checkbox" className="mr-2" defaultChecked />
                            <span className="text-sm" style={{ color: '#1e3237' }}>Profil bilgileri</span>
                          </label>
                          <label className="flex items-center">
                            <input type="checkbox" className="mr-2" defaultChecked />
                            <span className="text-sm" style={{ color: '#1e3237' }}>Analiz sonuçları</span>
                          </label>
                          <label className="flex items-center">
                            <input type="checkbox" className="mr-2" defaultChecked />
                            <span className="text-sm" style={{ color: '#1e3237' }}>Sohbet geçmişi</span>
                          </label>
                          <label className="flex items-center">
                            <input type="checkbox" className="mr-2" />
                            <span className="text-sm" style={{ color: '#1e3237' }}>İşlem geçmişi</span>
                          </label>
                        </div>
                        <button className="mt-3 w-full py-2 px-4 rounded-lg font-medium" style={{ backgroundColor: '#baf200', color: '#1e3237' }}>
                          Verileri İndir
                        </button>
                      </div>
                      <div className="p-4 rounded-lg border border-red-300 bg-red-50">
                        <h4 className="font-medium mb-2 text-red-800">Hesap Silme</h4>
                        <p className="text-sm mb-3 text-red-700">
                          Bu işlem geri alınamaz. Tüm verileriniz kalıcı olarak silinir.
                        </p>
                        <button className="w-full py-2 px-4 rounded-lg font-medium bg-red-600 text-white hover:bg-red-700">
                          Hesabımı Sil
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
