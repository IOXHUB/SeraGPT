/**
 * Comprehensive API Caching Service for SeraGPT
 * Provides intelligent caching for API responses, user data, and external service calls
 */

export interface CacheEntry<T = any> {
  data: T;
  timestamp: number;
  ttl: number; // Time to live in milliseconds
  key: string;
  hits: number;
  tags?: string[];
}

export interface CacheOptions {
  ttl?: number; // Time to live in milliseconds
  tags?: string[]; // For cache invalidation
  staleWhileRevalidate?: boolean; // Return stale data while fetching fresh
  maxAge?: number; // Maximum age before revalidation
  compress?: boolean; // Compress large responses
}

export interface CacheStats {
  totalEntries: number;
  totalHits: number;
  totalMisses: number;
  hitRate: number;
  memoryUsage: number;
  oldestEntry: number;
  newestEntry: number;
}

class CacheService {
  private cache = new Map<string, CacheEntry>();
  private stats = {
    hits: 0,
    misses: 0,
  };
  
  // Cache TTL presets (in milliseconds)
  static readonly TTL_PRESETS = {
    // Analysis APIs - Heavy computation
    ANALYSIS: 60 * 60 * 1000, // 1 hour
    ROI_ANALYSIS: 2 * 60 * 60 * 1000, // 2 hours (complex calculations)
    CLIMATE_ANALYSIS: 6 * 60 * 60 * 1000, // 6 hours (weather data changes slowly)
    EQUIPMENT_ANALYSIS: 24 * 60 * 60 * 1000, // 24 hours (equipment data stable)
    MARKET_ANALYSIS: 30 * 60 * 1000, // 30 minutes (market prices change)
    
    // User data
    USER_PROFILE: 30 * 60 * 1000, // 30 minutes
    USER_TOKENS: 10 * 60 * 1000, // 10 minutes
    USER_PREFERENCES: 60 * 60 * 1000, // 1 hour
    
    // External data
    WEATHER_DATA: 60 * 60 * 1000, // 1 hour
    MARKET_PRICES: 15 * 60 * 1000, // 15 minutes
    EXCHANGE_RATES: 60 * 60 * 1000, // 1 hour
    
    // Static data
    BLOG_POSTS: 12 * 60 * 60 * 1000, // 12 hours
    STATIC_CONFIG: 24 * 60 * 60 * 1000, // 24 hours
    
    // Short-lived
    AUTH_STATUS: 5 * 60 * 1000, // 5 minutes
    RATE_LIMIT: 1 * 60 * 1000, // 1 minute
  } as const;

  constructor() {
    // Cleanup expired entries every 5 minutes
    setInterval(() => this.cleanup(), 5 * 60 * 1000);
  }

  /**
   * Generate cache key from request data
   */
  generateKey(prefix: string, data: any): string {
    const dataString = typeof data === 'string' ? data : JSON.stringify(data);
    const hash = this.simpleHash(dataString);
    return `${prefix}:${hash}`;
  }

