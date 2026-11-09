
import { motion } from 'framer-motion'

const letterVariants = {
  hidden: { opacity: 0, y: 60, rotateX: -90, filter: 'blur(10px)' },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    filter: 'blur(0px)',
    transition: {
      delay: 0.7 + i * 0.045,
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1]
    }
  })
}

export default function IntroGift({ onComplete }) {
  const title = 'MEMORIES'

  return (
    <section className="min-h-screen bg-[#101010] text-white flex items-center justify-center px-6 relative overflow-hidden">

      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full border border-amber-200/10"
        animate={{ rotate: 360, scale: [1, 1.08, 1] }}
        transition={{ rotate: { duration: 50, repeat: Infinity, ease: 'linear' }, scale: { duration: 8, repeat: Infinity } }}
      />

      <motion.div
        className="absolute w-[350px] h-[350px] rounded-full border border-amber-200/10"
        animate={{ rotate: -360, scale: [1.1, 1, 1.1] }}
        transition={{ rotate: { duration: 35, repeat: Infinity, ease: 'linear' }, scale: { duration: 6, repeat: Infinity } }}
      />

      <motion.div
        className="absolute w-80 h-80 bg-amber-200/10 rounded-full blur-[100px]"
        animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 6, repeat: Infinity }}
      />

      <div className="relative z-10 text-center max-w-5xl">

        <motion.p
          className="text-amber-200 text-[10px] md:text-xs tracking-[0.6em] uppercase mb-12"
          initial={{ opacity: 0, letterSpacing: '0.1em' }}
          animate={{ opacity: 1, letterSpacing: '0.6em' }}
          transition={{ duration: 1.5 }}
        >
          A collection of moments
        </motion.p>

        <div className="flex justify-center flex-wrap gap-1 md:gap-3 perspective-[1000px]">
          {title.split('').map((letter, i) => (
            <motion.span
              key={i}
              custom={i}
              variants={letterVariants}
              initial="hidden"
              animate="visible"
              className="font-serif text-5xl sm:text-7xl md:text-9xl text-amber-100 inline-block"
              style={{ textShadow: '0 0 35px rgba(232,207,145,0.18)' }}
            >
              {letter}
            </motion.span>
          ))}
        </div>

        <motion.h1
          className="font-serif italic text-3xl md:text-5xl text-white/70 mt-5"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          The story of us.
        </motion.h1>

        <motion.div
          className="w-20 h-px bg-amber-200 mx-auto my-10"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 2, duration: 1.2 }}
        />

        <motion.p
          className="text-white/50 text-sm md:text-base leading-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2 }}
        >
          A few photographs. Countless memories.
          <br />
          And a friendship worth remembering.
        </motion.p>

        <motion.button
          onClick={onComplete}
          className="mt-12 px-10 py-4 border border-amber-200/50 text-amber-100 text-xs tracking-[0.3em] uppercase hover:bg-amber-200 hover:text-black transition-all duration-500"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.6 }}
          whileHover={{
            scale: 1.07,
            boxShadow: '0 0 35px rgba(232,207,145,0.2)'
          }}
          whileTap={{ scale: 0.95 }}
        >
          Begin the journey →
        </motion.button>

      </div>
    </section>
  )
}
