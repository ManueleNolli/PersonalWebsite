'use client'

import useDialog from '@/app/components/dialag/useDialog'
import { Dialog as DialogPR } from 'primereact/dialog'
import { Button } from 'primereact/button'
import React from 'react'

export type DialogProps = {
  label: string
  children: React.ReactNode
}

export default function Dialog({ label, children }: DialogProps) {
  const { isVisible, toggleVisibility } = useDialog()

  return (
    <div>
      <Button text label={label} className="text-primary-50" onClick={toggleVisibility} />
      <DialogPR header={label} className="max-w-[80%] md:max-w-[60%]" visible={isVisible} onHide={toggleVisibility} position={"bottom"}>
        {children}
      </DialogPR>
    </div>
  )

}