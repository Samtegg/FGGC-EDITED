import React from 'react'
import './Over.css'
import Thousand from '../../assets/thousand.png'

const Over = () => {
  return (
    <div className='over-container'>
        <div className='over-writeup'>
            <h3>Over 50 million in just one month</h3>
            <p>so what are you waiting for?!</p>
        </div>
        <div className='over-img'>
          <img src={Thousand} alt='' />
        </div>
        
        
    </div>
  )
}

export default Over