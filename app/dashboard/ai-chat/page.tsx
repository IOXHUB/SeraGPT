'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/lib/hooks/useAuth';
import DashboardLayout from '@/components/dashboard/DashboardLayout';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  attachments?: any[];
}

interface Report {
  id: string;
  title: string;
  type: 'roi' | 'climate' | 'equipment' | 'market' | 'layout';
  date: string;
  summary: string;
  status: 'completed' | 'in-progress';
}

interface ChatSession {
  id: string;
  title: string;
  lastMessage: string;
  date: string;
  messageCount: number;
}

export default function AIChatPage() {
  const { user } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeView, setActiveView] = useState<'welcome' | 'chat'>('welcome');
  const [selectedContext, setSelectedContext] = useState<'report' | 'chat' | null>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Mock data - önceki raporlar
  const previousReports: Report[] = [
    {
      id: '1',
      title: 'Antalya Domates ROI Analizi',
      type: 'roi',
      date: '2024-01-15',
      summary: '2,500 m² sera yatırımı için detaylı karlılık analizi. %34.2 ROI hesaplanmış.',
      status: 'completed'
    },
    {
      id: '2',
      title: 'İzmir İklim Uygunluk Analizi',
      type: 'climate',
      date: '2024-01-10',
      summary: 'Salatalık yetiştiriciliği için 12 aylık iklim değerlendirmesi.',
      status: 'completed'
    },
    {
      id: '3',
      title: 'Hidroponik Sistem Ekipmanları',
      type: 'equipment',
      date: '2024-01-08',
      summary: 'Modern hidroponik sera için ekipman listesi ve maliyet analizi.',
      status: 'completed'
    }
  ];

  // Mock data - önceki sohbetler
  const previousChats: ChatSession[] = [
    {
      id: '1',
      title: 'Sera ROI Optimizasyonu',
      lastMessage: 'Maliyet düşürme stratejileri hakkında konuştuk...',
      date: '2024-01-16',
      messageCount: 24
    },
    {
      id: '2',
      title: 'İklim Kontrol Sistemleri',
      lastMessage: 'Otomatik iklim kontrol çözümleri...',
      date: '2024-01-14',
      messageCount: 18
    },
    {
      id: '3',
      title: 'Pazarlama Stratejileri',
      lastMessage: 'Organik ürün satış kanalları...',
      date: '2024-01-12',
      messageCount: 15
    }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = inputRef.current.scrollHeight + 'px';
    }
  }, [inputValue]);

  const handleStartWithReport = (report: Report) => {
    setActiveView('chat');
    setSelectedContext('report');
    
    // AI'nın raporu analiz ettiği mesajı
    const welcomeMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'assistant',
      content: `Merhaba! "${report.title}" raporunuzu analiz ettim ve hafızama aldım. \n\nRapor özeti: ${report.summary}\n\nBu rapor temelinde size nasıl yardımcı olabilirim? Şu konularda derinlemesine konuşabiliriz:\n\n• Maliyet optimizasyonu stratejileri\n• Verimlilik artırma yöntemleri\n• Risk faktörleri ve çözüm önerileri\n• Teknoloji güncellemeleri\n• Pazar fırsatları\n\nHangi konuda derinlemesine konuşmak istersiniz?`,
      timestamp: new Date()
    };
    
    setMessages([welcomeMessage]);
  };

  const handleContinueChat = (chat: ChatSession) => {
    setActiveView('chat');
    setSelectedContext('chat');
    
    // Önceki sohbeti devam ettirme mesajı
    const continueMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'assistant',
      content: `"${chat.title}" sohbetimize devam ediyoruz! \n\nÖnceki konuşmamızda: ${chat.lastMessage}\n\nKaldığımız yerden devam edelim. Bu konuda başka hangi ayrıntıları öğrenmek istiyorsunuz?`,
      timestamp: new Date()
    };
    
    setMessages([continueMessage]);
  };

  const handleStartFresh = () => {
    setActiveView('chat');
    setSelectedContext(null);
    
    const freshStartMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'assistant',
      content: `Merhaba! SeraGPT asistanınıza hoş geldiniz. Size sera tarımcılığı konusunda kapsamlı destek sağlayabilirim.\n\nHangi konuda yardıma ihtiyacınız var?\n\n• ROI ve karlılık analizleri\n• İklim ve çevre koşulları değerlendirmesi\n• Ekipman seçimi ve optimizasyonu\n• Pazar analizi ve satış stratejileri\n• Teknik planlama ve layout tasarımı\n• Genel sera işletmeciliği danışmanlığı\n\nSorularınızı paylaşın, detaylı bir şekilde yanıtlayayım!`,
      timestamp: new Date()
    };
    
    setMessages([freshStartMessage]);
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `Anladım! "${inputValue}" konusunda size yardımcı olabilirim. Bu konu hakkında detaylı analiz ve öneriler hazırlayabilirim. Daha spesifik hangi bilgilere ihtiyacınız var?`,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (activeView === 'welcome') {
    return (
      <DashboardLayout>
        <div className="h-[calc(100vh-200px)] flex flex-col">
          {/* Welcome Header */}
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-[#146448] rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-[#1e3237] mb-3">SeraGPT AI Asistan'a Hoş Geldiniz</h1>
            <p className="text-[#1e3237]/70 text-lg max-w-2xl mx-auto">
              Size nasıl yardımcı olabilirim? Önceki raporlarınızdan birini analiz edelim, 
              devam eden bir sohbetimize dönelim veya yeni bir konuşma başlatalım.
            </p>
          </div>

          {/* Options Grid */}
          <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto w-full">
            
            {/* Previous Reports */}
            <div className="bg-white rounded-xl p-6 shadow-lg border border-[#146448]/10">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-[#1e3237]">Önceki Raporlarım</h2>
              </div>
              <p className="text-[#1e3237]/70 text-sm mb-4">
                Daha önce oluşturduğunuz raporları temel alarak devam edelim.
              </p>
              <div className="space-y-3">
                {previousReports.map((report) => (
                  <motion.button
                    key={report.id}
                    onClick={() => handleStartWithReport(report)}
                    className="w-full p-4 bg-[#f6f8f9] rounded-lg border border-gray-200 hover:border-[#146448]/30 hover:shadow-md transition-all text-left group"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-[#1e3237] text-sm group-hover:text-[#146448] transition-colors">
                        {report.title}
                      </h3>
                      <span className="text-xs text-[#1e3237]/60">{report.date}</span>
                    </div>
                    <p className="text-xs text-[#1e3237]/70 line-clamp-2">{report.summary}</p>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Previous Chats */}
            <div className="bg-white rounded-xl p-6 shadow-lg border border-[#146448]/10">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-[#1e3237]">Önceki Sohbetlerim</h2>
              </div>
              <p className="text-[#1e3237]/70 text-sm mb-4">
                Devam eden konuşmalarınızdan birini sürdürelim.
              </p>
              <div className="space-y-3">
                {previousChats.map((chat) => (
                  <motion.button
                    key={chat.id}
                    onClick={() => handleContinueChat(chat)}
                    className="w-full p-4 bg-[#f6f8f9] rounded-lg border border-gray-200 hover:border-[#146448]/30 hover:shadow-md transition-all text-left group"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-[#1e3237] text-sm group-hover:text-[#146448] transition-colors">
                        {chat.title}
                      </h3>
                      <span className="text-xs text-[#1e3237]/60">{chat.messageCount} mesaj</span>
                    </div>
                    <p className="text-xs text-[#1e3237]/70 line-clamp-2">{chat.lastMessage}</p>
                    <span className="text-xs text-[#1e3237]/60">{chat.date}</span>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Start Fresh */}
            <div className="bg-white rounded-xl p-6 shadow-lg border border-[#146448]/10">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-[#146448]/10 rounded-lg flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 text-[#146448]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-[#1e3237]">Yeni Sohbet</h2>
              </div>
              <p className="text-[#1e3237]/70 text-sm mb-6">
                Sera tarımcılığı hakkında yeni bir konuşma başlatalım.
              </p>
              
              <div className="space-y-4 mb-6">
                <div className="p-3 bg-[#f6f8f9] rounded-lg">
                  <div className="flex items-center space-x-2 text-sm text-[#1e3237]/70">
                    <div className="w-1.5 h-1.5 bg-[#146448] rounded-full"></div>
                    <span>ROI ve karlılık analizleri</span>
                  </div>
                </div>
                <div className="p-3 bg-[#f6f8f9] rounded-lg">
                  <div className="flex items-center space-x-2 text-sm text-[#1e3237]/70">
                    <div className="w-1.5 h-1.5 bg-[#146448] rounded-full"></div>
                    <span>İklim ve çevre koşulları</span>
                  </div>
                </div>
                <div className="p-3 bg-[#f6f8f9] rounded-lg">
                  <div className="flex items-center space-x-2 text-sm text-[#1e3237]/70">
                    <div className="w-1.5 h-1.5 bg-[#146448] rounded-full"></div>
                    <span>Ekipman seçimi ve optimizasyonu</span>
                  </div>
                </div>
              </div>

              <motion.button
                onClick={handleStartFresh}
                className="w-full bg-[#146448] text-white py-3 px-4 rounded-lg font-medium hover:bg-[#146448]/90 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Yeni Sohbet Başlat
              </motion.button>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="h-[calc(100vh-200px)] flex">
        {/* Sidebar */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.div
              initial={{ x: -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              className="w-80 border-r border-[#146448]/10 bg-white/50 backdrop-blur-sm"
            >
              <div className="p-4 border-b border-[#146448]/10">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-[#1e3237]">Geçmiş & Raporlar</h3>
                  <button
                    onClick={() => setSidebarOpen(false)}
                    className="p-1 hover:bg-[#146448]/10 rounded"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
              
              <div className="p-4 space-y-4 max-h-96 overflow-y-auto">
                <div>
                  <h4 className="text-sm font-medium text-[#1e3237]/70 mb-2">Son Raporlar</h4>
                  {previousReports.slice(0, 3).map((report) => (
                    <button
                      key={report.id}
                      onClick={() => {
                        handleStartWithReport(report);
                        setSidebarOpen(false);
                      }}
                      className="w-full p-2 text-left hover:bg-[#146448]/5 rounded mb-1"
                    >
                      <div className="text-sm font-medium text-[#1e3237] truncate">{report.title}</div>
                      <div className="text-xs text-[#1e3237]/60">{report.date}</div>
                    </button>
                  ))}
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-[#1e3237]/70 mb-2">Son Sohbetler</h4>
                  {previousChats.slice(0, 3).map((chat) => (
                    <button
                      key={chat.id}
                      onClick={() => {
                        handleContinueChat(chat);
                        setSidebarOpen(false);
                      }}
                      className="w-full p-2 text-left hover:bg-[#146448]/5 rounded mb-1"
                    >
                      <div className="text-sm font-medium text-[#1e3237] truncate">{chat.title}</div>
                      <div className="text-xs text-[#1e3237]/60">{chat.messageCount} mesaj</div>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="flex items-center justify-between p-4 border-b border-[#146448]/10 bg-white/50 backdrop-blur-sm">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 hover:bg-[#146448]/10 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5 text-[#1e3237]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-[#146448] rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-[#1e3237]">SeraGPT</h3>
                  <p className="text-xs text-green-500">Çevrimiçi</p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setActiveView('welcome')}
                className="p-2 hover:bg-[#146448]/10 rounded-lg transition-colors"
                title="Ana Ekrana Dön"
              >
                <svg className="w-5 h-5 text-[#1e3237]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </button>
              
              <button className="p-2 hover:bg-[#146448]/10 rounded-lg transition-colors">
                <svg className="w-5 h-5 text-[#1e3237]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-2xl px-4 py-3 rounded-2xl ${
                      message.role === 'user'
                        ? 'bg-[#146448] text-white'
                        : 'bg-white text-[#1e3237] shadow-sm border border-[#146448]/10'
                    }`}
                  >
                    <div className="whitespace-pre-wrap text-sm leading-relaxed">
                      {message.content}
                    </div>
                    <div className={`text-xs mt-2 ${
                      message.role === 'user' ? 'text-white/70' : 'text-[#1e3237]/60'
                    }`}>
                      {message.timestamp.toLocaleTimeString('tr-TR', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-start"
              >
                <div className="bg-white text-[#1e3237] shadow-sm border border-[#146448]/10 px-4 py-3 rounded-2xl">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-[#146448] rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-[#146448] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-[#146448] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-[#146448]/10 bg-white/50 backdrop-blur-sm">
            <div className="flex items-end space-x-3">
              <div className="flex-1 relative">
                <textarea
                  ref={inputRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="SeraGPT hazır ve sizi bekliyor..."
                  className="w-full resize-none rounded-xl border border-[#146448]/20 px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-[#146448]/20 focus:border-[#146448]/30 bg-white text-[#1e3237] min-h-[48px] max-h-32"
                  rows={1}
                />
              </div>
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim()}
                className="bg-[#146448] text-white p-3 rounded-xl hover:bg-[#146448]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
