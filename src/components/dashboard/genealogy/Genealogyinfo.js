import React, { useContext, useEffect, useState } from 'react'
import Logo from '../../assets/fggc.png'
import { AuthContext } from '../../../context/auth-context';
import { useHttpClient } from '../../../hooks/less-http-hook';
import { useParams } from 'react-router-dom';

const Genealogyinfo = () => {

    const auth = useContext(AuthContext);
    const {id} = useParams()
    const myProfile = JSON.parse(localStorage.getItem('myData'));
    const userData = JSON.parse(localStorage.getItem('userData'));
    const [details, setDetails] = useState(null)

    const {isLoading, sendRequest} = useHttpClient();


    useEffect(() => {
        const activateHandler = async() => {
            try {
        
                const response = await sendRequest(`${process.env.REACT_APP_URL}user/get-user?user_id=${id}`, 'GET', null, {'Authorization': `Bearer ${userData.token}`});
                
                if (response) {
                  console.log(response)
                  setDetails(response.data)
                }
    
              } catch (error) {
                console.error( error.message);
                // Handle other errors (e.g., network error)
        
              }
        }

        activateHandler()
    },[userData.token, sendRequest, id])


  return (
    <div className='userdetails-container'>
        
    <div className='userdetails-cover'>
        <div className='userdetails-logo'>
            <img src={Logo} alt='' />
        </div>
        <div className='userdetails-content'>
            <h3>{details?.profile?.first_name || ""} {details?.profile?.last_name || ""}</h3>
            <div className='userdetails-line'></div>
            <div className='userdetails-info'>
                <p>Account name</p>
                <p>{details?.wallet?.account_name || "Not set"}</p>
            </div>
            <div className='userdetails-info'>
                <p>Account number</p>
                <p>{details?.wallet?.account_number || "Not set"}</p>
            </div>
            <div className='userdetails-info'>
                <p>Bank</p>
                <p>{details?.wallet?.account_bank || "Not set"}</p>
            </div>
            {/* <div className='userdetails-info'>
                <p>Email</p>
                <p>{details?.profile?.email || ""}</p>
            </div> */}
            <div className='userdetails-info'>
                <p>Phone Number</p>
                <p>{details?.profile?.phone_number || ""}</p>
            </div>
        </div>
    </div>

</div>
  )
}

export default Genealogyinfo