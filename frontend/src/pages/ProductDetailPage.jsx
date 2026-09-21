import { Link, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import api from '../api/axios'
import ProductGallery from '../components/products/ProductGallery'
import ProductSpecs   from '../components/products/ProductSpecs'
import EnquiryForm    from '../components/products/EnquiryForm'

function Breadcrumb({ name }) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center flex-wrap gap-2 text-xs text-steel-400 mb-8">
      <Link to="/" className="hover:text-primary-800 transition-colors">Home</Link>
      <span>/</span>
      <Link to="/products" className="hover:text-primary-800 transition-colors">Products</Link>
      {name && (
        <>
          <span>/</span>
          <span className="text-steel-500">{name}</span>
        </>
      )}
    </nav>
  )
}

function DetailSkeleton() {
  return (
    <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 animate-pulse">
      <div className="aspect-[4/3] rounded-2xl bg-steel-200" />
      <div>
        <div className="h-3 bg-steel-100 rounded mb-4 w-1/5" />
        <div className="h-8 bg-steel-200 rounded mb-6 w-3/4" />
        <div className="h-3 bg-steel-100 rounded mb-2" />
        <div className="h-3 bg-steel-100 rounded mb-2" />
        <div className="h-3 bg-steel-100 rounded w-2/3" />
      </div>
    </div>
  )
}

export default function ProductDetailPage() {
  const { id } = useParams()

  const { data: product, isLoading, isError, error } = useQuery({
    queryKey:  ['product', id],
    queryFn:   () => api.get(`/products/${id}/`).then(r => r.data),
    staleTime: 1000 * 60 * 5,
    retry:     (count, err) => err?.response?.status !== 404 && count < 2,
  })

  const notFound = isError && error?.response?.status === 404

  if (isError) {
    return (
      <section className="pt-28 lg:pt-36 pb-24 bg-white min-h-[60vh]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb />
          <div className="text-center py-16">
            <h1 className="text-2xl font-bold text-primary-800 mb-2">
              {notFound ? 'Product not found' : 'Unable to load this product'}
            </h1>
            <p className="text-steel-500 mb-6">
              {notFound
                ? 'This product may have been removed or the link is incorrect.'
                : 'Please try again in a moment.'}
            </p>
            <Link to="/products" className="inline-block text-accent-600 font-semibold hover:underline">
              ← Back to all products
            </Link>
          </div>
        </div>
      </section>
    )
  }

  const images = (product?.image_urls ?? []).map((url) =>
    url.startsWith('/') ? `${import.meta.env.BASE_URL}${url.slice(1)}` : url
  )

  const hasSpecs = Object.keys(product?.specifications ?? {}).length > 0

  const scrollToEnquiry = () =>
    document.getElementById('enquiry')?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  return (
    <>
      {/* Top: gallery + summary */}
      <section className="pt-28 lg:pt-36 pb-12 lg:pb-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb name={product?.name} />

          {isLoading ? (
            <DetailSkeleton />
          ) : (
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-start">
              <ProductGallery key={product.id} images={images} name={product.name} />

              <div>
                <span className="inline-block bg-accent-500 text-primary-900 text-xs font-bold px-2.5 py-1 rounded mb-4">
                  {product.product_type?.name}
                </span>
                <h1 className="text-3xl lg:text-4xl font-bold text-primary-800 leading-tight mb-5">
                  {product.name}
                </h1>

                {product.description && (
                  <div className="border-t border-steel-200 pt-5 mb-6">
                    <h2 className="text-sm font-bold text-primary-800 mb-2">About this product</h2>
                    <p className="text-steel-600 leading-relaxed">{product.description}</p>
                  </div>
                )}

                <div className="bg-steel-100 border border-steel-200 rounded-2xl p-5">
                  <p className="font-bold text-primary-800 mb-1">Request pricing &amp; availability</p>
                  <p className="text-steel-500 text-sm leading-relaxed mb-4">
                    Tell us your requirements and our team will respond with pricing,
                    lead times, and technical details.
                  </p>
                  <button
                    onClick={scrollToEnquiry}
                    className="inline-flex items-center gap-2 bg-accent-500 hover:bg-accent-400 text-primary-900 font-bold text-sm px-6 py-3 rounded-lg transition-all duration-200 hover:scale-105 active:scale-95"
                  >
                    Send an enquiry
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Bottom: specifications + enquiry */}
      {product && (
        <section className="py-12 lg:py-16 bg-steel-100 border-t border-steel-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-3 gap-10 items-start">
              {hasSpecs && (
                <div className="lg:col-span-2">
                  <ProductSpecs specs={product.specifications} />
                </div>
              )}
              <div
                id="enquiry"
                className={`scroll-mt-28 ${hasSpecs ? 'lg:sticky lg:top-28 lg:col-start-3 lg:row-start-1' : 'lg:col-span-3 max-w-xl mx-auto w-full'}`}
              >
                <EnquiryForm key={product.id} product={product} />
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  )
}
