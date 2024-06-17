import React, { useContext} from 'react'
import Logo from '../../assets/fggc.png'
import './Makepayment.css'
import {   useNavigate } from 'react-router-dom'
import { AuthContext } from '../../../context/auth-context'
import { useHttpClient } from '../../../hooks/http-hook'
import Loader from '../../fragments/loader/Loader'

const Makepayment = () => {

  const data = JSON.parse(localStorage.getItem("myData"))

  const navigate = useNavigate()
  const auth = useContext(AuthContext);

  const {isLoading, sendRequest} = useHttpClient();

  const uplineData = JSON.parse(localStorage.getItem("uplineData"))

  
  const initiatePaymentHandler = async() => {
    try {

        const response = await sendRequest(`${process.env.REACT_APP_URL}payment/initiate-payment`, 'GET', null, {'Authorization': `Bearer ${auth.token}`});
        // console.log(response)
        if (response.status === true) {
          const upline_profile = response.data?.profile

          if(upline_profile.isAdmin === true){
            navigate('/dashboard');
          }else{
            localStorage.setItem("uplineData", JSON.stringify(response.data))
            navigate('/dashboard/makepayment/userdetails');
          }
        }

      } catch (error) {
        console.error( error.message);
        // Handle other errors (e.g., network error)

      }
}

    

  return (
    <div className='makepayment-container'>
        <div className='makepayment-logo'>
            <img src={Logo} alt='' />
        </div>
        <div className='makepayment-content'>
            <p>Make payment to Allocated member
              {/* <svg xmlns="http://www.w3.org/2000/svg" width="30" height="13" viewBox="0 0 40 17" fill="none">
                <path d="M28.275 0.203386C27.8875 0.477846 27.9 0.911671 28.275 1.20384L36.575 7.79086H1C0.45 7.79086 0 8.10959 0 8.49914C0 8.8887 0.45 9.20743 1 9.20743H36.575L28.2875 15.7945C27.925 16.0955 27.8875 16.5116 28.275 16.786C28.6625 17.0605 29.3375 17.0782 29.7 16.7949C29.7 16.7949 39.6 9.09233 39.7 9.00379C39.8 8.91526 40 8.75589 40 8.49914C40 8.24239 39.8 8.06532 39.7 7.99449C39.6 7.92366 29.7 0.203386 29.7 0.203386C29.5125 0.0705833 29.25 -0.000244141 28.9875 -0.000244141C28.725 -0.000244141 28.475 0.0705833 28.275 0.203386Z" fill="black"/>
                </svg> */}
            </p>
            <div className='makepayment-name'>
              
                <h4>{uplineData?.parent?.profile?.username || ""} </h4>
                {/* <Link to="/dashboard/makepayment/userdetails" className='check-info' >Check info</Link> */}
            </div>
        </div>

        <div className='makepayment-button'>
            <button onClick={initiatePaymentHandler} className='payment-link'>
                Proceed
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 66 29" fill="none">
                    <path d="M46.6538 0.347124C46.0144 0.815321 46.035 1.55537 46.6538 2.05378L60.3488 13.2905H1.65C0.7425 13.2905 0 13.8342 0 14.4987C0 15.1632 0.7425 15.707 1.65 15.707H60.3488L46.6744 26.9436C46.0762 27.4572 46.0144 28.167 46.6538 28.6352C47.2931 29.1034 48.4069 29.1336 49.005 28.6503C49.005 28.6503 65.34 15.5106 65.505 15.3596C65.67 15.2086 66 14.9367 66 14.4987C66 14.0607 65.67 13.7587 65.505 13.6378C65.34 13.517 49.005 0.347124 49.005 0.347124C48.6956 0.120579 48.2625 -0.000244141 47.8294 -0.000244141C47.3962 -0.000244141 46.9838 0.120579 46.6538 0.347124Z" fill="white"/>
                </svg>
                {isLoading && <Loader color="color-white" className="ml-2" />}
            </button>
        </div>

    </div>
  )
}

export default Makepayment