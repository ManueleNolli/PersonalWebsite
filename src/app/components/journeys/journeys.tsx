'use client'

import AnimatedOnScroll from '@/app/components/animatedOnScroll/animatedOnScroll'
import { config, Journey } from '@/app/constants/config'
import React from 'react'
import useJourneys from '@/app/components/journeys/useJourneys'

import './journeys.css'

export default function Journeys() {
  const {slider} = useJourneys()

      const renderJourneyItem = (journey: Journey, index:number) => {
      return (
        <AnimatedOnScroll className={`text-primary-50 journey max-w-[60%] w-[60%] relative
                 ${index % 2 == 0 ? ' bottom-[20%]' : 'top-[20%]'}
        `}>
          <div className="text-2xl font-bold leading-relaxed">{journey.title}</div>
          {journey.location.map((location, index) => (
            <div className="text-lg hover:text-primary-100 leading-relaxed" key={index}>
              📍 <a  href={location.url}>{location.name}</a>
            </div>
          ))}
          {journey.goal &&
            journey.goal.map((goal, index) => (
              <div className="text-lg hover:text-primary-100 leading-relaxed" key={index}>
                🎯 <a href={goal.url}>{goal.name}</a>
              </div>
            ))}

          {journey.work && (
            <div className="text-lg hover:text-primary-100 leading-relaxed">
              💼 <a href={journey.work.url}>{journey.work.title}</a> at {journey.work.location}
            </div>
          )}
        </AnimatedOnScroll>
      )
    }


  return (
    <div className="slider-container" ref={slider}>
      {/* children must have className 'slider-panel' to be included in the scroll animation`*/}
      <div className="h-[10%] top-[8%] w-screen left-0 right-0 absolute flex items-center justify-center">
        <AnimatedOnScroll className="text-5xl font-bold text-primary-50">Experience</AnimatedOnScroll>
      </div>
      {config.journey_journeys.map((journey, index) => (
          <div key={index}
               className={`slider-panel flex items-center justify-center 
                 ${index == config.journey_journeys.length - 1 ? 'slider-panel-last' : ''}
                 ${index == 0 ? 'slider-panel-first' : ''}
                 `}>
            {renderJourneyItem(journey, index)}
          </div>
      ))}
      <div className="slider-progressbar bg-primary-100" />
    </div>
  )
}