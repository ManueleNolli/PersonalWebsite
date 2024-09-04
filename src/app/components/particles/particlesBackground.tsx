'use client'
import React, { useContext } from 'react'
import Particles from '@tsparticles/react'
import './style.css'
import { ParticlesContext } from '@/app/context/particlesContext'

export type ParticlesBackgroundProps = {
  children: React.ReactNode
  options: any
  id: string
}

export default function ParticlesBackground({ children, options, id }: ParticlesBackgroundProps) {
  const { init } = useContext(ParticlesContext)

  return (
    <div style={{ position: 'relative' }}>
      {/*@ts-ignore*/}
      <Particles className="particlesBackground" init={init} options={options} id={id} />
      <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>
    </div>
  )
}
