// Bundle performance monitoring and metrics
export interface BundleMetrics {
  bundleSize: number;
  loadTime: number;
  chunks: ChunkInfo[];
  performance: PerformanceMetrics;
  memoryUsage?: MemoryInfo;
}

export interface ChunkInfo {
  name: string;
  size: number;
  loadTime: number;
  isPreloaded: boolean;
  isCritical: boolean;
}

export interface PerformanceMetrics {
  firstContentfulPaint: number;
  largestContentfulPaint: number;
  firstInputDelay: number;
  cumulativeLayoutShift: number;
  timeToInteractive: number;
}

export interface MemoryInfo {
  usedJSHeapSize: number;
  totalJSHeapSize: number;
  jsHeapSizeLimit: number;
}

export class BundleMonitor {
  private static instance: BundleMonitor;
  private metrics: BundleMetrics[] = [];
  private performanceObserver?: PerformanceObserver;
  private resourceObserver?: PerformanceObserver;

  static getInstance(): BundleMonitor {
    if (!BundleMonitor.instance) {
      BundleMonitor.instance = new BundleMonitor();
    }
    return BundleMonitor.instance;
  }

  /**
   * Initialize bundle monitoring
   */
  initialize(): void {
    if (typeof window === 'undefined') return;

    this.setupPerformanceObserver();
    this.setupResourceObserver();
    this.monitorMemoryUsage();
    this.collectInitialMetrics();
  }

  /**
   * Setup performance observer for Core Web Vitals
   */
  private setupPerformanceObserver(): void {
    if (!('PerformanceObserver' in window)) return;

    try {
      this.performanceObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        
        entries.forEach((entry) => {
          if (entry.entryType === 'largest-contentful-paint') {
            this.updateMetric('largestContentfulPaint', entry.startTime);
          } else if (entry.entryType === 'first-input') {
            const fidEntry = entry as PerformanceEventTiming;
            this.updateMetric('firstInputDelay', fidEntry.processingStart - fidEntry.startTime);
          } else if (entry.entryType === 'layout-shift') {
            const clsEntry = entry as any;
            if (!clsEntry.hadRecentInput) {
              this.updateMetric('cumulativeLayoutShift', clsEntry.value);
            }
          }
        });
      });

