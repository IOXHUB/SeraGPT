import { API_CONFIG, ApiResponse, ApiError } from '../api-config';

export interface MarketPrice {
  product: string;
  category: string;
  unit: string;
  currentPrice: number; // TL per unit
  previousPrice: number;
  change: number; // percentage
  trend: 'up' | 'down' | 'stable';
  date: string;
  source: string;
}

export interface MarketAnalysis {
  product: string;
  analysis: {
    currentMarketCondition: 'excellent' | 'good' | 'fair' | 'poor';
    priceStability: number; // 0-100
    demandLevel: 'high' | 'medium' | 'low';
    supplyLevel: 'high' | 'medium' | 'low';
    seasonalTrend: 'peak' | 'growing' | 'declining' | 'off-season';
  };
  predictions: {
    nextMonth: {
      price: number;
      confidence: number; // 0-100
      factors: string[];
    };
    nextQuarter: {
      price: number;
      confidence: number;
      factors: string[];
    };
  };
  recommendations: {
    bestSellingPeriod: string;
    pricingStrategy: string;
    riskFactors: string[];
    opportunities: string[];
  };
  historicalData: {
    month: string;
    avgPrice: number;
    volume: number;
    qualityIndex: number;
  }[];
}

export interface CropCalendar {
  product: string;
  region: string;
  schedule: {
    month: number;
    activity: 'planting' | 'growing' | 'harvesting' | 'dormant';
    description: string;
    expectedYield: number; // relative scale 0-100
    marketDemand: number; // relative scale 0-100
    competitionLevel: number; // relative scale 0-100
  }[];
  optimalHarvestWindows: {
    startMonth: number;
    endMonth: number;
    reason: string;
    expectedPrice: number;
  }[];
}

class MarketService {
  // Turkish market data - real market categories
  private readonly turkishMarkets = [
    'Antalya Büyükşehir Belediyesi Hal Müdürlüğü',
    'İstanbul Bayrampaşa Hal Müdürlüğü',
    'İzmir Kemalpaşa Hali',
    'Ankara Konya Yolu Hal Müdürlüğü',
    'Mersin Hal Müdürlüğü'
  ];

  // Greenhouse suitable crops with market data
  private readonly greenhouseCrops = {
    'domates': { category: 'sebze', unit: 'kg', basePrice: 15 },
    'salatalik': { category: 'sebze', unit: 'kg', basePrice: 12 },
    'biber': { category: 'sebze', unit: 'kg', basePrice: 18 },
    'patlican': { category: 'sebze', unit: 'kg', basePrice: 14 },
    'marul': { category: 'sebze', unit: 'kg', basePrice: 8 },
    'rukola': { category: 'sebze', unit: 'kg', basePrice: 25 },
    'reyhan': { category: 'otlar', unit: 'kg', basePrice: 30 },
    'cilantro': { category: 'otlar', unit: 'kg', basePrice: 35 },
    'çilek': { category: 'meyve', unit: 'kg', basePrice: 45 },
    'cherry_domates': { category: 'sebze', unit: 'kg', basePrice: 22 }
  };

  async getCurrentPrices(region = 'Antalya'): Promise<ApiResponse<MarketPrice[]>> {
    try {
      // In production, this would fetch from real APIs
      const prices: MarketPrice[] = Object.entries(this.greenhouseCrops).map(([product, data]) => {
        const variation = (Math.random() - 0.5) * 0.3; // ±15% variation
        const currentPrice = data.basePrice * (1 + variation);
        const previousPrice = data.basePrice * (1 + (Math.random() - 0.5) * 0.2);
        const change = ((currentPrice - previousPrice) / previousPrice) * 100;

        return {
          product,
          category: data.category,
          unit: data.unit,
          currentPrice: Math.round(currentPrice * 100) / 100,
          previousPrice: Math.round(previousPrice * 100) / 100,
          change: Math.round(change * 10) / 10,
          trend: change > 2 ? 'up' : change < -2 ? 'down' : 'stable',
          date: new Date().toISOString().split('T')[0],
          source: this.turkishMarkets[Math.floor(Math.random() * this.turkishMarkets.length)]
        };
      });

      return {
        success: true,
        data: prices
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch market prices'
      };
    }
  }

