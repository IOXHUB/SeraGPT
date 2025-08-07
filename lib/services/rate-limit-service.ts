// =====================================================
// RATE LIMITING SERVICE
// =====================================================
// Advanced rate limiting with multiple algorithms and storage options
// =====================================================

import { securityLogger } from '@/lib/utils/security';

// =====================================================
// RATE LIMIT ALGORITHMS
// =====================================================

export interface RateLimitConfig {
  windowMs: number;
  maxRequests: number;
  algorithm: 'fixed-window' | 'sliding-window' | 'token-bucket';
  keyGenerator?: (identifier: string, path: string) => string;
  skipSuccessfulRequests?: boolean;
  skipFailedRequests?: boolean;
  skipIf?: (req: any) => boolean;
  onLimitReached?: (identifier: string, path: string) => void;
}

export interface RateLimitResult {
  allowed: boolean;
  limit: number;
  remaining: number;
  resetTime: number;
  retryAfter?: number;
}

// =====================================================
// IN-MEMORY STORAGE (PRODUCTION: Use Redis)
// =====================================================

interface StorageRecord {
  count: number;
  resetTime: number;
  tokens?: number; // For token bucket
  lastRefill?: number; // For token bucket
}

class RateLimitStorage {
  private storage = new Map<string, StorageRecord>();
  private cleanupInterval: NodeJS.Timeout;

  constructor() {
    // Cleanup old records every 5 minutes
    this.cleanupInterval = setInterval(() => {
      this.cleanup();
    }, 5 * 60 * 1000);
  }

  get(key: string): StorageRecord | undefined {
    return this.storage.get(key);
  }

  set(key: string, record: StorageRecord): void {
    this.storage.set(key, record);
  }

  delete(key: string): void {
    this.storage.delete(key);
  }

  cleanup(): void {
    const now = Date.now();
    let cleaned = 0;
    
    for (const [key, record] of this.storage.entries()) {
      if (now > record.resetTime + 60000) { // Keep for extra minute
        this.storage.delete(key);
        cleaned++;
      }
    }

    if (cleaned > 0) {
      console.log(`[RateLimit] Cleaned up ${cleaned} expired records`);
    }
  }

  getStats(): {
    totalKeys: number;
    memoryUsage: number;
  } {
    return {
      totalKeys: this.storage.size,
      memoryUsage: JSON.stringify([...this.storage.entries()]).length
    };
  }

  destroy(): void {
    clearInterval(this.cleanupInterval);
    this.storage.clear();
  }
}

// =====================================================
// RATE LIMITER CLASS
// =====================================================

export class RateLimiter {
  private storage: RateLimitStorage;
  private config: RateLimitConfig;

  constructor(config: RateLimitConfig) {
    this.config = {
      keyGenerator: (identifier, path) => `${identifier}:${path}`,
      algorithm: 'fixed-window',
      ...config
    };
    this.storage = new RateLimitStorage();
  }

  async check(identifier: string, path: string = 'default'): Promise<RateLimitResult> {
    const key = this.config.keyGenerator!(identifier, path);
    const now = Date.now();

    try {
      let result: RateLimitResult;

      switch (this.config.algorithm) {
        case 'fixed-window':
          result = this.fixedWindowCheck(key, now);
          break;
        case 'sliding-window':
          result = this.slidingWindowCheck(key, now);
          break;
        case 'token-bucket':
          result = this.tokenBucketCheck(key, now);
          break;
        default:
          result = this.fixedWindowCheck(key, now);
      }

      // Log rate limit events
      if (!result.allowed) {
        securityLogger.log({
          type: 'access',
          severity: 'medium',
          ip: identifier,
          action: 'rate_limit_exceeded',
          details: {
            path,
            algorithm: this.config.algorithm,
            limit: this.config.maxRequests,
            windowMs: this.config.windowMs
          }
        });

        // Call custom handler if provided
        if (this.config.onLimitReached) {
          this.config.onLimitReached(identifier, path);
        }
      }

      return result;

    } catch (error) {
      console.error('Rate limiter error:', error);
      
      // Fail open - allow request if rate limiter fails
      return {
        allowed: true,
        limit: this.config.maxRequests,
        remaining: this.config.maxRequests,
        resetTime: now + this.config.windowMs
      };
    }
  }

