// All gallery content in one place.
// To add a photo — add an object to this array.
// Set image to '/images/gallery/filename.jpg' once real photos are available.
// Drop files into public/images/gallery/.
// category must be one of: 'events' | 'products' | 'facilities' | 'team'

export const GALLERY_CATEGORIES = [
  { id: 'all',        label: 'All'         },
  { id: 'events',     label: 'Events'      },
  { id: 'products',   label: 'Products'    },
  { id: 'facilities', label: 'Facilities'  },
  { id: 'team',       label: 'Team'        },
]

export const PHOTOS = [
  // Events
  { id:  1, category: 'events',     caption: 'DefExpo 2025 — Hall 4, Booth B22',                        image: null },
  { id:  2, category: 'events',     caption: 'Technology Showcase, Bangalore — March 2025',              image: null },
  { id:  3, category: 'events',     caption: 'Annual Dealer & Partner Meet — Udupi, December 2024',      image: null },
  { id:  4, category: 'events',     caption: 'Government contract signing ceremony — April 2025',        image: null },

  // Products
  { id:  5, category: 'products',   caption: 'WT-X Series — Walkie Talkie field deployment',            image: null },
  { id:  6, category: 'products',   caption: 'WT-X Series — IP67 waterproofing test',                   image: null },
  { id:  7, category: 'products',   caption: 'PCB assembly — production line',                          image: null },
  { id:  8, category: 'products',   caption: 'Quality inspection — finished units',                     image: null },

  // Facilities
  { id:  9, category: 'facilities', caption: 'Manufacturing floor — Udupi facility',                    image: null },
  { id: 10, category: 'facilities', caption: 'RF & communication test lab',                             image: null },
  { id: 11, category: 'facilities', caption: 'Firmware engineering division',                           image: null },
  { id: 12, category: 'facilities', caption: 'Warehouse and dispatch centre',                           image: null },

  // Team
  { id: 13, category: 'team',       caption: 'Leadership team — annual strategy meet',                  image: null },
  { id: 14, category: 'team',       caption: 'Engineering team — product launch celebration',           image: null },
  { id: 15, category: 'team',       caption: 'Field deployment team — state police handover',           image: null },
]