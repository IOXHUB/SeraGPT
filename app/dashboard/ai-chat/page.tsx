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
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [favoriteMessages, setFavoriteMessages] = useState<Set<string>>(new Set());
  const [editingMessageId, setEditingMessageId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');
  const [isRecordingVoice, setIsRecordingVoice] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [replyingToMessage, setReplyingToMessage] = useState<string | null>(null);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [currentSummary, setCurrentSummary] = useState('');
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Mock data - Chat sessions
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([
    {
      id: '1',
      title: 'Yatırım Geri Dön��ş (ROI) Analizi',
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

  // Helper functions for new features
  const toggleFavorite = (messageId: string) => {
    setFavoriteMessages(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(messageId)) {
        newFavorites.delete(messageId);
      } else {
        newFavorites.add(messageId);
      }
      return newFavorites;
    });
  };

  const exportChat = () => {
    const chatContent = messages.map(msg =>
      `${msg.role === 'user' ? 'Kullanıcı' : 'AI'}: ${msg.content}`
    ).join('\n\n');
    const blob = new Blob([chatContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sohbet-${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
  };

  const startEditMessage = (messageId: string, content: string) => {
    setEditingMessageId(messageId);
    setEditValue(content);
  };

  const saveEditMessage = () => {
    if (editingMessageId && editValue.trim()) {
      setMessages(prev => prev.map(msg =>
        msg.id === editingMessageId
          ? { ...msg, content: editValue, timestamp: new Date() }
          : msg
      ));
      setEditingMessageId(null);
      setEditValue('');
    }
  };

  const renderMessageContent = (content: string) => {
    // Basic markdown support for code blocks
    if (content.includes('```')) {
      const parts = content.split('```');
      return (
        <div>
          {parts.map((part, i) =>
            i % 2 === 0 ? (
              <span key={i}>{part}</span>
            ) : (
              <pre key={i} className="bg-black/25 border border-white/10 rounded p-2 my-2 overflow-auto">
                <code className="text-green-300">{part}</code>
              </pre>
            )
          )}
        </div>
      );
    }

    // Basic table support
    if (content.includes('|')) {
      const lines = content.split('\n');
      const tableLines = lines.filter(line => line.includes('|'));
      if (tableLines.length > 1) {
        return (
          <div>
            {lines.map((line, i) => {
              if (line.includes('|')) {
                const cells = line.split('|').filter(cell => cell.trim());
                return (
                  <div key={i} className="flex border-b border-white/10">
                    {cells.map((cell, j) => (
                      <div key={j} className="flex-1 p-2 border-r border-white/10 last:border-r-0">
                        {cell.trim()}
                      </div>
                    ))}
                  </div>
                );
              }
              return <div key={i}>{line}</div>;
            })}
          </div>
        );
      }
    }

    return <div className="whitespace-pre-wrap">{content}</div>;
  };

  // Voice recording functions
  const handleVoiceRecord = async () => {
    if (!isRecordingVoice) {
      setIsRecordingVoice(true);
      // Simulate voice recording
      setTimeout(() => {
        setIsRecordingVoice(false);
        setInputValue(prev => prev + " [Sesli mesaj metni]");
      }, 3000);
    } else {
      setIsRecordingVoice(false);
    }
  };

  // File upload handler
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setUploadedFiles(prev => [...prev, ...files]);

    // Add file info to chat
    files.forEach(file => {
      const fileMessage: ChatMessage = {
        id: Date.now().toString() + Math.random(),
        role: 'user',
        content: `📎 Dosya yüklendi: ${file.name} (${(file.size / 1024).toFixed(1)} KB)`,
        timestamp: new Date(),
        attachments: [file]
      };
      setMessages(prev => [...prev, fileMessage]);
    });
  };

  // Text-to-speech function
  const speakMessage = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'tr-TR';
      utterance.rate = 0.9;
      speechSynthesis.speak(utterance);
    }
  };

  // Generate summary
  const generateSummary = () => {
    const summary = `📋 Sohbet Özeti:
• Toplam ${messages.length} mesaj
• ${favoriteMessages.size} favorili mesaj
• Başlangıç: ${messages[0]?.timestamp.toLocaleString() || 'Bilinmiyor'}
• Son: ${messages[messages.length-1]?.timestamp.toLocaleString() || 'Bilinmiyor'}

🎯 Ana Konular: ${messages.filter(m => m.role === 'user').slice(0, 3).map(m => m.content.substring(0, 50)).join(', ')}...`;

    setCurrentSummary(summary);

    const summaryMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'assistant',
      content: summary,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, summaryMessage]);
  };

  const filteredMessages = searchQuery.trim()
    ? messages.filter(msg =>
        msg.content.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : messages;

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

  // Track window size for responsive behavior
  useEffect(() => {
    const checkScreenSize = () => {
      const desktop = window.innerWidth >= 1024;
      // Sidebar always open on desktop, controlled by user on mobile
      if (desktop) {
        setSidebarOpen(true);
      }
    };

    // Set initial value
    checkScreenSize();

    // Add event listener
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <ClientOnly>
      <div className="flex h-screen bg-[#146448]">
        
        {/* SIDEBAR */}
        <aside className="lg:translate-x-0 transition-transform duration-300 fixed lg:relative z-40 flex flex-col w-64 bg-[#146448] border-r border-white/10 h-full" style={{
          transform: typeof window !== 'undefined' && window.innerWidth >= 1024 ? 'translateX(0)' : (sidebarOpen ? 'translateX(0)' : 'translateX(-100%)')
        }}>
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
          
          {/* Alt menü - Ayarlar */}
          <div className="p-4 border-t border-white/10 mb-2">
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

              {/* Settings Menu Popup */}
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
            </button>
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
          <header className="h-16 flex items-center justify-center px-4 border-b border-white/10 bg-[#146448] relative">
            
            <div className="lg:hidden">
              <button
                className="p-2 text-white hover:bg-white/10 rounded-lg absolute left-4"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>

            <div className="flex items-center justify-center flex-1">
              <h1 className="text-white font-semibold text-lg">AI Dashboard</h1>
            </div>
          </header>

          {/* CONTENT */}
          <main className="flex-1 overflow-y-auto p-4 bg-[#146448]" style={{paddingBottom: '160px'}}>
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
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} group`}
                  >
                    <div className={`max-w-[70%] p-3 rounded-lg relative ${
                      message.role === 'user'
                        ? 'bg-[#baf200] text-[#146448]'
                        : 'bg-white/10 text-[#f6f8f9]'
                    }`}>
                      {editingMessageId === message.id ? (
                        <div className="space-y-2">
                          <textarea
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            className="w-full p-2 bg-white/10 border border-white/20 rounded text-white resize-none"
                            rows={3}
                          />
                          <div className="flex space-x-2">
                            <button
                              onClick={saveEditMessage}
                              className="px-3 py-1 bg-green-500/30 rounded text-xs"
                            >
                              Kaydet
                            </button>
                            <button
                              onClick={() => setEditingMessageId(null)}
                              className="px-3 py-1 bg-gray-500/30 rounded text-xs"
                            >
                              İptal
                            </button>
                          </div>
                        </div>
                      ) : (
                        renderMessageContent(message.content)
                      )}

                      {/* Message Actions */}
                      <div className={`opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex space-x-1 mt-2 ${
                        message.role === 'user' ? 'justify-end' : 'justify-start'
                      }`}>
                        <button
                          onClick={() => navigator.clipboard.writeText(message.content)}
                          className="p-1.5 bg-white/10 border border-white/20 rounded hover:bg-white/20 transition-colors text-xs"
                          title="Kopyala"
                        >
                          ⎘
                        </button>
                        <button
                          onClick={() => toggleFavorite(message.id)}
                          className={`p-1.5 border border-white/20 rounded hover:bg-white/20 transition-colors text-xs ${
                            favoriteMessages.has(message.id) ? 'bg-yellow-500/30' : 'bg-white/10'
                          }`}
                          title="Favorilere Ekle"
                        >
                          ★
                        </button>
                        {message.role === 'user' && (
                          <button
                            onClick={() => startEditMessage(message.id, message.content)}
                            className="p-1.5 bg-white/10 border border-white/20 rounded hover:bg-white/20 transition-colors text-xs"
                            title="Düzenle"
                          >
                            ✏
                          </button>
                        )}
                        <button
                          className="p-1.5 bg-white/10 border border-white/20 rounded hover:bg-white/20 transition-colors text-xs"
                          title="Alıntıla"
                        >
                          ❝
                        </button>
                        {message.role === 'assistant' && (
                          <button
                            className="p-1.5 bg-white/10 border border-white/20 rounded hover:bg-white/20 transition-colors text-xs"
                            title="Paylaş"
                          >
                            ⤴
                          </button>
                        )}
                        <button
                          onClick={() => {
                            setMessages(prev => prev.filter(m => m.id !== message.id));
                          }}
                          className="p-1.5 bg-red-500/20 border border-red-500/30 rounded hover:bg-red-500/30 transition-colors text-xs"
                          title="Sil"
                        >
                          ✕
                        </button>
                      </div>
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

          {/* FOOTER (chat input) - Fixed within main area */}
          <footer className="fixed bottom-0 z-30 bg-[#146448] border-t border-white/10 p-4" style={{
            left: typeof window !== 'undefined' && window.innerWidth >= 1024 ? '256px' : '0px',
            right: '0px',
            transition: 'left 0.3s ease-in-out'
          }}>
            <div className="max-w-4xl mx-auto">
              {/* Input Area */}
              <div className="mb-2">
                <div className="relative">
                  <textarea
                    ref={inputRef}
                    value={inputValue}
                    onChange={(e) => {
                      setInputValue(e.target.value);
                      // Auto-resize with max 4 lines
                      const textarea = e.target as HTMLTextAreaElement;
                      textarea.style.height = 'auto';
                      const maxHeight = 24 * 4; // 4 lines × 24px line height
                      const newHeight = Math.min(textarea.scrollHeight, maxHeight);
                      textarea.style.height = newHeight + 'px';
                    }}
                    onKeyDown={handleKeyPress}
                    placeholder="SeraGPT'ye bir mesaj yazın..."
                    className="w-full p-3 pl-16 pr-12 bg-white/95 border border-[#baf200]/30 rounded-lg resize-none focus:ring-2 focus:ring-[#baf200] focus:border-[#baf200] placeholder-[#1e3237]/50 text-[#1e3237] overflow-hidden"
                    rows={1}
                    style={{
                      minHeight: '48px',
                      maxHeight: '96px', // 4 lines
                      lineHeight: '24px'
                    }}
                  />

                  {/* Input Icons */}
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
                    <button
                      className="p-1 text-[#146448] hover:text-[#146448]/70 transition-colors"
                      title="Dosya Ekle"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                      </svg>
                    </button>
                    <button
                      className={`p-1 transition-colors ${isRecordingVoice ? 'text-red-500 animate-pulse' : 'text-[#146448] hover:text-[#146448]/70'}`}
                      title="Sesli Mesaj"
                      onClick={handleVoiceRecord}
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 1a3 3 0 013 3v8a3 3 0 01-6 0V4a3 3 0 013-3zM19 10v2a7 7 0 01-14 0v-2a1 1 0 012 0v2a5 5 0 0010 0v-2a1 1 0 012 0z"/>
                      </svg>
                    </button>
                  </div>

                  {/* Hidden File Input */}
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept="image/*,video/*,.pdf,.doc,.docx,.txt,.csv,.xlsx"
                    className="hidden"
                    onChange={handleFileUpload}
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
