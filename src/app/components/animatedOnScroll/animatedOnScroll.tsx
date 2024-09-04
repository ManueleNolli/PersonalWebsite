import React from 'react'

type AnimatedOnScrollProps = {
  className?: string
  children: React.ReactNode
  animationStart?: string
}

export default function AnimatedOnScroll({ className, children, animationStart="bottom-bottom" }: AnimatedOnScrollProps) {
  return (
    <div className={className} data-aos="fade-up" data-aos-duration="1000" data-aos-once="true" data-aos-anchor-placement={animationStart}>
      {children}
    </div>
  )
}
