import { useState } from 'react'

export default function ProductGallery({ images, name }) {
  const [active, setActive] = useState(0)

  if (images.length === 0) {
    return (
      <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-primary-700 to-primary-900 flex items-center justify-center">
        <svg className="w-16 h-16 text-white/15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
        </svg>
      </div>
    )
  }

  return (
    <div className="flex flex-col-reverse sm:flex-row gap-4">
      {images.length > 1 && (
        <div className="flex sm:flex-col gap-2.5 overflow-x-auto sm:overflow-y-auto sm:max-h-[28rem] flex-shrink-0" style={{ scrollbarWidth: 'none' }}>
          {images.map((url, i) => (
            <button
              key={url}
              onClick={() => setActive(i)}
              onMouseEnter={() => setActive(i)}
              aria-label={`Show image ${i + 1} of ${images.length}`}
              className={`flex-shrink-0 w-16 h-16 sm:w-[4.5rem] sm:h-[4.5rem] rounded-lg overflow-hidden border-2 bg-white transition-colors duration-150 ${
                active === i ? 'border-accent-500' : 'border-steel-200 hover:border-steel-300'
              }`}
            >
              <img src={url} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}

      <div className="flex-1 min-w-0 aspect-[4/3] rounded-2xl border border-steel-200 bg-white overflow-hidden flex items-center justify-center">
        <img
          src={images[active]}
          alt={name}
          className="max-w-full max-h-full object-contain"
        />
      </div>
    </div>
  )
}
