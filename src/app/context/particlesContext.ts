import { createContext } from 'react'

type ParticlesContextType = {
  init: boolean
}

export const ParticlesContext = createContext<ParticlesContextType>({
  init: false,
})
