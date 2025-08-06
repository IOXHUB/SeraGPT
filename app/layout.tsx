import { Metadata } from 'next'
import './globals.css'
import Script from 'next/script'
import AnalyticsWrapper from '@/components/AnalyticsWrapper'
import ProductionErrorHandler from '@/components/ProductionErrorHandler'

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
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body suppressHydrationWarning>
        <ProductionErrorHandler />
        <AnalyticsWrapper>
          {children}
        </AnalyticsWrapper>
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
                   args[0].includes('Failed to fetch'))
                ) {
                  return;
                }
                originalError.apply(console, args);
              };

              // Handle HMR fetch errors gracefully
              if (typeof window !== 'undefined' && window.fetch) {
                const originalFetch = window.fetch;
                window.fetch = function(...args) {
                  return originalFetch.apply(this, args).catch(error => {
                    if (error.message.includes('HMR') || error.message.includes('webpack')) {
                      console.warn('HMR fetch failed, ignoring:', error.message);
                      return Promise.resolve(new Response('{}', {status: 200}));
                    }
                    throw error;
                  });
                };
              }
            `}
          </Script>
        )}
      </body>
    </html>
  )
}
