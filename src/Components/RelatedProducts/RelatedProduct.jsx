import React, { useEffect, useState } from 'react'
import './RelatedProduct.css'
import Item from '../Item/Item'
import axios from 'axios'
import Shimer from '../Shimerload/Shimer'
const RelatedProduct = () => {
const [produt, setproduct] = useState([])
const [loading, setloading] = useState(false)
  useEffect(()=>{
    const fetchProduct = async ()=>{
      try {
        setloading(true)
        const aldatata = await axios.get("https://btcbackend-e7yt.onrender.com/drugs")
        setproduct(aldatata.data)
      } catch (error) {
        console.log(error);
        
      }finally{
        setloading(false)
      }
    }
    fetchProduct()
  }, [])
  return (
    <>
    <div className='RelatedProduct'>
      <h1>Related products</h1>
      <hr />
     {loading ? <Shimer/> : <div className="relatedproduct-item"   onClick={window.scrollTo(0,0)} >
{produt.slice(0,4).map((item,i)=>{
   return <Item  key={i} id={item._id} name={item.Name} image ={item.Picture} new_price={item.SalePrice}/> 
       
})}
      </div>}
    </div>
    </>
  )
}

export default RelatedProduct
