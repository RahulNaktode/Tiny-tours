import React from 'react'
import { useEffect } from 'react'
import Navbar from '../components/Navbar'
import { setPageTitle } from '../utils'
import HomeImg from './../assets/travelers.png'
import Button from '../components/Button'

function Home() {

    useEffect(() => {
    setPageTitle('Home - TinyTours');
  }, []);

  return (
    <div>
        <Navbar />
      <img src={HomeImg} alt="Home" className='h-120 mx-auto mt-10'/>

      <h2 className='text-3xl font-bold text-center mt-10 poppins-semibold-italic'>Welcome to Tiny Tours</h2>
      <h3 className='text-lg text-center mt-4 poppins-regular'>Record every journey, big or small, and share the adventure! with Tiny Tours.</h3>
<div className='flex justify-center mt-6'>
      <Button title={"Get Started"} size='large' onClick={() => window.location.href = '/dashboard'}/>
        </div>
    </div>
  )
}

export default Home
