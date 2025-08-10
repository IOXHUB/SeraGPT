import { NextRequest, NextResponse } from 'next/server';

// =====================================================
// MARKET ANALYSIS API ENDPOINT
// =====================================================
// Analyzes market prices, demand patterns, and 
// commercial opportunities for greenhouse products
// =====================================================

interface MarketRequest {
  location: {
    city: string;
    region: string;
    target_markets: Array<'local' | 'regional' | 'national' | 'export'>;
    distribution_radius: number; // km
  };
  crop: {
    primary_crop: 'tomato' | 'cucumber' | 'pepper' | 'lettuce' | 'strawberry' | 'herb' | 'flower' | 'other';
    secondary_crops?: Array<string>;
    variety: string;
    quality_grade: 'standard' | 'premium' | 'organic' | 'gourmet';
    production_volume: number; // kg/year
    harvest_period: {
      start_month: number;
      end_month: number;
      peak_months: Array<number>;
    };
  };
  production_system: {
    greenhouse_size: number; // m²
    production_method: 'conventional' | 'organic' | 'hydroponic' | 'bio';
    packaging_type: 'bulk' | 'retail_package' | 'premium_package' | 'processed';
    certification: Array<'organic' | 'gap' | 'globalgap' | 'brc' | 'haccp' | 'halal' | 'kosher'>;
    shelf_life_days: number;
  };
  market_strategy: {
    sales_channels: Array<'wholesale' | 'retail' | 'direct_consumer' | 'export' | 'processing' | 'farmers_market'>;
    target_customer: 'supermarkets' | 'restaurants' | 'hotels' | 'distributors' | 'consumers' | 'processors';
    brand_positioning: 'economy' | 'mid_market' | 'premium' | 'luxury' | 'organic';
    value_added_processing: boolean;
  };
  financial_targets: {
    min_price_per_kg: number;
    target_profit_margin: number; // %
    max_transport_cost_percentage: number;
    payment_terms_preference: 'cash' | 'net_30' | 'net_60' | 'consignment';
  };
}

interface MarketResponse {
  success: boolean;
  data: {
    market_overview: {
      market_size_tonnes: number;
      annual_growth_rate: number; // %
      market_value_tl: number;
      competition_level: 'low' | 'moderate' | 'high' | 'intense';
      market_saturation: number; // % 0-100
      opportunity_score: number; // 0-100
    };
    price_analysis: {
      current_market_prices: {
        wholesale_price_per_kg: number;
        retail_price_per_kg: number;
        premium_price_per_kg: number;
        organic_price_per_kg: number;
        export_price_per_kg: number;
      };
      historical_trends: Array<{
        year: number;
        average_price: number;
        price_change_percentage: number;
        key_factors: Array<string>;
      }>;
      seasonal_patterns: Array<{
        month: string;
        month_number: number;
        price_index: number; // base 100
        supply_level: 'low' | 'medium' | 'high';
        demand_level: 'low' | 'medium' | 'high';
        price_volatility: number; // %
        opportunity_level: 'poor' | 'fair' | 'good' | 'excellent';
      }>;
      price_forecasts: Array<{
        period: string;
        forecasted_price: number;
        confidence_level: number; // %
        influencing_factors: Array<string>;
        risk_factors: Array<string>;
      }>;
    };
    demand_analysis: {
      current_demand: {
        total_demand_tonnes: number;
        unsatisfied_demand_tonnes: number;
        growth_potential: number; // %
        peak_demand_months: Array<number>;
        low_demand_months: Array<number>;
      };
      consumer_trends: Array<{
        trend: string;
        impact_level: 'low' | 'medium' | 'high';
        market_share_affected: number; // %
        duration_months: number;
        opportunity_description: string;
      }>;
      segment_analysis: Array<{
        segment: string;
        size_percentage: number;
        growth_rate: number;
        price_sensitivity: 'low' | 'medium' | 'high';
        quality_requirements: Array<string>;
        preferred_suppliers: Array<string>;
      }>;
    };
    competitive_landscape: {
      main_competitors: Array<{
        competitor_name: string;
        market_share: number; // %
        production_volume: number; // tonnes
        price_range: { min: number; max: number };
        key_advantages: Array<string>;
        weaknesses: Array<string>;
        threat_level: 'low' | 'medium' | 'high';
        differentiation_opportunities: Array<string>;
      }>;
      market_concentration: {
        top_3_share: number; // %
        top_5_share: number; // %
        fragmentation_level: 'low' | 'medium' | 'high';
        entry_barriers: Array<string>;
        exit_barriers: Array<string>;
      };
      swot_analysis: {
        strengths: Array<string>;
        weaknesses: Array<string>;
        opportunities: Array<string>;
        threats: Array<string>;
      };
    };
    market_channels: Array<{
      channel: string;
      market_share: number; // %
      average_margin: number; // %
      volume_potential: number; // kg
      requirements: Array<string>;
      payment_terms: string;
      logistics_complexity: 'simple' | 'moderate' | 'complex';
      relationship_building_time: number; // months
      risk_level: 'low' | 'medium' | 'high';
      recommendation_score: number; // 1-10
    }>;
    regional_opportunities: Array<{
      region_name: string;
      distance_km: number;
      market_size: number; // tonnes
      price_premium: number; // %
      transportation_cost: number; // TL/kg
      net_price_advantage: number; // TL/kg
      market_access_difficulty: 'easy' | 'moderate' | 'difficult';
      regulatory_requirements: Array<string>;
      recommendation: string;
    }>;
    export_opportunities: Array<{
      country: string;
      market_size: number; // tonnes
      import_price: number; // USD/kg
      tariff_rate: number; // %
      certification_requirements: Array<string>;
      shipping_cost: number; // USD/kg
      net_profit_potential: number; // USD/kg
      market_entry_difficulty: 'easy' | 'moderate' | 'difficult';
      seasonal_demand: Array<number>; // monthly demand index
      recommendation_priority: 'high' | 'medium' | 'low';
    }>;
    financial_projections: {
      revenue_scenarios: Array<{
        scenario: 'conservative' | 'realistic' | 'optimistic';
        annual_revenue: number;
        average_selling_price: number;
        volume_sold: number;
        key_assumptions: Array<string>;
      }>;
      profit_analysis: {
        gross_profit_margin: number; // %
        operating_profit_margin: number; // %
        break_even_volume: number; // kg
        price_sensitivity_analysis: Array<{
          price_change: number; // %
          volume_impact: number; // %
          profit_impact: number; // %
        }>;
      };
      cash_flow_projections: Array<{
        month: number;
        revenue: number;
        costs: number;
        net_cash_flow: number;
        cumulative_cash_flow: number;
      }>;
    };
    marketing_recommendations: {
      positioning_strategy: string;
      target_customer_profile: string;
      pricing_strategy: string;
      distribution_strategy: string;
      promotion_tactics: Array<string>;
      brand_development: Array<string>;
      success_metrics: Array<string>;
    };
    risk_assessment: Array<{
      risk_type: string;
      probability: number; // %
      impact_severity: 'low' | 'medium' | 'high' | 'critical';
      description: string;
      mitigation_strategies: Array<string>;
      monitoring_indicators: Array<string>;
    }>;
    action_plan: Array<{
      phase: string;
      timeline: string;
      actions: Array<string>;
      resources_required: Array<string>;
      success_criteria: Array<string>;
      budget_estimate: number;
    }>;
    pdf_url: string;
    analysis_id: string;
    generated_at: string;
  };
  token_cost: number;
  processing_time_ms: number;
}

