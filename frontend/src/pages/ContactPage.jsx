import ContactHero    from '../components/contact/ContactHero'
import ContactForm    from '../components/contact/ContactForm'
import ContactDetails from '../components/contact/ContactDetails'
import ScrollReveal   from '../components/ui/ScrollReveal'

export default function ContactPage() {
  return (
    <>
      <ContactHero />

      <section className="py-16 lg:py-24 bg-steel-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1fr_400px] gap-10 lg:gap-14 items-start">

            <ScrollReveal>
              <ContactForm />
            </ScrollReveal>

            <ScrollReveal direction="left" delay={0.15}>
              <ContactDetails />
            </ScrollReveal>

          </div>
        </div>
      </section>
    </>
  )
}