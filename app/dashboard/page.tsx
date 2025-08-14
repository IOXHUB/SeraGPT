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
}

interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
}

export default function ModernChatDashboard() {
  const { user, loading, signOut, isAdmin } = useAuth();
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [currentSession, setCurrentSession] = useState<ChatSession | null>(null);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
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
      messages: [
        {
          id: 'welcome-1',
          type: 'assistant',
          content: `👋 **Merhaba! Ben SeraGPT'niz.**

Sera yatırımı ve tarım konularında size yardımcı olmaya hazırım.

**💡 Ne yapabilirim:**
• Sera fizibilite analizi (60 saniyede!)
• ROI hesaplamaları ve yatırım planlaması
• İklim verileri ve pazar analizi
• Ekipman önerileri ve maliyet optimizasyonu
• Profesyonel danışmanlık hizmetleri

**🚀 Başlamak için şunları deneyebilirsiniz:**
• "Antalya'da 5000m² sera yatırımı analizi"
• "ROI hesaplama yapmak istiyorum"
• "İklim verilerini analiz et"
• "Danışmanlık hizmeti almak istiyorum"

Size nasıl yardımcı olabilirim?`,
          timestamp: new Date()
        }
      ],
      createdAt: new Date()
    };

    setSessions([defaultSession]);
    setCurrentSession(defaultSession);
  };

  const createNewSession = () => {
    const newSession: ChatSession = {
      id: `session-${Date.now()}`,
      title: 'Yeni Sohbet',
      messages: [],
      createdAt: new Date()
    };

    setSessions(prev => [newSession, ...prev]);
    setCurrentSession(newSession);
  };

  const deleteSession = (sessionId: string) => {
    setSessions(prev => prev.filter(s => s.id !== sessionId));
    if (currentSession?.id === sessionId) {
      setCurrentSession(sessions[0] || null);
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
      await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

      const response = generateResponse(input.trim());
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
      // Call the comprehensive analysis API
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
        // Update session context with analysis data
        if (currentSession && result.analysisData) {
          currentSession.context = { ...currentSession.context, ...result.analysisData };
        }

        return result.response;
      } else {
        return result.response || 'Analiz sırasında bir hata olu��tu. Lütfen tekrar deneyin.';
      }
    } catch (error) {
      console.error('Error calling analysis API:', error);

      // Fallback to simple response
      const lowerInput = input.toLowerCase();

      if (lowerInput.includes('analiz') || lowerInput.includes('fizibilite')) {
        return `🎯 **Sera Analizi Başlatılıyor**

Kapsamlı analiz için şu bilgileri paylaşın:
• 📍 Lokasyon (şehir)
• 📏 Sera boyutu (m²)
• 💰 Yatırım bütçesi
• 🌱 Yetiştirilecek ürünler

Örnek: "Antalya'da 5000m² sera, 900.000₺ bütçe, domates üretimi"`;
      }

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

  const extractNumber = (text: string): number | null => {
    const match = text.match(/\d+/);
    return match ? parseInt(match[0]) : null;
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as any);
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-emerald-600"></div>
          <p className="text-sm text-gray-600">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-80' : 'w-0'} transition-all duration-300 overflow-hidden bg-gray-900 flex flex-col`}>
        {/* Sidebar Header */}
        <div className="flex h-16 items-center justify-between px-4 border-b border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="h-8 w-8 rounded-lg bg-emerald-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <span className="text-white font-semibold">SeraGPT</span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-gray-400 hover:text-white"
          >
            ✕
          </button>
        </div>

        {/* New Chat Button */}
        <div className="p-4">
          <button
            onClick={createNewSession}
            className="w-full flex items-center justify-center space-x-2 rounded-lg border border-gray-600 px-3 py-2 text-sm text-white transition-colors hover:bg-gray-800"
          >
            <span>+</span>
            <span>Yeni Sohbet</span>
          </button>
        </div>

        {/* Sessions List */}
        <div className="flex-1 overflow-y-auto px-4 pb-4">
          <div className="space-y-2">
            {sessions.map((session) => (
              <div
                key={session.id}
                className={`group relative rounded-lg px-3 py-2 text-sm transition-colors ${
                  currentSession?.id === session.id
                    ? 'bg-gray-800 text-white'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <button
                  onClick={() => setCurrentSession(session)}
                  className="w-full text-left truncate"
                >
                  {session.title}
                </button>
                {session.id !== 'welcome-session' && (
                  <button
                    onClick={() => deleteSession(session.id)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-400 transition-opacity"
                  >
                    🗑️
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* User Menu */}
        <div className="border-t border-gray-700 p-4">
          <div className="space-y-2">
            {isAdmin() && (
              <Link
                href="/admin"
                className="flex items-center space-x-2 rounded-lg px-3 py-2 text-sm text-gray-300 transition-colors hover:bg-gray-800 hover:text-white"
              >
                <span>👑</span>
                <span>Admin Panel</span>
              </Link>
            )}
            <Link
              href="/dashboard/settings"
              className="flex items-center space-x-2 rounded-lg px-3 py-2 text-sm text-gray-300 transition-colors hover:bg-gray-800 hover:text-white"
            >
              <span>⚙️</span>
              <span>Ayarlar</span>
            </Link>
            <button
              onClick={signOut}
              className="flex w-full items-center space-x-2 rounded-lg px-3 py-2 text-left text-sm text-gray-300 transition-colors hover:bg-gray-800 hover:text-white"
            >
              <span>🚪</span>
              <span>Çıkış Yap</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 flex-col">
        {/* Header */}
        <div className="flex h-16 items-center justify-between border-b border-gray-200 px-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="rounded-lg p-2 text-gray-600 hover:bg-gray-100"
            >
              ☰
            </button>
            <h1 className="text-lg font-semibold text-gray-900">
              {currentSession?.title || 'SeraGPT'}
            </h1>
          </div>
          <div className="text-sm text-gray-500">
            {user?.email}
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-4xl px-4 py-6">
            <div className="space-y-6">
              {currentSession?.messages.map((message) => (
                <div key={message.id} className="group">
                  <div className={`flex items-start space-x-4 ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                      message.type === 'user' 
                        ? 'bg-emerald-600' 
                        : 'bg-gray-800'
                    }`}>
                      <span className="text-sm font-medium text-white">
                        {message.type === 'user' ? 'V' : 'S'}
                      </span>
                    </div>
                    <div className={`min-w-0 flex-1 ${message.type === 'user' ? 'text-right' : ''}`}>
                      <div className={`inline-block max-w-4xl rounded-lg px-4 py-3 text-sm ${
                        message.type === 'user'
                          ? 'bg-emerald-600 text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}>
                        {message.isTyping ? (
                          <div className="flex space-x-1">
                            <div className="h-2 w-2 animate-bounce rounded-full bg-gray-500"></div>
                            <div className="h-2 w-2 animate-bounce rounded-full bg-gray-500" style={{ animationDelay: '0.1s' }}></div>
                            <div className="h-2 w-2 animate-bounce rounded-full bg-gray-500" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                        ) : (
                          <div className="whitespace-pre-wrap leading-relaxed">
                            {message.content}
                          </div>
                        )}
                      </div>
                      <div className={`mt-1 text-xs text-gray-500 ${message.type === 'user' ? 'text-right' : ''}`}>
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
        <div className="border-t border-gray-200 p-4">
          <form onSubmit={handleSubmit} className="mx-auto max-w-4xl">
            <div className="flex space-x-4">
              <div className="flex-1">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="SeraGPT'ye mesaj yazın..."
                  className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  rows={1}
                  style={{ minHeight: '48px', maxHeight: '200px' }}
                  disabled={isLoading}
                />
              </div>
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-600 text-white transition-colors hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                ) : (
                  <span>🚀</span>
                )}
              </button>
            </div>
            <div className="mt-2 text-center text-xs text-gray-500">
              Enter ile gönder • Shift+Enter ile yeni satır
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
