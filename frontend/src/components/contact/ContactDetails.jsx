// ── Replace all placeholder values below with real client details ─────────────
const DETAILS = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
      </svg>
    ),
    label: 'Head office',
    value: 'Plot No 70, Road No 9, IDA, Mallapur, Hyderabad, Telangana 500 076',
    href:  null,
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 6.75z" />
      </svg>
    ),
    label: 'Phone',
    // TODO: Replace with real phone number when provided by client
    value: '+91 40 1234 5678',
    href:  'tel:+914012345678',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
    label: 'Email',
    // TODO: Replace with real email when provided by client
    value: 'info@clearcommunicationsystems.com',
    href:  'mailto:info@clearcommunicationsystems.com',
  },
]

const HOURS = [
  { day: 'Monday – Friday', time: '9:00 AM – 6:00 PM' },
  { day: 'Saturday',        time: '9:00 AM – 1:00 PM' },
  { day: 'Sunday',          time: 'Closed'             },
]

// To get the real Google Maps embed URL:
// 1. Go to maps.google.com and search the company address
// 2. Click Share → Embed a map → copy the src URL from the iframe snippet
// 3. Replace the string below with the copied URL
const MAP_EMBED_SRC =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1000!2d74.74!3d13.33!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTPCsDE5JzQ4LjAiTiA3NMKwNDQnMjQuMCJF!5e0!3m2!1sen!2sin!4v1000000000000!5m2!1sen!2sin'

export default function ContactDetails() {
  return (
    <div className="space-y-6">

      {/* Contact info */}
      <div className="bg-white rounded-2xl border border-steel-200 p-6 space-y-5">
        {DETAILS.map((d) => (
          <div key={d.label} className="flex gap-4 items-start">
            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary-50 text-primary-700 flex items-center justify-center">
              {d.icon}
            </div>
            <div>
              <div className="text-xs font-semibold text-steel-400 uppercase tracking-wider mb-0.5">
                {d.label}
              </div>
              {d.href ? (
                <a
                  href={d.href}
                  className="text-sm text-primary-800 font-medium hover:text-accent-600 transition-colors"
                >
                  {d.value}
                </a>
              ) : (
                <p className="text-sm text-primary-800 font-medium leading-snug">{d.value}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Business hours */}
      <div className="bg-white rounded-2xl border border-steel-200 p-6">
        <h4 className="text-xs font-bold tracking-widest uppercase text-steel-400 mb-4">
          Business hours
        </h4>
        <div className="space-y-2.5">
          {HOURS.map(({ day, time }) => (
            <div key={day} className="flex justify-between items-center text-sm">
              <span className="text-steel-600">{day}</span>
              <span className={`font-medium ${time === 'Closed' ? 'text-steel-300' : 'text-primary-800'}`}>
                {time}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Map */}
      <div className="rounded-2xl overflow-hidden border border-steel-200">
        <iframe
          src={MAP_EMBED_SRC}
          width="100%"
          height="220"
          style={{ border: 0, display: 'block' }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Office location map"
        />
      </div>

    </div>
  )
}