      // Observe Core Web Vitals
      this.performanceObserver.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] });
    } catch (error) {
      console.warn('Performance observer setup failed:', error);
    }
  }

  /**
   * Setup resource observer for bundle loading times
   */
  private setupResourceObserver(): void {
    if (!('PerformanceObserver' in window)) return;

    try {
      this.resourceObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries() as PerformanceResourceTiming[];
        
        entries.forEach((entry) => {
          if (entry.initiatorType === 'script' || entry.initiatorType === 'link') {
            this.recordChunkLoad(entry);
          }
        });
      });

      this.resourceObserver.observe({ entryTypes: ['resource'] });
    } catch (error) {
      console.warn('Resource observer setup failed:', error);
    }
  }

  /**
   * Record chunk loading information
   */
  private recordChunkLoad(entry: PerformanceResourceTiming): void {
    const chunkInfo: ChunkInfo = {
      name: this.extractChunkName(entry.name),
      size: entry.transferSize || 0,
      loadTime: entry.responseEnd - entry.requestStart,
      isPreloaded: entry.name.includes('prefetch') || entry.name.includes('preload'),
      isCritical: this.isCriticalChunk(entry.name),
    };

    // Store chunk info for later analysis
    this.addChunkInfo(chunkInfo);
  }

  /**
   * Extract chunk name from URL
   */
  private extractChunkName(url: string): string {
    const match = url.match(/\/([^\/]+)\.(js|css)(\?|$)/);
    return match ? match[1] : 'unknown';
  }

  /**
   * Determine if chunk is critical
   */
  private isCriticalChunk(url: string): boolean {
    const criticalPatterns = [
      /main\./,
      /app\./,
      /pages\/index\./,
      /pages\/_app\./,
      /framework\./,
      /webpack\./,
    ];

    return criticalPatterns.some(pattern => pattern.test(url));
  }

  /**
   * Monitor memory usage
   */
  private monitorMemoryUsage(): void {
    if (typeof window === 'undefined' || !('performance' in window)) return;

    const checkMemory = () => {
      const memory = (performance as any).memory;
      if (memory) {
        const memoryInfo: MemoryInfo = {
          usedJSHeapSize: memory.usedJSHeapSize,
          totalJSHeapSize: memory.totalJSHeapSize,
          jsHeapSizeLimit: memory.jsHeapSizeLimit,
        };
        
        this.updateMemoryMetrics(memoryInfo);
      }
    };

    // Check memory every 30 seconds
    setInterval(checkMemory, 30000);
    
    // Initial check
    checkMemory();
  }

  /**
   * Collect initial performance metrics
   */
  private collectInitialMetrics(): void {
    if (typeof window === 'undefined') return;

    // Wait for page to be fully loaded
    if (document.readyState === 'complete') {
      this.collectMetrics();
    } else {
      window.addEventListener('load', () => {
        setTimeout(() => this.collectMetrics(), 100);
      });
    }
  }

  /**
   * Collect current performance metrics
   */
  private collectMetrics(): void {
    const performanceMetrics = this.getPerformanceMetrics();
    const bundleSize = this.calculateBundleSize();
    const loadTime = this.calculateLoadTime();

    const metrics: BundleMetrics = {
      bundleSize,
      loadTime,
      chunks: this.getChunkInfo(),
      performance: performanceMetrics,
      memoryUsage: this.getCurrentMemoryUsage(),
    };

    this.metrics.push(metrics);
    this.trimMetrics();
  }

  /**
   * Get current performance metrics
   */
  private getPerformanceMetrics(): PerformanceMetrics {
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    const paint = performance.getEntriesByType('paint');
    
    const fcp = paint.find(entry => entry.name === 'first-contentful-paint')?.startTime || 0;
    
    return {
      firstContentfulPaint: fcp,
      largestContentfulPaint: 0, // Will be updated by observer
      firstInputDelay: 0, // Will be updated by observer
      cumulativeLayoutShift: 0, // Will be updated by observer
      timeToInteractive: navigation ? navigation.domInteractive - navigation.navigationStart : 0,
    };
  }

  /**
   * Calculate total bundle size
   */
  private calculateBundleSize(): number {
    const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
    
    return resources
      .filter(resource => resource.initiatorType === 'script' || resource.initiatorType === 'link')
      .reduce((total, resource) => total + (resource.transferSize || 0), 0);
  }

  /**
   * Calculate total load time
   */
  private calculateLoadTime(): number {
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    return navigation ? navigation.loadEventEnd - navigation.navigationStart : 0;
  }

  /**
   * Get chunk information
   */
  private getChunkInfo(): ChunkInfo[] {
    return this.chunkInfoStore || [];
  }

  private chunkInfoStore: ChunkInfo[] = [];

  /**
   * Add chunk information
   */
  private addChunkInfo(chunk: ChunkInfo): void {
    this.chunkInfoStore.push(chunk);
  }

  /**
   * Get current memory usage
   */
  private getCurrentMemoryUsage(): MemoryInfo | undefined {
    const memory = (performance as any).memory;
    return memory ? {
      usedJSHeapSize: memory.usedJSHeapSize,
      totalJSHeapSize: memory.totalJSHeapSize,
      jsHeapSizeLimit: memory.jsHeapSizeLimit,
    } : undefined;
  }

  /**
   * Update specific metric
   */
  private updateMetric(metric: keyof PerformanceMetrics, value: number): void {
    if (this.metrics.length > 0) {
      const lastMetric = this.metrics[this.metrics.length - 1];
      lastMetric.performance[metric] = value;
    }
  }

  /**
   * Update memory metrics
   */
  private updateMemoryMetrics(memoryInfo: MemoryInfo): void {
    if (this.metrics.length > 0) {
      const lastMetric = this.metrics[this.metrics.length - 1];
      lastMetric.memoryUsage = memoryInfo;
    }
  }

  /**
   * Trim metrics to prevent memory leaks
   */
  private trimMetrics(): void {
    if (this.metrics.length > 100) {
      this.metrics = this.metrics.slice(-50);
    }
  }

  /**
   * Get latest metrics
   */
  getLatestMetrics(): BundleMetrics | null {
    return this.metrics[this.metrics.length - 1] || null;
  }

  /**
   * Get all metrics
   */
  getAllMetrics(): BundleMetrics[] {
    return [...this.metrics];
  }

  /**
   * Get performance summary
   */
  getPerformanceSummary(): {
    averageLoadTime: number;
    averageBundleSize: number;
    averageFCP: number;
    averageLCP: number;
    criticalChunksCount: number;
    totalChunksCount: number;
  } {
    if (this.metrics.length === 0) {
      return {
        averageLoadTime: 0,
        averageBundleSize: 0,
        averageFCP: 0,
        averageLCP: 0,
        criticalChunksCount: 0,
        totalChunksCount: 0,
      };
    }

    const totalMetrics = this.metrics.length;
    
    return {
      averageLoadTime: this.metrics.reduce((sum, m) => sum + m.loadTime, 0) / totalMetrics,
      averageBundleSize: this.metrics.reduce((sum, m) => sum + m.bundleSize, 0) / totalMetrics,
      averageFCP: this.metrics.reduce((sum, m) => sum + m.performance.firstContentfulPaint, 0) / totalMetrics,
      averageLCP: this.metrics.reduce((sum, m) => sum + m.performance.largestContentfulPaint, 0) / totalMetrics,
      criticalChunksCount: this.chunkInfoStore.filter(chunk => chunk.isCritical).length,
      totalChunksCount: this.chunkInfoStore.length,
    };
  }

  /**
   * Cleanup observers
   */
  cleanup(): void {
    if (this.performanceObserver) {
      this.performanceObserver.disconnect();
    }
    if (this.resourceObserver) {
      this.resourceObserver.disconnect();
    }
  }
}

// Export singleton instance
export const bundleMonitor = BundleMonitor.getInstance();

// React hook for bundle monitoring
export function useBundleMonitor() {
  const monitor = BundleMonitor.getInstance();
  
  return {
    getLatestMetrics: monitor.getLatestMetrics.bind(monitor),
    getAllMetrics: monitor.getAllMetrics.bind(monitor),
    getPerformanceSummary: monitor.getPerformanceSummary.bind(monitor),
  };
}
