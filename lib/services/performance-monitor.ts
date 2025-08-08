// Performance monitoring service for comprehensive metrics tracking
export interface PerformanceMetrics {
  // Core Web Vitals
  fcp: number; // First Contentful Paint
  lcp: number; // Largest Contentful Paint
  fid: number; // First Input Delay
  cls: number; // Cumulative Layout Shift
  ttfb: number; // Time to First Byte
  
  // Navigation timing
  pageLoadTime: number;
  domContentLoaded: number;
  
  // Resource timing
  resourceLoadTime: number;
  imageLoadTime: number;
  scriptLoadTime: number;
  
  // Custom metrics
  apiResponseTime: number;
  cacheHitRate: number;
  errorRate: number;
  
  // User experience
  userAgent: string;
  viewportSize: string;
  connectionType: string;
  
  // Timestamps
  timestamp: number;
  sessionId: string;
  pageUrl: string;
}

export interface APIMetrics {
  endpoint: string;
  method: string;
  responseTime: number;
  statusCode: number;
  success: boolean;
  cached: boolean;
  timestamp: number;
  sessionId: string;
}

export interface ErrorMetrics {
  type: 'javascript' | 'network' | 'render' | 'api';
  message: string;
  stack?: string;
  url: string;
  lineNumber?: number;
  columnNumber?: number;
  timestamp: number;
  sessionId: string;
  userAgent: string;
}

export interface UserJourneyMetrics {
  event: string;
  page: string;
  timestamp: number;
  sessionId: string;
  duration?: number;
  metadata?: Record<string, any>;
}

