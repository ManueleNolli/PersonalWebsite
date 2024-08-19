'use client'

import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function useHorizontalScroll() {
  useEffect(() => {
    const sections = document.querySelectorAll('.panel')
    const container = document.querySelector('.horizontal-container')
    console.log('container.clientWidth', container.clientWidth)
    gsap.to(sections, {
      xPercent: -100 * (sections.length - 1),
      ease: 'none', // <-- IMPORTANT!
      scrollTrigger: {
        trigger: '.horizontal-scroll',
        pin: true,
        scrub: true,
        markers: true,
        end: `+=${container.clientWidth}`,
      },
    })
  }, [])
}
