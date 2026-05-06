import type { Metadata, Viewport } from 'next'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import CustomCursor from '@/components/ui/Customcursor'

const siteUrl = 'https://inzozilabs.com'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Inzozi Labs — We Build Digital Futures',
    template: '%s | Inzozi Labs'
  },
  description: 'Inzozi Labs is a software development company crafting world-class mobile & web applications. We turn ambitious ideas into insane digital experiences.',
  keywords: ['software development','mobile app development','web application development','React Native','Next.js','Flutter','Rwanda tech','Kigali software','Inzozi Labs'],
  authors: [{ name: 'Inzozi Labs', url: siteUrl }],
  creator: 'Inzozi Labs',
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large' } },
  openGraph: {
    type: 'website', locale: 'en_US', url: siteUrl, siteName: 'Inzozi Labs',
    title: 'Inzozi Labs — We Build Digital Futures',
    description: 'Crafting world-class mobile & web applications.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Inzozi Labs' }]
  },
  twitter: { card: 'summary_large_image', title: 'Inzozi Labs', description: 'Crafting world-class digital experiences.', images: ['/og-image.png'] },
  alternates: { canonical: siteUrl }
}

export const viewport: Viewport = { themeColor: '#020205', colorScheme: 'dark', width: 'device-width', initialScale: 1 }

const jsonLd = {
  '@context': 'https://schema.org', '@type': 'Organization',
  name: 'Inzozi Labs', url: siteUrl, logo: `${siteUrl}/logo.png`,
  description: 'Software development company specializing in mobile and web applications.',
  address: { '@type': 'PostalAddress', addressLocality: 'Kigali', addressCountry: 'RW' },
  contactPoint: { '@type': 'ContactPoint', contactType: 'customer service', email: 'hello@inzozilabs.com' }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>
        <CustomCursor />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}