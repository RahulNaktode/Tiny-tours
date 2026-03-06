import React from 'react'
import { useEffect } from 'react'
import { setPageTitle } from '../utils'

function Tours() {
    useEffect(() => {
        setPageTitle('All Tours - TinyTours');
    }, []);
  return (
    <div>
      
    </div>
  )
}

export default Tours
