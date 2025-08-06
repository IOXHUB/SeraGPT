'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function DanismanlikPage() {
  const [activeSection, setActiveSection] = useState('project-consulting');

  const sidebarSections = [
    {
      title: 'Proje Danışmanlığı',
      id: 'consulting',
      icon: '🎯',
      items: [
        { id: 'project-consulting', title: 'Proje Danışmanlığı Hizmeti', href: '#project-consulting' },
        { id: 'preliminary-meeting', title: 'Ön Görüşme', href: '#preliminary-meeting' },
        { id: 'data-analysis', title: 'Veri Analizi', href: '#data-analysis' },
        { id: 'custom-report', title: 'Özel Rapor Hazırlama', href: '#custom-report' },
        { id: 'qa-support', title: 'Soru-Cevap Desteği', href: '#qa-support' },
        { id: 'implementation-guidance', title: 'Uygulama Yönlendirmesi', href: '#implementation-guidance' }
      ]
    },
    {
      title: 'Fiyatlandırma',
      id: 'pricing',
      icon: '💰',
      items: [
        { id: 'pricing-plans', title: 'Fiyatlandırma Planları', href: '#pricing-plans' },
        { id: 'starter-consulting', title: 'Starter Danışmanlık', href: '#starter-consulting' },
        { id: 'project-reporting', title: 'Proje Raporlama Paketi', href: '#project-reporting' },
        { id: 'corporate-consulting', title: 'Kurumsal Danışmanlık', href: '#corporate-consulting' }
      ]
    },
    {
      title: 'Hedef Kitle',
      id: 'target-audience',
      icon: '👥',
      items: [
        { id: 'target-groups', title: 'Hedef Gruplar', href: '#target-groups' },
        { id: 'investment-advisors', title: 'Yatırımcı Danışmanları', href: '#investment-advisors' },
        { id: 'corporate-projects', title: 'Kurumsal Projeler', href: '#corporate-projects' },
        { id: 'engineering-offices', title: 'Mühendislik Ofisleri', href: '#engineering-offices' }
      ]
    }
  ];

  const contentData = {
    'project-consulting': {
      title: 'Proje Danışmanlığı Hizmeti',
      subtitle: 'Help Center / Danışmanlık',
      description: 'Kullanıcının AI çıktısından daha fazlasına ihtiyacı varsa, tecrübeli mühendisler tarafından birebir proje danışmanlığı sunulur. 20+ yıl deneyimli uzman ekibimizle sera yatırımınızı en verimli şekilde planlayın.',
      steps: [
        {
          title: '1. Ön Görüşme',
          items: [
            'Zoom/telefon ile proje ihtiyacı belirlenir',
            'Lokasyon değerlendirmesi yapılır',
            'Hedef ve beklentiler netleştirilir',
            'Proje kapsamı ve sınırları çizilir'
          ]
        },
        {
          title: '2. Veri Analizi',
          items: [
            'Kullanıcının sunduğu veriler manuel olarak değerlendirilir',
            'İklim verileri detaylı analiz edilir',
            'Toprak ve saha koşulları incelenir',
            'Pazar araştırması ve karlılık analizi yapılır'
          ]
        },
        {
          title: '3. Özel Rapor',
          items: [
            'Kullanıcıya özel oluşturulmuş PDF raporlar',
            'Teknik çizimler ve 3D görselleştirmeler',
            'Alternatif çözüm senaryoları sunumu',
            'Maliyet analizi ve ROI hesaplamaları'
          ]
        },
        {
          title: '4. Soru-Cevap Desteği',
          items: [
            'Belirli bir süre (7 gün) teknik soru-cevap desteği',
            'E-posta ve telefon üzerinden danışmanlık',
            'Rapor detaylarının açıklanması',
            'İlave sorular için uzman görüşü'
          ]
        },
        {
          title: '5. Uygulama Yönlendirmesi',
          items: [
            'Kurulum sürecinde yönlendirme',
            'Altyapı hazırlıkları konusunda rehberlik',
            'Satın alma süreçlerinde destek',
            'Tedarikçi önerileri ve değerlendirme'
          ]
        }
      ]
    },
    'preliminary-meeting': {
      title: 'Ön Görüşme Süreci',
      subtitle: 'Help Center / Danışmanlık',
      description: 'Proje danışmanlığının ilk adımı olan ön görüşmede, uzman mühendislerimiz projenizin ihtiyaçlarını detaylı şekilde analiz eder.',
      steps: [
        {
          title: 'Görüşme Hazırlığı',
          items: [
            'Ön bilgi formunun doldurulması',
            'Saha fotoğrafları ve dokümanların hazırlanması',
            'Bütçe ve zaman planının belirlenmesi',
            'Hedef ürün ve kapasitesinin netleştirilmesi'
          ]
        },
        {
          title: 'Görüşme İçeriği',
          items: [
            'Proje hedeflerinin detaylı analizi',
            'Saha koşullarının değerlendirilmesi',
            'Teknik gereksinimlerin belirlenmesi',
            'İlk önerilerin sunulması'
          ]
        }
      ]
    },
    'pricing-plans': {
      title: 'Fiyatlandırma Planları',
      subtitle: 'Help Center / Danışmanlık',
      description: 'Proje danışmanlığı hizmetlerimiz için esnek fiyatlandırma seçenekleri sunuyoruz. İhtiyacınıza uygun paketi seçebilirsiniz.',
      steps: [
        {
          title: 'Starter Danışmanlık - 11.950₺',
          items: [
            'Temel proje değerlendirmesi',
            '1 saatlik detaylı görüşme',
            'Basit fizibilite raporu',
            '3 gün soru-cevap desteği'
          ]
        },
        {
          title: 'Proje Raporlama + Görüşme Paketi - 44.900₺',
          items: [
            'Kapsamlı proje analizi ve raporlama',
            'Detaylı teknik çizimler',
            'Alternatif çözüm senaryoları',
            '7 gün soru-cevap desteği',
            'Uygulama sürecinde yönlendirme'
          ]
        },
        {
          title: 'Kurumsal Proje Danışmanlığı - Teklif Usulü',
          items: [
            'Büyük ölçekli projeler için özel fiyatlandırma',
            'Uzun vadeli danışmanlık anlaşmaları',
            'Saha ziyaretleri dahil',
            'Sürekli teknik destek'
          ]
        }
      ]
    },
    'target-groups': {
      title: 'Hedef Kitle',
      subtitle: 'Help Center / Danışmanlık',
      description: 'Proje danışmanlığı hizmetimiz, sera yatırımı konusunda profesyonel destek ihtiyacı olan farklı grupları hedeflemektedir.',
      steps: [
        {
          title: 'Yatırımcı Danışmanları',
          items: [
            'Sera yatırımı planlayan danışmanlık firmaları',
            'Portföy yöneticileri',
            'Yatırım bankalarının tarım departmanları',
            'Özel sektör yatırım uzmanları'
          ]
        },
        {
          title: 'Kurumsal Projeler',
          items: [
            'Büyük ölçekli gıda üretim şirketleri',
            'Devlet destekli tarım projeleri',
            'Uluslararası kalkınma projeleri',
            'Holding şirketlerinin tarım kolları'
          ]
        },
        {
          title: 'Ziraat Mühendisliği Ofisleri',
          items: [
            'Serbest mühendislik büroları',
            'Tarımsal proje geliştirme şirketleri',
            'Teknik danışmanlık firmaları',
            'Sera teknolojileri uzmanları'
          ]
        },
        {
          title: 'Girişimciler',
          items: [
            'Sera altyapısı kurmak isteyen küçük ölçekli girişimciler',
            'Orta ölçekli tarım işletmeleri',
            'Aile işletmeleri',
            'Yeni nesil çiftçiler'
          ]
        }
      ]
    }
  };

  const currentContent = contentData[activeSection as keyof typeof contentData] || contentData['project-consulting'];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <a href="/" className="flex items-center">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2F2c7ec7c93776440b923d3518963fc941%2F96da5382e9584c3fb2d32eca60944359?format=webp&width=800"
                  alt="SeraGPT Logo"
                  className="h-8 w-auto"
                />
              </a>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="/destek" className="text-gray-600 hover:text-gray-900 font-medium">
                Destek
              </a>
              <a href="/danismanlik" className="text-gray-600 hover:text-gray-900 font-medium">
                Danışmanlık
              </a>
              <a href="/anahtar-teslim-proje" className="text-gray-600 hover:text-gray-900 font-medium">
                Anahtar Teslim Sera
              </a>
              <a href="/auth/login" className="text-gray-600 hover:text-gray-900 font-medium">
                Giriş Yap
              </a>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              {sidebarSections.map((section) => (
                <div key={section.id} className="mb-6">
                  <div className="flex items-center space-x-2 mb-3">
                    <span className="text-lg">{section.icon}</span>
                    <h3 className="font-semibold text-gray-900">{section.title}</h3>
                  </div>
                  <div className="space-y-1 ml-6">
                    {section.items.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => setActiveSection(item.id)}
                        className={`block w-full text-left px-3 py-2 text-sm rounded-lg transition-all duration-200 ${
                          activeSection === item.id
                            ? 'bg-blue-100 text-blue-900 font-medium'
                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                        }`}
                      >
                        {item.title}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <button 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                  onClick={() => window.location.href = '/destek'}
                >
                  Danışmanlık Talep Et
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-white rounded-lg border border-gray-200 p-8">
              {/* Breadcrumb */}
              <div className="text-sm text-gray-500 mb-6">
                {currentContent.subtitle}
              </div>

              {/* Title */}
              <h1 className="text-3xl font-bold text-gray-900 mb-6">
                {currentContent.title}
              </h1>

              {/* Description */}
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                {currentContent.description}
              </p>

              {/* Content Steps */}
              <div className="space-y-8">
                {currentContent.steps.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="border-l-4 border-blue-200 pl-6"
                  >
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">
                      {step.title}
                    </h2>
                    <div className="space-y-2">
                      {step.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="flex items-start space-x-3">
                          <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
                            <span className="text-xs font-medium text-blue-600">
                              {itemIndex + 1}
                            </span>
                          </div>
                          <p className="text-gray-700">{item}</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Next Steps */}
              <div className="mt-12 p-6 bg-blue-50 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-4">Sonraki Adımlar</h3>
                <div className="space-y-2">
                  <p className="text-gray-700">
                    • Size uygun danışmanlık paketini seçin
                  </p>
                  <p className="text-gray-700">
                    • Ön görüşme için randevu alın
                  </p>
                  <p className="text-gray-700">
                    • Proje detaylarınızı uzmanlarımızla paylaşın
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
