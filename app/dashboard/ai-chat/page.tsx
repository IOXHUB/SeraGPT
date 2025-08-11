'use client';

import { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/lib/hooks/useAuth';
import ClientOnly from '@/components/ui/ClientOnly';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  attachments?: any[];
  analysisData?: any;
  isAnalysisStep?: boolean;
  stepType?: 'start' | 'collecting' | 'processing' | 'completed';
}

interface ChatSession {
  id: string;
  title: string;
  lastMessage: string;
  date: string;
  messageCount: number;
  messages: ChatMessage[];
}

interface AnalysisFlow {
  type: 'roi' | 'climate' | 'equipment' | 'market' | 'layout';
  currentStep: number;
  collectedData: any;
  isActive: boolean;
  questions: Array<{
    id: string;
    question: string;
    type: 'text' | 'number' | 'select' | 'multiselect';
    options?: string[];
    validation?: (value: any) => boolean;
    required: boolean;
  }>;
}

export default function AIChatPage() {
  const { user } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [menuPopupOpen, setMenuPopupOpen] = useState(false);
  const [analysisFlow, setAnalysisFlow] = useState<AnalysisFlow | null>(null);
  const [userTokens, setUserTokens] = useState(5);
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
    { id: 'old-dashboard', title: 'Eski Dashboard' }
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
    
    // Update current chat session
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

    // Simple AI response
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
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <ClientOnly>
      <div className="flex h-screen bg-[#146448]">
        
        {/* SIDEBAR */}
        <aside className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300 fixed lg:relative z-40 flex flex-col w-64 bg-[#146448] border-r border-white/10 h-full`}>
          {/* Üst logo alanı */}
          <div className="h-16 flex items-center px-4 border-b border-white/10">
            <img 
              src="https://cdn.builder.io/api/v1/image/assets%2F2c7ec7c93776440b923d3518963fc941%2F9f4710c59a39492e92e469b69a3b57a3?format=webp&width=800" 
              className="h-8" 
              alt="SeraGPT Logo" 
            />
          </div>
          
          {/* Menü listesi */}
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
          
          {/* Alt menü */}
          <div className="p-4 border-t border-white/10">
            <div className="flex items-center space-x-3 p-3 bg-[#baf200]/10 rounded-lg">
              <div className="w-8 h-8 bg-[#baf200] rounded-full flex items-center justify-center">
                <span className="text-[#146448] font-bold text-sm">T</span>
              </div>
              <div className="text-left">
                <p className="text-sm font-medium text-[#f6f8f9]">Test Kullanıcı</p>
                <p className="text-xs text-[#baf200]">{userTokens} token</p>
              </div>
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

        {/* MAIN */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* HEADER */}
          <header className="h-16 flex items-center px-4 border-b border-white/10 bg-[#146448] relative">
            <button 
              className="lg:hidden p-2 text-white hover:bg-white/10 rounded-lg"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            
            <div className="flex items-center ml-2">
              <h1 className="text-white font-semibold text-lg">AI Dashboard</h1>
            </div>

            <div className="ml-auto">
              <button 
                className="p-2 text-white hover:bg-white/10 rounded-lg relative"
                onClick={() => setMenuPopupOpen(!menuPopupOpen)}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>

              {/* Right Menu Popup */}
              {menuPopupOpen && (
                <div className="absolute top-full right-0 mt-2 w-72 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
                  <div className="p-4 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium text-gray-900">Dashboard Menü</h3>
                      <button
                        onClick={() => setMenuPopupOpen(false)}
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
                        onClick={() => {
                          if (item.id === 'user') window.location.href = '/dashboard/kullanici-islemleri';
                          else if (item.id === 'tokens') window.location.href = '/dashboard/token-islemleri';
                          else if (item.id === 'ai-assistant') window.location.href = '/dashboard/ai-asistan-islemleri';
                          else if (item.id === 'analysis') window.location.href = '/dashboard/analysis';
                          else if (item.id === 'settings') window.location.href = '/dashboard/settings';
                          else if (item.id === 'support') window.location.href = '/destek';
                          else if (item.id === 'consulting') window.location.href = '/danismanlik';
                          else if (item.id === 'turnkey') window.location.href = '/anahtar-teslim-proje';
                          else if (item.id === 'homepage') window.location.href = '/';
                          else if (item.id === 'old-dashboard') window.location.href = '/dashboard';
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
            </div>
          </header>

          {/* CONTENT */}
          <main className="flex-1 overflow-y-auto p-4 bg-[#146448]">
            {!currentChatId && messages.length === 0 ? (
              // Welcome State
              <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center">
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
              // Chat Messages
              <div className="max-w-4xl mx-auto space-y-4">
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
                      {message.content}
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
            )}
          </main>

          {/* FOOTER (chat input) */}
          <footer className="border-t border-white/10 bg-[#146448] p-4">
            <div className="max-w-4xl mx-auto">
              {/* Input Area */}
              <div className="mb-4">
                <div className="relative">
                  <textarea
                    ref={inputRef}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="SeraGPT'ye bir mesaj yazın..."
                    className="w-full p-3 pr-12 bg-white/95 border border-[#baf200]/30 rounded-lg resize-none focus:ring-2 focus:ring-[#baf200] focus:border-[#baf200] placeholder-[#1e3237]/50 text-[#1e3237]"
                    rows={1}
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

              {/* Bottom Action Icons */}
              <div className="flex items-center justify-center space-x-4">
                {/* File Upload */}
                <button className="p-3 hover:bg-white/10 rounded-xl transition-colors text-[#f6f8f9] hover:text-[#baf200]" title="Dosya Ekle">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                  </svg>
                </button>

                {/* Camera */}
                <button className="p-3 hover:bg-white/10 rounded-xl transition-colors text-[#f6f8f9] hover:text-[#baf200]" title="Kamera">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </button>

                {/* Voice Recording */}
                <button
                  className="p-3 hover:bg-white/10 rounded-xl transition-colors text-[#f6f8f9] hover:text-[#baf200]"
                  onClick={() => setIsRecording(!isRecording)}
                  title="Ses Kaydı"
                >
                  <svg className={`w-6 h-6 ${isRecording ? 'text-[#baf200] animate-pulse' : ''}`} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 1a3 3 0 013 3v8a3 3 0 01-6 0V4a3 3 0 013-3zM19 10v2a7 7 0 01-14 0v-2a1 1 0 012 0v2a5 5 0 0010 0v-2a1 1 0 012 0z"/>
                  </svg>
                </button>

                {/* Voice Chat */}
                <button className="p-3 hover:bg-white/10 rounded-xl transition-colors text-[#f6f8f9] hover:text-[#baf200]" title="Sesli Sohbet">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </button>

                {/* Share */}
                <button className="p-3 hover:bg-white/10 rounded-xl transition-colors text-[#f6f8f9] hover:text-[#baf200]" title="Paylaş">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                  </svg>
                </button>

                {/* New Chat */}
                <button
                  onClick={handleNewChat}
                  className="p-3 hover:bg-white/10 rounded-xl transition-colors text-[#f6f8f9] hover:text-[#baf200]"
                  title="Yeni Sohbet"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </button>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </ClientOnly>
  );
}
