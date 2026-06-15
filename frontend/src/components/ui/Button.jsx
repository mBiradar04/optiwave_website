// TODO: Full variants in Phase 2 — Design system
export default function Button({ children, variant = 'primary', className = '', ...props }) {
  const base = 'inline-flex items-center justify-center px-5 py-2.5 rounded font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2'
  const variants = {
    primary: 'bg-primary-900 text-white hover:bg-primary-800 focus:ring-primary-700',
    outline: 'border border-primary-900 text-primary-900 hover:bg-primary-50 focus:ring-primary-700',
    ghost:   'text-primary-900 hover:bg-primary-50 focus:ring-primary-700',
  }
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  )
}