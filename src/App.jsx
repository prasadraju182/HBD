
import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X, Sparkles } from 'lucide-react'

// Existing components
import IntroGift from './components/IntroGift'
import EvidenceWall from './components/EvidenceWall'
import FriendshipTimeline from './components/FriendshipTimeline'
import SecretLetter from './components/SecretLetter'
import ChaosSection from './components/ChaosSection'
import FinalSection from './components/FinalSection'
import MusicButton from './components/MusicButton'
import AnimatedBackground from './components/AnimatedBackground'
import ScrollProgress from './components/ScrollProgress'
import CursorGlow from './components/CursorGlow'
import PolaroidWall from './components/PolaroidWall'
import FilmReel from './components/FilmReel'
import Celebration from './components/Celebration'
import HiddenMemories from './components/HiddenMemories'
import CinematicEffects from './components/CinematicEffects'
import CinematicShowcase from './components/CinematicShowcase'

// New cinematic experience
import CinematicUpgrade from './components/CinematicUpgrade'

// Existing additional features
import OurUniverse from './components/OurUniverse'
import MemoryBook from './components/MemoryBook'
import FriendshipQuiz from './components/FriendshipQuiz'
import ThenNow from './components/ThenNow'

const navigation = [
  ['Our Story', '#timeline'],
  ['Gallery', '#gallery'],
  ['Universe', '#universe'],
  ['Memory Book', '#memory-book'],
  ['Friendship Quiz', '#friendship-quiz'],
  ['Then vs Now', '#then-now'],
  ['Moments', '#moments'],
  ['Secret Letter', '#letter'],
  ['Movie Experience', '#cinematic-experience'],
]

