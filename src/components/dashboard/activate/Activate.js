import React, { useContext, useEffect, useState } from 'react'
import './Activate.css'
import Logo from '../../assets/fggc.png'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { AuthContext } from '../../../context/auth-context'
import { useHttpClient } from '../../../hooks/http-hook'
import Loader from '../../fragments/loader/Loader'
import { toast } from 'react-toastify'


const Activate = () => {
    const myProfile = JSON.parse(localStorage.getItem('myData'));

    const navigate = useNavigate()
    const auth = useContext(AuthContext);
    const {id} = useParams()

    const {isLoading, sendRequest} = useHttpClient();


    const activateHandler = async() => {
      if(id === "subscription"){
        try {
    
          const response = await sendRequest(`${process.env.REACT_APP_URL}payment/initiate-subscription`, 'GET', null, {'Authorization': `Bearer ${auth.token}`});
          
          if (response.status === true) {
            localStorage.setItem("uplineData", JSON.stringify(response.data))
            navigate('/dashboard/makepayment/userdetails');
          }

        } catch (error) {
          console.error( error.message);
          
        }
      }else{
        try {

            const response = await sendRequest(`${process.env.REACT_APP_URL}payment/activate-account`, 'GET', null, {'Authorization': `Bearer ${auth.token}`});
            
            if (response.status === true) {
              localStorage.setItem("uplineData", JSON.stringify(response.data))
              navigate('/dashboard/makepayment');
            }

            
          } catch (error) {
            console.error( error.message);
            
          }
        }
    }


  return (
    <div className='activate-container'>
        <div className='activate-navbar'>
            
            <Link to= '/dashboard' className='navbar-logo'>
              <img src={Logo} alt=''/>
            </Link>
            
            <div className='navbar-name'>
                <p>{myProfile?.profile?.username || ""}</p>
            </div>
        </div>
        <div className='activate-second'>
            <div className='activate-content'>
            <div className='content-container'>
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="157" height="141" viewBox="0 0 157 141" fill="none">
                        <path d="M78.5 -0.000244141C92.7418 -0.000244141 105.876 3.15145 117.903 9.45483C129.93 15.7582 139.453 24.3106 146.472 35.1121C153.491 45.9135 157 57.7094 157 70.4998C157 83.2901 153.491 95.086 146.472 105.887C139.453 116.689 129.93 125.241 117.903 131.545C105.876 137.848 92.7418 141 78.5 141C64.2582 141 51.1238 137.848 39.0967 131.545C27.0696 125.241 17.5467 116.689 10.528 105.887C3.50933 95.086 0 83.2901 0 70.4998C0 57.7094 3.50933 45.9135 10.528 35.1121C17.5467 24.3106 27.0696 15.7582 39.0967 9.45483C51.1238 3.15145 64.2582 -0.000244141 78.5 -0.000244141ZM91.5833 114.47V97.0291C91.5833 96.1723 91.2767 95.4532 90.6634 94.8718C90.0501 94.2905 89.3006 93.9998 88.4147 93.9998H68.7897C67.9039 93.9998 67.1202 94.3058 66.4388 94.9177C65.7574 95.5297 65.4167 96.2335 65.4167 97.0291V114.47C65.4167 115.266 65.7574 115.97 66.4388 116.582C67.1202 117.194 67.9039 117.5 68.7897 117.5H88.4147C89.3006 117.5 90.0501 117.209 90.6634 116.628C91.2767 116.046 91.5833 115.327 91.5833 114.47ZM91.3789 82.8923L93.2188 25.8865C93.2188 25.1521 92.878 24.6013 92.1966 24.2341C91.5152 23.7445 90.6975 23.4998 89.7435 23.4998H67.2565C66.3025 23.4998 65.4848 23.7445 64.8034 24.2341C64.122 24.6013 63.7813 25.1521 63.7813 25.8865L65.5189 82.8923C65.5189 83.5043 65.8596 84.0398 66.541 84.4988C67.2224 84.9578 68.0401 85.1873 68.9941 85.1873H87.9036C88.8576 85.1873 89.6583 84.9578 90.3057 84.4988C90.953 84.0398 91.3108 83.5043 91.3789 82.8923Z" fill="#CB822A"/>
                    </svg>
                </div>
                <p className='activate-text'>{id === 'subscription' ? 'Process your Advertisement fee' : 'Activate Your Account'}</p>
                <p className='activate-instruction'>{id === 'subscription' ? 'You are to pay a fee to drive advertisement' : 'You are to activate your account to connect to your allocated member'} </p>
            </div>
        </div>
        <div className='activate-button'>
            <button onClick={activateHandler} className='activate-link'> 
                <p>Proceed</p>
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="25" viewBox="0 0 66 29" fill="none">
                    <path d="M46.6538 0.347124C46.0144 0.815321 46.035 1.55537 46.6538 2.05378L60.3488 13.2905H1.65C0.7425 13.2905 0 13.8342 0 14.4987C0 15.1632 0.7425 15.707 1.65 15.707H60.3488L46.6744 26.9436C46.0762 27.4572 46.0144 28.167 46.6538 28.6352C47.2931 29.1034 48.4069 29.1336 49.005 28.6503C49.005 28.6503 65.34 15.5106 65.505 15.3596C65.67 15.2086 66 14.9367 66 14.4987C66 14.0607 65.67 13.7587 65.505 13.6378C65.34 13.517 49.005 0.347124 49.005 0.347124C48.6956 0.120579 48.2625 -0.000244141 47.8294 -0.000244141C47.3962 -0.000244141 46.9838 0.120579 46.6538 0.347124Z" fill="white"/>
                </svg>
                {isLoading && <Loader color="color-white" className="ml-2" />}
            </button>
        </div>
        </div>
        
        
    </div>
  )
}

export default Activate