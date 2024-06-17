import React from 'react'
import { Link } from 'react-router-dom'
import Writeup from './Writeup'




const Constitution = () => {
  return (
    <div className='terms-container'>
    <h2>Constitution</h2>
    <div className='content-container'>
        <div className='terms-content'>
            <h3>FGGC Constitution</h3>
            <div className='your-agreement'>
       
                <div className='terms-writeup'>
                    <Writeup />
                </div>
            </div>     
        <div className='terms-button'>
            <Link to= '/dashboard' className='agree-button'>Continue</Link>
        </div>

        </div>
    </div>

</div>
  )
}

export default Constitution