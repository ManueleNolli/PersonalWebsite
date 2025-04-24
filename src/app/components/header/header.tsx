'use client'

import useHeader, { MenuLabel } from '@/app/components/header/useHeader'
import { Button } from 'primereact/button'
import { config } from '@/app/constants/config'
import React, { useState } from 'react'
import { Divide as Hamburger } from 'hamburger-react'


export default function Header() {
  const {
    menuList, isMobileOpen, setIsMobileOpen, isHomePage, goBack,
  } = useHeader()
  const { home_name } = config


  const renderBackIcon = () => {
    return (
      <svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
        <g id="SVGRepo_iconCarrier">
          <g>
            <g>
              <rect width="24" height="24" transform="rotate(90 12 12)" opacity="0"></rect>
              <path d="M13.83 19a1 1 0 0 1-.78-.37l-4.83-6a1 1 0 0 1 0-1.27l5-6a1 1 0 0 1 1.54 1.28L10.29 12l4.32 5.36a1 1 0 0 1-.78 1.64z"></path>
            </g>
          </g>
        </g>
      </svg>
    )
  }

  return (
    <header>
      {/*Screen*/}
      <div
        className="hidden md:flex h-[8%] fixed top-0 left-0 right-0 z-10 backdrop-blur-md bg-primary-50/50"
        style={{ transition: 'top 0.5s ease-in-out' }}
      >
        <div className="flex w-full h-full">
          <div id="Home" className={`header-title flex flex-grow  ${isHomePage ? 'max-w-[25%]' : 'max-w-[30%]'}`}>
            {
              !isHomePage && (
                <div
                  onClick={goBack}
                  className={`hover:text-primary-750 text-primary-650 w-16 flex justify-center items-center cursor-pointer`}
                >
                  {renderBackIcon()}
                </div>
              )}
            <div
              className={`w-full text-primary-650 hover:text-primary-750 text-2xl font-bold leading-relaxed font-mono text-center content-center cursor-pointer`}
              onClick={() => {
                window.location.href = '#'
              }}
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
      </div>
      {/*Mobile*/}
      <div className={isMobileOpen ? 'fixed top-0 left-0 right-0 z-10 h-screen bg-primary-50/50 backdrop-blur-md' : 'hidden'} />
      <div
        className={`md:hidden flex h-[8%] fixed top-0 left-0 right-0 z-10 flex-row ${isMobileOpen ? '' : 'bg-primary-50/50 backdrop-blur-md'}`}
        style={{ transition: 'top 0.5s ease-in-out' }}
      >
        <div className="flex flex-row w-full ">
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

        {/* Mobile Navigation */}
        <div
          className={
            isMobileOpen
              ? 'fixed left-0 right-0 top-[8vh] h-screen w-screen ease-in-out duration-500 '
              : 'ease-in-out duration-500 fixed h-screen left-0 right-0 top-[108vh] '
          }
        >
          <div className="flex flex-col justify-evenly h-[80%]  ">
            {/* Mobile Navigation Items */}
            {menuList.map((menu: MenuLabel) => (
              <Button
                key={menu.url}
                label={menu.label}
                onClick={() => {
                  setIsMobileOpen(false)
                  window.location.href = menu.url
                }}
                text
                className={`hover:text-primary-750  text-lg no-outline hover:bg-transparent font-mono ${menu.isCurrent ? 'text-primary-850 font-bold' : 'text-primary-600'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </header>
  )
}
