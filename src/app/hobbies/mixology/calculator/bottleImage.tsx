'use client'

import React, { useEffect,  useMemo, useRef, useState } from 'react'
import Wave from 'react-wavify'
import { parseToHsl, hsl } from 'polished'



interface BottleImageProps {
  max: number
  value: number
  ingredientColor: string
  sugarContentPercentage: number
  macerationPercentage: number
}

/*
  * Blends two hex colors based on a percentage t (0 to 1).
 */
function blendHex(c1: string, c2: string, t: number): string {
  const n1 = parseInt(c1.slice(1), 16)
  const n2 = parseInt(c2.slice(1), 16)
  const r = Math.round(((n1 >> 16) & 0xff) * (1 - t) + ((n2 >> 16) & 0xff) * t)
  const g = Math.round(((n1 >> 8) & 0xff) * (1 - t) + ((n2 >> 8) & 0xff) * t)
  const b = Math.round(((n1 >> 0) & 0xff) * (1 - t) + ((n2 >> 0) & 0xff) * t)
  return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`
}

/**
 * Dilute a color based on sugar content.
 * @param baseColor
 * @param sugar      g/L
 * @param maxSugar   g/L per t=1
 */
function diluteColor(baseColor: string, sugar: number, maxSugar: number): string {
  const t = Math.min(0.5, Math.max(0, sugar / maxSugar))
  return blendHex(baseColor, '#ffffff', t)
}

export function desaturateByMacerationPercentage(hexColor: string, macerationPercentage: number): string {
  const fraction = Math.min(1, Math.max(0, macerationPercentage))
  const { hue, saturation, lightness } = parseToHsl(hexColor)

  const minSaturation = 0.8
  const newSaturation = saturation - (saturation - minSaturation) * fraction

  return hsl(hue, newSaturation, lightness)
}

function computeFinalColor(
  baseHex: string,
  sugar: number,
  maxSugar: number,
  macerationPercentage: number,
): string {
  const dilutedHex = diluteColor(baseHex, sugar, maxSugar)

  const desaturatedHex = desaturateByMacerationPercentage(dilutedHex, macerationPercentage)
  return `${desaturatedHex}`
}

export default function BottleImage({
                                      max,
                                      value,
                                      ingredientColor,
                                      sugarContentPercentage,
                                      macerationPercentage,
                                    }: BottleImageProps) {
  const [height, setHeight] = useState(0)
  const refWave = useRef(null)

  useEffect(() => {
    setHeight(refWave.current.clientHeight)
  })


  const finalColor = useMemo(() => {
    return computeFinalColor(
      ingredientColor,
      sugarContentPercentage * max,
      max,
      macerationPercentage,
    )
  }, [ingredientColor, sugarContentPercentage, macerationPercentage, max])

  return (
    <div
      ref={refWave}
      className="relative w-full h-full ">
      <Wave fill={finalColor}
            className={`absolute bottom-0 left-0 w-full h-full rounded-3xl overflow-hidden`}
            paused={false}
            options={{
              height: height - ((value / max) * height) + (value / max) * 25,
              amplitude: (value / max) * 25,
              speed: 0.15,
              points: 3,
            }}
      />
    </div>
  )
}
