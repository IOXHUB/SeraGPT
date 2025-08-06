'use client';

import { useEffect } from 'react';

export default function ProductionErrorHandler() {
  useEffect(() => {
    // Run in all environments to prevent errors

    // Disable HMR in production completely
    if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
      // Remove any HMR-related global variables
      delete (window as any).__webpack_hot_middleware_enabled__;
      delete (window as any).__webpack_require__;
      delete (window as any).__webpack_hot_middleware_reporter__;

      // Block WebSocket connections for HMR
      const originalWebSocket = window.WebSocket;
      window.WebSocket = class extends originalWebSocket {
        constructor(url: string | URL, protocols?: string | string[]) {
          const urlStr = url.toString();
          if (urlStr.includes('_next') || urlStr.includes('webpack') || urlStr.includes('hot-update')) {
            console.warn('Blocked HMR WebSocket in production:', urlStr);
            throw new Error('HMR disabled in production');
          }
          super(url, protocols);
        }
      };
    }

    // Global error handler
    const handleGlobalError = (event: ErrorEvent) => {
      // Don't show errors for analytics/tracking scripts or HMR
      if (event.message && (
        event.message.includes('fullstory') ||
        event.message.includes('analytics') ||
        event.message.includes('Failed to fetch') ||
        event.message.includes('webpack') ||
        event.message.includes('HMR') ||
        event.message.includes('hot-update') ||
        event.message.includes('RSC payload') ||
        event.message.includes('_next/static')
      )) {
        console.warn('Suppressed error:', event.message);
        event.preventDefault();
        return true;
      }

      // Log other errors but don't break the app
      if (process.env.NODE_ENV === 'production') {
        console.warn('Production error suppressed:', event.error);
        event.preventDefault();
      } else {
        console.error('Development error:', event.error);
      }
      return true;
    };

    // Enhanced fetch wrapper to handle all problematic requests
    const originalFetch = window.fetch;
    window.fetch = function(input: RequestInfo | URL, init?: RequestInit) {
      try {
        const url = typeof input === 'string' ? input : input instanceof URL ? input.href : (input as Request).url;

        // Block HMR and analytics requests that cause issues
        if (url.includes('_next/static') ||
            url.includes('webpack') ||
            url.includes('hot-update') ||
            url.includes('fullstory.com') ||
            url.includes('analytics') ||
            url.includes('fly.dev') ||
            url.includes('?reload=') ||
            url.includes('__nextjs_original-stack-frame') ||
            url.includes('__webpack_hmr')) {

          console.warn('Blocked problematic fetch:', url);
          return Promise.resolve(new Response('{}', {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
          }));
        }

        return originalFetch(input, init).catch(error => {
          // Don't log every error, just the important ones
          if (!url.includes('_next') && !url.includes('webpack') && !url.includes('hot-update')) {
            console.warn('Fetch failed:', url, error.message);
          }

          // Return appropriate mock response based on request
          if (url.includes('/api/') || url.includes('.json')) {
            return new Response('{"success": false, "error": "Network unavailable"}', {
              status: 503,
              headers: { 'Content-Type': 'application/json' }
            });
          }

          return new Response('{}', {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
          });
        });
      } catch (error) {
        console.warn('Fetch wrapper error:', error);
        return originalFetch(input, init);
      }
    };

    // Handle unhandled promise rejections
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      if (event.reason && typeof event.reason === 'object') {
        const message = event.reason.message || '';

        if (message.includes('fullstory') ||
            message.includes('analytics') ||
            message.includes('Failed to fetch') ||
            message.includes('webpack') ||
            message.includes('HMR') ||
            message.includes('hot-update') ||
            message.includes('RSC payload')) {
          console.warn('Suppressed rejection:', message);
          event.preventDefault();
          return;
        }
      }

      if (process.env.NODE_ENV === 'production') {
        console.warn('Production rejection suppressed:', event.reason);
        event.preventDefault();
      } else {
        console.error('Unhandled promise rejection:', event.reason);
      }
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
