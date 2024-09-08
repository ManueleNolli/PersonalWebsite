'use client'

import React, { useLayoutEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function useJourneys() {
  const journeysWrapper = React.useRef<HTMLDivElement>(null)
  const journeys = React.useRef<HTMLDivElement>(null)
  const progressBar = React.useRef<HTMLDivElement>(null)

  const getJourneys = () => {
    return document.querySelectorAll<HTMLElement>('.journey-item')
  }

  const getJourneyLines = () => {
    return document.querySelectorAll<HTMLElement>('.journey-line')
  }

  const updateJourneyLineHeights = () => {
    if (!journeys.current) throw new Error('Slider container not found')

    const sliderContainerHeight = journeys.current.clientHeight

    const journeysHeight: number[] = []
    const journeysItems = getJourneys()

    journeysItems.forEach((journey) => {
      journeysHeight.push(journey.clientHeight)
    })

    const journeyLines = getJourneyLines()
    journeyLines.forEach((line, index) => {
      const journeyHeight = journeysHeight[index]
      const journeyPosition = index % 2 == 0 ? sliderContainerHeight * 0.2 : sliderContainerHeight * 0.25
      const lineHeight = journeyPosition - journeyHeight / 2
      line.style.height = `${lineHeight}px`
    })
  }
  const getScrollAmount = () => {
    if (!journeys.current) throw new Error('Journeys wrapper not found')
    const journeysWidth = journeys.current.clientWidth
    return -(journeysWidth - window.innerWidth)
  }

  const initializeAnimations = () => {
    if (!journeysWrapper.current) throw new Error('Journeys wrapper not found')
    if (!journeys.current) throw new Error('Journeys not found')
    if (!progressBar.current) throw new Error('Progress Bar not found')

    // SCROLL TRIGGER
    const tween = gsap.to(journeys.current, {
      x: getScrollAmount,
      ease: 'none',
    })

    ScrollTrigger.create({
      trigger: journeysWrapper.current,
      start: 'top top',
      end: () => `+=${getScrollAmount() * -1}`,
      pin: true,
      animation: tween,
      scrub: 0.01,
      invalidateOnRefresh: true,
      markers: false,
    })

    // PROGRESS BAR
    gsap.fromTo(progressBar.current, { opacity: 0 }, { opacity: 1, duration: 0.5 }) // fix a flicker issue, without that the bar is show quickly when the page is loaded
    gsap.from(progressBar.current, {
      scrollTrigger: {
        trigger: journeys.current,
        start: 'left top',
        end: () => `+=${getScrollAmount() * -1}`,
        scrub: true,
        onUpdate: (self) => {
          if (!progressBar.current) throw new Error('Progress Bar not found')
          const progressBarWidth = progressBar.current.clientWidth * self.progress
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
    initializeAnimations()
    updateJourneyLineHeights()
  }, [])

  return {
    journeysWrapper,
    journeys,
    progressBar,
  }
}
