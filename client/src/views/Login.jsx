import React from 'react'
import { useEffect } from 'react'
import { setPageTitle } from '../utils'

function Login() {
    useEffect(() => {
        setPageTitle('Login - TinyTours');
    }, []);
  return (
    <div>
      
    </div>
  )
}

export default Login
