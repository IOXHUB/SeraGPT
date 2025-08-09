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
    const analysis = MOCK_ANALYSES.find(a => a.id === reportId);
    return analysis?.title || 'Analiz Raporu';
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

  const handleReportSelect = (reportId: string) => {
    setShowReportSelection(false);
    
    // Update URL to include selected report
    const url = new URL(window.location.href);
    url.searchParams.set('report', reportId);
    url.searchParams.delete('category');
    window.history.pushState({}, '', url.toString());

    // Initialize session with selected report
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

    // Reset textarea height
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
    }

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

    // Rapor bazlı yanıtlar
    if (reportParam) {
      if (reportParam.includes('roi')) {
        if (input.includes('optimiz') || input.includes('iyileştir') || input.includes('geri dönüş')) {
          return `🌱 **${getReportTitle(reportParam)} - ROI Optimizasyon Önerileri**

Raporunuzu detaylı analiz ettim. İşte ROI'nizi artırmak için kritik önerilerim:

**📈 Hızlı ROI Artırma Stratejileri:**

• **Ürün Karışımı Optimizasyonu**: Premium çeşitlere odaklanarak m² başına geliri %15-20 artırabilirsiniz
• **Sezon Uzatma**: Erken ve geç sezon üretimiyle yıllık hasatı 2 aydan fazla uzatın
• **Direkt Satış Kanalları**: Perakende zincirler ve çiftlik pazarı satışlarıyla %25-30 fiyat primi
• **Malzeme Verimliliği**: Su ve gübre tasarrufu ile yıllık %8-12 maliyet azaltması

**💡 Teknoloji Yatırımları:**
• Akıllı iklim kontrolü ile %20 enerji tasarrufu
• Precision farming ile %15 verim artışı
• Otomasyon ile işçilik maliyetinde %30 azalma

**Hangi stratejileri öncelikli olarak uygulamak istiyorsunuz?**`;
        }

        return `📊 **ROI Analizi Uzmanı Görüşü**

${getReportTitle(reportParam)} raporunuzda önemli fırsatlar görüyorum:

**🎯 Ana Bulgular:**
• Mevcut ROI: %18.5 - Sektör ortalaması üstünde
• Geri dönüş süresi: 3.2 yıl - Kabul edilebilir seviye
• Risk seviyesi: Orta - Yönetilebilir faktörler

**💰 Optimizasyon Potansiyeli:**
• Domates premium çeşitler: +%25 gelir
• Sezon uzatma: +45 gün üretim
• Enerji verimliliği: -%15 işletme maliyeti

Hangi alanda detaylı optimizasyon planı oluşturalım?`;
      }

      if (reportParam.includes('climate')) {
        if (input.includes('verimlilik') || input.includes('dönem') || input.includes('optimiz')) {
          return `🌡️ **İklim Analizi Bazlı Verimlilik Optimizasyonu**

${getReportTitle(reportParam)} raporunuza göre stratejik önerilerim:

**🌟 Maksimum Verimlilik Dönemleri:**

• **Mart-Mayıs (İlkbahar)**: %92 uygunluk - Ana üretim dönemi
• **Eylül-Kasım (Sonbahar)**: %88 uygunluk - İkinci hasat döngüsü
• **Aralık-Şubat (Kış)**: %75 uygunluk - Ek ısıtma ile karlı

**⚡ Kritik İyileştirmeler:**

• **Yaz Stratejisi**: Gölgeleme ve soğutma ile %30 verim artışı
• **Kış Optimizasyonu**: Isı pompası sistemiyle %40 enerji tasarrufu
• **Don Koruması**: Erken uyarı sistemiyle %100 kayıp önleme
• **Nem Kontrolü**: Otomatik havalandırma ile hastalık riski -%70

Hangi sezon için detaylı uygulama planı hazırlayalım?`;
        }

        return `🌱 **İklim Uzmanı Değerlendirmesi**

İzmir bölgesi iklim analizi çok olumlu sonuçlar gösteriyor:

**🎯 Uygunluk Skoru: 85/100** - Mükemmel seviye!

**✅ Güçlü Yönler:**
• Düşük don riski - Sadece 8 gün/yıl
• Uzun yetiştirme sezonu - 285 gün
• Optimal nem seviyeleri - %68 ortalama

**⚠️ Dikkat Edilecek Alanlar:**
• Yaz sıcaklıkları (42°C max) - Soğutma sistemi kritik
• Sonbahar yağışları - Drenaj planlaması önemli

Hangi iklim faktörü için detaylı çözüm önerileri istersiniz?`;
      }

      if (reportParam.includes('equipment')) {
        return `⚙️ **Ekipman Optimizasyon Uzmanı**

${getReportTitle(reportParam)} raporunuzda maliyet optimizasyonu fırsatları:

**💰 Maliyet Azaltma Stratejileri:**

• **Hibrit Sistemler**: %25-30 başlangıç maliyeti azaltması
• **Aşamalı Kurulum**: Nakit akışını iyileştirme
• **Yerel Tedarik**: İthalat yerine yerli ekipmanlarla %20 tasarruf
• **Kullanılmış Ekipman**: Seçili kategorilerde %40-50 tasarruf

**🔧 Öncelikli Ekipman Kategorileri:**
1. **İklim Kontrolü** - Zorunlu, ertelenmez
2. **Sulama Sistemi** - Hemen kurulmalı
3. **Otomasyon** - Aşamalı eklenebilir
4. **Güneş Paneli** - ROI pozitif olunca

Hangi kategori için alternatif çözümler araştıralım?`;
      }

      if (reportParam.includes('market')) {
        return `📈 **Pazar Analizi Stratejisti**

${getReportTitle(reportParam)} raporunda önemli fırsatlar var:

**🎯 Kar Maximizasyonu Stratejileri:**

• **Premium Ürün Konumlandırması**: %15-20 fiyat primi
• **Sezonsal Zamanlama**: Kış fiyatları %40 daha yüksek
• **Direkt Satış Kanalları**: Aracı marjını elimine etme
• **Kontrat Tarımı**: Fiyat garantisi ve risk azaltma

**📊 Optimal Satış Takvimi:**
• **Ekim-Şubat**: En yüksek fiyat dönemi (₺13.50/kg)
• **Mart-Mayıs**: Orta seviye (₺9.20/kg)
• **Haziran-Ağustos**: En düşük (₺7.20/kg) - Stok dönemi

**💡 Değer Katma Fırsatları:**
• Organik sertifikasyon: +%30 prim
• Ambalajlama ve marka: +%25 prim
• İşlenmiş ürünler: +%50-100 katma değer

Hangi stratejiyi öncelikli olarak geliştirmek istiyorsunuz?`;
      }

      if (reportParam.includes('layout')) {
        return `📐 **Layout Optimizasyon Uzmanı**

${getReportTitle(reportParam)} için verimlilik artırma önerilerim:

**⚡ Hızlı Verimlilik Artışları:**

• **Alan Kullanımı**: Mevcut %88'den %95'e çıkarılabilir
• **İş Akışı**: Akıllı geçit düzeniyle %20 zaman tasarrufu
• **Bitki Kapasitesi**: 1,792'den 2,100 bitkiye çıkış mümkün
• **Otomasyon Entegrasyonu**: Manuel işçiliği %40 azaltma

**🏗️ Layout İyileştirme Alanları:**

• **Giriş Zonları**: Malzeme akışını optimize etme
• **Çalışma Alanları**: %8'den %12'ye çıkarılabilir
• **Depolama**: Dikey depolama ile %50 alan tasarrufu
• **Gelecek Genişleme**: Modüler tasarımla hazırlık

**🔧 Teknik Optimizasyonlar:**
• Işık geçirgeni artırma
• Havalandırma optimizasyonu
• Su sistemi düzenleme
• Elektrik altyapısı güçlendirme

Hangi optimizasyon alanında detay planlama yapalım?`;
      }
    }

    // Genel yanıtlar
    if (input.includes('maliyet') || input.includes('para') || input.includes('fiyat')) {
      return `💰 **Sera Maliyet Uzmanı**

Size özel maliyet analizi hazırlayabilirim:

**🏗️ Temel Maliyet Kategorileri:**

• **Yapı Maliyeti** (40-50%): Konstrüksiyon, örtü, temel
• **Ekipman Maliyeti** (30-35%): İklim, sulama, otomasyon
• **Altyapı Maliyeti** (10-15%): Elektrik, su, yol
• **İşletme Maliyeti** (Yıllık): Enerji, işgücü, bakım

**📊 Maliyet Optimizasyon Taktikleri:**
• Aşamalı kurulum stratejisi
• Yerel vs ithal ekipman analizi
• Finansman alternatifleri
• Hibrit teknoloji çözümleri

Hangi boyutta sera planl��yorsunuz? Size özel analiz hazırlayalım.`;
    }

    if (input.includes('roi') || input.includes('geri dönüş') || input.includes('kâr')) {
      return `📈 **ROI Analiz Uzmanı**

Sera yatırımı ROI hesaplaması için detaylı yaklaşım:

**🎯 ROI Değerlendirme Matrisi:**

• **Yatırım Tutarı**: Toplam kuruluş + işletme sermayesi
• **Yıllık Gelir**: Kapasite × verim × fiyat × sezon uzunluğu
• **İşletme Giderleri**: Enerji + işgücü + malzeme + bakım
• **Net Kâr**: Gelir - giderler - amortisman

**⚡ ROI Artırma Faktörleri:**
• Premium çeşit seçimi
• Sezon uzatma teknikleri
• Direkt satış kanalları
• Otomasyon yatırımları

Sera büyüklüğü ve hedef ürününüz nedir? Spesifik ROI analizi yapalım.`;
    }

    if (input.includes('ekipman') || input.includes('teknoloji') || input.includes('sistem')) {
      return `🔧 **Sera Teknoloji Uzmanı**

Modern sera ekipmanları konusunda kapsamlı destek sunabilirim:

**🏆 Kritik Teknoloji Alanları:**

• **İklim Kontrolü**: Sıcaklık, nem, CO2 yönetimi
• **Sulama Sistemleri**: Precision irrigation, fertigasyon
• **Otomasyon**: IoT sensörler, AI destekli kontrol
• **Enerji Verimliliği**: LED aydınlatma, ısı pompası

**💡 2024 Teknoloji Trendleri:**
• Akıllı sera yönetim sistemleri
• Yenilenebilir enerji entegrasyonu
• Precision farming teknolojileri
• Vertikal farming hibrit çözümleri

Hangi teknoloji alanında detaylı rehberlik istersiniz?`;
    }

    return `🌱 **SeraGPT Uzman Asistanınız**

Size en değerli tavsiyeleri sunabilmem için hangi konuda derinlemesine analiz yapmak istiyorsunuz?

**🚀 Uzmanlık Alanlarım:**

• **Yatırım Analizi**: ROI hesaplama, risk değerlendirme, finansman
• **Teknoloji Seçimi**: Ekipman karşılaştırma, maliyet-fayda analizi
• **İklim Optimizasyonu**: Bölgesel uygunluk, risk yönetimi
• **Pazar Stratejisi**: Fiyat analizi, satış kanalları, zamanlama
• **Operasyonel Verimlilik**: Layout, süreç optimizasyonu

**🎯 Özel Hizmetlerim:**
✅ Raporlarınızı analiz etme ve iyileştirme önerileri
✅ Spesifik problemlere özel çözümler geliştirme
✅ Adım adım uygulama planları hazırlama
✅ Maliyet-fayda hesaplamaları

Hangi konuda konuşmaya başlayalım?`;
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

  const getFileTypeInfo = (filename: string) => {
    const ext = filename.split('.').pop()?.toLowerCase();
    const types = {
      'pdf': 'PDF Belgesi',
      'doc': 'Word Belgesi',
      'docx': 'Word Belgesi',
      'txt': 'Metin Dosyası',
      'xlsx': 'Excel Tablosu',
      'xls': 'Excel Tablosu',
      'csv': 'CSV Dosyası',
      'dwg': 'AutoCAD Çizimi',
      'png': 'PNG Resmi',
      'jpg': 'JPEG Resmi',
      'jpeg': 'JPEG Resmi',
      'ppt': 'PowerPoint Sunumu',
      'pptx': 'PowerPoint Sunumu',
      'zip': 'ZIP Arşivi',
      'rar': 'RAR Arşivi'
    };
    return types[ext as keyof typeof types] || 'Dosya';
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

  // Report Selection Screen
  if (showReportSelection && selectedCategory) {
    const categoryReports = getCategoryReports(selectedCategory);
    
    return (
      <DashboardLayout>
        <div className="h-full bg-white">
          <div className="h-full flex flex-col">
            {/* Header */}
            <div className="border-b border-gray-100 p-4 sm:p-6">
              <div className="max-w-4xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🤖</span>
                  </div>
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">
                    {getCategoryTitle(selectedCategory)} Raporlarınız
                  </h1>
                  <p className="text-gray-600">
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
                        className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-green-300 cursor-pointer transition-all duration-200"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                              {report.title}
                            </h3>
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <span className="flex items-center">
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                {new Date(report.createdAt).toLocaleDateString('tr-TR')}
                              </span>
                              <span className="flex items-center">
                                <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                                Tamamlandı
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center text-green-600">
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
                    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Henüz {getCategoryTitle(selectedCategory).toLowerCase()} raporu yok
                    </h3>
                    <p className="text-gray-500 mb-6">
                      Bu kategoride henüz tamamlanmış bir raporunuz bulunmuyor.
                    </p>
                    <button
                      onClick={() => setShowReportSelection(false)}
                      className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
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
      <div className="h-full bg-white flex flex-col overflow-hidden">
        
        {/* Main Chat Area - Full Screen with proper margins */}
        <div className="flex-1 flex flex-col min-h-0">
          
          {/* Messages Area - Improved margins for desktop and mobile */}
          <div className="flex-1 overflow-y-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
            <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
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
                    <div className={`max-w-[85%] sm:max-w-[80%] ${message.role === 'user' ? 'order-2' : 'order-1'}`}>
                      
                      {/* Message Bubble */}
                      <div className={`group relative ${message.role === 'user' ? 'ml-auto' : 'mr-auto'}`}>
                        <div className={`px-4 sm:px-6 py-3 sm:py-4 rounded-3xl shadow-sm ${
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

          {/* Input Area - Fixed to bottom with better responsive layout */}
          <div className="border-t border-gray-100 bg-white p-3 sm:p-4 lg:p-6">
            <div className="max-w-4xl mx-auto">
              {/* ChatGPT Style Input Container */}
              <div className="relative bg-white border border-gray-200 rounded-2xl sm:rounded-3xl shadow-lg hover:shadow-xl transition-all duration-200">
                
                {/* Selected file indicator */}
                {selectedFile && (
                  <div className="absolute bottom-full left-0 right-0 mb-2 mx-2">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="text-blue-600 text-lg">📎</span>
                          <div>
                            <span className="text-sm text-blue-700 font-medium block">{selectedFile.name}</span>
                            <span className="text-xs text-blue-500">{getFileTypeInfo(selectedFile.name)}</span>
                          </div>
                        </div>
                        <button
                          onClick={() => setSelectedFile(null)}
                          className="text-blue-400 hover:text-blue-600 p-1"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex items-end p-2">
                  {/* Left Action Buttons - Responsive layout */}
                  <div className="flex flex-col sm:flex-row items-center space-y-1 sm:space-y-0 sm:space-x-1 pl-1 sm:pl-2">
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
                      className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-all"
                      title="Dosya ekle"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                      </svg>
                    </button>

                    {/* Voice Input */}
                    <button
                      className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-all"
                      title="Sesli mesaj"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                      </svg>
                    </button>

                    {/* Camera/Image */}
                    <button
                      className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-all"
                      title="Fotoğraf çek"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </button>
                  </div>

                  {/* Text Input Area - Auto-expanding, full width on mobile */}
                  <div className="flex-1 relative mx-2">
                    <textarea
                      ref={inputRef}
                      value={inputValue}
                      onChange={(e) => {
                        setInputValue(e.target.value);
                        const textarea = e.target;
                        textarea.style.height = 'auto';
                        textarea.style.height = Math.min(textarea.scrollHeight, 200) + 'px';
                      }}
                      onKeyPress={handleKeyPress}
                      placeholder="SeraGPT AI'ya mesajınızı yazın..."
                      className="w-full px-3 sm:px-4 py-3 bg-transparent border-none outline-none resize-none text-base placeholder-gray-400 leading-relaxed"
                      rows={1}
                      style={{ minHeight: '48px', maxHeight: '200px' }}
                    />
                  </div>

                  {/* Send Button - Inside input area */}
                  <div className="pr-1 sm:pr-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleSendMessage}
                      disabled={!inputValue.trim() || isTyping}
                      className={`p-2.5 rounded-xl font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
                        !inputValue.trim() || isTyping
                          ? 'bg-gray-200 text-gray-400'
                          : 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg hover:shadow-xl'
                      }`}
                      title={isTyping ? 'AI yanıtlıyor...' : 'Mesaj gönder'}
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

                {/* Quick Actions Bar - Responsive, moved to bottom */}
                <div className="border-t border-gray-100 px-3 sm:px-4 py-2">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                    <div className="text-xs text-gray-400 text-center sm:text-left">
                      PDF • Word • Excel • DWG • Resim
                    </div>
                    <div className="text-xs text-gray-400 text-center sm:text-right">
                      Enter ile gönder, Shift+Enter ile yeni satır
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
