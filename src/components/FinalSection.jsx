import { motion } from 'framer-motion'

export default function FinalSection() {
  return (
    <section
      id="letter"
      className="min-h-screen flex items-center justify-center px-6 py-28 bg-[#101010] text-center"
    >
      <motion.div
        className="max-w-3xl"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <p className="text-amber-200 text-xs tracking-[0.5em] uppercase mb-10">
          One last thing
        </p>

        <h2 className="font-serif text-5xl md:text-7xl leading-tight mb-10">
          Some people make
          <br />
          ordinary days
          <br />
          <span className="italic text-amber-200">extraordinary.</span>
        </h2>

        <div className="w-16 h-px bg-amber-200 mx-auto mb-10" />

        <p className="text-white/60 text-base md:text-lg leading-9">
          Thank you for being part of these memories.
          For the laughter, the random conversations,
          the unforgettable moments and everything in between.
          No matter where life takes us, these memories
          will always have a special place.
        </p>

        <p className="font-serif italic text-2xl text-amber-200 mt-12">
          Here's to all the memories we've made,
          and all the ones still waiting for us.
        </p>

        <p className="text-white/30 text-xs tracking-[0.4em] uppercase mt-20">
          The story continues.
        </p>
      </motion.div>
    </section>
  )
}