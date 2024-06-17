import React, { useEffect, useState,useContext } from 'react'
import './Paymentapproval.css'
import { Link } from 'react-router-dom'
import Logo from '../../assets/fggc.png'
import moment from 'moment'
import axios from 'axios'
import { useHttpClient } from '../../../hooks/less-http-hook'
import { AuthContext } from '../../../context/auth-context'
import { number_format } from '../../../util/functions'

const Paymentapproval = () => {
  const auth = useContext(AuthContext)
  const myProfile = JSON.parse(localStorage.getItem('myData'));
  const [transactionDetails, setTransactionDetails] = useState(null);
  const [refresh, setRefresh] = useState(false)
  const {isLoading, sendRequest} = useHttpClient();

  

    useEffect(() => {
      const fetchData = async () => {
      
        try {
          
          const [responseTransaction] = await Promise.all([
            sendRequest(`${process.env.REACT_APP_URL}payment/transactions`, 'GET', null, {'Authorization': `Bearer ${auth.token}`})
          ]);
  
          if(responseTransaction){
            setTransactionDetails(responseTransaction.data)
          }
  
            
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
    
      fetchData(); // Call fetchData function immediately
    }, [auth.token, sendRequest, refresh])

    const createdAt = myProfile?.createdAt || "";
    const formattedDate = moment(createdAt).format('YYYY-MM-DD');

    const approvePayment = async (transaction_reason,id) => {
      const data = JSON.stringify({
        "transaction_id": id.toString()
      })
      let url = transaction_reason === "subscription" ? "payment/approve-subscription" :"payment/approve-payment"

      try{
        const response = await sendRequest(`${process.env.REACT_APP_URL}${url}`, 'POST', data, 
        {'Authorization': `Bearer ${auth.token}`,
        'Content-Type': 'application/json'})

        if(response){
          setRefresh(!refresh)
        }   
      }
      catch (error) {
        console.error('Error fetching data:', error);
      }
    }

  return (
    <div className='paymentapproval-container'>
      <div className='paymentapproval-heading'>
        <div className='paymentapproval-logo'>
          <Link to= '/dashboard' className='logo'>
          <img src={Logo} alt=''/>
          </Link>
        </div>
                
        <div className='paymentapproval-level1' >
        <h3 className='level-1'>Level {myProfile?.level_id?.level_number || "0"}</h3> 
          <div className='paymentapproval-user'><h4>{myProfile?.username || ""}</h4>
            <p>Created: {formattedDate}</p></div> 
            
        </div>
      </div>
      <div className='paymentapproval-content'>
        <div className='paymentapproval-payments'>
          <h4>Confirm payments</h4>
          <div className='payments-border'>
            {isLoading && <p>Loading...</p>}
            <div className='paymentapproval-confirm'>

            {
                transactionDetails && 
                transactionDetails.filter(item => item.transaction_type === "credit" && item.transaction_status === "pending")
                .map((item, index) => {
                  return (
                    <div className='confirm-container'>
                        <div>
                          <h4>₦{number_format(item?.amount || 0)}</h4>
                          <h4>Reason: {item?.transaction_reason || ""}</h4>
                          <p>{item?.ref_id?.profile?.first_name || ""}</p>
                          <p>{item?.ref_id?.profile?.phone_number || ""}</p>
                        </div>
                        <button onClick={() => approvePayment(item.transaction_reason, item._id)}>Approve</button>
                    </div>
                  )
                })
            }

            {
              transactionDetails && 
              transactionDetails.filter(item => item.transaction_type === "credit" && item.transaction_status === "pending").length === 0 &&
              <div className="">
                <p>No Pending Approval </p>
              </div>
            }
              {/* <div className='confirm-container'>
                <div>
                  <h4>Charles Ayo</h4>
                  <p><Link to='/dashboard/makepayment/userdetails'>₦check info</Link></p>
                </div>
                <button>Approve</button>
              </div> */}

            </div>
          </div>
        </div>

        <div className='paymentapproval-payments'>
          <h4>Payout Status</h4>
          <div className='payments-border'>
            <div className='paymentapproval-confirm'>
            {
                transactionDetails && 
                transactionDetails.filter(item => item.transaction_type === "debit" && item.transaction_status === "pending")
                .map((item, index) => {
                  return (
                    <div className='confirm-container'>
                        <div>
                          <h4>₦{number_format(item?.amount) || 0}</h4>
                          <h4>Reason: {item?.transaction_reason || ""}</h4>
                          <p>{item?.ref_id?.profile?.first_name || ""}</p>
                          <p>{item?.ref_id?.profile?.phone_number || ""}</p>
                        </div>
                        <p style={{color: 'var(--amount-color, #5C5C5C)',
                          textAlign: 'center',
                          fontFamily: 'Poppins',
                          fontSize: '15px',
                          fontStyle: 'normal',
                          fontWeight: '500',
                          lineHeight: '153%'}}>{item?.transaction_status || "Pending"}</p>
                    </div>
                  )
                })
            }

            {
              transactionDetails && 
              transactionDetails.filter(item => item.transaction_type === "debit" && item.transaction_status === "pending").length === 0 &&
              <div className="">
                <p>No Pending payment </p>
              </div>
            }
              {/* <div className='confirm-container'>
                <div>
                  <h4>Charles Ayo</h4>
                  <p><Link to='/dashboard/makepayment/userdetails'>check info</Link></p>
                </div>
                <p style={{color: 'var(--amount-color, #5C5C5C)',
                  textAlign: 'center',
                  fontFamily: 'Poppins',
                  fontSize: '15px',
                  fontStyle: 'normal',
                  fontWeight: '500',
                  lineHeight: '153%'}}>Pending</p>
              </div> */}
              
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Paymentapproval