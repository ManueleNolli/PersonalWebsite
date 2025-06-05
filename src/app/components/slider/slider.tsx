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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('Slider input change:', e.target.value)
    const newValue = parseFloat(e.target.value)
    if (newValue >= min && newValue <= max) {
      onChange(newValue)
    }
  }

  return (
    <div className="flex flex-col w-full ">
      <label htmlFor={label} className="text-primary-600 text-sm font-bold text-center">{label}</label>
      <div className="flex w-full items-center ">
        <SliderPrimeReact value={value} onChange={(e: SliderChangeEvent) => onChange(e.value as number)} max={max} min={min} step={step}
                          pt={{
                            range: 'bg-primary-300',
                            handle: 'border-primary-400 hover:bg-primary-400',
                          }}
                          className="flex-grow" />
        {/*<input type="range" id={label} value={value} min={min} max={max} step={step}*/}
        {/*       className="flex-grow h-[5px] rounded-lg cursor-pointer appearance-none accent-primary-400 bg-gray-200"*/}
        {/*       onChange={handleInputChange}*/}
        {/*/>*/}
        <input type="number" id={label} value={value} min={min} max={max} onChange={handleInputChange} step={step}
               className={'ml-4 p-1 min-w-[4rem] bg-primary-50 rounded-md focus:outline-none text-right '} />
        <span className="text-primary-600 text-sm font-bold ml-1 text-left min-w-[3rem]">{unit}</span>
      </div>
    </div>
  )
}