'use client'

import { useEffect, useState } from 'react'

export type MenuLabel = {
  label: string
  url: string
  isCurrent: boolean
}

export default function useHeader() {
  const [menuList, setMenuList] = useState<MenuLabel[]>([])

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
        const label = item.textContent
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
        const headerHeight = 80 // h-20 is 20rem = 80px

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

    // add event listener to update current menu
    window.addEventListener('scroll', updateCurrentMenu)
    return () => {
      window.removeEventListener('scroll', updateCurrentMenu)
    }
  }, [])

  return {
    menuList,
  }
}
