'use client'

import React, { useRef, useState } from 'react'
import { Toast } from 'primereact/toast'
import { config } from '@/app/constants/config'

export default function UseContactMe() {
  const { contact_mail, sender_mail } = config
  const toast = useRef<Toast>(null)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [isNameValid, setIsNameValid] = useState(false)
  const [isEmailValid, setIsEmailValid] = useState(false)
  const [isSubjectValid, setIsSubjectValid] = useState(false)
  const [isMessageValid, setIsMessageValid] = useState(false)
  const [isFormEnabled, setIsFormEnabled] = useState(false) // To manage first time form validation
  const [isLoading, setIsLoading] = useState(false)

  const isNameValidAndButtonEnabled = isFormEnabled ? isNameValid : true
  const isEmailValidAndButtonEnabled = isFormEnabled ? isEmailValid : true
  const isSubjectValidAndButtonEnabled = isFormEnabled ? isSubjectValid : true
  const isMessageValidAndButtonEnabled = isFormEnabled ? isMessageValid : true

  const updateName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)
    setIsNameValid(event.target.value.length > 0)
    setIsFormEnabled(true)
  }

  const updateEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
    const emailRegex = new RegExp(/^[\w._-]+[+]?[\w._-]+@[\w.-]+\.[a-zA-Z]{2,6}$/)
    setIsEmailValid(emailRegex.test(event.target.value))
    setIsFormEnabled(true)
  }

  const updateSubject = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSubject(event.target.value)
    setIsSubjectValid(event.target.value.length > 0)
    setIsFormEnabled(true)
  }

  const updateMessage = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.target.value)
    setIsMessageValid(event.target.value.length > 0)
    setIsFormEnabled(true)
  }

  const isFormValid = () => {
    return isNameValid && isEmailValid && isSubjectValid && isMessageValid && isFormEnabled
  }

  const onFormSubmit = async () => {
    setIsLoading(true)

    const data = {
      source: sender_mail,
      to: contact_mail,
      subject: `New message from ${name} - ${email} - ${new Date().toLocaleString()} by manuelenolli.ch`,
      message: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\nMessage: ${message}`,
    }

    const response = await fetch('/mail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    setIsLoading(false)

    if (response.ok) {
      toast.current?.show({ severity: 'success', summary: 'Success', detail: 'Message Sent' })
      setName('')
      setEmail('')
      setSubject('')
      setMessage('')
    } else {
      toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Error during sending message, please try again' })
    }
  }

  return {
    toast,
    name,
    updateName,
    email,
    updateEmail,
    subject,
    updateSubject,
    message,
    updateMessage,
    isNameValidAndButtonEnabled,
    isEmailValidAndButtonEnabled,
    isSubjectValidAndButtonEnabled,
    isMessageValidAndButtonEnabled,
    isFormValid,
    onFormSubmit,
    isLoading,
  }
}