  private fixedWindowCheck(key: string, now: number): RateLimitResult {
    const record = this.storage.get(key);
    const resetTime = Math.floor(now / this.config.windowMs) * this.config.windowMs + this.config.windowMs;

    if (!record || now >= record.resetTime) {
      // New window
      this.storage.set(key, {
        count: 1,
        resetTime
      });

      return {
        allowed: true,
        limit: this.config.maxRequests,
        remaining: this.config.maxRequests - 1,
        resetTime
      };
    }

    if (record.count >= this.config.maxRequests) {
      // Rate limit exceeded
      return {
        allowed: false,
        limit: this.config.maxRequests,
        remaining: 0,
        resetTime: record.resetTime,
        retryAfter: Math.ceil((record.resetTime - now) / 1000)
      };
    }

    // Increment counter
    record.count++;
    this.storage.set(key, record);

    return {
      allowed: true,
      limit: this.config.maxRequests,
      remaining: this.config.maxRequests - record.count,
      resetTime: record.resetTime
    };
  }

  private slidingWindowCheck(key: string, now: number): RateLimitResult {
    // Simplified sliding window - in production use more sophisticated implementation
    const windowStart = now - this.config.windowMs;
    const record = this.storage.get(key);

    if (!record || record.resetTime < windowStart) {
      // New window
      this.storage.set(key, {
        count: 1,
        resetTime: now + this.config.windowMs
      });

      return {
        allowed: true,
        limit: this.config.maxRequests,
        remaining: this.config.maxRequests - 1,
        resetTime: now + this.config.windowMs
      };
    }

    if (record.count >= this.config.maxRequests) {
      return {
        allowed: false,
        limit: this.config.maxRequests,
        remaining: 0,
        resetTime: record.resetTime,
        retryAfter: Math.ceil((record.resetTime - now) / 1000)
      };
    }

    record.count++;
    this.storage.set(key, record);

    return {
      allowed: true,
      limit: this.config.maxRequests,
      remaining: this.config.maxRequests - record.count,
      resetTime: record.resetTime
    };
  }

  private tokenBucketCheck(key: string, now: number): RateLimitResult {
    const record = this.storage.get(key);
    const refillRate = this.config.maxRequests / (this.config.windowMs / 1000); // tokens per second

    if (!record) {
      // New bucket
      this.storage.set(key, {
        count: 0, // Used for tracking requests
        resetTime: now + this.config.windowMs,
        tokens: this.config.maxRequests - 1, // Consume one token
        lastRefill: now
      });

      return {
        allowed: true,
        limit: this.config.maxRequests,
        remaining: this.config.maxRequests - 1,
        resetTime: now + this.config.windowMs
      };
    }

    // Refill tokens based on time passed
    const timePassed = (now - (record.lastRefill || now)) / 1000;
    const tokensToAdd = Math.floor(timePassed * refillRate);
    const currentTokens = Math.min(this.config.maxRequests, (record.tokens || 0) + tokensToAdd);

    if (currentTokens < 1) {
      // No tokens available
      return {
        allowed: false,
        limit: this.config.maxRequests,
        remaining: 0,
        resetTime: record.resetTime,
        retryAfter: Math.ceil(1 / refillRate)
      };
    }

    // Consume one token
    this.storage.set(key, {
      count: record.count + 1,
      resetTime: record.resetTime,
      tokens: currentTokens - 1,
      lastRefill: now
    });

    return {
      allowed: true,
      limit: this.config.maxRequests,
      remaining: currentTokens - 1,
      resetTime: record.resetTime
    };
  }

  getStats(): any {
    return {
      storage: this.storage.getStats(),
      config: {
        algorithm: this.config.algorithm,
        windowMs: this.config.windowMs,
        maxRequests: this.config.maxRequests
      }
    };
  }

