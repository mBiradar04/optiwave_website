import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

// Replace image values with real product/facility photos when available.
// Use high-resolution landscape images (min 1920×1080).
const SLIDES = [
  {
    id: 1,
    image: '/images/hero/hero-1.jpeg',
    gradient: 'from-primary-900 via-primary-800 to-primary-700',
    eyebrow: 'RF over Fiber Technology',
    headline: ['Precision.', 'Reliability.', 'Trusted by', 'Defence Leaders.'],
    sub: 'Advanced RF over Fiber (RFoF) solutions enabling seamless, high-performance signal transmission for defence, telecom, and satellite applications.',
    cta: { label: 'Explore Products', to: '/products' },
  },
  {
    id: 2,
    image: '/images/hero/hero-2.jpeg',
    gradient: 'from-[#0A1628] via-[#0D2137] to-[#1B2E4B]',
    eyebrow: 'Advanced Photonic Systems',
    headline: ['Engineered', 'for the', 'Most Demanding', 'Environments.'],
    sub: 'From Astra ORM programs to DRDO radar systems — our photonic and optical solutions are proven in India\'s most critical defence programmes.',
    cta: { label: 'Our Solutions', to: '/products' },
  },
  {
    id: 3,
    image: '/images/hero/hero-3.jpeg',
    gradient: 'from-primary-900 via-[#162840] to-[#0D1F35]',
    eyebrow: 'Optical Communication Systems',
    headline: ['Low Signal', 'Loss.', 'High Bandwidth.', 'Long Distance.'],
    sub: 'Bandwidth from 0.5 to 18 GHz. Ultra-low attenuation over long distances. Built for telecommunications, DAS, satellite, and broadband infrastructure.',
    cta: { label: 'View Technology', to: '/products' },
  },
  {
    id: 4,
    image: '/images/hero/hero-4.png',
    gradient: 'from-[#070F1A] via-primary-900 to-[#1B2E4B]',
    eyebrow: '20+ Years of Engineering Excellence',
    headline: ['Design.', 'Develop.', 'Test.', 'Deploy.'],
    sub: 'Since 2003, CCSL has delivered end-to-end RF and optical communication systems — from concept and design through testing, integration, and field deployment.',
    cta: { label: 'About Us', to: '/about' },
  },
]

export default function HeroSection() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  const goTo = (idx) => {
    setCurrent(idx)
  }

  const slide = SLIDES[current]

  const slideVariants = {
    enter:  { opacity: 0 },
    center: { opacity: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
    exit:   { opacity: 0, transition: { duration: 0.5 } },
  }

  const wordVariants = {
    hidden: {},
    show:   { transition: { staggerChildren: 0.08 } },
  }
  const wordItem = {
    hidden: { opacity: 0, y: 24 },
    show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
  }

  return (
    <section className="relative h-screen min-h-[600px] max-h-[900px] overflow-hidden">

      {/* Background slides */}
      <AnimatePresence mode="sync">
        <motion.div
          key={current}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0 bg-slate-950"
        >
          {slide.image ? (
            <>
              <div
                className="absolute inset-0 bg-cover bg-center animate-ken-burns"
                style={{ backgroundImage: `url(${import.meta.env.BASE_URL}${slide.image.slice(1)})` }}
              />
              <div className="absolute inset-0 bg-primary-900/60" />
            </>
          ) : (
            <div className={`absolute inset-0 bg-gradient-to-br ${slide.gradient}`} />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Subtle grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.0]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Accent line — bottom of hero */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent-500 to-transparent opacity-60" />

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">

          <AnimatePresence mode="wait">
            <motion.div key={current} initial="hidden" animate="show" className="max-w-3xl">

              {/* Eyebrow */}
              <motion.p
                initial={{ opacity: 0, letterSpacing: '0.2em' }}
                animate={{ opacity: 1, letterSpacing: '0.12em' }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-accent-400 text-xs sm:text-sm font-semibold tracking-[0.12em] uppercase mb-6"
              >
                {slide.eyebrow}
              </motion.p>

              {/* Headline — word by word */}
              <motion.h1
                variants={wordVariants}
                className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight mb-6"
              >
                {slide.headline.map((line, i) => (
                  <motion.span key={i} variants={wordItem} className="block">
                    {i === 0 || i === 2 ? (
                      <span className="text-accent-400">{line}</span>
                    ) : line}
                  </motion.span>
                ))}
              </motion.h1>

              {/* Sub */}
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="text-white/65 text-base sm:text-lg leading-relaxed mb-10 max-w-xl"
              >
                {slide.sub}
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="flex flex-wrap gap-4"
              >
                <Link
                  to={slide.cta.to}
                  className="inline-flex items-center gap-2 bg-accent-500 hover:bg-accent-400 text-primary-900 font-bold text-sm px-7 py-3.5 rounded transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg shadow-accent-500/25"
                >
                  {slide.cta.label}
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 border border-white/30 hover:border-white/60 text-white font-medium text-sm px-7 py-3.5 rounded transition-all duration-200 hover:bg-white/10 backdrop-blur-sm"
                >
                  Get in Touch
                </Link>
              </motion.div>

            </motion.div>
          </AnimatePresence>

          {/* Slide dots */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-2.5">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`transition-all duration-300 rounded-full ${
                  i === current
                    ? 'w-8 h-2 bg-accent-400'
                    : 'w-2 h-2 bg-white/35 hover:bg-white/60'
                }`}
              />
            ))}
          </div>

          {/* Slide counter — top right */}
          <div className="absolute top-8 right-6 text-white/40 text-xs font-mono tracking-widest hidden md:block">
            {String(current + 1).padStart(2, '0')} / {String(SLIDES.length).padStart(2, '0')}
          </div>

        </div>
      </div>
    </section>
  )
}