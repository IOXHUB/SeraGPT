// Font optimization and loading strategies
export class FontOptimizer {
  private static instance: FontOptimizer;
  private loadedFonts = new Set<string>();
  private fontLoadingPromises = new Map<string, Promise<void>>();

  static getInstance(): FontOptimizer {
    if (!FontOptimizer.instance) {
      FontOptimizer.instance = new FontOptimizer();
    }
    return FontOptimizer.instance;
  }

  /**
   * Critical fonts that should be preloaded immediately
   */
  private criticalFonts = [
    {
      family: 'Inter',
      weight: '400',
      style: 'normal',
      display: 'swap',
      url: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap'
    }
  ];

  /**
   * Non-critical fonts that can be loaded later
   */
  private nonCriticalFonts = [
    {
      family: 'Inter',
      weight: '300',
      style: 'normal',
      display: 'swap',
      url: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;800;900&display=swap'
    }
  ];

  /**
   * Preload critical fonts
   */
  preloadCriticalFonts(): void {
    if (typeof document === 'undefined') return;

    this.criticalFonts.forEach(font => {
      this.preloadFont(font.url, font.family);
    });
  }

  /**
   * Load non-critical fonts after page load
   */
  loadNonCriticalFonts(): void {
    if (typeof window === 'undefined') return;

    // Load after page is fully loaded
    if (document.readyState === 'complete') {
      this.loadFontsLazy();
    } else {
      window.addEventListener('load', () => {
        // Add small delay to not interfere with initial render
        setTimeout(() => this.loadFontsLazy(), 100);
      });
    }
  }

  /**
   * Lazy load fonts
   */
  private loadFontsLazy(): void {
    this.nonCriticalFonts.forEach(font => {
      this.loadFont(font.url, font.family);
    });
  }

  /**
   * Preload a specific font
   */
  private preloadFont(url: string, fontFamily: string): void {
    if (this.loadedFonts.has(fontFamily)) return;

    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = url;
    link.as = 'style';
    link.crossOrigin = 'anonymous';
    
    document.head.appendChild(link);

    // Also add the actual stylesheet
    const styleLink = document.createElement('link');
    styleLink.rel = 'stylesheet';
    styleLink.href = url;
    styleLink.media = 'print';
    styleLink.onload = () => {
      styleLink.media = 'all';
      this.loadedFonts.add(fontFamily);
    };
    
    document.head.appendChild(styleLink);
  }

  /**
   * Load font asynchronously
   */
  private async loadFont(url: string, fontFamily: string): Promise<void> {
    if (this.loadedFonts.has(fontFamily)) return;

    // Check if we already have a loading promise for this font
    if (this.fontLoadingPromises.has(fontFamily)) {
      return this.fontLoadingPromises.get(fontFamily);
    }

    const loadingPromise = new Promise<void>((resolve, reject) => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = url;
      
      link.onload = () => {
        this.loadedFonts.add(fontFamily);
        resolve();
      };
      
      link.onerror = () => {
        reject(new Error(`Failed to load font: ${fontFamily}`));
      };
      
      document.head.appendChild(link);
    });

    this.fontLoadingPromises.set(fontFamily, loadingPromise);
    return loadingPromise;
  }

  /**
   * Check if font is loaded
   */
  isFontLoaded(fontFamily: string): boolean {
    return this.loadedFonts.has(fontFamily);
  }

  /**
   * Get font loading promise
   */
  getFontLoadingPromise(fontFamily: string): Promise<void> | undefined {
    return this.fontLoadingPromises.get(fontFamily);
  }

  /**
   * Initialize font optimization
   */
  initialize(): void {
    // Preload critical fonts immediately
    this.preloadCriticalFonts();
    
    // Load non-critical fonts after page load
    this.loadNonCriticalFonts();
    
    // Add font-display: swap CSS if not already present
    this.addFontDisplaySwap();
  }

  /**
   * Add font-display: swap to existing fonts
   */
  private addFontDisplaySwap(): void {
    if (typeof document === 'undefined') return;

    const style = document.createElement('style');
    style.textContent = `
      @font-face {
        font-family: system-ui, -apple-system, sans-serif;
        font-display: swap;
      }
      
      /* Ensure all fonts use font-display: swap */
      * {
        font-display: swap;
      }
    `;
    document.head.appendChild(style);
  }

  /**
   * Create font subset for specific text
   */
  async createFontSubset(text: string, fontFamily: string): Promise<string | null> {
    try {
      // This would require a server-side font subsetting service
      // For now, we'll just return the original font
      console.log(`Font subset requested for "${text}" with font "${fontFamily}"`);
      return null;
    } catch (error) {
      console.error('Font subsetting failed:', error);
      return null;
    }
  }
}

// Export singleton instance
export const fontOptimizer = FontOptimizer.getInstance();

// React hook for font optimization
export function useFontOptimizer() {
  const optimizer = FontOptimizer.getInstance();
  
  return {
    isFontLoaded: optimizer.isFontLoaded.bind(optimizer),
    getFontLoadingPromise: optimizer.getFontLoadingPromise.bind(optimizer),
  };
}

// Utility functions
export function createFontPreloadLink(href: string): HTMLLinkElement {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.href = href;
  link.as = 'font';
  link.type = 'font/woff2';
  link.crossOrigin = 'anonymous';
  return link;
}

export function createFontStylesheet(href: string): HTMLLinkElement {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = href;
  link.media = 'print';
  link.onload = () => {
    link.media = 'all';
  };
  return link;
}

// Font loading strategy
export const FontLoadingStrategy = {
  /**
   * Critical font loading - blocks render
   */
  critical: (fontUrl: string) => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = fontUrl;
    document.head.appendChild(link);
  },

  /**
   * Async font loading - doesn't block render
   */
  async: (fontUrl: string) => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = fontUrl;
    link.media = 'print';
    link.onload = () => {
      link.media = 'all';
    };
    document.head.appendChild(link);
  },

  /**
   * Preload font - hint to browser
   */
  preload: (fontUrl: string) => {
    const link = createFontPreloadLink(fontUrl);
    document.head.appendChild(link);
  },
};
