'use client';

import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
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
  metadata?: {
    processingTime?: number;
    contextUsed?: string[];
    recommendationScore?: number;
    urgencyLevel?: 'low' | 'medium' | 'high' | 'critical';
    actionItems?: string[];
    nextSteps?: string[];
  };
}

interface UserReport {
  id: string;
  title: string;
  type: 'roi' | 'climate' | 'equipment' | 'market' | 'layout' | 'financial' | 'risk' | 'sustainability';
  status: 'completed' | 'processing' | 'pending' | 'error' | 'draft';
  date: string;
  summary: string;
  key_findings: string[];
  confidence_score: number;
  data: any;
  priority?: 'low' | 'medium' | 'high' | 'critical';
  tags?: string[];
  lastUpdated?: string;
  dependencies?: string[];
}

interface AnalysisContext {
  currentFocus?: string;
  relatedReports: UserReport[];
  suggestedActions: string[];
  knowledgeBase: any;
  conversationHistory: ChatMessage[];
  userPreferences: {
    analysisDepth: 'basic' | 'advanced' | 'expert';
    responseStyle: 'concise' | 'detailed' | 'technical';
    notifications: boolean;
    autoSuggest: boolean;
  };
  sessionMetrics: {
    messagesCount: number;
    analysisRequests: number;
    lastActivity: Date;
    sessionDuration: number;
  };
}

