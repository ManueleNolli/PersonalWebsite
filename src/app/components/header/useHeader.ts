'use client'

import { useEffect, useState } from 'react'

export type MenuLabel = {
  label: string
  url: string
  isCurrent: boolean
}

export default function useHeader() {
  const [menuList, setMenuList] = useState<MenuLabel[]>([])
  const [prevoiusScrollPosition, setPrevoiusScrollPosition] = useState(0)
  const [headerDiv, setHeaderDiv] = useState<HTMLElement | null>()

  useEffect(() => {
    // helper to find header items
    const findHeaderItems = () => {
      return document.querySelectorAll('.header-item')
    }

    // fill menu list
    const fillMenuList = () => {
      const headerItems = findHeaderItems()

      const newMenuList: MenuLabel[] = []
      headerItems.forEach((item: Element) => {
        const label = item.getAttribute('header-label') || ''
        const url = `#${item.id}`
        newMenuList.push({ label, url, isCurrent: false })
      })

      setMenuList(newMenuList)
    }

    // update current menu according to scroll position
    const updateCurrentMenu = () => {
      const currentScroll = window.scrollY
      const headerItems = findHeaderItems()

      let currentSection: string | null = null
      let closestDistance = Infinity

      headerItems.forEach((item: Element) => {
        const element = document.querySelector(`#${item.id}`)
        if (!element) return

        const elementTop = element.getBoundingClientRect().top + window.scrollY
        const headerHeight = document.querySelector('header')?.clientHeight || 0

        const distance = Math.abs(currentScroll - (elementTop - headerHeight))
        if (distance < closestDistance) {
          closestDistance = distance
          currentSection = `#${item.id}`
        }
      })

      if (currentSection) {
        setMenuList((prevMenuList) =>
          prevMenuList.map((menu) => ({
            ...menu,
            isCurrent: menu.url === currentSection,
          }))
        )
      }
    }

    // fill menu list
    fillMenuList()

    // calculate current menu
    updateCurrentMenu()

    // set header div
    setHeaderDiv(document.querySelector('header') as HTMLElement)

    // add event listener to update current menu
    window.addEventListener('scroll', updateCurrentMenu)

    return () => {
      window.removeEventListener('scroll', updateCurrentMenu)
    }
  }, [])

  useEffect(() => {
    // handle header position
    const handleScrollHeaderPosition = () => {
      if (!headerDiv) return

      const currentScrollPosition = window.scrollY
      const headerBottom = headerDiv.getBoundingClientRect().bottom

      if (prevoiusScrollPosition > currentScrollPosition || currentScrollPosition < headerBottom) {
        headerDiv.style.top = '0'
      } else {
        const headerHeight = document.querySelector('header')?.clientHeight || 0
        headerDiv.style.top = `-${headerHeight}px`
      }

      setPrevoiusScrollPosition(currentScrollPosition)
    }
    window.addEventListener('scroll', handleScrollHeaderPosition)
    return () => {
      window.removeEventListener('scroll', handleScrollHeaderPosition)
    }
  }, [headerDiv, prevoiusScrollPosition])

  return {
    menuList,
  }
}
