import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

// Replace with the actual company email address before going live
const COMPANY_EMAIL = 'info@clearcommunicationsystems.com'

const schema = z.object({
  name:    z.string().min(2, 'Name must be at least 2 characters'),
  email:   z.string().email('Please enter a valid email address'),
  phone:   z.string().optional().or(z.literal('')),
  company: z.string().optional().or(z.literal('')),
  subject: z.string().min(3, 'Subject is required'),
  message: z.string().min(10, 'Please write at least 10 characters'),
})

function buildMailto(data) {
  const subject = encodeURIComponent(data.subject)
  const body = encodeURIComponent(
    [
      `Name:    ${data.name}`,
      `Email:   ${data.email}`,
      `Phone:   ${data.phone    || '—'}`,
      `Company: ${data.company  || '—'}`,
      '',
      'Message:',
      data.message,
    ].join('\n')
  )
  return `mailto:${COMPANY_EMAIL}?subject=${subject}&body=${body}`
}

function Field({ label, error, children }) {
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

function inputCls(hasError) {
  return [
    'block w-full px-4 py-2.5 text-sm rounded-lg border outline-none',
    'transition-all duration-200 text-primary-800 placeholder:text-steel-300',
    'focus:ring-2',
    hasError
      ? 'border-red-300 bg-red-50 focus:border-red-400 focus:ring-red-200/50'
      : 'border-steel-200 bg-white hover:border-steel-300 focus:border-accent-500 focus:ring-accent-500/20',
  ].join(' ')
}

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) })

  const onSubmit = (data) => {
    window.location.href = buildMailto(data)
  }

  return (
    <div className="bg-white rounded-2xl border border-steel-200 p-7">
      <h3 className="text-lg font-bold text-primary-800 mb-2">Send us a message</h3>
      <p className="text-steel-400 text-sm mb-6">
        Fill in the details below — clicking the button will open your email client
        with everything pre-filled and ready to send.
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

        <button
          type="submit"
          className="w-full bg-accent-500 hover:bg-accent-400 text-primary-900 font-bold text-sm px-6 py-3.5 rounded-lg transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
          </svg>
          Open in Email Client
        </button>

      </form>
    </div>
  )
}