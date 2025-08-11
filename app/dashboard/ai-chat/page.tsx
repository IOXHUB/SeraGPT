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
  const [activeTab, setActiveTab] = useState('ai-chat');
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
    { id: 'ai-chat', title: 'AI Sohbet', icon: '💬', active: true },
    { id: 'analysis', title: 'Analizler', icon: '📊' },
    { id: 'reports', title: 'Raporlar', icon: '📄' },
    { id: 'projects', title: 'Projeler', icon: '🏗️' },
    { id: 'consulting', title: 'Danışmanlık', icon: '👨‍🏫' },
    { id: 'settings', title: 'Ayarlar', icon: '⚙️' },
    { id: 'help', title: 'Yardım', icon: '❓' },
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
                  <div className="mt-3 text-center text-xs text-[#baf200] leading-4">
                    AI Dashboard
                  </div>
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
                <div className="p-4 border-t border-[#f6f8f9]/10 bg-[#baf200] relative menu-popup-container">
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
                        <p>Menü</p>
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
                        className="absolute bottom-full left-4 right-4 mb-2 bg-white rounded-xl shadow-2xl border border-[#f6f8f9]/20 z-[100] w-96 max-h-[80vh] overflow-hidden"
                      >
                        {/* Dashboard Popup Header */}
                        <div className="bg-[#146448] text-white p-4 border-b border-gray-200">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-[#baf200] rounded-full flex items-center justify-center">
                                <span className="text-[#1e3237] text-sm font-bold">
                                  {user?.email?.charAt(0).toUpperCase() || 'T'}
                                </span>
                              </div>
                              <div>
                                <p className="text-sm font-medium">Test Kullanıcı</p>
                                <p className="text-xs text-[#baf200]">SeraGPT Dashboard</p>
                              </div>
                            </div>
                            <button
                              onClick={() => setMenuPopupOpen(false)}
                              className="p-1 hover:bg-white/10 rounded"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>
                        </div>

                        {/* Tab Navigation */}
                        <div className="flex border-b border-gray-200 bg-gray-50 overflow-x-auto">
                          {dashboardMenuItems.map((item) => (
                            <button
                              key={item.id}
                              onClick={() => setActiveTab(item.id)}
                              className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors ${
                                activeTab === item.id
                                  ? 'bg-white text-[#146448] border-b-2 border-[#146448]'
                                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                              }`}
                            >
                              <span className="text-base">{item.icon}</span>
                              <span>{item.title}</span>
                            </button>
                          ))}
                        </div>

                        {/* Tab Content */}
                        <div className="p-4 max-h-96 overflow-y-auto">
                          {activeTab === 'ai-chat' && (
                            <div className="space-y-4">
                              <div className="text-center">
                                <div className="w-12 h-12 bg-[#146448] rounded-full flex items-center justify-center mx-auto mb-3">
                                  <span className="text-white text-lg">💬</span>
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">AI Sohbet</h3>
                                <p className="text-sm text-gray-600 mb-4">SeraGPT AI Asistanı ile sohbet edin</p>
                              </div>
                              <button
                                onClick={() => {
                                  handleNewChat();
                                  setMenuPopupOpen(false);
                                }}
                                className="w-full bg-[#146448] text-white py-3 px-4 rounded-lg font-medium hover:bg-[#146448]/90 transition-colors flex items-center justify-center space-x-2"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                                <span>Yeni Sohbet Başlat</span>
                              </button>
                              <div className="text-center">
                                <p className="text-xs text-gray-500">Mevcut sohbet: {messages.length} mesaj</p>
                              </div>
                            </div>
                          )}

                          {activeTab === 'analysis' && (
                            <div className="space-y-4">
                              <div className="text-center mb-4">
                                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                                  <span className="text-white text-lg">📊</span>
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">Analizler</h3>
                                <p className="text-sm text-gray-600">Sera projesi analizlerini başlatın</p>
                              </div>
                              <div className="grid grid-cols-2 gap-2">
                                {analysisOptions.slice(0, 4).map((option) => (
                                  <button
                                    key={option.id}
                                    onClick={() => {
                                      handleAnalysisClick(option.id);
                                      setMenuPopupOpen(false);
                                    }}
                                    className="p-3 bg-gray-50 hover:bg-gray-100 rounded-lg text-left transition-colors group"
                                  >
                                    <div className="text-lg mb-1">{option.icon}</div>
                                    <div className="text-xs font-medium text-gray-900 leading-tight">
                                      {option.title.split(' ').slice(0, 2).join(' ')}
                                    </div>
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}

                          {activeTab === 'reports' && (
                            <div className="space-y-4">
                              <div className="text-center mb-4">
                                <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-3">
                                  <span className="text-white text-lg">📄</span>
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">Raporlar</h3>
                                <p className="text-sm text-gray-600">PDF raporlarınızı görüntüleyin ve indirin</p>
                              </div>
                              <div className="space-y-2">
                                <div className="p-3 bg-gray-50 rounded-lg">
                                  <div className="flex items-center justify-between">
                                    <div>
                                      <p className="text-sm font-medium text-gray-900">ROI Analizi</p>
                                      <p className="text-xs text-gray-500">2 gün önce</p>
                                    </div>
                                    <button className="text-[#146448] hover:text-[#146448]/80">
                                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                      </svg>
                                    </button>
                                  </div>
                                </div>
                                <div className="p-3 bg-gray-50 rounded-lg">
                                  <div className="flex items-center justify-between">
                                    <div>
                                      <p className="text-sm font-medium text-gray-900">İklim Analizi</p>
                                      <p className="text-xs text-gray-500">1 hafta önce</p>
                                    </div>
                                    <button className="text-[#146448] hover:text-[#146448]/80">
                                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                      </svg>
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}

                          {activeTab === 'projects' && (
                            <div className="space-y-4">
                              <div className="text-center mb-4">
                                <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-3">
                                  <span className="text-white text-lg">🏗️</span>
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">Projeler</h3>
                                <p className="text-sm text-gray-600">Sera projelerinizi yönetin</p>
                              </div>
                              <button className="w-full bg-[#146448] text-white py-3 px-4 rounded-lg font-medium hover:bg-[#146448]/90 transition-colors flex items-center justify-center space-x-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                                <span>Yeni Proje</span>
                              </button>
                              <div className="space-y-2">
                                <div className="p-3 bg-gray-50 rounded-lg">
                                  <p className="text-sm font-medium text-gray-900">Ankara Sera Projesi</p>
                                  <p className="text-xs text-gray-500">Aktif • 2500m²</p>
                                </div>
                                <div className="p-3 bg-gray-50 rounded-lg">
                                  <p className="text-sm font-medium text-gray-900">İzmir Organik Sera</p>
                                  <p className="text-xs text-gray-500">Planlama • 3000m²</p>
                                </div>
                              </div>
                            </div>
                          )}

                          {activeTab === 'consulting' && (
                            <div className="space-y-4">
                              <div className="text-center mb-4">
                                <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
                                  <span className="text-white text-lg">👨‍🏫</span>
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">Danışmanlık</h3>
                                <p className="text-sm text-gray-600">Uzman danışmanlık hizmetleri</p>
                              </div>
                              <div className="space-y-3">
                                <button className="w-full bg-[#146448] text-white py-3 px-4 rounded-lg font-medium hover:bg-[#146448]/90 transition-colors">
                                  Randevu Al
                                </button>
                                <button className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors">
                                  Önceki Görüşmeler
                                </button>
                                <div className="p-3 bg-blue-50 rounded-lg">
                                  <p className="text-sm font-medium text-blue-900">Bir sonraki randevu</p>
                                  <p className="text-xs text-blue-600">15 Şubat 2025, 14:00</p>
                                </div>
                              </div>
                            </div>
                          )}

                          {activeTab === 'settings' && (
                            <div className="space-y-4">
                              <div className="text-center mb-4">
                                <div className="w-12 h-12 bg-gray-500 rounded-full flex items-center justify-center mx-auto mb-3">
                                  <span className="text-white text-lg">⚙️</span>
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">Ayarlar</h3>
                                <p className="text-sm text-gray-600">Hesap ve uygulama ayarları</p>
                              </div>
                              <div className="space-y-3">
                                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                  <span className="text-sm font-medium text-gray-900">Bildirimler</span>
                                  <button className="w-10 h-6 bg-[#146448] rounded-full relative">
                                    <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
                                  </button>
                                </div>
                                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                  <span className="text-sm font-medium text-gray-900">Otomatik Kaydet</span>
                                  <button className="w-10 h-6 bg-[#146448] rounded-full relative">
                                    <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
                                  </button>
                                </div>
                                <button className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors text-left">
                                  Profil Bilgileri
                                </button>
                                <button className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors text-left">
                                  Güvenlik
                                </button>
                              </div>
                            </div>
                          )}

                          {activeTab === 'help' && (
                            <div className="space-y-4">
                              <div className="text-center mb-4">
                                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                                  <span className="text-white text-lg">❓</span>
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">Yardım</h3>
                                <p className="text-sm text-gray-600">Destek ve dokümantasyon</p>
                              </div>
                              <div className="space-y-3">
                                <button className="w-full bg-[#146448] text-white py-3 px-4 rounded-lg font-medium hover:bg-[#146448]/90 transition-colors text-left">
                                  📚 Kullanım Kılavuzu
                                </button>
                                <button className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors text-left">
                                  💬 Canlı Destek
                                </button>
                                <button className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors text-left">
                                  📧 İletişim
                                </button>
                                <button className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors text-left">
                                  🔄 Sürüm Notları
                                </button>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Logout Button */}
                        <div className="border-t border-gray-200 p-4">
                          <a
                            href="/auth/login"
                            className="flex items-center justify-center space-x-2 w-full p-3 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-colors"
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
              <div className="flex-1 p-4 lg:p-8 bg-[#146448] overflow-y-auto">
                <div className="max-w-4xl mx-auto">
                  
                  <div className="text-center mb-8">
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
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </ClientOnly>
  );
}
