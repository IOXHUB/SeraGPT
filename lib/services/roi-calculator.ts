import { API_CONFIG, ApiResponse } from '../api-config';

export interface GreenhouseSpecs {
  // Basic specs
  length: number; // meters
  width: number; // meters
  height: number; // meters
  
  // Construction
  frameType: 'galvanized' | 'aluminum' | 'wood';
  coveringType: 'polycarbonate' | 'glass' | 'polyethylene';
  foundationType: 'concrete' | 'gravel' | 'soil';
  
  // Systems
  heatingSystem: 'none' | 'electric' | 'gas' | 'solar' | 'biomass';
  coolingSystem: 'none' | 'natural' | 'fan' | 'evaporative' | 'ac';
  irrigationSystem: 'manual' | 'drip' | 'sprinkler' | 'hydroponic';
  automationLevel: 'none' | 'basic' | 'intermediate' | 'advanced';
  
  // Location
  location: {
    lat: number;
    lon: number;
    city: string;
    region: string;
  };
}

export interface CropSpecs {
  type: string;
  variety: string;
  plantingDensity: number; // plants per m²
  cyclesPerYear: number;
  expectedYieldPerM2: number; // kg/m²/cycle
  expectedPrice: number; // TL per kg
  seedCost: number; // TL per m²
  fertilizerCost: number; // TL per m²/cycle
}

export interface OperationalCosts {
  electricity: number; // TL per month
  water: number; // TL per month
  fertilizer: number; // TL per month
  pesticide: number; // TL per month
  labor: number; // TL per month
  maintenance: number; // TL per month
  insurance: number; // TL per year
  taxes: number; // TL per year
}

export interface ROICalculation {
  // Investment
  initialInvestment: {
    construction: number;
    equipment: number;
    automation: number;
    infrastructure: number;
    permits: number;
    total: number;
  };
  
  // Annual costs
  operationalCosts: {
    monthly: OperationalCosts;
    annual: number;
  };
  
  // Revenue
  revenue: {
    annualYield: number; // kg
    averagePrice: number; // TL per kg
    grossRevenue: number; // TL
    netRevenue: number; // TL (after operational costs)
  };
  
  // Analysis
  analysis: {
    paybackPeriod: number; // years
    roi: number; // percentage
    npv: number; // Net Present Value
    irr: number; // Internal Rate of Return
    breakEvenPoint: number; // months
  };
  
  // Yearly projections
  projections: {
    year: number;
    revenue: number;
    costs: number;
    profit: number;
    cumulative: number;
  }[];
  
  // Risk factors
  risks: {
    factor: string;
    impact: 'low' | 'medium' | 'high';
    probability: number; // 0-1
    mitigation: string;
  }[];
  
  // Recommendations
  recommendations: {
    category: string;
    suggestion: string;
    potentialSaving: number;
    priority: 'low' | 'medium' | 'high';
  }[];
}

class ROICalculatorService {
  // Construction cost per m² (TL) - updated 2024 prices
  private constructionCosts = {
    frame: {
      galvanized: 120,
      aluminum: 180,
      wood: 80
    },
    covering: {
      polycarbonate: 150,
      glass: 250,
      polyethylene: 40
    },
    foundation: {
      concrete: 80,
      gravel: 30,
      soil: 10
    }
  };

  // Equipment costs (TL)
  private equipmentCosts = {
    heating: {
      none: 0,
      electric: 200,
      gas: 300,
      solar: 500,
      biomass: 400
    },
    cooling: {
      none: 0,
      natural: 50,
      fan: 150,
      evaporative: 300,
      ac: 600
    },
    irrigation: {
      manual: 20,
      drip: 80,
      sprinkler: 120,
      hydroponic: 400
    },
    automation: {
      none: 0,
      basic: 200,
      intermediate: 500,
      advanced: 1200
    }
  };

  // Regional multipliers for Turkey
  private regionalMultipliers = {
    'Marmara': 1.2,
    'Ege': 1.1,
    'Akdeniz': 1.0,
    'İç Anadolu': 0.9,
    'Karadeniz': 0.95,
    'Doğu Anadolu': 0.85,
    'Güneydoğu Anadolu': 0.9
  };

