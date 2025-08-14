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

export default function ChatDashboard() {
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
    // Load existing sessions or create a default one
    const defaultSession: ChatSession = {
      id: 'welcome-session',
      title: 'SeraGPT ile Tanışın',
      messages: [
        {
          id: 'welcome-1',
          type: 'assistant',
          content: `Merhaba! Ben SeraGPT, sera yatırım ve tarım uzmanınızım. 🌱

Size nasıl yardımcı olabilirim?

🎯 **Yapabileceklerim:**
• Sera fizibilite analizi (60 saniyede!)
• Yatırım hesaplamaları ve ROI analizi
• İklim ve pazar verileri analizi
• Ekipman tavsiyeleri
• Maliyet optimizasyonu
• Danışmanlık hizmetleri

Başlamak için istediğiniz konuyu yazabilir veya aşağıdaki örneklerden birini seçebilirsiniz:

📊 "Antalya'da 5000m² sera yatırımı analizi yap"
🌡️ "İklim verilerini analiz et"
💰 "ROI hesaplama yapmak istiyorum"
🤝 "Danışmanlık hizmeti almak istiyorum"`,
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading || !currentSession) return;

    const userMessage: Message = {
      id: `msg-${Date.now()}`,
      type: 'user',
      content: input.trim(),
      timestamp: new Date()
    };

    // Add user message
    const updatedSession = {
      ...currentSession,
      messages: [...currentSession.messages, userMessage],
      title: currentSession.messages.length === 0 ? input.trim().slice(0, 50) + '...' : currentSession.title
    };

    setCurrentSession(updatedSession);
    setSessions(prev => prev.map(s => s.id === currentSession.id ? updatedSession : s));
    setInput('');
    setIsLoading(true);

    // Simulate typing indicator
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
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Generate response based on user input
      const response = generateResponse(input.trim());

      const assistantMessage: Message = {
        id: `msg-${Date.now()}`,
        type: 'assistant',
        content: response,
        timestamp: new Date()
      };

      // Remove typing indicator and add real response
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
      return `🎯 **Sera Fizibilite Analizi**

Analiz için şu bilgileri topluyorum:
• Lokasyon: ${lowerInput.includes('antalya') ? 'Antalya' : 'Belirtilen bölge'}
• Sera büyüklüğü: ${extractNumber(input) || '5000'}m²
• Sera tipi: Cam sera (önerilen)

📊 **Hızlı Değerlendirme:**
• **Başlangıç Yatırımı:** ₺${((extractNumber(input) || 5000) * 150).toLocaleString()}
• **Yıllık Gelir Potansiyeli:** ₺${((extractNumber(input) || 5000) * 80).toLocaleString()}
• **Geri Ödeme Süresi:** 3-4 yıl
• **ROI:** %22-28

🌡️ **İklim Analizi:** Bölge sera tarımı için uygun
💡 **Öneri:** Domates + salatalık rotasyonu

Detaylı rapor için "Tam analiz raporu oluştur" yazabilirsiniz.`;
    }

    if (lowerInput.includes('roi') || lowerInput.includes('hesaplama')) {
      return `💰 **ROI Hesaplama Merkezi**

Yatırım getirisini hesaplamak için:

📝 **Gerekli Bilgiler:**
1. Sera büyüklüğü (m²)
2. Lokasyon
3. Yetiştirilecek ürün
4. Yatırım bütçesi

Örnek hesaplama için bu formatı kullanabilirsiniz:
"5000m² Antalya sera, domates üretimi, 750.000₺ bütçe"

📊 Bu bilgilerle size:
• Detaylı maliyet analizi
• Gelir projeksiyonu
• Risk analizi
• Geri ödeme süresi hesaplayabilirim.`;
    }

    if (lowerInput.includes('danışmanlık') || lowerInput.includes('uzman') || lowerInput.includes('destek')) {
      return `🤝 **Profesyonel Danışmanlık Hizmetleri**

Size özel danışmanlık paketi hazırlayabilirim:

🎯 **Hizmet Alanları:**
• Fizibilite danışmanlığı
• Proje yönetimi
• Anahtar teslim sera kurulumu
• Operasyon optimizasyonu

📋 **Paketler:**
• **Temel:** Fizibilite + planlama (₺15.000)
• **Kapsamlı:** Tasarım + tedarik rehberi (₺35.000)  
• **Premium:** Anahtar teslim proje yönetimi (₺75.000)

İletişim için: "Danışmanlık teklifi istiyorum" yazın.
📞 Hemen görüşme planlamak için: +90 XXX XXX XXXX`;
    }

    if (lowerInput.includes('iklim') || lowerInput.includes('hava')) {
      return `🌡️ **İklim Verileri Analizi**

Sera yatırımı için iklim faktörleri kritik öneme sahip:

📊 **Analiz Edilen Veriler:**
• Sıcaklık ortalamaları (min/max)
• Nem oranları
• Güneşlenme süreleri
• Rüzgar hızları
• Donlu gün sayıları

🌍 **Türkiye'de En Uygun Bölgeler:**
1. **Antalya:** 12 ay üretim
2. **Mersin:** Yüksek verim
3. **Muğla:** Organik üretim uygun
4. **İzmir:** Lojistik avantajı

Belirli bir bölge için analiz yapmak ister misiniz?
"[Şehir adı] iklim analizi" yazabilirsiniz.`;
    }

    // Default response
    return `Anlıyorum! Size yardımcı olmak için daha fazla detay verebilir misiniz?

🎯 **Popüler Konular:**
• Sera fizibilite analizi
• Yatırım hesaplamaları
• İklim verileri analizi
• Danışmanlık hizmetleri
• Maliyet optimizasyonu

Veya şunları deneyebilirsiniz:
"Sera yatırımı hakkında bilgi ver"
"Hangi ürünler en karlı?"
"Teknoloji çözümleri neler?"

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
      <div className="h-screen flex items-center justify-center" style={{ backgroundColor: '#146448' }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex" style={{ backgroundColor: '#146448' }}>
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-72' : 'w-0'} transition-all duration-300 overflow-hidden bg-black/10 border-r border-white/5`}>
        <div className="h-full flex flex-col">
          {/* Sidebar Header */}
          <div className="p-4 border-b border-white/5">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-medium" style={{ color: '#1e3237' }}>SeraGPT</h2>
              <button
                onClick={() => setSidebarOpen(false)}
                className="md:hidden text-xs" style={{ color: '#1e3237' }}
              >
                ×
              </button>
            </div>
            <button
              onClick={createNewSession}
              className="w-full p-2 rounded-md text-xs font-medium transition-colors"
              style={{
                backgroundColor: '#baf200',
                color: '#1e3237',
                border: '1px solid #baf200'
              }}
            >
              + Yeni Sohbet
            </button>
          </div>

          {/* Sessions List */}
          <div className="flex-1 overflow-y-auto p-3 space-y-1">
            {sessions.map((session) => (
              <button
                key={session.id}
                onClick={() => setCurrentSession(session)}
                className={`w-full p-2 rounded-md text-left transition-colors ${
                  currentSession?.id === session.id
                    ? 'bg-white/10'
                    : 'hover:bg-white/5'
                }`}
                style={{
                  color: currentSession?.id === session.id ? '#1e3237' : '#1e3237',
                  opacity: currentSession?.id === session.id ? 1 : 0.7
                }}
              >
                <div className="truncate text-xs font-medium">
                  {session.title}
                </div>
                <div className="text-xs opacity-50 mt-1">
                  {session.messages.length} mesaj
                </div>
              </button>
            ))}
          </div>

          {/* User Menu */}
          <div className="p-3 border-t border-white/5">
            <div className="space-y-1">
              {isAdmin && (
                <Link
                  href="/admin"
                  className="block w-full p-2 rounded-md hover:bg-white/5 transition-colors text-xs"
                  style={{ color: '#1e3237', opacity: 0.8 }}
                >
                  👑 Admin
                </Link>
              )}
              <Link
                href="/dashboard/settings"
                className="block w-full p-2 rounded-md hover:bg-white/5 transition-colors text-xs"
                style={{ color: '#1e3237', opacity: 0.8 }}
              >
                ⚙️ Ayarlar
              </Link>
              <button
                onClick={signOut}
                className="w-full p-2 rounded-md hover:bg-white/5 transition-colors text-xs text-left"
                style={{ color: '#1e3237', opacity: 0.8 }}
              >
                🚪 Çıkış
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <div className="h-12 border-b border-white/5 flex items-center justify-between px-4">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-xs hover:opacity-70 transition-opacity"
              style={{ color: '#1e3237' }}
            >
              ☰
            </button>
            <h1 className="text-sm font-medium" style={{ color: '#1e3237' }}>
              {currentSession?.title || 'SeraGPT'}
            </h1>
          </div>
          <div className="text-xs opacity-60" style={{ color: '#1e3237' }}>
            {user?.email}
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-3xl mx-auto p-4 space-y-4">
            {currentSession?.messages.map((message) => (
              <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[75%] ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
                  <div className={`p-3 rounded-lg ${
                    message.type === 'user'
                      ? 'ml-auto'
                      : 'bg-white/5'
                  }`}
                  style={{
                    backgroundColor: message.type === 'user' ? '#baf200' : 'rgba(255,255,255,0.05)',
                    color: '#1e3237'
                  }}>
                    {message.isTyping ? (
                      <div className="flex space-x-1">
                        <div className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ backgroundColor: '#1e3237', opacity: 0.6 }}></div>
                        <div className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ backgroundColor: '#1e3237', opacity: 0.6, animationDelay: '0.1s' }}></div>
                        <div className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ backgroundColor: '#1e3237', opacity: 0.6, animationDelay: '0.2s' }}></div>
                      </div>
                    ) : (
                      <div className="whitespace-pre-wrap text-xs leading-relaxed">
                        {message.content}
                      </div>
                    )}
                  </div>
                  <div className={`text-xs opacity-40 mt-1 ${message.type === 'user' ? 'text-right' : 'text-left'}`} style={{ color: '#1e3237' }}>
                    {message.timestamp.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <div className="border-t border-white/10 p-6">
          <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
            <div className="flex space-x-4">
              <div className="flex-1 relative">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="SeraGPT'ye bir mesaj yazın..."
                  className="w-full p-4 rounded-2xl resize-none bg-white/10 text-white placeholder-white/50 border border-white/20 focus:outline-none focus:border-white/40 focus:ring-0"
                  rows={1}
                  style={{ minHeight: '56px', maxHeight: '200px' }}
                  disabled={isLoading}
                />
              </div>
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="p-4 rounded-2xl bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isLoading ? '⏳' : '🚀'}
              </button>
            </div>
            <div className="text-xs text-white/40 mt-2 text-center">
              Enter ile gönder • Shift+Enter ile yeni satır
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
