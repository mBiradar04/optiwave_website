import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { PARTNERS } from '../../data/aboutData'

const container = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } }
const item = {
  hidden: { opacity: 0, y: 12 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
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
        className="flex flex-wrap justify-center sm:justify-start gap-4"
      >
        {PARTNERS.map((partner) => (
          <motion.div
            key={partner.id}
            variants={item}
            whileHover={{ borderColor: '#C9A84C', boxShadow: '0 4px 16px rgba(13,31,53,0.08)' }}
            className="w-40 h-16 bg-white border border-steel-200 rounded-lg flex items-center justify-center px-4 transition-all duration-200"
          >
            {partner.logo ? (
              <img
                src={`${import.meta.env.BASE_URL}${partner.logo}`}
                alt={partner.name}
                className="max-h-10 w-auto object-contain transition-all duration-200 hover:scale-110"
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