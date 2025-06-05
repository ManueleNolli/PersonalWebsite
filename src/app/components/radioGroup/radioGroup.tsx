'use client'

import React from 'react'
import { RadioButton, RadioButtonChangeEvent } from 'primereact/radiobutton'

export type ButtonGroupProps<T> = {
  label: string
  value: T
  options: T[]
  // eslint-disable-next-line no-unused-vars
  onChange: (value: T) => void
  disabled?: boolean
}

export default function RadioGroup<T extends string | number>({ label, value, options, onChange, disabled }: ButtonGroupProps<T>) {

  const handleButtonChange = (e: RadioButtonChangeEvent) => {
    const option = e.value as T
    onChange(option)
  }

  return (
    <div className="flex flex-col w-full justify-center items-center">
      <label htmlFor={label} className="text-primary-600 text-sm font-bold text-center">{label}</label>
      <div className="inline-flex rounded-lg overflow-hidden mt-2  border border-gray-200">
        {options.map((option, index) => {
          const isSelected = value === option

          return (
            <label
              key={option}
              className={`
              flex items-center px-4 py-2 cursor-pointer font-bold text-sm
              ${isSelected ? disabled ? 'bg-primary-200 text-primary-50' : 'bg-primary-400 text-primary-50' : disabled ? 'text-primary-300': 'text-primary-400'}
              ${index !== options.length - 1 ? 'border-r' : ''}
              transition-colors
            `}
            >
              <RadioButton
                disabled={disabled}
                inputId={String(option)}
                name="group"
                value={option}
                onChange={handleButtonChange}
                checked={isSelected}
                className="hidden"
              />
              <span>{option}</span>
            </label>
          )
        })}
      </div>
    </div>


  )
}