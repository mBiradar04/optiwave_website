import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useMutation } from '@tanstack/react-query'
import api from '../../api/axios'
import { Field, inputCls } from '../ui/FormField'

const schema = z.object({
  name:    z.string().min(2, 'Name must be at least 2 characters'),
  email:   z.string().email('Please enter a valid email address'),
  phone:   z.string().optional().or(z.literal('')),
  company: z.string().optional().or(z.literal('')),
  subject: z.string().min(3, 'Subject is required'),
  message: z.string().min(10, 'Please write at least 10 characters'),
})

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) })

  const mutation = useMutation({
    mutationFn: (data) => api.post('/contact-messages/', data),
  })

  const onSubmit = (data) => {
    mutation.mutate(data)
  }

  if (mutation.isSuccess) {
    return (
      <div className="bg-white rounded-2xl border border-steel-200 p-7 text-center">
        <div className="w-12 h-12 rounded-full bg-green-50 text-green-600 flex items-center justify-center mx-auto mb-4">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <h3 className="text-lg font-bold text-primary-800 mb-2">Message sent</h3>
        <p className="text-steel-500 text-sm mb-6">
          Thanks for reaching out — our team will get back to you shortly.
        </p>
        <button
          onClick={() => { mutation.reset(); reset() }}
          className="text-sm font-semibold text-accent-600 hover:text-accent-700 transition-colors"
        >
          Send another message
        </button>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl border border-steel-200 p-7">
      <h3 className="text-lg font-bold text-primary-800 mb-2">Send us a message</h3>
      <p className="text-steel-400 text-sm mb-6">
        Fill in the details below and our team will get back to you as soon as possible.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">

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
              placeholder="you@company.com"
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
          <Field label="Company / Organisation" error={errors.company?.message}>
            <input
              {...register('company')}
              type="text"
              placeholder="Your organisation"
              className={inputCls(!!errors.company)}
            />
          </Field>
        </div>

        <Field label="Subject *" error={errors.subject?.message}>
          <input
            {...register('subject')}
            type="text"
            placeholder="How can we help?"
            className={inputCls(!!errors.subject)}
          />
        </Field>

        <Field label="Message *" error={errors.message?.message}>
          <textarea
            {...register('message')}
            rows={5}
            placeholder="Describe your requirements or question in detail..."
            className={inputCls(!!errors.message)}
            style={{ resize: 'vertical', minHeight: '120px' }}
          />
        </Field>

        {mutation.isError && (
          <p className="text-red-500 text-sm flex items-center gap-1.5">
            <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            Something went wrong sending your message. Please try again.
          </p>
        )}

        <button
          type="submit"
          disabled={mutation.isPending}
          className="w-full bg-accent-500 hover:bg-accent-400 disabled:opacity-60 disabled:cursor-not-allowed text-primary-900 font-bold text-sm px-6 py-3.5 rounded-lg transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2"
        >
          {mutation.isPending ? (
            'Sending...'
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
              Send Message
            </>
          )}
        </button>

      </form>
    </div>
  )
}
