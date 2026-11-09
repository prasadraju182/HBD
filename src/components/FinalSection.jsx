
import { motion } from 'framer-motion'
import { Heart, Sparkles } from 'lucide-react'

export default function FinalSection() {
  return (
    <section className="relative flex min-h-[90svh] items-center justify-center overflow-hidden bg-[#09090a] px-6 py-28 text-center">

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(205,165,100,.12),transparent_55%)]" />

      <motion.div
        className="relative z-10 mx-auto max-w-3xl"
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.12, 1] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="mb-9 flex justify-center text-amber-200"
        >
          <Heart size={45} strokeWidth={1} />
        </motion.div>

        <p className="mb-6 text-[9px] uppercase tracking-[0.45em] text-amber-200/70">
          And this is not the end
        </p>

        <h2 className="font-serif text-5xl leading-tight text-white sm:text-7xl">
          To more memories,
          <br />
          <span className="italic text-amber-200">Jyothika.</span>
        </h2>

        <p className="mx-auto mt-8 max-w-xl text-sm leading-8 text-white/55 sm:text-base">
          May life bring you happiness, beautiful surprises,
          endless laughter and countless reasons to smile.
          Keep being yourself. The world needs your kind of chaos.
        </p>

        <motion.div
          className="mt-12 flex justify-center text-amber-200/70"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          <Sparkles size={25} />
        </motion.div>

        <p className="mt-10 font-serif text-xl italic text-amber-100/80">
          Some friendships become forever memories. ❤️
        </p>

        <p className="mt-8 text-[9px] uppercase tracking-[0.35em] text-white/30">
          The end of this page · Not the story
        </p>
      </motion.div>
    </section>
  )
}
