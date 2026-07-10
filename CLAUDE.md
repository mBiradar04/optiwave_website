# CLAUDE.md — Project briefing for Claude Code

This file is read automatically by Claude Code on every session.
Do not delete this file.

---

## Project overview

**Client:** Clear Communication Systems Ltd. (CCSL)
**Formerly:** Optiwave Photonics Ltd.
**Tagline:** Advanced RF & Optical Innovations
**Core business:** RF over Fiber (RFoF) technology, photonics, and optical
communication systems for defence, telecom, and satellite applications.
**Key clients:** BEL, DRDO (LRDE, RCI, DLRL, ADRDE), ISRO, HAL
**Founded:** 2003, Hyderabad
**Address:** Plot No 70, Road No 9, IDA, Mallapur, Hyderabad, Telangana 500 076
**Employees:** 38

---

## Tech stack

| Layer      | Technology                                      |
|------------|-------------------------------------------------|
| Frontend   | React 18, Vite, Tailwind CSS, Framer Motion     |
| Backend    | Python 3.12, Django 5, Django REST Framework    |
| Database   | PostgreSQL 16                                   |
| Dev env    | Docker Compose (`docker-compose.dev.yml`)       |
| Animations | framer-motion, react-intersection-observer, react-countup |

---

## Repository structure (monorepo)

```
optiwave_website/
├── backend/
│   ├── apps/
│   │   ├── products/        ← complete (models, serializers, views, urls)
│   │   ├── about/           ← empty placeholder, not yet built
│   │   └── contact/         ← empty placeholder, not yet built
│   └── config/
│       └── settings/
│           ├── base.py
│           └── dev.py
├── frontend/
│   └── src/
│       ├── api/
│       │   └── axios.js     ← Axios instance, base URL = /api
│       ├── components/
│       │   ├── home/        ← HeroSection, StatsBar, WhoWeAreSection,
│       │   │                   VisionMissionSection, ExpertiseSection,
│       │   │                   ClientsSection
│       │   ├── about/       ← AboutHero, AboutSubNav, StrengthsSection,
│       │   │                   PartnersSection, TestimonialsSection,
│       │   │                   HistorySection
│       │   ├── products/    ← ProductsHero, CategoryTabs, ProductCard,
│       │   │                   ProductGrid, ProductModal
│       │   ├── career/      ← CareerHero, CultureSection, JobListings
│       │   ├── contact/     ← ContactHero, ContactForm, ContactDetails
│       │   ├── news/        ← NewsHero, NewsGrid
│       │   ├── gallery/     ← GalleryHero, GalleryGrid
│       │   ├── layout/      ← Navbar, Footer, PageLayout
│       │   └── ui/          ← ScrollReveal, Button, Badge, SectionHeading
│       ├── data/            ← ALL static content lives here
│       │   ├── aboutData.js    (STRENGTHS, PARTNERS, TESTIMONIALS, MILESTONES)
│       │   ├── careerData.js   (CAREERS_EMAIL, CULTURE, JOBS)
│       │   ├── newsEvents.js   (NEWS_EVENTS)
│       │   └── galleryData.js  (GALLERY_CATEGORIES, PHOTOS)
│       └── pages/
│           ├── HomePage.jsx
│           ├── AboutPage.jsx
│           ├── ProductsPage.jsx
│           ├── CareerPage.jsx
│           ├── NewsPage.jsx
│           ├── GalleryPage.jsx
│           └── ContactPage.jsx
├── nginx/
│   └── nginx.conf
└── docker-compose.dev.yml
```

---

## Design system

**Theme:** Steel and Brass
**Color tokens (defined in tailwind.config.js):**

| Token          | Value     | Usage                          |
|----------------|-----------|--------------------------------|
| primary-900    | #070F1A   | Darkest navy                   |
| primary-800    | #0D1F35   | Navbar, hero backgrounds       |
| primary-700    | #1B2E4B   | Section backgrounds            |
| accent-500     | #C9A84C   | Gold — CTAs, highlights, icons |
| accent-400     | #E9B02A   | Gold hover states              |
| steel-100      | #F0F4F8   | Light section backgrounds      |
| steel-200      | #E2E8F0   | Borders                        |
| steel-500      | #64748B   | Body text                      |

**Typography:** Inter (Google Fonts)
**Animation library:** Framer Motion
**Scroll animations:** `ScrollReveal` component at `src/components/ui/ScrollReveal.jsx`
  — wraps any element to fade+slide in when it enters the viewport
  — props: `delay`, `direction` (up/down/left/right)

---

## Pages and their data sources

