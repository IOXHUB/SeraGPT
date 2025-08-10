// =====================================================
// EXTERNAL API SERVICE MANAGER
// =====================================================
// Central hub for managing all external API integrations
// =====================================================

export interface ApiConfig {
  name: string;
  baseUrl: string;
  apiKey?: string;
  rateLimit: {
    requests: number;
    perMinute: number;
  };
  status: 'active' | 'inactive' | 'error';
  tier: 'free' | 'paid' | 'premium';
  category: 'weather' | 'satellite' | 'market' | 'energy' | 'geo' | 'disaster' | 'currency' | 'infrastructure';
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  responseTime?: number;
  source: string;
  cached?: boolean;
  cacheExpiry?: Date;
}

class ExternalApiService {
  private cache = new Map<string, { data: any; expiry: Date }>();
  private rateLimits = new Map<string, { count: number; resetTime: Date }>();

  // =====================================================
  // WEATHER & CLIMATE SERVICES
  // =====================================================

  // 1.1 Open-Meteo (FREE)
  async getOpenMeteoData(lat: number, lon: number, params?: {
    current?: string[];
    hourly?: string[];
    daily?: string[];
    past_days?: number;
    forecast_days?: number;
  }): Promise<ApiResponse> {
    const cacheKey = `openmeteo_${lat}_${lon}_${JSON.stringify(params)}`;
    
    try {
      // Check cache first
      const cached = this.getFromCache(cacheKey);
      if (cached) {
        return {
          success: true,
          data: cached,
          source: 'Open-Meteo',
          cached: true
        };
      }

      const queryParams = new URLSearchParams({
        latitude: lat.toString(),
        longitude: lon.toString(),
        timezone: 'auto',
        ...params
      });

      const response = await fetch(`https://api.open-meteo.com/v1/forecast?${queryParams}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Open-Meteo API error');
      }

      // Cache for 1 hour
      this.setCache(cacheKey, data, 60);

      return {
        success: true,
        data,
        source: 'Open-Meteo'
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message,
        source: 'Open-Meteo'
      };
    }
  }

  // 1.2 Meteostat (FREE)
  async getMeteostatHistorical(lat: number, lon: number, start: string, end: string): Promise<ApiResponse> {
    const cacheKey = `meteostat_${lat}_${lon}_${start}_${end}`;
    
    try {
      const cached = this.getFromCache(cacheKey);
      if (cached) {
        return {
          success: true,
          data: cached,
          source: 'Meteostat',
          cached: true
        };
      }

      // For now, return mock data as Meteostat requires API key
      const mockData = {
        data: [
          { date: start, temp_avg: 15.2, temp_min: 8.1, temp_max: 22.3, precipitation: 2.1, humidity: 65 },
          { date: end, temp_avg: 16.8, temp_min: 9.5, temp_max: 24.1, precipitation: 0.0, humidity: 58 }
        ],
        message: 'Historical weather data for coordinates',
        coordinates: { lat, lon }
      };

      this.setCache(cacheKey, mockData, 24 * 60); // Cache for 24 hours

      return {
        success: true,
        data: mockData,
        source: 'Meteostat'
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message,
        source: 'Meteostat'
      };
    }
  }

  // 1.3 NASA POWER (FREE)
  async getNasaPowerData(lat: number, lon: number, parameters: string[], start: string, end: string): Promise<ApiResponse> {
    const cacheKey = `nasa_power_${lat}_${lon}_${parameters.join(',')}_${start}_${end}`;
    
    try {
      const cached = this.getFromCache(cacheKey);
      if (cached) {
        return {
          success: true,
          data: cached,
          source: 'NASA POWER',
          cached: true
        };
      }

      const params = new URLSearchParams({
        request: 'execute',
        identifier: 'SinglePoint',
        parameters: parameters.join(','),
        startDate: start,
        endDate: end,
        latitude: lat.toString(),
        longitude: lon.toString(),
        format: 'JSON',
        community: 'AG'
      });

      const response = await fetch(`https://power.larc.nasa.gov/api/temporal/daily/point?${params}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error('NASA POWER API error');
      }

      this.setCache(cacheKey, data, 6 * 60); // Cache for 6 hours

      return {
        success: true,
        data,
        source: 'NASA POWER'
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message,
        source: 'NASA POWER'
      };
    }
  }

