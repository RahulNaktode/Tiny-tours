import React from 'react'
import Navbar from '../components/Navbar'
import { useEffect, useState } from 'react'
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { getUserJwtToken } from '../utils';
import AddToursImg from './../assets/addtours.png'
import { Link } from 'react-router';
import TourCard from '../components/TourCard';

function Dashboard() {
    const [tours, setTours] = useState([]);

    const loadTours = async () => {
        const userJwt = getUserJwtToken();

        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/tours`, {
            headers: {
                Authorization: `Bearer ${userJwt}`,
            }
        });

        if (response.data.success) {
            toast.success(response.data.message, { id: "loadToursSuccess" });
            setTours(response.data.data);
        }
        else {
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

            <div className='w-2/3 block mx-auto mt-15'>

            <Link to="/tour/new">
                <img src={AddToursImg} alt="Add Tours" className='fixed bottom-10 h-15 right-10 cursor-pointer' />
            </Link>

            <div>
                {tours.map((tourItem, index) => {
                    return <TourCard key={index} {...tourItem} />
                })}
            </div>
            </div>
            <Toaster />
        </div>
    )
}

export default Dashboard
