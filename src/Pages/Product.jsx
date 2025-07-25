
import React, { useEffect, useState } from 'react'
import { ShopContext } from '../Context/ShopContext'; 
import { useParams } from 'react-router-dom'
import BreadCrums from '../Components/BreadCrums/BreadCrums'
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay';
import Description from '../Components/DescriptionBox/Description';
import RelatedProduct from '../Components/RelatedProducts/RelatedProduct';
import axios from 'axios';

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
console.log("Product ID from params:", id);

  // const { addToCart } = useContext(ShopContext);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`https://btcbackend-e7yt.onrender.com/drugs/${id}`);
        setProduct(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProduct();
  }, [id]);
  // const {productId} = useParams()
  // const product = all_product.find((e)=> e.id === Number(productId))
  return (
    <div>
      <BreadCrums product = {product}/>
      <ProductDisplay product = {product} />
      <Description/>
      <RelatedProduct/>
    </div>
  )
}

export default Product