  async calculateROI(
    greenhouse: GreenhouseSpecs,
    crop: CropSpecs,
    operationalCosts: OperationalCosts
  ): Promise<ApiResponse<ROICalculation>> {
    try {
      const area = greenhouse.length * greenhouse.width;
      const volume = area * greenhouse.height;
      
      // Calculate initial investment
      const initialInvestment = this.calculateInitialInvestment(greenhouse, area);
      
      // Calculate annual operational costs
      const annualOperationalCosts = this.calculateAnnualCosts(operationalCosts);
      
      // Calculate revenue
      const revenue = this.calculateRevenue(crop, area);
      
      // Financial analysis
      const analysis = this.performFinancialAnalysis(
        initialInvestment.total,
        revenue.netRevenue,
        annualOperationalCosts
      );
      
      // Generate projections
      const projections = this.generateProjections(
        initialInvestment.total,
        revenue.grossRevenue,
        annualOperationalCosts,
        10
      );
      
      // Risk assessment
      const risks = this.assessRisks(greenhouse, crop);
      
      // Generate recommendations
      const recommendations = this.generateRecommendations(
        greenhouse,
        crop,
        operationalCosts,
        analysis
      );

      const result: ROICalculation = {
        initialInvestment,
        operationalCosts: {
          monthly: operationalCosts,
          annual: annualOperationalCosts
        },
        revenue,
        analysis,
        projections,
        risks,
        recommendations
      };

      return {
        success: true,
        data: result
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'ROI calculation failed'
      };
    }
  }

  private calculateInitialInvestment(greenhouse: GreenhouseSpecs, area: number) {
    const regionalMultiplier = this.regionalMultipliers[greenhouse.location.region as keyof typeof this.regionalMultipliers] || 1.0;

    const construction = (
      this.constructionCosts.frame[greenhouse.frameType] +
      this.constructionCosts.covering[greenhouse.coveringType] +
      this.constructionCosts.foundation[greenhouse.foundationType]
    ) * area * regionalMultiplier;

    const equipment = (
      this.equipmentCosts.heating[greenhouse.heatingSystem] +
      this.equipmentCosts.cooling[greenhouse.coolingSystem] +
      this.equipmentCosts.irrigation[greenhouse.irrigationSystem]
    ) * area * regionalMultiplier;

    const automation = this.equipmentCosts.automation[greenhouse.automationLevel] * area * regionalMultiplier;
    
    const infrastructure = area * 50 * regionalMultiplier; // Electrical, plumbing
    const permits = Math.max(5000, area * 10) * regionalMultiplier; // Permits and licenses

    return {
      construction: Math.round(construction),
      equipment: Math.round(equipment),
      automation: Math.round(automation),
      infrastructure: Math.round(infrastructure),
      permits: Math.round(permits),
      total: Math.round(construction + equipment + automation + infrastructure + permits)
    };
  }

  private calculateAnnualCosts(monthly: OperationalCosts): number {
    return (
      monthly.electricity +
      monthly.water +
      monthly.fertilizer +
      monthly.pesticide +
      monthly.labor +
      monthly.maintenance
    ) * 12 + monthly.insurance + monthly.taxes;
  }

  private calculateRevenue(crop: CropSpecs, area: number) {
    const annualYield = area * crop.plantingDensity * crop.expectedYieldPerM2 * crop.cyclesPerYear;
    const grossRevenue = annualYield * crop.expectedPrice;
    const seedCosts = area * crop.seedCost * crop.cyclesPerYear;
    const fertilizerCosts = area * crop.fertilizerCost * crop.cyclesPerYear;
    const netRevenue = grossRevenue - seedCosts - fertilizerCosts;

    return {
      annualYield: Math.round(annualYield),
      averagePrice: crop.expectedPrice,
      grossRevenue: Math.round(grossRevenue),
      netRevenue: Math.round(netRevenue)
    };
  }

  private performFinancialAnalysis(
    initialInvestment: number,
    netRevenue: number,
    annualCosts: number
  ) {
    const annualProfit = netRevenue - annualCosts;
    const paybackPeriod = annualProfit > 0 ? initialInvestment / annualProfit : 999;
    const roi = annualProfit > 0 ? (annualProfit / initialInvestment) * 100 : -100;
    
    // NPV calculation (10% discount rate)
    const discountRate = 0.10;
    let npv = -initialInvestment;
    for (let year = 1; year <= 10; year++) {
      npv += annualProfit / Math.pow(1 + discountRate, year);
    }
    
    // IRR calculation (simplified)
    let irr = 0;
    if (annualProfit > 0) {
      irr = (annualProfit / initialInvestment) * 100;
    }
    
    const breakEvenPoint = paybackPeriod * 12;

    return {
      paybackPeriod: Math.round(paybackPeriod * 10) / 10,
      roi: Math.round(roi * 10) / 10,
      npv: Math.round(npv),
      irr: Math.round(irr * 10) / 10,
      breakEvenPoint: Math.round(breakEvenPoint)
    };
  }

