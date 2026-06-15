export default function Badge({ children, className = '' }) {
  return (
    <span className={`inline-block px-3 py-0.5 rounded-full text-xs font-medium bg-accent-50 text-accent-700 border border-accent-200 ${className}`}>
      {children}
    </span>
  )
}