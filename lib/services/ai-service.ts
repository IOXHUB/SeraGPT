import { API_CONFIG, ApiResponse, ApiError } from '../api-config';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  analysisContext?: {
    type: 'roi' | 'climate' | 'market' | 'equipment' | 'layout';
    data: any;
  };
}

export interface ChatSession {
  id: string;
  userId: string;
  title: string;
  messages: ChatMessage[];
  createdAt: Date;
  updatedAt: Date;
  context: {
    userAnalyses: any[];
    currentProject?: string;
    preferences?: any;
  };
}

export interface AIAnalysisInsight {
  type: 'recommendation' | 'warning' | 'opportunity' | 'insight';
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  actionable: boolean;
  relatedAnalysis?: string;
}

class AIService {
  private apiKey = API_CONFIG.OPENAI.apiKey;
  private model = API_CONFIG.OPENAI.model;
  private baseUrl = API_CONFIG.OPENAI.baseUrl;

  // System prompt for SeraGPT AI
  private readonly systemPrompt = `Sen SeraGPT'nin AI asistanısın. Sera tarımı, tarımsal yatırımlar, iklim analizi ve pazar verileri konularında uzmansın.

Görevin:
1. Kullanıcıların sera yatırım analizlerini yorumlamak
2. ROI, iklim, pazar verilerini analiz ederek öneriler sunmak
3. Sera tarımı best practice'leri paylaşmak
4. Türkiye'deki sera tarımı koşulları hakkında bilgi vermek
5. Teknik sorulara pratik çözümler üretmek

Kurallar:
- Her zaman Türkçe yanıtla
- Kısa, net ve uygulanabilir öneriler ver
- Sayısal verileri referans alarak konuş
- Mümkünse maliyet optimizasyonu öneriler
- Risk faktörlerini her zaman belirt
- Kullanıcının yaptığı analizleri referans al

Ton: Profesyonel ama samimi, yardımsever, pratik odaklı.`;

