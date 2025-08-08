/**
 * Cached API Service for SeraGPT
 * Wraps all API calls with intelligent caching strategies
 */

import { cacheService, CacheKeys, CacheTags } from './cache-service';

export interface APIResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  cached?: boolean;
  cacheAge?: number;
}

export interface CachedAPIOptions {
  skipCache?: boolean;
  forceRefresh?: boolean;
  ttl?: number;
  tags?: string[];
  staleWhileRevalidate?: boolean;
}

class CachedAPIService {
  
  /**
   * Generic cached API call
   */
  async call<T>(
    endpoint: string,
    options: RequestInit = {},
    cacheOptions: CachedAPIOptions = {}
  ): Promise<APIResponse<T>> {
    const cacheKey = CacheKeys.roiAnalysis({ endpoint, ...options });
    
    // Skip cache if requested
    if (cacheOptions.skipCache || cacheOptions.forceRefresh) {
      return this.fetchFresh<T>(endpoint, options, cacheKey, cacheOptions);
    }

    try {
      // Try cache first
      const cachedResult = await this.getCachedResult<T>(cacheKey);
      if (cachedResult) {
        return cachedResult;
      }

      // Fetch fresh data
      return this.fetchFresh<T>(endpoint, options, cacheKey, cacheOptions);
    } catch (error) {
      console.error('Cached API call failed:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'API call failed'
      };
    }
  }

