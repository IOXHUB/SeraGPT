import { API_CONFIG, ApiResponse } from '../api-config';

export interface ROIInputs {
  location: string;
  greenhouseSize: number; // m²
  plantType: string;
  initialInvestment: number; // TL
  operationalCosts: {
    monthly: number;
    heating: number;
    seeds: number;
    fertilizer: number;
    labor: number;
    utilities: number;
  };
  expectedYield: {
    annual: number; // kg
    pricePerKg: number; // TL
    seasons: number;
  };
  projectDuration: number; // years
}

export interface GreenhouseSpecs {
  size: number;
  type: string;
  location: string;
  automationLevel: 'basic' | 'intermediate' | 'advanced';
}

export interface CropSpecs {
  type: string;
  yield: number;
  price: number;
  seasons: number;
}

export interface OperationalCosts {
  monthly: number;
  heating: number;
  seeds: number;
  fertilizer: number;
  labor: number;
  utilities: number;
  annual: number;
}

export interface ROICalculation {
  initialInvestment: {
    construction: number;
    equipment: number;
    automation: number;
    infrastructure: number;
    permits: number;
    total: number;
  };
  revenue: {
    grossRevenue: number;
    netRevenue: number;
  };
  operationalCosts: OperationalCosts;
  analysis: {
    roi: number;
    paybackPeriod: number;
    npv: number;
    irr: number;
  };
  recommendations: any[];
  risks: any[];
}

export interface ROIResults {
  roi: number; // percentage
  paybackPeriod: number; // years
  npv: number; // Net Present Value in TL
  irr: number; // Internal Rate of Return percentage
  cashFlow: number[]; // Annual cash flows
  totalRevenue: number;
  totalCosts: number;
  netProfit: number;
  breakEvenPoint: number; // years
  profitMargin: number; // percentage
  riskAssessment: {
    marketRisk: 'low' | 'medium' | 'high';
    climateRisk: 'low' | 'medium' | 'high';
    technologyRisk: 'low' | 'medium' | 'high';
    overallRisk: 'low' | 'medium' | 'high';
  };
  recommendations: string[];
}

export interface ROIAnalysisContext {
  userId: string;
  analysisId: string;
  timestamp: Date;
  inputs: ROIInputs;
  results: ROIResults;
  marketConditions: {
    currentPrices: Record<string, number>;
    priceVolatility: number;
    seasonalFactors: number[];
  };
}

class ROICalculatorService {
  private readonly discountRate = 0.08; // 8% discount rate
  private readonly inflationRate = 0.15; // 15% Turkish inflation rate
  private readonly taxRate = 0.20; // 20% corporate tax rate

  // Plant-specific data
  private readonly plantData = {
    tomato: {
      avgYieldPerM2: 80, // kg/m²/year
      avgPrice: 12, // TL/kg
      riskFactor: 1.2,
      seasonality: [0.8, 1.1, 1.3, 1.2, 0.9, 0.7, 0.6, 0.8, 1.0, 1.2, 1.4, 1.1]
    },
    cucumber: {
      avgYieldPerM2: 120,
      avgPrice: 8,
      riskFactor: 1.1,
      seasonality: [0.9, 1.0, 1.2, 1.3, 1.1, 0.8, 0.7, 0.9, 1.1, 1.2, 1.3, 1.0]
    },
    pepper: {
      avgYieldPerM2: 60,
      avgPrice: 15,
      riskFactor: 1.3,
      seasonality: [0.7, 0.9, 1.1, 1.4, 1.3, 1.0, 0.8, 0.9, 1.2, 1.3, 1.2, 0.9]
    },
    eggplant: {
      avgYieldPerM2: 70,
      avgPrice: 10,
      riskFactor: 1.1,
      seasonality: [0.8, 1.0, 1.2, 1.3, 1.2, 0.9, 0.7, 0.8, 1.1, 1.3, 1.2, 1.0]
    },
    lettuce: {
      avgYieldPerM2: 40,
      avgPrice: 6,
      riskFactor: 0.9,
      seasonality: [1.2, 1.1, 1.0, 0.8, 0.7, 0.6, 0.8, 1.0, 1.1, 1.3, 1.4, 1.3]
    },
    strawberry: {
      avgYieldPerM2: 30,
      avgPrice: 25,
      riskFactor: 1.5,
      seasonality: [0.6, 0.8, 1.2, 1.4, 1.6, 1.2, 0.7, 0.6, 0.8, 1.0, 1.1, 0.9]
    }
  };

