'use client';

import { motion } from 'framer-motion';

export default function NewProblemSection() {
  const problems = [
    {
      title: "Bölgeye Özel Fizibilite",
      description: "Her bölgenin farklı iklim koşulları, toprak yapısı ve pazar dinamikleri var.",
      icon: "📍"
    },
    {
      title: "Uzman Danışman Eksikliği",
      description: "Sera teknolojileri konusunda uzman görüşüne erişim pahalı ve zaman alıcı.",
      icon: "👨‍💼"
    },
    {
      title: "Ekipman Karmaşası",
      description: "Hangi ekipmanın hangi koşulda uygun olduğu belirsiz ve kafa karıştırıcı.",
      icon: "⚙️"
    },
    {
      title: "Güvenilmez ROI Hesaplamaları",
      description: "Yatırım geri dönüş hesaplamaları tutarsız ve gerçekçi olmayan veriler.",
      icon: "💰"
    }
  ];

  return (
    <section className="py-20 bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 bg-red-500/20 border border-red-500/30 rounded-full text-red-400 text-sm mb-8">
            <span className="w-2 h-2 bg-red-400 rounded-full mr-2"></span>
            Mevcut Sorunlar
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold mb-8 leading-tight">
            Sera Yatırımında<br />
            <span className="text-red-400">Karşılaştığınız Zorluklar</span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Bugün birçok yatırımcı, <span className="text-red-400 font-semibold">verimsiz bilgi kaynakları</span> ve 
            yüksek fiyatlı danışmanlıklar arasında sıkışıp kalıyor.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {problems.map((problem, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 hover:border-red-400/50 rounded-xl p-8 transition-all duration-300 hover:shadow-xl hover:shadow-red-500/10">
                <div className="flex items-start space-x-4">
                  <div className="text-4xl">{problem.icon}</div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-red-400 transition-colors">
                      {problem.title}
                    </h3>
                    <p className="text-gray-300 leading-relaxed">
                      {problem.description}
                    </p>
                  </div>
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
          <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-8 max-w-2xl mx-auto">
            <div className="text-4xl mb-4">⚠️</div>
            <h3 className="text-2xl font-bold text-red-400 mb-4">
              Sonuç: Kayıp Zaman ve Para
            </h3>
            <p className="text-gray-300 text-lg">
              Eksik bilgiyle alınan kararlar, hem maddi kayıplara hem de 
              değerli zamanın israfına neden oluyor.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
