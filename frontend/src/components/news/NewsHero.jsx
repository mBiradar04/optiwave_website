import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function NewsHero() {
  return (
    <section className="bg-primary-800 pt-28 lg:pt-32 pb-14 relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(201,168,76,0.9) 1px, transparent 1px)`,
          backgroundSize: '28px 28px',
        }}
      />
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent-500 to-transparent opacity-50" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-2 text-white/40 text-xs mb-6"
        >
          <Link to="/" className="hover:text-white/70 transition-colors">Home</Link>
          <span>/</span>
          <span className="text-white/65">News & Events</span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="text-accent-400 text-xs font-bold tracking-[0.15em] uppercase mb-4"
        >
          Latest Updates
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-5 leading-tight"
        >
          News &
          <span className="text-accent-400"> Events</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="text-white/55 text-base lg:text-lg max-w-2xl leading-relaxed"
        >
          Company announcements, contract wins, certifications,
          and upcoming events — all in one place.
        </motion.p>

      </div>
    </section>
  )
}