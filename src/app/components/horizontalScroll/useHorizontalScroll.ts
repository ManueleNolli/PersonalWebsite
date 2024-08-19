'use client'

import React, { useLayoutEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function useHorizontalScroll() {
  const slider = React.useRef<HTMLInputElement>(null)

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const panels = document.querySelectorAll('.slider-panel')
      gsap.to(panels, {
        xPercent: -100 * (panels.length - 1),
        ease: 'none',
        scrollTrigger: {
          trigger: slider.current,
          pin: true,
          scrub: 0.1,
          // snap: 1 / (panels.length - 1),
          end: () => '+=' + slider.current.clientWidth,
        },
      })
    })
    return () => ctx.revert()
  })

  return {
    slider,
  }
}
