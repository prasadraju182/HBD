
import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  Volume2,
  Film,
  X,
  RotateCcw,
} from 'lucide-react'
import { memories } from '../data/memories'

export default function CinematicUpgrade() {
  const [selected, setSelected] = useState(null)
  const [playing, setPlaying] = useState(false)
  const [voicePlaying, setVoicePlaying] = useState(false)
  const [showCredits, setShowCredits] = useState(false)

  const audioRef = useRef(null)
  const montageRef = useRef(null)

  const photos = Array.isArray(memories) ? memories : []
  const currentPhoto = selected === null ? null : photos[selected]

  const nextPhoto = () => {
    setSelected((current) =>
      current === null ? 0 : (current + 1) % photos.length
    )
  }

  const previousPhoto = () => {
    setSelected((current) =>
      current === null
        ? 0
        : (current - 1 + photos.length) % photos.length
    )
  }

  useEffect(() => {
    if (!playing || selected === null || photos.length < 2) return

    const timer = window.setInterval(() => {
      setSelected((current) =>
        current === null ? 0 : (current + 1) % photos.length
      )
    }, 3500)

    return () => window.clearInterval(timer)
  }, [playing, selected, photos.length])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    if (voicePlaying) {
      audio.play().catch(() => setVoicePlaying(false))
    } else {
      audio.pause()
    }
  }, [voicePlaying])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handleEnded = () => setVoicePlaying(false)
    audio.addEventListener('ended', handleEnded)

    return () => audio.removeEventListener('ended', handleEnded)
  }, [])

  const openCinema = (index = 0) => {
    if (!photos.length) return
    setSelected(index)
    setPlaying(false)
  }

  const closeCinema = () => {
    setSelected(null)
    setPlaying(false)
  }

  const scrollToMontage = () => {
    montageRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  return (
    <div className="relative overflow-hidden bg-[#08080b] text-white">

      {/* MOVIE OPENING */}
      <section className="relative flex min-h-[80svh] items-center justify-center overflow-hidden px-5 py-24 text-center">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(176,126,57,.18),transparent_65%)]" />

        <div className="pointer-events-none absolute inset-0 opacity-[0.12] cinematic-film-grain" />

        <motion.div
          initial={{ opacity: 0, scale: 1.06 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4 }}
          className="relative z-10 mx-auto max-w-4xl"
        >
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-[9px] uppercase tracking-[0.45em] text-amber-200/70"
          >
            A story worth remembering
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.4 }}
            className="mt-8 font-serif text-5xl leading-tight sm:text-7xl md:text-8xl"
          >
            Every picture
            <br />
            <span className="italic text-amber-200">
              has a story.
            </span>
          </motion.h2>

          <p className="mx-auto mt-7 max-w-lg text-sm leading-8 text-white/50">
            Not just photographs. Little pieces of time that we get to keep
            forever.
          </p>

          <motion.button
            type="button"
            onClick={scrollToMontage}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            className="mt-10 inline-flex items-center gap-3 rounded-full border border-amber-200/40 px-7 py-4 text-[10px] uppercase tracking-[0.25em] text-amber-100 transition hover:bg-amber-200 hover:text-black"
          >
            <Play size={14} />
            Begin the journey
          </motion.button>
        </motion.div>

        <div className="pointer-events-none absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-black to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-black to-transparent" />
      </section>

      {/* CINEMATIC PHOTO MONTAGE */}
      <section
        ref={montageRef}
        className="px-5 py-24 sm:px-8 md:py-32"
      >
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <p className="text-[9px] uppercase tracking-[0.4em] text-amber-200/60">
              Scene after scene
            </p>

            <h2 className="mt-4 font-serif text-4xl sm:text-6xl">
              Moments in{' '}
              <span className="italic text-amber-200">motion.</span>
            </h2>

            <p className="mt-4 text-sm text-white/45">
              A collection of moments that made this story special.
            </p>
          </div>

          {photos.length > 0 ? (
            <>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5">
                {photos.slice(0, 9).map((photo, index) => (
                  <motion.button
                    type="button"
                    key={index}
                    onClick={() => openCinema(index)}
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{
                      duration: 0.7,
                      delay: (index % 3) * 0.1,
                    }}
                    whileHover={{ y: -6, scale: 1.015 }}
                    className="group relative aspect-[4/5] overflow-hidden rounded-xl border border-white/10 bg-white/5 text-left"
                  >
                    <img
                      src={photo.image}
                      alt={photo.title || `Memory ${index + 1}`}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/10" />

                    <div className="absolute inset-x-0 bottom-0 p-4">
                      <p className="text-[8px] uppercase tracking-[0.3em] text-amber-200/80">
                        Scene {String(index + 1).padStart(2, '0')}
                      </p>

                      <h3 className="mt-2 font-serif text-lg text-white">
                        {photo.title || 'A beautiful memory'}
                      </h3>
                    </div>
                  </motion.button>
                ))}
              </div>

              <div className="mt-10 text-center">
                <button
                  type="button"
                  onClick={() => openCinema(0)}
                  className="rounded-full border border-amber-200/40 px-7 py-3 text-[10px] uppercase tracking-[0.25em] text-amber-100 transition hover:bg-amber-200 hover:text-black"
                >
                  <Film size={14} className="mr-2 inline" />
                  Watch all memories
                </button>
              </div>
            </>
          ) : (
            <p className="text-center text-white/50">
              No memories found. Check the memories export in
              src/data/memories.js.
            </p>
          )}
        </div>
      </section>

      {/* EMOTIONAL VOICE OVER */}
      <section className="relative overflow-hidden border-y border-white/10 bg-[#100e0c] px-5 py-24 text-center sm:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(194,148,82,.13),transparent_65%)]" />

        <div className="relative z-10 mx-auto max-w-3xl">
          <Volume2 className="mx-auto text-amber-200" size={28} />

          <p className="mt-6 text-[9px] uppercase tracking-[0.4em] text-amber-200/60">
            A message from the heart
          </p>

          <h2 className="mt-5 font-serif text-4xl leading-tight sm:text-6xl">
            Some people become
            <br />
            <span className="italic text-amber-200">
              part of our story.
            </span>
          </h2>

          <p className="mx-auto mt-7 max-w-xl text-sm leading-8 text-white/55">
            Years may pass, places may change, and life may take us in
            different directions. But the moments we shared will always
            have a place in this little world.
          </p>

          <audio
            ref={audioRef}
            src="/audio/friendship-voiceover.mp3"
            preload="none"
          />

          <button
            type="button"
            onClick={() => setVoicePlaying((value) => !value)}
            className="mt-9 inline-flex min-h-12 items-center gap-3 rounded-full border border-amber-200/40 px-7 py-3 text-[10px] uppercase tracking-[0.2em] text-amber-100 transition hover:bg-amber-200 hover:text-black"
          >
            {voicePlaying ? <Pause size={15} /> : <Play size={15} />}
            {voicePlaying ? 'Pause voice message' : 'Play voice message'}
          </button>

          <p className="mt-4 text-[10px] text-white/30">
            Add your recording at public/audio/friendship-voiceover.mp3
          </p>
        </div>
      </section>

      {/* MEMORY CINEMA */}
      <section className="px-5 py-24 text-center sm:py-32">
        <div className="mx-auto max-w-3xl">
          <p className="text-[9px] uppercase tracking-[0.4em] text-amber-200/60">
            Your little cinema
          </p>

          <h2 className="mt-5 font-serif text-4xl sm:text-6xl">
            Press play on{' '}
            <span className="italic text-amber-200">memories.</span>
          </h2>

          <p className="mx-auto mt-5 max-w-lg text-sm leading-7 text-white/45">
            Sit back and revisit the moments one photograph at a time.
          </p>

          <motion.button
            type="button"
            onClick={() => openCinema(0)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={!photos.length}
            className="mt-9 inline-flex items-center gap-3 rounded-full bg-amber-200 px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-black disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Play size={16} />
            Enter memory cinema
          </motion.button>
        </div>
      </section>

      {/* MOVIE ENDING AND CREDITS */}
      <section className="relative flex min-h-[75svh] items-center justify-center overflow-hidden border-t border-white/10 bg-black px-5 py-24 text-center">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(172,126,58,.14),transparent_65%)]" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="relative z-10 max-w-2xl"
        >
          <p className="text-[9px] uppercase tracking-[0.5em] text-amber-200/60">
            The end... or just another beginning
          </p>

          <h2 className="mt-8 font-serif text-5xl leading-tight sm:text-7xl">
            To be <span className="italic text-amber-200">continued.</span>
          </h2>

          <div className="mx-auto my-10 h-px w-20 bg-amber-200/50" />

          <div className="space-y-3 text-xs uppercase tracking-[0.2em] text-white/50">
            <p>A little friendship production</p>
            <p className="text-amber-100">Starring: Jyothika &amp; Prasad</p>
            <p>Featuring unforgettable moments</p>
            <p>Made with love and memories</p>
          </div>

          <p className="mt-12 font-serif text-xl italic text-amber-100/80">
            Some stories never really end.
          </p>

          <button
            type="button"
            onClick={() => setShowCredits((value) => !value)}
            className="mt-8 text-[9px] uppercase tracking-[0.3em] text-white/40 underline underline-offset-8 hover:text-amber-200"
          >
            {showCredits ? 'Hide credits' : 'Roll the credits'}
          </button>

          <AnimatePresence>
            {showCredits && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="mt-8 space-y-4 text-xs leading-6 text-white/60"
              >
                <p>CREATED WITH LOVE</p>
                <p>THE MEMORIES — NEVER FORGOTTEN</p>
                <p>THE LAUGHTER — ALWAYS REMEMBERED</p>
                <p>THE FRIENDSHIP — TO BE CONTINUED</p>
                <p className="font-serif text-lg italic text-amber-200">
                  Thank you for being part of this story.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* FULL-SCREEN MEMORY PLAYER */}
      <AnimatePresence>
        {currentPhoto && (
          <motion.div
            className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/95 p-4 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCinema}
          >
            <button
              type="button"
              onClick={closeCinema}
              aria-label="Close cinema"
              className="absolute right-5 top-5 z-30 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white"
            >
              <X size={20} />
            </button>

            <div
              className="relative z-10 flex w-full max-w-4xl flex-col items-center"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex max-h-[65svh] min-h-[220px] w-full items-center justify-center overflow-hidden rounded-xl bg-[#111]">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={selected}
                    src={currentPhoto.image}
                    alt={currentPhoto.title || 'Friendship memory'}
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.5 }}
                    className="max-h-[65svh] w-full object-contain"
                  />
                </AnimatePresence>
              </div>

              <div className="mt-6 text-center">
                <p className="text-[9px] uppercase tracking-[0.4em] text-amber-200/60">
                  Memory {selected + 1} / {photos.length}
                </p>

                <h3 className="mt-3 font-serif text-2xl text-amber-100 sm:text-3xl">
                  {currentPhoto.title || 'A beautiful memory'}
                </h3>

                <p className="mt-2 text-sm text-white/55">
                  {currentPhoto.caption || 'A moment worth remembering.'}
                </p>
              </div>

              <div className="mt-7 flex items-center gap-5">
                <button
                  type="button"
                  onClick={previousPhoto}
                  aria-label="Previous memory"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white hover:border-amber-200 hover:text-amber-200"
                >
                  <ChevronLeft />
                </button>

                <button
                  type="button"
                  onClick={() => setPlaying((value) => !value)}
                  aria-label={playing ? 'Pause slideshow' : 'Play slideshow'}
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-200 text-black"
                >
                  {playing ? <Pause size={19} /> : <Play size={19} />}
                </button>

                <button
                  type="button"
                  onClick={nextPhoto}
                  aria-label="Next memory"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white hover:border-amber-200 hover:text-amber-200"
                >
                  <ChevronRight />
                </button>
              </div>

              <button
                type="button"
                onClick={() => {
                  setSelected(0)
                  setPlaying(false)
                }}
                className="mt-5 inline-flex items-center gap-2 text-[9px] uppercase tracking-[0.25em] text-white/35 hover:text-amber-200"
              >
                <RotateCcw size={12} />
                Restart memories
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
