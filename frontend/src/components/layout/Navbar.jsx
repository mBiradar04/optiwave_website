import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const NAV_LINKS = [
  { to: '/',         label: 'Home' },
  { to: '/about',    label: 'About' },
  { to: '/products', label: 'Products' },
  { to: '/career',   label: 'Career' },
  { to: '/news',     label: 'News' },
  { to: '/gallery',  label: 'Gallery' },
]

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50"
        animate={{
          backgroundColor:'#0D1F35',
          boxShadow: '0 1px 24px rgba(0,0,0,0.35)',
        }}
        transition={{ duration: 0.35, ease: 'easeInOut' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">

            {/* Logo */}
            <Link to="/" className="flex items-center flex-shrink-0">
              <img
                src={`${import.meta.env.BASE_URL}images/logos/logo.jpeg`}
                alt="Clear Communication Systems Ltd."
                className="h-10 lg:h-12 w-auto"
                style={{ mixBlendMode: 'screen' }}
              />
            </Link>

            {/* Desktop nav links */}
            <nav className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) =>
                    `px-4 py-2 rounded text-sm font-medium transition-colors duration-200 ${
                      isActive
                        ? 'text-accent-400'
                        : 'text-white/70 hover:text-white hover:bg-white/10'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden lg:block">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-accent-500 hover:bg-accent-400 text-primary-900 font-semibold text-sm px-5 py-2.5 rounded transition-all duration-200 hover:scale-105 active:scale-95"
              >
                Contact Us
              </Link>
            </div>

            {/* Mobile hamburger */}
            <button
              className="lg:hidden text-white p-2 rounded hover:bg-white/10 transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            >
              <motion.div animate={menuOpen ? 'open' : 'closed'} className="w-6 h-5 flex flex-col justify-between">
                <motion.span
                  variants={{ closed: { rotate: 0, y: 0 }, open: { rotate: 45, y: 8 } }}
                  className="block h-0.5 w-full bg-white rounded origin-left transition-all"
                />
                <motion.span
                  variants={{ closed: { opacity: 1 }, open: { opacity: 0 } }}
                  className="block h-0.5 w-full bg-white rounded"
                />
                <motion.span
                  variants={{ closed: { rotate: 0, y: 0 }, open: { rotate: -45, y: -8 } }}
                  className="block h-0.5 w-full bg-white rounded origin-left"
                />
              </motion.div>
            </button>

          </div>
        </div>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/60 z-40 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              className="fixed top-0 right-0 h-full w-72 bg-primary-800 z-50 lg:hidden flex flex-col pt-20 pb-8 px-6 shadow-2xl"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              <nav className="flex flex-col gap-1">
                {NAV_LINKS.map((link, i) => (
                  <motion.div
                    key={link.to}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                  >
                    <NavLink
                      to={link.to}
                      end={link.to === '/'}
                      onClick={() => setMenuOpen(false)}
                      className={({ isActive }) =>
                        `block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                          isActive
                            ? 'bg-accent-500/20 text-accent-400'
                            : 'text-white/80 hover:bg-white/10 hover:text-white'
                        }`
                      }
                    >
                      {link.label}
                    </NavLink>
                  </motion.div>
                ))}
              </nav>
              <div className="mt-auto">
                <Link
                  to="/contact"
                  onClick={() => setMenuOpen(false)}
                  className="block text-center bg-accent-500 hover:bg-accent-400 text-primary-900 font-semibold text-sm px-5 py-3 rounded-lg transition-colors"
                >
                  Contact Us
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}