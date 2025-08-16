import { NextRequest, NextResponse } from 'next/server';

// Analysis types
type AnalysisType = 'roi' | 'climate' | 'equipment' | 'market' | 'layout' | 'comprehensive';

interface AnalysisRequest {
  message: string;
  sessionId: string;
  userId: string;
  analysisType?: AnalysisType;
  context?: any;
}

interface AnalysisResponse {
  success: boolean;
  response: string;
  analysisData?: any;
  nextSteps?: string[];
  needsMoreInfo?: boolean;
  questions?: string[];
  reportGenerated?: boolean;
  reportId?: string;
}

// Comprehensive analysis questions by type
const ANALYSIS_QUESTIONS = {
  roi: [
    'Sera boyutu kaç m² olacak?',
    'Hangi şehir/ilçede yatırım yapacaksınız?',
    'Toplam yatırım bütçeniz nedir?',
    'Hangi ürünleri yetiştirmeyi planlıyorsunuz?',
    'Mevcut tarım deneyiminiz var mı?'
  ],
  climate: [
    'Hangi bölgede sera kuracaksınız?',
    'Yıl boyunca üretim yapmayı planlıyor musunuz?',
    'İklim kontrolü için ne kadar bütçe ayırdınız?',
    'Hangi ürünler için iklim analizi istiyorsunuz?'
  ],
  equipment: [
    'Sera boyutu nedir?',
    'Hangi teknoloji seviyesini tercih edersiniz (temel/orta/ileri)?',
    'Otomasyon sistemleri istiyorsunuz?',
    'Ekipman için bütçe aralığınız nedir?',
    'Hangi ürünler için ekipman listesi istiyorsunuz?'
  ],
  market: [
    'Hangi ürünlerin pazar analizini istiyorsunuz?',
    'Yerel mi yoksa ihracat pazarına mı odaklanacaksınız?',
    'Yıllık kaç ton üretim hedefliyorsunuz?',
    'Mevcut pazar bağlantılarınız var mı?'
  ]
};

// Mock comprehensive greenhouse database
const GREENHOUSE_DATA = {
  regions: {
    'antalya': {
      climate: { score: 95, temp_avg: 18.5, sunshine: 300, humidity: 65 },
      costs: { land: 50, labor: 45, energy: 40 },
      market_access: { local: 90, export: 85, logistics: 80 }
    },
    'mersin': {
      climate: { score: 92, temp_avg: 19.2, sunshine: 285, humidity: 68 },
      costs: { land: 45, labor: 42, energy: 38 },
      market_access: { local: 85, export: 90, logistics: 85 }
    },
    'muğla': {
      climate: { score: 88, temp_avg: 16.8, sunshine: 275, humidity: 70 },
      costs: { land: 60, labor: 50, energy: 45 },
      market_access: { local: 80, export: 75, logistics: 70 }
    },
    'izmir': {
      climate: { score: 85, temp_avg: 17.5, sunshine: 270, humidity: 72 },
      costs: { land: 55, labor: 48, energy: 42 },
      market_access: { local: 85, export: 80, logistics: 85 }
    }
  },
  crops: {
    'domates': { yield_per_m2: 45, price_kg: 8.5, season_months: 8, difficulty: 'orta' },
    'salatalık': { yield_per_m2: 35, price_kg: 6.2, season_months: 6, difficulty: 'kolay' },
    'biber': { yield_per_m2: 25, price_kg: 12.0, season_months: 7, difficulty: 'orta' },
    'patlıcan': { yield_per_m2: 30, price_kg: 9.5, season_months: 6, difficulty: 'zor' },
    'çilek': { yield_per_m2: 8, price_kg: 25.0, season_months: 4, difficulty: 'zor' }
  },
  equipment: {
    'temel': { cost_per_m2: 120, automation: 20, efficiency: 70 },
    'orta': { cost_per_m2: 180, automation: 60, efficiency: 85 },
    'ileri': { cost_per_m2: 250, automation: 90, efficiency: 95 }
  }
};

