import React from 'react'
import Navbar from '../components/Navbar'
import { useEffect, useState } from 'react'
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { getUserJwtToken } from '../utils';

function Dashboard() {
    const [tours, setTours] = useState([]);

    const loadTours = async () => {

        const userJwt = getUserJwtToken();

        const response = await axios.get("http://localhost:8020/tours", {
            headers: {
                Authorization: `Bearer ${userJwt}`,
            }
        });
        console.log(response.data);

        if(response.data.success) {
            toast.success(response.data.message, { id: "loadToursSuccess" });
        }
        else{
            toast.error(response.data.message, { id: "loadToursError" });
        }
    }

    useEffect(() => {
        loadTours();
    }, [])
    
  return (
    <div>
      <Navbar />
      <h1>Dashboard</h1>



      <Toaster />
    </div>
  )
}

export default Dashboard
