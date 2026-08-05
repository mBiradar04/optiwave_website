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
                Two Decades of
                <span className="text-accent-500"> Advanced RF & Optical Innovation</span>
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <p className="text-steel-600 text-base lg:text-lg leading-relaxed mb-5">
                Clear Communication Systems Ltd. (CCSL), formerly known as Optiwave Photonics Ltd.,
                is a technology-driven company committed to delivering advanced and reliable communication
                solutions. We specialise in RF over Fiber (RFoF) technology — enabling high-performance,
                scalable, and efficient communication infrastructure for modern telecommunication,
                defence, and networking needs.
              </p>
              <p className="text-steel-500 text-base leading-relaxed mb-8">
                At the core of our expertise is the transformation of RF signal transmission through
                optical fiber technology. Our solutions ensure low signal loss, high bandwidth, superior
                signal integrity, and long-distance transmission — making them ideal for the most
                demanding communication environments.
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
              {/* Main image area */}
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={`${import.meta.env.BASE_URL}images/other/building.jpg`}
                  alt="Clear Communication Systems Ltd. facility"
                  className="w-full h-full object-cover"
                />
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