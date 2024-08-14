import React from 'react'

type AnimatedOnScrollProps = {
  className: string
  children: string
}

export default function AnimatedOnScroll({ className, children }: AnimatedOnScrollProps) {
  return (
    <div className={className} data-aos="fade-up" data-aos-duration="1000" data-aos-once="true">
      {children}
    </div>
  )
}
