import ScrollReveal from './ScrollReveal'

export default function ComingSoon({ title = 'Coming Soon', message }) {
  return (
    <section className="py-24 lg:py-32 bg-steel-100">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <ScrollReveal>
          <div className="w-16 h-16 rounded-2xl bg-primary-800 text-accent-400 flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl lg:text-3xl font-bold text-primary-800 mb-3">
            {title}
          </h2>
          <p className="text-steel-500 leading-relaxed">
            {message}
          </p>
        </ScrollReveal>
      </div>
    </section>
  )
}
