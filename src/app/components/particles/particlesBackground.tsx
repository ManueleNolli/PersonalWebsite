'use client'
import React, { useContext } from 'react'
import Particles from '@tsparticles/react'
import './style.css'
import { ParticlesContext } from '@/app/context/particlesContext'

export type ParticlesBackgroundProps = {
  children: React.ReactNode
// eslint-disable-next-line  @typescript-eslint/no-explicit-any
  options: any
  id: string
}

export default function ParticlesBackground({ children, options, id }: ParticlesBackgroundProps) {
  const { init } = useContext(ParticlesContext)

  return (
    <div style={{ position: 'relative' }}>
      {init && <Particles className="particlesBackground" options={options} id={id} />}
      <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>
    </div>
  )
}
