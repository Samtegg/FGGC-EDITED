import React from 'react'
import './Levels.css'
import Levelcard from './levelscard/Levelcard'



const Levels = () => {
  return (
    <div className='level-container'>
        <div className='level-heading'>
            <h3>Levels</h3>
        </div>
        <div className='level-cards center-cards'>
            <Levelcard level='1' money='1,000' members='2'  />
            <Levelcard level='2' money='2,000' members='4'  />
            <Levelcard level='3' money='4,000' members='8'  />
            <Levelcard level='4' money='8,000' members='16'  />
            <Levelcard level='5' money='16,000' members='32'  />
            <Levelcard level='6' money='32,000' members='64'  />
            <Levelcard level='7' money='64,000' members='128'  />
            <Levelcard level='8' money='128,000' members='256'  />
            <Levelcard level='9' money='256,000' members='512'  />
            <Levelcard level='10' money='512,000' members='1024'  />
        </div>
        <div className='potential'>
            <p>Total potential amount generated from Level 2 to Level 10=#698,028,000</p>
        </div>
    </div>
  )
}

export default Levels