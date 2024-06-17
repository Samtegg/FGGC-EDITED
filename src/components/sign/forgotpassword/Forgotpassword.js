import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../assets/fggc.png';
import './Forgotpassword.css';
import { useHttpClient } from '../../../hooks/http-hook';

const Forgotpassword = () => {
  const [recoveryCode, setRecoveryCode] = useState('');
  const [username, setUsername] = useState('');

  const navigate = useNavigate()

  const handleRecoveryCodeChange = (e) => {
    setRecoveryCode(e.target.value);
  };
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const {isLoading, sendRequest} = useHttpClient();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Send a request to the backend to initiate the password recovery process
      // You can use fetch or axios for this purpose

      const data = JSON.stringify({
        username: username,
        recovery_code: recoveryCode
      })

      const response = await sendRequest(`${process.env.REACT_APP_URL}auth/forgotpassword`, 'POST', data, {'Content-Type': 'application/json'});

      if (response.status) {
        // Handle successful response
        console.log('Recovery code sent successfully');

        // Redirect the user to the reset password page
        // You may need to implement this route
        localStorage.setItem(
          'userData',
          JSON.stringify({
            userId: response.data._id,
            token: response.data.token,
            expiration: new Date(new Date().getTime() + 1000 * 60 * 60)
          })
        );
        navigate('/resetpassword');
      } else {
        // Handle error response
        console.error('Failed to send recovery code');
        // Display an error message to the user
        // You can set a state variable to manage error messages and display them in the UI
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='forgotpassword-container'>
      <div className='forgotpassword-heading'>
        <Link to='/' className='logo'>
          <img src={Logo} alt='logo' />
        </Link>
        <div className='forgotpassword-headingtext'>
          <h3>Forgot Password</h3>
        </div>
      </div>
      <div className='forgotpassword-content'>
        <form onSubmit={handleSubmit} className='forgotpassword-box'>
          <div className='forgotpassword-codebox'>
            <input
              type='text'
              id='username'
              name='username'
              value={username}
              onChange={handleUsernameChange}
              placeholder='Username'
              aria-labelledby='username'
              required
            />
          </div>
          <div className='forgotpassword-codebox' style={{marginTop:"10px"}}>
            <input
              type='text'
              id='recoveryCode'
              name='recoveryCode'
              value={recoveryCode}
              onChange={handleRecoveryCodeChange}
              placeholder='Recovery code'
              aria-labelledby='recoveryCode'
              required
            />
          </div>
          <div className='forgotpassword-text'>
            <p>Please input your recovery code to enable you to get a new password</p>
          </div>
          <div className='forgotpassword-button'>
            <button type='submit'>{isLoading ? "loading" : "Continue"}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Forgotpassword;
