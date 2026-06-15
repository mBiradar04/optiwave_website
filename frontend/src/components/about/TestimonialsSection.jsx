import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { TESTIMONIALS } from '../../data/aboutData'

const container = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } }
const card = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

export default function TestimonialsSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })
  return (
    <div>
      <h3 className="text-xl font-bold text-primary-800 mb-8">What our clients say</h3>
      <motion.div
        ref={ref}
        variants={container}
        initial="hidden"
        animate={inView ? 'show' : 'hidden'}
        className="grid md:grid-cols-3 gap-6"
      >
        {TESTIMONIALS.map((t) => (
          <motion.div
            key={t.id}
            variants={card}
            className="bg-white rounded-2xl p-7 border border-steel-200 flex flex-col"
          >
            <div className="flex gap-0.5 mb-5">
              {Array(t.stars).fill(null).map((_, i) => (
                <svg key={i} className="w-4 h-4 text-accent-500 fill-accent-500" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <div className="text-5xl text-accent-200 font-serif leading-none mb-3 select-none">"</div>
            <p className="text-steel-600 text-sm leading-relaxed flex-1 mb-6">{t.text}</p>
            <div className="border-t border-steel-100 pt-4">
              <div className="font-bold text-primary-800 text-sm">{t.name}</div>
              <div className="text-steel-400 text-xs mt-0.5">{t.org}</div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}