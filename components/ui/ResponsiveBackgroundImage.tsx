'use client';

import { useState, useEffect } from 'react';

interface ResponsiveBackgroundImageProps {
  src: string;
  alt?: string;
  className?: string;
  children?: React.ReactNode;
  priority?: boolean;
}

export default function ResponsiveBackgroundImage({
  src,
  alt = '',
  className = '',
  children,
  priority = false
}: ResponsiveBackgroundImageProps) {
  const [optimizedSrc, setOptimizedSrc] = useState(src);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Create responsive image URLs based on viewport
    const createResponsiveUrl = () => {
      const baseUrl = src.replace(/\?.*$/, ''); // Remove existing query params
      
      // Determine optimal size based on viewport
      const screenWidth = window.innerWidth;
      let targetWidth = 1920;
      
      if (screenWidth <= 640) {
        targetWidth = 640;
      } else if (screenWidth <= 1024) {
        targetWidth = 1024;
      } else if (screenWidth <= 1440) {
        targetWidth = 1440;
      }
      
      // Add optimization parameters
      const optimizedUrl = `${baseUrl}?format=webp&width=${targetWidth}&quality=80&fit=fill`;
      setOptimizedSrc(optimizedUrl);
    };

    createResponsiveUrl();
    
    // Update on resize
    window.addEventListener('resize', createResponsiveUrl);
    return () => window.removeEventListener('resize', createResponsiveUrl);
  }, [src]);

  useEffect(() => {
    // Preload the image
    const img = new Image();
    img.onload = () => setIsLoaded(true);
    img.src = optimizedSrc;
    
    if (priority) {
      // For priority images, add to head for faster loading
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = optimizedSrc;
      document.head.appendChild(link);
      
      return () => {
        if (document.head.contains(link)) {
          document.head.removeChild(link);
        }
      };
    }
  }, [optimizedSrc, priority]);

  return (
    <div
      className={`bg-center bg-cover bg-no-repeat transition-opacity duration-300 ${
        isLoaded ? 'opacity-100' : 'opacity-0'
      } ${className}`}
      style={{
        backgroundImage: `url(${optimizedSrc})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
      role={alt ? 'img' : undefined}
      aria-label={alt || undefined}
    >
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
        </div>
      )}
      {children}
    </div>
  );
}
