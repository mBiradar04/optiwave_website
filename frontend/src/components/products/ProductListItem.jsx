import { Link } from 'react-router-dom'

const GRADIENTS = [
  'from-primary-700 to-primary-900',
  'from-primary-800 to-[#0A1628]',
  'from-[#1B2E4B] to-primary-900',
  'from-primary-700 to-[#162840]',
]

export default function ProductListItem({ product, index = 0 }) {
  const gradient = GRADIENTS[index % GRADIENTS.length]
  const rawImage = product.image_urls?.[0]
  const image    = rawImage && (rawImage.startsWith('/') ? `${import.meta.env.BASE_URL}${rawImage.slice(1)}` : rawImage)

  return (
    <Link
      to={`/products/${product.id}`}
      className="group flex flex-col sm:flex-row bg-white rounded-2xl overflow-hidden border border-steel-200 hover:border-steel-300 hover:shadow-xl transition-all duration-200"
    >
      {/* Image */}
      <div className="sm:w-64 lg:w-80 flex-shrink-0 aspect-[16/10] sm:aspect-auto sm:min-h-[12rem] relative overflow-hidden">
        {image ? (
          <img
            src={image}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className={`absolute inset-0 bg-gradient-to-br ${gradient} flex items-center justify-center`}>
            <svg className="w-12 h-12 text-white/20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
            </svg>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 lg:p-7 flex flex-col flex-1 min-w-0">
        <span className="text-accent-600 text-xs font-bold tracking-[0.12em] uppercase mb-2">
          {product.product_type?.name}
        </span>
        <h3 className="font-bold text-primary-800 text-lg lg:text-xl mb-2 group-hover:text-accent-600 transition-colors">
          {product.name}
        </h3>
        <p className="text-steel-500 text-sm leading-relaxed line-clamp-3 max-w-3xl flex-1 mb-4">
          {product.description || 'View product details and specifications.'}
        </p>
        <div className="flex items-center gap-1 text-accent-600 text-sm font-semibold">
          View details
          <svg
            className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200"
            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </div>
    </Link>
  )
}
