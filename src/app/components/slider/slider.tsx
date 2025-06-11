'use client'

import React, { useEffect, useState } from 'react'
import { Slider as SliderPrimeReact, SliderChangeEvent } from 'primereact/slider'
import { ToastContainer, toast } from 'react-toastify'

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
  const [inputValue, setInputValue] = useState<string>(value.toString())

  useEffect(() => { // Update input value when the slider value changes
    setInputValue(value.toString())
  }, [value])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value
    const newValue = parseFloat(inputValue)
    setInputValue(inputValue)

    if (!isNaN(newValue) && newValue >= min && newValue <= max) {
      onChange(newValue)
    }
  }

  const handleInputBlur = () => {
    const newValue = parseFloat(inputValue)
    if (!isNaN(newValue) && newValue >= min && newValue <= max) {
      onChange(newValue)
    } else {
      // Reset to current valid value if invalid input
      toast.error('🚨 Oh no! The value must be between ' + min + ' and ' + max, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        // theme: 'colored'
      })
      setInputValue(value.toString())
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleInputBlur()
      e.currentTarget.blur() // optional: blur after pressing Enter
    }
  }

  const handleSliderChange = (e: SliderChangeEvent) => {
    const newValue = e.value as number
    setInputValue(newValue.toString())
    onChange(newValue)
  }

  return (
    <div className="flex flex-col w-full ">
      <ToastContainer />
      <label htmlFor={label} className="text-primary-600 text-sm font-bold text-center">{label}</label>
      <div className="flex w-full items-center ">
        <SliderPrimeReact value={value} onChange={handleSliderChange} max={max} min={min} step={step}
                          pt={{
                            range: 'bg-primary-300',
                            handle: 'border-primary-400 hover:bg-primary-400',
                          }}
                          className="flex-grow" />
        <input type="number" id={label} value={inputValue} min={min} max={max} onChange={handleInputChange} onBlur={handleInputBlur} onKeyDown={handleKeyDown}
               step={step}
               className={'ml-4 p-1 min-w-[4rem] bg-primary-50 rounded-md focus:outline-none text-right '} />
        <span className="text-primary-600 text-sm font-bold ml-1 text-left min-w-[3rem]">{unit}</span>
      </div>
    </div>
  )
}