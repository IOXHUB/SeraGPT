import { Metadata } from 'next'
import './globals.css'

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
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
