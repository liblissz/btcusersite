import React, { useEffect, useState } from 'react';
import './NewCollection.css';
import Item from '../Item/Item';
import axios from 'axios';
import toast from 'react-hot-toast';
import Shimer from '../Shimerload/Shimer'
const NewCollection = () => {
  const [new_collection, setnew_collection] = useState([]);
 const [loading, setloading] = useState(false)
  useEffect(() => {
    const fetchinfo = async()=>{
      try {
        setloading(true)
             const dataall = await axios.get("https://btcbackend-e7yt.onrender.com/drugs")
      setnew_collection(dataall.data)
      } catch (error) {
        toast.error(error)
      }finally{
        setloading(false)
      }
 
    }
    fetchinfo();
  }, []);

  return (
    <>
   {loading? <Shimer/> : (<div className="new-collection">
      <h1>NEW COLLECTION</h1>
      <hr />
      <div className="collections">
        {new_collection.length === 0 ? (
          <p>Loading or no new collection available.</p>
        ) : (
          new_collection.slice(4, 12).map((item, i) => (
            <Item
              key={item._id || i}
              id={item._id}
              name={item.Name}
              image={item.Picture}
              new_price={item.SalePrice}
          
            />
          ))
        )}
      </div>
    </div>)}
    </>
  );
};

export default NewCollection;
