import { Metadata } from 'next'
import './globals.css'
import Script from 'next/script'

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
      <body suppressHydrationWarning>
        {children}
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
                   args[0].includes('Hydration'))
                ) {
                  return;
                }
                originalError.apply(console, args);
              };
            `}
          </Script>
        )}
      </body>
    </html>
  )
}