export async function POST(request: NextRequest) {
  try {
    const body: AnalysisRequest = await request.json();
    const { message, sessionId, userId, analysisType, context } = body;

    console.log('��� Analysis request:', { message, sessionId, analysisType });

    // Validate request
    if (!message || !sessionId || !userId) {
      return NextResponse.json({
        success: false,
        response: 'Eksik bilgiler. Lütfen mesajınızı ve gerekli bilgileri kontrol edin.',
        needsMoreInfo: true
      });
    }

    // Analyze message content to determine analysis type and extract data
    const messageAnalysis = analyzeMessage(message.toLowerCase());
    const detectedType = analysisType || messageAnalysis.type;
    
    // Get or initialize session context
    const sessionContext = context || {};
    
    // Process the analysis request
    const analysisResult = await processAnalysisRequest({
      message,
      type: detectedType,
      context: sessionContext,
      extractedData: messageAnalysis.data
    });

    // Generate response based on analysis stage
    const response = generateResponse(analysisResult, detectedType, sessionContext);

    return NextResponse.json(response);

  } catch (error) {
    console.error('❌ Analysis API Error:', error);
    return NextResponse.json({
      success: false,
      response: 'Analiz sırasında bir hata oluştu. Lütfen tekrar deneyin.',
      needsMoreInfo: false
    }, { status: 500 });
  }
}

function analyzeMessage(message: string) {
  const data: any = {};
  
  // Extract location
  const regions = ['antalya', 'mersin', 'muğla', 'izmir', 'istanbul', 'ankara'];
  const foundRegion = regions.find(region => message.includes(region));
  if (foundRegion) data.location = foundRegion;

  // Extract size
  const sizeMatch = message.match(/(\d+)\s*m²?/);
  if (sizeMatch) data.size = parseInt(sizeMatch[1]);

  // Extract budget
  const budgetMatch = message.match(/(\d+(?:\.\d+)?)\s*(?:bin|k|milyon|m)?\s*(?:₺|tl|lira)/i);
  if (budgetMatch) {
    let amount = parseFloat(budgetMatch[1]);
    const unit = budgetMatch[0].toLowerCase();
    if (unit.includes('bin') || unit.includes('k')) amount *= 1000;
    if (unit.includes('milyon') || unit.includes('m')) amount *= 1000000;
    data.budget = amount;
  }

  // Extract crops
  const crops = ['domates', 'salatalık', 'biber', 'patlıcan', 'çilek'];
  const foundCrops = crops.filter(crop => message.includes(crop));
  if (foundCrops.length > 0) data.crops = foundCrops;

  // Determine analysis type
  let type: AnalysisType = 'comprehensive';
  if (message.includes('roi') || message.includes('getiri') || message.includes('kâr')) type = 'roi';
  else if (message.includes('iklim') || message.includes('hava') || message.includes('sıcaklık')) type = 'climate';
  else if (message.includes('ekipman') || message.includes('donanım') || message.includes('sistem')) type = 'equipment';
  else if (message.includes('pazar') || message.includes('satış') || message.includes('fiyat')) type = 'market';
  else if (message.includes('tasarım') || message.includes('plan') || message.includes('layout')) type = 'layout';

  return { type, data };
}

async function processAnalysisRequest(params: {
  message: string;
  type: AnalysisType;
  context: any;
  extractedData: any;
}): Promise<any> {
  const { type, context, extractedData } = params;
  
  // Merge extracted data with context
  const analysisData = { ...context, ...extractedData };
  
  // Check if we have enough data for the analysis
  const requiredFields = getRequiredFields(type);
  const missingFields = requiredFields.filter(field => !analysisData[field]);
  
  if (missingFields.length > 0) {
    return {
      stage: 'collecting_data',
      missingFields,
      currentData: analysisData,
      needsMoreInfo: true
    };
  }
  
  // Perform the actual analysis
  return await performAnalysis(type, analysisData);
}