  /**
   * Set cache entry
   */
  set<T>(key: string, data: T, options: CacheOptions = {}): void {
    const ttl = options.ttl || CacheService.TTL_PRESETS.ANALYSIS;
    const entry: CacheEntry<T> = {
      data: options.compress ? this.compress(data) : data,
      timestamp: Date.now(),
      ttl,
      key,
      hits: 0,
      tags: options.tags
    };

    this.cache.set(key, entry);
    
    // Log cache set in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`🗄️ Cache SET: ${key} (TTL: ${ttl}ms)`);
    }
  }

  /**
   * Get cache entry
   */
  get<T>(key: string, options: CacheOptions = {}): T | null {
    const entry = this.cache.get(key) as CacheEntry<T> | undefined;
    
    if (!entry) {
      this.stats.misses++;
      if (process.env.NODE_ENV === 'development') {
        console.log(`🗄️ Cache MISS: ${key}`);
      }
      return null;
    }

    const now = Date.now();
    const age = now - entry.timestamp;
    
    // Check if expired
    if (age > entry.ttl) {
      this.cache.delete(key);
      this.stats.misses++;
      if (process.env.NODE_ENV === 'development') {
        console.log(`🗄️ Cache EXPIRED: ${key} (age: ${age}ms)`);
      }
      return null;
    }

    // Stale while revalidate logic
    if (options.staleWhileRevalidate && options.maxAge && age > options.maxAge) {
      // Return stale data but mark for background refresh
      this.markForRevalidation(key);
    }

    entry.hits++;
    this.stats.hits++;
    
    if (process.env.NODE_ENV === 'development') {
      console.log(`🗄️ Cache HIT: ${key} (age: ${age}ms, hits: ${entry.hits})`);
    }

    return entry.data;
  }

  /**
   * Cached API call wrapper with performance monitoring
   */
  async cachedFetch<T>(
    cacheKey: string,
    fetchFn: () => Promise<T>,
    options: CacheOptions = {}
  ): Promise<T> {
    const startTime = performance.now();
    let cached = false;
    let success = true;
    let statusCode = 200;

    try {
      // Try cache first
      const cachedData = this.get<T>(cacheKey, options);
      if (cachedData !== null) {
        cached = true;
        const responseTime = performance.now() - startTime;

        // Track cached API call performance
        if (typeof window !== 'undefined') {
          try {
            const { performanceMonitor } = await import('./performance-monitor');
            performanceMonitor.trackAPICall(
              cacheKey,
              'GET',
              responseTime,
              200,
              true
            );
          } catch (error) {
            // Silent fail if performance monitor is not available
          }
        }

        return cachedData;
      }

      // Fetch fresh data
      const data = await fetchFn();
      this.set(cacheKey, data, options);

      const responseTime = performance.now() - startTime;

      // Track fresh API call performance
      if (typeof window !== 'undefined') {
        try {
          const { performanceMonitor } = await import('./performance-monitor');
          performanceMonitor.trackAPICall(
            cacheKey,
            'POST',
            responseTime,
            200,
            false
          );
        } catch (error) {
          // Silent fail if performance monitor is not available
        }
      }

      return data;

    } catch (error) {
      success = false;
      statusCode = 500;

      // Return stale data if available on error
      const staleEntry = this.getStale<T>(cacheKey);
      if (staleEntry) {
        console.warn(`Using stale cache data for ${cacheKey} due to fetch error:`, error);
        cached = true;
        statusCode = 200;
        success = true;

        const responseTime = performance.now() - startTime;

        // Track stale data usage
        if (typeof window !== 'undefined') {
          try {
            const { performanceMonitor } = await import('./performance-monitor');
            performanceMonitor.trackAPICall(
              cacheKey + '_stale',
              'GET',
              responseTime,
              200,
              true
            );
          } catch (error) {
            // Silent fail
          }
        }

        return staleEntry;
      }

      // Track error
      const responseTime = performance.now() - startTime;
      if (typeof window !== 'undefined') {
        try {
          const { performanceMonitor } = await import('./performance-monitor');
          performanceMonitor.trackAPICall(
            cacheKey,
            'POST',
            responseTime,
            statusCode,
            false
          );
        } catch (error) {
          // Silent fail
        }
      }

      throw error;
    }
  }

  /**
   * Get stale data (even if expired)
   */
  private getStale<T>(key: string): T | null {
    const entry = this.cache.get(key) as CacheEntry<T> | undefined;
    return entry ? entry.data : null;
  }

  /**
   * Invalidate cache by key or tags
   */
  invalidate(keyOrTag: string): number {
    let deletedCount = 0;

    if (this.cache.has(keyOrTag)) {
      // Direct key deletion
      this.cache.delete(keyOrTag);
      deletedCount = 1;
    } else {
      // Tag-based deletion
      for (const [key, entry] of Array.from(this.cache.entries())) {
        if (entry.tags?.includes(keyOrTag)) {
          this.cache.delete(key);
          deletedCount++;
        }
      }
    }

    if (process.env.NODE_ENV === 'development') {
      console.log(`🗄️ Cache INVALIDATED: ${keyOrTag} (${deletedCount} entries)`);
    }

    return deletedCount;
  }

  /**
   * Clear all cache
   */
  clear(): void {
    const size = this.cache.size;
    this.cache.clear();
    this.stats.hits = 0;
    this.stats.misses = 0;
    
    if (process.env.NODE_ENV === 'development') {
      console.log(`🗄️ Cache CLEARED: ${size} entries`);
    }
  }

  /**
   * Get cache statistics
   */
  getStats(): CacheStats {
    const entries = Array.from(this.cache.values());
    const totalRequests = this.stats.hits + this.stats.misses;
    
    return {
      totalEntries: this.cache.size,
      totalHits: this.stats.hits,
      totalMisses: this.stats.misses,
      hitRate: totalRequests > 0 ? (this.stats.hits / totalRequests) * 100 : 0,
      memoryUsage: this.estimateMemoryUsage(),
      oldestEntry: entries.length > 0 ? Math.min(...entries.map(e => e.timestamp)) : 0,
      newestEntry: entries.length > 0 ? Math.max(...entries.map(e => e.timestamp)) : 0,
    };
  }

  /**
   * Cleanup expired entries
   */
  private cleanup(): void {
    const now = Date.now();
    let cleanedCount = 0;

    for (const [key, entry] of Array.from(this.cache.entries())) {
      if (now - entry.timestamp > entry.ttl) {
        this.cache.delete(key);
        cleanedCount++;
      }
    }

    if (cleanedCount > 0 && process.env.NODE_ENV === 'development') {
      console.log(`🗄️ Cache CLEANUP: ${cleanedCount} expired entries removed`);
    }
  }

  /**
   * Mark entry for background revalidation
   */
  private markForRevalidation(key: string): void {
    // In a full implementation, this would trigger a background job
    // For now, just log it
    if (process.env.NODE_ENV === 'development') {
      console.log(`🗄️ Cache REVALIDATE: ${key} marked for background refresh`);
    }
  }

  /**
   * Simple hash function for cache keys
   */
  private simpleHash(str: string): string {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash).toString(36);
  }

  /**
   * Compress data for storage (simplified implementation)
   */
  private compress<T>(data: T): T {
    // In a real implementation, you might use compression libraries
    // For now, just return as-is
    return data;
  }

  /**
   * Estimate memory usage
   */
  private estimateMemoryUsage(): number {
    let totalSize = 0;
    for (const [key, entry] of Array.from(this.cache.entries())) {
      totalSize += key.length * 2; // Approximate string size
      totalSize += JSON.stringify(entry.data).length * 2;
      totalSize += 100; // Overhead for entry metadata
    }
    return totalSize;
  }
}

