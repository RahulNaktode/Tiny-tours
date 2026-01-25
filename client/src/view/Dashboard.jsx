import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { getUserJwtToken } from '../utils';
import axios from 'axios';
import toast, {Toaster} from 'react-hot-toast';

function Dashboard() {

  const [tours, setTours] = useState([]);

  const loadTours = async () => {
    const userJWT = getUserJwtToken();

    const response = await axios.get("http://localhost:8080/tours", {
      headers: {
        Authorization: `Bearer ${userJWT}`
      }
    });
    
    if(response.data.success){
      toast.success(response.data.message);
    }else{
      toast.success(response.data.success);
    }
  }

  useEffect(() => {
    loadTours();
  }, [])
  return (
    <div>
        <Navbar />
        Dashboard
      

      <Toaster />
    </div>
  )
}

export default Dashboard
