/**
 * Image performance monitoring and optimization setup
 */

export interface ImageLoadMetrics {
  url: string;
  loadTime: number;
  fileSize?: number;
  format: string;
  width: number;
  height: number;
  isOptimized: boolean;
}

class ImagePerformanceMonitor {
  private metrics: ImageLoadMetrics[] = [];
  private observer: PerformanceObserver | null = null;

  constructor() {
    this.setupPerformanceObserver();
  }

  private setupPerformanceObserver() {
    if (typeof window === 'undefined' || !('PerformanceObserver' in window)) {
      return;
    }

    try {
      this.observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        
        entries.forEach((entry) => {
          if (entry.entryType === 'resource' && entry.name.includes('image')) {
            this.trackImageLoad({
              url: entry.name,
              loadTime: entry.duration,
              fileSize: (entry as any).transferSize,
              format: this.getImageFormat(entry.name),
              width: 0, // Would need to be provided separately
              height: 0, // Would need to be provided separately
              isOptimized: this.isOptimizedImage(entry.name)
            });
          }
        });
      });

      this.observer.observe({ entryTypes: ['resource'] });
    } catch (error) {
      console.warn('Performance Observer not supported:', error);
    }
  }

  private getImageFormat(url: string): string {
    if (url.includes('format=avif')) return 'avif';
    if (url.includes('format=webp')) return 'webp';
    if (url.includes('.webp')) return 'webp';
    if (url.includes('.avif')) return 'avif';
    if (url.includes('.png')) return 'png';
    if (url.includes('.jpg') || url.includes('.jpeg')) return 'jpeg';
    return 'unknown';
  }

  private isOptimizedImage(url: string): boolean {
    return url.includes('builder.io') && 
           (url.includes('format=webp') || url.includes('format=avif') || url.includes('quality='));
  }

  trackImageLoad(metrics: ImageLoadMetrics) {
    this.metrics.push(metrics);
    
    // Log slow loading images in development
    if (process.env.NODE_ENV === 'development' && metrics.loadTime > 2000) {
      console.warn('Slow image load detected:', {
        url: metrics.url,
        loadTime: `${metrics.loadTime.toFixed(2)}ms`,
        optimized: metrics.isOptimized
      });
    }
  }

  getMetrics(): ImageLoadMetrics[] {
    return [...this.metrics];
  }

  getAverageLoadTime(): number {
    if (this.metrics.length === 0) return 0;
    const total = this.metrics.reduce((sum, metric) => sum + metric.loadTime, 0);
    return total / this.metrics.length;
  }

  getOptimizationRate(): number {
    if (this.metrics.length === 0) return 0;
    const optimized = this.metrics.filter(m => m.isOptimized).length;
    return (optimized / this.metrics.length) * 100;
  }

  generateReport(): {
    totalImages: number;
    averageLoadTime: number;
    optimizationRate: number;
    formatDistribution: Record<string, number>;
    slowestImages: ImageLoadMetrics[];
  } {
    const formatDistribution: Record<string, number> = {};
    
    this.metrics.forEach(metric => {
      formatDistribution[metric.format] = (formatDistribution[metric.format] || 0) + 1;
    });

    const slowestImages = [...this.metrics]
      .sort((a, b) => b.loadTime - a.loadTime)
      .slice(0, 5);

    return {
      totalImages: this.metrics.length,
      averageLoadTime: this.getAverageLoadTime(),
      optimizationRate: this.getOptimizationRate(),
      formatDistribution,
      slowestImages
    };
  }

  disconnect() {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
  }
}

// Global instance
export const imagePerformanceMonitor = new ImagePerformanceMonitor();

/**
 * Setup image optimization for the application
 */
export function setupImageOptimization() {
  if (typeof window === 'undefined') return;

  // Preload critical images
  const criticalImages = [
    'https://cdn.builder.io/api/v1/image/assets%2F2c7ec7c93776440b923d3518963fc941%2F96da5382e9584c3fb2d32eca60944359' // SeraGPT Logo
  ];

  criticalImages.forEach(url => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = `${url}?format=webp&quality=90&width=120`;
    document.head.appendChild(link);
  });

  // Setup lazy loading for images not handled by Next.js
  setupIntersectionObserver();

  // Log performance report in development
  if (process.env.NODE_ENV === 'development') {
    setTimeout(() => {
      const report = imagePerformanceMonitor.generateReport();
      console.log('Image Performance Report:', report);
    }, 10000); // After 10 seconds
  }
}

function setupIntersectionObserver() {
  if (!('IntersectionObserver' in window)) return;

  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement;
        const dataSrc = img.dataset.src;
        
        if (dataSrc) {
          img.src = dataSrc;
          img.classList.remove('lazy');
          imageObserver.unobserve(img);
        }
      }
    });
  }, {
    rootMargin: '50px 0px',
    threshold: 0.1
  });

  // Observe all lazy images
  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
}

/**
 * Preload images for better performance
 */
export function preloadImages(urls: string[]) {
  urls.forEach(url => {
    const img = new Image();
    img.src = url;
  });
}

/**
 * Check if WebP is supported
 */
export function supportsWebP(): Promise<boolean> {
  return new Promise((resolve) => {
    const webP = new Image();
    webP.onload = webP.onerror = () => {
      resolve(webP.height === 2);
    };
    webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
  });
}

/**
 * Check if AVIF is supported
 */
export function supportsAVIF(): Promise<boolean> {
  return new Promise((resolve) => {
    const avif = new Image();
    avif.onload = avif.onerror = () => {
      resolve(avif.height === 2);
    };
    avif.src = 'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI=';
  });
}
