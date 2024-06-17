import React, { useContext } from 'react';
import './Signin.css';
import Logo from '../../assets/fggc.png';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../../../context/auth-context';
import {useHttpClient} from '../../../hooks/http-hook';
import Loader from '../../fragments/loader/Loader';



const Signin = () => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  const {isLoading, sendRequest} = useHttpClient();

  


  const signInSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: signInSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const data = JSON.stringify(values)

        const response = await sendRequest(`${process.env.REACT_APP_URL}auth/login`, 'POST', data, {'Content-Type': 'application/json'});
        
        if (response.status) {
          // Login successful, navigate to dashboard
          auth.login(response.data._id, response.data.token);
          localStorage.setItem('myData',JSON.stringify(response.data))

          if(response.data.assigned_members.upline_paid === false && response.data.level_id === null){
            navigate('/signup/activate');
          }
          else if(response.data.assigned_members.upline_paid === false && response.data.profile.isAdmin === false){
            navigate('/signup/activate');
          }
          else{
            navigate('/dashboard');
          }
          
        } else {
          // Handle other response statuses (e.g., unauthorized)
          console.error('Login failed:', response.data.message);
          
        }
      } catch (error) {
        console.error('Error during login:', error.message);
        // Handle other errors (e.g., network error)

      }
    },
  });
  

  return (
    <div className='signin-container'>
      <div className='signin-heading'>
        <Link to='/' className='logo'>
          <img src={Logo} alt='logo' />
        </Link>
        <div className='signin-create'>
          <h3>Login & Sign in</h3>
        </div>
      </div>
      <div className='signin-content'>
        <div className='signin-account'>
          <h2>Don't have an account? <Link to='/signup' className='signin'>signup</Link></h2>
        </div>
        <form onSubmit={formik.handleSubmit} className='signin-form'>
          <div className='signin-toplabel'>
            <div className='signin-label'>
              <label htmlFor='username'>Username</label>
              <input
                type='text'
                id='username'
                name='username'
                placeholder='Username'
                aria-labelledby='username'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.username}
              />
              {formik.errors.username && formik.touched.username && <p className='error-message'>{formik.errors.username}</p>}
            </div>
          </div>
          <div className='signin-toplabel'>
            <div className='signin-label'>
              <label htmlFor='password'>Password</label>
              <input
                type='password'
                id='password'
                name='password'
                placeholder='Enter your password'
                aria-labelledby='password'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
              {formik.errors.password && formik.touched.password && <p className='error-message'>{formik.errors.password}</p>}
            </div>
          </div>
          <div className='signin-button'>
            <button type='submit'>Login {isLoading && <Loader color="color-white" className="ml-2" />}</button>
            
          </div>
        </form>
        <div className='signin-agreement'>
          <p><Link to='/forgotpassword' className='forgotpassword'>Forgot password?</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Signin;
