import AboutHero           from '../components/about/AboutHero'
import AboutSubNav         from '../components/about/AboutSubNav'
import StrengthsSection    from '../components/about/StrengthsSection'
import PartnersSection     from '../components/about/PartnersSection'
import HistorySection      from '../components/about/HistorySection'

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <AboutSubNav />

      {/* Overview */}
      <section id="overview" className="py-20 lg:py-28 bg-steel-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-accent-600 text-xs font-bold tracking-[0.15em] uppercase mb-4">
              Overview
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold text-primary-800">
              Built on expertise. Driven by purpose.
            </h2>
          </div>
          <div className="space-y-16">
            <StrengthsSection />
            <div className="h-px bg-steel-200" />
            <PartnersSection />
          </div>
        </div>
      </section>

      {/* Our Journey */}
      <HistorySection />
    </>
  )
}