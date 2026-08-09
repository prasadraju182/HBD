import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'

export default function PhotoCard({ memory, index }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 })

  const getAnimationVariants = (type) => {
    const baseVariants = {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { duration: 0.8 } }
    }

    switch (type) {
      case 'fade':
        return {
          ...baseVariants,
          hidden: { opacity: 0, scale: 0.95 },
          visible: { opacity: 1, scale: 1, transition: { duration: 0.8 } }
        }
      case 'slideLeft':
        return {
          ...baseVariants,
          hidden: { opacity: 0, x: -100, rotate: -5 },
          visible: { opacity: 1, x: 0, rotate: 0, transition: { duration: 0.8, type: 'spring' } }
        }
      case 'blurSharp':
        return {
          ...baseVariants,
          hidden: { opacity: 0, filter: 'blur(10px)' },
          visible: { opacity: 1, filter: 'blur(0px)', transition: { duration: 1.2 } }
        }
      case 'clipPath':
        return {
          ...baseVariants,
          hidden: { opacity: 1, clipPath: 'inset(0% 100% 0% 0%)' },
          visible: { clipPath: 'inset(0% 0% 0% 0%)', transition: { duration: 0.8 } }
        }
      case 'card3d':
        return {
          ...baseVariants,
          hidden: { opacity: 0, rotateY: 90 },
          visible: { opacity: 1, rotateY: 0, transition: { duration: 0.8 } }
        }
      case 'zoomOut':
        return {
          ...baseVariants,
          hidden: { opacity: 0, scale: 1.2 },
          visible: { opacity: 1, scale: 1, transition: { duration: 0.8 } }
        }
      case 'slideUp':
        return {
          ...baseVariants,
          hidden: { opacity: 0, y: 100 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.8, type: 'spring' } }
        }
      case 'stacked':
        return {
          ...baseVariants,
          hidden: { opacity: 0, x: -50, y: 50 },
          visible: { opacity: 1, x: 0, y: 0, transition: { duration: 0.8 } }
        }
      case 'parallax':
        return {
          ...baseVariants,
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { duration: 0.8 } }
        }
      case 'cinematic':
        return {
          ...baseVariants,
          hidden: { opacity: 0, scale: 0.9, filter: 'blur(5px)' },
          visible: { opacity: 1, scale: 1, filter: 'blur(0px)', transition: { duration: 1 } }
        }
      default:
        return baseVariants
    }
  }

  const variants = getAnimationVariants(memory.animation)

  // Alternating layouts for asymmetric design
  const isEven = index % 2 === 0

  return (
    <motion.div
      ref={ref}
      className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 md:gap-12 items-center`}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={variants}
    >
      {/* Image */}
      <div className="w-full md:w-1/2">
        <motion.div
          className="rounded-2xl overflow-hidden shadow-soft relative bg-soft-pink"
          whileHover={{ shadow: '0 20px 40px rgba(255, 107, 157, 0.25)' }}
        >
          {/* Debug Badge - Photo ID */}
          <div className="absolute top-3 right-3 bg-magenta text-white px-3 py-1 rounded-full text-xs font-bold z-10">
            Photo #{memory.id}
          </div>
          <img
            src={memory.image}
            alt={memory.title}
            className="w-full h-auto object-cover aspect-square md:aspect-auto"
            onError={(e) => {
              e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect fill="%23FFE8F1" width="400" height="300"/%3E%3Ctext x="50%" y="50%" text-anchor="middle" dy=".3em" fill="%23FF6B9D" font-size="24" font-weight="bold"%3EYOUR PHOTO HERE 📸%3C/text%3E%3C/svg%3E'
            }}
          />
        </motion.div>
      </div>

      {/* Content */}
      <div className="w-full md:w-1/2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <p className="text-sm md:text-base font-display font-semibold text-mid-pink mb-3 tracking-wider">
            {memory.title}
          </p>
          <h3 className="text-2xl md:text-3xl font-serif font-bold text-dark-gray mb-4">
            {memory.caption}
          </h3>
          <div className="h-1 w-12 bg-gradient-to-r from-mid-pink to-magenta rounded" />
        </motion.div>
      </div>
    </motion.div>
  )
}