import { useState } from 'react'

const ALCOHOL_AFTER_LEMON_MACERATION_PERCENTAGE = 95 // after maceration, 95% of the volume is present
const WATER_IN_LEMON_ZEST_PERCENTAGE = 70 // 70% of the zest is water
const ALCOHOL_PERCENTAGE = 96 // 96% of the alcohol is pure alcohol

const MIN_VOLUME_ALCOHOL = 10 // 10 ml of alcohol
const MAX_VOLUME_ALCOHOL = 1000 // 1000 ml of alcohol
const MIN_RESULT_PERCENTAGE = 15 // 15% of alcohol
const MAX_RESULT_PERCENTAGE = 45 // 45% of alcohol
const MIN_ZEST_PER_100ML = 10 // 10 g of zest per 100 ml of alcohol
const MAX_ZEST_PER_100ML = 30 // 30 g of zest per 100 ml of alcohol
const MIN_SUGAR_CONTENT = 100 // total sugar content in g/L of total volume
const MAX_SUGAR_CONTENT = 300 // total sugar content in g/L of total volume

type MixologyNumberValue = {
  value: number
  min: number
  max: number
  step: number
}

export enum Flavour {
  FRESH_AND_DELICATE = 'Fresh and delicate',
  BALANCED = 'Balanced',
  RICH_AND_FULL = 'Rich and full',
}

/*
10 - 17 g of zest per 100 ml of alcohol -> Light
17 - 24 g of zest per 100 ml of alcohol -> Medium
24 - 30 g of zest per 100 ml of alcohol -> Strong
 */
export enum Intensity {
  LIGHT = 'Light',
  MEDIUM = 'Medium',
  STRONG = 'Strong',
}

enum MacerationTime {
  ONE = '1 day',
  TWO = '2 days',
  THREE = '3 days',
}

type MixologyEnumValue<T> = {
  value: T
  options: T[]
}

const castValue = (value: number, step: number) => {
  const decimalPlaces = step.toString().split('.')[1]?.length || 0
  const factor = Math.pow(10, decimalPlaces)
  return Math.round(value * factor) / factor
}

const computeTotalVolumeWithSugar = (water: number, alcohol: number, sugar: number) => {
  const sugarVolume = sugar * 0.625
  const maceratedVolume = alcohol * (ALCOHOL_AFTER_LEMON_MACERATION_PERCENTAGE / 100)
  const totalVolume = (maceratedVolume + water + sugarVolume)
  return totalVolume
}

const computeTotalVolume = (alcohol: number, zest: number, finalPercentage: number) => {
  const maceratedVolume = alcohol * (ALCOHOL_AFTER_LEMON_MACERATION_PERCENTAGE / 100)
  const waterInZest = zest * (WATER_IN_LEMON_ZEST_PERCENTAGE / 100)
  const alcoholPercentageAfterMaceration = (alcohol * ALCOHOL_PERCENTAGE) / (alcohol + waterInZest)
  const totalVolume = (maceratedVolume * alcoholPercentageAfterMaceration) / finalPercentage
  return totalVolume
}

const computeFinalPercentage = (water: number, alcohol: number, sugar: number, zest: number, alcoholPercentage = ALCOHOL_PERCENTAGE) => {
  const totalVolume = computeTotalVolumeWithSugar(water, alcohol, sugar)

  const waterInZest = zest * (WATER_IN_LEMON_ZEST_PERCENTAGE / 100)
  const alcoholPercentageAfterMaceration = (alcohol * alcoholPercentage / 100) / (alcohol + waterInZest)

  const value = (alcoholPercentageAfterMaceration * 100) / (totalVolume / 100)
  return castValue(value, 0.1)
}

const computeSugar = (sugarContent: number, totalVolume: number) => {
  const sugar = sugarContent * (totalVolume / 1000) // [g/L] * [mL] / [1000] = [g/L] * [L] = [g]
  return sugar
}

const computeWater = (alcohol: number, sugar: number, totalVolume: number) => {
  const maceratedVolume = alcohol * (ALCOHOL_AFTER_LEMON_MACERATION_PERCENTAGE / 100)
  const sugarVolume = 0.625 * sugar

  const water = totalVolume - maceratedVolume - sugarVolume
  return water
}

const computeZestEdge = (alcohol: number) => {
  const alcohol100mlMultiplier = alcohol / 100

  const minZest = MIN_ZEST_PER_100ML * alcohol100mlMultiplier
  const maxZest = MAX_ZEST_PER_100ML * alcohol100mlMultiplier

  return {
    min: minZest,
    max: maxZest,
  }
}

