
import { useState } from 'react'
import { motion } from 'framer-motion'
import { memories } from '../data/memories'

export default function ThenNow() {
  const [position, setPosition] = useState(50)

  if (!memories || memories.length < 2) return null

  // Keep memories.js ordered from oldest to newest.
  const thenPhoto = memories[0]
  const nowPhoto = memories[memories.length - 1]

  return (
    <section id="then-now" className="overflow-hidden bg-[#090a0d] px-5 py-28 sm:px-8 md:py-36">
      <div className="mx-auto max-w-5xl text-center">
        <p className="text-[9px] uppercase tracking-[0.4em] text-amber-200/70">
          Time moves. Memories stay.
        </p>

        <h2 className="mt-5 font-serif text-4xl text-white sm:text-6xl">
          Then <span className="italic text-amber-200">vs</span> now.
        </h2>

        <p className="mx-auto mt-5 max-w-lg text-sm leading-7 text-white/45">
          A little look at how far the story has travelled.
          Drag the slider to compare.
        </p>

        <div className="mx-auto mt-12 max-w-3xl">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-amber-100/20 bg-[#171717] shadow-2xl sm:aspect-[16/9]">
            {/* Newer photo as the background */}
            <img
              src={nowPhoto.image}
              alt="Now photograph"
              className="absolute inset-0 h-full w-full object-cover"
            />

            {/* Older photo revealed from the left */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{
                clipPath: `inset(0 ${100 - position}% 0 0)`
              }}
            >
              <img
                src={thenPhoto.image}
                alt="Then photograph"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>

            {/* Labels */}
            <div className="absolute left-4 top-4 rounded-full bg-black/60 px-4 py-2 text-[9px] uppercase tracking-[0.2em] text-white backdrop-blur">
              Then
            </div>

            <div className="absolute right-4 top-4 rounded-full bg-black/60 px-4 py-2 text-[9px] uppercase tracking-[0.2em] text-white backdrop-blur">
              Now
            </div>

            {/* Slider divider */}
            <div
              className="pointer-events-none absolute bottom-0 top-0 z-10 w-[2px] bg-white shadow-[0_0_15px_rgba(255,255,255,.7)]"
              style={{ left: `${position}%` }}
            >
              <div className="absolute left-1/2 top-1/2 grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/70 bg-black/70 text-lg text-white shadow-xl">
                ↔
              </div>
            </div>

            {/* Invisible but accessible slider control */}
            <input
              type="range"
              min="0"
              max="100"
              value={position}
              onChange={event => setPosition(Number(event.target.value))}
              aria-label="Compare then and now photographs"
              className="absolute inset-0 z-20 h-full w-full cursor-ew-resize opacity-0"
            />
          </div>

          <div className="mt-7 flex items-center justify-between gap-4">
            <span className="text-[9px] uppercase tracking-[0.2em] text-white/40">
              Earlier memory
            </span>

            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full rounded-full bg-amber-200"
                animate={{ width: `${position}%` }}
              />
            </div>

            <span className="text-[9px] uppercase tracking-[0.2em] text-white/40">
              Recent memory
            </span>
          </div>

          <p className="mt-6 font-serif text-lg italic text-amber-100/65">
            Different moments. Same beautiful connection. ❤️
          </p>
        </div>
      </div>
    </section>
  )
}
