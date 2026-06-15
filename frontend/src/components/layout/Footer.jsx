import { Link } from 'react-router-dom'

const QUICK_LINKS = [
  { to: '/about',    label: 'About Us' },
  { to: '/products', label: 'Products' },
  { to: '/career',   label: 'Career' },
  { to: '/news',     label: 'News & Events' },
  { to: '/gallery',  label: 'Gallery' },
  { to: '/contact',  label: 'Contact Us' },
]

const PRODUCTS = [
  { to: '/products', label: 'Walkie Talkies' },
  { to: '/products', label: 'Defence Systems' },
  { to: '/products', label: 'Commercial Products' },
  { to: '/products', label: 'Hardware' },
  { to: '/products', label: 'Software' },
  { to: '/products', label: 'Firmware' },
]

export default function Footer() {
  return (
    <footer className="bg-primary-900 text-white">

      {/* Main footer grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">

          {/* Brand column */}
          <div className="lg:col-span-1">
            <div className="mb-5">
              <img
                src="/images/logos/logo.jpeg"
                alt="Clear Communication Systems Ltd."
                className="h-10 w-auto"
                style={{ mixBlendMode: 'screen' }}
              />
            </div>
            <p className="text-white/50 text-sm leading-relaxed mb-6">
              Precision-engineered defence and communication systems. Trusted by governments
              and organisations across 15 countries since 2000.
            </p>
            {/* Company details */}
            <div className="space-y-2 text-sm text-white/45">
              <div className="flex items-start gap-2">
                <svg className="w-4 h-4 mt-0.5 text-accent-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                {/* Replace with actual address */}
                <span>123 Defence Road, Udupi, Karnataka 576101</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-accent-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 6.75z" />
                </svg>
                {/* Replace with actual phone */}
                <span>+91 820 123 4567</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-accent-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                {/* Replace with actual email */}
                <span>info@defencecompany.com</span>
              </div>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-sm font-bold tracking-widest uppercase text-white/80 mb-5">Quick Links</h4>
            <ul className="space-y-2.5">
              {QUICK_LINKS.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-white/45 hover:text-accent-400 text-sm transition-colors duration-200 flex items-center gap-1.5 group"
                  >
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity">›</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-sm font-bold tracking-widest uppercase text-white/80 mb-5">Products</h4>
            <ul className="space-y-2.5">
              {PRODUCTS.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-white/45 hover:text-accent-400 text-sm transition-colors duration-200 flex items-center gap-1.5 group"
                  >
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity">›</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Working hours + CTA */}
          <div>
            <h4 className="text-sm font-bold tracking-widest uppercase text-white/80 mb-5">Business Hours</h4>
            <div className="space-y-2 text-sm text-white/45 mb-8">
              <div className="flex justify-between">
                <span>Monday – Friday</span>
                <span className="text-white/65">9:00 – 18:00</span>
              </div>
              <div className="flex justify-between">
                <span>Saturday</span>
                <span className="text-white/65">9:00 – 13:00</span>
              </div>
              <div className="flex justify-between">
                <span>Sunday</span>
                <span className="text-white/35">Closed</span>
              </div>
            </div>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-accent-500 hover:bg-accent-400 text-primary-900 font-bold text-sm px-5 py-3 rounded-lg transition-all duration-200 hover:scale-105 active:scale-95"
            >
              Get in Touch
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/30 text-xs">
            © {new Date().getFullYear()} Defence Company. All rights reserved.
          </p>
          <div className="flex gap-6">
            {['Privacy Policy', 'Terms of Use'].map((item) => (
              <Link
                key={item}
                to="/contact"
                className="text-white/30 hover:text-white/60 text-xs transition-colors"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>

    </footer>
  )
}