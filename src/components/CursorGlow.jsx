
import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

export default function CursorGlow() {
  const [position, setPosition] = useState({ x: -300, y: -300 })
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    if (reduceMotion) return

    const handlePointer = event => {
      if (event.pointerType !== 'mouse') return

      setPosition({
        x: event.clientX,
        y: event.clientY
      })
    }

    window.addEventListener('pointermove', handlePointer, { passive: true })

    return () => {
      window.removeEventListener('pointermove', handlePointer)
    }
  }, [reduceMotion])

  if (reduceMotion) return null

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[5] hidden h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-200/[0.055] blur-[85px] md:block"
      animate={{
        x: position.x,
        y: position.y
      }}
      transition={{
        type: 'spring',
        damping: 35,
        stiffness: 90,
        mass: 0.5
      }}
    />
  )
}
