import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Logo from '../../assets/fggc.png'
import './Recovery.css'

const Recovery = () => {
  const [myProfile, setMyProfile] = useState(null);

  useEffect(() => {
    // Retrieve data from localStorage
    const storedData = localStorage.getItem('myData');
   
    if (storedData) {
      // Parse the stored data back into JavaScript object
      const parsedData = JSON.parse(storedData);
      setMyProfile(parsedData);
    }
  }, []);
  

  return (
    <div className='recovery-container'>
          <div className='recovery-heading'>
            <Link to='' className='logo'>
              <img src={Logo} alt='logo' />
            </Link>
            <div className='recovery-headingtext'>
              <h3>Recovery Code</h3>
            </div>
          </div>
          <div className='recovery-content'>
            <div className='recovery-box'>
              {myProfile && (
                <div className='recovery-codebox'>
                  <p>{myProfile?.originalCode || "0000000"}</p>
                </div>
              )}
              <div className='recovery-text'>
                <p>This is your recovery code for when you forget your password and for other important activities. do well to write it out so you won’t forget it </p>
              </div>
            </div>
          </div>
          
          <Link className='recovery-button' to='/activate' style={{color:'#ffffff'}}>Continue</Link>
  </div>
  )
}

export default Recovery