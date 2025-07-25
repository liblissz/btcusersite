import React from 'react'
import './Description.css'
const Description = () => {
  return (
    <div className='descriptionbox'>
      <div className="descriptionbox-navigation">
        <div className="descriptionbox-nav-box">
            Description
        </div>
          <div className="descriptionbox-nav-box fade">
            Reviews (122)
        </div>
      </div>
      <div className="descriptionbox-description">
        <p>BTC PHARMACY is committed to providing exceptional pharmaceutical care and health solutions to our community. Since our founding, we’ve built our reputation on three core pillars:

1. Quality & Safety
Every medication we dispense meets the highest standards for purity and efficacy. We partner only with reputable manufacturers and conduct 
rigorous checks—so you can trust that the drugs you receive are both safe and effective.</p>
                       <p>2. Personalized Service
Our team of licensed pharmacists takes the time to understand each patient’s unique needs. Whether you have complex prescription regimens, over‑the‑counter questions, or need advice on supplements, we deliver tailored guidance to help you get the best possible outcomes.

3. Convenience & Accessibility

In‑store: A welcoming, wheelchair‑accessible location with private counseling areas.

Online: Secure ordering through our website and desktop/mobile app, complete with real‑time inventory and automated refill reminders.

Home Delivery: Fast, reliable delivery right to your door—ideal for seniors, busy professionals, or anyone with mobility challenges.

</p>
      </div>
    </div>
  )
}

export default Description