export async function POST(request: NextRequest) {
  const startTime = Date.now();
  
  try {
    // Parse request body
    const body: MarketRequest = await request.json();
    
    // Input validation
    const validation = validateMarketRequest(body);
    if (!validation.valid) {
      return NextResponse.json({
        success: false,
        error: validation.error,
        token_cost: 0,
        processing_time_ms: Date.now() - startTime
      }, { status: 400 });
    }

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 3000 + Math.random() * 4000));

    // Generate mock market analysis
    const analysis = generateMarketAnalysis(body);
    
    const processingTime = Date.now() - startTime;
    
    return NextResponse.json({
      success: true,
      data: analysis,
      token_cost: 2, // Market analysis costs 2 tokens
      processing_time_ms: processingTime
    });

  } catch (error) {
    console.error('Market Analysis API Error:', error);
    
    return NextResponse.json({
      success: false,
      error: 'Pazar analizi gerçekleştirilemedi. Lütfen daha sonra tekrar deneyin.',
      token_cost: 0,
      processing_time_ms: Date.now() - startTime
    }, { status: 500 });
  }
}

function validateMarketRequest(body: MarketRequest) {
  if (!body.location?.city || !body.location?.region) {
    return { valid: false, error: 'Lokasyon bilgileri eksik' };
  }
  
  if (!body.crop?.primary_crop || !body.crop?.production_volume || body.crop.production_volume <= 0) {
    return { valid: false, error: 'Ürün tipi ve üretim miktarı gereklidir' };
  }
  
  if (!body.production_system?.greenhouse_size || body.production_system.greenhouse_size <= 0) {
    return { valid: false, error: 'Sera boyutu gereklidir' };
  }
  
  if (!body.market_strategy?.sales_channels || body.market_strategy.sales_channels.length === 0) {
    return { valid: false, error: 'Satış kanalları belirtilmelidir' };
  }
  
  return { valid: true };
}

