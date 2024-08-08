'use client'

import { useCallback, useEffect, useState } from 'react'
import { initParticlesEngine } from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'

export default function useParticlesBackground() {
  const [particlesInit, setParticlesInit] = useState(false)

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
      // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
      // starting from v2 you can add only the features you need reducing the bundle size
      //await loadAll(engine);
      //await loadFull(engine);
      await loadSlim(engine)
      //await loadBasic(engine);
    }).then(() => {
      setParticlesInit(true)
    })
  }, [])

  const particlesLoaded = useCallback(async (container) => {
    await console.log(container)
  }, [])

  return { particlesInit, particlesLoaded }
}
