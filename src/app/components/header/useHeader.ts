'use client'

import { useEffect, useState } from 'react'

export type MenuLabel = {
  label: string
  url: string
  isCurrent: boolean
}

export default function useHeader() {
  const [menuList, setMenuList] = useState<MenuLabel[]>([])

  const findHeaderItems = () => {
    return document.querySelectorAll('.header-item')
  }

  useEffect(() => {
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

    fillMenuList()
  }, [])

  // update current menu according to scroll position
  useEffect(() => {
    const updateCurrentMenu = () => {
      const currentScroll = window.scrollY
      const headerItems = findHeaderItems()

      headerItems.forEach((item: Element) => {
        const label = item.textContent
        const url = `#${item.id}`
        const element = document.querySelector(url)

        if (!element) return

        const elementTop = element.getBoundingClientRect().top + window.scrollY
        const elementBottom = elementTop + element.clientHeight
        const elementCenter = elementBottom / 2
        const headerHeight = 80 // h-20 is 20rem = 80px

        console.log('label', label)
        console.log('currentScroll', currentScroll)
        console.log('elementTop', elementTop)
        console.log('elementBottom', elementBottom)
        console.log('headerHeight', headerHeight)

        // if the center of the element is the current scroll position #FIXME
        const isCurrent = elementTop <= currentScroll + headerHeight && currentScroll + headerHeight < elementBottom

        if (isCurrent) {
          console.log('setting current menu', label)
          setMenuList((prevMenuList) => {
            return prevMenuList.map((menu) => {
              if (menu.url === url) {
                return { ...menu, isCurrent: true }
              } else {
                return { ...menu, isCurrent: false }
              }
            })
          })
        }
      })
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
