import React, { useContext, useEffect, useState } from 'react'
import './CSS/ShopCtegory.css'
import { ShopContext } from '../Context/ShopContext'
import dropdown_icon from '../Components/assets/Frontend_Assets/dropdown_icon.png'
import Item from '../Components/Item/Item'
import axios from 'axios'
import Shimer from '../Components/Shimerload/Shimer'
const Shopcategory = (props) => {
  // const {all_product} = useContext(ShopContext)
  const [all_product, setproduct] = useState([]);
  const [loading, setloading] = useState(false)

  useEffect(() => {
    const fetchall = async () => {
      try {
        setloading(true)
        const alldrugs = axios.get("https://btcbackend-e7yt.onrender.com/drugs");
        setproduct((await alldrugs).data);
      } catch (error) {
        console.log(error);

      } finally {
        setloading(false)
      }

    }
    fetchall();
  }, [])
  let productsToDisplay = [];

if (props.category === "First") {
  productsToDisplay = all_product.slice(0,8).map((item, i) => (
    <Item
      key={i}
      id={item._id}
      name={item.Name}
      image={item.Picture}
      new_price={item.CostPrice}
      // old_price={item.old_price}
    />
  ));
} else if (props.category === "Second") {
  productsToDisplay = all_product.slice(8, 16).map((item, i) => (
    <Item
      key={i}
      id={item._id}
   name={item.Name}
      image={item.Picture}
      new_price={item.CostPrice}
    />
  ));
} 
else if (props.category === "Third") {
  productsToDisplay = all_product.slice(16, all_product.length).map((item, i) => (
    <Item
           key={i}
      id={item._id}
   name={item.Name}
      image={item.Picture}
      new_price={item.CostPrice}
    />
  ));
}

  return (
    <div className='shop-category'>
      <img className='shop-category-banner' src={props.banner} alt="" />
      <div className="shopcategory-indexsort">
        <p>
          <span>showing 1-12</span> out of 36 products
        </p>
        <div className="shopcategory-sort">
          sort by <img src={dropdown_icon} alt="" />
        </div>
      </div>
    { loading ? <Shimer/> :
     <div className="shopcategory-products">
   {productsToDisplay}
      
      </div>
      }
      <div className="shop-category-loadmore">
        explore more
      </div>
    </div>
  )
}

export default Shopcategory
