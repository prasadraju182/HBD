
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { memories } from '../data/memories'
import { Heart, X } from 'lucide-react'

export default function PolaroidWall() {
  const [selected, setSelected] = useState(null)

  return (
    <section id="polaroids" className="bg-[#11100f] px-5 py-24 sm:px-8 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <p className="text-[9px] uppercase tracking-[0.4em] text-amber-200/70">
            Little pieces of forever
          </p>
          <h2 className="mt-4 font-serif text-4xl text-white sm:text-6xl">
            Our <span className="italic text-amber-200">scrapbook.</span>
          </h2>
          <p className="mt-5 text-sm text-white/45">
            Tap a photograph to discover its little story.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
          {memories.map((photo, index) => (
            <motion.button
              key={photo.id}
              type="button"
              onClick={() => setSelected(photo)}
              className="polaroid-card rounded-sm bg-[#eee9df] p-2 pb-5 text-left shadow-xl sm:p-3 sm:pb-7"
              initial={{ opacity: 0, y: 30, rotate: index % 2 ? 4 : -4 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{
                y: -10,
                rotate: 0,
                scale: 1.035,
                zIndex: 5
              }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.35 }}
            >
              <img
                src={photo.image}
                alt={photo.title}
                loading="lazy"
                className="aspect-[4/5] w-full object-cover"
              />
              <div className="flex items-center justify-between gap-2 pt-3">
                <span className="line-clamp-1 font-serif text-xs text-[#29241e] sm:text-sm">
                  {photo.title}
                </span>
                <Heart size={13} className="shrink-0 text-[#a47b4c]" />
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-[90] flex items-center justify-center bg-black/90 p-5 backdrop-blur-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <button
              type="button"
              aria-label="Close photograph"
              onClick={() => setSelected(null)}
              className="absolute right-5 top-5 rounded-full border border-white/20 p-3 text-white"
            >
              <X size={20} />
            </button>

            <motion.div
              className="w-full max-w-md bg-[#eee9df] p-3 pb-8 shadow-2xl"
              initial={{ scale: 0.85, rotate: -4 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0.9 }}
              onClick={event => event.stopPropagation()}
            >
              <img
                src={selected.image}
                alt={selected.title}
                className="max-h-[65svh] w-full object-contain"
              />
              <h3 className="mt-5 text-center font-serif text-xl text-[#29241e]">
                {selected.title}
              </h3>
              <p className="mt-2 text-center text-sm text-[#675d50]">
                {selected.caption}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
