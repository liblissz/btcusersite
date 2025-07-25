import React, { useState,useEffect } from 'react'
import './Populate.css'
import Shimer from '../Shimerload/Shimer'
import Item from '../Item/Item'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'
const Populate = () => {
  const [popular, setpopular] = useState([])
  const [loading, setloading] = useState(false)
 useEffect(() => {
const fetchproduct = async()=>{
  try{
    setloading(true)
  const dataall = await axios.get("https://btcbackend-e7yt.onrender.com/drugs")
  setpopular(dataall.data)
  }catch(err){
    toast.error(err);
  }finally{
    setloading(false)
  }


}
  fetchproduct();
   }, []);
  return (
    <>
   {loading? <Shimer/> :  
    (<div className='popular'>
       <Toaster position="top-right" />
      <h1>POPULAR Medicines</h1>
      <hr />
      <div className="popular-item">
        {popular.slice(0,4).map((item,i)=>{
            return <Item key={i} id={item._id} name={item.Name} image ={item.Picture} new_price={item.SalePrice}/> 
       
       })}
      </div>
    </div>)
    
    }
    </>
  )
}

export default Populate
