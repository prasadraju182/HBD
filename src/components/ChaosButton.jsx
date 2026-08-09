import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { chaosMessages } from '../data/memories'

export default function ChaosButton() {
  const [isActive, setIsActive] = useState(false)
  const [messages, setMessages] = useState([])

  const handleClick = () => {
    setIsActive(true)

    // Create random chaos messages
    const newMessages = []
    for (let i = 0; i < 4; i++) {
      newMessages.push({
        id: Date.now() + i,
        text: chaosMessages[Math.floor(Math.random() * chaosMessages.length)],
        x: Math.random() * 200 - 100,
        y: Math.random() * 300 - 150
      })
    }
    setMessages(newMessages)

    // Reset after animation
    setTimeout(() => {
      setIsActive(false)
      setMessages([])
    }, 2500)
  }

  return (
    <motion.div
      className="relative inline-block"
      animate={isActive ? { x: [0, -5, 5, -5, 5, 0] } : {}}
      transition={{ duration: 0.4 }}
    >
      {/* Card Background */}
      <motion.div
        className="px-8 md:px-12 py-8 md:py-10 rounded-2xl bg-gradient-to-br from-white to-cream border-2 border-light-pink shadow-soft"
        animate={isActive ? { boxShadow: '0 0 30px rgba(255, 59, 127, 0.4)' } : {}}
      >
        <p className="text-sm md:text-base font-display font-semibold text-magenta mb-2">
          ⚠️ DO NOT TOUCH ⚠️
        </p>
        <p className="text-xs md:text-sm text-mid-pink mb-6 font-light">
          Seriously. Don't.
        </p>

        <motion.button
          onClick={handleClick}
          className="px-6 md:px-8 py-3 md:py-4 rounded-full bg-gradient-to-r from-mid-pink to-magenta text-white font-display font-bold text-sm md:text-base shadow-soft hover:shadow-soft-lg transition-all"
          whileHover={{ scale: isActive ? 1 : 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={isActive}
        >
          PRESS IT ANYWAY
        </motion.button>
      </motion.div>

      {/* Confetti on activation */}
      <AnimatePresence>
        {isActive && (
          <>
            {/* Confetti pieces */}
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={`confetti-${i}`}
                className="fixed w-3 h-3 rounded-full pointer-events-none"
                style={{
                  background: ['#FF6B9D', '#E91E63', '#FF3F7F', '#FFC5D9'][i % 4],
                  left: '50%',
                  top: '50%'
                }}
                animate={{
                  x: Math.random() * 200 - 100,
                  y: Math.random() * 300 - 150,
                  opacity: 0
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.05,
                  ease: 'easeOut'
                }}
                exit={{ opacity: 0 }}
              />
            ))}

            {/* Messages */}
            {messages.map((message) => (
              <motion.div
                key={message.id}
                className="fixed pointer-events-none text-center"
                style={{
                  left: '50%',
                  top: '50%',
                  x: message.x,
                  y: message.y
                }}
                animate={{
                  y: message.y - 100,
                  opacity: 0,
                  scale: 0.5
                }}
                transition={{
                  duration: 2,
                  ease: 'easeOut'
                }}
              >
                <p className="text-white font-display font-bold drop-shadow-lg whitespace-nowrap">
                  {message.text}
                </p>
              </motion.div>
            ))}
          </>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
