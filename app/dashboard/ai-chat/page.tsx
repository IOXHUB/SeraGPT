'use client';

import { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/lib/hooks/useAuth';
import ClientOnly from '@/components/ui/ClientOnly';

export const dynamic = 'force-dynamic';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  analysisType?: string;
  attachedReport?: any;
  suggestions?: string[];
  isDeepAnalysis?: boolean;
  confidence?: number;
  relatedReports?: any[];
}

interface UserReport {
  id: string;
  title: string;
  type: 'roi' | 'climate' | 'equipment' | 'market' | 'layout';
  status: 'completed' | 'processing' | 'pending';
  date: string;
  summary: string;
  key_findings: string[];
  confidence_score: number;
  data: any;
}

interface AnalysisContext {
  currentFocus?: string;
  relatedReports: UserReport[];
  suggestedActions: string[];
  knowledgeBase: any;
}

export default function AIChatPage() {
  const { user, loading, signOut } = useAuth();
  
  const [mounted, setMounted] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [analysisContext, setAnalysisContext] = useState<AnalysisContext>({
    relatedReports: [],
    suggestedActions: [],
    knowledgeBase: {}
  });
  const [selectedReports, setSelectedReports] = useState<string[]>([]);
  const [currentAnalysisType, setCurrentAnalysisType] = useState<string | null>(null);
  const [showReportsPanel, setShowReportsPanel] = useState(false);
  const [showSuggestionsPanel, setShowSuggestionsPanel] = useState(true);
  const [deepAnalysisMode, setDeepAnalysisMode] = useState(false);
  
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Mock user reports data with realistic analysis results
  const userReports: UserReport[] = [
    {
      id: 'roi_001',
      title: 'Antalya Domates Serası ROI Analizi',
      type: 'roi',
      status: 'completed',
      date: '2025-01-15',
      summary: '2,500 m² domates serası için %23.4 ROI, 3.2 yıl geri dönüş süresi',
      key_findings: [
        'Yıllık 180 ton üretim beklentisi',
        '₺1,250,000 toplam yatırım',
        '3.2 yıl geri dönüş süresi',
        'Düşük risk seviyesi'
      ],
      confidence_score: 89,
      data: {
        investment: 1250000,
        annual_revenue: 1547000,
        annual_cost: 850000,
        roi_percentage: 23.4,
        payback_period: 3.2,
        risk_level: 'low'
      }
    },
    {
      id: 'climate_001',
      title: 'Antalya İklim Uygunluk Analizi',
      type: 'climate',
      status: 'completed',
      date: '2025-01-14',
      summary: 'Antalya bölgesi domates üretimi için optimal iklim koşulları',
      key_findings: [
        'Yıl boyunca ideal sıcaklık aralığı',
        'Düşük don riski',
        'Yüksek güneş ışığı oranı',
        'Kontrollü nem koşulları gerekli'
      ],
      confidence_score: 94,
      data: {
        temperature_optimal: true,
        frost_risk: 'low',
        sunshine_hours: 2800,
        humidity_control_needed: true,
        overall_suitability: 'excellent'
      }
    },
    {
      id: 'equipment_001',
      title: '2,500 m² Sera Ekipman Analizi',
      type: 'equipment',
      status: 'completed',
      date: '2025-01-13',
      summary: 'Modern sera için kapsamlı ekipman listesi ve maliyet analizi',
      key_findings: [
        '₺245,000 toplam ekipman maliyeti',
        'Otomasyon sistemi önerili',
        'Enerji verimli ısıtma sistemi',
        '10 yıl garanti kapsamı'
      ],
      confidence_score: 91,
      data: {
        total_cost: 245000,
        automation_level: 'high',
        energy_efficiency: 'A+',
        warranty_period: 10,
        maintenance_cost_annual: 12000
      }
    },
    {
      id: 'market_001',
      title: 'Domates Pazar Analizi 2025',
      type: 'market',
      status: 'completed',
      date: '2025-01-12',
      summary: 'Domates pazarında yüksek talep, kararlı fiyatlar beklentisi',
      key_findings: [
        'Ortalama ₺8.5/kg satış fiyatı',
        'Yıllık %12 pazar büyümesi',
        'İhracat fırsatları mevcut',
        'Sezonsal fiyat dalgalanmaları'
      ],
      confidence_score: 87,
      data: {
        average_price: 8.5,
        market_growth: 12,
        export_potential: true,
        seasonal_variation: 0.25
      }
    },
    {
      id: 'layout_001',
      title: 'Modern Sera Yerleşim Planı',
      type: 'layout',
      status: 'completed',
      date: '2025-01-11',
      summary: 'Optimized 2,500 m² sera tasarımı, maksimum verimlilik odaklı',
      key_findings: [
        '32 adet 78 m² sıra düzenlemesi',
        '%15 alan verimliliği artışı',
        'Gelişmiş havalandırma sistemi',
        'Esnek modüler tasarım'
      ],
      confidence_score: 93,
      data: {
        total_rows: 32,
        row_area: 78,
        efficiency_improvement: 15,
        ventilation_rating: 'excellent',
        modularity: true
      }
    }
  ];

  // Analysis types with detailed capabilities
  const analysisTypes = {
    roi: {
      name: 'ROI Analizi',
      icon: '💰',
      description: 'Yatırım geri dönüş hesaplaması ve finansal projeksiyon',
      capabilities: [
        'Detaylı maliyet analizi',
        'Gelir projeksiyonları',
        'Risk değerlendirmesi',
        'Geri dönüş süresi hesaplama',
        'Nakit akış analizi'
      ]
    },
    climate: {
      name: 'İklim Analizi',
      icon: '🌡️',
      description: 'Bölgesel iklim uygunluğu ve çevresel faktörler',
      capabilities: [
        'Sıcaklık analizi',
        'Nem oranı değerlendirmesi',
        'Mevsimsel değişimler',
        'Risk faktörleri',
        'Optimizasyon önerileri'
      ]
    },
    equipment: {
      name: 'Ekipman Analizi',
      icon: '⚙️',
      description: 'Sera ekipmanları ve teknoloji önerileri',
      capabilities: [
        'Ekipman seçimi',
        'Maliyet optimizasyonu',
        'Teknoloji karşılaştırması',
        'Bakım planlaması',
        'Enerji verimliliği'
      ]
    },
    market: {
      name: 'Pazar Analizi',
      icon: '📈',
      description: 'Ürün pazarı ve fiyat analizi',
      capabilities: [
        'Fiyat trendleri',
        'Talep analizi',
        'Rekabet durumu',
        'İhracat fırsatları',
        'Sezonsal değişimler'
      ]
    },
    layout: {
      name: 'Yerleşim Planı',
      icon: '🏗️',
      description: 'Sera tasarımı ve yerleşim optimizasyonu',
      capabilities: [
        '2D/3D tasarım',
        'Alan optimizasyonu',
        'Havalandırma planı',
        'İş akışı düzeni',
        'Gelecek genişleme'
      ]
    }
  };

  // Smart suggestions based on analysis context
  const smartSuggestions = [
    {
      id: 'improve_roi',
      text: 'ROI analizi nasıl iyileştirilebilir?',
      type: 'roi',
      priority: 'high'
    },
    {
      id: 'climate_risks',
      text: 'İklim risklerini nasıl minimize edebiliriz?',
      type: 'climate',
      priority: 'medium'
    },
    {
      id: 'cost_optimization',
      text: 'Ekipman maliyetlerini düşürme yolları',
      type: 'equipment',
      priority: 'high'
    },
    {
      id: 'market_timing',
      text: 'En iyi hasat ve satış zamanlaması',
      type: 'market',
      priority: 'medium'
    },
    {
      id: 'efficiency_layout',
      text: 'Sera yerleşiminde verimlilik artırma',
      type: 'layout',
      priority: 'high'
    },
    {
      id: 'integrated_analysis',
      text: 'Tüm analizleri birleştirerek kapsamlı strateji geliştirir misin?',
      type: 'integrated',
      priority: 'high'
    }
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !loading && !user) {
      console.log('🚫 AI Chat access denied - redirecting to login');
      window.location.href = '/auth/login';
    }
  }, [user, loading, mounted]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  useEffect(() => {
    // Initialize with welcome message
    if (messages.length === 0 && userReports.length > 0) {
      const welcomeMessage: ChatMessage = {
        id: 'welcome',
        role: 'system',
        content: `Merhaba! Ben SeraGPT, sera tarımı konusunda uzmanlaşmış AI asistanınızım. 

${userReports.length} adet tamamlanmış analizinizi inceledim:
${userReports.map(r => `• ${r.title} (${r.confidence_score}% güvenilirlik)`).join('\n')}

Bu analizleriniz hakkında detaylı sorular sorabilir, geliştirilme önerilerim alabilir veya yeni analizler için yol haritası çizebiliriz.

**Size nasıl yardımcı olabilirim?**`,
        timestamp: new Date(),
        suggestions: smartSuggestions.slice(0, 3).map(s => s.text),
        relatedReports: userReports
      };
      setMessages([welcomeMessage]);
      setAnalysisContext({
        relatedReports: userReports,
        suggestedActions: smartSuggestions.map(s => s.text),
        knowledgeBase: {}
      });
    }
  }, [userReports.length, messages.length]);

  const getRelevantReports = (query: string): UserReport[] => {
    const queryLower = query.toLowerCase();
    return userReports.filter(report => 
      report.title.toLowerCase().includes(queryLower) ||
      report.summary.toLowerCase().includes(queryLower) ||
      report.key_findings.some(finding => 
        finding.toLowerCase().includes(queryLower)
      ) ||
      (queryLower.includes('roi') && report.type === 'roi') ||
      (queryLower.includes('iklim') && report.type === 'climate') ||
      (queryLower.includes('ekipman') && report.type === 'equipment') ||
      (queryLower.includes('pazar') && report.type === 'market') ||
      (queryLower.includes('yerleşim') && report.type === 'layout')
    );
  };

  const generateIntelligentResponse = (userInput: string): string => {
    const relevantReports = getRelevantReports(userInput);
    const inputLower = userInput.toLowerCase();

    // ROI related questions
    if (inputLower.includes('roi') || inputLower.includes('geri dönüş') || inputLower.includes('karlılık')) {
      const roiReport = userReports.find(r => r.type === 'roi');
      if (roiReport) {
        return `🎯 **ROI Analizi Değerlendirmesi**

Mevcut analizinize göre:
• **ROI Oranı:** %${roiReport.data.roi_percentage}
• **Geri Dönüş Süresi:** ${roiReport.data.payback_period} yıl
• **Risk Seviyesi:** ${roiReport.data.risk_level === 'low' ? 'Düşük' : 'Orta'}

**🚀 İyileştirme Önerileri:**
1. **Maliyet Optimizasyonu:** Ekipman maliyetlerini %10-15 düşürebiliriz
2. **Verim Artışı:** Layout optimizasyonu ile %8-12 verim artışı mümkün
3. **Pazar Avantajı:** İhracat fırsatları ile gelir %20 artırılabilir

Hangi alanı detaylandırmamı istersiniz?`;
      }
    }

    // Climate related questions
    if (inputLower.includes('iklim') || inputLower.includes('sıcaklık') || inputLower.includes('risk')) {
      const climateReport = userReports.find(r => r.type === 'climate');
      if (climateReport) {
        return `🌡️ **İklim Analizi Değerlendirmesi**

Antalya bölgesi analizinize göre:
• **Uygunluk Skoru:** %${climateReport.confidence_score}
• **Don Riski:** Düşük seviyede
• **Güneş Işığı:** ${climateReport.data.sunshine_hours} saat/yıl (Mükemmel)

**⚠️ Dikkat Edilmesi Gerekenler:**
1. **Nem Kontrolü:** Özellikle yaz aylarında kritik
2. **Havalandırma:** Yeterli hava sirkülasyonu şart
3. **Sezonsal Adaptasyon:** Kış ısıtma planlaması

**🎯 Optimizasyon Stratejileri:**
- Akıllı iklim kontrol sistemi (%15 enerji tasarrufu)
- Çift cam teknolojisi (İzolasyon artışı)
- Sensör tabanlı izleme sistemi

Hangi iklim faktörünü derinlemesine inceleyelim?`;
      }
    }

    // Equipment related questions
    if (inputLower.includes('ekipman') || inputLower.includes('teknoloji') || inputLower.includes('otomasyon')) {
      const equipmentReport = userReports.find(r => r.type === 'equipment');
      if (equipmentReport) {
        return `⚙️ **Ekipman Analizi Değerlendirmesi**

Mevcut ekipman planınız:
• **Toplam Maliyet:** ₺${equipmentReport.data.total_cost.toLocaleString()}
• **Otomasyon Seviyesi:** Yüksek
• **Enerji Sınıfı:** ${equipmentReport.data.energy_efficiency}
• **Garanti Süresi:** ${equipmentReport.data.warranty_period} yıl

**💡 Teknoloji Önerileri:**
1. **IoT Sensörleri:** Gerçek zamanlı izleme (%20 verim artışı)
2. **Hidroponik Sistem:** Su tasarrufu ve kalite artışı  
3. **LED Aydınlatma:** %40 enerji tasarrufu
4. **Robotik Sistemler:** İşçilik maliyeti optimizasyonu

**🔧 Maliyet Optimizasyonu:**
- Alternatif tedarikçi analizi (%10-15 tasarruf)
- Leasing vs satın alma karşılaştırması
- Devlet teşvik programları değerlendirmesi

Hangi ekipman kategorisini detaylandıralım?`;
      }
    }

    // Market related questions
    if (inputLower.includes('pazar') || inputLower.includes('fiyat') || inputLower.includes('satış')) {
      const marketReport = userReports.find(r => r.type === 'market');
      if (marketReport) {
        return `📈 **Pazar Analizi Değerlendirmesi**

Domates pazarı durumu:
• **Ortalama Fiyat:** ₺${marketReport.data.average_price}/kg
• **Pazar Büyümesi:** %${marketReport.data.market_growth}/yıl
• **İhracat Potansiyeli:** ${marketReport.data.export_potential ? 'Mevcut' : 'Sınırlı'}

**��� Satış Stratejileri:**
1. **Direkt Satış:** Market zincirleri ile anlaşma (%15 daha yüksek fiyat)
2. **İhracat:** AB pazarları için organik sertifikasyon
3. **Değer Katma:** İşlenmiş ürün alternavifleri
4. **Sezonsal Planlama:** Fiyat optimizasyonu için timing

**📊 Gelir Projeksiyonu:**
- Yıl 1: ₺${(180 * marketReport.data.average_price * 1000).toLocaleString()}
- Yıl 2: %${marketReport.data.market_growth} artış beklentisi
- İhracat ile %25 ek gelir potansiyeli

Hangi satış kanalını geliştirmek istersiniz?`;
      }
    }

    // Layout related questions
    if (inputLower.includes('yerleşim') || inputLower.includes('tasarım') || inputLower.includes('verimlilik')) {
      const layoutReport = userReports.find(r => r.type === 'layout');
      if (layoutReport) {
        return `🏗️ **Yerleşim Planı Değerlendirmesi**

Tasarım optimizasyonunuz:
• **Toplam Sıra:** ${layoutReport.data.total_rows} adet
• **Sıra Alanı:** ${layoutReport.data.row_area} m² (her biri)
• **Verimlilik Artışı:** %${layoutReport.data.efficiency_improvement}
• **Havalandırma:** ${layoutReport.data.ventilation_rating === 'excellent' ? 'Mükemmel' : 'İyi'}

**🎯 Optimizasyon Fırsatları:**
1. **Alan Kullanımı:** Dikey tarım alanları (%20 daha fazla üretim)
2. **İş Akışı:** Hasat ve bakım rotaları optimizasyonu
3. **Genişleme:** Modüler tasarım ile kolay büyüme
4. **Teknoloji Entegrasyonu:** Otomasyon sistemleri yerleşimi

**📐 Teknik Öneriler:**
- Koridor genişliği optimizasyonu
- İklim kontrol bölgelerinin planlanması
- Elektrik ve su altyapısı yerleşimi
- Gelecek teknoloji entegrasyonu hazırlığı

Hangi tasarım elementini detaylandıralım?`;
      }
    }

    // Integrated analysis questions
    if (inputLower.includes('bütün') || inputLower.includes('genel') || inputLower.includes('strateji') || inputLower.includes('kapsamlı')) {
      return `🎯 **Kapsamlı Sera Stratejisi Analizi**

Tüm analizlerinizi değerlendirerek:

**💼 Finansal Durum:**
• ROI: %23.4 (Çok iyi seviye)
• Geri dönüş: 3.2 yıl (Kabul edilebilir)
• Risk: Düşük seviye

**🌱 Operasyonel Değerlendirme:**
• İklim uygunluğu: %94 (Mükemmel)
• Teknoloji seviyesi: Yüksek
• Pazar pozisyonu: Güçlü

**🚀 Stratejik Öneriler:**

**1. Kısa Vadeli (6-12 ay):**
- Sera inşaatına başlama
- Ekipman tedarik sürecini başlatma
- Pazar kanallarını güvence altına alma

**2. Orta Vadeli (1-2 yıl):**
- Üretim optimizasyonu
- İhracat pazarlarına giriş
- Teknoloji güncellemeleri

**3. Uzun Vadeli (3-5 yıl):**
- Kapasite genişletme (%50 büyüme hedefi)
- Değer katma zinciri geliştirme
- Sürdürülebilirlik sertifikaları

**⚡ Acil Aksiyonlar:**
1. İnşaat ruhsatı başvurusu
2. Finansman kaynaklar��nın belirlenmesi
3. Ana ekipman tedarikçileri ile görüşme

Hangi stratejik alanı önceleyerek başlayalım?`;
    }

    // Default response for general questions
    return `🤖 Anladım! "${userInput}" konusunda size yardımcı olabilirim.

${relevantReports.length > 0 ? 
  `📊 **İlgili Analizleriniz:**\n${relevantReports.map(r => 
    `• ${r.title} (${r.confidence_score}% güvenilirlik)`
  ).join('\n')}\n\n` : ''
}

**💡 Size şunları önerebilirim:**
1. Belirli bir analiz türünü derinlemesine inceleyelim
2. Analizlerinizi karşılaştırmalı değerlendirelim  
3. Yeni analiz ihtiyaçlarınızı planlayelım
4. Operasyonel stratejinizi geliştirelim

Hangi konuda daha detaylı bilgi almak istersiniz?`;
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI processing time
    setTimeout(() => {
      const relevantReports = getRelevantReports(inputValue);
      const aiResponse = generateIntelligentResponse(inputValue);
      
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: aiResponse,
        timestamp: new Date(),
        confidence: 85 + Math.random() * 10,
        relatedReports: relevantReports,
        suggestions: smartSuggestions
          .filter(s => aiResponse.toLowerCase().includes(s.type))
          .slice(0, 3)
          .map(s => s.text),
        isDeepAnalysis: deepAnalysisMode
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    setTimeout(() => handleSendMessage(), 100);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleReportSelection = (reportId: string) => {
    setSelectedReports(prev => 
      prev.includes(reportId) 
        ? prev.filter(id => id !== reportId)
        : [...prev, reportId]
    );
  };

  const getReportTypeIcon = (type: string) => {
    return analysisTypes[type as keyof typeof analysisTypes]?.icon || '📊';
  };

  const getReportTypeColor = (type: string) => {
    const colors = {
      roi: 'from-green-400 to-emerald-600',
      climate: 'from-blue-400 to-cyan-600',
      equipment: 'from-purple-400 to-violet-600',
      market: 'from-orange-400 to-red-500',
      layout: 'from-indigo-400 to-purple-600'
    };
    return colors[type as keyof typeof colors] || 'from-gray-400 to-gray-600';
  };

  if (!loading && !user) {
    window.location.href = '/auth/login';
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#146448] to-[#0f4f37]">
        <div className="text-white text-lg">Yönlendiriliyor...</div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#146448] to-[#0f4f37]">
        <div className="text-white text-lg">🔐 Yükleniyor...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#146448] to-[#0f4f37]">
        <div className="text-white text-lg">Giriş yapmanız gerekiyor...</div>
      </div>
    );
  }

  return (
    <ClientOnly>
      <div className="min-h-screen bg-gradient-to-br from-[#146448] to-[#0f4f37]">
        {/* Professional Header */}
        <header className="bg-[#146448]/80 backdrop-blur-sm border-b border-white/10 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <button
                  onClick={() => window.location.href = '/dashboard'}
                  className="flex items-center space-x-3 text-white hover:text-[#baf200] transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  <span className="font-medium">Dashboard'a Dön</span>
                </button>
                <div className="h-6 w-px bg-white/20"></div>
                <h1 className="text-xl font-bold text-white">🤖 SeraGPT AI Asistan</h1>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setShowReportsPanel(!showReportsPanel)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      showReportsPanel 
                        ? 'bg-[#baf200] text-[#146448]' 
                        : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                  >
                    📊 Raporlarım ({userReports.length})
                  </button>
                  <button
                    onClick={() => setDeepAnalysisMode(!deepAnalysisMode)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      deepAnalysisMode 
                        ? 'bg-purple-600 text-white' 
                        : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                  >
                    🧠 Derin Analiz {deepAnalysisMode ? 'ON' : 'OFF'}
                  </button>
                </div>
                <div className="text-white text-sm">
                  <span className="opacity-70">Hoşgeldin, </span>
                  <span className="font-medium">{user?.email?.split('@')[0] || 'Kullanıcı'}</span>
                </div>
                <button
                  onClick={async () => {
                    await signOut();
                    window.location.href = '/auth/login';
                  }}
                  className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-sm rounded transition-colors"
                >
                  Çıkış
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Layout */}
        <div className="flex h-[calc(100vh-80px)]">
          
          {/* Reports Panel */}
          {showReportsPanel && (
            <aside className="w-80 bg-white/10 backdrop-blur-sm border-r border-white/10 overflow-y-auto">
              <div className="p-6">
                <h3 className="text-lg font-bold text-white mb-4">📊 Mevcut Raporlarım</h3>
                
                <div className="space-y-4">
                  {userReports.map((report) => (
                    <div
                      key={report.id}
                      className={`p-4 rounded-xl border cursor-pointer transition-all duration-300 ${
                        selectedReports.includes(report.id)
                          ? 'bg-white/20 border-[#baf200] ring-2 ring-[#baf200]/50'
                          : 'bg-white/5 border-white/20 hover:bg-white/10 hover:border-white/40'
                      }`}
                      onClick={() => toggleReportSelection(report.id)}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`w-10 h-10 bg-gradient-to-br ${getReportTypeColor(report.type)} rounded-lg flex items-center justify-center text-lg`}>
                          {getReportTypeIcon(report.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-white font-medium text-sm leading-tight">{report.title}</h4>
                          <p className="text-white/70 text-xs mt-1">{report.summary}</p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-white/60 text-xs">{report.date}</span>
                            <div className="flex items-center space-x-1">
                              <div className={`w-2 h-2 rounded-full ${
                                report.confidence_score >= 90 ? 'bg-green-400' :
                                report.confidence_score >= 75 ? 'bg-yellow-400' : 'bg-red-400'
                              }`}></div>
                              <span className="text-white/80 text-xs">{report.confidence_score}%</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {selectedReports.length > 0 && (
                  <div className="mt-6 p-4 bg-[#baf200]/20 rounded-xl border border-[#baf200]/30">
                    <h4 className="text-[#baf200] font-medium mb-2">Seçili Raporlar ({selectedReports.length})</h4>
                    <button
                      onClick={() => {
                        const selectedTitles = userReports
                          .filter(r => selectedReports.includes(r.id))
                          .map(r => r.title)
                          .join(', ');
                        setInputValue(`Bu raporları karşılaştırmalı analiz et: ${selectedTitles}`);
                      }}
                      className="w-full bg-[#baf200] text-[#146448] py-2 px-4 rounded-lg font-medium transition-colors hover:bg-[#baf200]/90"
                    >
                      Karşılaştırmalı Analiz Yap
                    </button>
                  </div>
                )}
              </div>
            </aside>
          )}

          {/* Chat Area */}
          <main className="flex-1 flex flex-col">
            
            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-4xl ${
                    message.role === 'user' 
                      ? 'bg-[#baf200] text-[#146448] rounded-2xl rounded-br-md' 
                      : message.role === 'system'
                      ? 'bg-white/10 text-white rounded-2xl border border-white/20'
                      : 'bg-white/10 text-white rounded-2xl rounded-bl-md'
                  } p-6 backdrop-blur-sm`}>
                    
                    {/* Message Header */}
                    {message.role === 'assistant' && (
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-2">
                          <span className="text-lg">🤖</span>
                          <span className="font-medium">SeraGPT</span>
                          {message.confidence && (
                            <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs">
                              {Math.round(message.confidence)}% güvenilirlik
                            </span>
                          )}
                          {message.isDeepAnalysis && (
                            <span className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded-full text-xs">
                              Derin Analiz
                            </span>
                          )}
                        </div>
                        <span className="text-xs opacity-60">
                          {message.timestamp.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    )}

                    {/* Message Content */}
                    <div className="prose prose-invert max-w-none">
                      <div className="whitespace-pre-wrap leading-relaxed">
                        {message.content}
                      </div>
                    </div>

                    {/* Related Reports */}
                    {message.relatedReports && message.relatedReports.length > 0 && (
                      <div className="mt-4 p-4 bg-white/10 rounded-xl border border-white/20">
                        <h5 className="font-medium mb-2 text-sm">📊 İlgili Raporlar</h5>
                        <div className="space-y-2">
                          {message.relatedReports.slice(0, 3).map((report) => (
                            <div key={report.id} className="flex items-center space-x-2 text-sm">
                              <span>{getReportTypeIcon(report.type)}</span>
                              <span className="font-medium">{report.title}</span>
                              <span className="px-2 py-1 bg-white/10 rounded text-xs">
                                {report.confidence_score}%
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Suggestions */}
                    {message.suggestions && message.suggestions.length > 0 && (
                      <div className="mt-4">
                        <h5 className="font-medium mb-3 text-sm">💡 Önerilen Sorular</h5>
                        <div className="flex flex-wrap gap-2">
                          {message.suggestions.map((suggestion, index) => (
                            <button
                              key={index}
                              onClick={() => handleSuggestionClick(suggestion)}
                              className="px-3 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm transition-colors border border-white/20 hover:border-white/40"
                            >
                              {suggestion}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white/10 backdrop-blur-sm text-white p-6 rounded-2xl rounded-bl-md border border-white/20">
                    <div className="flex items-center space-x-3">
                      <span className="text-lg">🤖</span>
                      <span className="font-medium">SeraGPT düşünüyor...</span>
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-[#baf200] rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-[#baf200] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-[#baf200] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggestions Panel */}
            {showSuggestionsPanel && messages.length <= 1 && (
              <div className="p-6 border-t border-white/10">
                <h4 className="text-white font-medium mb-4">🎯 Popüler Sorular</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {smartSuggestions.slice(0, 6).map((suggestion) => (
                    <button
                      key={suggestion.id}
                      onClick={() => handleSuggestionClick(suggestion.text)}
                      className="p-3 bg-white/10 hover:bg-white/20 rounded-xl text-left transition-colors border border-white/20 hover:border-white/40 group"
                    >
                      <div className="flex items-start space-x-3">
                        <span className="text-lg">{analysisTypes[suggestion.type as keyof typeof analysisTypes]?.icon || '🎯'}</span>
                        <div>
                          <p className="text-white text-sm font-medium group-hover:text-[#baf200] transition-colors">
                            {suggestion.text}
                          </p>
                          <span className={`inline-block mt-1 px-2 py-1 rounded text-xs ${
                            suggestion.priority === 'high' 
                              ? 'bg-red-500/20 text-red-400' 
                              : 'bg-yellow-500/20 text-yellow-400'
                          }`}>
                            {suggestion.priority === 'high' ? 'Yüksek Öncelik' : 'Orta Öncelik'}
                          </span>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Chat Input */}
            <footer className="p-6 border-t border-white/10">
              <div className="relative">
                <textarea
                  ref={inputRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="SeraGPT'ye sera analizi hakkında soru sorun... (Örn: 'ROI analizimi nasıl iyileştirebilirim?')"
                  className="w-full p-4 pr-20 bg-white/95 border border-white/30 rounded-2xl resize-none focus:ring-2 focus:ring-[#baf200] focus:border-[#baf200] text-[#146448] placeholder-[#146448]/60 min-h-[60px] max-h-32"
                  rows={2}
                />
                <div className="absolute right-3 bottom-3 flex items-center space-x-2">
                  {selectedReports.length > 0 && (
                    <span className="px-2 py-1 bg-[#baf200] text-[#146448] rounded-lg text-xs font-medium">
                      {selectedReports.length} rapor seçili
                    </span>
                  )}
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim()}
                    className="w-10 h-10 bg-[#baf200] hover:bg-[#baf200]/90 text-[#146448] rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                    </svg>
                  </button>
                </div>
              </div>
              
              {/* Input Help */}
              <div className="mt-3 flex items-center justify-between text-xs text-white/60">
                <span>Enter ile gönder, Shift+Enter ile yeni satır</span>
                <span>{userReports.length} rapor analizi tamamlandı</span>
              </div>
            </footer>

          </main>
        </div>
      </div>
    </ClientOnly>
  );
}
