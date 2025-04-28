'use client'

import React from 'react'
import { Slider as SliderPrimeReact, SliderChangeEvent } from 'primereact/slider'

export type SliderProps = {
  label: string
  unit: string
  value: number
  // eslint-disable-next-line no-unused-vars
  onChange: (value: number) => void
  min: number
  max: number
  step: number
}

export default function Slider({ label, unit, value, onChange, min, max, step }: SliderProps) {

  const handleSliderChange = (e: SliderChangeEvent) => {
    onChange(e.value as number)
  }


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value)
    if (newValue >= min && newValue <= max) {
      onChange(newValue)
    }
  }

  return (
    <div className="flex flex-col w-full ">
      <label htmlFor={label} className="text-primary-600 text-sm font-bold text-center">{label}</label>
      <div className="flex w-full items-center">
        <SliderPrimeReact id={label} value={value} min={min} max={max} step={step} onChange={handleSliderChange} className={'flex-grow'}
        />
        <input type="number" id={label} value={value} min={min} max={max} onChange={handleInputChange} className={'ml-4 p-1 min-w-[4rem] bg-primary-50 rounded-md focus:outline-none text-right'} />
        <span className="text-primary-600 text-sm font-bold ml-1 text-left min-w-[3rem]">{unit}</span>
      </div>
    </div>
  )
}