  // Location-specific climate factors
  private readonly locationFactors = {
    antalya: { climateFactor: 1.2, energyCost: 0.9, laborCost: 0.95 },
    mersin: { climateFactor: 1.15, energyCost: 0.92, laborCost: 0.9 },
    izmir: { climateFactor: 1.1, energyCost: 1.0, laborCost: 1.0 },
    adana: { climateFactor: 1.18, energyCost: 0.88, laborCost: 0.85 },
    mugla: { climateFactor: 1.12, energyCost: 0.95, laborCost: 1.05 },
    istanbul: { climateFactor: 0.95, energyCost: 1.1, laborCost: 1.15 }
  };

  calculateROI(inputs: ROIInputs): ApiResponse<ROICalculation> {
    try {
      const calculation = this.performCalculation(inputs);
      return {
        success: true,
        data: calculation
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'ROI calculation failed'
      };
    }
  }

  private performCalculation(inputs: ROIInputs): ROICalculation {
    // Calculate detailed ROI analysis
    const initialInvestment = {
      construction: inputs.initialInvestment * 0.4,
      equipment: inputs.initialInvestment * 0.3,
      automation: inputs.initialInvestment * 0.15,
      infrastructure: inputs.initialInvestment * 0.1,
      permits: inputs.initialInvestment * 0.05,
      total: inputs.initialInvestment
    };

    const annualRevenue = inputs.expectedYield.annual * inputs.expectedYield.pricePerKg;
    const annualCosts = inputs.operationalCosts.monthly * 12;
    const netAnnualRevenue = annualRevenue - annualCosts;

    const roi = ((netAnnualRevenue * inputs.projectDuration - inputs.initialInvestment) / inputs.initialInvestment) * 100;
    const paybackPeriod = inputs.initialInvestment / netAnnualRevenue;

    // Simplified NPV calculation
    const discountRate = 0.1; // 10%
    let npv = -inputs.initialInvestment;
    for (let year = 1; year <= inputs.projectDuration; year++) {
      npv += netAnnualRevenue / Math.pow(1 + discountRate, year);
    }

    // Simplified IRR calculation
    const irr = ((netAnnualRevenue / inputs.initialInvestment) - 1) * 100;

    return {
      initialInvestment,
      revenue: {
        grossRevenue: annualRevenue,
        netRevenue: netAnnualRevenue
      },
      operationalCosts: {
        ...inputs.operationalCosts,
        annual: annualCosts
      },
      analysis: {
        roi: Math.round(roi * 100) / 100,
        paybackPeriod: Math.round(paybackPeriod * 100) / 100,
        npv: Math.round(npv),
        irr: Math.round(irr * 100) / 100
      },
      recommendations: [
        {
          category: 'Maliyet Optimizasyonu',
          suggestion: 'Enerji verimliliği için LED aydınlatma kullanın',
          potentialSaving: 15000,
          priority: 'high'
        },
        {
          category: 'Verim Artışı',
          suggestion: 'Hidroponik sisteme geçiş düşünün',
          potentialSaving: 25000,
          priority: 'medium'
        }
      ],
      risks: [
        {
          factor: 'Pazar Fiyat Dalgalanması',
          impact: 'high',
          probability: 0.3,
          mitigation: 'Sözleşmeli satış anlaşmaları yapın'
        },
        {
          factor: 'İklim Değişikliği',
          impact: 'medium',
          probability: 0.2,
          mitigation: 'Gelişmi�� iklim kontrol sistemleri kurun'
        }
      ]
    };
  }

