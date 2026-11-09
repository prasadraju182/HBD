
import { motion } from 'framer-motion'
import { memories } from '../data/memories'

export default function FriendshipTimeline() {
  return (
    <section
      id="timeline"
      className="relative overflow-hidden bg-[#0d0d0e] px-5 py-24 sm:px-8 md:py-32"
    >
      <div className="mx-auto max-w-6xl">

        <motion.div
          className="mb-20 text-center"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="mb-4 text-[9px] uppercase tracking-[0.45em] text-amber-200/70">
            Every picture has a story
          </p>

          <h2 className="font-serif text-4xl text-white sm:text-6xl">
            Our <span className="italic text-amber-200">journey.</span>
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-white/45">
            A little collection of moments that made our story special.
          </p>
        </motion.div>

        <div className="relative">
          <div className="absolute bottom-0 left-4 top-0 w-px bg-gradient-to-b from-transparent via-amber-200/50 to-transparent md:left-1/2" />

          <div className="space-y-16 md:space-y-24">
            {memories.map((memory, index) => {
              const reverse = index % 2 !== 0

              return (
                <motion.article
                  key={memory.id}
                  className={`relative grid grid-cols-1 gap-7 pl-12 md:grid-cols-2 md:gap-16 md:pl-0 ${
                    reverse ? 'md:[&>div:first-child]:order-2' : ''
                  }`}
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.7 }}
                >
                  <span className="absolute left-[10px] top-3 z-10 h-3 w-3 rounded-full border-2 border-amber-200 bg-[#0d0d0e] shadow-[0_0_16px_rgba(230,190,120,.5)] md:left-1/2 md:-translate-x-1/2" />

                  <div className="overflow-hidden rounded-sm border border-white/10 bg-white/[0.02]">
                    <img
                      src={memory.image}
                      alt={memory.title}
                      loading="lazy"
                      className="aspect-[4/3] w-full object-cover transition duration-700 hover:scale-105"
                    />
                  </div>

                  <div className={`flex flex-col justify-center ${
                    reverse ? 'md:items-end md:text-right' : ''
                  }`}>
                    <p className="text-[9px] uppercase tracking-[0.35em] text-amber-200/65">
                      {memory.date || `CHAPTER ${String(index + 1).padStart(2, '0')}`}
                    </p>

                    <h3 className="mt-4 font-serif text-2xl text-white sm:text-3xl">
                      {memory.title}
                    </h3>

                    <p className="mt-4 max-w-md text-sm leading-7 text-white/50">
                      {memory.caption}
                    </p>

                    <span className="mt-6 h-px w-16 bg-amber-200/40" />
                  </div>
                </motion.article>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
