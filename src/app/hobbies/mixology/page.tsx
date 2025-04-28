'use client'

import React from 'react'
import AnimatedOnScroll from '@/app/components/animatedOnScroll/animatedOnScroll'
import Slider from '@/app/components/slider/slider'
import usePage from '@/app/hobbies/mixology/usePage'
import RadioGroup from '@/app/components/radioGroup/radioGroup'


export default function Page() {
  const {
    alcohol,
    handleAlcoholChange,
    water,
    handleWaterChange,
    finalPercentage,
    handleFinalPercentageChange,
    zest,
    handleZestChange,
    sugar,
    handleSugarChange,
    sugarContent,
    handleSugarContentChange,
    totalVolume,
    handleTotalVolumeChange,
    intensity,
    handleIntensityChange,
    macerationTime,
    handleMacerationTimeChange,
    flavour,
    handleFlavourChange,
  } = usePage()

  return (
    <div className="	overflow-hidden font-mono bg-primary-50 flex pt-[8vh] min-h-screen ">

      <div className="header-item scroll-mt-[8%] mt-[2%] text-primary-600 flex w-full flex-col " id="liqueurs" header-label="Liqueurs Calculator">
        <div className="w-full flex justify-center">
          <AnimatedOnScroll className=" mb-6 font-bold text-3xl md:text-5xl ">Liqueurs Calculator</AnimatedOnScroll>
        </div>

        <div className="w-full h-full flex md:flex-row flex-col gap-4 p-4">
          <div className="order-1 md:order-1 flex-grow-[2] basis-0 h-full space-y-8">
            <Slider label="Alcohol 96%" unit={'mL'} value={alcohol.value} onChange={handleAlcoholChange} min={alcohol.min} max={alcohol.max} step={alcohol.step} />
            <Slider label="Water" unit={'mL'} value={water.value} onChange={handleWaterChange} min={water.min} max={water.max} step={alcohol.step} />
            <Slider label="Sugar" unit={'g'} value={sugar.value} onChange={handleSugarChange} min={sugar.min} max={sugar.max} step={sugar.step} />
            <Slider label="Zest" unit={'g'} value={zest.value} onChange={handleZestChange} min={zest.min} max={zest.max} step={zest.step} />
            <RadioGroup label={'Maceration Time'} value={macerationTime.value} options={macerationTime.options} onChange={handleMacerationTimeChange} />
          </div>
          <div className="order-3 md:order-2 flex-grow-[1] basis-0 bg-green-500 h-full">
            BOTTLE
          </div>
          <div className="order-2 md:order-3 flex-grow-[2] basis-0  h-full space-y-4">
            <Slider label="Liqueur alcohol" unit={'%'} value={finalPercentage.value} onChange={handleFinalPercentageChange} min={finalPercentage.min} max={finalPercentage.max} step={alcohol.step} />
            <Slider label="Sugar content" unit={'g/L'} value={sugarContent.value} onChange={handleSugarContentChange} min={sugarContent.min} max={sugarContent.max} step={sugarContent.step} />
            <Slider label="Total Volume" unit={'mL'} value={totalVolume.value} onChange={handleTotalVolumeChange} min={totalVolume.min} max={totalVolume.max} step={totalVolume.step} />
            <RadioGroup label={'Intensity'} value={intensity.value} options={intensity.options} onChange={handleIntensityChange} />
            <RadioGroup label={'Flavour'} value={flavour.value} options={flavour.options} onChange={handleFlavourChange} />
          </div>
        </div>

      </div>


    </div>
  )
}