const computeIntensity = (alcohol: number, zest: number) => {
  const zestAlcoholRatio = zest / alcohol
  if (zestAlcoholRatio < 0.17) {
    return Intensity.LIGHT
  } else if (zestAlcoholRatio < 0.24) {
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

const computeMacerationTime = (flavour: Flavour) => {
  switch (flavour) {
    case Flavour.FRESH_AND_DELICATE:
      return MacerationTime.ONE
    case Flavour.BALANCED:
      return MacerationTime.TWO
    case Flavour.RICH_AND_FULL:
      return MacerationTime.THREE
  }
}

const initTotalVolume = (alcohol: number, zest: number, finalPercentage: number) => {
  const maxZestWithMinAlcohol = (MAX_ZEST_PER_100ML / 100) * MIN_VOLUME_ALCOHOL
  const minZestWithMaxAlcohol = (MIN_ZEST_PER_100ML / 100) * MAX_VOLUME_ALCOHOL

  const minTotalVolume = computeTotalVolume(MIN_VOLUME_ALCOHOL, maxZestWithMinAlcohol, MAX_RESULT_PERCENTAGE)
  const maxTotalVolume = computeTotalVolume(MAX_VOLUME_ALCOHOL, minZestWithMaxAlcohol, MIN_RESULT_PERCENTAGE)

  const step = 0.1
  return {
    value: castValue(computeTotalVolume(alcohol, zest, finalPercentage), step),
    min: castValue(minTotalVolume, step),
    max: castValue(maxTotalVolume, step),
    step: step,
  }
}

const initSugar = (sugarContent: number, totalVolume: number) => {
  const maxZestWithMinAlcohol = (MAX_ZEST_PER_100ML / 100) * MIN_VOLUME_ALCOHOL
  const minZestWithMaxAlcohol = (MIN_ZEST_PER_100ML / 100) * MAX_VOLUME_ALCOHOL

  const minTotalVolume = computeTotalVolume(MIN_VOLUME_ALCOHOL, maxZestWithMinAlcohol, MAX_RESULT_PERCENTAGE)
  const maxTotalVolume = computeTotalVolume(MAX_VOLUME_ALCOHOL, minZestWithMaxAlcohol, MIN_RESULT_PERCENTAGE)


  const minSugar = computeSugar(MIN_SUGAR_CONTENT, minTotalVolume)
  const maxSugar = computeSugar(MAX_SUGAR_CONTENT, maxTotalVolume)

  const step = 1
  return {
    value: castValue(computeSugar(sugarContent, totalVolume), step),
    min: castValue(minSugar, step),
    max: castValue(maxSugar, step),
    step,
  }
}

const initWater = (totalVolume: number, alcohol: number, sugar: number) => {
  const maxZestWithMinAlcohol = (MAX_ZEST_PER_100ML / 100) * MIN_VOLUME_ALCOHOL
  const minZestWithMaxAlcohol = (MIN_ZEST_PER_100ML / 100) * MAX_VOLUME_ALCOHOL

  const minTotalVolume = computeTotalVolume(MIN_VOLUME_ALCOHOL, maxZestWithMinAlcohol, MAX_RESULT_PERCENTAGE)
  const maxTotalVolume = computeTotalVolume(MAX_VOLUME_ALCOHOL, minZestWithMaxAlcohol, MIN_RESULT_PERCENTAGE)

  const minWater = computeWater(MIN_VOLUME_ALCOHOL, 0, minTotalVolume)
  const maxWater = computeWater(MAX_VOLUME_ALCOHOL, 0, maxTotalVolume)

  const maceratedVolume = alcohol * (ALCOHOL_AFTER_LEMON_MACERATION_PERCENTAGE / 100)
  const sugarVolume = 0.625 * sugar

  const water = totalVolume - maceratedVolume - sugarVolume

  const step = 1
  return {
    value: castValue(water, step),
    min: castValue(minWater, step),
    max: castValue(maxWater, step),
    step,
  }
}

const initZest = (alcohol: number) => {
  const { min, max } = computeZestEdge(alcohol)

  const step = 1
  return {
    value: castValue((min + max) / 2, step),
    min: castValue(min, step),
    max: castValue(max, step),
    step,
  }
}

export default function usePage() {
  const [alcohol, setAlcohol] = useState<MixologyNumberValue>({
    value: 100,
    min: MIN_VOLUME_ALCOHOL,
    max: MAX_VOLUME_ALCOHOL,
    step: 1,
  })
  const [finalPercentage, setFinalPercentage] = useState<MixologyNumberValue>({
    value: 25,
    min: MIN_RESULT_PERCENTAGE,
    max: MAX_RESULT_PERCENTAGE,
    step: 0.1,
  })
  const [sugarContent, setSugarContent] = useState<MixologyNumberValue>({
    value: 200,
    min: MIN_SUGAR_CONTENT,
    max: MAX_SUGAR_CONTENT,
    step: 1,
  })

  const [macerationTime, setMacerationTime] = useState<MixologyEnumValue<MacerationTime>>({
    value: MacerationTime.ONE,
    options: Object.values(MacerationTime),
  })

  const [zest, setZest] = useState<MixologyNumberValue>(initZest(alcohol.value))

  const [totalVolume, setTotalVolume] = useState<MixologyNumberValue>(initTotalVolume(alcohol.value, zest.value, finalPercentage.value))

  const [sugar, setSugar] = useState<MixologyNumberValue>(initSugar(sugarContent.value, totalVolume.value))

  const [water, setWater] = useState<MixologyNumberValue>(initWater(totalVolume.value, alcohol.value, sugar.value))

  const [intensity, setIntensity] = useState<MixologyEnumValue<Intensity>>({
    value: computeIntensity(alcohol.value, zest.value),
    options: Object.values(Intensity),
  })

  const [flavour, setFlavour] = useState<MixologyEnumValue<Flavour>>({
    value: computeFlavour(macerationTime.value),
    options: Object.values(Flavour),
  })

  // OK


// NOT OK
  const handleAlcoholChange = (value: number) => {
    const newFinalPercentage = computeFinalPercentage(water.value, value, sugar.value, zest.value)

    const finalPercentageCondition = newFinalPercentage >= finalPercentage.min && newFinalPercentage <= finalPercentage.max
    const { min, max } = computeZestEdge(value)
    const zestCondition = zest.value >= min && zest.value <= max

    if (finalPercentageCondition && zestCondition) {
      setFinalPercentage((prev) => ({
        ...prev,
        value: newFinalPercentage,
      }))

      setAlcohol((prev) => ({
        ...prev,
        value: value,
      }))

      // Update zest edge values
      setZest((prev) => ({
        ...prev,
        min: min,
        max: max,
      }))

      // Update intensity
      const newIntensity = computeIntensity(value, zest.value)
      setIntensity((prev) => ({
        ...prev,
        value: newIntensity,
      }))


    }


  }

  const handleWaterChange = (value: number) => {
    setWater((prev) => ({
      ...prev,
      value: value,
    }))
  }

  const handleFinalPercentageChange = (value: number) => {
    setFinalPercentage((prev) => ({
      ...prev,
      value: value,
    }))
  }

  const handleSugarChange = (value: number) => {
    setSugar((prev) => ({
      ...prev,
      value: value,
    }))
  }

  const handleSugarContentChange = (value: number) => {
    setSugarContent((prev) => ({
      ...prev,
      value: value,
    }))
  }

  const handleTotalVolumeChange = (value: number) => {
    setTotalVolume((prev) => ({
      ...prev,
      value: value,
    }))
  }

  const handleZestChange = (value: number) => {
    setZest((prev) => ({
      ...prev,
      value: value,
    }))

    const newIntensity = computeIntensity(alcohol.value, value)
    setIntensity((prev) => ({
      ...prev,
      value: newIntensity,
    }))
  }

  const handleIntensityChange = (value: Intensity) => {

    const goalRatio = value === Intensity.LIGHT ? 0.17 : value === Intensity.MEDIUM ? 0.24 : 0.3
    const futureZestValue = castValue(alcohol.value * goalRatio, 1)

    const zestCondition = futureZestValue >= zest.min && futureZestValue <= zest.max

    if (zestCondition) {
      setZest((prev) => ({
        ...prev,
        value: futureZestValue,
      }))

      setIntensity((prev) => ({
        ...prev,
        value: value,
      }))
    }

  }

  const handleMacerationTimeChange = (value: MacerationTime) => {
    setMacerationTime((prev) => ({
      ...prev,
      value: value,
    }))

    const newFlavour = computeFlavour(value)
    setFlavour((prev) => ({
      ...prev,
      value: newFlavour,
    }))
  }

  const handleFlavourChange = (value: Flavour) => {
    setFlavour((prev) => ({
      ...prev,
      value: value,
    }))

    const newMacerationTime = computeMacerationTime(value)
    setMacerationTime((prev) => ({
      ...prev,
      value: newMacerationTime,
    }))

  }

  return {
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
  }

}