'use client';

import { motion } from 'framer-motion';

export default function ProblemSection() {
  const painPoints = [
    {
      icon: "📍",
      title: "Bölgeye özel fizibilite bulamamak",
      description: "Her bölgenin farklı iklim ve toprak koşulları var"
    },
    {
      icon: "👨‍💼",
      title: "Mühendis danışmanlığına erişememek",
      description: "Uzman görüşü almak pahalı ve zaman alıcı"
    },
    {
      icon: "⚙️",
      title: "Ekipman seçiminde kafa karışıklığı",
      description: "Hangi ekipmanın hangi koşulda uygun olduğu belirsiz"
    },
    {
      icon: "💰",
      title: "ROI hesaplarının güvenilmezliği",
      description: "Yatırım geri dönüş hesaplamaları tutarsız"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight">
            Sera Kurmak İstiyorsun Ama<br />
            <span className="text-red-600">Nereden Başlayacağını</span><br />
            Bilmiyor Musun?
          </h2>
          
          <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
            Bugün birçok yatırımcı, verimsiz bilgi kaynakları ve yüksek fiyatlı danışmanlıklar arasında sıkışıp kalıyor. 
            <span className="font-semibold text-red-600"> Herkes farklı bir şey söylüyor.</span><br />
            Peki, <span className="font-bold text-green-600">sana özel doğru çözüm nerede?</span>
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {painPoints.map((point, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-red-500 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-start space-x-4">
                <div className="text-3xl">{point.icon}</div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {point.title}
                  </h3>
                  <p className="text-gray-600">
                    {point.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-red-100 border border-red-300 rounded-lg p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-red-700 mb-4">
              ⚠️ Sonuç: Yanlış Kararlar ve Kayıp Zaman
            </h3>
            <p className="text-red-600 text-lg">
              Eksik bilgiyle alınan kararlar, hem maddi kayıplara hem de değerli zamanın israfına neden oluyor.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
