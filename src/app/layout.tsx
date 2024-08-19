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
  description: "Manuele Nolli's portofolio",
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