class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private sessionId: string;
  private metrics: PerformanceMetrics[] = [];
  private apiMetrics: APIMetrics[] = [];
  private errorMetrics: ErrorMetrics[] = [];
  private userJourney: UserJourneyMetrics[] = [];
  private observers: PerformanceObserver[] = [];
  private isInitialized = false;

  constructor() {
    this.sessionId = this.generateSessionId();
  }

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  /**
   * Initialize performance monitoring
   */
  initialize(): void {
    if (this.isInitialized || typeof window === 'undefined') return;

    try {
      this.setupWebVitalsObserver();
      this.setupNavigationObserver();
      this.setupResourceObserver();
      this.setupErrorHandling();
      this.trackInitialPageLoad();
      this.isInitialized = true;

      // Send initial metrics after page load
      window.addEventListener('load', () => {
        setTimeout(() => this.collectAndSendMetrics(), 1000);
      });

      // Send metrics before page unload
      window.addEventListener('beforeunload', () => {
        this.sendMetrics();
      });

      // Send metrics periodically
      setInterval(() => {
        this.collectAndSendMetrics();
      }, 30000); // Every 30 seconds

    } catch (error) {
      console.warn('Performance monitor initialization failed:', error);
    }
  }

  /**
   * Setup Web Vitals observer
   */
  private setupWebVitalsObserver(): void {
    if (!('PerformanceObserver' in window)) return;

    // FCP and LCP observer
    const paintObserver = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        if (entry.name === 'first-contentful-paint') {
          this.updateMetric('fcp', entry.startTime);
        }
      });
    });

    try {
      paintObserver.observe({ entryTypes: ['paint'] });
      this.observers.push(paintObserver);
    } catch (error) {
      console.warn('Paint observer setup failed:', error);
    }

    // LCP observer
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      this.updateMetric('lcp', lastEntry.startTime);
    });

    try {
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
      this.observers.push(lcpObserver);
    } catch (error) {
      console.warn('LCP observer setup failed:', error);
    }

    // FID observer
    const fidObserver = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        const fidEntry = entry as PerformanceEventTiming;
        this.updateMetric('fid', fidEntry.processingStart - fidEntry.startTime);
      });
    });

    try {
      fidObserver.observe({ entryTypes: ['first-input'] });
      this.observers.push(fidObserver);
    } catch (error) {
      console.warn('FID observer setup failed:', error);
    }

    // CLS observer
    let clsValue = 0;
    const clsObserver = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        const clsEntry = entry as any;
        if (!clsEntry.hadRecentInput) {
          clsValue += clsEntry.value;
          this.updateMetric('cls', clsValue);
        }
      });
    });

    try {
      clsObserver.observe({ entryTypes: ['layout-shift'] });
      this.observers.push(clsObserver);
    } catch (error) {
      console.warn('CLS observer setup failed:', error);
    }
  }

  /**
   * Setup navigation observer
   */
  private setupNavigationObserver(): void {
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    
    if (navigation) {
      const metrics = {
        ttfb: navigation.responseStart - navigation.requestStart,
        pageLoadTime: navigation.loadEventEnd - navigation.fetchStart,
        domContentLoaded: navigation.domContentLoadedEventEnd - navigation.fetchStart,
      };

      Object.entries(metrics).forEach(([key, value]) => {
        this.updateMetric(key as keyof PerformanceMetrics, value);
      });
    }
  }

  /**
   * Setup resource observer
   */
  private setupResourceObserver(): void {
    if (!('PerformanceObserver' in window)) return;

    const resourceObserver = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        const resource = entry as PerformanceResourceTiming;
        const loadTime = resource.responseEnd - resource.requestStart;

        if (resource.initiatorType === 'img') {
          this.updateMetric('imageLoadTime', loadTime);
        } else if (resource.initiatorType === 'script') {
          this.updateMetric('scriptLoadTime', loadTime);
        }

        this.updateMetric('resourceLoadTime', loadTime);
      });
    });

    try {
      resourceObserver.observe({ entryTypes: ['resource'] });
      this.observers.push(resourceObserver);
    } catch (error) {
      console.warn('Resource observer setup failed:', error);
    }
  }

  /**
   * Setup error handling
   */
  private setupErrorHandling(): void {
    // JavaScript errors
    window.addEventListener('error', (event) => {
      this.trackError({
        type: 'javascript',
        message: event.message,
        stack: event.error?.stack,
        url: event.filename,
        lineNumber: event.lineno,
        columnNumber: event.colno,
        timestamp: Date.now(),
        sessionId: this.sessionId,
        userAgent: navigator.userAgent,
      });
    });

    // Promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      this.trackError({
        type: 'javascript',
        message: `Unhandled Promise Rejection: ${event.reason}`,
        stack: event.reason?.stack,
        url: window.location.href,
        timestamp: Date.now(),
        sessionId: this.sessionId,
        userAgent: navigator.userAgent,
      });
    });
  }

  /**
   * Track initial page load
   */
  private trackInitialPageLoad(): void {
    this.trackUserJourney('page_load', {
      url: window.location.href,
      referrer: document.referrer,
      timestamp: Date.now(),
    });
  }

  /**
   * Update a specific metric
   */
  private updateMetric(key: keyof PerformanceMetrics, value: number): void {
    const latestMetrics = this.getLatestMetrics();
    latestMetrics[key] = value;
  }

  /**
   * Get or create latest metrics object
   */
  private getLatestMetrics(): PerformanceMetrics {
    if (this.metrics.length === 0 || Date.now() - this.metrics[this.metrics.length - 1].timestamp > 60000) {
      const newMetrics: PerformanceMetrics = {
        fcp: 0,
        lcp: 0,
        fid: 0,
        cls: 0,
        ttfb: 0,
        pageLoadTime: 0,
        domContentLoaded: 0,
        resourceLoadTime: 0,
        imageLoadTime: 0,
        scriptLoadTime: 0,
        apiResponseTime: 0,
        cacheHitRate: 0,
        errorRate: 0,
        userAgent: navigator.userAgent,
        viewportSize: `${window.innerWidth}x${window.innerHeight}`,
        connectionType: this.getConnectionType(),
        timestamp: Date.now(),
        sessionId: this.sessionId,
        pageUrl: window.location.href,
      };
      this.metrics.push(newMetrics);
    }
    return this.metrics[this.metrics.length - 1];
  }

  /**
   * Track API call metrics
   */
  trackAPICall(endpoint: string, method: string, responseTime: number, statusCode: number, cached: boolean = false): void {
    const apiMetric: APIMetrics = {
      endpoint,
      method,
      responseTime,
      statusCode,
      success: statusCode >= 200 && statusCode < 300,
      cached,
      timestamp: Date.now(),
      sessionId: this.sessionId,
    };

    this.apiMetrics.push(apiMetric);
    this.updateMetric('apiResponseTime', responseTime);

    // Update cache hit rate
    const recentAPICalls = this.apiMetrics.slice(-10);
    const cacheHits = recentAPICalls.filter(call => call.cached).length;
    this.updateMetric('cacheHitRate', (cacheHits / recentAPICalls.length) * 100);

    // Update error rate
    const errors = recentAPICalls.filter(call => !call.success).length;
    this.updateMetric('errorRate', (errors / recentAPICalls.length) * 100);

    // Trim old metrics
    if (this.apiMetrics.length > 100) {
      this.apiMetrics = this.apiMetrics.slice(-50);
    }
  }

  /**
   * Track errors
   */
  trackError(error: ErrorMetrics): void {
    this.errorMetrics.push(error);

    // Trim old errors
    if (this.errorMetrics.length > 50) {
      this.errorMetrics = this.errorMetrics.slice(-25);
    }
  }

  /**
   * Track user journey events
   */
  trackUserJourney(event: string, metadata?: Record<string, any>): void {
    const journeyMetric: UserJourneyMetrics = {
      event,
      page: window.location.pathname,
      timestamp: Date.now(),
      sessionId: this.sessionId,
      metadata,
    };

    this.userJourney.push(journeyMetric);

    // Trim old journey events
    if (this.userJourney.length > 50) {
      this.userJourney = this.userJourney.slice(-25);
    }
  }

  /**
   * Get connection type
   */
  private getConnectionType(): string {
    const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
    return connection ? connection.effectiveType || 'unknown' : 'unknown';
  }

  /**
   * Generate session ID
   */
  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Collect and send metrics
   */
  private collectAndSendMetrics(): void {
    if (this.metrics.length === 0) return;

    const payload = {
      performance: this.metrics.slice(-5), // Last 5 performance snapshots
      api: this.apiMetrics.slice(-20), // Last 20 API calls
      errors: this.errorMetrics.slice(-10), // Last 10 errors
      journey: this.userJourney.slice(-10), // Last 10 journey events
    };

    this.sendMetrics(payload);
  }

  /**
   * Send metrics to analytics endpoint
   */
  private sendMetrics(payload?: any): void {
    if (typeof window === 'undefined') return;

    const data = payload || {
      performance: this.metrics,
      api: this.apiMetrics,
      errors: this.errorMetrics,
      journey: this.userJourney,
    };

    // Use sendBeacon for reliable delivery
    if ('sendBeacon' in navigator) {
      try {
        navigator.sendBeacon('/api/analytics/performance', JSON.stringify(data));
      } catch (error) {
        // Fallback to fetch
        this.fallbackSendMetrics(data);
      }
    } else {
      this.fallbackSendMetrics(data);
    }
  }

  /**
   * Fallback method to send metrics
   */
  private fallbackSendMetrics(data: any): void {
    fetch('/api/analytics/performance', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      keepalive: true,
    }).catch(() => {
      // Store in localStorage as last resort
      try {
        localStorage.setItem('performance_metrics_backup', JSON.stringify(data));
      } catch (error) {
        // Silent fail if localStorage is full
      }
    });
  }

  /**
   * Get current performance summary
   */
  getPerformanceSummary(): {
    currentMetrics: PerformanceMetrics | null;
    averageResponseTime: number;
    cacheHitRate: number;
    errorRate: number;
    totalErrors: number;
    sessionDuration: number;
  } {
    const currentMetrics = this.metrics.length > 0 ? this.metrics[this.metrics.length - 1] : null;
    const recentAPICalls = this.apiMetrics.slice(-20);
    
    const averageResponseTime = recentAPICalls.length > 0
      ? recentAPICalls.reduce((sum, call) => sum + call.responseTime, 0) / recentAPICalls.length
      : 0;

    const cacheHits = recentAPICalls.filter(call => call.cached).length;
    const cacheHitRate = recentAPICalls.length > 0 ? (cacheHits / recentAPICalls.length) * 100 : 0;

    const errors = recentAPICalls.filter(call => !call.success).length;
    const errorRate = recentAPICalls.length > 0 ? (errors / recentAPICalls.length) * 100 : 0;

    const sessionStart = this.userJourney.length > 0 ? this.userJourney[0].timestamp : Date.now();
    const sessionDuration = Date.now() - sessionStart;

    return {
      currentMetrics,
      averageResponseTime,
      cacheHitRate,
      errorRate,
      totalErrors: this.errorMetrics.length,
      sessionDuration,
    };
  }

  /**
   * Cleanup observers
   */
  cleanup(): void {
    this.observers.forEach(observer => observer.disconnect());
    this.observers = [];
    this.sendMetrics(); // Send final metrics
  }
}

// Export singleton instance
export const performanceMonitor = PerformanceMonitor.getInstance();

// React hook for performance monitoring
export function usePerformanceMonitor() {
  const monitor = PerformanceMonitor.getInstance();
  
  return {
    trackAPICall: monitor.trackAPICall.bind(monitor),
    trackError: monitor.trackError.bind(monitor),
    trackUserJourney: monitor.trackUserJourney.bind(monitor),
    getPerformanceSummary: monitor.getPerformanceSummary.bind(monitor),
  };
}
