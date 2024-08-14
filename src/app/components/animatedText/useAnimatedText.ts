'use client'

import { useEffect } from 'react'
import SplitType from 'split-type'
import { gsap } from 'gsap'

export default function useAnimatedText() {
  useEffect(() => {
    const splitText = () => {
      new SplitType('.animated-text')
    }

    const addTranslation = () => {
      const elements = document.querySelectorAll('.char')
      elements.forEach((element) => {
        element.classList.add('translate-y-full')
      })
    }

    const addAnimation = () => {
      const elements = document.querySelectorAll('.char')
      gsap.to(elements, {
        y: 0,
        stagger: 0.05,
        delay: 0.02,
        duration: 0.5,
      })
    }

    splitText()
    addTranslation()
    addAnimation()
  }, [])
}
