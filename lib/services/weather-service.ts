import { API_CONFIG, ApiResponse } from '../api-config';

export interface ClimateAnalysisInputs {
  location: {
    city: string;
    district: string;
    coordinates: { lat: number; lon: number };
  };
  plantType: string;
  greenhouseType: 'plastic' | 'polycarbonate' | 'glass';
  plannedStartDate: string;
  analysisPeriod: number; // months
}

export interface ClimateAnalysisResults {
  suitabilityScore: number; // 0-100
  riskFactors: {
    frost: 'low' | 'medium' | 'high';
    heatWave: 'low' | 'medium' | 'high';
    wind: 'low' | 'medium' | 'high';
    humidity: 'low' | 'medium' | 'high';
  };
  climateData: {
    avgTemperature: number;
    maxTemperature: number;
    minTemperature: number;
    avgHumidity: number;
    annualRainfall: number;
    avgWindSpeed: number;
  };
  optimalSeasons: Array<{
    season: string;
    months: string;
    suitability: number;
    temperature: number;
    humidity: number;
  }>;
  recommendations: string[];
  historicalEvents: Array<{
    event: string;
    date: string;
    impact: string;
  }>;
}

export interface WeatherData {
  temperature: number;
  humidity: number;
  windSpeed: number;
  condition: string;
  pressure: number;
  visibility: number;
}

export interface HistoricalWeatherData {
  year: number;
  months: Array<{
    month: number;
    avgTemp: number;
    maxTemp: number;
    minTemp: number;
    humidity: number;
    rainfall: number;
    windSpeed: number;
  }>;
}

class WeatherService {
  private apiKey = API_CONFIG.WEATHER?.apiKey || 'demo_key';
  private baseUrl = 'https://api.openweathermap.org/data/2.5';

  // Plant requirements database
  private plantRequirements = {
    tomato: {
      tempRange: [15, 35],
      optimalTemp: [20, 28],
      humidityRange: [60, 80],
      frostTolerance: false,
      heatTolerance: 'medium'
    },
    cucumber: {
      tempRange: [18, 32],
      optimalTemp: [22, 28],
      humidityRange: [70, 85],
      frostTolerance: false,
      heatTolerance: 'low'
    },
    pepper: {
      tempRange: [20, 35],
      optimalTemp: [25, 30],
      humidityRange: [60, 75],
      frostTolerance: false,
      heatTolerance: 'high'
    },
    eggplant: {
      tempRange: [22, 35],
      optimalTemp: [25, 32],
      humidityRange: [65, 80],
      frostTolerance: false,
      heatTolerance: 'high'
    },
    lettuce: {
      tempRange: [10, 25],
      optimalTemp: [15, 20],
      humidityRange: [50, 70],
      frostTolerance: true,
      heatTolerance: 'low'
    },
    strawberry: {
      tempRange: [15, 28],
      optimalTemp: [18, 24],
      humidityRange: [60, 80],
      frostTolerance: false,
      heatTolerance: 'medium'
    }
  };

