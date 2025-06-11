'use client'

import React from 'react'
import Slider from '@/app/components/slider/slider'
import RadioGroup from '@/app/components/radioGroup/radioGroup'
import useLiqueursCalculator, { Intensity } from '@/app/hobbies/mixology/calculator/useLiqueursCalculator'
import { Flavour, Liqueur } from '@/app/constants/liqueursIngredients'

const castValue = (value: number, step: number) => {
  const decimalPlaces = step.toString().split('.')[1]?.length || 0
  const factor = Math.pow(10, decimalPlaces)
  return Math.round(value * factor) / factor
}

type LiqueursCalculatorProps = {
  liqueur: Liqueur
}

const flavourOptions = Object.values(Flavour).map((value) => value as Flavour)

export default function LiqueursCalculator({ liqueur }: LiqueursCalculatorProps) {
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
    ingredient,
    ingredientMetadata,
    handleIngredientChange,
    sugar,
    water,
    totalVolume,
    intensity,
    intensityOptions,
    macerationTime,
    macerationTimeOptions,
    handleMacerationTimeChange,
    flavour,
  } = useLiqueursCalculator({ liqueur })

  function renderDependentValue(name: string, unit: string, value: number, step: number) {
    return (
      <div className="flex flex-col w-full justify-center items-center">
        <label className="text-primary-600 text-sm font-bold text-center">{name}</label>
        <span>{castValue(value, step)} {unit}</span>
      </div>
    )
  }

  return (
    <div className="w-full h-full flex md:flex-row flex-col gap-4 p-4">
      <div className="order-1 md:order-1 flex-grow-[2] basis-0 h-full space-y-8">
        <Slider label="Alcohol 96%" unit={'mL'} value={castValue(alcohol, alcoholMetadata.step)} onChange={handleAlcoholChange} min={castValue(alcoholMetadata.min, alcoholMetadata.step)}
                max={castValue(alcoholMetadata.max, alcoholMetadata.step)} step={alcoholMetadata.step} />
        <Slider label="Alcohol by Volume" unit={'%'} value={castValue(finalPercentage, finalPercentageMetadata.step)} onChange={handleFinalPercentageChange}
                min={castValue(finalPercentageMetadata.min, finalPercentageMetadata.step)} max={castValue(finalPercentageMetadata.max, finalPercentageMetadata.step)}
                step={finalPercentageMetadata.step} />

        <Slider label="Sugar content" unit={'g/L'} value={castValue(sugarContent, sugarContentMetadata.step)} onChange={handleSugarContentChange}
                min={castValue(sugarContentMetadata.min, sugarContentMetadata.step)}
                max={castValue(sugarContentMetadata.max, sugarContentMetadata.step)} step={sugarContentMetadata.step} />

        <Slider label={liqueur.property.partToBeMacerated} unit={'g'} value={castValue(ingredient, ingredientMetadata.step)} onChange={handleIngredientChange} min={castValue(ingredientMetadata.min, ingredientMetadata.step)}
                max={castValue(ingredientMetadata.max, ingredientMetadata.step)}
                step={ingredientMetadata.step} />
        <RadioGroup<string> label={'Maceration Time'} value={macerationTime} options={macerationTimeOptions} onChange={handleMacerationTimeChange} />
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
  )
}
