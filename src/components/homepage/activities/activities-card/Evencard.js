import React from 'react'
import '../Activities.css'


const Evencard = (props) => {
  return (
    <div className='card-act even'>
        <div className='even-num'><p >{props.num}</p></div>
        <div className='even-statement'><p >{props.statement}</p></div>
        
    </div>
  )
}

export default Evencard;