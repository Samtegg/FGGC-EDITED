import React from 'react'
import './Hero.css'
import { Link } from 'react-router-dom'


const Hero = () => {
  return (
    <div className='hero'>
      <div className='hero-container'>
              <p>An Online Club designed to generate Millions of Naira for our members.</p>
              <p>First Golden Gifted Club, the money making machine, the autopilot to wealth. with N1000 membership fee, you can be able to earn in millions </p>
              <button href= '/signup' type="button"><Link to="/signup">GET STARTED</Link></button>
      </div>  
    </div>
  )
}

export default Hero