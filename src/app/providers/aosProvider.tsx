'use client'

import React, { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'

type AOSProviderProps = {
  children: React.ReactNode
}

/**
 * AOS: Animate on Scroll Library
 */
export default function AOSProvider({ children }: AOSProviderProps) {
  useEffect(() => {
    AOS.init({
      once: true,
    })
  }, [])

  return children
}