function getRequiredFields(type: AnalysisType): string[] {
  switch (type) {
    case 'roi':
      return ['location', 'size', 'budget', 'crops'];
    case 'climate':
      return ['location', 'crops'];
    case 'equipment':
      return ['size', 'crops'];
    case 'market':
      return ['crops', 'location'];
    case 'layout':
      return ['size', 'crops'];
    case 'comprehensive':
      return ['location', 'size', 'budget', 'crops'];
    default:
      return ['location', 'size'];
  }
}

async function performAnalysis(type: AnalysisType, data: any) {
  // Simulate comprehensive analysis with real calculations
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const location = data.location || 'antalya';
  const size = data.size || 5000;
  const budget = data.budget || size * 180;
  const crops = data.crops || ['domates'];
  
  const regionData = GREENHOUSE_DATA.regions[location] || GREENHOUSE_DATA.regions['antalya'];
  const cropData = crops.map(crop => GREENHOUSE_DATA.crops[crop] || GREENHOUSE_DATA.crops['domates']);
  
  // Calculate comprehensive analysis
  const analysis = {
    roi: calculateROI(size, budget, cropData, regionData),
    climate: analyzeClimate(location, crops, regionData),
    equipment: recommendEquipment(size, budget, crops),
    market: analyzeMarket(crops, location, regionData),
    layout: designLayout(size, crops)
  };
  
  return {
    stage: 'analysis_complete',
    analysisData: analysis,
    recommendations: generateRecommendations(analysis),
    reportReady: true
  };
}

function calculateROI(size: number, budget: number, cropData: any[], regionData: any) {
  const avgYield = cropData.reduce((sum, crop) => sum + crop.yield_per_m2, 0) / cropData.length;
  const avgPrice = cropData.reduce((sum, crop) => sum + crop.price_kg, 0) / cropData.length;
  
  const annualRevenue = size * avgYield * avgPrice;
  const annualCosts = budget * 0.25; // 25% of initial investment as annual operating costs
  const netProfit = annualRevenue - annualCosts;
  const roiPercentage = (netProfit / budget) * 100;
  const paybackPeriod = budget / netProfit;
  
  return {
    initial_investment: budget,
    annual_revenue: annualRevenue,
    annual_costs: annualCosts,
    net_profit: netProfit,
    roi_percentage: roiPercentage,
    payback_period: paybackPeriod,
    profitability: roiPercentage > 20 ? 'Yüksek' : roiPercentage > 10 ? 'Orta' : 'Düşük'
  };
}

function analyzeClimate(location: string, crops: string[], regionData: any) {
  return {
    location,
    climate_score: regionData.climate.score,
    temperature: regionData.climate.temp_avg,
    sunshine_days: regionData.climate.sunshine,
    humidity: regionData.climate.humidity,
    suitability: regionData.climate.score > 90 ? 'Mükemmel' : regionData.climate.score > 80 ? 'İyi' : 'Orta',
    recommendations: crops.map(crop => `${crop} için ${location} uygun`)
  };
}

function recommendEquipment(size: number, budget: number, crops: string[]) {
  const budgetPerM2 = budget / size;
  let techLevel = 'temel';
  if (budgetPerM2 > 200) techLevel = 'ileri';
  else if (budgetPerM2 > 150) techLevel = 'orta';
  
  const equipmentData = GREENHOUSE_DATA.equipment[techLevel];
  
  return {
    technology_level: techLevel,
    cost_per_m2: equipmentData.cost_per_m2,
    automation_level: equipmentData.automation,
    efficiency: equipmentData.efficiency,
    total_equipment_cost: size * equipmentData.cost_per_m2,
    recommended_systems: [
      'İklim kontrol sistemi',
      'Sulama sistemi',
      'Gübre dozaj sistemi',
      techLevel !== 'temel' ? 'Otomasyon sistemi' : null,
      techLevel === 'ileri' ? 'AI destekli monitoring' : null
    ].filter(Boolean)
  };
}

