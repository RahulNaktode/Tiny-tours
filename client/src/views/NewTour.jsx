import React from 'react'
import { useEffect } from 'react'
import { setPageTitle } from '../utils'

function NewTour() {
    useEffect(() => {
        setPageTitle('New Tour - TinyTours');
    }, []);
  return (
    <div>
      
    </div>
  )
}

export default NewTour
