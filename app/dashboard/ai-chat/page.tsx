'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
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
}

interface ChatSession {
  id: string;
  title: string;
  messages: ChatMessage[];
  created_at: Date;
  updated_at: Date;
  user_id: string;
  total_tokens_used: number;
}

interface AIInsight {
  type: 'recommendation' | 'warning' | 'opportunity' | 'insight';
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  actionable: boolean;
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

  // Mobile-specific states
  const [showSidebar, setShowSidebar] = useState(false);
  const [showInsights, setShowInsights] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load chat history and initialize
  useEffect(() => {
    if (user && !loading) {
      loadChatHistory();
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
      }
    } catch (error) {
      console.error('Error loading chat history:', error);
    } finally {
      setLoadingHistory(false);
    }
  };

  const getAuthToken = async () => {
    try {
      // Import Supabase client properly
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

        // Add welcome message
        const welcomeMessage: ChatMessage = {
          id: 'welcome',
          role: 'assistant',
          content: `Merhaba ${user.email?.split('@')[0] || 'Kullanıcı'}! 🌱\n\nBen SeraGPT AI asistanınızım. Size aşağıdaki konularda yardımcı olabilirim:\n\n🔸 Sera yatırım analizleri\n🔸 ��klim ve bölge uygunluğu\n🔸 Ekipman önerileri\n🔸 Pazar analizleri\n🔸 Verimlilik optimizasyonu\n🔸 Maliyet hesaplamaları\n\nSorularınızı sorun, birlikte çözüm bulalım!`,
          timestamp: new Date(),
          session_id: newSession.id
        };

        newSession.messages.push(welcomeMessage);
        setChatSession(newSession);
      } else {
        console.warn('Failed to create remote chat session, creating local session');
        // Create a local session as fallback
        const localSession: ChatSession = {
          id: `local_${Date.now()}`,
          title: 'SeraGPT AI Sohbet (Offline)',
          messages: [],
          created_at: new Date(),
          updated_at: new Date(),
          user_id: user.id,
          total_tokens_used: 0
        };

        // Add welcome message
        const welcomeMessage: ChatMessage = {
          id: 'welcome',
          role: 'assistant',
          content: `Merhaba ${user.email?.split('@')[0] || 'Kullanıcı'}! 🌱\n\nBen SeraGPT AI asistanınızım. Size aşağıdaki konularda yardımcı olabilirim:\n\n🔸 Sera yatırım analizleri\n🔸 İklim ve bölge uygunluğu\n🔸 Ekipman önerileri\n🔸 Pazar analizleri\n🔸 Verimlilik optimizasyonu\n🔸 Maliyet hesaplamaları\n\nSorularınızı sorun, birlikte çözüm bulalım!`,
          timestamp: new Date(),
          session_id: localSession.id
        };

        localSession.messages.push(welcomeMessage);
        setChatSession(localSession);
      }
    } catch (error) {
      console.error('Error initializing chat session:', error);
      // Create a local session as final fallback
      const localSession: ChatSession = {
        id: `local_${Date.now()}`,
        title: 'SeraGPT AI Sohbet (Offline)',
        messages: [],
        created_at: new Date(),
        updated_at: new Date(),
        user_id: user.id,
        total_tokens_used: 0
      };

      // Add welcome message
      const welcomeMessage: ChatMessage = {
        id: 'welcome',
        role: 'assistant',
        content: `Merhaba ${user.email?.split('@')[0] || 'Kullanıcı'}! 🌱\n\nBen SeraGPT AI asistanınızım. Geçici olarak offline modda çalışıyorum.\n\nSize yine de yardımcı olmaya hazırım!`,
        timestamp: new Date(),
        session_id: localSession.id
      };

      localSession.messages.push(welcomeMessage);
      setChatSession(localSession);
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || !chatSession || isTyping || !user) return;

    // Check token availability
    if (!hasTokens(1)) {
      setError('Bu mesaj için token gereklidir. Lütfen token satın alın.');
      return;
    }

