import { motion } from 'framer-motion'

export default function PhotoStory() {
  return (
    <section
      id="story"
      className="py-28 md:py-40 px-6 bg-[#171717] text-center"
    >
      <motion.div
        className="max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <p className="text-amber-200 text-xs tracking-[0.5em] uppercase mb-8">
          Chapter 01 · The beginning
        </p>

        <h2 className="font-serif text-4xl md:text-6xl leading-tight mb-10">
          Every friendship has
          <br />
          <span className="italic text-amber-200">a story.</span>
        </h2>

        <p className="text-white/60 leading-8 text-base md:text-lg">
          Some memories happen without planning. Some moments become
          unforgettable without us even realising it. And somewhere
          between all the conversations, laughter and random adventures,
          we collected stories worth remembering.
        </p>

        <p className="mt-8 text-white/40 italic font-serif text-xl">
          This is a little piece of ours.
        </p>
      </motion.div>
    </section>
  )
}