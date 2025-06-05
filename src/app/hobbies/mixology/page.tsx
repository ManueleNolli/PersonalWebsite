'use client'

import React from 'react'
import AnimatedOnScroll from '@/app/components/animatedOnScroll/animatedOnScroll'
import Slider from '@/app/components/slider/slider'
import usePage, { Flavour, Intensity, MacerationTime } from '@/app/hobbies/mixology/usePage'
import RadioGroup from '@/app/components/radioGroup/radioGroup'

const castValue = (value: number, step: number) => {
  const decimalPlaces = step.toString().split('.')[1]?.length || 0
  const factor = Math.pow(10, decimalPlaces)
  return Math.round(value * factor) / factor
}

export default function Page() {
  const {
    alcohol,
    alcoholMetadata,
    handleAlcoholChange,
    finalPercentage,
    finalPercentageMetadata,
    handleFinalPercentageChange,
    sugarContent,
    sugarContentMetadata,
    handleSugarContentChange,
    zest,
    zestMetadata,
    handleZestChange,
    sugar,
    water,
    totalVolume,
    intensity,
    intensityOptions,
    macerationTime,
    macerationTimeOptions,
    handleMacerationTimeChange,
    flavour,
    flavourOptions,
  } = usePage()

  function renderDependentValue(name: string, unit: string, value: number, step: number) {
    return (
      <div className="flex flex-col w-full justify-center items-center">
        <label className="text-primary-600 text-sm font-bold text-center">{name}</label>
        <span>{castValue(value, step)} {unit}</span>
      </div>
    )
  }

  return (
    <div className="	overflow-hidden font-mono bg-primary-50 flex pt-[8vh] min-h-screen ">

      <div className="header-item scroll-mt-[8%] mt-[2%] text-primary-600 flex w-full flex-col " id="liqueurs" header-label="Liqueurs Calculator">
        <div className="w-full flex justify-center">
          <AnimatedOnScroll className=" mb-6 font-bold text-3xl md:text-5xl ">Liqueurs Calculator</AnimatedOnScroll>
        </div>

        <div className="w-full h-full flex md:flex-row flex-col gap-4 p-4">
          <div className="order-1 md:order-1 flex-grow-[2] basis-0 h-full space-y-8">
            <Slider label="Alcohol 96%" unit={'mL'} value={castValue(alcohol, alcoholMetadata.step)} onChange={handleAlcoholChange} min={castValue(alcoholMetadata.min, alcoholMetadata.step)}
                    max={castValue(alcoholMetadata.max, alcoholMetadata.step)} step={alcoholMetadata.step} />
            <Slider label="Liqueur alcohol" unit={'%'} value={castValue(finalPercentage, finalPercentageMetadata.step)} onChange={handleFinalPercentageChange}
                    min={castValue(finalPercentageMetadata.min, finalPercentageMetadata.step)} max={castValue(finalPercentageMetadata.max, finalPercentageMetadata.step)}
                    step={finalPercentageMetadata.step} />

            <Slider label="Sugar content" unit={'g/L'} value={castValue(sugarContent, sugarContentMetadata.step)} onChange={handleSugarContentChange} min={castValue(sugarContentMetadata.min, sugarContentMetadata.step)}
                    max={castValue(sugarContentMetadata.max, sugarContentMetadata.step)} step={sugarContentMetadata.step} />

            <Slider label="Zest" unit={'g'} value={castValue(zest, zestMetadata.step)} onChange={handleZestChange} min={castValue(zestMetadata.min, zestMetadata.step)}
                    max={castValue(zestMetadata.max, zestMetadata.step)}
                    step={zestMetadata.step} />
            <RadioGroup<MacerationTime> label={'Maceration Time'} value={macerationTime} options={macerationTimeOptions} onChange={handleMacerationTimeChange} />
          </div>
          <div className="order-3 md:order-2 flex-grow-[1] basis-0 bg-green-500 h-full">
            BOTTLE
          </div>
          <div className="order-2 md:order-3 flex-grow-[2] basis-0  h-full space-y-4">
            {renderDependentValue('Water', 'mL', water, 1)}
            {renderDependentValue('Sugar', 'g', sugar, 1)}
            {renderDependentValue('Total Volume', 'mL', totalVolume, 1)}
            <RadioGroup<Intensity> label={'Intensity'} value={intensity} options={intensityOptions} onChange={() => {
            }} disabled />
            <RadioGroup<Flavour> label={'Flavour'} value={flavour} options={flavourOptions} onChange={() => {
            }} disabled />
          </div>
        </div>

      </div>


    </div>
  )
}
