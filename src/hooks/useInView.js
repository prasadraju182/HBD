import { useState, useEffect } from 'react'

export function useInView(options = {}) {
  const [ref, setRef] = useState(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true)
        if (options.triggerOnce) {
          observer.unobserve(entry.target)
        }
      }
    }, {
      threshold: options.threshold ?? 0.3
    })

    if (ref) {
      observer.observe(ref)
    }

    return () => {
      if (ref) {
        observer.unobserve(ref)
      }
    }
  }, [ref, options])

  return { ref: setRef, inView }
}
