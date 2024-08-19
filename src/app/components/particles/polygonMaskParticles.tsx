'use client'
import React, { useContext, useEffect, useState } from 'react'
import { Particles as TSParticles } from '@tsparticles/react'
import { ParticlesContext } from '@/app/context/particlesContext'
import './style.css'
import { polygonMaskParticles } from '@/app/constants/polygonMaskParticles'

export type ParticlesProps = {
  url: string
  id: string
}

export default function PolygonMaskParticles({ url, id }: ParticlesProps) {
  const { init } = useContext(ParticlesContext)
  const [options, setOptions] = useState(polygonMaskParticles(1, 200, url))

  useEffect(() => {
    if (window.innerWidth <= 768) {
      setOptions(polygonMaskParticles(0.5, 100, url))
    }
  }, [url])

  return <TSParticles className="particlesNormal" init={init} options={options} id={id} />
}
