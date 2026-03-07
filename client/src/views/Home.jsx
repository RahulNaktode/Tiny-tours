import React from 'react'
import { useEffect } from 'react'
import { setPageTitle } from '../utils'
import Navbar from '../components/Navbar'

function Home() {
    useEffect(() => {
        setPageTitle('Home - TinyTours');
    }, []);
  return (
    <div>
      <Navbar />
      <h1>Home</h1>
    </div>
  )
}

export default Home
