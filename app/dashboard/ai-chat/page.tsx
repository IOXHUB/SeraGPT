'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/lib/hooks/useAuth';
import ClientOnly from '@/components/ui/ClientOnly';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

// Utility function to prevent hydration mismatch
const getStaticTimestamp = (offset = 0) => new Date('2024-01-16T15:00:00.000Z').getTime() + offset;

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  attachments?: any[];
}

interface ChatSession {
  id: string;
  title: string;
  lastMessage: string;
  date: string;
  messageCount: number;
  messages: ChatMessage[];
}

interface Report {
  id: string;
  title: string;
  type: 'roi' | 'climate' | 'equipment' | 'market' | 'layout';
  date: string;
  summary: string;
  status: 'completed' | 'in-progress';
}

export default function AIChatPage() {
  const { user } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [menuPopupOpen, setMenuPopupOpen] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Mock data - Sohbet geçmişi
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([
    {
      id: '1',
      title: 'Yatırım Geri Dönüş (ROI) Analizi',
      lastMessage: 'Sohbet Başlatıldı...',
      date: 'Şubat Başında',
      messageCount: 0,
      messages: []
    },
    {
      id: '2',
      title: 'Yatırım Geri Dönüş (ROI) Analizi',
      lastMessage: 'Sohbet Başlatıldı...',
      date: 'Şubat Başında',
      messageCount: 0,
      messages: []
    },
    {
      id: '3',
      title: 'Yatırım Geri Dönüş (ROI) Analizi',
      lastMessage: 'Sohbet Başlatıldı...',
      date: 'Şubat Başında',
      messageCount: 0,
      messages: []
    }
  ]);

  // Analysis options for welcome screen
  const analysisOptions = [
    {
      id: 'roi',
      title: 'Yatırım Geri Dönüş (ROI) Analizi',
      description: 'Geri dönme süresi ve karlılık oranı',
      icon: '💰',
      color: 'bg-yellow-500',
    },
    {
      id: 'climate',
      title: 'İklim Uyumu ve Risk Skoru',
      description: 'Lokasyon bazlı iklim uygunluğu raporu',
      icon: '🌡️',
      color: 'bg-blue-500',
    },
    {
      id: 'equipment',
      title: 'Mühendis Onaylı Ekipman Listesi',
      description: 'Fiyat aralıkları ve tedarik önerileri',
      icon: '⚙️',
      color: 'bg-gray-500',
    },
    {
      id: 'market',
      title: 'Pazar ve Ticaret Verileri',
      description: 'Bölgesel ve ürüne göre pazar trendleri',
      icon: '📊',
      color: 'bg-green-500',
    },
    {
      id: 'layout',
      title: '2D / 3D Yerleşim Plan ve Şema',
      description: 'Sera yerleşim ve hat planları',
      icon: '🏗️',
      color: 'bg-orange-500',
    },
    {
      id: 'pdf',
      title: 'PDF Rapor - Anında İndirilebilir',
      description: 'Hibe ve kredi başvurusunda uygun format',
      icon: '📄',
      color: 'bg-red-500',
    },
  ];

  // Dashboard menu items
  const dashboardMenuItems = [
    { id: 'ai-chat', title: 'AI Sohbet', icon: '💬', href: '/dashboard/ai-chat', active: true },
    { id: 'analysis', title: 'Analizler', icon: '📊', href: '/dashboard/analysis' },
    { id: 'reports', title: 'Raporlar', icon: '📄', href: '/dashboard/reports' },
    { id: 'projects', title: 'Projeler', icon: '🏗️', href: '/dashboard/projects' },
    { id: 'consulting', title: 'Danışmanlık', icon: '👨‍🏫', href: '/dashboard/consulting' },
    { id: 'settings', title: 'Ayarlar', icon: '⚙️', href: '/dashboard/settings' },
    { id: 'help', title: 'Yardım', icon: '❓', href: '/dashboard/help' },
  ];

  const handleNewChat = () => {
    setCurrentChatId(null);
    setMessages([]);
  };

  const handleSelectChat = (chatId: string) => {
    setCurrentChatId(chatId);
    const chat = chatSessions.find(c => c.id === chatId);
    setMessages(chat?.messages || []);
  };

  const handleAnalysisClick = (optionId: string) => {
    const option = analysisOptions.find(opt => opt.id === optionId);
    if (option) {
      setInputValue(`${option.title} hakkında bilgi almak istiyorum. Bu analiz nasıl çalışır?`);
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `Merhaba! "${inputValue}" konusunda size yardımcı olmaktan mutluluk duyarım. Bu konu hakkında detaylı bilgi verebilir ve size özel öneriler geliştirebilirim. Ne öğrenmek istiyorsunuz?`,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Auto-resize textarea
  useEffect(() => {
    const textarea = inputRef.current;
    if (textarea) {
      const resizeTextarea = () => {
        textarea.style.height = 'auto';
        textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
      };

      textarea.addEventListener('input', resizeTextarea);
      return () => textarea.removeEventListener('input', resizeTextarea);
    }
  }, []);

  // Close sidebar on mobile when message is sent
  useEffect(() => {
    if (messages.length > 0 && window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  }, [messages]);

  // Close menu popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuPopupOpen && !(event.target as Element)?.closest('.menu-popup-container')) {
        setMenuPopupOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuPopupOpen]);

  return (
    <ClientOnly>
      <div className="flex flex-col h-screen bg-[#146448] overflow-hidden">
        <div className="flex flex-1 min-h-0">
          {/* Sidebar */}
          <AnimatePresence>
            {sidebarOpen && (
              <>
                {/* Mobile Overlay */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/50 z-40 md:hidden"
                  onClick={() => setSidebarOpen(false)}
                />

                <motion.div
                  initial={{ x: -300, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -300, opacity: 0 }}
                  className="w-80 md:w-80 bg-[#1e3237] border-r border-[#f6f8f9]/10 flex flex-col h-full fixed md:relative z-50 md:z-auto"
                >
                {/* Sidebar Header - Logo */}
                <div className="p-4 border-b border-[#f6f8f9]/10 bg-[#146448] text-white">
                  <div className="flex items-center justify-center">
                    <img
                      src="https://cdn.builder.io/api/v1/image/assets%2F2c7ec7c93776440b923d3518963fc941%2F01c1e8a05ef6424b912d584875377957?format=webp&width=800"
                      alt="SeraGPT Logo"
                      className="h-10 w-auto object-contain"
                    />
                  </div>
                  <div className="mt-3 text-center">
                    <h2 className="text-lg font-bold text-[#f6f8f9]">SeraGPT</h2>
                    <p className="text-xs text-[#baf200]">AI Dashboard</p>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="p-4 border-b border-[#f6f8f9]/10 bg-[#146448]">
                  <button
                    onClick={handleNewChat}
                    className="w-full bg-[#baf200] text-[#1e3237] py-3 px-4 rounded-lg font-medium hover:bg-[#baf200]/90 transition-colors flex items-center justify-center space-x-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    <span>Yeni Sohbet</span>
                  </button>
                </div>

                {/* Chat History */}
                <div className="flex-1 overflow-y-auto p-4 bg-[#146448]">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-[#f6f8f9]/70 mb-3 flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z"/>
                        </svg>
                        ANALİZLER
                      </h3>
                      <div className="space-y-2">
                        {chatSessions.map((chat) => (
                          <button
                            key={chat.id}
                            onClick={() => handleSelectChat(chat.id)}
                            className={`w-full p-3 rounded-lg text-left transition-colors group ${
                              currentChatId === chat.id 
                                ? 'bg-[#baf200]/20 border border-[#baf200]/30' 
                                : 'bg-[#146448]/50 hover:bg-[#f6f8f9]/10'
                            }`}
                          >
                            <div className="text-sm font-medium text-[#f6f8f9] group-hover:text-[#baf200] transition-colors truncate">
                              {chat.title}
                            </div>
                            <div className="text-xs text-[#f6f8f9]/60 mt-1 truncate">
                              {chat.lastMessage}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium text-[#f6f8f9]/70 mb-3 flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                          <path fillRule="evenodd" d="M4 5a2 2 0 012-2v1a2 2 0 00-2 2v6a2 2 0 002 2h8a2 2 0 002-2V6a2 2 0 00-2-2V3a2 2 0 012 2v8a2 2 0 01-2 2H6a2 2 0 01-2-2V5z" clipRule="evenodd"/>
                        </svg>
                        SOHBETLER
                      </h3>
                      <div className="space-y-2">
                        <p className="text-xs text-[#f6f8f9]/40 px-2">Henüz sohbet geçmişi yok</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Menu Popup Button */}
                <div className="p-4 border-t border-[#f6f8f9]/10 bg-[#1e3237] relative menu-popup-container">
                  <button
                    onClick={() => setMenuPopupOpen(!menuPopupOpen)}
                    className="w-full p-3 bg-[#146448] hover:bg-[#146448]/80 rounded-lg transition-colors flex items-center justify-between group"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-[#baf200] rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-[#1e3237]" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="text-left">
                        <p className="text-sm font-medium text-[#f6f8f9]">Dashboard Menü</p>
                        <p className="text-xs text-[#f6f8f9]/60">Tüm özellikler</p>
                      </div>
                    </div>
                    <svg
                      className={`w-4 h-4 text-[#f6f8f9]/60 transition-transform ${menuPopupOpen ? 'rotate-180' : ''}`}
                      fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* Menu Popup */}
                  <AnimatePresence>
                    {menuPopupOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute bottom-full left-4 right-4 mb-2 bg-white rounded-xl shadow-2xl border border-[#f6f8f9]/20 p-2 z-[100]"
                      >
                        {dashboardMenuItems.map((item) => (
                          <a
                            key={item.id}
                            href={item.href}
                            className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                              item.active
                                ? 'bg-[#146448] text-white'
                                : 'hover:bg-gray-50 text-gray-700'
                            }`}
                            onClick={() => setMenuPopupOpen(false)}
                          >
                            <span className="text-lg">{item.icon}</span>
                            <span className="font-medium">{item.title}</span>
                            {item.active && (
                              <div className="ml-auto w-2 h-2 bg-[#baf200] rounded-full"></div>
                            )}
                          </a>
                        ))}

                        <div className="border-t border-gray-200 mt-2 pt-2">
                          <div className="flex items-center space-x-3 p-3">
                            <div className="w-8 h-8 bg-[#baf200] rounded-full flex items-center justify-center">
                              <span className="text-[#1e3237] text-sm font-bold">
                                {user?.email?.charAt(0).toUpperCase() || 'T'}
                              </span>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-700">Test Kullanıcı</p>
                              <p className="text-xs text-gray-500">test@seragpt.com</p>
                            </div>
                          </div>

                          <a
                            href="/auth/login"
                            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-red-50 text-red-600 transition-colors"
                            onClick={() => setMenuPopupOpen(false)}
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                            <span className="font-medium">Çıkış Yap</span>
                          </a>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* Main Chat Area */}
          <div className="flex-1 flex flex-col min-w-0 h-full">
            
            {/* Dashboard Header */}
            <div className="flex items-center justify-between p-3 lg:p-4 border-b border-[#f6f8f9]/10 bg-[#146448] flex-shrink-0">
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="p-2 hover:bg-[#f6f8f9]/10 rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5 text-[#f6f8f9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>

                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-[#baf200] rounded-full flex items-center justify-center">
                    <span className="text-[#1e3237] text-sm font-bold">💬</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#f6f8f9] text-lg">AI Sohbet</h3>
                    <p className="text-xs text-[#baf200]">SeraGPT AI Asistanı</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="hidden sm:flex items-center space-x-3 bg-[#f6f8f9]/10 rounded-lg px-3 py-2">
                  <div className="w-6 h-6 bg-[#baf200] rounded-full flex items-center justify-center">
                    <span className="text-[#1e3237] text-xs font-bold">
                      {user?.email?.charAt(0).toUpperCase() || 'T'}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#f6f8f9]">Test Kullanıcı</p>
                  </div>
                </div>

                <button className="p-2 hover:bg-[#f6f8f9]/10 rounded-lg transition-colors">
                  <svg className="w-5 h-5 text-[#f6f8f9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM9 1h6l5 5v7" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Welcome State or Messages */}
            {!currentChatId && messages.length === 0 ? (
              // Welcome Content
              <div className="flex-1 p-4 lg:p-8 bg-[#146448] overflow-y-auto">
                <div className="max-w-4xl mx-auto">
                  
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-[#baf200] rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-[#1e3237] text-2xl font-bold">S</span>
                    </div>
                    <h1 className="text-3xl font-bold text-[#f6f8f9] mb-2">
                      Hoş Geldiniz, Test Kullanıcı!
                    </h1>
                    <p className="text-[#f6f8f9]/80 text-lg">
                      Bugün size nasıl yardımcı olabilirim? Aşağıdaki analizlerden birini seçerek başlayabilirsiniz:
                    </p>
                  </div>

                  {/* Analysis Cards Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4 mb-8">
                    {analysisOptions.map((option) => (
                      <button
                        key={option.id}
                        onClick={() => handleAnalysisClick(option.id)}
                        className="p-4 bg-white/90 hover:bg-white rounded-xl text-left transition-all hover:scale-105 hover:shadow-lg group"
                      >
                        <div className="flex items-start space-x-3">
                          <div className={`w-10 h-10 ${option.color} rounded-lg flex items-center justify-center text-white text-lg flex-shrink-0`}>
                            {option.icon}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-[#1e3237] text-sm mb-1 group-hover:text-[#146448] transition-colors">
                              {option.title}
                            </h3>
                            <p className="text-xs text-[#1e3237]/70 leading-relaxed">
                              {option.description}
                            </p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>

                  <div className="text-center">
                    <p className="text-sm text-[#f6f8f9]/60">
                      © 2025 SeraGPT. İSITMAX AI merkzinde.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              // Chat Messages
              <div className="flex-1 overflow-y-auto p-3 lg:p-4 bg-[#146448]">
                <div className="max-w-4xl mx-auto space-y-4">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-xs sm:max-w-md lg:max-w-2xl p-3 lg:p-4 rounded-lg ${
                      message.role === 'user' 
                        ? 'bg-[#baf200] text-[#1e3237]' 
                        : 'bg-[#f6f8f9]/10 text-[#f6f8f9] border border-[#f6f8f9]/20'
                    }`}>
                      <p className="whitespace-pre-wrap">{message.content}</p>
                      <p className={`text-xs mt-2 ${
                        message.role === 'user' ? 'text-[#1e3237]/60' : 'text-[#f6f8f9]/60'
                      }`}>
                        {message.timestamp.toLocaleTimeString('tr-TR')}
                      </p>
                    </div>
                  </motion.div>
                ))}

                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    <div className="max-w-xs sm:max-w-md lg:max-w-2xl p-3 lg:p-4 rounded-lg bg-[#f6f8f9]/10 text-[#f6f8f9] border border-[#f6f8f9]/20">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-[#baf200] rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-[#baf200] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-[#baf200] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
                </div>
              </div>
            )}

            {/* Input Area */}
            <div className="p-3 lg:p-4 border-t border-[#f6f8f9]/10 bg-[#146448] flex-shrink-0">
              <div className="max-w-4xl mx-auto">
                <div className="flex items-end space-x-2 lg:space-x-3">
                  <div className="flex-1 relative">
                    <textarea
                      ref={inputRef}
                      value={inputValue}
                      onChange={(e) => {
                        setInputValue(e.target.value);
                        // Auto-resize textarea
                        const textarea = e.target as HTMLTextAreaElement;
                        textarea.style.height = '50px';
                        const newHeight = Math.min(Math.max(textarea.scrollHeight, 50), 120);
                        textarea.style.height = newHeight + 'px';
                      }}
                      onKeyPress={handleKeyPress}
                      placeholder="SeraGPT'ye bir mesaj yazın..."
                      className="w-full p-3 lg:p-4 pr-12 bg-white/90 border border-[#f6f8f9]/20 rounded-xl resize-none focus:ring-2 focus:ring-[#baf200] focus:border-transparent placeholder-[#1e3237]/50 text-[#1e3237] text-sm lg:text-base overflow-hidden"
                      rows={1}
                      style={{ minHeight: '50px', maxHeight: '120px' }}
                    />
                    <button
                      onClick={handleSendMessage}
                      disabled={!inputValue.trim()}
                      className="absolute right-2 bottom-2 p-2 bg-[#baf200] text-[#1e3237] rounded-lg hover:bg-[#baf200]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    </button>
                  </div>
                </div>
                
                <div className="flex items-center justify-center mt-3">
                  <p className="text-xs text-[#f6f8f9]/40 text-center">
                    2025 SeraGPT. İSITMAX AI merkezinde.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ClientOnly>
  );
}
