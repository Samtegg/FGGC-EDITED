import React from 'react'
import './Paymentconfirmed.css'
import Logo from '../../assets/fggc.png'
import { Link } from 'react-router-dom'

const Paymentconfirmed = () => {
  return (
    <div className='paymentconfirmed-container'>
    <div className='paymentconfirmed-navbar'>
        <div className='navbar-logo'>
            <img src={Logo} alt='Logo' />
        </div>
        <div className='navbar-name'>
            <p>Charles Ayo</p>
        </div>
    </div>
    <div className='paymentconfirmed-second'>
        <div className='paymentconfirmed-content'>
            <div className='content-container'>
                <div className='awesome'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="130" height="130" viewBox="0 0 177 177" fill="none">
                        <circle cx="88.5" cy="88.5" r="88.5" fill="#30CB01"/>
                        <path d="M31 85.3636L46.3333 70.8182L77 99.9091L130.667 49L146 63.5455L77 129L31 85.3636Z" fill="white"/>
                    </svg>
                </div>
                <p className='paymentconfirmed-text'>Awesome!</p>
                <p className='paymentconfirmed-instruction'>Payment confirmed </p>
            </div>
        </div>
        <div className='paymentconfirmed-button'>
            <button> 
                <p><Link to='/dashboard' className='paymentconfirmed-continue'>Continue</Link> </p>
            </button>
        </div>
    </div>
    
    
</div>
  )
}

export default Paymentconfirmed