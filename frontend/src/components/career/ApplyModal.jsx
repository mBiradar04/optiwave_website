import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useMutation } from '@tanstack/react-query'
import api from '../../api/axios'
import { Field, inputCls } from '../ui/FormField'

const schema = z.object({
  name:          z.string().min(2, 'Name must be at least 2 characters'),
  email:         z.string().email('Please enter a valid email address'),
  phone:         z.string().optional().or(z.literal('')),
  portfolio_url: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
  message:       z.string().optional().or(z.literal('')),
})

export default function ApplyModal({ position, onClose }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) })

  const mutation = useMutation({
    mutationFn: (data) => api.post('/job-applications/', { ...data, position }),
  })

  // Reset form state each time a new position is opened
  useEffect(() => {
    reset()
    mutation.reset()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [position])

  // Lock body scroll while open
  useEffect(() => {
    document.body.style.overflow = position ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [position])

  // Close on Escape key
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  return (
    <AnimatePresence>
      {position && (
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
            className="fixed right-0 top-0 h-full w-full sm:w-[520px] bg-white z-50 shadow-2xl flex flex-col"
          >
            {/* Sticky drawer header */}
            <div className="flex-shrink-0 bg-white/95 backdrop-blur-sm border-b border-steel-100 px-6 py-4 flex items-center justify-between">
              <span className="text-xs font-bold text-accent-600 tracking-[0.12em] uppercase">
                Apply
              </span>
              <button
                onClick={onClose}
                aria-label="Close application form"
                className="p-2 rounded-lg text-steel-400 hover:text-primary-800 hover:bg-steel-100 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Scrollable body */}
            <div className="flex-1 overflow-y-auto px-6 py-6">

              <h2 className="text-xl font-bold text-primary-800 leading-snug mb-1">
                {position}
              </h2>

              {mutation.isSuccess ? (
                <div className="text-center py-10">
                  <div className="w-14 h-14 rounded-full bg-green-50 text-green-600 flex items-center justify-center mx-auto mb-4">
                    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-primary-800 mb-2">Application received</h3>
                  <p className="text-steel-500 text-sm mb-6">
                    Thanks for applying — our team will review your application and reach out
                    if there's a fit.
                  </p>
                  <button
                    onClick={onClose}
                    className="inline-flex items-center gap-2 bg-accent-500 hover:bg-accent-400 text-primary-900 font-bold text-sm px-5 py-2.5 rounded-lg transition-all duration-200 hover:scale-105 active:scale-95"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <>
                  <p className="text-steel-500 text-sm leading-relaxed mb-6">
                    Fill in your details below and our team will get back to you.
                  </p>

                  <form onSubmit={handleSubmit((data) => mutation.mutate(data))} noValidate className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-4">
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
                          placeholder="you@example.com"
                          className={inputCls(!!errors.email)}
                        />
                      </Field>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <Field label="Phone" error={errors.phone?.message}>
                        <input
                          {...register('phone')}
                          type="tel"
                          placeholder="+91 00000 00000"
                          className={inputCls(!!errors.phone)}
                        />
                      </Field>
                      <Field label="LinkedIn / Portfolio" error={errors.portfolio_url?.message}>
                        <input
                          {...register('portfolio_url')}
                          type="url"
                          placeholder="https://linkedin.com/in/..."
                          className={inputCls(!!errors.portfolio_url)}
                        />
                      </Field>
                    </div>

                    <Field label="Cover note" error={errors.message?.message}>
                      <textarea
                        {...register('message')}
                        rows={6}
                        placeholder="Tell us about your relevant experience and why you're interested in this role..."
                        className={inputCls(!!errors.message)}
                        style={{ resize: 'vertical', minHeight: '140px' }}
                      />
                    </Field>

                    {mutation.isError && (
                      <p className="text-red-500 text-sm flex items-center gap-1.5">
                        <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        Something went wrong submitting your application. Please try again.
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={mutation.isPending}
                      className="w-full bg-accent-500 hover:bg-accent-400 disabled:opacity-60 disabled:cursor-not-allowed text-primary-900 font-bold text-sm px-6 py-3.5 rounded-lg transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2"
                    >
                      {mutation.isPending ? (
                        'Submitting...'
                      ) : (
                        <>
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                          </svg>
                          Submit Application
                        </>
                      )}
                    </button>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
