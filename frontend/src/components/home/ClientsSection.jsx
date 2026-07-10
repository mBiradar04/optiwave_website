import { useQuery } from '@tanstack/react-query'
import api from '../../api/axios'
import ScrollReveal from '../ui/ScrollReveal'

async function fetchClients() {
  const { data } = await api.get('/clients/')
  return data
}

// Shown when no clients are in the DB yet — replace with real logos once available
const FALLBACK_CLIENTS = [
  'BEL', 'DRDO — LRDE', 'DRDO — RCI', 'ISRO', 'HAL', 'DRDO — DLRL',
]

export default function ClientsSection() {
  const { data, isLoading } = useQuery({
    queryKey: ['clients'],
    queryFn: fetchClients,
    staleTime: 1000 * 60 * 10,
  })

  const clients = data?.results ?? data ?? []
  const hasClients = clients.length > 0

  return (
    <section className="py-16 bg-white border-t border-steel-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <ScrollReveal>
          <p className="text-center text-steel-400 text-sm font-medium tracking-widest uppercase">
            Trusted by organisations across India and beyond
          </p>
        </ScrollReveal>
      </div>

      {/* Marquee container */}
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <div className="flex animate-marquee gap-12 items-center whitespace-nowrap w-max">
          {/* Double the list for seamless loop */}
          {[...Array(2)].map((_, dupIdx) => (
            <div key={dupIdx} className="flex gap-12 items-center">
              {isLoading
                ? Array(6).fill(null).map((_, i) => (
                    <div key={i} className="w-32 h-10 bg-steel-100 rounded animate-pulse flex-shrink-0" />
                  ))
                : hasClients
                  ? clients.map((client) => (
                      <div
                        key={`${dupIdx}-${client.id}`}
                        className="flex-shrink-0 h-10 flex items-center"
                      >
                        {client.logo ? (
                          <img
                            src={client.logo}
                            alt={client.name}
                            className="h-8 w-auto object-contain opacity-50 hover:opacity-80 transition-opacity grayscale hover:grayscale-0"
                          />
                        ) : (
                          <span className="text-steel-400 font-semibold text-sm tracking-wide px-4">
                            {client.name}
                          </span>
                        )}
                      </div>
                    ))
                  : FALLBACK_CLIENTS.map((name) => (
                      <div key={`${dupIdx}-${name}`} className="flex-shrink-0">
                        <span className="text-steel-300 font-semibold text-sm tracking-wide px-4 py-2 border border-steel-200 rounded-lg">
                          {name}
                        </span>
                      </div>
                    ))
              }
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}