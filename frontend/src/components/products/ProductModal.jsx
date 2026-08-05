import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useMutation } from '@tanstack/react-query'
import api from '../../api/axios'
import { Field, inputCls } from '../ui/FormField'

const enquirySchema = z.object({
  name:    z.string().min(2, 'Name must be at least 2 characters'),
  email:   z.string().email('Please enter a valid email address'),
  phone:   z.string().optional().or(z.literal('')),
  company: z.string().optional().or(z.literal('')),
  message: z.string().optional().or(z.literal('')),
})

function EnquiryForm({ product }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(enquirySchema) })

  const mutation = useMutation({
    mutationFn: (data) => api.post('/product-enquiries/', { ...data, product: product.id }),
  })

  if (mutation.isSuccess) {
    return (
      <div className="bg-primary-50 border border-primary-100 rounded-xl p-5 text-center">
        <div className="w-10 h-10 rounded-full bg-green-50 text-green-600 flex items-center justify-center mx-auto mb-3">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <h4 className="font-bold text-primary-800 text-sm mb-1">Enquiry sent</h4>
        <p className="text-steel-500 text-xs leading-relaxed mb-3">
          Thanks — our team will respond with pricing and availability shortly.
        </p>
        <button
          onClick={() => { mutation.reset(); reset() }}
          className="text-xs font-semibold text-accent-600 hover:text-accent-700 transition-colors"
        >
          Send another enquiry
        </button>
      </div>
    )
  }

  return (
    <div className="bg-primary-50 border border-primary-100 rounded-xl p-6">
      <h4 className="font-bold text-primary-800 text-sm mb-1">
        Interested in this product?
      </h4>
      <p className="text-steel-500 text-xs leading-relaxed mb-5">
        Send us your requirements and our team will respond with
        pricing and availability details.
      </p>

      <form onSubmit={handleSubmit((data) => mutation.mutate(data))} noValidate className="space-y-4">
        <Field label="Full name *" error={errors.name?.message}>
          <input
            {...register('name')}
            type="text"
            placeholder="Your name"
            className={inputCls(!!errors.name)}
          />
        </Field>
        <Field label="Email address *" error={errors.email?.message}>
          <input
            {...register('email')}
            type="email"
            placeholder="you@company.com"
            className={inputCls(!!errors.email)}
          />
        </Field>
        <Field label="Phone" error={errors.phone?.message}>
          <input
            {...register('phone')}
            type="tel"
            placeholder="+91 00000 00000"
            className={inputCls(!!errors.phone)}
          />
        </Field>
        <Field label="Company / Organisation" error={errors.company?.message}>
          <input
            {...register('company')}
            type="text"
            placeholder="Your organisation"
            className={inputCls(!!errors.company)}
          />
        </Field>
        <Field label="Message" error={errors.message?.message}>
          <textarea
            {...register('message')}
            rows={3}
            placeholder="Any specific requirements, quantities, or questions..."
            className={inputCls(!!errors.message)}
            style={{ resize: 'vertical', minHeight: '70px' }}
          />
        </Field>

        {mutation.isError && (
          <p className="text-red-500 text-xs flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            Something went wrong sending your enquiry. Please try again.
          </p>
        )}

        <button
          type="submit"
          disabled={mutation.isPending}
          className="inline-flex items-center gap-2 bg-accent-500 hover:bg-accent-400 disabled:opacity-60 disabled:cursor-not-allowed text-primary-900 font-bold text-sm px-5 py-2.5 rounded-lg transition-all duration-200 hover:scale-105 active:scale-95"
        >
          {mutation.isPending ? (
            'Sending...'
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
              Send Product Inquiry
            </>
          )}
        </button>
      </form>
    </div>
  )
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

  const images = (product?.image_urls ?? []).map((url) =>
    url.startsWith('/') ? `${import.meta.env.BASE_URL}${url.slice(1)}` : url
  )
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
            className="fixed right-0 top-0 h-full w-full lg:w-[min(1500px,95vw)] bg-white z-50 shadow-2xl flex flex-col"
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

            {/* Body — two sections: image/details, then the enquiry form */}
            <div className="flex-1 overflow-hidden flex flex-col lg:flex-row">

              {/* Section 1 — image + product details */}
              <div className="lg:w-[65%] overflow-y-auto border-b lg:border-b-0 lg:border-r border-steel-100">

                {/* Image / gallery */}
                <div className="p-6 pb-0">
                  {images.length > 0 ? (
                    <div className="bg-steel-50 rounded-xl overflow-hidden">
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
                    <div className="aspect-[16/9] rounded-xl bg-gradient-to-br from-primary-700 to-primary-900 flex items-center justify-center">
                      <svg className="w-16 h-16 text-white/15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                      </svg>
                    </div>
                  )}
                </div>

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

                </div>
              </div>

              {/* Section 2 — product enquiry form */}
              <div className="lg:w-[35%] overflow-y-auto px-8 py-8 bg-steel-50/50">
                <EnquiryForm key={product.id} product={product} />
              </div>

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}