import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { STRENGTHS } from '../../data/aboutData'

const ICONS = [
  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>,
  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>,
  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" /></svg>,
  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" /></svg>,
]

const container = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } }
const item = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
}

export default function StrengthsSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 })
  return (
    <div>
      <h3 className="text-xl font-bold text-primary-800 mb-8">Our strengths</h3>
      <motion.div
        ref={ref}
        variants={container}
        initial="hidden"
        animate={inView ? 'show' : 'hidden'}
        className="grid sm:grid-cols-2 gap-5"
      >
        {STRENGTHS.map((s, i) => (
          <motion.div
            key={s.id}
            variants={item}
            whileHover={{ y: -4, boxShadow: '0 12px 36px rgba(13,31,53,0.10)' }}
            transition={{ duration: 0.2 }}
            className="flex gap-4 bg-white rounded-xl p-6 border border-steel-200 group"
          >
            <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary-50 text-primary-700 flex items-center justify-center group-hover:bg-accent-500 group-hover:text-primary-900 transition-colors duration-300 p-3">
              {ICONS[i]}
            </div>
            <div>
              <h4 className="font-bold text-primary-800 text-sm mb-2">{s.title}</h4>
              <p className="text-steel-500 text-sm leading-relaxed">{s.desc}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}