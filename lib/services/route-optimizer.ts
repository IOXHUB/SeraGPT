// Route optimization utilities for better performance
export class RouteOptimizer {
  private static instance: RouteOptimizer;
  private preloadedRoutes = new Set<string>();
  private routePriority: Record<string, number> = {
    // High priority routes (preload immediately)
    '/dashboard': 1,
    '/dashboard/analysis/roi': 1,
    '/dashboard/ai-chat': 1,
    
    // Medium priority routes (preload on hover)
    '/dashboard/analysis/climate': 2,
    '/dashboard/analysis/equipment': 2,
    '/dashboard/analysis/market': 2,
    '/dashboard/analysis/layout': 2,
    '/dashboard/projects': 2,
    '/dashboard/analytics': 2,
    
    // Low priority routes (lazy load)
    '/admin': 3,
    '/admin/analytics': 3,
    '/admin/users': 3,
    '/blog': 3,
  };

  static getInstance(): RouteOptimizer {
    if (!RouteOptimizer.instance) {
      RouteOptimizer.instance = new RouteOptimizer();
    }
    return RouteOptimizer.instance;
  }

  /**
   * Preload a route's JavaScript bundle
   */
  async preloadRoute(route: string): Promise<void> {
    if (this.preloadedRoutes.has(route) || typeof window === 'undefined') {
      return;
    }

    try {
      // Mark as preloaded to avoid duplicate requests
      this.preloadedRoutes.add(route);

      // Use Next.js router prefetch if available
      if (window.next?.router?.prefetch) {
        await window.next.router.prefetch(route);
      } else {
        // Fallback: create link element for preloading
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = route;
        document.head.appendChild(link);
        
        // Remove after a short delay to clean up DOM
        setTimeout(() => {
          if (link.parentNode) {
            link.parentNode.removeChild(link);
          }
        }, 1000);
      }
    } catch (error) {
      console.warn(`Failed to preload route ${route}:`, error);
      // Remove from preloaded set if it failed
      this.preloadedRoutes.delete(route);
    }
  }

  /**
   * Preload high priority routes immediately
   */
  preloadCriticalRoutes(): void {
    if (typeof window === 'undefined') return;

    const criticalRoutes = Object.entries(this.routePriority)
      .filter(([_, priority]) => priority === 1)
      .map(([route]) => route);

    // Use requestIdleCallback for non-blocking preloading
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        criticalRoutes.forEach(route => this.preloadRoute(route));
      });
    } else {
      // Fallback for browsers without requestIdleCallback
      setTimeout(() => {
        criticalRoutes.forEach(route => this.preloadRoute(route));
      }, 100);
    }
  }

  /**
   * Preload route on hover (for medium priority routes)
   */
  setupHoverPreload(linkElement: HTMLAnchorElement): (() => void) | void {
    if (typeof window === 'undefined') return;

    const href = linkElement.getAttribute('href');
    if (!href || this.preloadedRoutes.has(href)) return;

    const priority = this.routePriority[href];
    if (priority === 2) {
      let timeoutId: NodeJS.Timeout;

      const handleMouseEnter = () => {
        // Delay preloading slightly to avoid preloading on accidental hovers
        timeoutId = setTimeout(() => {
          this.preloadRoute(href);
        }, 100);
      };

      const handleMouseLeave = () => {
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
      };

      linkElement.addEventListener('mouseenter', handleMouseEnter);
      linkElement.addEventListener('mouseleave', handleMouseLeave);

      // Cleanup function
      return () => {
        linkElement.removeEventListener('mouseenter', handleMouseEnter);
        linkElement.removeEventListener('mouseleave', handleMouseLeave);
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
      };
    }
  }

  /**
   * Get route priority
   */
  getRoutePriority(route: string): number {
    return this.routePriority[route] || 3;
  }

  /**
   * Check if route is preloaded
   */
  isRoutePreloaded(route: string): boolean {
    return this.preloadedRoutes.has(route);
  }

  /**
   * Optimize images in viewport
   */
  optimizeImagesInViewport(): void {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      return;
    }

    const imageObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            
            // Add loading=lazy if not already set
            if (!img.getAttribute('loading')) {
              img.setAttribute('loading', 'lazy');
            }

            // Add decoding=async for better performance
            if (!img.getAttribute('decoding')) {
              img.setAttribute('decoding', 'async');
            }

            imageObserver.unobserve(img);
          }
        });
      },
      {
        rootMargin: '50px 0px',
        threshold: 0.1,
      }
    );

    // Observe all images
    document.querySelectorAll('img').forEach((img) => {
      imageObserver.observe(img);
    });
  }

  /**
   * Initialize route optimizer
   */
  initialize(): void {
    if (typeof window === 'undefined') return;

    // Preload critical routes
    this.preloadCriticalRoutes();

    // Optimize images
    this.optimizeImagesInViewport();

    // Setup intersection observer for dynamic content
    if ('IntersectionObserver' in window) {
      const linkObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const link = entry.target as HTMLAnchorElement;
              this.setupHoverPreload(link);
              linkObserver.unobserve(link);
            }
          });
        },
        { rootMargin: '100px 0px' }
      );

      // Observe all links
      document.querySelectorAll('a[href^="/"]').forEach((link) => {
        linkObserver.observe(link);
      });
    }
  }
}

// Export singleton instance
export const routeOptimizer = RouteOptimizer.getInstance();

// Hook for React components
export function useRouteOptimizer() {
  const optimizer = RouteOptimizer.getInstance();

  return {
    preloadRoute: optimizer.preloadRoute.bind(optimizer),
    isRoutePreloaded: optimizer.isRoutePreloaded.bind(optimizer),
    getRoutePriority: optimizer.getRoutePriority.bind(optimizer),
    setupHoverPreload: optimizer.setupHoverPreload.bind(optimizer),
  };
}

// Utility function to add to document head
export function addPreloadLink(href: string, as: 'script' | 'style' | 'font' | 'image' = 'script') {
  if (typeof document === 'undefined') return;

  const link = document.createElement('link');
  link.rel = 'preload';
  link.href = href;
  link.as = as;
  
  if (as === 'font') {
    link.crossOrigin = 'anonymous';
  }
  
  document.head.appendChild(link);
  
  return () => {
    if (link.parentNode) {
      link.parentNode.removeChild(link);
    }
  };
}

// Font optimization utilities
export const FontOptimizer = {
  preloadCriticalFonts(): void {
    const criticalFonts = [
      // Add your critical font URLs here
      '/fonts/inter-var.woff2',
      '/fonts/inter-bold.woff2',
    ];

    criticalFonts.forEach(font => {
      addPreloadLink(font, 'font');
    });
  },
};

// Global type augmentation for Next.js router
declare global {
  interface Window {
    next?: {
      router?: {
        prefetch: (url: string) => Promise<void>;
      };
    };
  }
}