  // Regional climate data (mock data for Turkey)
  private regionalClimateData = {
    antalya: {
      avgTemp: 18.7,
      maxTemp: 35.2,
      minTemp: 3.1,
      humidity: 64,
      rainfall: 1002,
      windSpeed: 3.2,
      frostDays: 2,
      heatWaveDays: 25,
      seasons: {
        spring: { temp: 19, humidity: 62, suitability: 85 },
        summer: { temp: 28, humidity: 66, suitability: 95 },
        autumn: { temp: 20, humidity: 65, suitability: 90 },
        winter: { temp: 12, humidity: 63, suitability: 70 }
      }
    },
    mersin: {
      avgTemp: 19.2,
      maxTemp: 36.8,
      minTemp: 4.2,
      humidity: 67,
      rainfall: 553,
      windSpeed: 2.8,
      frostDays: 3,
      heatWaveDays: 30,
      seasons: {
        spring: { temp: 20, humidity: 65, suitability: 88 },
        summer: { temp: 29, humidity: 69, suitability: 92 },
        autumn: { temp: 21, humidity: 68, suitability: 85 },
        winter: { temp: 13, humidity: 66, suitability: 65 }
      }
    },
    izmir: {
      avgTemp: 17.9,
      maxTemp: 33.1,
      minTemp: 1.8,
      humidity: 59,
      rainfall: 712,
      windSpeed: 4.1,
      frostDays: 8,
      heatWaveDays: 18,
      seasons: {
        spring: { temp: 18, humidity: 57, suitability: 80 },
        summer: { temp: 26, humidity: 61, suitability: 85 },
        autumn: { temp: 19, humidity: 60, suitability: 82 },
        winter: { temp: 11, humidity: 58, suitability: 60 }
      }
    },
    adana: {
      avgTemp: 19.5,
      maxTemp: 37.2,
      minTemp: 2.9,
      humidity: 68,
      rainfall: 681,
      windSpeed: 2.5,
      frostDays: 5,
      heatWaveDays: 35,
      seasons: {
        spring: { temp: 21, humidity: 66, suitability: 90 },
        summer: { temp: 30, humidity: 70, suitability: 88 },
        autumn: { temp: 22, humidity: 69, suitability: 85 },
        winter: { temp: 12, humidity: 67, suitability: 65 }
      }
    },
    mugla: {
      avgTemp: 16.8,
      maxTemp: 32.5,
      minTemp: 2.1,
      humidity: 61,
      rainfall: 924,
      windSpeed: 3.8,
      frostDays: 6,
      heatWaveDays: 15,
      seasons: {
        spring: { temp: 17, humidity: 59, suitability: 78 },
        summer: { temp: 25, humidity: 63, suitability: 82 },
        autumn: { temp: 18, humidity: 62, suitability: 80 },
        winter: { temp: 10, humidity: 60, suitability: 55 }
      }
    },
    istanbul: {
      avgTemp: 14.6,
      maxTemp: 29.8,
      minTemp: -1.2,
      humidity: 72,
      rainfall: 844,
      windSpeed: 4.5,
      frostDays: 18,
      heatWaveDays: 8,
      seasons: {
        spring: { temp: 15, humidity: 70, suitability: 65 },
        summer: { temp: 23, humidity: 74, suitability: 70 },
        autumn: { temp: 16, humidity: 73, suitability: 68 },
        winter: { temp: 8, humidity: 71, suitability: 45 }
      }
    },
    ankara: {
      avgTemp: 12.0,
      maxTemp: 31.2,
      minTemp: -4.3,
      humidity: 58,
      rainfall: 415,
      windSpeed: 3.1,
      frostDays: 35,
      heatWaveDays: 12,
      seasons: {
        spring: { temp: 13, humidity: 56, suitability: 60 },
        summer: { temp: 22, humidity: 60, suitability: 68 },
        autumn: { temp: 14, humidity: 59, suitability: 62 },
        winter: { temp: 3, humidity: 57, suitability: 30 }
      }
    },
    konya: {
      avgTemp: 11.5,
      maxTemp: 30.8,
      minTemp: -5.1,
      humidity: 56,
      rainfall: 323,
      windSpeed: 2.9,
      frostDays: 42,
      heatWaveDays: 15,
      seasons: {
        spring: { temp: 12, humidity: 54, suitability: 58 },
        summer: { temp: 21, humidity: 58, suitability: 65 },
        autumn: { temp: 13, humidity: 57, suitability: 60 },
        winter: { temp: 2, humidity: 55, suitability: 25 }
      }
    }
  };

  async getCurrentWeather(lat: number, lon: number): Promise<ApiResponse<WeatherData>> {
    try {
      // In production, this would make a real API call
      // For now, return mock data based on coordinates
      const mockWeather: WeatherData = {
        temperature: Math.round(15 + Math.random() * 20),
        humidity: Math.round(50 + Math.random() * 30),
        windSpeed: Math.round(Math.random() * 15),
        condition: ['Güneşli', 'Bulutlu', 'Yağmurlu', 'Parçalı Bulutlu'][Math.floor(Math.random() * 4)],
        pressure: Math.round(1000 + Math.random() * 50),
        visibility: Math.round(5 + Math.random() * 10)
      };

      return {
        success: true,
        data: mockWeather
      };
    } catch (error) {
      return {
        success: false,
        error: 'Weather data could not be fetched'
      };
    }
  }

