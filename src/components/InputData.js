import React, { useState, useEffect } from 'react';
import axios from 'axios';

const InputData = () => {
  const [data, setData] = useState(null); // State to store the fetched data



  useEffect(() => {
    const fetchData = async () => {
      try {
        const headers = {
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlNhbXRlZ2ciLCJ1c2VySWQiOiI2NWZhY2IzYjQ3Njc4ZDAwMjllMWFiMjIiLCJpYXQiOjE3MTA5MzQ4NDMsImV4cCI6MTcxMDk1NjQ0M30.LIMJL0z56tLEaHfu2SSVsvLVTolwTEG_RoQRPePILiI',
          'Content-Type': 'application/json', 
        };
        const response = await axios.get(`${process.env.REACT_APP_URL}payment/check-payment?transaction_id=1234`, { headers });
        console.log('Data from backend:', response.data);
        // Extract the relevant data from the response and update the state if necessary
        const { username } = response.data; // Assuming the response contains the username
        console.log('Username:', username);
        setData(response.data)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  
  return (
    <div>
      <p>InputData:</p>
      {data && (
        <div>
          <p>Username: {data.username}</p>
          <p>Email: {data?.username}</p>
          {/* Add more properties as needed */}
        </div>
      )}
    </div>
  );
};

export default InputData;
