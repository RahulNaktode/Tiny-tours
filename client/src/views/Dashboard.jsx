import React from 'react'
import Navbar from '../components/Navbar'
import { useEffect, useState } from 'react'
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { getUserJwtToken } from '../utils';
import AddToursImg from './../assets/addtours.png'
import { Link } from 'react-router';
import TourCard from '../components/TourCard';
import Footer from '../components/Footer';

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

            <div className='md:w-2/3 w-3/3 block mx-auto mt-15'>

            <Link to="/tour/new">
                <img src={AddToursImg} alt="Add Tours" className='fixed bottom-10  h-15 right-10 cursor-pointer' />
            </Link>

            <div className='md:h-[75vh] h-[60vh] overflow-y-auto mb-10'>
                {tours.map((tourItem, index) => {
                    return <TourCard key={index} {...tourItem} />
                })}
            </div>
            </div>
            <Footer />
            <Toaster />
        </div>
    )
}

export default Dashboard
