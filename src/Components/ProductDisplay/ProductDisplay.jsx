import React, { useState } from 'react'
import './ProductDisplay.css'
import star_icon from '../assets/Frontend_Assets/star_icon.png'
import stardull_icon from '../assets/Frontend_Assets/star_dull_icon.png'
// remove ShopContext entirely
// import { ShopContext } from '../../Context/ShopContext'
import { addToCart as apiAddToCart } from '../../Pages/api'

const ProductDisplay = (props) => {
  const { product } = props
  const [adding, setAdding] = useState(false)

  const handleAdd = async () => {
    if (adding) return                // prevent double clicks
    setAdding(true)
    try {
      await apiAddToCart(product._id, 1)
      alert('✅ Added to cart')
        window.scrollTo(0,0)
    } catch (err) {
      console.error(err)
      alert('❌ Could not add to cart')
    } finally {
      setAdding(false)
    }
  }

  return (
    <div className='productdisplay'>
      <div className='productdisplay-left'>
        <div className='productdisplay-img-list'>
          <img src={product.Picture} alt={product.Name} />
          <img src={product.Picture} alt={product.Name} />
          <img src={product.Picture} alt={product.Name} />
          <img src={product.Picture} alt={product.Name} />
        </div>
        <div className="productdisplay-img">
          <img
            className='productdisplay-main-image'
            src={product.Picture}
            alt={product.Name}
          />
        </div>
      </div>

      <div className='productdisplay-right'>
        <h1>{product.Name}</h1>

        <div className="productdisplay-right-star">
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={stardull_icon} alt="" />
          <p>(122)</p>
        </div>

        <div className="productdisplay-right-prices">
          <div className="productdisplay-right-prices-new">
            {product.SalePrice} frs
          </div>
        </div>

        <div className="productdisplay-right-size">
          <h1>
            The Batch Number Is:{' '}
            <span className="productdisplay-right-prices-new">
              {product.BarcodeNumber}
            </span>
          </h1>
          <div className="productdisplay-right-sizes">
            <div>Take</div>
            <div>Your</div>
            <div>Health</div>
            <div>Serious</div>
          </div>
        </div>

        <button onClick={handleAdd} disabled={adding}>
          {adding ? 'Adding…' : 'ADD TO CART'}
        </button>

        <p className="productdisplay-right-category">
          This Drug Is Of Category:{' '}
          <span className="productdisplay-right-prices-new">
            {product.Category}
          </span>
        </p>
        <p className="productdisplay-right-category">
          <span>Tags : </span> Cameroon, HEALTHCARE
        </p>
      </div>
    </div>
  )
}

export default ProductDisplay
