'use client'
import React, { useContext } from 'react'
import { Particles as TSParticles } from '@tsparticles/react'
import { ParticlesContext } from '@/app/context/particlesContext'
import './style.css'

export type ParticlesProps = {
  options: any
  id: string
}

export default function Particles({ options, id }: ParticlesProps) {
  const { init } = useContext(ParticlesContext)

  return (
    <>
      <TSParticles className="particlesNormal" init={init} options={options} id={id} />
    </>
  )
}
