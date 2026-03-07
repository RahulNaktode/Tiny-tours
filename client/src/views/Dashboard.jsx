import React from 'react'
import Navbar from '../components/Navbar'
import { useEffect, useState } from 'react'
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { getUserJwtToken } from '../utils';
import AddToursImg from './../assets/addtours.png'
import { Link } from 'react-router';

function Dashboard() {
    const [tours, setTours] = useState([]);

    const loadTours = async () => {
        const userJwt = getUserJwtToken();

        const response = await axios.get("http://localhost:8020/tours", {
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

            <Link to="/tour/new">
                <img src={AddToursImg} alt="Add Tours" className='fixed bottom-10 h-15 right-10 cursor-pointer' />
            </Link>
            <Toaster />
        </div>
    )
}

export default Dashboard
