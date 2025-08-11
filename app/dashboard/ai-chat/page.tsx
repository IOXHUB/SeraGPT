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
      title: 'ROI Analizi',
      description: 'Yatırım geri dönüş hesaplaması',
    },
    {
      id: 'climate',
      title: 'İklim Analizi',
      description: 'Bölgesel iklim uygunluğu',
    },
    {
      id: 'equipment',
      title: 'Ekipman Listesi',
      description: 'Mühendis onaylı ekipmanlar',
    },
    {
      id: 'market',
      title: 'Pazar Analizi',
      description: 'Ticaret ve fiyat verileri',
    },
    {
      id: 'layout',
      title: 'Yerleşim Planı',
      description: '2D/3D sera tasarımları',
    },
    {
      id: 'reports',
      title: 'Raporlarım',
      description: 'Önceki analizlerinizi görün',
    },
  ];

  // Dashboard menu items
  const dashboardMenuItems = [
    { id: 'user', title: 'Kullanıcı İşlemleri' },
    { id: 'tokens', title: 'Token İşlemleri' },
    { id: 'ai-assistant', title: 'AI Asistan İşlemleri' },
    { id: 'analysis', title: 'Tüm Analizler' },
    { id: 'settings', title: 'Hesap Ayarları' },
    { id: 'support', title: 'Destek' },
    { id: 'consulting', title: 'Danışmanlık' },
    { id: 'turnkey', title: 'Anahtar Teslim' },
    { id: 'homepage', title: 'Anasayfaya Çıkış' },
    { id: 'old-dashboard', title: 'Eski Dashboard' },
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

  // Prevent viewport jumping on mobile keyboard
  useEffect(() => {
    const viewport = document.querySelector('meta[name=viewport]');
    const originalContent = viewport?.getAttribute('content');

    const handleFocus = () => {
      // Disable viewport scaling during keyboard input
      viewport?.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
      // Add visual viewport support
      document.body.style.setProperty('--vh', `${window.visualViewport?.height || window.innerHeight}px`);
    };

    const handleBlur = () => {
      // Restore original viewport settings
      if (originalContent) {
        viewport?.setAttribute('content', originalContent);
      }
      // Update viewport height
      document.body.style.setProperty('--vh', `${window.visualViewport?.height || window.innerHeight}px`);
    };

    const handleVisualViewportChange = () => {
      document.body.style.setProperty('--vh', `${window.visualViewport?.height || window.innerHeight}px`);
    };

    // Listen for focus/blur on input elements
    const inputElement = inputRef.current;
    inputElement?.addEventListener('focus', handleFocus);
    inputElement?.addEventListener('blur', handleBlur);

    // Listen for visual viewport changes (iOS Safari)
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', handleVisualViewportChange);
    }

    return () => {
      inputElement?.removeEventListener('focus', handleFocus);
      inputElement?.removeEventListener('blur', handleBlur);
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', handleVisualViewportChange);
      }
    };
  }, []);

  return (
    <ClientOnly>
      <div className="flex flex-col h-screen bg-[#146448] overflow-hidden"
           style={{
             height: 'calc(var(--vh, 1vh) * 100)',
             minHeight: '100svh',
             overscrollBehavior: 'contain',
             touchAction: 'manipulation',
             maxWidth: '100vw',
             width: '100%'
           }}>
        <div className="flex flex-1 min-h-0 max-w-full"
             style={{ maxWidth: '100vw', width: '100%' }}>
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
                  className="w-80 md:w-80 bg-[#1e3237] border-r border-[#f6f8f9]/10 flex flex-col h-full fixed md:relative z-50 md:z-auto max-w-[80vw] min-w-0"
                >
                {/* Sidebar Header - Logo */}
                <div className="p-4 border-b border-[#f6f8f9]/10 bg-[#146448] text-white">
                  <div className="flex items-center justify-center">
                    <img
                      src="https://cdn.builder.io/api/v1/image/assets%2F2c7ec7c93776440b923d3518963fc941%2F01c1e8a05ef6424b912d584875377957?format=webp&width=800"
                      alt="SeraGPT Logo - AI Destekli Sera Yatırım Danışmanı"
                      className="h-10 w-auto object-contain"
                      loading="eager"
                    />
                  </div>
                  <div className="mt-3 text-center text-xs text-[#baf200] leading-4"
                       role="status"
                       aria-live="polite">
                    AI Dashboard
                  </div>
                </div>

                {/* Chat History */}
                <div className="flex-1 overflow-y-auto p-4 bg-[#146448] overscroll-contain"
                     style={{ scrollBehavior: 'smooth' }}>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-[#f6f8f9]/70 mb-3 flex items-center"
                          role="heading"
                          aria-level={2}>
                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                          <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z"/>
                        </svg>
                        ANALİZLER
                      </h3>
                      <div className="space-y-2" role="list" aria-label="Analiz geçmişi">
                        {chatSessions.map((chat) => (
                          <button
                            key={chat.id}
                            onClick={() => handleSelectChat(chat.id)}
                            className={`w-full p-3 rounded-lg text-left transition-colors group focus:ring-2 focus:ring-[#baf200] focus:outline-none ${
                              currentChatId === chat.id
                                ? 'bg-[#baf200]/20 border border-[#baf200]/30'
                                : 'bg-[#146448]/50 hover:bg-[#f6f8f9]/10'
                            }`}
                            role="listitem"
                            aria-pressed={currentChatId === chat.id}
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
                <div className="p-4 border-t border-[#f6f8f9]/10 bg-[#146448] relative menu-popup-container">
                  <button
                    onClick={() => setMenuPopupOpen(!menuPopupOpen)}
                    className="w-full p-3 bg-[#baf200] hover:bg-[#baf200]/80 rounded-lg transition-colors flex items-center justify-between group"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-[#146448] rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-[#7ed321]" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="text-left">
                        <p>Menü</p>
                        <p className="text-xs text-[#4a4a4a]">Tüm özellikler</p>
                      </div>
                    </div>
                    <svg
                      className={`w-4 h-4 text-black transition-transform ${menuPopupOpen ? 'rotate-180' : ''}`}
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
                        className="absolute bottom-full left-4 right-4 mb-2 bg-white rounded-lg shadow-lg border border-gray-200 z-[100] min-w-64"
                      >
                        {/* Header */}
                        <div className="p-4 border-b border-gray-200">
                          <div className="flex items-center justify-between">
                            <h3 className="text-sm font-medium text-gray-900">Popup Menü</h3>
                            <button
                              onClick={() => setMenuPopupOpen(false)}
                              className="text-gray-400 hover:text-gray-600"
                            >
                              ×
                            </button>
                          </div>
                        </div>

                        {/* Menu Items */}
                        <div className="py-2">
                          {dashboardMenuItems.map((item) => (
                            <button
                              key={item.id}
                              onClick={() => {
                                // Handle navigation based on item id
                                if (item.id === 'user') {
                                  window.location.href = '/dashboard/kullanici-islemleri';
                                } else if (item.id === 'tokens') {
                                  window.location.href = '/dashboard/token-islemleri';
                                } else if (item.id === 'ai-assistant') {
                                  window.location.href = '/dashboard/ai-asistan-islemleri';
                                } else if (item.id === 'analysis') {
                                  window.location.href = '/dashboard/analysis';
                                } else if (item.id === 'settings') {
                                  window.location.href = '/dashboard/settings';
                                } else if (item.id === 'support') {
                                  window.location.href = '/destek';
                                } else if (item.id === 'consulting') {
                                  window.location.href = '/danismanlik';
                                } else if (item.id === 'turnkey') {
                                  window.location.href = '/anahtar-teslim-proje';
                                } else if (item.id === 'homepage') {
                                  window.location.href = '/';
                                } else if (item.id === 'old-dashboard') {
                                  window.location.href = '/dashboard';
                                }
                                setMenuPopupOpen(false);
                              }}
                              className="w-full px-4 py-3 text-left text-sm text-gray-700 hover:bg-gray-100 border-b border-gray-100 last:border-b-0"
                            >
                              {item.title}
                            </button>
                          ))}
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
          <div className="flex-1 flex flex-col min-w-0 h-full max-w-full overflow-hidden">
            
            {/* Dashboard Header */}
            <div className="flex items-center justify-between p-3 lg:p-4 border-b border-[#f6f8f9]/10 bg-[#146448] flex-shrink-0">
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="p-2 hover:bg-[#f6f8f9]/10 rounded-lg transition-colors focus:ring-2 focus:ring-[#baf200] focus:outline-none"
                  aria-label={sidebarOpen ? 'Kenar çubuğunu kapat' : 'Kenar çubuğunu aç'}
                  aria-expanded={sidebarOpen}
                >
                  <svg className="w-5 h-5 text-[#f6f8f9]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>

                <div className="flex items-center space-x-3">
                  <div className="ml-3 text-[#f6f8f9] text-lg">
                    <p>Hoşgeldiniz</p>
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
              <div className="flex-1 p-3 lg:p-4 bg-[#146448] overflow-hidden flex flex-col justify-center" style={{ paddingBottom: '100px' }}>
                <div className="max-w-4xl mx-auto px-safe w-full"
                     style={{ marginLeft: 'max(16px, env(safe-area-inset-left))',
                             marginRight: 'max(16px, env(safe-area-inset-right))' }}>

                  <div className="text-center mb-4">
                    <h1 className="font-bold text-[#f6f8f9] mb-2"
                        style={{ fontSize: 'clamp(20px, 4vw, 32px)', lineHeight: 'clamp(24px, 5vw, 40px)' }}>
                      Hoş Geldiniz, Test Kullanıcı!
                    </h1>
                    <p className="text-[#f6f8f9]/80"
                       style={{ fontSize: 'clamp(14px, 2.5vw, 18px)', lineHeight: 'clamp(18px, 3.5vw, 24px)' }}>
                      Bugün size nasıl yardımcı olabilirim?
                    </p>
                  </div>

                  {/* Analysis Cards Grid - 3 rows, 2 columns - Compact */}
                  <div className="grid grid-cols-2 gap-3 max-w-xl mx-auto">
                    {analysisOptions.map((option) => (
                      <button
                        key={option.id}
                        onClick={() => handleAnalysisClick(option.id)}
                        className="h-20 p-3 bg-white/90 hover:bg-white rounded-lg text-center transition-all hover:scale-105 hover:shadow-lg group flex flex-col justify-center items-center"
                      >
                        <div className="w-full h-full flex flex-col justify-center items-center">
                          <h3 className="font-semibold text-[#1e3237] mb-1 group-hover:text-[#146448] transition-colors"
                              style={{ fontSize: 'clamp(13px, 2.5vw, 16px)', lineHeight: 'clamp(16px, 3vw, 20px)' }}>
                            {option.title}
                          </h3>
                          <p className="text-[#1e3237]/70 leading-tight text-xs"
                             style={{ fontSize: 'clamp(10px, 2vw, 13px)', lineHeight: 'clamp(12px, 2.5vw, 16px)' }}>
                            {option.description}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              // Chat Messages
              <div className="flex-1 overflow-y-auto p-3 lg:p-4 bg-[#146448] overscroll-contain"
                   style={{ scrollBehavior: 'smooth', paddingBottom: '120px' }}>
                <div className="max-w-4xl mx-auto space-y-4 px-safe"
                     style={{ marginLeft: 'max(16px, env(safe-area-inset-left))',
                             marginRight: 'max(16px, env(safe-area-inset-right))' }}>
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
                      <p className="whitespace-pre-wrap"
                         style={{ fontSize: 'clamp(14px, 2.5vw, 16px)', lineHeight: 'clamp(18px, 3.5vw, 24px)' }}>
                        {message.content}
                      </p>
                      <p className={`mt-2 ${
                        message.role === 'user' ? 'text-[#1e3237]/60' : 'text-[#f6f8f9]/60'
                      }`}
                         style={{ fontSize: 'clamp(11px, 2vw, 12px)', lineHeight: 'clamp(14px, 2.5vw, 16px)' }}>
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

          </div>
        </div>

        {/* Fixed Input Area at Bottom */}
        <div className="fixed bottom-0 left-0 right-0 border-t border-[#f6f8f9]/10 bg-[#146448] z-50"
             style={{
               paddingTop: '12px',
               paddingBottom: 'max(12px, env(safe-area-inset-bottom))',
               paddingLeft: 'max(12px, env(safe-area-inset-left))',
               paddingRight: 'max(12px, env(safe-area-inset-right))'
             }}>
          <div className="max-w-4xl mx-auto w-full">
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
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  placeholder="SeraGPT'ye bir mesaj yazın..."
                  className="w-full p-3 lg:p-4 pr-12 bg-white/90 border border-[#f6f8f9]/20 rounded-xl resize-none focus:ring-2 focus:ring-[#baf200] focus:border-transparent placeholder-[#1e3237]/50 text-[#1e3237] overflow-hidden transition-all duration-200"
                  rows={1}
                  style={{
                    minHeight: '50px',
                    maxHeight: '120px',
                    fontSize: 'clamp(14px, 2.5vw, 16px)',
                    lineHeight: 'clamp(20px, 3.5vw, 24px)'
                  }}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim()}
                  className="absolute right-2 bottom-2 p-2 bg-[#baf200] text-[#1e3237] rounded-lg hover:bg-[#baf200]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:ring-2 focus:ring-[#146448] focus:outline-none"
                  aria-label="Mesaj gönder"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ClientOnly>
  );
}
