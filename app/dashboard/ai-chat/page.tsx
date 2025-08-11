'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/lib/hooks/useAuth';
import ClientOnly from '@/components/ui/ClientOnly';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

// Utility function to prevent hydration mismatch
const getStaticTimestamp = (offset = 0) => new Date('2024-01-16T15:00:00.000Z').getTime() + offset;

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  attachments?: any[];
  analysisData?: any;
  isAnalysisStep?: boolean;
  stepType?: 'start' | 'collecting' | 'processing' | 'completed';
}

interface ChatSession {
  id: string;
  title: string;
  lastMessage: string;
  date: string;
  messageCount: number;
  messages: ChatMessage[];
}

interface Report {
  id: string;
  title: string;
  type: 'roi' | 'climate' | 'equipment' | 'market' | 'layout';
  date: string;
  summary: string;
  status: 'completed' | 'in-progress';
}

interface AnalysisFlow {
  type: 'roi' | 'climate' | 'equipment' | 'market' | 'layout';
  currentStep: number;
  collectedData: any;
  isActive: boolean;
  questions: Array<{
    id: string;
    question: string;
    type: 'text' | 'number' | 'select' | 'multiselect';
    options?: string[];
    validation?: (value: any) => boolean;
    required: boolean;
  }>;
}

export default function AIChatPage() {
  const { user } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [menuPopupOpen, setMenuPopupOpen] = useState(false);
  const [analysisFlow, setAnalysisFlow] = useState<AnalysisFlow | null>(null);
  const [userTokens, setUserTokens] = useState(5); // Mock token count
  const [isDesktop, setIsDesktop] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Mock data - Sohbet geçmişi
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([
    {
      id: '1',
      title: 'Yatırım Geri Dönüş (ROI) Analizi',
      lastMessage: 'Sohbet Başlatıldı...',
      date: 'Şubat Başında',
      messageCount: 0,
      messages: []
    },
    {
      id: '2',
      title: 'Yatırım Geri Dönüş (ROI) Analizi',
      lastMessage: 'Sohbet Başlatıldı...',
      date: 'Şubat Başında',
      messageCount: 0,
      messages: []
    },
    {
      id: '3',
      title: 'Yatırım Geri Dönüş (ROI) Analizi',
      lastMessage: 'Sohbet Başlatıldı...',
      date: 'Şubat Başında',
      messageCount: 0,
      messages: []
    }
  ]);

  // Analysis options for welcome screen
  const analysisOptions = [
    {
      id: 'roi',
      title: 'ROI Analizi',
      description: 'Yatırım geri dönüş hesaplaması',
    },
    {
      id: 'climate',
      title: 'İklim Analizi',
      description: 'Bölgesel iklim uygunluğu',
    },
    {
      id: 'equipment',
      title: 'Ekipman Listesi',
      description: 'Mühendis onaylı ekipmanlar',
    },
    {
      id: 'market',
      title: 'Pazar Analizi',
      description: 'Ticaret ve fiyat verileri',
    },
    {
      id: 'layout',
      title: 'Yerleşim Planı',
      description: '2D/3D sera tasarımları',
    },
    {
      id: 'reports',
      title: 'Raporlarım',
      description: 'Önceki analizlerinizi görün',
    },
  ];

  // Dashboard menu items
  const dashboardMenuItems = [
    { id: 'user', title: 'Kullanıcı İşlemleri' },
    { id: 'tokens', title: 'Token İşlemleri' },
    { id: 'ai-assistant', title: 'AI Asistan İşlemleri' },
    { id: 'analysis', title: 'Tüm Analizler' },
    { id: 'settings', title: 'Hesap Ayarları' },
    { id: 'support', title: 'Destek' },
    { id: 'consulting', title: 'Danışmanlık' },
    { id: 'turnkey', title: 'Anahtar Teslim' },
    { id: 'homepage', title: 'Anasayfaya Çıkış' },
    { id: 'old-dashboard', title: 'Eski Dashboard' },
  ];

  // Analysis flow definitions
  const analysisFlows = {
    roi: {
      questions: [
        { id: 'location', question: 'Hangi şehir/bölgede sera kuracaksınız?', type: 'text', required: true },
        { id: 'size', question: 'Sera büyüklüğü kaç m² olacak? (min 100m²)', type: 'number', required: true, validation: (v: number) => v >= 100 },
        { id: 'crop', question: 'Hangi ürünü yetiştireceksiniz?', type: 'select', options: ['Domates', 'Salatalık', 'Biber', 'Patlıcan', 'Marul', 'Çilek'], required: true },
        { id: 'budget', question: 'Başlangıç bütçeniz ne kadar? (TL)', type: 'number', required: true, validation: (v: number) => v >= 50000 },
        { id: 'automation', question: 'Otomasyon seviyesi tercihiniz?', type: 'select', options: ['Temel', 'Orta', 'İleri', 'Tam Otomatik'], required: true },
        { id: 'timeline', question: 'Proje süresi kaç yıl?', type: 'number', required: true, validation: (v: number) => v >= 1 && v <= 20 }
      ]
    },
    climate: {
      questions: [
        { id: 'location', question: 'Sera konumunuzun koordinatları nedir? (Şehir adı da yazabilirsiniz)', type: 'text', required: true },
        { id: 'crop', question: 'Hangi ürün için iklim analizi yapılacak?', type: 'select', options: ['Domates', 'Salatalık', 'Biber', 'Marul', 'Çilek', 'Aromatik Bitkiler'], required: true },
        { id: 'season', question: 'Hangi dönem için analiz yapılacak?', type: 'select', options: ['Yıl Boyu', 'Kış Dönemi', 'Yaz Dönemi', 'İlkbahar', 'Sonbahar'], required: true }
      ]
    },
    equipment: {
      questions: [
        { id: 'size', question: 'Sera büyüklüğü kaç m²?', type: 'number', required: true, validation: (v: number) => v >= 100 },
        { id: 'type', question: 'Sera tipi tercihiniz?', type: 'select', options: ['Cam', 'Polikarbonat', 'Plastik', 'Yüksek Teknoloji'], required: true },
        { id: 'automation', question: 'Otomasyon seviyesi?', type: 'select', options: ['Temel', 'Orta', 'İleri', 'Tam Otomatik'], required: true },
        { id: 'budget', question: 'Bütçe kategoriniz?', type: 'select', options: ['Ekonomik', 'Standart', 'Premium', 'Lüks'], required: true },
        { id: 'crop', question: 'Üretim sistemi?', type: 'select', options: ['Toprak', 'Hidroponik', 'Aeroponik', 'Substrat'], required: true }
      ]
    },
    market: {
      questions: [
        { id: 'crop', question: 'Hangi ürün için pazar analizi?', type: 'text', required: true },
        { id: 'region', question: 'Hedef pazar bölgesi?', type: 'text', required: true },
        { id: 'capacity', question: 'Yıllık üretim kapasitesi (ton)?', type: 'number', required: true }
      ]
    },
    layout: {
      questions: [
        { id: 'size', question: 'Sera büyüklüğü (m²)?', type: 'number', required: true },
        { id: 'shape', question: 'Arazi şekli nasıl?', type: 'select', options: ['Kare', 'Dikdörtgen', 'Düzensiz'], required: true },
        { id: 'orientation', question: 'Arazi yönelimi?', type: 'select', options: ['Kuzey-Güney', 'Doğu-Batı', 'Esnek'], required: true },
        { id: 'slope', question: 'Arazi eğimi var mı?', type: 'select', options: ['Düz', 'Hafif Eğimli', 'Eğimli'], required: true }
      ]
    }
  };

  const handleNewChat = () => {
    setCurrentChatId(null);
    setMessages([]);
  };

  const handleSelectChat = (chatId: string) => {
    setCurrentChatId(chatId);
    const chat = chatSessions.find(c => c.id === chatId);
    setMessages(chat?.messages || []);
  };

  const handleAnalysisClick = (optionId: string) => {
    const option = analysisOptions.find(opt => opt.id === optionId);
    if (option && option.id !== 'reports') {
      // Start analysis flow
      startAnalysisFlow(option.id as 'roi' | 'climate' | 'equipment' | 'market' | 'layout');
    } else if (option?.id === 'reports') {
      // Navigate to reports page
      window.location.href = '/dashboard/reports';
    }
  };

  const startAnalysisFlow = (analysisType: 'roi' | 'climate' | 'equipment' | 'market' | 'layout') => {
    const flowQuestions = analysisFlows[analysisType]?.questions;
    if (!flowQuestions) return;

    const flow: AnalysisFlow = {
      type: analysisType,
      currentStep: 0,
      collectedData: {},
      isActive: true,
      questions: flowQuestions as any
    };

    setAnalysisFlow(flow);

    // Add initial AI message
    const initialMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'assistant',
      content: `Merhaba! ${getAnalysisTitle(analysisType)} için size yardımcı olacağım.

Bu analiz için ${flowQuestions.length} adımda bilgi toplamamız gerekiyor. Analiz tamamlandığında 1 token kullanılacak.

Mevcut token bakiyeniz: ${userTokens}

Başlayalım! ${flowQuestions[0].question}`,
      timestamp: new Date(),
      isAnalysisStep: true,
      stepType: 'start'
    };

    setMessages(prev => [...prev, initialMessage]);
  };

  const getAnalysisTitle = (type: string) => {
    const titles = {
      roi: 'ROI (Yatırım Geri Dönüş) Analizi',
      climate: 'İklim Analizi',
      equipment: 'Ekipman Analizi',
      market: 'Pazar Analizi',
      layout: 'Yerleşim Planı Analizi'
    };
    return titles[type as keyof typeof titles] || type;
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

    // Handle analysis flow
    if (analysisFlow?.isActive) {
      await handleAnalysisResponse(inputValue);
    } else {
      // Regular chat response
      setTimeout(() => {
        const aiMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: `Merhaba! "${inputValue}" konusunda size yardımcı olmaktan mutluluk duyarım. Bu konu hakkında detaylı bilgi verebilir ve size özel öneriler geliştirebilirim.

Eğer analiz yapmak isterseniz, yukarıdaki analiz kartlarından birini seçebilirsiniz.`,
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, aiMessage]);
        setIsTyping(false);
      }, 1500);
    }
  };

  const handleAnalysisResponse = async (userInput: string) => {
    if (!analysisFlow) {
      setIsTyping(false);
      return;
    }

    const currentQuestion = analysisFlow.questions[analysisFlow.currentStep];
    let processedValue = userInput;

    // Validate input based on question type
    if (currentQuestion.type === 'number') {
      const numValue = parseFloat(userInput);
      if (isNaN(numValue)) {
        setTimeout(() => {
          const errorMessage: ChatMessage = {
            id: (Date.now() + 1).toString(),
            role: 'assistant',
            content: `Lütfen geçerli bir say�� girin. ${currentQuestion.question}`,
            timestamp: new Date(),
            isAnalysisStep: true
          };
          setMessages(prev => [...prev, errorMessage]);
          setIsTyping(false);
        }, 1000);
        return;
      }
      processedValue = numValue.toString();
    }

    // Validate required fields and custom validation
    if (currentQuestion.validation && !currentQuestion.validation(processedValue)) {
      setTimeout(() => {
        const errorMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: `Girdiğiniz değer geçerli değil. ${currentQuestion.question}`,
          timestamp: new Date(),
          isAnalysisStep: true
        };
        setMessages(prev => [...prev, errorMessage]);
        setIsTyping(false);
      }, 1000);
      return;
    }

    // Save the answer
    const updatedFlow = {
      ...analysisFlow,
      collectedData: {
        ...analysisFlow.collectedData,
        [currentQuestion.id]: processedValue
      },
      currentStep: analysisFlow.currentStep + 1
    };

    setAnalysisFlow(updatedFlow);

    setTimeout(() => {
      if (updatedFlow.currentStep >= updatedFlow.questions.length) {
        // All questions answered, process analysis
        processAnalysis(updatedFlow);
      } else {
        // Ask next question
        const nextQuestion = updatedFlow.questions[updatedFlow.currentStep];
        const nextMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: `Teşekkürler!

**İlerleme:** ${updatedFlow.currentStep}/${updatedFlow.questions.length}

${nextQuestion.question}${nextQuestion.options ? `\n\nSeçenekler: ${nextQuestion.options.join(', ')}` : ''}`,
          timestamp: new Date(),
          isAnalysisStep: true,
          stepType: 'collecting'
        };
        setMessages(prev => [...prev, nextMessage]);
      }
      setIsTyping(false);
    }, 1500);
  };

  const processAnalysis = async (flow: AnalysisFlow) => {
    // Check token balance
    if (userTokens <= 0) {
      const tokenMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `⚠️ **Yetersiz Token**

Analizi başlatmak için en az 1 token gerekiyor.
Mevcut bakiyeniz: ${userTokens}

Token satın almak için [Token İşlemleri](/dashboard/token-islemleri) sayfasını ziyaret edebilirsiniz.`,
        timestamp: new Date(),
        isAnalysisStep: true,
        stepType: 'completed'
      };
      setMessages(prev => [...prev, tokenMessage]);
      setAnalysisFlow(null);
      setIsTyping(false);
      return;
    }

    // Deduct token
    setUserTokens(prev => prev - 1);

    // Show processing message
    const processingMessage: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: `✅ **Analiz Başlatılıyor**

Tüm bilgiler toplandı! 1 token düşürüldü.
Kalan token: ${userTokens - 1}

🔄 ${getAnalysisTitle(flow.type)} hazırlanıyor...

Bu işlem 2-5 dakika sürebilir. Lütfen bekleyin.`,
      timestamp: new Date(),
      isAnalysisStep: true,
      stepType: 'processing'
    };
    setMessages(prev => [...prev, processingMessage]);

    // Simulate API call
    setTimeout(async () => {
      try {
        const analysisResult = await callAnalysisAPI(flow);

        const resultMessage: ChatMessage = {
          id: (Date.now() + 2).toString(),
          role: 'assistant',
          content: `🎉 **${getAnalysisTitle(flow.type)} Tamamlandı!**

${analysisResult.summary}

**Ana Bulgular:**
${analysisResult.keyFindings.map((finding: string) => `• ${finding}`).join('\n')}

**Öneriler:**
${analysisResult.recommendations.map((rec: string) => `• ${rec}`).join('\n')}

📄 **Detaylı rapor PDF olarak hazırlandı.**
🔗 [Raporu İndir](${analysisResult.pdfUrl})

Başka bir analiz yapmak isterseniz yukarıdaki kartları kullanabilirsiniz!`,
          timestamp: new Date(),
          isAnalysisStep: true,
          stepType: 'completed',
          analysisData: analysisResult
        };

        setMessages(prev => [...prev, resultMessage]);
        setAnalysisFlow(null);
      } catch (error) {
        const errorMessage: ChatMessage = {
          id: (Date.now() + 2).toString(),
          role: 'assistant',
          content: `❌ **Analiz Hatası**

Üzgünüz, analiz işlemi sıras��nda bir hata oluştu.
Token iadesi yapıldı.

Lütfen daha sonra tekrar deneyin veya destek ekibimizle iletişime geçin.`,
          timestamp: new Date(),
          isAnalysisStep: true,
          stepType: 'completed'
        };

        setMessages(prev => [...prev, errorMessage]);
        setUserTokens(prev => prev + 1); // Refund token
        setAnalysisFlow(null);
      }
      setIsTyping(false);
    }, 5000);
  };

  const callAnalysisAPI = async (flow: AnalysisFlow) => {
    // Simulate API call to backend
    const apiEndpoints = {
      roi: '/api/analysis/roi',
      climate: '/api/analysis/climate',
      equipment: '/api/analysis/equipment',
      market: '/api/analysis/market',
      layout: '/api/analysis/layout'
    };

    // Mock successful response
    return {
      success: true,
      summary: getMockSummary(flow),
      keyFindings: getMockFindings(flow),
      recommendations: getMockRecommendations(flow),
      pdfUrl: `/api/analysis/${flow.type}/download?id=${Date.now()}`,
      analysisId: `${flow.type}_${Date.now()}`
    };
  };

  const getMockSummary = (flow: AnalysisFlow) => {
    const summaries = {
      roi: `${flow.collectedData.size}m² sera için ${flow.collectedData.budget} TL bütçe ile ROI analizi tamamlandı.`,
      climate: `${flow.collectedData.location} konumu için ${flow.collectedData.crop} üretimi iklim analizi tamamlandı.`,
      equipment: `${flow.collectedData.size}m² ${flow.collectedData.type} sera için ekipman analizi tamamlandı.`,
      market: `${flow.collectedData.crop} için ${flow.collectedData.region} bölgesi pazar analizi tamamlandı.`,
      layout: `${flow.collectedData.size}m² alan için yerleşim planı analizi tamamlandı.`
    };
    return summaries[flow.type];
  };

  const getMockFindings = (flow: AnalysisFlow) => {
    const findings = {
      roi: [
        '5 yıl içinde %127 ROI bekleniyor',
        'Geri ödeme süresi 2.8 yıl',
        'Net bugünkü değer 485.000 TL pozitif'
      ],
      climate: [
        'Seçilen bölge üretim için uygun',
        'Yıllık ortalama sıcaklık ideal aralıkta',
        'Enerji maliyeti %15 azaltılabilir'
      ],
      equipment: [
        'Toplam ekipman maliyeti hesaplandı',
        'Kurulum süresi 12-16 hafta',
        'A+ enerji verimliliği sağlanabilir'
      ],
      market: [
        'Hedef pazar büyüklüğü uygun',
        'Fiyat trendi pozitif',
        'Rekabet seviyesi orta'
      ],
      layout: [
        'Optimal yerleşim planı oluşturuldu',
        'Alan kullanım verimliliği %85',
        'Lojistik akış optimize edildi'
      ]
    };
    return findings[flow.type];
  };

  const getMockRecommendations = (flow: AnalysisFlow) => {
    const recommendations = {
      roi: [
        'LED aydınlatma sistemi kullanın',
        'Otomatik iklim kontrol sistemi ekleyin',
        'Devlet teşviklerini değerlendirin'
      ],
      climate: [
        'Enerji perde sistemi kurun',
        'Doğal havalandırmayı artırın',
        'Su geri kazanım sistemi ekleyin'
      ],
      equipment: [
        'Aşamalı kurulum yapın',
        'Bakım anlaşması yapın',
        'Genişleme için yer bırakın'
      ],
      market: [
        'Sözleşmeli üretim düşünün',
        'Organik sertifika alın',
        'Direkt satış kanalları oluşturun'
      ],
      layout: [
        'Gelecek genişleme alanı bırakın',
        'Araç parkı alanı planlayın',
        'Depo alanını optimize edin'
      ]
    };
    return recommendations[flow.type];
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Auto-resize textarea
  useEffect(() => {
    const textarea = inputRef.current;
    if (textarea) {
      const resizeTextarea = () => {
        textarea.style.height = 'auto';
        textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
      };

      textarea.addEventListener('input', resizeTextarea);
      return () => textarea.removeEventListener('input', resizeTextarea);
    }
  }, []);

  // Track window size for responsive behavior
  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    // Set initial value
    checkScreenSize();

    // Add event listener
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Close sidebar on mobile when message is sent
  useEffect(() => {
    if (messages.length > 0 && typeof window !== 'undefined' && window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  }, [messages]);

  // Close menu popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuPopupOpen && !(event.target as Element)?.closest('.menu-popup-container')) {
        setMenuPopupOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuPopupOpen]);

  // Prevent viewport jumping on mobile keyboard
  useEffect(() => {
    const viewport = document.querySelector('meta[name=viewport]');
    const originalContent = viewport?.getAttribute('content');

    const handleFocus = () => {
      // Disable viewport scaling during keyboard input
      viewport?.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
      // Add visual viewport support
      document.body.style.setProperty('--vh', `${window.visualViewport?.height || window.innerHeight}px`);
    };

    const handleBlur = () => {
      // Restore original viewport settings
      if (originalContent) {
        viewport?.setAttribute('content', originalContent);
      }
      // Update viewport height
      document.body.style.setProperty('--vh', `${window.visualViewport?.height || window.innerHeight}px`);
    };

    const handleVisualViewportChange = () => {
      document.body.style.setProperty('--vh', `${window.visualViewport?.height || window.innerHeight}px`);
    };

    // Listen for focus/blur on input elements
    const inputElement = inputRef.current;
    inputElement?.addEventListener('focus', handleFocus);
    inputElement?.addEventListener('blur', handleBlur);

    // Listen for visual viewport changes (iOS Safari)
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', handleVisualViewportChange);
    }

    return () => {
      inputElement?.removeEventListener('focus', handleFocus);
      inputElement?.removeEventListener('blur', handleBlur);
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', handleVisualViewportChange);
      }
    };
  }, []);

  return (
    <ClientOnly>
      <div className="flex flex-col h-screen bg-[#146448] overflow-hidden"
           style={{
             height: '100vh',
             minHeight: '100vh',
             maxHeight: '100vh',
             overscrollBehavior: 'contain',
             touchAction: 'manipulation',
             maxWidth: '100vw',
             width: '100%'
           }}>
        <div className="flex flex-1 min-h-0 max-w-full"
             style={{ maxWidth: '100vw', width: '100%' }}>
          {/* Sidebar */}
          <AnimatePresence>
            {sidebarOpen && (
              <>
                {/* Mobile Overlay */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/70 z-50 md:hidden"
                  onClick={() => setSidebarOpen(false)}
                />

                <motion.div
                  initial={{ x: -300, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -300, opacity: 0 }}
                  className="w-64 sm:w-72 bg-[#1e3237] border-r border-[#f6f8f9]/20 flex flex-col h-full fixed md:relative z-[60] md:z-auto max-w-[70vw] min-w-0 shadow-2xl"
                  style={{ backgroundColor: 'rgba(30, 50, 55, 0.98)' }}
                >
                {/* Sidebar Header - Logo */}
                <div className="p-4 border-b border-[#f6f8f9]/10 bg-[#146448] text-white">
                  <div className="flex items-center justify-center">
                    <img
                      src="https://cdn.builder.io/api/v1/image/assets%2F2c7ec7c93776440b923d3518963fc941%2F01c1e8a05ef6424b912d584875377957?format=webp&width=800"
                      alt="SeraGPT Logo - AI Destekli Sera Yatırım Dan��şmanı"
                      className="h-10 w-auto object-contain"
                      loading="eager"
                    />
                  </div>
                  <div className="mt-3 text-center text-xs text-[#baf200] leading-4"
                       role="status"
                       aria-live="polite">
                    AI Dashboard
                  </div>
                </div>

                {/* Chat History */}
                <div className="flex-1 overflow-y-auto p-4 bg-[#146448] overscroll-contain"
                     style={{ scrollBehavior: 'smooth' }}>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-[#f6f8f9]/70 mb-3 flex items-center"
                          role="heading"
                          aria-level={2}>
                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                          <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z"/>
                        </svg>
                        ANALİZLER
                      </h3>
                      <div className="space-y-2" role="list" aria-label="Analiz geçmişi">
                        {chatSessions.map((chat) => (
                          <button
                            key={chat.id}
                            onClick={() => handleSelectChat(chat.id)}
                            className={`w-full p-3 rounded-lg text-left transition-colors group focus:ring-2 focus:ring-[#baf200] focus:outline-none ${
                              currentChatId === chat.id
                                ? 'bg-[#baf200]/20 border border-[#baf200]/30'
                                : 'bg-[#146448]/50 hover:bg-[#f6f8f9]/10'
                            }`}
                            role="listitem"
                            aria-pressed={currentChatId === chat.id}
                          >
                            <div className="text-sm font-medium text-[#f6f8f9] group-hover:text-[#baf200] transition-colors truncate">
                              {chat.title}
                            </div>
                            <div className="text-xs text-[#f6f8f9]/60 mt-1 truncate">
                              {chat.lastMessage}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium text-[#f6f8f9]/70 mb-3 flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                          <path fillRule="evenodd" d="M4 5a2 2 0 012-2v1a2 2 0 00-2 2v6a2 2 0 002 2h8a2 2 0 002-2V6a2 2 0 00-2-2V3a2 2 0 012 2v8a2 2 0 01-2 2H6a2 2 0 01-2-2V5z" clipRule="evenodd"/>
                        </svg>
                        SOHBETLER
                      </h3>
                      <div className="space-y-2">
                        <p className="text-xs text-[#f6f8f9]/40 px-2">Henüz sohbet geçmişi yok</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Fixed Bottom Menu */}
                <div className="p-4 border-t border-[#f6f8f9]/10 bg-[#146448] relative menu-popup-container">
                  <button
                    onClick={() => setMenuPopupOpen(!menuPopupOpen)}
                    className="w-full p-3 bg-[#baf200] hover:bg-[#baf200]/80 rounded-lg transition-colors flex items-center justify-between group"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-[#146448] rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-[#7ed321]" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="text-left">
                        <p className="mb-0 text-sm font-medium text-[#1e3237]">Menü</p>
                        <p className="text-xs text-[#4a4a4a] -mt-0.5">Tüm özellikler</p>
                      </div>
                    </div>
                    <svg
                      className={`w-6 h-6 text-[#1e3237] transition-transform ${menuPopupOpen ? 'rotate-180' : ''}`}
                      fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* Menu Popup */}
                  <AnimatePresence>
                    {menuPopupOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute bottom-full left-4 right-4 mb-2 bg-white rounded-lg shadow-lg border border-gray-200 z-[100] min-w-64"
                      >
                        {/* Header */}
                        <div className="p-4 border-b border-gray-200">
                          <div className="flex items-center justify-between">
                            <h3 className="text-sm font-medium text-gray-900">Dashboard Menü</h3>
                            <button
                              onClick={() => setMenuPopupOpen(false)}
                              className="text-gray-400 hover:text-gray-600"
                            >
                              ×
                            </button>
                          </div>
                        </div>

                        {/* Menu Items */}
                        <div className="py-2 max-h-80 overflow-y-auto">
                          {dashboardMenuItems.map((item) => (
                            <button
                              key={item.id}
                              onClick={() => {
                                // Handle navigation based on item id
                                if (item.id === 'user') {
                                  window.location.href = '/dashboard/kullanici-islemleri';
                                } else if (item.id === 'tokens') {
                                  window.location.href = '/dashboard/token-islemleri';
                                } else if (item.id === 'ai-assistant') {
                                  window.location.href = '/dashboard/ai-asistan-islemleri';
                                } else if (item.id === 'analysis') {
                                  window.location.href = '/dashboard/analysis';
                                } else if (item.id === 'settings') {
                                  window.location.href = '/dashboard/settings';
                                } else if (item.id === 'support') {
                                  window.location.href = '/destek';
                                } else if (item.id === 'consulting') {
                                  window.location.href = '/danismanlik';
                                } else if (item.id === 'turnkey') {
                                  window.location.href = '/anahtar-teslim-proje';
                                } else if (item.id === 'homepage') {
                                  window.location.href = '/';
                                } else if (item.id === 'old-dashboard') {
                                  window.location.href = '/dashboard';
                                }
                                setMenuPopupOpen(false);
                              }}
                              className="w-full px-4 py-3 text-left text-sm text-gray-700 hover:bg-gray-100 border-b border-gray-100 last:border-b-0"
                            >
                              {item.title}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* Main Chat Area */}
          <div className="flex-1 flex flex-col min-w-0 h-full max-w-full overflow-hidden">
            
            {/* Dashboard Header */}
            <div className="flex items-center justify-between p-3 lg:p-4 border-b border-[#f6f8f9]/10 bg-[#146448] flex-shrink-0">
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="p-2 hover:bg-[#f6f8f9]/10 rounded-lg transition-colors focus:ring-2 focus:ring-[#baf200] focus:outline-none"
                  aria-label={sidebarOpen ? 'Kenar çubuğunu kapat' : 'Kenar çubuğunu aç'}
                  aria-expanded={sidebarOpen}
                >
                  <svg className="w-7 h-7 text-[#f6f8f9]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>

                <div className="flex items-center">
                  <p className="text-white text-base font-semibold" style={{ fontSize: '16px', fontWeight: '600' }}>
                    AI ASISTAN
                  </p>
                </div>
              </div>

              <div className="flex items-center">
              </div>
            </div>

            {/* Chat Container - Responsive Layout */}
            <div className="flex-1 flex flex-col bg-[#146448] overflow-hidden relative">
              {/* Chat Messages Area - Always Centered */}
              <div className="flex-1 flex justify-center overflow-hidden" style={{ paddingBottom: '120px' }}>
                <div className="w-full max-w-[900px] flex flex-col h-full px-3 md:px-6 relative"
                     style={{
                       marginLeft: isDesktop && sidebarOpen ? '0' : '0',
                       transition: 'margin-left 0.3s ease-in-out'
                     }}>
                  {!currentChatId && messages.length === 0 ? (
                    // Welcome State - Perfect Center
                    <div className="flex flex-col items-center justify-center h-full min-h-[400px] py-8">
                      <div className="text-center mb-8 max-w-2xl">
                        <h1 className="font-bold text-[#f6f8f9] mb-6 text-3xl md:text-4xl lg:text-5xl">
                          Hoş Geldiniz, Test Kullanıcı!
                        </h1>

                        <div className="mb-8">
                          <p className="text-[#f6f8f9]/90 mb-4 text-base md:text-lg">
                            Aşağıdan Analiz Başlatabilirsiniz yada menüden düzenlemek istediğiniz geçmiş analizlerinden birini seçin.
                          </p>
                          <p className="text-[#baf200] font-medium text-sm md:text-base">
                            Tam havamdayım, çalışalım. Ya siz? Yazalım.
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3 md:gap-4 max-w-md md:max-w-lg w-full px-4">
                        {analysisOptions.map((option) => (
                          <button
                            key={option.id}
                            onClick={() => handleAnalysisClick(option.id)}
                            className="h-20 md:h-24 p-3 bg-white/95 hover:bg-white rounded-lg md:rounded-xl text-center transition-all hover:scale-105 group flex flex-col justify-center items-center border border-[#baf200]/20 hover:border-[#baf200]/40 shadow-sm"
                          >
                            <div className="w-full h-full flex flex-col justify-center items-center">
                              <h3 className="font-semibold text-[#1e3237] mb-1 group-hover:text-[#146448] transition-colors text-xs md:text-sm lg:text-base">
                                {option.title}
                              </h3>
                              <p className="text-[#1e3237]/70 leading-tight text-xs">
                                {option.description}
                              </p>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    // Chat Messages - Chronological Flow
                    <div className="flex-1 overflow-y-auto py-4 space-y-4">
                      {messages.map((message, index) => (
                        <motion.div
                          key={message.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                          style={{ marginBottom: '14px' }}
                        >
                          {message.isAnalysisStep && message.stepType === 'completed' && message.analysisData ? (
                            // Analysis Result Card
                            <div className="w-full max-w-[85%]">
                              <div className="bg-gradient-to-r from-[#baf200]/20 to-[#baf200]/10 border border-[#baf200]/30 rounded-lg p-4">
                                <div className="flex items-center space-x-3 mb-4">
                                  <div className="w-8 h-8 bg-[#baf200] rounded-full flex items-center justify-center">
                                    <svg className="w-5 h-5 text-[#1e3237]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                  </div>
                                  <div>
                                    <h3 className="text-[#ffffff] font-semibold">Analiz Tamamlandı!</h3>
                                    <p className="text-[#baf200] text-sm">{message.timestamp.toLocaleTimeString('tr-TR')}</p>
                                  </div>
                                </div>

                                <div className="text-[#ffffff] mb-4" style={{ lineHeight: '1.5' }}>
                                  {message.content}
                                </div>

                                <div className="flex flex-wrap gap-2">
                                  <button
                                    onClick={() => window.open(message.analysisData.pdfUrl, '_blank')}
                                    className="bg-[#baf200] hover:bg-[#baf200]/80 text-[#1e3237] px-3 py-1.5 rounded text-sm font-medium transition-colors"
                                  >
                                    PDF İndir
                                  </button>
                                  <button
                                    onClick={() => navigator.clipboard.writeText(message.content)}
                                    className="bg-[#f6f8f9]/20 hover:bg-[#f6f8f9]/30 text-[#ffffff] px-3 py-1.5 rounded text-sm transition-colors"
                                  >
                                    Kopyala
                                  </button>
                                  <button
                                    onClick={() => window.location.href = '/dashboard/reports'}
                                    className="bg-[#f6f8f9]/20 hover:bg-[#f6f8f9]/30 text-[#ffffff] px-3 py-1.5 rounded text-sm transition-colors"
                                  >
                                    Tüm Raporlar
                                  </button>
                                </div>
                              </div>
                            </div>
                          ) : message.isAnalysisStep && message.stepType === 'processing' ? (
                            // Processing Card
                            <div className="max-w-[70%]">
                              <div className="bg-[#f6f8f9]/10 border border-[#baf200]/30 rounded-lg p-4">
                                <div className="flex items-center space-x-3 mb-3">
                                  <div className="w-6 h-6 bg-[#baf200] rounded-full flex items-center justify-center animate-pulse">
                                    <svg className="w-4 h-4 text-[#1e3237]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                    </svg>
                                  </div>
                                  <div className="flex space-x-1">
                                    <div className="w-2 h-2 bg-[#baf200] rounded-full animate-bounce"></div>
                                    <div className="w-2 h-2 bg-[#baf200] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                    <div className="w-2 h-2 bg-[#baf200] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                  </div>
                                </div>
                                <p className="text-[#ffffff]" style={{ lineHeight: '1.5' }}>
                                  {message.content}
                                </p>
                                <p className="text-[#ffffff]/60 mt-2 text-sm">
                                  {message.timestamp.toLocaleTimeString('tr-TR')}
                                </p>
                              </div>
                            </div>
                          ) : (
                            // Regular Message Bubble - Clean Minimal Design
                            <div className={`max-w-[70%] rounded-[10px] ${
                              message.role === 'user'
                                ? 'bg-[#baf200] text-[#1e3237]'
                                : 'bg-[#f6f8f9]/10 text-[#ffffff] border border-[#f6f8f9]/20'
                            }`}
                                 style={{
                                   padding: '10px 14px',
                                   lineHeight: '1.5'
                                 }}>
                              <div className="whitespace-pre-wrap break-words">
                                {message.content}
                              </div>
                              <div className={`mt-2 text-xs ${
                                message.role === 'user' ? 'text-[#1e3237]/60' : 'text-[#ffffff]/60'
                              }`}>
                                {message.timestamp.toLocaleTimeString('tr-TR')}
                              </div>
                            </div>
                          )}
                        </motion.div>
                      ))}

                      {isTyping && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex justify-start"
                          style={{ marginBottom: '14px' }}
                        >
                          <div className="max-w-[70%] bg-[#f6f8f9]/10 text-[#f6f8f9] border border-[#f6f8f9]/20 rounded-[10px]"
                               style={{
                                 padding: '10px 14px',
                                 lineHeight: '1.5'
                               }}>
                            <div className="flex space-x-1">
                              <div className="w-2 h-2 bg-[#baf200] rounded-full animate-bounce"></div>
                              <div className="w-2 h-2 bg-[#baf200] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                              <div className="w-2 h-2 bg-[#baf200] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                      <div ref={messagesEndRef} />
                    </div>
                  )}
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Fixed Input Area at Bottom */}
        <div className="fixed bottom-0 left-0 right-0 bg-[#146448] border-t border-[#f6f8f9]/10 z-40">
          <div className="flex justify-center">
            <div className="chat-container w-full max-w-[900px] p-3"
                 style={{
                   marginLeft: isDesktop && sidebarOpen ? '250px' : '0',
                   transition: 'margin-left 0.3s ease-in-out',
                   paddingLeft: 'max(12px, env(safe-area-inset-left))',
                   paddingRight: 'max(12px, env(safe-area-inset-right))'
                 }}>

              {/* Input Area */}
              <div className="mb-3">
                <div className="relative">
                  <textarea
                    ref={inputRef}
                    value={inputValue}
                    onChange={(e) => {
                      setInputValue(e.target.value);
                      // Auto-resize with max 4 lines
                      const textarea = e.target as HTMLTextAreaElement;
                      textarea.style.height = 'auto';
                      const maxHeight = 24 * 4; // 4 lines × 24px line height
                      const newHeight = Math.min(textarea.scrollHeight, maxHeight);
                      textarea.style.height = newHeight + 'px';
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                    placeholder="SeraGPT'ye bir mesaj yazın..."
                    className="w-full p-3 pr-12 bg-white/95 border border-[#baf200]/30 rounded-lg resize-none focus:ring-2 focus:ring-[#baf200] focus:border-[#baf200] placeholder-[#1e3237]/50 text-[#1e3237] overflow-hidden transition-all duration-200"
                    rows={1}
                    style={{
                      minHeight: '48px',
                      maxHeight: '96px', // 4 lines
                      lineHeight: '24px'
                    }}
                  />

                  {/* Send Button */}
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim()}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-[#baf200] hover:bg-[#baf200]/80 text-[#1e3237] rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:ring-2 focus:ring-[#baf200] focus:outline-none"
                    aria-label="Mesaj gönder"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                    </svg>
                  </button>
                </div>
              </div>

              {/* Bottom Action Icons */}
              <div className="flex items-center justify-center space-x-6 py-2"
                   style={{ paddingBottom: 'max(12px, env(safe-area-inset-bottom))' }}>

                {/* File Upload */}
                <button className="p-3 hover:bg-[#f6f8f9]/10 rounded-xl transition-colors focus:ring-2 focus:ring-[#baf200] focus:outline-none group">
                  <svg className="w-6 h-6 text-[#f6f8f9] group-hover:text-[#baf200] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                  </svg>
                </button>

                {/* Voice Recording */}
                <button
                  className="p-3 hover:bg-[#f6f8f9]/10 rounded-xl transition-colors focus:ring-2 focus:ring-[#baf200] focus:outline-none group"
                  onClick={() => setIsRecording(!isRecording)}
                >
                  <svg className={`w-6 h-6 transition-all duration-200 ${isRecording ? 'text-[#baf200] animate-pulse' : 'text-[#f6f8f9] group-hover:text-[#baf200]'}`} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 1a3 3 0 013 3v8a3 3 0 01-6 0V4a3 3 0 013-3zM19 10v2a7 7 0 01-14 0v-2a1 1 0 012 0v2a5 5 0 0010 0v-2a1 1 0 012 0z"/>
                  </svg>
                </button>

                {/* Voice Chat */}
                <button className="p-3 hover:bg-[#f6f8f9]/10 rounded-xl transition-colors focus:ring-2 focus:ring-[#baf200] focus:outline-none group">
                  <svg className="w-6 h-6 text-[#f6f8f9] group-hover:text-[#baf200] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </button>

                {/* New Chat */}
                <button
                  onClick={handleNewChat}
                  className="p-3 hover:bg-[#f6f8f9]/10 rounded-xl transition-colors focus:ring-2 focus:ring-[#baf200] focus:outline-none group"
                >
                  <svg className="w-6 h-6 text-[#f6f8f9] group-hover:text-[#baf200] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ClientOnly>
  );
}
