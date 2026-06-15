import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import ScrollReveal from '../ui/ScrollReveal'
import { MILESTONES } from '../../data/aboutData'

function MilestoneItem({ milestone, index }) {
  const isLeft = index % 2 === 0
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 })

  const card = (
    <div className={`bg-white border border-steel-200 rounded-xl p-5 hover:shadow-md transition-shadow duration-200 ${isLeft ? 'text-right' : ''}`}>
      <div className="text-accent-500 font-bold text-2xl mb-1">{milestone.year}</div>
      <div className="font-bold text-primary-800 text-sm mb-2">{milestone.title}</div>
      <div className="text-steel-500 text-xs leading-relaxed">{milestone.desc}</div>
    </div>
  )

  return (
    <div ref={ref} className="relative grid grid-cols-[1fr_auto_1fr] gap-4 items-center">
      <div className="pr-4">
        {isLeft && (
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {card}
          </motion.div>
        )}
      </div>
      <motion.div
        initial={{ scale: 0 }}
        animate={inView ? { scale: 1 } : {}}
        transition={{ duration: 0.35, delay: 0.15 }}
        className="flex items-center justify-center z-10"
      >
        <div className="w-4 h-4 rounded-full bg-accent-500 border-4 border-white shadow-sm ring-1 ring-accent-400" />
      </motion.div>
      <div className="pl-4">
        {!isLeft && (
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {card}
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default function HistorySection() {
  return (
    <section id="journey" className="py-20 lg:py-28 bg-steel-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="text-accent-600 text-xs font-bold tracking-[0.15em] uppercase mb-4">
              Our journey
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold text-primary-800">
              From distributor to defence technology company
            </h2>
          </div>
        </ScrollReveal>
        <div className="relative">
          <div className="absolute left-1/2 -translate-x-px top-0 bottom-0 w-px bg-steel-200" />
          <div className="flex flex-col gap-8">
            {MILESTONES.map((m, i) => (
              <MilestoneItem key={m.id} milestone={m} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}