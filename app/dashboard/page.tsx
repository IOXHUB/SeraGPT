'use client';

import { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/lib/hooks/useAuth';
import ClientOnly from '@/components/ui/ClientOnly';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ChatSession {
  id: string;
  title: string;
  lastMessage: string;
  date: string;
  messageCount: number;
  messages: ChatMessage[];
}

export default function DashboardPage() {
  const { user, loading, signOut } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  const [menuPopupOpen, setMenuPopupOpen] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Mock data - Chat sessions
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
    }
  ]);

  // Analysis options
  const analysisOptions = [
    { id: 'roi', title: 'ROI Analizi', description: 'Yatırım geri dönüş hesaplaması' },
    { id: 'climate', title: 'İklim Analizi', description: 'Bölgesel iklim uygunluğu' },
    { id: 'equipment', title: 'Ekipman Listesi', description: 'Mühendis onaylı ekipmanlar' },
    { id: 'market', title: 'Pazar Analizi', description: 'Ticaret ve fiyat verileri' },
    { id: 'layout', title: 'Yerleşim Planı', description: '2D/3D sera tasarımları' },
    { id: 'reports', title: 'Raporlarım', description: 'Önceki analizlerinizi görün' }
  ];

  // Dashboard menu items - Direct links to working pages
  const dashboardMenuItems = [
    { id: 'tokens', title: 'Token İşlemleri', href: '/dashboard/tokens' },
    { id: 'analysis', title: 'Tüm Analizler', href: '/dashboard/analysis' },
    { id: 'reports', title: 'Raporlarım', href: '/dashboard/reports' },
    { id: 'settings', title: 'Hesap Ayarları', href: '/dashboard/settings' },
    { id: 'ai-chat', title: 'AI Chat', href: '/dashboard/ai-chat' },
    { id: 'projects', title: 'Projelerim', href: '/dashboard/projects' },
    { id: 'help', title: 'Yardım', href: '/dashboard/help' },
    { id: 'consulting', title: 'Danışmanlık', href: '/dashboard/consulting' },
    { id: 'support', title: 'Destek', href: '/destek' },
    { id: 'homepage', title: 'Anasayfaya Çıkış', href: '/' }
  ];

  const handleNewChat = () => {
    const newChatId = Date.now().toString();
    const newChat: ChatSession = {
      id: newChatId,
      title: 'Yeni Sohbet',
      lastMessage: 'Sohbet başlatıldı...',
      date: new Date().toLocaleDateString('tr-TR'),
      messageCount: 0,
      messages: []
    };
    
    setChatSessions(prev => [newChat, ...prev]);
    setCurrentChatId(newChatId);
    setMessages([]);
  };

  const handleSelectChat = (chatId: string) => {
    setCurrentChatId(chatId);
    const chat = chatSessions.find(c => c.id === chatId);
    setMessages(chat?.messages || []);
  };

  const handleAnalysisClick = (optionId: string) => {
    const option = analysisOptions.find(opt => opt.id === optionId);
    if (option && option.id !== 'reports') {
      handleNewChat();
    } else if (option?.id === 'reports') {
      window.location.href = '/dashboard/reports';
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
    
    if (currentChatId) {
      setChatSessions(prev => prev.map(chat => 
        chat.id === currentChatId 
          ? { ...chat, lastMessage: inputValue.substring(0, 50) + '...', messageCount: chat.messageCount + 1 }
          : chat
      ));
    } else {
      handleNewChat();
    }
    
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `Merhaba! "${inputValue}" konusunda size yardımcı olmaktan mutluluk duyarım. Bu konu hakkında detaylı bilgi verebilir ve size özel öneriler geliştirebilirim.`,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  useEffect(() => {
    const checkScreenSize = () => {
      const desktop = window.innerWidth >= 1024;
      if (desktop) {
        setSidebarOpen(true);
      }
    };
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !loading && !user) {
      console.log('🚫 Dashboard access denied - redirecting to login');
      window.location.href = '/auth/login';
    }
  }, [user, loading, mounted]);

  if (!loading && !user) {
    window.location.href = '/auth/login';
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#146448' }}>
        <div className="text-white text-lg">Yönlendiriliyor...</div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#146448' }}>
        <div className="text-white text-lg">🔐 Authentication kontrolü...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#146448' }}>
        <div className="text-white text-lg">Giriş yapmanız gerekiyor...</div>
      </div>
    );
  }

  return (
    <ClientOnly>
      <div className="flex h-screen bg-[#146448] overflow-hidden">
        
        {/* SIDEBAR */}
        <aside className={`lg:translate-x-0 transition-transform duration-300 fixed lg:relative z-40 flex flex-col w-64 bg-[#146448] border-r border-white/10 h-full ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}>
          <div className="h-16 flex items-center px-4 border-b border-white/10">
            <img 
              src="https://cdn.builder.io/api/v1/image/assets%2F2c7ec7c93776440b923d3518963fc941%2F9f4710c59a39492e92e469b69a3b57a3?format=webp&width=800" 
              className="h-8" 
              alt="SeraGPT Logo" 
            />
          </div>
          
          <nav className="flex-1 overflow-y-auto px-2 py-4 space-y-1">
            <div>
              <h3 className="text-sm font-medium text-[#f6f8f9]/70 mb-3 px-2 flex items-center">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z"/>
                </svg>
                ANALİZLER
              </h3>
              <div className="space-y-1">
                {chatSessions.map((chat) => (
                  <button
                    key={chat.id}
                    onClick={() => handleSelectChat(chat.id)}
                    className={`w-full p-2 rounded-lg text-left transition-colors text-sm ${
                      currentChatId === chat.id
                        ? 'bg-[#baf200]/20 text-[#baf200]'
                        : 'text-[#f6f8f9]/80 hover:bg-white/10'
                    }`}
                  >
                    <div className="font-medium truncate">{chat.title}</div>
                    <div className="text-xs opacity-60 truncate">{chat.lastMessage}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-sm font-medium text-[#f6f8f9]/70 mb-3 px-2 flex items-center">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                  <path fillRule="evenodd" d="M4 5a2 2 0 012-2v1a2 2 0 00-2 2v6a2 2 0 002 2h8a2 2 0 002-2V6a2 2 0 00-2-2V3a2 2 0 012 2v8a2 2 0 01-2 2H6a2 2 0 01-2-2V5z" clipRule="evenodd"/>
                </svg>
                SOHBETLER
              </h3>
              <div className="px-2">
                {chatSessions.filter(chat => chat.messageCount > 0).length > 0 ? (
                  chatSessions.filter(chat => chat.messageCount > 0).map((chat) => (
                    <button
                      key={chat.id}
                      onClick={() => handleSelectChat(chat.id)}
                      className="w-full p-2 rounded-lg text-left transition-colors text-sm text-[#f6f8f9]/80 hover:bg-white/10"
                    >
                      <div className="font-medium truncate">{chat.title}</div>
                      <div className="text-xs opacity-60 truncate">{chat.lastMessage}</div>
                    </button>
                  ))
                ) : (
                  <p className="text-xs text-[#f6f8f9]/40">Henüz sohbet geçmişi yok</p>
                )}
              </div>
            </div>
          </nav>
          
          <div className="p-4 border-t border-white/10 mb-5">
            <button 
              className="w-full bg-[#baf200] border-l-4 border-[#baf200] rounded-lg p-3 hover:bg-[#baf200]/80 transition-colors relative"
              onClick={() => setMenuPopupOpen(!menuPopupOpen)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                  <span className="text-sm font-medium text-black">Ayarlar</span>
                </div>
              </div>
              
              {menuPopupOpen && (
                <div className="absolute bottom-full left-0 right-0 mb-2 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
                  <div className="p-4 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium text-gray-900">Dashboard Menü</h3>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setMenuPopupOpen(false);
                        }}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                  <div className="py-2 max-h-80 overflow-y-auto">
                    {dashboardMenuItems.map((item) => (
                      <button
                        key={item.id}
                        onClick={(e) => {
                          e.stopPropagation();
                          window.location.href = item.href;
                          setMenuPopupOpen(false);
                        }}
                        className="w-full px-4 py-3 text-left text-sm text-gray-700 hover:bg-gray-100 border-b border-gray-100 last:border-b-0"
                      >
                        {item.title}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </button>
          </div>
        </aside>

        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-16 flex items-center justify-between px-4 border-b border-white/10 bg-[#146448]">
            <div className="flex items-center space-x-3">
              <button
                className="lg:hidden text-white hover:bg-white/10 rounded-lg flex items-center justify-center"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                style={{ width: '24px', height: '24px', padding: '0' }}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              
              <h1 className="text-white font-semibold text-lg" style={{ lineHeight: '24px', margin: '0' }}>AI Dashboard</h1>
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-white text-sm">
                <span className="opacity-70">Hoşgeldin, </span>
                <span className="font-medium">{user?.email || 'Kullanıcı'}</span>
              </div>
              <button
                onClick={async () => {
                  await signOut();
                  window.location.href = '/auth/login';
                }}
                className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-sm rounded transition-colors"
              >
                Çıkış
              </button>
            </div>
          </header>

          <main className="flex-1 overflow-y-auto p-4 bg-[#146448]" style={{paddingBottom: '160px'}}>
            {!currentChatId && messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full min-h-[400px] py-8 mx-auto w-full max-w-[900px] px-4">
                <div className="max-w-2xl mx-auto mb-8">
                  <h1 className="text-[#f6f8f9] mb-6 text-center" style={{ fontSize: '36px', fontWeight: '600' }}>
                    Hoşgeldiniz
                  </h1>
                  <div className="mb-8 text-center">
                    <p className="text-[#f6f8f9]/90 mb-4 text-base md:text-lg text-center">
                      Aşağıdan Analiz Başlatabilirsiniz yada menüden düzenlemek istediğiniz geçmiş analizlerinden birini seçin.
                    </p>
                    <p className="text-[#baf200] font-medium text-sm md:text-base text-center">
                      Tam havamdayım, çalışalım. Ya siz?
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 md:gap-4 max-w-md md:max-w-lg w-full">
                  {analysisOptions.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => handleAnalysisClick(option.id)}
                      className="h-20 md:h-24 p-3 bg-white/95 hover:bg-white rounded-lg text-center transition-all hover:scale-105 group flex flex-col justify-center items-center border border-[#baf200]/20 hover:border-[#baf200]/40 shadow-sm"
                    >
                      <h3 className="font-semibold text-[#1e3237] mb-1 group-hover:text-[#146448] transition-colors text-xs md:text-sm lg:text-base">
                        {option.title}
                      </h3>
                      <p className="text-[#1e3237]/70 leading-tight text-xs">
                        {option.description}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="max-w-4xl mx-auto">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[70%] p-3 rounded-lg ${
                        message.role === 'user'
                          ? 'bg-[#baf200] text-[#146448]'
                          : 'bg-white/10 text-[#f6f8f9]'
                      }`}>
                        <div className="whitespace-pre-wrap">{message.content}</div>
                      </div>
                    </div>
                  ))}

                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-white/10 text-[#f6f8f9] p-3 rounded-lg">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-[#baf200] rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-[#baf200] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-[#baf200] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </div>
            )}
          </main>

          <footer className="fixed bottom-0 z-30 bg-[#146448] border-t border-white/10 p-4 left-0 lg:left-64 right-0 transition-all duration-300">
            <div className="max-w-4xl mx-auto">
              <div className="mb-2">
                <div className="relative">
                  <textarea
                    ref={inputRef}
                    value={inputValue}
                    onChange={(e) => {
                      setInputValue(e.target.value);
                      const textarea = e.target as HTMLTextAreaElement;
                      textarea.style.height = 'auto';
                      const maxHeight = 24 * 4;
                      const newHeight = Math.min(textarea.scrollHeight, maxHeight);
                      textarea.style.height = newHeight + 'px';
                    }}
                    onKeyDown={handleKeyPress}
                    placeholder="SeraGPT'ye bir mesaj yazın..."
                    className="w-full p-3 pr-12 bg-white/95 border border-[#baf200]/30 rounded-lg resize-none focus:ring-2 focus:ring-[#baf200] focus:border-[#baf200] placeholder-[#1e3237]/50 text-[#1e3237] overflow-hidden"
                    rows={1}
                    style={{
                      minHeight: '48px',
                      maxHeight: '96px',
                      lineHeight: '24px'
                    }}
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim()}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-[#baf200] hover:bg-[#baf200]/80 text-[#1e3237] rounded-lg transition-colors disabled:opacity-50"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </ClientOnly>
  );
}
