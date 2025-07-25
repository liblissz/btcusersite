import React, { useEffect, useRef, useState } from 'react';
import './CSS/Loginsignup.css';
import axios from 'axios';
import Item from '../Components/Item/Item';
import Shimer from '../Components/Shimerload/Shimer';
import { SearchIcon } from 'lucide-react';

const LoginSignup = () => {

  const [product, setproduct] = useState([])
  const [loading, setloading] = useState(false)

  useEffect(()=>{
 const fetchall = async ()=>{
  try {
    
  setloading(true)
        const alldrugs = axios.get("https://btcbackend-e7yt.onrender.com/drugs");
        setproduct((await alldrugs).data);
  } catch (error) {
    console.log(error);
    
  }finally{
    setloading(false)
  }
 }

 fetchall();
  }, [])

   const [searchitem, setseach] = useState("")
  return (
   <>
     <div className='loginsignup'>

<div className='loginsignup-fields '>
<input type="text"  placeholder='place your search....' value={searchitem} onChange={(e)=> setseach(e.target.value)}/>
</div>

    { loading ? <Shimer/> :
     <div className="shopcategory-products">
  { product
 .filter((product) =>
    product.Name.toLowerCase().includes(searchitem.toLowerCase())
  )
  .map((item, i) => (
    <Item
           key={i}
      id={item._id}
   name={item.Name}
      image={item.Picture}
      new_price={item.CostPrice}
    />
  ))
      }
      </div>
      }
    </div>

   </>   
  );
};

export default LoginSignup;
