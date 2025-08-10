// =====================================================
// CLIMATE ANALYSIS SERVICE
// =====================================================
// Specialized service for climate suitability scoring
// and environmental risk assessment
// =====================================================

import { externalApiService } from './external-api-service';

export interface ClimateAnalysisRequest {
  location: {
    lat: number;
    lon: number;
    address?: string;
  };
  cropType?: 'tomato' | 'cucumber' | 'pepper' | 'lettuce' | 'strawberry' | 'flower' | 'herb';
  analysisType: 'basic' | 'detailed' | 'risk_assessment';
  timeframe?: {
    startDate: string;
    endDate: string;
  };
}

export interface ClimateAnalysisResult {
  location: {
    lat: number;
    lon: number;
    address: string;
  };
  suitabilityScore: number; // 0-100
  riskLevel: 'low' | 'medium' | 'high';
  climate: {
    averageTemp: number;
    tempRange: { min: number; max: number };
    humidity: number;
    precipitation: number;
    solarRadiation: number;
    windSpeed: number;
  };
  risks: {
    frost: { probability: number; months: string[] };
    heatWave: { probability: number; threshold: number };
    drought: { probability: number; severity: string };
    excessiveRain: { probability: number; amount: number };
  };
  seasonalAnalysis: {
    spring: { score: number; notes: string };
    summer: { score: number; notes: string };
    autumn: { score: number; notes: string };
    winter: { score: number; notes: string };
  };
  recommendations: {
    bestPlantingMonths: string[];
    heatingNeeds: { months: string[]; estimatedCost: number };
    coolingNeeds: { months: string[]; estimatedCost: number };
    irrigationNeeds: { level: 'low' | 'medium' | 'high'; schedule: string };
  };
  energyRequirements: {
    heating: { kwh: number; cost: number };
    cooling: { kwh: number; cost: number };
    lighting: { kwh: number; cost: number };
    total: { kwh: number; cost: number };
  };
  dataSource: string[];
  confidence: number; // 0-100
  lastUpdated: string;
}

class ClimateAnalysisService {
  
  // Crop-specific temperature ranges and requirements
  private cropRequirements = {
    tomato: {
      optimalTemp: { min: 18, max: 26 },
      criticalTemp: { min: 10, max: 35 },
      humidity: { min: 60, max: 80 },
      lightHours: { min: 12, max: 16 }
    },
    cucumber: {
      optimalTemp: { min: 20, max: 28 },
      criticalTemp: { min: 15, max: 32 },
      humidity: { min: 70, max: 85 },
      lightHours: { min: 12, max: 14 }
    },
    pepper: {
      optimalTemp: { min: 20, max: 30 },
      criticalTemp: { min: 15, max: 35 },
      humidity: { min: 50, max: 70 },
      lightHours: { min: 14, max: 16 }
    },
    lettuce: {
      optimalTemp: { min: 15, max: 20 },
      criticalTemp: { min: 5, max: 25 },
      humidity: { min: 80, max: 95 },
      lightHours: { min: 10, max: 14 }
    },
    strawberry: {
      optimalTemp: { min: 18, max: 24 },
      criticalTemp: { min: 10, max: 30 },
      humidity: { min: 60, max: 80 },
      lightHours: { min: 12, max: 14 }
    },
    flower: {
      optimalTemp: { min: 16, max: 24 },
      criticalTemp: { min: 12, max: 30 },
      humidity: { min: 50, max: 70 },
      lightHours: { min: 12, max: 16 }
    },
    herb: {
      optimalTemp: { min: 18, max: 25 },
      criticalTemp: { min: 10, max: 32 },
      humidity: { min: 40, max: 60 },
      lightHours: { min: 12, max: 16 }
    }
  };

