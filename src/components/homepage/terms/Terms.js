import React from 'react'
import './Terms.css'
import termsAndConditions from './termsfile'
import { Link } from 'react-router-dom'

const Terms = () => {
  return (
    <div className='terms-container'>
        <h2>Terms & Conditions</h2>
        <div className='content-container'>
            <div className='terms-content'>
                <h3>Terms and Conditions</h3>
                <h4>Your Agreement</h4>
                <div className='your-agreement'>
                    
                    <div className='terms-writeup'>
                        <p>{termsAndConditions}</p>
                    </div>
                </div>     
            <div className='terms-button'>
                <Link to= '/signup' className='agree-button'>Continue</Link>
            </div>

            </div>
        </div>

    </div>
  )
}

export default Terms