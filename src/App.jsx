import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import IntroGift from './components/IntroGift'
import Hero from './components/Hero'
import PhotoStory from './components/PhotoStory'
import EvidenceWall from './components/EvidenceWall'
import ChaosSection from './components/ChaosSection'
import FinalSection from './components/FinalSection'
import FloatingDecorations from './components/FloatingDecorations'
import MusicButton from './components/MusicButton'

export default function App() {
  const [stage, setStage] = useState(0) // 0: intro, 1: hero, 2: story, 3: evidence, 4: chaos, 5: final
  const [isReplaying, setIsReplaying] = useState(false)

  const handleGiftOpen = () => setStage(1)
  const handleEnterExperience = () => setStage(2)
  const handleReplay = () => {
    setIsReplaying(true)
    setStage(0)
    setTimeout(() => setIsReplaying(false), 500)
  }

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <FloatingDecorations />
      <MusicButton />

      <AnimatePresence mode="wait">
        {stage === 0 && !isReplaying && (
          <motion.div key="intro" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
            <IntroGift onComplete={handleGiftOpen} />
          </motion.div>
        )}

        {stage === 1 && (
          <motion.div key="hero" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
            <Hero onCTAClick={handleEnterExperience} />
          </motion.div>
        )}

        {stage >= 2 && (
          <motion.div key="content" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
            <div className="relative">
              {stage >= 2 && <PhotoStory />}
              {stage >= 3 && <EvidenceWall />}
              {stage >= 4 && <ChaosSection />}
              {stage >= 5 && <FinalSection onReplay={handleReplay} />}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