  async analyzeClimate(inputs: ClimateAnalysisInputs): Promise<ApiResponse<ClimateAnalysisResults>> {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 3000));

      const cityData = this.regionalClimateData[inputs.location.city as keyof typeof this.regionalClimateData];
      const plantReqs = this.plantRequirements[inputs.plantType as keyof typeof this.plantRequirements];

      if (!cityData || !plantReqs) {
        return {
          success: false,
          error: 'Invalid location or plant type'
        };
      }

      // Calculate suitability score
      const suitabilityScore = this.calculateSuitabilityScore(cityData, plantReqs);

      // Assess risk factors
      const riskFactors = this.assessRiskFactors(cityData, plantReqs);

      // Get optimal seasons
      const optimalSeasons = this.getOptimalSeasons(cityData, plantReqs);

      // Generate recommendations
      const recommendations = this.generateRecommendations(
        inputs,
        cityData,
        plantReqs,
        suitabilityScore,
        riskFactors
      );

      // Get historical events (mock data)
      const historicalEvents = this.getHistoricalEvents(inputs.location.city);

      const results: ClimateAnalysisResults = {
        suitabilityScore,
        riskFactors,
        climateData: {
          avgTemperature: cityData.avgTemp,
          maxTemperature: cityData.maxTemp,
          minTemperature: cityData.minTemp,
          avgHumidity: cityData.humidity,
          annualRainfall: cityData.rainfall,
          avgWindSpeed: cityData.windSpeed
        },
        optimalSeasons,
        recommendations,
        historicalEvents
      };

      return {
        success: true,
        data: results
      };
    } catch (error) {
      return {
        success: false,
        error: 'Climate analysis failed'
      };
    }
  }

  private calculateSuitabilityScore(cityData: any, plantReqs: any): number {
    let score = 100;

    // Temperature suitability
    const tempScore = this.calculateTemperatureScore(cityData, plantReqs);
    
    // Humidity suitability
    const humidityScore = this.calculateHumidityScore(cityData, plantReqs);
    
    // Climate stability
    const stabilityScore = this.calculateStabilityScore(cityData);

    // Weighted average
    const finalScore = (tempScore * 0.4) + (humidityScore * 0.3) + (stabilityScore * 0.3);
    
    return Math.round(Math.max(0, Math.min(100, finalScore)));
  }

  private calculateTemperatureScore(cityData: any, plantReqs: any): number {
    const avgTemp = cityData.avgTemp;
    const [minReq, maxReq] = plantReqs.tempRange;
    const [optMin, optMax] = plantReqs.optimalTemp;

    if (avgTemp >= optMin && avgTemp <= optMax) {
      return 100;
    } else if (avgTemp >= minReq && avgTemp <= maxReq) {
      return 70;
    } else {
      const deviation = Math.min(
        Math.abs(avgTemp - minReq),
        Math.abs(avgTemp - maxReq)
      );
      return Math.max(0, 70 - (deviation * 10));
    }
  }

  private calculateHumidityScore(cityData: any, plantReqs: any): number {
    const humidity = cityData.humidity;
    const [minHum, maxHum] = plantReqs.humidityRange;

    if (humidity >= minHum && humidity <= maxHum) {
      return 100;
    } else {
      const deviation = Math.min(
        Math.abs(humidity - minHum),
        Math.abs(humidity - maxHum)
      );
      return Math.max(0, 100 - (deviation * 2));
    }
  }

  private calculateStabilityScore(cityData: any): number {
    // Lower frost days and heat wave days = higher stability
    const frostPenalty = cityData.frostDays * 2;
    const heatPenalty = cityData.heatWaveDays * 1.5;
    
    return Math.max(0, 100 - frostPenalty - heatPenalty);
  }

  private assessRiskFactors(cityData: any, plantReqs: any): ClimateAnalysisResults['riskFactors'] {
    const frostRisk = !plantReqs.frostTolerance && cityData.frostDays > 10 ? 'high' :
                     cityData.frostDays > 5 ? 'medium' : 'low';

    const heatRisk = plantReqs.heatTolerance === 'low' && cityData.heatWaveDays > 20 ? 'high' :
                     cityData.heatWaveDays > 15 ? 'medium' : 'low';

    const windRisk = cityData.windSpeed > 6 ? 'high' :
                     cityData.windSpeed > 4 ? 'medium' : 'low';

    const humidityRisk = cityData.humidity > 80 || cityData.humidity < 40 ? 'high' :
                         cityData.humidity > 75 || cityData.humidity < 50 ? 'medium' : 'low';

    return {
      frost: frostRisk,
      heatWave: heatRisk,
      wind: windRisk,
      humidity: humidityRisk
    };
  }

  private getOptimalSeasons(cityData: any, plantReqs: any): ClimateAnalysisResults['optimalSeasons'] {
    const seasons = [
      {
        season: 'İlkbahar',
        months: 'Mart - Mayıs',
        ...cityData.seasons.spring
      },
      {
        season: 'Yaz',
        months: 'Haziran - Ağustos',
        ...cityData.seasons.summer
      },
      {
        season: 'Sonbahar',
        months: 'Eylül - Kasım',
        ...cityData.seasons.autumn
      },
      {
        season: 'Kış',
        months: 'Aralık - Şubat',
        ...cityData.seasons.winter
      }
    ];

    // Adjust suitability based on plant requirements
    return seasons.map(season => ({
      ...season,
      suitability: this.adjustSeasonSuitability(season, plantReqs)
    })).sort((a, b) => b.suitability - a.suitability);
  }

  private adjustSeasonSuitability(season: any, plantReqs: any): number {
    const [minTemp, maxTemp] = plantReqs.tempRange;
    const [minHum, maxHum] = plantReqs.humidityRange;

    let score = season.suitability;

    // Temperature adjustment
    if (season.temp < minTemp || season.temp > maxTemp) {
      score -= 20;
    }

    // Humidity adjustment
    if (season.humidity < minHum || season.humidity > maxHum) {
      score -= 15;
    }

    return Math.max(0, Math.min(100, score));
  }

  private generateRecommendations(
    inputs: ClimateAnalysisInputs,
    cityData: any,
    plantReqs: any,
    suitabilityScore: number,
    riskFactors: any
  ): string[] {
    const recommendations: string[] = [];

    if (suitabilityScore >= 80) {
      recommendations.push('Seçtiğiniz lokasyon bu bitki için mükemmel iklim koşullarına sahip.');
    } else if (suitabilityScore >= 60) {
      recommendations.push('Lokasyon uygun, ancak bazı risk faktörlerine dikkat edilmeli.');
    } else {
      recommendations.push('Bu lokasyon seçilen bitki için zorluklar içerebilir. Alternatif lokasyonları değerlendirin.');
    }

    if (riskFactors.frost === 'high') {
      recommendations.push('Don koruması için ısıtma sistemi kurulması kritik önem taşıyor.');
    }

    if (riskFactors.heatWave === 'high') {
      recommendations.push('Aşırı sıcaklık dönemlerinde gölgeleme ve soğutma sistemleri gerekli.');
    }

    if (riskFactors.wind === 'high') {
      recommendations.push('Rüzgar kırıcı duvarlar veya ağaç sıraları planlanmalı.');
    }

    if (riskFactors.humidity === 'high') {
      recommendations.push('Nem kontrolü için havalandırma sistemine özel dikkat gösterilmeli.');
    }

    if (inputs.greenhouseType === 'plastic') {
      recommendations.push('Plastik sera tercihiniz uygun maliyetli, ancak yalıtım performansını artırmak için çift kat kullanabilirsiniz.');
    }

    if (cityData.rainfall > 800) {
      recommendations.push('Yüksek yağış nedeniyle drenaj sistemine özen gösterilmeli.');
    }

    if (cityData.avgTemp > 25) {
      recommendations.push('Yüksek sıcaklık ortalaması nedeniyle gölgeleme sistemleri düşünülmeli.');
    }

    return recommendations;
  }

  private getHistoricalEvents(city: string): ClimateAnalysisResults['historicalEvents'] {
    // Mock historical events data
    const events = [
      {
        event: 'Aş��rı soğuk dalgası',
        date: '2021 Şubat',
        impact: 'Sera ısıtma maliyetlerinde %40 artış'
      },
      {
        event: 'Uzun süreli kuraklık',
        date: '2020 Yaz',
        impact: 'Su maliyetlerinde artış ve verim düşüşü'
      },
      {
        event: 'Şiddetli fırtına',
        date: '2022 Kasım',
        impact: 'Sera yapılarında hasar raporları'
      }
    ];

    return events;
  }

  // Method to get historical weather data
  async getHistoricalData(lat: number, lon: number, years: number = 5): Promise<ApiResponse<HistoricalWeatherData[]>> {
    try {
      // Mock historical data
      const historicalData: HistoricalWeatherData[] = [];
      
      for (let year = new Date().getFullYear() - years; year < new Date().getFullYear(); year++) {
        const yearData: HistoricalWeatherData = {
          year,
          months: []
        };

        for (let month = 1; month <= 12; month++) {
          yearData.months.push({
            month,
            avgTemp: 10 + Math.random() * 20,
            maxTemp: 20 + Math.random() * 20,
            minTemp: Math.random() * 15,
            humidity: 50 + Math.random() * 30,
            rainfall: Math.random() * 150,
            windSpeed: Math.random() * 10
          });
        }

        historicalData.push(yearData);
      }

      return {
        success: true,
        data: historicalData
      };
    } catch (error) {
      return {
        success: false,
        error: 'Historical data could not be fetched'
      };
    }
  }
}

export const weatherService = new WeatherService();
