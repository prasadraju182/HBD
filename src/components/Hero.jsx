
import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'

export default function Hero({ onCTAClick }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 100, damping: 20 }
    }
  }

  const letterVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        type: 'spring',
        stiffness: 120,
        damping: 14
      }
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-cream to-soft-pink relative overflow-visible flex flex-col items-center justify-center px-6 md:px-12">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 gradient-blob opacity-50" />
      <div className="absolute bottom-0 left-0 w-80 h-80 gradient-blob-2 opacity-40" />

      <motion.div
        className="relative z-10 text-center max-w-3xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Decorative Element */}
        <motion.div
          className="mb-8 text-4xl"
          variants={itemVariants}
        >
          ✨
        </motion.div>

        {/* HAPPY BIRTHDAY */}
        <motion.div variants={itemVariants} className="mb-6">
          <h2 className="text-xl md:text-2xl font-display font-semibold text-mid-pink tracking-widest">
            HAPPY BIRTHDAY
          </h2>
        </motion.div>

{/* JYOTHIKA - Letter by Letter */}
        <motion.div className="mb-8" variants={itemVariants}>
          <div className="flex justify-center flex-wrap gap-1 md:gap-3 px-4 md:px-8 w-full">
            {'JYOTHIKA'.split('').map((letter, i) => (
              <motion.span
                key={i}
                className="text-5xl md:text-7xl font-serif font-black inline-block leading-[1.3] pb-2"
                custom={i}
                variants={letterVariants}
                initial="hidden"
                animate="visible"
                style={{
                  backgroundImage: 'linear-gradient(135deg, #FF6B9D 0%, #E91E63 50%, #FF3F7F 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                {letter}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Divider */}
        <motion.div
          className="h-0.5 w-24 mx-auto mb-8 bg-gradient-to-r from-transparent via-mid-pink to-transparent"
          variants={itemVariants}
        />

        {/* Birthday Message - Full Personalized Text */}
        <motion.div variants={itemVariants} className="mb-12 max-w-2xl">
          <div className="space-y-4 text-base md:text-lg text-dark-gray leading-relaxed font-light">
            <p>
              Happiest Birthdayyy to the most dangerous girl I know 😭🎂❤️
            </p>
            <p>
              Another year older, but thankfully your level of stupidity is still perfectly consistent. 😂💀
            </p>
            <p>
              I genuinely don't understand how someone can be this cute and this irritating at the same time. Like, were you specifically designed to test people's patience? 😭
            </p>
            <p>
              You have that dangerous combo of a pretty face, unlimited attitude, zero shame and the confidence of someone who knows Bharatwaj will somehow handle all the consequences. 😭😂
            </p>
            <p>
              Today you're officially allowed to be extra cute, extra dramatic and extra annoying. But only today. Tomorrow I'm going back to bullying you. 😌
            </p>
            <p>
              Anyway, I hope this year gives you everything you want — happiness, success, crazy memories, lots of cake, and enough brain cells to make at least one good decision. 😂❤️
            </p>
            <p className="text-lg font-semibold text-magenta">
              Stay cute. Stay crazy. Stay problematic.<br />
              And most importantly, never become normal — you're already entertaining enough like this. 😂❤️
            </p>
            <p className="text-lg font-bold text-dark-gray pt-4">
              Happy Birthday, idiotttt 🥳🎂🫶🏻<br />
              </p>
          </div>
        </motion.div>

        {/* Decorative Elements */}
        <motion.div
          className="flex justify-center gap-6 mb-12 text-3xl"
          variants={itemVariants}
        >
          <span className="animate-float">🎀</span>
          <span className="animate-float" style={{ animationDelay: '0.3s' }}>✨</span>
          <span className="animate-float" style={{ animationDelay: '0.6s' }}>🎀</span>
        </motion.div>

        {/* CTA Button */}
        <motion.button
          onClick={onCTAClick}
          className="relative px-8 md:px-10 py-4 md:py-5 rounded-full font-display font-semibold text-white bg-gradient-to-r from-mid-pink to-magenta shadow-soft hover:shadow-soft-lg transition-all"
          variants={itemVariants}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="flex items-center gap-2">
            OPEN YOUR SURPRISE
            <ChevronRight className="w-5 h-5" />
          </span>

          {/* Animated shine effect */}
          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white to-transparent opacity-0"
            animate={{ opacity: [0, 0.2, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.button>
      </motion.div>
    </div>
  )
}
