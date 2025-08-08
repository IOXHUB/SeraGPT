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
  token_cost?: number;
  session_id?: string;
  reactions?: string[];
  isEdited?: boolean;
}

interface ChatSession {
  id: string;
  title: string;
  messages: ChatMessage[];
  created_at: Date;
  updated_at: Date;
  user_id: string;
  total_tokens_used: number;
  context?: 'general' | 'roi' | 'climate' | 'equipment' | 'market' | 'layout';
}

interface AIInsight {
  type: 'recommendation' | 'warning' | 'opportunity' | 'insight';
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  actionable: boolean;
  icon?: string;
}

interface ReportSummary {
  id: string;
  type: 'roi' | 'climate' | 'equipment' | 'market' | 'layout';
  title: string;
  summary: string;
  created_at: Date;
  key_metrics?: Record<string, any>;
}

export default function AIChatPage() {
  const { user, tokens, consumeToken, hasTokens, loading } = useAuth();
  
  const [chatSession, setChatSession] = useState<ChatSession | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [insights, setInsights] = useState<AIInsight[]>([]);
  const [error, setError] = useState<string>('');
  const [tokenWarning, setTokenWarning] = useState<string>('');
  const [chatHistory, setChatHistory] = useState<ChatSession[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(true);
  const [recentReports, setRecentReports] = useState<ReportSummary[]>([]);

  // Enhanced mobile states
  const [showSidebar, setShowSidebar] = useState(false);
  const [showInsights, setShowInsights] = useState(false);
  const [showReports, setShowReports] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<string | null>(null);
  const [messageActions, setMessageActions] = useState<{ [key: string]: boolean }>({});

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Load chat history and initialize
  useEffect(() => {
    if (user && !loading) {
      loadChatHistory();
      loadRecentReports();
      initializeNewSession();
    }
  }, [user, loading]);

  // Auto-scroll to bottom
  useEffect(() => {
    scrollToBottom();
  }, [chatSession?.messages]);

  // Check token availability
  useEffect(() => {
    if (!hasTokens(1)) {
      setTokenWarning('AI sohbet için token gereklidir. Token satın alın.');
    } else {
      setTokenWarning('');
    }
  }, [tokens, hasTokens]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const loadRecentReports = async () => {
    // Mock recent reports - bu API endpoint'i de sonra eklenecek
    const mockReports: ReportSummary[] = [
      {
        id: 'roi_001',
        type: 'roi',
        title: 'ROI Analizi - 500m² Sera',
        summary: 'Antalya bölgesi için domates üretimi ROI analizi. 2.3 yıl geri dönüş süresi.',
        created_at: new Date(Date.now() - 86400000),
        key_metrics: { investment: 450000, roi_years: 2.3, profit_margin: 0.34 }
      },
      {
        id: 'climate_001',
        type: 'climate',
        title: 'İklim Analizi - Mersin',
        summary: 'Yıl boyu üretim için ideal iklim koşulları. Enerji maliyeti düşük.',
        created_at: new Date(Date.now() - 172800000),
        key_metrics: { avg_temp: 22.5, humidity: 65, energy_efficiency: 0.88 }
      },
      {
        id: 'equipment_001',
        type: 'equipment',
        title: 'Ekipman Listesi - Hidroponik',
        summary: 'Tam otomatik hidroponik sistem ekipman listesi ve maliyetleri.',
        created_at: new Date(Date.now() - 259200000),
        key_metrics: { total_equipment_cost: 180000, automation_level: 0.92 }
      }
    ];
    setRecentReports(mockReports);
  };

  const loadChatHistory = async () => {
    if (!user) return;

    try {
      setLoadingHistory(true);

      const authToken = await getAuthToken();
      if (!authToken) {
        console.warn('No auth token available for chat history');
        setLoadingHistory(false);
        return;
      }

      const response = await fetch('/api/chat/sessions', {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setChatHistory(data.data || []);
      } else {
        console.warn('Failed to load chat history:', response.status);
        // Mock chat history for development
        const mockHistory: ChatSession[] = [
          {
            id: 'session_001',
            title: 'Sera ROI Hesaplaması',
            messages: [],
            created_at: new Date(Date.now() - 86400000),
            updated_at: new Date(Date.now() - 86400000),
            user_id: user.id,
            total_tokens_used: 12,
            context: 'roi'
          },
          {
            id: 'session_002',
            title: 'İklim Analizi Sorguları',
            messages: [],
            created_at: new Date(Date.now() - 172800000),
            updated_at: new Date(Date.now() - 172800000),
            user_id: user.id,
            total_tokens_used: 8,
            context: 'climate'
          }
        ];
        setChatHistory(mockHistory);
      }
    } catch (error) {
      console.error('Error loading chat history:', error);
    } finally {
      setLoadingHistory(false);
    }
  };

  const getAuthToken = async () => {
    try {
      const { supabase } = await import('@/lib/supabase');
      const { data: { session } } = await supabase.auth.getSession();
      return session?.access_token || '';
    } catch (error) {
      console.warn('Failed to get auth token:', error);
      return '';
    }
  };

  const initializeNewSession = async () => {
    if (!user) return;

    try {
      const response = await fetch('/api/chat/sessions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${await getAuthToken()}`
        },
        body: JSON.stringify({
          title: 'SeraGPT AI Sohbet',
          description: 'AI asistan ile sera analizleri hakkında sohbet'
        })
      });

      if (response.ok) {
        const data = await response.json();
        const newSession: ChatSession = {
          id: data.data.id,
          title: data.data.title,
          messages: [],
          created_at: new Date(data.data.created_at),
          updated_at: new Date(data.data.updated_at),
          user_id: user.id,
          total_tokens_used: 0
        };

        // Enhanced welcome message with recent reports context
        const welcomeMessage: ChatMessage = {
          id: 'welcome',
          role: 'assistant',
          content: `🌱 Merhaba ${user.email?.split('@')[0] || 'Kullanıcı'}! 

Ben SeraGPT AI asistanınızım. ${recentReports.length > 0 ? `Önceki ${recentReports.length} raporunuzu analiz ettim.` : 'Sera yatırımınız için buradayım.'}

Size aşağıdaki konularda yardımcı olabilirim:

🎯 **Analiz Danışmanlığı**
• ROI hesaplamaları ve yatırım analizi
• İklim değerlendirmesi ve bölge seçimi
• Ekipman önerileri ve optimizasyon
• Pazar analizi ve fırsat değerlendirmesi

💡 **Akıllı Öneriler**
• Maliyet optimizasyonu
• Verimlilik artırma yöntemleri
• Risk analizi ve önlemleri
• Sürdürülebilir üretim stratejileri

${recentReports.length > 0 ? `\n📊 **Son Raporlarınız Hazır**\nÖnceki analizleriniz hakkında sorular sorabilir, derinlemesine analiz isteyebilirsiniz.` : ''}

Hangi konuda yardım istiyorsunuz?`,
          timestamp: new Date(),
          session_id: newSession.id
        };

        newSession.messages.push(welcomeMessage);
        setChatSession(newSession);
      } else {
        // Create a local session as fallback
        const localSession: ChatSession = {
          id: `local_${Date.now()}`,
          title: 'SeraGPT AI Sohbet',
          messages: [],
          created_at: new Date(),
          updated_at: new Date(),
          user_id: user.id,
          total_tokens_used: 0
        };

        const welcomeMessage: ChatMessage = {
          id: 'welcome',
          role: 'assistant',
          content: `🌱 Merhaba ${user.email?.split('@')[0] || 'Kullanıcı'}! 

Ben SeraGPT AI asistanınızım. Sera yatırımınız için buradayım!

🎯 **Size nasıl yardımcı olabilirim?**
• ROI hesaplamaları ve yatırım planlaması
• İklim analizi ve bölge değerlendirmesi  
• Ekipman seçimi ve maliyet optimizasyonu
• Pazar fırsatları ve risk analizi

Sorularınızı bekliyorum! 🚀`,
          timestamp: new Date(),
          session_id: localSession.id
        };

        localSession.messages.push(welcomeMessage);
        setChatSession(localSession);
      }
    } catch (error) {
      console.error('Error initializing chat session:', error);
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || !chatSession || isTyping || !user) return;

    if (!hasTokens(1)) {
      setError('Bu mesaj için token gereklidir. Lütfen token satın alın.');
      return;
    }

    setError('');
    setTokenWarning('');

    const userMessage: ChatMessage = {
      id: `msg_${Date.now()}_user`,
      role: 'user',
      content: inputValue.trim(),
      timestamp: new Date(),
      session_id: chatSession.id
    };

    const updatedSession = {
      ...chatSession,
      messages: [...chatSession.messages, userMessage]
    };
    setChatSession(updatedSession);

    const currentInput = inputValue.trim();
    setInputValue('');
    setIsTyping(true);

    try {
      const authToken = await getAuthToken();

      if (!authToken || chatSession.id.startsWith('local_')) {
        setTimeout(() => {
          const mockResponse = generateEnhancedMockResponse(currentInput);
          const aiMessage: ChatMessage = {
            id: `msg_${Date.now()}_ai`,
            role: 'assistant',
            content: mockResponse.content,
            timestamp: new Date(),
            token_cost: 1,
            session_id: chatSession.id
          };

          const finalSession = {
            ...updatedSession,
            messages: [...updatedSession.messages, aiMessage],
            total_tokens_used: updatedSession.total_tokens_used + 1
          };
          setChatSession(finalSession);
          
          // Set mock insights
          if (mockResponse.insights) {
            setInsights(mockResponse.insights);
          }
          
          setIsTyping(false);
        }, 1500 + Math.random() * 2000);
        return;
      }

      // API call will be added later
      
    } catch (error: any) {
      console.error('Chat error:', error);
      setError('Beklenmeyen bir hata oluştu');
      setChatSession(chatSession);
    } finally {
      setIsTyping(false);
    }
  };

  const generateEnhancedMockResponse = (userInput: string): { content: string; insights?: AIInsight[] } => {
    const input = userInput.toLowerCase();

    if (input.includes('maliyet') || input.includes('para') || input.includes('fiyat') || input.includes('bütçe')) {
      return {
        content: `💰 **Sera Maliyet Analizi**

Güncel sera kurulum maliyetleri (2024):

🏗️ **Boyut Bazlı Maliyetler**
• **Küçük sera (100-200m²)**: 80.000 - 120.000 TL
• **Orta sera (300-700m²)**: 250.000 - 450.000 TL  
• **Büyük sera (800-1500m²)**: 500.000 - 900.000 TL

📊 **Maliyet Detayları**
• Sera yapısı ve örtü: %35-40
• İklim kontrol sistemleri: %25-30
• Sulama ve gübreleme: %15-20
• Elektrik altyapısı: %10-15
• Diğer ekipmanlar: %10-15

🎯 **Optimizasyon Önerileri**
• Modüler tasarım tercih edin
• Enerji verimli sistemler seçin
• Yerel tedarikçilerle çalışın
• Aşamalı yatırım planlayın

Detaylı ROI analizi için dashboard'daki aracımızı kullanabilirsiniz!`,
        insights: [
          {
            type: 'recommendation',
            title: 'Maliyet Optimizasyonu',
            description: 'Modüler tasarım ile %15-20 maliyet tasarrufu sağlayabilirsiniz',
            priority: 'high',
            actionable: true,
            icon: '💡'
          },
          {
            type: 'opportunity',
            title: 'Finansman Seçenekleri',
            description: 'Tarım kredileri ve hibe destekleri mevcut',
            priority: 'medium',
            actionable: true,
            icon: '🏦'
          }
        ]
      };
    }

    if (input.includes('roi') || input.includes('geri dönüş') || input.includes('kâr')) {
      return {
        content: `📈 **ROI Hesaplama Rehberi**

🎯 **Temel ROI Faktörleri**
• İlk yatırım tutarı
• Yıllık işletme maliyetleri  
• Üretim kapasitesi ve verimi
• Pazar fiyatları ve satış stratejisi
• Teknoloji düzeyi ve otomasyon

📊 **Ortalama Geri Dönüş Süreleri**
• **Sebze üretimi**: 1.8-2.5 yıl
• **Meyve üretimi**: 2.5-4 yıl
• **Süs bitkileri**: 1.2-2 yıl
• **Organik üretim**: +0.5 yıl premium

🚀 **ROI Artırma Stratejileri**
• Yüksek katma değerli ürünler
• Direkt satış kanalları
• Sezonluk üretim planlaması
• Enerji verimliliği optimizasyonu

${recentReports.some(r => r.type === 'roi') ? '📋 **Son ROI Analiziniz**: ' + recentReports.find(r => r.type === 'roi')?.summary : 'Kişiselleştirilmiş ROI analizi için dashboard aracını kullanın!'}`,
        insights: [
          {
            type: 'insight',
            title: 'Pazar Fırsatı',
            description: 'Organik ürünlerde %25-40 fiyat primi mevcut',
            priority: 'high',
            actionable: true,
            icon: '🌿'
          }
        ]
      };
    }

    if (input.includes('bölge') || input.includes('iklim') || input.includes('coğrafya') || input.includes('yer')) {
      return {
        content: `🌍 **Bölge Seçimi Rehberi**

⭐ **En İdeal Bölgeler**
• **Antalya**: Yıl boyu üretim, turizm pazar��
• **Mersin**: Düşük enerji maliyeti, liman avantajı
• **İzmir**: Ulaşım merkezi, teknoloji desteği
• **Muğla**: Premium pazar, organik talep

🌡️ **İklim Kriterleri**
• Yıllık ortalama sıcaklık: 15-25°C
• Güneşlenme süresi: >2500 saat/yıl
• Donlu gün sayısı: <30 gün/yıl
• Nem oranı: %60-75

🎯 **Değerlendirme Faktörleri**
• Su kaynakları ve kalitesi
• Elektrik altyapısı güvenilirliği
• Pazar mesafesi ve lojistik
• İşgücü mevcudiyeti
• Yerel destekler ve teşvikler

${recentReports.some(r => r.type === 'climate') ? '🌤️ **Son İklim Analiziniz**: ' + recentReports.find(r => r.type === 'climate')?.summary : 'Bölgeniz için detaylı iklim analizi yapabilirsiniz!'}`,
        insights: [
          {
            type: 'warning',
            title: 'İklim Değişikliği',
            description: 'Aşırı hava olayları artıyor, sistem dayanıklılığı önemli',
            priority: 'medium',
            actionable: true,
            icon: '⚠️'
          }
        ]
      };
    }

    if (input.includes('ekipman') || input.includes('sistem') || input.includes('teknoloji')) {
      return {
        content: `⚙️ **Ekipman Seçim Rehberi**

🏗️ **Temel Sistemler**
• **Yapı sistemi**: Çelik konstrüksiyon, polikarbon örtü
• **İklim kontrolü**: Otomatik havalandırma, ısıtma
• **Sulama sistemi**: Damla sulama, fertigasyon
• **Otomasyon**: Sensörler, kontrol üniteleri

💡 **Teknoloji Seviyeleri**
• **Temel (₺80-120k)**: Manuel kontrol, basit sistemler
• **Orta (₺200-350k)**: Yarı otomatik, iklim kontrolü
• **İleri (₺500k+)**: Tam otomasyon, AI destekli

🎯 **Seçim Kriterleri**
• Üretim hedefi ve deneyim
• Bütçe ve finansman imkanları
• Bölgesel iklim koşulları
• Mevcut altyapı durumu

${recentReports.some(r => r.type === 'equipment') ? '🔧 **Son Ekipman Listeniz**: ' + recentReports.find(r => r.type === 'equipment')?.summary : 'İhtiyacınıza özel ekipman listesi oluşturabilirim!'}`,
        insights: [
          {
            type: 'recommendation',
            title: 'Aşamalı Yatırım',
            description: 'Temel sistemle başlayıp geliştirmek daha güvenli',
            priority: 'high',
            actionable: true,
            icon: '📈'
          }
        ]
      };
    }

    // Default response with context
    return {
      content: `🤖 **SeraGPT AI Asistan**

Sorunuzu tam olarak anlayabilmem için biraz daha detay verebilir misiniz?

🎯 **Yardımcı olabileceğim konular:**
• 💰 Maliyet analizi ve bütçe planlaması
• 📊 ROI hesaplamaları ve karlılık
• 🌍 Bölge seçimi ve iklim değerlendirmesi  
• ⚙️ Ekipman seçimi ve teknoloji
• 📈 Pazar analizi ve fırsat değerlendirmesi
• 🌱 Üretim planlaması ve optimizasyon

${recentReports.length > 0 ? `\n📋 **Önceki Analizleriniz**\n${recentReports.map(r => `• ${r.title}`).join('\n')}\n\nBu raporlar hakkında sorular sorabilirsiniz!` : ''}

Hangi konuda derinlemesine analiz istersiniz?`,
      insights: [
        {
          type: 'insight',
          title: 'Kişiselleştirilmiş Analiz',
          description: 'Önceki raporlarınızı baz alarak özel öneriler sunabilirim',
          priority: 'medium',
          actionable: true,
          icon: '🎯'
        }
      ]
    };
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const copyMessage = (content: string) => {
    navigator.clipboard.writeText(content);
    // Show toast notification
  };

  const getContextIcon = (context?: string) => {
    switch (context) {
      case 'roi': return '💰';
      case 'climate': return '🌡️';
      case 'equipment': return '⚙️';
      case 'market': return '📈';
      case 'layout': return '📐';
      default: return '💬';
    }
  };

  const getQuickQuestions = () => [
    "Sera yatırımı için kaç para gerekir?",
    "Hangi bölgede sera kurmak daha karlı?", 
    "ROI hesaplaması nasıl yapılır?",
    "En verimli ekipmanlar nelerdir?",
    "Pazar fiyatları nasıl takip edilir?",
    "İklim kontrolü nasıl optimize edilir?",
    "Organik üretim daha karlı mı?",
    "Enerji maliyetleri nasıl düşürülür?"
  ];

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[600px]">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="text-2xl"
              >
                🤖
              </motion.div>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">AI Chat Başlatılıyor</h3>
            <p className="text-gray-600">SeraGPT AI asistanınız hazırlanıyor...</p>
          </motion.div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="h-[calc(100vh-140px)] bg-gradient-to-b from-gray-50 to-white rounded-2xl border border-gray-200 shadow-xl overflow-hidden">
        
        {/* Mobile Header */}
        <div className="lg:hidden flex items-center justify-between p-4 bg-white border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowSidebar(!showSidebar)}
              className="p-2 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center">
                <span className="text-white text-sm">🤖</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">SeraGPT AI</h3>
                <p className="text-xs text-gray-500">Aktif</p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1 px-3 py-1 bg-blue-50 rounded-full">
              <span className="text-sm font-medium text-blue-600">{tokens?.remaining_tokens || 0}</span>
              <span className="text-blue-500">🧠</span>
            </div>
            {insights.length > 0 && (
              <button
                onClick={() => setShowInsights(!showInsights)}
                className="p-2 bg-amber-50 rounded-xl hover:bg-amber-100 transition-colors relative"
              >
                <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {insights.length}
                </span>
              </button>
            )}
          </div>
        </div>

        <div className="flex h-full">
          {/* Enhanced Sidebar */}
          <AnimatePresence>
            {(showSidebar || window.innerWidth >= 1024) && (
              <motion.div
                initial={{ x: -300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -300, opacity: 0 }}
                className={`${showSidebar ? 'absolute inset-y-0 z-50' : 'relative'} lg:relative w-80 bg-white border-r border-gray-200 flex flex-col overflow-hidden`}
              >
                {/* Sidebar Header */}
                <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-green-50 to-blue-50">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-gray-900">🤖 SeraGPT AI</h3>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => initializeNewSession()}
                        className="p-2 bg-white rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
                        title="Yeni sohbet"
                      >
                        <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                      </button>
                      {showSidebar && (
                        <button
                          onClick={() => setShowSidebar(false)}
                          className="lg:hidden p-2 text-gray-400 hover:text-gray-600"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Token Status */}
                  <div className="bg-white rounded-xl p-3 shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">Mevcut Token</span>
                      <span className="text-lg font-bold text-blue-600 flex items-center">
                        {tokens?.remaining_tokens || 0} <span className="ml-1">🧠</span>
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ 
                          width: `${Math.max(5, ((tokens?.remaining_tokens || 0) / (tokens?.total_tokens || 1)) * 100)}%` 
                        }}
                        className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-500"
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-2">Her AI yanıtı ~1 token harcar</p>
                    {!hasTokens(5) && (
                      <a 
                        href="/dashboard/tokens"
                        className="inline-block mt-2 px-3 py-1 bg-blue-600 text-white text-xs rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Token Satın Al
                      </a>
                    )}
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="p-4 border-b border-gray-100">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">🚀 Hızlı İşlemler</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setShowReports(!showReports)}
                      className="p-2 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors text-left"
                    >
                      <div className="text-blue-600 text-sm">📊</div>
                      <div className="text-xs font-medium text-blue-700">Raporlarım</div>
                    </button>
                    <button className="p-2 bg-green-50 rounded-lg hover:bg-green-100 transition-colors text-left">
                      <div className="text-green-600 text-sm">💡</div>
                      <div className="text-xs font-medium text-green-700">Öneriler</div>
                    </button>
                  </div>
                </div>

                {/* Recent Reports */}
                <AnimatePresence>
                  {showReports && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="border-b border-gray-100 overflow-hidden"
                    >
                      <div className="p-4">
                        <h4 className="text-sm font-medium text-gray-700 mb-3">📋 Son Raporlarınız</h4>
                        <div className="space-y-2">
                          {recentReports.map((report) => (
                            <motion.button
                              key={report.id}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => {
                                setInputValue(`${report.title} hakkında detaylı bilgi ver`);
                                inputRef.current?.focus();
                              }}
                              className="w-full text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                            >
                              <div className="flex items-center space-x-2 mb-1">
                                <span className="text-lg">{report.type === 'roi' ? '💰' : report.type === 'climate' ? '🌡️' : '⚙️'}</span>
                                <span className="text-xs font-medium text-gray-700 truncate">{report.title}</span>
                              </div>
                              <p className="text-xs text-gray-500 line-clamp-2">{report.summary}</p>
                              <p className="text-xs text-gray-400 mt-1">
                                {new Date(report.created_at).toLocaleDateString('tr-TR')}
                              </p>
                            </motion.button>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Chat History */}
                <div className="flex-1 overflow-y-auto">
                  <div className="p-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-3">💬 Sohbet Geçmişi</h4>
                    {loadingHistory ? (
                      <div className="space-y-2">
                        {[1, 2, 3].map(i => (
                          <div key={i} className="h-16 bg-gray-100 rounded-lg animate-pulse"></div>
                        ))}
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {chatHistory.length > 0 ? (
                          chatHistory.map((session) => (
                            <motion.button
                              key={session.id}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              className={`w-full text-left p-3 rounded-xl border-2 transition-all ${
                                chatSession?.id === session.id
                                  ? 'border-blue-500 bg-blue-50 shadow-sm'
                                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                              }`}
                            >
                              <div className="flex items-center space-x-2 mb-1">
                                <span className="text-sm">{getContextIcon(session.context)}</span>
                                <h5 className="font-medium text-sm text-gray-900 truncate">
                                  {session.title}
                                </h5>
                              </div>
                              <p className="text-xs text-gray-500">
                                {new Date(session.updated_at).toLocaleDateString('tr-TR')}
                              </p>
                              <div className="flex items-center justify-between mt-1">
                                <span className="text-xs text-gray-400">
                                  {session.total_tokens_used} token
                                </span>
                                <span className="text-xs text-blue-600">
                                  {session.messages?.length || 0} mesaj
                                </span>
                              </div>
                            </motion.button>
                          ))
                        ) : (
                          <div className="text-center py-8">
                            <div className="text-4xl mb-2">💬</div>
                            <p className="text-sm text-gray-500">Henüz sohbet yok</p>
                            <p className="text-xs text-gray-400 mt-1">İlk sorunuzu sorun!</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main Chat Area */}
          <div className="flex-1 flex flex-col min-w-0">
            
            {/* Chat Header - Desktop */}
            <div className="hidden lg:block p-4 bg-white border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center">
                      <span className="text-white text-xl">🤖</span>
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">SeraGPT AI Asistan</h2>
                    <p className="text-sm text-gray-600">Sera analizlerinizi yorumluyorum ve öneriler sunuyorum</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900">
                      {tokens?.remaining_tokens || 0} Token
                    </div>
                    <div className="text-xs text-gray-500">
                      {chatSession?.total_tokens_used || 0} kullanıldı
                    </div>
                  </div>
                  {insights.length > 0 && (
                    <button
                      onClick={() => setShowInsights(!showInsights)}
                      className="p-3 bg-gradient-to-r from-amber-400 to-amber-500 text-white rounded-xl hover:from-amber-500 hover:to-amber-600 transition-all shadow-lg relative"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">
                        {insights.length}
                      </span>
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <AnimatePresence initial={false}>
                {chatSession?.messages.map((message, index) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.95 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[85%] lg:max-w-2xl ${message.role === 'user' ? 'order-2' : 'order-1'}`}>
                      
                      {/* Message Avatar & Info */}
                      {message.role === 'assistant' && (
                        <div className="flex items-center mb-2 space-x-2">
                          <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-sm">🤖</span>
                          </div>
                          <span className="text-sm font-medium text-gray-700">SeraGPT AI</span>
                          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                        </div>
                      )}

                      {/* Message Bubble */}
                      <motion.div
                        whileHover={{ scale: 1.01 }}
                        className={`relative px-4 py-3 rounded-2xl shadow-sm ${
                          message.role === 'user'
                            ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-br-md'
                            : 'bg-white border-2 border-gray-100 text-gray-800 rounded-bl-md'
                        }`}
                      >
                        <div className="prose prose-sm max-w-none">
                          {message.content.split('\n').map((line, lineIndex) => {
                            // Enhanced message formatting
                            if (line.trim().startsWith('🔸') || line.trim().startsWith('•')) {
                              return (
                                <div key={lineIndex} className="flex items-start mb-1">
                                  <span className="mr-2 mt-1">{line.trim().startsWith('🔸') ? '🔸' : '•'}</span>
                                  <span>{line.replace(/^[🔸•]\s*/, '')}</span>
                                </div>
                              );
                            }

                            if (line.trim().match(/^\*\*.+\*\*$/)) {
                              return (
                                <div key={lineIndex} className={`font-bold text-lg mb-2 mt-3 first:mt-0 ${
                                  message.role === 'user' ? 'text-blue-100' : 'text-gray-900'
                                }`}>
                                  {line.replace(/\*\*/g, '')}
                                </div>
                              );
                            }

                            if (line.trim().endsWith(':') && line.trim().length > 3 && line.trim().length < 50) {
                              return (
                                <div key={lineIndex} className={`font-semibold mb-2 mt-3 first:mt-0 ${
                                  message.role === 'user' ? 'text-blue-100' : 'text-gray-900'
                                }`}>
                                  {line.trim()}
                                </div>
                              );
                            }

                            return line.trim() ? (
                              <p key={lineIndex} className="mb-2 last:mb-0 leading-relaxed">{line}</p>
                            ) : (
                              <br key={lineIndex} />
                            );
                          })}
                        </div>

                        {/* Message Actions */}
                        <div className={`flex items-center justify-between mt-3 pt-2 border-t ${
                          message.role === 'user'
                            ? 'border-blue-400 text-blue-100'
                            : 'border-gray-200 text-gray-500'
                        }`}>
                          <span className="text-xs">
                            {message.timestamp.toLocaleTimeString('tr-TR', {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </span>
                          
                          <div className="flex items-center space-x-2">
                            {message.token_cost && (
                              <span className="flex items-center text-xs">
                                <span className="mr-1">🧠</span>
                                <span>{message.token_cost}</span>
                              </span>
                            )}
                            <button
                              onClick={() => copyMessage(message.content)}
                              className={`p-1 rounded transition-colors ${
                                message.role === 'user'
                                  ? 'hover:bg-blue-400 text-blue-100'
                                  : 'hover:bg-gray-100 text-gray-400 hover:text-gray-600'
                              }`}
                              title="Kopyala"
                            >
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </motion.div>
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
                  <div className="flex items-center space-x-2 max-w-xs">
                    <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm">🤖</span>
                    </div>
                    <div className="bg-white border-2 border-gray-100 rounded-2xl rounded-bl-md px-4 py-3 shadow-sm">
                      <div className="flex items-center space-x-1">
                        <span className="text-sm text-gray-600 mr-2">AI düşünüyor</span>
                        <div className="flex space-x-1">
                          <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                            className="w-2 h-2 bg-green-500 rounded-full"
                          />
                          <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                            className="w-2 h-2 bg-green-500 rounded-full"
                          />
                          <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
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

            {/* Quick Questions */}
            {chatSession && chatSession.messages.length <= 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-gradient-to-r from-blue-50 to-green-50 border-t border-gray-200"
              >
                <p className="text-sm font-semibold text-gray-700 mb-3">💡 Popüler sorular:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {getQuickQuestions().slice(0, 6).map((question, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setInputValue(question)}
                      className="text-left px-3 py-2 text-sm bg-white border border-gray-200 hover:border-blue-300 hover:bg-blue-50 text-gray-700 rounded-lg transition-all shadow-sm"
                    >
                      {question}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Error/Warning Messages */}
            <AnimatePresence>
              {(error || tokenWarning) && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="p-4"
                >
                  {error && (
                    <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-3 mb-2">
                      <p className="text-red-700 text-sm flex items-center">
                        <span className="mr-2">❌</span>
                        {error}
                      </p>
                    </div>
                  )}
                  {tokenWarning && (
                    <div className="bg-amber-50 border-l-4 border-amber-500 rounded-lg p-3">
                      <p className="text-amber-700 text-sm flex items-center">
                        <span className="mr-2">⚠️</span>
                        {tokenWarning}
                        <a 
                          href="/dashboard/tokens" 
                          className="text-amber-800 hover:text-amber-600 font-semibold ml-2 underline"
                        >
                          Token Satın Al →
                        </a>
                      </p>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Enhanced Input Area */}
            <div className="p-4 bg-white border-t border-gray-200">
              {/* Input hints */}
              <div className="hidden md:flex items-center justify-between mb-3 text-xs text-gray-500">
                <div className="flex items-center space-x-4">
                  <span className="flex items-center">
                    <span className="mr-1">💡</span>
                    Enter ile gönder, Shift+Enter ile yeni satır
                  </span>
                  <span className="flex items-center">
                    <span className="mr-1">🎯</span>
                    Detaylı sorular daha iyi yanıtlar almanızı sağlar
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span>Mevcut token: {tokens?.remaining_tokens || 0}</span>
                  {!hasTokens(1) && (
                    <a
                      href="/dashboard/tokens"
                      className="text-blue-600 hover:text-blue-500 font-medium"
                    >
                      Token Al
                    </a>
                  )}
                </div>
              </div>

              <div className="flex space-x-3">
                <div className="flex-1 relative">
                  <textarea
                    ref={inputRef}
                    value={inputValue}
                    onChange={(e) => {
                      setInputValue(e.target.value);
                      const textarea = e.target;
                      textarea.style.height = 'auto';
                      textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
                    }}
                    onKeyPress={handleKeyPress}
                    placeholder={
                      !hasTokens(1)
                        ? "Token gerekli - Mesaj göndermek için token satın alın"
                        : "SeraGPT AI'ya sera ile ilgili sorunuzu yazın..."
                    }
                    className={`w-full px-4 py-3 pr-16 border-2 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all text-sm placeholder-gray-400 ${
                      !hasTokens(1)
                        ? 'border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed'
                        : 'border-gray-300 bg-white hover:border-gray-400 focus:bg-white'
                    }`}
                    rows={1}
                    style={{ minHeight: '52px', maxHeight: '120px' }}
                    disabled={!hasTokens(1)}
                  />

                  {/* Character counter and suggestions */}
                  <div className="absolute bottom-2 right-2 flex items-center space-x-2">
                    <span className="text-xs text-gray-400">
                      {inputValue.length}/1000
                    </span>
                    {inputValue.length > 0 && (
                      <button
                        onClick={() => setInputValue('')}
                        className="p-1 text-gray-400 hover:text-gray-600 rounded"
                        title="Temizle"
                      >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isTyping || !hasTokens(1)}
                  className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center min-h-[52px] shadow-lg ${
                    !inputValue.trim() || isTyping || !hasTokens(1)
                      ? 'bg-gray-300 text-gray-500'
                      : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-blue-200'
                  }`}
                >
                  {isTyping ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                      />
                      <span className="hidden sm:inline">Gönderiliyor...</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                      <span className="hidden md:inline">Gönder</span>
                      <span className="md:hidden">📤</span>
                      <span className="ml-2 text-xs opacity-75 flex items-center">
                        1<span className="ml-0.5">🧠</span>
                      </span>
                    </>
                  )}
                </motion.button>
              </div>

              {/* Context-aware suggestions */}
              {chatSession && chatSession.messages.length > 2 && inputValue.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-3 p-3 bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200 rounded-xl"
                >
                  <p className="text-sm text-blue-700 mb-2 font-medium">🎯 Sohbete devam etmek için:</p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Bu konuda daha detay verebilir misin?",
                      "Alternatif çözümler nelerdir?", 
                      "Maliyetler nasıl hesaplanır?",
                      "Pratik önerileriniz var mı?"
                    ].map((suggestion, index) => (
                      <motion.button
                        key={index}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setInputValue(suggestion)}
                        className="px-3 py-1 text-xs bg-white border border-blue-200 hover:bg-blue-50 text-blue-700 rounded-full transition-all shadow-sm"
                      >
                        {suggestion}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </div>

          {/* Enhanced AI Insights Sidebar */}
          <AnimatePresence>
            {insights.length > 0 && (showInsights || window.innerWidth >= 1024) && (
              <motion.div
                initial={{ x: 300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 300, opacity: 0 }}
                className="w-80 bg-gradient-to-b from-amber-50 to-orange-50 border-l border-amber-200 overflow-y-auto"
              >
                <div className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-amber-800 flex items-center">
                      <span className="mr-2">💡</span>
                      AI Önerileri
                    </h3>
                    <span className="px-2 py-1 bg-amber-200 text-amber-800 text-xs rounded-full font-semibold">
                      {insights.length}
                    </span>
                  </div>
                  
                  <div className="space-y-3">
                    {insights.map((insight, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`border-2 rounded-xl p-4 transition-all hover:shadow-lg ${
                          insight.priority === 'high' ? 'border-red-200 bg-red-50 hover:bg-red-100' :
                          insight.priority === 'medium' ? 'border-yellow-200 bg-yellow-50 hover:bg-yellow-100' :
                          'border-green-200 bg-green-50 hover:bg-green-100'
                        }`}
                      >
                        <div className="flex items-start space-x-3">
                          <span className="text-2xl">{insight.icon || (
                            insight.type === 'recommendation' ? '💡' :
                            insight.type === 'warning' ? '⚠️' :
                            insight.type === 'opportunity' ? '🚀' : '🔍'
                          )}</span>
                          <div className="flex-1">
                            <h4 className="font-bold text-gray-900 mb-1">{insight.title}</h4>
                            <p className="text-sm text-gray-700 mb-3">{insight.description}</p>
                            
                            <div className="flex items-center justify-between">
                              <span className={`text-xs px-3 py-1 rounded-full font-semibold ${
                                insight.priority === 'high' ? 'bg-red-200 text-red-800' :
                                insight.priority === 'medium' ? 'bg-yellow-200 text-yellow-800' :
                                'bg-green-200 text-green-800'
                              }`}>
                                {insight.priority === 'high' ? 'Yüksek Öncelik' : 
                                 insight.priority === 'medium' ? 'Orta Öncelik' : 'Düşük Öncelik'}
                              </span>
                              {insight.actionable && (
                                <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded-full font-medium">
                                  ✅ Uygulanabilir
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </DashboardLayout>
  );
}