function analyzeMarket(crops: string[], location: string, regionData: any) {
  const marketData = crops.map(crop => {
    const cropInfo = GREENHOUSE_DATA.crops[crop];
    return {
      crop,
      price_per_kg: cropInfo.price_kg,
      demand: regionData.market_access.local > 80 ? 'Yüksek' : 'Orta',
      competition: 'Orta',
      export_potential: regionData.market_access.export > 80 ? 'Yüksek' : 'Orta'
    };
  });
  
  return {
    location,
    market_access_score: regionData.market_access.local,
    export_potential: regionData.market_access.export,
    logistics_score: regionData.market_access.logistics,
    crop_analysis: marketData,
    overall_assessment: 'Olumlu'
  };
}

function designLayout(size: number, crops: string[]) {
  const sectorsCount = Math.ceil(size / 1000);
  
  return {
    total_area: size,
    production_area: size * 0.85,
    service_area: size * 0.15,
    sectors: sectorsCount,
    crop_distribution: crops.reduce((acc, crop, index) => {
      acc[crop] = Math.floor((size * 0.85) / crops.length);
      return acc;
    }, {}),
    layout_efficiency: size > 3000 ? 'Yüksek' : 'Orta',
    recommendations: [
      'Kuzey-güney yönelim önerilir',
      'Sektörler arası 3m servis yolu',
      'Merkezi iklim kontrol ünitesi'
    ]
  };
}

function generateRecommendations(analysis: any) {
  const recommendations = [];
  
  if (analysis.roi.roi_percentage > 25) {
    recommendations.push('💰 Yüksek ROI oranı - Yatırım çok karlı görünüyor');
  }
  
  if (analysis.climate.climate_score > 90) {
    recommendations.push('🌡️ İklim koşulları mükemmel - Yıl boyu üretim yapabilirsiniz');
  }
  
  if (analysis.equipment.efficiency > 90) {
    recommendations.push('⚙️ İleri teknoloji sistemi önerilir - Uzun vadede daha karlı');
  }
  
  return recommendations;
}

function generateResponse(analysisResult: any, type: AnalysisType, context: any): AnalysisResponse {
  if (analysisResult.stage === 'collecting_data') {
    const questions = ANALYSIS_QUESTIONS[type] || [];
    const remainingQuestions = questions.filter((_, index) => 
      !analysisResult.currentData[getFieldFromQuestion(questions[index])]
    );
    
    return {
      success: true,
      response: `📋 **${getTypeTitle(type)} için bilgi topluyorum...**

${formatCurrentData(analysisResult.currentData)}

**Eksik bilgiler:**
${analysisResult.missingFields.map(field => `• ${getFieldQuestion(field)}`).join('\n')}

Lütfen eksik bilgileri paylaşın, tam analiz için gerekli.`,
      needsMoreInfo: true,
      questions: remainingQuestions.slice(0, 2), // İlk 2 soruyu sor
      analysisData: analysisResult.currentData
    };
  }
  
  if (analysisResult.stage === 'analysis_complete') {
    const reportId = `RPT-${Date.now()}`;
    
    return {
      success: true,
      response: formatAnalysisResults(analysisResult.analysisData, type),
      analysisData: analysisResult.analysisData,
      reportGenerated: true,
      reportId,
      nextSteps: [
        'Detaylı PDF rapor indir',
        'Danışmanlık hizmeti al',
        'Yeni analiz başlat'
      ]
    };
  }
  
  return {
    success: false,
    response: 'Analiz tamamlanamadı. Lütfen tekrar deneyin.',
    needsMoreInfo: true
  };
}

