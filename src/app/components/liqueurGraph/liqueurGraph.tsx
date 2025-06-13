'use client'

import dynamic from 'next/dynamic'
import { useState } from 'react'
const ForceGraph2D = dynamic(() => import('react-force-graph-2d'), { ssr: false })


type LiqueurNodeProps = {
  partToBeMacerated: string
}

export default function LiqueurGraph({ partToBeMacerated }: LiqueurNodeProps) {
/* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
  const [hoveredNode, setHoveredNode] = useState<any>(null)
  const [data] = useState({
    nodes: [
      { id: '1', label: 'Alcohol', fy: 0 },
      { id: '2', label: partToBeMacerated, fy: 0 },
      { id: '3', label: 'Alcohol By Volume', fy: 50 },
      { id: '4', label: 'Sugar Content', fy: 100 },
      { id: '5', label: 'Total Volume', fy: 25 },
      { id: '6', label: 'Sugar', fy: 25 },
      { id: '7', label: 'Water', fy: 75 },
      { id: '8', label: 'Maceration Time', fy: -50 },
      { id: '10', label: 'Intensity', fy: -25 },
      { id: '11', label: 'Flavour', fy: -50 },
    ],
    links: [
      { source: '1', target: '2' },
      { source: '1', target: '7' },
      { source: '1', target: '5' },
      { source: '2', target: '5' },
      { source: '3', target: '5' },
      { source: '4', target: '6' },
      { source: '5', target: '6' },
      { source: '5', target: '7' },
      { source: '6', target: '7' },
      { source: '8', target: '11' },
      { source: '1', target: '10' },
      { source: '2', target: '10' },
    ],
  })

  return (
    <div className="relative w-full h-96 border border-primary-400 rounded-lg overflow-hidden">
      <ForceGraph2D
        graphData={data}
        height={384}
        dagMode="lr"
        dagLevelDistance={100}
        onNodeHover={setHoveredNode}
        nodeLabel="label"
        nodePointerAreaPaint={(node, color, ctx) => {
          const fontSize = 14
          ctx.font = `${fontSize}px Sans-Serif`
          const textWidth = ctx.measureText(node.label).width
          const padding = 6 // Increase this for a larger hit area
          const width = textWidth + padding * 2
          const height = fontSize + padding * 2

          ctx.fillStyle = color
          ctx.fillRect(
            node.x! - width / 2,
            node.y! - height / 2,
            width,
            height,
          )
        }}
        nodeCanvasObject={(node, ctx, globalScale) => {
          const fontSize = 14 / globalScale
          ctx.font = `${fontSize}px `
          ctx.fillStyle = node === hoveredNode ? '#024955' : '#047f94'
          ctx.textAlign = 'center'
          ctx.textBaseline = 'middle'
          ctx.fillText(node.label, node.x!, node.y!)
        }}
        linkDirectionalParticles={(link) =>
          hoveredNode && link.source === hoveredNode ? 10 : 0
        }
        linkDirectionalArrowLength={6}
        linkDirectionalArrowRelPos={0.5}
        linkDirectionalParticleSpeed={() => 0.001}
        linkDirectionalParticleWidth={(link) =>
          hoveredNode && link.source === hoveredNode ? 3 : 0
        }
        linkDirectionalParticleColor={() => '#35c4dc'}
      />
    </div>
  )
}