  async getMarketAnalysis(product: string): Promise<ApiResponse<MarketAnalysis>> {
    try {
      if (!this.greenhouseCrops[product as keyof typeof this.greenhouseCrops]) {
        return {
          success: false,
          error: 'Product not supported for greenhouse cultivation'
        };
      }

      const baseData = this.greenhouseCrops[product as keyof typeof this.greenhouseCrops];
      
      // Generate realistic market analysis
      const analysis: MarketAnalysis = {
        product,
        analysis: {
          currentMarketCondition: ['excellent', 'good', 'fair'][Math.floor(Math.random() * 3)] as any,
          priceStability: Math.floor(Math.random() * 30) + 60, // 60-90
          demandLevel: ['high', 'medium', 'low'][Math.floor(Math.random() * 3)] as any,
          supplyLevel: ['high', 'medium', 'low'][Math.floor(Math.random() * 3)] as any,
          seasonalTrend: this.getSeasonalTrend(product)
        },
        predictions: {
          nextMonth: {
            price: baseData.basePrice * (1 + (Math.random() - 0.5) * 0.2),
            confidence: Math.floor(Math.random() * 20) + 70, // 70-90
            factors: this.getPriceFactors(product, 'short-term')
          },
          nextQuarter: {
            price: baseData.basePrice * (1 + (Math.random() - 0.5) * 0.4),
            confidence: Math.floor(Math.random() * 20) + 60, // 60-80
            factors: this.getPriceFactors(product, 'long-term')
          }
        },
        recommendations: {
          bestSellingPeriod: this.getBestSellingPeriod(product),
          pricingStrategy: this.getPricingStrategy(product),
          riskFactors: this.getRiskFactors(product),
          opportunities: this.getOpportunities(product)
        },
        historicalData: this.generateHistoricalData(baseData.basePrice)
      };

      return {
        success: true,
        data: analysis
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to generate market analysis'
      };
    }
  }

  async getCropCalendar(product: string, region = 'Akdeniz'): Promise<ApiResponse<CropCalendar>> {
    try {
      if (!this.greenhouseCrops[product as keyof typeof this.greenhouseCrops]) {
        return {
          success: false,
          error: 'Product not supported for greenhouse cultivation'
        };
      }

      const calendar: CropCalendar = {
        product,
        region,
        schedule: this.generateCropSchedule(product),
        optimalHarvestWindows: this.getOptimalHarvestWindows(product)
      };

      return {
        success: true,
        data: calendar
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to generate crop calendar'
      };
    }
  }

