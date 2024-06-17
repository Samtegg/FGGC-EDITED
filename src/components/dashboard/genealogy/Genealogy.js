import React, { useContext, useEffect, useState } from 'react'
import './Genealogy.css'
import Logo from "../../assets/fggc.png"
import { Link, useNavigate } from 'react-router-dom'
import { useHttpClient } from '../../../hooks/less-http-hook'
import { AuthContext } from '../../../context/auth-context'
import moment from 'moment'

const Genealogy = () => {
    
    const navigate = useNavigate()
    const auth = useContext(AuthContext);
    const myProfile = JSON.parse(localStorage.getItem('myData'));
    const userData = JSON.parse(localStorage.getItem('userData'));

    const [details, setDetails] = useState(null)

    const {isLoading, sendRequest} = useHttpClient();


    useEffect(() => {
        const activateHandler = async() => {
            try {
        
                const response = await sendRequest(`${process.env.REACT_APP_URL}user/get-members`, 'GET', null, {'Authorization': `Bearer ${userData.token}`});
                
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
    },[userData.token, sendRequest])

    
    const userInfoHandler = (id) => {
        navigate(`/dashboard/genealogy/userinfo/${id}`)
    }

  return (
    <div className='genealogy-container'>
        <div className='genealogy-heading'>
            <Link to='/dashboard' className='logo'>
                <img src={Logo} alt='logo' />
            </Link>
            <h2>First Golden Gifted Club GENEALOGY </h2>
        </div>
        <div className='genealogy-content'>
            <div className='genealogy-contentlist'>
                <div className='genealogy-searchbox'>
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="31" viewBox="0 0 30 31" fill="none">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M13.75 25.834C19.9632 25.834 25 20.6293 25 14.209C25 7.78867 19.9632 2.58398 13.75 2.58398C7.5368 2.58398 2.5 7.78867 2.5 14.209C2.5 20.6293 7.5368 25.834 13.75 25.834Z" stroke="#5C5C5C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M27.5 28.4167L22.5 23.25" stroke="#5C5C5C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <p>Search</p>
                    </div>
                </div>
                <div className='genealogy-line'></div>
                <div className='genealogy-count'>
                     <p>Members count: {details?.members_count || 0}</p>
                </div>
               {isLoading && <p>Loading ...</p>}
               {details && details?.user_members.map((item, index) => {
                    return(
                        <div className='genealogy-details'>
                            <div>
                                <p className='genealogy-name'>{item?.first_name || ""} {item?.last_name || ""}</p>
                                <p className='genealogy-date'>Created: {moment(item?.createdAt || "").format('DD/MM/YYYY')}</p>
                            </div>
                            <p onClick={() => userInfoHandler(item.user_id)} className='genealogy-checkinfo'>Check info</p>
                        </div>
                    )
               })}
                
                
            </div>
        </div>
    </div>
  )
}

export default Genealogy