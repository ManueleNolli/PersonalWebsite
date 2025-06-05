import { useState } from 'react'

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

const IngredientConstants = { // TODO: Actual for lemon zest and alcohol 96%
  MIN_PER_100ML: 10, // 10 g per 100 ml of alcohol
  MAX_PER_100ML: 30, // 30 g per 100 ml of alcohol
  WATER_PERCENTAGE: 70, // 70% of the zest is water
  MACERATION_PERCENTAGE: 95, // after maceration, 95% of the volume is present
}


const LiqueurConstants = {
  MIN_PERCENTAGE: 15, // 15% of alcohol
  MAX_PERCENTAGE: 45, // 45% of alcohol
}


export enum Flavour {
  FRESH_AND_DELICATE = 'Fresh and delicate',
  BALANCED = 'Balanced',
  RICH_AND_FULL = 'Rich and full',
}

const flavourOptions = Object.values(Flavour).map((value) => value as Flavour)

export enum Intensity {
  LIGHT = 'Light',
  MEDIUM = 'Medium',
  STRONG = 'Strong',
}

const intensityOptions = Object.values(Intensity).map((value) => value as Intensity)

const IntensityThresholds = {
  LIGHT: 0.17,
  MEDIUM: 0.24,
}

export enum MacerationTime {
  ONE = '1 day',
  TWO = '2 days',
  THREE = '3 days',
}

const macerationTimeOptions = Object.values(MacerationTime).map((value) => value as MacerationTime)

const computeSugarVolume = (sugar: number) => {
  return sugar * SugarConstants.CONVERSION_FACTOR // [g] * [mL/g] = [mL]
}

const computeWaterInZest = (zest: number) => {
  return zest * (IngredientConstants.WATER_PERCENTAGE / 100) // [g] * [%] = [g]
}

const computeMaceratedVolume = (alcohol: number) => {
  return alcohol * (IngredientConstants.MACERATION_PERCENTAGE / 100) // [mL] * [%] = [mL]
}

const computeMaceratedAlcoholPercentage = (alcohol: number, zest: number) => {
  return (alcohol * AlcoholConstants.PERCENTAGE) / (alcohol + computeWaterInZest(zest)) // [mL] * [%] / ([mL] + [g]) = [%]
}

const computeTotalVolumeREAL = (alcohol: number, zest: number, finalPercentage: number) => {
  const result = ((AlcoholConstants.PERCENTAGE * (IngredientConstants.MACERATION_PERCENTAGE / 100) * alcohol * alcohol) / (finalPercentage * (alcohol + computeWaterInZest(zest))))
  return result
}

const computeSugarREAL = (totalVolume: number, sugarContent: number) => {
  const result = totalVolume * (sugarContent / 1000)
  return result
}

const computeWaterREAL = (alcohol: number, totalVolume: number, sugar: number) => {
  const result = totalVolume - computeMaceratedVolume(alcohol) - computeSugarVolume(sugar)
  return result
}

const computeZest = (alcohol: number, actualRatioPer100ml: number) => {
  const alcohol100mlMultiplier = alcohol / 100
  const zest = actualRatioPer100ml * alcohol100mlMultiplier
  return zest
}

const computeIntensity = (alcohol: number, zest: number) => {
  const zestAlcoholRatio = zest / alcohol
  if (zestAlcoholRatio < IntensityThresholds.LIGHT) {
    return Intensity.LIGHT
  } else if (zestAlcoholRatio < IntensityThresholds.MEDIUM) {
    return Intensity.MEDIUM
  } else {
    return Intensity.STRONG
  }
}

const computeFlavour = (macerationTime: MacerationTime) => {
  switch (macerationTime) {
    case MacerationTime.ONE:
      return Flavour.FRESH_AND_DELICATE
    case MacerationTime.TWO:
      return Flavour.BALANCED
    case MacerationTime.THREE:
      return Flavour.RICH_AND_FULL
  }
}

const computeZestMetadata = (alcohol: number) => {
  const minZest = computeZest(alcohol, IngredientConstants.MIN_PER_100ML)
  const maxZest = computeZest(alcohol, IngredientConstants.MAX_PER_100ML)

  const step = stepConstant
  return {
    min: minZest,
    max: maxZest,
    step,
  }
}

