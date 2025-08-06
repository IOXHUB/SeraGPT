'use client';

import { useEffect } from 'react';

export default function AnalyticsWrapper({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Wrap analytics scripts in error handling
    const handleAnalyticsError = (error: ErrorEvent) => {
      console.warn('Analytics script error:', error.message);
      // Don't let analytics errors break the app
      error.preventDefault();
      return true;
    };

    const handleFetchError = (event: Event) => {
      const target = event.target as HTMLScriptElement;
      if (target && target.src && (
        target.src.includes('fullstory.com') || 
        target.src.includes('analytics') ||
        target.src.includes('tracking')
      )) {
        console.warn('Analytics fetch failed:', target.src);
        // Remove failed script to prevent retries
        target.remove();
      }
    };

    // Add global error handlers for analytics
    window.addEventListener('error', handleAnalyticsError);
    window.addEventListener('unhandledrejection', (event) => {
      if (event.reason && typeof event.reason === 'object') {
        if (event.reason.message && (
          event.reason.message.includes('fullstory') ||
          event.reason.message.includes('analytics') ||
          event.reason.message.includes('Failed to fetch')
        )) {
          console.warn('Analytics promise rejection:', event.reason.message);
          event.preventDefault();
        }
      }
    });

    // Handle script load errors
    document.addEventListener('error', handleFetchError, true);

    // Override fetch for analytics URLs to handle failures gracefully
    const originalFetch = window.fetch;
    window.fetch = function(input, init) {
      try {
        const url = typeof input === 'string' ? input : input.url;
        
        // If it's an analytics URL, add timeout and error handling
        if (url.includes('fullstory.com') || 
            url.includes('analytics') || 
            url.includes('tracking')) {
          
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 5000); // 5s timeout
          
          return originalFetch(input, {
            ...init,
            signal: controller.signal
          }).catch(error => {
            console.warn('Analytics fetch failed:', url, error.message);
            // Return a mock successful response for analytics
            return new Response('{}', { status: 200 });
          }).finally(() => {
            clearTimeout(timeoutId);
          });
        }
        
        return originalFetch(input, init);
      } catch (error) {
        console.warn('Fetch wrapper error:', error);
        return originalFetch(input, init);
      }
    };

    return () => {
      window.removeEventListener('error', handleAnalyticsError);
      document.removeEventListener('error', handleFetchError, true);
      // Don't restore fetch to avoid issues
    };
  }, []);

  return <>{children}</>;
}
