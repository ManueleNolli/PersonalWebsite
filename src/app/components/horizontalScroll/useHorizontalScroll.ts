'use client'

import React, { useLayoutEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function useHorizontalScroll() {
  const slider = React.useRef<HTMLInputElement>(null)

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      //SLIDER
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
          // markers: true,
        },
      })

      // SLIDER BACKGROUND
      const progressbar = document.querySelector('.slider-progressbar')
      console.log('slider.current.clientWidth', slider.current.clientWidth)
      gsap.from(progressbar, {
        scrollTrigger: {
          trigger: slider.current,
          start: 'left top',
          end: () => '+=' + slider.current.clientWidth,
          scrub: true,
          markers: true,
        },
        scaleX: 0,
        transformOrigin: 'left top',
        ease: 'none',
      })
    })
    return () => ctx.revert()
  })

  return {
    slider,
  }
}
