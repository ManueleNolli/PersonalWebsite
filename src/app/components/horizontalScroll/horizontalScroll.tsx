'use client'

import useHorizontalScroll from '@/app/components/horizontalScroll/useHorizontalScroll'
import React from 'react'

import './horizontalScroll.css'

type HorizontalScrollProps = {
  children: React.ReactNode
}
export default function HorizontalScroll({ children }: HorizontalScrollProps) {
  const { slider } = useHorizontalScroll()

  return (
    <div className="slider-container bg-primary-750" ref={slider}>
      {/*ADD className `slider-panel to each children`*/}
      {React.Children.map(children, (child) => {
        return React.cloneElement(child as any, {
          className: `${(child as any).props.className} slider-panel`,
        })
      })}
      <div className="slider-progressbar bg-primary-850" />
    </div>
  )
}