  reset(identifier?: string, path?: string): void {
    if (identifier && path) {
      const key = this.config.keyGenerator!(identifier, path);
      this.storage.delete(key);
    } else {
      // Reset all (use with caution)
      this.storage = new RateLimitStorage();
    }
  }

  destroy(): void {
    this.storage.destroy();
  }
}

// =====================================================
// PREDEFINED RATE LIMITERS
// =====================================================

export const rateLimiters = {
  // General API endpoints
  api: new RateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    maxRequests: 100,
    algorithm: 'fixed-window'
  }),

  // Authentication endpoints
  auth: new RateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    maxRequests: 5,
    algorithm: 'sliding-window'
  }),

  // Chat/AI endpoints
  chat: new RateLimiter({
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 10,
    algorithm: 'token-bucket'
  }),

  // Email/SMS endpoints
  messaging: new RateLimiter({
    windowMs: 60 * 60 * 1000, // 1 hour
    maxRequests: 3,
    algorithm: 'fixed-window'
  }),

  // File upload endpoints
  upload: new RateLimiter({
    windowMs: 5 * 60 * 1000, // 5 minutes
    maxRequests: 10,
    algorithm: 'token-bucket'
  }),

  // Admin endpoints
  admin: new RateLimiter({
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 30,
    algorithm: 'fixed-window'
  })
};

// =====================================================
// RATE LIMIT MIDDLEWARE HELPER
// =====================================================

export function createRateLimitMiddleware(limiterName: keyof typeof rateLimiters) {
  return async (identifier: string, path: string): Promise<RateLimitResult> => {
    const limiter = rateLimiters[limiterName];
    return await limiter.check(identifier, path);
  };
}

// =====================================================
// RATE LIMIT RESPONSE HEADERS
// =====================================================

export function addRateLimitHeaders(
  response: Response, 
  result: RateLimitResult
): Response {
  const headers = new Headers(response.headers);
  
  headers.set('X-RateLimit-Limit', result.limit.toString());
  headers.set('X-RateLimit-Remaining', result.remaining.toString());
  headers.set('X-RateLimit-Reset', new Date(result.resetTime).toISOString());
  
  if (!result.allowed && result.retryAfter) {
    headers.set('Retry-After', result.retryAfter.toString());
  }

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers
  });
}

// =====================================================
// HEALTH CHECK
// =====================================================

export function getRateLimitHealth(): {
  status: 'healthy' | 'degraded' | 'unhealthy';
  limiters: Record<string, any>;
  totalMemoryUsage: number;
} {
  const limiterStats = Object.entries(rateLimiters).map(([name, limiter]) => [
    name,
    limiter.getStats()
  ]);

  const totalMemoryUsage = limiterStats.reduce(
    (total, [, stats]) => total + (stats as any).storage.memoryUsage,
    0
  );

  const totalKeys = limiterStats.reduce(
    (total, [, stats]) => total + (stats as any).storage.totalKeys,
    0
  );

  let status: 'healthy' | 'degraded' | 'unhealthy' = 'healthy';
  
  if (totalMemoryUsage > 10 * 1024 * 1024) { // 10MB
    status = 'degraded';
  }
  if (totalMemoryUsage > 50 * 1024 * 1024) { // 50MB
    status = 'unhealthy';
  }

  return {
    status,
    limiters: Object.fromEntries(limiterStats),
    totalMemoryUsage
  };
}

// =====================================================
// CLEANUP ON PROCESS EXIT
// =====================================================

if (typeof process !== 'undefined') {
  process.on('exit', () => {
    Object.values(rateLimiters).forEach(limiter => limiter.destroy());
  });

  process.on('SIGTERM', () => {
    Object.values(rateLimiters).forEach(limiter => limiter.destroy());
  });
}

// =====================================================
// EXPORT ALL
// =====================================================

export default {
  RateLimiter,
  rateLimiters,
  createRateLimitMiddleware,
  addRateLimitHeaders,
  getRateLimitHealth
};
