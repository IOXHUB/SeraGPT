'use client';

import { motion } from 'framer-motion';

export default function NewTestimonialSection() {
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
          <div className="inline-flex items-center px-4 py-2 bg-blue-500/20 border border-blue-500/30 rounded-full text-blue-400 text-sm mb-8">
            <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
            Müşteri Deneyimi
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            "SeraGPT ile <span className="text-green-400">Doğru Karar Verdim"</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 md:p-12">
            <div className="grid md:grid-cols-3 gap-8 items-center">
              {/* Testimonial Content */}
              <div className="md:col-span-2">
                <div className="text-6xl text-green-400 mb-4 opacity-50">"</div>
                <blockquote className="text-lg md:text-xl text-gray-300 leading-relaxed mb-8">
                  <span className="text-blue-400 font-semibold">Adana'da domates serası kurmak istiyordum</span> ama ne kadar bütçe gerektiğini, 
                  hangi ekipmanları kullanacağımı kestiremiyordom. 
                  <br /><br />
                  <span className="text-green-400 font-bold">SeraGPT bana 1 dakikada tam bir yatırım raporu verdi.</span> 
                  Projeyi danışmanımla birlikte inceledik, doğrudan harekete geçtik.
                </blockquote>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-gray-900 font-bold text-lg">AK</span>
                  </div>
                  <div>
                    <div className="font-bold text-white">Ahmet Kaya</div>
                    <div className="text-gray-400">Sera Yatırımcısı, Adana</div>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="space-y-6">
                <div className="bg-gray-900/50 border border-gray-700 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-green-400">₺2.8M</div>
                  <div className="text-sm text-gray-400">Yatırım Tutarı</div>
                </div>
                <div className="bg-gray-900/50 border border-gray-700 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-blue-400">%34.2</div>
                  <div className="text-sm text-gray-400">ROI Oranı</div>
                </div>
                <div className="bg-gray-900/50 border border-gray-700 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-yellow-400">1 DK</div>
                  <div className="text-sm text-gray-400">Analiz Süresi</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Success Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16"
        >
          {[
            { number: "50+", label: "Başarılı Proje", color: "green" },
            { number: "10K+", label: "Mutlu Müşteri", color: "blue" },
            { number: "%95", label: "Doğruluk Oranı", color: "purple" },
            { number: "20+", label: "Yıl Deneyim", color: "yellow" }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className={`text-2xl md:text-3xl font-bold ${
                stat.color === 'green' ? 'text-green-400' :
                stat.color === 'blue' ? 'text-blue-400' :
                stat.color === 'purple' ? 'text-purple-400' :
                'text-yellow-400'
              }`}>
                {stat.number}
              </div>
              <div className="text-sm text-gray-400 mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
