'use client'

import React from 'react'
import { Slider as SliderPrimeReact, SliderChangeEvent } from 'primereact/slider'
import InputNumber from '@/app/components/inputNumber/inputNumber'

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
    const newValue = e.value as number
    onChange(newValue)
  }

  return (
    <div className="flex flex-col w-full ">
      <label htmlFor={label} className="text-primary-600 text-sm font-bold text-center">{label}</label>
      <div className="flex w-full items-center ">
        <SliderPrimeReact value={value} onChange={handleSliderChange} max={max} min={min} step={step}
                          pt={{
                            range: { className: 'bg-primary-300' },
                            handle: { className: 'border-primary-400 hover:bg-primary-400' },
                          }}
                          className="flex-grow" />
        <InputNumber label={label} value={value} min={min} max={max} step={step} onChange={onChange} additionalStyle={'ml-4'} />
        <span className="text-primary-600 text-sm font-bold ml-1 text-left min-w-[3rem]">{unit}</span>
      </div>
    </div>
  )
}