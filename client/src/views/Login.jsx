import React from 'react'
import { useEffect, useState } from 'react'
import { setPageTitle } from '../utils'
import Input from '../components/Input';
import Button from '../components/Button';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { Link } from 'react-router';
import Navbar from '../components/Navbar';

function Login() {
    useEffect(() => {
        setPageTitle('Login - TinyTours');
    }, []);

    const [loginUser, setLoginUser] = useState({
        email: "",
        password: "",
    });

    const checkUserLogin = async ()=> {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/login`, loginUser);

      if(response.data.success) {
        toast.success(response.data.message, { id: "loginSuccess" });
        setLoginUser({
          email: "",
          password: "",
        });

        const { jwtToken, data } = response.data;

        localStorage.setItem("userJwtToken", jwtToken);
        localStorage.setItem("userData", JSON.stringify(data));

        setTimeout(() => {
          window.location.href = "/dashboard";
        }, 1000);
      } else {
        toast.error(response.data.message, { id: "loginError" });
      }
    }
  return (
    <div>
      <Navbar />

<div className='w-95 block mx-auto mt-15 border border-gray-300 rounded px-4 py-6 shadow-md bg-white'>
    <h2 className='text-2xl text-center mb-6 poppins-semibold-italic'>Login to Your Account</h2>
      <Input 
      type={"text"}
      placeholder={"email"}
      value={loginUser.email}
      onChange={(e) => setLoginUser({...loginUser, email: e.target.value})}
    />

    <Input 
      type={"password"}
      placeholder={"password"}
      value={loginUser.password}
      onChange={(e) => setLoginUser({...loginUser, password: e.target.value})}
    />


    <Button title={"Login"} onClick={checkUserLogin} />

    <Link to="/signup" className='text-blue-500 '>Don't have an account? Signup</Link>
    </div>
    <Toaster />
    </div>
  )
}

export default Login
