import './globals.css'
import type { Metadata } from 'next'
import { GoogleAnalytics } from '@next/third-parties/google'
import GoogleAnalyticsTracker from '@/components/GoogleAnalyticsTracker'

export const metadata: Metadata = {
  title: 'Medical Equipment CRUD',
  description: 'CRUD app for hospital equipment management',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID

  return (
    <html lang="en">
      <body>
        {children}
        <GoogleAnalyticsTracker />
      </body>
      {gaId ? <GoogleAnalytics gaId={gaId} /> : null}
    </html>
  )
}