    setError('');
    setTokenWarning('');

    // Create user message
    const userMessage: ChatMessage = {
      id: `msg_${Date.now()}_user`,
      role: 'user',
      content: inputValue.trim(),
      timestamp: new Date(),
      session_id: chatSession.id
    };

    // Add user message immediately
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

      // If no auth token available, provide mock responses for development
      if (!authToken || chatSession.id.startsWith('local_')) {
        setTimeout(() => {
          const mockResponse = generateMockResponse(currentInput);
          const aiMessage: ChatMessage = {
            id: `msg_${Date.now()}_ai`,
            role: 'assistant',
            content: mockResponse,
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
          setIsTyping(false);
        }, 1000 + Math.random() * 2000); // Simulate response delay
        return;
      }

      // Send message to API
      const response = await fetch('/api/chat/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify({
          session_id: chatSession.id,
          message: currentInput,
          context: {
            previous_messages: chatSession.messages.slice(-5), // Last 5 messages for context
            user_profile: {
              experience_level: user.user_metadata?.experience_level || 'beginner',
              specialization: user.user_metadata?.specialization || 'general'
            }
          }
        })
      });

      if (response.ok) {
        const data = await response.json();
        
        // Create AI response message
        const aiMessage: ChatMessage = {
          id: data.data.id || `msg_${Date.now()}_ai`,
          role: 'assistant',
          content: data.data.response || data.data.content || 'Üzgünüm, yanıt oluşturamadım.',
          timestamp: new Date(data.data.created_at || Date.now()),
          token_cost: data.data.token_cost || 1,
          session_id: chatSession.id
        };

        // Update session with AI response
        const finalSession = {
          ...updatedSession,
          messages: [...updatedSession.messages, aiMessage],
          total_tokens_used: updatedSession.total_tokens_used + (aiMessage.token_cost || 1)
        };
        setChatSession(finalSession);

        // Update insights if provided
        if (data.data.insights) {
          setInsights(data.data.insights);
        }

        // Consume token
        await consumeToken(aiMessage.token_cost || 1, 'chat_message_sent');

      } else {
        const errorData = await response.json();
        setError(errorData.error || 'AI yanıtı al��namadı');
        
        // Remove user message if API failed
        setChatSession(chatSession);
      }

    } catch (error: any) {
      console.error('Chat error:', error);
      setError('Beklenmeyen bir hata oluştu');
      
      // Remove user message if error occurred
      setChatSession(chatSession);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const loadPreviousSession = async (sessionId: string) => {
    try {
      const authToken = await getAuthToken();
      if (!authToken) {
        console.warn('No auth token available for loading previous session');
        setError('Sohbet geçmişi yüklemek için oturum açmanız gerekli');
        return;
      }

      const response = await fetch(`/api/chat/sessions?id=${sessionId}`, {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        const session = data.data;
        
        setChatSession({
          id: session.id,
          title: session.title,
          messages: session.messages || [],
          created_at: new Date(session.created_at),
          updated_at: new Date(session.updated_at),
          user_id: session.user_id,
          total_tokens_used: session.total_tokens_used || 0
        });
      }
    } catch (error) {
      console.error('Error loading session:', error);
      setError('Sohbet geçmişi yüklenemedi');
    }
  };

  const generateMockResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();

    if (input.includes('maliyet') || input.includes('para') || input.includes('fiyat')) {
      return `💰 Sera maliyetleri hakkında:\n\nOrtalama sera kurulum maliyetleri:\n• Küçük sera (100m²): 50.000 - 80.000 TL\n• Orta sera (500m²): 200.000 - 350.000 TL\n• Büyük sera (1000m²): 400.000 - 600.000 TL\n\nBu maliyetler şunları içerir:\n🔸 Sera yapısı ve örtü\n🔸 İklim kontrol sistemleri\n🔸 Sulama sistemi\n🔸 Elektrik altyapısı\n\nDetaylı analiz için ROI hesaplama aracımızı kullanabilirsiniz.`;
    }

    if (input.includes('roi') || input.includes('geri dönüş')) {
      return `📊 ROI Hesaplaması:\n\nSera yatırımında ROI faktörleri:\n• İlk yatırım tutarı\n• Yıllık işletme maliyetleri\n• Beklenen verim ve satış fiyatları\n• Pazarlama stratejisi\n\nOrtalama geri dönüş süreleri:\n🔸 Sebze üretimi: 2-3 yıl\n🔸 Meyve üretimi: 3-5 yıl\n🔸 Süs bitkisi: 1-2 yıl\n\nDetaylı ROI analizi için dashboard'daki aracımızı kullanın.`;
    }

    if (input.includes('bölge') || input.includes('iklim') || input.includes('coğrafya')) {
      return `🌍 Bölge Seçimi:\n\nİdeal sera bölgeleri:\n• Antalya - Akdeniz iklimi\n• Mersin - Yıl boyu üretim\n• İzmir - Ulaşım avantajı\n• Muğla - Turizm pazarı\n\nBölge seçiminde dikkat edilecekler:\n🔸 İklim koşulları\n🔸 Su kaynakları\n🔸 Ulaşım imkanları\n🔸 İşgücü mevcudiyeti\n🔸 Pazar yakınlığı\n\nİklim analizi aracımızla bölgenizi değerlendirebilirsiniz.`;
    }

    return `🤖 SeraGPT AI Asistan:\n\nSorunuzu daha detaylı anlayabilmek için yardıma ihtiyacım var. \n\nŞu konularda size daha iyi yardımcı olabilirim:\n🔸 Sera maliyetleri ve ROI hesaplamaları\n🔸 Bölge ve iklim analizi\n🔸 Ekipman seçimi ve önerileri\n🔸 Pazar analizi ve fiyat takibi\n🔸 Teknik planlama ve düzen\n\nLütfen sorunuzu daha spesifik olarak sorar mısınız?`;
  };

  const getQuickQuestions = () => [
    "Sera yatırımı için kaç para gerekir?",
    "Hangi bölgede sera kurmak daha karlı?",
    "Hidroponik sistem mi toprak sistemi mi daha iyi?",
    "İklim kontrolü için hangi ekipmanları önerirsiniz?",
    "ROI hesaplaması nasıl yapılır?",
    "Pazar fiyatları nasıl takip edilir?",
    "En verimli sera düzeni nasıl olmalı?",
    "Sulama sistemi nasıl optimize edilir?"
  ];

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'recommendation': return '💡';
      case 'warning': return '⚠️';
      case 'opportunity': return '🚀';
      case 'insight': return '🔍';
      default: return '💡';
    }
  };

  const getInsightColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-red-200 bg-red-50';
      case 'medium': return 'border-yellow-200 bg-yellow-50';
      case 'low': return 'border-green-200 bg-green-50';
      default: return 'border-gray-200 bg-gray-50';
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">AI Chat yükleniyor...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (!chatSession) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-64">
          <div className="text-center">
            <div className="animate-pulse text-gray-500 mb-4">AI sohbet başlatılıyor...</div>
            <button
              onClick={initializeNewSession}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Yeniden Dene
            </button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout
      title="AI Chat"
      subtitle="SeraGPT AI asistanınızla sohbet edin"
    >
      <div className="h-[calc(100vh-140px)] md:h-[calc(100vh-200px)] flex flex-col bg-white rounded-xl border border-gray-200 shadow-sm relative">

        {/* Mobile Header with Navigation */}
        <div className="lg:hidden flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowSidebar(!showSidebar)}
              className="p-2 bg-white rounded-lg border border-gray-200 hover:bg-gray-50"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">🤖</span>
              </div>
              <span className="font-semibold text-gray-900">SeraGPT</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1 text-sm text-gray-600">
              <span className="text-blue-600 font-medium">{tokens?.remaining_tokens || 0}</span>
              <span>🪙</span>
            </div>
            {insights.length > 0 && (
              <button
                onClick={() => setShowInsights(!showInsights)}
                className="p-2 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 relative"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {insights.length}
                </span>
              </button>
            )}
          </div>
        </div>

        {/* Chat History Sidebar - Mobile Overlay + Desktop Sidebar */}
        <div className={`${showSidebar ? 'block' : 'hidden'} lg:block lg:w-64 ${showSidebar ? 'absolute top-0 left-0 right-0 bottom-0 bg-white z-50 lg:relative' : ''} border-b lg:border-b-0 lg:border-r border-gray-200 p-4 overflow-y-auto`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Sohbet Geçmişi</h3>
            <div className="flex items-center space-x-2">
              <button
                onClick={initializeNewSession}
                className="text-blue-600 hover:text-blue-500 text-sm font-medium"
                title="Yeni sohbet başlat"
              >
                ➕ Yeni
              </button>
              {showSidebar && (
                <button
                  onClick={() => setShowSidebar(false)}
                  className="lg:hidden p-1 text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
          
          {loadingHistory ? (
            <div className="space-y-2">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-16 bg-gray-100 rounded-lg animate-pulse"></div>
              ))}
            </div>
          ) : (
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {chatHistory.length > 0 ? (
                chatHistory.map((session) => (
                  <button
                    key={session.id}
                    onClick={() => loadPreviousSession(session.id)}
                    className={`w-full text-left p-3 rounded-lg border transition-colors ${
                      chatSession.id === session.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <h4 className="font-medium text-sm text-gray-900 truncate">
                      {session.title}
                    </h4>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(session.updated_at).toLocaleDateString('tr-TR')}
                    </p>
                    <p className="text-xs text-gray-400">
                      {session.total_tokens_used || 0} token kullanıldı
                    </p>
                  </button>
                ))
              ) : (
                <p className="text-sm text-gray-500 text-center py-8">
                  Henüz sohbet geçmişi yok
                </p>
              )}
            </div>
          )}

          {/* Token Status */}
          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Mevcut Token</span>
              <span className="text-sm font-bold text-blue-600">
                {tokens?.remaining_tokens || 0}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ 
                  width: `${Math.max(5, ((tokens?.remaining_tokens || 0) / (tokens?.total_tokens || 1)) * 100)}%` 
                }}
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Her mesaj ~1 token harcar
            </p>
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          
          {/* Chat Header - Desktop Only */}
          <div className="hidden lg:block p-4 border-b border-gray-200 bg-gray-50">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm">🤖</span>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">SeraGPT AI Asistan</h2>
                <p className="text-sm text-gray-600">
                  Sera analizlerinizi yorumluyorum ve öneriler sunuyorum
                </p>
              </div>
            </div>

            {/* Session Info */}
            <div className="mt-2 text-xs text-gray-500">
              Oturum: {chatSession.id.substring(0, 8)}... | 
              Toplam token: {chatSession.total_tokens_used} | 
              Mesaj sayısı: {chatSession.messages.length}
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-3 md:p-4 space-y-3 md:space-y-4">
            {chatSession.messages.map((message, index) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[85%] md:max-w-md lg:max-w-lg px-3 md:px-4 py-2 md:py-3 rounded-lg ${
                  message.role === 'user'
                    ? 'bg-blue-600 text-white rounded-br-sm'
                    : 'bg-gray-100 border border-gray-200 text-gray-800 rounded-bl-sm'
                }`}>
                  {/* Message avatar for AI */}
                  {message.role === 'assistant' && (
                    <div className="flex items-center mb-2">
                      <div className="w-6 h-6 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mr-2">
                        <span className="text-white text-xs">🤖</span>
                      </div>
                      <span className="text-xs font-medium text-gray-600">SeraGPT AI</span>
                    </div>
                  )}

                  <div className="whitespace-pre-wrap text-sm leading-relaxed">
                    {/* Enhanced message content with better formatting */}
                    {message.content.split('\n').map((line, lineIndex) => {
                      // Handle bullet points
                      if (line.trim().startsWith('🔸') || line.trim().startsWith('•') || line.trim().startsWith('-')) {
                        return (
                          <div key={lineIndex} className="flex items-start mb-1">
                            <span className="mr-2 mt-0.5">{line.trim().startsWith('🔸') ? '🔸' : '•'}</span>
                            <span>{line.replace(/^[🔸•-]\s*/, '')}</span>
                          </div>
                        );
                      }

                      // Handle numbered lists
                      const numberedMatch = line.trim().match(/^\d+\.\s*(.+)$/);
                      if (numberedMatch) {
                        return (
                          <div key={lineIndex} className="flex items-start mb-1">
                            <span className="mr-2 mt-0.5 font-medium">{line.trim().split(' ')[0]}</span>
                            <span>{numberedMatch[1]}</span>
                          </div>
                        );
                      }

                      // Handle headers (lines that end with :)
                      if (line.trim().endsWith(':') && line.trim().length > 3 && line.trim().length < 50) {
                        return (
                          <div key={lineIndex} className={`font-semibold mb-2 mt-3 first:mt-0 ${
                            message.role === 'user' ? 'text-blue-100' : 'text-gray-900'
                          }`}>
                            {line.trim()}
                          </div>
                        );
                      }

                      // Regular paragraphs
                      return line.trim() ? (
                        <p key={lineIndex} className="mb-2 last:mb-0">{line}</p>
                      ) : (
                        <br key={lineIndex} />
                      );
                    })}
                  </div>

                  <div className={`flex items-center justify-between mt-3 pt-2 border-t ${
                    message.role === 'user'
                      ? 'border-blue-500 text-blue-100'
                      : 'border-gray-200 text-gray-500'
                  } text-xs`}>
                    <span>
                      {message.timestamp.toLocaleTimeString('tr-TR', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                    <div className="flex items-center space-x-2">
                      {message.token_cost && (
                        <span className="flex items-center">
                          <span className="mr-1">🪙</span>
                          <span>{message.token_cost}</span>
                        </span>
                      )}
                      {message.role === 'assistant' && (
                        <span className="text-xs opacity-75">AI Yanıt</span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-start"
              >
                <div className="bg-gray-100 border border-gray-200 rounded-lg px-4 py-3">
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

          {/* Quick Questions */}
          {chatSession.messages.length <= 1 && (
            <div className="p-4 border-t border-gray-200 bg-gray-50">
              <p className="text-sm font-medium text-gray-700 mb-3">Popüler sorular:</p>
              <div className="flex flex-wrap gap-2">
                {getQuickQuestions().slice(0, 4).map((question, index) => (
                  <button
                    key={index}
                    onClick={() => setInputValue(question)}
                    className="px-3 py-1 text-xs bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-full transition-colors"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Error/Warning Messages */}
          {(error || tokenWarning) && (
            <div className="p-4">
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-2">
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              )}
              {tokenWarning && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                  <p className="text-yellow-600 text-sm">{tokenWarning}</p>
                  <a 
                    href="/dashboard/tokens" 
                    className="text-yellow-700 hover:text-yellow-600 text-sm font-medium ml-1"
                  >
                    Token satın alın →
                  </a>
                </div>
              )}
            </div>
          )}

          {/* Input Area */}
          <div className="p-3 md:p-4 border-t border-gray-200 bg-white">
            {/* Input hint bar - Desktop only */}
            <div className="hidden md:flex items-center justify-between mb-3 text-xs text-gray-500">
              <div className="flex items-center space-x-3">
                <span>💡 İpucu: Enter ile gönder, Shift+Enter ile yeni satır</span>
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
                  value={inputValue}
                  onChange={(e) => {
                    setInputValue(e.target.value);
                    // Auto-resize textarea
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
                  className={`w-full px-3 md:px-4 py-2 md:py-3 pr-8 md:pr-12 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all text-sm md:text-base ${
                    !hasTokens(1)
                      ? 'border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed'
                      : 'border-gray-300 bg-white'
                  }`}
                  rows={1}
                  style={{ minHeight: '44px', maxHeight: '100px' }}
                  disabled={!hasTokens(1)}
                />

                {/* Character counter */}
                <div className="absolute bottom-2 right-2 text-xs text-gray-400">
                  {inputValue.length}/500
                </div>

                {/* Auto-suggestions overlay */}
                {inputValue.length > 0 && inputValue.length < 10 && (
                  <div className="absolute -top-8 left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-sm p-2 text-xs text-gray-600">
                    <div className="flex items-center space-x-1">
                      <span>💡</span>
                      <span>Daha detaylı sorular daha iyi yanıtlar almanızı sağlar</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex flex-col space-y-1 md:space-y-2">
                <button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isTyping || !hasTokens(1)}
                  className="flex-shrink-0 bg-blue-600 hover:bg-blue-700 text-white px-3 md:px-6 py-2 md:py-3 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center min-h-[44px] md:min-h-[48px] transform hover:scale-105 active:scale-95 text-sm md:text-base"
                >
                  {isTyping ? (
                    <>
                      <svg className="w-5 h-5 animate-spin mr-2" fill="none" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25"></circle>
                        <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" className="opacity-75"></path>
                      </svg>
                      <span className="hidden sm:inline">Gönderiliyor...</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                      <span className="hidden md:inline">Gönder</span>
                      <span className="md:hidden">📤</span>
                      <span className="ml-1 md:ml-2 text-xs opacity-75">1🪙</span>
                    </>
                  )}
                </button>

                {/* Clear input button */}
                {inputValue.length > 0 && (
                  <button
                    onClick={() => setInputValue('')}
                    className="flex-shrink-0 bg-gray-200 hover:bg-gray-300 text-gray-600 px-2 md:px-3 py-1 md:py-2 rounded-lg text-sm transition-colors"
                    title="Temizle"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            {/* Smart suggestions based on context */}
            {chatSession.messages.length > 2 && inputValue.length === 0 && (
              <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-700 mb-2">🎯 Devam etmek için:</p>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Bu konuda daha detay verebilir misin?",
                    "Alternatifleri nelerdir?",
                    "Maliyetler nasıl hesaplanır?",
                    "Pratik önerileriniz var mı?"
                  ].map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => setInputValue(suggestion)}
                      className="px-3 py-1 text-xs bg-white border border-blue-200 hover:bg-blue-50 text-blue-700 rounded-full transition-colors"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* AI Insights Sidebar */}
        {insights.length > 0 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:w-80 border-t lg:border-t-0 lg:border-l border-gray-200 p-4 overflow-y-auto"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">🔍 AI Önerileri</h3>
            <div className="space-y-3">
              {insights.map((insight, index) => (
                <div
                  key={index}
                  className={`border rounded-lg p-3 ${getInsightColor(insight.priority)}`}
                >
                  <div className="flex items-start space-x-2">
                    <span className="text-lg">{getInsightIcon(insight.type)}</span>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 text-sm mb-1">{insight.title}</h4>
                      <p className="text-xs text-gray-700 mb-2">{insight.description}</p>
                      <div className="flex items-center justify-between">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          insight.priority === 'high' ? 'bg-red-100 text-red-700' :
                          insight.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-green-100 text-green-700'
                        }`}>
                          {insight.priority === 'high' ? 'Yüksek' : 
                           insight.priority === 'medium' ? 'Orta' : 'Düşük'}
                        </span>
                        {insight.actionable && (
                          <span className="text-xs text-blue-600">✅ Uygulanabilir</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </DashboardLayout>
  );
}
