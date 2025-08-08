'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { routeOptimizer } from '@/lib/services/route-optimizer';
import { fontOptimizer } from '@/lib/services/font-optimizer';
import { bundleMonitor, BundleMetrics } from '@/lib/services/bundle-monitor';

interface PerformanceContextType {
  isOptimized: boolean;
  bundleMetrics: BundleMetrics | null;
  preloadRoute: (route: string) => Promise<void>;
  isFontLoaded: (fontFamily: string) => boolean;
}

const PerformanceContext = createContext<PerformanceContextType | null>(null);

interface PerformanceProviderProps {
  children: React.ReactNode;
}

export function PerformanceProvider({ children }: PerformanceProviderProps) {
  const [isOptimized, setIsOptimized] = useState(false);
  const [bundleMetrics, setBundleMetrics] = useState<BundleMetrics | null>(null);

  useEffect(() => {
    // Initialize all optimization services
    const initializeOptimizations = async () => {
      try {
        // Initialize route optimizer
        routeOptimizer.initialize();
        
        // Initialize font optimizer
        fontOptimizer.initialize();
        
        // Initialize bundle monitor
        bundleMonitor.initialize();
        
        setIsOptimized(true);
        
        // Update bundle metrics periodically
        const updateMetrics = () => {
          const metrics = bundleMonitor.getLatestMetrics();
          setBundleMetrics(metrics);
        };
        
        // Initial metrics update
        setTimeout(updateMetrics, 1000);
        
        // Update metrics every 30 seconds
        const interval = setInterval(updateMetrics, 30000);
        
        return () => {
          clearInterval(interval);
          bundleMonitor.cleanup();
        };
      } catch (error) {
        console.error('Performance optimization initialization failed:', error);
      }
    };

    initializeOptimizations();
  }, []);

  const contextValue: PerformanceContextType = {
    isOptimized,
    bundleMetrics,
    preloadRoute: routeOptimizer.preloadRoute.bind(routeOptimizer),
    isFontLoaded: fontOptimizer.isFontLoaded.bind(fontOptimizer),
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

// Performance monitoring hook
export function usePerformanceMetrics() {
  const [metrics, setMetrics] = useState<BundleMetrics | null>(null);
  const [summary, setSummary] = useState<any>(null);

  useEffect(() => {
    const updateMetrics = () => {
      const latestMetrics = bundleMonitor.getLatestMetrics();
      const performanceSummary = bundleMonitor.getPerformanceSummary();
      
      setMetrics(latestMetrics);
      setSummary(performanceSummary);
    };

    // Initial update
    updateMetrics();

    // Update every 10 seconds
    const interval = setInterval(updateMetrics, 10000);

    return () => clearInterval(interval);
  }, []);

  return { metrics, summary };
}

// Link optimization hook
export function useOptimizedLink() {
  const { preloadRoute } = usePerformance();

  const handleLinkHover = (href: string) => {
    // Preload on hover for better perceived performance
    preloadRoute(href);
  };

  const handleLinkClick = (href: string) => {
    // Track navigation
    console.log(`Navigating to: ${href}`);
  };

  return { handleLinkHover, handleLinkClick };
}
