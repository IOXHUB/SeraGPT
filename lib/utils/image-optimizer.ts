/**
 * Image optimization utilities for SeraGPT
 * Handles Builder.io image optimization and responsive loading
 */

export interface ImageOptimizationOptions {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'webp' | 'avif' | 'jpeg' | 'png' | 'auto';
  fit?: 'cover' | 'contain' | 'fill' | 'crop';
  position?: 'center' | 'top' | 'bottom' | 'left' | 'right';
  blur?: number;
  sharpen?: boolean;
}

export class ImageOptimizer {
  private static readonly BUILDER_IO_BASE = 'https://cdn.builder.io/api/v1/image/assets';
  
  /**
   * Optimize a Builder.io image URL with specified parameters
   */
  static optimizeBuilderImage(
    originalUrl: string, 
    options: ImageOptimizationOptions = {}
  ): string {
    // Extract asset ID from Builder.io URL
    const assetMatch = originalUrl.match(/assets[%\/]([^%\/\?]+)/);
    if (!assetMatch) {
      return originalUrl; // Return original if not a Builder.io asset
    }
    
    const assetId = assetMatch[1];
    const params = new URLSearchParams();
    
    // Apply optimizations
    if (options.width) params.set('width', options.width.toString());
    if (options.height) params.set('height', options.height.toString());
    if (options.quality) params.set('quality', options.quality.toString());
    if (options.format && options.format !== 'auto') {
      params.set('format', options.format);
    } else {
      // Auto-detect best format
      params.set('format', 'webp');
    }
    if (options.fit) params.set('fit', options.fit);
    if (options.position) params.set('position', options.position);
    if (options.blur) params.set('blur', options.blur.toString());
    if (options.sharpen) params.set('sharpen', 'true');
    
    return `${this.BUILDER_IO_BASE}/${assetId}?${params.toString()}`;
  }
  
  /**
   * Generate responsive image sizes for srcSet
   */
  static generateResponsiveSizes(
    originalUrl: string,
    breakpoints: number[] = [480, 640, 768, 1024, 1280, 1440, 1920]
  ): string {
    return breakpoints
      .map(width => {
        const optimizedUrl = this.optimizeBuilderImage(originalUrl, {
          width,
          quality: 85,
          format: 'webp'
        });
        return `${optimizedUrl} ${width}w`;
      })
      .join(', ');
  }
  
  /**
   * Generate sizes attribute for responsive images
   */
  static generateSizesAttribute(
    maxWidth: number = 1200,
    breakpoints: { viewport: number; size: string }[] = [
      { viewport: 640, size: '100vw' },
      { viewport: 1024, size: '80vw' },
      { viewport: 1440, size: '60vw' }
    ]
  ): string {
    const sizesArray = breakpoints.map(bp => 
      `(max-width: ${bp.viewport}px) ${bp.size}`
    );
    sizesArray.push(`${maxWidth}px`);
    return sizesArray.join(', ');
  }
  
  /**
   * Generate blur data URL for placeholder
   */
  static generateBlurDataURL(
    originalUrl: string,
    width: number = 10,
    height: number = 10
  ): string {
    // For Builder.io images, generate a tiny blurred version
    if (originalUrl.includes('builder.io')) {
      const blurredUrl = this.optimizeBuilderImage(originalUrl, {
        width,
        height,
        quality: 20,
        blur: 10,
        format: 'jpeg'
      });
      
      // Convert to data URL (simplified - in production you'd want to fetch and convert)
      return `data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=`;
    }
    
    // Default blur data URL
    return 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=';
  }
  
  /**
   * Preload critical images
   */
  static preloadImage(url: string, options: ImageOptimizationOptions = {}): void {
    const optimizedUrl = this.optimizeBuilderImage(url, {
      quality: 85,
      format: 'webp',
      ...options
    });
    
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = optimizedUrl;
    
    // Add responsive preloading
    if (options.width) {
      link.setAttribute('imagesrcset', this.generateResponsiveSizes(url));
      link.setAttribute('imagesizes', this.generateSizesAttribute(options.width));
    }
    
    document.head.appendChild(link);
  }
  
  /**
   * Lazy load images with intersection observer
   */
  static setupLazyLoading(): void {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      return;
    }
    
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          const src = img.dataset.src;
          
          if (src) {
            img.src = src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
          }
        }
      });
    }, {
      rootMargin: '50px 0px',
      threshold: 0.1
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  }
}

// Predefined optimization presets
export const ImagePresets = {
  logo: {
    quality: 90,
    format: 'webp' as const,
    fit: 'contain' as const
  },
  
  hero: {
    quality: 85,
    format: 'webp' as const,
    fit: 'cover' as const,
    sharpen: true
  },
  
  thumbnail: {
    quality: 80,
    format: 'webp' as const,
    fit: 'cover' as const,
    width: 400,
    height: 300
  },
  
  blog: {
    quality: 85,
    format: 'webp' as const,
    fit: 'cover' as const,
    sharpen: true
  },
  
  background: {
    quality: 75,
    format: 'webp' as const,
    fit: 'cover' as const
  }
} as const;
