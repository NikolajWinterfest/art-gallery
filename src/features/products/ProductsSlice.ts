import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { Artwork } from './types'

export interface ProductsState {
  items: Artwork[]
  isLoading: boolean
  error: string | null
}

// ------------------ LocalStorage ------------------ //
const LOCAL_STORAGE_KEY = 'products'

const loadFromLocalStorage = (): Artwork[] => {
  try {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY)
    return data ? JSON.parse(data) : []
  } catch {
    return []
  }
}

const saveToLocalStorage = (items: Artwork[]) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items))
}

// ------------------ Initial State ------------------ //
const initialState: ProductsState = {
  items: loadFromLocalStorage(),
  isLoading: false,
  error: null,
}

// ------------------ Async thunk ------------------ //
export const fetchProducts = createAsyncThunk('products/fetchAll', async () => {
  const response = await fetch('https://api.artic.edu/api/v1/artworks?limit=50')
  const json = await response.json()

  const formatted: Artwork[] = json.data.map((item: any) => ({
    id: item.id,
    title: item.title ?? 'No title',
    short_description: item.thumbnail?.alt_text ?? '',
    thumbnail: item.image_id
      ? `https://www.artic.edu/iiif/2/${item.image_id}/full/843,/0/default.jpg`
      : null,
    liked: false,
    artist_display: item.artist_display ?? '',
    date_display: item.date_display ?? '',
  }))
  return formatted
})

// ------------------ Slice ------------------ //
const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    toggleLike: (state, action: PayloadAction<number>) => {
      const product = state.items.find((p) => p.id === action.payload)
      if (product) product.liked = !product.liked
      saveToLocalStorage(state.items)
    },
    deleteProduct: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((p) => p.id !== action.payload)
      saveToLocalStorage(state.items)
    },
    addProduct: (state, action: PayloadAction<Artwork>) => {
      state.items.unshift(action.payload)
      saveToLocalStorage(state.items)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false
        if (state.items.length === 0) {
          state.items = action.payload
          saveToLocalStorage(state.items)
        }
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message ?? 'Failed to load products'
      })
  },
})

export const { toggleLike, deleteProduct, addProduct } = productsSlice.actions

export default productsSlice.reducer
