import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment';

const Paymentpending = () => {
    const [myProfile, setMyProfile] = useState(null);

    useEffect(() => {
      // Retrieve data from localStorage
      const storedData = localStorage.getItem('myData');
     
      if (storedData) {
        // Parse the stored data back into JavaScript object
        const parsedData = JSON.parse(storedData);
        setMyProfile(parsedData);
      }
    }, []);
    const createdAt = myProfile?.data.createdAt;
    const formattedDate = moment(createdAt).format('YYYY-MM-DD');

    const [myData, setMyData] = useState(null);  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const headers = {
              'Authorization': `Bearer ${process.env.TOKEN}`,
              'Content-Type': 'application/json', 
            };
          const response = await axios.get(`${process.env.REACT_APP_URL}level/get-levels`, { headers });
          console.log('Data from backend:', response.data);
          setMyData(response.data); // Store the fetched data in state
          console.log("MY DATA");
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
    
      fetchData(); // Call fetchData function immediately
    }, [])
  
    return (
    <div className='notification-container'>
    <div className='notification-navbar'>
        <div className='notification-user'>
            <h3>{myProfile?.data.username}</h3>
            <p>Created: {formattedDate}</p>
        </div>
        <div className='notification-level'>
            <p>Level 1</p>
        </div>
    </div>
    <div className='notification-whole'>
        <div className='notification-content'>
            <h2>Payment is Pending</h2>
            <p>Your payment is pending</p>
            <div className='notification-proceed'>
                <p>Your payment is pending. Proceed to your payment portal to view the status</p>
            </div>
            <div className='button-position'>
                <Link to= '/dashboard/paymentapproval' className='notification-button'>
                    <p>Proceed</p>
                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="20" viewBox="0 0 66 29" fill="none">
                        <path d="M46.6538 0.347124C46.0144 0.815321 46.035 1.55537 46.6538 2.05378L60.3488 13.2905H1.65C0.7425 13.2905 0 13.8342 0 14.4987C0 15.1632 0.7425 15.707 1.65 15.707H60.3488L46.6744 26.9436C46.0762 27.4572 46.0144 28.167 46.6538 28.6352C47.2931 29.1034 48.4069 29.1336 49.005 28.6503C49.005 28.6503 65.34 15.5106 65.505 15.3596C65.67 15.2086 66 14.9367 66 14.4987C66 14.0607 65.67 13.7587 65.505 13.6378C65.34 13.517 49.005 0.347124 49.005 0.347124C48.6956 0.120579 48.2625 -0.000244141 47.8294 -0.000244141C47.3962 -0.000244141 46.9838 0.120579 46.6538 0.347124Z" fill="white"/>
                    </svg>
                </Link>
            </div>
        </div>
    </div>

</div>
  )
}

export default Paymentpending