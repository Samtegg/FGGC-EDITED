import React, {useEffect, useState } from 'react'
import '../profileupdate/Profileupdate.css'
import './Accountupdate.css'
import Logo from '../../assets/fggc.png'
import { Link } from 'react-router-dom'
import { useHttpClient } from '../../../hooks/less-http-hook'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup'; // Import Yup for form validation

const Accountupdate = () => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    const [details, setDetails] = useState(null)

    const {sendRequest} = useHttpClient();

    // Define validation schema using Yup
    const validationSchema = Yup.object().shape({
        account_name: Yup.string().required('Account name is required'),
        account_number: Yup.string().required('Account number is required'),
        account_bank: Yup.string().required('Account bank is required')
    });

    // Initial form values
    const initialValues = {
        account_name: '',
        account_number: '',
        account_bank: ''
    };


    useEffect(() => {
        const fetchData = async() => {
            try {
        
                const response = await sendRequest(`${process.env.REACT_APP_URL}payment/get-wallet`, 'GET', null, {'Authorization': `Bearer ${userData.token}`});
                
                if (response) {
                  setDetails(response.data)
                }
    
              } catch (error) {
                console.error( error.message);
                // Handle other errors (e.g., network error)
        
              }
        }

        fetchData()
    },[userData.token, sendRequest])


    // Form submission handler
    const onSubmit = async (values, { setSubmitting }) => {
        try {
            console.log(values)
            const data = JSON.stringify({
                "bank_name": values.account_bank,
                "account_name":values.account_name,
                "account_number": values.account_number
            })
            
            const response = await sendRequest(`${process.env.REACT_APP_URL}payment/update-wallet`, 'POST', data, {
                'Authorization': `Bearer ${userData.token}`,
                'Content-type': 'application/json'});
                
                if (response.status) {
                  setDetails(response.data)
                }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
        setSubmitting(false);
    };


  return (
    <div className='profileupdate-container'>
        <div className='profileupdate-navbar'>
            <Link to='/dashboard' className='logo'>
                <img src={Logo} alt=''/>
            </Link>
            <h2>Account Update</h2>
        </div>
        <div className='profileupdate-content'>
                <h3>Your Account Information</h3>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <div className='profileupdate-info'>
                                <h4>Account Information</h4>
                                <div className='profileupdate-input'>
                                    <div className='profileupdate-detail'>
                                        <label htmlFor='account_name'>Account name</label>
                                        <div className='detail-content'>
                                            <p>{details?.account_name || ''}</p>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 28 16" fill="none">
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M0 2.23535L2.27357 0L14 11.5293L25.7264 0L28 2.23535L14 16L0 2.23535Z" fill="#5C5C5C"/>
                                            </svg>
                                        </div>
                                    </div>
                                    <Field type='text' id='account_name' name='account_name' placeholder='e.g John Doe' aria-labelledby='account_name' required />
                                    <ErrorMessage name='account_name' component='div' className='error-message' />
                                </div>


                                <div className='profileupdate-input'>
                                    <div className='profileupdate-detail'>
                                        <label htmlFor='account_number'>Account number</label>
                                        <div className='detail-content'>
                                            <p>{details?.account_number || ''}</p>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 28 16" fill="none">
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M0 2.23535L2.27357 0L14 11.5293L25.7264 0L28 2.23535L14 16L0 2.23535Z" fill="#5C5C5C"/>
                                            </svg>
                                        </div>
                                    </div>
                                    <Field type='text' id='account_number' name='account_number' placeholder='e.g 001122334455' aria-labelledby='account_number' required />
                                    <ErrorMessage name='account_number' component='div' className='error-message' />
                                </div>


                                <div className='profileupdate-input'>
                                    <div className='profileupdate-detail'>
                                        <label htmlFor='account_bank'>Account bank</label>
                                        <div className='detail-content'>
                                            <p>{details?.bank_name || ''}</p>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 28 16" fill="none">
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M0 2.23535L2.27357 0L14 11.5293L25.7264 0L28 2.23535L14 16L0 2.23535Z" fill="#5C5C5C"/>
                                            </svg>
                                        </div>
                                    </div>
                                    <Field type='text' id='account_bank' name='account_bank' placeholder='e.g First Bank' aria-labelledby='account_bank' required />
                                    <ErrorMessage name='account_bank' component='div' className='error-message' />
                                </div>


                            </div>
                            <div className='profileupdate-button'>
                                <button type='submit' disabled={isSubmitting}>
                                    {isSubmitting ? 'Saving...' : 'Save'}
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
  )
}

export default Accountupdate


{/* <div className='profileupdate-input' >
                    <div className='profileupdate-detail'>
                        <label htmlFor='username'>Bank name</label>
                        <div className='detail-content'>
                            <p>{details?.wallet?.account_bank || ""}</p>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 28 16" fill="none">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M0 2.23535L2.27357 0L14 11.5293L25.7264 0L28 2.23535L14 16L0 2.23535Z" fill="#5C5C5C"/>
                            </svg>
                        </div>
                    </div>
        
                </div> */}


    {/* <div className='banklist'>
    <div className='account-search'>
        <div className='search-box'>
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="31" viewBox="0 0 30 31" fill="none">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M13.75 25.834C19.9632 25.834 25 20.6293 25 14.209C25 7.78867 19.9632 2.58398 13.75 2.58398C7.5368 2.58398 2.5 7.78867 2.5 14.209C2.5 20.6293 7.5368 25.834 13.75 25.834Z" stroke="#5C5C5C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M27.5 28.4167L22.5 23.25" stroke="#5C5C5C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <p>Search for</p>
            </div>
        </div>
        <p className='bank-name'>AB MICROFINANCE AND INVESTMENT COMPANY LIMITED</p>
        <p className='bank-name'>ABSU MICROFINANCE BANK </p>
        <p className='bank-name'>ACCESS YELLOW AND BETA  </p>
    </div>
</div> */}