'use client'
import React, { useContext } from 'react'
import { Particles as TSParticles } from '@tsparticles/react'
import './particlesBackground.css'
import { ParticlesContext } from '@/app/context/particlesContext'

export type ParticlesProps = {
  options: any
  id: string
}

export default function Particles({ options, id }: ParticlesProps) {
  const { init } = useContext(ParticlesContext)

  return (
    <>
      <TSParticles className="particlesPolygonMask" init={init} options={options} id={id} />
    </>
  )
}
