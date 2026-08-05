export function Field({ label, error, children }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-steel-600 mb-1.5">
        {label}
      </label>
      {children}
      {error && (
        <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
          <svg className="w-3 h-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
      )}
    </div>
  )
}

export function inputCls(hasError) {
  return [
    'block w-full px-4 py-2.5 text-sm rounded-lg border outline-none',
    'transition-all duration-200 text-primary-800 placeholder:text-steel-300',
    'focus:ring-2',
    hasError
      ? 'border-red-300 bg-red-50 focus:border-red-400 focus:ring-red-200/50'
      : 'border-steel-200 bg-white hover:border-steel-300 focus:border-accent-500 focus:ring-accent-500/20',
  ].join(' ')
}