  async analyzeClimate(request: ClimateAnalysisRequest): Promise<ClimateAnalysisResult> {
    try {
      console.log('🌡️ Starting climate analysis for:', request.location);

      // Get current weather data
      const currentWeather = await externalApiService.getOpenMeteoData(
        request.location.lat,
        request.location.lon,
        {
          current: ['temperature_2m', 'relative_humidity_2m', 'wind_speed_10m', 'cloud_cover'],
          hourly: ['temperature_2m', 'relative_humidity_2m', 'precipitation', 'solar_radiation_instant'],
          daily: ['temperature_2m_max', 'temperature_2m_min', 'precipitation_sum', 'solar_radiation_sum'],
          past_days: 30,
          forecast_days: 16
        }
      );

      // Get historical data for long-term averages
      const historicalData = await externalApiService.getMeteostatHistorical(
        request.location.lat,
        request.location.lon,
        '2020-01-01',
        '2023-12-31'
      );

      // Get solar radiation data
      const solarData = await externalApiService.getNasaPowerData(
        request.location.lat,
        request.location.lon,
        ['T2M', 'RH2M', 'WS2M', 'ALLSKY_SFC_SW_DWN'],
        '20240101',
        '20240131'
      );

      // Get soil information
      const soilData = await externalApiService.getSoilData(
        request.location.lat,
        request.location.lon
      );

      // Get address if not provided
      let address = request.location.address || 'Unknown Location';
      if (!request.location.address) {
        const geocodeResult = await externalApiService.geocodeAddress(
          `${request.location.lat},${request.location.lon}`
        );
        if (geocodeResult.success && geocodeResult.data.length > 0) {
          address = geocodeResult.data[0].display_name;
        }
      }

      // Process and analyze the data
      const analysis = this.processClimateData({
        currentWeather: currentWeather.data,
        historicalData: historicalData.data,
        solarData: solarData.data,
        soilData: soilData.data,
        cropType: request.cropType || 'tomato',
        location: { ...request.location, address }
      });

      return analysis;

    } catch (error: any) {
      console.error('Climate analysis error:', error);
      throw new Error(`Climate analysis failed: ${error.message}`);
    }
  }

  private processClimateData(data: any): ClimateAnalysisResult {
    const { currentWeather, historicalData, solarData, soilData, cropType, location } = data;
    
    // Extract current conditions
    const current = currentWeather?.current || {};
    const daily = currentWeather?.daily || {};
    
    // Calculate basic climate metrics
    const averageTemp = this.calculateAverage(daily.temperature_2m_max?.slice(0, 30) || [20]);
    const tempRange = {
      min: Math.min(...(daily.temperature_2m_min?.slice(0, 30) || [15])),
      max: Math.max(...(daily.temperature_2m_max?.slice(0, 30) || [25]))
    };
    const humidity = current.relative_humidity_2m || 65;
    const precipitation = this.calculateSum(daily.precipitation_sum?.slice(0, 30) || [0]);
    const solarRadiation = this.calculateAverage(daily.solar_radiation_sum?.slice(0, 30) || [15]);
    const windSpeed = current.wind_speed_10m || 2.5;

    // Get crop requirements
    const cropReqs = this.cropRequirements[cropType];

    // Calculate suitability score
    const suitabilityScore = this.calculateSuitabilityScore({
      averageTemp,
      tempRange,
      humidity,
      solarRadiation,
      cropReqs
    });

    // Assess risks
    const risks = this.assessRisks({
      tempRange,
      precipitation,
      averageTemp,
      historicalData
    });

    // Calculate seasonal analysis
    const seasonalAnalysis = this.analyzeSeasons({
      daily,
      cropReqs,
      location
    });

    // Generate recommendations
    const recommendations = this.generateRecommendations({
      cropType,
      suitabilityScore,
      risks,
      seasonalAnalysis,
      location
    });

    // Calculate energy requirements
    const energyRequirements = this.calculateEnergyRequirements({
      tempRange,
      averageTemp,
      cropReqs,
      location
    });

    return {
      location,
      suitabilityScore,
      riskLevel: suitabilityScore > 70 ? 'low' : suitabilityScore > 40 ? 'medium' : 'high',
      climate: {
        averageTemp,
        tempRange,
        humidity,
        precipitation,
        solarRadiation,
        windSpeed
      },
      risks,
      seasonalAnalysis,
      recommendations,
      energyRequirements,
      dataSource: ['Open-Meteo', 'Meteostat', 'NASA POWER', 'SoilGrids'],
      confidence: this.calculateConfidence([currentWeather, historicalData, solarData]),
      lastUpdated: new Date().toISOString()
    };
  }

  private calculateSuitabilityScore(params: any): number {
    const { averageTemp, tempRange, humidity, solarRadiation, cropReqs } = params;
    
    let score = 0;
    
    // Temperature score (40% weight)
    const tempScore = this.calculateTempScore(averageTemp, tempRange, cropReqs);
    score += tempScore * 0.4;
    
    // Humidity score (25% weight)
    const humidityScore = this.calculateHumidityScore(humidity, cropReqs);
    score += humidityScore * 0.25;
    
    // Solar radiation score (25% weight)
    const solarScore = this.calculateSolarScore(solarRadiation, cropReqs);
    score += solarScore * 0.25;
    
    // General climate score (10% weight)
    score += 80 * 0.1; // Base score for controlled environment
    
    return Math.round(Math.max(0, Math.min(100, score)));
  }

  private calculateTempScore(avgTemp: number, tempRange: any, cropReqs: any): number {
    const { optimalTemp, criticalTemp } = cropReqs;
    
    // Check if average temp is in optimal range
    if (avgTemp >= optimalTemp.min && avgTemp <= optimalTemp.max) {
      return 100;
    }
    
    // Check if temp range overlaps with optimal range
    if (tempRange.max >= optimalTemp.min && tempRange.min <= optimalTemp.max) {
      return 80;
    }
    
    // Check if within critical range
    if (avgTemp >= criticalTemp.min && avgTemp <= criticalTemp.max) {
      return 60;
    }
    
    return 30; // Requires significant climate control
  }

