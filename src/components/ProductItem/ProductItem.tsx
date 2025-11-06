import { useNavigate } from 'react-router-dom'
import { AiOutlineLike, AiFillLike } from 'react-icons/ai'
import { TiDeleteOutline } from 'react-icons/ti'
import './ProductItem.css'
import type { Artwork } from '../../features/products/types'

interface ProductItemProps {
  art: Artwork
  onToggleLike: (id: number) => void
  onDelete: (id: number) => void
}

const ProductItem = ({ art, onToggleLike, onDelete }: ProductItemProps) => {
  const navigate = useNavigate()

  return (
    <li className="products__item products-item">
      <div
        className="products-item__content"
        onClick={() => navigate(`/product/${art.id}`, { state: { art } })}
      >
        <div className="products-item__picture">
          {art.thumbnail && (
            <img
              src={art.thumbnail}
              alt={art.alt_text || 'picture'}
              className="products-item__picture-img"
            />
          )}
        </div>

        <div className="products-item__info">
          <h3 className="products-item__info-title">{art.title}</h3>
          <p className="products-item__info-descr">
            {art.short_description || 'No description'}
          </p>
        </div>
      </div>

      {/* Button's Like (favorites) and Delete */}
      <div
        className="products-item__btn-group"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="products-item__btn btn-like btn-reset"
          type="button"
          onClick={() => onToggleLike(art.id)}
        >
          {art.liked ? (
            <AiFillLike className="products-item__btn-icon--like filled" />
          ) : (
            <AiOutlineLike className="products-item__btn-icon--like" />
          )}
        </button>

        <button
          className="products-item__btn btn-delete btn-reset"
          type="button"
          onClick={() => onDelete(art.id)}
        >
          <TiDeleteOutline className="products-item__btn-icon--delete" />
        </button>
      </div>
    </li>
  )
}

export default ProductItem
