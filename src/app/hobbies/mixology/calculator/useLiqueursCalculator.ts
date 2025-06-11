import { useState } from 'react'
import { Flavour, Liqueur } from '@/app/constants/liqueursIngredients'

const stepConstant = 1

const AlcoholConstants = {
  MIN_VOLUME: 10, // ml
  MAX_VOLUME: 1000,
  PERCENTAGE: 96,
}

const SugarConstants = {
  CONVERSION_FACTOR: 0.625, // 1 g of sugar = 0.625 mL of sugar syrup
  MIN_CONTENT: 100, // total sugar content in g/L of total volume
  MAX_CONTENT: 300, // total sugar content in g/L of total volume
}


const LiqueurConstants = {
  MIN_PERCENTAGE: 15, // 15% of alcohol
  MAX_PERCENTAGE: 45, // 45% of alcohol
}


export enum Intensity {
  LIGHT = 'Light',
  MEDIUM = 'Medium',
  STRONG = 'Strong',
}

const intensityOptions = Object.values(Intensity).map((value) => value as Intensity)

// const IntensityThresholds = {
//   LIGHT: 0.17,
//   MEDIUM: 0.24,
// }

const IntensityThresholdsPercentage = {
  LIGHT: 33,
  MEDIUM: 67,
}


type MixologyNumberMetadata = {
  min: number
  max: number
  step: number
}

type useLiqueursCalculatorProps = {
  liqueur: Liqueur
}

