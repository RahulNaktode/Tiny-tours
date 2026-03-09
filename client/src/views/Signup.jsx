import React from 'react'
import { useEffect, useState } from 'react'
import { setPageTitle } from '../utils'
import Input from '../components/Input';
import Button from '../components/Button';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { Link } from 'react-router';
import Navbar from '../components/Navbar';

function Signup() {
    const [newUser, setNewUser] = useState({
        name: "",
        email: "",
        mobile: "",
        city: "",
        country: "",
        password: "",
    });
    useEffect(() => {
        setPageTitle('Signup - TinyTours');
    }, []);

    const createUser = async ()=> {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/signup`, newUser);

      if(response.data.success) {
        toast.success(response.data.message, { id: "signupsuccess" });
        setNewUser({
          name: "",
          email: "",
          mobile: "",
          city: "",
          country: "",
          password: "",
        });

        setTimeout(() => {
          window.location.href = "/login";
        }, 1000);
      } else {
        toast.error(response.data.message, { id: "signuperror" });
    }}

  return (
    <div>
      <Navbar />

<div className='w-75 block mx-auto mt-15'>
      <Input 
      type={"text"}
      placeholder={"name"}
      value={newUser.name}
      onChange={(e) => setNewUser({...newUser, name: e.target.value})}
    />

    <Input 
      type={"text"}
      placeholder={"email"}
      value={newUser.email}
      onChange={(e) => setNewUser({...newUser, email: e.target.value})}
    />

    <Input 
      type={"text"}
      placeholder={"mobile"}
      value={newUser.mobile}
      onChange={(e) => setNewUser({...newUser, mobile: e.target.value})}
    />

    <Input 
      type={"text"}
      placeholder={"city"}
      value={newUser.city}
      onChange={(e) => setNewUser({...newUser, city: e.target.value})}
    />

    <Input 
      type={"text"}
      placeholder={"country"}
      value={newUser.country}
      onChange={(e) => setNewUser({...newUser, country: e.target.value})}
    />

    <Input 
      type={"password"}
      placeholder={"password"}
      value={newUser.password}
      onChange={(e) => setNewUser({...newUser, password: e.target.value})}
    />


    <Button title={"Signup"} onClick={createUser}/>

    <Link to="/login" className='text-blue-500 '>Already have an account? Login</Link>
    </div>
    <Toaster />
    </div>
    
  )
}

export default Signup
