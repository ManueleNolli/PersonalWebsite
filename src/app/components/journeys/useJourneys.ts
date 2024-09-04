'use client'

import React, { useLayoutEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function useJourneys() {
  const slider = React.useRef<HTMLInputElement>(null)

  const getContainer = () => {
    return document.querySelector<HTMLElement>('.slider-container')
  }

  const getPanels = () => {
    return document.querySelectorAll<HTMLElement>('.slider-panel')
  }

  const getProgressbar = () => {
    return document.querySelector('.slider-progressbar')
  }

  const getJourneys = () => {
    return document.querySelectorAll<HTMLElement>('.journey')
  }

  const getJourneyLines = () => {
    return document.querySelectorAll<HTMLElement>('.journey-line')
  }

  const computeMaxWidth = () => {
    console.log("COMPUTE MAX WIDTH")
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

  const updateJourneyLineHeights = () => {
    console.log("UPDATE JOURNEY LINE HEIGHTS")
    const sliderContainer = getContainer()
    if (!sliderContainer)
      throw new Error('Slider container not found')

    const sliderContainerHeight = sliderContainer.clientHeight
    const journeyPosition = sliderContainerHeight * 0.2

    const journeysHeight: number[] = []
    const journeys = getJourneys()
    journeys.forEach((journey) => {
      journeysHeight.push(journey.clientHeight)
    })

    const journeyLines = getJourneyLines()
    journeyLines.forEach((line, index) => {
      const journeyHeight = journeysHeight[index]
      const lineHeight = journeyPosition - journeyHeight / 2
      line.style.height = `${lineHeight}px`
    })
  }

  const getScrollAmount = () => {
    const maxWidth = computeMaxWidth()
    return -(maxWidth - window.innerWidth)
  }

  const initializeAnimations = () => {
    console.log("INITIALIZE ANIMATIONS")
    const panels = getPanels()
    const maxWidth = computeMaxWidth()

    gsap.to(panels, {
      x: () => getScrollAmount(),
      ease: 'none',
      scrollTrigger: {
        trigger: slider.current,
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
        end: () => `+=${computeMaxWidth()}`,
        markers: false,
      },
    })

    const progressbar = getProgressbar()
    if (!progressbar)
      throw new Error('Progressbar not found')

    gsap.fromTo(progressbar, { opacity: 0 }, { opacity: 1, duration: 0.5 }) // fix a flicker issue, without that the bar is show quickly when the page is loaded

    gsap.from(progressbar, {
      scrollTrigger: {
        trigger: slider.current,
        start: 'left top',
        end: () => `+=${maxWidth}`,
        scrub: true,
        onUpdate: (self) => {
          const progressBarWidth = progressbar.clientWidth * self.progress
          const journeys = getJourneys()
          journeys.forEach((journey) => {
            const journeyRect = journey.getBoundingClientRect()
            const journeyLeft = journeyRect.left
            const journeyCenter = journeyRect.left + journeyRect.width / 2

            const overlap = Math.max(0, Math.min(journeyCenter, progressBarWidth) - Math.max(journeyLeft, 0))
            const opacity = (overlap / journeyRect.width) * 2
            journey.style.opacity = String(opacity)
          })
        },
      },
      scaleX: 0,
      transformOrigin: 'left top',
      ease: 'none',
    })
  }

  useLayoutEffect(() => {
    const handleResize = () => {
      console.log("HANDLE RESIZE")
      if (slider.current) {
        console.log("SLIDER CURRENT")
        // Recalculate maxWidth and set the new slider width
        const maxWidth = computeMaxWidth()
        slider.current.style.width = `${maxWidth}px`
        console.log("MAX WIDTH", maxWidth)
        console.log("SLIDER CURRENT", slider.current.style.width)
      } else {
        console.error('Slider ref not found')
      }
      // Update journey line heights
      updateJourneyLineHeights()

      // Reinitialize animations
      ScrollTrigger.refresh() // Refresh ScrollTrigger on resize to recalculate positions
      initializeAnimations()
    }

    // Initial calculations
    updateJourneyLineHeights()
    if (slider.current) {
      const maxWidth = computeMaxWidth()
      slider.current.style.width = `${maxWidth}px`
    } else {
      console.error('Slider ref not found on initial calculations')
    }
    initializeAnimations()

    // Add resize event listener
    window.addEventListener('resize', handleResize)

    return () => {
      // Clean up the event listener on component unmount
      window.removeEventListener('resize', handleResize)
    }
  }, [slider.current])

  return {
    slider,
  }
}
