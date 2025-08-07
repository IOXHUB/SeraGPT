'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function CorporateHeroSection() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'SeraGPT Enterprise analiz platformuna hoş geldiniz. Kurumsal sera yatırım projeleriniz için kapsamlı fizibilite raporları hazırlıyoruz. Proje lokasyonunuz nerededir?'
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const responses = [
        'Mükemmel. Bu bölge için detaylı iklim analizi ve pazar araştırması yapıyorum. Hedef üretim kapasitesi ve yatırım bütçeniz nedir?',
        'Analiz tamamlandı. Kurumsal standardlarda hazırlanmış detaylı fizibilite raporu 24 saat içinde e-posta adresinize ulaşacak.',
        'Risk analizi, ROI hesaplamaları ve uzman mühendis değerlendirmeleri dahil kapsamlı rapor hazırlanıyor.'
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      setMessages(prev => [...prev, { role: 'assistant', content: randomResponse }]);
      setIsTyping(false);
    }, 2000);
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200/50 sticky top-0 z-40">
        <div className="page-section-container py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-xl font-bold text-white">S</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-800">SeraGPT</h1>
                <p className="text-xs text-slate-500">Enterprise Analytics</p>
              </div>
            </div>
            
            <nav className="hidden lg:flex items-center space-x-8">
              <a href="#" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">Çözümler</a>
              <a href="#" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">Ürünler</a>
              <a href="#" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">Kurumsal</a>
              <a href="#" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">Destek</a>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors">
                Demo Talep Et
              </button>
            </nav>
          </div>
        </div>
      </header>

      <div className="page-section-container py-16">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 border border-blue-200 rounded-full text-blue-700 text-sm font-medium">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
              Kurumsal Çözümler
            </div>
            
            <h2 className="text-5xl lg:text-6xl font-bold text-slate-800 leading-tight">
              Sera Yatırım<br />
              <span className="text-blue-600">Analitiği</span>
            </h2>
            
            <p className="text-xl text-slate-600 leading-relaxed">
              Kurumsal müşterilerimiz için özel geliştirilmiş yapay zeka destekli sera yatırım analiz platformu. 
              <span className="text-blue-700 font-semibold"> Veri odaklı kararlar alın, riskleri minimize edin.</span>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold shadow-lg transition-all"
              >
                Ücretsiz Konsültasyon
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="border-2 border-slate-300 hover:border-blue-600 text-slate-700 hover:text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold transition-all"
              >
                Ürün Demosu
              </motion.button>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-slate-200">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">500+</div>
                <div className="text-sm text-slate-500 font-medium">Kurumsal Proje</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">50M+</div>
                <div className="text-sm text-slate-500 font-medium">Analiz Edilen Veri</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">99.8%</div>
                <div className="text-sm text-slate-500 font-medium">Doğruluk Oranı</div>
              </div>
            </div>
          </motion.div>

          {/* Right - Analytics Dashboard */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
              {/* Dashboard Header */}
              <div className="bg-slate-50 border-b border-slate-200 px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                      <span className="text-sm font-bold text-white">AI</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-800">Enterprise Analytics</h3>
                      <p className="text-xs text-emerald-600 flex items-center">
                        <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></span>
                        Aktif
                      </p>
                    </div>
                  </div>
                  <div className="text-xs text-slate-500">v2.1.0</div>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="h-80 overflow-y-auto p-6 space-y-4">
                {messages.map((message, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-sm px-4 py-3 rounded-2xl ${
                        message.role === 'user'
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-100 text-slate-800 border border-slate-200'
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{message.content}</p>
                    </div>
                  </motion.div>
                ))}
                
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start"
                  >
                    <div className="bg-slate-100 border border-slate-200 px-4 py-3 rounded-2xl">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Input */}
              <div className="border-t border-slate-200 p-4">
                <form onSubmit={handleSubmit} className="flex space-x-3">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Projenizi tanımlayın..."
                    className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                  >
                    Gönder
                  </motion.button>
                </form>
                
                <p className="text-xs text-slate-500 mt-3 text-center">
                  Kurumsal standartlarda 24 saat içinde detaylı analiz raporu
                </p>
              </div>
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 bg-emerald-500 text-white rounded-full p-3 shadow-lg">
              <span className="text-xl">📊</span>
            </div>
            <div className="absolute -bottom-4 -left-4 bg-blue-500 text-white rounded-full p-3 shadow-lg">
              <span className="text-xl">🏢</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
