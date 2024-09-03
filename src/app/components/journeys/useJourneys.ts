'use client'

import React, { useLayoutEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function useJourneys() {
  const slider = React.useRef<HTMLInputElement>(null)

  const getPanels = () => {
    return document.querySelectorAll('.slider-panel')
  }

  const computeMaxWidth = () => {
    const panels = getPanels()
    let maxWidth = 0
    panels.forEach((panel) => {
      const style = window.getComputedStyle(panel)
      const marginLeft = parseFloat(style.marginLeft)
      const marginRight = parseFloat(style.marginRight)
      maxWidth += panel.clientWidth + marginLeft + marginRight
    })
    return maxWidth
  }

  useLayoutEffect(() => {
    // IMPORTANT: set the width of the slider to the sum of the width of all panels
    if (slider.current) {
      const maxWidth = computeMaxWidth()
      slider.current.style.width = `${maxWidth}px`
      console.log('maxWidth', maxWidth)
    } else {
      console.log('no slider')
    }
  }, [slider.current])

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      //SLIDER
      const panels = getPanels()
      const maxWidth = computeMaxWidth()

      const scrollTween = gsap.to(panels, {
        x: () => `-${maxWidth - window.innerWidth}`,
        ease: 'none',
        scrollTrigger: {
          trigger: slider.current,
          pin: true,
          scrub: 0.1,
          // snap: 1 / (panels.length - 1),
          end: () => `+=${maxWidth}`,
          // markers: true,
        },
      })

      // SLIDER BACKGROUND
      const progressbar = document.querySelector('.slider-progressbar')
      gsap.from(progressbar, {
        scrollTrigger: {
          trigger: slider.current,
          start: 'left top',
          end: () => `+=${maxWidth}`,
          scrub: true,
          // markers: true,
        },
        scaleX: 0,
        transformOrigin: 'left top',
        ease: 'none',
      })

      // ANIMATION OF ELEMENTS
      const journeys = document.querySelectorAll('.journey')

      journeys.forEach((journey) => {
        const a = gsap.timeline({
          scrollTrigger: {
            trigger: journey,
            end: 'left center',
            scrub: true,
            containerAnimation: scrollTween,
            // markers: true,
          },
        })
        // const a = gsap.timeline({
        //   scrollTrigger: {
        //     trigger: journey,
        //     start: '-= 50%',
        //     end: 'right center',
        //     scrub: true,
        //     containerAnimation: scrollTween,
        //     markers: true,
        //   },
        // })

        a.from(journey, {
          opacity: 0,
        }).to(journey, {
          opacity: 1,
        })
      })
    })
    return () => ctx.revert()
  })

  return {
    slider,
  }
}
