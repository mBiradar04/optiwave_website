import { motion, AnimatePresence } from 'framer-motion'
import ProductListItem from './ProductListItem'

const container = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.07 } },
}
const item = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}

function SkeletonRow() {
  return (
    <div className="flex flex-col sm:flex-row bg-white rounded-2xl overflow-hidden border border-steel-200 animate-pulse">
      <div className="sm:w-64 lg:w-80 aspect-[16/10] sm:aspect-auto sm:min-h-[12rem] bg-steel-200" />
      <div className="p-5 lg:p-7 flex-1">
        <div className="h-3 bg-steel-100 rounded mb-3 w-1/6" />
        <div className="h-5 bg-steel-200 rounded mb-3 w-1/2" />
        <div className="h-3 bg-steel-100 rounded mb-2" />
        <div className="h-3 bg-steel-100 rounded w-5/6" />
      </div>
    </div>
  )
}

export default function ProductList({ products, isLoading, activeType }) {
  if (isLoading) {
    return (
      <section className="py-12 lg:py-16 bg-steel-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-5">
          {Array(3).fill(null).map((_, i) => <SkeletonRow key={i} />)}
        </div>
      </section>
    )
  }

  if (products.length === 0) {
    return (
      <section className="py-24 bg-steel-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <svg className="w-14 h-14 mx-auto text-steel-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
          <p className="text-steel-500 font-medium">No products in this category yet.</p>
          <p className="text-steel-400 text-sm mt-1">Products added via the admin panel will appear here.</p>
        </div>
      </section>
    )
  }

  return (
    <section className="py-12 lg:py-16 bg-steel-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeType ?? 'all'}
            variants={container}
            initial="hidden"
            animate="show"
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
            className="flex flex-col gap-5"
          >
            {products.map((product, i) => (
              <motion.div key={product.id} variants={item}>
                <ProductListItem product={product} index={i} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
