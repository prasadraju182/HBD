import { motion } from 'framer-motion'

const moments = [
  'The conversations that never seem to end.',
  'Laughing at things nobody else understands.',
  'The random plans that somehow become memories.',
  'The silly arguments and instant forgiveness.',
  'The moments that make absolutely no sense to anyone else.'
]

export default function ChaosSection() {
  return (
    <section
      id="moments"
      className="py-28 md:py-40 px-6 bg-[#191919]"
    >
      <div className="max-w-4xl mx-auto text-center">
        <motion.p
          className="text-amber-200 text-xs tracking-[0.5em] uppercase mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Chapter 03 · The little things
        </motion.p>

        <motion.h2
          className="font-serif text-4xl md:text-6xl mb-16"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          It's always the <span className="italic text-amber-200">little things.</span>
        </motion.h2>

        <div className="space-y-5 text-left">
          {moments.map((moment, index) => (
            <motion.div
              key={index}
              className="border-b border-white/10 py-6 flex gap-6 items-start"
              initial={{ opacity: 0, x: -25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <span className="text-amber-200 font-serif text-xl">
                0{index + 1}
              </span>
              <p className="text-white/70 text-lg md:text-xl font-serif">
                {moment}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}