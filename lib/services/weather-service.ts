import { API_CONFIG, ApiResponse, ApiError } from '../api-config';

export interface WeatherData {
  location: {
    lat: number;
    lon: number;
    name: string;
    country: string;
  };
  current: {
    temperature: number;
    humidity: number;
    pressure: number;
    windSpeed: number;
    windDirection: number;
    cloudCover: number;
    uvIndex: number;
    visibility: number;
    description: string;
    icon: string;
  };
  forecast: {
    date: string;
    tempMin: number;
    tempMax: number;
    humidity: number;
    precipitation: number;
    windSpeed: number;
    description: string;
    icon: string;
  }[];
  historical: {
    date: string;
    tempAvg: number;
    tempMin: number;
    tempMax: number;
    humidity: number;
    precipitation: number;
  }[];
}

export interface ClimateAnalysis {
  riskScore: number; // 0-100
  recommendations: string[];
  seasons: {
    season: 'spring' | 'summer' | 'autumn' | 'winter';
    suitability: number; // 0-100
    challenges: string[];
    opportunities: string[];
  }[];
  monthlyData: {
    month: number;
    avgTemp: number;
    minTemp: number;
    maxTemp: number;
    precipitation: number;
    humidity: number;
    solarRadiation: number;
    growingDegreeDay: number;
  }[];
}

class WeatherService {
  private baseUrl = API_CONFIG.OPENWEATHER.baseUrl;
  private oneCallUrl = API_CONFIG.OPENWEATHER.oneCallUrl;
  private apiKey = API_CONFIG.OPENWEATHER.apiKey;

  private async fetchWithRetry(url: string, retries = 3): Promise<any> {
    for (let i = 0; i < retries; i++) {
      try {
        const response = await fetch(url);
        
        if (!response.ok) {
          if (response.status === 429) {
            // Rate limited, wait and retry
            await new Promise(resolve => setTimeout(resolve, 2000 * (i + 1)));
            continue;
          }
          throw new ApiError(`HTTP ${response.status}`, response.status, 'OpenWeather');
        }
        
        return await response.json();
      } catch (error) {
        if (i === retries - 1) throw error;
        await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
      }
    }
  }

  async getCurrentWeather(lat: number, lon: number): Promise<ApiResponse<WeatherData['current']>> {
    try {
      if (!this.apiKey) {
        return {
          success: false,
          error: 'OpenWeather API key not configured'
        };
      }

      const url = `${this.baseUrl}/weather?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric&lang=tr`;
      const data = await this.fetchWithRetry(url);

      return {
        success: true,
        data: {
          temperature: data.main.temp,
          humidity: data.main.humidity,
          pressure: data.main.pressure,
          windSpeed: data.wind?.speed || 0,
          windDirection: data.wind?.deg || 0,
          cloudCover: data.clouds.all,
          uvIndex: 0, // Requires separate API call
          visibility: data.visibility / 1000, // Convert to km
          description: data.weather[0].description,
          icon: data.weather[0].icon,
        }
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch weather data'
      };
    }
  }

  async getForecast(lat: number, lon: number, days = 7): Promise<ApiResponse<WeatherData['forecast']>> {
    try {
      if (!this.apiKey) {
        return {
          success: false,
          error: 'OpenWeather API key not configured'
        };
      }

      const url = `${this.baseUrl}/forecast?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric&lang=tr`;
      const data = await this.fetchWithRetry(url);

      const forecast = data.list.slice(0, days * 8).filter((_: any, index: number) => index % 8 === 0)
        .map((item: any) => ({
          date: new Date(item.dt * 1000).toISOString().split('T')[0],
          tempMin: item.main.temp_min,
          tempMax: item.main.temp_max,
          humidity: item.main.humidity,
          precipitation: item.rain?.['3h'] || item.snow?.['3h'] || 0,
          windSpeed: item.wind?.speed || 0,
          description: item.weather[0].description,
          icon: item.weather[0].icon,
        }));

      return {
        success: true,
        data: forecast
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch forecast data'
      };
    }
  }

  async getClimateAnalysis(lat: number, lon: number): Promise<ApiResponse<ClimateAnalysis>> {
    try {
      // For demo purposes, generate realistic climate analysis
      // In production, this would combine multiple APIs
      
      const mockAnalysis: ClimateAnalysis = {
        riskScore: Math.floor(Math.random() * 30) + 15, // 15-45 (generally low-medium risk)
        recommendations: [
          'Sera inşaatı için en uygun dönem Mart-Mayıs aylarıdır',
          'Yüksek nem nedeniyle iyi havalandırma sistemi önerilir',
          'Güneş paneli kurulumu için yeterli güneş ışığı mevcuttur',
          'Kış aylarında ek ısıtma sistemi gerekebilir'
        ],
        seasons: [
          {
            season: 'spring',
            suitability: 85,
            challenges: ['Ani sıcaklık değişimleri', 'Yağışlı dönemler'],
            opportunities: ['Optimal ekim zamanı', 'Doğal ısıtma']
          },
          {
            season: 'summer',
            suitability: 75,
            challenges: ['Yüksek sıcaklık', 'Su ihtiyacı'],
            opportunities: ['Maksimum güneş ışığı', 'Hızlı büyüme']
          },
          {
            season: 'autumn',
            suitability: 70,
            challenges: ['Azalan ışık', 'Nem artışı'],
            opportunities: ['Hasat zamanı', 'Sıcaklık dengeleme']
          },
          {
            season: 'winter',
            suitability: 60,
            challenges: ['Düşük sıcaklık', 'Sınırlı ışık'],
            opportunities: ['Enerji tasarrufu', 'Sera ömrü uzatma']
          }
        ],
        monthlyData: Array.from({ length: 12 }, (_, i) => ({
          month: i + 1,
          avgTemp: 15 + Math.sin((i - 2) * Math.PI / 6) * 10,
          minTemp: 10 + Math.sin((i - 2) * Math.PI / 6) * 10,
          maxTemp: 20 + Math.sin((i - 2) * Math.PI / 6) * 10,
          precipitation: 50 + Math.random() * 50,
          humidity: 60 + Math.random() * 20,
          solarRadiation: 150 + Math.sin((i - 5) * Math.PI / 6) * 100,
          growingDegreeDay: Math.max(0, (15 + Math.sin((i - 2) * Math.PI / 6) * 10) - 10) * 30
        }))
      };

      return {
        success: true,
        data: mockAnalysis
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to generate climate analysis'
      };
    }
  }

  async getLocationFromCoords(lat: number, lon: number): Promise<ApiResponse<{ name: string; country: string }>> {
    try {
      if (!this.apiKey) {
        return {
          success: false,
          error: 'OpenWeather API key not configured'
        };
      }

      const url = `${this.baseUrl}/weather?lat=${lat}&lon=${lon}&appid=${this.apiKey}`;
      const data = await this.fetchWithRetry(url);

      return {
        success: true,
        data: {
          name: data.name,
          country: data.sys.country
        }
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to get location data'
      };
    }
  }
}

export const weatherService = new WeatherService();
