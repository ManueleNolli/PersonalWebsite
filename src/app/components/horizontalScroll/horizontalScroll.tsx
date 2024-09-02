'use client'

import useHorizontalScroll from '@/app/components/horizontalScroll/useHorizontalScroll'
import React from 'react'

import './horizontalScroll.css'
import AnimatedOnScroll from '@/app/components/animatedOnScroll/animatedOnScroll'

type HorizontalScrollProps = {
  children: React.ReactNode
}

export default function HorizontalScroll({ children }: HorizontalScrollProps) {
  const { slider } = useHorizontalScroll()

  return (
    <div className="slider-container" ref={slider}>
      {/* children must have className 'slider-panel' to be included in the scroll animation`*/}
      {children}
      <div className="slider-progressbar bg-primary-100" />
    </div>
  )
}
