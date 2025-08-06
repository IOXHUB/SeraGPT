'use client';

import { useEffect } from 'react';

export default function ProductionErrorHandler() {
  useEffect(() => {
    // Only run in production
    if (process.env.NODE_ENV !== 'production') return;

    // Global error handler for production
    const handleGlobalError = (event: ErrorEvent) => {
      // Don't show errors for analytics/tracking scripts
      if (event.message && (
        event.message.includes('fullstory') ||
        event.message.includes('analytics') ||
        event.message.includes('Failed to fetch') ||
        event.message.includes('webpack') ||
        event.message.includes('HMR')
      )) {
        console.warn('Suppressed production error:', event.message);
        event.preventDefault();
        return true;
      }
      
      // Log other errors but don't break the app
      console.error('Production error:', event.error);
      event.preventDefault();
      return true;
    };

    // Handle unhandled promise rejections
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      if (event.reason && typeof event.reason === 'object') {
        const message = event.reason.message || '';
        
        if (message.includes('fullstory') ||
            message.includes('analytics') ||
            message.includes('Failed to fetch') ||
            message.includes('webpack') ||
            message.includes('HMR')) {
          console.warn('Suppressed production rejection:', message);
          event.preventDefault();
          return;
        }
      }
      
      console.error('Unhandled promise rejection:', event.reason);
      event.preventDefault();
    };

    // Resource loading error handler
    const handleResourceError = (event: Event) => {
      const target = event.target as HTMLElement;
      
      if (target && (target as any).src) {
        const src = (target as any).src;
        if (src.includes('fullstory') || 
            src.includes('analytics') || 
            src.includes('tracking')) {
          console.warn('Analytics resource failed to load:', src);
          // Remove the failed element
          target.remove();
        }
      }
    };

    // Add global error listeners
    window.addEventListener('error', handleGlobalError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);
    document.addEventListener('error', handleResourceError, true);

    // Cleanup
    return () => {
      window.removeEventListener('error', handleGlobalError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
      document.removeEventListener('error', handleResourceError, true);
    };
  }, []);

  return null; // This component doesn't render anything
}
