import React, { useContext, useEffect, useState } from 'react'
import Logo from '../../assets/fggc.png'
import './Receivedportal.css'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../../context/auth-context'
import { useHttpClient } from '../../../hooks/less-http-hook'
import { number_format } from '../../../util/functions'
import moment from 'moment'

const Receivedportal = () => {
    const auth = useContext(AuthContext)
    const [myProfile, setmyProfile] = useState(() => {
        const data = JSON.parse(localStorage.getItem('myData'));
        return data ? data : null;
    });
    
    const [transactionDetails, setTransactionDetails] = useState(null);
     
    const {isLoading, sendRequest} = useHttpClient();
  
    useEffect(() => {
      const fetchData = async () => {
        
        try {
          
          const [responseUser, responseTransaction] = await Promise.all([
            sendRequest(`${process.env.REACT_APP_URL}user/profile`, 'GET', null, {'Authorization': `Bearer ${auth.token}`}),
            sendRequest(`${process.env.REACT_APP_URL}payment/transactions`, 'GET', null, {'Authorization': `Bearer ${auth.token}`})
          ]);
  
          if(responseTransaction){
            setTransactionDetails(responseTransaction.data)
          }
  
          if(responseUser){
            localStorage.setItem('myData', JSON.stringify(responseUser.data))
            setmyProfile(responseUser.data)
          }
  
            
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
    
      fetchData(); 
    }, [auth.token, sendRequest])
  return (
    <div className='receivedportal-container'>
        <div className='receivedportal-logo'>
        <Link to='/dashboard' className='logo'>
            <img src={Logo} alt='Logo' />
        </Link>
            
        </div>
        <div className='receivedportal-second'>
            <div className='receivedportal-heading' >
                    <h2>Received Payment Portal</h2>
            </div>

            <div className='receivedportal-wallet'>
                <div className='receivedportal-dashboard'>
                    <h2>₦{number_format(myProfile?.wallet?.balance || 0)}</h2>
                    <p>First Golden Gifted Club wallet</p>
                    <h4>Level {myProfile?.level_id?.level_number || "0"}</h4>
                </div>
            </div>
            <div className='receivedportal-content'>
            {transactionDetails && transactionDetails.filter(item => item.transaction_type === "credit" && item.transaction_status === "success" ).length === 0 && <p>No transactions found</p>}
            {
                transactionDetails && transactionDetails.filter(item => item.transaction_type === "credit" && item.transaction_status === "success" ).map((item, index) => {
                  
                  return (
                        <div key={index}>
                        
                            <div className='receivedportal-details'>
                                <div>
                                    <p className='receivedportal-name'>{item?.ref_id?.profile?.first_name || ""} {item?.ref_id?.profile?.last_name || ""}</p>
                                    <p className='receivedportal-date'>{moment(item.createdAt).format("MMM DD, YYYY | hh:mm:ss A") || moment() || ""}</p>
                                    <p className='receivedportal-cash'>+₦{number_format(item.amount || 0) || "0"}</p>
                                </div>
                                <div className='receivedportal-svg'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="23" viewBox="0 0 46 46" fill="none">
                                        <circle cx="23" cy="23" r="23" fill="#51CF66"/>
                                        <path d="M24.6 13.5585C25.2121 14.1705 25.8242 14.7826 26.4362 15.3947C27.1401 16.0985 27.844 16.8024 28.5478 17.5063C28.8058 17.7642 29.0637 18.0222 29.3217 18.2801C29.5403 18.4987 29.7589 18.7173 29.9775 18.9359C30.1917 19.1501 30.3972 19.3643 30.5065 19.6572C30.7164 20.2168 30.5854 20.8636 30.179 21.2963C29.7725 21.7202 29.1519 21.8862 28.588 21.7156C28.2208 21.6019 27.9672 21.3571 27.7049 21.0948C27.5432 20.933 27.377 20.7669 27.2153 20.6051C26.5595 19.9493 25.9037 19.2935 25.2479 18.6378C25.1818 18.5716 25.0687 18.6185 25.0687 18.712C25.0689 19.6254 25.0691 20.5449 25.0692 21.4571C25.0694 22.34 25.0696 23.2317 25.0697 24.1147C25.0699 24.9364 25.0701 25.7582 25.0702 26.5887C25.0704 27.4104 25.0705 28.2234 25.0707 29.0452C25.0708 29.6659 25.0709 30.2866 25.0754 30.9116C25.0754 31.0603 25.0755 31.2001 25.0755 31.3487C25.0712 31.9126 24.7785 32.4327 24.289 32.7124C23.7776 33.0051 23.122 32.9875 22.6323 32.6552C22.1995 32.3623 21.9416 31.8683 21.9415 31.3438C21.9414 30.8892 21.9413 30.4346 21.9412 29.98C21.941 29.1495 21.9409 28.319 21.9363 27.4841C21.9318 26.5793 21.936 25.6745 21.9315 24.7697C21.9313 23.7469 21.9311 22.7241 21.9265 21.6969C21.9219 20.7309 21.9261 19.7649 21.9216 18.7989C21.9216 18.673 21.7694 18.61 21.6804 18.699C21.4359 18.9435 21.1902 19.1892 20.947 19.4325C20.5799 19.7996 20.2084 20.171 19.8413 20.5381C19.6927 20.6867 19.5485 20.8309 19.3999 20.9795C19.1464 21.233 18.9061 21.5083 18.5695 21.6525C17.9838 21.9059 17.2888 21.7703 16.8385 21.32C16.3882 20.8697 16.257 20.1703 16.506 19.589C16.6283 19.3005 16.8425 19.0951 17.0566 18.881C17.297 18.6406 17.5373 18.4002 17.7777 18.1599C18.0574 17.8802 18.3415 17.5961 18.6211 17.3164C18.9577 16.9799 19.2985 16.639 19.635 16.3025C20.0458 15.8917 20.461 15.4766 20.8718 15.0658C21.1777 14.7599 21.4836 14.4539 21.7896 14.148C21.9775 13.9601 22.161 13.7766 22.3489 13.5886C22.716 13.2215 23.223 13.038 23.7388 13.1256C24.0667 13.1737 24.3683 13.3268 24.6 13.5585Z" fill="white"/>
                                    </svg>
                                </div>
                            </div>
                            <div className='receivedportal-line'></div>
                        </div>
                    
                  )
                })
              }
                <div>
                    <div className='receivedportal-details'>
                    </div>
                    
                </div>
                <div>
                    <div className='receivedportal-details'>
                    </div>
                   
                </div>
                <div>
                    <div className='receivedportal-details'>
                    </div>
                    
                </div>
            </div>
            
        </div>

    </div>
  )
}

export default Receivedportal