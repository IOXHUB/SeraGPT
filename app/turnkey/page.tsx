'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import Footer from '@/components/Footer';

export default function TurnkeyPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSection, setSelectedSection] = useState('project-planning');

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
      title: 'Proje Planlama',
      items: [
        { id: 'project-planning', label: 'Kapsamlı Proje Planı', icon: '📋' },
        { id: 'site-analysis', label: 'Arazi Analizi', icon: '🗺️' },
        { id: 'design-engineering', label: 'Tasarım & Mühendislik', icon: '📐' },
        { id: 'permit-licensing', label: 'İzin & Lisanslama', icon: '📄' },
        { id: 'timeline-budget', label: 'Zaman & Bütçe Planı', icon: '📅' }
      ]
    },
    {
      title: 'İnşaat & Kurulum',
      items: [
        { id: 'construction', label: 'Sera İnşaatı', icon: '🏗️' },
        { id: 'infrastructure', label: 'Altyapı Sistemleri', icon: '⚡' },
        { id: 'automation-setup', label: 'Otomasyon Kurulumu', icon: '🤖' },
        { id: 'climate-systems', label: 'İklim Kontrol Sistemleri', icon: '🌡️' },
        { id: 'irrigation-install', label: 'Sulama Sistemleri', icon: '💧' }
      ]
    },
    {
      title: 'Teslim & Destek',
      items: [
        { id: 'commissioning', label: 'Devreye Alma', icon: '🔧' },
        { id: 'training', label: 'Personel Eğitimi', icon: '👨‍🏫' },
        { id: 'warranty', label: 'Garanti & Bakım', icon: '🛡️' },
        { id: 'ongoing-support', label: 'Sürekli Destek', icon: '🤝' }
      ]
    }
  ];

  const getContentForSection = (sectionId: string) => {
    const contentMap = {
      'project-planning': {
        title: 'Kapsamlı Proje Planı',
        description: 'Sera projenizi baştan sona planlıyor, her detayı düşünüyoruz.',
        content: `
          <h3>Anahtar Teslim Proje Yaklaşımımız</h3>
          <p>SeraGPT olarak, sera projelerinizi A'dan Z'ye tamamlıyor, size sadece anahtarı teslim ediyoruz. 15 yıllık deneyimimizle, karmaşık süreçleri sizin için basitleştiriyoruz.</p>
          
          <h3>Proje Planlama Süreci</h3>
          <h4>1. İlk Değerlendirme</h4>
          <ul>
            <li>• Hedefleriniz ve beklentileriniz</li>
            <li>• Bütçe çerçevesi belirleme</li>
            <li>• Lokasyon ön değerlendirmesi</li>
            <li>• Teknoloji seviyesi tercihi</li>
            <li>• Zaman çizelgesi planlama</li>
          </ul>

          <h4>2. Detaylı Fizibilite</h4>
          <ul>
            <li>• Arazi ve çevre analizleri</li>
            <li>• İklim ve toprak uygunluk raporu</li>
            <li>• Altyapı gereksinim analizi</li>
            <li>• Finansal fizibilite hesaplaması</li>
            <li>• Risk değerlendirmesi</li>
          </ul>

          <h4>3. Konsept Tasarım</h4>
          <ul>
            <li>• 3D görselleştirme</li>
            <li>• Yapısal sistem seçimi</li>
            <li>• Teknoloji entegrasyonu planı</li>
            <li>• Enerji verimliliği optimizasyonu</li>
            <li>• Sürdürülebilirlik analizi</li>
          </ul>

          <h3>Proje Kapsamımız</h3>
          <p><strong>Temel Kapsam:</strong></p>
          <ul>
            <li>• Sera yapısı (çelik konstrüksiyon + örtü)</li>
            <li>• Temel havalandırma sistemi</li>
            <li>• Basit sulama sistemi</li>
            <li>• Elektrik altyapısı</li>
            <li>• Temel ısıtma sistemi</li>
          </ul>

          <p><strong>Premium Kapsam:</strong></p>
          <ul>
            <li>• Temel kapsam + gelişmiş özellikler</li>
            <li>• Tam otomatik iklim kontrolü</li>
            <li>• Akıllı sulama ve gübreleme</li>
            <li>• CO2 zenginleştirme sistemi</li>
            <li>• Uzaktan izleme ve kontrol</li>
            <li>• Enerji yönetim sistemi</li>
          </ul>

          <h3>Süreç ve Zaman Çizelgesi</h3>
          <table style="width: 100%; border-collapse: collapse; margin: 1rem 0;">
            <tr style="background: #f3f4f6;">
              <th style="padding: 0.75rem; border: 1px solid #d1d5db;">Aşama</th>
              <th style="padding: 0.75rem; border: 1px solid #d1d5db;">Süre</th>
              <th style="padding: 0.75rem; border: 1px solid #d1d5db;">Açıklama</th>
            </tr>
            <tr>
              <td style="padding: 0.75rem; border: 1px solid #d1d5db;">Planlama</td>
              <td style="padding: 0.75rem; border: 1px solid #d1d5db;">2-4 Hafta</td>
              <td style="padding: 0.75rem; border: 1px solid #d1d5db;">Tasarım, izinler, tedarik planı</td>
            </tr>
            <tr>
              <td style="padding: 0.75rem; border: 1px solid #d1d5db;">İnşaat</td>
              <td style="padding: 0.75rem; border: 1px solid #d1d5db;">4-8 Hafta</td>
              <td style="padding: 0.75rem; border: 1px solid #d1d5db;">Yapı, altyapı, sistem kurulumu</td>
            </tr>
            <tr>
              <td style="padding: 0.75rem; border: 1px solid #d1d5db;">Test & Teslim</td>
              <td style="padding: 0.75rem; border: 1px solid #d1d5db;">1-2 Hafta</td>
              <td style="padding: 0.75rem; border: 1px solid #d1d5db;">Komisyon, eğitim, teslim</td>
            </tr>
          </table>

          <h3>Garantilerimiz</h3>
          <ul>
            <li>• <strong>Yapısal Garanti:</strong> 10 yıl yapı garantisi</li>
            <li>• <strong>Sistem Garantisi:</strong> 2 yıl tam sistem garantisi</li>
            <li>• <strong>Performans Garantisi:</strong> Belirtilen verim hedefleri</li>
            <li>• <strong>Servis Garantisi:</strong> 7/24 acil müdahale</li>
          </ul>
        `
      },
      'site-analysis': {
        title: 'Arazi Analizi',
        description: 'Sera projesi için arazinizin detaylı teknik ve çevresel analizi.',
        content: `
          <h3>Kapsamlı Arazi Değerlendirmesi</h3>
          <p>Başarılı bir sera projesi için arazi seçimi ve analizi kritik öneme sahiptir. Uzman ekibimiz, arazinizin sera işletmeciliği için uygunluğunu her açıdan değerlendirir.</p>
          
          <h3>Analiz Kapsamımız</h3>
          <h4>Jeoteknik İnceleme</h4>
          <ul>
            <li>• Zemin etüdü ve taşıma kapasitesi</li>
            <li>• Drenaj durumu ve su seviyesi</li>
            <li>• Eğim ve tesviye gereksinimleri</li>
            <li>• Deprem bölgesi değerlendirmesi</li>
            <li>• Jeolojik risk analizi</li>
          </ul>

          <h4>İklim ve Çevre Analizi</h4>
          <ul>
            <li>• Mikroklima koşulları</li>
            <li>• Rüzgar analizi ve yön belirleme</li>
            <li>• Güneşlenme süresi ve açı hesabı</li>
            <li>• Donma riski değerlendirmesi</li>
            <li>• Yağış rejimi ve drenaj ihtiyacı</li>
          </ul>

          <h4>Altyapı Değerlendirmesi</h4>
          <ul>
            <li>• Elektrik bağlantı durumu ve kapasitesi</li>
            <li>• Su kaynağı analizi ve kalitesi</li>
            <li>• Ulaşım durumu ve lojistik</li>
            <li>• Haberleşme altyapısı</li>
            <li>• Atık su yönetimi</li>
          </ul>

          <h3>Yasal ve İdari İnceleme</h3>
          <h4>İmar ve Planlama</h4>
          <ul>
            <li>• İmar durumu ve yapılaşma koşulları</li>
            <li>• Tarımsal alan koruma kararları</li>
            <li>• Çevre izinleri gereksinimleri</li>
            <li>• Belediye ve il özel idaresi izinleri</li>
            <li>• Komşuluk hakları ve mesafeler</li>
          </ul>

          <h4>Teşvik ve Destek İmkanları</h4>
          <ul>
            <li>• TKDK hibeleri uygunluk analizi</li>
            <li>• TÜBİTAK destekleri</li>
            <li>• Ziraat Bankası kredileri</li>
            <li>• Yatırım teşvik sistemi</li>
            <li>• Organik tarım destekleri</li>
          </ul>

          <h3>Arazi Optimizasyonu</h3>
          <h4>Yerleşim Planlaması</h4>
          <p>Arazinin en verimli şekilde kullanılması için:</p>
          <ul>
            <li>• Sera konumlandırması (kuzey-güney yönlendirme)</li>
            <li>• Servis binası ve depo lokasyonları</li>
            <li>• Araç giriş-çıkış yolları</li>
            <li>• Gelecekteki genişleme alanları</li>
            <li>• Peyzaj ve çevre düzenlemesi</li>
          </ul>

          <h4>Fazlama Planlaması</h4>
          <p>Büyük projelerde aşamalı gelişim:</p>
          <ul>
            <li>• 1. Faz: Pilot sera (2.000-5.000 m²)</li>
            <li>• 2. Faz: Ana üretim alanı genişlemesi</li>
            <li>• 3. Faz: Paketleme ve soğuk hava deposu</li>
            <li>• 4. Faz: İleri teknoloji entegrasyonu</li>
          </ul>

          <h3>Analiz Raporları</h3>
          <p>Arazi analizi sonrasında şu raporları teslim ediyoruz:</p>
          <ul>
            <li>• <strong>Jeoteknik Rapor:</strong> Zemin ve yapısal uygunluk</li>
            <li>• <strong>İklim Analiz Raporu:</strong> Çevresel koşullar</li>
            <li>• <strong>Altyapı Durum Raporu:</strong> Mevcut imkanlar</li>
            <li>• <strong>Yasal Durum Raporu:</strong> İzin ve onay durumu</li>
            <li>• <strong>Optimizasyon Önerileri:</strong> En iyi kullanım planı</li>
            <li>• <strong>Maliyet Tahmin Raporu:</strong> Arazi hazırlama maliyetleri</li>
          </ul>

          <h3>Süreç ve Fiyatlandırma</h3>
          <p><strong>Analiz Süresi:</strong> 1-2 hafta (arazi büyüklüğüne göre)</p>
          <p><strong>Temel Analiz:</strong> ₺8.000 + KDV (5.000 m²'ye kadar)</p>
          <p><strong>Kapsamlı Analiz:</strong> ₺15.000 + KDV (Laboratuvar testleri dahil)</p>
          <p><strong>Büyük Projeler:</strong> Özel fiyatlandırma (10.000 m² üzeri)</p>
        `
      },
      'construction': {
        title: 'Sera İnşaatı',
        description: 'Modern teknoloji ve kaliteli malzemelerle sera inşaat sürecimiz.',
        content: `
          <h3>Sera İnşaat Sürecimiz</h3>
          <p>15 yıllık deneyimimizle, uluslararası standartlarda sera inşaatı gerçekleştiriyoruz. Avrupa normlarına uygun malzeme ve işçilik kalitesi garantisi veriyoruz.</p>
          
          <h3>İnşaat Aşamaları</h3>
          <h4>1. Hazırlık ve Temel İşleri</h4>
          <ul>
            <li>• Arazi temizliği ve tesviyesi</li>
            <li>• Jeoteknik gereksinimlere göre kazı</li>
            <li>• Armeli beton temel dökümü</li>
            <li>• Drenaj sistemi kurulumu</li>
            <li>• Altyapı kanalları ve borulama</li>
          </ul>

          <h4>2. Çelik Konstrüksiyon</h4>
          <ul>
            <li>• CE sertifikalı galvanizli çelik profil</li>
            <li>• Rüzgar ve kar yükü hesaplı tasarım</li>
            <li>• Hassas montaj ve ölçüm</li>
            <li>• Akor ve bağlantı elemanları</li>
            <li>• Deprem yönetmeliğine uygun yapı</li>
          </ul>

          <h4>3. Örtü Sistemleri</h4>
          <ul>
            <li>• Çift cam, polikarbon veya plastik film</li>
            <li>• UV korumalı malzemeler</li>
            <li>• Hava sızdırmazlık kontrollü</li>
            <li>• Profesyonel montaj teknikleri</li>
            <li>• 10 yıl malzeme garantisi</li>
          </ul>

          <h3>Kullandığımız Teknolojiler</h3>
          <h4>Çelik Konstrüksiyon</h4>
          <table style="width: 100%; border-collapse: collapse; margin: 1rem 0;">
            <tr style="background: #f3f4f6;">
              <th style="padding: 0.75rem; border: 1px solid #d1d5db;">Özellik</th>
              <th style="padding: 0.75rem; border: 1px solid #d1d5db;">Standart</th>
              <th style="padding: 0.75rem; border: 1px solid #d1d5db;">Premium</th>
            </tr>
            <tr>
              <td style="padding: 0.75rem; border: 1px solid #d1d5db;">Çelik Profil</td>
              <td style="padding: 0.75rem; border: 1px solid #d1d5db;">Sıcak galvaniz S235</td>
              <td style="padding: 0.75rem; border: 1px solid #d1d5db;">Sıcak galvaniz S355</td>
            </tr>
            <tr>
              <td style="padding: 0.75rem; border: 1px solid #d1d5db;">Kar Yükü</td>
              <td style="padding: 0.75rem; border: 1px solid #d1d5db;">75 kg/m²</td>
              <td style="padding: 0.75rem; border: 1px solid #d1d5db;">100 kg/m²</td>
            </tr>
            <tr>
              <td style="padding: 0.75rem; border: 1px solid #d1d5db;">Rüzgar Yükü</td>
              <td style="padding: 0.75rem; border: 1px solid #d1d5db;">120 km/h</td>
              <td style="padding: 0.75rem; border: 1px solid #d1d5db;">150 km/h</td>
            </tr>
            <tr>
              <td style="padding: 0.75rem; border: 1px solid #d1d5db;">Garanti</td>
              <td style="padding: 0.75rem; border: 1px solid #d1d5db;">10 yıl</td>
              <td style="padding: 0.75rem; border: 1px solid #d1d5db;">15 yıl</td>
            </tr>
          </table>

          <h4>Örtü Malzemesi Seçenekleri</h4>
          <p><strong>1. Çift Cam Sera (Premium)</strong></p>
          <ul>
            <li>• 4mm temperli güvenlik camı</li>
            <li>• Maksimum ışık geçirgenliği (%91)</li>
            <li>• Mükemmel yalıtım (U=2.8 W/m²K)</li>
            <li>• 25+ yıl ömür</li>
            <li>• Fırtına ve dolu dayanımı</li>
          </ul>

          <p><strong>2. Polikarbon Sera (Orta-Üst Seviye)</strong></p>
          <ul>
            <li>• 8-16mm çift cidarlı polikarbon</li>
            <li>• İyi ışık dağılımı ve yalıtım</li>
            <li>• Darbe dayanımı yüksek</li>
            <li>• UV koruma kaplama</li>
            <li>• 15+ yıl ömür</li>
          </ul>

          <p><strong>3. Plastik Film Sera (Ekonomik)</strong></p>
          <ul>
            <li>• Çift katmanlı PE film</li>
            <li>• Anti-drip ve UV stabilize</li>
            <li>• Termal özellikli film</li>
            <li>• 3-4 yıl değişim periyodu</li>
            <li>• Düşük yatırım maliyeti</li>
          </ul>

          <h3>Kalite Kontrol ve Testler</h3>
          <ul>
            <li>• <strong>Statik Test:</strong> Yapısal dayanım kontrolleri</li>
            <li>• <strong>Hava Sızdırmazlık:</strong> ISO 12567 standardında test</li>
            <li>• <strong>Malzeme Sertifikaları:</strong> CE belgeli malzemeler</li>
            <li>• <strong>Montaj Kalitesi:</strong> Üretici standartlarında kontrol</li>
            <li>• <strong>Güvenlik Testi:</strong> İş güvenliği önlemleri</li>
          </ul>

          <h3>İnşaat Süresi ve Maliyet</h3>
          <h4>Tipik İnşaat Süreleri</h4>
          <ul>
            <li>• <strong>1.000 m² Sera:</strong> 3-4 hafta</li>
            <li>• <strong>5.000 m² Sera:</strong> 6-8 hafta</li>
            <li>• <strong>10.000 m² Sera:</strong> 10-12 hafta</li>
            <li>• <strong>Büyük Kompleksler:</strong> Proje bazında</li>
          </ul>

          <h4>Maliyete Etki Eden Faktörler</h4>
          <ul>
            <li>• Sera büyüklüğü ve tipi</li>
            <li>• Arazi koşulları ve hazırlık işleri</li>
            <li>• Örtü malzemesi seçimi</li>
            <li>• Teknoloji seviyesi</li>
            <li>• Altyapı gereksinimleri</li>
            <li>• Lokasyon ve ulaşım</li>
          </ul>

          <h3>İş Güvenliği ve Sigorta</h3>
          <ul>
            <li>• İSG uzmanı eşliğinde inşaat</li>
            <li>• İş kazası sigortası kapsamı</li>
            <li>• Güvenlik ekipmanları kullanımı</li>
            <li>• Düzenli güvenlik denetimleri</li>
            <li>• Acil durum planları</li>
          </ul>
        `
      },
      'commissioning': {
        title: 'Devreye Alma',
        description: 'Sera sisteminizin kusursuz çalışması için kapsamlı devreye alma süreci.',
        content: `
          <h3>Sistemlerin Devreye Alınması</h3>
          <p>İnşaatın tamamlanmasından sonra, sera sistemlerinizin optimal performansla çalışması için kapsamlı bir devreye alma süreci uyguluyoruz. Bu süreç, sistemlerin güvenli ve verimli çalışmasını garantiler.</p>
          
          <h3>Devreye Alma Aşamaları</h3>
          <h4>1. Sistem Kontrolleri</h4>
          <ul>
            <li>• Elektrik sistemleri güvenlik testleri</li>
            <li>• Sulama hatlarında basınç testleri</li>
            <li>• İklim kontrol sensörlerinin kalibrasyonu</li>
            <li>• Havalandırma sistemleri fonksiyon testi</li>
            <li>• Otomasyon yazılımı yapılandırması</li>
          </ul>

          <h4>2. Performance Testleri</h4>
          <ul>
            <li>• Isıtma sistemi kapasitesi ölçümü</li>
            <li>• Soğutma sistemleri verimlilik testi</li>
            <li>• Su dağıtım homojenliği kontrolü</li>
            <li>• Gübre karışım sistemi hassasiyet testi</li>
            <li>• CO2 dağıtım sistemi kalibrasyonu</li>
          </ul>

          <h4>3. Entegrasyon Testleri</h4>
          <ul>
            <li>• Sistem entegrasyonu ve haberleşme</li>
            <li>• Alarm sistemleri çalışma testi</li>
            <li>• Uzaktan erişim ve kontrol testi</li>
            <li>• Acil durum senaryoları testi</li>
            <li>• Veri kaydı ve raporlama kontrolü</li>
          </ul>

          <h3>Kalibrasyon ve Ayarlamalar</h3>
          <h4>İklim Kontrol Kalibrasyonu</h4>
          <ul>
            <li>• Sıcaklık sensörlerinin hassas ayarı</li>
            <li>• Nem sensörleri kalibrasyonu</li>
            <li>• CO2 sensörlerinin ayarlanması</li>
            <li>• Işık sensörleri optimizasyonu</li>
            <li>• Rüzgar sensörleri kalibrasyonu</li>
          </ul>

          <h4>Sulama Sistemi Optimizasyonu</h4>
          <ul>
            <li>• Damlatıcı debilerinin eşitlenmesi</li>
            <li>• Basınç kompanzatörleri ayarı</li>
            <li>• Gübre karışım oranları kalibrasyonu</li>
            <li>• pH ve EC kontrol sistemleri</li>
            <li>• Drenaj sistemi optimize</li>
          </ul>

          <h3>Operasyon Eğitimi</h3>
          <h4>Teknik Personel Eğitimi</h4>
          <p><strong>Süre:</strong> 3-5 gün kapsamlı eğitim</p>
          <ul>
            <li>• Sistem tanıtımı ve temel prensipler</li>
            <li>• Günlük operasyon prosedürleri</li>
            <li>• Kontrol paneli kullanımı</li>
            <li>• Bakım ve temizlik işlemleri</li>
            <li>• Sorun giderme teknikleri</li>
          </ul>

          <h4>Yönetici Eğitimi</h4>
          <p><strong>Süre:</strong> 2 gün stratejik eğitim</p>
          <ul>
            <li>• Sistem genel bakışı</li>
            <li>• Verimlilik ve maliyet optimizasyonu</li>
            <li>• Raporlama ve analiz</li>
            <li>• Stratejik planlama</li>
            <li>• ROI izleme metodları</li>
          </ul>

          <h3>Dokümantasyon ve Belgeler</h3>
          <h4>Teknik Dokümantasyon</h4>
          <ul>
            <li>• <strong>İşletme Kılavuzu:</strong> Adım adım kullanım talimatları</li>
            <li>• <strong>Bakım Planı:</strong> Periyodik bakım programı</li>
            <li>• <strong>Yedek Parça Listesi:</strong> Kritik parçalar ve kodları</li>
            <li>• <strong>Acil Durum Prosedürleri:</strong> Kriz yönetimi planı</li>
            <li>• <strong>Güvenlik Talimatları:</strong> İş güvenliği prosedürleri</li>
          </ul>

          <h4>Garanti Belgeleri</h4>
          <ul>
            <li>• Sistem garanti sertifikaları</li>
            <li>• Ekipman garanti belgeleri</li>
            <li>• Performans garanti raporu</li>
            <li>• Bakım servis anlaşması</li>
            <li>• 7/24 destek iletişim bilgileri</li>
          </ul>

          <h3>İlk Üretim Desteği</h3>
          <h4>Pilot Üretim Aşaması</h4>
          <p><strong>Süre:</strong> İlk 3 ay sürekli destek</p>
          <ul>
            <li>• Haftalık sistem performans incelemesi</li>
            <li>• Üretim parametreleri optimizasyonu</li>
            <li>• Verim takibi ve analizi</li>
            <li>• Sorun giderme desteği</li>
            <li>• İyileştirme önerilerinin uygulanması</li>
          </ul>

          <h4>Uzaktan İzleme</h4>
          <ul>
            <li>• 7/24 sistem durumu takibi</li>
            <li>• Anormallik durumunda otomatik alarm</li>
            <li>• Uzaktan müdahale imkanı</li>
            <li>• Aylık performans raporları</li>
            <li>• Trend analizi ve öneriler</li>
          </ul>

          <h3>Kabul Testleri</h3>
          <h4>Performans Kriterleri</h4>
          <table style="width: 100%; border-collapse: collapse; margin: 1rem 0;">
            <tr style="background: #f3f4f6;">
              <th style="padding: 0.75rem; border: 1px solid #d1d5db;">Sistem</th>
              <th style="padding: 0.75rem; border: 1px solid #d1d5db;">Performans Hedefi</th>
              <th style="padding: 0.75rem; border: 1px solid #d1d5db;">Kabul Kriteri</th>
            </tr>
            <tr>
              <td style="padding: 0.75rem; border: 1px solid #d1d5db;">Isıtma</td>
              <td style="padding: 0.75rem; border: 1px solid #d1d5db;">Tasarım sıcaklığına ulaşma</td>
              <td style="padding: 0.75rem; border: 1px solid #d1d5db;">≤ 30 dakika</td>
            </tr>
            <tr>
              <td style="padding: 0.75rem; border: 1px solid #d1d5db;">Havalandırma</td>
              <td style="padding: 0.75rem; border: 1px solid #d1d5db;">Hava değişim kapasitesi</td>
              <td style="padding: 0.75rem; border: 1px solid #d1d5db;">≥ 40 hava değişimi/saat</td>
            </tr>
            <tr>
              <td style="padding: 0.75rem; border: 1px solid #d1d5db;">Sulama</td>
              <td style="padding: 0.75rem; border: 1px solid #d1d5db;">Debi homojenliği</td>
              <td style="padding: 0.75rem; border: 1px solid #d1d5db;">≥ 95% uniformite</td>
            </tr>
          </table>

          <h3>Devreye Alma Süreci</h3>
          <p><strong>Süre:</strong> 1-2 hafta (sistem karmaşıklığına göre)</p>
          <p><strong>Ekip:</strong> Sistem mühendisi, elektrik teknisyeni, otomasyon uzmanı</p>
          <p><strong>Sonuç:</strong> Kabul testi raporu ve resmi teslim belgesi</p>

          <h3>Garanti Kapsamı</h3>
          <ul>
            <li>• <strong>Sistem Garantisi:</strong> 2 yıl tam garanti</li>
            <li>• <strong>Performans Garantisi:</strong> Belirtilen verim hedefleri</li>
            <li>• <strong>Servis Garantisi:</strong> 7/24 acil müdahale</li>
            <li>• <strong>Uzaktan Destek:</strong> 1 yıl ücretsiz uzaktan izleme</li>
          </ul>
        `
      }
    };

    return contentMap[sectionId] || contentMap['project-planning'];
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
            <a href="/consulting" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
              Danışmanlık
            </a>
            <a href="/turnkey" className="text-green-600 hover:text-green-700 font-medium transition-colors border-b-2 border-green-500 pb-1">
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
                  className="block text-gray-700 hover:text-gray-900 font-medium transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Danışmanlık
                </a>
                <a
                  href="/turnkey"
                  className="block text-green-600 hover:text-green-700 font-medium transition-colors py-2"
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
            <span>Anahtar Teslim Proje</span>
            <span>/</span>
            <span>Proje Planlama</span>
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
                      padding: 0.75rem;
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
                <div className="mt-12 p-6 bg-blue-50 rounded-lg border border-blue-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Anahtar Teslim Projenizi Planlayalım
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Uzman ekibimizle ücretsiz ön görüşme yaparak sera projenizi değerlendirebiliriz.
                  </p>
                  <div className="flex items-center space-x-4">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                      Ücretsiz Proje Değerlendirmesi
                    </button>
                    <a href="tel:+902125550123" className="text-blue-600 hover:text-blue-700 font-medium">
                      📞 +90 (212) 555-0123
                    </a>
                  </div>
                  <p className="text-sm text-gray-600 mt-4">
                    E-posta ile iletişim:{' '}
                    <a href="mailto:proje@seragpt.com" className="text-blue-600 hover:text-blue-700 font-medium">
                      proje@seragpt.com
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
