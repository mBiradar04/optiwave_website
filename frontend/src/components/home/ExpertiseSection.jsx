import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import ScrollReveal from '../ui/ScrollReveal'

const EXPERTISE = [
  {
    title: 'RF over Fiber (RFoF)',
    desc: 'Seamless transmission of radio frequency signals over optical fiber — with ultra-low attenuation, high bandwidth (0.5–18 GHz), and immunity to electromagnetic interference.',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z" />
      </svg>
    ),
  },
  {
    title: 'Optical Communication Systems',
    desc: 'Design and integration of Optical Transmitting Units (OTU), Optical Receiver Modules (ORM), Optical Delay Lines, and Photonic Distribution Units for defence and telecom.',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  },
  {
    title: 'End-to-End System Integration',
    desc: 'Complete system-level expertise spanning RF module design and validation, optical transmitter and receiver integration, PCB assembly, and full unit testing and troubleshooting.',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
      </svg>
    ),
  },
  {
    title: 'Testing & Validation',
    desc: 'Rigorous RF signal analysis, optical power and link testing, waveform analysis, BOM verification, and system validation — ensuring accurate, stable, and field-ready systems.',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
      </svg>
    ),
  },
]

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
}

export default function ExpertiseSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 })

  return (
    <section className="py-20 lg:py-28 bg-steel-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <ScrollReveal>
          <div className="text-center mb-14">
            <p className="text-accent-600 text-xs font-bold tracking-[0.15em] uppercase mb-4">
              What We Do
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold text-primary-800 mb-4">
              Our Areas of Expertise
            </h2>
            <p className="text-steel-500 max-w-2xl mx-auto">
              Four core technical domains built over two decades of engineering for India's
              leading defence, space, and telecommunications organisations.
            </p>
          </div>
        </ScrollReveal>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {EXPERTISE.map((item) => (
            <motion.div
              key={item.title}
              variants={cardVariants}
              whileHover={{ y: -6, boxShadow: '0 16px 48px rgba(13,31,53,0.12)' }}
              transition={{ duration: 0.22 }}
              className="bg-white rounded-2xl p-7 border border-steel-200 group cursor-default"
            >
              <div className="inline-flex items-center justify-center w-13 h-13 rounded-xl bg-primary-50 text-primary-700 mb-5 group-hover:bg-accent-500 group-hover:text-primary-900 transition-colors duration-300 p-3">
                {item.icon}
              </div>
              <h3 className="font-bold text-primary-800 text-base mb-3">{item.title}</h3>
              <p className="text-steel-500 text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}