  private calculateHumidityScore(humidity: number, cropReqs: any): number {
    const { humidity: humidityReq } = cropReqs;
    
    if (humidity >= humidityReq.min && humidity <= humidityReq.max) {
      return 100;
    }
    
    const deviation = Math.min(
      Math.abs(humidity - humidityReq.min),
      Math.abs(humidity - humidityReq.max)
    );
    
    return Math.max(0, 100 - deviation * 2);
  }

  private calculateSolarScore(radiation: number, cropReqs: any): number {
    // Simplified solar scoring based on daily radiation
    const optimalRange = { min: 10, max: 25 }; // MJ/m²/day
    
    if (radiation >= optimalRange.min && radiation <= optimalRange.max) {
      return 100;
    }
    
    const deviation = Math.min(
      Math.abs(radiation - optimalRange.min),
      Math.abs(radiation - optimalRange.max)
    );
    
    return Math.max(20, 100 - deviation * 3);
  }

  private assessRisks(params: any): any {
    const { tempRange, precipitation, averageTemp } = params;
    
    return {
      frost: {
        probability: tempRange.min < 0 ? 80 : tempRange.min < 5 ? 40 : 10,
        months: tempRange.min < 5 ? ['Aralık', 'Ocak', 'Şubat'] : []
      },
      heatWave: {
        probability: tempRange.max > 35 ? 70 : tempRange.max > 30 ? 40 : 20,
        threshold: 35
      },
      drought: {
        probability: precipitation < 20 ? 60 : precipitation < 50 ? 30 : 10,
        severity: precipitation < 20 ? 'high' : precipitation < 50 ? 'medium' : 'low'
      },
      excessiveRain: {
        probability: precipitation > 150 ? 50 : precipitation > 100 ? 30 : 15,
        amount: precipitation
      }
    };
  }

  private analyzeSeasons(params: any): any {
    // Simplified seasonal analysis
    return {
      spring: { score: 85, notes: 'Optimal planting season with mild temperatures' },
      summer: { score: 70, notes: 'Higher cooling needs, good growth conditions' },
      autumn: { score: 80, notes: 'Good harvest season, moderate energy needs' },
      winter: { score: 60, notes: 'Significant heating required, shorter days' }
    };
  }

  private generateRecommendations(params: any): any {
    const { cropType, suitabilityScore, risks } = params;
    
    return {
      bestPlantingMonths: ['Mart', 'Nisan', 'Mayıs', 'Eylül'],
      heatingNeeds: {
        months: ['Aralık', 'Ocak', 'Şubat', 'Mart'],
        estimatedCost: suitabilityScore < 70 ? 2500 : 1800
      },
      coolingNeeds: {
        months: ['Haziran', 'Temmuz', 'Ağustos'],
        estimatedCost: suitabilityScore < 70 ? 1800 : 1200
      },
      irrigationNeeds: {
        level: risks.drought.probability > 50 ? 'high' : 'medium',
        schedule: 'Daily monitoring recommended with drip irrigation'
      }
    };
  }

  private calculateEnergyRequirements(params: any): any {
    const { tempRange, averageTemp, cropReqs, location } = params;
    
    // Simplified energy calculation (per m² per year)
    const heatingKwh = Math.max(0, (15 - averageTemp) * 100);
    const coolingKwh = Math.max(0, (averageTemp - 25) * 80);
    const lightingKwh = 300; // Base lighting needs
    
    const electricityRate = 0.08; // €/kWh approximate
    
    return {
      heating: { kwh: heatingKwh, cost: heatingKwh * electricityRate },
      cooling: { kwh: coolingKwh, cost: coolingKwh * electricityRate },
      lighting: { kwh: lightingKwh, cost: lightingKwh * electricityRate },
      total: { 
        kwh: heatingKwh + coolingKwh + lightingKwh, 
        cost: (heatingKwh + coolingKwh + lightingKwh) * electricityRate 
      }
    };
  }

  private calculateConfidence(dataSources: any[]): number {
    const successfulSources = dataSources.filter(source => source && source.success !== false);
    return Math.round((successfulSources.length / dataSources.length) * 100);
  }

  private calculateAverage(values: number[]): number {
    return values.length > 0 ? values.reduce((a, b) => a + b, 0) / values.length : 0;
  }

  private calculateSum(values: number[]): number {
    return values.reduce((a, b) => a + b, 0);
  }
}

// Export singleton instance
export const climateAnalysisService = new ClimateAnalysisService();