type MixologyNumberMetadata = {
  min: number
  max: number
  step: number
}

export default function usePage() {
  const [alcohol, setAlcohol] = useState<number>(400)
  const [alcoholMetadata, setAlcoholMetadata] = useState<MixologyNumberMetadata>({
    min: AlcoholConstants.MIN_VOLUME,
    max: AlcoholConstants.MAX_VOLUME,
    step: stepConstant,
  })

  const [finalPercentage, setFinalPercentage] = useState<number>(30.2)
  const [finalPercentageMetadata, setFinalPercentageMetadata] = useState<MixologyNumberMetadata>({
    min: LiqueurConstants.MIN_PERCENTAGE,
    max: LiqueurConstants.MAX_PERCENTAGE,
    step: 0.1,
  })


  const [sugarContent, setSugarContent] = useState<number>(200)
  const [sugarContentMetadata, setSugarContentMetadata] = useState<MixologyNumberMetadata>({
    min: SugarConstants.MIN_CONTENT,
    max: SugarConstants.MAX_CONTENT,
    step: stepConstant,
  })


  const [macerationTime, setMacerationTime] = useState<MacerationTime>(MacerationTime.ONE)

  const [zest, setZest] = useState<number>(computeZest(alcohol, (IngredientConstants.MIN_PER_100ML + IngredientConstants.MAX_PER_100ML) / 2))
  const [zestMetadata, setZestMetadata] = useState<MixologyNumberMetadata>(computeZestMetadata(alcohol))

  const [totalVolume, setTotalVolume] = useState<number>(computeTotalVolumeREAL(alcohol, zest, finalPercentage))
  const [sugar, setSugar] = useState<number>(computeSugarREAL(totalVolume, sugarContent))
  const [water, setWater] = useState<number>(computeWaterREAL(alcohol, totalVolume, sugar))

  const [intensity, setIntensity] = useState<Intensity>(computeIntensity(alcohol, zest))
  const [flavour, setFlavour] = useState<Flavour>(computeFlavour(macerationTime))


  const handleAlcoholChange = (value: number) => {

    const newOldRatio = value / alcohol

    const newZest = newOldRatio * zest
    setZest(newZest)

    const newZestMetadata = computeZestMetadata(value)
    setZestMetadata(newZestMetadata)

    const newTotalVolume = computeTotalVolumeREAL(value, newZest, finalPercentage)
    setTotalVolume(newTotalVolume)

    const newSugar = computeSugarREAL(newTotalVolume, sugarContent)
    setSugar(newSugar)

    const newWater = computeWaterREAL(value, newTotalVolume, newSugar)
    setWater(newWater)

    setAlcohol(value)
  }

  const handleFinalPercentageChange = (value: number) => {
    const newTotalVolume = computeTotalVolumeREAL(alcohol, zest, value)
    setTotalVolume(newTotalVolume)

    const newSugar = computeSugarREAL(newTotalVolume, sugarContent)
    setSugar(newSugar)

    const newWater = computeWaterREAL(alcohol, newTotalVolume, newSugar)
    setWater(newWater)

    setFinalPercentage(value)
  }

  const handleSugarContentChange = (value: number) => {
    const newSugar = computeSugarREAL(totalVolume, value)
    setSugar(newSugar)

    const newWater = computeWaterREAL(alcohol, totalVolume, newSugar)
    setWater(newWater)

    setSugarContent(value)
  }

  const handleZestChange = (value: number) => {
    const newTotalVolume = computeTotalVolumeREAL(alcohol, value, finalPercentage)
    setTotalVolume(newTotalVolume)

    const newSugar = computeSugarREAL(newTotalVolume, sugarContent)
    setSugar(newSugar)

    const newWater = computeWaterREAL(alcohol, newTotalVolume, newSugar)
    setWater(newWater)

    const newIntensity = computeIntensity(alcohol, value)
    setIntensity(newIntensity)

    setZest(value)
  }

  const handleMacerationTimeChange = (value: MacerationTime) => {
    setMacerationTime(value)
    const newFlavour = computeFlavour(value)
    setFlavour(newFlavour)
  }

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
  }

}