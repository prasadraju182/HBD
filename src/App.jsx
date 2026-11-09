
import { useState, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'

import IntroGift from './components/IntroGift'
import PhotoStory from './components/PhotoStory'
import EvidenceWall from './components/EvidenceWall'
import ChaosSection from './components/ChaosSection'
import FinalSection from './components/FinalSection'
import MusicButton from './components/MusicButton'
import AnimatedBackground from './components/AnimatedBackground'
import ScrollProgress from './components/ScrollProgress'

export default function App() {
  const [entered, setEntered] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const audioRef = useRef(null)

  // Start website and background music
  const enterWebsite = async () => {
    setEntered(true)

    try {
      if (audioRef.current) {
        await audioRef.current.play()
      }
    } catch (error) {
      console.log('Music playback failed:', error)
    }
  }

  return (
    <main className="relative min-h-screen bg-[#101010] text-[#f5f0e8] overflow-hidden">

      <AnimatedBackground />

      {/* Background music */}
      <audio
        ref={audioRef}
        src="/music/memories.mp3"
        loop
        preload="auto"
      />

      <AnimatePresence mode="wait">
        {!entered ? (
          <motion.div
            key="intro"
            className="relative z-10"
            exit={{ opacity: 0, scale: 1.04, filter: 'blur(12px)' }}
            transition={{ duration: 1 }}
          >
            <IntroGift onComplete={enterWebsite} />
          </motion.div>
        ) : (
          <motion.div
            key="memories"
            className="relative z-10"
            initial={{ opacity: 0, filter: 'blur(10px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1.2 }}
          >
            <ScrollProgress />

            {/* Navigation */}
            <header className="fixed top-0 left-0 right-0 z-40 px-5 py-4 flex justify-between items-center bg-black/50 backdrop-blur-xl border-b border-white/[0.06]">

              <a
                href="#home"
                onClick={() => setMenuOpen(false)}
                className="font-serif tracking-[0.2em] text-xs sm:text-sm text-amber-100"
              >
                OUR MEMORIES
              </a>

              {/* Desktop navigation */}
              <nav className="hidden md:flex gap-7 text-[10px] tracking-[0.2em] uppercase text-white/60">
                <a href="#story">Story</a>
                <a href="#gallery">Gallery</a>
                <a href="#moments">Moments</a>
                <a href="#letter">Letter</a>
              </nav>

              {/* Mobile menu button */}
              <button
                className="md:hidden text-amber-100 p-2"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle navigation"
                aria-expanded={menuOpen}
              >
                {menuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>

              {/* Mobile menu */}
              <AnimatePresence>
                {menuOpen && (
                  <motion.nav
                    className="absolute top-full left-0 right-0 bg-[#151515]/95 backdrop-blur-xl border-b border-white/10 p-6 flex flex-col gap-6 md:hidden"
                    initial={{ opacity: 0, y: -15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                  >
                    {[
                      ['Story', '#story'],
                      ['Gallery', '#gallery'],
                      ['Moments', '#moments'],
                      ['Letter', '#letter']
                    ].map(([label, href]) => (
                      <a
                        key={href}
                        href={href}
                        onClick={() => setMenuOpen(false)}
                        className="text-sm uppercase tracking-[0.2em] text-white/70 hover:text-amber-200"
                      >
                        {label}
                      </a>
                    ))}
                  </motion.nav>
                )}
              </AnimatePresence>
            </header>

            {/* Music controls */}
            <MusicButton audioRef={audioRef} />

            {/* Main hero */}
            <section
              id="home"
              className="min-h-screen flex items-center justify-center text-center px-6"
            >
              <div className="max-w-4xl pt-20">

                <motion.p
                  className="uppercase tracking-[0.55em] text-xs text-amber-200 mb-8"
                  initial={{ opacity: 0, letterSpacing: '0.1em' }}
                  animate={{ opacity: 1, letterSpacing: '0.55em' }}
                  transition={{ duration: 1.5 }}
                >
                  A little time capsule
                </motion.p>

                <motion.h1
                  className="font-serif text-6xl md:text-8xl leading-tight"
                  initial={{ opacity: 0, y: 60, filter: 'blur(15px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  The memories
                  <br />
                  <motion.span
                    className="italic text-amber-200 inline-block"
                    animate={{
                      textShadow: [
                        '0 0 0px rgba(230,200,140,0)',
                        '0 0 25px rgba(230,200,140,0.35)',
                        '0 0 0px rgba(230,200,140,0)'
                      ]
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                  >
                    we made.
                  </motion.span>
                </motion.h1>

                <motion.p
                  className="mt-8 text-white/55 text-base md:text-lg leading-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 1 }}
                >
                  Random moments, endless laughter, silly stories
                  <br className="hidden md:block" />
                  and memories worth keeping forever.
                </motion.p>

                <motion.a
                  href="#story"
                  className="inline-block mt-12 border border-amber-200/50 px-9 py-4 text-xs tracking-[0.3em] uppercase hover:bg-amber-200 hover:text-black transition-all duration-500"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 }}
                  whileHover={{
                    scale: 1.06,
                    boxShadow: '0 0 30px rgba(230,200,140,0.2)'
                  }}
                  whileTap={{ scale: 0.96 }}
                >
                  Explore memories ↓
                </motion.a>

              </div>
            </section>

            <PhotoStory />
            <EvidenceWall />
            <ChaosSection />
            <FinalSection />

          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
