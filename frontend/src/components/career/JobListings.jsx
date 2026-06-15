import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import ScrollReveal from '../ui/ScrollReveal'
import { JOBS, CAREERS_EMAIL } from '../../data/careerData'

// Builds a mailto link pre-filled with the job title and a basic application template
function buildApplyMailto(job) {
  const subject = encodeURIComponent(`Job Application: ${job.title}`)
  const body = encodeURIComponent(
    [
      `I would like to apply for the position of ${job.title} (${job.department}, ${job.location}).`,
      '',
      'Name:',
      'Email:',
      'Phone:',
      'LinkedIn / Portfolio:',
      'Years of relevant experience:',
      '',
      'Cover note:',
    ].join('\n')
  )
  return `mailto:${CAREERS_EMAIL}?subject=${subject}&body=${body}`
}

// Builds the open application mailto
function buildOpenMailto() {
  const subject = encodeURIComponent('Open Application — Defence Company')
  const body = encodeURIComponent(
    [
      'I am interested in joining your team and would like to submit an open application.',
      '',
      'Name:',
      'Email:',
      'Phone:',
      'Area of expertise:',
      'LinkedIn / Portfolio:',
      '',
      'About me and what I can contribute:',
    ].join('\n')
  )
  return `mailto:${CAREERS_EMAIL}?subject=${subject}&body=${body}`
}

const DEPT_COLORS = {
  Engineering: 'bg-primary-50 text-primary-700 border-primary-200',
  Operations:  'bg-steel-50  text-steel-700  border-steel-200',
  Sales:       'bg-accent-50 text-accent-700 border-accent-200',
}

const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } }
const card = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}

export default function JobListings() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section className="py-20 lg:py-28 bg-steel-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        <ScrollReveal>
          <div className="text-center mb-14">
            <p className="text-accent-600 text-xs font-bold tracking-[0.15em] uppercase mb-4">
              Open positions
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold text-primary-800 mb-4">
              Current openings
            </h2>
            <p className="text-steel-500 max-w-lg mx-auto">
              All roles are based in Udupi unless stated otherwise.
              Click Apply to open your email client with the role pre-filled.
            </p>
          </div>
        </ScrollReveal>

        {/* Job cards */}
        <motion.div
          ref={ref}
          variants={container}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="space-y-4 mb-12"
        >
          {JOBS.map((job) => (
            <motion.div
              key={job.id}
              variants={card}
              className="bg-white rounded-2xl border border-steel-200 p-6 group hover:border-accent-300 hover:shadow-md transition-all duration-200"
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">

                {/* Left — job info */}
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className={`text-xs font-semibold px-2.5 py-0.5 rounded border ${DEPT_COLORS[job.department] ?? 'bg-steel-50 text-steel-600 border-steel-200'}`}>
                      {job.department}
                    </span>
                    <span className="text-steel-400 text-xs flex items-center gap-1">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                      </svg>
                      {job.location}
                    </span>
                    <span className="text-steel-400 text-xs flex items-center gap-1">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {job.type}
                    </span>
                  </div>

                  <h3 className="font-bold text-primary-800 text-lg mb-2 group-hover:text-accent-600 transition-colors">
                    {job.title}
                  </h3>

                  <p className="text-steel-500 text-sm leading-relaxed">
                    {job.desc}
                  </p>
                </div>

                {/* Right — apply button */}
                <div className="flex-shrink-0">
                  <a
                    href={buildApplyMailto(job)}
                    className="inline-flex items-center gap-2 bg-accent-500 hover:bg-accent-400 text-primary-900 font-bold text-sm px-5 py-2.5 rounded-lg transition-all duration-200 hover:scale-105 active:scale-95 whitespace-nowrap"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                    Apply
                  </a>
                </div>

              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Open application */}
        <ScrollReveal>
          <div className="bg-primary-800 rounded-2xl p-8 text-center relative overflow-hidden">
            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage: `radial-gradient(circle, rgba(201,168,76,0.9) 1px, transparent 1px)`,
                backgroundSize: '24px 24px',
              }}
            />
            <div className="relative">
              <h3 className="text-xl font-bold text-white mb-2">
                Don't see a role that fits?
              </h3>
              <p className="text-white/55 text-sm leading-relaxed mb-6 max-w-md mx-auto">
                We are always interested in hearing from talented engineers, operators,
                and sales professionals. Send us an open application and we will keep
                you in mind for future roles.
              </p>
              <a
                href={buildOpenMailto()}
                className="inline-flex items-center gap-2 bg-accent-500 hover:bg-accent-400 text-primary-900 font-bold text-sm px-6 py-3 rounded-lg transition-all duration-200 hover:scale-105 active:scale-95"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                Send Open Application
              </a>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  )
}