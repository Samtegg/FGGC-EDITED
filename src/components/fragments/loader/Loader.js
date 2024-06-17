import React from 'react'
import './Loader.css'
import { IoRefreshCircleOutline } from "react-icons/io5";

function Loader({color, className}) {
  return (
    <IoRefreshCircleOutline className={`loader__animate ${color} ${className}`}/>
  )
}

export default Loader