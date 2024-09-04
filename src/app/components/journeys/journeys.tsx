'use client'

import { config, Journey } from '@/app/constants/config'
import React from 'react'
import useJourneys from '@/app/components/journeys/useJourneys'

import './journeys.css'
import AnimatedOnScroll from '@/app/components/animatedOnScroll/animatedOnScroll'

export default function Journeys() {
  const { journeysWrapper, journeys, progressBar } = useJourneys()

  const renderJourneyItem = (journey: Journey, index: number) => {
    return (
      <div
        className={`journey-item opacity-0 text-primary-50 relative mx-auto md:max-w-[80vw] max-w-[95vw]
                 ${index % 2 == 0 ? ' bottom-[20%]' : 'top-[25%]'}`}>
        <div
          className={`absolute left-[50%] w-1 rounded bg-primary-100 journey-line
          ${index % 2 == 0 ? ' top-[100%]' : 'bottom-[100%]'}`}
        />
        <div className="md:text-2xl text-xl font-bold leading-relaxed text-left">
          {journey.title} {journey.active ? <span className="animate-ping absolute h-2 w-2 rounded-full bg-green-400 opacity-75"></span> : ''}
        </div>
        {journey.location.map((location, index) => (
          <div className="md:text-lg text-md hover:text-primary-100 leading-relaxed" key={index}>
            📍 <a href={location.url}>{location.name}</a>
          </div>
        ))}
        {journey.goal &&
          journey.goal.map((goal, index) => (
            <div className="md:text-lg text-md hover:text-primary-100 leading-relaxed" key={index}>
              🎯 <a href={goal.url}>{goal.name}</a>
            </div>
          ))}

        {journey.work && (
          <div className="md:text-lg text-md hover:text-primary-100 leading-relaxed">
            💼{' '}
            <a href={journey.work.url}>
              {journey.work.title} at {journey.work.location}
            </a>
          </div>
        )}
        {journey.news &&
          journey.news.map((news, index) => (
            <div className="md:text-lg text-md hover:text-primary-100 leading-relaxed" key={index}>
              🗞️ <a href={news.url}>{news.name}</a>
            </div>
          ))}
      </div>
    )
  }

  return (
    <div className="journeysWrapper font-mono" ref={journeysWrapper}>
      {/* children must have className 'slider-panel' to be included in the scroll animation`*/}
      <div className="h-[10%] top-[8%] w-screen left-0 right-0 absolute flex items-center justify-center">
        <AnimatedOnScroll className="text-3xl md:text-5xl font-bold text-primary-50">Journey</AnimatedOnScroll>
      </div>
      <div className="journeys" ref={journeys}>
        {config.journey_journeys.map((journey, index) => (
          <div key={index} className={`flex items-center justify-center h-screen md:w-screen w-[200vw]`}
          >
        {renderJourneyItem(journey, index)}
          </div>
          ))}
      </div>
      <div className="w-screen h-[10px] fixed top-[50%] translate-y-[-5px] bg-primary-100 opacity-0" ref={progressBar} />
    </div>
  )
}
