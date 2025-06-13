import { useState } from 'react'

import { liqueurs, Liqueur } from '@/app/constants/liqueursIngredients'

export default function usePage() {
  const [selectedLiqueur, setSelectedLiqueur] = useState<Liqueur>(liqueurs[0])

  return {
    selectedLiqueur, setSelectedLiqueur,
  }

}