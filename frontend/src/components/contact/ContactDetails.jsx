const OFFICE_ADDRESS = 'Plot No 70, Road No 9, IDA, Mallapur, Hyderabad, Telangana 500076'
const MAPS_LINK = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(OFFICE_ADDRESS)}`

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
    href:  MAPS_LINK,
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 6.75z" />
      </svg>
    ),
    label: 'Phone',
    value: '+91 40 2717 8649',
    href:  'tel:+914027178649',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
      </svg>
    ),
    label: 'Mobile',
    value: '+91 99639 98505',
    href:  'tel:+919963998505',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
    label: 'Email',
    value: 'info@optiwavephotonics.com',
    href:  'mailto:info@optiwavephotonics.com',
  },
]

const HOURS = [
  { day: 'Monday – Friday', time: '9:00 AM – 6:00 PM' },
  { day: 'Saturday',        time: '9:00 AM – 1:00 PM' },
  { day: 'Sunday',          time: 'Closed'             },
]

const MAP_EMBED_SRC = `https://www.google.com/maps?q=${encodeURIComponent(OFFICE_ADDRESS)}&output=embed`

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
                  target={d.href.startsWith('http') ? '_blank' : undefined}
                  rel={d.href.startsWith('http') ? 'noopener noreferrer' : undefined}
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
      <div className="bg-white rounded-2xl border border-steel-200 overflow-hidden">
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
        <a
          href={MAPS_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 text-sm text-primary-800 font-medium hover:text-accent-600 transition-colors py-3 border-t border-steel-200"
        >
          Open in Google Maps
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
          </svg>
        </a>
      </div>

    </div>
  )
}