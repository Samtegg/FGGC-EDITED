import React from 'react'
import '../Levels.css'


const Levelcard = (props) => {
  return (
    <div className='level-props'>
        <div className='first-level'>
            <div className='num-level'>
                <p>Lv.{props.level}</p>
            </div>
            <div className='upgrade-level'>
                <p className='upgrade-money'>N{props.money}</p>
                <p className='level-upgrade'>Upgrade to lv{props.level}</p>
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

export default Levelcard