import React from 'react'

type AnimatedOnScrollProps = {
  className?: string
  children: React.ReactNode
  animationStart?: 'bottom-bottom'
}

export default function AnimatedOnScroll({ className, children, animationStart }: AnimatedOnScrollProps) {
  return (
    <div className={className} data-aos="fade-up" data-aos-duration="1000" data-aos-once="true" data-aos-anchor-placement={animationStart}>
      {children}
    </div>
  )
}
