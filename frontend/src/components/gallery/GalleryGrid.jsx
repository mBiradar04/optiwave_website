import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { PHOTOS, GALLERY_CATEGORIES } from '../../data/galleryData'

// ── Gradient placeholders (varied so adjacent cards look distinct) ─────────────

const GRADIENTS = [
  'from-primary-700 via-primary-800 to-primary-900',
  'from-[#0A1628]   via-primary-800 to-[#1B2E4B]',
  'from-primary-800 via-[#162840]   to-primary-900',
  'from-[#1B2E4B]   via-primary-700 to-[#0A1628]',
  'from-primary-900 via-[#0D2137]   to-primary-700',
]

function PlaceholderImage({ index, caption }) {
  return (
    <div className={`w-full h-full bg-gradient-to-br ${GRADIENTS[index % GRADIENTS.length]} flex flex-col items-center justify-center gap-3 p-4`}>
      <svg className="w-10 h-10 text-white/20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
      </svg>
      <span className="text-white/30 text-xs text-center leading-tight px-2">{caption}</span>
    </div>
  )
}

// ── Lightbox ───────────────────────────────────────────────────────────────────

function Lightbox({ photos, index, onClose, onPrev, onNext }) {
  const photo = photos[index]

  // Keyboard navigation
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape')     onClose()
      if (e.key === 'ArrowLeft')  onPrev()
      if (e.key === 'ArrowRight') onNext()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose, onPrev, onNext])

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 bg-black/92 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Image container — stop propagation so clicking it doesn't close */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.92 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="relative max-w-4xl w-full max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top bar */}
        <div className="flex items-center justify-between mb-3 px-1">
          <span className="text-white/50 text-xs font-mono">
            {index + 1} / {photos.length}
          </span>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close lightbox"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Image */}
        <div className="relative rounded-xl overflow-hidden bg-primary-900 flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={photo.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="aspect-[16/10] w-full"
            >
              {photo.image ? (
                <img
                  src={photo.image}
                  alt={photo.caption}
                  className="w-full h-full object-cover"
                />
              ) : (
                <PlaceholderImage index={photo.id} caption={photo.caption} />
              )}
            </motion.div>
          </AnimatePresence>

          {/* Prev / Next arrows */}
          <button
            onClick={onPrev}
            className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/40 hover:bg-black/70 text-white transition-all duration-200 hover:scale-110"
            aria-label="Previous photo"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          <button
            onClick={onNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/40 hover:bg-black/70 text-white transition-all duration-200 hover:scale-110"
            aria-label="Next photo"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>

        {/* Caption */}
        <div className="mt-3 px-1 flex items-center gap-3">
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded border bg-accent-500/15 text-accent-400 border-accent-500/30 capitalize">
            {photo.category}
          </span>
          <p className="text-white/70 text-sm">{photo.caption}</p>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ── Grid ───────────────────────────────────────────────────────────────────────

const container = { hidden: {}, show: { transition: { staggerChildren: 0.05 } } }
const cardAnim  = {
  hidden: { opacity: 0, scale: 0.95 },
  show:   { opacity: 1, scale: 1, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
}

export default function GalleryGrid() {
  const [activeFilter,  setActiveFilter]  = useState('all')
  const [lightboxIndex, setLightboxIndex] = useState(null)
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 })

  const filtered = activeFilter === 'all'
    ? PHOTOS
    : PHOTOS.filter(p => p.category === activeFilter)

  const openLightbox  = useCallback((i)   => setLightboxIndex(i), [])
  const closeLightbox = useCallback(()    => setLightboxIndex(null), [])
  const goPrev        = useCallback(() => setLightboxIndex(i => (i - 1 + filtered.length) % filtered.length), [filtered.length])
  const goNext        = useCallback(() => setLightboxIndex(i => (i + 1) % filtered.length),                  [filtered.length])

  // Close lightbox when filter changes
  useEffect(() => { setLightboxIndex(null) }, [activeFilter])

  return (
    <>
      <section className="py-16 lg:py-24 bg-steel-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Filter pills */}
          <div className="flex flex-wrap items-center gap-3 mb-10">
            {GALLERY_CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveFilter(cat.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${
                  activeFilter === cat.id
                    ? 'bg-primary-800 text-white border-primary-800'
                    : 'bg-white text-steel-500 border-steel-200 hover:border-steel-300 hover:text-primary-700'
                }`}
              >
                {cat.label}
              </button>
            ))}
            <span className="text-steel-400 text-xs ml-auto">
              {filtered.length} {filtered.length === 1 ? 'photo' : 'photos'}
            </span>
          </div>

          {/* Photo grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              ref={ref}
              variants={container}
              initial="hidden"
              animate={inView ? 'show' : 'hidden'}
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-4"
            >
              {filtered.map((photo, i) => (
                <motion.div
                  key={photo.id}
                  variants={cardAnim}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.18 }}
                  className="aspect-square rounded-xl overflow-hidden cursor-pointer group relative"
                  onClick={() => openLightbox(i)}
                >
                  {/* Photo or placeholder */}
                  {photo.image ? (
                    <img
                      src={photo.image}
                      alt={photo.caption}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <PlaceholderImage index={photo.id} caption="" />
                  )}

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-primary-900/0 group-hover:bg-primary-900/50 transition-all duration-300 flex flex-col items-center justify-end p-3">
                    <div className="translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 w-full">
                      <span className="text-xs font-semibold text-accent-400 capitalize block mb-1">
                        {photo.category}
                      </span>
                      <p className="text-white text-xs leading-tight line-clamp-2">
                        {photo.caption}
                      </p>
                    </div>
                  </div>

                  {/* Expand icon */}
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <div className="w-7 h-7 bg-black/50 rounded-lg flex items-center justify-center">
                      <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                      </svg>
                    </div>
                  </div>

                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

        </div>
      </section>

      {/* Lightbox — rendered outside the section so it's above everything */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            photos={filtered}
            index={lightboxIndex}
            onClose={closeLightbox}
            onPrev={goPrev}
            onNext={goNext}
          />
        )}
      </AnimatePresence>
    </>
  )
}