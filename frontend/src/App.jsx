import { Routes, Route, Link } from 'react-router-dom'
import PageLayout from './components/layout/PageLayout'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ProductsPage from './pages/ProductsPage'
import CareerPage from './pages/CareerPage'
import NewsPage from './pages/NewsPage'
import GalleryPage from './pages/GalleryPage'
import ContactPage from './pages/ContactPage'

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-primary-900">404</h1>
        <p className="mt-4 text-gray-500">Page not found</p>
        <Link to="/" className="mt-6 inline-block text-accent-500 hover:underline">
          Back to home
        </Link>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <Routes>
      <Route element={<PageLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/career" element={<CareerPage />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}