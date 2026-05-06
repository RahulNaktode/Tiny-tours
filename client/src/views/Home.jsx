import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import { setPageTitle } from '../utils'
import HomeImg from './../assets/travelers.png'
import Button from '../components/Button'
import Footer from '../components/Footer'

function Home() {

  useEffect(() => {
    setPageTitle('Home - TinyTours');
  }, []);

  return (
    <div>
      <Navbar />

      <div className='px-6 md:px-20'>
      <img 
        src={HomeImg} 
        alt="Travelers" 
        className='md:h-120 h-80 mx-auto mt-10'
      />

      <h2 className='md:text-3xl text-2xl font-bold text-center mt-10 poppins-semibold-italic'>
        Welcome to Tiny Tours
      </h2>

      <h3 className='text-lg text-center mt-4 poppins-regular px-4'>
        Record every journey, big or small, and share your adventures with the world. 
        Tiny Tours helps you capture memories, organize trips, and relive your travel experiences anytime.
      </h3>

      <div className='mt-10 px-6 md:px-20'>
        <h3 className='text-2xl font-semibold text-center mb-6'>Why Choose Tiny Tours?</h3>

        <div className='grid md:grid-cols-3 gap-6 text-center'>
          <div className='p-4 shadow-md rounded-xl bg-orange-200'>
            <h4 className='font-bold text-lg'>📍 Track Your Trips</h4>
            <p className='mt-2 text-sm'>
              Keep a record of all the places you've visited with details and memories.
            </p>
          </div>

          <div className='p-4 shadow-md rounded-xl bg-orange-200'>
            <h4 className='font-bold text-lg'>📸 Upload Memories</h4>
            <p className='mt-2 text-sm'>
              Save photos and notes from your journeys in one organized place.
            </p>
          </div>

          <div className='p-4 shadow-md rounded-xl bg-orange-200'>
            <h4 className='font-bold text-lg'>🌍 Share Adventures</h4>
            <p className='mt-2 text-sm'>
              Share your travel stories with friends and inspire others.
            </p>
          </div>
        </div>
      </div>

      <div className='flex flex-col items-center my-10'>
        <p className='text-lg mb-4'>Start your journey today 🚀</p>
        <Button 
          title={"Get Started"} 
          size='large' 
          onClick={() => window.location.href = '/dashboard'} 
        />
      </div>
      </div>

      <Footer />
    </div>
  )
}

export default Home