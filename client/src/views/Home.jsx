import React from 'react'
import { useEffect } from 'react'
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
      <img src={HomeImg} alt="Home" className='md:h-120 h-80 mx-auto mt-10' />

      <h2 className='md:text-3xl text-2xl font-bold text-center mt-10 poppins-semibold-italic'>Welcome to Tiny Tours</h2>
      <h3 className='text-lg text-center mt-4 poppins-regular'>Record every journey, big or small, and share the adventure! with Tiny Tours.</h3>
      <div className='flex justify-center my-7'>
        <Button title={"Get Started"} size='large' onClick={() => window.location.href = '/dashboard'} />
      </div>
      <Footer />
    </div>
  )
}

export default Home