| Page     | Data source                        | Backend API?      |
|----------|------------------------------------|-------------------|
| Home     | Hardcoded in components            | ClientsSection only (with fallback) |
| About    | `src/data/aboutData.js`            | No                |
| Products | Django Admin → PostgreSQL          | Yes — /api/products/, /api/product-types/ |
| Career   | `src/data/careerData.js`           | No                |
| News     | `src/data/newsEvents.js`           | No (intentionally static) |
| Gallery  | `src/data/galleryData.js`          | No                |
| Contact  | `src/components/contact/ContactDetails.jsx` | No — mailto only |

---

## Static content update rule

**To update any text content** — edit the relevant data file in `src/data/`.
Do not hardcode content inside components.
Components read from data files; they do not own their content.

---

## Backend — what is built

**`apps/products/` is complete:**
- `Product` model: name, slug, description, specifications (JSONField),
  image_urls (JSONField list), product_type (FK), is_active
- `ProductType` model: name, slug, order
- Full CRUD API: `GET /api/products/`, `GET /api/product-types/`
- Filtering by product_type, is_active, search, ordering
- Swagger docs at `http://localhost:8000/api/docs/`

**`apps/about/` and `apps/contact/` exist but are empty.**
About page is fully static. Contact uses mailto — no backend needed.

---

## Logo and images

**Logo files in `public/images/logos/`:**
- `logo.png` — main logo (used in navbar on dark background)
- `footer_logo.png` — footer variant
- `with_bg_logo.png` — logo with background (legacy, avoid)

**Navbar logo:** `src/components/layout/Navbar.jsx`
  — `src="/images/logos/logo.png"`, height `h-12 lg:h-14`

**Hero images:** `public/images/hero/` — hero-1.png through hero-4.png

**Image location rule:**
- Static UI images (logos, placeholders) → `public/` (served at `/`)
- Team photos, partner logos, gallery → `public/images/[category]/`
- Product images → stored as URLs in the database (image_urls JSONField)

---

## Running the project locally

```bash
# Start backend + database
docker compose -f docker-compose.dev.yml up

# Start frontend (separate terminal)
cd frontend
npm run dev
```

- Frontend: http://localhost:5173
- Django API: http://localhost:8000/api/
- Django Admin: http://localhost:8000/admin/
- Swagger docs: http://localhost:8000/api/docs/

---

## Placeholder data still needing real values

These are marked with `// TODO` comments in the codebase:

| Item              | File                                      | Current placeholder                      |
|-------------------|-------------------------------------------|------------------------------------------|
| Phone number      | `Footer.jsx`, `ContactDetails.jsx`        | +91 40 1234 5678                         |
| Email             | `Footer.jsx`, `ContactDetails.jsx`, `ContactForm.jsx` | info@clearcommunicationsystems.com |
| Careers email     | `careerData.js`                           | careers@clearcommunicationsystems.com    |
| Google Maps embed | `ContactDetails.jsx`                      | Approximate Mallapur coordinates         |
| Testimonials      | `aboutData.js`                            | Plausible placeholders, not real quotes  |

---

## Coding conventions

- **No new backend models without discussion** — the About and Contact apps
  are intentionally static; do not add models unless explicitly asked.
- **No file creation outside the existing structure** — new components go in
  the relevant `components/[page]/` folder.
- **Content changes go in data files** — never hardcode strings in JSX
  that belong in a data file.
- **Tailwind only** — no inline styles except for dynamic values
  (e.g. animation transforms).
- **ScrollReveal for scroll animations** — use the existing component,
  do not add new animation libraries.
- **Ask before touching** — `tailwind.config.js`, `vite.config.js`,
  `docker-compose.dev.yml`, `backend/config/settings/base.py`.
  These are config files that affect the whole project.

---

## Pages left to complete / known issues

- [ ] Products page: client has not yet added products via Django Admin —
      the page shows an empty state. This is expected until products are added.
- [ ] Contact: real phone, email, and Google Maps embed needed from client.
- [ ] Gallery: all photos are placeholder gradients — real photos pending from client.
- [ ] About testimonials: placeholder quotes — real client testimonials pending.
- [ ] GitHub Pages deployment: `vite.config.js` base path needs to be set to
      the repo name before running `npm run deploy`.

---

## Key decisions made during development

- **News/Events is static by choice** — not connected to backend.
  If dynamic updates are needed in future, add NewsEvent model to backend
  and replace `src/data/newsEvents.js` import with a useQuery call.
- **Contact form uses mailto** — no backend endpoint, no database storage.
  The form validates with Zod then fires `window.location.href = mailtoURL`.
- **Product inquiry also uses mailto** — `buildMailto()` in `ProductModal.jsx`.
- **About page is fully static** — no API calls anywhere in About components.
- **Gallery is fully static** — photos are added to `galleryData.js`.
