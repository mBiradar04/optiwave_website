import { motion } from 'framer-motion'

export default function CategoryTabs({ types, activeType, onSelect }) {
  const tabs = [{ id: null, name: 'All Products' }, ...types]

  return (
    <div className="sticky top-16 lg:top-20 z-40 bg-white border-b border-steel-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
          {tabs.map((tab) => (
            <button
              key={tab.id ?? 'all'}
              onClick={() => onSelect(tab.id)}
              className={`relative flex-shrink-0 py-4 px-5 text-sm font-medium transition-colors duration-200 ${
                activeType === tab.id
                  ? 'text-primary-800'
                  : 'text-steel-500 hover:text-primary-700'
              }`}
            >
              {tab.name}
              {activeType === tab.id && (
                <motion.div
                  layoutId="product-tab-indicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent-500"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}