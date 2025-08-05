'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import Footer from '@/components/Footer';

export default function SupportPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSection, setSelectedSection] = useState('getting-started');

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
      title: 'Rehberler',
      items: [
        { id: 'getting-started', label: 'Hızlı Başlangıç', icon: '🚀' },
        { id: 'create-reports', label: 'Rapor Oluşturma', icon: '📊' },
        { id: 'ai-chat', label: 'AI Sohbet', icon: '🤖' },
        { id: 'download-pdf', label: 'PDF İndirme', icon: '📄' },
        { id: 'billing', label: 'Faturalandırma', icon: '💳' }
      ]
    },
    {
      title: 'Özellikler',
      items: [
        { id: 'roi-analysis', label: 'ROI Analizi', icon: '💰' },
        { id: 'climate-analysis', label: 'İklim Analizi', icon: '🌡️' },
        { id: 'equipment-list', label: 'Ekipman Listesi', icon: '🔧' },
        { id: 'market-data', label: 'Pazar Verileri', icon: '📈' },
        { id: 'layout-planning', label: 'Yerleşim Planı', icon: '🏗️' }
      ]
    },
    {
      title: 'Teknik',
      items: [
        { id: 'api-integration', label: 'API Entegrasyonu', icon: '⚡' },
        { id: 'data-sources', label: 'Veri Kaynakları', icon: '🔗' },
        { id: 'troubleshooting', label: 'Sorun Giderme', icon: '🛠️' }
      ]
    }
  ];

  const getContentForSection = (sectionId: string) => {
    const contentMap = {
      'getting-started': {
        title: 'Hızlı Başlangıç',
        description: 'SeraGPT ile ilk raporunuzu oluşturmak için izlemeniz gereken adımlar.',
        content: `
          <h3>1. Hesap Oluşturma</h3>
          <p>SeraGPT'ye kayıt olmak için "Ücretsiz Başla" butonuna tıklayın. ��lk 5 rapor tamamen ücretsizdir ve kredi kartı gerektirmez.</p>
          
          <h3>2. İlk Analiz Türünüzü Seçin</h3>
          <p>Dashboard'da 5 farklı analiz türü arasından seçim yapabilirsiniz:</p>
          <ul>
            <li>• ROI (Yatırım Geri Dönüş) Analizi</li>
            <li>• İklim Uyumluluk Analizi</li>
            <li>• Ekipman ve Maliyet Listesi</li>
            <li>• Pazar Fiyat Analizi</li>
            <li>• Yerleşim Plan Görselleştirmesi</li>
          </ul>

          <h3>3. Gerekli Bilgileri Girin</h3>
          <p>Her analiz türü için gerekli parametreleri girin (lokasyon, bitki türü, sera büyüklüğü vb.). Sistem size rehberlik edecektir.</p>

          <h3>4. Raporunuzu Alın</h3>
          <p>Analiz yaklaşık 60 saniye içinde tamamlanır ve PDF formatında indirilebilir raporunuz hazır olur.</p>
        `
      },
      'ai-chat': {
        title: 'AI Sohbet Özelliği',
        description: 'Raporlarınız üzerinden yapay zeka ile nasıl sohbet edeceğinizi öğrenin.',
        content: `
          <h3>AI Sohbet Nedir?</h3>
          <p>SeraGPT'nin AI sohbet özelliği, ürettiğiniz raporlar üzerinden yapay zeka ile etkileşim kurmanızı sağlar. Raporlarınızı daha derinlemesine analiz edebilir, alternatif öneriler alabilir ve sorularınıza anında cevap bulabilirsiniz.</p>
          
          <h3>Nasıl Kullanılır?</h3>
          <p>1. Dashboard'da herhangi bir raporu açın</p>
          <p>2. "AI Sohbet" sekmesine tıklayın</p>
          <p>3. Rapor hakkında sorularınızı sorun</p>
          <p>4. AI size detaylı açıklamalar ve öneriler sunar</p>

          <h3>Örnek Sorular</h3>
          <ul>
            <li>• "ROI'mi nasıl daha da artırabilirim?"</li>
            <li>• "Bu iklim koşullarında hangi alternatif bitkiler yetiştirebilirim?"</li>
            <li>• "Ekipman maliyetlerimi nasıl düşürebilirim?"</li>
            <li>• "Pazarda hangi dönemlerde daha çok kar edebilirim?"</li>
          </ul>

          <h3>AI Sohbet Avantajları</h3>
          <p>✓ 7/24 anında yanıt</p>
          <p>✓ Kişiselleştirilmiş öneriler</p>
          <p>✓ Raporunuza özel analiz</p>
          <p>✓ Sınırsız soru sorma hakkı</p>
        `
      },
      'roi-analysis': {
        title: 'ROI (Yatırım Geri Dönüş) Analizi',
        description: 'Sera yatırımınızın geri dönüş süresini ve karlılığını hesaplayın.',
        content: `
          <h3>ROI Analizi Nedir?</h3>
          <p>ROI (Return on Investment) analizi, sera yatırımınızın ne kadar sürede geri döneceğini ve yıllık karlılığınızı hesaplayan detaylı bir finansal analizdir.</p>
          
          <h3>Analiz Çıktıları</h3>
          <ul>
            <li>• <strong>Geri Dönüş Süresi:</strong> Yatırımınızın kaç yılda kendini amorti edeceği</li>
            <li>• <strong>Yıllık Kar Tahmini:</strong> Beklenen yıllık net kar miktarı</li>
            <li>• <strong>Maliyet Dağılımı:</strong> İlk yatırım ve işletme maliyetleri</li>
            <li>• <strong>Gelir Projeksiyonu:</strong> 3 yıllık gelir tahmini</li>
            <li>• <strong>Risk Analizi:</strong> Olası risklerin finansal etkileri</li>
          </ul>

          <h3>Gerekli Veriler</h3>
          <p>ROI analizi için ihtiyacımız olan bilgiler:</p>
          <ul>
            <li>• Sera konumu (il/ilçe)</li>
            <li>• Sera büyüklüğü (m²)</li>
            <li>• Yetiştirmek istediğiniz bitki türü</li>
            <li>• Sera tipi (plastik, cam, polikarbon)</li>
            <li>• Teknoloji seviyesi (geleneksel, otomatik)</li>
            <li>• Hedef üretim kapasitesi</li>
          </ul>

          <h3>Veri Kaynakları</h3>
          <p>Analizde kullanılan güvenilir veri kaynakları:</p>
          <ul>
            <li>• TUİK (Türkiye İstatistik Kurumu)</li>
            <li>• FAO (Birleşmiş Milletler Gıda ve Tarım Örgütü)</li>
            <li>• Türkiye Hal Fiyatları</li>
            <li>• Seraburada.com API</li>
            <li>• Gerçek zamanlı enerji fiyatları</li>
          </ul>
        `
      },
      'troubleshooting': {
        title: 'Sorun Giderme',
        description: 'Karşılaştığınız teknik sorunlar için çözüm önerileri.',
        content: `
          <h3>Sık Karşılaşılan Sorunlar</h3>
          
          <h4>1. Rapor Oluşturulmuyor</h4>
          <p><strong>Sebep:</strong> Eksik veya hatalı bilgi girişi</p>
          <p><strong>Çözüm:</strong></p>
          <ul>
            <li>• Tüm zorunlu alanları doldurduğunuzdan emin olun</li>
            <li>• Lokasyon bilgisinin doğru seçildiğini kontrol edin</li>
            <li>• Sera büyüklüğünün makul sınırlar içinde olduğunu kontrol edin</li>
            <li>• Sayfayı yenileyin ve tekrar deneyin</li>
          </ul>

          <h4>2. PDF İndirilmiyor</h4>
          <p><strong>Sebep:</strong> Tarayıcı popup engelleyicisi veya geçici teknik sorun</p>
          <p><strong>Çözüm:</strong></p>
          <ul>
            <li>• Popup engelleyiciyi devre dışı bırakın</li>
            <li>• Farklı bir tarayıcı deneyin</li>
            <li>• Rapor listesinden tekrar indirmeyi deneyin</li>
            <li>• Destek ekibiyle iletişime geçin</li>
          </ul>

          <h4>3. AI Sohbet Yanıt Vermiyor</h4>
          <p><strong>Sebep:</strong> Sunucu yoğunluğu veya ağ bağlantısı sorunu</p>
          <p><strong>Çözüm:</strong></p>
          <ul>
            <li>• İnternet bağlantınızı kontrol edin</li>
            <li>• Birkaç dakika bekleyip tekrar deneyin</li>
            <li>• Sorunuzu daha kısa ve net şekilde sorun</li>
            <li>• Sayfayı yenileyin</li>
          </ul>

          <h4>4. Hesap Giriş Sorunu</h4>
          <p><strong>Sebep:</strong> Yanlış şifre veya hesap doğrulama sorunu</p>
          <p><strong>Çözüm:</strong></p>
          <ul>
            <li>• E-posta adresinizi doğru yazdığınızdan emin olun</li>
            <li>• "Şifremi Unuttum" özelliğini kullanın</li>
            <li>• E-posta doğrulama linkini kontrol edin</li>
            <li>• Farklı bir tarayıcı veya gizli mod deneyin</li>
          </ul>

          <h3>Destek Al</h3>
          <p>Sorununuz devam ediyorsa, destek ekibimizle iletişime geçin:</p>
          <ul>
            <li>• E-posta: destek@seragpt.com</li>
            <li>• Canlı Destek: Dashboard'daki sohbet butonunu kullanın</li>
            <li>• Telefon: +90 (212) 555-0123 (09:00-18:00)</li>
          </ul>
        `
      }
    };

    return contentMap[sectionId] || contentMap['getting-started'];
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
            <a href="/how-it-works" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
              Nasıl Çalışır
            </a>
            <a href="#" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
              Danışmanlık
            </a>
            <a href="/support" className="text-green-600 hover:text-green-700 font-medium transition-colors border-b-2 border-green-500 pb-1">
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
                  href="/how-it-works"
                  className="block text-gray-700 hover:text-gray-900 font-medium transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Nasıl Çalışır
                </a>
                <a
                  href="#"
                  className="block text-gray-700 hover:text-gray-900 font-medium transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Danışmanlık
                </a>
                <a
                  href="/support"
                  className="block text-green-600 hover:text-green-700 font-medium transition-colors py-2"
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
            <span>Destek Merkezi</span>
            <span>/</span>
            <span>Özellikler</span>
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
                  `}</style>
                  <div dangerouslySetInnerHTML={{ __html: currentContent.content }} />
                </div>

                {/* Help Action */}
                <div className="mt-12 p-6 bg-gray-50 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Bu size yardımcı oldu mu?
                  </h3>
                  <div className="flex items-center space-x-4">
                    <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                      <span>👍</span>
                      <span>Evet</span>
                    </button>
                    <button className="flex items-center space-x-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
                      <span>👎</span>
                      <span>Hayır</span>
                    </button>
                  </div>
                  <p className="text-sm text-gray-600 mt-4">
                    Daha fazla yardıma ihtiyacınız varsa{' '}
                    <a href="#" className="text-green-600 hover:text-green-700 font-medium">
                      destek ekibimizle iletişime geçin
                    </a>
                    .
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
