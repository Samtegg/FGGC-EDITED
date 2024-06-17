import React from 'react'
import { Link } from 'react-router-dom'



const Dashlevelcard = (props) => {
  return (
    <div className={`level-props ${props.className}`}>
        <div className='first-level'>
            <div className='num-level'>
                <p>Lv.{props.level}</p>
                
            </div>
            <div className='upgrade-level'>
                <p className='upgrade-money'>N{props.upgrade_money}</p>
                <p className='level-upgrade'>Upgrade to lv{props.level}</p>
                <Link to="/activate" 
                style={{background:'var(--primary-green)', 
                    margin:'0.5rem 0', 
                    padding:'0.4rem', 
                    borderRadius: '8px', 
                    border:'0px', 
                    fontSize:'12px',
                    color: 'white',
                    cursor: 'pointer'
                    }}>UPGRADE</Link>
            </div>
        </div>
        <div className='second-level'>
            <p>{props.members} Members</p>
        
            <div className='second-person'>
                <p>N{props.money}/person</p>
            </div>
        </div>

    </div>


  )
}

export default Dashlevelcard