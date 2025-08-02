'use client';

import { motion } from 'framer-motion';

export default function UserjotTestimonialSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-gray-500 text-sm font-medium uppercase tracking-wider mb-8">
            Müşteri başarı hikayesi
          </p>
          
          <blockquote className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-8">
            <span className="text-gray-400">"</span>
            SeraGPT sayesinde Adana'daki 15.000 m² sera projemizde 
            doğru kararları aldık ve %32 ROI elde ettik.
            <span className="text-gray-400">"</span>
          </blockquote>
          
          <div className="flex items-center justify-center space-x-4">
            <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-gray-600 font-semibold">AK</span>
            </div>
            <div className="text-left">
              <div className="font-semibold text-gray-900">Ahmet Kaya</div>
              <div className="text-gray-600">Sera Yatırımcısı, Adana</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