export default function useLiqueursCalculator({ liqueur }: useLiqueursCalculatorProps) {
  // Metadata
  const macerationTimeOptions = liqueur.property.macerationTime
  const IngredientConstants = { // TODO: Actual for alcohol 96%
    MIN_PER_100ML: liqueur.property.minIngredientPer100ml,
    MAX_PER_100ML: liqueur.property.maxIngredientPer100ml,
    WATER_PERCENTAGE: liqueur.property.ingredientWaterPercentage,
    MACERATION_PERCENTAGE: liqueur.property.afterMacerationPercentage,
  }

  // Helper functions
  const computeSugarVolume = (sugar: number) => {
    return sugar * SugarConstants.CONVERSION_FACTOR // [g] * [mL/g] = [mL]
  }

  const computeWaterInIngredient = (ingredient: number) => {
    return ingredient * (IngredientConstants.WATER_PERCENTAGE / 100) // [g] * [%] = [g]
  }

  const computeMaceratedVolume = (alcohol: number) => {
    return alcohol * (IngredientConstants.MACERATION_PERCENTAGE / 100) // [mL] * [%] = [mL]
  }

  const computeTotalVolume = (alcohol: number, ingredient: number, finalPercentage: number) => {
    const result = ((AlcoholConstants.PERCENTAGE * (IngredientConstants.MACERATION_PERCENTAGE / 100) * alcohol * alcohol) / (finalPercentage * (alcohol + computeWaterInIngredient(ingredient))))
    return result
  }

  const computeSugar = (totalVolume: number, sugarContent: number) => {
    const result = totalVolume * (sugarContent / 1000)
    return result
  }

  const computeWater = (alcohol: number, totalVolume: number, sugar: number) => {
    const result = totalVolume - computeMaceratedVolume(alcohol) - computeSugarVolume(sugar)
    return result
  }

  const computeIngredient = (alcohol: number, actualRatioPer100ml: number) => {
    const alcohol100mlMultiplier = alcohol / 100
    const ingredient = actualRatioPer100ml * alcohol100mlMultiplier
    return ingredient
  }

  const computeIntensity = (alcohol: number, ingredient: number) => {
    const ingredientAlcoholRatioPercentage = (ingredient / alcohol) * 100

    const ingredientRange = IngredientConstants.MAX_PER_100ML - IngredientConstants.MIN_PER_100ML

    if (ingredientAlcoholRatioPercentage < (IngredientConstants.MIN_PER_100ML + (ingredientRange * IntensityThresholdsPercentage.LIGHT / 100))) {
      return Intensity.LIGHT
    } else if (ingredientAlcoholRatioPercentage < (IngredientConstants.MIN_PER_100ML + (ingredientRange * IntensityThresholdsPercentage.MEDIUM / 100))) {
      return Intensity.MEDIUM
    } else {
      return Intensity.STRONG
    }
  }

  const computeIngredientMetadata = (alcohol: number) => {
    const minIngredient = computeIngredient(alcohol, IngredientConstants.MIN_PER_100ML)
    const maxIngredient = computeIngredient(alcohol, IngredientConstants.MAX_PER_100ML)

    const step = stepConstant
    return {
      min: minIngredient,
      max: maxIngredient,
      step,
    }
  }

  // Data
  const [alcohol, setAlcohol] = useState<number>(liqueur.preset.alcohol)
  const [alcoholMetadata, setAlcoholMetadata] = useState<MixologyNumberMetadata>({
    min: AlcoholConstants.MIN_VOLUME,
    max: AlcoholConstants.MAX_VOLUME,
    step: stepConstant,
  })

  const [finalPercentage, setFinalPercentage] = useState<number>(liqueur.preset.finalPercentage)
  const [finalPercentageMetadata, setFinalPercentageMetadata] = useState<MixologyNumberMetadata>({
    min: LiqueurConstants.MIN_PERCENTAGE,
    max: LiqueurConstants.MAX_PERCENTAGE,
    step: 0.1,
  })


  const [sugarContent, setSugarContent] = useState<number>(liqueur.preset.sugarContent)
  const [sugarContentMetadata, setSugarContentMetadata] = useState<MixologyNumberMetadata>({
    min: SugarConstants.MIN_CONTENT,
    max: SugarConstants.MAX_CONTENT,
    step: stepConstant,
  })

  const [macerationTime, setMacerationTime] = useState<string>(liqueur.preset.macerationTime)

  const [ingredient, setIngredient] = useState<number>(computeIngredient(alcohol, (IngredientConstants.MIN_PER_100ML + IngredientConstants.MAX_PER_100ML) / 2))
  const [ingredientMetadata, setIngredientMetadata] = useState<MixologyNumberMetadata>(computeIngredientMetadata(alcohol))

  const [totalVolume, setTotalVolume] = useState<number>(computeTotalVolume(alcohol, ingredient, finalPercentage))
  const [sugar, setSugar] = useState<number>(computeSugar(totalVolume, sugarContent))
  const [water, setWater] = useState<number>(computeWater(alcohol, totalVolume, sugar))

  const [intensity, setIntensity] = useState<Intensity>(computeIntensity(alcohol, ingredient))
  const [flavour, setFlavour] = useState<Flavour>(liqueur.property.computeFlavour(macerationTime))


  const handleAlcoholChange = (value: number) => {
    const newOldRatio = value / alcohol

    const newIngredient = newOldRatio * ingredient
    setIngredient(newIngredient)

    const newIngredientMetadata = computeIngredientMetadata(value)
    setIngredientMetadata(newIngredientMetadata)

    const newTotalVolume = computeTotalVolume(value, newIngredient, finalPercentage)
    setTotalVolume(newTotalVolume)

    const newSugar = computeSugar(newTotalVolume, sugarContent)
    setSugar(newSugar)

    const newWater = computeWater(value, newTotalVolume, newSugar)
    setWater(newWater)

    setAlcohol(value)
  }

  const handleFinalPercentageChange = (value: number) => {
    const newTotalVolume = computeTotalVolume(alcohol, ingredient, value)
    setTotalVolume(newTotalVolume)

    const newSugar = computeSugar(newTotalVolume, sugarContent)
    setSugar(newSugar)

    const newWater = computeWater(alcohol, newTotalVolume, newSugar)
    setWater(newWater)

    setFinalPercentage(value)
  }

  const handleSugarContentChange = (value: number) => {
    const newSugar = computeSugar(totalVolume, value)
    setSugar(newSugar)

    const newWater = computeWater(alcohol, totalVolume, newSugar)
    setWater(newWater)

    setSugarContent(value)
  }

  const handleIngredientChange = (value: number) => {
    const newTotalVolume = computeTotalVolume(alcohol, value, finalPercentage)
    setTotalVolume(newTotalVolume)

    const newSugar = computeSugar(newTotalVolume, sugarContent)
    setSugar(newSugar)

    const newWater = computeWater(alcohol, newTotalVolume, newSugar)
    setWater(newWater)

    const newIntensity = computeIntensity(alcohol, value)
    setIntensity(newIntensity)

    setIngredient(value)
  }

  const handleMacerationTimeChange = (value: string) => {
    setMacerationTime(value)
    const newFlavour = liqueur.property.computeFlavour(value)
    setFlavour(newFlavour)
  }

  // ADVANCED SETTINGS

  return {
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
  }

}