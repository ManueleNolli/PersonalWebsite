'use client' // Error boundaries must be Client Components

import React, { useEffect } from 'react'
import { Image } from 'primereact/image'
import { Button } from 'primereact/button'

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {}, [error])

  return (
    <div className="p-16 h-full w-full flex flex-col justify-center text-center">
      <h1 className="text-red-600 text-2xl font-bold mx-auto">{error.message}</h1>
      <Image src="/error.png" alt="Error" imageClassName="w-32 h-32 m-4 mx-auto" />
      <Button className="text-white bg-red-500 hover:bg-transparent rounded-md text-lg m-auto border-1 border-red-400" onClick={() => reset()}>
        Try again
      </Button>
    </div>
  )
}
