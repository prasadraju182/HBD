
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Heart, MailOpen, Sparkles } from 'lucide-react'

export default function SecretLetter() {
  const [opened, setOpened] = useState(false)

  return (
    <section
      id="letter"
      className="relative overflow-hidden bg-[#0b0b0c] px-5 py-28 sm:px-8 md:py-36"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(190,145,80,.10),transparent_50%)]" />

      <div className="relative mx-auto max-w-3xl text-center">

        <p className="mb-5 text-[9px] uppercase tracking-[0.45em] text-amber-200/70">
          Something from the heart
        </p>

        <h2 className="font-serif text-4xl text-white sm:text-6xl">
          A little <span className="italic text-amber-200">secret.</span>
        </h2>

        <p className="mx-auto mt-5 max-w-md text-sm leading-7 text-white/45">
          There is something I wanted to say. Open this little letter.
        </p>

        <div className="relative mx-auto mt-16 flex min-h-[300px] max-w-md items-center justify-center">

          <motion.button
            type="button"
            onClick={() => setOpened(!opened)}
            className="relative z-10 w-full cursor-pointer"
            whileHover={{ scale: opened ? 1 : 1.03 }}
            whileTap={{ scale: 0.98 }}
            aria-label={opened ? 'Close the letter' : 'Open the letter'}
          >
            <motion.div
              className="relative mx-auto flex h-52 w-full max-w-sm items-center justify-center overflow-hidden rounded-lg border border-amber-200/30 bg-gradient-to-br from-[#473725] via-[#261e16] to-[#17120e] shadow-[0_20px_70px_rgba(0,0,0,.5)]"
              animate={{
                boxShadow: opened
                  ? '0 20px 80px rgba(210,170,100,.15)'
                  : '0 20px 70px rgba(0,0,0,.5)'
              }}
            >
              <div className="absolute inset-4 border border-amber-100/15" />

              <motion.div
                className="absolute inset-x-0 top-0 z-20 h-1/2 origin-top bg-gradient-to-b from-[#b48b54] to-[#725332]"
                style={{
                  clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                  transformStyle: 'preserve-3d'
                }}
                animate={{ rotateX: opened ? 180 : 0 }}
                transition={{ duration: 0.8 }}
              />

              <div className="relative z-10 flex flex-col items-center gap-3 text-amber-100">
                <Sparkles size={27} strokeWidth={1.2} />

                <span className="font-serif text-2xl tracking-[0.15em]">
                  FOR JYOTHIKA
                </span>

                <span className="text-[8px] uppercase tracking-[0.35em] text-amber-100/60">
                  A letter from the heart
                </span>
              </div>

              <motion.div
                className="absolute bottom-5 right-5 text-amber-200/60"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Heart size={19} />
              </motion.div>
            </motion.div>

            <span className="mt-6 inline-flex items-center gap-2 text-[9px] uppercase tracking-[0.3em] text-amber-200/70">
              <MailOpen size={14} />
              {opened ? 'Close letter' : 'Tap to open'}
            </span>
          </motion.button>
        </div>

        <AnimatePresence>
          {opened && (
            <motion.div
              className="mx-auto mt-12 max-w-xl border border-amber-200/20 bg-[#15120e] p-7 text-left shadow-2xl sm:p-10"
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 15, scale: 0.98 }}
              transition={{ duration: 0.55 }}
            >
              <p className="text-[9px] uppercase tracking-[0.35em] text-amber-200/70">
                A note for you
              </p>

              <h3 className="mt-5 font-serif text-3xl italic text-amber-100">
                Dear Jyothika,
              </h3>

              <div className="mt-6 space-y-4 text-sm leading-8 text-white/70">
                <p>
                  Some people make ordinary days feel special without even trying.
                  And some moments become memories that we wish we could experience
                  all over again.
                </p>

                <p>
                  Thank you for all the laughter, random conversations,
                  unforgettable moments and the little things that make this
                  friendship special.
                </p>

                <p>
                  No matter how busy life gets or how much things change,
                  I hope we never lose the ability to laugh at the smallest things.
                </p>

                <p className="font-serif text-lg italic text-amber-200">
                  Here's to more memories, more madness and many more chapters.
                </p>
              </div>

              <div className="mt-8 border-t border-amber-100/15 pt-6">
                <p className="font-serif text-lg text-amber-100">
                  With lots of love ❤️
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
