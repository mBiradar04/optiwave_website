import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import api from '../api/axios'
import ProductsHero  from '../components/products/ProductsHero'
import CategoryTabs  from '../components/products/CategoryTabs'
import ProductGrid   from '../components/products/ProductGrid'
import ProductModal  from '../components/products/ProductModal'

export default function ProductsPage() {
  const [activeType,       setActiveType]       = useState(null) // null = All
  const [selectedProduct,  setSelectedProduct]  = useState(null)

  // Fetch product type list for category tabs
  const { data: typesData } = useQuery({
    queryKey:  ['product-types'],
    queryFn:   () => api.get('/product-types/').then(r => r.data),
    staleTime: 1000 * 60 * 10,
  })

  // Fetch products — re-runs whenever activeType changes
  const { data: productsData, isLoading } = useQuery({
    queryKey: ['products', activeType],
    queryFn:  () => {
      const params = { is_active: true }
      if (activeType !== null) params.product_type = activeType
      return api.get('/products/', { params }).then(r => r.data)
    },
    staleTime: 1000 * 60 * 5,
  })

  const types    = typesData?.results   ?? typesData   ?? []
  const products = productsData?.results ?? productsData ?? []

  return (
    <>
      <ProductsHero />
      <CategoryTabs
        types={types}
        activeType={activeType}
        onSelect={setActiveType}
      />
      <ProductGrid
        products={products}
        isLoading={isLoading}
        activeType={activeType}
        onCardClick={setSelectedProduct}
      />
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </>
  )
}