import { useEffect, useState, useCallback } from 'react'
import { motion } from 'framer-motion'

const SECTIONS = [
  { id: 'overview', label: 'Overview'    },
  { id: 'journey',  label: 'Our Journey' },
]

export default function AboutSubNav() {
  const [active,   setActive]   = useState('overview')
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const observers = SECTIONS.map(({ id }) => {
      const el = document.getElementById(id)
      if (!el) return null
      const io = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id) },
        { threshold: 0.25, rootMargin: '-80px 0px -50% 0px' }
      )
      io.observe(el)
      return io
    })
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      observers.forEach(o => o?.disconnect())
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  const scrollTo = useCallback((id) => {
    const el = document.getElementById(id)
    if (!el) return
    window.scrollTo({
      top: el.getBoundingClientRect().top + window.scrollY - 80,
      behavior: 'smooth',
    })
  }, [])

  return (
    <div className={`sticky top-16 lg:top-20 z-40 border-b border-steel-200 transition-all duration-300 ${
      scrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm' : 'bg-white'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex gap-0">
        {SECTIONS.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => scrollTo(id)}
            className={`relative py-4 px-5 text-sm font-medium transition-colors duration-200 ${
              active === id ? 'text-primary-800' : 'text-steel-500 hover:text-primary-700'
            }`}
          >
            {label}
            {active === id && (
              <motion.div
                layoutId="subnav-indicator"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent-500"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  )
}