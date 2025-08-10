'use client';

import { useEffect } from 'react';
import { setupImageOptimization } from '@/lib/utils/image-performance';

interface ImageOptimizationProviderProps {
  children: React.ReactNode;
}

export default function ImageOptimizationProvider({ children }: ImageOptimizationProviderProps) {
  useEffect(() => {
    // Setup image optimization on client-side
    setupImageOptimization();
    
    // Cleanup on unmount
    return () => {
      // Any cleanup if needed
    };
  }, []);

  return <>{children}</>;
}
