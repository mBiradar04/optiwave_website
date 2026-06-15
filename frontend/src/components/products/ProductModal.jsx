import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

function buildMailto(product) {
  const subject = encodeURIComponent(`Product Inquiry: ${product.name}`)
  const body = encodeURIComponent(
    [
      'Hello,',
      '',
      'I am interested in the following product:',
      '',
      `Product: ${product.name}`,
      `Category: ${product.product_type?.name ?? ''}`,
      '',
      'Please share more information, pricing, and availability.',
      '',
      'Name:',
      'Company:',
      'Phone:',
      'Email:',
    ].join('\n')
  )
  // Replace with the actual company email address
  return `mailto:info@defencecompany.com?subject=${subject}&body=${body}`
}

export default function ProductModal({ product, onClose }) {
  const [activeImage, setActiveImage] = useState(0)

  // Reset image index when a new product is opened
  useEffect(() => { setActiveImage(0) }, [product?.id])

  // Lock body scroll while drawer is open
  useEffect(() => {
    document.body.style.overflow = product ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [product])

  // Close on Escape key
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  const images  = product?.image_urls ?? []
  const specs   = product?.specifications ?? {}
  const hasSpecs = Object.keys(specs).length > 0

  return (
    <AnimatePresence>
      {product && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Drawer — slides in from the right */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="fixed right-0 top-0 h-full w-full sm:w-[580px] bg-white z-50 shadow-2xl flex flex-col"
          >

            {/* Sticky drawer header */}
            <div className="flex-shrink-0 bg-white/95 backdrop-blur-sm border-b border-steel-100 px-6 py-4 flex items-center justify-between">
              <span className="text-xs font-bold text-accent-600 tracking-[0.12em] uppercase">
                {product.product_type?.name}
              </span>
              <button
                onClick={onClose}
                aria-label="Close product detail"
                className="p-2 rounded-lg text-steel-400 hover:text-primary-800 hover:bg-steel-100 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Scrollable body */}
            <div className="flex-1 overflow-y-auto">

              {/* Image / gallery */}
              {images.length > 0 ? (
                <div className="bg-steel-50">
                  <div className="aspect-[16/9] overflow-hidden">
                    <motion.img
                      key={activeImage}
                      src={images[activeImage]}
                      alt={product.name}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {images.length > 1 && (
                    <div className="flex gap-2 p-3 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
                      {images.map((url, i) => (
                        <button
                          key={i}
                          onClick={() => setActiveImage(i)}
                          className={`flex-shrink-0 w-16 h-11 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                            activeImage === i
                              ? 'border-accent-500 opacity-100'
                              : 'border-transparent opacity-40 hover:opacity-70'
                          }`}
                        >
                          <img src={url} alt="" className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="aspect-[16/9] bg-gradient-to-br from-primary-700 to-primary-900 flex items-center justify-center">
                  <svg className="w-16 h-16 text-white/15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                  </svg>
                </div>
              )}

              {/* Product info */}
              <div className="px-6 py-6 space-y-6">

                {/* Name */}
                <h2 className="text-2xl font-bold text-primary-800 leading-snug">
                  {product.name}
                </h2>

                {/* Description */}
                {product.description && (
                  <div>
                    <p className="text-xs font-bold tracking-widest uppercase text-steel-400 mb-2">
                      Description
                    </p>
                    <p className="text-steel-600 text-sm leading-relaxed">
                      {product.description}
                    </p>
                  </div>
                )}

                {/* Specifications table */}
                {hasSpecs && (
                  <div>
                    <p className="text-xs font-bold tracking-widest uppercase text-steel-400 mb-3">
                      Specifications
                    </p>
                    <div className="border border-steel-200 rounded-xl overflow-hidden">
                      <table className="w-full text-sm">
                        <tbody>
                          {Object.entries(specs).map(([key, value], i) => (
                            <tr
                              key={key}
                              className={i % 2 === 0 ? 'bg-white' : 'bg-steel-50'}
                            >
                              <td className="py-3 px-4 font-medium text-primary-800 w-2/5 border-r border-steel-100 align-top">
                                {key}
                              </td>
                              <td className="py-3 px-4 text-steel-600 align-top">
                                {String(value)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Inquiry CTA */}
                <div className="bg-primary-50 border border-primary-100 rounded-xl p-5">
                  <h4 className="font-bold text-primary-800 text-sm mb-1">
                    Interested in this product?
                  </h4>
                  <p className="text-steel-500 text-xs leading-relaxed mb-4">
                    Send us your requirements and our team will respond with
                    pricing and availability details.
                  </p>
                  <a
                    href={buildMailto(product)}
                    className="inline-flex items-center gap-2 bg-accent-500 hover:bg-accent-400 text-primary-900 font-bold text-sm px-5 py-2.5 rounded-lg transition-all duration-200 hover:scale-105 active:scale-95"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                    Send Product Inquiry
                  </a>
                </div>

              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}