'use client'

import { FloatLabel } from 'primereact/floatlabel'
import { InputText } from 'primereact/inputtext'
import { InputTextarea } from 'primereact/inputtextarea'
import { Button } from 'primereact/button'
import React from 'react'
import UseContactMe from '@/app/components/contactMe/useContactMe'
import { Toast } from 'primereact/toast'


export default function ContactMe() {
  const {
    toast,
    name,
    updateName,
    email,
    updateEmail,
    subject,
    updateSubject,
    message,
    updateMessage,
    isNameValidAndButtonEnabled, isEmailValidAndButtonEnabled, isSubjectValidAndButtonEnabled, isMessageValidAndButtonEnabled,
    isFormValid,
    onFormSubmit,
    isLoading,
  } = UseContactMe()

  return (
    <div className="space-y-8 pt-5">
      <Toast ref={toast} />
      <FloatLabel>
        <InputText id="name" className="w-full" value={name} onChange={updateName} invalid={!isNameValidAndButtonEnabled} />
        <label htmlFor="name">Name</label>
      </FloatLabel>

      <FloatLabel>
        <InputText id="email" className="w-full" value={email} onChange={updateEmail} invalid={!isEmailValidAndButtonEnabled} />
        <label htmlFor="email">Email</label>
      </FloatLabel>

      <FloatLabel>
        <InputText id="subject" className="w-full" value={subject} onChange={updateSubject} invalid={!isSubjectValidAndButtonEnabled} />
        <label htmlFor="subject">Subject</label>
      </FloatLabel>

      <FloatLabel>
        <InputTextarea id="message" rows={6} className="w-full " value={message} onChange={updateMessage} invalid={!isMessageValidAndButtonEnabled} />
        <label htmlFor="message">Message</label>
      </FloatLabel>

      <Button
        className="text-white bg-primary-600 hover:bg-transparent hover:text-black rounded-md text-lg px-4 py-3 w-full !mt-6"
        size="large"
        disabled={!isFormValid()}
        onClick={onFormSubmit}
        loading={isLoading}
      >
        <div className="flex items-center justify-center w-full">Send</div>
      </Button>
    </div>
  )
}