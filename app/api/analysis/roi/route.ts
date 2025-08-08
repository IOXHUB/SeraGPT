import { NextRequest, NextResponse } from 'next/server';

// =====================================================
// ROI ANALYSIS API ENDPOINT
// =====================================================
// Calculates Return on Investment for greenhouse projects
// with comprehensive financial analysis and projections
// =====================================================

interface ROIRequest {
  location: {
    city: string;
    region: string;
    coordinates?: { lat: number; lng: number };
  };
  greenhouse: {
    size: number; // m²
    type: 'glass' | 'polycarbonate' | 'plastic' | 'high_tech';
    heating_system: 'natural_gas' | 'electric' | 'geothermal' | 'biomass';
    cooling_system: 'natural' | 'evaporative' | 'mechanical';
    automation_level: 'basic' | 'intermediate' | 'advanced' | 'full_automation';
  };
  crop: {
    type: 'tomato' | 'cucumber' | 'pepper' | 'lettuce' | 'strawberry' | 'herb' | 'other';
    variety?: string;
    production_system: 'soil' | 'hydroponic' | 'aeroponic' | 'substrate';
    target_yield: number; // kg/m²/year
  };
  financial: {
    initial_budget: number;
    labor_cost_per_hour: number;
    energy_cost_per_kwh: number;
    water_cost_per_m3: number;
    financing?: {
      loan_percentage: number;
      interest_rate: number;
      loan_term_years: number;
    };
  };
  timeline: {
    construction_months: number;
    analysis_years: number; // typically 3-10 years
  };
}

interface ROIResponse {
  success: boolean;
  data: {
    roi_summary: {
      total_investment: number;
      break_even_months: number;
      roi_percentage_3_years: number;
      roi_percentage_5_years: number;
      roi_percentage_10_years: number;
      npv_10_years: number;
      irr_percentage: number;
    };
    cost_breakdown: {
      construction: {
        structure: number;
        covering: number;
        heating_cooling: number;
        irrigation: number;
        automation: number;
        electrical: number;
        other: number;
        total: number;
      };
      annual_operating: {
        labor: number;
        energy: number;
        water: number;
        seeds_plants: number;
        fertilizers: number;
        pest_control: number;
        maintenance: number;
        insurance: number;
        other: number;
        total: number;
      };
    };
    revenue_projections: {
      annual_yield_kg: number;
      price_per_kg: number;
      annual_revenue: number;
      price_seasonality: Array<{
        month: string;
        price_multiplier: number;
        expected_harvest_kg: number;
      }>;
    };
    yearly_projections: Array<{
      year: number;
      revenue: number;
      operating_costs: number;
      depreciation: number;
      profit_before_tax: number;
      profit_after_tax: number;
      cumulative_profit: number;
      cumulative_roi_percentage: number;
    }>;
    sensitivity_analysis: {
      price_scenarios: Array<{
        scenario: string;
        price_change_percentage: number;
        roi_impact_percentage: number;
        break_even_months: number;
      }>;
      yield_scenarios: Array<{
        scenario: string;
        yield_change_percentage: number;
        roi_impact_percentage: number;
        break_even_months: number;
      }>;
    };
    recommendations: Array<{
      category: 'cost_optimization' | 'revenue_enhancement' | 'risk_mitigation' | 'financing';
      title: string;
      description: string;
      potential_impact: string;
      implementation_difficulty: 'easy' | 'medium' | 'hard';
      priority: 'high' | 'medium' | 'low';
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
    const body: ROIRequest = await request.json();
    
    // Input validation
    const validation = validateROIRequest(body);
    if (!validation.valid) {
      return NextResponse.json({
        success: false,
        error: validation.error,
        token_cost: 0,
        processing_time_ms: Date.now() - startTime
      }, { status: 400 });
    }

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 3000));

    // Generate mock ROI analysis
    const analysis = generateROIAnalysis(body);
    
    const processingTime = Date.now() - startTime;
    
    return NextResponse.json({
      success: true,
      data: analysis,
      token_cost: 2, // ROI analysis costs 2 tokens
      processing_time_ms: processingTime
    });

  } catch (error) {
    console.error('ROI Analysis API Error:', error);
    
    return NextResponse.json({
      success: false,
      error: 'ROI analizi gerçekleştirilemedi. Lütfen daha sonra tekrar deneyin.',
      token_cost: 0,
      processing_time_ms: Date.now() - startTime
    }, { status: 500 });
  }
}

