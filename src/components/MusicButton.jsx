import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Music, Volume2 } from 'lucide-react'

export default function MusicButton() {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef(null)

  const toggleMusic = () => {
    if (isPlaying) {
      audioRef.current?.pause()
    } else {
      audioRef.current?.play()
    }
    setIsPlaying(!isPlaying)
  }

  return (
    <>
      <audio
        ref={audioRef}
        src="/music/birthday.mp3"
        loop
        onEnded={() => setIsPlaying(false)}
      />

      <motion.button
        onClick={toggleMusic}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-mid-pink to-magenta text-white shadow-soft hover:shadow-soft-lg flex items-center justify-center transition-all"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={isPlaying ? { scale: [1, 1.1, 1] } : {}}
        transition={{ duration: 1.5, repeat: isPlaying ? Infinity : 0 }}
      >
        {isPlaying ? (
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity }}>
            <Volume2 className="w-6 h-6 md:w-7 md:h-7" />
          </motion.div>
        ) : (
          <Music className="w-6 h-6 md:w-7 md:h-7" />
        )}
      </motion.button>
    </>
  )
}
