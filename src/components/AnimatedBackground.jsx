
import { motion, useReducedMotion } from 'framer-motion'

const particles = Array.from({ length: 18 }, (_, i) => ({
  left: `${(i * 29 + 13) % 100}%`,
  top: `${(i * 47 + 9) % 100}%`,
  delay: (i % 7) * 0.55,
  duration: 7 + (i % 5) * 1.5
}))

export default function AnimatedBackground() {
  const reduceMotion = useReducedMotion()

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.018)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.018)_1px,transparent_1px)] bg-[size:72px_72px] opacity-30" />

      <motion.div
        className="absolute -left-40 top-[12%] h-80 w-80 rounded-full bg-amber-300/[0.07] blur-[100px]"
        animate={reduceMotion ? {} : { x: [0, 70, 0], y: [0, 45, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        className="absolute -right-40 bottom-[8%] h-96 w-96 rounded-full bg-violet-300/[0.045] blur-[110px]"
        animate={reduceMotion ? {} : { x: [0, -55, 0], y: [0, -45, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }}
      />

      {!reduceMotion && particles.map((particle, i) => (
        <motion.span
          key={i}
          className="absolute h-[2px] w-[2px] rounded-full bg-amber-100/70"
          style={{
            left: particle.left,
            top: particle.top
          }}
          animate={{
            y: [0, -22, 0],
            opacity: [0.08, 0.55, 0.08]
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
      ))}

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(0,0,0,.48)_100%)]" />
    </div>
  )
}
