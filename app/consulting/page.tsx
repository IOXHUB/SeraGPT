'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import Footer from '@/components/Footer';

export default function ConsultingPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSection, setSelectedSection] = useState('business-planning');

  useEffect(() => {
    // Check for existing session
    const checkUser = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setUser(session?.user || null);
      } catch (error) {
        console.error('Error checking user session:', error);
      } finally {
        setLoading(false);
      }
    };

    // Check for mock session (development)
    const mockSession = typeof window !== 'undefined'
      ? localStorage.getItem('mockUserSession')
      : null;

    if (mockSession) {
      try {
        setUser(JSON.parse(mockSession));
        setLoading(false);
      } catch {
        setLoading(false);
      }
    } else {
      checkUser();
    }

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user || null);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    // Clear mock session
    if (typeof window !== 'undefined') {
      localStorage.removeItem('mockUserSession');
    }

    // Sign out from Supabase
    await supabase.auth.signOut();
    setUser(null);
  };

  const sidebarSections = [
    {
      title: 'İş Geliştirme',
      items: [
        { id: 'business-planning', label: 'İş Planı Hazırlama', icon: '📊' },
        { id: 'feasibility-study', label: 'Fizibilite Etüdü', icon: '📈' },
        { id: 'investment-consulting', label: 'Yatırım Danışmanlığı', icon: '💰' },
        { id: 'market-entry', label: 'Pazar Giriş Stratejisi', icon: '🎯' },
        { id: 'growth-strategy', label: 'Büyüme Stratejisi', icon: '🚀' }
      ]
    },
    {
      title: 'Teknik Danışmanlık',
      items: [
        { id: 'greenhouse-design', label: 'Sera Tasarımı', icon: '🏗️' },
        { id: 'technology-selection', label: 'Teknoloji Seçimi', icon: '⚙️' },
        { id: 'automation-systems', label: 'Otomasyon Sistemleri', icon: '🤖' },
        { id: 'climate-control', label: 'İklim Kontrolü', icon: '🌡️' },
        { id: 'irrigation-systems', label: 'Sulama Sistemleri', icon: '💧' }
      ]
    },
    {
      title: 'Operasyonel Destek',
      items: [
        { id: 'crop-planning', label: 'Üretim Planlaması', icon: '🌱' },
        { id: 'quality-management', label: 'Kalite Yönetimi', icon: '✅' },
        { id: 'team-training', label: 'Ekip Eğitimi', icon: '👥' },
        { id: 'certification', label: 'Sertifikasyon', icon: '📜' }
      ]
    }
  ];

  const getContentForSection = (sectionId: string) => {
    const contentMap = {
      'business-planning': {
        title: 'İş Planı Hazırlama',
        description: 'Sera işletmeniz için kapsamlı ve detaylı iş planı hazırlama hizmeti.',
        content: `
          <h3>Neden İş Planı Gerekli?</h3>
          <p>Profesyonel bir iş planı, sera yatırımınızın başarılı olması için kritik öneme sahiptir. Hem yatırım kararlarınızı netleştirmenize hem de finansman sağlama süreçlerinizde size yardımcı olur.</p>
          
          <h3>İş Planı İçeriği</h3>
          <ul>
            <li>• <strong>Yönetici Özeti:</strong> Projenin ana hatları ve önemli noktalar</li>
            <li>• <strong>Pazar Analizi:</strong> Hedef pazar, rakip analizi ve fırsatlar</li>
            <li>• <strong>Finansal Projeksiyonlar:</strong> 5 yıllık gelir-gider tahminleri</li>
            <li>• <strong>Operasyon Planı:</strong> Üretim süreci ve kapasite planlaması</li>
            <li>• <strong>Risk Analizi:</strong> Potansiyel riskler ve çözüm önerileri</li>
            <li>• <strong>Organizasyon Şeması:</strong> İnsan kaynakları planlaması</li>
            <li>• <strong>Pazarlama Stratejisi:</strong> Satış kanalları ve müşteri kazanım planı</li>
          </ul>

          <h3>Süreç ve Zaman Çizelgesi</h3>
          <p><strong>1. Hafta:</strong> İlk görüşme, veri toplama ve ihtiyaç analizi</p>
          <p><strong>2-3. Hafta:</strong> Pazar araştırması ve rekabet analizi</p>
          <p><strong>4-5. Hafta:</strong> Finansal modelleme ve projeksiyonlar</p>
          <p><strong>6. Hafta:</strong> İş planı hazırlama ve sunum</p>
          <p><strong>7. Hafta:</strong> Revizyon ve finalizasyon</p>

          <h3>Çıktılar</h3>
          <ul>
            <li>• 50-80 sayfalık profesyonel iş planı</li>
            <li>• Özet sunum (PowerPoint)</li>
            <li>• Excel finansal modeli</li>
            <li>• Uygulama takvimi</li>
            <li>• 6 ay süreyle danışmanlık desteği</li>
          </ul>

          <h3>Fiyatlandırma</h3>
          <p><strong>Temel Paket:</strong> ₺25.000 + KDV</p>
          <p><strong>Premium Paket:</strong> ₺45.000 + KDV (Detaylı pazar araştırması ve 1 yıl danışmanlık dahil)</p>
        `
      },
      'feasibility-study': {
        title: 'Fizibilite Etüdü',
        description: 'Sera yatırımınızın ekonomik ve teknik fizibilitesini kapsamlı olarak değerlendirin.',
        content: `
          <h3>Fizibilite Etüdü Nedir?</h3>
          <p>Fizibilite etüdü, planlanan sera yatırımınızın teknik, ekonomik ve finansal açıdan uygulanabilirliğini objektif olarak değerlendiren detaylı bir çalışmadır.</p>
          
          <h3>Etüd Kapsamı</h3>
          <h4>Teknik Fizibilite</h4>
          <ul>
            <li>• Arazi analizi ve toprak uygunluğu</li>
            <li>• İklim koşulları değerlendirmesi</li>
            <li>• Altyapı gereksinimleri (elektrik, su, yol)</li>
            <li>• Teknoloji seçenekleri ve uygunluk analizi</li>
            <li>• Yapısal tasarım önerileri</li>
          </ul>

          <h4>Ekonomik Fizibilite</h4>
          <ul>
            <li>• Pazar büyüklüğü ve büyüme potansiyeli</li>
            <li>• Rekabet durumu analizi</li>
            <li>• Fiyat trend analizi</li>
            <li>• Talep-arz dengesi</li>
            <li>• İhracat potansiyeli</li>
          </ul>

          <h4>Finansal Fizibilite</h4>
          <ul>
            <li>• Yatırım maliyeti hesaplama</li>
            <li>• İşletme giderleri tahmini</li>
            <li>• Gelir projeksiyonları</li>
            <li>• NPV, IRR, Geri Ödeme Süresi</li>
            <li>• Hassasiyet analizi</li>
            <li>• Senaryo analizleri</li>
          </ul>

          <h3>Metodoloji</h3>
          <p>Etüdümüz, uluslararası standartlarda kabul görmüş UNIDO metodolojisini takip eder:</p>
          <ul>
            <li>• Veri toplama ve saha çalışması</li>
            <li>• Birincil ve ikincil kaynak araştırması</li>
            <li>• Uzman görüşleri ve saha deneyimi</li>
            <li>• İstatistiksel analiz ve modelleme</li>
            <li>• Risk değerlendirmesi</li>
          </ul>

          <h3>Süreç (8-10 Hafta)</h3>
          <p><strong>1-2. Hafta:</strong> Proje tanımı ve veri toplama</p>
          <p><strong>3-4. Hafta:</strong> Saha çalışması ve teknik analiz</p>
          <p><strong>5-6. Hafta:</strong> Pazar ve rekabet araştırması</p>
          <p><strong>7-8. Hafta:</strong> Finansal modelleme</p>
          <p><strong>9-10. Hafta:</strong> Rapor hazırlama ve sunum</p>

          <h3>Çıktılar</h3>
          <ul>
            <li>• 80-120 sayfalık detaylı fizibilite raporu</li>
            <li>• Yönetici özeti</li>
            <li>• Finansal model (Excel)</li>
            <li>• Teknik çizimler ve görseller</li>
            <li>• Sunum materyali</li>
            <li>• Uygulama önerileri</li>
          </ul>

          <h3>Fiyatlandırma</h3>
          <p><strong>Standart Fizibilite:</strong> ₺35.000 + KDV</p>
          <p><strong>Detaylı Fizibilite:</strong> ₺55.000 + KDV (Saha çalışması ve lab analizi dahil)</p>
        `
      },
      'greenhouse-design': {
        title: 'Sera Tasarımı',
        description: 'Modern teknoloji ve verimlilik odaklı sera tasarım çözümleri.',
        content: `
          <h3>Sera Tasarım Hizmetlerimiz</h3>
          <p>25 yıllık deneyimimizle, ihtiyaçlarınıza özel sera tasarımları geliştiriyoruz. Hem geleneksel hem de modern teknoloji entegrasyonlu seralar için çözümler sunuyoruz.</p>
          
          <h3>Tasarım Sürecimiz</h3>
          <h4>1. İhtiyaç Analizi</h4>
          <ul>
            <li>• Yetiştirme hedefleriniz</li>
            <li>• Arazi analizi ve oryantasyon</li>
            <li>• Bütçe ve zaman çerçevesi</li>
            <li>• Teknoloji seviyesi tercihi</li>
            <li>• Mevzuat ve izin gereksinimleri</li>
          </ul>

          <h4>2. Konsept Tasarım</h4>
          <ul>
            <li>• 3D görselleştirme</li>
            <li>• Yerleşim planı</li>
            <li>• Yapısal sistem seçimi</li>
            <li>• İklim kontrol sistemi tasarımı</li>
            <li>• Sulama ve gübreleme sistemi planı</li>
          </ul>

          <h4>3. Detay Tasarım</h4>
          <ul>
            <li>• Yapısal hesaplamalar</li>
            <li>• Elektrik ve otomasyon projeleri</li>
            <li>• Mekanik sistem detayları</li>
            <li>• Malzeme listesi ve spesifikasyonlar</li>
            <li>• Uygulama çizimleri</li>
          </ul>

          <h3>Sera Tipleri</h3>
          <h4>Cam Seralar</h4>
          <p>• En yüksek ışık geçirgenliği<br>• Uzun ömürlü ve dayanıklı<br>• Premium ürün yetiştiriciliği için ideal</p>

          <h4>Polikarbon Seralar</h4>
          <p>• Mükemmel yalıtım özelliği<br>• Orta-yüksek teknoloji seviyesi<br>• Enerji tasarrufu sağlar</p>

          <h4>Plastik Seralar</h4>
          <p>• Ekonomik çözüm<br>• Hızlı kurulum<br>• Başlangıç yatırımları için uygun</p>

          <h3>Teknoloji Entegrasyonu</h3>
          <ul>
            <li>• <strong>İklim Kontrolü:</strong> Otomatik havalandırma, ısıtma, soğutma</li>
            <li>• <strong>Sulama Otomasyonu:</strong> Damla sulama, fertigation sistemi</li>
            <li>• <strong>Çevre Kontrol:</strong> CO2 zenginleştirme, nem kontrolü</li>
            <li>• <strong>Enerji Sistemleri:</strong> Güneş paneli, ısı pompası</li>
            <li>• <strong>Monitöring:</strong> Uzaktan izleme ve kontrol sistemi</li>
          </ul>

          <h3>Projelerimizden Örnekler</h3>
          <p><strong>Antalya Modern Domates Serası:</strong> 5.000 m² cam sera, yıllık 150 ton verim</p>
          <p><strong>İzmir Organik Sebze Kompleksi:</strong> 12.000 m² polikarbon sera, GAP sertifikalı</p>
          <p><strong>Mersin İhracat Odaklı Biber Serası:</strong> 8.000 m² yüksek teknoloji sera</p>

          <h3>Hizmet Paketleri</h3>
          <p><strong>Temel Tasarım:</strong> ₺15/m² + KDV</p>
          <p><strong>Kapsamlı Tasarım:</strong> ₺25/m² + KDV</p>
          <p><strong>Anahtar Teslim Proje:</strong> Özel fiyatlandırma</p>
        `
      },
      'crop-planning': {
        title: 'Üretim Planlaması',
        description: 'Optimal verimlilik için stratejik ürün planlaması ve yetiştiricilik danışmanlığı.',
        content: `
          <h3>Üretim Planlaması Nedir?</h3>
          <p>Üretim planlaması, sera işletmenizde hangi ürünleri, ne zaman, ne miktarda ve nasıl yetiştireceğinizi belirleyen stratejik bir süreçtir. Maksimum verimlilik ve karlılık için kritik öneme sahiptir.</p>
          
          <h3>Planlama Yaklaşımımız</h3>
          <h4>Pazar Odaklı Planlama</h4>
          <ul>
            <li>• Talep analizi ve trend takibi</li>
            <li>• Fiyat dalgalanımları incelemesi</li>
            <li>• Sezonsal faktörler değerlendirmesi</li>
            <li>• Rekabet pozisyonu analizi</li>
            <li>• İhracat fırsatları araştırması</li>
          </ul>

          <h4>Teknik Optimizasyon</h4>
          <ul>
            <li>• Ürün-iklim uyumluluk analizi</li>
            <li>• Sera kapasitesi optimizasyonu</li>
            <li>• Çeşit seçimi danışmanlığı</li>
            <li>• Ekim-dikim takvimi</li>
            <li>• Rotasyon planlaması</li>
          </ul>

          <h3>Danışmanlık Hizmetlerimiz</h3>
          <h4>Ürün Portföyü Geliştirme</h4>
          <p>Sera koşullarınıza en uygun ürün karışımını belirlemek için:</p>
          <ul>
            <li>• Ana ürün seçimi (domates, biber, salatalık, vb.)</li>
            <li>• Çeşit karşılaştırması ve önerileri</li>
            <li>• Yıl içi ürün rotasyonu planı</li>
            <li>• Yeni ürün deneme programları</li>
            <li>• Organik geçiş danışmanlığı</li>
          </ul>

          <h4>Yetiştiricilik Teknikleri</h4>
          <p>Verim ve kaliteyi maksimize etmek için:</p>
          <ul>
            <li>• Fide kalitesi ve temin stratejisi</li>
            <li>• Dikim sıklığı optimizasyonu</li>
            <li>• Budama ve şekillendirme teknikleri</li>
            <li>• Gübreleme programı</li>
            <li>• Entegre mücadele planı</li>
            <li>• Hasat zamanlaması</li>
          </ul>

          <h3>Sezon Planlaması</h3>
          <h4>Kış Sezonu (Kasım-Mart)</h4>
          <p>• Domates, biber, patlıcan<br>• Yüksek fiyat avantajı<br>• Enerji maliyeti dikkat edilmeli</p>

          <h4>İlkbahar (Mart-Haziran)</h4>
          <p>• Hıyar, kabak, fasulye<br>• Hızlı büyüyen ürünler<br>• Pazar arzı dengesi önemli</p>

          <h4>Yaz Sezonu (Haziran-Eylül)</h4>
          <p>• Dış koşullara dayanıklı çeşitler<br>• Sulama planlaması kritik<br>• Soğutma maliyetleri</p>

          <h4>Sonbahar (Eylül-Kasım)</h4>
          <p>• Geçiş dönemi ürünleri<br>• Kış hazırlığı<br>• Toprak yenilemesi</p>

          <h3>Verim Hedefleri</h3>
          <table style="width: 100%; border-collapse: collapse; margin: 1rem 0;">
            <tr style="background: #f3f4f6;">
              <th style="padding: 0.5rem; border: 1px solid #d1d5db;">Ürün</th>
              <th style="padding: 0.5rem; border: 1px solid #d1d5db;">Geleneksel (kg/m²)</th>
              <th style="padding: 0.5rem; border: 1px solid #d1d5db;">Modern (kg/m²)</th>
            </tr>
            <tr>
              <td style="padding: 0.5rem; border: 1px solid #d1d5db;">Domates</td>
              <td style="padding: 0.5rem; border: 1px solid #d1d5db;">15-25</td>
              <td style="padding: 0.5rem; border: 1px solid #d1d5db;">35-55</td>
            </tr>
            <tr>
              <td style="padding: 0.5rem; border: 1px solid #d1d5db;">Biber</td>
              <td style="padding: 0.5rem; border: 1px solid #d1d5db;">8-12</td>
              <td style="padding: 0.5rem; border: 1px solid #d1d5db;">18-25</td>
            </tr>
            <tr>
              <td style="padding: 0.5rem; border: 1px solid #d1d5db;">Salatalık</td>
              <td style="padding: 0.5rem; border: 1px solid #d1d5db;">20-30</td>
              <td style="padding: 0.5rem; border: 1px solid #d1d5db;">45-65</td>
            </tr>
          </table>

          <h3>Hizmet Paketleri</h3>
          <p><strong>Temel Planlama:</strong> ₺5.000 + KDV (yıllık plan)</p>
          <p><strong>Detaylı Danışmanlık:</strong> ₺12.000 + KDV (sürekli takip dahil)</p>
          <p><strong>Uzman Desteği:</strong> ₺2.500/ay + KDV (haftalık ziyaret)</p>
        `
      }
    };

    return contentMap[sectionId] || contentMap['business-planning'];
  };

  const currentContent = getContentForSection(selectedSection);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header - Full width with 960px content container */}
      <header className="w-full bg-white border-b border-gray-200">
        <div className="navbar-footer-container">
          {/* Logo - clickable to homepage */}
          <div className="flex items-center space-x-3">
            <a href="/" className="flex items-center space-x-3">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2F2c7ec7c93776440b923d3518963fc941%2F96da5382e9584c3fb2d32eca60944359?format=webp&width=800"
                alt="SeraGPT Logo"
                className="h-8 w-auto"
              />
            </a>
          </div>

          {/* Center navigation - 3 links */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="/consulting" className="text-green-600 hover:text-green-700 font-medium transition-colors border-b-2 border-green-500 pb-1">
              Danışmanlık
            </a>
            <a href="/turnkey" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
              Anahtar Teslim
            </a>
            <a href="/support" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
              Destek
            </a>
          </nav>

          {/* Right menu - conditional based on user state */}
          <div className="hidden md:flex items-center space-x-4">
            {loading ? (
              // Loading state
              <div className="flex items-center space-x-4">
                <div className="w-20 h-6 bg-gray-200 rounded animate-pulse"></div>
                <div className="w-24 h-8 bg-gray-200 rounded animate-pulse"></div>
              </div>
            ) : user ? (
              // Logged in user
              <>
                <a href="/dashboard" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
                  Dashboard
                </a>
                <button
                  onClick={handleSignOut}
                  className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg font-medium transition-colors border border-gray-300 hover:border-gray-400"
                >
                  Çıkış Yap
                </button>
              </>
            ) : (
              // Not logged in
              <>
                <a href="/auth/login" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
                  Giriş Yap
                </a>
                <a href="/auth/login" className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                  Ücretsiz Başla
                </a>
              </>
            )}
          </div>

          {/* Mobile menu button - hamburger icon */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white border-t border-gray-200"
          >
            <div className="text-section-container py-4 space-y-4">
              {/* Center navigation links */}
              <div className="space-y-3">
                <a
                  href="/consulting"
                  className="block text-green-600 hover:text-green-700 font-medium transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Danışmanlık
                </a>
                <a
                  href="/turnkey"
                  className="block text-gray-700 hover:text-gray-900 font-medium transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Anahtar Teslim
                </a>
                <a
                  href="/support"
                  className="block text-gray-700 hover:text-gray-900 font-medium transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Destek
                </a>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-200 my-4"></div>

              {/* Right menu actions - conditional */}
              <div className="space-y-3">
                {loading ? (
                  // Loading state
                  <>
                    <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                  </>
                ) : user ? (
                  // Logged in user
                  <>
                    <a
                      href="/dashboard"
                      className="block text-gray-700 hover:text-gray-900 font-medium transition-colors py-2"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Dashboard
                    </a>
                    <button
                      onClick={() => {
                        handleSignOut();
                        setIsMobileMenuOpen(false);
                      }}
                      className="block w-full text-left text-gray-700 hover:text-gray-900 font-medium transition-colors py-2 border border-gray-300 rounded-lg px-4"
                    >
                      Çıkış Yap
                    </button>
                  </>
                ) : (
                  // Not logged in
                  <>
                    <a
                      href="/auth/login"
                      className="block text-gray-700 hover:text-gray-900 font-medium transition-colors py-2"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Giriş Yap
                    </a>
                    <a
                      href="/auth/login"
                      className="block bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg font-medium transition-colors text-center"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Ücretsiz Başla
                    </a>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </header>

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-3">
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <span>Danışmanlık Merkezi</span>
            <span>/</span>
            <span>İş Geliştirme</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="w-64 flex-shrink-0">
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              {sidebarSections.map((section) => (
                <div key={section.title}>
                  <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
                    <h3 className="text-sm font-medium text-gray-900">{section.title}</h3>
                  </div>
                  <div className="py-2">
                    {section.items.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => setSelectedSection(item.id)}
                        className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors flex items-center space-x-3 ${
                          selectedSection === item.id
                            ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-500'
                            : 'text-gray-700'
                        }`}
                      >
                        <span>{item.icon}</span>
                        <span>{item.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1">
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="p-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  {currentContent.title}
                </h1>
                
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  {currentContent.description}
                </p>

                <div 
                  className="prose prose-gray max-w-none"
                  style={{
                    color: '#374151',
                    lineHeight: '1.7'
                  }}
                >
                  <style jsx>{`
                    .prose h3 {
                      font-size: 1.25rem;
                      font-weight: 700;
                      color: #111827;
                      margin-top: 2rem;
                      margin-bottom: 0.75rem;
                    }
                    .prose h4 {
                      font-size: 1.125rem;
                      font-weight: 600;
                      color: #111827;
                      margin-top: 1.5rem;
                      margin-bottom: 0.5rem;
                    }
                    .prose p {
                      margin-bottom: 1rem;
                      line-height: 1.7;
                    }
                    .prose ul {
                      margin-bottom: 1.5rem;
                      padding-left: 1.5rem;
                    }
                    .prose li {
                      margin-bottom: 0.5rem;
                    }
                    .prose strong {
                      font-weight: 600;
                      color: #111827;
                    }
                    .prose table {
                      border-collapse: collapse;
                      margin: 1rem 0;
                      width: 100%;
                    }
                    .prose th, .prose td {
                      padding: 0.5rem;
                      border: 1px solid #d1d5db;
                    }
                    .prose th {
                      background: #f3f4f6;
                      font-weight: 600;
                    }
                  `}</style>
                  <div dangerouslySetInnerHTML={{ __html: currentContent.content }} />
                </div>

                {/* Contact CTA */}
                <div className="mt-12 p-6 bg-green-50 rounded-lg border border-green-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Danışmanlık almak ister misiniz?
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Uzman ekibimizle ücretsiz ön görüşme yaparak projenizi değerlendirebiliriz.
                  </p>
                  <div className="flex items-center space-x-4">
                    <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                      Ücretsiz Görüşme Talebi
                    </button>
                    <a href="tel:+902125550123" className="text-green-600 hover:text-green-700 font-medium">
                      📞 +90 (212) 555-0123
                    </a>
                  </div>
                  <p className="text-sm text-gray-600 mt-4">
                    E-posta ile iletişim:{' '}
                    <a href="mailto:danismanlik@seragpt.com" className="text-green-600 hover:text-green-700 font-medium">
                      danismanlik@seragpt.com
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
