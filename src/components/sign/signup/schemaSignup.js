import * as yup from 'yup';

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
// min 5 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit.

const basicSchema = yup.object().shape({
    first_name: yup.string().label('First Name').required('Please enter your First Name'),
    last_name: yup.string().label('Last Name').required('Please enter your Last Name'),
    username: yup.string().label('User Name').required('Please enter your User Name'),
    phone_number: yup.string().label('Phone Number').required('Please enter your Phone Number'),
    // password: yup.string().min(7, 'Password must be at least 7 characters long').matches(passwordRules, 'Please create a stronger password').required('Please enter your Password'),
    
});

export default basicSchema;
