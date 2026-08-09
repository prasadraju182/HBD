import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import ChaosButton from './ChaosButton'

export default function ChaosSection() {
  return (
    <section className="py-20 md:py-32 px-4 md:px-8 bg-gradient-to-b from-soft-pink to-cream relative overflow-hidden">
      {/* Floating decorative elements */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-6xl opacity-10"
          animate={{ y: [0, -30, 0], rotate: 360 }}
          transition={{ duration: 6 + i * 2, repeat: Infinity }}
          style={{
            left: `${20 + i * 30}%`,
            top: '50%'
          }}
        >
          🎉
        </motion.div>
      ))}

      <div className="max-w-2xl mx-auto text-center relative z-10">
        {/* Announcement Section */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-sm md:text-base font-display font-semibold text-mid-pink mb-4 tracking-widest">
            IMPORTANT ANNOUNCEMENT
          </p>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-dark-gray mb-6">
            JYOTHIKA HAS BEEN OFFICIALLY<br />
            ANNOYING PEOPLE FOR ANOTHER YEAR.
          </h2>
          <p className="text-2xl text-magenta font-light">
            Honestly impressive. 😂
          </p>
        </motion.div>

        {/* Floating stickers */}
        <div className="flex justify-center gap-4 mb-12 text-4xl flex-wrap">
          <motion.span animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 2, repeat: Infinity }}>
            🎀
          </motion.span>
          <motion.span animate={{ y: [0, -10, 0] }} transition={{ duration: 2, repeat: Infinity }}>
            ✨
          </motion.span>
          <motion.span animate={{ rotate: [0, -10, 10, 0] }} transition={{ duration: 2, repeat: Infinity }}>
            💕
          </motion.span>
        </div>

        {/* Chaos Button */}
        <ChaosButton />
      </div>
    </section>
  )
}
