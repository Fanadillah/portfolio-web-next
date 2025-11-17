// app/layout.tsx - Root Layout with SEO
import type { Metadata } from 'next';
import './globals.css';

// ========================================
// METADATA CONFIGURATION
// ========================================

export const metadata: Metadata = {
  // Basic Info
  title: {
    default: 'HamDev - Full Stack Developer Portfolio',
    template: '%s | HamDev Portfolio' // For page-specific titles
  },
  description: 'Portfolio profesional Fanadillah Ilham Pranata Adi - Full Stack Developer dengan expertise di React, Next.js, TypeScript, dan Firebase. Lihat project dan skill saya.',
  
  // Keywords for SEO
  keywords: [
    'portfolio developer',
    'full stack developer',
    'web developer Indonesia',
    'React developer',
    'Next.js developer',
    'Laravel developer',
    'PHP developer',
    'TypeScript developer',
    'Firebase developer',
    'Fanadillah Ilham Pranata Adi developer',
    'HamDev portfolio',
    'frontend developer',
    'backend developer',
    'web development'
  ],

  // Author Info
  authors: [
    { 
      name: 'Fanadillah Ilham Pranata Adi',
      url: 'https://hamdev-portfolio.vercel.app'
    }
  ],
  creator: 'Fanadillah Ilham Pranata Adi',
  publisher: 'HamDev',

  // Open Graph (Facebook, LinkedIn)
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: 'https://hamdev-portfolio.vercel.app',
    title: 'HamDev - Full Stack Developer Portfolio',
    description: 'Portfolio profesional Fanadillah Ilham Pranata Adi - Full Stack Developer dengan expertise di React, Next.js, TypeScript, Laravel, dan Firebase.',
    siteName: 'HamDev Portfolio',
    images: [
      {
        url: 'https://hamdev-portfolio.vercel.app/og-image.jpg', // 1200x630px recommended
        width: 1200,
        height: 630,
        alt: 'HamDev Portfolio Preview'
      }
    ]
  },

  // Twitter Card
  twitter: {
    card: 'summary_large_image',
    title: 'HamDev - Full Stack Developer Portfolio',
    description: 'Portfolio profesional Fanadillah Ilham Pranata Adi - Full Stack Developer',
    creator: '@yourtwitterhandle',
    images: ['https://hamdev-portfolio.vercel.app/twitter-image.jpg'], // 1200x600px
  },

  // Robots (crawling rules)
  robots: {
    index: true, // Allow indexing
    follow: true, // Follow links
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // Icons
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },

  // Manifest for PWA
  manifest: '/site.webmanifest',

  // Verification (add your codes)
  verification: {
    google: 'googlef98946850e6a7313.html',
    // yandex: 'your-yandex-verification-code',
    // bing: 'your-bing-verification-code',
  },

  // Other
  category: 'technology',
  alternates: {
    canonical: 'https://hamdev-portfolio.vercel.app',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="scroll-smooth">
      <head>
        {/* Additional meta tags */}
        <meta name="theme-color" content="#06B6D4" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        
        {/* Structured Data - JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Fanadillah Ilham Pranata Adi',
              jobTitle: 'Full Stack Developer',
              url: 'https://hamdev-portfolio.vercel.app',
              sameAs: [
                'https://github.com/Fanadillah',
                'https://linkedin.com/in/fanadillah-ilham',
                'https://twitter.com/yourusername'
              ],
              description: 'Full Stack Developer with expertise in React, Next.js, TypeScript, and Firebase',
              image: 'https://hamdev-portfolio.vercel.app/profile-image.jpg',
              alumniOf: {
                '@type': 'Organization',
                name: 'Gunadarma University'
              },
              knowsAbout: [
                'Web Development',
                'React',
                'Next.js',
                'TypeScript',
                'Firebase',
                'PHP',
                'Laravel',
                'Node.js'
              ]
            })
          }}
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}