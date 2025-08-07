// =====================================================
// SECURITY UTILITIES
// =====================================================
// Comprehensive security utilities for input validation,
// sanitization, and protection against common attacks
// =====================================================

import crypto from 'crypto';

// =====================================================
// INPUT SANITIZATION
// =====================================================

export const sanitizeInput = {
  // HTML sanitization
  html: (input: string): string => {
    return input
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .replace(/\//g, '&#x2F;');
  },

  // SQL injection prevention
  sql: (input: string): string => {
    return input
      .replace(/'/g, "''")
      .replace(/;/g, '\\;')
      .replace(/--/g, '\\--')
      .replace(/\/\*/g, '\\/*')
      .replace(/\*\//g, '\\*/');
  },

  // XSS prevention
  xss: (input: string): string => {
    const patterns = [
      /<script[^>]*>.*?<\/script>/gi,
      /javascript:/gi,
      /on\w+\s*=/gi,
      /expression\s*\(/gi,
      /url\s*\(/gi,
      /vbscript:/gi,
      /data:/gi
    ];

    let sanitized = input;
    patterns.forEach(pattern => {
      sanitized = sanitized.replace(pattern, '');
    });

    return sanitized;
  },

  // Path traversal prevention
  path: (input: string): string => {
    return input
      .replace(/\.\./g, '')
      .replace(/[\/\\]/g, '')
      .replace(/\0/g, '');
  },

  // General purpose sanitization
  general: (input: string): string => {
    if (typeof input !== 'string') return '';
    
    return sanitizeInput.xss(
      sanitizeInput.html(input.trim())
    ).substring(0, 1000); // Limit length
  }
};

// =====================================================
// VALIDATION PATTERNS
// =====================================================

export const securityPatterns = {
  // Common injection patterns
  sqlInjection: [
    /union.*select/i,
    /insert.*into/i,
    /delete.*from/i,
    /update.*set/i,
    /drop.*table/i,
    /exec.*\(/i,
    /execute.*\(/i,
    /sp_/i,
    /xp_/i
  ],

  // XSS patterns
  xssPatterns: [
    /<script[^>]*>.*?<\/script>/gi,
    /javascript:/gi,
    /on\w+\s*=/gi,
    /expression\s*\(/gi,
    /vbscript:/gi,
    /-moz-binding/gi,
    /behavior:/gi
  ],

  // Path traversal patterns
  pathTraversal: [
    /\.\.\//g,
    /\.\.\\/g,
    /%2e%2e%2f/gi,
    /%2e%2e%5c/gi,
    /\.\.%2f/gi,
    /\.\.%5c/gi
  ],

  // Command injection patterns
  commandInjection: [
    /[;&|`$(){}[\]]/,
    /\b(cat|ls|pwd|whoami|id|ps|kill|rm|mv|cp|chmod|chown)\b/i,
    /\b(wget|curl|nc|telnet|ssh|ftp)\b/i
  ],

  // Suspicious user agents
  suspiciousUserAgents: [
    /sqlmap/i,
    /nikto/i,
    /nessus/i,
    /burp/i,
    /nmap/i,
    /masscan/i,
    /zap/i,
    /w3af/i
  ]
};

// =====================================================
// SECURITY VALIDATION
// =====================================================

export interface SecurityValidationResult {
  isValid: boolean;
  threats: string[];
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
}

export function validateInput(input: string): SecurityValidationResult {
  const threats: string[] = [];
  let riskLevel: 'low' | 'medium' | 'high' | 'critical' = 'low';

  // Check for SQL injection
  securityPatterns.sqlInjection.forEach(pattern => {
    if (pattern.test(input)) {
      threats.push('SQL Injection attempt detected');
      riskLevel = 'critical';
    }
  });

  // Check for XSS
  securityPatterns.xssPatterns.forEach(pattern => {
    if (pattern.test(input)) {
      threats.push('XSS attempt detected');
      if (riskLevel === 'low' || riskLevel === 'medium') riskLevel = 'high';
    }
  });

  // Check for path traversal
  securityPatterns.pathTraversal.forEach(pattern => {
    if (pattern.test(input)) {
      threats.push('Path traversal attempt detected');
      if (riskLevel === 'low') riskLevel = 'medium';
    }
  });

  // Check for command injection
  securityPatterns.commandInjection.forEach(pattern => {
    if (pattern.test(input)) {
      threats.push('Command injection attempt detected');
      riskLevel = 'critical';
    }
  });

  return {
    isValid: threats.length === 0,
    threats,
    riskLevel
  };
}

export function validateRequest(req: {
  url: string;
  userAgent?: string;
  body?: any;
  query?: any;
}): SecurityValidationResult {
  const threats: string[] = [];
  let riskLevel: 'low' | 'medium' | 'high' | 'critical' = 'low';

  // Validate URL
  const urlValidation = validateInput(req.url);
  threats.push(...urlValidation.threats);
  if (urlValidation.riskLevel === 'critical') riskLevel = 'critical';
  else if (urlValidation.riskLevel === 'high' && riskLevel !== 'critical') riskLevel = 'high';

  // Validate User Agent
  if (req.userAgent) {
    securityPatterns.suspiciousUserAgents.forEach(pattern => {
      if (pattern.test(req.userAgent!)) {
        threats.push('Suspicious user agent detected');
        if (riskLevel === 'low') riskLevel = 'medium';
      }
    });
  }

  // Validate body
  if (req.body) {
    const bodyStr = typeof req.body === 'string' ? req.body : JSON.stringify(req.body);
    const bodyValidation = validateInput(bodyStr);
    threats.push(...bodyValidation.threats);
    if (bodyValidation.riskLevel === 'critical') riskLevel = 'critical';
    else if (bodyValidation.riskLevel === 'high' && riskLevel !== 'critical') riskLevel = 'high';
  }

  // Validate query parameters
  if (req.query) {
    const queryStr = typeof req.query === 'string' ? req.query : JSON.stringify(req.query);
    const queryValidation = validateInput(queryStr);
    threats.push(...queryValidation.threats);
    if (queryValidation.riskLevel === 'critical') riskLevel = 'critical';
    else if (queryValidation.riskLevel === 'high' && riskLevel !== 'critical') riskLevel = 'high';
  }

  return {
    isValid: threats.length === 0,
    threats,
    riskLevel
  };
}

// =====================================================
// CSRF TOKEN MANAGEMENT
// =====================================================

export function generateCSRFToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

export function validateCSRFToken(token: string, sessionToken: string): boolean {
  if (!token || !sessionToken) return false;
  
  try {
    // Simple comparison for now - in production, use crypto.timingSafeEqual
    return token === sessionToken;
  } catch (error) {
    return false;
  }
}

// =====================================================
// API KEY & TOKEN UTILITIES
// =====================================================

export function generateSecureToken(length: number = 32): string {
  return crypto.randomBytes(length).toString('hex');
}

export function hashPassword(password: string, salt?: string): string {
  const actualSalt = salt || crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, actualSalt, 1000, 64, 'sha512');
  return `${actualSalt}:${hash.toString('hex')}`;
}

export function verifyPassword(password: string, hashedPassword: string): boolean {
  try {
    const [salt, hash] = hashedPassword.split(':');
    const verifyHash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512');
    return hash === verifyHash.toString('hex');
  } catch (error) {
    return false;
  }
}

// =====================================================
// RATE LIMITING UTILITIES
// =====================================================

export interface RateLimitConfig {
  windowMs: number;
  maxRequests: number;
  skipSuccessfulRequests?: boolean;
  skipFailedRequests?: boolean;
}

export class RateLimiter {
  private storage = new Map<string, { count: number; resetTime: number }>();
  private config: RateLimitConfig;

  constructor(config: RateLimitConfig) {
    this.config = config;
  }

  check(identifier: string): { allowed: boolean; resetTime: number; remaining: number } {
    const now = Date.now();
    const record = this.storage.get(identifier);

    // Clean up old records
    this.cleanup();

    if (!record || now > record.resetTime) {
      // First request or window expired
      const resetTime = now + this.config.windowMs;
      this.storage.set(identifier, { count: 1, resetTime });
      
      return {
        allowed: true,
        resetTime,
        remaining: this.config.maxRequests - 1
      };
    }

    if (record.count >= this.config.maxRequests) {
      // Rate limit exceeded
      return {
        allowed: false,
        resetTime: record.resetTime,
        remaining: 0
      };
    }

    // Increment counter
    record.count++;
    
    return {
      allowed: true,
      resetTime: record.resetTime,
      remaining: this.config.maxRequests - record.count
    };
  }

  private cleanup(): void {
    const now = Date.now();
    for (const [key, record] of this.storage.entries()) {
      if (now > record.resetTime) {
        this.storage.delete(key);
      }
    }
  }
}

// =====================================================
// IP FILTERING
// =====================================================

export function isValidIP(ip: string): boolean {
  const ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  const ipv6Regex = /^(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/;
  
  return ipv4Regex.test(ip) || ipv6Regex.test(ip);
}

export function isPrivateIP(ip: string): boolean {
  if (!isValidIP(ip)) return false;
  
  const privateRanges = [
    /^10\./,
    /^172\.(1[6-9]|2[0-9]|3[0-1])\./,
    /^192\.168\./,
    /^127\./,
    /^169\.254\./
  ];
  
  return privateRanges.some(range => range.test(ip));
}

// =====================================================
// AUDIT LOGGING
// =====================================================

export interface SecurityEvent {
  timestamp: string;
  type: 'auth' | 'access' | 'threat' | 'error';
  severity: 'low' | 'medium' | 'high' | 'critical';
  ip: string;
  userAgent?: string;
  userId?: string;
  action: string;
  details: Record<string, any>;
}

export class SecurityLogger {
  private events: SecurityEvent[] = [];
  private maxEvents = 1000;

  log(event: Omit<SecurityEvent, 'timestamp'>): void {
    const fullEvent: SecurityEvent = {
      ...event,
      timestamp: new Date().toISOString()
    };

    this.events.push(fullEvent);

    // Keep only recent events
    if (this.events.length > this.maxEvents) {
      this.events = this.events.slice(-this.maxEvents);
    }

    // Console log for development
    const logLevel = event.severity === 'critical' || event.severity === 'high' ? 'error' : 
                    event.severity === 'medium' ? 'warn' : 'log';
    
    console[logLevel](`[Security] ${event.type.toUpperCase()}: ${event.action}`, {
      ip: event.ip,
      severity: event.severity,
      details: event.details
    });
  }

  getEvents(filter?: {
    type?: SecurityEvent['type'];
    severity?: SecurityEvent['severity'];
    since?: Date;
  }): SecurityEvent[] {
    let filtered = this.events;

    if (filter) {
      if (filter.type) {
        filtered = filtered.filter(e => e.type === filter.type);
      }
      if (filter.severity) {
        filtered = filtered.filter(e => e.severity === filter.severity);
      }
      if (filter.since) {
        filtered = filtered.filter(e => new Date(e.timestamp) >= filter.since!);
      }
    }

    return filtered.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }

  getStats(): {
    total: number;
    byType: Record<SecurityEvent['type'], number>;
    bySeverity: Record<SecurityEvent['severity'], number>;
    recentThreats: number;
  } {
    const byType = { auth: 0, access: 0, threat: 0, error: 0 };
    const bySeverity = { low: 0, medium: 0, high: 0, critical: 0 };
    
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    let recentThreats = 0;

    this.events.forEach(event => {
      byType[event.type]++;
      bySeverity[event.severity]++;
      
      if (event.type === 'threat' && new Date(event.timestamp) >= oneHourAgo) {
        recentThreats++;
      }
    });

    return {
      total: this.events.length,
      byType,
      bySeverity,
      recentThreats
    };
  }
}

// Global security logger instance
export const securityLogger = new SecurityLogger();

// =====================================================
// EXPORT ALL
// =====================================================

export default {
  sanitizeInput,
  securityPatterns,
  validateInput,
  validateRequest,
  generateCSRFToken,
  validateCSRFToken,
  generateSecureToken,
  hashPassword,
  verifyPassword,
  RateLimiter,
  isValidIP,
  isPrivateIP,
  SecurityLogger,
  securityLogger
};
