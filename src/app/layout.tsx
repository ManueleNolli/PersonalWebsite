import React from 'react'

// STYLE
import './global.css'
import 'primereact/resources/themes/lara-light-cyan/theme.css'
import Header from '@/app/components/header/header'
import { PrimeReactProvider } from 'primereact/api'
import ParticlesProvider from '@/app/providers/particlesProvider'
import AOSProvider from '@/app/providers/aosProvider'
import { Metadata } from 'next'
import Script from 'next/script'
/*import "primereact/resources/themes/lara-light-cyan/theme.css";*/
// import 'primereact/resources/themes/lara-dark-cyan/theme.css'
// import 'primereact/resources/themes/lara-dark-teal/theme.css'

export const metadata: Metadata = {
  title: 'Manuele Nolli',
  description: 'Manuele Nolli\'s portfolio',
  keywords: ['nextjs', 'serverless', 'aws', 'typescript', 'react', 'javascript', 'portfolio', 'manuele nolli'],
  icons: {
    icon: [
      { url: '/assets/favicon/favicon.ico', sizes: 'any' },
      { url: '/assets/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/assets/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/assets/favicon/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'android-chrome', url: '/assets/favicon/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { rel: 'android-chrome', url: '/assets/favicon/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
  },
  manifest: '/assets/favicon/site.webmanifest',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    siteName: 'Manuele Nolli',
    locale: 'it_CH',
    title: 'Manuele Nolli\'s portfolio',
    description: 'Manuele Nolli\'s portfolio with Serverless NextJS on AWS',
    type: 'website',
    url: 'https://www.manuelenolli.ch',
    images: [
      {
        url: 'https://manuelenolli.ch/assets/home.jpg',
        width: 2954,
        height: 1566,
        alt: 'Manuele Nolli\'s portfolio',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@manuele_nolli',
    creator: '@manuele_nolli',
    title: 'Manuele Nolli\'s portfolio',
    description: 'Manuele Nolli\'s portfolio with Serverless NextJS on AWS',
    images: ['https://manuelenolli.ch/assets/home.jpg'],
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  'name': 'Manuele Nolli',
  'nationality': 'Swiss',
  'url': 'https://www.manuelenolli.ch',
  'image': 'https://manuelenolli.ch/assets/home.jpg',
  'sameAs': [
    'https://github.com/ManueleNolli',
    'https://www.linkedin.com/in/manuelenolli',
  ],
  'jobTitle': 'Software Engineer',
  'worksFor': {
    '@type': 'Organization',
    'name': 'Freelance',
  },
  'description': 'Manuele Nolli\'s portfolio showcasing his work and projects',
  'alumniOf': {
    '@type': 'CollegeOrUniversity',
    'name': 'SUPSI - University of Applied Sciences and Arts of Southern Switzerland',
  },
  'knowsAbout': ['Computer Science', 'Software Engineering', 'Web Development', 'Cloud Computing',
    'Serverless', 'Blockchain', 'Ethereum', 'Solidity', 'Articial Intelligence', 'Machine Learning',
    'Generative AI',
  ],
  'address': {
    '@type': 'PostalAddress',
    'addressLocality': 'Switzerland',
    'addressCountry': 'CH',
  },
  'contactPoint': {
    '@type': 'ContactPoint',
    'contactType': 'Customer Support',
    'email': 'manuele.nolli.01@gmail.com',
  },
}
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <PrimeReactProvider>
      <ParticlesProvider>
        <AOSProvider>
          <html lang="en" className="scroll-smooth">
          <Script
            id={'json-ld'}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
          <body>
          <Header />
          <main>{children}</main>
          </body>
          </html>

        </AOSProvider>
      </ParticlesProvider>
    </PrimeReactProvider>
  )
}
