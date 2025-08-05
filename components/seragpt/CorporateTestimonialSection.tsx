'use client';

import { motion } from 'framer-motion';

export default function CorporateTestimonialSection() {
  const testimonials = [
    {
      quote: "SeraGPT Enterprise platformu, sera yatırım projelerimizde karar alma sürecimizi %60 hızlandırdı. Detaylı analiz raporları ve risk değerlendirmeleri sayesinde tüm yatırımlarımızı veri odaklı planlıyoruz.",
      author: "Dr. Mehmet Özkan",
      title: "Proje Direktörü",
      company: "Antalya Agro Holdings",
      avatar: "MÖ",
      metrics: {
        investment: "₺45M",
        roi: "%32.5",
        duration: "18 ay"
      }
    },
    {
      quote: "Platform sayesinde 12 farklı lokasyonda sera projelerimizi merkezi olarak yönetebiliyoruz. Gerçek zamanlı veri analizi ve uzman danışmanlık desteği, operasyonel verimliliğimizi ciddi oranda artırdı.",
      author: "İng. Ayşe Kaya",
      title: "Operasyon Müdürü", 
      company: "Mediterra Greenhouse",
      avatar: "AK",
      metrics: {
        projects: "12 Proje",
        efficiency: "+%45",
        cost: "-%28"
      }
    }
  ];

  const partners = [
    { name: "Antalya Agro", logo: "🌱" },
    { name: "Mediterra", logo: "🏢" },
    { name: "GreenTech", logo: "💚" },
    { name: "AgroVest", logo: "📈" },
    { name: "TurkAgri", logo: "🇹🇷" },
    { name: "SmartFarm", logo: "🤖" }
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
          <div className="inline-flex items-center px-4 py-2 bg-emerald-100 border border-emerald-200 rounded-full text-emerald-700 text-sm font-medium mb-8">
            <span className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></span>
            Müşteri Başarı Hikayeleri
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-800 mb-4">
            <span className="text-emerald-600">Kurumsal Müşterilerimiz</span><br />
            SeraGPT ile Büyüyor
          </h2>
        </motion.div>

        {/* Testimonials */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-slate-50 rounded-2xl p-8 border border-slate-200 hover:shadow-lg transition-shadow"
            >
              <div className="mb-6">
                <div className="text-5xl text-emerald-500 mb-4 opacity-50">"</div>
                <blockquote className="text-lg text-slate-700 leading-relaxed">
                  {testimonial.quote}
                </blockquote>
              </div>
              
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">{testimonial.avatar}</span>
                  </div>
                  <div>
                    <div className="font-bold text-slate-800">{testimonial.author}</div>
                    <div className="text-slate-600 text-sm">{testimonial.title}</div>
                    <div className="text-emerald-600 text-sm font-medium">{testimonial.company}</div>
                  </div>
                </div>
              </div>
              
              {/* Metrics */}
              <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-slate-200">
                {Object.entries(testimonial.metrics).map(([key, value], metricIndex) => (
                  <div key={metricIndex} className="text-center">
                    <div className="text-lg font-bold text-emerald-600">{value}</div>
                    <div className="text-xs text-slate-500 capitalize">{key}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Success Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl p-8 lg:p-12 text-white mb-16"
        >
          <h3 className="text-3xl font-bold text-center mb-12">Kurumsal Başarı Metrikleri</h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "500+", label: "Kurumsal Proje", color: "emerald" },
              { number: "₺2.5B+", label: "Toplam Yatırım", color: "blue" },
              { number: "%99.8", label: "Platform Uptime", color: "purple" },
              { number: "24/7", label: "Destek Hizmeti", color: "yellow" }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className={`text-3xl font-bold ${
                  stat.color === 'emerald' ? 'text-emerald-400' :
                  stat.color === 'blue' ? 'text-blue-400' :
                  stat.color === 'purple' ? 'text-purple-400' :
                  'text-yellow-400'
                }`}>
                  {stat.number}
                </div>
                <div className="text-slate-300 text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Partners */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h3 className="text-2xl font-bold text-slate-800 mb-8">Güvenilir Kurumsal Partnerler</h3>
          
          <div className="grid grid-cols-3 md:grid-cols-6 gap-6">
            {partners.map((partner, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl p-6 transition-colors group"
              >
                <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">
                  {partner.logo}
                </div>
                <div className="text-sm font-medium text-slate-600">{partner.name}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
