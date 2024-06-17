import React, { useContext, useEffect, useState } from 'react'
import Logo from '../../assets/fggc.png'
import './Payoutportal.css'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../../context/auth-context'
import { useHttpClient } from '../../../hooks/less-http-hook'
import { number_format } from '../../../util/functions'
import moment from 'moment'


const Payoutportal = () => {
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
    <div className='payoutportal-container'>
        <div className='payoutportal-logo'>
        <Link to= '/dashboard' className='logo'>
            <img src={Logo} alt='Logo' />
        </Link>
            
        </div>
        <div className='payoutportal-second'>
            <div className='payoutportal-heading' >
                    <h2>Payout Portal {isLoading && "Loading..."}</h2>
            </div>

            <div className='payoutportal-wallet'>
                <div className='payoutportal-dashboard'>
                    <h2>₦{number_format(myProfile?.wallet?.balance || 0)}</h2>
                    <p>First Golden Gifted Club wallet</p>
                    <h4>Level {myProfile?.level_id?.level_number || "0"}</h4>
                </div>
            </div>

            <div className='payoutportal-content'>
            {transactionDetails && transactionDetails.filter(item => item.transaction_type === "debit" && item.transaction_status === "success"  ).length === 0 && <p>No transactions found</p>}
            {
                transactionDetails && transactionDetails.filter(item => item.transaction_type === "debit" && item.transaction_status === "success" ).map((item, index) => {
                  
                  return (
                        <div key={index}>
                        <div className='payoutportal-details'>
                            <div>
                                <p className='payoutportal-name'>{item?.ref_id?.profile?.first_name || ""} {item?.ref_id?.profile?.last_name || ""}</p>
                                <p className='payoutportal-date'>{moment(item.createdAt).format("MMM DD, YYYY | hh:mm:ss A") || moment() || ""}</p>
                                <p className='payoutportal-cash'>-₦{number_format(item.amount || 0) || "0"}</p>
                            </div>
                            <div className='payoutportal-svg'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="23" viewBox="0 0 24 23" fill="none">
                                <ellipse cx="12" cy="11.4998" rx="12" ry="11.5" fill="#D55151"/>
                                <path d="M12.8348 16.2298C13.1541 15.9238 13.4735 15.6177 13.7928 15.3117C14.1601 14.9598 14.5273 14.6078 14.8945 14.2559C15.0291 14.1269 15.1637 13.998 15.2983 13.869C15.4123 13.7597 15.5264 13.6504 15.6404 13.5411C15.7522 13.434 15.8594 13.3269 15.9164 13.1804C16.026 12.9007 15.9576 12.5772 15.7456 12.3609C15.5335 12.1489 15.2097 12.0659 14.9155 12.1512C14.7239 12.2081 14.5916 12.3305 14.4547 12.4617C14.3703 12.5425 14.2837 12.6256 14.1993 12.7065C13.8571 13.0344 13.515 13.3623 13.1728 13.6902C13.1383 13.7232 13.0793 13.6998 13.0793 13.653C13.0794 13.1963 13.0795 12.7366 13.0796 12.2805C13.0797 11.839 13.0798 11.3932 13.0799 10.9517C13.08 10.5408 13.08 10.1299 13.0801 9.7147C13.0802 9.30382 13.0803 8.89731 13.0804 8.48643C13.0804 8.17609 13.0805 7.86574 13.0828 7.55321C13.0828 7.4789 13.0829 7.40897 13.0829 7.33466C13.0806 7.05273 12.9279 6.79268 12.6725 6.65285C12.4057 6.50647 12.0636 6.51527 11.8082 6.68142C11.5824 6.82789 11.4478 7.07488 11.4477 7.33714C11.4477 7.56444 11.4476 7.79173 11.4476 8.01903C11.4475 8.43428 11.4474 8.84953 11.4451 9.26696C11.4427 9.71937 11.4449 10.1718 11.4425 10.6242C11.4424 11.1356 11.4423 11.647 11.4399 12.1606C11.4375 12.6436 11.4397 13.1266 11.4373 13.6096C11.4373 13.6725 11.358 13.704 11.3115 13.6595C11.184 13.5373 11.0558 13.4144 10.9288 13.2928C10.7373 13.1093 10.5435 12.9235 10.352 12.74C10.2745 12.6657 10.1992 12.5936 10.1217 12.5193C9.98944 12.3925 9.86403 12.2549 9.68845 12.1828C9.38288 12.0561 9.02026 12.1239 8.78532 12.349C8.55037 12.5742 8.48189 12.9239 8.61182 13.2145C8.67565 13.3588 8.78737 13.4615 8.8991 13.5685C9.02451 13.6887 9.14991 13.8089 9.27532 13.9291C9.42125 14.0689 9.56945 14.211 9.71538 14.3508C9.89095 14.5191 10.0688 14.6895 10.2444 14.8578C10.4587 15.0632 10.6753 15.2707 10.8896 15.4761C11.0492 15.6291 11.2089 15.7821 11.3685 15.935C11.4665 16.029 11.5623 16.1208 11.6603 16.2147C11.8518 16.3983 12.1164 16.49 12.3855 16.4462C12.5565 16.4222 12.7139 16.3457 12.8348 16.2298Z" fill="white"/>
                                </svg>
                            </div>
                        </div>
                        <div className='payoutportal-line'></div>
                        </div>
                    
                  )
                })
              }
               
                    
                
            </div>
            
        </div>

    </div>
  )
}

export default Payoutportal