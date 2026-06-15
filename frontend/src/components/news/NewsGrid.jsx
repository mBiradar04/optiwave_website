import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { NEWS_EVENTS } from '../../data/newsEvents'

// ── Helpers ────────────────────────────────────────────────────────────────────

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-IN', {
    day:   'numeric',
    month: 'long',
    year:  'numeric',
  })
}

const FILTERS = [
  { id: 'all',   label: 'All'    },
  { id: 'news',  label: 'News'   },
  { id: 'event', label: 'Events' },
]

const TYPE_STYLES = {
  news:  'bg-primary-50  text-primary-700 border-primary-200',
  event: 'bg-accent-50   text-accent-700  border-accent-200',
}

const IMG_GRADIENTS = [
  'from-primary-700 to-primary-900',
  'from-primary-800 to-[#0A1628]',
  'from-[#1B2E4B]   to-primary-900',
  'from-primary-700 to-[#162840]',
]

// ── Featured post ──────────────────────────────────────────────────────────────

function FeaturedPost({ post }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="bg-white rounded-2xl border border-steel-200 overflow-hidden mb-10 grid lg:grid-cols-[1fr_420px]"
    >
      {/* Image */}
      <div className={`min-h-[220px] lg:min-h-0 bg-gradient-to-br ${IMG_GRADIENTS[0]} flex items-center justify-center`}>
        {post.image ? (
          <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
        ) : (
          <svg className="w-14 h-14 text-white/15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" />
          </svg>
        )}
      </div>

      {/* Content */}
      <div className="p-8 flex flex-col justify-center">
        <div className="flex items-center gap-3 mb-4">
          <span className={`text-xs font-semibold px-2.5 py-0.5 rounded border ${TYPE_STYLES[post.type]}`}>
            {post.type === 'news' ? 'News' : 'Event'}
          </span>
          <span className="text-steel-400 text-xs">{formatDate(post.date)}</span>
          <span className="text-xs font-semibold bg-accent-500/15 text-accent-600 border border-accent-300/40 px-2.5 py-0.5 rounded">
            Featured
          </span>
        </div>
        <h2 className="text-xl lg:text-2xl font-bold text-primary-800 mb-4 leading-snug">
          {post.title}
        </h2>
        <p className="text-steel-500 text-sm leading-relaxed">
          {post.excerpt}
        </p>
      </div>
    </motion.div>
  )
}

// ── Regular card ───────────────────────────────────────────────────────────────

function NewsCard({ post, index }) {
  const gradient = IMG_GRADIENTS[index % IMG_GRADIENTS.length]

  return (
    <motion.div
      layout
      whileHover={{ y: -5, boxShadow: '0 16px 48px rgba(13,31,53,0.12)' }}
      transition={{ duration: 0.2 }}
      className="bg-white rounded-2xl border border-steel-200 overflow-hidden flex flex-col"
    >
      {/* Image */}
      <div className={`aspect-[16/9] bg-gradient-to-br ${gradient} flex items-center justify-center`}>
        {post.image ? (
          <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
        ) : (
          <svg className="w-10 h-10 text-white/15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" />
          </svg>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-3">
          <span className={`text-xs font-semibold px-2.5 py-0.5 rounded border ${TYPE_STYLES[post.type]}`}>
            {post.type === 'news' ? 'News' : 'Event'}
          </span>
          <span className="text-steel-400 text-xs">{formatDate(post.date)}</span>
        </div>
        <h3 className="font-bold text-primary-800 text-sm mb-2 leading-snug">
          {post.title}
        </h3>
        <p className="text-steel-500 text-xs leading-relaxed line-clamp-3">
          {post.excerpt}
        </p>
      </div>
    </motion.div>
  )
}

// ── Main component ─────────────────────────────────────────────────────────────

const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } }
const cardAnim  = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}

export default function NewsGrid() {
  const [activeFilter, setActiveFilter] = useState('all')
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 })

  const featured = NEWS_EVENTS.find(p => p.featured)
  const rest     = NEWS_EVENTS.filter(p => !p.featured)

  const filtered = activeFilter === 'all'
    ? rest
    : rest.filter(p => p.type === activeFilter)

  return (
    <section className="py-16 lg:py-24 bg-steel-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Featured post */}
        {featured && <FeaturedPost post={featured} />}

        {/* Filter pills */}
        <div className="flex items-center gap-3 mb-8">
          {FILTERS.map(f => (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${
                activeFilter === f.id
                  ? 'bg-primary-800 text-white border-primary-800'
                  : 'bg-white text-steel-500 border-steel-200 hover:border-steel-300 hover:text-primary-700'
              }`}
            >
              {f.label}
            </button>
          ))}
          <span className="text-steel-400 text-xs ml-auto">
            {filtered.length} {filtered.length === 1 ? 'item' : 'items'}
          </span>
        </div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          {filtered.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-20"
            >
              <p className="text-steel-400 font-medium">No items in this category.</p>
            </motion.div>
          ) : (
            <motion.div
              key={activeFilter}
              ref={ref}
              variants={container}
              initial="hidden"
              animate={inView ? 'show' : 'hidden'}
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filtered.map((post, i) => (
                <motion.div key={post.id} variants={cardAnim}>
                  <NewsCard post={post} index={i} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  )
}