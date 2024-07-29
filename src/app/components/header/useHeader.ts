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
    const findClasses = () => {
      return document.querySelectorAll('.header-item')
    }

    const headerItems = findClasses()

    const newMenuList: MenuLabel[] = []
    headerItems.forEach((item: Element) => {
      const label = item.textContent
      const url = `#${label}`
      newMenuList.push({ label, url, isCurrent: false })
    })

    setMenuList(newMenuList)
  }, [])

  // update current menu according to scroll position
  useEffect(() => {
    const updateCurrentMenu = () => {
      const currentScroll = window.scrollY
      const headerItems = document.querySelectorAll('.header-item')

      headerItems.forEach((item: Element) => {
        const label = item.textContent
        const url = `#${label}`
        const element = document.querySelector(url)
        console.log('element', element)

        if (!element) return

        const elementTop = element.getBoundingClientRect().top + window.scrollY
        const elementBottom = elementTop + element.clientHeight

        console.log('currentScroll', currentScroll)
        const isCurrent = currentScroll >= elementTop && currentScroll < elementBottom
        const menu = menuList.find((menu) => menu.url === url)
        if (menu) {
          menu.isCurrent = isCurrent
        }
      })

      setMenuList([...menuList])
    }

    window.addEventListener('scroll', updateCurrentMenu)
    return () => {
      window.removeEventListener('scroll', updateCurrentMenu)
    }
  }, [menuList])

  return {
    menuList,
  }
}
