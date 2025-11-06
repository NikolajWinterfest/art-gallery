import ProductItem from '../ProductItem/ProductItem'
import type { Artwork } from '../../features/products/types'
import './ProductList.css'

interface ProductListProps {
  data: Artwork[]
  isLoading: boolean
  error: string | null
  onToggleLike: (id: number) => void
  onDelete: (id: number) => void
}

const ProductList = ({
  data,
  isLoading,
  error,
  onToggleLike,
  onDelete,
}: ProductListProps) => {
  if (error) return <div className="error">{error}</div>

  return (
    <div className="products__wrapper container">
      <div className="products__content">
        {isLoading ? (
          <div className="products__loading">Loading...</div>
        ) : (
          <ul className="products__list">
            {data.map((art) => (
              <ProductItem
                key={art.id}
                art={art}
                onToggleLike={onToggleLike}
                onDelete={onDelete}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default ProductList
