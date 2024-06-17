import React from 'react'
import { Link } from 'react-router-dom'
import './Try.css'

const Try = () => {
  return (
    <div className='try-container'>
        <div className='try-heading'>Try FGGC Now</div>
        <div className='try-content'>
            <div className='try-subheading'>
                <p className='try-black'>Start making money with</p>
                <p className='try-brown'>First Golden Gifted Club</p>
            </div>
            <div className='try-button'>
                <Link to='/signup' className='signup'>Create an account</Link>
            </div>
        </div>
    </div>
   
  )
}

export default Try