export default function App() {
  const [entered, setEntered] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const audioRef = useRef(null)

  const enterWebsite = async () => {
    setEntered(true)

    try {
      await audioRef.current?.play()
    } catch (error) {
      console.log('Music playback requires another interaction:', error)
    }
  }

  const closeMenu = () => setMenuOpen(false)

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#0b0b0c] text-[#f5f0e8]">
      <AnimatedBackground />
      <CursorGlow />
      <CinematicEffects />

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
            exit={{
              opacity: 0,
              scale: 1.03,
              filter: 'blur(12px)',
            }}
            transition={{ duration: 0.9 }}
          >
            <IntroGift onComplete={enterWebsite} />
          </motion.div>
        ) : (
          <motion.div
            key="website"
            className="relative z-10"
            initial={{
              opacity: 0,
              filter: 'blur(8px)',
            }}
            animate={{
              opacity: 1,
              filter: 'blur(0px)',
            }}
            transition={{ duration: 1 }}
          >
            <ScrollProgress />

            {/* Navigation */}
            <header className="fixed inset-x-0 top-0 z-40 border-b border-white/[0.07] bg-[#0b0b0c]/80 px-5 py-4 backdrop-blur-2xl sm:px-8">
              <div className="mx-auto flex max-w-7xl items-center justify-between">
                <a
                  href="#home"
                  onClick={closeMenu}
                  className="flex items-center gap-3"
                >
                  <span className="grid h-9 w-9 place-items-center rounded-full border border-amber-200/30 text-amber-200">
                    <Sparkles size={16} />
                  </span>

                  <span className="font-serif text-xs tracking-[0.2em] text-amber-50 sm:text-sm">
                    OUR LITTLE WORLD
                  </span>
                </a>

                {/* Desktop navigation */}
                <nav className="hidden items-center gap-5 xl:flex">
                  {navigation.map(([label, href]) => (
                    <a
                      key={href}
                      href={href}
                      className="whitespace-nowrap text-[9px] uppercase tracking-[0.13em] text-white/55 transition duration-300 hover:text-amber-200"
                    >
                      {label}
                    </a>
                  ))}
                </nav>

                {/* Mobile menu button */}
                <button
                  type="button"
                  className="rounded-full border border-white/15 p-2 text-amber-100 transition hover:border-amber-200 xl:hidden"
                  onClick={() => setMenuOpen(!menuOpen)}
                  aria-label="Toggle navigation"
                  aria-expanded={menuOpen}
                >
                  {menuOpen ? <X size={21} /> : <Menu size={21} />}
                </button>
              </div>

              {/* Mobile navigation */}
              <AnimatePresence>
                {menuOpen && (
                  <motion.nav
                    className="absolute left-0 right-0 top-full flex max-h-[75svh] flex-col gap-5 overflow-y-auto border-b border-white/10 bg-[#101011]/95 px-7 py-7 backdrop-blur-2xl xl:hidden"
                    initial={{ opacity: 0, y: -12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.25 }}
                  >
                    {navigation.map(([label, href]) => (
                      <a
                        key={href}
                        href={href}
                        onClick={closeMenu}
                        className="border-b border-white/[0.05] pb-3 text-xs uppercase tracking-[0.2em] text-white/70 transition hover:text-amber-200"
                      >
                        {label}
                      </a>
                    ))}
                  </motion.nav>
                )}
              </AnimatePresence>
            </header>

            <MusicButton audioRef={audioRef} />

            {/* Hero */}
            <section
              id="home"
              className="relative flex min-h-[100svh] items-center justify-center px-6 pb-24 pt-28 text-center"
            >
              <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_45%,rgba(193,153,91,.16),transparent_58%)]" />

              <div className="mx-auto max-w-5xl">
                <motion.p
                  className="mb-7 text-[9px] uppercase tracking-[0.5em] text-amber-200/80 sm:text-xs"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                >
                  A little time capsule
                </motion.p>

                <motion.h1
                  className="font-serif text-[clamp(3.3rem,10vw,8rem)] leading-[0.98] tracking-[-0.05em]"
                  initial={{
                    opacity: 0,
                    y: 40,
                    filter: 'blur(12px)',
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    filter: 'blur(0px)',
                  }}
                  transition={{
                    duration: 1.2,
                    delay: 0.3,
                  }}
                >
                  The memories
                  <br />

                  <motion.span
                    className="inline-block italic text-amber-200"
                    animate={{
                      textShadow: [
                        '0 0 0 rgba(230,200,140,0)',
                        '0 0 28px rgba(230,200,140,.4)',
                        '0 0 0 rgba(230,200,140,0)',
                      ],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                    }}
                  >
                    we made.
                  </motion.span>
                </motion.h1>

                <motion.p
                  className="mx-auto mt-8 max-w-xl text-sm leading-8 text-white/50 sm:text-base"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                >
                  Random moments, endless laughter, silly stories
                  and memories worth keeping forever.
                </motion.p>

                <motion.a
                  href="#timeline"
                  className="mt-11 inline-flex items-center gap-4 border border-amber-200/40 px-8 py-4 text-[10px] uppercase tracking-[0.25em] text-amber-100 transition duration-500 hover:bg-amber-200 hover:text-black"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.96 }}
                >
                  Explore our story
                  <span>↓</span>
                </motion.a>
              </div>

              <motion.p
                className="absolute bottom-8 text-[9px] uppercase tracking-[0.3em] text-white/30"
                animate={{
                  y: [0, 8, 0],
                  opacity: [0.3, 0.8, 0.3],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                }}
              >
                Scroll to remember
              </motion.p>
            </section>

            {/* Existing friendship timeline */}
            <div id="timeline" className="scroll-mt-24">
              <FriendshipTimeline />
            </div>

            {/* Existing photo gallery */}
            <div id="gallery" className="scroll-mt-24">
              <EvidenceWall />
            </div>

            {/* Existing features */}
            <OurUniverse />
            <MemoryBook />
            <FriendshipQuiz />
            <ThenNow />

            {/* Existing scrapbook */}
            <PolaroidWall />

            {/* Existing film reel */}
            <FilmReel />
            <CinematicShowcase />

            {/* NEW: Cinematic movie experience */}
            <div id="cinematic-experience" className="scroll-mt-24">
              <CinematicUpgrade />
            </div>

            {/* Existing friendship meter */}
            <div id="moments" className="scroll-mt-24">
              <ChaosSection />
            </div>

            {/* Existing celebration */}
            <Celebration />

            {/* Existing hidden memories */}
            <HiddenMemories />

            {/* Existing secret letter */}
            <div id="letter" className="scroll-mt-24">
              <SecretLetter />
            </div>

            {/* Existing final section */}
            <FinalSection />

            {/* Footer */}
            <footer className="border-t border-white/10 px-6 py-9 text-center">
              <p className="font-serif text-sm italic text-amber-100/70">
                Some moments deserve to stay forever.
              </p>

              <p className="mt-3 text-[9px] uppercase tracking-[0.25em] text-white/30">
                Made with care · Our little world
              </p>

              <a
                href="#home"
                className="mt-5 inline-block text-[9px] uppercase tracking-[0.25em] text-amber-200/60 transition hover:text-amber-100"
              >
                Back to top ↑
              </a>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
