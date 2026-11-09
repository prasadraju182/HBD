
import { motion } from 'framer-motion'
import { Sparkles, ArrowRight } from 'lucide-react'

const stars = Array.from({ length: 18 }, (_, i) => ({
  left: `${(i * 37 + 11) % 100}%`,
  top: `${(i * 53 + 7) % 100}%`,
  delay: (i % 6) * 0.35,
  size: i % 3 === 0 ? 5 : 3,
}))

export default function IntroGift({ onComplete }) {
  return (
    <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-[#09090a] px-6 text-center">

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_48%,rgba(193,153,91,.17),transparent_42%)]" />

      <div className="pointer-events-none absolute inset-0">
        {stars.map((star, i) => (
          <motion.span
            key={i}
            className="absolute rounded-full bg-amber-100"
            style={{
              left: star.left,
              top: star.top,
              width: star.size,
              height: star.size
            }}
            animate={{
              opacity: [0.12, 0.9, 0.12],
              scale: [0.7, 1.35, 0.7]
            }}
            transition={{
              duration: 3 + (i % 4),
              delay: star.delay,
              repeat: Infinity
            }}
          />
        ))}
      </div>

      <motion.div
        className="relative z-10 mx-auto max-w-2xl"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1 }}
      >

        <motion.div
          className="relative mx-auto mb-12 grid h-36 w-36 place-items-center sm:h-44 sm:w-44"
          animate={{ y: [0, -9, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <motion.div
            className="absolute inset-0 rounded-full border border-amber-200/30"
            animate={{ rotate: 360, scale: [1, 1.06, 1] }}
            transition={{
              rotate: { duration: 24, repeat: Infinity, ease: 'linear' },
              scale: { duration: 4, repeat: Infinity }
            }}
          />

          <motion.div
            className="absolute inset-3 rounded-full border border-dashed border-amber-100/25"
            animate={{ rotate: -360 }}
            transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
          />

          <div className="grid h-24 w-24 place-items-center rounded-full bg-gradient-to-br from-[#d7b77c] via-[#8e6b3d] to-[#3d2c1c] shadow-[0_0_70px_rgba(205,165,101,.22)] sm:h-28 sm:w-28">
            <Sparkles size={38} strokeWidth={1.1} className="text-[#fff3d7]" />
          </div>
        </motion.div>

        <p className="mb-5 text-[9px] uppercase tracking-[0.55em] text-amber-200/65 sm:text-[10px]">
          A private little time capsule
        </p>

        <h1 className="font-serif text-4xl leading-tight tracking-tight text-[#f6efe4] sm:text-6xl">
          Some memories
          <br />
          <span className="italic text-amber-200">never fade.</span>
        </h1>

        <p className="mx-auto mt-6 max-w-md text-sm leading-7 text-white/45 sm:text-base">
          A collection of moments, laughter and stories worth revisiting.
          This little world is waiting for you.
        </p>

        <motion.button
          type="button"
          onClick={onComplete}
          className="group mt-10 inline-flex min-h-14 items-center gap-4 border border-amber-200/45 px-8 py-4 text-[10px] uppercase tracking-[0.3em] text-amber-100 transition duration-500 hover:bg-amber-200 hover:text-[#111]"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
        >
          Open the memories
          <ArrowRight size={15} />
        </motion.button>

        <p className="mt-5 text-[9px] tracking-[0.18em] text-white/25">
          TAP TO BEGIN · SOUND WILL START
        </p>
      </motion.div>
    </section>
  )
}
