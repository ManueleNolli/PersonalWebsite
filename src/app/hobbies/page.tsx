import React from 'react'
import AnimatedOnScroll from '@/app/components/animatedOnScroll/animatedOnScroll'
import PolygonMaskParticles from '@/app/components/particles/polygonMaskParticles'
import Link from 'next/link'


export default function Hobbies() {

  const renderDivider = () => {
    return <div className="w-48 h-1 mx-auto md:my-4 border-0 rounded my-10 dark:bg-primary-100" />
  }

  const renderIntroduction = () => {
    return (
      <div className="header-item scroll-mt-[8%] text-primary-50 flex md:flex-row flex-col min-h-svh " id="introduction" header-label="Introduction" >
        <div className="flex items-center justify-center flex-col w-full">
          <AnimatedOnScroll className=" mb-6 font-bold text-3xl md:text-5xl">Hobbies Introduction</AnimatedOnScroll>
          <AnimatedOnScroll className=" w-3/4 text-center md:text-justify leading-loose text-lg md:text-2xl ">
            Welcome to my pages where I share some of my hobbies. From sport, mixology to photography.
            Welcome to my pages where I share some of my hobbies. From sport, mixology to photography.
            Welcome to my pages where I share some of my hobbies. From sport, mixology to photography.
            Welcome to my pages where I share some of my hobbies. From sport, mixology to photography.
          </AnimatedOnScroll>
        </div>

      </div>
    )
  }

  const renderMixology = () => {
    return (
      <div className="header-item scroll-mt-[8%] text-primary-50 flex md:flex-row flex-col min-h-svh" id="mixology" header-label="Mixology" >
        <div className="md:w-1/2 w-full h-[50vh] md:h-screen px-8 md:px-0">
          <PolygonMaskParticles url={'/assets/cocktail.svg'} id="particlesCocktail" />
        </div>
        <div className="flex items-center justify-center flex-col w-full md:w-1/2 mt-8 md:mt-0">
          <AnimatedOnScroll className=" mb-6 font-bold text-3xl md:text-5xl">Mixology</AnimatedOnScroll>
          <AnimatedOnScroll className=" w-3/4 text-center md:text-justify leading-loose text-lg md:text-2xl ">
            Did you ever struggled to find the best recipe to an home-made <span className={'italic text-yellow-400'}>limoncino</span>? Or what about a <span
            className={'italic text-green-400'}>basilichello</span> and a <span className={'italic text-green-600'}>mentolino</span>?
          </AnimatedOnScroll>

          <AnimatedOnScroll className=" w-3/4 text-center md:text-justify leading-loose text-lg md:text-2xl mt-8">
            Here you can find my <a className={'font-extrabold hover:text-primary-600'} href={'hobbies/mixology'}>calculator</a> with all the recipes to make your own home-made liqueurs. 🥃
          </AnimatedOnScroll>
        </div>

      </div>
    )
  }


  return (
    <div className="max-w-max	overflow-hidden font-mono bg-primary-800">

      {renderIntroduction()}

      {renderDivider()}

      {renderMixology()}

    </div>
  )
}

