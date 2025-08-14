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

  const generateResponse = (input: string): string => {
    const lowerInput = input.toLowerCase();

    if (lowerInput.includes('analiz') || lowerInput.includes('fizibilite')) {
      return `🎯 **Sera Fizibilite Analizi Başlatılıyor**

📍 **Lokasyon:** ${lowerInput.includes('antalya') ? 'Antalya' : lowerInput.includes('mersin') ? 'Mersin' : lowerInput.includes('muğla') ? 'Muğla' : 'Belirtilen bölge'}
📏 **Sera Boyutu:** ${extractNumber(input) || '5000'}m²
🏗️ **Sera Tipi:** Modern cam sera (önerilen)

**📊 Hızlı Değerlendirme:**
• **Başlangıç Yatırımı:** ₺${((extractNumber(input) || 5000) * 180).toLocaleString()}
• **Yıllık Gelir Potansiyeli:** ₺${((extractNumber(input) || 5000) * 95).toLocaleString()}
• **Geri Ödeme Süresi:** 2.8-3.5 yıl
• **ROI:** %28-35

**🌡️ İklim Uygunluğu:** ✅ Bölge sera tarımı için ideal
**💡 Ürün Önerisi:** Domates + salatalık rotasyonu (en karlı)

Detaylı rapor için "Tam analiz raporu oluştur" yazın.`;
    }

    if (lowerInput.includes('roi') || lowerInput.includes('hesaplama') || lowerInput.includes('yatırım')) {
      return `💰 **ROI Hesaplama Merkezi**

**📋 Analiz için gereken bilgiler:**
1. 📏 Sera büyüklüğü (m²)
2. 📍 Lokasyon
3. 🌱 Yetiştirilecek ürün
4. 💵 Toplam yatırım bütçesi

**📝 Örnek format:**
"5000m² Antalya sera, domates üretimi, 900.000₺ bütçe"

**📊 Bu bilgilerle size sunabileceğim analizler:**
• Detaylı CAPEX/OPEX analizi
• 5 yıllık gelir projeksiyonu  
• Risk değerlendirmesi
• Geri ödeme süresi hesabı
• Karlılık senaryoları

Hangi bilgileri paylaşmak istersiniz?`;
    }

    if (lowerInput.includes('danışmanlık') || lowerInput.includes('uzman') || lowerInput.includes('destek')) {
      return `🤝 **Profesyonel Danışmanlık Hizmetleri**

**🎯 Hizmet Paketlerimiz:**

**🥉 TEMEL PAKET - ₺25.000**
• Fizibilite analizi
• Temel proje planlaması
• Maliyet hesaplama

**🥈 KAPSAMLI PAKET - ₺45.000**
• Detaylı tasarım
• Tedarikçi rehberi
• İnşaat yönetimi

**🥇 PREMIUM PAKET - ₺85.000**
• Anahtar teslim proje yönetimi
• 2 yıl operasyon desteği
• Garantili ROI hedefleri

**📞 İletişim:**
• "Danışmanlık teklifi istiyorum" yazın
• Hemen görüşme: +90 532 XXX XXXX
• E-posta: info@seragpt.com

Hangi paket size uygun?`;
    }

    if (lowerInput.includes('iklim') || lowerInput.includes('hava') || lowerInput.includes('sıcaklık')) {
      return `🌡️ **İklim Verileri & Analiz**

**📊 Sera İklim Faktörleri:**
• 🌡️ Ortalama sıcaklık (min/max)
• 💧 Nem oranları
• ☀️ Güneşlenme süreleri
• 💨 Rüzgar hızları ve yönü
• ❄️ Donlu gün sayıları

**🏆 Türkiye'nin En İdeal Sera Bölgeleri:**

**1. 🥇 Antalya**
• 12 ay üretim imkanı
• Yıllık 300+ güneşli gün

**2. 🥈 Mersin** 
• Yüksek verim potansiyeli
• Liman avantajı

**3. 🥉 Muğla**
• Organik üretim için ideal
• Premium pazar erişimi

Belirli bir şehir için detaylı iklim analizi yapmamı ister misiniz?`;
    }

    return `Anlıyorum! Size daha iyi yardımcı olabilmek için konuyu biraz daha detaylandırabilir misiniz?

**🔥 Popüler Konular:**
• 🏗️ Sera fizibilite analizi
• 💰 Yatırım hesaplamaları  
• 🌡️ İklim verileri analizi
• 🤝 Danışmanlık hizmetleri
• ⚙️ Teknoloji çözümleri

**💡 Öneriler:**
• "Sera yatırımı hakkında bilgi ver"
• "En karlı ürünler hangileri?"
• "Hangi teknolojiler gerekli?"

Size nasıl yardımcı olabilirim? 🌱`;
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
