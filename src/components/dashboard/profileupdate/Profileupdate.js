import React, { useEffect, useState } from 'react';
import Logo from '../../assets/fggc.png';
import './Profileupdate.css';
import { Link } from 'react-router-dom';
import { useHttpClient } from '../../../hooks/less-http-hook';

const Profileupdate = () => {
    const [formData, setFormData] = useState({
        username: '',
        phone_number: '',
        first_name: '',
        last_name: ''
    });
    const [details, setDetails] = useState(null)

    const userData = JSON.parse(localStorage.getItem('userData'));
    const {isLoading, sendRequest} = useHttpClient();

    useEffect(() => {
        const fetchData = async() => {
            try {
        
                const response = await sendRequest(`${process.env.REACT_APP_URL}user/profile`, 'GET', null, {'Authorization': `Bearer ${userData.token}`});
                
                if (response.status) {
                  setDetails(response.data)
                  setFormData({
                    username: response?.data?.profile?.username || '',
                    phone_number: response?.data?.profile?.phone_number || '',
                    first_name: response?.data?.profile?.first_name || '',
                    last_name: response?.data?.profile?.last_name || ''
                  })
                }
    
              } catch (error) {
                console.error( error.message);
                // Handle other errors (e.g., network error)
        
              }
        }

        fetchData()
    },[userData.token, sendRequest])

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = JSON.stringify({
            username: formData.username,
            phone_number: formData.phone_number,
            first_name: formData.first_name,
            last_name: formData.last_name
        })
        
        try {
            const response = await sendRequest(`${process.env.REACT_APP_URL}user/update-profile`, 'POST', data, {
                'Authorization': `Bearer ${userData.token}`,
                'Content-type': 'application/json'});
            
            if(response.status){
                setDetails(response.data)
            }
            
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    return (
        <div className='profileupdate-container'>
            <div className='profileupdate-navbar'>
                <Link to='/dashboard' className='logo'>
                    <img src={Logo} alt='' />
                </Link>
                <h2>Profile Update</h2>
            </div>
            <div className='profileupdate-content'>
                <form onSubmit={handleSubmit}>
                    <h3>Your Profile Information</h3>
                    <div className='profileupdate-info'>
                        <h4>Personal Information</h4>
                        <div className='profileupdate-input'>
                            <label htmlFor='username'>Username: {details?.profile?.username || ""}</label>
                            <input
                                type='text'
                                id='username'
                                name='username'
                                placeholder='Username'
                                value={formData.username}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className='profileupdate-input'>
                            <label htmlFor='phone_number'>Phone number: {details?.profile?.phone_number || ""}</label>
                            <input
                                type='text'
                                id='phone_number'
                                name='phone_number'
                                placeholder='Phone number'
                                value={formData.phone_number}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className='profileupdate-input'>
                            <label htmlFor='email'>First Name: {details?.profile?.first_name || ""}</label>
                            <input
                                type='text'
                                id='first_name'
                                name='first_name'
                                placeholder='First Name'
                                value={formData.first_name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className='profileupdate-input'>
                            <label htmlFor='email'>Last Name: {details?.profile?.last_name || ""}</label>
                            <input
                                type='text'
                                id='last_name'
                                name='last_name'
                                placeholder='Last Name'
                                value={formData.last_name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                    </div>
                    <div className='profileupdate-info'>
                        <h4>Security</h4>
                        <div className='profileupdate-input' >
                            <div className='profileupdate-detail'>
                                <p>Change Password</p>
                                <Link to='/dashboard/profileupdate/changepassword' >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="18" viewBox="0 0 16 28" fill="none">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M2.23535 28L0 25.7264L11.5293 14L0 2.27357L2.23535 0L16 14L2.23535 28Z" fill="#5C5C5C"/>
                                    </svg>
                                </Link>
                    </div>
                </div>
            </div>
                    <div className='profileupdate-button'>
                        <button type='submit'>
                            <p>{isLoading ? "loading..." : "Save"}</p>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Profileupdate;
