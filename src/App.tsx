import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import ProductPage from './pages/ProductPage'
import CreateProductPage from './pages/CreateProductPage'

function App() {
  return (
    <BrowserRouter basename="/art-gallery">
      <Routes>
        <Route index path="/" element={<HomePage />} />
        <Route path="/products" element={<HomePage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/create-product" element={<CreateProductPage />} />
        <Route
          path="*"
          element={
            <h1 style={{ paddingTop: '50px', textAlign: 'center' }}>
              Not Found Page
            </h1>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
