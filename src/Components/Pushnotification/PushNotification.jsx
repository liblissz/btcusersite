import React, { useState } from 'react'
import upload from '../../assets/Admin_Assets/upload_area.svg';
const PushNotification = () => {
    const [title, settitle] = useState('')
    const [content, setcontent] = useState('')
    const [price, setprice] = useState('')

    const [image, setimage] = useState(null)

    const imageHandler = ()=>{

    }
    const [loading, setloading] = useState(false)
    const add_product = ()=>{

    }


    

   return (
     <div className='addproducts'>
       <div className="addproducts-item">
         <div className="addproduct-itemfield">
           <p>Product Title</p>
           <input value={content} onChange={(e)=> setcontent(e.target.value)} type="text" name="name" placeholder='Type Here' />
         </div>
       </div>
 
       <div className="addproducts-price">
         <div className="addproduct-itemfield">
           <p>Price</p>
           <input value={title} onChange={(e)=> settitle(e.target.value)} type="text" name="old_price" placeholder='Type Here' />
         </div>
         <div className="addproduct-itemfield">
           <p>Offer Price</p>
           <input value={price} onChange={(e)=> setprice(e.target.value)} type="text" name="new_price" placeholder='Type Here' />
         </div>
       </div>
 
       <div className="addproduct-itemfield">
         {/* <p>Product Category</p>
         <select value={productDetails.category} onChange={changeHandler} name="category" className='addproduct-selector'>
           <option value="">Select</option>
           <option value="men">Men</option>
           <option value="kid">Kid</option>
           <option value="women">Women</option>
         </select> */}
       </div>
 
       <div className="addproduct-itemfield">
         <label htmlFor="file-input">
           <img src={image ? URL.createObjectURL(image) : upload} alt="upload" className='addproduct-thumbnail-image' />
         </label>
         <input onChange={imageHandler} type="file" name='image' id='file-input' hidden />
       </div>
 
       <button  className='addproduct-btn' disabled={loading}>
         {loading ? "Processing..." : "Add"}
       </button>
     </div>
   );
}

export default PushNotification
