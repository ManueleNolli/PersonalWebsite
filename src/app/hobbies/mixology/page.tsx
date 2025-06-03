'use client'

import React from 'react'
import AnimatedOnScroll from '@/app/components/animatedOnScroll/animatedOnScroll'
import Slider from '@/app/components/slider/slider'
import usePage from '@/app/hobbies/mixology/usePage'
import RadioGroup from '@/app/components/radioGroup/radioGroup'

const castValue = (value: number, step: number) => {
  const decimalPlaces = step.toString().split('.')[1]?.length || 0
  const factor = Math.pow(10, decimalPlaces)
  return Math.round(value * factor) / factor
}

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
            <Slider label="Alcohol 96%" unit={'mL'} value={castValue(alcohol.value, alcohol.step)} onChange={handleAlcoholChange} min={castValue(alcohol.min, alcohol.step)}
                    max={castValue(alcohol.max, alcohol.step)} step={alcohol.step} />
            <Slider label="Water" unit={'mL'} value={castValue(water.value, water.step)} onChange={handleWaterChange} min={castValue(water.min, water.step)} max={castValue(water.max, water.step)}
                    step={water.step} />
            <Slider label="Sugar" unit={'g'} value={castValue(sugar.value, sugar.step)} onChange={handleSugarChange} min={castValue(sugar.min, sugar.step)} max={castValue(sugar.max, sugar.step)}
                    step={sugar.step} />
            <Slider label="Zest" unit={'g'} value={castValue(zest.value, zest.step)} onChange={handleZestChange} min={castValue(zest.min, zest.step)} max={castValue(zest.max, zest.step)}
                    step={zest.step} />
            <RadioGroup label={'Maceration Time'} value={macerationTime.value} options={macerationTime.options} onChange={handleMacerationTimeChange} />
          </div>
          <div className="order-3 md:order-2 flex-grow-[1] basis-0 bg-green-500 h-full">
            BOTTLE
          </div>
          <div className="order-2 md:order-3 flex-grow-[2] basis-0  h-full space-y-4">
            <Slider label="Liqueur alcohol" unit={'%'} value={castValue(finalPercentage.value, finalPercentage.step)} onChange={handleFinalPercentageChange}
                    min={castValue(finalPercentage.min, finalPercentage.step)} max={castValue(finalPercentage.max, finalPercentage.step)} step={alcohol.step} />
            <Slider label="Sugar content" unit={'g/L'} value={castValue(sugarContent.value, sugarContent.step)} onChange={handleSugarContentChange} min={castValue(sugarContent.min, sugarContent.step)}
                    max={castValue(sugarContent.max, sugarContent.step)} step={sugarContent.step} />
            <Slider label="Total Volume" unit={'mL'} value={castValue(totalVolume.value, totalVolume.step)} onChange={handleTotalVolumeChange} min={castValue(totalVolume.min, totalVolume.step)}
                    max={castValue(totalVolume.max, totalVolume.step)} step={totalVolume.step} />
            <RadioGroup label={'Intensity'} value={intensity.value} options={intensity.options} onChange={handleIntensityChange} />
            <RadioGroup label={'Flavour'} value={flavour.value} options={flavour.options} onChange={handleFlavourChange} />
          </div>
        </div>

      </div>


    </div>
  )
}
