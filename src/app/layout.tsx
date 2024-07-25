import type { Metadata } from 'next'
import React from 'react'
import { Button } from 'primereact/button'

// STYLE
import './global.css'
import 'primereact/resources/themes/lara-light-cyan/theme.css'
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
    <html lang="en">
      <body>
        <h1 className="text-3xl font-bold underline">Hello, PrimeReact from RootLayout!</h1>
        <Button label="Click" className="mt-10" />
        {children}
      </body>
    </html>
  )
}
