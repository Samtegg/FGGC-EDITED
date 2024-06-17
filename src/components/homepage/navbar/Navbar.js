import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Logo from '../../assets/fggc.png'
import {FaTimes, FaBars} from 'react-icons/fa'
import './Navbar.css'

const Navbar = () => {

  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click)



return (
  <div className='header'>
    <div className='hamburger' onClick={handleClick}>
      {click? <FaTimes size={25} style={{color: 'var(--primary-brown'}} /> : <FaBars size={20} style={{color:'var(--primary-brown'}}/>}
    </div>
    <nav className={click? 'navbar active' : 'navbar'} >
      <Link to='/' className='logo'>
        <img src={Logo} alt='logo' />
      </Link>
      <ul className='nav-menu'>
          <li className='nav-item'>
            <a href='#howitworks'>How it works</a>
          </li>
          <li className='nav-item'>
            <a href='#activities'>Activities</a>
          </li>
          <li className='nav-item'>
            <a href='#about'>About</a>
          </li>
          <li className='nav-item'>
            <a href=''><Link to='/FAQ' className='signin'>FAQ</Link></a>
          </li>
      </ul>
      <ul className='two' >
        <li className='nav-item' >
          <Link to='/signin' className='signin'>Login</Link>
        </li>
        <li className='nav-item'>
          <Link to='/signup' className='signup'>Sign up</Link>
        </li>
      </ul>
    </nav>
  </div>
)
}

export default Navbar