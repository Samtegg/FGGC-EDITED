import React from 'react'
import './Com.css'
import People from '../../assets/community.png'

const Com = () => {
  return (
    <div className='club'>
        <div className='img-club'>
            <img src={People} alt=''  />
        </div>
        <div className='written-words'>
            <p className='bold'>Community</p>
            <p className='bold two'>Financing Club</p>
            <p className='small-letters'>By being active member of a rotating system and credit group,
                you can collectively double up your funds with people of under 
                you, also, the higher you climb or level up, the more you get.</p>
        </div>
    </div>
  )
}

export default Com