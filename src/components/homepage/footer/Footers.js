import React from 'react'
import './Footers.css'
import { Link } from 'react-router-dom'
import Logo from '../../assets/fggc.png'
import { FaFacebookF } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { FaTelegram } from "react-icons/fa";



const Footers = () => {
    const dateYear = new Date().getFullYear
  return (
    <footer className='footer-container'>
        <div className='footer-content'>
            <div className='footer-logo'>
                <img src={Logo} alt='' />
            </div>
            <div className='footer-writeup'>
                <div className='footer-contact'>
                    <h4>Contact us</h4>
                    <div className='footer-social'>
                        <a href='https://www.facebook.com/profile.php?id=61556778639573&mibextid=ZbWKwL' className='social' style={{color: "#1877F2",}}><FaFacebookF size={20}/></a>
                        <a href='https://twitter.com/FirstClub33810' className='social' style={{color: "black",}}><FaSquareXTwitter size={20}/></a>
                        <a href='https://chat.whatsapp.com/CmnTFlL7513HsnNyEfAhzz' className='social' style={{color: "#25D366",}}><FaWhatsapp size={20}/></a> 
                        <a href='https://youtube.com/@FirstGoldenGiftedClub?si=T6rTZyLsASShm-Eh' className='social' style={{color: "#FF0000",}}><FaYoutube size={20}/></a>
                        <a href='https://www.tiktok.com/@first.golden.gift?_t=8kOimu6KLvZ&_r=1' className='social' style={{color: "black",}}><FaTiktok size={20}/></a>
                        <a href='https://www.instagram.com/first_golden_gifted_club?igsh=MzNlNGNkZWQ4Mg==' className='social' style={{color: "#E4405F",}}><FaInstagram size={20}/></a>
                        <a href='' className='social' style={{color: "#4285F4",}}><FaGoogle size={20}/></a>
                        <a href='https://t.me/first_golden_gifted_club' className='social' style={{color: "#0088CC",}}><FaTelegram size={20}/></a>
                    </div>
                </div>
                <div className='footer-legal'>
                    <h4>Legal</h4>
                    <Link to='/termsandcondition'>Terms & Conditions</Link>
                </div>
                <div className='footer-product'>
                    <h4>Product</h4>
                    <ul className='nav-menut'>
                        <li className='nav-itemt'>
                            <a href='#howitworks'>How it works</a>
                        </li>
                        <li className='nav-itemt'>
                            <a href='#activities'>Activities</a>
                        </li>
                        <li className='nav-itemt'>
                            <a href='#about'>About</a>
                        </li>
                        <li className='nav-itemt'>
                            <a href='/FAQ'><Link to='/FAQ'>FAQ</Link></a>
                        </li>
                    </ul>
                </div>
                <div className='footer-contact'>
                    <h4>Contact</h4>
                    <Link to='/supportticket'>Support Ticket</Link>
                </div>

            </div>
        </div>
        <div className='footer-text'>
            <p>© {dateYear} borderless. All rights reserved.</p>
        </div>
    </footer>

  )
}

export default Footers