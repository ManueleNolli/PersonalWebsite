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

// WRONG
const computeAlcohol = (totalVolume: number, finalPercentage: number, zest: number) => {
  const maceratedVolumeProductMaceratedPercentage = totalVolume * finalPercentage / 100
  console.log('macVolProdMacPer', maceratedVolumeProductMaceratedPercentage)

  const waterInZest = zest * (WATER_IN_LEMON_ZEST_PERCENTAGE / 100)

  const a = (ALCOHOL_AFTER_LEMON_MACERATION_PERCENTAGE / 100) * ALCOHOL_PERCENTAGE
  console.log('a', a)
  const b = maceratedVolumeProductMaceratedPercentage
  console.log('b', b)
  const c = waterInZest * maceratedVolumeProductMaceratedPercentage
  console.log('c', c)

  const delta = b * b - 4 * a * c
  console.log('delta', delta)

  const sol1 = (-b + Math.sqrt(delta)) / (2 * a)
  const sol2 = (-b - Math.sqrt(delta)) / (2 * a)

  console.log('sol1', sol1)
  console.log('sol2', sol2)


  const alcohol = Math.max(sol1, sol2) // take the positive solution
  return alcohol

}

const computeFinalPercentage = (water: number, alcohol: number, sugar: number, zest: number) => {
  const totalVolume = computeTotalVolumeWithSugar(water, alcohol, sugar)

  const waterInZest = zest * (WATER_IN_LEMON_ZEST_PERCENTAGE / 100)
  const maceratedVolume = alcohol * (ALCOHOL_AFTER_LEMON_MACERATION_PERCENTAGE / 100)
  const alcoholPercentageAfterMaceration = (alcohol * ALCOHOL_PERCENTAGE) / (alcohol + waterInZest)


  const value = (maceratedVolume * alcoholPercentageAfterMaceration) / totalVolume
  return value
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

const computeSugarContent = (sugar: number, totalVolume: number) => {
  const sugarContent = (sugar / totalVolume) * 1000 // [g] / [mL] * [1000] = [g/L]
  return sugarContent
}

const computeZest = (alcohol: number, actualRatioPer100ml: number) => {
  if (actualRatioPer100ml > MAX_ZEST_PER_100ML) {
    throw new Error('Wrong params for computeZest: max zest reached')
  }

  if (actualRatioPer100ml < MIN_ZEST_PER_100ML) {
    throw new Error('Wrong params for computeZest: min zest reached')
  }

  const alcohol100mlMultiplier = alcohol / 100
  const zest = actualRatioPer100ml * alcohol100mlMultiplier
  return zest
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
  const maxZestWithActualAlcohol = (MAX_ZEST_PER_100ML / 100) * alcohol
  const minZestWithActualAlcohol = (MIN_ZEST_PER_100ML / 100) * alcohol

  const minTotalVolume = computeTotalVolume(MIN_VOLUME_ALCOHOL, maxZestWithActualAlcohol, MAX_RESULT_PERCENTAGE)
  const maxTotalVolume = computeTotalVolume(MAX_VOLUME_ALCOHOL, minZestWithActualAlcohol, MIN_RESULT_PERCENTAGE)

  const step = 0.1
  return {
    value: computeTotalVolume(alcohol, zest, finalPercentage),
    min: minTotalVolume,
    max: maxTotalVolume,
    step,
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
    value: computeSugar(sugarContent, totalVolume),
    min: minSugar,
    max: maxSugar,
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

  const step = 0.1
  return {
    value: water,
    min: minWater,
    max: maxWater,
    step,
  }
}

const initZest = (alcohol: number) => {
  // const minZest = MIN_ZEST_PER_100ML * (MIN_VOLUME_ALCOHOL / 100)
  // const maxZest = MAX_ZEST_PER_100ML * (MAX_VOLUME_ALCOHOL / 100)

  const minZest = computeZest(MIN_VOLUME_ALCOHOL, MIN_ZEST_PER_100ML)
  const maxZest = computeZest(MAX_VOLUME_ALCOHOL, MAX_ZEST_PER_100ML)
  const initValue = computeZest(alcohol, (MIN_ZEST_PER_100ML + MAX_ZEST_PER_100ML) / 2)

  const step = 1
  return {
    value: initValue,
    min: minZest,
    max: maxZest,
    step,
  }
}

export default function usePage() {
  const [alcohol, setAlcohol] = useState<MixologyNumberValue>({
    value: 100,
    min: MIN_VOLUME_ALCOHOL,
    max: MAX_VOLUME_ALCOHOL,
    step: 0.1,
  })
  const alcoholCondition = (value: number) => value >= MIN_VOLUME_ALCOHOL && value <= MAX_VOLUME_ALCOHOL
  const setAlcoholValue = (value: number) => {
    setAlcohol((prev => ({
      ...prev,
      value: value,
    })))
  }
  const [finalPercentage, setFinalPercentage] = useState<MixologyNumberValue>({
    value: 25,
    min: MIN_RESULT_PERCENTAGE,
    max: MAX_RESULT_PERCENTAGE,
    step: 0.1,
  })
  const finalPercentageCondition = (value: number) => value >= MIN_RESULT_PERCENTAGE && value <= MAX_RESULT_PERCENTAGE
  const setFinalPercentageValue = (value: number) => {
    setFinalPercentage((prev => ({
      ...prev,
      value: value,
    })))
  }
  const [sugarContent, setSugarContent] = useState<MixologyNumberValue>({
    value: 200,
    min: MIN_SUGAR_CONTENT,
    max: MAX_SUGAR_CONTENT,
    step: 1,
  })
  const sugarContentCondition = (value: number) => value >= MIN_SUGAR_CONTENT && value <= MAX_SUGAR_CONTENT
  const setSugarContentValue = (value: number) => {
    setSugarContent((prev => ({
      ...prev,
      value: value,
    })))
  }
  const [macerationTime, setMacerationTime] = useState<MixologyEnumValue<MacerationTime>>({
    value: MacerationTime.ONE,
    options: Object.values(MacerationTime),
  })
  const setMacerationTimeValue = (value: MacerationTime) => {
    setMacerationTime((prev => ({
      ...prev,
      value: value,
    })))
  }
  const [zest, setZest] = useState<MixologyNumberValue>(initZest(alcohol.value))
  const zestCondition = (value: number) => value >= zest.min && value <= zest.max
  const setZestValue = (value: number) => {
    setZest((prev => ({
      ...prev,
      value: value,
    })))
  }
  const [totalVolume, setTotalVolume] = useState<MixologyNumberValue>(initTotalVolume(alcohol.value, zest.value, finalPercentage.value))
  const totalVolumeCondition = (value: number) => value >= totalVolume.min && value <= totalVolume.max
  const setTotalVolumeValue = (value: number) => {
    setTotalVolume((prev => ({
      ...prev,
      value: value,
    })))
  }
  const [sugar, setSugar] = useState<MixologyNumberValue>(initSugar(sugarContent.value, totalVolume.value))
  const sugarCondition = (value: number) => value >= sugar.min && value <= sugar.max
  const setSugarValue = (value: number) => {
    setSugar((prev => ({
      ...prev,
      value: value,
    })))
  }
  const [water, setWater] = useState<MixologyNumberValue>(initWater(totalVolume.value, alcohol.value, sugar.value))
  const waterCondition = (value: number) => value >= water.min && value <= water.max
  const setWaterValue = (value: number) => {
    setWater((prev => ({
      ...prev,
      value: value,
    })))
  }
  const [intensity, setIntensity] = useState<MixologyEnumValue<Intensity>>({
    value: computeIntensity(alcohol.value, zest.value),
    options: Object.values(Intensity),
  })
  const setIntensityValue = (value: Intensity) => {
    setIntensity((prev) => ({
      ...prev,
      value: value,
    }))
  }
  const [flavour, setFlavour] = useState<MixologyEnumValue<Flavour>>({
    value: computeFlavour(macerationTime.value),
    options: Object.values(Flavour),
  })
  const setFlavourValue = (value: Flavour) => {
    setFlavour((prev) => ({
      ...prev,
      value: value,
    }))
  }

// OK
  const handleMacerationTimeChange = (value: MacerationTime) => {
    console.log('User is updating maceration time:', value)
    setMacerationTimeValue(value)

    const newFlavour = computeFlavour(value)
    console.log('Updating maceration time -> Updating flavour:', newFlavour)
    setFlavourValue(newFlavour)
  }

  const handleFlavourChange = (value: Flavour) => {
    console.log('User is updating flavour:', value)
    setFlavourValue(value)

    const newMacerationTime = computeMacerationTime(value)
    console.log('Updating flavour -> Updating maceration time:', newMacerationTime)
    setMacerationTimeValue(newMacerationTime)

  }

  const handleAlcoholChange = (value: number) => {
    //////////////////////////////////////////////////////////////////////////////
    const alcoholRatioNewOld = value / alcohol.value
    //////////////////////////////////////////////////////////////////////////////

    const newZest = alcoholRatioNewOld * zest.value
    if (!zestCondition(newZest)) {
      console.error('User is updating alcohol -> zest condition = false')
      return
    }

    let newFinalPercentage = computeFinalPercentage(water.value, value, sugar.value, newZest)

    if (finalPercentageCondition(newFinalPercentage)) {
      // Update all maintaining water and sugar
      const newTotalVolume = computeTotalVolumeWithSugar(water.value, value, sugar.value)
      if (!totalVolumeCondition(newTotalVolume)) {
        console.error('User is updating alcohol -> total volume condition = false')
        return
      }

      const newSugarContent = computeSugarContent(sugar.value, newTotalVolume)
      if (!sugarContentCondition(newSugarContent)) {
        console.error('User is updating alcohol -> sugar content condition = false')
        return
      }

      setAlcoholValue(value)
      setSugarContentValue(newSugarContent)
      setFinalPercentageValue(newFinalPercentage)
      setTotalVolumeValue(newTotalVolume)
      setZestValue(newZest)

      console.log('Alcohol updated -> Updating data', {
        alcohol: value,
        sugarContent: newSugarContent,
        finalPercentage: newFinalPercentage,
        totalVolume: newTotalVolume,
        zest: newZest,
      })
    } else {
      // Update all maintaining ratio of alcohol percentage and sugar content
      const newWater = alcoholRatioNewOld * water.value
      const newSugar = alcoholRatioNewOld * sugar.value

      if (!waterCondition(newWater)) {
        console.error('User is updating alcohol -> water condition = false')
        return
      }

      const newTotalVolume = computeTotalVolumeWithSugar(newWater, value, newSugar)
      if (!totalVolumeCondition(newTotalVolume)) {
        console.error('User is updating alcohol -> total volume condition = false')
        return
      }

      setAlcoholValue(value)
      setWaterValue(newWater)
      setTotalVolumeValue(newTotalVolume)
      setZestValue(newZest)
      setSugarValue(newSugar)

      console.log('Alcohol updated -> Updating data:', {
        alcohol: value,
        water: newWater,
        totalVolume: newTotalVolume,
        zest: newZest,
        sugar: newSugar,
      })
    }


  }

  const handleWaterChange = (value: number) => {
    const waterRatioNewOld = value / water.value

    const newFinalPercentage = computeFinalPercentage(value, alcohol.value, sugar.value, zest.value)

    if (finalPercentageCondition(newFinalPercentage)) {
      // Update all maintaining alcohol and sugar
      const newTotalVolume = computeTotalVolumeWithSugar(value, alcohol.value, sugar.value)
      if (!totalVolumeCondition(newTotalVolume)) {
        console.error('User is updating water -> total volume condition = false')
        return
      }

      const newSugarContent = computeSugarContent(sugar.value, newTotalVolume)
      if (!sugarContentCondition(newSugarContent)) {
        console.error('User is updating water -> sugar content condition = false')
        return
      }

      setWaterValue(value)
      setSugarContentValue(newSugarContent)
      setFinalPercentageValue(newFinalPercentage)
      setTotalVolumeValue(newTotalVolume)

      console.log('Alcohol water -> Updating data', {
        water: value,
        sugarContent: newSugarContent,
        finalPercentage: newFinalPercentage,
        totalVolume: newTotalVolume,
      })
    } else {
      // Update all maintaining ratio of alcohol percentage and sugar content
      const newAlcohol = waterRatioNewOld * alcohol.value
      if (!alcoholCondition(newAlcohol)) {
        console.error('User is updating water -> alcohol condition = false')
        return
      }

      const alcoholRatioNewOld = newAlcohol / alcohol.value
      const newZest = alcoholRatioNewOld * zest.value
      if (!zestCondition(newZest)) {
        console.error('User is updating alcohol -> zest condition = false')
        return
      }

      const newSugar = waterRatioNewOld * sugar.value
      if (!sugarCondition(newSugar)) {
        console.error('User is updating water -> sugar condition = false')
        return
      }


      const newTotalVolume = computeTotalVolumeWithSugar(value, newAlcohol, newSugar)
      if (!totalVolumeCondition(newTotalVolume)) {
        console.error('User is updating water -> total volume condition = false')
        return
      }

      setWaterValue(value)
      setAlcoholValue(newAlcohol)
      setTotalVolumeValue(newTotalVolume)
      setSugarValue(newSugar)
      setZestValue(newZest)

      console.log('water updated -> Updating data:', {
        water: value,
        alcohol: newAlcohol,
        totalVolume: newTotalVolume,
        sugar: newSugar,
        zest: newZest,
      })
    }

  }

  const handleSugarChange = (value: number) => {
    const sugarRatioNewOld = value / sugar.value

    let newSugarContent = computeSugarContent(value, totalVolume.value)

    if (sugarContentCondition(newSugarContent)) {
      // Update all maintaining alcohol and water

      const newFinalPercentage = computeFinalPercentage(water.value, alcohol.value, value, zest.value)
      if (!finalPercentageCondition(newFinalPercentage)) {
        console.error('User is updating sugar -> final percentage condition = false')
        return
      }

      const newTotalVolume = computeTotalVolumeWithSugar(water.value, alcohol.value, value)
      if (!totalVolumeCondition(newTotalVolume)) {
        console.error('User is updating sugar -> total volume condition = false')
        return
      }

      setSugarValue(value)
      setSugarContentValue(newSugarContent)
      setFinalPercentageValue(newFinalPercentage)
      setTotalVolumeValue(newTotalVolume)

      console.log('sugar updated -> Updating data:', {
        sugar: value,
        sugarContent: newSugarContent,
        finalPercentage: newFinalPercentage,
        totalVolume: newTotalVolume,
      })
    } else {
      // Update all maintaining ratio of alcohol percentage and sugar content
      const newAlcohol = sugarRatioNewOld * alcohol.value
      const newWater = sugarRatioNewOld * water.value

      if (!alcoholCondition(newAlcohol)) {
        console.error('User is updating sugar -> alcohol condition = false')
        return
      }

      if (!waterCondition(newWater)) {
        console.error('User is updating sugar -> water condition = false')
        return
      }

      const alcoholRatioNewOld = newAlcohol / alcohol.value
      const newZest = alcoholRatioNewOld * zest.value
      if (!zestCondition(newZest)) {
        console.error('User is updating sugar -> zest condition = false')
        return
      }

      const newTotalVolume = computeTotalVolumeWithSugar(newWater, newAlcohol, value)
      if (!totalVolumeCondition(newTotalVolume)) {
        console.error('User is updating sugar -> total volume condition = false')
        return
      }

      setSugarValue(value)
      setAlcoholValue(newAlcohol)
      setWaterValue(newWater)
      setTotalVolumeValue(newTotalVolume)
      setZestValue(newZest)

      console.log('sugar updated -> Updating data:', {
        sugar: value,
        alcohol: newAlcohol,
        water: newWater,
        totalVolume: newTotalVolume,
        zest: newZest,
      })
    }

  }

  const handleZestChange = (value: number) => {

    const zestAlcoholRatio = value / alcohol.value
    const zestAlcoholCondition = zestAlcoholRatio >= MIN_ZEST_PER_100ML / 100 && zestAlcoholRatio <= MAX_ZEST_PER_100ML / 100

    if (zestAlcoholCondition) {
      // Update zest maintaining all, just update intensity
      const newIntensity = computeIntensity(alcohol.value, value)
      setIntensityValue(newIntensity)
      setZestValue(value)
      return
    }

    // Updating alcohol
    const zestRatioNewOld = value / zest.value
    const newAlcohol = zestRatioNewOld * alcohol.value
    const alcoholRatioNewOld = newAlcohol / alcohol.value
    if (!alcoholCondition(newAlcohol)) {
      console.error('User is updating zest -> alcohol condition = false')
      return
    }

    let newFinalPercentage = computeFinalPercentage(water.value, newAlcohol, sugar.value, value)

    if (finalPercentageCondition(newFinalPercentage)) {
      // Update all maintaining water and sugar
      const newTotalVolume = computeTotalVolumeWithSugar(water.value, newAlcohol, sugar.value)
      if (!totalVolumeCondition(newTotalVolume)) {
        console.error('User is updating alcohol -> total volume condition = false')
        return
      }

      const newSugarContent = computeSugarContent(sugar.value, newTotalVolume)
      if (!sugarContentCondition(newSugarContent)) {
        console.error('User is updating alcohol -> sugar content condition = false')
        return
      }

      setAlcoholValue(newAlcohol)
      setSugarContentValue(newSugarContent)
      setFinalPercentageValue(newFinalPercentage)
      setTotalVolumeValue(newTotalVolume)
      setZestValue(value)

      console.log('Alcohol updated -> Updating data', {
        alcohol: newAlcohol,
        sugarContent: newSugarContent,
        finalPercentage: newFinalPercentage,
        totalVolume: newTotalVolume,
        zest: value,
      })
    } else {
      // Update all maintaining ratio of alcohol percentage and sugar content
      const newWater = alcoholRatioNewOld * water.value
      const newSugar = alcoholRatioNewOld * sugar.value

      if (!waterCondition(newWater)) {
        console.error('User is updating alcohol -> water condition = false')
        return
      }

      const newTotalVolume = computeTotalVolumeWithSugar(newWater, newAlcohol, newSugar)
      if (!totalVolumeCondition(newTotalVolume)) {
        console.error('User is updating alcohol -> total volume condition = false')
        return
      }

      setAlcoholValue(newAlcohol)
      setWaterValue(newWater)
      setTotalVolumeValue(newTotalVolume)
      setZestValue(value)
      setSugarValue(newSugar)

      console.log('Alcohol updated -> Updating data:', {
        alcohol: newAlcohol,
        water: newWater,
        totalVolume: newTotalVolume,
        zest: value,
        sugar: newSugar,
      })
    }


  }

  // WORKING ON
  const handleFinalPercentageChange = (value: number) => {
    const isIncreasing = value > finalPercentage.value

    if (isIncreasing) {
      // Increase alcohol
      computeAlcohol(totalVolume.value, value, zest.value)
      setFinalPercentageValue(value)
    }

  }


// NOT OK
  const handleSugarContentChange = (value: number) => {
    setSugar((prev) => ({
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

  const handleIntensityChange = (value: Intensity) => {

    const goalRatio = value === Intensity.LIGHT ? 0.17 : value === Intensity.MEDIUM ? 0.24 : 0.3
    const futureZestValue = alcohol.value * goalRatio

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