  async sendMessage(
    message: string,
    sessionId: string,
    context?: {
      previousAnalyses?: any[];
      currentAnalysis?: any;
    }
  ): Promise<ApiResponse<{ response: string; insights: AIAnalysisInsight[] }>> {
    try {
      if (!this.apiKey) {
        return this.getMockResponse(message, context);
      }

      const messages = [
        { role: 'system' as const, content: this.systemPrompt },
        ...this.buildContextMessages(context),
        { role: 'user' as const, content: message }
      ];

      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: this.model,
          messages,
          max_tokens: 1500,
          temperature: 0.7,
          presence_penalty: 0.1,
          frequency_penalty: 0.1,
        }),
      });

      if (!response.ok) {
        throw new ApiError(`OpenAI API error: ${response.status}`, response.status, 'OpenAI');
      }

      const data = await response.json();
      const aiResponse = data.choices[0]?.message?.content || 'Üzgünüm, yanıt oluşturamadım.';

      // Generate insights based on the conversation
      const insights = this.generateInsights(message, aiResponse, context);

      return {
        success: true,
        data: {
          response: aiResponse,
          insights
        }
      };
    } catch (error) {
      console.error('AI Service Error:', error);
      return this.getMockResponse(message, context);
    }
  }

  async analyzeROIData(roiData: any): Promise<ApiResponse<AIAnalysisInsight[]>> {
    try {
      const prompt = `Aşağıdaki ROI analiz verilerini değerlendirip öneriler sun:
      
ROI: %${roiData.analysis?.roi}
Geri dönüş süresi: ${roiData.analysis?.paybackPeriod} yıl
NPV: ₺${roiData.analysis?.npv}
Toplam yatırım: ₺${roiData.initialInvestment?.total}
Yıllık gelir: ₺${roiData.revenue?.grossRevenue}

Kısa ve pratik öneriler ver.`;

      const response = await this.sendMessage(prompt, 'analysis', { currentAnalysis: roiData });
      
      if (response.success) {
        return {
          success: true,
          data: response.data?.insights || []
        };
      }

      return {
        success: false,
        error: 'ROI analizi yapılamadı'
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'ROI analizi başarısız'
      };
    }
  }

  async analyzeClimateData(climateData: any): Promise<ApiResponse<AIAnalysisInsight[]>> {
    try {
      const prompt = `Aşağıdaki iklim analiz verilerini değerlendirip öneriler sun:
      
Risk skoru: ${climateData.riskScore}/100
Mevsimsel uygunluk: ${climateData.seasons?.map((s: any) => `${s.season}: ${s.suitability}/100`).join(', ')}

Bu veriler ışığında sera işletmesi için öneriler ver.`;

      const response = await this.sendMessage(prompt, 'analysis', { currentAnalysis: climateData });
      
      if (response.success) {
        return {
          success: true,
          data: response.data?.insights || []
        };
      }

      return {
        success: false,
        error: 'İklim analizi yapılamadı'
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'İklim analizi başarısız'
      };
    }
  }

  async analyzeMarketData(marketData: any): Promise<ApiResponse<AIAnalysisInsight[]>> {
    try {
      const prompt = `Aşağıdaki pazar analiz verilerini değerlendirip öneriler sun:
      
Ürün: ${marketData.product}
Pazar koşulu: ${marketData.analysis?.currentMarketCondition}
Talep seviyesi: ${marketData.analysis?.demandLevel}
Gelecek ay fiyat tahmini: ₺${marketData.predictions?.nextMonth?.price}

Bu veriler ışığında pazarlama stratejisi öner.`;

      const response = await this.sendMessage(prompt, 'analysis', { currentAnalysis: marketData });
      
      if (response.success) {
        return {
          success: true,
          data: response.data?.insights || []
        };
      }

      return {
        success: false,
        error: 'Pazar analizi yapılamadı'
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Pazar analizi başarısız'
      };
    }
  }

  private buildContextMessages(context?: any): any[] {
    if (!context) return [];

    const contextMessages = [];

    if (context.previousAnalyses?.length > 0) {
      const analysisContext = `Kullanıcının önceki analizleri:
${context.previousAnalyses.map((analysis: any, index: number) => 
  `${index + 1}. ${analysis.type}: ${JSON.stringify(analysis.summary)}`
).join('\n')}`;
      
      contextMessages.push({
        role: 'system' as const,
        content: `Kontext bilgisi: ${analysisContext}`
      });
    }

    if (context.currentAnalysis) {
      contextMessages.push({
        role: 'system' as const,
        content: `Şu anki analiz verisi: ${JSON.stringify(context.currentAnalysis)}`
      });
    }

    return contextMessages;
  }

  private generateInsights(
    userMessage: string,
    aiResponse: string,
    context?: any
  ): AIAnalysisInsight[] {
    const insights: AIAnalysisInsight[] = [];

    // ROI-related insights
    if (userMessage.toLowerCase().includes('roi') || userMessage.toLowerCase().includes('karlılık')) {
      insights.push({
        type: 'recommendation',
        title: 'ROI Optimizasyonu',
        description: 'Yatırım geri dönüş sürenizi kısaltmak için otomasyon sistemleri değerlendirin',
        priority: 'medium',
        actionable: true,
        relatedAnalysis: 'roi'
      });
    }

    // Climate-related insights  
    if (userMessage.toLowerCase().includes('iklim') || userMessage.toLowerCase().includes('hava')) {
      insights.push({
        type: 'warning',
        title: 'İklim Riski',
        description: 'Ekstrem hava koşullarına karşı sera güçlendirme önlemleri alın',
        priority: 'high',
        actionable: true,
        relatedAnalysis: 'climate'
      });
    }

    // Market-related insights
    if (userMessage.toLowerCase().includes('pazar') || userMessage.toLowerCase().includes('fiyat')) {
      insights.push({
        type: 'opportunity',
        title: 'Pazar Fırsatı',
        description: 'Organik sertifikası ile fiyat primi elde edebilirsiniz',
        priority: 'medium',
        actionable: true,
        relatedAnalysis: 'market'
      });
    }

    return insights.slice(0, 3); // Maksimum 3 insight
  }

  private getMockResponse(
    message: string,
    context?: any
  ): ApiResponse<{ response: string; insights: AIAnalysisInsight[] }> {
    // Mock responses for development/demo
    const mockResponses = {
      roi: `ROI analizinize baktığımda, %${context?.currentAnalysis?.analysis?.roi || '15'} getiri oranı oldukça makul görünüyor. Geri dönüş süresini kısaltmak için:

1. **Enerji maliyetlerini optimize edin** - Güneş paneli kurulumu %30-40 tasarruf sağlayabilir
2. **Premium ürün stratejisi** - Organik/yerel sertifikası ile fiyat primi alın  
3. **Verim artırıcı teknolojiler** - Hidroponik sistem değerlendirin

Risk faktörlerine karşı da hazırlıklı olun:
- Hava koşulları için sigorta
- Pazar dalgalanmaları için çeşitlendirme
- Enerji maliyetleri için alternatif kaynaklar`,

      climate: `İklim analiziniz umut verici! Risk skorunuzun ${context?.currentAnalysis?.riskScore || '25'}/100 olması lokasyonunuzun sera tarımı için uygun olduğunu gösteriyor.

**Önerilerim:**
1. **Yaz ayları için** - Gölgeleme sistemi ve havalandırma önemli
2. **Kış ayları için** - Ek ısıtma sistemi planlayın
3. **Yağışlı dönemler** - Drenaj sistemi mutlaka kurun

Bu iklim koşullarında domates, salatalık ve biber çok iyi sonuç verir. Özellikle ${context?.currentAnalysis?.seasons?.find((s: any) => s.suitability > 80)?.season || 'ilkbahar'} dönemi için planlama yapın.`,

      market: `${context?.currentAnalysis?.product || 'Ürününüz'} için pazar durumu değerlendirmem:

**Pozitif faktörler:**
- Talep seviyesi: ${context?.currentAnalysis?.analysis?.demandLevel || 'orta'}
- Fiyat trendi: Stabil görünüyor

**Stratejik öneriler:**
1. **Zamanlamanız perfect** - ${context?.currentAnalysis?.recommendations?.bestSellingPeriod || 'Yaz sezonu'} için hazırlanın
2. **Kalite odaklı** - Premium segmente odaklanın
3. **Doğrudan satış** - Aracı marjını kazanmak için farmer's market düşünün

Gelecek ay için ${context?.currentAnalysis?.predictions?.nextMonth?.price || '15'} TL/kg civarı fiyat bekleniyor.`,

      default: `Sera tarımı konusunda size yardımcı olmaya hazırım! 

**Sık sorulan konular:**
• ROI hesaplama ve optimizasyon
• İklim koşulları değerlendirmesi  
• Pazar analizi ve fiyat tahminleri
• Teknik ekipman seçimi
• İşletme maliyeti optimizasyonu

Hangi konuda daha detaylı bilgi almak istiyorsunuz? Yaptığınız analizleri de referans alarak özel öneriler verebilirim.`
    };

    let responseKey: keyof typeof mockResponses = 'default';
    
    if (message.toLowerCase().includes('roi') || message.toLowerCase().includes('karlılık')) {
      responseKey = 'roi';
    } else if (message.toLowerCase().includes('iklim') || message.toLowerCase().includes('hava')) {
      responseKey = 'climate';
    } else if (message.toLowerCase().includes('pazar') || message.toLowerCase().includes('fiyat')) {
      responseKey = 'market';
    }

    const insights = this.generateInsights(message, '', context);

    return {
      success: true,
      data: {
        response: mockResponses[responseKey],
        insights
      }
    };
  }

  // Utility method to create chat session
  createChatSession(userId: string, title: string = 'Yeni Sohbet'): ChatSession {
    return {
      id: `chat_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      userId,
      title,
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      context: {
        userAnalyses: []
      }
    };
  }

  // Add message to session
  addMessageToSession(session: ChatSession, message: ChatMessage): ChatSession {
    return {
      ...session,
      messages: [...session.messages, message],
      updatedAt: new Date()
    };
  }

  // Create message
  createMessage(
    role: 'user' | 'assistant',
    content: string,
    analysisContext?: any
  ): ChatMessage {
    return {
      id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      role,
      content,
      timestamp: new Date(),
      analysisContext
    };
  }
}

export const aiService = new AIService();
