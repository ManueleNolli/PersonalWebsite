'use client'

import React, { useEffect, useState } from 'react'
import { ParticlesContext } from '@/app/context/particlesContext'
import { initParticlesEngine } from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'
import { loadPolygonMaskPlugin } from '@tsparticles/plugin-polygon-mask'

type ParticlesProviderProps = {
  children: React.ReactNode
}

export default function ParticlesProvider({ children }: ParticlesProviderProps) {
  const [particlesInit, setParticlesInit] = useState(false)

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
      // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
      // starting from v2 you can add only the features you need reducing the bundle size
      //await loadAll(engine);
      // await loadFull(engine)
      await loadSlim(engine)
      await loadPolygonMaskPlugin(engine)
      //await loadBasic(engine);
    }).then(() => {
      setParticlesInit(true)
    })
  }, [])

  return <ParticlesContext.Provider value={{ init: particlesInit }}>{children}</ParticlesContext.Provider>
}
