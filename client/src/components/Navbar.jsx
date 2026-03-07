import React from 'react'
import { useState, useEffect } from 'react'
import Logo from '../assets/logo.png'
import { getUserData, logoutUser } from '../utils';
import Button from './Button';
import { Link } from 'react-router';

function Navbar() {
  const [userData, setUserData] = useState({});

  const fetchData = () => {
    const data = getUserData();
    console.log(data);
    setUserData(data);
  }

  useEffect(()=> {
    fetchData();
  }, [])
  return (
    <div className='bg-red-300 px-4 py-4 flex items-center justify-around'>
      <div>
      <Link to="/" className='flex items-center'>
        <img src={Logo} alt="Logo" className='h-10 w-10 inline-block'/>
        <span className='ml-2 font-bold text-lg'>TinyTours</span>
      </Link>
      </div>

      <div>
        {userData?.name ? (
          <div className='flex items-center'>
            <span className='bg-black text-white h-8 w-8 flex items-center justify-center rounded-full mr-2'>{userData.name[0]}</span>
          Hello, {userData.name}
          <Button title={"Logout"}  onClick={logoutUser}/>
        </div>
        ) : (
          <Link to="/login" className='bg-white text-red-600 px-2 py-1 rounded'>Login</Link>
        )}
      </div>
    </div>
  )
}

export default Navbar