function validateROIRequest(body: ROIRequest) {
  if (!body.location?.city || !body.location?.region) {
    return { valid: false, error: 'Lokasyon bilgileri eksik' };
  }
  
  if (!body.greenhouse?.size || body.greenhouse.size < 100 || body.greenhouse.size > 50000) {
    return { valid: false, error: 'Sera boyutu 100-50.000 m² arasında olmalıdır' };
  }
  
  if (!body.crop?.type || !body.crop?.target_yield || body.crop.target_yield <= 0) {
    return { valid: false, error: 'Ürün tipi ve hedef verim bilgileri gereklidir' };
  }
  
  if (!body.financial?.initial_budget || body.financial.initial_budget < 50000) {
    return { valid: false, error: 'Minimum başlangıç bütçesi 50.000 TL olmalıdır' };
  }
  
  return { valid: true };
}

function generateROIAnalysis(request: ROIRequest): ROIResponse['data'] {
  const { greenhouse, crop, financial, location } = request;
  
  // Base calculations
  const constructionCostPerM2 = getConstructionCostPerM2(greenhouse.type, greenhouse.automation_level);
  const totalConstructionCost = greenhouse.size * constructionCostPerM2;
  
  const annualYieldKg = greenhouse.size * crop.target_yield;
  const avgPricePerKg = getCropPrice(crop.type, location.region);
  const annualRevenue = annualYieldKg * avgPricePerKg;
  
  const annualOperatingCosts = calculateOperatingCosts(greenhouse, crop, financial);
  
  // Break-even calculation
  const monthlyNetIncome = (annualRevenue - annualOperatingCosts.total) / 12;
  const breakEvenMonths = monthlyNetIncome > 0 ? Math.ceil(totalConstructionCost / monthlyNetIncome) : 999;
  
  // ROI calculations
  const roi3Years = ((annualRevenue - annualOperatingCosts.total) * 3 - totalConstructionCost) / totalConstructionCost * 100;
  const roi5Years = ((annualRevenue - annualOperatingCosts.total) * 5 - totalConstructionCost) / totalConstructionCost * 100;
  const roi10Years = ((annualRevenue - annualOperatingCosts.total) * 10 - totalConstructionCost) / totalConstructionCost * 100;
  
  // NPV calculation (simplified)
  const discountRate = 0.08; // 8% discount rate
  let npv = -totalConstructionCost;
  for (let year = 1; year <= 10; year++) {
    const netCashFlow = annualRevenue - annualOperatingCosts.total;
    npv += netCashFlow / Math.pow(1 + discountRate, year);
  }
  
  // IRR calculation (simplified approximation)
  const irr = calculateIRR(totalConstructionCost, annualRevenue - annualOperatingCosts.total, 10);
  
  return {
    roi_summary: {
      total_investment: totalConstructionCost,
      break_even_months: Math.min(breakEvenMonths, 999),
      roi_percentage_3_years: Math.round(roi3Years * 100) / 100,
      roi_percentage_5_years: Math.round(roi5Years * 100) / 100,
      roi_percentage_10_years: Math.round(roi10Years * 100) / 100,
      npv_10_years: Math.round(npv),
      irr_percentage: Math.round(irr * 100) / 100
    },
    cost_breakdown: {
      construction: generateConstructionCosts(greenhouse, totalConstructionCost),
      annual_operating: annualOperatingCosts
    },
    revenue_projections: {
      annual_yield_kg: annualYieldKg,
      price_per_kg: avgPricePerKg,
      annual_revenue: annualRevenue,
      price_seasonality: generateSeasonalPricing(crop.type, avgPricePerKg, annualYieldKg)
    },
    yearly_projections: generateYearlyProjections(totalConstructionCost, annualRevenue, annualOperatingCosts.total, 10),
    sensitivity_analysis: generateSensitivityAnalysis(totalConstructionCost, annualRevenue, annualOperatingCosts.total),
    recommendations: generateRecommendations(request, roi5Years, breakEvenMonths),
    pdf_url: `/api/analysis/roi/download?id=roi_${Date.now()}`,
    analysis_id: `roi_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    generated_at: new Date().toISOString()
  };
}

function getConstructionCostPerM2(type: string, automation: string): number {
  const baseCosts = {
    plastic: 150,
    polycarbonate: 250,
    glass: 400,
    high_tech: 600
  };
  
  const automationMultipliers = {
    basic: 1.0,
    intermediate: 1.3,
    advanced: 1.6,
    full_automation: 2.0
  };
  
  return (baseCosts[type as keyof typeof baseCosts] || 250) * 
         (automationMultipliers[automation as keyof typeof automationMultipliers] || 1.0);
}

function getCropPrice(cropType: string, region: string): number {
  const basePrices = {
    tomato: 8.5,
    cucumber: 6.2,
    pepper: 12.4,
    lettuce: 4.8,
    strawberry: 35.0,
    herb: 45.0,
    other: 10.0
  };
  
  // Regional price adjustments
  const regionalMultipliers = {
    'Akdeniz': 1.1,
    'Ege': 1.05,
    'Marmara': 1.15,
    'İç Anadolu': 0.95,
    'Karadeniz': 0.9,
    'Doğu Anadolu': 0.85,
    'Güneydoğu Anadolu': 0.9
  };
  
  const basePrice = basePrices[cropType as keyof typeof basePrices] || 10.0;
  return basePrice * 1.2; // Default multiplier if region not found
}

function calculateOperatingCosts(greenhouse: any, crop: any, financial: any) {
  const size = greenhouse.size;
  
  const labor = size * 25; // 25 TL/m²/year
  const energy = size * 18; // 18 TL/m²/year
  const water = size * 8; // 8 TL/m²/year
  const seedsPlants = size * 12; // 12 TL/m²/year
  const fertilizers = size * 15; // 15 TL/m²/year
  const pestControl = size * 8; // 8 TL/m²/year
  const maintenance = size * 10; // 10 TL/m²/year
  const insurance = size * 5; // 5 TL/m²/year
  const other = size * 7; // 7 TL/m²/year
  
  return {
    labor,
    energy,
    water,
    seeds_plants: seedsPlants,
    fertilizers,
    pest_control: pestControl,
    maintenance,
    insurance,
    other,
    total: labor + energy + water + seedsPlants + fertilizers + pestControl + maintenance + insurance + other
  };
}

function generateConstructionCosts(greenhouse: any, totalCost: number) {
  return {
    structure: Math.round(totalCost * 0.35),
    covering: Math.round(totalCost * 0.25),
    heating_cooling: Math.round(totalCost * 0.15),
    irrigation: Math.round(totalCost * 0.10),
    automation: Math.round(totalCost * 0.08),
    electrical: Math.round(totalCost * 0.05),
    other: Math.round(totalCost * 0.02),
    total: totalCost
  };
}

function generateSeasonalPricing(cropType: string, avgPrice: number, totalYield: number) {
  const months = [
    'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
    'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
  ];
  
  // Seasonal multipliers (higher in winter, lower in summer for most crops)
  const seasonalMultipliers = [1.4, 1.3, 1.1, 0.9, 0.8, 0.7, 0.7, 0.8, 0.9, 1.1, 1.2, 1.3];
  
  return months.map((month, index) => ({
    month,
    price_multiplier: seasonalMultipliers[index],
    expected_harvest_kg: Math.round(totalYield / 12 * (0.8 + Math.random() * 0.4))
  }));
}

function generateYearlyProjections(investment: number, revenue: number, operatingCosts: number, years: number) {
  const projections = [];
  const depreciation = investment / 20; // 20-year depreciation
  const taxRate = 0.20; // 20% tax rate
  
  let cumulativeProfit = -investment;
  
  for (let year = 1; year <= years; year++) {
    const yearlyRevenue = revenue * (1 + Math.random() * 0.2 - 0.1); // ±10% variation
    const yearlyOperatingCosts = operatingCosts * Math.pow(1.05, year - 1); // 5% annual increase
    
    const profitBeforeTax = yearlyRevenue - yearlyOperatingCosts - depreciation;
    const profitAfterTax = profitBeforeTax > 0 ? profitBeforeTax * (1 - taxRate) : profitBeforeTax;
    
    cumulativeProfit += profitAfterTax + depreciation; // Add back depreciation for cash flow
    
    projections.push({
      year,
      revenue: Math.round(yearlyRevenue),
      operating_costs: Math.round(yearlyOperatingCosts),
      depreciation: Math.round(depreciation),
      profit_before_tax: Math.round(profitBeforeTax),
      profit_after_tax: Math.round(profitAfterTax),
      cumulative_profit: Math.round(cumulativeProfit),
      cumulative_roi_percentage: Math.round((cumulativeProfit / investment) * 100 * 100) / 100
    });
  }
  
  return projections;
}

function generateSensitivityAnalysis(investment: number, revenue: number, operatingCosts: number) {
  const baseBreakEven = Math.ceil(investment / ((revenue - operatingCosts) / 12));
  
  return {
    price_scenarios: [
      {
        scenario: 'Fiyat %20 Düşürse',
        price_change_percentage: -20,
        roi_impact_percentage: -35,
        break_even_months: Math.ceil(investment / ((revenue * 0.8 - operatingCosts) / 12))
      },
      {
        scenario: 'Fiyat %10 Düşürse',
        price_change_percentage: -10,
        roi_impact_percentage: -18,
        break_even_months: Math.ceil(investment / ((revenue * 0.9 - operatingCosts) / 12))
      },
      {
        scenario: 'Fiyat %10 Artarsa',
        price_change_percentage: 10,
        roi_impact_percentage: 18,
        break_even_months: Math.ceil(investment / ((revenue * 1.1 - operatingCosts) / 12))
      },
      {
        scenario: 'Fiyat %20 Artarsa',
        price_change_percentage: 20,
        roi_impact_percentage: 35,
        break_even_months: Math.ceil(investment / ((revenue * 1.2 - operatingCosts) / 12))
      }
    ],
    yield_scenarios: [
      {
        scenario: 'Verim %20 Düşürse',
        yield_change_percentage: -20,
        roi_impact_percentage: -35,
        break_even_months: Math.ceil(investment / ((revenue * 0.8 - operatingCosts) / 12))
      },
      {
        scenario: 'Verim %10 Düşürse',
        yield_change_percentage: -10,
        roi_impact_percentage: -18,
        break_even_months: Math.ceil(investment / ((revenue * 0.9 - operatingCosts) / 12))
      },
      {
        scenario: 'Verim %10 Artarsa',
        yield_change_percentage: 10,
        roi_impact_percentage: 18,
        break_even_months: Math.ceil(investment / ((revenue * 1.1 - operatingCosts * 1.05) / 12))
      },
      {
        scenario: 'Verim %20 Artarsa',
        yield_change_percentage: 20,
        roi_impact_percentage: 35,
        break_even_months: Math.ceil(investment / ((revenue * 1.2 - operatingCosts * 1.1) / 12))
      }
    ]
  };
}

function generateRecommendations(request: ROIRequest, roi5Years: number, breakEvenMonths: number) {
  const recommendations = [];
  
  if (roi5Years < 50) {
    recommendations.push({
      category: 'revenue_enhancement' as const,
      title: 'Ürün Çeşitliliği Artırın',
      description: 'Farklı ürün türleri ekleyerek risk dağıtımı yapın ve gelir artırın. Özellikle yüksek değerli ürünlere (çilek, aromatic bitkiler) odaklanın.',
      potential_impact: '%15-25 gelir artışı',
      implementation_difficulty: 'medium' as const,
      priority: 'high' as const
    });
  }
  
  if (breakEvenMonths > 36) {
    recommendations.push({
      category: 'cost_optimization' as const,
      title: 'Enerji Verimliliği Artırın',
      description: 'LED aydınlatma, ısı geri kazanım sistemleri ve akıllı iklim kontrolü ile enerji maliyetlerini %20-30 azaltın.',
      potential_impact: '%20-30 enerji tasarrufu',
      implementation_difficulty: 'medium' as const,
      priority: 'high' as const
    });
  }
  
  if (request.financial.financing) {
    recommendations.push({
      category: 'financing' as const,
      title: 'Devlet Teşviklerini Değerlendirin',
      description: 'TKDK, IPARD ve diğer desteklerle başlangıç maliyetini %30-50 azaltma fırsatını kaçırmayın.',
      potential_impact: '%30-50 maliyet azalımı',
      implementation_difficulty: 'easy' as const,
      priority: 'high' as const
    });
  }
  
  recommendations.push({
    category: 'risk_mitigation' as const,
    title: 'Sigorta ve Risk Yönetimi',
    description: 'Ürün sigortası, iklim sigortası ve forward sözleşmelerle fiyat risklerini minimize edin.',
    potential_impact: 'Risk %60-80 azaltma',
    implementation_difficulty: 'easy' as const,
    priority: 'medium' as const
  });
  
  return recommendations;
}

function calculateIRR(investment: number, annualCashFlow: number, years: number): number {
  // Simplified IRR calculation using approximation
  if (annualCashFlow <= 0) return -100;
  
  let irr = 0.1; // Start with 10%
  for (let i = 0; i < 20; i++) {
    let npv = -investment;
    for (let year = 1; year <= years; year++) {
      npv += annualCashFlow / Math.pow(1 + irr, year);
    }
    
    if (Math.abs(npv) < 1000) break; // Close enough
    
    if (npv > 0) {
      irr += 0.01;
    } else {
      irr -= 0.01;
    }
  }
  
  return Math.max(-50, Math.min(100, irr * 100)); // Cap between -50% and 100%
}