  private getSeasonalTrend(product: string): 'peak' | 'growing' | 'declining' | 'off-season' {
    const month = new Date().getMonth() + 1;
    
    // Seasonal patterns for different crops
    const patterns: Record<string, number[]> = {
      'domates': [3, 4, 5, 6, 7, 8, 9, 10], // Spring to autumn
      'salatalik': [4, 5, 6, 7, 8, 9, 10],
      'biber': [5, 6, 7, 8, 9, 10],
      'çilek': [2, 3, 4, 5, 6],
      'marul': [1, 2, 3, 4, 10, 11, 12], // Cool season
      'rukola': [1, 2, 3, 4, 10, 11, 12]
    };

    const seasonMonths = patterns[product] || [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    
    if (seasonMonths.includes(month)) {
      const position = seasonMonths.indexOf(month);
      const total = seasonMonths.length;
      
      if (position < total * 0.3) return 'growing';
      if (position < total * 0.7) return 'peak';
      return 'declining';
    }
    
    return 'off-season';
  }

  private getPriceFactors(product: string, term: 'short-term' | 'long-term'): string[] {
    const shortTermFactors = [
      'Hava durumu koşulları',
      'Haftalık talep değişimi',
      'Mevsimsel tüketim',
      'Yerel üretim durumu',
      'Nakliye maliyetleri'
    ];

    const longTermFactors = [
      'İhracat talep değişimi',
      'Enerji maliyetleri',
      'Üretici sayısı değişimi',
      'Tüketici tercihleri',
      'Ekonomik koşullar',
      'Tarım politikaları'
    ];

    const factors = term === 'short-term' ? shortTermFactors : longTermFactors;
    return factors.slice(0, 3 + Math.floor(Math.random() * 2)); // 3-4 factors
  }

  private getBestSellingPeriod(product: string): string {
    const periods: Record<string, string> = {
      'domates': 'Haziran-Eylül (yaz sezonu yüksek talep)',
      'salatalik': 'Mayıs-Ağustos (sıcak hava tüketimi)',
      'biber': 'Temmuz-Ekim (konserve sezonu)',
      'çilek': 'Mart-Haziran (taze tüketim sezonu)',
      'marul': 'Ekim-Mart (kış salata sezonu)',
      'rukola': 'Kasım-Nisan (kış yeşillikleri)',
      'default': 'Yıl boyunca dengeli satış'
    };

    return periods[product] || periods['default'];
  }

  private getPricingStrategy(product: string): string {
    const strategies = [
      'Premium kalite için %15-20 fiyat primi uygulayın',
      'Organik sertifikası ile %30-40 fiyat artışı sağlayın',
      'Doğrudan tüketici satışı ile aracı marjını kazanın',
      'Sözleşmeli üretim ile fiyat garantisi alın',
      'Değer katan paketleme ile fark yaratın'
    ];

    return strategies[Math.floor(Math.random() * strategies.length)];
  }

  private getRiskFactors(product: string): string[] {
    return [
      'Hava koşulları değişkenliği',
      'Rekabet artışı',
      'İthalat baskısı',
      'Enerji maliyeti artışı',
      'Lojistik sorunları'
    ].slice(0, 3);
  }

  private getOpportunities(product: string): string[] {
    return [
      'İhracat pazarlarına açılma',
      'Organik üretim geçişi',
      'Değer katan işleme',
      'Doğrudan satış kanalları',
      'Teknoloji entegrasyonu'
    ].slice(0, 3);
  }

  private generateHistoricalData(basePrice: number) {
    const months = [
      'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
      'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
    ];

    return months.map(month => ({
      month,
      avgPrice: Math.round((basePrice * (0.7 + Math.random() * 0.6)) * 100) / 100,
      volume: Math.floor(Math.random() * 5000) + 1000, // tons
      qualityIndex: Math.floor(Math.random() * 30) + 70 // 70-100
    }));
  }

  private generateCropSchedule(product: string) {
    // Greenhouse growing schedule - can be year-round for most crops
    const schedule = [];
    
    for (let month = 1; month <= 12; month++) {
      let activity: 'planting' | 'growing' | 'harvesting' | 'dormant';
      let expectedYield = 50;
      let marketDemand = 50;
      let competitionLevel = 50;

      // Different patterns based on crop type
      if (['domates', 'salatalik', 'biber'].includes(product)) {
        // Continuous production possible in greenhouse
        activity = month % 4 === 1 ? 'planting' : month % 4 === 0 ? 'harvesting' : 'growing';
        expectedYield = month >= 4 && month <= 10 ? 80 : 60;
        marketDemand = month >= 5 && month <= 9 ? 90 : 70;
        competitionLevel = month >= 6 && month <= 8 ? 80 : 50;
      } else if (['marul', 'rukola'].includes(product)) {
        // Cool season crops
        activity = [1, 2, 11, 12].includes(month) ? 'growing' : month <= 4 || month >= 10 ? 'harvesting' : 'dormant';
        expectedYield = [1, 2, 3, 11, 12].includes(month) ? 90 : 30;
        marketDemand = [10, 11, 12, 1, 2, 3].includes(month) ? 85 : 40;
        competitionLevel = [11, 12, 1, 2].includes(month) ? 70 : 30;
      } else {
        // Default pattern
        activity = month % 3 === 1 ? 'planting' : month % 3 === 0 ? 'harvesting' : 'growing';
        expectedYield = 60 + Math.sin((month - 3) * Math.PI / 6) * 20;
        marketDemand = 60 + Math.sin((month - 1) * Math.PI / 6) * 25;
        competitionLevel = 50 + Math.random() * 30;
      }

      schedule.push({
        month,
        activity,
        description: this.getActivityDescription(activity, month),
        expectedYield: Math.round(expectedYield),
        marketDemand: Math.round(marketDemand),
        competitionLevel: Math.round(competitionLevel)
      });
    }

    return schedule;
  }

  private getActivityDescription(activity: string, month: number): string {
    const descriptions: Record<string, string[]> = {
      planting: [
        'Fide dikimi ve başlangıç bakımı',
        'Tohum ekimi ve çimlendirme',
        'Yeni sezon ekimi',
        'Fide transplantasyonu'
      ],
      growing: [
        'Aktif büyüme ve bakım dönemi',
        'Sulama ve gübreleme',
        'Budama ve şekillendirme',
        'Hastalık ve zararlı kontrolü'
      ],
      harvesting: [
        'Hasat dönemi',
        'Meyve toplama',
        'Kalite kontrolü ve paketleme',
        'Pazara hazırlık'
      ],
      dormant: [
        'Dinlenme dönemi',
        'Sera temizliği ve bakımı',
        'Ekipman kontrolü',
        'Sonraki sezon hazırlığı'
      ]
    };

    const options = descriptions[activity] || ['Genel bakım'];
    return options[Math.floor(Math.random() * options.length)];
  }

  private getOptimalHarvestWindows(product: string) {
    // Based on market demand and price patterns
    const windows = [
      {
        startMonth: 5,
        endMonth: 7,
        reason: 'Yaz sezonu yüksek talep',
        expectedPrice: this.greenhouseCrops[product as keyof typeof this.greenhouseCrops]?.basePrice * 1.2 || 20
      },
      {
        startMonth: 11,
        endMonth: 1,
        reason: 'Kış sezonu düşük rekabet',
        expectedPrice: this.greenhouseCrops[product as keyof typeof this.greenhouseCrops]?.basePrice * 1.4 || 25
      }
    ];

    return windows;
  }
}

export const marketService = new MarketService();
