
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const PARTICLES = Array.from({ length: 24 }, (_, i) => ({
  id: i,
  left: `${(i * 37) % 100}%`,
  delay: (i % 8) * 0.7,
  duration: 9 + (i % 7) * 2,
  size: 2 + (i % 4),
}))

export default function CinematicEffects() {
  const [hearts, setHearts] = useState([])
  const [pointer, setPointer] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleClick = (event) => {
      const id = Date.now() + Math.random()

      setHearts((previous) => [
        ...previous.slice(-7),
        { id, x: event.clientX, y: event.clientY },
      ])

      setTimeout(() => {
        setHearts((previous) => previous.filter((heart) => heart.id !== id))
      }, 1200)
    }

    const handleMouseMove = (event) => {
      setPointer({
        x: event.clientX,
        y: event.clientY,
      })
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('cinematic-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12 }
    )

    const observeSections = () => {
      document
        .querySelectorAll(
          'main section, main > div > section, .cinematic-reveal'
        )
        .forEach((element) => {
          if (!element.classList.contains('cinematic-observed')) {
            element.classList.add('cinematic-observed')
            observer.observe(element)
          }
        })
    }

    handleClick // Keep the handler available for the effect cleanup.

    document.addEventListener('click', handleClick)
    window.addEventListener('mousemove', handleMouseMove)

    observeSections()

    const mutationObserver = new MutationObserver(observeSections)
    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    })

    return () => {
      document.removeEventListener('click', handleClick)
      window.removeEventListener('mousemove', handleMouseMove)
      mutationObserver.disconnect()
      observer.disconnect()
    }
  }, [])

  return (
    <>
      {/* Floating golden particles */}
      <div className="cinematic-particles" aria-hidden="true">
        {PARTICLES.map((particle) => (
          <motion.span
            key={particle.id}
            className="cinematic-particle"
            style={{
              left: particle.left,
              width: particle.size,
              height: particle.size,
            }}
            animate={{
              y: ['110vh', '-10vh'],
              opacity: [0, 0.8, 0.3, 0],
              scale: [0.6, 1.3, 0.7],
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        ))}
      </div>

      {/* Soft cursor glow */}
      <motion.div
        className="cinematic-cursor-glow"
        animate={{
          x: pointer.x - 140,
          y: pointer.y - 140,
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 100 }}
        aria-hidden="true"
      />

      {/* Hearts on click */}
      <div className="cinematic-heart-layer" aria-hidden="true">
        <AnimatePresence>
          {hearts.map((heart) => (
            <motion.span
              key={heart.id}
              initial={{
                x: heart.x,
                y: heart.y,
                opacity: 1,
                scale: 0.4,
              }}
              animate={{
                y: heart.y - 100,
                opacity: 0,
                scale: 1.5,
                rotate: 20,
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.1, ease: 'easeOut' }}
              className="cinematic-heart"
            >
              ♥
            </motion.span>
          ))}
        </AnimatePresence>
      </div>
    </>
  )
}
