'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function AIAsistanIslemleriPage() {
  const [selectedOperation, setSelectedOperation] = useState<string | null>(null);

  const aiOperations = [
    {
      id: 'chat-history',
      title: 'Sohbet Geçmişi',
      description: 'Tüm AI sohbetlerinizi görüntüleyin',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12,3C17.5,3 22,6.58 22,11C22,15.42 17.5,19 12,19C10.76,19 9.57,18.82 8.47,18.5C5.55,21 2,21 2,21C4.33,18.67 4.7,17.1 4.75,16.5C3.05,15.07 2,13.13 2,11C2,6.58 6.5,3 12,3Z"/>
        </svg>
      ),
      action: () => setSelectedOperation('chat-history')
    },
    {
      id: 'model-settings',
      title: 'Model Ayarları',
      description: 'AI model tercihlerinizi yapılandırın',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8M12,10A2,2 0 0,0 10,12A2,2 0 0,0 12,14A2,2 0 0,0 14,12A2,2 0 0,0 12,10M10,22C9.75,22 9.54,21.82 9.5,21.58L9.13,18.93C8.5,18.68 7.96,18.34 7.44,17.94L4.95,18.95C4.73,19.03 4.46,18.95 4.34,18.73L2.34,15.27C2.22,15.05 2.27,14.78 2.46,14.63L4.57,12.97C4.53,12.65 4.5,12.33 4.5,12C4.5,11.67 4.53,11.34 4.57,11L2.46,9.37C2.27,9.22 2.22,8.95 2.34,8.73L4.34,5.27C4.46,5.05 4.73,4.96 4.95,5.05L7.44,6.05C7.96,5.66 8.5,5.32 9.13,5.07L9.5,2.42C9.54,2.18 9.75,2 10,2H14C14.25,2 14.46,2.18 14.5,2.42L14.87,5.07C15.5,5.32 16.04,5.66 16.56,6.05L19.05,5.05C19.27,4.96 19.54,5.05 19.66,5.27L21.66,8.73C21.78,8.95 21.73,9.22 21.54,9.37L19.43,11C19.47,11.34 19.5,11.67 19.5,12C19.5,12.33 19.47,12.65 19.43,12.97L21.54,14.63C21.73,14.78 21.78,15.05 21.66,15.27L19.66,18.73C19.54,18.95 19.27,19.03 19.05,18.95L16.56,17.94C16.04,18.34 15.5,18.68 14.87,18.93L14.5,21.58C14.46,21.82 14.25,22 14,22H10M11.25,4L10.88,6.61C9.68,6.86 8.62,7.5 7.85,8.39L5.44,7.35L4.69,8.65L6.8,10.2C6.4,11.37 6.4,12.64 6.8,13.8L4.68,15.36L5.43,16.66L7.86,15.62C8.63,16.5 9.68,17.14 10.87,17.38L11.24,20H12.76L13.13,17.39C14.32,17.14 15.37,16.5 16.14,15.62L18.57,16.66L19.32,15.36L17.2,13.81C17.6,12.64 17.6,11.37 17.2,10.2L19.31,8.65L18.56,7.35L16.15,8.39C15.38,7.5 14.32,6.86 13.12,6.61L12.75,4H11.25Z"/>
        </svg>
      ),
      action: () => setSelectedOperation('model-settings')
    },
    {
      id: 'prompts',
      title: 'Prompt Yönetimi',
      description: 'Özel promptlarınızı oluşturun ve yönetin',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
        </svg>
      ),
      action: () => setSelectedOperation('prompts')
    },
    {
      id: 'analysis',
      title: 'Analiz İşlemleri',
      description: 'AI analiz sonuçlarını yönetin',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M5,3L19,3C20.1,3 21,3.9 21,5L21,19C21,20.1 20.1,21 19,21L5,21C3.9,21 3,20.1 3,19L3,5C3,3.9 3.9,3 5,3M13,7L11,7L11,11L7,11L7,13L11,13L11,17L13,17L13,13L17,13L17,11L13,11L13,7Z"/>
        </svg>
      ),
      action: () => setSelectedOperation('analysis')
    },
    {
      id: 'training',
      title: 'Model Eğitimi',
      description: 'Özel model eğitimi ve fine-tuning',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12,3L1,9L12,15L21,10.09V17H23V9M5,13.18V17.18L12,21L19,17.18V13.18L12,17L5,13.18Z"/>
        </svg>
      ),
      action: () => setSelectedOperation('training')
    },
    {
      id: 'export',
      title: 'Veri Dışa Aktarma',
      description: 'AI sonuçlarını farklı formatlarda indirin',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20M12,19L8,15H10.5V12H13.5V15H16L12,19Z"/>
        </svg>
      ),
      action: () => setSelectedOperation('export')
    }
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#146448' }}>
      {/* Header */}
      <div className="border-b" style={{ backgroundColor: '#146448', borderBottomColor: '#f6f8f9' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <div className="flex items-center space-x-4">
              <Link
                href="/dashboard/ai-chat"
                className="flex items-center justify-center w-10 h-10 rounded-lg hover:opacity-70 transition-opacity text-xl font-semibold"
                style={{ backgroundColor: '#baf200', color: '#1e3237' }}
              >
                ←
              </Link>
              <h1 className="text-xl font-semibold" style={{ color: '#f6f8f9' }}>AI Asistan İşlemleri</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {aiOperations.map((operation) => (
            <button
              key={operation.id}
              onClick={operation.action}
              className="rounded-lg p-6 hover:shadow-lg transition-all duration-200 text-left group border"
              style={{ backgroundColor: '#f6f8f9', borderColor: '#146448' }}
            >
              <div className="flex flex-col items-center text-center" style={{ backgroundColor: '#baf200', borderRadius: '8px', padding: '16px' }}>
                <div className="transition-colors mb-2" style={{ color: '#1e3237' }}>
                  {operation.icon}
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-1" style={{ color: '#1e3237' }}>
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
                  {selectedOperation === 'chat-history' && 'Sohbet Geçmişi'}
                  {selectedOperation === 'model-settings' && 'Model Ayarları'}
                  {selectedOperation === 'prompts' && 'Prompt Yönetimi'}
                  {selectedOperation === 'analysis' && 'Analiz İşlemleri'}
                  {selectedOperation === 'training' && 'Model Eğitimi'}
                  {selectedOperation === 'export' && 'Veri Dışa Aktarma'}
                </h2>
                <button
                  onClick={() => setSelectedOperation(null)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>

              {/* Chat History */}
              {selectedOperation === 'chat-history' && (
                <div>
                  <div className="space-y-3 mb-6">
                    <div className="p-4 rounded-lg" style={{ backgroundColor: '#146448' }}>
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium" style={{ color: '#f6f8f9' }}>Sera ROI Analizi Sohbeti</h4>
                        <span className="text-xs opacity-80" style={{ color: '#f6f8f9' }}>15 Ocak 2025</span>
                      </div>
                      <p className="text-sm opacity-90" style={{ color: '#f6f8f9' }}>
                        "Antalya'da 1000 m² domates serası için ROI hesaplaması yap..."
                      </p>
                    </div>
                    <div className="p-4 rounded-lg" style={{ backgroundColor: '#146448' }}>
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium" style={{ color: '#f6f8f9' }}>İklim Uygunluk Danışmanlığı</h4>
                        <span className="text-xs opacity-80" style={{ color: '#f6f8f9' }}>14 Ocak 2025</span>
                      </div>
                      <p className="text-sm opacity-90" style={{ color: '#f6f8f9' }}>
                        "İzmir'de salatalık yetiştirmek için iklim koşulları nasıl?"
                      </p>
                    </div>
                    <div className="p-4 rounded-lg" style={{ backgroundColor: '#146448' }}>
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium" style={{ color: '#f6f8f9' }}>Ekipman Seçimi Danışmanlığı</h4>
                        <span className="text-xs opacity-80" style={{ color: '#f6f8f9' }}>13 Ocak 2025</span>
                      </div>
                      <p className="text-sm opacity-90" style={{ color: '#f6f8f9' }}>
                        "Hidroponik sistem için gerekli ekipmanları listele..."
                      </p>
                    </div>
                  </div>
                  <button
                    className="w-full py-3 px-4 rounded-lg font-medium transition-all"
                    style={{ backgroundColor: '#baf200', color: '#1e3237' }}
                  >
                    Tüm Sohbetleri Görüntüle
                  </button>
                </div>
              )}

              {/* Model Settings */}
              {selectedOperation === 'model-settings' && (
                <div>
                  <div className="space-y-4 mb-6">
                    <div className="p-4 rounded-lg border" style={{ borderColor: '#146448' }}>
                      <h4 className="font-medium mb-2" style={{ color: '#1e3237' }}>Tercih Edilen Model</h4>
                      <select className="w-full p-2 rounded-lg border" style={{ borderColor: '#146448' }}>
                        <option value="gpt-4">GPT-4 (Önerilen)</option>
                        <option value="gpt-3.5">GPT-3.5 Turbo</option>
                        <option value="claude">Claude</option>
                      </select>
                    </div>
                    <div className="p-4 rounded-lg border" style={{ borderColor: '#146448' }}>
                      <h4 className="font-medium mb-2" style={{ color: '#1e3237' }}>Yanıt Stili</h4>
                      <div className="space-y-2">
                        <label className="flex items-center">
                          <input type="radio" name="style" value="detailed" className="mr-2" defaultChecked />
                          <span style={{ color: '#1e3237' }}>Detaylı ve Teknik</span>
                        </label>
                        <label className="flex items-center">
                          <input type="radio" name="style" value="simple" className="mr-2" />
                          <span style={{ color: '#1e3237' }}>Basit ve Öz</span>
                        </label>
                        <label className="flex items-center">
                          <input type="radio" name="style" value="conversational" className="mr-2" />
                          <span style={{ color: '#1e3237' }}>Sohbet Tarzı</span>
                        </label>
                      </div>
                    </div>
                    <div className="p-4 rounded-lg border" style={{ borderColor: '#146448' }}>
                      <h4 className="font-medium mb-2" style={{ color: '#1e3237' }}>Dil Tercihi</h4>
                      <select className="w-full p-2 rounded-lg border" style={{ borderColor: '#146448' }}>
                        <option value="tr">Türkçe</option>
                        <option value="en">English</option>
                        <option value="auto">Otomatik Algıla</option>
                      </select>
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

              {/* Prompts Management */}
              {selectedOperation === 'prompts' && (
                <div>
                  <div className="space-y-3 mb-6">
                    <div className="p-4 rounded-lg" style={{ backgroundColor: '#146448' }}>
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium" style={{ color: '#f6f8f9' }}>ROI Analiz Promptu</h4>
                        <button className="text-xs px-2 py-1 rounded" style={{ backgroundColor: '#baf200', color: '#1e3237' }}>
                          Düzenle
                        </button>
                      </div>
                      <p className="text-sm opacity-90" style={{ color: '#f6f8f9' }}>
                        "Sera yatırımı için detaylı ROI analizi yap. Başlangıç maliyeti, işletme giderleri..."
                      </p>
                    </div>
                    <div className="p-4 rounded-lg" style={{ backgroundColor: '#146448' }}>
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium" style={{ color: '#f6f8f9' }}>İklim Analiz Promptu</h4>
                        <button className="text-xs px-2 py-1 rounded" style={{ backgroundColor: '#baf200', color: '#1e3237' }}>
                          Düzenle
                        </button>
                      </div>
                      <p className="text-sm opacity-90" style={{ color: '#f6f8f9' }}>
                        "Belirtilen bölge için iklim uygunluk analizi yap. Sıcaklık, nem, yağış..."
                      </p>
                    </div>
                    <div className="p-4 rounded-lg" style={{ backgroundColor: '#146448' }}>
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium" style={{ color: '#f6f8f9' }}>Ekipman Önerisi Promptu</h4>
                        <button className="text-xs px-2 py-1 rounded" style={{ backgroundColor: '#baf200', color: '#1e3237' }}>
                          Düzenle
                        </button>
                      </div>
                      <p className="text-sm opacity-90" style={{ color: '#f6f8f9' }}>
                        "Sera tipi ve büyüklüğe göre gerekli ekipmanları listele ve maliyetlerini hesapla..."
                      </p>
                    </div>
                  </div>
                  <button
                    className="w-full py-3 px-4 rounded-lg font-medium transition-all"
                    style={{ backgroundColor: '#baf200', color: '#1e3237' }}
                  >
                    Yeni Prompt Oluştur
                  </button>
                </div>
              )}

              {/* Analysis Operations */}
              {selectedOperation === 'analysis' && (
                <div>
                  <div className="space-y-3 mb-6">
                    <div className="p-4 rounded-lg" style={{ backgroundColor: '#146448' }}>
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium" style={{ color: '#f6f8f9' }}>Aktif Analizler</h4>
                        <span className="text-xs px-2 py-1 rounded" style={{ backgroundColor: '#baf200', color: '#1e3237' }}>
                          3 Aktif
                        </span>
                      </div>
                      <p className="text-sm opacity-90" style={{ color: '#f6f8f9' }}>
                        ROI: 2 analiz • İklim: 1 analiz • Beklemede: 0
                      </p>
                    </div>
                    <div className="p-4 rounded-lg border" style={{ borderColor: '#146448' }}>
                      <h4 className="font-medium mb-2" style={{ color: '#1e3237' }}>Hızlı İşlemler</h4>
                      <div className="space-y-2">
                        <button className="w-full text-left p-2 rounded border hover:bg-gray-50" style={{ borderColor: '#146448' }}>
                          <span style={{ color: '#1e3237' }}>Tüm Analizleri Durdur</span>
                        </button>
                        <button className="w-full text-left p-2 rounded border hover:bg-gray-50" style={{ borderColor: '#146448' }}>
                          <span style={{ color: '#1e3237' }}>Bekleyen İşlemleri İptal Et</span>
                        </button>
                        <button className="w-full text-left p-2 rounded border hover:bg-gray-50" style={{ borderColor: '#146448' }}>
                          <span style={{ color: '#1e3237' }}>Analiz Geçmişini Temizle</span>
                        </button>
                      </div>
                    </div>
                    <div className="p-4 rounded-lg border" style={{ borderColor: '#146448' }}>
                      <h4 className="font-medium mb-2" style={{ color: '#1e3237' }}>Otomatik İşlemler</h4>
                      <div className="space-y-2">
                        <label className="flex items-center">
                          <input type="checkbox" className="mr-2" defaultChecked />
                          <span style={{ color: '#1e3237' }}>Analiz tamamlandığında e-posta gönder</span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" className="mr-2" />
                          <span style={{ color: '#1e3237' }}>Raporları otomatik kaydet</span>
                        </label>
                      </div>
                    </div>
                  </div>
                  <button
                    className="w-full py-3 px-4 rounded-lg font-medium transition-all"
                    style={{ backgroundColor: '#baf200', color: '#1e3237' }}
                  >
                    Analizleri Yönet
                  </button>
                </div>
              )}

              {/* Training */}
              {selectedOperation === 'training' && (
                <div>
                  <div className="space-y-4 mb-6">
                    <div className="p-4 rounded-lg" style={{ backgroundColor: '#146448' }}>
                      <h4 className="font-medium mb-2" style={{ color: '#f6f8f9' }}>Model Eğitimi</h4>
                      <p className="text-sm opacity-90" style={{ color: '#f6f8f9' }}>
                        SeraGPT'yi kendi verilerinizle eğiterek daha kişiselleştirilmiş sonuçlar alın.
                      </p>
                    </div>
                    <div className="p-4 rounded-lg border" style={{ borderColor: '#146448' }}>
                      <h4 className="font-medium mb-2" style={{ color: '#1e3237' }}>Eğitim Verileri</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <span className="text-sm" style={{ color: '#1e3237' }}>sera_maliyetleri.csv</span>
                          <span className="text-xs" style={{ color: '#146448' }}>Yüklendi</span>
                        </div>
                        <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <span className="text-sm" style={{ color: '#1e3237' }}>iklim_verileri.json</span>
                          <span className="text-xs" style={{ color: '#146448' }}>Yüklendi</span>
                        </div>
                        <button className="w-full p-2 border-2 border-dashed rounded hover:bg-gray-50" style={{ borderColor: '#146448' }}>
                          <span className="text-sm" style={{ color: '#1e3237' }}>+ Yeni Veri Ekle</span>
                        </button>
                      </div>
                    </div>
                    <div className="p-4 rounded-lg border" style={{ borderColor: '#146448' }}>
                      <h4 className="font-medium mb-2" style={{ color: '#1e3237' }}>Eğitim Parametreleri</h4>
                      <div className="space-y-2">
                        <div>
                          <label className="text-sm" style={{ color: '#1e3237' }}>Epoch Sayısı</label>
                          <input type="number" defaultValue="3" className="w-full p-2 rounded border mt-1" style={{ borderColor: '#146448' }} />
                        </div>
                        <div>
                          <label className="text-sm" style={{ color: '#1e3237' }}>Learning Rate</label>
                          <input type="number" step="0.0001" defaultValue="0.0001" className="w-full p-2 rounded border mt-1" style={{ borderColor: '#146448' }} />
                        </div>
                      </div>
                    </div>
                  </div>
                  <button
                    className="w-full py-3 px-4 rounded-lg font-medium transition-all"
                    style={{ backgroundColor: '#baf200', color: '#1e3237' }}
                  >
                    Eğitimi Başlat
                  </button>
                </div>
              )}

              {/* Export */}
              {selectedOperation === 'export' && (
                <div>
                  <div className="space-y-4 mb-6">
                    <div className="p-4 rounded-lg" style={{ backgroundColor: '#146448' }}>
                      <h4 className="font-medium mb-2" style={{ color: '#f6f8f9' }}>Veri Dışa Aktarma</h4>
                      <p className="text-sm opacity-90" style={{ color: '#f6f8f9' }}>
                        AI analiz sonuçlarınızı farklı formatlarda indirin ve paylaşın.
                      </p>
                    </div>
                    <div className="p-4 rounded-lg border" style={{ borderColor: '#146448' }}>
                      <h4 className="font-medium mb-3" style={{ color: '#1e3237' }}>Dışa Aktarılabilir Veriler</h4>
                      <div className="space-y-2">
                        <label className="flex items-center">
                          <input type="checkbox" className="mr-2" defaultChecked />
                          <span style={{ color: '#1e3237' }}>ROI Analiz Raporları (5 adet)</span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" className="mr-2" defaultChecked />
                          <span style={{ color: '#1e3237' }}>İklim Analiz Sonuçları (3 adet)</span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" className="mr-2" />
                          <span style={{ color: '#1e3237' }}>Sohbet Geçmişi</span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" className="mr-2" />
                          <span style={{ color: '#1e3237' }}>Model Ayarları</span>
                        </label>
                      </div>
                    </div>
                    <div className="p-4 rounded-lg border" style={{ borderColor: '#146448' }}>
                      <h4 className="font-medium mb-3" style={{ color: '#1e3237' }}>Format Seçimi</h4>
                      <div className="grid grid-cols-2 gap-2">
                        <button className="p-3 rounded border text-center hover:bg-gray-50" style={{ borderColor: '#146448' }}>
                          <div className="text-2xl mb-1">📄</div>
                          <div className="text-sm" style={{ color: '#1e3237' }}>PDF</div>
                        </button>
                        <button className="p-3 rounded border text-center hover:bg-gray-50" style={{ borderColor: '#146448' }}>
                          <div className="text-2xl mb-1">📊</div>
                          <div className="text-sm" style={{ color: '#1e3237' }}>Excel</div>
                        </button>
                        <button className="p-3 rounded border text-center hover:bg-gray-50" style={{ borderColor: '#146448' }}>
                          <div className="text-2xl mb-1">📋</div>
                          <div className="text-sm" style={{ color: '#1e3237' }}>CSV</div>
                        </button>
                        <button className="p-3 rounded border text-center hover:bg-gray-50" style={{ borderColor: '#146448' }}>
                          <div className="text-2xl mb-1">🗃️</div>
                          <div className="text-sm" style={{ color: '#1e3237' }}>JSON</div>
                        </button>
                      </div>
                    </div>
                  </div>
                  <button
                    className="w-full py-3 px-4 rounded-lg font-medium transition-all"
                    style={{ backgroundColor: '#baf200', color: '#1e3237' }}
                  >
                    Verileri Dışa Aktar
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
