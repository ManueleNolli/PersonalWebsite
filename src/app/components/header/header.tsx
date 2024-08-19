'use client'

import useHeader, { MenuLabel } from '@/app/components/header/useHeader'
import { Button } from 'primereact/button'

export default function Header() {
  const { menuList } = useHeader()

  return (
    <header className="bg-black/25 p-4 h-[8%] fixed top-0 left-0 right-0 z-10" style={{ transition: 'top 0.5s ease-in-out' }}>
      <div className="flex justify-evenly">
        {menuList.map((menu: MenuLabel) => (
          <Button
            key={menu.url}
            label={menu.label}
            onClick={() => (window.location.href = menu.url)}
            text
            className={`hover:text-primary-750 text-lg no-outline hover:bg-transparent ${menu.isCurrent ? 'text-primary-850 font-bold' : 'text-primary-600'}`}
          />
        ))}
      </div>
    </header>
  )
}
