'use client'

import React, {  useLayoutEffect } from 'react'
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
    // calculate the height of the journey line
    const sliderContainer = document.querySelector('.slider-container')
    if (!sliderContainer) return

    const sliderContainerHeight = sliderContainer.clientHeight
    const journeyPosition = sliderContainerHeight * 0.2

    const journeysHeight: number[] = []
    const journeys = document.querySelectorAll('.journey')
    journeys.forEach((journey) => {
      journeysHeight.push(journey.clientHeight)
    })

    const journeyLines = document.querySelectorAll('.journey-line')
    journeyLines.forEach((line, index) => {
      // calculate the height of the line
      const journeyHeight = journeysHeight[index]
      const lineHeight = journeyPosition - journeyHeight / 2
      line.style.height = `${lineHeight}px`
    })
  }, [])

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

      gsap.to(panels, {
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
      if (!progressbar) return
      gsap.from(progressbar, {
        scrollTrigger: {
          trigger: slider.current,
          start: 'left top',
          end: () => `+=${maxWidth}`,
          scrub: true,
          // markers: true,
          onUpdate: (self) => {
            // Calculate the current width of the progress bar including scaling
            const progressBarWidth = progressbar.clientWidth * self.progress
            console.log("progressBarWidth", progressBarWidth)
            console.log("self", self)
            // Loop through each journey element
            const journeys = document.querySelectorAll('.journey')
            journeys.forEach((journey, index) => {
              const journeyRect = journey.getBoundingClientRect()
              const journeyLeft = journeyRect.left
              console.log("journeyLeft", journeyLeft)
              const journeyCenter = journeyRect.left + journeyRect.width / 2
              console.log("journeyCenter", journeyCenter)

              // Determine how much of the progress bar intersects with the journey element
              const overlap = Math.max(0, Math.min(journeyCenter, progressBarWidth) - Math.max(journeyLeft, 0))
              console.log(index, "overlap", overlap)
              console.log(index, "width", journeyRect.width)

              // Calculate opacity based on the overlap (increase the overlap amount to reduce opacity more aggressively)
              const opacity = (overlap / journeyRect.width) * 2
              console.log(index, "opacity", opacity)
              console.log("*****************")
              // Apply the calculated opacity
              journey.style.opacity = opacity
            })
          },
        },
        scaleX: 0,
        transformOrigin: 'left top',
        ease: 'none',
      })

      // ANIMATION OF ELEMENTS WHEN THE PROGRESS BAR REACHES THEM
    })
    return () => ctx.revert()
  })

  return {
    slider,
  }
}
