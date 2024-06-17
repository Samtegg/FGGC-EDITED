import React, { useEffect, useState } from 'react'
import './Notification.css'
import moment from 'moment';
import { useHttpClient } from '../../../hooks/less-http-hook';
import { Link } from 'react-router-dom';

const Notification = () => {

    const [notifications, setNotifications] = useState([])

    const data = JSON.parse(localStorage.getItem('myData'));
    const userData = JSON.parse(localStorage.getItem('userData'));

    const {isLoading, sendRequest} = useHttpClient();

  useEffect(() => {
    const fetchData = async () => {
      
      try {
        
        const [response, readAll] = await Promise.all([
            sendRequest(`${process.env.REACT_APP_URL}user/notifications`, 'GET', null, {'Authorization': `Bearer ${userData.token}`}),
            sendRequest(`${process.env.REACT_APP_URL}user/read-notifications`, 'PATCH', null, {'Authorization': `Bearer ${userData.token}`})
        ])

        if(response.status){
          setNotifications(response.data.notifications )
        }

          
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData(); // Call fetchData function immediately
  }, [sendRequest, userData.token])

  return (
    <div className='notification-container'>
        <div className='notification-navbar'>
            <div className='notification-user'>
                <h3>{data?.profile?.first_name || ""} {data?.profile?.last_name || ""} </h3>
                <p>Created: {moment(data?.createdAt).format('YYYY/MM/DD') || ""}</p>
            </div>
            <div className='notification-level'>
                <p>Level {data?.level_id?.level_number || "1"}</p>
            </div>
        </div>
        <div className='notification-whole'>
            {isLoading && <p>Loading...</p>}
            {notifications.slice().reverse().map((item,index) => {
                if(item.notification_type.includes("inactive")){
                    return(
                        <div className='notification-content'>
                            <h2 style={{color:"red"}}>Inactive Account</h2>
                            <p>Your account is inactive, make payment to activate your account again</p>
                            <div className='notification-proceed'>
                                <p>Make payment to activate your account <svg xmlns="http://www.w3.org/2000/svg" width="40" height="17" viewBox="0 0 40 17" fill="none" style={{marginLeft :'2rem'}}>
                                    <path d="M28.275 0.20363C27.8875 0.47809 27.9 0.911915 28.275 1.20408L36.575 7.79111H1C0.45 7.79111 0 8.10983 0 8.49939C0 8.88894 0.45 9.20767 1 9.20767H36.575L28.2875 15.7947C27.925 16.0957 27.8875 16.5118 28.275 16.7863C28.6625 17.0607 29.3375 17.0785 29.7 16.7951C29.7 16.7951 39.6 9.09257 39.7 9.00404C39.8 8.9155 40 8.75614 40 8.49939C40 8.24263 39.8 8.06556 39.7 7.99473C39.6 7.92391 29.7 0.20363 29.7 0.20363C29.5125 0.0708275 29.25 0 28.9875 0C28.725 0 28.475 0.0708275 28.275 0.20363Z" fill="black"/>
                                    </svg>
                                </p>
                                <p className='payment-name'>{item.message || ""}</p> 
                            </div>
                            <div className='button-position'>
                                <Link to={`/activate${item.notification_type.includes("subscription")? "/subscription": ""}`} className='notification-button'>
                                    <p>Proceed</p>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="20" viewBox="0 0 66 29" fill="none">
                                        <path d="M46.6538 0.347124C46.0144 0.815321 46.035 1.55537 46.6538 2.05378L60.3488 13.2905H1.65C0.7425 13.2905 0 13.8342 0 14.4987C0 15.1632 0.7425 15.707 1.65 15.707H60.3488L46.6744 26.9436C46.0762 27.4572 46.0144 28.167 46.6538 28.6352C47.2931 29.1034 48.4069 29.1336 49.005 28.6503C49.005 28.6503 65.34 15.5106 65.505 15.3596C65.67 15.2086 66 14.9367 66 14.4987C66 14.0607 65.67 13.7587 65.505 13.6378C65.34 13.517 49.005 0.347124 49.005 0.347124C48.6956 0.120579 48.2625 -0.000244141 47.8294 -0.000244141C47.3962 -0.000244141 46.9838 0.120579 46.6538 0.347124Z" fill="white"/>
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    )
                }
                if(item.notification_type === "approve"){
                    return(
                        <div className='notification-content'>
                            <h2>Confirm Payment</h2>
                            <p>A member has made payment to you, please confirm.</p>
                            <div className='notification-proceed'>
                                <p>Please confirm if you have been paid. Proceed to your payment portal</p>
                                
                            </div>
                            <div className='button-position'>
                                <Link to= '/dashboard/paymentapproval' className='notification-button'>
                                    <p>Proceed</p>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="20" viewBox="0 0 66 29" fill="none">
                                        <path d="M46.6538 0.347124C46.0144 0.815321 46.035 1.55537 46.6538 2.05378L60.3488 13.2905H1.65C0.7425 13.2905 0 13.8342 0 14.4987C0 15.1632 0.7425 15.707 1.65 15.707H60.3488L46.6744 26.9436C46.0762 27.4572 46.0144 28.167 46.6538 28.6352C47.2931 29.1034 48.4069 29.1336 49.005 28.6503C49.005 28.6503 65.34 15.5106 65.505 15.3596C65.67 15.2086 66 14.9367 66 14.4987C66 14.0607 65.67 13.7587 65.505 13.6378C65.34 13.517 49.005 0.347124 49.005 0.347124C48.6956 0.120579 48.2625 -0.000244141 47.8294 -0.000244141C47.3962 -0.000244141 46.9838 0.120579 46.6538 0.347124Z" fill="white"/>
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    )
                }
                if(item.notification_type === "subscription"){
                    return(
                        <div className='notification-content'>
                        <h2>Advertisement Fee</h2>
                        <p>You are expected to pay a sum of #500 for advertisement fee.</p>
                        <p> Failure to do that within the time lapse period, your account will be deactivated</p>
                        <div className='notification-proceed'>
                            <p>Make payment for your advertisement fee <svg xmlns="http://www.w3.org/2000/svg" width="40" height="17" viewBox="0 0 40 17" fill="none" style={{marginLeft :'2rem'}}>
                                <path d="M28.275 0.20363C27.8875 0.47809 27.9 0.911915 28.275 1.20408L36.575 7.79111H1C0.45 7.79111 0 8.10983 0 8.49939C0 8.88894 0.45 9.20767 1 9.20767H36.575L28.2875 15.7947C27.925 16.0957 27.8875 16.5118 28.275 16.7863C28.6625 17.0607 29.3375 17.0785 29.7 16.7951C29.7 16.7951 39.6 9.09257 39.7 9.00404C39.8 8.9155 40 8.75614 40 8.49939C40 8.24263 39.8 8.06556 39.7 7.99473C39.6 7.92391 29.7 0.20363 29.7 0.20363C29.5125 0.0708275 29.25 0 28.9875 0C28.725 0 28.475 0.0708275 28.275 0.20363Z" fill="black"/>
                                </svg>
                            </p>
                            <p className='payment-name'>{item.message || ""}</p> 
                        </div>
                        <div className='button-position'>
                            <Link to= '/dashboard/advertmoney' className='notification-button'>
                                <p>Proceed</p>
                                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="20" viewBox="0 0 66 29" fill="none">
                                    <path d="M46.6538 0.347124C46.0144 0.815321 46.035 1.55537 46.6538 2.05378L60.3488 13.2905H1.65C0.7425 13.2905 0 13.8342 0 14.4987C0 15.1632 0.7425 15.707 1.65 15.707H60.3488L46.6744 26.9436C46.0762 27.4572 46.0144 28.167 46.6538 28.6352C47.2931 29.1034 48.4069 29.1336 49.005 28.6503C49.005 28.6503 65.34 15.5106 65.505 15.3596C65.67 15.2086 66 14.9367 66 14.4987C66 14.0607 65.67 13.7587 65.505 13.6378C65.34 13.517 49.005 0.347124 49.005 0.347124C48.6956 0.120579 48.2625 -0.000244141 47.8294 -0.000244141C47.3962 -0.000244141 46.9838 0.120579 46.6538 0.347124Z" fill="white"/>
                                </svg>
                            </Link>
                        </div>
                    </div>
                    )
                }
                return (
                    <div key={index} className='notification-content'>
                        <h2 style={{textTransform:"capitalize"}}>{item.notification_type || "Notification"}</h2>
                        <p>{item.message || ""}</p>
                        <p>{moment(item?.createdAt).format('YYYY-MM-DD hh:mm:ss') || ""}</p>
                        {/* <div className='notification-proceed'>
                            <p>Make payment to upgrade your account <svg xmlns="http://www.w3.org/2000/svg" width="40" height="17" viewBox="0 0 40 17" fill="none" style={{marginLeft :'2rem'}}>
                                <path d="M28.275 0.20363C27.8875 0.47809 27.9 0.911915 28.275 1.20408L36.575 7.79111H1C0.45 7.79111 0 8.10983 0 8.49939C0 8.88894 0.45 9.20767 1 9.20767H36.575L28.2875 15.7947C27.925 16.0957 27.8875 16.5118 28.275 16.7863C28.6625 17.0607 29.3375 17.0785 29.7 16.7951C29.7 16.7951 39.6 9.09257 39.7 9.00404C39.8 8.9155 40 8.75614 40 8.49939C40 8.24263 39.8 8.06556 39.7 7.99473C39.6 7.92391 29.7 0.20363 29.7 0.20363C29.5125 0.0708275 29.25 0 28.9875 0C28.725 0 28.475 0.0708275 28.275 0.20363Z" fill="black"/>
                                </svg>
                            </p>
                            <p className='payment-name'>Charles Ayo</p> 
                        </div> */}
                        {/* <div className='button-position'>
                            <Link to= '/dashboard/makepayment' className='notification-button'>
                                <p>Proceed</p>
                                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="20" viewBox="0 0 66 29" fill="none">
                                    <path d="M46.6538 0.347124C46.0144 0.815321 46.035 1.55537 46.6538 2.05378L60.3488 13.2905H1.65C0.7425 13.2905 0 13.8342 0 14.4987C0 15.1632 0.7425 15.707 1.65 15.707H60.3488L46.6744 26.9436C46.0762 27.4572 46.0144 28.167 46.6538 28.6352C47.2931 29.1034 48.4069 29.1336 49.005 28.6503C49.005 28.6503 65.34 15.5106 65.505 15.3596C65.67 15.2086 66 14.9367 66 14.4987C66 14.0607 65.67 13.7587 65.505 13.6378C65.34 13.517 49.005 0.347124 49.005 0.347124C48.6956 0.120579 48.2625 -0.000244141 47.8294 -0.000244141C47.3962 -0.000244141 46.9838 0.120579 46.6538 0.347124Z" fill="white"/>
                                </svg>
                            </Link>
                        </div> */}
                    </div>
                )
            })}

            {/* <div className='notification-content'>
                        <h2>Level up</h2>
                        <p>You have reached the Goal for this level. so its time to level up</p>
                        <div className='notification-proceed'>
                            <p>Make payment to upgrade your account <svg xmlns="http://www.w3.org/2000/svg" width="40" height="17" viewBox="0 0 40 17" fill="none" style={{marginLeft :'2rem'}}>
                                <path d="M28.275 0.20363C27.8875 0.47809 27.9 0.911915 28.275 1.20408L36.575 7.79111H1C0.45 7.79111 0 8.10983 0 8.49939C0 8.88894 0.45 9.20767 1 9.20767H36.575L28.2875 15.7947C27.925 16.0957 27.8875 16.5118 28.275 16.7863C28.6625 17.0607 29.3375 17.0785 29.7 16.7951C29.7 16.7951 39.6 9.09257 39.7 9.00404C39.8 8.9155 40 8.75614 40 8.49939C40 8.24263 39.8 8.06556 39.7 7.99473C39.6 7.92391 29.7 0.20363 29.7 0.20363C29.5125 0.0708275 29.25 0 28.9875 0C28.725 0 28.475 0.0708275 28.275 0.20363Z" fill="black"/>
                                </svg>
                            </p>
                            <p className='payment-name'>Charles Ayo</p> 
                        </div>
                        <div className='button-position'>
                            <Link to= '/dashboard/makepayment' className='notification-button'>
                                <p>Proceed</p>
                                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="20" viewBox="0 0 66 29" fill="none">
                                    <path d="M46.6538 0.347124C46.0144 0.815321 46.035 1.55537 46.6538 2.05378L60.3488 13.2905H1.65C0.7425 13.2905 0 13.8342 0 14.4987C0 15.1632 0.7425 15.707 1.65 15.707H60.3488L46.6744 26.9436C46.0762 27.4572 46.0144 28.167 46.6538 28.6352C47.2931 29.1034 48.4069 29.1336 49.005 28.6503C49.005 28.6503 65.34 15.5106 65.505 15.3596C65.67 15.2086 66 14.9367 66 14.4987C66 14.0607 65.67 13.7587 65.505 13.6378C65.34 13.517 49.005 0.347124 49.005 0.347124C48.6956 0.120579 48.2625 -0.000244141 47.8294 -0.000244141C47.3962 -0.000244141 46.9838 0.120579 46.6538 0.347124Z" fill="white"/>
                                </svg>
                            </Link>
                        </div>
                    </div> */}
            {/* <div className='notification-content'>
                <h2>Advertisement Fee</h2>
                <p>You are expected to pay a sum of #500 for advertisement fee.</p>
                <p> Failure to do that within the time lapse period, your account will be deactivated</p>
                <div className='notification-proceed'>
                    <p>Make payment for your advertisement fee <svg xmlns="http://www.w3.org/2000/svg" width="40" height="17" viewBox="0 0 40 17" fill="none" style={{marginLeft :'2rem'}}>
                        <path d="M28.275 0.20363C27.8875 0.47809 27.9 0.911915 28.275 1.20408L36.575 7.79111H1C0.45 7.79111 0 8.10983 0 8.49939C0 8.88894 0.45 9.20767 1 9.20767H36.575L28.2875 15.7947C27.925 16.0957 27.8875 16.5118 28.275 16.7863C28.6625 17.0607 29.3375 17.0785 29.7 16.7951C29.7 16.7951 39.6 9.09257 39.7 9.00404C39.8 8.9155 40 8.75614 40 8.49939C40 8.24263 39.8 8.06556 39.7 7.99473C39.6 7.92391 29.7 0.20363 29.7 0.20363C29.5125 0.0708275 29.25 0 28.9875 0C28.725 0 28.475 0.0708275 28.275 0.20363Z" fill="black"/>
                        </svg>
                    </p>
                    <p className='payment-name'>Charles Ayo</p> 
                </div>
                <div className='button-position'>
                    <Link to= '/dashboard/makepayment' className='notification-button'>
                        <p>Proceed</p>
                        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="20" viewBox="0 0 66 29" fill="none">
                            <path d="M46.6538 0.347124C46.0144 0.815321 46.035 1.55537 46.6538 2.05378L60.3488 13.2905H1.65C0.7425 13.2905 0 13.8342 0 14.4987C0 15.1632 0.7425 15.707 1.65 15.707H60.3488L46.6744 26.9436C46.0762 27.4572 46.0144 28.167 46.6538 28.6352C47.2931 29.1034 48.4069 29.1336 49.005 28.6503C49.005 28.6503 65.34 15.5106 65.505 15.3596C65.67 15.2086 66 14.9367 66 14.4987C66 14.0607 65.67 13.7587 65.505 13.6378C65.34 13.517 49.005 0.347124 49.005 0.347124C48.6956 0.120579 48.2625 -0.000244141 47.8294 -0.000244141C47.3962 -0.000244141 46.9838 0.120579 46.6538 0.347124Z" fill="white"/>
                        </svg>
                    </Link>
                </div>
            </div>
            <div className='notification-content'>
                <h2>Confirm Payment</h2>
                <p>A member has made payment to you, please confirm.</p>
                <div className='notification-proceed'>
                    <p>Please confirm if you have been paid. Proceed to your payment portal</p>
                    
                </div>
                <div className='button-position'>
                    <Link to= '/dashboard/paymentapproval' className='notification-button'>
                        <p>Proceed</p>
                        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="20" viewBox="0 0 66 29" fill="none">
                            <path d="M46.6538 0.347124C46.0144 0.815321 46.035 1.55537 46.6538 2.05378L60.3488 13.2905H1.65C0.7425 13.2905 0 13.8342 0 14.4987C0 15.1632 0.7425 15.707 1.65 15.707H60.3488L46.6744 26.9436C46.0762 27.4572 46.0144 28.167 46.6538 28.6352C47.2931 29.1034 48.4069 29.1336 49.005 28.6503C49.005 28.6503 65.34 15.5106 65.505 15.3596C65.67 15.2086 66 14.9367 66 14.4987C66 14.0607 65.67 13.7587 65.505 13.6378C65.34 13.517 49.005 0.347124 49.005 0.347124C48.6956 0.120579 48.2625 -0.000244141 47.8294 -0.000244141C47.3962 -0.000244141 46.9838 0.120579 46.6538 0.347124Z" fill="white"/>
                        </svg>
                    </Link>
                </div>
            </div>
            <div className='notification-content'>
                <h2>Payment Confirmed</h2>
                <p>Your payment has been confirmed</p>
                <div className='notification-proceed'>
                    <p>Check your payment portal </p>
                </div>
                <div className='button-position'>
                    <Link to= '/dashboard/paymentapproval' className='notification-button'>
                        <p>Proceed</p>
                        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="20" viewBox="0 0 66 29" fill="none">
                            <path d="M46.6538 0.347124C46.0144 0.815321 46.035 1.55537 46.6538 2.05378L60.3488 13.2905H1.65C0.7425 13.2905 0 13.8342 0 14.4987C0 15.1632 0.7425 15.707 1.65 15.707H60.3488L46.6744 26.9436C46.0762 27.4572 46.0144 28.167 46.6538 28.6352C47.2931 29.1034 48.4069 29.1336 49.005 28.6503C49.005 28.6503 65.34 15.5106 65.505 15.3596C65.67 15.2086 66 14.9367 66 14.4987C66 14.0607 65.67 13.7587 65.505 13.6378C65.34 13.517 49.005 0.347124 49.005 0.347124C48.6956 0.120579 48.2625 -0.000244141 47.8294 -0.000244141C47.3962 -0.000244141 46.9838 0.120579 46.6538 0.347124Z" fill="white"/>
                        </svg>
                    </Link>
                </div>
            </div>
            <div className='notification-content'>
                <h2>Payment is Pending</h2>
                <p>Your payment is pending</p>
                <div className='notification-proceed'>
                    <p>Your payment is pending. Proceed to your payment portal to view the status</p>
                </div>
                <div className='button-position'>
                    <Link to= '/dashboard/paymentapproval' className='notification-button'>
                        <p>Proceed</p>
                        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="20" viewBox="0 0 66 29" fill="none">
                            <path d="M46.6538 0.347124C46.0144 0.815321 46.035 1.55537 46.6538 2.05378L60.3488 13.2905H1.65C0.7425 13.2905 0 13.8342 0 14.4987C0 15.1632 0.7425 15.707 1.65 15.707H60.3488L46.6744 26.9436C46.0762 27.4572 46.0144 28.167 46.6538 28.6352C47.2931 29.1034 48.4069 29.1336 49.005 28.6503C49.005 28.6503 65.34 15.5106 65.505 15.3596C65.67 15.2086 66 14.9367 66 14.4987C66 14.0607 65.67 13.7587 65.505 13.6378C65.34 13.517 49.005 0.347124 49.005 0.347124C48.6956 0.120579 48.2625 -0.000244141 47.8294 -0.000244141C47.3962 -0.000244141 46.9838 0.120579 46.6538 0.347124Z" fill="white"/>
                        </svg>
                    </Link>
                </div>
            </div>
            <div className='notification-content'>
                <h2 style={{color:"red"}}>Inactive Account</h2>
                <p>Your account is inactive, make payment to activate your account again</p>
                <div className='notification-proceed'>
                    <p>Make payment to activate your account <svg xmlns="http://www.w3.org/2000/svg" width="40" height="17" viewBox="0 0 40 17" fill="none" style={{marginLeft :'2rem'}}>
                        <path d="M28.275 0.20363C27.8875 0.47809 27.9 0.911915 28.275 1.20408L36.575 7.79111H1C0.45 7.79111 0 8.10983 0 8.49939C0 8.88894 0.45 9.20767 1 9.20767H36.575L28.2875 15.7947C27.925 16.0957 27.8875 16.5118 28.275 16.7863C28.6625 17.0607 29.3375 17.0785 29.7 16.7951C29.7 16.7951 39.6 9.09257 39.7 9.00404C39.8 8.9155 40 8.75614 40 8.49939C40 8.24263 39.8 8.06556 39.7 7.99473C39.6 7.92391 29.7 0.20363 29.7 0.20363C29.5125 0.0708275 29.25 0 28.9875 0C28.725 0 28.475 0.0708275 28.275 0.20363Z" fill="black"/>
                        </svg>
                    </p>
                    <p className='payment-name'>Charles Ayo</p> 
                </div>
                <div className='button-position'>
                    <Link to= '/dashboard/makepayment' className='notification-button'>
                        <p>Proceed</p>
                        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="20" viewBox="0 0 66 29" fill="none">
                            <path d="M46.6538 0.347124C46.0144 0.815321 46.035 1.55537 46.6538 2.05378L60.3488 13.2905H1.65C0.7425 13.2905 0 13.8342 0 14.4987C0 15.1632 0.7425 15.707 1.65 15.707H60.3488L46.6744 26.9436C46.0762 27.4572 46.0144 28.167 46.6538 28.6352C47.2931 29.1034 48.4069 29.1336 49.005 28.6503C49.005 28.6503 65.34 15.5106 65.505 15.3596C65.67 15.2086 66 14.9367 66 14.4987C66 14.0607 65.67 13.7587 65.505 13.6378C65.34 13.517 49.005 0.347124 49.005 0.347124C48.6956 0.120579 48.2625 -0.000244141 47.8294 -0.000244141C47.3962 -0.000244141 46.9838 0.120579 46.6538 0.347124Z" fill="white"/>
                        </svg>
                    </Link>
                </div>
            </div>
            <div className='notification-content'>
                <h2 style={{color:"blue"}}>Your account is active</h2>
                <p>Your account has been activated</p>
                <div className='notification-proceed'>
                    <p>Proceed to your dashboard </p>
                </div>
                <div className='button-position'>
                    <Link to= '/dashboard' className='notification-button'>
                        <p>Proceed</p>
                        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="20" viewBox="0 0 66 29" fill="none">
                            <path d="M46.6538 0.347124C46.0144 0.815321 46.035 1.55537 46.6538 2.05378L60.3488 13.2905H1.65C0.7425 13.2905 0 13.8342 0 14.4987C0 15.1632 0.7425 15.707 1.65 15.707H60.3488L46.6744 26.9436C46.0762 27.4572 46.0144 28.167 46.6538 28.6352C47.2931 29.1034 48.4069 29.1336 49.005 28.6503C49.005 28.6503 65.34 15.5106 65.505 15.3596C65.67 15.2086 66 14.9367 66 14.4987C66 14.0607 65.67 13.7587 65.505 13.6378C65.34 13.517 49.005 0.347124 49.005 0.347124C48.6956 0.120579 48.2625 -0.000244141 47.8294 -0.000244141C47.3962 -0.000244141 46.9838 0.120579 46.6538 0.347124Z" fill="white"/>
                        </svg>
                    </Link>
                </div>
            </div> */}

            
        </div>

    </div>
  )
}

export default Notification