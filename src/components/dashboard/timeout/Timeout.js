import React from 'react'
import { Link } from 'react-router-dom'
import '../notification/Notification.css'


const Timeout = () => {
  return (
    <div className='notification-container'>
        <div className='notification-navbar'>
            <div className='notification-user'>
                <h3>Charles Ayo </h3>
                <p>Created: 24/11/2023</p>
            </div>
            <div className='notification-level'>
                <p>Level 1</p>
            </div>
        </div>
        <div className='notification-whole'>
            <div className='notification-content'>
                <h2>Level up</h2>
                <p>You have reached the Goal for this level. so its time to level up</p>
                <div className='notification-timeout'>
                    <div className='timeout'>
                        <h5>Make payment <span>( you have 24hrs to do so)</span></h5>
                        <p>23:59:24</p>
                    </div>
                </div>
                <div className='notification-proceed'>
                    <p>Make payment to upgrade your account <svg xmlns="http://www.w3.org/2000/svg" width="40" height="17" viewBox="0 0 40 17" fill="none" style={{marginLeft :'2rem'}}>
                        <path d="M28.275 0.20363C27.8875 0.47809 27.9 0.911915 28.275 1.20408L36.575 7.79111H1C0.45 7.79111 0 8.10983 0 8.49939C0 8.88894 0.45 9.20767 1 9.20767H36.575L28.2875 15.7947C27.925 16.0957 27.8875 16.5118 28.275 16.7863C28.6625 17.0607 29.3375 17.0785 29.7 16.7951C29.7 16.7951 39.6 9.09257 39.7 9.00404C39.8 8.9155 40 8.75614 40 8.49939C40 8.24263 39.8 8.06556 39.7 7.99473C39.6 7.92391 29.7 0.20363 29.7 0.20363C29.5125 0.0708275 29.25 0 28.9875 0C28.725 0 28.475 0.0708275 28.275 0.20363Z" fill="black"/>
                        </svg>
                    </p>
                    <p className='payment-name'>Charles Ayo</p> 
                </div>
                <div className='button-position'>
                    <Link to= '/' className='notification-button'>
                        <p>Proceed</p>
                        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="20" viewBox="0 0 66 29" fill="none">
                            <path d="M46.6538 0.347124C46.0144 0.815321 46.035 1.55537 46.6538 2.05378L60.3488 13.2905H1.65C0.7425 13.2905 0 13.8342 0 14.4987C0 15.1632 0.7425 15.707 1.65 15.707H60.3488L46.6744 26.9436C46.0762 27.4572 46.0144 28.167 46.6538 28.6352C47.2931 29.1034 48.4069 29.1336 49.005 28.6503C49.005 28.6503 65.34 15.5106 65.505 15.3596C65.67 15.2086 66 14.9367 66 14.4987C66 14.0607 65.67 13.7587 65.505 13.6378C65.34 13.517 49.005 0.347124 49.005 0.347124C48.6956 0.120579 48.2625 -0.000244141 47.8294 -0.000244141C47.3962 -0.000244141 46.9838 0.120579 46.6538 0.347124Z" fill="white"/>
                        </svg>
                    </Link>
                </div>
            </div> 
        </div>  
    </div>
  )
}

export default Timeout