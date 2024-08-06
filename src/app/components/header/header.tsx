'use client'

import useHeader, { MenuLabel } from '@/app/components/header/useHeader'
import { Button } from 'primereact/button'

export default function Header() {
  const { menuList } = useHeader()

  return (
    <>
      <header className="bg-black/25 text-white p-4 h-[8%] fixed top-0 left-0 right-0 z-10" style={{ transition: 'top 0.5s ease-in-out' }}>
        <div className="flex justify-evenly">
          {menuList.map((menu: MenuLabel) => (
            <Button
              key={menu.url}
              label={menu.label}
              onClick={() => (window.location.href = menu.url)}
              text
              className={`hover:text-primary-800 text-primary-700 no-outline ${menu.isCurrent ? 'text-black' : ''}`}
            />
          ))}
        </div>
      </header>
    </>
  )
}
