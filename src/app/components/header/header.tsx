'use client'

import useHeader, { MenuLabel } from '@/app/components/header/useHeader'

export default function Header() {
  const { menuList } = useHeader()

  return (
    <>
      <header className="bg-gray-800 text-white p-4 sticky top-0 h-20">
        <div className="flex justify-between">
          {menuList.map((menu: MenuLabel) => (
            <a key={menu.url} href={menu.url} className={`px-4 py-2 hover:bg-gray-700 ${menu.isCurrent ? 'bg-gray-900' : 'bg-gray-300'}`}>
              {menu.label}
            </a>
          ))}
        </div>
      </header>
    </>
  )
}
