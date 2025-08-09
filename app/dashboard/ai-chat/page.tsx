'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/lib/hooks/useAuth';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { useSearchParams } from 'next/navigation';

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
}

export default function AIChatPage() {
  const { user, loading } = useAuth();
  const searchParams = useSearchParams();

  const [chatSession, setChatSession] = useState<ChatSession | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Get prompt from URL parameter
  const promptParam = searchParams?.get('prompt');
  const sessionParam = searchParams?.get('session');
  const reportParam = searchParams?.get('report');

  // Initialize chat session
  useEffect(() => {
    if (user && !loading) {
      initializeNewSession();
    }
  }, [user, loading]);

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
      user_id: user.id
    };

    // Welcome message based on context
    const welcomeMessage: ChatMessage = {
      id: 'welcome',
      role: 'assistant',
      content: getWelcomeMessage(),
      timestamp: new Date(),
      session_id: newSession.id
    };

    newSession.messages.push(welcomeMessage);
    setChatSession(newSession);

    // Auto-start with custom prompt if provided
    if (promptParam) {
      setTimeout(() => {
        setInputValue(getCustomPrompt(promptParam));
        // Auto-focus input for immediate editing
        inputRef.current?.focus();
      }, 1000);
    }
  };

  const getSessionTitle = () => {
    if (promptParam?.includes('roi')) return 'ROI Analizi Sohbeti';
    if (promptParam?.includes('climate')) return 'İklim Analizi Sohbeti';
    if (promptParam?.includes('equipment')) return 'Ekipman Önerileri Sohbeti';
    if (promptParam?.includes('market')) return 'Pazar Analizi Sohbeti';
    if (promptParam?.includes('layout')) return 'Teknik Plan Sohbeti';
    if (promptParam?.includes('cost')) return 'Maliyet Optimizasyonu Sohbeti';
    if (promptParam?.includes('efficiency')) return 'Verimlilik Sohbeti';
    if (promptParam?.includes('technology')) return 'Teknoloji Sohbeti';
    if (promptParam?.includes('marketing')) return 'Pazarlama Sohbeti';
    if (promptParam?.includes('sustainability')) return 'Sürdürülebilirlik Sohbeti';
    if (sessionParam) return `Sohbet Devamı #${sessionParam}`;
    return 'SeraGPT AI Sohbet';
  };

  const getWelcomeMessage = () => {
    if (reportParam) {
      const reportTitle = getReportTitle(reportParam);
      return `🌱 Sera Uzmanınız burada! 👋

**${reportTitle}** raporunuzu detaylı analiz ettim. Bu rapor üzerinden size değerli öneriler ve geliştirme fikirleri sunabilirim.

**Bu raporda gördüklerim:**
• Kapsamlı veri analizi ve hesaplamalar
• Önemli fırsat alanları
• Potansiyel iyileştirme noktaları
• Risk faktörleri ve çözüm önerileri

**Size nasıl yardımcı olabilirim?**
• Rapordaki sonuçları detaylandıralım
• Alternatif stratejiler geliştirelim
• Maliyet optimizasyonu önerileri sunayım
• Uygulama adımlarını planlayalım

Hangi konuda derinlemesine konuşmak istersiniz?`;
    }

    if (promptParam) {
      return `Merhaba! 👋

Bu sohbeti ${getSessionTitle().toLowerCase()} için başlattınız. Size özel hazırladığım soruyu aşağıda görebilirsiniz.

İsterseniz bu soruyu düzenleyebilir veya kendi sorunuzu yazabilirsiniz.`;
    }

    if (sessionParam) {
      return `Hoşgeldiniz! 👋

Daha önce başlattığınız sohbete devam ediyoruz. Kaldığımız yerden konuşmaya devam edebiliriz.

Bu konuda hangi detayları merak ediyorsunuz?`;
    }

    return `🌱 Sera Uzmanınız burada! 👋

20+ yıllık sera deneyimi ve AI teknolojisini birleştirerek size en iyi tavsiyeleri sunuyorum.

**Yardımcı olabileceğim konular:**
• Raporlarınızı analiz etme ve öneriler sunma
• Sera yatırım danışmanlığı ve ROI optimizasyonu
• İklim ve pazar koşulları değerlendirmesi
• Ekipman seçimi ve teknoloji önerileri
• Maliyet azaltma ve verimlilik artırma stratejileri

Hangi konuda konuşmak istersiniz?`;
  };

  const getReportTitle = (reportId: string) => {
    const reportTitles = {
      'demo-roi-001': 'Antalya Domates Serası ROI Analizi',
      'demo-roi-002': 'Mersin Biber Serası Karlılık Analizi',
      'demo-climate-001': 'İzmir İklim Uygunluk Analizi',
      'demo-climate-002': 'Bursa Marul Üretimi İklim Raporu',
      'demo-equipment-001': 'Hidroponik Sistem Ekipman Listesi',
      'demo-equipment-002': 'Geleneksel Sera Ekipman Paketi',
      'demo-market-001': 'Salatalık Pazar Fiyat Analizi',
      'demo-layout-001': 'Modern Sera Layout Planı'
    };
    return reportTitles[reportId as keyof typeof reportTitles] || 'Analiz Raporu';
  };

  const getCustomPrompt = (prompt: string) => {
    const prompts = {
      'roi_report': 'Bu ROI analiz raporundaki finansal projeksiyonları nasıl optimize edebilirim? Hangi faktörler geri dönüş süresini kısaltabilir?',
      'climate_report': 'İklim raporum temelinde hangi dönemlerde en yüksek verimlilik elde edebilirim? Risk faktörlerini nasıl minimize ederim?',
      'equipment_report': 'Ekipman listesindeki maliyetleri nasıl optimize edebilirim? Hangi ekipmanlar için alternatif çözümler var?',
      'market_report': 'Pazar analizi sonuçlarına göre hangi stratejilerle daha yüksek kar elde edebilirim? Optimal satış zamanlaması nedir?',
      'layout_report': 'Layout planımda verimlilik nasıl artırılabilir? Alan kullanımı için hangi iyileştirmeler önerirsiniz?',
      'cost_optimization': 'Sera işletmemde maliyet tasarrufu ve optimizasyon konularında önerilerinizi almak istiyorum.',
      'efficiency': 'Sera verimliliğimi artırmak için hangi stratejileri uygulayabilirim? Detaylı öneriler istiyorum.',
      'technology': 'Sera teknolojilerindeki son yenilikler ve bunları işletmeme entegre etme yolları nelerdir?',
      'marketing': 'Sera ürünlerimi pazarlama ve satış kanallarını geliştirme konusunda stratejik öneriler istiyorum.',
      'sustainability': 'Sera işletmemi daha sürdürülebilir hale getirmek için çevre dostu çözümler önerir misin?'
    };

    return prompts[prompt as keyof typeof prompts] || '';
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

    try {
      // Mock response for now
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
    const input = userInput.toLowerCase();

    if (input.includes('maliyet') || input.includes('para') || input.includes('fiyat')) {
      return `Sera maliyetleri konusunda size detaylı bilgi verebilirim.

**Temel Maliyet Kategorileri:**

• **Yapı Maliyeti**: Sera konstrüksiyonu ve örtü sistemi
• **Ekipman Maliyeti**: İklim kontrolü, sulama, otomasyon
• **Altyapı Maliyeti**: Elektrik, su, yol bağlantısı
• **İşletme Maliyeti**: Enerji, işgücü, bakım, girdiler

Hangi boyutta sera düşünüyorsunuz? Size özel bir maliyet analizi hazırlayabilirim.`;
    }

    if (input.includes('roi') || input.includes('geri dönüş') || input.includes('kâr')) {
      return `ROI hesaplaması için size kapsamlı bir analiz sunabilirim.

**ROI Değerlendirme Faktörleri:**

• **Yatırım Tutarı**: Toplam kuruluş maliyeti
• **İşletme Giderleri**: Yıllık operasyon maliyetleri  
• **Gelir Projeksiyonu**: Üretim kapasitesi × satış fiyatı
• **Pazar Koşulları**: Talep, rekabet, fiyat dalgalanmaları

Sera büyüklüğünüz ve üretim planınız hakkında bilgi alabilir miyim?`;
    }

    return `Size en iyi şekilde yardımcı olabilmem için lütfen sorunuzu biraz daha detaylandırın.

**Yardımcı olabileceğim konular:**

• Sera yatırım analizi ve ROI hesaplamaları
• Bölge seçimi ve iklim değerlendirmesi
• Ekipman seçimi ve teknoloji önerileri  
• Pazar analizi ve fırsat değerlendirmesi
• Üretim planlaması ve maliyet optimizasyonu

Hangi konuda derinlemesine analiz istersiniz?`;
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

  const copyMessage = (content: string) => {
    navigator.clipboard.writeText(content);
  };

  const shareMessage = (content: string) => {
    if (navigator.share) {
      navigator.share({
        title: 'SeraGPT AI Yanıt',
        text: content
      });
    }
  };

  const downloadMessage = (content: string, filename: string = 'seragpt-yanit.txt') => {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-full">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="text-2xl"
              >
                🤖
              </motion.div>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">AI Chat Hazırlanıyor</h3>
            <p className="text-gray-600">SeraGPT AI asistanınız yükleniyor...</p>
          </motion.div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="h-full bg-white flex flex-col overflow-hidden">
        
        {/* Main Chat Area - Full Screen */}
        <div className="flex-1 flex flex-col min-h-0">
          
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto px-6 py-8">
            <div className="max-w-4xl mx-auto space-y-6">
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
                      
                      {/* Message Bubble */}
                      <div className={`group relative ${message.role === 'user' ? 'ml-auto' : 'mr-auto'}`}>
                        <div className={`px-6 py-4 rounded-3xl shadow-sm ${
                          message.role === 'user'
                            ? 'bg-blue-500 text-white rounded-br-lg'
                            : 'bg-gray-50 border border-gray-100 text-gray-800 rounded-bl-lg'
                        }`}>
                          {/* AI Avatar */}
                          {message.role === 'assistant' && (
                            <div className="flex items-center mb-3">
                              <div className="w-6 h-6 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mr-2">
                                <span className="text-white text-xs">🤖</span>
                              </div>
                              <span className="text-sm font-medium text-gray-600">SeraGPT</span>
                            </div>
                          )}

                          {/* Message Content */}
                          <div className="prose prose-sm max-w-none">
                            {message.content.split('\n').map((line, lineIndex) => {
                              // Bold headers
                              if (line.trim().match(/^\*\*.+\*\*$/)) {
                                return (
                                  <div key={lineIndex} className={`font-bold text-base mb-3 mt-4 first:mt-0 ${
                                    message.role === 'user' ? 'text-blue-100' : 'text-gray-900'
                                  }`}>
                                    {line.replace(/\*\*/g, '')}
                                  </div>
                                );
                              }

                              // Bullet points
                              if (line.trim().startsWith('•')) {
                                return (
                                  <div key={lineIndex} className="flex items-start mb-2">
                                    <span className="mr-3 mt-1">•</span>
                                    <span>{line.replace(/^•\s*/, '')}</span>
                                  </div>
                                );
                              }

                              // Regular paragraphs
                              return line.trim() ? (
                                <p key={lineIndex} className="mb-3 last:mb-0 leading-relaxed">{line}</p>
                              ) : (
                                <br key={lineIndex} />
                              );
                            })}
                          </div>

                          {/* File attachments */}
                          {message.attachments && message.attachments.length > 0 && (
                            <div className="mt-3 pt-3 border-t border-gray-200">
                              {message.attachments.map((filename, i) => (
                                <div key={i} className="flex items-center text-sm text-gray-600">
                                  <span className="mr-2">📎</span>
                                  <span>{filename}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Message Actions - Only for AI messages */}
                        {message.role === 'assistant' && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex items-center space-x-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <button
                              onClick={() => copyMessage(message.content)}
                              className="p-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-gray-500 hover:text-gray-700"
                              title="Kopyala"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                              </svg>
                            </button>
                            
                            <button
                              onClick={() => shareMessage(message.content)}
                              className="p-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-gray-500 hover:text-gray-700"
                              title="Paylaş"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                              </svg>
                            </button>

                            <button
                              onClick={() => downloadMessage(message.content)}
                              className="p-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-gray-500 hover:text-gray-700"
                              title="İndir"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                            </button>

                            <div className="text-xs text-gray-400 ml-4">
                              {message.timestamp.toLocaleTimeString('tr-TR', {
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </div>
                          </motion.div>
                        )}

                        {/* User message timestamp */}
                        {message.role === 'user' && (
                          <div className="text-xs text-gray-400 mt-2 text-right">
                            {message.timestamp.toLocaleTimeString('tr-TR', {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Enhanced Typing Indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="flex justify-start"
                >
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mt-1">
                      <span className="text-white text-xs">🤖</span>
                    </div>
                    <div className="bg-gray-50 border border-gray-100 rounded-3xl rounded-bl-lg px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600">AI yazıyor</span>
                        <div className="flex space-x-1">
                          <motion.div
                            animate={{ scale: [1, 1.3, 1] }}
                            transition={{ duration: 0.8, repeat: Infinity, delay: 0 }}
                            className="w-2 h-2 bg-green-500 rounded-full"
                          />
                          <motion.div
                            animate={{ scale: [1, 1.3, 1] }}
                            transition={{ duration: 0.8, repeat: Infinity, delay: 0.2 }}
                            className="w-2 h-2 bg-green-500 rounded-full"
                          />
                          <motion.div
                            animate={{ scale: [1, 1.3, 1] }}
                            transition={{ duration: 0.8, repeat: Infinity, delay: 0.4 }}
                            className="w-2 h-2 bg-green-500 rounded-full"
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

          {/* Input Area */}
          <div className="border-t border-gray-100 bg-white p-6">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-end space-x-4">
                
                {/* File Input */}
                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  accept=".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg,.dwg,.xlsx,.xls,.ppt,.pptx,.csv,.zip,.rar"
                  onChange={handleFileSelect}
                />
                
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="p-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-2xl transition-colors text-gray-500 hover:text-gray-700"
                  title="Dosya ekle"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                  </svg>
                </button>

                {/* Text Input */}
                <div className="flex-1 relative">
                  <textarea
                    ref={inputRef}
                    value={inputValue}
                    onChange={(e) => {
                      setInputValue(e.target.value);
                      const textarea = e.target;
                      textarea.style.height = 'auto';
                      textarea.style.height = Math.min(textarea.scrollHeight, 150) + 'px';
                    }}
                    onKeyPress={handleKeyPress}
                    placeholder="SeraGPT AI'ya mesajınızı yazın..."
                    className="w-full px-6 py-4 pr-16 border-2 border-gray-200 rounded-3xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all text-base placeholder-gray-400 hover:border-gray-300"
                    rows={1}
                    style={{ minHeight: '56px', maxHeight: '150px' }}
                  />

                  {/* Selected file indicator */}
                  {selectedFile && (
                    <div className="absolute bottom-16 left-4 right-4 bg-blue-50 border border-blue-200 rounded-lg p-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="text-blue-600">📎</span>
                          <span className="text-sm text-blue-700 font-medium">{selectedFile.name}</span>
                        </div>
                        <button
                          onClick={() => setSelectedFile(null)}
                          className="text-blue-400 hover:text-blue-600"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Character counter */}
                  <div className="absolute bottom-3 right-4 text-xs text-gray-400">
                    {inputValue.length}/2000
                  </div>
                </div>

                {/* Send Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isTyping}
                  className={`p-3 rounded-2xl font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
                    !inputValue.trim() || isTyping
                      ? 'bg-gray-300 text-gray-500'
                      : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg shadow-blue-200'
                  }`}
                >
                  {isTyping ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    />
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  )}
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
