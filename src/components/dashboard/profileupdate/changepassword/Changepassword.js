import React, { useState } from 'react'
import Logo from '../../../assets/fggc.png'
import '../Profileupdate.css'
import { useHttpClient } from '../../../../hooks/less-http-hook';

const Changepassword = () => {
    const [formData, setFormData] = useState({
        new_password: '',
        confirm_password: ''
    });

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
            }
            
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };


  return (
    <div className='profileupdate-container'>
        <div className='profileupdate-navbar'>
            <img src={Logo} alt=''style={{width: 'auto', height: '80px', marginTop:'5px'}}/>
            <h2>Change Password</h2>
        </div>
        <div className='profileupdate-content'>
        <form onSubmit={handleSubmit}>
            <div className='profileupdate-info'>
                <div className='profileupdate-input' >
                    <div className='profileupdate-detail' style={{ marginBottom:'1rem'}}>
                        <label htmlFor='new_password'>New Password</label>
                    </div>
                    <input type='text' id='new_password' name='new_password' 
                    placeholder='' aria-labelledby='new_password' 
                    value={formData.new_password}
                    onChange={handleChange} 
                    required/>
                    <div className='profileupdate-detail' style={{marginTop:'2rem', marginBottom:'1rem'}}>
                        <label htmlFor='confirm_password'>Confirm Password</label>
                    </div>
                    <input type='text' id='confirm_password' name='confirm_password' 
                    placeholder='' aria-labelledby='confirm_password' 
                    value={formData.confirm_password}
                    onChange={handleChange} 
                    required/>
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
  )
}

export default Changepassword