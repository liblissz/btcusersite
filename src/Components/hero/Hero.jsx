import React from 'react'
import './Hero.css'
import hand_icon from "../assets/Frontend_Assets/hand_icon.png"
import her_icon from '../assets//Frontend_Assets/arrow.png'
import hero_img from '../assets/Frontend_Assets/images.jpg'
const Hero = () => {
  return (
    <div className='hero'>
      <div className="hero-left">
<h2>New Arivals only</h2>
<div className="hero-hand-icon">
    <p>new</p>
    <img src={hand_icon} alt="" />
</div>
<p>Drugs</p>
<p>for everyone</p>
<div className="her-latest-btn">
        <div>latest Medicines</div>
        <img src={her_icon} alt="" />
      </div>
      </div>
      
      <div className="hero-right">
<img src={hero_img} alt="" />
      </div>
    </div>
  )
}

export default Hero