function getTypeTitle(type: AnalysisType): string {
  const titles = {
    roi: 'ROI Analizi',
    climate: 'İklim Analizi', 
    equipment: 'Ekipman Analizi',
    market: 'Pazar Analizi',
    layout: 'Tasarım Analizi',
    comprehensive: 'Kapsamlı Sera Analizi'
  };
  return titles[type] || 'Sera Analizi';
}

function formatCurrentData(data: any): string {
  const items = [];
  if (data.location) items.push(`📍 Lokasyon: ${data.location}`);
  if (data.size) items.push(`📏 Boyut: ${data.size.toLocaleString()}m²`);
  if (data.budget) items.push(`💰 Bütçe: ₺${data.budget.toLocaleString()}`);
  if (data.crops) items.push(`🌱 Ürünler: ${data.crops.join(', ')}`);
  
  return items.length > 0 ? `**Mevcut bilgiler:**\n${items.join('\n')}\n` : '';
}

function getFieldQuestion(field: string): string {
  const questions = {
    location: 'Hangi şehirde sera kuracaksınız?',
    size: 'Sera boyutu kaç m² olacak?',
    budget: 'Toplam yatırım bütçeniz nedir?',
    crops: 'Hangi ürünleri yetiştirmeyi planlıyorsunuz?'
  };
  return questions[field] || field;
}

function getFieldFromQuestion(question: string): string {
  if (question.includes('boyut') || question.includes('m²')) return 'size';
  if (question.includes('şehir') || question.includes('bölge')) return 'location';
  if (question.includes('bütçe') || question.includes('yatırım')) return 'budget';
  if (question.includes('ürün') || question.includes('yetiştir')) return 'crops';
  return 'unknown';
}

function formatAnalysisResults(analysis: any, type: AnalysisType): string {
  const results = [`🎯 **${getTypeTitle(type)} Tamamlandı!**\n`];
  
  if (analysis.roi) {
    results.push(`💰 **ROI Analizi:**
• Başlangıç Yatırımı: ₺${analysis.roi.initial_investment.toLocaleString()}
• Yıllık Gelir: ₺${analysis.roi.annual_revenue.toLocaleString()}
• Net Kâr: ₺${analysis.roi.net_profit.toLocaleString()}
• ROI Oranı: %${analysis.roi.roi_percentage.toFixed(1)}
• Geri Ödeme: ${analysis.roi.payback_period.toFixed(1)} yıl
• Karlılık: ${analysis.roi.profitability}\n`);
  }
  
  if (analysis.climate) {
    results.push(`🌡️ **İklim Analizi:**
• İklim Skoru: ${analysis.climate.climate_score}/100
• Ortalama Sıcaklık: ${analysis.climate.temperature}°C
• Güneşli Gün: ${analysis.climate.sunshine_days}
• Nem Oranı: %${analysis.climate.humidity}
• Uygunluk: ${analysis.climate.suitability}\n`);
  }
  
  if (analysis.equipment) {
    results.push(`⚙️ **Ekipman Önerileri:**
• Teknoloji Seviyesi: ${analysis.equipment.technology_level}
• m² Başına Maliyet: ₺${analysis.equipment.cost_per_m2}
• Otomasyon Oranı: %${analysis.equipment.automation_level}
• Verimlilik: %${analysis.equipment.efficiency}
• Toplam Ekipman: ₺${analysis.equipment.total_equipment_cost.toLocaleString()}\n`);
  }
  
  if (analysis.market) {
    results.push(`📈 **Pazar Analizi:**
• Pazar Erişimi: ${analysis.market.market_access_score}/100
• İhracat Potansiyeli: ${analysis.market.export_potential}/100
• Genel Değerlendirme: ${analysis.market.overall_assessment}\n`);
  }
  
  results.push(`✅ **Sonuç:** Analiz başarıyla tamamlandı. Detaylı rapor hazır!
  
📄 **Sonraki Adımlar:**
• PDF rapor indirin
• Uzman danışmanlık alın  
• Proje planlamasına başlayın`);
  
  return results.join('\n');
}
