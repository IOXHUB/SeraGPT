'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/lib/hooks/useAuth';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { useSearchParams } from 'next/navigation';
import { DevMockSystem, MOCK_ANALYSES } from '@/lib/utils/dev-mock-system';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  session_id?: string;
  attachments?: string[];
}

interface ChatSession {
  id: string;
  title: string;
  messages: ChatMessage[];
  created_at: Date;
  updated_at: Date;
  user_id: string;
  selectedReport?: string;
}

type AnalysisType = 'roi' | 'climate' | 'equipment' | 'market' | 'layout';

export default function AIChatPage() {
  const { user, loading } = useAuth();
  const searchParams = useSearchParams();

  const [chatSession, setChatSession] = useState<ChatSession | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showReportSelection, setShowReportSelection] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<AnalysisType | null>(null);
  const [isListening, setIsListening] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Get prompt from URL parameter
  const promptParam = searchParams?.get('prompt');
  const sessionParam = searchParams?.get('session');
  const reportParam = searchParams?.get('report');
  const categoryParam = searchParams?.get('category') as AnalysisType;

  // Initialize chat session
  useEffect(() => {
    if (user && !loading) {
      if (categoryParam && !reportParam) {
        setSelectedCategory(categoryParam);
        setShowReportSelection(true);
      } else {
        initializeNewSession();
      }
    }
  }, [user, loading, categoryParam, reportParam]);

  // Auto-scroll to bottom
  useEffect(() => {
    scrollToBottom();
  }, [chatSession?.messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const initializeNewSession = () => {
    if (!user) return;

    const newSession: ChatSession = {
      id: `session_${Date.now()}`,
      title: getSessionTitle(),
      messages: [],
      created_at: new Date(),
      updated_at: new Date(),
      user_id: user.id,
      selectedReport: reportParam || undefined
    };

    setChatSession(newSession);

    // Auto-start with custom prompt if provided
    if (promptParam) {
      setTimeout(() => {
        setInputValue(getCustomPrompt(promptParam));
        inputRef.current?.focus();
      }, 1000);
    }
  };

  const getSessionTitle = () => {
    if (reportParam) return getReportTitle(reportParam);
    if (promptParam?.includes('roi')) return 'ROI Analizi';
    if (promptParam?.includes('climate')) return 'İklim Analizi';
    if (promptParam?.includes('equipment')) return 'Ekipman Analizi';
    if (promptParam?.includes('market')) return 'Pazar Analizi';
    if (promptParam?.includes('layout')) return 'Layout Analizi';
    return 'SeraGPT 5';
  };

  const getCategoryTitle = (category: AnalysisType) => {
    const titles = {
      roi: 'ROI Analizi',
      climate: 'İklim Analizi',
      equipment: 'Ekipman Analizi',
      market: 'Pazar Analizi',
      layout: 'Layout Analizi'
    };
    return titles[category];
  };

  const getCategoryReports = (category: AnalysisType) => {
    return MOCK_ANALYSES.filter(analysis => 
      analysis.type === category && analysis.status === 'completed'
    );
  };

  const getReportTitle = (reportId: string) => {
    const analysis = MOCK_ANALYSES.find(a => a.id === reportId);
    return analysis?.title || 'Analiz Raporu';
  };

  const getCustomPrompt = (prompt: string) => {
    const prompts = {
      'roi_report': 'Bu ROI analiz raporundaki finansal projeksiyonları nasıl optimize edebilirim?',
      'climate_report': 'İklim raporum temelinde hangi dönemlerde en yüksek verimlilik elde edebilirim?',
      'equipment_report': 'Ekipman listesindeki maliyetleri nasıl optimize edebilirim?',
      'market_report': 'Pazar analizi sonuçlarına göre hangi stratejilerle daha yüksek kar elde edebilirim?',
      'layout_report': 'Layout planımda verimlilik nasıl artırılabilir?'
    };

    return prompts[prompt as keyof typeof prompts] || '';
  };

  const handleReportSelect = (reportId: string) => {
    setShowReportSelection(false);
    
    const url = new URL(window.location.href);
    url.searchParams.set('report', reportId);
    url.searchParams.delete('category');
    window.history.pushState({}, '', url.toString());

    setTimeout(() => {
      initializeNewSession();
    }, 100);
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || !chatSession || isTyping || !user) return;

    const userMessage: ChatMessage = {
      id: `msg_${Date.now()}_user`,
      role: 'user',
      content: inputValue.trim(),
      timestamp: new Date(),
      session_id: chatSession.id,
      attachments: selectedFile ? [selectedFile.name] : undefined
    };

    const updatedSession = {
      ...chatSession,
      messages: [...chatSession.messages, userMessage]
    };
    setChatSession(updatedSession);

    const currentInput = inputValue.trim();
    setInputValue('');
    setSelectedFile(null);
    setIsTyping(true);

    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
    }

    try {
      setTimeout(() => {
        const mockResponse = generateMockResponse(currentInput);
        const aiMessage: ChatMessage = {
          id: `msg_${Date.now()}_ai`,
          role: 'assistant',
          content: mockResponse,
          timestamp: new Date(),
          session_id: chatSession.id
        };

        const finalSession = {
          ...updatedSession,
          messages: [...updatedSession.messages, aiMessage]
        };
        setChatSession(finalSession);
        setIsTyping(false);
      }, 1500 + Math.random() * 2000);
    } catch (error) {
      console.error('Chat error:', error);
      setIsTyping(false);
    }
  };

  const generateMockResponse = (userInput: string): string => {
    return `🌱 **SeraGPT 5 ile Sera Uzmanınız**

Merhaba! Size sera konularında en güncel ve akıllı çöz��mler sunmak için buradayım.

**Sorunuza yanıt:**
${userInput} konusunda detaylı analiz yapabilirim. Modern sera teknolojileri ve AI destekli önerilerle en optimal çözümleri bulalım.

**Size nasıl yardımcı olabilirim?**
• Sera yatırım analizi ve ROI hesaplaması
• İklim koşulları optimizasyonu  
• Ekipman seçimi ve maliyet analizi
• Pazar fırsatları değerlendirmesi
• Teknik layout planlaması

Hangi konuda derinlemesine konuşmak istersiniz?`;
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const toggleVoice = () => {
    setIsListening(!isListening);
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-full bg-[#146448]">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <div className="w-16 h-16 bg-[#f6f8f9] rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="text-2xl"
              >
                🤖
              </motion.div>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">SeraGPT 5 Hazırlanıyor</h3>
            <p className="text-white/80">AI asistanınız yükleniyor...</p>
          </motion.div>
        </div>
      </DashboardLayout>
    );
  }

  // Report Selection Screen
  if (showReportSelection && selectedCategory) {
    const categoryReports = getCategoryReports(selectedCategory);
    
    return (
      <DashboardLayout>
        <div className="h-full bg-[#146448] min-h-0">
          <div className="h-full flex flex-col min-h-0">
            {/* Header */}
            <div className="p-4 sm:p-6">
              <div className="max-w-4xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-[#f6f8f9] rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <span className="text-2xl">🤖</span>
                  </div>
                  <h1 className="text-2xl font-bold text-white mb-2">
                    {getCategoryTitle(selectedCategory)} Raporlarınız
                  </h1>
                  <p className="text-white/80">
                    AI Asistan ile konuşmak için bir rapor seçin
                  </p>
                </motion.div>
              </div>
            </div>

            {/* Report List */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6">
              <div className="max-w-4xl mx-auto">
                {categoryReports.length > 0 ? (
                  <div className="space-y-4">
                    {categoryReports.map((report, index) => (
                      <motion.div
                        key={report.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        onClick={() => handleReportSelect(report.id)}
                        className="bg-[#f6f8f9] border border-white/20 rounded-2xl p-6 hover:bg-white cursor-pointer transition-all duration-200 shadow-lg"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-[#1e3237] mb-2">
                              {report.title}
                            </h3>
                            <div className="flex items-center space-x-4 text-sm text-[#1e3237]/70">
                              <span className="flex items-center">
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                {new Date(report.createdAt).toLocaleDateString('tr-TR')}
                              </span>
                              <span className="flex items-center">
                                <div className="w-2 h-2 bg-green-400 rounded-full mr-1"></div>
                                Tamamlandı
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center text-[#1e3237]/70">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-24 h-24 bg-[#f6f8f9] rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <svg className="w-10 h-10 text-[#1e3237]/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium text-white mb-2">
                      Henüz {getCategoryTitle(selectedCategory).toLowerCase()} raporu yok
                    </h3>
                    <p className="text-white/70 mb-6">
                      Bu kategoride henüz tamamlanmış bir raporunuz bulunmuyor.
                    </p>
                    <button
                      onClick={() => setShowReportSelection(false)}
                      className="px-6 py-3 bg-[#baf200] text-[#1e3237] rounded-2xl hover:bg-[#baf200]/90 transition-colors font-medium shadow-lg"
                    >
                      Genel Sohbete Geç
                    </button>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="h-full bg-[#146448] flex flex-col overflow-hidden min-h-0">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4">
          <button className="p-2">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          
          <div className="flex items-center space-x-2">
            <h1 className="text-lg font-semibold text-white">{getSessionTitle()}</h1>
            <svg className="w-4 h-4 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>

          <button className="p-2">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          {chatSession?.messages && chatSession.messages.length > 0 ? (
            // Messages Area
            <div className="flex-1 overflow-y-auto px-6 py-4">
              <div className="space-y-4">
                <AnimatePresence initial={false}>
                  {chatSession?.messages.map((message, index) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[80%] ${message.role === 'user' ? 'order-2' : 'order-1'}`}>
                        <div className={`px-4 py-3 rounded-3xl shadow-sm ${
                          message.role === 'user'
                            ? 'bg-[#baf200] text-[#1e3237] rounded-br-lg'
                            : 'bg-[#f6f8f9] text-[#1e3237] rounded-bl-lg'
                        }`}>
                          {/* AI Avatar */}
                          {message.role === 'assistant' && (
                            <div className="flex items-center mb-3">
                              <div className="w-6 h-6 bg-[#146448] rounded-full flex items-center justify-center mr-2">
                                <span className="text-white text-xs">🤖</span>
                              </div>
                              <span className="text-sm font-medium text-[#1e3237]">SeraGPT 5</span>
                            </div>
                          )}

                          {/* Message Content */}
                          <div className="prose prose-sm max-w-none">
                            {message.content.split('\n').map((line, lineIndex) => {
                              if (line.trim().match(/^\*\*.+\*\*$/)) {
                                return (
                                  <div key={lineIndex} className={`font-bold text-base mb-3 mt-4 first:mt-0 ${
                                    message.role === 'user' ? 'text-white' : 'text-gray-900'
                                  }`}>
                                    {line.replace(/\*\*/g, '')}
                                  </div>
                                );
                              }

                              if (line.trim().startsWith('•')) {
                                return (
                                  <div key={lineIndex} className="flex items-start mb-2">
                                    <span className="mr-3 mt-1">•</span>
                                    <span>{line.replace(/^•\s*/, '')}</span>
                                  </div>
                                );
                              }

                              return line.trim() ? (
                                <p key={lineIndex} className="mb-3 last:mb-0 leading-relaxed">{line}</p>
                              ) : (
                                <br key={lineIndex} />
                              );
                            })}
                          </div>
                        </div>

                        <div className={`text-xs mt-2 ${
                          message.role === 'user' ? 'text-right text-white/70' : 'text-left text-white/70'
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

                {/* Typing Indicator */}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="flex justify-start"
                  >
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-gradient-to-br from-orange-400 to-purple-600 rounded-full flex items-center justify-center mt-1">
                        <span className="text-white text-xs">🤖</span>
                      </div>
                      <div className="bg-white/95 backdrop-blur-sm rounded-3xl rounded-bl-lg px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-600">AI yazıyor</span>
                          <div className="flex space-x-1">
                            <motion.div
                              animate={{ scale: [1, 1.3, 1] }}
                              transition={{ duration: 0.8, repeat: Infinity, delay: 0 }}
                              className="w-2 h-2 bg-orange-500 rounded-full"
                            />
                            <motion.div
                              animate={{ scale: [1, 1.3, 1] }}
                              transition={{ duration: 0.8, repeat: Infinity, delay: 0.2 }}
                              className="w-2 h-2 bg-purple-500 rounded-full"
                            />
                            <motion.div
                              animate={{ scale: [1, 1.3, 1] }}
                              transition={{ duration: 0.8, repeat: Infinity, delay: 0.4 }}
                              className="w-2 h-2 bg-blue-500 rounded-full"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </div>
            </div>
          ) : (
            // Welcome Screen
            <div className="flex-1 flex items-center justify-center px-6">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center"
              >
                <motion.h1 
                  className="text-4xl md:text-5xl font-bold text-white mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  SeraGPT 5 ile tanışın
                </motion.h1>
                
                <motion.p 
                  className="text-lg text-white/90 leading-relaxed max-w-md mx-auto"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  SeraGPT artık en akıllı, en hızlı ve en kullanışlı modelimize sahip; düşünme yeteneğiyle her seferinde en iyi cevabı alırsınız.
                </motion.p>
              </motion.div>
            </div>
          )}
        </div>

        {/* Bottom Input Area */}
        <div className="p-6 pb-8">
          {/* Selected file indicator */}
          {selectedFile && (
            <div className="mb-4">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-white text-lg">📎</span>
                    <div>
                      <span className="text-sm text-white font-medium block">{selectedFile.name}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedFile(null)}
                    className="text-white/70 hover:text-white p-1"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-full p-3 flex items-center space-x-3">
            {/* Plus Button */}
            <button
              onClick={() => fileInputRef.current?.click()}
              className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
            >
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>

            {/* Input Field */}
            <div className="flex-1">
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept=".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg,.dwg,.xlsx,.xls,.ppt,.pptx,.csv,.zip,.rar"
                onChange={handleFileSelect}
              />
              
              <input
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Herhangi bir şey sor"
                className="w-full bg-transparent border-none outline-none text-white placeholder-white/70 text-base"
              />
            </div>

            {/* Voice Button */}
            <button
              onClick={toggleVoice}
              className={`p-3 rounded-full transition-colors ${
                isListening 
                  ? 'bg-red-500 hover:bg-red-600' 
                  : 'bg-white/20 backdrop-blur-sm hover:bg-white/30'
              }`}
            >
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
            </button>

            {/* Audio Waveform / Send Button */}
            {inputValue.trim() ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSendMessage}
                disabled={isTyping}
                className="p-3 bg-white text-purple-600 rounded-full hover:bg-white/90 transition-colors disabled:opacity-50"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </motion.button>
            ) : (
              <button className="p-3 bg-black rounded-full">
                <div className="flex items-center space-x-0.5">
                  <motion.div
                    animate={{ height: [8, 16, 8] }}
                    transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
                    className="w-1 bg-white rounded-full"
                  />
                  <motion.div
                    animate={{ height: [12, 8, 12] }}
                    transition={{ duration: 1, repeat: Infinity, ease: "easeInOut", delay: 0.1 }}
                    className="w-1 bg-white rounded-full"
                  />
                  <motion.div
                    animate={{ height: [16, 12, 16] }}
                    transition={{ duration: 1, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                    className="w-1 bg-white rounded-full"
                  />
                  <motion.div
                    animate={{ height: [8, 16, 8] }}
                    transition={{ duration: 1, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
                    className="w-1 bg-white rounded-full"
                  />
                </div>
              </button>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