  calculateROILegacy(inputs: ROIInputs): ROIResults {
    // Get plant and location data
    const plantInfo = this.plantData[inputs.plantType as keyof typeof this.plantData];
    const locationInfo = this.locationFactors[inputs.location as keyof typeof this.locationFactors];

    if (!plantInfo || !locationInfo) {
      throw new Error('Invalid plant type or location');
    }

    // Calculate annual costs
    const annualOperationalCosts = this.calculateAnnualCosts(inputs, locationInfo);
    
    // Calculate annual revenue
    const annualRevenue = this.calculateAnnualRevenue(inputs, plantInfo, locationInfo);
    
    // Calculate cash flows
    const cashFlows = this.calculateCashFlows(
      inputs,
      annualRevenue,
      annualOperationalCosts
    );

    // Calculate financial metrics
    const npv = this.calculateNPV(cashFlows, inputs.initialInvestment);
    const irr = this.calculateIRR(cashFlows, inputs.initialInvestment);
    const paybackPeriod = this.calculatePaybackPeriod(cashFlows, inputs.initialInvestment);
    const roi = ((annualRevenue - annualOperationalCosts) / inputs.initialInvestment) * 100;

    // Calculate totals
    const totalRevenue = annualRevenue * inputs.projectDuration;
    const totalCosts = inputs.initialInvestment + (annualOperationalCosts * inputs.projectDuration);
    const netProfit = totalRevenue - totalCosts;
    const profitMargin = ((annualRevenue - annualOperationalCosts) / annualRevenue) * 100;

    // Risk assessment
    const riskAssessment = this.assessRisks(inputs, plantInfo);

    // Generate recommendations
    const recommendations = this.generateRecommendations(inputs, {
      roi,
      paybackPeriod,
      npv,
      profitMargin
    });

    return {
      roi,
      paybackPeriod,
      npv,
      irr,
      cashFlow: cashFlows,
      totalRevenue,
      totalCosts,
      netProfit,
      breakEvenPoint: paybackPeriod,
      profitMargin,
      riskAssessment,
      recommendations
    };
  }

  private calculateAnnualCosts(inputs: ROIInputs, locationInfo: any): number {
    const monthlyCosts = 
      inputs.operationalCosts.monthly +
      inputs.operationalCosts.heating * locationInfo.energyCost +
      inputs.operationalCosts.seeds +
      inputs.operationalCosts.fertilizer +
      inputs.operationalCosts.labor * locationInfo.laborCost +
      inputs.operationalCosts.utilities * locationInfo.energyCost;

    return monthlyCosts * 12;
  }

  private calculateAnnualRevenue(inputs: ROIInputs, plantInfo: any, locationInfo: any): number {
    const adjustedYield = inputs.expectedYield.annual * locationInfo.climateFactor;
    const adjustedPrice = inputs.expectedYield.pricePerKg;
    return adjustedYield * adjustedPrice;
  }

  private calculateCashFlows(
    inputs: ROIInputs,
    annualRevenue: number,
    annualCosts: number
  ): number[] {
    const cashFlows: number[] = [];
    
    for (let year = 1; year <= inputs.projectDuration; year++) {
      // Apply inflation to costs and revenue
      const inflatedRevenue = annualRevenue * Math.pow(1 + this.inflationRate, year - 1);
      const inflatedCosts = annualCosts * Math.pow(1 + this.inflationRate, year - 1);
      
      // Calculate net cash flow after taxes
      const grossProfit = inflatedRevenue - inflatedCosts;
      const netCashFlow = grossProfit * (1 - this.taxRate);
      
      cashFlows.push(netCashFlow);
    }
    
    return cashFlows;
  }

  private calculateNPV(cashFlows: number[], initialInvestment: number): number {
    let npv = -initialInvestment;
    
    cashFlows.forEach((cashFlow, index) => {
      npv += cashFlow / Math.pow(1 + this.discountRate, index + 1);
    });
    
    return npv;
  }

  private calculateIRR(cashFlows: number[], initialInvestment: number): number {
    // Simplified IRR calculation using Newton's method
    let rate = 0.1; // Initial guess
    
    for (let i = 0; i < 100; i++) {
      let npv = -initialInvestment;
      let derivativeNpv = 0;
      
      cashFlows.forEach((cashFlow, index) => {
        const period = index + 1;
        npv += cashFlow / Math.pow(1 + rate, period);
        derivativeNpv -= (period * cashFlow) / Math.pow(1 + rate, period + 1);
      });
      
      if (Math.abs(npv) < 0.01) break;
      
      rate = rate - npv / derivativeNpv;
    }
    
    return rate * 100;
  }

