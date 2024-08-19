'use client'

import useHorizontalScroll from '@/app/components/horizontalScroll/useHorizontalScroll'
import React from 'react'

type HorizontalScrollProps = {
  children: React.ReactNode
}
export default function HorizontalScroll({ children }: HorizontalScrollProps) {
  useHorizontalScroll()

  return (
    <div className="horizontal-scroll h-lvh w-lvw">
      <div className="horizontal-container flex flex-nowrap h-full">{children}</div>
    </div>
  )
}
