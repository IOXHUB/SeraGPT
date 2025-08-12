'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const faqData = [
    {
      id: 1,
      question: 'SeraGPT nasıl çalışır?',
      answer: 'SeraGPT, 20 yıllık tecrübemiz ve 500+ projedeki verilerimizden yararlanarak sera yatırımınız için detaylı analiz raporları hazırlar. Lokasyon, iklim, bitki türü ve bütçe bilgilerinizi girerek ROI, iklim uygunluğu, ekipman önerileri ve pazar analizi alabilirsiniz.'
    },
    {
      id: 2,
      question: 'Hangi analiz türlerini sunuyorsunuz?',
      answer: 'SeraGPT platformunda ROI Analizi, İklim Uygunluk Analizi, Ekipman Listesi, Pazar Analizi ve Teknik Planlar olmak üzere 5 temel analiz türü bulunmaktadır. Her analiz, gerçek veriler kullanılarak hazırlanır.'
    },
    {
      id: 3,
      question: 'Proje danışmanlığı hizmetiniz nedir?',
      answer: '20 yıllık tecrübemizle, SeraGPT raporları yeterli gelmediğinde yerinde keşif yaparak projelendirme desteği, yatırım danışmanlığı ve pazarlama yönetimi konularında bütüncül yaklaşımla danışmanlık hizmeti sunuyoruz.'
    },
    {
      id: 4,
      question: 'Anahtar teslim sera hizmeti var mı?',
      answer: 'Evet! İspanyol çözüm ortağımız Serapoli ile birlikte çalışarak tek elden anahtar teslim hizmet sunuyoruz. Danışmanlık hizmetimize ek olarak imalat, montaj, kurulum, zirai danışmanlık ve servis hizmetleri için proje teklifi verebiliriz.'
    },
    {
      id: 5,
      question: 'Destek hattınız nasıl çalışır?',
      answer: 'Destek hattımız ticket şeklinde e-posta ile çalışmaktadır. Sorularınızı cevaplıyor, panel kullanımı ve teknik sorulara etkili çözümler sunmaya çalışıyoruz. Destek talebinizi oluşturduktan sonra uzman ekibimiz size dönüş yapacaktır.'
    },
    {
      id: 6,
      question: 'Raporların güvenilirliği nedir?',
      answer: 'Raporlarımız 20 yıllık sera tecrübemiz ve 500+ başarılı projeden elde edilen gerçek veriler üzerine kurulmuştur. Tarımsal zeka uygulamamız, güncel piyasa verileri ve iklim bilgileri ile desteklenmektedir.'
    },
    {
      id: 7,
      question: 'Hangi bölgelerde hizmet veriyorsunuz?',
      answer: 'Türkiye genelinde tüm bölgeler için analiz hizmeti sunabiliyoruz. Anahtar teslim proje hizmetimiz için yerinde keşif ve projelendirme desteği de sağlamaktayız.'
    },
    {
      id: 8,
      question: 'Fiyatlandırma nasıl?',
      answer: 'SeraGPT temel analizleri için farklı paket seçeneklerimiz bulunmaktadır. Proje danışmanlığı ve anahtar teslim hizmetler için özel teklifler hazırlanmaktadır. Detaylı bilgi için danışmanlık sayfamızı ziyaret edebilirsiniz.'
    }
  ];

  const filteredFaqs = faqData.filter(faq => {
    const matchesSearch = searchQuery === '' || 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#f6f8f9]">
      {/* Hero Section */}
      <section className="bg-[#146448] text-white py-20">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center max-w-[896px] mx-auto">
            <h1 className="text-4xl font-bold mb-6">
              Yardım Merkezi
            </h1>
            <p className="text-xl mb-8 opacity-90 max-w-[576px] mx-auto">
              SeraGPT hakkında aklınıza takılan soruların yanıtlarını bulun. 
              Sera yatırımı konusunda size yardımcı olmaya hazırız.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto mb-8">
              <input
                type="text"
                placeholder="Sorunuzu yazın..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-4 pl-14 bg-white border border-gray-300 rounded-xl text-[#146448] placeholder-gray-500 focus:ring-2 focus:ring-[#baf200] focus:border-[#baf200]"
              />
              <svg className="absolute left-5 top-5 w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-[#146448] mb-4">Sıkça Sorulan Sorular</h2>
            <p className="text-gray-600 max-w-[576px] mx-auto">
              Sera yatırımı ve SeraGPT platformu hakkında merak ettikleriniz
            </p>
          </div>

          <div className="max-w-[896px] mx-auto space-y-4">
            {filteredFaqs.map((faq) => (
              <div key={faq.id} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <h3 className="font-medium text-[#146448] flex-1 text-left">
                    {faq.question}
                  </h3>
                  <svg 
                    className={`w-5 h-5 text-[#146448] transition-transform ${
                      expandedFaq === faq.id ? 'rotate-180' : ''
                    }`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {expandedFaq === faq.id && (
                  <div className="px-6 pb-4 text-gray-600 border-t border-gray-100">
                    <p className="leading-relaxed pt-4 max-w-[576px]">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {filteredFaqs.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-medium text-[#146448] mb-2">
                Aradığınız sonuç bulunamadı
              </h3>
              <p className="text-gray-600 mb-6">
                Farklı anahtar kelimeler deneyin veya destek ekibimizle iletişime geçin
              </p>
              <Link href="/destek">
                <button className="bg-[#146448] text-white px-6 py-3 rounded-xl hover:bg-[#0f4f37] transition-colors">
                  Destek Talebi Oluştur
                </button>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Support Channels */}
      <section className="py-16 bg-[#f6f8f9]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-[#146448] mb-4">Destek Kanalları</h2>
            <p className="text-gray-600 max-w-[576px] mx-auto">
              Sorununuzu çözemediğiniz durumda uzman ekibimizle iletişime geçin
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-[896px] mx-auto">
            <div className="bg-white border border-gray-200 rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300">
              <div className="text-4xl mb-4">📧</div>
              <h3 className="font-bold text-[#146448] mb-2">E-posta Desteği</h3>
              <p className="text-gray-600 text-sm mb-4">Ticket sistemi ile detaylı destek</p>
              <div className="text-sm text-gray-500 mb-4">
                24 saat içinde yanıt
              </div>
              <Link href="/destek">
                <button className="w-full bg-[#146448] text-white py-3 rounded-xl hover:bg-[#0f4f37] transition-colors font-medium">
                  Destek Talebi Oluştur
                </button>
              </Link>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300">
              <div className="text-4xl mb-4">👨‍🔬</div>
              <h3 className="font-bold text-[#146448] mb-2">Proje Danışmanlığı</h3>
              <p className="text-gray-600 text-sm mb-4">20 yıl tecrübe ile uzman danışmanlık</p>
              <div className="text-sm text-gray-500 mb-4">
                Yerinde keşif ve projelendirme
              </div>
              <Link href="/danismanlik">
                <button className="w-full bg-[#146448] text-white py-3 rounded-xl hover:bg-[#0f4f37] transition-colors font-medium">
                  Danışmanlık Talep Et
                </button>
              </Link>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300">
              <div className="text-4xl mb-4">🏗️</div>
              <h3 className="font-bold text-[#146448] mb-2">Anahtar Teslim Proje</h3>
              <p className="text-gray-600 text-sm mb-4">Serapoli ortaklığı ile tam hizmet</p>
              <div className="text-sm text-gray-500 mb-4">
                İmalat, montaj, kurulum, servis
              </div>
              <Link href="/anahtar-teslim-proje">
                <button className="w-full bg-[#146448] text-white py-3 rounded-xl hover:bg-[#0f4f37] transition-colors font-medium">
                  Proje Teklifi Al
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-[#146448] text-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center max-w-[576px] mx-auto">
            <h2 className="text-2xl font-bold mb-4">
              Hala cevap bulamadınız mı?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              20 yıllık tecrübemiz ve 500+ projedeki deneyimimizle size yardımcı olmaya hazırız
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/destek">
                <button className="bg-[#baf200] text-[#146448] px-8 py-4 rounded-xl font-bold hover:bg-[#a5e600] transition-colors">
                  Destek Talebi Oluştur
                </button>
              </Link>
              <Link href="/danismanlik">
                <button className="bg-white/10 text-white px-8 py-4 rounded-xl font-bold hover:bg-white/20 transition-colors border border-white/30">
                  Uzman Danışmanlığı
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