// Global cache instance
export const cacheService = new CacheService();

// Cache key generators for different API types
export const CacheKeys = {
  // Analysis APIs
  roiAnalysis: (params: any) => cacheService.generateKey('roi', params),
  climateAnalysis: (params: any) => cacheService.generateKey('climate', params),
  equipmentAnalysis: (params: any) => cacheService.generateKey('equipment', params),
  marketAnalysis: (params: any) => cacheService.generateKey('market', params),
  layoutAnalysis: (params: any) => cacheService.generateKey('layout', params),
  
  // User data
  userProfile: (userId: string) => `user:profile:${userId}`,
  userTokens: (userId: string) => `user:tokens:${userId}`,
  userPreferences: (userId: string) => `user:prefs:${userId}`,
  
  // External data
  weatherData: (location: string) => `weather:${location}`,
  marketPrices: (region: string, crop: string) => `market:${region}:${crop}`,
  
  // Static data
  blogPosts: () => 'blog:posts',
  staticConfig: () => 'config:static'
} as const;

// Cache invalidation tags
export const CacheTags = {
  USER_DATA: 'user_data',
  ANALYSIS: 'analysis',
  MARKET: 'market',
  WEATHER: 'weather',
  BLOG: 'blog',
  CONFIG: 'config'
} as const;
