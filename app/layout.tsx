import { Metadata } from 'next'
import './globals.css'
import Script from 'next/script'
import AnalyticsWrapper from '@/components/AnalyticsWrapper'
import ProductionErrorHandler from '@/components/ProductionErrorHandler'
import ImageOptimizationProvider from '@/components/providers/ImageOptimizationProvider'
import DevToolsWidget from '@/components/dev/DevToolsWidget'
import DevNavigation from '@/components/DevNavigation'

export const metadata: Metadata = {
  title: 'SeraGPT',
  description: 'AI-powered chat application',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr" suppressHydrationWarning className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="preconnect" href="https://cdn.builder.io" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body suppressHydrationWarning className="h-full">
        <DevNavigation />
        <ProductionErrorHandler />
        <div className="h-full">
          {children}
        </div>
        <DevToolsWidget />
        {process.env.NODE_ENV === 'development' && (
          <Script id="suppress-hydration-warnings" strategy="beforeInteractive">
            {`
              // Suppress hydration warnings from browser extensions
              const originalError = console.error;
              console.error = (...args) => {
                if (
                  typeof args[0] === 'string' &&
                  (args[0].includes('Extra attributes from the server') ||
                   args[0].includes('__gchrome_uniqueid') ||
                   args[0].includes('Hydration') ||
                   args[0].includes('Failed to fetch') ||
                   args[0].includes('fullstory') ||
                   args[0].includes('analytics'))
                ) {
                  return;
                }
                originalError.apply(console, args);
              };

              // Handle HMR and analytics fetch errors gracefully
              if (typeof window !== 'undefined' && window.fetch) {
                const originalFetch = window.fetch;
                window.fetch = function(...args) {
                  const url = typeof args[0] === 'string' ? args[0] : args[0]?.url || '';

                  return originalFetch.apply(this, args).catch(error => {
                    if (error.message.includes('HMR') ||
                        error.message.includes('webpack') ||
                        error.message.includes('hot-update') ||
                        error.message.includes('Failed to fetch') ||
                        url.includes('fullstory') ||
                        url.includes('analytics') ||
                        url.includes('fly.dev') ||
                        url.includes('?reload=') ||
                        url.includes('_next/static') ||
                        url.includes('__nextjs_original-stack-frame')) {
                      console.warn('Development fetch failed, ignoring:', error.message);
                      return Promise.resolve(new Response('{}', {status: 200}));
                    }
                    throw error;
                  });
                };
              }

              // Suppress unhandled promise rejections in development
              window.addEventListener('unhandledrejection', function(event) {
                if (event.reason && typeof event.reason === 'object') {
                  const message = event.reason.message || '';
                  if (message.includes('HMR') ||
                      message.includes('webpack') ||
                      message.includes('fullstory') ||
                      message.includes('analytics') ||
                      message.includes('Failed to fetch')) {
                    console.warn('Suppressed dev rejection:', message);
                    event.preventDefault();
                  }
                }
              });
            `}
          </Script>
        )}
      </body>
    </html>
  )
}
