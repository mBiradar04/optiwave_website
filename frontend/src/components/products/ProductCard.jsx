import { motion } from 'framer-motion'

const GRADIENTS = [
  'from-primary-700 to-primary-900',
  'from-primary-800 to-[#0A1628]',
  'from-[#1B2E4B] to-primary-900',
  'from-primary-700 to-[#162840]',
]

export default function ProductCard({ product, index = 0, onClick }) {
  const gradient = GRADIENTS[index % GRADIENTS.length]
  const image    = product.image_urls?.[0]

  return (
    <motion.div
      layout
      whileHover={{ y: -6, boxShadow: '0 20px 60px rgba(13,31,53,0.15)' }}
      transition={{ duration: 0.22 }}
      onClick={onClick}
      className="bg-white rounded-2xl overflow-hidden border border-steel-200 group cursor-pointer flex flex-col"
    >
      {/* Image area */}
      <div className="aspect-[16/10] overflow-hidden relative">
        {image ? (
          <img
            src={image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className={`w-full h-full bg-gradient-to-br ${gradient} flex items-center justify-center`}>
            <svg className="w-12 h-12 text-white/20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
            </svg>
          </div>
        )}
        {/* Category badge */}
        <div className="absolute top-3 left-3">
          <span className="bg-accent-500 text-primary-900 text-xs font-bold px-2.5 py-1 rounded">
            {product.product_type?.name}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-bold text-primary-800 text-base mb-2 group-hover:text-accent-600 transition-colors">
          {product.name}
        </h3>
        <p className="text-steel-500 text-sm leading-relaxed line-clamp-2 flex-1 mb-4">
          {product.description || 'Click to view product details and specifications.'}
        </p>
        <div className="flex items-center gap-1 text-accent-600 text-xs font-semibold">
          View details
          <svg
            className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200"
            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </div>
    </motion.div>
  )
}