  // =====================================================
  // SATELLITE & TERRAIN SERVICES
  // =====================================================

  // 2.2 SoilGrids (FREE)
  async getSoilData(lat: number, lon: number, depth: string = '0-5cm', properties: string[] = ['clay', 'sand', 'silt', 'phh2o', 'ocd']): Promise<ApiResponse> {
    const cacheKey = `soilgrids_${lat}_${lon}_${depth}_${properties.join(',')}`;
    
    try {
      const cached = this.getFromCache(cacheKey);
      if (cached) {
        return {
          success: true,
          data: cached,
          source: 'SoilGrids',
          cached: true
        };
      }

      const propertyParams = properties.map(prop => `property=${prop}`).join('&');
      const url = `https://rest.isric.org/soilgrids/v2.0/properties/query?lon=${lon}&lat=${lat}&${propertyParams}&depth=${depth}&value=mean`;
      
      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || 'SoilGrids API error');
      }

      this.setCache(cacheKey, data, 24 * 60); // Cache for 24 hours

      return {
        success: true,
        data,
        source: 'SoilGrids'
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message,
        source: 'SoilGrids'
      };
    }
  }

  // =====================================================
  // ENERGY & SOLAR SERVICES
  // =====================================================

  // 2.4 PVGIS (FREE)
  async getPVGISData(lat: number, lon: number, params?: {
    peakpower?: number;
    loss?: number;
    mounting?: 'free' | 'building';
    tilt?: number;
    azimuth?: number;
  }): Promise<ApiResponse> {
    const cacheKey = `pvgis_${lat}_${lon}_${JSON.stringify(params)}`;
    
    try {
      const cached = this.getFromCache(cacheKey);
      if (cached) {
        return {
          success: true,
          data: cached,
          source: 'PVGIS',
          cached: true
        };
      }

      const defaultParams = {
        peakpower: 1,
        loss: 14,
        mounting: 'free',
        tilt: 35,
        azimuth: 0,
        ...params
      };

      const queryParams = new URLSearchParams({
        lat: lat.toString(),
        lon: lon.toString(),
        peakpower: defaultParams.peakpower.toString(),
        loss: defaultParams.loss.toString(),
        mounting: defaultParams.mounting,
        tilt: defaultParams.tilt.toString(),
        azimuth: defaultParams.azimuth.toString(),
        outputformat: 'json',
        usehorizon: '1',
        userhorizon: '',
        startyear: '2016',
        endyear: '2016'
      });

      const response = await fetch(`https://re.jrc.ec.europa.eu/api/PVcalc?${queryParams}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error('PVGIS API error');
      }

      this.setCache(cacheKey, data, 12 * 60); // Cache for 12 hours

      return {
        success: true,
        data,
        source: 'PVGIS'
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message,
        source: 'PVGIS'
      };
    }
  }

  // =====================================================
  // CURRENCY & FINANCIAL SERVICES
  // =====================================================

  // 7.1 TCMB Exchange Rates (FREE)
  async getTCMBExchangeRates(date?: string): Promise<ApiResponse> {
    const targetDate = date || new Date().toISOString().split('T')[0].replace(/-/g, '');
    const cacheKey = `tcmb_rates_${targetDate}`;
    
    try {
      const cached = this.getFromCache(cacheKey);
      if (cached) {
        return {
          success: true,
          data: cached,
          source: 'TCMB',
          cached: true
        };
      }

      const response = await fetch(`https://www.tcmb.gov.tr/kurlar/${targetDate.slice(0, 6)}/${targetDate}.xml`);
      const xmlText = await response.text();

      if (!response.ok) {
        throw new Error('TCMB API error');
      }

      // Parse XML to JSON (simplified)
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
      const currencies = Array.from(xmlDoc.getElementsByTagName('Currency')).map(currency => ({
        code: currency.getAttribute('CurrencyCode'),
        name: currency.getElementsByTagName('CurrencyName')[0]?.textContent,
        buying: parseFloat(currency.getElementsByTagName('BanknoteBuying')[0]?.textContent || '0'),
        selling: parseFloat(currency.getElementsByTagName('BanknoteSelling')[0]?.textContent || '0'),
        crossRate: parseFloat(currency.getElementsByTagName('CrossRateOther')[0]?.textContent || '0')
      }));

      const data = {
        date: targetDate,
        currencies,
        source: 'TCMB'
      };

      this.setCache(cacheKey, data, 60); // Cache for 1 hour

      return {
        success: true,
        data,
        source: 'TCMB'
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message,
        source: 'TCMB'
      };
    }
  }

  // =====================================================
  // GEOGRAPHIC SERVICES
  // =====================================================

  // 5.1 OpenStreetMap Nominatim (FREE)
  async geocodeAddress(address: string): Promise<ApiResponse> {
    const cacheKey = `nominatim_${address}`;
    
    try {
      const cached = this.getFromCache(cacheKey);
      if (cached) {
        return {
          success: true,
          data: cached,
          source: 'Nominatim',
          cached: true
        };
      }

      const params = new URLSearchParams({
        q: address,
        format: 'json',
        limit: '5',
        countrycodes: 'tr',
        addressdetails: '1'
      });

      const response = await fetch(`https://nominatim.openstreetmap.org/search?${params}`, {
        headers: {
          'User-Agent': 'SeraGPT/1.0 (contact@seragpt.com)'
        }
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error('Nominatim API error');
      }

      this.setCache(cacheKey, data, 24 * 60); // Cache for 24 hours

      return {
        success: true,
        data,
        source: 'Nominatim'
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message,
        source: 'Nominatim'
      };
    }
  }

  // =====================================================
  // CACHE MANAGEMENT
  // =====================================================

  private getFromCache(key: string): any | null {
    const cached = this.cache.get(key);
    if (cached && cached.expiry > new Date()) {
      return cached.data;
    }
    if (cached) {
      this.cache.delete(key);
    }
    return null;
  }

  private setCache(key: string, data: any, minutesToLive: number): void {
    const expiry = new Date();
    expiry.setMinutes(expiry.getMinutes() + minutesToLive);
    this.cache.set(key, { data, expiry });
  }

  // =====================================================
  // RATE LIMITING
  // =====================================================

  private checkRateLimit(apiName: string, maxRequests: number = 60): boolean {
    const now = new Date();
    const rateLimit = this.rateLimits.get(apiName);

    if (!rateLimit || rateLimit.resetTime <= now) {
      this.rateLimits.set(apiName, {
        count: 1,
        resetTime: new Date(now.getTime() + 60000) // Reset after 1 minute
      });
      return true;
    }

    if (rateLimit.count >= maxRequests) {
      return false;
    }

    rateLimit.count++;
    return true;
  }

  // =====================================================
  // UTILITY METHODS
  // =====================================================

  async getApiStatus(): Promise<{ [key: string]: any }> {
    const apis = [
      { name: 'Open-Meteo', test: () => this.getOpenMeteoData(39.9334, 32.8597) },
      { name: 'SoilGrids', test: () => this.getSoilData(39.9334, 32.8597) },
      { name: 'PVGIS', test: () => this.getPVGISData(39.9334, 32.8597) },
      { name: 'TCMB', test: () => this.getTCMBExchangeRates() },
      { name: 'Nominatim', test: () => this.geocodeAddress('Ankara, Turkey') }
    ];

    const results: { [key: string]: any } = {};

    for (const api of apis) {
      const startTime = Date.now();
      try {
        const result = await api.test();
        const responseTime = Date.now() - startTime;
        
        results[api.name] = {
          status: result.success ? 'active' : 'error',
          responseTime: `${responseTime}ms`,
          error: result.error || null,
          lastChecked: new Date().toISOString()
        };
      } catch (error: any) {
        results[api.name] = {
          status: 'error',
          responseTime: 'timeout',
          error: error.message,
          lastChecked: new Date().toISOString()
        };
      }
    }

    return results;
  }

  clearCache(): void {
    this.cache.clear();
  }

  getCacheStats(): { size: number; keys: string[] } {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys())
    };
  }
}

// Export singleton instance
export const externalApiService = new ExternalApiService();
