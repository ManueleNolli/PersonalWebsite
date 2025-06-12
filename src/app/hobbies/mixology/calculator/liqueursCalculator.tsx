'use client'

import React from 'react'
import Slider from '@/app/components/slider/slider'
import RadioGroup from '@/app/components/radioGroup/radioGroup'
import useLiqueursCalculator, { AlcoholConstants, Intensity, intensityOptions, IntensityThresholdsPercentage, stepOptions } from '@/app/hobbies/mixology/calculator/useLiqueursCalculator'
import { Flavour, Liqueur } from '@/app/constants/liqueursIngredients'
import ToggleableContent from '@/app/components/toggleableContent/toggleableContent'
import InputNumber from '@/app/components/inputNumber/inputNumber'
import LiqueurGraph from '@/app/components/liqueurGraph/liqueurGraph'

import 'katex/dist/katex.min.css'
import { BlockMath } from 'react-katex'
import BottleImage from '@/app/hobbies/mixology/calculator/bottleImage'

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
    macerationTime,
    macerationTimeOptions,
    handleMacerationTimeChange,
    flavour,
    step,
    handleStepChange,
    maxAlcohol,
    handleMaxAlcoholChange,
    alcoholPercentage,
    handleAlcoholPercentageChange,
    maxSugarContent,
    handleMaxSugarContentChange,
    computeTotalVolume
  } = useLiqueursCalculator({ liqueur })

  function renderDependentValue(name: string, unit: string, value: number, step: number, details?: string) {
    return (
      <div className="flex flex-col w-full justify-center items-center ">
        <label className="text-primary-600 text-sm font-bold text-center">{name}</label>
        {details && <p className="text-xs text-primary-300">{details}</p>}
        <span>{castValue(value, step)} {unit}</span>
      </div>
    )
  }

  function renderAdvancedSettings(name: string, value: number, unit: string, onChange: (value: number) => void, min?: number, max?: number) {
    return (
      <div className={'w-full flex flex-col items-center  '}>
        <label htmlFor={name} className="text-primary-600 text-sm font-bold text-left">{name}</label>
        <div className={'w-full flex items-center justify-center '}>
          <InputNumber label={name} value={value} min={min} max={max} onChange={onChange} additionalStyle={'max-w-[5em] min-w-[5em]  '} />
          <span className="text-primary-600 text-sm font-bold ml-1 text-left min-w-[3rem]">{unit}</span>
        </div>
      </div>

    )
  }

  function renderRecipeStep(stepNumber: number, title: string, description: string) {
    return (
      <div className="flex flex-col w-full justify-center items-start p-2  rounded-md">
        <h3 className="text-primary-600 font-bold mb-1">Step {stepNumber}: {title}</h3>
        <p className="text-primary-800 text-sm">{description}</p>
      </div>
    )
  }

  const Formula = ({ latex, label, symbol, symbolVerification }: { latex: string; label: string, symbol: string, symbolVerification: string }) => (
    <div>
      <BlockMath math={`\\textbf{${label}} \\ [${symbol}]`} />
      <BlockMath math={`${latex} \\quad [${symbolVerification}]`} />
    </div>
  )

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="w-full  flex md:flex-row flex-col gap-4 p-4">
        <div className="order-1 md:order-1 flex-grow-[2] basis-0 h-full space-y-8">
          <Slider label={`Alcohol ${alcoholPercentage}%`} unit={'mL'} value={castValue(alcohol, alcoholMetadata.step)} onChange={handleAlcoholChange}
                  min={castValue(alcoholMetadata.min, alcoholMetadata.step)}
                  max={castValue(alcoholMetadata.max, alcoholMetadata.step)} step={alcoholMetadata.step} />
          <Slider label="Alcohol by Volume" unit={'%'} value={castValue(finalPercentage, finalPercentageMetadata.step)} onChange={handleFinalPercentageChange}
                  min={castValue(finalPercentageMetadata.min, finalPercentageMetadata.step)} max={castValue(finalPercentageMetadata.max, finalPercentageMetadata.step)}
                  step={finalPercentageMetadata.step} />

          <Slider label="Sugar content" unit={'g/L'} value={castValue(sugarContent, sugarContentMetadata.step)} onChange={handleSugarContentChange}
                  min={castValue(sugarContentMetadata.min, sugarContentMetadata.step)}
                  max={castValue(sugarContentMetadata.max, sugarContentMetadata.step)} step={sugarContentMetadata.step} />

          <Slider label={liqueur.property.partToBeMacerated} unit={'g'} value={castValue(ingredient, ingredientMetadata.step)} onChange={handleIngredientChange}
                  min={castValue(ingredientMetadata.min, ingredientMetadata.step)}
                  max={castValue(ingredientMetadata.max, ingredientMetadata.step)}
                  step={ingredientMetadata.step} />
          <RadioGroup<string> label={'Maceration Time'} value={macerationTime} options={macerationTimeOptions} onChange={handleMacerationTimeChange} />
        </div>
        <div className="order-3 md:order-2 flex-grow-[1] basis-0 h-full ">
          <BottleImage
            max={computeTotalVolume(alcoholMetadata.max, ingredientMetadata.min, finalPercentageMetadata.min)}
            value={castValue(totalVolume, 1)}
            ingredientColor={intensity === Intensity.LIGHT ? liqueur.property.colors.light : intensity === Intensity.MEDIUM ? liqueur.property.colors.medium : liqueur.property.colors.strong}
            sugarContentPercentage={castValue(sugarContent, sugarContentMetadata.step) / maxSugarContent}
            macerationPercentage={(macerationTimeOptions.indexOf(macerationTime) + 1) / macerationTimeOptions.length}
          />
        </div>
        <div className="order-2 md:order-3 flex-grow-[2] basis-0  h-full space-y-4">
          {renderDependentValue('Water', 'mL', water, step.value)}
          {renderDependentValue('White Sugar', 'g', sugar, step.value)}
          {renderDependentValue('Total Volume', 'mL', totalVolume, step.value, 'No alcohol contraction')}
          <RadioGroup<Intensity> label={'Intensity'} value={intensity} options={intensityOptions} onChange={() => {
          }} disabled />
          <RadioGroup<Flavour> label={'Flavour'} value={flavour} options={flavourOptions} onChange={() => {
          }} disabled />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">

        <div className="space-y-8">
          <ToggleableContent title={'Advanced Settings'}>
            <div className={'w-full flex flex-col items-center space-y-4 mb-4'}>
              <RadioGroup<string> label={'Step'} value={step.label} options={stepOptions.map((s) => s.label)} onChange={handleStepChange} />
              {renderAdvancedSettings('Max Alcohol', maxAlcohol, 'ml', handleMaxAlcoholChange, alcoholMetadata.min)}
              {renderAdvancedSettings('Max Sugar Content', maxSugarContent, 'g/L', handleMaxSugarContentChange, sugarContentMetadata.min)}
              {renderAdvancedSettings('Alcohol Percentage', alcoholPercentage, '%', handleAlcoholPercentageChange, AlcoholConstants.MIN_ALCOHOL_PERCENTAGE, AlcoholConstants.MAX_ALCOHOL_PERCENTAGE)}
            </div>

          </ToggleableContent>


        </div>

        <div className="space-y-8">
          <ToggleableContent title={'Recipe'}>
            <div className={'m-4'}>
              <p className={'text-primary-600 text-sm font-bold italic'}>
                Before starting, make sure all your equipment (jars, utensils, bottles, and funnels) are thoroughly washed and sterilized.
                You can sterilize by boiling them in water for 20 minutes, this prevents contamination and improves shelf life.
              </p>

              {renderRecipeStep(1, '🌿 Prepare the Ingredient', `Weigh out ${ingredient} g of ${liqueur.property.partToBeMacerated}. Cut them if needed to maximize surface area.`)}
              {renderRecipeStep(2, '🧪 Add Alcohol', `Pour ${castValue(alcohol, alcoholMetadata.step)} mL of alcohol at ${alcoholPercentage}% ABV into a clean, sterilized jar. Add the prepared ingredient and seal the jar tightly.`)}
              {renderRecipeStep(3, '⌛ Macerate', `Place the jar in a cool, dark place for ${macerationTime}. Shake it gently sometimes to help the extraction process.`)}
              {renderRecipeStep(4, '🫙 Filter the Infusion', 'Strain the mixture using a fine filter, cheesecloth, or coffee filter. Repeat filtration if necessary for clarity.')}
              {renderRecipeStep(5, '🍯 Add Sugar and Water', `Gently heat ${castValue(sugar, step.value)} g of sugar in ${castValue(water, step.value)} mL of water in a saucepan until dissolved. Let it cool.`)}
              {renderRecipeStep(6, '🏷️ Bottle and Rest', 'Transfer the liqueur into a clean bottle. Label it with the date and ingredients. Let it rest for 1 week (or more) in a cool place to allow the flavors to blend and stabilize.')}
              {renderRecipeStep(7, '📋 Final Stats (Estimated)', `
              You will have approximately ${castValue(totalVolume, step.value)} mL of liqueur with an alcohol content of ${castValue(finalPercentage, finalPercentageMetadata.step)}% ABV and a sugar content of ${castValue(sugarContent, sugarContentMetadata.step)} g/L.
              The intensity is ${intensity} and the flavour is ${flavour}.
              `)}
            </div>
          </ToggleableContent>
        </div>

        <div className="md:col-span-2">

          <ToggleableContent title={'Advanced Information'}>
            <div className={'w-full flex flex-col items-center mb-4'}>
              <div className={'w-full overflow-hidden mb-0 pb-0 h-auto'}>

                <p className={'text-primary-600 text-sm font-bold italic'}>
                  Below are exposed all the computation steps and formulas used to calculate the values of the liqueur.
                </p>

                <BlockMath math={`
                \\begin{array}{llll}
                \\hline
                \\textbf{Variable} & \\textbf{Symbol} & \\textbf{Unit} & \\textbf{Type} \\\\
                \\hline
                \\text{Alcohol} & a & \\text{ml} & \\text{Independent} \\\\
                \\text{Ingredient} & i & \\text{g} & \\text{Dependent (from alcohol)} \\\\
                \\text{Alcohol by Volume} & f & \\% & \\text{Independent} \\\\
                \\text{Sugar Content} & sC & \\text{g/L} & \\text{Independent} \\\\
                \\text{Maceration Time} & mT & \\text{${macerationTimeOptions.reduce((acc, option) => acc + option + ' |  ', '').slice(0, -3)}} & \\text{Independent} \\\\
                \\text{Sugar} & g & \\text{g} & \\text{Dependent} \\\\
                \\text{Total Volume} & t & \\text{ml} & \\text{Dependent} \\\\
                \\text{Intensity} & in & \\text{Light} \\mid \\text{Medium} \\mid \\text{Strong} & \\text{Dependent} \\\\
                \\text{Flavour} & fl & \\text{Fresh and delicate} \\mid \\text{Balanced} \\mid \\text{Rich and full} & \\text{Dependent} \\\\
                \\hline
                \\end{array}
                `} />

                <BlockMath math={`
                \\begin{array}{llll}
                \\hline
                \\textbf{Constant} & \\textbf{Value}\\\\
                \\hline
                \\text{After Maceration Percentage} & ${liqueur.property.afterMacerationPercentage}\\% \\\\
                \\text{Sugar Conversion Factor} & 0.625 \\\\
                \\text{Water in ${liqueur.property.partToBeMacerated} Percentage} & ${liqueur.property.ingredientWaterPercentage}\\% \\\\
                \\hline
                \\end{array}
                `} />


                <Formula
                  label="Sugar Volume"
                  symbol="sV"
                  latex="sV = s \cdot 0.625"
                  symbolVerification="ml \cdot \frac{g}{ml} = g"
                />

                <Formula
                  label="Macerated Volume"
                  symbol="mV"
                  latex={`mV = a \\cdot \\frac{${liqueur.property.afterMacerationPercentage}}{100}`}
                  symbolVerification="ml \cdot \% = ml"
                />

                <Formula
                  label={`Water in ${liqueur.property.partToBeMacerated}`}
                  symbol="wI"
                  latex={`wI = z \\cdot \\frac{${liqueur.property.ingredientWaterPercentage}}{100}`}
                  symbolVerification="ml \cdot \% = ml"
                />

                <Formula
                  label="Macerated Alcohol Percentage"
                  symbol="mA\%"
                  latex={`mA\\% = \\frac{a \\cdot ${alcoholPercentage}}{a + wI}`}
                  symbolVerification="\frac{ml \cdot \%}{ml + ml} = \%"
                />

                <Formula
                  label="Total Volume"
                  symbol="t"
                  latex={`t = w + sV + mV`}
                  symbolVerification="ml + ml + ml = ml"
                />

                <Formula
                  label="Alcohol By Volume"
                  symbol="f"
                  latex="f = \frac{mV \cdot mA\%}{t}"
                  symbolVerification="\frac{ml \cdot \%}{ml} = \%"
                />

                <Formula
                  label="Sugar Content"
                  symbol="sC"
                  latex={`sC = \\frac{s}{t} \\cdot 1000`}
                  symbolVerification="\frac{g}{ml} \cdot 1000 = g/L"
                />

                <Formula
                  label={'Flavour'}
                  symbol="fl"
                  latex={`fl(mT) = \\begin{cases}
                  ${macerationTimeOptions.map((option) => `\\text{${liqueur.property.computeFlavour(option)}} & \\text{if } mT = \\text{${option}}`).join(' \\\\ ')}
                  \\end{cases}`}
                  symbolVerification={`\\text{Fresh and delicate} \\mid \\text{Balanced} \\mid \\text{Rich and full}`}
                />

                <Formula
                  label={'Intensity'}
                  symbol="in"
                  latex={`
    in = \\begin{cases}
      \\text{Light} & \\text{if } \\frac{i}{a} \\cdot 100 < ${IntensityThresholdsPercentage.LIGHT} \\\\
      \\text{Medium} & \\text{if } \\frac{i}{a} \\cdot 100 < ${IntensityThresholdsPercentage.MEDIUM}  \\\\
      \\text{Strong} & \\text{otherwise}
    \\end{cases}
  `}
                  symbolVerification="\text{Light | Medium | Strong}"
                />

                <p className={'text-primary-600 text-sm font-bold italic'}>
                  Solving the equations above from specific values, it results in the following values:
                </p>

                <Formula
                  label={'Total Volume'}
                  symbol="t"
                  latex={`t = \\frac{${liqueur.property.afterMacerationPercentage} \\cdot ${alcoholPercentage} \\cdot a² }{f \\cdot (a + wI)}`}
                  symbolVerification="\frac{\% \cdot ml²}{\% \cdot (ml + ml)} = ml"
                />

                <Formula
                  label={'Sugar'}
                  symbol="s"
                  latex={`s = \\frac{${liqueur.property.afterMacerationPercentage} \\cdot ${alcoholPercentage} \\cdot a² }{f \\cdot (a + wI)} \\cdot \\frac{sC}{1000}`}
                  symbolVerification="ml \cdot \frac{g/L}{1000} = g"
                />
              </div>

              <p className={'text-primary-600 text-sm font-bold italic mt-4'}>
                The liqueur graph below illustrates the relationships between the components of the liqueur.
                It shows how the values of the liqueur are interconnected and how they affect each other.
              </p>
              <LiqueurGraph partToBeMacerated={liqueur.property.partToBeMacerated} />
            </div>
          </ToggleableContent>
        </div>

      </div>

    </div>
  )
}
