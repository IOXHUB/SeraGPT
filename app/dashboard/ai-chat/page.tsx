'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { aiService, ChatMessage, ChatSession, AIAnalysisInsight } from '@/lib/services/ai-service';

// Force dynamic rendering for dashboard pages
export const dynamic = 'force-dynamic';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  analysisType?: string;
}

interface UserAnalysis {
  id: string;
  type: string;
  title: string;
  date: string;
  status: 'completed' | 'processing';
  summary: string;
}

export default function DashboardAIChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Mock user analyses - this would come from API in real implementation
  const userAnalyses: UserAnalysis[] = [
    {
      id: '1',
      type: 'ROI Simülasyonu',
      title: 'Antalya Domates Serası ROI Analizi',
      date: '2 gün önce',
      status: 'completed',
      summary: 'Yatırım geri dönüş süresi: 2.8 yıl, ROI: %34.2'
    },
    {
      id: '2',
      type: 'İklim Analizi',
      title: 'İzmir Salatalık Üretimi İklim Uygunluğu',
      date: '5 gün önce',
      status: 'completed',
      summary: 'Uygunluk skoru: %87, Düşük risk seviyesi'
    },
    {
      id: '3',
      type: 'Ekipman Listesi',
      title: 'Bursa Biber Serası Ekipman Önerileri',
      date: '1 hafta önce',
      status: 'completed',
      summary: 'Toplam maliyet: ₺285,000, 23 ekipman önerisi'
    }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Welcome message
  useEffect(() => {
    if (messages.length === 0) {
      const welcomeMessage: Message = {
        id: 'welcome',
        content: `Merhaba! Ben SeraGPT AI asistanınızım. 

Önceden yaptığınız analizler ve raporlar hakkında sorularınızı yanıtlayabilirim:

📊 **Mevcut Analizleriniz:**
${userAnalyses.map(analysis => `• ${analysis.title} (${analysis.summary})`).join('\n')}

**Örnek sorular:**
• "Antalya domates projemde maliyetleri nasıl optimize edebilirim?"
• "İzmir salatalık serası için risk faktörleri neler?"
• "Bursa biber serası ekipmanlarından hangilerini önceleyebilirim?"

Bu sohbet tamamen ücretsizdir. Analizleriniz hakkında istediğiniz kadar soru sorabilirsiniz! 🌱`,
        role: 'assistant',
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    }
  }, []);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      role: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Simulate AI response with context about user's analyses
    setTimeout(() => {
      const relevantAnalysis = userAnalyses.find(analysis => 
        inputValue.toLowerCase().includes(analysis.type.toLowerCase()) ||
        inputValue.toLowerCase().includes('antalya') ||
        inputValue.toLowerCase().includes('domates') ||
        inputValue.toLowerCase().includes('roi')
      );

      let response = '';
      
      if (relevantAnalysis) {
        response = `${relevantAnalysis.title} analizinize göre:

**Mevcut Durum:**
${relevantAnalysis.summary}

**AI Önerisi:**
Bu analiz sonuçlarına göre, projenizdeki temel parametreler oldukça uygun görünüyor. Ancak şu noktalara dikkat etmenizi öneriyorum:

1. **Maliyet Optimizasyonu:** İklim kontrol sistemlerinde enerji verimliliği
2. **Risk Yönetimi:** Mevsimsel fiyat dalgalanmalarına karşı çeşitlendirme
3. **Verimlilik:** Sulama sisteminin optimizasyonu

Daha detaylı bir analiz için hangi konuda derinlemesine bilgi almak istersiniz?`;
      } else {
        response = `Sorununuzu anladım. Mevcut analizlerinize dayanarak genel önerilerim:

**Mevcut Projeleriniz:**
${userAnalyses.map(a => `• ${a.title}: ${a.summary}`).join('\n')}

Bu projeler ışığında, hangi spesifik konuda yardıma ihtiyacınız var? Örneğin:
- Maliyet optimizasyonu
- Risk analizi
- Ekipman seçimi
- Pazarlama stratejisi

Size daha hedefe yönelik öneriler verebilirim.`;
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        role: 'assistant',
        timestamp: new Date(),
        analysisType: relevantAnalysis?.type
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const startNewChat = () => {
    setMessages([]);
    // Re-trigger welcome message
    setTimeout(() => {
      const welcomeMessage: Message = {
        id: 'welcome-new',
        content: `Yeni sohbet başlatıldı! 

Analizleriniz ve raporlarınız hakkında yeni sorularınızı sorabilirsiniz. Hangi proje üzerinde konuşmak istersiniz?

📊 **Mevcut Analizleriniz:**
${userAnalyses.map(analysis => `• ${analysis.title}`).join('\n')}`,
        role: 'assistant',
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    }, 100);
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gray-50 text-gray-600">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 h-[calc(100vh-150px)] flex flex-col">
            {/* Chat Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="text-2xl font-bold text-gray-900">SeraGPT AI Asistan</h1>
                <p className="text-sm text-gray-600">Analizleriniz ve raporlarınız hakkında konuşun</p>
              </motion.div>
              <div className="flex items-center space-x-4">
                <div className="bg-green-50 px-3 py-1 rounded-full">
                  <span className="text-green-700 text-sm font-medium">Ücretsiz</span>
                </div>
                <button
                  onClick={startNewChat}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  Yeni Sohbet
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-3xl ${
                    message.role === 'user'
                      ? 'bg-gray-600 text-white'
                      : 'bg-gray-50 text-gray-900'
                  } rounded-2xl px-6 py-4 shadow-sm`}>
                    {message.role === 'assistant' && (
                      <div className="flex items-center space-x-2 mb-3">
                        <div className="w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">AI</span>
                        </div>
                        <span className="text-sm font-medium text-gray-600">SeraGPT</span>
                      </div>
                    )}
                    <div className="whitespace-pre-wrap text-sm leading-relaxed">
                      {message.content}
                    </div>
                    {message.analysisType && (
                      <div className="mt-3 pt-3 border-t border-gray-200">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {message.analysisType} referansı
                        </span>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
              
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-gray-50 rounded-2xl px-6 py-4 shadow-sm">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">AI</span>
                      </div>
                      <span className="text-sm font-medium text-gray-600">SeraGPT</span>
                    </div>
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="border-t border-gray-200 p-6">
              <div className="flex space-x-4">
                <div className="flex-1">
                  <textarea
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Analizleriniz hakkında sorunuzu yazın... (örn: 'Antalya domates projemde ROI nasıl artırırım?')"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-transparent resize-none"
                    rows={3}
                    disabled={isLoading}
                  />
                </div>
                <button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isLoading}
                  className="bg-gray-600 hover:bg-gray-700 disabled:bg-gray-300 text-white px-6 py-3 rounded-xl font-medium transition-colors self-end"
                >
                  Gönder
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Bu sohbet tamamen ücretsizdir. İstediğiniz kadar soru sorabilirsiniz.
              </p>
            </div>
          </div>

          {/* Analysis Quick Access */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-6 bg-white rounded-2xl shadow-sm border border-gray-200 p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Analizlerinize Hızlı Erişim</h3>
            <div className="grid md:grid-cols-3 gap-4">
              {userAnalyses.map((analysis) => (
                <button
                  key={analysis.id}
                  onClick={() => setInputValue(`${analysis.title} hakkında detay ver`)}
                  className="text-left p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-900">{analysis.type}</span>
                    <span className={`w-2 h-2 rounded-full ${
                      analysis.status === 'completed' ? 'bg-green-500' : 'bg-yellow-500'
                    }`}></span>
                  </div>
                  <h4 className="font-medium text-gray-900 mb-1 text-sm">{analysis.title}</h4>
                  <p className="text-xs text-gray-600 mb-2">{analysis.summary}</p>
                  <p className="text-xs text-gray-500">{analysis.date}</p>
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
}
