import React from 'react'
import { useEffect } from 'react'
import { setPageTitle } from '../utils'

function Home() {
    useEffect(() => {
        setPageTitle('Home - TinyTours');
    }, []);
  return (
    <div>
      
    </div>
  )
}

export default Home
