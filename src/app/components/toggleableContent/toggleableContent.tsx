import React, { useRef, useState, useLayoutEffect, type ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

interface ToggleableContentProps {
  title: string
  children: ReactNode
  startStatus?: boolean
}

export default function ToggleableContent({
  title,
  children,
  startStatus = false,
}: ToggleableContentProps) {
  const [isOpen, setIsOpen] = useState(startStatus)
  const contentRef = useRef<HTMLDivElement | null>(null)
  const [height, setHeight] = useState<number>(0)

  // measure actual height on every open (to animate to that value)
  useLayoutEffect(() => {
    if (isOpen && contentRef.current) {
      setHeight(contentRef.current.scrollHeight)
    }
  }, [isOpen, children])

  return (
    <div className={`w-full rounded-md overflow-hidden ${isOpen ? 'shadow-lg' : ''}`}>
      <button
        onClick={() => setIsOpen(o => !o)}
        className="flex items-center justify-between w-full p-3 text-lg font-semibold hover:bg-primary-400 hover:text-primary-100 rounded-t-md"
      >
        <span className="w-full text-center">{title}</span>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
          <ChevronDown size={20} />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height, opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden rounded-b-md"
          >
            <div ref={contentRef} className="p-3">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
