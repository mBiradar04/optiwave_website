import ScrollReveal from '../ui/ScrollReveal'
import { motion } from 'framer-motion'

const CARDS = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.964-7.178z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    label: 'Our Vision',
    title: 'A Leading Force in Optical Communication',
    body: 'To become a leading force in optical communication and RFoF technology, known for innovation, reliability, and impact. We aim to drive the evolution of digital infrastructure by enabling smarter, faster, and more scalable networks — while expanding our presence across industries and global markets.',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    label: 'Our Mission',
    title: 'Powering the Future of Connectivity',
    body: 'To power the future of connectivity with high-performance RFoF and fiber-optic solutions. We focus on delivering fast, reliable, and scalable communication systems that help businesses stay ahead — through innovation, engineering excellence, and customer-first execution.',
  },
]

export default function VisionMissionSection() {
  return (
    <section className="py-20 lg:py-28 bg-primary-800 relative overflow-hidden">

      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(201,168,76,0.8) 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-14">
            <p className="text-accent-400 text-xs font-bold tracking-[0.15em] uppercase mb-4">
              What Drives Us
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold text-white">
              Vision &amp; Mission
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {CARDS.map((card, i) => (
            <ScrollReveal key={card.label} delay={i * 0.15}>
              <motion.div
                whileHover={{ y: -4, boxShadow: '0 20px 60px rgba(0,0,0,0.4)' }}
                transition={{ duration: 0.25 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-8 lg:p-10 backdrop-blur-sm cursor-default"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 bg-accent-500/15 border border-accent-500/30 rounded-xl text-accent-400 mb-6">
                  {card.icon}
                </div>
                <p className="text-accent-400 text-xs font-bold tracking-[0.12em] uppercase mb-3">
                  {card.label}
                </p>
                <h3 className="text-xl font-bold text-white mb-4">{card.title}</h3>
                <p className="text-white/60 leading-relaxed">{card.body}</p>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}