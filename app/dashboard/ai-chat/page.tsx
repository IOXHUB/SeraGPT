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
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Mock data - Sohbet geçmişi
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([
    {
      id: '1',
      title: 'Sera ROI Optimizasyonu',
      lastMessage: 'Maliyet düşürme stratejileri hakkında konuştuk...',
      date: '2024-01-16',
      messageCount: 24,
      messages: [
        {
          id: '1',
          role: 'assistant',
          content: 'Merhaba! Sera ROI optimizasyonu konusunda size nasıl yardımcı olabilirim?',
          timestamp: new Date('2024-01-16T10:00:00')
        }
      ]
    },
    {
      id: '2',
      title: 'İklim Kontrol Sistemleri',
      lastMessage: 'Otomatik iklim kontrol çözümleri...',
      date: '2024-01-14',
      messageCount: 18,
      messages: []
    },
    {
      id: '3',
      title: 'Pazarlama Stratejileri',
      lastMessage: 'Organik ürün satış kanalları...',
      date: '2024-01-12',
      messageCount: 15,
      messages: []
    }
  ]);

  // Mock data - Önceki raporlar
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
      inputRef.current.style.height = Math.min(inputRef.current.scrollHeight, 120) + 'px';
    }
  }, [inputValue]);

  const handleNewChat = () => {
    const newChatId = Date.now().toString();
    setCurrentChatId(newChatId);
    setMessages([
      {
        id: '1',
        role: 'assistant',
        content: 'Merhaba! SeraGPT asistanınıza hoş geldiniz. Size sera tarımcılığı konusunda nasıl yardımcı olabilirim?',
        timestamp: new Date()
      }
    ]);
  };

  const handleSelectChat = (chatId: string) => {
    const selectedChat = chatSessions.find(chat => chat.id === chatId);
    if (selectedChat) {
      setCurrentChatId(chatId);
      setMessages(selectedChat.messages);
    }
  };

  const handleStartWithReport = (report: Report) => {
    const newChatId = Date.now().toString();
    setCurrentChatId(newChatId);
    
    const welcomeMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'assistant',
      content: `"${report.title}" raporunuzu analiz ettim ve hafızaya aldım.\n\nRapor özeti: ${report.summary}\n\nBu rapor temelinde size nasıl yardımcı olabilirim? Şu konularda derinlemesine konuşabiliriz:\n\n• Maliyet optimizasyonu stratejileri\n• Verimlilik artırma yöntemleri\n• Risk faktörleri ve çözüm önerileri\n• Teknoloji güncellemeleri\n• Pazar fırsatları`,
      timestamp: new Date()
    };
    
    setMessages([welcomeMessage]);
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
        content: `"${inputValue}" konusunda size detaylı yardım sağlayabilirim. Bu alanda uzman analizler ve öneriler hazırlayabilirim.\n\nDaha spesifik hangi bilgilere ihtiyacınız var? Size özel çözümler sunmak için:\n\n• Mevcut durumunuz hakkında detay verebilirsiniz\n• Hedeflerinizi paylaşabilirsiniz\n• Karşılaştığınız zorlukları belirtebilirsiniz\n\nBöylece size en uygun önerileri geliştirebilirim.`,
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

  const handleVoiceRecord = () => {
    setIsRecording(!isRecording);
    // Voice recording logic would go here
  };

  // Initial welcome state
  if (!currentChatId && messages.length === 0) {
    return (
      <DashboardLayout>
        <div className="h-[calc(100vh-200px)] flex" style={{ minHeight: '1000px' }}>
          {/* Sidebar */}
          <AnimatePresence>
            {sidebarOpen && (
              <motion.div
                initial={{ x: -300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -300, opacity: 0 }}
                className="w-80 bg-[#146448] border-r border-[#f6f8f9]/10 flex flex-col"
              >
                {/* Sidebar Header */}
                <div className="p-4 border-b border-[#f6f8f9]/10">
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
                <div className="flex-1 overflow-y-auto p-4">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-[#f6f8f9]/70 mb-3">Son Sohbetler</h3>
                      <div className="space-y-2">
                        {chatSessions.map((chat) => (
                          <button
                            key={chat.id}
                            onClick={() => handleSelectChat(chat.id)}
                            className="w-full p-3 bg-[#146448]/50 hover:bg-[#f6f8f9]/10 rounded-lg text-left transition-colors group"
                          >
                            <div className="text-sm font-medium text-[#f6f8f9] group-hover:text-[#baf200] transition-colors truncate">
                              {chat.title}
                            </div>
                            <div className="text-xs text-[#f6f8f9]/60 mt-1 truncate">
                              {chat.lastMessage}
                            </div>
                            <div className="text-xs text-[#f6f8f9]/40 mt-1">
                              {chat.messageCount} mesaj • {chat.date}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium text-[#f6f8f9]/70 mb-3">Raporlarımdan Başla</h3>
                      <div className="space-y-2">
                        {previousReports.map((report) => (
                          <button
                            key={report.id}
                            onClick={() => handleStartWithReport(report)}
                            className="w-full p-3 bg-[#146448]/50 hover:bg-[#f6f8f9]/10 rounded-lg text-left transition-colors group"
                          >
                            <div className="text-sm font-medium text-[#f6f8f9] group-hover:text-[#baf200] transition-colors truncate">
                              {report.title}
                            </div>
                            <div className="text-xs text-[#f6f8f9]/60 mt-1 truncate">
                              {report.summary}
                            </div>
                            <div className="text-xs text-[#f6f8f9]/40 mt-1">
                              {report.date}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sidebar Footer */}
                <div className="p-4 border-t border-[#f6f8f9]/10">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-[#baf200] rounded-full flex items-center justify-center">
                      <span className="text-[#1e3237] text-sm font-bold">V</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-[#f6f8f9] truncate">Volkan Ş.</div>
                      <div className="text-xs text-[#f6f8f9]/60">Premium Üye</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main Welcome Area */}
          <div className="flex-1 flex flex-col bg-[#146448]">
            {/* Chat Header */}
            <div className="flex items-center justify-between p-4 border-b border-[#f6f8f9]/10">
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
                    <svg className="w-4 h-4 text-[#1e3237]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#f6f8f9]">SeraGPT</h3>
                    <p className="text-xs text-[#baf200]">Çevrimiçi</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button className="p-2 hover:bg-[#f6f8f9]/10 rounded-lg transition-colors">
                  <svg className="w-5 h-5 text-[#f6f8f9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Welcome Content */}
            <div className="flex-1 flex items-center justify-center p-8">
              <div className="text-center max-w-2xl">
                <div className="w-20 h-20 bg-[#baf200] rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-[#1e3237]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h1 className="text-3xl font-bold text-[#f6f8f9] mb-4">SeraGPT AI Asistan'a Hoş Geldiniz</h1>
                <p className="text-[#f6f8f9] text-lg mb-8">
                  Size nasıl yardımcı olabilirim? Önceki raporlarınızdan birini analiz edelim, 
                  devam eden bir sohbetimize dönelim veya yeni bir konuşma başlatalım.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  <div className="p-4 bg-[#f6f8f9]/10 rounded-lg border border-[#f6f8f9]/20">
                    <div className="text-[#baf200] text-xl mb-2">💡</div>
                    <h3 className="font-semibold text-[#f6f8f9] mb-2">Akıllı Analiz</h3>
                    <p className="text-sm text-[#f6f8f9]/70">Raporlarınızı analiz ederek özel öneriler sunuyorum</p>
                  </div>
                  <div className="p-4 bg-[#f6f8f9]/10 rounded-lg border border-[#f6f8f9]/20">
                    <div className="text-[#baf200] text-xl mb-2">🎯</div>
                    <h3 className="font-semibold text-[#f6f8f9] mb-2">Uzman Danışmanlık</h3>
                    <p className="text-sm text-[#f6f8f9]/70">20+ yıllık sera deneyimi ile rehberlik ediyorum</p>
                  </div>
                  <div className="p-4 bg-[#f6f8f9]/10 rounded-lg border border-[#f6f8f9]/20">
                    <div className="text-[#baf200] text-xl mb-2">⚡</div>
                    <h3 className="font-semibold text-[#f6f8f9] mb-2">Hızlı Yanıt</h3>
                    <p className="text-sm text-[#f6f8f9]/70">Anında kapsamlı ve detaylı çözümler üretiyorum</p>
                  </div>
                </div>

                <button
                  onClick={handleNewChat}
                  className="bg-[#baf200] text-[#1e3237] py-3 px-8 rounded-lg font-medium hover:bg-[#baf200]/90 transition-colors"
                >
                  Hemen Başlayalım
                </button>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  // Chat interface
  return (
    <DashboardLayout>
      <div className="h-[calc(100vh-200px)] flex" style={{ minHeight: '1000px' }}>
        {/* Sidebar */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.div
              initial={{ x: -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              className="w-80 bg-[#146448] border-r border-[#f6f8f9]/10 flex flex-col"
            >
              {/* Sidebar Header */}
              <div className="p-4 border-b border-[#f6f8f9]/10">
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
              <div className="flex-1 overflow-y-auto p-4">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-[#f6f8f9]/70 mb-3">Son Sohbetler</h3>
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
                    <h3 className="text-sm font-medium text-[#f6f8f9]/70 mb-3">Raporlarımdan Başla</h3>
                    <div className="space-y-2">
                      {previousReports.map((report) => (
                        <button
                          key={report.id}
                          onClick={() => handleStartWithReport(report)}
                          className="w-full p-3 bg-[#146448]/50 hover:bg-[#f6f8f9]/10 rounded-lg text-left transition-colors group"
                        >
                          <div className="text-sm font-medium text-[#f6f8f9] group-hover:text-[#baf200] transition-colors truncate">
                            {report.title}
                          </div>
                          <div className="text-xs text-[#f6f8f9]/60 mt-1 truncate">
                            {report.summary.substring(0, 50)}...
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col bg-[#146448]">
          {/* Chat Header */}
          <div className="flex items-center justify-between p-4 border-b border-[#f6f8f9]/10">
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
                  <svg className="w-4 h-4 text-[#1e3237]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-[#f6f8f9]">SeraGPT</h3>
                  <p className="text-xs text-[#baf200]">Çevrimiçi</p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button className="p-2 hover:bg-[#f6f8f9]/10 rounded-lg transition-colors">
                <svg className="w-5 h-5 text-[#f6f8f9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                  <div className="flex max-w-2xl space-x-3">
                    {message.role === 'assistant' && (
                      <div className="w-8 h-8 bg-[#baf200] rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-4 h-4 text-[#1e3237]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                      </div>
                    )}
                    <div
                      className={`px-4 py-3 rounded-2xl ${
                        message.role === 'user'
                          ? 'bg-[#baf200] text-[#1e3237]'
                          : 'bg-[#f6f8f9]/10 text-[#f6f8f9] border border-[#f6f8f9]/20'
                      }`}
                    >
                      <div className="whitespace-pre-wrap text-sm leading-relaxed">
                        {message.content}
                      </div>
                      <div className={`text-xs mt-2 ${
                        message.role === 'user' ? 'text-[#1e3237]/70' : 'text-[#f6f8f9]/60'
                      }`}>
                        {message.timestamp.toLocaleTimeString('tr-TR', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </div>
                    </div>
                    {message.role === 'user' && (
                      <div className="w-8 h-8 bg-[#f6f8f9] rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-[#1e3237] text-sm font-bold">V</span>
                      </div>
                    )}
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
                <div className="flex space-x-3">
                  <div className="w-8 h-8 bg-[#baf200] rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-[#1e3237]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <div className="bg-[#f6f8f9]/10 text-[#f6f8f9] border border-[#f6f8f9]/20 px-4 py-3 rounded-2xl">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-[#baf200] rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-[#baf200] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-[#baf200] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Enhanced Input Area */}
          <div className="p-4 border-t border-[#f6f8f9]/10">
            <div className="flex items-end space-x-3">
              {/* Plus Button */}
              <button className="p-3 bg-[#f6f8f9]/10 hover:bg-[#f6f8f9]/20 rounded-full transition-colors group">
                <svg className="w-5 h-5 text-[#f6f8f9] group-hover:text-[#baf200] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </button>

              {/* Input Area */}
              <div className="flex-1 relative">
                <textarea
                  ref={inputRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="SeraGPT hazır ve sizi bekliyor..."
                  className="w-full resize-none rounded-xl border border-[#f6f8f9]/20 px-4 py-3 pr-20 focus:outline-none focus:ring-2 focus:ring-[#baf200]/50 focus:border-[#baf200]/30 bg-[#f6f8f9]/10 text-[#f6f8f9] placeholder-[#f6f8f9]/50 min-h-[48px] max-h-32"
                  rows={1}
                />
                
                {/* Voice Button */}
                <button
                  onClick={handleVoiceRecord}
                  className={`absolute right-12 bottom-3 p-2 rounded-full transition-all ${
                    isRecording 
                      ? 'bg-red-500 text-white animate-pulse' 
                      : 'bg-[#f6f8f9]/10 hover:bg-[#f6f8f9]/20 text-[#f6f8f9]'
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                </button>
              </div>

              {/* Send Button */}
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim()}
                className="bg-[#baf200] text-[#1e3237] p-3 rounded-full hover:bg-[#baf200]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
