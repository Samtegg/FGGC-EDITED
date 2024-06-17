import React, { useContext } from 'react'
import './Signup.css'
import Logo from '../../assets/fggc.png'
import { Link } from 'react-router-dom'
import { useFormik } from 'formik'
import basicSchema from './schemaSignup'
import { useNavigate } from 'react-router-dom';
import { useHttpClient } from '../../../hooks/http-hook'
import { AuthContext } from '../../../context/auth-context'
import Loader from '../../fragments/loader/Loader'



const Signup = () => {

  const navigate = useNavigate();

  const auth = useContext(AuthContext);

  const {isLoading, sendRequest} = useHttpClient();

  const onSubmit = async (values, actions) => {

    const data = JSON.stringify(values)
  
    try {
      const response =  await sendRequest(`${process.env.REACT_APP_URL}auth/signup`, 'POST', data, {'Content-Type': 'application/json'});
  
      if (response) {
        const responseData = response.data;
        await auth.login(responseData._id, responseData.token);
        // Store the data in localStorage
        localStorage.setItem('myData', JSON.stringify(responseData));

        navigate('/signup/recovery');
      } else {
        // Signup failed
        throw new Error('Failed to submit form');
      }
    } catch (error) {
      console.error('Error:', error);
      
    }
  };
  
  const { values, errors, touched, isSubmitting, handleBlur, handleChange, handleSubmit} = useFormik({
    initialValues: {
      first_name: '',
      last_name: '',
      username: '',
      phone_number: '',
      password: '',
      confirm_password: ''
    },
    validationSchema: basicSchema,
    onSubmit
  })

  return (
        <div className='signup-container'>
          <div className='signup-heading'>
            <Link to='/signup' className='logo'>
              <img src={Logo} alt='logo' />
            </Link>
            <div className='signup-create'>
              <h3>Create an account & Sign up</h3>
            </div>
          </div>
          <div className='signup-content'>
            <div className='signup-account'>
              <h2>Already have an account?<Link to='/signin' className='signin'>login</Link></h2>
            </div>
            <form onSubmit={handleSubmit} className='signup-form' autoComplete='off'>
              <div className='signup-toplabel'>
                <div className='signup-label'>
                  <label htmlFor='first-name'>First Name</label>
                  <input 
                    value={values.first_name }
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type='text'
                    id='first_name' 
                    placeholder='First Name'
                    aria-labelledby='first-name' 
                    required
                    className={errors.first_name && touched.first_name ? 'input-error' : ''}
                  />
                  {errors.first_name && touched.first_name && <p className='error-message'>{errors.first_name}</p>}
                </div>
                <div className='signup-label'>
                  <label htmlFor='last-name'>Last Name</label>
                  <input
                    value={values.last_name}
                    onChange={handleChange}
                    onBlur={handleBlur} 
                    type='text' 
                    id='last_name' 
                    placeholder='Last Name' 
                    aria-labelledby='last-name' 
                    className={errors.last_name && touched.last_name ? 'input-error' : ''}
                    required  
                  />
                   {errors.last_name && touched.last_name && <p className='error-message'>{errors.last_name}</p>}
                </div>
              </div>
              <div className='signup-toplabel'>
                <div className='signup-label'>
                  <label htmlFor='username'>username</label>
                  <input
                    value={values.username}
                    onChange={handleChange}
                    onBlur={handleBlur} 
                    type='text' 
                    id='username' 
                    placeholder='username' 
                    aria-labelledby='username'
                    className={errors.username && touched.username ? 'input-error' : ''} 
                    required
                  />
                   {errors.username && touched.username && <p className='error-message'>{errors.username}</p>}
                </div>
                <div className='signup-label'>
                  <label htmlFor='phone-number'>Phone Number <br/>(Whatsapp Number Preferred)</label>
                  <input
                    value={values.phone_number}
                    onChange={handleChange}
                    onBlur={handleBlur} 
                    type='tel' 
                    id='phone_number' 
                    placeholder='Enter your phone-number' 
                    aria-labelledby='phone-number' 
                    className={errors.phone_number && touched.phone_number ? 'input-error' : ''}
                    required
                  />
                   {errors.phone_number && touched.phone_number && <p className='error-message'>{errors.phone_number}</p>}
                </div>
              </div>
              <div className='signup-toplabel'>
                <div className='signup-label'>
                  <label htmlFor='password'>Password</label>
                  <input
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur} 
                    type='password' 
                    id='password' 
                    placeholder='Enter your Password' 
                    aria-labelledby='password' 
                    className={errors.password && touched.password ? 'input-error' : ''}
                    required/>
                     {errors.password && touched.password && <p className='error-message'>{errors.password}</p>}
                </div>
                <div className='signup-label'>
                  <label htmlFor='confirm-password'>Confirm Password</label>
                  <input 
                    value={values.confirm_password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type='password' 
                    id='confirm_password' 
                    placeholder='Confirm Password' 
                    aria-labelledby='confirm-password' 
                    className={errors.confirm_password && touched.confirm_password ? 'input-error' : ''}
                    required/>
                     {errors.confirm_password && touched.confirm_password && <p className='error-message'>{errors.confirm_password}</p>}
                </div>
              </div>
              <div className='signup-button'>
                <button disabled={isSubmitting} type='submit'>Create Account {isLoading && <Loader color="color-white" className="ml-2" />}</button>
              </div>
            </form>
            <div className='signup-agreement'>
              <p>By clicking “Create Account” , I agree with the <Link to='/termsandcondition' className='terms'>terms & conditions</Link> of First Golden GIfted Club and its services </p>
            </div>
          </div>
        </div>
  )
}

export default Signup