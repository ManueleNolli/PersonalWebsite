'use client'

import { useState } from 'react'

export default function useDialog() {
  const [isVisible, setIsVisible] = useState(false)

  const toggleVisibility = () => {
    setIsVisible(!isVisible)
  }

  return { isVisible, toggleVisibility }
}