  private generateProjections(
    initialInvestment: number,
    grossRevenue: number,
    annualCosts: number,
    years: number
  ) {
    const projections = [];
    let cumulative = -initialInvestment;

    for (let year = 1; year <= years; year++) {
      // Assume 3% inflation on costs and 2% price increase
      const inflationRate = 0.03;
      const priceGrowth = 0.02;
      
      const adjustedRevenue = grossRevenue * Math.pow(1 + priceGrowth, year - 1);
      const adjustedCosts = annualCosts * Math.pow(1 + inflationRate, year - 1);
      const profit = adjustedRevenue - adjustedCosts;
      cumulative += profit;

      projections.push({
        year,
        revenue: Math.round(adjustedRevenue),
        costs: Math.round(adjustedCosts),
        profit: Math.round(profit),
        cumulative: Math.round(cumulative)
      });
    }

    return projections;
  }

  private assessRisks(greenhouse: GreenhouseSpecs, crop: CropSpecs) {
    return [
      {
        factor: 'Hava durumu ekstrem koşulları',
        impact: 'high' as const,
        probability: 0.15,
        mitigation: 'Sigorta kapsamı ve güçlü yapı tasarımı'
      },
      {
        factor: 'Pazar fiyat dalgalanmaları',
        impact: 'medium' as const,
        probability: 0.30,
        mitigation: 'Çeşitli ürün portföyü ve sözleşmeli satış'
      },
      {
        factor: 'Enerji maliyeti artışı',
        impact: 'medium' as const,
        probability: 0.40,
        mitigation: 'Güneş enerjisi ve enerji verimliliği'
      },
      {
        factor: 'Hastalık ve zararlılar',
        impact: 'medium' as const,
        probability: 0.20,
        mitigation: 'Entegre mücadele programı'
      },
      {
        factor: 'İşçilik maliyeti artışı',
        impact: 'low' as const,
        probability: 0.60,
        mitigation: 'Otomasyon ve verimlilik artışı'
      }
    ];
  }

  private generateRecommendations(
    greenhouse: GreenhouseSpecs,
    crop: CropSpecs,
    costs: OperationalCosts,
    analysis: any
  ) {
    const recommendations = [];

    // Energy efficiency
    if (costs.electricity > 2000) {
      recommendations.push({
        category: 'Enerji Verimliliği',
        suggestion: 'Güneş paneli kurulumu ile elektrik maliyetlerini %40 azaltabilirsiniz',
        potentialSaving: costs.electricity * 12 * 0.4,
        priority: 'high' as const
      });
    }

    // Automation
    if (greenhouse.automationLevel === 'none' && costs.labor > 3000) {
      recommendations.push({
        category: 'Otomasyon',
        suggestion: 'Temel otomasyon sistemi ile işçilik maliyetlerini %25 azaltabilirsiniz',
        potentialSaving: costs.labor * 12 * 0.25,
        priority: 'medium' as const
      });
    }

    // Water efficiency
    if (greenhouse.irrigationSystem === 'manual') {
      recommendations.push({
        category: 'Su Verimliliği',
        suggestion: 'Damla sulama sistemi ile su kullanımını %30 azaltabilirsiniz',
        potentialSaving: costs.water * 12 * 0.3,
        priority: 'medium' as const
      });
    }

    // Crop optimization
    if (analysis.roi < 15) {
      recommendations.push({
        category: 'Ürün Optimizasyonu',
        suggestion: 'Yüksek değerli organik ürün yetiştirme ile geliri %50 artırabilirsiniz',
        potentialSaving: crop.expectedPrice * crop.expectedYieldPerM2 * 0.5,
        priority: 'high' as const
      });
    }

    return recommendations;
  }
}

export const roiCalculator = new ROICalculatorService();
