import React, { useContext, useEffect, useRef, useState } from 'react'
import './Navbar.css'
import logo from '../assets/Frontend_Assets/logo.png'
import cart_icon from '../assets/Frontend_Assets/cart_icon.png'
import { Link } from 'react-router-dom'
import { ShopContext } from '../../Context/ShopContext'
import nav_dropdown from '../assets/Frontend_Assets/nav_dropdown.png'
import { Search } from 'lucide-react';
import { fetchCart } from '../../Pages/api';

const Navbar = () => {
    const [menu, setmenu] = useState("shop")
    const {getTotalCartItem} = useContext(ShopContext)
    const menuRef = useRef()
const dropdown_toggle = (e) =>{
menuRef.current.classList.toggle("nav-visible-menu")
e.target.classList.toggle("open")
}
const [all, setall] = useState([])

useEffect(()=>{
 setInterval(()=>{
fetchCart().then((res)=> setall(res.data))
 }, 1000)
   return clearInterval()
},[])
  return (
    <div className='Navbar'>
<div className="nav-logo">
    <img src={logo} alt="" />
    <p>BTC PHARMACY</p>
</div>
<img className='nav-dropdown' onClick={dropdown_toggle} src={nav_dropdown} alt="" />
<ul ref={menuRef} className="nav-menu">
<li onClick={()=>{setmenu("shop")}}> <Link  className='li'  style={{textDecoration: "none"}} to='/'>shop</Link> {menu === "shop"? <hr/>: ""}</li>
    <li onClick={()=>{setmenu("First")}}><Link  className='li' style={{textDecoration: "none"}} to='/First'>First</Link> {menu === "First"? <hr/>: ""}</li>
    <li onClick={()=>{setmenu("Second")}}><Link className='li'  style={{textDecoration: "none"}} to='/Second'>Second</Link> {menu === "Second"? <hr/>: ""}</li>
    <li onClick={()=>{setmenu("Third")}}><Link   className='li'    style={{textDecoration: "none"}} to='/Third'>Third</Link>  {menu === "Third"? <hr/>: ""}</li>

</ul>
<div className="nav-login-cart">

    <Link to='/search'>
     <Search size={24} color="#333" />
  </Link>

<Link to='/card'> <img src={cart_icon} alt="" /></Link>
 <div className="nav-card-count">{all?.items?.length || 0}</div>

</div>
    </div>
  )
}

export default Navbar
