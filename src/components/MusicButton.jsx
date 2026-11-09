
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  Volume2,
  VolumeX,
  Play,
  Pause,
  Music2
} from 'lucide-react'

export default function MusicButton({ audioRef }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(0.75)

  useEffect(() => {
    const audio = audioRef?.current
    if (!audio) return

    audio.volume = volume

    const updateTime = () => setCurrentTime(audio.currentTime || 0)
    const updateDuration = () => setDuration(audio.duration || 0)
    const onPlay = () => setIsPlaying(true)
    const onPause = () => setIsPlaying(false)

    audio.addEventListener('timeupdate', updateTime)
    audio.addEventListener('loadedmetadata', updateDuration)
    audio.addEventListener('durationchange', updateDuration)
    audio.addEventListener('play', onPlay)
    audio.addEventListener('pause', onPause)

    updateTime()
    updateDuration()

    return () => {
      audio.removeEventListener('timeupdate', updateTime)
      audio.removeEventListener('loadedmetadata', updateDuration)
      audio.removeEventListener('durationchange', updateDuration)
      audio.removeEventListener('play', onPlay)
      audio.removeEventListener('pause', onPause)
    }
  }, [audioRef, volume])

  const toggleMusic = async () => {
    const audio = audioRef?.current
    if (!audio) return

    if (audio.paused) {
      try {
        await audio.play()
      } catch (error) {
        console.error('Music playback failed:', error)
      }
    } else {
      audio.pause()
    }
  }

  const seek = event => {
    if (!audioRef?.current || !duration) return
    const time = Number(event.target.value)
    audioRef.current.currentTime = time
    setCurrentTime(time)
  }

  const changeVolume = event => {
    const value = Number(event.target.value)
    setVolume(value)
    if (audioRef?.current) {
      audioRef.current.volume = value
      audioRef.current.muted = value === 0
    }
  }

  const formatTime = value => {
    if (!Number.isFinite(value)) return '0:00'
    const minutes = Math.floor(value / 60)
    const seconds = Math.floor(value % 60).toString().padStart(2, '0')
    return `${minutes}:${seconds}`
  }

  return (
    <motion.div
      className="fixed bottom-4 right-4 z-50 w-[min(290px,calc(100vw-32px))] rounded-2xl border border-amber-200/20 bg-[#15120f]/95 p-3 text-amber-100 shadow-2xl backdrop-blur-xl sm:bottom-7 sm:right-7 sm:w-72"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={toggleMusic}
          aria-label={isPlaying ? 'Pause music' : 'Play music'}
          className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-amber-200 text-[#17120d] transition hover:scale-105"
        >
          {isPlaying ? <Pause size={19} /> : <Play size={19} />}
        </button>

        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Music2 size={13} />
              <span className="truncate text-[10px] uppercase tracking-[0.17em]">
                Memories BGM
              </span>
            </div>
            <span className="text-[9px] text-amber-100/50">
              {isPlaying ? 'PLAYING' : 'PAUSED'}
            </span>
          </div>

          <div className="mt-2 flex h-4 items-center gap-[3px]">
            {Array.from({ length: 24 }, (_, i) => (
              <motion.span
                key={i}
                className="w-[3px] rounded-full bg-amber-200/75"
                animate={isPlaying ? {
                  height: [4, 7 + (i % 5) * 2, 4]
                } : { height: 4 }}
                transition={{
                  duration: 0.55 + (i % 4) * 0.12,
                  repeat: isPlaying ? Infinity : 0,
                  delay: i * 0.025
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="mt-3 flex items-center gap-2">
        <span className="text-[9px] tabular-nums text-white/45">
          {formatTime(currentTime)}
        </span>

        <input
          type="range"
          min="0"
          max={duration || 1}
          step="0.1"
          value={Math.min(currentTime, duration || 1)}
          onChange={seek}
          aria-label="Music progress"
          className="music-range min-w-0 flex-1"
        />

        <span className="text-[9px] tabular-nums text-white/45">
          {formatTime(duration)}
        </span>
      </div>

      <div className="mt-2 flex items-center gap-2">
        {volume === 0
          ? <VolumeX size={14} className="text-white/60" />
          : <Volume2 size={14} className="text-white/60" />
        }

        <input
          type="range"
          min="0"
          max="1"
          step="0.05"
          value={volume}
          onChange={changeVolume}
          aria-label="Music volume"
          className="music-range w-20"
        />

        <span className="ml-auto text-[8px] tracking-[0.15em] text-white/35">
          DUDE MOVIE BGM
        </span>
      </div>
    </motion.div>
  )
}
