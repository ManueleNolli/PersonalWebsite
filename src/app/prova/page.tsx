import HorizontalScroll from '@/app/components/horizontalScroll/horizontalScroll'
import React from 'react'

export default function Prova() {
  return (
    <div>
      <div className="w-full h-[50vh] bg-orange-500">
        <h1>VERTICAL</h1>
      </div>
      <HorizontalScroll>
        <div className="w-[1500px] bg-red-500 panel">
          <h1>Prova 1</h1>
        </div>
        <div className="w-[1500px] bg-blue-500 panel">
          <h1>Prova 2</h1>
        </div>
        <div className="w-[1500px] bg-yellow-500 panel">
          <h1>Prova 3</h1>
        </div>
      </HorizontalScroll>
      <div className="w-full h-[50vh] bg-orange-300">
        <h1>VERTICAL 2</h1>
      </div>
    </div>
  )
}
