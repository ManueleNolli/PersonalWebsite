import type { Metadata } from 'next'
import React from 'react'

// STYLE
import './global.css'
import 'primereact/resources/themes/lara-light-cyan/theme.css'
import Header from '@/app/components/header/header'
import { PrimeReactProvider } from 'primereact/api'
import ParticlesProvider from '@/app/providers/particlesProvider'
import AOSProvider from '@/app/providers/aosProvider'
/*import "primereact/resources/themes/lara-light-cyan/theme.css";*/
// import 'primereact/resources/themes/lara-dark-cyan/theme.css'
// import 'primereact/resources/themes/lara-dark-teal/theme.css'


export const metadata: Metadata = {
  title: 'Manuele Nolli',
  description: 'Manuele Nolli\'s portofolio',
}

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <PrimeReactProvider>
      <ParticlesProvider>
        <AOSProvider>
          <html lang="en" className="scroll-smooth">

          {/*FAVICONS*/}
          <head>
            <link rel="icon" href="/assets/favicon/favicon.ico" sizes="any" />
            <link rel="icon" href="/assets/favicon/favicon-16x16.png" sizes="16x16" type="image/png" />
            <link rel="icon" href="/assets/favicon/favicon-32x32.png" sizes="32x32" type="image/png" />
            <link rel="apple-touch-icon" href="/assets/favicon/apple-touch-icon.png" sizes="180x180" type="image/png" />
            <link rel="android-chrome" href="/assets/favicon/android-chrome-192x192.png" sizes="192x192" type="image/png" />
            <link rel="android-chrome" href="/assets/favicon/android-chrome-512x512.png" sizes="512x512" type="image/png" />
            <link rel="manifest" href="/assets/favicon/site.webmanifest" />

          </head>
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
