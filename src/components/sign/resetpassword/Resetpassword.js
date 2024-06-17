import React, { useState } from 'react'
import Logo from '../../assets/fggc.png'
import './Resetpassword.css'
import { Link, useNavigate } from 'react-router-dom'
import { useHttpClient } from '../../../hooks/http-hook'


const Resetpassword = () => {
    const [formData, setFormData] = useState({
        new_password: '',
        confirm_password: ''
    });

    const navigate = useNavigate()

    const {isLoading, sendRequest} = useHttpClient();
    const userData = JSON.parse(localStorage.getItem('userData'));

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = JSON.stringify({
            password: formData.new_password,
            confirm_password: formData.confirm_password
        })
        
        try {
            const response = await sendRequest(`${process.env.REACT_APP_URL}user/update-password`, 'POST', data, {
                'Authorization': `Bearer ${userData.token}`,
                'Content-type': 'application/json'});
            
            if(response.status){
                console.log(response)
                navigate('/signin')
            }
            
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

  return (
    <div className='resetpassword-container'>
        <div className='resetpassword-logo'>
            <img src={Logo} alt='logo' />
        </div>
        <div className='resetpassword-input'>
            <div className='resetpassword-content'>
                <h2>Password reset</h2>
                 <p>Please create your new password</p>
            </div>
           
            <div>
                <div className='resetpassword-label'>
                    <label htmlFor='password'>New Password</label>
                    <input type='password' onChange={handleChange} id='new_password' name='new_password' placeholder='Enter your Password' aria-labelledby='new_password' required/>
                </div>
                <div className='resetpassword-label'>
                    <label htmlFor='confirm-password'>Confirm Password</label>
                    <input type='password' onChange={handleChange} id='confirm_password' name='confirm_password' placeholder='Confirm Password' aria-labelledby='confirm_password' required/>
                </div>
                <div className='resetpassword-button'>
                    <button onClick={e => handleSubmit(e)}>{isLoading ? "loading" : "Continue"}</button>
                </div>
                <div className='resetpassword-account'>
                    <Link to='/signin' className='resetpassword-signin'>back to Log In</Link>
                    <p>Don’t have an account?  <Link to='/signup' className='resetpassword-signup'>Create account</Link></p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Resetpassword