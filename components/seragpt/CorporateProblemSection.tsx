'use client';

import { motion } from 'framer-motion';

export default function CorporateProblemSection() {
  const challenges = [
    {
      title: "Veri Yetersizliği",
      description: "Kurumsal yatırım kararları için gereken detaylı veri analizi ve pazar araştırması eksikliği",
      icon: "📊",
      stats: "72% eksik veri"
    },
    {
      title: "Risk Yönetimi",
      description: "Sera yatırımlarında öngörülemeyen risklerin finansal etkilerini hesaplama zorluğu",
      icon: "⚠️",
      stats: "45% risk faktörü"
    },
    {
      title: "Uzman Kaynak Eksikliği",
      description: "Sektör deneyimine sahip uzman mühendis ve danışmanlara erişim sınırlılığı",
      icon: "👥",
      stats: "60% kaynak eksikliği"
    },
    {
      title: "Teknoloji Entegrasyonu",
      description: "Modern sera teknolojilerinin mevcut sistemlerle entegrasyonu ve uyumluluk sorunları",
      icon: "🔧",
      stats: "38% uyumsuzluk"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 bg-red-100 border border-red-200 rounded-full text-red-700 text-sm font-medium mb-8">
            <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
            Sektörel Zorluklar
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-800 mb-8 leading-tight">
            Kurumsal Sera Yatırımlarında<br />
            <span className="text-red-600">Karşılaşılan Zorluklar</span>
          </h2>
          
          <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
            Sektörel araştırmalarımız, kurumsal müşterilerin sera yatırımlarında 
            <span className="text-red-700 font-semibold"> kritik veri eksiklikleri</span> ve 
            <span className="text-red-700 font-semibold"> risk yönetimi sorunları</span> yaşadığını gösteriyor.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {challenges.map((challenge, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="bg-slate-50 hover:bg-white border border-slate-200 hover:border-red-200 rounded-2xl p-8 transition-all duration-300 hover:shadow-xl">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center text-2xl group-hover:bg-red-200 transition-colors">
                      {challenge.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-800 group-hover:text-red-700 transition-colors">
                        {challenge.title}
                      </h3>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-red-600">{challenge.stats}</div>
                    <div className="text-xs text-slate-500">sektör ortalaması</div>
                  </div>
                </div>
                
                <p className="text-slate-600 leading-relaxed">
                  {challenge.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Impact Summary */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-2xl p-8 lg:p-12"
        >
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-3xl font-bold text-slate-800 mb-4">
                <span className="text-red-600">Sonuç:</span> Verimsiz Yatırımlar
              </h3>
              <p className="text-lg text-slate-600 leading-relaxed mb-6">
                Bu zorluklar, kurumsal sera yatırımlarında ortalama %25 daha y��ksek maliyet 
                ve %40 daha uzun proje süreleri yaratıyor.
              </p>
              <div className="flex space-x-8">
                <div>
                  <div className="text-3xl font-bold text-red-600">+%25</div>
                  <div className="text-sm text-slate-500">Maliyet Artışı</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-red-600">+%40</div>
                  <div className="text-sm text-slate-500">Süre Uzaması</div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
              <h4 className="font-bold text-slate-800 mb-4">Finansal Etki Analizi</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-slate-600">Planlanan Bütçe:</span>
                  <span className="font-semibold">₺10M</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Ortalama Aşım:</span>
                  <span className="font-semibold text-red-600">₺2.5M</span>
                </div>
                <div className="flex justify-between border-t border-slate-200 pt-3">
                  <span className="text-slate-800 font-semibold">Toplam Maliyet:</span>
                  <span className="font-bold text-slate-800">₺12.5M</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
