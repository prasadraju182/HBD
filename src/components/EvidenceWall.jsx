import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import { memories } from '../data/memories'

export default function EvidenceWall() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 })

  // Use first 6 photos for the collage
  const collagePhotos = memories.slice(0, 6)

  // Asymmetric grid layout
  const getGridClass = (index) => {
    const classes = [
      'md:col-span-2 md:row-span-2', // Large
      'md:col-span-1', // Medium
      'md:col-span-1 md:row-span-2', // Tall
      'md:col-span-2', // Wide
      'md:col-span-1', // Medium
      'md:col-span-2 md:row-span-1' // Wide
    ]
    return classes[index] || ''
  }

  const getRotation = (index) => {
    const rotations = [-2, 3, -1, 2, -3, 1]
    return rotations[index] || 0
  }

  return (
    <section className="py-20 md:py-32 px-4 md:px-8 bg-white relative">
      <div className="max-w-6xl mx-auto" ref={ref}>
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-dark-gray mb-3">
            THE EVIDENCE WALL
          </h2>
          <p className="text-lg text-mid-pink font-light">
            A curated collection of memories 📸
          </p>
        </div>

        {/* Asymmetric Grid Collage */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 auto-rows-[300px]">
          {collagePhotos.map((photo, index) => (
            <motion.div
              key={photo.id}
              className={`${getGridClass(index)} rounded-xl overflow-hidden shadow-soft cursor-pointer group relative`}
              initial={{ opacity: 0, scale: 0.9, rotate: 0 }}
              animate={inView ? { opacity: 1, scale: 1, rotate: getRotation(index) } : {}}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              whileHover={{ scale: 1.02, rotate: 0 }}
            >
              <img
                src={photo.image}
                alt={photo.title}
                className="w-full h-full object-cover transition-transform group-hover:scale-110"
                onError={(e) => {
                  e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"%3E%3Crect fill="%23FFE8F1" width="400" height="400"/%3E%3Ctext x="50%" y="50%" text-anchor="middle" dy=".3em" fill="%23FF6B9D" font-size="20" font-weight="bold"%3E📸%3C/text%3E%3C/svg%3E'
                }}
              />

              {/* Overlay */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-dark-gray/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4"
              >
                <div className="text-white">
                  <p className="text-sm font-display font-semibold">{photo.title}</p>
                  <p className="text-xs font-light">{photo.caption}</p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
