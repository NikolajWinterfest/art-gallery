import { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import {
  fetchProducts,
  toggleLike,
  deleteProduct,
} from '../features/products/ProductsSlice'
import ProductList from '../components/ProductList/ProductList'
import './HomePage.css'
import { Link } from 'react-router-dom'

const HomePage = () => {
  const dispatch = useAppDispatch()
  const { items, isLoading, error } = useAppSelector((state) => state.products)

  const [filter, setFilter] = useState<'all' | 'liked'>('all')

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  const filteredItems =
    filter === 'all' ? items : items.filter((item) => item.liked)

  return (
    <main className="main">
      <h1 className="head-title">Art works</h1>
      <div className="filter-products">
        <button
          className="filter-products__btn btn-all btn-reset"
          onClick={() => setFilter('all')}
          style={{
            marginRight: '10px',
            color: filter === 'all' ? '#c01b1b' : 'inherit',
          }}
        >
          All cards
        </button>
        <button
          className="filter-products__btn btn-favorites btn-reset"
          onClick={() => setFilter('liked')}
          style={{ color: filter === 'liked' ? '#c01b1b' : 'inherit' }}
        >
          Favorites
        </button>
      </div>
      <div className="create-product">
        <Link to="/create-product" className="create-product__btn btn-create">
          Create card
        </Link>
      </div>
      <ProductList
        data={filteredItems}
        isLoading={isLoading}
        error={error}
        onToggleLike={(id) => dispatch(toggleLike(id))}
        onDelete={(id) => dispatch(deleteProduct(id))}
      />
    </main>
  )
}

export default HomePage
