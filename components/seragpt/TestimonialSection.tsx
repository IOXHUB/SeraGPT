'use client';

import { motion } from 'framer-motion';

export default function TestimonialSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-green-50">
      <div className="visual-content-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            "Karar Vermeden Önce<br />
            <span className="text-green-600">SeraGPT'yi Kullandım"</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="body-content-container"
        >
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* Testimonial Content */}
              <div className="flex-1">
                <div className="text-6xl text-green-500 mb-4">"</div>
                <blockquote className="text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
                  <span className="font-semibold text-blue-600">Adana'da domates serası kurmak istiyordum</span> ama ne kadar bütçe gerektiğini, 
                  hangi ekipmanları kullanacağımı kestiremiyordom. 
                  <br /><br />
                  <span className="font-bold text-green-600">SeraGPT bana 1 dakikada tam bir yatırım raporu verdi.</span> 
                  Projeyi danışmanımla birlikte inceledik, doğrudan harekete geçtik.
                </blockquote>
                
                <div className="border-t border-gray-200 pt-6">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                      <span className="text-green-600 font-bold text-lg">AK</span>
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">Ahmet Kaya</div>
                      <div className="text-gray-600">Sera Yatırımcısı, Adana</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Visual Element */}
              <div className="flex-shrink-0">
                <div className="relative">
                  <div className="bg-gradient-to-br from-green-100 to-blue-100 rounded-2xl p-6 w-64 h-80">
                    <div className="bg-white rounded-lg p-4 mb-4 shadow-md">
                      <div className="text-sm font-bold text-gray-800 mb-2">📊 SeraGPT Raporu</div>
                      <div className="space-y-2">
                        <div className="h-2 bg-green-200 rounded"></div>
                        <div className="h-2 bg-blue-200 rounded w-3/4"></div>
                        <div className="h-2 bg-gray-200 rounded w-1/2"></div>
                      </div>
                    </div>
                    
                    <div className="bg-white rounded-lg p-4 shadow-md">
                      <div className="text-xs text-gray-600 mb-2">Yatırım Analizi</div>
                      <div className="text-lg font-bold text-green-600">₺2.8M</div>
                      <div className="text-xs text-gray-500">ROI: %34.2</div>
                    </div>
                  </div>
                  
                  <div className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full p-2">
                    <span className="text-lg">✓</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Results Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12"
        >
          {[
            { number: "1", unit: "DK", label: "Rapor Süresi" },
            { number: "2.8M", unit: "₺", label: "Yatırım Tutarı" },
            { number: "34", unit: "%", label: "ROI Oranı" },
            { number: "100", unit: "%", label: "Memnuniyet" }
          ].map((stat, index) => (
            <div key={index} className="text-center bg-white rounded-lg p-6 shadow-md">
              <div className="text-2xl md:text-3xl font-bold text-green-600">
                {stat.number}
                <span className="text-lg">{stat.unit}</span>
              </div>
              <div className="text-sm text-gray-600 mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
