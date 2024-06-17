import React, { useContext} from 'react'
import Logo from '../../assets/fggc.png'
import './Userdetails.css'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../../context/auth-context'
import { useHttpClient } from '../../../hooks/http-hook'
import Loader from '../../fragments/loader/Loader'

const Userdetails = () => {
    const navigate = useNavigate()
    const auth = useContext(AuthContext);

    const {isLoading, sendRequest} = useHttpClient();

    const data = JSON.parse(localStorage.getItem("uplineData"))

    const checkPaymentHandler = async() => {
      try {
  
          const response = await sendRequest(`${process.env.REACT_APP_URL}payment/check-payment?transaction_id=${data.transaction_id || ""}`, 'GET', null, {'Authorization': `Bearer ${auth.token}`});
          
          if (response) {

            navigate('/dashboard');
            localStorage.removeItem("uplineData");
            // if(response.data.transaction_status === "success"){
                
                
            // }else{
            //     alert("Payment not confirmed yet")
            // }

          }
  
        } catch (error) {
          console.error( error.message);
          // Handle other errors (e.g., network error)
  
        }
    }


  return (
    <div className='userdetails-container'>
       {data && 
       <>
        <div className='userdetails-cover'>
            <div className='userdetails-logo'>
                <img src={Logo} alt='' />
            </div>
            <div className='userdetails-content'>
                <h3>{data?.parent_profile?.first_name || ""} {data?.parent_profile?.last_name || ""}</h3>
                <div className='userdetails-line'></div>
                <div className='userdetails-info'>
                    <p>Account name</p>
                    <p>{data?.parent_wallet?.account_name || ""}</p>
                </div>
                <div className='userdetails-info'>
                    <p>Account number</p>
                    <p>{data?.parent_wallet?.account_number || ""}</p>
                </div>
                <div className='userdetails-info'>
                    <p>Bank</p>
                    <p>{data?.parent_wallet?.bank_name || ""}</p>
                </div>
                <div className='userdetails-info'>
                    <p>Phone Number</p>
                    <p>{data?.parent_profile?.phone_number || ""}</p>
                </div>
            </div>
        </div>
        <div className='userdetails-instruction'>
            <p>ALERT THE RECEIVER</p>
            <p className='instruction-call'>Please call the user on Normal call or Whatsapp Call before you make payment {isLoading && <Loader color="color-white" className="ml-2" />}</p> 
        </div>
        <button className='userdetails-button'>
            <button  
            onClick={checkPaymentHandler}
            // to='/dashboard/makepayment/userdetails/paymentpending' 
            className='pending-link'>I HAVE MADE PAYMENT</button>
        </button>

        </>
        }
    </div>
  )
}

export default Userdetails