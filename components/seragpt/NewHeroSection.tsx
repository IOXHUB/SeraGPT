'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function NewHeroSection() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Merhaba! SeraGPT\'ye hoş geldiniz. Size özel sera yatırım analizi yapabilirim. Hangi şehirde sera kurmayı planlıyorsunuz?'
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

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        'Harika! Bu bölge için sera kurulumuna çok uygun. Hangi ürünü yetiştirmeyi planlıyorsunuz? (Domates, salatalık, biber, çilek...)',
        'Mükemmel seçim! Bu ürün için detaylı analiz yapıyorum. Sera büyüklüğünüz ne kadar olacak? (m² cinsinden)',
        'Analiz tamamlandı! Sizin için detaylı bir yatırım raporu hazırladım. İndirebilir veya uzman mühendisimizle görüşebilirsiniz.'
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      setMessages(prev => [...prev, { role: 'assistant', content: randomResponse }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Header */}
      <header className="flex justify-between items-center p-6 max-w-7xl mx-auto">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
            <span className="text-xl font-bold text-gray-900">S</span>
          </div>
          <span className="text-xl font-bold">SeraGPT</span>
        </div>
        <nav className="hidden md:flex space-x-8">
          <a href="#" className="hover:text-green-400 transition-colors">Ana Sayfa</a>
          <a href="#" className="hover:text-green-400 transition-colors">Özellikler</a>
          <a href="#" className="hover:text-green-400 transition-colors">Fiyatlar</a>
          <a href="#" className="hover:text-green-400 transition-colors">İletişim</a>
        </nav>
        <button className="md:hidden">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center px-4 py-2 bg-green-500/20 border border-green-500/30 rounded-full text-green-400 text-sm">
              <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
              Gelecek Burada
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              <span className="text-white">Sera</span>{' '}
              <span className="text-green-400">GPT</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
              Yapay zeka destekli sera yatırım analizi.{' '}
              <span className="text-green-400 font-semibold">
                Akıllı sistemlerle yarını şekillendirin.
              </span>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-green-500 hover:bg-green-600 text-gray-900 px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
              >
                Ücretsiz Başla
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border border-gray-600 hover:border-green-400 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
              >
                Demo İzle
              </motion.button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400">50+</div>
                <div className="text-sm text-gray-400">Başarılı Proje</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400">10K+</div>
                <div className="text-sm text-gray-400">Mutlu Müşteri</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400">20+</div>
                <div className="text-sm text-gray-400">Yıl Deneyim</div>
              </div>
            </div>
          </motion.div>

          {/* Right - Chat Interface */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold text-gray-900">AI</span>
                </div>
                <div>
                  <h3 className="font-semibold">SeraGPT Analiz</h3>
                  <p className="text-xs text-green-400">● Çevrimiçi</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                <div className="w-3 h-3 bg-red-400 rounded-full"></div>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="h-80 overflow-y-auto space-y-4 mb-4 pr-2">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                      message.role === 'user'
                        ? 'bg-green-500 text-gray-900'
                        : 'bg-gray-700 text-white'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                  </div>
                </motion.div>
              ))}
              
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-gray-700 text-white px-4 py-3 rounded-2xl">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="flex space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Sorunuzu yazın..."
                className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-green-400"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="bg-green-500 hover:bg-green-600 text-gray-900 px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Gönder
              </motion.button>
            </form>
            
            <p className="text-xs text-gray-400 mt-3 text-center">
              SeraGPT ile 1 dakikada sera yatırım analizinizi alın
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
