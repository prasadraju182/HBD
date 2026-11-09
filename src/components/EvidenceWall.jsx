
import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { memories } from '../data/memories'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

export default function EvidenceWall() {
  const [selected, setSelected] = useState(null)

  const close = () => setSelected(null)

  const previous = () => {
    setSelected((current) =>
      current === 0 ? memories.length - 1 : current - 1
    )
  }

  const next = () => {
    setSelected((current) =>
      current === memories.length - 1 ? 0 : current + 1
    )
  }

  useEffect(() => {
    if (selected === null) return

    const handleKey = (event) => {
      if (event.key === 'Escape') close()
      if (event.key === 'ArrowLeft') previous()
      if (event.key === 'ArrowRight') next()
    }

    window.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'

    return () => {
      window.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [selected])

  return (
    <section
      id="gallery"
      className="bg-[#101010] py-28 px-5 md:px-10"
    >
      <div className="max-w-7xl mx-auto">

        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-amber-200 text-xs tracking-[0.5em] uppercase mb-5">
            Chapter 02 · Captured moments
          </p>

          <h2 className="font-serif text-4xl md:text-6xl">
            Frames of <span className="italic text-amber-200">friendship.</span>
          </h2>

          <p className="text-white/40 mt-5">
            Click a photograph. Revisit a moment.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {memories.map((memory, index) => (
            <motion.button
              type="button"
              key={memory.id}
              onClick={() => setSelected(index)}
              className="group text-left outline-none"
              initial={{ opacity: 0, y: 60, rotateX: 12 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.8,
                delay: (index % 3) * 0.12
              }}
              whileHover={{ y: -10, scale: 1.015 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-[#242424]">
                <motion.img
                  src={memory.image}
                  alt={memory.title}
                  loading="lazy"
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.12 }}
                  transition={{ duration: 1.1, ease: 'easeOut' }}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent opacity-90" />

                <div className="absolute inset-0 border border-white/0 group-hover:border-amber-200/50 transition-all duration-500" />

                <div className="absolute top-5 left-5">
                  <span className="text-[10px] tracking-[0.3em] uppercase text-amber-200">
                    Memory {String(memory.id).padStart(2, '0')}
                  </span>
                </div>

                <div className="absolute bottom-0 left-0 p-7">
                  <p className="font-serif text-2xl text-white">
                    {memory.title}
                  </p>
                  <p className="text-white/60 text-sm mt-2">
                    {memory.caption}
                  </p>
                  <p className="text-amber-200 text-[10px] uppercase tracking-[0.25em] mt-5 opacity-0 group-hover:opacity-100 transition duration-500">
                    View memory ↗
                  </p>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Cinematic photo viewer */}
      <AnimatePresence>
        {selected !== null && (
          <motion.div
            className="fixed inset-0 z-[120] bg-black/95 backdrop-blur-xl flex items-center justify-center p-5 md:p-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          >
            <motion.button
              onClick={close}
              className="absolute top-6 right-6 text-white/70 hover:text-amber-200 z-20"
              aria-label="Close photo"
            >
              <X size={30} />
            </motion.button>

            <motion.button
              onClick={(event) => {
                event.stopPropagation()
                previous()
              }}
              className="absolute left-3 md:left-8 text-white/70 hover:text-amber-200 z-20"
              aria-label="Previous photo"
            >
              <ChevronLeft size={36} />
            </motion.button>

            <motion.div
              key={selected}
              className="max-w-5xl w-full text-center"
              initial={{ opacity: 0, scale: 0.92, y: 25 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.5 }}
              onClick={(event) => event.stopPropagation()}
            >
              <img
                src={memories[selected].image}
                alt={memories[selected].title}
                className="max-h-[72vh] w-auto max-w-full mx-auto object-contain shadow-2xl"
              />

              <p className="text-amber-200 text-xs tracking-[0.4em] uppercase mt-8">
                Memory {String(memories[selected].id).padStart(2, '0')}
              </p>

              <h3 className="font-serif text-3xl md:text-4xl mt-3">
                {memories[selected].title}
              </h3>

              <p className="text-white/50 mt-3">
                {memories[selected].caption}
              </p>
            </motion.div>

            <motion.button
              onClick={(event) => {
                event.stopPropagation()
                next()
              }}
              className="absolute right-3 md:right-8 text-white/70 hover:text-amber-200 z-20"
              aria-label="Next photo"
            >
              <ChevronRight size={36} />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