  /**
   * ROI Analysis with caching
   */
  async calculateROI(params: any, options: CachedAPIOptions = {}): Promise<APIResponse> {
    const cacheKey = CacheKeys.roiAnalysis(params);
    
    return cacheService.cachedFetch(
      cacheKey,
      async () => {
        const response = await fetch('/api/analysis/roi', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': await this.getAuthHeader()
          },
          body: JSON.stringify(params)
        });

        if (!response.ok) {
          throw new Error(`ROI API failed: ${response.status}`);
        }

        const data = await response.json();
        return { success: true, data, cached: false };
      },
      {
        ttl: options.ttl || 2 * 60 * 60 * 1000, // 2 hours
        tags: [CacheTags.ANALYSIS, CacheTags.USER_DATA],
        staleWhileRevalidate: true,
        maxAge: CacheService.TTL_PRESETS.ANALYSIS, // Serve stale after 1 hour
        ...options
      }
    );
  }

  /**
   * Climate Analysis with caching
   */
  async analyzeClimate(params: any, options: CachedAPIOptions = {}): Promise<APIResponse> {
    const cacheKey = CacheKeys.climateAnalysis(params);
    
    return cacheService.cachedFetch(
      cacheKey,
      async () => {
        const response = await fetch('/api/analysis/climate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': await this.getAuthHeader()
          },
          body: JSON.stringify(params)
        });

        if (!response.ok) {
          throw new Error(`Climate API failed: ${response.status}`);
        }

        const data = await response.json();
        return { success: true, data, cached: false };
      },
      {
        ttl: options.ttl || CacheService.TTL_PRESETS.CLIMATE_ANALYSIS,
        tags: [CacheTags.ANALYSIS, CacheTags.WEATHER],
        staleWhileRevalidate: true,
        ...options
      }
    );
  }

  /**
   * Equipment Analysis with caching
   */
  async analyzeEquipment(params: any, options: CachedAPIOptions = {}): Promise<APIResponse> {
    const cacheKey = CacheKeys.equipmentAnalysis(params);
    
    return cacheService.cachedFetch(
      cacheKey,
      async () => {
        const response = await fetch('/api/analysis/equipment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': await this.getAuthHeader()
          },
          body: JSON.stringify(params)
        });

        if (!response.ok) {
          throw new Error(`Equipment API failed: ${response.status}`);
        }

        const data = await response.json();
        return { success: true, data, cached: false };
      },
      {
        ttl: options.ttl || CacheService.TTL_PRESETS.EQUIPMENT_ANALYSIS,
        tags: [CacheTags.ANALYSIS],
        staleWhileRevalidate: true,
        ...options
      }
    );
  }

  /**
   * Market Analysis with caching
   */
  async analyzeMarket(params: any, options: CachedAPIOptions = {}): Promise<APIResponse> {
    const cacheKey = CacheKeys.marketAnalysis(params);
    
    return cacheService.cachedFetch(
      cacheKey,
      async () => {
        const response = await fetch('/api/analysis/market', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': await this.getAuthHeader()
          },
          body: JSON.stringify(params)
        });

        if (!response.ok) {
          throw new Error(`Market API failed: ${response.status}`);
        }

        const data = await response.json();
        return { success: true, data, cached: false };
      },
      {
        ttl: options.ttl || CacheService.TTL_PRESETS.MARKET_ANALYSIS,
        tags: [CacheTags.ANALYSIS, CacheTags.MARKET],
        staleWhileRevalidate: true,
        ...options
      }
    );
  }

  /**
   * Layout Analysis with caching
   */
  async analyzeLayout(params: any, options: CachedAPIOptions = {}): Promise<APIResponse> {
    const cacheKey = CacheKeys.layoutAnalysis(params);
    
    return cacheService.cachedFetch(
      cacheKey,
      async () => {
        const response = await fetch('/api/analysis/layout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': await this.getAuthHeader()
          },
          body: JSON.stringify(params)
        });

        if (!response.ok) {
          throw new Error(`Layout API failed: ${response.status}`);
        }

        const data = await response.json();
        return { success: true, data, cached: false };
      },
      {
        ttl: options.ttl || CacheService.TTL_PRESETS.ANALYSIS,
        tags: [CacheTags.ANALYSIS],
        staleWhileRevalidate: true,
        ...options
      }
    );
  }

  /**
   * User Profile with caching
   */
  async getUserProfile(userId: string, options: CachedAPIOptions = {}): Promise<APIResponse> {
    const cacheKey = CacheKeys.userProfile(userId);
    
    return cacheService.cachedFetch(
      cacheKey,
      async () => {
        const response = await fetch('/api/auth/profile', {
          headers: {
            'Authorization': await this.getAuthHeader()
          }
        });

        if (!response.ok) {
          throw new Error(`Profile API failed: ${response.status}`);
        }

        const data = await response.json();
        return { success: true, data, cached: false };
      },
      {
        ttl: options.ttl || CacheService.TTL_PRESETS.USER_PROFILE,
        tags: [CacheTags.USER_DATA],
        ...options
      }
    );
  }

  /**
   * User Tokens with short caching
   */
  async getUserTokens(userId: string, options: CachedAPIOptions = {}): Promise<APIResponse> {
    const cacheKey = CacheKeys.userTokens(userId);
    
    return cacheService.cachedFetch(
      cacheKey,
      async () => {
        const response = await fetch('/api/auth/tokens', {
          headers: {
            'Authorization': await this.getAuthHeader()
          }
        });

        if (!response.ok) {
          throw new Error(`Tokens API failed: ${response.status}`);
        }

        const data = await response.json();
        return { success: true, data, cached: false };
      },
      {
        ttl: options.ttl || CacheService.TTL_PRESETS.USER_TOKENS,
        tags: [CacheTags.USER_DATA],
        ...options
      }
    );
  }

  /**
   * Batch invalidation methods
   */
  invalidateUserCache(userId: string): void {
    cacheService.invalidate(CacheKeys.userProfile(userId));
    cacheService.invalidate(CacheKeys.userTokens(userId));
    cacheService.invalidate(CacheKeys.userPreferences(userId));
  }

  invalidateAnalysisCache(): void {
    cacheService.invalidate(CacheTags.ANALYSIS);
  }

  invalidateMarketCache(): void {
    cacheService.invalidate(CacheTags.MARKET);
  }

  /**
   * Preload critical data
   */
  async preloadUserData(userId: string): Promise<void> {
    // Load user data in background
    try {
      await Promise.all([
        this.getUserProfile(userId, { skipCache: false }),
        this.getUserTokens(userId, { skipCache: false })
      ]);
    } catch (error) {
      console.warn('Failed to preload user data:', error);
    }
  }

  /**
   * Get cache statistics for monitoring
   */
  getCacheStats() {
    return cacheService.getStats();
  }

  /**
   * Helper methods
   */
  private async getCachedResult<T>(cacheKey: string): Promise<APIResponse<T> | null> {
    const cached = cacheService.get<APIResponse<T>>(cacheKey);
    if (cached) {
      return {
        ...cached,
        cached: true,
        cacheAge: Date.now() - (cached as any).timestamp
      };
    }
    return null;
  }

  private async fetchFresh<T>(
    endpoint: string,
    options: RequestInit,
    cacheKey: string,
    cacheOptions: CachedAPIOptions
  ): Promise<APIResponse<T>> {
    const response = await fetch(endpoint, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': await this.getAuthHeader(),
        ...options.headers
      }
    });

    if (!response.ok) {
      throw new Error(`API call failed: ${response.status}`);
    }

    const data = await response.json();
    const result: APIResponse<T> = { 
      success: true, 
      data, 
      cached: false 
    };

    // Cache the result
    if (!cacheOptions.skipCache) {
      cacheService.set(cacheKey, result, {
        ttl: cacheOptions.ttl,
        tags: cacheOptions.tags
      });
    }

    return result;
  }

  private async getAuthHeader(): Promise<string> {
    // This would typically get the auth token from your auth service
    // For now, return empty string or implement based on your auth system
    try {
      const token = localStorage.getItem('seragpt_token');
      return token ? `Bearer ${token}` : '';
    } catch {
      return '';
    }
  }
}

// Global cached API service instance
export const cachedApiService = new CachedAPIService();

// Export specific API functions for easier use
export const {
  calculateROI,
  analyzeClimate,
  analyzeEquipment,
  analyzeMarket,
  analyzeLayout,
  getUserProfile,
  getUserTokens,
  invalidateUserCache,
  invalidateAnalysisCache,
  preloadUserData,
  getCacheStats
} = cachedApiService;
