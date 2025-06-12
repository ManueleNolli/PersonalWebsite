import React, { useEffect, useRef, useState } from 'react'
import { Toast } from 'primereact/toast'

type InputNumberProps = {
  label: string
  value: number
  min?: number
  max?: number
  step?: number
  onChange: (value: number) => void
  additionalStyle?: string
}

export default function InputNumber({ label, value, min, max, step, onChange, additionalStyle }: InputNumberProps) {
  const toast = useRef(null)

  const [inputValue, setInputValue] = useState<string>(value.toString())

  useEffect(() => {
    setInputValue(value.toString())
  }, [value])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value
    const newValue = parseFloat(inputValue)
    setInputValue(inputValue)

    if (isNaN(newValue)) return

    const isTooSmall = min !== undefined && max === undefined && newValue < min
    const isTooLarge = max !== undefined && min === undefined && newValue > max
    const isOutOfRange = min !== undefined && max !== undefined && (newValue < min || newValue > max)

    if (isTooSmall || isTooLarge || isOutOfRange) return

    onChange(newValue)
  }

  const handleInputBlur = () => {
    const newValue = parseFloat(inputValue)
    if (isNaN(newValue)) return

    let errorMessage: string | null = null

    const isTooSmall = min !== undefined && max === undefined && newValue < min
    const isTooLarge = max !== undefined && min === undefined && newValue > max
    const isOutOfRange = min !== undefined && max !== undefined && (newValue < min || newValue > max)

    if (isTooSmall) {
      errorMessage = `🚨 Oh no! The value must be at least ${min}`
    } else if (isTooLarge) {
      errorMessage = `🚨 Oh no! The value must be at most ${max}`
    } else if (isOutOfRange) {
      errorMessage = `🚨 Oh no! The value must be between ${min} and ${max}`
    } else {
      onChange(newValue)
    }

    if (errorMessage) {
      toast.current.show({
        severity: 'error',
        summary: 'Invalid input',
        detail: errorMessage,
        life: 3000,
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

  return (
    <>
      <Toast ref={toast} />
      <input type="number" id={label} value={inputValue} min={min} max={max} onChange={handleInputChange} onBlur={handleInputBlur} onKeyDown={handleKeyDown}
             step={step}
             className={'p-1 min-w-[4rem] bg-primary-50 rounded-md focus:outline-none text-right ' + additionalStyle} />

    </>
  )
}