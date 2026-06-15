import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { PARTNERS } from '../../data/aboutData'

const container = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } }
const item = {
  hidden: { opacity: 0, scale: 0.95 },
  show:   { opacity: 1, scale: 1, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
}

export default function PartnersSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 })
  return (
    <div>
      <h3 className="text-xl font-bold text-primary-800 mb-8">Partner companies</h3>
      <motion.div
        ref={ref}
        variants={container}
        initial="hidden"
        animate={inView ? 'show' : 'hidden'}
        className="grid grid-cols-2 sm:grid-cols-4 gap-4"
      >
        {PARTNERS.map((partner) => (
          <motion.div
            key={partner.id}
            variants={item}
            whileHover={{ borderColor: '#C9A84C', boxShadow: '0 4px 16px rgba(13,31,53,0.08)' }}
            className="h-14 bg-white border border-steel-200 rounded-lg flex items-center justify-center px-4 transition-all duration-200"
          >
            {partner.logo ? (
              <img
                src={partner.logo}
                alt={partner.name}
                className="max-h-8 w-auto object-contain opacity-60 hover:opacity-90 grayscale hover:grayscale-0 transition-all"
              />
            ) : (
              <span className="text-steel-400 text-xs font-semibold text-center leading-tight">
                {partner.name}
              </span>
            )}
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}