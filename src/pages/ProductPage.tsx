import { useEffect } from 'react'
import { useLocation, useParams, Link, useNavigate } from 'react-router-dom'
import { AiOutlineLike, AiFillLike } from 'react-icons/ai'
import { TiDeleteOutline } from 'react-icons/ti'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import {
  toggleLike,
  deleteProduct,
  fetchProducts,
} from '../features/products/ProductsSlice'
import type { Artwork } from '../features/products/types'
import './ProductPage.css'

const ProductPage = () => {
  const { id } = useParams<{ id: string }>()
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const { items } = useAppSelector((state) => state.products)

  // GET number ID //
  const numericId = Number(id)

  useEffect(() => {
    if (items.length === 0) {
      dispatch(fetchProducts())
    }
  }, [dispatch, items.length])

  // GET actual object Redux //
  const artFromRedux = items.find((item) => item.id === numericId)
  const artFromState = (location.state as { art?: Artwork } | null)?.art ?? null

  const art = artFromRedux || artFromState

  if (!art) {
    return (
      <main className="main">
        <div className="container">
          <p>Product not found.</p>
          <Link to="/products" className="btn btn-back">
            Back to list
          </Link>
        </div>
      </main>
    )
  }

  const handleLike = () => dispatch(toggleLike(art.id))
  const handleDelete = () => {
    dispatch(deleteProduct(art.id))
    navigate('/products')
  }

  return (
    <main className="main">
      <div className="product-page container">
        <div className="product-page__content product-page-content">
          <div className="product-page-content__picture">
            {art.thumbnail ? (
              <img
                className="product-page-content__picture-img"
                src={art.thumbnail}
                alt={art.alt_text || 'picture'}
              />
            ) : (
              <div />
            )}
          </div>

          <div className="product-page-content__info">
            <h2 className="product-page-content__info-title">{art.title}</h2>
            <p className="product-page-content__info-descr">
              {art.short_description ?? "Don't have information"}
            </p>
            {art.artist_display && (
              <p className="product-page-content__info-descr">
                <strong>Artist:</strong> {art.artist_display}
              </p>
            )}
            {art.date_display && (
              <p className="product-page-content__info-descr">
                <strong>Date:</strong> {art.date_display}
              </p>
            )}
            <div className="product-page-content__btn-group">
              <button
                className="product-page-content__btn btn-like btn-reset"
                type="button"
                onClick={handleLike}
              >
                {art.liked ? (
                  <AiFillLike className="products-item__btn-icon--like filled" />
                ) : (
                  <AiOutlineLike className="products-item__btn-icon--like" />
                )}
              </button>

              <button
                className="product-page-content__btn btn-delete btn-reset"
                type="button"
                onClick={handleDelete}
              >
                <TiDeleteOutline className="products-item__btn-icon--delete" />
              </button>
            </div>
            <Link to="/products" className="product-page-content__btn btn-back">
              Go homepage
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}

export default ProductPage
