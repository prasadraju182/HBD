import { useEffect } from 'react'
import { memories } from '../data/memories'
import PhotoCard from './PhotoCard'

export default function PhotoStory() {
  useEffect(() => {
    console.log('📸 Photos loaded:', memories.length, 'photos')
    memories.forEach((m, i) => {
      console.log(`  Photo ${i+1}:`, m.image, '-', m.title, '(', m.animation, ')')
    })
  }, [])

  return (
    <section className="py-20 md:py-32 px-4 md:px-8 bg-gradient-to-b from-cream via-white to-soft-pink">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-dark-gray mb-3">
            THE JYOTHIKA ARCHIVES
          </h2>
          <p className="text-lg text-mid-pink font-light">
            A collection of highly questionable photographic evidence. 📸
          </p>
        </div>

        {/* Photo Story */}
        <div className="space-y-20 md:space-y-32">
          {memories.map((memory, index) => (
            <PhotoCard
              key={memory.id}
              memory={memory}
              index={index}
              delay={index * 0.2}
            />
          ))}
        </div>
      </div>
    </section>
  )
}