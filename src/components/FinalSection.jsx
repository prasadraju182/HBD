import { motion } from 'framer-motion'
import { RotateCcw } from 'lucide-react'

export default function FinalSection({ onReplay }) {
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.3,
        duration: 0.8
      }
    })
  }

  return (
    <section className="min-h-screen bg-gradient-to-b from-cream via-soft-pink to-white flex flex-col items-center justify-center px-4 py-20 relative overflow-hidden">
      {/* Floating ribbons */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-6xl opacity-10"
          animate={{
            y: [window.innerHeight, -100],
            opacity: [0, 0.1, 0],
            x: Math.sin(i) * 50
          }}
          transition={{
            duration: 4 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.5
          }}
          style={{
            left: `${20 + i * 15}%`
          }}
        >
          🎀
        </motion.div>
      ))}

      <motion.div
        className="text-center max-w-2xl relative z-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        {/* AND FINALLY */}
        <motion.p
          className="text-lg md:text-xl text-mid-pink font-display font-semibold mb-6 tracking-widest"
          custom={0}
          variants={textVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          AND FINALLY...
        </motion.p>

        {/* Main Message */}
        <motion.h2
          className="text-4xl md:text-6xl font-serif font-bold text-dark-gray mb-8 leading-tight"
          custom={1}
          variants={textVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          HAPPY BIRTHDAY,<br />
          <span className="bg-gradient-to-r from-mid-pink to-magenta bg-clip-text text-transparent">
            JYOTHIKA
          </span>
          <span className="block mt-2">❤️</span>
        </motion.h2>

        {/* Divider */}
        <motion.div
          className="h-0.5 w-20 mx-auto mb-8 bg-gradient-to-r from-transparent via-mid-pink to-transparent"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          viewport={{ once: true }}
        />

        {/* Quote 1 */}
        <motion.p
          className="text-lg md:text-xl text-dark-gray font-light leading-relaxed mb-8"
          custom={2}
          variants={textVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          May this year bring you ridiculous amounts of happiness, amazing memories, good people, and just enough chaos to keep life interesting.
        </motion.p>

        {/* Quote 2 */}
        <motion.p
          className="text-xl md:text-2xl font-serif font-bold text-magenta mb-12"
          custom={3}
          variants={textVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          Keep smiling. Keep annoying people. Keep being you. 😂❤️
        </motion.p>

        {/* Animated Heart */}
        <motion.div
          className="text-7xl mb-12"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          viewport={{ once: true }}
        >
          ❤️
        </motion.div>

        {/* The End */}
        <motion.div
          className="space-y-4 mb-12"
          custom={4}
          variants={textVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <p className="text-3xl md:text-4xl font-serif font-bold text-dark-gray">
            THE END.
          </p>
          <p className="text-lg md:text-xl text-mid-pink font-light">
            Probably. 👀
          </p>
        </motion.div>

        {/* Replay Button */}
        <motion.button
          onClick={onReplay}
          className="mt-8 px-8 md:px-10 py-4 md:py-5 rounded-full bg-gradient-to-r from-mid-pink to-magenta text-white font-display font-bold shadow-soft hover:shadow-soft-lg transition-all flex items-center gap-3 mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <RotateCcw className="w-5 h-5" />
          <span>REPLAY THE CHAOS</span>
        </motion.button>
      </motion.div>
    </section>
  )
}
