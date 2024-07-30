import type { Metadata } from 'next'
import React from 'react'
import { Button } from 'primereact/button'

// STYLE
import './global.css'
import 'primereact/resources/themes/lara-light-cyan/theme.css'
import Header from '@/app/components/header/header'
/*import "primereact/resources/themes/lara-light-cyan/theme.css";*/
/*import "primereact/resources/themes/lara-dark-cyan/theme.css";*/
/*import "primereact/resources/themes/lara-dark-teal/theme.css"*/

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
    <html lang="en" className="scroll-smooth">
      <body>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  )
}
