import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { getUserJwtToken } from '../utils';
import axios from 'axios';
import toast, {Toaster} from 'react-hot-toast';
import ImgAddTour from './../assets/add-tour.png'
import { Link } from 'react-router';
import TourCard from '../components/TourCard';

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
      setTours(response.data.data);
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
      
      <div className="w-2/3 block m-auto mt-10">
      <Link to='/newtour'>
      <img src={ImgAddTour} alt="Add tour" className='fixed right-10 bottom-10 h-15 cursor-pointer'/>
      </Link>

      
      {
        tours.map((tourItem, index) => {
          return <TourCard key={index} {...tourItem}/>
        })
      }

      </div>

      <Toaster />
    </div>
  )
}

export default Dashboard
