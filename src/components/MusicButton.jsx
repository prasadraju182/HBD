
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Volume2, VolumeX } from 'lucide-react'

export default function MusicButton({ audioRef }) {
  const [isPlaying, setIsPlaying] = useState(false)

  const toggleMusic = async () => {
    if (!audioRef?.current) return

    if (audioRef.current.paused) {
      try {
        await audioRef.current.play()
        setIsPlaying(true)
      } catch (error) {
        console.log('Music playback failed:', error)
      }
    } else {
      audioRef.current.pause()
      setIsPlaying(false)
    }
  }

  return (
    <motion.button
      onClick={toggleMusic}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full border border-amber-300/40 bg-black/80 text-amber-300 shadow-lg backdrop-blur-md"
      aria-label={isPlaying ? 'Pause music' : 'Play music'}
    >
      {isPlaying ? <Volume2 size={24} /> : <VolumeX size={24} />}
    </motion.button>
  )
}
