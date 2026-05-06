import React from 'react'
import { useState, useEffect } from 'react'
import Logo from '../assets/logo.png'
import { getUserData, logoutUser } from '../utils';
import Button from './Button';
import { Link } from 'react-router';
import Avatar from './Avatar';

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
    <div className='bg-red-300 md:px-4 px-1 py-1 flex items-center justify-around poppins-regular'>
      <div>
      <Link to="/" className='flex items-center'>
        <img src={Logo} alt="Logo" className='md:h-10 h-7 md:w-10 w-7 inline-block'/>
        <span className='ml-2 font-bold md:text-xl text-lg  poppins-semibold-italic'>TinyTours</span>
      </Link>
      </div>

      <div>
        {userData?.name ? (
          <Link to="/profileUpdate" className='flex items-center'>
            {
              userData?.photo?.length > 0 ? <img src={userData.photo[0]} alt="User Avatar" className='h-8 w-8 rounded-full object-cover mr-2' /> : <Avatar name={userData.name} size={30} className={"mr-2"}/>
            }
          <span className='text-sm md:text-lg'>Hello, {userData.name}</span>
          <Button title={"Logout"}  onClick={logoutUser}/>
        </Link>
        ) : (
          <Link to="/login" className='bg-white text-red-600 px-2 py-1 rounded'>Login</Link>
        )}
      </div>
    </div>
  )
}

export default Navbar
