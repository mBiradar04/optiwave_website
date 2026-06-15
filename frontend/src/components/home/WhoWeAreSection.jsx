import { Link } from 'react-router-dom'
import ScrollReveal from '../ui/ScrollReveal'

export default function WhoWeAreSection() {
  return (
    <section className="py-20 lg:py-28 bg-steel-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Text */}
          <div>
            <ScrollReveal>
              <p className="text-accent-600 text-xs font-bold tracking-[0.15em] uppercase mb-4">
                Who We Are
              </p>
              <h2 className="text-3xl lg:text-4xl font-bold text-primary-800 mb-6 leading-tight">
                Two Decades of Defending
                <span className="text-accent-500"> What Matters Most</span>
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <p className="text-steel-600 text-base lg:text-lg leading-relaxed mb-5">
                We are a specialised defence and communication technology company with over
                20 years of experience engineering products that operate at the edge — where
                reliability is not optional.
              </p>
              <p className="text-steel-500 text-base leading-relaxed mb-8">
                From Walkie Talkies deployed in field operations to enterprise-grade software
                systems, every product we build is subjected to the same rigorous standard:
                it must work when it matters.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 bg-primary-800 hover:bg-primary-700 text-white font-semibold text-sm px-6 py-3 rounded transition-all duration-200 hover:scale-105 active:scale-95"
                >
                  Our Story
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link
                  to="/products"
                  className="inline-flex items-center gap-2 border border-primary-200 hover:border-primary-400 text-primary-700 font-medium text-sm px-6 py-3 rounded transition-all duration-200 hover:bg-primary-50"
                >
                  View Products
                </Link>
              </div>
            </ScrollReveal>
          </div>

          {/* Visual */}
          <ScrollReveal direction="left" delay={0.15}>
            <div className="relative">
              {/* Main image area — replace with real company photo */}
              <div className="aspect-[4/3] bg-gradient-to-br from-primary-700 to-primary-900 rounded-2xl overflow-hidden shadow-2xl">
                <div className="w-full h-full flex items-center justify-center text-white/20 text-sm">
                  Company / facility photo
                </div>
              </div>
              {/* Accent card */}
              <div className="absolute -bottom-6 -left-6 bg-accent-500 text-primary-900 rounded-xl px-6 py-4 shadow-xl">
                <div className="text-2xl font-bold">ISO Certified</div>
                <div className="text-primary-900/70 text-sm font-medium">Quality Management</div>
              </div>
              {/* Decorative border */}
              <div className="absolute -top-4 -right-4 w-full h-full border-2 border-accent-400/30 rounded-2xl pointer-events-none" />
            </div>
          </ScrollReveal>

        </div>
      </div>
    </section>
  )
}