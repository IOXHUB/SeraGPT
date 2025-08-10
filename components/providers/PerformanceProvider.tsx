'use client';

import { createContext, useContext, useEffect } from 'react';
import { performanceMonitor } from '@/lib/services/performance-monitor';

interface PerformanceContextType {
  isInitialized: boolean;
}

const PerformanceContext = createContext<PerformanceContextType | null>(null);

interface PerformanceProviderProps {
  children: React.ReactNode;
}

export function PerformanceProvider({ children }: PerformanceProviderProps) {
  useEffect(() => {
    // Initialize performance monitoring
    if (typeof window !== 'undefined') {
      try {
        performanceMonitor.initialize();
        
        // Track initial page view
        performanceMonitor.trackUserJourney('app_start', {
          url: window.location.href,
          timestamp: Date.now(),
        });

        // Cleanup on unmount
        return () => {
          performanceMonitor.cleanup();
        };
      } catch (error) {
        console.warn('Performance monitoring initialization failed:', error);
      }
    }
  }, []);

  const contextValue: PerformanceContextType = {
    isInitialized: true,
  };

  return (
    <PerformanceContext.Provider value={contextValue}>
      {children}
    </PerformanceContext.Provider>
  );
}

export function usePerformance() {
  const context = useContext(PerformanceContext);
  
  if (!context) {
    throw new Error('usePerformance must be used within a PerformanceProvider');
  }
  
  return context;
}
