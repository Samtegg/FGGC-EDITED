import React from 'react'
import '../Activities.css'

const Oddcard = (props) => {
  return (
    <div className='card-act odd'>
        <div className='act-statement'><p>{props.statement}</p></div>
        <div><p className='act-num'>{props.num}</p></div>
       
    </div>
  )
}

export default Oddcard