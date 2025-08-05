'use client';

import { motion } from 'framer-motion';

export default function UserjotPricingSection() {
  const plans = [
    {
      name: "Başlangıç",
      price: "Ücretsiz",
      description: "Sera projelerinizi keşfetmek için",
      features: [
        "5 proje analizi",
        "Temel rapor",
        "E-mail desteği",
        "İklim analizi"
      ],
      cta: "Ücretsiz Başla",
      featured: false
    },
    {
      name: "Profesyonel",
      price: "₺299/ay",
      description: "Ciddi sera yatırımcıları için",
      features: [
        "Sınırsız proje analizi",
        "Detaylı raporlar",
        "Telefon desteği",
        "Risk analizi",
        "ROI hesaplama",
        "Uzman danışmanlık"
      ],
      cta: "14 Gün Ücretsiz Dene",
      featured: true
    },
    {
      name: "Kurumsal",
      price: "Özel Fiyat",
      description: "Büyük ölçekli projeler için",
      features: [
        "Özel entegrasyon",
        "Dedicated uzman",
        "SLA garantisi",
        "Özel raporlar",
        "Team yönetimi",
        "API erişimi"
      ],
      cta: "İletişime Geç",
      featured: false
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Sera projenizin büyüklüğüne uygun plan seçin
          </h2>
          <p className="text-xl text-gray-600">
            İlk 5 analiz tamamen ücretsiz. İstediğiniz zaman iptal edebilirsiniz.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`bg-white rounded-2xl p-8 relative ${
                plan.featured 
                  ? 'border-2 border-black shadow-xl' 
                  : 'border border-gray-200 hover:border-gray-300'
              } transition-all duration-300`}
            >
              {plan.featured && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-black text-white px-4 py-2 rounded-full text-sm font-medium">
                    En Popüler
                  </span>
                </div>
              )}
              
              <div className="text-center mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <div className="text-3xl font-bold text-gray-900 mb-2">{plan.price}</div>
                <p className="text-gray-600">{plan.description}</p>
              </div>
              
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-gray-600">
                    <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                  plan.featured
                    ? 'bg-black text-white hover:bg-gray-800'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }`}
              >
                {plan.cta}
              </motion.button>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-gray-600">
            Sorularınız mı var? <a href="#" className="text-black font-semibold hover:underline">Bizimle iletişime geçin</a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
