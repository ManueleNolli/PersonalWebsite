'use client'

import React from 'react'
import AnimatedOnScroll from '@/app/components/animatedOnScroll/animatedOnScroll'
import usePage from '@/app/hobbies/mixology/usePage'
import LiqueursCalculator from '@/app/hobbies/mixology/calculator/liqueursCalculator'
import { Image } from 'primereact/image'
import { Liqueur, liqueurs } from '@/app/constants/liqueursIngredients'


export default function Page() {
  const { selectedLiqueur, setSelectedLiqueur } = usePage()

  function renderIngredient(liqueur: Liqueur) {
    return (
      <div className="flex flex-col items-center">
        <Image src={liqueur.ingredient.imagePath} alt={liqueur.ingredient.name} className={`rounded-lg shadow-lg w-24 h-24 p-4 ${liqueur == selectedLiqueur ? 'bg-primary-400' : ''}`} />
        <span className="text-primary-600 text-sm font-bold mt-2 text-center">{liqueur.ingredient.name}</span>
      </div>
    )
  }

  return (
    <div className="overflow-hidden font-mono bg-primary-50 flex pt-[8vh] min-h-screen pb-4">
      <div className="header-item scroll-mt-[8%] mt-[2%] text-primary-600 flex w-full flex-col" id="liqueurs" header-label="Liqueurs Calculator">
        <div className="w-full flex justify-center">
          <AnimatedOnScroll className=" mb-6 font-bold text-3xl md:text-5xl ">Liqueurs Calculator</AnimatedOnScroll>
        </div>

        <AnimatedOnScroll className="flex overflow-x-scroll space-x-4 rounded-md no-scrollbar px-4">
          {liqueurs.map((liqueur) => (
            <button key={liqueur.ingredient.name} className="cursor-pointer h-full " onClick={() => setSelectedLiqueur(liqueur)}>
              {renderIngredient(liqueur)}
            </button>))}
        </AnimatedOnScroll>

        <AnimatedOnScroll>
          <div className="w-48 h-1 mx-auto md:my-4 border-0 rounded dark:bg-primary-100" />
        </AnimatedOnScroll>

        <div key={selectedLiqueur.ingredient.name} className="flex w-full">
          <AnimatedOnScroll className="flex w-full">
            <LiqueursCalculator liqueur={selectedLiqueur} />
          </AnimatedOnScroll>
        </div>


        <p className={`text-primary-600 text-xs md:text-xs text-center mt-4 px-4`}>
          This page is intended for informational and educational purposes only. The production of alcohol may be subject to local laws and regulations depending on your country or region.
          Before attempting any recipe or method described here, please ensure that you are complying with all applicable laws regarding the production, possession, and consumption of alcohol.
          The authors and maintainers of this content do not assume any responsibility for the use or misuse of this information.
        </p>
      </div>
    </div>
  )
}
