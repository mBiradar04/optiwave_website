import CountUp from 'react-countup'
import { useInView } from 'react-intersection-observer'
import ScrollReveal from '../ui/ScrollReveal'

const STATS = [
  { value: 500, suffix: '+', label: 'Employees' },
  { value: 20,  suffix: '+', label: 'Years of Experience' },
  { value: 15,  suffix: '',  label: 'Countries Served' },
  { value: 100, suffix: '+', label: 'Products Delivered' },
]

function StatItem({ stat, inView }) {
  return (
    <div className="text-center px-6 py-8 border-r border-steel-200 last:border-none">
      <div className="text-3xl lg:text-4xl font-bold text-primary-800 mb-1">
        {inView ? (
          <CountUp
            start={0}
            end={stat.value}
            duration={2.2}
            suffix={stat.suffix}
            useEasing
          />
        ) : (
          <span>0{stat.suffix}</span>
        )}
      </div>
      <div className="text-steel-500 text-sm font-medium">{stat.label}</div>
    </div>
  )
}

export default function StatsBar() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 })

  return (
    <section ref={ref} className="bg-white border-y border-steel-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {STATS.map((stat, i) => (
            <ScrollReveal key={stat.label} delay={i * 0.1}>
              <StatItem stat={stat} inView={inView} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}