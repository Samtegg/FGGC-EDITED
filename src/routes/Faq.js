import React from 'react'
import Navbar from '../components/homepage/navbar/Navbar'
import Try from '../components/homepage/try/Try'
import Over from '../components/homepage/over/Over'
import Footers from '../components/homepage/footer/Footers'
import Quest from '../components/homepage/faq/Quest'
import { Link } from 'react-router-dom'
import Logo from '../components/assets/fggc.png'

const Faq = () => {
  return (
    <div>
        <Link to='/' className='logo'>
          <img src={Logo} alt='logo' style={{height:"90px", width:"auto", marginTop:"5px", marginLeft:"5px"}}/>
        </Link>
      <Quest />
      <Try />
      <Over />
      
    </div>
  )
}

export default Faq