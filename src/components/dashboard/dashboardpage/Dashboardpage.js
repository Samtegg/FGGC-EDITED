import  { useContext, useEffect, useState } from 'react'
import Logo from '../../assets/fggc.png'
import './Dashboardpage.css'
import { FaBars,  FaTimes } from 'react-icons/fa'
import Dashlevelcard from './dashlevelcard/Dashlevelcard'
import './Dashboardpage.css'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { AuthContext } from '../../../context/auth-context'
import { useHttpClient } from '../../../hooks/less-http-hook'
import Countdown from "react-countdown";
import { number_format } from '../../../util/functions'
import { IoNotificationsSharp } from 'react-icons/io5'
import { MdNotificationAdd } from "react-icons/md";


const Dashboardpage = () => {
  const auth = useContext(AuthContext)
  const [myProfile, setmyProfile] = useState(() => {
    const storedData = localStorage.getItem('myData');
    if (storedData && storedData !== "undefined") {
      try {
          return JSON.parse(storedData);
      } catch (error) {
          console.error("Error parsing JSON:", error);
          auth.logout()
          return null;
      }
  }

  return null;
    // return storedData ? JSON.parse(storedData) : null;
});
  
  const [click, setClick] = useState(false);
  const [transactionDetails, setTransactionDetails] = useState(null);
  const [levelDetails, setLevelDetails] = useState(null);
  const [notifciaionDetails, setNotificationDetails] = useState(false);

  const handleClick = () => setClick(!click)
  const createdAt = myProfile?.createdAt || "";
  const formattedDate = moment(createdAt).format('YYYY-MM-DD');
  const currentDateTime = moment();
  const formattedDateTime = currentDateTime.format('YYYY-MM-DD HH:mm:ss')

   
  const {isLoading, sendRequest} = useHttpClient();

  useEffect(() => {
    const fetchData = async () => {
      
      try {
        
        const [responseUser, responseTransaction, responseLevel, responseNotifications] = await Promise.all([
          sendRequest(`${process.env.REACT_APP_URL}user/profile`, 'GET', null, {'Authorization': `Bearer ${auth.token}`}),
          sendRequest(`${process.env.REACT_APP_URL}payment/transactions`, 'GET', null, {'Authorization': `Bearer ${auth.token}`}),
          sendRequest(`${process.env.REACT_APP_URL}level/get-levels`, 'GET', null, {'Authorization': `Bearer ${auth.token}`}),
          sendRequest(`${process.env.REACT_APP_URL}user/notifications`, 'GET', null, {'Authorization': `Bearer ${auth.token}`})
        ]);

        if(responseTransaction){
          setTransactionDetails(responseTransaction.data)
        }

        if(responseLevel){
          setLevelDetails(responseLevel.data)
        }

        if(responseUser){
          localStorage.setItem('myData', JSON.stringify(responseUser.data))
          setmyProfile(responseUser.data)
        }

        if(responseNotifications){
          for (const element of responseNotifications.data.notifications) {
            if(element.read_status === false){
              return setNotificationDetails(true)
              
            }
          };
          
        }

          
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData(); // Call fetchData function immediately
  }, [auth.token, sendRequest])


  const now = new Date();
  // const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0, 0)
  const endOfDay = new Date(now.getTime() + 60 * 60 * 1000);

  const levelNumber = myProfile?.level_id?.level_number || 0;
  const isBelowLevel = 1 <= levelNumber;

  return (
    <div className='dashboard-container'>      
      <div className='hamburger' onClick={handleClick}>
        {click? <FaTimes size={25} style={{color: 'var(--primary-brown'}} /> : <FaBars size={20} style={{color:'var(--primary-brown'}}/>}
      </div>
      <nav className={click? 'dashboard-heading active' : 'dashboard-heading'}>
        <img src= {Logo} alt='Logo'/>
        <div className='dashborad-headingicon'>
          <p>Total No Of Members in FGGC: {myProfile?.all_members_count || "Loading..."}</p>
          {myProfile?.assigned_members?.upgrade_date !== null && 
          <div className='dashboard-timeout'>
            <Link to='/activate' className='payment-link'>
              <h5>Make payment <span>( you have 1 hour to do so)</span></h5>
              <Countdown 
                // date={myProfile?.assigned_members?.upgrade_date ? new Date(myProfile?.assigned_members?.upgrade_date).setDate(new Date(myProfile?.assigned_members?.upgrade_date).getDate() + 1) : endOfDay.getTime()} 
              date={myProfile?.assigned_members?.upgrade_date ? new Date(new Date(myProfile.assigned_members.upgrade_date).getTime() + 60 * 60 * 1000) : endOfDay.getTime()}
              renderer={({ hours, minutes, seconds }) => (
              <p>
                {hours}:{minutes}:{seconds}
              </p>
            )}/>
            </Link>
          </div>
          }

          {notifciaionDetails ?  <Link to='/notification'>
          <MdNotificationAdd 
          style={{
            width:"30",
             height:"30",
             color: "red"
          }} />
          </Link> : <Link to='/notification'>
          <MdNotificationAdd 
          style={{
            width:"30",
             height:"30",
             color: "red"
          }} />
          </Link> }
          
          <p>{myProfile?.username || ""} </p>

        </div>

      </nav>
      <div className='dashboard-content'>
        <div className= {click? 'dashboard-leftbar active' : 'dashboard-leftbar'}>
          <p>Main Menu {isLoading && "(Loading dashboard)" }</p>
          <div className='leftbar-mainmenu'>
            <Link to='/dashboard' className='leftbar-link'>Overview</Link>
            <Link to='/dashboard/constitution' className='leftbar-link'>Constitution</Link>
            <Link to='/dashboard/paymentapproval' className='leftbar-link'>Payments</Link>
            <Link to='/dashboard/profileupdate' className='leftbar-link'>Profile Update</Link>
            <Link to='/dashboard/accountupdate' className='leftbar-link accountupdate-link'>
              <p>Account Update</p>
              <p className='leftbar- '>(Please update your account)</p>
            </Link>
            
            <Link to='/dashboard/genealogy' className='leftbar-link'>Genology</Link>
            <Link to='/supportticket' className='leftbar-link'>Support Ticket</Link>

          </div>
          <div className='leftbar-upgrade'>
            <h4>Upgrade to Level {myProfile?.level_id?.level_number + 1 || "2"}!</h4>
            <p>Level up and earn more by standing a chance to double your in come</p>
            <p>Total No Of Members in FGGC: {myProfile?.all_members_count || "Loading..."}</p>
            <Link to='/activate  ' className='dashboard-upgrade'>Upgrade</Link>
          </div>
          <div onClick={() => auth.logout()} className='leftbar-logout'>
            <p>Log out</p>
          </div>

          
         
        </div>

        <div className='dashboard-rightbar'>
          <h2>Overview</h2>
          {myProfile?.profile?.deleted_at || myProfile?.level_id?.level_number  === undefined ?
          <div style={{color:'white', 
          background:'#FA0000', 
          borderRadius:'10px', 
          width:'220px', 
          padding: '0.5rem', 
          marginBottom: '1rem', 
          textAlign: 'left'
          }}>Your account is inactive <br/>(Make payment to activate your account)</div> : 
          <div style={{color:'white', 
          background:'#27C500', 
          borderRadius:'10px', 
          width:'230px', 
          padding: '0.5rem', 
          marginBottom: '1rem', 
          textAlign: 'left'
          }}>Your account is active<br/>(Make payment before the 1hour count, not to go inactive and face penalty)</div>}
          <div className='dashboard-calender'>
            <div className='calender-content'>
              
              <h3>{myProfile?.username || ""} </h3>
              <p>Created:{formattedDate}</p>
            </div>
            <div className='calender-icon'>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M19 22H5C3.89543 22 3 21.1046 3 20V6C3 4.89543 3.89543 4 5 4H7V2H9V4H15V2H17V4H19C20.1046 4 21 4.89543 21 6V20C21 21.1046 20.1046 22 19 22ZM5 10V20H19V10H5ZM5 6V8H19V6H5ZM17 18H15V16H17V18ZM13 18H11V16H13V18ZM9 18H7V16H9V18ZM17 14H15V12H17V14ZM13 14H11V12H13V14ZM9 14H7V12H9V14Z" fill="#343A40"/>
              </svg>
              <p>{formattedDateTime}</p>
            </div>
          </div>
          <div className='wallet-container'>
            <div className='dashboard-wallet'>
              <h2>₦{number_format(myProfile?.wallet?.balance || 0)}</h2>
              <p>First Golden Gifted club wallet</p>
              <h4>Level {myProfile?.level_id?.level_number || "0"}</h4>
            </div>
          </div>
          <div className='dashboard-pay'>
            <div className='pay payout'>
              <h4>Payout</h4>
              {
                transactionDetails && transactionDetails.filter(item => item.transaction_type === "debit" && item.transaction_status === "success" ).slice(0, 5).map((item, index) => {
                  
                  return (
                      <div className='payout-content' key={index}>
                        <div>
                          <p className='payout-name' style={{fontWeight:"700"}}>₦{item.amount || ""}</p>
                          <p className='payout-date'>{moment(item?.createdAt || "").format("MMM DD, YYYY | hh:mm:ss A") || moment() || ""}</p>
                        </div>
                        <div className='payout-svg'>
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="23" viewBox="0 0 24 23" fill="none">
                            <ellipse cx="12" cy="11.4998" rx="12" ry="11.5" fill="#D55151"/>
                            <path d="M12.8348 16.2298C13.1541 15.9238 13.4735 15.6177 13.7928 15.3117C14.1601 14.9598 14.5273 14.6078 14.8945 14.2559C15.0291 14.1269 15.1637 13.998 15.2983 13.869C15.4123 13.7597 15.5264 13.6504 15.6404 13.5411C15.7522 13.434 15.8594 13.3269 15.9164 13.1804C16.026 12.9007 15.9576 12.5772 15.7456 12.3609C15.5335 12.1489 15.2097 12.0659 14.9155 12.1512C14.7239 12.2081 14.5916 12.3305 14.4547 12.4617C14.3703 12.5425 14.2837 12.6256 14.1993 12.7065C13.8571 13.0344 13.515 13.3623 13.1728 13.6902C13.1383 13.7232 13.0793 13.6998 13.0793 13.653C13.0794 13.1963 13.0795 12.7366 13.0796 12.2805C13.0797 11.839 13.0798 11.3932 13.0799 10.9517C13.08 10.5408 13.08 10.1299 13.0801 9.7147C13.0802 9.30382 13.0803 8.89731 13.0804 8.48643C13.0804 8.17609 13.0805 7.86574 13.0828 7.55321C13.0828 7.4789 13.0829 7.40897 13.0829 7.33466C13.0806 7.05273 12.9279 6.79268 12.6725 6.65285C12.4057 6.50647 12.0636 6.51527 11.8082 6.68142C11.5824 6.82789 11.4478 7.07488 11.4477 7.33714C11.4477 7.56444 11.4476 7.79173 11.4476 8.01903C11.4475 8.43428 11.4474 8.84953 11.4451 9.26696C11.4427 9.71937 11.4449 10.1718 11.4425 10.6242C11.4424 11.1356 11.4423 11.647 11.4399 12.1606C11.4375 12.6436 11.4397 13.1266 11.4373 13.6096C11.4373 13.6725 11.358 13.704 11.3115 13.6595C11.184 13.5373 11.0558 13.4144 10.9288 13.2928C10.7373 13.1093 10.5435 12.9235 10.352 12.74C10.2745 12.6657 10.1992 12.5936 10.1217 12.5193C9.98944 12.3925 9.86403 12.2549 9.68845 12.1828C9.38288 12.0561 9.02026 12.1239 8.78532 12.349C8.55037 12.5742 8.48189 12.9239 8.61182 13.2145C8.67565 13.3588 8.78737 13.4615 8.8991 13.5685C9.02451 13.6887 9.14991 13.8089 9.27532 13.9291C9.42125 14.0689 9.56945 14.211 9.71538 14.3508C9.89095 14.5191 10.0688 14.6895 10.2444 14.8578C10.4587 15.0632 10.6753 15.2707 10.8896 15.4761C11.0492 15.6291 11.2089 15.7821 11.3685 15.935C11.4665 16.029 11.5623 16.1208 11.6603 16.2147C11.8518 16.3983 12.1164 16.49 12.3855 16.4462C12.5565 16.4222 12.7139 16.3457 12.8348 16.2298Z" fill="white"/>
                          </svg>
                        </div>
                      </div>
                    
                  )
                })
              }
              
              <div className='pay-details'>
                <p><Link to= "/dashboard/payoutportal" >SEE DETAILS</Link> </p>
                <svg xmlns="http://www.w3.org/2000/svg" width="27" height="24" viewBox="0 0 27 24" fill="none">
                  <path fillRule="evenodd" clipRule="evenodd" d="M9.63283 5.48252C10.0639 5.15186 10.699 5.17551 11.1014 5.55345L17.3138 11.3958C17.5221 11.5916 17.6348 11.8536 17.6348 12.1254C17.6348 12.3973 17.5223 12.6588 17.3138 12.8553L11.1013 18.6975C10.6722 19.1005 9.97753 19.1005 9.54952 18.6975C9.12023 18.2942 9.12023 17.6409 9.54939 17.2379L14.9856 12.1254L9.54952 7.01303C9.14709 6.63505 9.12191 6.0372 9.47402 5.63177L9.54947 5.55338L9.63283 5.48252Z" fill="#343A40"/>
                </svg>
              </div>
              
            </div>
            <div className='pay received'>
              <h4 >Payment Received</h4>
              {
                transactionDetails && transactionDetails.filter(item => item.transaction_type === "credit" && item.transaction_status === "success" ).slice(0, 5).map((item, index) => {
                  
                  return (
                      <div className='received-content' key={index} >
                        <div>
                          <p className='received-name' style={{fontWeight:"700"}}>₦{item.amount || ""}</p>
                          <p className='received-date'>{moment(item?.createdAt || "").format("MMM DD, YYYY | hh:mm:ss A") || moment() || ""}</p>
                        </div>
                        <div className='received-svg'>
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="23" viewBox="0 0 24 23" fill="none">
                            <ellipse cx="12" cy="11.4998" rx="12" ry="11.5" fill="#51CF66"/>
                            <path d="M12.8348 6.77899C13.1541 7.08502 13.4735 7.39105 13.7928 7.69709C14.1601 8.04902 14.5273 8.40096 14.8945 8.7529C15.0291 8.88187 15.1637 9.01084 15.2983 9.13981C15.4123 9.24911 15.5264 9.3584 15.6404 9.4677C15.7522 9.57481 15.8594 9.68192 15.9164 9.82836C16.026 10.1081 15.9576 10.4316 15.7456 10.6479C15.5335 10.8599 15.2097 10.9429 14.9155 10.8576C14.7239 10.8007 14.5916 10.6783 14.4547 10.5471C14.3703 10.4663 14.2837 10.3832 14.1993 10.3023C13.8571 9.97442 13.515 9.64653 13.1728 9.31864C13.1383 9.28557 13.0793 9.30899 13.0793 9.35576C13.0794 9.81246 13.0795 10.2722 13.0796 10.7283C13.0797 11.1698 13.0798 11.6156 13.0799 12.0571C13.08 12.468 13.08 12.8788 13.0801 13.2941C13.0802 13.705 13.0803 14.1115 13.0804 14.5224C13.0804 14.8327 13.0805 15.143 13.0828 15.4556C13.0828 15.5299 13.0829 15.5998 13.0829 15.6741C13.0806 15.9561 12.9279 16.2161 12.6725 16.3559C12.4057 16.5023 12.0636 16.4935 11.8082 16.3274C11.5824 16.1809 11.4478 15.9339 11.4477 15.6716C11.4477 15.4444 11.4476 15.2171 11.4476 14.9898C11.4475 14.5745 11.4474 14.1593 11.4451 13.7418C11.4427 13.2894 11.4449 12.837 11.4425 12.3846C11.4424 11.8732 11.4423 11.3618 11.4399 10.8482C11.4375 10.3652 11.4397 9.88218 11.4373 9.39918C11.4373 9.33626 11.358 9.30476 11.3115 9.34925C11.184 9.47149 11.0558 9.59436 10.9288 9.71599C10.7373 9.89954 10.5435 10.0853 10.352 10.2688C10.2745 10.3431 10.1992 10.4152 10.1217 10.4895C9.98944 10.6163 9.86403 10.7539 9.68845 10.826C9.38288 10.9527 9.02026 10.8849 8.78532 10.6597C8.55037 10.4346 8.48189 10.0849 8.61182 9.79424C8.67565 9.65001 8.78737 9.54731 8.8991 9.44024C9.02451 9.32006 9.14991 9.19988 9.27532 9.0797C9.42125 8.93985 9.56945 8.79782 9.71538 8.65797C9.89095 8.48972 10.0688 8.31928 10.2444 8.15103C10.4587 7.94563 10.6753 7.73804 10.8896 7.53264C11.0492 7.37968 11.2089 7.22673 11.3685 7.07377C11.4665 6.97981 11.5623 6.88803 11.6603 6.79407C11.8518 6.61053 12.1164 6.51878 12.3855 6.56254C12.5565 6.58661 12.7139 6.66314 12.8348 6.77899Z" fill="white"/>
                          </svg>
                        </div>
                      </div>
                    
                  )
                })
              }
              
              <div className='pay-details'>
                <p><Link to= "/dashboard/receivedportal" >SEE DETAILS</Link></p>
                <svg xmlns="http://www.w3.org/2000/svg" width="27" height="24" viewBox="0 0 27 24" fill="none">
                  <path fillRule="evenodd" clipRule="evenodd" d="M9.63283 5.48252C10.0639 5.15186 10.699 5.17551 11.1014 5.55345L17.3138 11.3958C17.5221 11.5916 17.6348 11.8536 17.6348 12.1254C17.6348 12.3973 17.5223 12.6588 17.3138 12.8553L11.1013 18.6975C10.6722 19.1005 9.97753 19.1005 9.54952 18.6975C9.12023 18.2942 9.12023 17.6409 9.54939 17.2379L14.9856 12.1254L9.54952 7.01303C9.14709 6.63505 9.12191 6.0372 9.47402 5.63177L9.54947 5.55338L9.63283 5.48252Z" fill="#343A40"/>
                </svg>
              </div>
              
            </div>
          </div>

          <div className='dashboard-level'>
            <div className='level-heading'>
                <h3>Levels</h3>
            </div>
            <div className='level-cards center-cards'>
                {levelDetails && levelDetails.slice(0,10).map((item, index) => {
                  return(
                    <Dashlevelcard className={isBelowLevel && item?.level_number <= levelNumber && 'ash-back' } level={item?.level_number || '1'} money={item?.member_amount || "0"} upgrade_money={item?.upgrade_amount || "0"} members={item?.members_number || '0'}  key={index}/>
                  )
                })}
                
                {/* <Dashlevelcard level='2' money='2000' members='2'  />
                <Dashlevelcard level='3' money='4000' members='2'  />
                <Dashlevelcard level='4' money='8000' members='2'  />
                <Dashlevelcard level='5' money='16000' members='2'  />
                <Dashlevelcard level='6' money='32000' members='2'  />
                <Dashlevelcard level='7' money='64000' members='2'  />
                <Dashlevelcard level='8' money='128000' members='2'  />
                <Dashlevelcard level='9' money='256000' members='2'  />
                <Dashlevelcard level='10' money='512000' members='2'  /> */}
            </div>
            <div className='potential'>
                <p>Total potential amount generated from Level 2 to Level 10=#698,028,000</p>
            </div>
          </div>

        </div>
      </div>

    </div>
  )
}

export default Dashboardpage