  private calculatePaybackPeriod(cashFlows: number[], initialInvestment: number): number {
    let cumulativeCashFlow = 0;
    
    for (let i = 0; i < cashFlows.length; i++) {
      cumulativeCashFlow += cashFlows[i];
      
      if (cumulativeCashFlow >= initialInvestment) {
        // Linear interpolation for fractional year
        const previousCumulative = cumulativeCashFlow - cashFlows[i];
        const fraction = (initialInvestment - previousCumulative) / cashFlows[i];
        return i + fraction + 1;
      }
    }
    
    return cashFlows.length; // If payback period exceeds project duration
  }

  private assessRisks(inputs: ROIInputs, plantInfo: any): ROIResults['riskAssessment'] {
    // Market risk based on plant volatility and price
    const marketRisk = plantInfo.riskFactor > 1.3 ? 'high' : 
                       plantInfo.riskFactor > 1.1 ? 'medium' : 'low';

    // Climate risk based on location and plant sensitivity
    const climateRisk = inputs.location === 'istanbul' ? 'high' :
                       ['antalya', 'mersin'].includes(inputs.location) ? 'low' : 'medium';

    // Technology risk based on greenhouse size and complexity
    const technologyRisk = inputs.greenhouseSize > 5000 ? 'medium' : 'low';

    // Overall risk assessment
    const riskScores = {
      low: 1,
      medium: 2,
      high: 3
    };

    const avgRisk = (riskScores[marketRisk] + riskScores[climateRisk] + riskScores[technologyRisk]) / 3;
    const overallRisk = avgRisk > 2.5 ? 'high' : avgRisk > 1.5 ? 'medium' : 'low';

    return {
      marketRisk,
      climateRisk,
      technologyRisk,
      overallRisk
    };
  }

  private generateRecommendations(inputs: ROIInputs, metrics: any): string[] {
    const recommendations: string[] = [];

    if (metrics.roi < 15) {
      recommendations.push('ROI oranı düşük. Maliyetleri optimize etmeyi veya daha karlı ürün türlerini değerlendirmeyi düşünün.');
    }

    if (metrics.paybackPeriod > 7) {
      recommendations.push('Geri ödeme süresi uzun. İlk yatırım maliyetlerini azaltmayı düşünün.');
    }

    if (metrics.npv < 0) {
      recommendations.push('Proje ekonomik olarak kârlı değil. Parametreleri gözden geçirin.');
    }

    if (metrics.profitMargin < 20) {
      recommendations.push('Kar marjı düşük. Operasyonel verimliliği artırmaya odaklanın.');
    }

    if (inputs.greenhouseSize < 1000) {
      recommendations.push('Sera büyüklüğünü artırarak ölçek ekonomisinden faydalanabilirsiniz.');
    }

    if (['antalya', 'mersin'].includes(inputs.location)) {
      recommendations.push('Seçtiğiniz lokasyon sera tarımı için idealdir. İklim avantajınızı kullanın.');
    }

    return recommendations;
  }

  // Create analysis context for saving/tracking
  createAnalysisContext(userId: string, inputs: ROIInputs, results: ROIResults): ROIAnalysisContext {
    return {
      userId,
      analysisId: `roi_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date(),
      inputs,
      results,
      marketConditions: {
        currentPrices: this.getCurrentMarketPrices(),
        priceVolatility: 0.15, // 15% average volatility
        seasonalFactors: this.plantData[inputs.plantType as keyof typeof this.plantData]?.seasonality || []
      }
    };
  }

  private getCurrentMarketPrices(): Record<string, number> {
    // In a real implementation, this would fetch from a market API
    return {
      tomato: 12,
      cucumber: 8,
      pepper: 15,
      eggplant: 10,
      lettuce: 6,
      strawberry: 25
    };
  }

  // Method to save analysis (would integrate with database)
  async saveAnalysis(context: ROIAnalysisContext): Promise<ApiResponse<any>> {
    try {
      // In real implementation, save to database
      console.log('Saving ROI analysis:', context.analysisId);
      
      return {
        success: true,
        data: {
          analysisId: context.analysisId,
          saved: true
        }
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to save analysis'
      };
    }
  }

  // Method to get user's previous analyses
  async getUserAnalyses(userId: string): Promise<ApiResponse<ROIAnalysisContext[]>> {
    try {
      // In real implementation, fetch from database
      const mockAnalyses: ROIAnalysisContext[] = [
        // Mock data for demonstration
      ];

      return {
        success: true,
        data: mockAnalyses
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to fetch user analyses'
      };
    }
  }
}

export const roiCalculator = new ROICalculatorService();
