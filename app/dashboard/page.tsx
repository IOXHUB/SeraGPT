'use client';

import { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/lib/hooks/useAuth';
import Link from 'next/link';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  isTyping?: boolean;
  hasReport?: boolean;
  reportId?: string;
  analysisData?: any;
}

interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
  context?: any;
  analysisData?: any;
  reportId?: string;
}

export default function Dashboard() {
  const { user, loading, signOut, isAdmin } = useAuth();
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [currentSession, setCurrentSession] = useState<ChatSession | null>(null);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (user && !loading) {
      initializeChat();
    }
  }, [user, loading]);

  useEffect(() => {
    scrollToBottom();
  }, [currentSession?.messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const initializeChat = () => {
    const defaultSession: ChatSession = {
      id: 'welcome-session',
      title: 'SeraGPT ile Başlayın',
      messages: [],
      createdAt: new Date(),
      context: {},
      analysisData: {}
    };

    setSessions([defaultSession]);
    setCurrentSession(defaultSession);
  };

  const startAnalysis = () => {
    setShowChat(true);
    if (currentSession && currentSession.messages.length === 0) {
      const welcomeMessage: Message = {
        id: 'welcome-1',
        type: 'assistant',
        content: `🌱 **Hoş geldiniz! Ben SeraGPT, sera yatırım uzmanınızım.**

Kurumsal sera yatırımları için kapsaml�� analiz ve danışmanlık hizmeti sunuyorum.

**📊 Size nasıl yardımcı olabilirim?**

Analiz için şu bilgileri paylaşın:
• 📍 **Lokasyon** (hangi şehir/bölge?)
• 📏 **Sera boyutu** (kaç m²?)
• 💰 **Yatırım bütçesi** (ne kadar?)
• 🌱 **Yetiştirilecek ürünler** (domates, salatalık, vb.)

**Örnek:** "Antalya'da 10.000m² sera, 2M₺ bütçe, domates üretimi"

Detaylı bilgi vererek başlayalım! 🚀`,
        timestamp: new Date()
      };

      const updatedSession = {
        ...currentSession,
        messages: [welcomeMessage]
      };

      setCurrentSession(updatedSession);
      setSessions(prev => prev.map(s => s.id === currentSession.id ? updatedSession : s));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading || !currentSession) return;

    const userMessage: Message = {
      id: `msg-${Date.now()}`,
      type: 'user',
      content: input.trim(),
      timestamp: new Date()
    };

    const updatedSession = {
      ...currentSession,
      messages: [...currentSession.messages, userMessage],
      title: currentSession.messages.length === 0 ? 
        input.trim().slice(0, 40) + (input.trim().length > 40 ? '...' : '') : 
        currentSession.title
    };

    setCurrentSession(updatedSession);
    setSessions(prev => prev.map(s => s.id === currentSession.id ? updatedSession : s));
    setInput('');
    setIsLoading(true);

    // Typing indicator
    const typingMessage: Message = {
      id: `typing-${Date.now()}`,
      type: 'assistant',
      content: '',
      timestamp: new Date(),
      isTyping: true
    };

    setCurrentSession(prev => prev ? {
      ...prev,
      messages: [...prev.messages, typingMessage]
    } : null);

    try {
      await new Promise(resolve => setTimeout(resolve, 500));

      const response = await generateResponse(input.trim());
      const assistantMessage: Message = {
        id: `msg-${Date.now()}`,
        type: 'assistant',
        content: response,
        timestamp: new Date()
      };

      setCurrentSession(prev => prev ? {
        ...prev,
        messages: [...prev.messages.filter(m => !m.isTyping), assistantMessage]
      } : null);

      setSessions(prev => prev.map(s => 
        s.id === currentSession.id 
          ? { ...s, messages: [...s.messages.filter(m => !m.isTyping), assistantMessage] }
          : s
      ));

    } catch (error) {
      console.error('Error generating response:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const generateResponse = async (input: string): Promise<string> => {
    try {
      const response = await fetch('/api/chat/analysis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: input,
          sessionId: currentSession?.id || 'default',
          userId: user?.id || 'anonymous',
          context: currentSession?.context || {}
        }),
      });

      const result = await response.json();

      if (result.success) {
        if (currentSession && result.analysisData) {
          currentSession.context = { ...currentSession.context, ...result.analysisData };
        }

        if (result.reportGenerated && result.reportId) {
          currentSession.reportId = result.reportId;
          currentSession.analysisData = result.analysisData;

          const reportInfo = `\n\n📄 **Rapor Hazır!**\n\nDetaylı analiz raporu oluşturuldu.\n\n` +
            `**İndirme Seçenekleri:**\n` +
            `• [PDF Rapor İndir](/api/reports/download/${result.reportId}?format=pdf)\n` +
            `• [Excel Tablosu](/api/reports/download/${result.reportId}?format=excel)\n` +
            `• [JSON Veri](/api/reports/download/${result.reportId}?format=json)\n\n` +
            `Rapor ID: \`${result.reportId}\``;

          return result.response + reportInfo;
        }

        return result.response;
      } else {
        return result.response || 'Analiz sırasında bir hata oluştu. Lütfen tekrar deneyin.';
      }
    } catch (error) {
      console.error('Error calling analysis API:', error);
      return `Merhaba! Size nasıl yardımcı olabilirim?

**🎯 Yapabileceğim analizler:**
• Sera fizibilite analizi
• ROI hesaplamaları
• İklim uygunluk analizi
• Pazar araştırması
• Ekipman önerileri

Hangi konuda yardım istiyorsunuz?`;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as any);
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center" style={{ backgroundColor: '#146448' }}>
        <div className="text-center">
          <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-white/30 border-t-white"></div>
          <p className="text-sm text-white">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (!showChat) {
    return (
      <div style={{ backgroundColor: '#146448' }} className="min-h-screen">
        {/* Header */}
        <header className="px-4 py-6">
          <div className="mx-auto" style={{ maxWidth: '1700px' }}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="flex items-center">
                  <span className="text-2xl font-bold text-white">SeraGPT</span>
                </div>
              </div>
              <nav className="hidden md:flex items-center space-x-8">
                <Link href="/dashboard/settings" className="text-white hover:opacity-80 transition-opacity">
                  Ayarlar
                </Link>
                {isAdmin() && (
                  <Link href="/admin" className="text-white hover:opacity-80 transition-opacity">
                    Admin Panel
                  </Link>
                )}
                <button
                  onClick={signOut}
                  className="text-white hover:opacity-80 transition-opacity"
                >
                  Çıkış Yap
                </button>
                <button
                  onClick={startAnalysis}
                  style={{ backgroundColor: '#baf200', color: '#146448' }}
                  className="px-6 py-2 rounded-full font-medium hover:opacity-90 transition-opacity"
                >
                  Ücretsiz Başla
                </button>
              </nav>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <main className="px-4 py-20">
          <div className="mx-auto text-center" style={{ maxWidth: '896px' }}>
            <h1 className="text-white font-bold mb-6" style={{ fontSize: '36px', lineHeight: '1.2' }}>
              60 Saniyede Sera Yatırım<br />Fizibilitesi
            </h1>
            
            <div className="mx-auto mb-12" style={{ maxWidth: '576px' }}>
              <p className="text-white opacity-90" style={{ fontSize: '14px', lineHeight: '1.6' }}>
                SeraGPT, kurumsal yatırımcılardan mevcut sera sahiplerine ve yeni girişimcilere
                kadar her kullanıcı için kişiselleştirilmiş bir başlangıç noktası sunar.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <button
                onClick={startAnalysis}
                style={{ backgroundColor: '#baf200', color: '#146448' }}
                className="px-8 py-3 rounded-full font-medium text-lg hover:opacity-90 transition-opacity min-w-48"
              >
                Ücretsiz Rapor Al
              </button>
              <button
                onClick={startAnalysis}
                className="px-8 py-3 rounded-full font-medium text-lg text-white border-2 border-white hover:bg-white/10 transition-colors min-w-48"
              >
                Danışmanlık Talep Et
              </button>
            </div>

            <p className="text-white opacity-70 text-sm">
              Not: Kredi kartı gerekmez. 5 ücretsiz token.
            </p>
          </div>
        </main>

        {/* How It Works Section */}
        <section className="px-4 py-20">
          <div className="mx-auto text-center" style={{ maxWidth: '896px' }}>
            <h2 className="text-white font-bold mb-6" style={{ fontSize: '28px' }}>
              Nasıl Çalışır?
            </h2>
            
            <div className="mx-auto mb-12" style={{ maxWidth: '576px' }}>
              <p className="text-white opacity-90" style={{ fontSize: '14px', lineHeight: '1.6' }}>
                SeraGPT, kurumsal yatırımcılardan mevcut sera sahiplerine ve yeni girişimcilere
                kadar her kullanıcı için kişiselleştirilmiş bir başlangıç noktası sunar.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mt-16">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: '#baf200' }}>
                  <span className="text-2xl" style={{ color: '#146448' }}>1</span>
                </div>
                <h3 className="text-white font-semibold mb-2" style={{ fontSize: '18px' }}>Bilgi Toplama</h3>
                <p className="text-white opacity-80 text-sm">
                  Lokasyon, boyut, bütçe ve ürün tercihlerinizi belirtin
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: '#baf200' }}>
                  <span className="text-2xl" style={{ color: '#146448' }}>2</span>
                </div>
                <h3 className="text-white font-semibold mb-2" style={{ fontSize: '18px' }}>Analiz</h3>
                <p className="text-white opacity-80 text-sm">
                  İklim, pazar, maliyet ve risk faktörlerini analiz ediyoruz
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: '#baf200' }}>
                  <span className="text-2xl" style={{ color: '#146448' }}>3</span>
                </div>
                <h3 className="text-white font-semibold mb-2" style={{ fontSize: '18px' }}>Rapor</h3>
                <p className="text-white opacity-80 text-sm">
                  Detaylı fizibilite raporu ve önerileri alın
                </p>
              </div>
            </div>

            <div className="mt-12">
              <button
                onClick={startAnalysis}
                style={{ backgroundColor: '#baf200', color: '#146448' }}
                className="px-8 py-3 rounded-full font-medium text-lg hover:opacity-90 transition-opacity"
              >
                Hemen Başla
              </button>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // Chat Interface
  return (
    <div className="flex h-screen" style={{ backgroundColor: '#146448' }}>
      {/* Main Chat Container */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="border-b border-white/20 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowChat(false)}
                className="text-white hover:opacity-80 transition-opacity"
              >
                ← Geri
              </button>
              <h1 className="text-xl font-semibold text-white">
                SeraGPT Analiz
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              {isAdmin() && (
                <Link
                  href="/admin"
                  className="text-white hover:opacity-80 transition-opacity text-sm"
                >
                  Admin
                </Link>
              )}
              <Link
                href="/dashboard/settings"
                className="text-white hover:opacity-80 transition-opacity text-sm"
              >
                Ayarlar
              </Link>
              <button
                onClick={signOut}
                className="text-white hover:opacity-80 transition-opacity text-sm"
              >
                Çıkış
              </button>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-6 py-8">
          <div className="mx-auto" style={{ maxWidth: '896px' }}>
            <div className="space-y-6">
              {currentSession?.messages.map((message) => (
                <div key={message.id} className="group">
                  <div className={`flex items-start space-x-4 ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                      message.type === 'user' 
                        ? 'bg-white text-black' 
                        : 'border-2 border-white text-white'
                    }`}>
                      <span className="text-sm font-medium">
                        {message.type === 'user' ? 'V' : 'S'}
                      </span>
                    </div>
                    <div className={`min-w-0 flex-1 ${message.type === 'user' ? 'text-right' : ''}`}>
                      <div className={`inline-block max-w-4xl rounded-2xl px-6 py-4 ${
                        message.type === 'user'
                          ? 'bg-white text-black'
                          : 'bg-white/10 text-white border border-white/20'
                      }`}>
                        {message.isTyping ? (
                          <div className="flex space-x-1">
                            <div className="h-2 w-2 animate-bounce rounded-full bg-current"></div>
                            <div className="h-2 w-2 animate-bounce rounded-full bg-current" style={{ animationDelay: '0.1s' }}></div>
                            <div className="h-2 w-2 animate-bounce rounded-full bg-current" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                        ) : (
                          <div className="whitespace-pre-wrap leading-relaxed" style={{ fontSize: '14px' }}>
                            {message.content}
                          </div>
                        )}
                      </div>
                      <div className={`mt-2 text-xs text-white/60 ${message.type === 'user' ? 'text-right' : ''}`}>
                        {message.timestamp.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>
        </div>

        {/* Input */}
        <div className="border-t border-white/20 px-6 py-6">
          <form onSubmit={handleSubmit} className="mx-auto" style={{ maxWidth: '896px' }}>
            <div className="flex space-x-4">
              <div className="flex-1">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="SeraGPT'ye mesaj yazın..."
                  className="w-full resize-none rounded-2xl border-0 px-6 py-4 text-black focus:outline-none focus:ring-2 focus:ring-white/50"
                  style={{ minHeight: '56px', maxHeight: '200px', fontSize: '14px' }}
                  disabled={isLoading}
                />
              </div>
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                style={{ backgroundColor: '#baf200', color: '#146448' }}
                className="flex h-14 w-14 items-center justify-center rounded-2xl transition-opacity hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                ) : (
                  <span className="text-lg">🚀</span>
                )}
              </button>
            </div>
            <div className="mt-3 text-center text-xs text-white/60">
              Enter ile gönder • Shift+Enter ile yeni satır
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
