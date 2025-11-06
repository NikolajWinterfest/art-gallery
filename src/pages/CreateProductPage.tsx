import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../app/hooks'
import { addProduct } from '../features/products/ProductsSlice'
import type { Artwork } from '../features/products/types'
import './CreateProductPage.css'

type FormData = {
  title: string
  short_description: string
  thumbnail: string
  artist_display: string
  date_display: string
  alt_text: string
}

const CreateProductPage = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()

  const onSubmit = (data: FormData) => {
    const newProduct: Artwork = {
      id: Date.now(),
      title: data.title,
      short_description: data.short_description,
      thumbnail: data.thumbnail,
      alt_text: data.alt_text,
      liked: false,
      artist_display: data.artist_display,
      date_display: data.date_display,
    }

    dispatch(addProduct(newProduct))
    navigate('/products')
  }

  return (
    <main className="main">
      <div className="create-card container">
        <div className="create-card__wrapper">
          <h2 className="create-card__title">Create card</h2>
          <form
            className="create-card__form form-card"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="form-card__inputfield-block inputfield-title">
              <label>Title:</label>
              <input
                {...register('title', { required: true })}
                placeholder="Title"
              />
              {errors.title && <p>Important field</p>}
            </div>

            <div className="form-card__inputfield-block">
              <label>Description:</label>
              <input
                {...register('short_description', { required: true })}
                placeholder="Description"
              />
              {errors.short_description && <p>Important field</p>}
            </div>

            <div className="form-card__inputfield-block">
              <label>URL Link:</label>
              <input
                {...register('thumbnail', { required: true })}
                placeholder="URL link"
              />
              {errors.thumbnail && <p>Important field</p>}
            </div>

            <div className="form-card__inputfield-block">
              <label>Artist:</label>
              <input
                {...register('artist_display', { required: true })}
                placeholder="Artist name"
              />
              {errors.artist_display && <p>Important field</p>}
            </div>

            <div className="form-card__inputfield-block">
              <label>Date:</label>
              <input
                type="number"
                {...register('date_display', { required: true })}
                placeholder="Date"
              />
              {errors.date_display && <p>Important field</p>}
            </div>

            <button
              style={{ marginBottom: '15px' }}
              className="form-card__btn btn-reset btn-create"
              type="submit"
            >
              Create
            </button>
            <button
              className="form-card__btn btn-reset btn-create"
              type="reset"
            >
              Reset
            </button>
          </form>
          <Link to="/products" className="product-page-content__btn btn-back">
            Go homepage
          </Link>
        </div>
      </div>
    </main>
  )
}

export default CreateProductPage