interface ChatSession {
  id: string;
  title: string;
  messages: ChatMessage[];
  createdAt: Date;
  lastUpdated: Date;
  tags: string[];
  summary?: string;
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
    knowledgeBase: {},
    conversationHistory: [],
    userPreferences: {
      analysisDepth: 'advanced',
      responseStyle: 'detailed',
      notifications: true,
      autoSuggest: true
    },
    sessionMetrics: {
      messagesCount: 0,
      analysisRequests: 0,
      lastActivity: new Date(),
      sessionDuration: 0
    }
  });
  
  const [selectedReports, setSelectedReports] = useState<string[]>([]);
  const [currentAnalysisType, setCurrentAnalysisType] = useState<string | null>(null);
  const [showReportsPanel, setShowReportsPanel] = useState(false);
  const [showSuggestionsPanel, setShowSuggestionsPanel] = useState(true);
  const [deepAnalysisMode, setDeepAnalysisMode] = useState(true);
  const [showAdvancedSettings, setShowAdvancedSettings] = useState(false);
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string>('default');
  const [showSessionManager, setShowSessionManager] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterByType, setFilterByType] = useState<string>('all');
  
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const sessionStartTime = useRef<Date>(new Date());

  // Enhanced mock user reports with more sophisticated data
  const userReports: UserReport[] = useMemo(() => [
    {
      id: 'roi_001',
      title: 'Antalya Domates Serası ROI Analizi',
      type: 'roi',
      status: 'completed',
      date: '2025-01-15',
      lastUpdated: '2025-01-15T14:30:00Z',
      summary: '2,500 m² domates serası için %23.4 ROI, 3.2 yıl geri dönüş süresi',
      key_findings: [
        'Yıllık 180 ton üretim beklentisi',
        '₺1,250,000 toplam yatırım',
        '3.2 yıl geri dönüş süresi',
        'Düşük risk seviyesi',
        '%15 kar marjı projeksiyonu'
      ],
      confidence_score: 89,
      priority: 'high',
      tags: ['karlılık', 'yatırım', 'domates', 'sera'],
      data: {
        investment: 1250000,
        annual_revenue: 1547000,
        annual_cost: 850000,
        roi_percentage: 23.4,
        payback_period: 3.2,
        risk_level: 'low',
        profit_margin: 15,
        break_even_month: 18,
        npv: 892000,
        irr: 28.7
      }
    },
    {
      id: 'climate_001',
      title: 'Antalya İklim Uygunluk Analizi',
      type: 'climate',
      status: 'completed',
      date: '2025-01-14',
      lastUpdated: '2025-01-14T16:45:00Z',
      summary: 'Antalya bölgesi domates üretimi için optimal iklim koşulları',
      key_findings: [
        'Yıl boyunca ideal sıcaklık aralığı (15-28°C)',
        'Düşük don riski (%5 olasılık)',
        'Yüksek güneş ışığı oranı (2,800 saat/yıl)',
        'Kontrollü nem koşulları gerekli (60-70%)',
        'Mevsimsel rüzgar analizi tamamlandı'
      ],
      confidence_score: 94,
      priority: 'medium',
      tags: ['iklim', 'çevre', 'sürdürülebilirlik', 'risk'],
      data: {
        temperature_optimal: true,
        frost_risk: 5,
        sunshine_hours: 2800,
        humidity_optimal_range: [60, 70],
        overall_suitability: 'excellent',
        seasonal_variations: {
          spring: 'optimal',
          summer: 'good_with_cooling',
          autumn: 'excellent',
          winter: 'heating_required'
        },
        climate_resilience_score: 87
      }
    },
    {
      id: 'equipment_001',
      title: '2,500 m² Sera Ekipman Analizi',
      type: 'equipment',
      status: 'completed',
      date: '2025-01-13',
      lastUpdated: '2025-01-13T12:20:00Z',
      summary: 'Modern sera için kapsamlı ekipman listesi ve maliyet analizi',
      key_findings: [
        '₺245,000 toplam ekipman maliyeti',
        'Otomasyon sistemi önerili (ROI: 2.1 yıl)',
        'Enerji verimli ısıtma sistemi (A+ sınıfı)',
        '10 yıl garanti kapsamı mevcut',
        'IoT sensör entegrasyonu planlandı'
      ],
      confidence_score: 91,
      priority: 'high',
      tags: ['teknoloji', 'otomasyon', 'verimlilik', 'maliyet'],
      data: {
        total_cost: 245000,
        automation_level: 'high',
        energy_efficiency: 'A+',
        warranty_period: 10,
        maintenance_cost_annual: 12000,
        equipment_categories: {
          climate_control: 85000,
          irrigation: 45000,
          automation: 65000,
          monitoring: 25000,
          infrastructure: 25000
        },
        technology_readiness: 95,
        upgrade_potential: 'excellent'
      }
    },
    {
      id: 'market_001',
      title: 'Domates Pazar Analizi 2025',
      type: 'market',
      status: 'completed',
      date: '2025-01-12',
      lastUpdated: '2025-01-12T10:15:00Z',
      summary: 'Domates pazarında yüksek talep, kararlı fiyatlar beklentisi',
      key_findings: [
        'Ortalama ₺8.5/kg satış fiyatı (spot pazar)',
        'Yıllık %12 pazar büyümesi trend',
        'İhracat fırsatları mevcut (AB pazarları)',
        'Sezonsal fiyat dalgalanmaları ±%25',
        'Organik domates primi %40'
      ],
      confidence_score: 87,
      priority: 'medium',
      tags: ['pazar', 'fiyat', 'ihracat', 'trend'],
      data: {
        average_price: 8.5,
        market_growth: 12,
        export_potential: true,
        seasonal_variation: 0.25,
        organic_premium: 40,
        market_segments: {
          fresh_market: 60,
          processing: 25,
          export: 15
        },
        price_forecasts: {
          q1_2025: 9.2,
          q2_2025: 7.8,
          q3_2025: 8.9,
          q4_2025: 9.5
        },
        competition_level: 'moderate'
      }
    },
    {
      id: 'layout_001',
      title: 'Modern Sera Yerleşim Planı',
      type: 'layout',
      status: 'completed',
      date: '2025-01-11',
      lastUpdated: '2025-01-11T15:30:00Z',
      summary: 'Optimized 2,500 m² sera tasarımı, maksimum verimlilik odaklı',
      key_findings: [
        '32 adet 78 m² sıra düzenlemesi',
        '%15 alan verimliliği artışı',
        'Gelişmiş havalandırma sistemi tasarımı',
        'Esnek modüler tasarım yapısı',
        'Gelecek genişleme için hazır altyapı'
      ],
      confidence_score: 93,
      priority: 'high',
      tags: ['tasarım', 'verimlilik', 'planlama', 'altyapı'],
      data: {
        total_rows: 32,
        row_area: 78,
        efficiency_improvement: 15,
        ventilation_rating: 'excellent',
        modularity: true,
        expansion_ready: true,
        layout_optimization: {
          plant_density: 4.2,
          walkway_efficiency: 92,
          equipment_accessibility: 'excellent',
          harvest_workflow: 'optimized'
        },
        automation_compatibility: 98,
        maintenance_score: 87
      }
    },
    {
      id: 'financial_001',
      title: 'Kapsamlı Finansal Projeksiyon',
      type: 'financial',
      status: 'completed',
      date: '2025-01-10',
      lastUpdated: '2025-01-10T09:45:00Z',
      summary: '5 yıllık detaylı finansal model ve nakit akış analizi',
      key_findings: [
        '5 yıl toplam nakit akışı: ₺4.2 milyon',
        'Break-even point: 18. ay',
        'Finansman karışımı: %60 özkaynak, %40 kredi',
        'Hassasiyet analizi tamamlandı',
        'Monte Carlo simülasyonu yapıldı'
      ],
      confidence_score: 92,
      priority: 'critical',
      tags: ['finansman', 'nakit-akış', 'model', 'projeksiyon'],
      data: {
        total_cashflow_5y: 4200000,
        break_even_month: 18,
        financing_mix: { equity: 60, debt: 40 },
        sensitivity_analysis: 'completed',
        monte_carlo_runs: 10000,
        success_probability: 78,
        worst_case_scenario: -145000,
        best_case_scenario: 890000
      }
    },
    {
      id: 'risk_001',
      title: 'Kapsamlı Risk Değerlendirmesi',
      type: 'risk',
      status: 'completed',
      date: '2025-01-09',
      lastUpdated: '2025-01-09T13:20:00Z',
      summary: 'Operasyonel, finansal ve çevresel risk analizi',
      key_findings: [
        'Genel risk skoru: Düşük-Orta (3.2/10)',
        'En yüksek risk: Pazar fiyat dalgalanmaları',
        'Risk azaltma stratejileri geliştirildi',
        'Sigorta önerileri hazırlandı',
        'Acil durum planları oluşturuldu'
      ],
      confidence_score: 88,
      priority: 'high',
      tags: ['risk', 'sigorta', 'güvenlik', 'plan'],
      data: {
        overall_risk_score: 3.2,
        risk_categories: {
          market: 4.1,
          operational: 2.8,
          financial: 3.0,
          environmental: 2.5,
          regulatory: 2.2
        },
        mitigation_strategies: 12,
        insurance_recommendations: 5,
        contingency_plans: 8
      }
    },
    {
      id: 'sustainability_001',
      title: 'Sürdürülebilirlik ve Çevre Analizi',
      type: 'sustainability',
      status: 'processing',
      date: '2025-01-08',
      lastUpdated: '2025-01-08T11:10:00Z',
      summary: 'Çevre dostu sera tasarımı ve sürdürülebilirlik metrikleri',
      key_findings: [
        'Karbon ayak izi: %35 düşük (sektör ortalaması)',
        'Su tasarrufu: %40 verimlilik artışı',
        'Yenilenebilir enerji entegrasyonu mümkün',
        'Organik sertifikasyon uygunluğu',
        'Döngüsel ekonomi modeli uygulanabilir'
      ],
      confidence_score: 85,
      priority: 'medium',
      tags: ['sürdürülebilirlik', 'çevre', 'sertifikasyon', 'enerji'],
      data: {
        carbon_footprint_reduction: 35,
        water_efficiency_improvement: 40,
        renewable_energy_potential: 65,
        organic_certification_ready: true,
        circular_economy_score: 78,
        environmental_certifications: ['LEED', 'BREEAM', 'Organic'],
        biodiversity_impact: 'positive'
      }
    }
  ], []);

  // Enhanced analysis types with more capabilities
  const analysisTypes = useMemo(() => ({
    roi: {
      name: 'ROI & Karlılık Analizi',
      icon: '💰',
      description: 'Detaylı yatırım geri dönüş hesaplaması ve finansal projeksiyon',
      capabilities: [
        'NPV ve IRR hesaplaması',
        'Hassasiyet analizi',
        'Monte Carlo simülasyonu',
        'Break-even analizi',
        'Senaryo modelleme',
        'Risk ayarlamalı getiri'
      ],
      color: 'from-green-400 to-emerald-600'
    },
    climate: {
      name: 'İklim & Çevre Analizi',
      icon: '🌡️',
      description: 'Bölgesel iklim uygunluğu ve çevresel faktör değerlendirmesi',
      capabilities: [
        'Mikroiklim analizi',
        'İklim değişikliği etkisi',
        'Mevsimsel optimizasyon',
        'Afet riski değerlendirmesi',
        'Sürdürülebilirlik metrikleri',
        'Enerji verimliliği analizi'
      ],
      color: 'from-blue-400 to-cyan-600'
    },
    equipment: {
      name: 'Teknoloji & Ekipman',
      icon: '⚙️',
      description: 'Sera teknolojileri ve ekipman optimizasyonu',
      capabilities: [
        'IoT entegrasyonu',
        'Otomasyon sistemleri',
        'Toplam sahip olma maliyeti',
        'Teknoloji roadmap',
        'Vendor karşılaştırması',
        'Upgrade stratejisi'
      ],
      color: 'from-purple-400 to-violet-600'
    },
    market: {
      name: 'Pazar & Satış Analizi',
      icon: '📈',
      description: 'Ürün pazarı, fiyat trendleri ve satış stratejisi',
      capabilities: [
        'Dinamik fiyat modelleme',
        'Talep tahminleme',
        'Rekabet analizi',
        'İhracat fırsatları',
        'Değer zinciri analizi',
        'Müşteri segmentasyonu'
      ],
      color: 'from-orange-400 to-red-500'
    },
    layout: {
      name: 'Tasarım & Yerleşim',
      icon: '🏗️',
      description: 'Sera tasarımı ve yerleşim optimizasyonu',
      capabilities: [
        '3D modelleme',
        'İş akışı optimizasyonu',
        'Alan verimliliği',
        'Ergonomik tasarım',
        'Genişleme planlaması',
        'Maliyet optimizasyonu'
      ],
      color: 'from-indigo-400 to-purple-600'
    },
    financial: {
      name: 'Finansal Modelleme',
      icon: '📊',
      description: 'Kapsamlı finansal analiz ve projeksiyon',
      capabilities: [
        'Nakit akış modelleme',
        'Finansman optimizasyonu',
        'Vergi planlaması',
        'Yatırımcı sunumu',
        'Kredi değerlendirmesi',
        'Exit stratejisi'
      ],
      color: 'from-teal-400 to-green-600'
    },
    risk: {
      name: 'Risk Yönetimi',
      icon: '🛡️',
      description: 'Kapsamlı risk analizi ve yönetim stratejileri',
      capabilities: [
        'Risk matris analizi',
        'Stres testleri',
        'Sigorta optimizasyonu',
        'Acil durum planları',
        'Compliance kontrolleri',
        'Hedging stratejileri'
      ],
      color: 'from-red-400 to-pink-600'
    },
    sustainability: {
      name: 'Sürdürülebilirlik',
      icon: '🌱',
      description: 'Çevre dostu tarım ve sürdürülebilirlik analizi',
      capabilities: [
        'Karbon ayak izi hesaplama',
        'Su kullanım optimizasyonu',
        'Yenilenebilir enerji entegrasyonu',
        'Sertifikasyon yol haritası',
        'Döngüsel ekonomi modeli',
        'ESG raporlaması'
      ],
      color: 'from-lime-400 to-green-500'
    }
  }), []);

  // Enhanced smart suggestions with priority and context
  const smartSuggestions = useMemo(() => [
    {
      id: 'integrated_optimization',
      text: 'Tüm analizleri entegre ederek optimizasyon fırsatlarını belirle',
      type: 'integrated',
      priority: 'critical',
      context: 'comprehensive',
      estimatedTime: '15-20 dakika'
    },
    {
      id: 'roi_sensitivity',
      text: 'ROI hassasiyet analizi ile kritik değişkenleri belirle',
      type: 'roi',
      priority: 'high',
      context: 'financial',
      estimatedTime: '8-12 dakika'
    },
    {
      id: 'climate_resilience',
      text: 'İklim değişikliği senaryolarında dayanıklılık stratejisi geliştir',
      type: 'climate',
      priority: 'high',
      context: 'sustainability',
      estimatedTime: '10-15 dakika'
    },
    {
      id: 'technology_roadmap',
      text: '5 yıllık teknoloji upgrade roadmap oluştur',
      type: 'equipment',
      priority: 'medium',
      context: 'strategic',
      estimatedTime: '12-18 dakika'
    },
    {
      id: 'market_penetration',
      text: 'Pazar penetrasyon stratejisi ve büyüme planı hazırla',
      type: 'market',
      priority: 'high',
      context: 'growth',
      estimatedTime: '10-15 dakika'
    },
    {
      id: 'layout_automation',
      text: 'Sera layoutunu otomasyon sistemleri için optimize et',
      type: 'layout',
      priority: 'medium',
      context: 'efficiency',
      estimatedTime: '8-12 dakika'
    },
    {
      id: 'financial_scenarios',
      text: 'Farklı finansman senaryolarını karşılaştır',
      type: 'financial',
      priority: 'high',
      context: 'planning',
      estimatedTime: '15-20 dakika'
    },
    {
      id: 'risk_mitigation',
      text: 'En yüksek riskler için detaylı azaltma stratejileri geliştir',
      type: 'risk',
      priority: 'critical',
      context: 'security',
      estimatedTime: '12-18 dakika'
    },
    {
      id: 'sustainability_certification',
      text: 'Sürdürülebilirlik sertifikasyon yol haritası hazırla',
      type: 'sustainability',
      priority: 'medium',
      context: 'compliance',
      estimatedTime: '10-15 dakika'
    },
    {
      id: 'investment_presentation',
      text: 'Yatırımcı sunumu için profesyonel pitch deck hazırla',
      type: 'integrated',
      priority: 'high',
      context: 'investment',
      estimatedTime: '20-30 dakika'
    }
  ], []);

  // Enhanced response generation with deeper intelligence
  const generateIntelligentResponse = useCallback((userInput: string, context: AnalysisContext): {
    content: string;
    metadata: any;
    suggestions: string[];
    relatedReports: UserReport[];
  } => {
    const relevantReports = userReports.filter(report => {
      const inputLower = userInput.toLowerCase();
      return (
        report.title.toLowerCase().includes(inputLower) ||
        report.summary.toLowerCase().includes(inputLower) ||
        report.key_findings.some(finding => finding.toLowerCase().includes(inputLower)) ||
        report.tags?.some(tag => inputLower.includes(tag)) ||
        (inputLower.includes('roi') && report.type === 'roi') ||
        (inputLower.includes('iklim') && report.type === 'climate') ||
        (inputLower.includes('ekipman') && report.type === 'equipment') ||
        (inputLower.includes('pazar') && report.type === 'market') ||
        (inputLower.includes('yerleşim') && report.type === 'layout') ||
        (inputLower.includes('finansal') && report.type === 'financial') ||
        (inputLower.includes('risk') && report.type === 'risk') ||
        (inputLower.includes('sürdürülebilir') && report.type === 'sustainability')
      );
    });

    const inputLower = userInput.toLowerCase();
    let urgencyLevel: 'low' | 'medium' | 'high' | 'critical' = 'medium';
    let processingTime = 1500 + Math.random() * 1000;
    let contextUsed: string[] = [];
    let actionItems: string[] = [];
    let nextSteps: string[] = [];

    // Advanced pattern matching and response generation
    if (inputLower.includes('entegre') || inputLower.includes('bütün') || inputLower.includes('kapsamlı') || inputLower.includes('strateji')) {
      urgencyLevel = 'high';
      processingTime = 2500;
      contextUsed = ['all_reports', 'market_data', 'financial_model'];
      
      actionItems = [
        'Finansal model güncellemesi',
        'Risk azaltma planı implementasyonu',
        'Teknoloji roadmap revizyonu',
        'Pazar stratejisi optimizasyonu'
      ];
      
      nextSteps = [
        'Detaylı implementasyon planı hazırlama',
        'Stakeholder sunumu düzenleme',
        'Pilot uygulama başlatma',
        'Performans metrikleri belirleme'
      ];

      return {
        content: `🎯 **Kapsamlı Sera İşletmesi Stratejik Analizi**

📊 **Mevcut Durum Değerlendirmesi:**
Toplam ${userReports.length} analiz incelenerek, sera işletmenizin 360° değerlendirmesi tamamlandı.

**🏆 Güçlü Yönleriniz:**
• **ROI Performansı:** %23.4 ROI ile sektör ortalamasının üzerinde
• **İklim Uygunluğu:** %94 uygunluk skoru ile mükemmel koşullar
• **Teknoloji Hazırlığı:** %95 teknoloji readiness seviyesi
• **Pazar Konumu:** Büyüyen pazarda güçlü pozisyon

**⚠️ Optimize Edilebilir Alanlar:**
• **Maliyet Verimliliği:** Ekipman maliyetlerinde %12-15 optimizasyon potansiyeli
• **Sürdürülebilirlik:** Karbon ayak izi %20 daha düşürülebilir
• **Otomasyon:** İşçilik maliyetlerinde %25 tasarruf fırsatı
• **Pazar Çeşitlendirme:** İhracat ile %30 gelir artış potansiyeli

**🚀 Stratejik Öneriler (Öncelik Sırası):**

**1. KISA VADELİ (0-6 Ay) - KRİTİK PRİORİTE**
• **Finansman Finalizasyonu:** ₺1.25M yatırım için optimal kaynak karışımı
• **Teknoloji Seçimi:** IoT ve otomasyon sistemleri için vendor seçimi
• **Pazar Anlaşmaları:** Sabit fiyat kontratları ile risk azaltma
• **Ruhsat Süreçleri:** İnşaat ve işletme ruhsatları için başvuru

**2. ORTA VADELİ (6-18 Ay) - YÜKSEK PRİORİTE**
• **İnşaat ve Kurulum:** Modüler yaklaşımla risk minimizasyonu
• **Sertifikasyon Süreçleri:** Organik ve sürdürülebilirlik sertifikaları
• **Pazarlama Stratejisi:** Marka konumlandırma ve kanal geliştirme
• **Operasyonel Hazırlık:** Personel eğitimi ve süreç optimizasyonu

**3. UZUN VADELİ (18+ Ay) - BÜYÜME ODAKLI**
• **Kapasite Genişletme:** %50 büyüme hedefi ile 2. faz planlaması
• **Değer Katma:** İşlenmiş ürün hatları geliştirme
• **İhracat Geliştirme:** AB pazarlarına sistemli giriş
• **AR-GE Yatırımları:** Yeni çeşit ve teknoloji geliştirme

**💡 KRİTİK BAŞARI FAKTÖRLERİ:**
1. **Maliyet Disiplini:** Bütçe kontrolü ve varyans analizi
2. **Kalite Standartları:** Uluslararası standartlarda üretim
3. **Teknoloji Entegrasyonu:** Veri odaklı karar verme
4. **İnsan Kaynakları:** Uzman ekip oluşturma
5. **Risk Yönetimi:** Proaktif risk azaltma

**📈 Beklenen Sonuçlar (5 Yıl):**
• **Toplam Gelir:** ₺12.5 milyon (kümülatif)
• **Net Kar:** ₺4.2 milyon
• **ROI:** %28.7 (yıllık ortalama)
• **Pazar Payı:** Bölgesel liderlik pozisyonu
• **Sürdürülebilirlik:** Net pozitif çevresel etki

Hangi stratejik alanı detaylandırmamı istersiniz?`,
        metadata: {
          processingTime,
          contextUsed,
          recommendationScore: 94,
          urgencyLevel,
          actionItems,
          nextSteps
        },
        suggestions: [
          'Finansman stratejisini detaylandır',
          'Risk azaltma planını geliştir',
          'Teknoloji roadmap hazırla',
          'Pazarlama stratejisi oluştur',
          'Sürdürülebilirlik planını optimize et'
        ],
        relatedReports: userReports
      };
    }

    // ROI and Financial Analysis
    if (inputLower.includes('roi') || inputLower.includes('karlılık') || inputLower.includes('geri dönüş') || inputLower.includes('finansal')) {
      const roiReport = userReports.find(r => r.type === 'roi');
      const financialReport = userReports.find(r => r.type === 'financial');
      
      urgencyLevel = 'high';
      contextUsed = ['roi_analysis', 'financial_model', 'market_data'];
      
      actionItems = [
        'NPV hesaplama revizyonu',
        'Hassasiyet analizi güncellemesi',
        'Finansman karışımı optimizasyonu',
        'Break-even analizi detaylandırma'
      ];

      return {
        content: `💰 **Gelişmiş ROI & Finansal Analiz**

📊 **Mevcut Finansal Durum:**
• **Ana ROI:** %23.4 (Sektör ort. %18.2)
• **NPV:** ₺${roiReport?.data.npv.toLocaleString()} (5 yıl)
• **IRR:** %${roiReport?.data.irr} (Hedef: %20+)
• **Geri Dönüş:** ${roiReport?.data.payback_period} yıl

**🎯 Finansal Optimizasyon Fırsatları:**

**1. Maliyet Azaltma (%12-18 iyileşme potansiyeli):**
• **Ekipman:** Leasing vs satın alma analizi (₺35K tasarruf)
• **Enerji:** Solar entegrasyon ile %30 enerji maliyet düşüşü
• **İşçilik:** Otomasyon ile %25 operasyonel maliyet azaltma
• **Finansman:** Alternatif kaynaklar ile faiz maliyet optimizasyonu

**2. Gelir Artışı (%20-35 büyüme potansiyeli):**
• **Premium Pazarlama:** Organik sertifikasyon ile %40 fiyat primi
• **Kanal Diversifikasyonu:** B2B kontratlar ile stabil gelir
• **İhracat:** AB pazarları için %25 ek gelir fırsatı
• **Değer Katma:** İşlenmiş ürünler ile %60 marj artışı

**📈 Gelişmiş Finansal Senaryolar:**

**🟢 Optimistik Senaryo (Olasılık: %25)**
• ROI: %32.1 • NPV: ₺1.24M • Geri Dönüş: 2.6 yıl

**🟡 Temel Senaryo (Olasılık: %50)**
• ROI: %23.4 • NPV: ₺892K • Geri Dönüş: 3.2 yıl

**🟠 Konservatif Senaryo (Olasılık: %25)**
• ROI: %16.8 • NPV: ₺545K • Geri Dönüş: 4.1 yıl

**⚡ Hızlı Aksiyon Önerileri:**
1. **Finansman Miksi:** %70 özkaynak + %30 kredi (optimal)
2. **Vergi Optimizasyonu:** Yatırım teşvikleri değerlendirmesi
3. **Nakit Akış:** İlk 2 yıl için ₺180K rezerv fonu
4. **Exit Stratejisi:** 7-10 yıl sonra sat��ş/büyüme seçenekleri

**🔍 Hassasiyet Analizi Sonuçları:**
• **En Kritik Değişken:** Satış fiyatı (%1 değişim = %3.2 ROI etkisi)
• **İkinci Etken:** Üretim verimi (%1 değişim = %2.1 ROI etkisi)
• **Üçüncü Etken:** Operasyonel maliyet (%1 değişim = %1.8 ROI etkisi)

Hangi finansal alanı derinlemesine analiz edelim?`,
        metadata: {
          processingTime,
          contextUsed,
          recommendationScore: 91,
          urgencyLevel,
          actionItems,
          nextSteps: [
            'Finansman kaynaklarını araştır',
            'Vergi danışmanı ile görüş',
            'Yatırım teşvikleri başvurusu',
            'Bankalar ile kredi görüşmeleri'
          ]
        },
        suggestions: [
          'Hassasiyet analizini detaylandır',
          'Finansman seçeneklerini karşılaştır',
          'Monte Carlo simülasyonu çalıştır',
          'Vergi optimizasyon stratejisi geliştir'
        ],
        relatedReports: relevantReports
      };
    }

    // Default enhanced response
    return {
      content: `🤖 **Anlıyorum!** "${userInput}" konusunda size detaylı yardımcı olabilirim.

${relevantReports.length > 0 ? 
  `📊 **İlgili Analizleriniz (${relevantReports.length} adet):**\n${relevantReports.map(r => 
    `• ${r.title} - **%${r.confidence_score}** güvenilirlik - **${r.priority}** öncelik`
  ).join('\n')}\n\n` : ''
}

**🎯 Size Özel Önerilerim:**
1. **Detaylı Analiz:** Belirli bir raporu derinlemesine inceleyelim
2. **Karşılaştırmalı Değerlendirme:** Analizlerinizi entegre edelim
3. **Optimizasyon Fırsatları:** İyileştirme noktalarını belirleyelim
4. **Aksiyon Planı:** Somut adımlar geliştirelim

**💡 Popüler Sorular:**
• "ROI analizimi nasıl iyileştirebilirim?"
• "En büyük risklerim neler ve nasıl azaltırım?"
• "Teknoloji yatırımlarım hangi öncelik sırasında?"
• "Sürdürülebilirlik sertifikası için ne yapmalıyım?"

Hangi konuda daha ayrıntılı bilgi almak istersiniz?`,
      metadata: {
        processingTime,
        contextUsed: ['user_input', 'available_reports'],
        recommendationScore: 75,
        urgencyLevel,
        actionItems: ['Konu odağı belirleme', 'Analiz derinliği seçimi'],
        nextSteps: ['Detaylı soru sorma', 'Spesifik analiz talep etme']
      },
      suggestions: [
        'Bütüncül strateji geliştir',
        'En yüksek ROI fırsatlarını belirle',
        'Risk azaltma planı hazırla',
        'Teknoloji roadmap oluştur'
      ],
      relatedReports: relevantReports
    };
  }, [userReports]);

  // Initialize component
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !loading && !user) {
      window.location.href = '/auth/login';
    }
  }, [user, loading, mounted]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Initialize with enhanced welcome message
  useEffect(() => {
    if (messages.length === 0 && userReports.length > 0) {
      const welcomeMessage: ChatMessage = {
        id: 'welcome',
        role: 'system',
        content: `🎉 **SeraGPT'ye Hoşgeldiniz!** 

Ben sera tarımında uzmanlaşmış, gelişmiş AI asistanınızım. **${userReports.length} adet** tamamlanmış analizinizi inceledim ve size özel öneriler hazırladım.

**📊 Analiz Portföyünüz:**
${userReports.map(r => {
  const typeInfo = analysisTypes[r.type];
  return `${typeInfo?.icon || '📊'} **${r.title}**\n   └ %${r.confidence_score} güvenilirlik • ${r.priority} öncelik • ${r.status}`;
}).join('\n')}

**🎯 Size Nasıl Yardımcı Olabilirim:**
• **Strategik Planlama:** Bütüncül iş stratejisi geliştirme
• **Finansal Optimizasyon:** ROI artırma ve maliyet düşürme
• **Risk Yönetimi:** Kapsamlı risk analizi ve azaltma planları
• **Teknoloji Roadmap:** Akıllı sera teknolojileri planlaması
• **Sürdürülebilirlik:** Çevre dostu ve sertifikalı üretim stratejileri

**💡 Hızlı Başlangıç:**
Aşağıdaki önerilerden birini seçebilir veya kendi sorunuzu sorabilirsiniz.`,
        timestamp: new Date(),
        suggestions: smartSuggestions.slice(0, 4).map(s => s.text),
        relatedReports: userReports,
        metadata: {
          processingTime: 0,
          contextUsed: ['all_reports', 'user_profile'],
          recommendationScore: 100,
          urgencyLevel: 'low',
          actionItems: ['Öncelik belirleme', 'İlk analiz seçimi'],
          nextSteps: ['Detaylı soru sorma', 'Analiz raporu seçme']
        }
      };
      
      setMessages([welcomeMessage]);
      setAnalysisContext(prev => ({
        ...prev,
        relatedReports: userReports,
        suggestedActions: smartSuggestions.map(s => s.text),
        conversationHistory: [welcomeMessage]
      }));
    }
  }, [userReports.length, messages.length, smartSuggestions, analysisTypes]);

  // Enhanced message handling
  const handleSendMessage = useCallback(async () => {
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

    // Update session metrics
    setAnalysisContext(prev => ({
      ...prev,
      sessionMetrics: {
        ...prev.sessionMetrics,
        messagesCount: prev.sessionMetrics.messagesCount + 1,
        lastActivity: new Date(),
        sessionDuration: Date.now() - sessionStartTime.current.getTime()
      },
      conversationHistory: [...prev.conversationHistory, userMessage]
    }));

    // Simulate AI processing with enhanced intelligence
    setTimeout(() => {
      const response = generateIntelligentResponse(inputValue, analysisContext);
      
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.content,
        timestamp: new Date(),
        confidence: 85 + Math.random() * 10,
        relatedReports: response.relatedReports,
        suggestions: response.suggestions,
        isDeepAnalysis: deepAnalysisMode,
        metadata: response.metadata
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
      
      // Update context with new AI response
      setAnalysisContext(prev => ({
        ...prev,
        conversationHistory: [...prev.conversationHistory, aiMessage],
        sessionMetrics: {
          ...prev.sessionMetrics,
          analysisRequests: prev.sessionMetrics.analysisRequests + 1
        }
      }));
    }, response.metadata?.processingTime || 1500);
  }, [inputValue, analysisContext, deepAnalysisMode, generateIntelligentResponse]);

  const handleSuggestionClick = useCallback((suggestion: string) => {
    setInputValue(suggestion);
    setTimeout(() => handleSendMessage(), 100);
  }, [handleSendMessage]);

  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  }, [handleSendMessage]);

  const toggleReportSelection = useCallback((reportId: string) => {
    setSelectedReports(prev => 
      prev.includes(reportId) 
        ? prev.filter(id => id !== reportId)
        : [...prev, reportId]
    );
  }, []);

  const getReportTypeIcon = useCallback((type: string) => {
    return analysisTypes[type as keyof typeof analysisTypes]?.icon || '📊';
  }, [analysisTypes]);

  const getReportTypeColor = useCallback((type: string) => {
    return analysisTypes[type as keyof typeof analysisTypes]?.color || 'from-gray-400 to-gray-600';
  }, [analysisTypes]);

  const filteredReports = useMemo(() => {
    return userReports.filter(report => {
      const matchesSearch = searchQuery === '' || 
        report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        report.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        report.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesType = filterByType === 'all' || report.type === filterByType;
      
      return matchesSearch && matchesType;
    });
  }, [userReports, searchQuery, filterByType]);

  // Loading states
  if (!loading && !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#146448] to-[#0f4f37]">
        <div className="text-white text-lg">🔄 Yönlendiriliyor...</div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#146448] to-[#0f4f37]">
        <div className="text-white text-lg">🔐 Sistem Yükleniyor...</div>
      </div>
    );
  }

  return (
    <ClientOnly>
      <div className="min-h-screen bg-gradient-to-br from-[#146448] via-[#0f4f37] to-[#0a3d2e]">
        
        {/* Advanced Header */}
        <header className="bg-[#146448]/90 backdrop-blur-md border-b border-white/20 sticky top-0 z-50 shadow-2xl">
          <div className="max-w-[1700px] mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <button
                  onClick={() => window.location.href = '/dashboard'}
                  className="flex items-center space-x-3 text-white hover:text-[#baf200] transition-all duration-300 group"
                >
                  <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  <span className="font-medium">Dashboard</span>
                </button>
                <div className="h-6 w-px bg-white/30"></div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#baf200] to-[#8fd600] rounded-xl flex items-center justify-center text-xl">
                    🤖
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-white">SeraGPT AI Asistan</h1>
                    <div className="flex items-center space-x-2 text-sm text-white/70">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span>Gelişmiş Analiz Modu</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setShowReportsPanel(!showReportsPanel)}
                    className={`relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                      showReportsPanel 
                        ? 'bg-[#baf200] text-[#146448] shadow-lg shadow-[#baf200]/30' 
                        : 'bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm'
                    }`}
                  >
                    📊 Raporlarım
                    <span className="ml-2 px-2 py-1 bg-white/20 rounded-full text-xs">
                      {userReports.length}
                    </span>
                  </button>
                  
                  <button
                    onClick={() => setDeepAnalysisMode(!deepAnalysisMode)}
                    className={`relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                      deepAnalysisMode 
                        ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30' 
                        : 'bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm'
                    }`}
                  >
                    🧠 Derin Analiz
                    <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                      deepAnalysisMode ? 'bg-white/20' : 'bg-white/10'
                    }`}>
                      {deepAnalysisMode ? 'ON' : 'OFF'}
                    </span>
                  </button>

                  <button
                    onClick={() => setShowAdvancedSettings(!showAdvancedSettings)}
                    className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all duration-300 backdrop-blur-sm"
                    title="Gelişmiş Ayarlar"
                  >
                    ⚙️
                  </button>
                </div>
                
                <div className="h-6 w-px bg-white/30"></div>
                
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <div className="text-white text-sm font-medium">
                      {user?.email?.split('@')[0] || 'Kullanıcı'}
                    </div>
                    <div className="text-white/60 text-xs">
                      {analysisContext.sessionMetrics.messagesCount} mesaj • {Math.floor(analysisContext.sessionMetrics.sessionDuration / 60000)} dk
                    </div>
                  </div>
                  <button
                    onClick={async () => {
                      await signOut();
                      window.location.href = '/auth/login';
                    }}
                    className="px-3 py-2 bg-red-600/90 hover:bg-red-700 text-white text-sm rounded-xl transition-all duration-300 backdrop-blur-sm"
                  >
                    Çıkış
                  </button>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Layout */}
        <div className="flex h-[calc(100vh-80px)]">
          
          {/* Enhanced Reports Panel */}
          {showReportsPanel && (
            <aside className="w-96 bg-white/5 backdrop-blur-md border-r border-white/20 overflow-hidden flex flex-col">
              
              {/* Panel Header */}
              <div className="p-6 border-b border-white/20">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-white">📊 Analiz Portföyüm</h3>
                  <button
                    onClick={() => setShowReportsPanel(false)}
                    className="p-1 text-white/60 hover:text-white transition-colors"
                  >
                    ✕
                  </button>
                </div>
                
                {/* Search and Filter */}
                <div className="space-y-3">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Raporlarda ara..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:ring-2 focus:ring-[#baf200] focus:border-[#baf200] transition-all"
                    />
                    <svg className="absolute left-3 top-2.5 w-4 h-4 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  
                  <select
                    value={filterByType}
                    onChange={(e) => setFilterByType(e.target.value)}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-xl text-white focus:ring-2 focus:ring-[#baf200] focus:border-[#baf200] transition-all"
                  >
                    <option value="all">Tüm Analizler</option>
                    {Object.entries(analysisTypes).map(([key, type]) => (
                      <option key={key} value={key}>{type.icon} {type.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Reports List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {filteredReports.map((report) => (
                  <div
                    key={report.id}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all duration-300 group ${
                      selectedReports.includes(report.id)
                        ? 'bg-white/20 border-[#baf200] ring-2 ring-[#baf200]/50 shadow-lg shadow-[#baf200]/20'
                        : 'bg-white/5 border-white/20 hover:bg-white/10 hover:border-white/40 hover:shadow-lg'
                    }`}
                    onClick={() => toggleReportSelection(report.id)}
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`w-12 h-12 bg-gradient-to-br ${getReportTypeColor(report.type)} rounded-xl flex items-center justify-center text-lg group-hover:scale-110 transition-transform`}>
                        {getReportTypeIcon(report.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="text-white font-medium text-sm leading-tight">{report.title}</h4>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            report.priority === 'critical' ? 'bg-red-500/20 text-red-400' :
                            report.priority === 'high' ? 'bg-orange-500/20 text-orange-400' :
                            report.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                            'bg-green-500/20 text-green-400'
                          }`}>
                            {report.priority}
                          </span>
                        </div>
                        
                        <p className="text-white/70 text-xs mt-1 line-clamp-2">{report.summary}</p>
                        
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center space-x-2">
                            <span className="text-white/60 text-xs">{report.date}</span>
                            <span className={`w-2 h-2 rounded-full ${
                              report.status === 'completed' ? 'bg-green-400' :
                              report.status === 'processing' ? 'bg-yellow-400 animate-pulse' :
                              report.status === 'error' ? 'bg-red-400' : 'bg-gray-400'
                            }`}></span>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <div className={`w-2 h-2 rounded-full ${
                              report.confidence_score >= 90 ? 'bg-green-400' :
                              report.confidence_score >= 75 ? 'bg-yellow-400' : 'bg-red-400'
                            }`}></div>
                            <span className="text-white/80 text-xs font-medium">{report.confidence_score}%</span>
                          </div>
                        </div>
                        
                        {report.tags && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {report.tags.slice(0, 3).map((tag, index) => (
                              <span key={index} className="px-2 py-1 bg-white/10 text-white/70 rounded text-xs">
                                #{tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Selected Reports Action */}
              {selectedReports.length > 0 && (
                <div className="p-6 border-t border-white/20">
                  <div className="p-4 bg-[#baf200]/20 rounded-2xl border border-[#baf200]/30 backdrop-blur-sm">
                    <h4 className="text-[#baf200] font-medium mb-3">
                      Seçili Raporlar ({selectedReports.length})
                    </h4>
                    <div className="space-y-2">
                      <button
                        onClick={() => {
                          const selectedTitles = userReports
                            .filter(r => selectedReports.includes(r.id))
                            .map(r => r.title)
                            .join(', ');
                          setInputValue(`Bu raporları karşılaştırmalı analiz et: ${selectedTitles}`);
                        }}
                        className="w-full bg-[#baf200] text-[#146448] py-2 px-4 rounded-xl font-medium transition-all duration-300 hover:bg-[#baf200]/90 hover:shadow-lg"
                      >
                        🔍 Karşılaştırmalı Analiz
                      </button>
                      <button
                        onClick={() => {
                          const selectedTitles = userReports
                            .filter(r => selectedReports.includes(r.id))
                            .map(r => r.title)
                            .join(', ');
                          setInputValue(`Seçili raporlar için entegre optimizasyon stratejisi geliştir: ${selectedTitles}`);
                        }}
                        className="w-full bg-white/10 text-white py-2 px-4 rounded-xl font-medium transition-all duration-300 hover:bg-white/20 border border-white/30"
                      >
                        🚀 Entegre Strateji
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </aside>
          )}

          {/* Main Chat Area */}
          <main className="flex-1 flex flex-col max-w-[896px] mx-auto">
            
            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[576px] ${
                    message.role === 'user' 
                      ? 'bg-gradient-to-br from-[#baf200] to-[#8fd600] text-[#146448] rounded-2xl rounded-br-lg shadow-xl shadow-[#baf200]/20' 
                      : message.role === 'system'
                      ? 'bg-white/10 text-white rounded-2xl border border-white/30 backdrop-blur-sm shadow-xl'
                      : 'bg-white/10 text-white rounded-2xl rounded-bl-lg border border-white/30 backdrop-blur-sm shadow-xl'
                  } p-6`}>
                    
                    {/* Enhanced Message Header */}
                    {message.role === 'assistant' && (
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-[#baf200] to-[#8fd600] rounded-lg flex items-center justify-center text-lg">
                            🤖
                          </div>
                          <div>
                            <span className="font-medium text-base">SeraGPT</span>
                            <div className="flex items-center space-x-2 mt-1">
                              {message.confidence && (
                                <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-medium">
                                  %{Math.round(message.confidence)} güvenilirlik
                                </span>
                              )}
                              {message.isDeepAnalysis && (
                                <span className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded-full text-xs font-medium">
                                  Derin Analiz
                                </span>
                              )}
                              {message.metadata?.urgencyLevel && (
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  message.metadata.urgencyLevel === 'critical' ? 'bg-red-500/20 text-red-400' :
                                  message.metadata.urgencyLevel === 'high' ? 'bg-orange-500/20 text-orange-400' :
                                  message.metadata.urgencyLevel === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                                  'bg-blue-500/20 text-blue-400'
                                }`}>
                                  {message.metadata.urgencyLevel} öncelik
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-xs opacity-60">
                            {message.timestamp.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}
                          </span>
                          {message.metadata?.processingTime && (
                            <div className="text-xs opacity-50 mt-1">
                              {(message.metadata.processingTime / 1000).toFixed(1)}s işlem
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Message Content */}
                    <div className="prose prose-invert max-w-none">
                      <div className="whitespace-pre-wrap leading-relaxed text-sm">
                        {message.content}
                      </div>
                    </div>

                    {/* Enhanced Metadata Display */}
                    {message.metadata && (message.metadata.actionItems || message.metadata.nextSteps) && (
                      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                        {message.metadata.actionItems && message.metadata.actionItems.length > 0 && (
                          <div className="p-4 bg-white/10 rounded-xl border border-white/20 backdrop-blur-sm">
                            <h5 className="font-medium mb-2 text-sm flex items-center">
                              ⚡ Hızlı Aksiyonlar
                            </h5>
                            <ul className="space-y-1 text-sm">
                              {message.metadata.actionItems.map((item, index) => (
                                <li key={index} className="flex items-start space-x-2">
                                  <span className="text-[#baf200] text-xs mt-1">•</span>
                                  <span className="text-xs">{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        
                        {message.metadata.nextSteps && message.metadata.nextSteps.length > 0 && (
                          <div className="p-4 bg-white/10 rounded-xl border border-white/20 backdrop-blur-sm">
                            <h5 className="font-medium mb-2 text-sm flex items-center">
                              🎯 Sonraki Adımlar
                            </h5>
                            <ul className="space-y-1 text-sm">
                              {message.metadata.nextSteps.map((step, index) => (
                                <li key={index} className="flex items-start space-x-2">
                                  <span className="text-[#baf200] text-xs mt-1">{index + 1}.</span>
                                  <span className="text-xs">{step}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Related Reports */}
                    {message.relatedReports && message.relatedReports.length > 0 && (
                      <div className="mt-4 p-4 bg-white/10 rounded-xl border border-white/20 backdrop-blur-sm">
                        <h5 className="font-medium mb-3 text-sm">📊 İlgili Raporlar</h5>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {message.relatedReports.slice(0, 4).map((report) => (
                            <div key={report.id} className="flex items-center space-x-2 p-2 bg-white/5 rounded-lg text-sm">
                              <span className="text-lg">{getReportTypeIcon(report.type)}</span>
                              <div className="flex-1 min-w-0">
                                <div className="font-medium truncate">{report.title}</div>
                                <div className="flex items-center space-x-2 text-xs opacity-70">
                                  <span>%{report.confidence_score}</span>
                                  <span>•</span>
                                  <span className="capitalize">{report.priority}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Enhanced Suggestions */}
                    {message.suggestions && message.suggestions.length > 0 && (
                      <div className="mt-4">
                        <h5 className="font-medium mb-3 text-sm">💡 Önerilen Sorular</h5>
                        <div className="grid grid-cols-1 gap-2">
                          {message.suggestions.map((suggestion, index) => (
                            <button
                              key={index}
                              onClick={() => handleSuggestionClick(suggestion)}
                              className="p-3 bg-white/10 hover:bg-white/20 rounded-xl text-left transition-all duration-300 border border-white/20 hover:border-white/40 group text-sm"
                            >
                              <div className="flex items-center space-x-2">
                                <span className="text-[#baf200] group-hover:scale-110 transition-transform">💭</span>
                                <span className="group-hover:text-[#baf200] transition-colors">
                                  {suggestion}
                                </span>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {/* Enhanced Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white/10 backdrop-blur-sm text-white p-6 rounded-2xl rounded-bl-lg border border-white/30 shadow-xl max-w-[576px]">
                    <div className="flex items-center space-x-4">
                      <div className="w-8 h-8 bg-gradient-to-br from-[#baf200] to-[#8fd600] rounded-lg flex items-center justify-center text-lg">
                        🤖
                      </div>
                      <div>
                        <span className="font-medium">SeraGPT analiz yapıyor...</span>
                        <div className="flex items-center space-x-2 mt-1">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-[#baf200] rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-[#baf200] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-2 h-2 bg-[#baf200] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                          <span className="text-xs opacity-60">Derin analiz modu aktif</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Enhanced Suggestions Panel */}
            {showSuggestionsPanel && messages.length <= 1 && (
              <div className="p-6 border-t border-white/10 backdrop-blur-sm">
                <h4 className="text-white font-medium mb-4 flex items-center">
                  🎯 Size Özel Akıllı Öneriler
                  <span className="ml-2 px-2 py-1 bg-[#baf200]/20 text-[#baf200] rounded-full text-xs">
                    AI Destekli
                  </span>
                </h4>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                  {smartSuggestions.slice(0, 8).map((suggestion) => (
                    <button
                      key={suggestion.id}
                      onClick={() => handleSuggestionClick(suggestion.text)}
                      className="p-4 bg-white/10 hover:bg-white/20 rounded-xl text-left transition-all duration-300 border border-white/20 hover:border-white/40 group backdrop-blur-sm"
                    >
                      <div className="flex items-start space-x-3">
                        <span className="text-xl group-hover:scale-110 transition-transform">
                          {analysisTypes[suggestion.type as keyof typeof analysisTypes]?.icon || '🎯'}
                        </span>
                        <div className="flex-1">
                          <p className="text-white text-sm font-medium group-hover:text-[#baf200] transition-colors leading-tight">
                            {suggestion.text}
                          </p>
                          <div className="flex items-center justify-between mt-2">
                            <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                              suggestion.priority === 'critical' 
                                ? 'bg-red-500/20 text-red-400' 
                                : suggestion.priority === 'high'
                                ? 'bg-orange-500/20 text-orange-400'
                                : 'bg-yellow-500/20 text-yellow-400'
                            }`}>
                              {suggestion.priority === 'critical' ? 'Kritik' : 
                               suggestion.priority === 'high' ? 'Yüksek' : 'Orta'} Öncelik
                            </span>
                            {suggestion.estimatedTime && (
                              <span className="text-xs text-white/60">
                                ⏱️ {suggestion.estimatedTime}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Enhanced Chat Input */}
            <footer className="p-6 border-t border-white/10 backdrop-blur-sm">
              <div className="relative">
                <textarea
                  ref={inputRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="SeraGPT'ye detaylı sorular sorun... (Örn: 'ROI analizimi optimize etmek için hangi stratejileri önerirsin?')"
                  className="w-full p-4 pr-24 bg-white/95 border border-white/30 rounded-2xl resize-none focus:ring-2 focus:ring-[#baf200] focus:border-[#baf200] text-[#146448] placeholder-[#146448]/60 min-h-[60px] max-h-32 backdrop-blur-sm shadow-lg transition-all duration-300"
                  rows={2}
                />
                
                {/* Input Controls */}
                <div className="absolute right-3 bottom-3 flex items-center space-x-2">
                  {selectedReports.length > 0 && (
                    <span className="px-3 py-1 bg-[#baf200] text-[#146448] rounded-lg text-xs font-medium shadow-sm">
                      {selectedReports.length} rapor seçili
                    </span>
                  )}
                  
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim()}
                    className="w-10 h-10 bg-gradient-to-br from-[#baf200] to-[#8fd600] hover:from-[#8fd600] hover:to-[#baf200] text-[#146448] rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-105 disabled:hover:scale-100"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                    </svg>
                  </button>
                </div>
              </div>
              
              {/* Enhanced Input Help */}
              <div className="mt-3 flex items-center justify-between text-xs text-white/60">
                <div className="flex items-center space-x-4">
                  <span>Enter ile gönder, Shift+Enter ile yeni satır</span>
                  {deepAnalysisMode && (
                    <span className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                      <span>Derin analiz modu aktif</span>
                    </span>
                  )}
                </div>
                <div className="flex items-center space-x-4">
                  <span>{userReports.length} analiz tamamlandı</span>
                  <span>•</span>
                  <span>{analysisContext.sessionMetrics.messagesCount} mesaj</span>
                </div>
              </div>
            </footer>

          </main>
        </div>
      </div>
    </ClientOnly>
  );
}
