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
  const [activeMenuGroup, setActiveMenuGroup] = useState<string | null>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Mock data - Chat sessions
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([
    {
      id: '1',
      title: 'ROI Analizi - Domates Serası',
      lastMessage: 'Analiz tamamlandı - %24 geri dönüş',
      date: '2 saat önce',
      messageCount: 8,
      messages: []
    },
    {
      id: '2',
      title: 'İklim Analizi - Antalya',
      lastMessage: 'Bölge uygunluğu: Çok iyi',
      date: '1 gün önce',
      messageCount: 12,
      messages: []
    }
  ]);

  // Sadece mevcut sayfalar - 404 olmayan linkler
  const menuGroups = [
    {
      id: 'analysis',
      title: 'Analizler',
      icon: '🔬',
      color: '#2563eb',
      items: [
        { id: 'all-analysis', title: 'Tüm Analizler', href: '/dashboard/analysis', icon: '📋' },
        { id: 'roi-analysis', title: 'ROI Analizi', href: '/dashboard/analysis/roi', icon: '💰' },
        { id: 'climate-analysis', title: 'İklim Analizi', href: '/dashboard/analysis/climate', icon: '🌡️' },
        { id: 'equipment-analysis', title: 'Ekipman Analizi', href: '/dashboard/analysis/equipment', icon: '⚙️' },
        { id: 'market-analysis', title: 'Pazar Analizi', href: '/dashboard/analysis/market', icon: '📈' },
        { id: 'layout-analysis', title: 'Yerleşim Planı', href: '/dashboard/analysis/layout', icon: '🏗️' }
      ]
    },
    {
      id: 'reports',
      title: 'Raporlar',
      icon: '📊',
      color: '#059669',
      items: [
        { id: 'all-reports', title: 'Tüm Raporlar', href: '/dashboard/reports', icon: '📄' }
      ]
    },
    {
      id: 'management',
      title: 'Yönetim',
      icon: '📁',
      color: '#7c3aed',
      items: [
        { id: 'projects', title: 'Projelerim', href: '/dashboard/projects', icon: '🗂️' },
        { id: 'tokens', title: 'Token Yönetimi', href: '/dashboard/tokens', icon: '🪙' },
        { id: 'settings', title: 'Hesap Ayarları', href: '/dashboard/settings', icon: '⚙️' }
      ]
    },
    {
      id: 'support',
      title: 'Destek',
      icon: '💬',
      color: '#ea580c',
      items: [
        { id: 'ai-chat', title: 'AI Asistan', href: '/dashboard/ai-chat', icon: '🤖' },
        { id: 'help', title: 'Yardım', href: '/dashboard/help', icon: '❓' },
        { id: 'consulting', title: 'Danışmanlık', href: '/dashboard/consulting', icon: '👨‍🔬' },
        { id: 'support-external', title: 'Destek Talebi', href: '/destek', icon: '🎫' }
      ]
    }
  ];

  // Sadece mevcut sayfalara yönlendiren hızlı eylemler
  const quickActions = [
    { id: 'new-roi', title: 'ROI Analizi', description: 'Yatırım geri dönüşü hesapla', href: '/dashboard/analysis/roi', icon: '💰', color: '#059669' },
    { id: 'climate-check', title: 'İklim Analizi', description: 'Bölge uygunluğu kontrol et', href: '/dashboard/analysis/climate', icon: '🌡️', color: '#2563eb' },
    { id: 'ai-chat', title: 'AI Asistan', description: 'SeraGPT ile sohbet et', href: '/dashboard/ai-chat', icon: '🤖', color: '#dc2626' },
    { id: 'my-reports', title: 'Raporlarım', description: 'PDF raporları görüntüle', href: '/dashboard/reports', icon: '📊', color: '#7c3aed' }
  ];

  // Mock overview data
  const overviewData = {
    totalAnalyses: 23,
    activeProjects: 5,
    tokensRemaining: 47,
    lastAnalysis: 'ROI Analizi - Domates Serası',
    apiStatus: {
      climate: 'Aktif',
      energy: 'Aktif',
      market: 'Yavaş'
    }
  };

  const handleNewChat = () => {
    const newChatId = Date.now().toString();
    const newChat: ChatSession = {
      id: newChatId,
      title: 'Yeni AI Sohbet',
      lastMessage: 'Sohbet başlatıldı...',
      date: 'Şimdi',
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
        content: `SeraGPT olarak "${inputValue}" konusunda size yardımcı olmaktan mutluluk duyarım. Bu konuda detaylı analiz yapabilirim. Hangi tür sera analizi yapmak istiyorsunuz?`,
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
        <div className="text-white text-lg">🔐 Yükleniyor...</div>
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
        
        {/* SIDEBAR - Professional Menu Structure */}
        <aside className={`lg:translate-x-0 transition-transform duration-300 fixed lg:relative z-40 flex flex-col w-80 bg-[#146448] border-r border-white/10 h-full ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}>
          {/* Logo */}
          <div className="h-16 flex items-center px-4 border-b border-white/10">
            <img 
              src="https://cdn.builder.io/api/v1/image/assets%2F2c7ec7c93776440b923d3518963fc941%2F9f4710c59a39492e92e469b69a3b57a3?format=webp&width=800" 
              className="h-8" 
              alt="SeraGPT Logo" 
            />
            <span className="ml-2 text-white font-semibold">Professional</span>
          </div>

          {/* CTA Button */}
          <div className="p-4 border-b border-white/10">
            <button
              onClick={() => window.location.href = '/dashboard/analysis'}
              className="w-full bg-[#baf200] hover:bg-[#baf200]/90 text-[#146448] font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
            >
              <span className="text-lg">⚡</span>
              <span>Analizlere Git</span>
            </button>
          </div>
          
          {/* Menu Groups */}
          <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-2">
            {menuGroups.map((group) => (
              <div key={group.id} className="mb-4">
                <button
                  onClick={() => setActiveMenuGroup(activeMenuGroup === group.id ? null : group.id)}
                  className="w-full flex items-center justify-between p-3 rounded-lg text-left transition-colors text-white/90 hover:bg-white/10 font-medium"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-lg">{group.icon}</span>
                    <span className="text-sm">{group.title}</span>
                  </div>
                  <svg 
                    className={`w-4 h-4 transition-transform ${activeMenuGroup === group.id ? 'rotate-180' : ''}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {activeMenuGroup === group.id && (
                  <div className="mt-2 ml-6 space-y-1">
                    {group.items.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => window.location.href = item.href}
                        className="w-full flex items-center space-x-3 p-2 rounded-lg text-left transition-colors text-white/80 hover:bg-white/5 text-sm"
                      >
                        <span className="text-sm">{item.icon}</span>
                        <span>{item.title}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Recent Analyses */}
          <div className="p-4 border-t border-white/10">
            <h3 className="text-sm font-medium text-white/70 mb-3">Son Analizler</h3>
            <div className="space-y-2">
              {chatSessions.slice(0, 2).map((chat) => (
                <button
                  key={chat.id}
                  onClick={() => handleSelectChat(chat.id)}
                  className="w-full p-2 rounded-lg text-left transition-colors text-white/80 hover:bg-white/5 text-xs"
                >
                  <div className="font-medium truncate">{chat.title}</div>
                  <div className="text-white/60 truncate">{chat.lastMessage}</div>
                  <div className="text-white/40">{chat.date}</div>
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Mobile overlay */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* MAIN CONTENT */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* HEADER */}
          <header className="h-16 flex items-center justify-between px-4 border-b border-white/10 bg-[#146448]">
            <div className="flex items-center space-x-3">
              <button
                className="lg:hidden text-white hover:bg-white/10 rounded-lg p-1"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              
              <h1 className="text-white font-semibold text-lg">SeraGPT Dashboard</h1>
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-white text-sm hidden md:block">
                <span className="opacity-70">Hoşgeldin, </span>
                <span className="font-medium">{user?.email?.split('@')[0] || 'Kullanıcı'}</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="bg-[#baf200]/20 text-[#baf200] px-2 py-1 rounded text-xs">
                  {overviewData.tokensRemaining} Token
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
            </div>
          </header>

          {/* DASHBOARD CONTENT */}
          <main className="flex-1 overflow-y-auto p-6 bg-gradient-to-br from-[#146448] to-[#0f4f37]">
            {!currentChatId && messages.length === 0 ? (
              /* Dashboard Overview */
              <div className="max-w-7xl mx-auto space-y-6">
                {/* Welcome & Quick Stats */}
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <h2 className="text-2xl font-bold text-white mb-4">Hoşgeldiniz! 👋</h2>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-white/10 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-[#baf200]">{overviewData.totalAnalyses}</div>
                      <div className="text-white/80 text-sm">Toplam Analiz</div>
                    </div>
                    <div className="bg-white/10 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-[#baf200]">{overviewData.activeProjects}</div>
                      <div className="text-white/80 text-sm">Aktif Proje</div>
                    </div>
                    <div className="bg-white/10 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-[#baf200]">{overviewData.tokensRemaining}</div>
                      <div className="text-white/80 text-sm">Kalan Token</div>
                    </div>
                    <div className="bg-white/10 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-green-400">✓</div>
                      <div className="text-white/80 text-sm">API Durumu</div>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <h3 className="text-xl font-semibold text-white mb-4">Hızlı İşlemler</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {quickActions.map((action) => (
                      <button
                        key={action.id}
                        onClick={() => window.location.href = action.href}
                        className="bg-white/95 hover:bg-white rounded-lg p-4 text-left transition-all hover:scale-105 group"
                      >
                        <div className="flex items-center space-x-3 mb-2">
                          <span className="text-2xl">{action.icon}</span>
                          <div>
                            <h4 className="font-semibold text-[#1e3237] group-hover:text-[#146448]">{action.title}</h4>
                            <p className="text-[#1e3237]/70 text-sm">{action.description}</p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Recent Activity & API Status */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                    <h3 className="text-xl font-semibold text-white mb-4">Son Aktiviteler</h3>
                    <div className="space-y-3">
                      {chatSessions.map((session) => (
                        <div key={session.id} className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
                          <span className="text-[#baf200]">📊</span>
                          <div className="flex-1">
                            <div className="text-white font-medium text-sm">{session.title}</div>
                            <div className="text-white/70 text-xs">{session.lastMessage}</div>
                          </div>
                          <div className="text-white/50 text-xs">{session.date}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                    <h3 className="text-xl font-semibold text-white mb-4">API Veri Durumu</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <span>🌡️</span>
                          <span className="text-white">İklim Verileri</span>
                        </div>
                        <span className="text-green-400 text-sm font-medium">Aktif</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <span>⚡</span>
                          <span className="text-white">Enerji Fiyatları</span>
                        </div>
                        <span className="text-green-400 text-sm font-medium">Aktif</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <span>📈</span>
                          <span className="text-white">Piyasa Verileri</span>
                        </div>
                        <span className="text-yellow-400 text-sm font-medium">Yavaş</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* AI Chat Interface */
              <div className="max-w-4xl mx-auto h-full flex flex-col">
                <div className="flex-1 space-y-4 pb-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[70%] p-4 rounded-lg ${
                        message.role === 'user'
                          ? 'bg-[#baf200] text-[#146448]'
                          : 'bg-white/10 text-white backdrop-blur-sm'
                      }`}>
                        <div className="whitespace-pre-wrap">{message.content}</div>
                        <div className="text-xs opacity-70 mt-2">
                          {message.timestamp.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                    </div>
                  ))}

                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-white/10 backdrop-blur-sm text-white p-4 rounded-lg">
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

          {/* FOOTER - Chat Input */}
          {currentChatId && (
            <footer className="bg-[#146448] border-t border-white/10 p-4">
              <div className="max-w-4xl mx-auto">
                <div className="relative">
                  <textarea
                    ref={inputRef}
                    value={inputValue}
                    onChange={(e) => {
                      setInputValue(e.target.value);
                      const textarea = e.target as HTMLTextAreaElement;
                      textarea.style.height = 'auto';
                      const maxHeight = 24 * 3;
                      const newHeight = Math.min(textarea.scrollHeight, maxHeight);
                      textarea.style.height = newHeight + 'px';
                    }}
                    onKeyDown={handleKeyPress}
                    placeholder="SeraGPT'ye bir mesaj yazın..."
                    className="w-full p-4 pr-12 bg-white/95 border border-[#baf200]/30 rounded-lg resize-none focus:ring-2 focus:ring-[#baf200] focus:border-[#baf200] placeholder-[#1e3237]/50 text-[#1e3237]"
                    rows={1}
                    style={{ minHeight: '52px', maxHeight: '72px', lineHeight: '24px' }}
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim()}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-[#baf200] hover:bg-[#baf200]/80 text-[#1e3237] rounded-lg transition-colors disabled:opacity-50"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                    </svg>
                  </button>
                </div>
              </div>
            </footer>
          )}
        </div>
      </div>
    </ClientOnly>
  );
}
