'use client'

import useHeader, { MenuLabel } from '@/app/components/header/useHeader'
import { Button } from 'primereact/button'
import { config } from '@/app/constants/config'
import React, { useState } from 'react'
import { Divide as Hamburger } from 'hamburger-react'

export default function Header() {
  const { menuList, isMobileOpen, setIsMobileOpen } = useHeader()
  const { home_name } = config

  return (
    <>
      {/*Screen*/}
      <header
        className="hidden md:flex h-[8%] fixed top-0 left-0 right-0 z-10 backdrop-blur-md bg-primary-50/50"
        style={{ transition: 'top 0.5s ease-in-out' }}
      >
        <div className="flex w-full h-full">
          <div id="Home" className="header-title flex max-w-[25%] flex-grow justify-between">
            <div
              className={`w-full text-primary-650 hover:text-primary-750 text-2xl font-bold leading-relaxed font-mono text-center content-center cursor-pointer`}
              onClick={() => (window.location.href = '#')}
            >
              {home_name}
            </div>
            <div className="h-[60%] w-1 my-auto border-0 rounded dark:bg-primary-100 content-center" />
          </div>
          {/* Desktop Navigation */}
          <div className="flex flex-grow justify-evenly">
            {menuList.map((menu: MenuLabel) => (
              <Button
                key={menu.url}
                label={menu.label}
                onClick={() => (window.location.href = menu.url)}
                text
                className={`hover:text-primary-750 text-lg no-outline hover:bg-transparent font-mono ${menu.isCurrent ? 'text-primary-850 font-bold' : 'text-primary-600'}`}
              />
            ))}
          </div>
        </div>
      </header>
      {/*Screen*/}
      <header
        className={`md:hidden flex w-full fixed top-0 left-0 right-0 z-10 backdrop-blur-md bg-primary-50/50 duration-75 ${isMobileOpen ? 'h-screen flex-col justify-between ' : ' h-[8%] flex-row '}`}
      >
        <div className={`flex flex-row w-full ${isMobileOpen ? 'h-[8%]' : ''}`}>
          <div id="Home" className="header-title flex flex-grow justify-between">
            <div
              className={`w-full text-primary-650 hover:text-primary-750 text-2xl font-bold leading-relaxed font-mono text-center content-center cursor-pointer`}
              onClick={() => (window.location.href = '#')}
            >
              {home_name}
            </div>
          </div>
          {/* Mobile Navigation Icon */}
          <div className="flex items-center	flex-grow justify-end mr-[5%] ">
            <Hamburger toggled={isMobileOpen} toggle={() => setIsMobileOpen(!isMobileOpen)} color={'#026685'} />
          </div>
        </div>
        {isMobileOpen && (
          <div className="flex flex-col w-full h-[92%] justify-evenly">
            {menuList.map((menu: MenuLabel) => (
              <Button
                key={menu.url}
                label={menu.label}
                onClick={() => {
                  setIsMobileOpen(false)
                  window.location.href = menu.url
                }}
                text
                className={`hover:text-primary-750 text-lg no-outline hover:bg-transparent font-mono ${menu.isCurrent ? 'text-primary-850 font-bold' : 'text-primary-600'}`}
              />
            ))}
          </div>
        )}
      </header>
    </>
  )
}

// <header
//   className="h-[8%] md:h-full md:py-[20%] fixed top-0 left-0 right-0 z-10 backdrop-blur-md bg-primary-50/50"
//   style={{ transition: 'top 0.5s ease-in-out' }}
// >
//   <div className="flex h-full  md:flex-col ">
//     <div id="Home" className="header-title w-[20%] md:w-full md:h-2/6 flex flex-row md:flex-col justify-between">
//       <div
//         className={`w-full text-primary-650 hover:text-primary-750 text-2xl font-bold leading-relaxed font-mono text-center content-center cursor-pointer`}
//         onClick={() => (window.location.href = '#')}
//       >
//         {home_name}
//       </div>
//       <div className="h-[60%] md:h-1 my-auto w-1 md:w-[60%] md:mx-auto border-0 rounded dark:bg-primary-100 content-center" />
//     </div>
//     <div className="w-[80%] flex md:flex-col md:w-full h-[100%] justify-evenly">
//       {menuList.map((menu: MenuLabel) => (
//         <Button
//           key={menu.url}
//           label={menu.label}
//           onClick={() => (window.location.href = menu.url)}
//           text
//           className={`hover:text-primary-750 text-lg no-outline hover:bg-transparent font-mono ${menu.isCurrent ? 'text-primary-850 font-bold' : 'text-primary-600'}`}
//         />
//       ))}
//     </div>
//   </div>
// </header>
