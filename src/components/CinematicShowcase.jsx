
import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Sparkles,
  Heart,
  X,
  DoorOpen,
  ChevronLeft,
  ChevronRight,
  Volume2,
} from 'lucide-react'
import { memories } from '../data/memories'

const dustParticles = Array.from({ length: 65 }, (_, i) => ({
  id: i,
  left: `${(i * 37) % 100}%`,
  top: `${(i * 61) % 100}%`,
  delay: (i % 12) * 0.08,
  size: 2 + (i % 4) * 2,
}))

const fireworkColors = [
  '#f6d58d',
  '#e9bd70',
  '#fff1d1',
  '#d6b4e8',
  '#e7a9b5',
]

const fireworkParticles = Array.from({ length: 36 }, (_, i) => ({
  id: i,
  angle: (i / 36) * Math.PI * 2,
  distance: 45 + (i % 5) * 15,
  color: fireworkColors[i % fireworkColors.length],
}))

export default function CinematicShowcase() {
  const photos = Array.isArray(memories) ? memories.filter((photo) => photo?.image) : []

  const [doorOpen, setDoorOpen] = useState(false)
  const [doorIndex, setDoorIndex] = useState(0)
  const [fireworks, setFireworks] = useState([])
  const [dustActive, setDustActive] = useState(false)
  const [handwritingVisible, setHandwritingVisible] = useState(false)

  const sectionRef = useRef(null)
  const fireworkId = useRef(0)

  const currentPhoto = photos[doorIndex]

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setHandwritingVisible(true)
    }, 600)

    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!fireworks.length) return

    const timer = window.setTimeout(() => {
      setFireworks((items) => items.slice(1))
    }, 1600)

    return () => window.clearTimeout(timer)
  }, [fireworks])

  const createFirework = (event) => {
    if (!sectionRef.current) return

    const rect = sectionRef.current.getBoundingClientRect()

    const burst = {
      id: fireworkId.current++,
      x: event.clientX,
      y: event.clientY,
    }

    setFireworks((items) => [...items.slice(-4), burst])
  }

  const openDoor = () => {
    if (!photos.length) return

    setDustActive(true)

    window.setTimeout(() => {
      setDoorIndex((Math.floor(Math.random() * photos.length)))
      setDoorOpen(true)
      setDustActive(false)
    }, 1000)
  }

  const closeDoor = () => {
    setDoorOpen(false)
  }

  const changePhoto = (direction) => {
    setDoorIndex((current) => {
      return (current + direction + photos.length) % photos.length
    })
  }

  return (
    <>
      <section
        ref={sectionRef}
        onClick={createFirework}
        className="relative isolate overflow-hidden bg-[#070709] px-5 py-28 text-white sm:px-8 md:py-36"
      >
        {/* Background atmosphere */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_35%,rgba(173,126,58,.16),transparent_65%)]" />

        <div className="pointer-events-none absolute inset-0 cinematic-showcase-grain" />

        {/* Golden floating dust */}
        {dustParticles.map((particle) => (
          <motion.span
            key={particle.id}
            className="pointer-events-none absolute rounded-full bg-amber-200"
            style={{
              left: particle.left,
              top: particle.top,
              width: particle.size,
              height: particle.size,
            }}
            animate={{
              y: [-15, 20, -15],
              x: [-8, 8, -8],
              opacity: [0.08, 0.65, 0.08],
              scale: [0.7, 1.3, 0.7],
            }}
            transition={{
              duration: 4 + (particle.id % 5),
              delay: particle.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}

        <div className="relative z-10 mx-auto max-w-6xl">

          {/* INTRO */}
          <div className="mx-auto max-w-3xl text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <Sparkles className="mx-auto mb-6 text-amber-200" size={28} />
            </motion.div>

            <p className="text-[9px] uppercase tracking-[0.5em] text-amber-200/65">
              Beyond ordinary memories
            </p>

            <motion.h2
              initial={{ opacity: 0, y: 35, filter: 'blur(12px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{ duration: 1.2 }}
              className="mt-6 font-serif text-4xl leading-tight sm:text-6xl md:text-7xl"
            >
              Our memories,
              <br />
              <span className="italic text-amber-200">
                beyond time.
              </span>
            </motion.h2>

            <p className="mx-auto mt-6 max-w-xl text-sm leading-8 text-white/45">
              Some moments are too beautiful to remain still.
              Let's bring them to life.
            </p>
          </div>

          {/* 3D FLOATING PHOTO GALLERY */}
          <div className="mt-20">
            <div className="mb-9 text-center">
              <p className="text-[9px] uppercase tracking-[0.4em] text-amber-200/60">
                A collection of little moments
              </p>
              <h3 className="mt-3 font-serif text-3xl sm:text-4xl">
                Floating memories.
              </h3>
            </div>

            {photos.length > 0 ? (
              <div className="cinematic-3d-scene grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-7">
                {photos.slice(0, 9).map((photo, index) => (
                  <motion.button
                    key={index}
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation()
                      setDoorIndex(index)
                      setDoorOpen(true)
                    }}
                    initial={{
                      opacity: 0,
                      y: 55,
                      rotateX: 15,
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                      rotateX: 0,
                    }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{
                      duration: 0.9,
                      delay: (index % 3) * 0.15,
                    }}
                    whileHover={{
                      y: -14,
                      rotateY: index % 2 === 0 ? 8 : -8,
                      rotateX: -5,
                      scale: 1.045,
                      z: 35,
                    }}
                    className="group relative aspect-[4/5] overflow-hidden rounded-xl border border-amber-100/15 bg-[#14110d] text-left shadow-[0_15px_50px_rgba(0,0,0,.4)]"
                  >
                    <motion.img
                      src={photo.image}
                      alt={photo.title || `Memory ${index + 1}`}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-1000 group-hover:scale-110"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/10" />

                    <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-5">
                      <p className="text-[8px] uppercase tracking-[0.3em] text-amber-200/80">
                        Memory {String(index + 1).padStart(2, '0')}
                      </p>
                      <p className="mt-2 font-serif text-base text-white sm:text-xl">
                        {photo.title || 'A beautiful moment'}
                      </p>
                    </div>

                    <div className="pointer-events-none absolute inset-0 border border-transparent transition duration-500 group-hover:border-amber-200/50" />
                  </motion.button>
                ))}
              </div>
            ) : (
              <p className="text-center text-sm text-white/50">
                No photographs found in your memories data.
              </p>
            )}
          </div>

          {/* HANDWRITING MESSAGE */}
          <div className="relative mx-auto mt-32 max-w-3xl py-12 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <Heart
                size={32}
                fill="#e9bd70"
                className="mx-auto text-amber-200"
              />
            </motion.div>

            <p className="text-[9px] uppercase tracking-[0.5em] text-amber-200/60">
              A note from the heart
            </p>

            <div className="mt-8 overflow-hidden">
              <motion.p
                initial={{ clipPath: 'inset(0 100% 0 0)' }}
                whileInView={{ clipPath: 'inset(0 0% 0 0)' }}
                viewport={{ once: true }}
                transition={{
                  duration: 5,
                  ease: 'linear',
                }}
                className="font-serif text-2xl italic leading-relaxed text-amber-100 sm:text-4xl"
              >
                Some people become memories.
                <br />
                Some become a part of our story.
                <br />
                And some friendships stay forever.
              </motion.p>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 4.5, duration: 1.5 }}
              className="mt-8 text-xs uppercase tracking-[0.3em] text-white/40"
            >
              To Jyothika, with love.
            </motion.p>
          </div>

          {/* MAGICAL MEMORY DOOR */}
          <div className="relative mx-auto mt-24 max-w-3xl text-center">
            <p className="text-[9px] uppercase tracking-[0.5em] text-amber-200/60">
              Behind this door lies a memory
            </p>

            <h3 className="mt-5 font-serif text-4xl sm:text-5xl">
              A little mystery.
            </h3>

            <p className="mx-auto mt-5 max-w-md text-sm leading-7 text-white/45">
              Open the door. You never know which beautiful moment
              is waiting on the other side.
            </p>

            <motion.button
              type="button"
              onClick={(event) => {
                event.stopPropagation()
                openDoor()
              }}
              whileHover={{
                scale: 1.06,
                boxShadow: '0 0 45px rgba(226,185,105,.3)',
              }}
              whileTap={{ scale: 0.95 }}
              className="cinematic-door mt-12 inline-flex flex-col items-center justify-center gap-4 rounded-t-[100px] border border-amber-200/50 bg-gradient-to-b from-[#60451f] via-[#241a0e] to-[#100c08] px-12 py-12 text-amber-100 shadow-[0_0_60px_rgba(196,149,73,.15)] sm:px-20 sm:py-16"
            >
              <motion.span
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <DoorOpen size={44} />
              </motion.span>

              <span className="text-[9px] uppercase tracking-[0.35em]">
                Open our memory door
              </span>
            </motion.button>
          </div>

          {/* FIREWORKS INSTRUCTIONS */}
          <div className="mt-32 border-t border-white/10 pt-14 text-center">
            <motion.div
              animate={{
                scale: [1, 1.15, 1],
                rotate: [0, 8, -8, 0],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Sparkles className="mx-auto text-amber-200" size={27} />
            </motion.div>

            <h3 className="mt-5 font-serif text-3xl sm:text-4xl">
              Make a little magic.
            </h3>

            <p className="mt-4 text-sm text-white/45">
              Tap anywhere in this experience to launch golden fireworks.
            </p>

            <p className="mt-3 text-[9px] uppercase tracking-[0.3em] text-amber-200/50">
              Every click creates a new spark
            </p>
          </div>
        </div>

        {/* Fireworks */}
        {fireworks.map((burst) => (
          <div
            key={burst.id}
            className="pointer-events-none fixed z-[80]"
            style={{
              left: burst.x,
              top: burst.y,
            }}
          >
            {fireworkParticles.map((particle) => (
              <motion.span
                key={particle.id}
                className="absolute left-0 top-0 block rounded-full"
                style={{
                  width: 7,
                  height: 7,
                  backgroundColor: particle.color,
                  boxShadow: `0 0 12px ${particle.color}`,
                }}
                initial={{
                  x: 0,
                  y: 0,
                  opacity: 1,
                  scale: 0,
                }}
                animate={{
                  x: Math.cos(particle.angle) * particle.distance,
                  y: Math.sin(particle.angle) * particle.distance,
                  opacity: [1, 1, 0],
                  scale: [0.4, 1.6, 0],
                }}
                transition={{
                  duration: 1.3,
                  ease: 'easeOut',
                }}
              />
            ))}
          </div>
        ))}
      </section>

      {/* GOLDEN DUST TRANSITION */}
      {typeof document !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {dustActive && (
              <motion.div
                className="fixed inset-0 z-[99998] flex items-center justify-center overflow-hidden bg-black"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="pointer-events-none absolute inset-0">
                  {dustParticles.map((particle) => (
                    <motion.span
                      key={particle.id}
                      className="absolute rounded-full bg-amber-200"
                      style={{
                        left: particle.left,
                        top: particle.top,
                        width: particle.size * 2,
                        height: particle.size * 2,
                        boxShadow: '0 0 18px rgba(245,205,120,.8)',
                      }}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{
                        opacity: [0, 1, 0.8, 0],
                        scale: [0, 2, 1.3, 0],
                        x: [0, 30, -30, 0],
                        y: [0, -40, 40, 0],
                      }}
                      transition={{
                        duration: 1.1,
                        delay: particle.delay * 0.25,
                      }}
                    />
                  ))}
                </div>

                <motion.h2
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="relative z-10 font-serif text-3xl italic text-amber-200 sm:text-5xl"
                >
                  A memory awaits...
                </motion.h2>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}

      {/* MEMORY DOOR MODAL */}
      {typeof document !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {doorOpen && currentPhoto && (
              <motion.div
                className="fixed inset-0 z-[99999] flex items-center justify-center overflow-y-auto bg-black/95 p-5 backdrop-blur-xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={closeDoor}
              >
                <motion.div
                  className="relative my-auto w-full max-w-2xl overflow-hidden rounded-2xl border border-amber-200/30 bg-[#12100d] p-4 shadow-[0_0_80px_rgba(202,157,81,.15)] sm:p-7"
                  initial={{ opacity: 0, scale: 0.8, y: 35 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.6 }}
                  onClick={(event) => event.stopPropagation()}
                >
                  <button
                    type="button"
                    onClick={closeDoor}
                    className="absolute right-5 top-5 z-20 rounded-full border border-white/20 bg-black/60 p-2 text-white"
                    aria-label="Close memory"
                  >
                    <X size={18} />
                  </button>

                  <p className="mb-5 text-center text-[9px] uppercase tracking-[0.4em] text-amber-200/60">
                    A little piece of our story
                  </p>

                  <AnimatePresence mode="wait">
                    <motion.img
                      key={doorIndex}
                      src={currentPhoto.image}
                      alt={currentPhoto.title || 'Friendship memory'}
                      initial={{ opacity: 0, scale: 1.04 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.97 }}
                      transition={{ duration: 0.5 }}
                      className="max-h-[55svh] w-full rounded-xl object-contain"
                    />
                  </AnimatePresence>

                  <h3 className="mt-6 text-center font-serif text-3xl text-amber-100">
                    {currentPhoto.title || 'A beautiful memory'}
                  </h3>

                  <p className="mx-auto mt-3 max-w-lg text-center text-sm leading-7 text-white/55">
                    {currentPhoto.caption || 'A moment worth remembering forever.'}
                  </p>

                  <div className="mt-7 flex items-center justify-center gap-7">
                    <button
                      type="button"
                      onClick={() => changePhoto(-1)}
                      className="rounded-full border border-white/20 p-3 text-white transition hover:border-amber-200 hover:text-amber-200"
                      aria-label="Previous memory"
                    >
                      <ChevronLeft size={20} />
                    </button>

                    <span className="text-[9px] uppercase tracking-[0.2em] text-white/40">
                      {doorIndex + 1} / {photos.length}
                    </span>

                    <button
                      type="button"
                      onClick={() => changePhoto(1)}
                      className="rounded-full border border-white/20 p-3 text-white transition hover:border-amber-200 hover:text-amber-200"
                      aria-label="Next memory"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  )
}