function generateMarketAnalysis(request: MarketRequest): MarketResponse['data'] {
  const { location, crop, production_system, market_strategy, financial_targets } = request;
  
  // Get market data for the crop and region
  const marketData = getMarketData(crop.primary_crop, location.region);
  const competitionLevel = getCompetitionLevel(crop.primary_crop, location.region);
  
  return {
    market_overview: generateMarketOverview(marketData, crop, location),
    price_analysis: generatePriceAnalysis(marketData, crop, location),
    demand_analysis: generateDemandAnalysis(marketData, crop, location),
    competitive_landscape: generateCompetitiveLandscape(crop, location, competitionLevel),
    market_channels: generateMarketChannels(market_strategy, crop),
    regional_opportunities: generateRegionalOpportunities(location, crop),
    export_opportunities: generateExportOpportunities(crop, location),
    financial_projections: generateFinancialProjections(crop, marketData, financial_targets),
    marketing_recommendations: generateMarketingRecommendations(crop, market_strategy, marketData),
    risk_assessment: generateRiskAssessment(crop, location, marketData),
    action_plan: generateActionPlan(crop, market_strategy),
    pdf_url: `/api/analysis/market/download?id=market_${Date.now()}`,
    analysis_id: `market_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    generated_at: new Date().toISOString()
  };
}

function getMarketData(crop: string, region: string) {
  const baseData = {
    tomato: { 
      marketSize: 2800000, // tonnes
      avgPrice: 8.5, // TL/kg
      growthRate: 3.2, // %
      volatility: 25 // %
    },
    cucumber: { 
      marketSize: 1850000, 
      avgPrice: 6.2, 
      growthRate: 2.8, 
      volatility: 30 
    },
    pepper: { 
      marketSize: 980000, 
      avgPrice: 12.4, 
      growthRate: 4.5, 
      volatility: 35 
    },
    lettuce: { 
      marketSize: 560000, 
      avgPrice: 4.8, 
      growthRate: 6.2, 
      volatility: 20 
    },
    strawberry: { 
      marketSize: 485000, 
      avgPrice: 35.0, 
      growthRate: 8.5, 
      volatility: 40 
    },
    herb: { 
      marketSize: 120000, 
      avgPrice: 45.0, 
      growthRate: 12.5, 
      volatility: 45 
    }
  };
  
  // Regional adjustments
  const regionalMultipliers = {
    'Akdeniz': { size: 1.2, price: 1.1 },
    'Ege': { size: 1.0, price: 1.05 },
    'Marmara': { size: 1.4, price: 1.15 },
    'İç Anadolu': { size: 0.8, price: 0.95 },
    'Karadeniz': { size: 0.6, price: 0.9 },
    'Doğu Anadolu': { size: 0.4, price: 0.85 },
    'Güneydoğu Anadolu': { size: 0.7, price: 0.9 }
  };
  
  const base = baseData[crop as keyof typeof baseData] || baseData.tomato;
  const multiplier = regionalMultipliers[region as keyof typeof regionalMultipliers] || { size: 1.0, price: 1.0 };
  
  return {
    ...base,
    marketSize: base.marketSize * multiplier.size,
    avgPrice: base.avgPrice * multiplier.price
  };
}

function getCompetitionLevel(crop: string, region: string): 'low' | 'moderate' | 'high' | 'intense' {
  // Competition levels based on crop and region
  const competitionMatrix = {
    tomato: { 'Akdeniz': 'intense', 'Marmara': 'high', 'Ege': 'high' },
    cucumber: { 'Akdeniz': 'high', 'Marmara': 'moderate', 'Ege': 'moderate' },
    pepper: { 'Akdeniz': 'moderate', 'Güneydoğu Anadolu': 'high' },
    lettuce: { 'Marmara': 'moderate', 'Ege': 'low' },
    strawberry: { 'Akdeniz': 'high', 'Karadeniz': 'moderate' },
    herb: { 'Akdeniz': 'low', 'Ege': 'low', 'Marmara': 'moderate' }
  };
  
  return (competitionMatrix as any)[crop]?.[region] || 'moderate';
}

function generateMarketOverview(marketData: any, crop: any, location: any) {
  const saturation = Math.min(85, Math.max(15, 45 + Math.random() * 30));
  const opportunityScore = Math.max(10, 100 - saturation + (marketData.growthRate * 5));
  
  return {
    market_size_tonnes: Math.round(marketData.marketSize),
    annual_growth_rate: marketData.growthRate,
    market_value_tl: Math.round(marketData.marketSize * marketData.avgPrice * 1000000),
    competition_level: getCompetitionLevel(crop.primary_crop, location.region),
    market_saturation: Math.round(saturation),
    opportunity_score: Math.round(opportunityScore)
  };
}

function generatePriceAnalysis(marketData: any, crop: any, location: any) {
  const basePrice = marketData.avgPrice;
  
  return {
    current_market_prices: {
      wholesale_price_per_kg: Math.round(basePrice * 0.7 * 100) / 100,
      retail_price_per_kg: Math.round(basePrice * 1.4 * 100) / 100,
      premium_price_per_kg: Math.round(basePrice * 1.8 * 100) / 100,
      organic_price_per_kg: Math.round(basePrice * 2.2 * 100) / 100,
      export_price_per_kg: Math.round(basePrice * 1.3 * 100) / 100
    },
    historical_trends: generateHistoricalTrends(basePrice, marketData.growthRate),
    seasonal_patterns: generateSeasonalPatterns(crop.primary_crop, basePrice),
    price_forecasts: generatePriceForecasts(basePrice, marketData.growthRate, marketData.volatility)
  };
}

function generateHistoricalTrends(basePrice: number, growthRate: number) {
  const currentYear = new Date().getFullYear();
  const trends = [];
  
  for (let i = 4; i >= 0; i--) {
    const year = currentYear - i;
    const price = basePrice * Math.pow(1 + (growthRate + (Math.random() * 4 - 2)) / 100, -i);
    const changePercentage = i === 4 ? 0 : ((basePrice * Math.pow(1 + growthRate / 100, -i + 1) - price) / price) * 100;
    
    trends.push({
      year,
      average_price: Math.round(price * 100) / 100,
      price_change_percentage: Math.round(changePercentage * 100) / 100,
      key_factors: getYearlyFactors(year, i)
    });
  }
  
  return trends;
}

function getYearlyFactors(year: number, yearsBack: number): string[] {
  const factors = [
    ['COVID-19 etkisi', 'Tedarik zinciri sorunları', 'Nakliye maliyeti artışı'],
    ['Ekonomik toparlanma', 'Tarım destekleri', 'İhracat artışı'],
    ['Enflasyon etkisi', 'Enerji maliyetleri', 'Döviz kurları'],
    ['İklim değişikliği', 'Su kıtlığı', 'Teknoloji yatırımları'],
    ['Pazar büyümesi', 'Tüketici tercihleri', 'Organik trend']
  ];
  
  return factors[yearsBack] || ['Normal pazar koşulları'];
}

function generateSeasonalPatterns(crop: string, basePrice: number) {
  const months = [
    'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
    'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
  ];
  
  // Seasonal price patterns for different crops
  const seasonalMultipliers = {
    tomato: [1.3, 1.2, 1.0, 0.8, 0.7, 0.6, 0.6, 0.7, 0.9, 1.1, 1.2, 1.3],
    cucumber: [1.4, 1.3, 1.1, 0.9, 0.7, 0.6, 0.6, 0.8, 1.0, 1.2, 1.3, 1.4],
    pepper: [1.2, 1.1, 0.9, 0.8, 0.7, 0.8, 0.9, 1.0, 1.1, 1.2, 1.3, 1.2],
    lettuce: [0.9, 0.8, 0.9, 1.0, 1.1, 1.2, 1.3, 1.2, 1.1, 1.0, 0.9, 0.8],
    strawberry: [1.5, 1.4, 1.2, 0.8, 0.6, 0.7, 0.9, 1.1, 1.3, 1.4, 1.5, 1.6],
    herb: [1.1, 1.0, 0.9, 0.9, 1.0, 1.1, 1.2, 1.1, 1.0, 0.9, 1.0, 1.1]
  };
  
  const multipliers = seasonalMultipliers[crop as keyof typeof seasonalMultipliers] || seasonalMultipliers.tomato;
  
  return months.map((month, index) => {
    const priceIndex = Math.round(multipliers[index] * 100);
    const supply = priceIndex > 120 ? 'low' : priceIndex < 80 ? 'high' : 'medium';
    const demand = priceIndex > 110 ? 'high' : priceIndex < 90 ? 'low' : 'medium';
    const volatility = Math.abs(100 - priceIndex) / 2;
    
    return {
      month,
      month_number: index + 1,
      price_index: priceIndex,
      supply_level: supply as 'low' | 'medium' | 'high',
      demand_level: demand as 'low' | 'medium' | 'high',
      price_volatility: Math.round(volatility),
      opportunity_level: (priceIndex > 115 ? 'excellent' : 
                         priceIndex > 105 ? 'good' : 
                         priceIndex > 95 ? 'fair' : 'poor') as 'poor' | 'fair' | 'good' | 'excellent'
    };
  });
}

function generatePriceForecasts(basePrice: number, growthRate: number, volatility: number) {
  return [
    {
      period: 'Gelecek 3 Ay',
      forecasted_price: Math.round(basePrice * (1 + (growthRate / 4) / 100) * 100) / 100,
      confidence_level: 85,
      influencing_factors: ['Mevsimsel talepler', 'Hasat döngüsü', 'Mevcut stok seviyeleri'],
      risk_factors: ['Hava koşulları', 'Nakliye maliyetleri']
    },
    {
      period: 'Gelecek 6 Ay',
      forecasted_price: Math.round(basePrice * (1 + (growthRate / 2) / 100) * 100) / 100,
      confidence_level: 75,
      influencing_factors: ['Üretim planları', 'Tüketici trendleri', 'Rakip ürünler'],
      risk_factors: ['Ekonomik koşullar', 'Döviz kurları', 'Enerji fiyatları']
    },
    {
      period: 'Gelecek 1 Yıl',
      forecasted_price: Math.round(basePrice * (1 + growthRate / 100) * 100) / 100,
      confidence_level: 65,
      influencing_factors: ['Teknoloji gelişmeleri', 'Pazar genişlemesi', 'Nüfus artışı'],
      risk_factors: ['İklim değişikliği', 'Tarım politikaları', 'Uluslararası ticaret']
    }
  ];
}

function generateDemandAnalysis(marketData: any, crop: any, location: any) {
  const totalDemand = marketData.marketSize * 0.8; // 80% of market size represents actual demand
  const unsatisfiedDemand = totalDemand * 0.15; // 15% unsatisfied demand
  
  return {
    current_demand: {
      total_demand_tonnes: Math.round(totalDemand),
      unsatisfied_demand_tonnes: Math.round(unsatisfiedDemand),
      growth_potential: Math.round(marketData.growthRate + Math.random() * 3),
      peak_demand_months: getPeakDemandMonths(crop.primary_crop),
      low_demand_months: getLowDemandMonths(crop.primary_crop)
    },
    consumer_trends: generateConsumerTrends(crop.primary_crop),
    segment_analysis: generateSegmentAnalysis(crop.primary_crop)
  };
}

function getPeakDemandMonths(crop: string): number[] {
  const patterns = {
    tomato: [12, 1, 2], // Winter months
    cucumber: [11, 12, 1], 
    pepper: [10, 11, 12],
    lettuce: [6, 7, 8], // Summer months
    strawberry: [12, 1, 2, 3],
    herb: [11, 12, 1, 2]
  };
  
  return patterns[crop as keyof typeof patterns] || [12, 1, 2];
}

function getLowDemandMonths(crop: string): number[] {
  const patterns = {
    tomato: [6, 7, 8], // Summer months
    cucumber: [5, 6, 7],
    pepper: [5, 6, 7],
    lettuce: [12, 1, 2], // Winter months
    strawberry: [7, 8, 9],
    herb: [6, 7, 8]
  };
  
  return patterns[crop as keyof typeof patterns] || [6, 7, 8];
}

function generateConsumerTrends(crop: string) {
  return [
    {
      trend: 'Organik ürün talebi artışı',
      impact_level: 'high' as const,
      market_share_affected: 25,
      duration_months: 36,
      opportunity_description: 'Organik sertifikalı üretim ile %30-50 fiyat primi'
    },
    {
      trend: 'Yerel üretim tercihi',
      impact_level: 'medium' as const,
      market_share_affected: 40,
      duration_months: 24,
      opportunity_description: 'Yakın mesafe pazarlama avantajı'
    },
    {
      trend: 'Sürdürülebilir ambalaj beklentisi',
      impact_level: 'medium' as const,
      market_share_affected: 30,
      duration_months: 18,
      opportunity_description: 'Çevre dostu ambalaj ile marka değeri artışı'
    }
  ];
}

function generateSegmentAnalysis(crop: string) {
  return [
    {
      segment: 'Süpermarket Zincirleri',
      size_percentage: 45,
      growth_rate: 3.5,
      price_sensitivity: 'high' as const,
      quality_requirements: ['Uniform boyut', 'Uzun raf ömrü', 'Görsel kalite'],
      preferred_suppliers: ['Büyük üreticiler', 'Kooperatifler']
    },
    {
      segment: 'Restoran & Otel',
      size_percentage: 25,
      growth_rate: 5.2,
      price_sensitivity: 'medium' as const,
      quality_requirements: ['Taze ürün', 'Düzenli teslimat', 'Premium kalite'],
      preferred_suppliers: ['Güvenilir tedarikçiler', 'Bölgesel üreticiler']
    },
    {
      segment: 'Doğrudan Tüketici',
      size_percentage: 20,
      growth_rate: 8.5,
      price_sensitivity: 'low' as const,
      quality_requirements: ['Organik', 'Yerel üretim', 'Hikaye'],
      preferred_suppliers: ['Küçük çiftlikler', 'Çiftçi pazarları']
    },
    {
      segment: 'İhracat Pazarları',
      size_percentage: 10,
      growth_rate: 12.0,
      price_sensitivity: 'low' as const,
      quality_requirements: ['Uluslararası standartlar', 'Sertifikasyon', 'İzlenebilirlik'],
      preferred_suppliers: ['Sertifikalı üreticiler', 'İhracat firmaları']
    }
  ];
}

function generateCompetitiveLandscape(crop: any, location: any, competitionLevel: string) {
  return {
    main_competitors: generateMainCompetitors(crop.primary_crop, location.region),
    market_concentration: {
      top_3_share: competitionLevel === 'intense' ? 65 : competitionLevel === 'high' ? 45 : 30,
      top_5_share: competitionLevel === 'intense' ? 80 : competitionLevel === 'high' ? 65 : 50,
      fragmentation_level: competitionLevel === 'intense' ? 'low' : 'medium' as 'low' | 'medium' | 'high',
      entry_barriers: ['Yüksek başlangıç maliyeti', 'Dağıtım ağı gereksinimleri', 'Kalite standartları'],
      exit_barriers: ['Sabit varlık yatırımları', 'Uzun vadeli sözleşmeler']
    },
    swot_analysis: generateSWOTAnalysis(crop, location, competitionLevel)
  };
}

function generateMainCompetitors(crop: string, region: string) {
  const competitors = [
    {
      competitor_name: 'Sera Üreticileri Kooperatifi',
      market_share: 18,
      production_volume: 15000,
      price_range: { min: 6.5, max: 8.5 },
      key_advantages: ['Büyük ölçek', 'Düşük maliyet', 'Yaygın dağıtım'],
      weaknesses: ['Kalite tutarsızlığı', 'Yavaş karar alma'],
      threat_level: 'high' as const,
      differentiation_opportunities: ['Premium kalite', 'Hızlı teslimat', 'Özel ambalaj']
    },
    {
      competitor_name: 'Modern Sera A.Ş.',
      market_share: 12,
      production_volume: 8500,
      price_range: { min: 8.0, max: 11.0 },
      key_advantages: ['Modern teknoloji', 'Yüksek kalite', 'Marka gücü'],
      weaknesses: ['Yüksek fiyat', 'Sınırlı ürün çeşitliliği'],
      threat_level: 'medium' as const,
      differentiation_opportunities: ['Uygun fiyat', 'Çeşit genişliği', 'Yerel odak']
    },
    {
      competitor_name: 'Bölgesel Küçük Üreticiler',
      market_share: 35,
      production_volume: 25000,
      price_range: { min: 5.5, max: 7.5 },
      key_advantages: ['Düşük fiyat', 'Yerel bağlantılar', 'Esneklik'],
      weaknesses: ['Küçük ölçek', 'Teknoloji eksikliği', 'Pazarlama sorunu'],
      threat_level: 'medium' as const,
      differentiation_opportunities: ['Teknoloji üstünlüğü', 'Kalite garantisi', 'Profesyonel pazarlama']
    }
  ];
  
  return competitors;
}

function generateSWOTAnalysis(crop: any, location: any, competitionLevel: string) {
  return {
    strengths: [
      'Modern sera teknolojisi',
      'Kontrollü üretim ortamı',
      'Yıl boyu üretim kapasitesi',
      'Kalite tutarlılığı'
    ],
    weaknesses: [
      'Yüksek başlangıç maliyeti',
      'Enerji bağımlılığı',
      'Teknik uzmanlık gereksinimleri',
      'Pazarlama deneyimi eksikliği'
    ],
    opportunities: [
      'Artan organik ürün talebi',
      'İhracat potansiyeli',
      'Değer katma fırsatları',
      'Teknoloji destekleri'
    ],
    threats: [
      'Enerji maliyeti artışları',
      'İthalat rekabeti',
      'İklim değişikliği',
      'Düzenleyici değişiklikler'
    ]
  };
}

function generateMarketChannels(marketStrategy: any, crop: any) {
  return [
    {
      channel: 'Toptan Hal',
      market_share: 40,
      average_margin: 15,
      volume_potential: Math.round(crop.production_volume * 0.6),
      requirements: ['Kalite standardı', 'Düzenli teslimat', 'Fiyat rekabeti'],
      payment_terms: 'Nakit veya 15 gün vadeli',
      logistics_complexity: 'simple' as const,
      relationship_building_time: 2,
      risk_level: 'medium' as const,
      recommendation_score: 7
    },
    {
      channel: 'Süpermarket Zincirleri',
      market_share: 35,
      average_margin: 25,
      volume_potential: Math.round(crop.production_volume * 0.4),
      requirements: ['Sertifikasyon', 'Ambalaj standardı', 'Sigorta', 'Düzenli kalite'],
      payment_terms: '30-60 gün vadeli',
      logistics_complexity: 'complex' as const,
      relationship_building_time: 6,
      risk_level: 'low' as const,
      recommendation_score: 8
    },
    {
      channel: 'Doğrudan Satış',
      market_share: 15,
      average_margin: 45,
      volume_potential: Math.round(crop.production_volume * 0.2),
      requirements: ['Satış noktası', 'Müşteri hizmetleri', 'Pazarlama'],
      payment_terms: 'Peşin ödeme',
      logistics_complexity: 'moderate' as const,
      relationship_building_time: 3,
      risk_level: 'medium' as const,
      recommendation_score: 6
    },
    {
      channel: 'İhracat',
      market_share: 10,
      average_margin: 35,
      volume_potential: Math.round(crop.production_volume * 0.3),
      requirements: ['İhracat lisansı', 'Uluslararası sertifika', 'Soğuk zincir'],
      payment_terms: 'Akreditif',
      logistics_complexity: 'complex' as const,
      relationship_building_time: 12,
      risk_level: 'high' as const,
      recommendation_score: 9
    }
  ];
}

function generateRegionalOpportunities(location: any, crop: any) {
  return [
    {
      region_name: 'İstanbul',
      distance_km: 450,
      market_size: 125000,
      price_premium: 15,
      transportation_cost: 0.35,
      net_price_advantage: 0.85,
      market_access_difficulty: 'moderate' as const,
      regulatory_requirements: ['Gıda güvenlik sertifikası', 'Taşıma lisansı'],
      recommendation: 'Yüksek kar marjı nedeniyle öncelikli pazar'
    },
    {
      region_name: 'Ankara',
      distance_km: 320,
      market_size: 85000,
      price_premium: 12,
      transportation_cost: 0.25,
      net_price_advantage: 0.75,
      market_access_difficulty: 'easy' as const,
      regulatory_requirements: ['Standart belgeler'],
      recommendation: 'Dengeli risk-getiri oranı'
    },
    {
      region_name: 'İzmir',
      distance_km: 180,
      market_size: 95000,
      price_premium: 8,
      transportation_cost: 0.15,
      net_price_advantage: 0.45,
      market_access_difficulty: 'easy' as const,
      regulatory_requirements: ['Yerel üretici sertifikası'],
      recommendation: 'Yakın mesafe avantajı'
    }
  ];
}

function generateExportOpportunities(crop: any, location: any) {
  return [
    {
      country: 'Rusya',
      market_size: 85000,
      import_price: 1.8, // USD/kg
      tariff_rate: 15,
      certification_requirements: ['GOST-R', 'Fitosaniter sertifika'],
      shipping_cost: 0.25,
      net_profit_potential: 0.95,
      market_entry_difficulty: 'moderate' as const,
      seasonal_demand: [120, 125, 115, 90, 75, 70, 70, 75, 90, 110, 115, 120],
      recommendation_priority: 'high' as const
    },
    {
      country: 'Almanya',
      market_size: 45000,
      import_price: 2.5,
      tariff_rate: 8,
      certification_requirements: ['GlobalGAP', 'Organik sertifika', 'İzlenebilirlik'],
      shipping_cost: 0.45,
      net_profit_potential: 1.35,
      market_entry_difficulty: 'difficult' as const,
      seasonal_demand: [130, 135, 125, 110, 85, 70, 65, 70, 95, 115, 125, 135],
      recommendation_priority: 'medium' as const
    }
  ];
}

function generateFinancialProjections(crop: any, marketData: any, financialTargets: any) {
  const conservativePrice = marketData.avgPrice * 0.9;
  const realisticPrice = marketData.avgPrice;
  const optimisticPrice = marketData.avgPrice * 1.2;
  
  return {
    revenue_scenarios: [
      {
        scenario: 'conservative' as const,
        annual_revenue: Math.round(crop.production_volume * conservativePrice),
        average_selling_price: conservativePrice,
        volume_sold: crop.production_volume,
        key_assumptions: ['Ortalama altı fiyatlar', 'Normal verim', 'Standart kalite']
      },
      {
        scenario: 'realistic' as const,
        annual_revenue: Math.round(crop.production_volume * realisticPrice),
        average_selling_price: realisticPrice,
        volume_sold: crop.production_volume,
        key_assumptions: ['Pazar ortalaması fiyatlar', 'Hedef verim', 'İyi kalite']
      },
      {
        scenario: 'optimistic' as const,
        annual_revenue: Math.round(crop.production_volume * optimisticPrice),
        average_selling_price: optimisticPrice,
        volume_sold: crop.production_volume,
        key_assumptions: ['Premium fiyatlar', 'Yüksek verim', 'Üstün kalite']
      }
    ],
    profit_analysis: {
      gross_profit_margin: financialTargets.target_profit_margin || 35,
      operating_profit_margin: (financialTargets.target_profit_margin || 35) - 15,
      break_even_volume: Math.round(crop.production_volume * 0.7),
      price_sensitivity_analysis: [
        { price_change: -10, volume_impact: 15, profit_impact: -25 },
        { price_change: -5, volume_impact: 8, profit_impact: -12 },
        { price_change: 5, volume_impact: -5, profit_impact: 18 },
        { price_change: 10, volume_impact: -12, profit_impact: 28 }
      ]
    },
    cash_flow_projections: generateCashFlowProjections(crop.production_volume, realisticPrice)
  };
}

function generateCashFlowProjections(volume: number, price: number) {
  const monthlyRevenue = (volume * price) / 12;
  const monthlyCosts = monthlyRevenue * 0.65;
  
  return Array.from({length: 12}, (_, i) => {
    const seasonalMultiplier = 0.5 + Math.sin((i + 1) * Math.PI / 6) * 0.5;
    const revenue = Math.round(monthlyRevenue * seasonalMultiplier);
    const costs = Math.round(monthlyCosts);
    const netCashFlow = revenue - costs;
    
    return {
      month: i + 1,
      revenue,
      costs,
      net_cash_flow: netCashFlow,
      cumulative_cash_flow: i === 0 ? netCashFlow : netCashFlow // Simplified
    };
  });
}

function generateMarketingRecommendations(crop: any, marketStrategy: any, marketData: any) {
  return {
    positioning_strategy: 'Premium kalite, teknoloji destekli, sürdürülebilir üretim',
    target_customer_profile: 'Kalite odaklı, güvenilir tedarik arayan büyük alıcılar',
    pricing_strategy: 'Rekabetçi premium fiyatlama - pazar ortalamasının %10-15 üstü',
    distribution_strategy: 'Çok kanallı dağıtım - öncelik süpermarket zincirleri',
    promotion_tactics: [
      'Tarım fuarlarına katılım',
      'Dijital pazarlama ve sosyal medya',
      'Müşteri ziyaretleri ve demo',
      'Sertifikasyon belgelerinin vurgulanması'
    ],
    brand_development: [
      'Marka kimliği oluşturma',
      'Kalite ve güvenilirlik mesajları',
      'Sürdürülebilirlik vurgusu',
      'Yerel üretim hikayesi'
    ],
    success_metrics: [
      'Pazar payı artışı',
      'Müşteri memnuniyeti skoru',
      'Fiyat primi elde etme',
      'Tekrar alım oranı'
    ]
  };
}

function generateRiskAssessment(crop: any, location: any, marketData: any) {
  return [
    {
      risk_type: 'Fiyat Volatilitesi',
      probability: marketData.volatility,
      impact_severity: 'high' as const,
      description: 'Pazar fiyatlarındaki ani değişimler karlılığı etkileyebilir',
      mitigation_strategies: [
        'Vadeli satış sözleşmeleri',
        'Ürün çeşitlendirmesi',
        'Maliyet kontrolü'
      ],
      monitoring_indicators: ['Günlük hal fiyatları', 'Rakip fiyat takibi']
    },
    {
      risk_type: 'Rekabet Artışı',
      probability: 60,
      impact_severity: 'medium' as const,
      description: 'Yeni üreticilerin pazara girişi fiyat baskısı yaratabilir',
      mitigation_strategies: [
        'Kalite farklılaştırması',
        'Müşteri bağlılığı programları',
        'Maliyet liderliği'
      ],
      monitoring_indicators: ['Yeni sera yatırımları', 'Pazar payı değişimleri']
    },
    {
      risk_type: 'Enerji Maliyeti Artışı',
      probability: 75,
      impact_severity: 'high' as const,
      description: 'Artan enerji maliyetleri üretim maliyetlerini artırabilir',
      mitigation_strategies: [
        'Enerji verimliliği yatırımları',
        'Yenilenebilir enerji kullanımı',
        'Fiyatlama stratejisi güncellemesi'
      ],
      monitoring_indicators: ['Doğalgaz fiyatları', 'Elektrik tarifeleri']
    }
  ];
}

function generateActionPlan(crop: any, marketStrategy: any) {
  return [
    {
      phase: 'Pazar Girişi (0-3 Ay)',
      timeline: '3 ay',
      actions: [
        'Hedef müşterilerle iletişime geçme',
        'Ürün örnekleri sunma',
        'Fiyat teklifleri hazırlama',
        'İlk satış sözleşmelerini imzalama'
      ],
      resources_required: ['Satış ekibi', 'Ürün örnekleri', 'Pazarlama materyalleri'],
      success_criteria: ['İlk 3 müşteri kazanma', '500 kg ürün satışı'],
      budget_estimate: 25000
    },
    {
      phase: 'Pazar Geliştirme (3-12 Ay)',
      timeline: '9 ay',
      actions: [
        'Müşteri portföyü genişletme',
        'Ürün kalitesi optimizasyonu',
        'Yeni satış kanalları geliştirme',
        'Marka bilinirliği artırma'
      ],
      resources_required: ['Pazarlama bütçesi', 'Kalite kontrol sistemi', 'Lojistik altyapı'],
      success_criteria: ['10 aktif müşteri', 'Hedef satış hacminin %75i'],
      budget_estimate: 75000
    },
    {
      phase: 'Pazar Konsolidasyonu (1-2 Yıl)',
      timeline: '12 ay',
      actions: [
        'Pazar liderliği için konumlandırma',
        'Yeni ürün hatları geliştirme',
        'İhracat fırsatlarını değerlendirme',
        'Sürdürülebilir büyüme planları'
      ],
      resources_required: ['Ar-Ge yatırımları', 'İhracat lisansları', 'Ek üretim kapasitesi'],
      success_criteria: ['%15 pazar payı', 'İhracat başlangıcı'],
      budget_estimate: 150000
    }
  ];
}
