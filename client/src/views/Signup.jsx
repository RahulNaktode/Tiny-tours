import React from 'react'
import { useEffect, useState } from 'react'
import { setPageTitle } from '../utils'
import Input from '../components/Input';
import Button from '../components/Button';

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
  return (
    <div>
      <h1>Signup</h1>

<div className='w-75 mx-auto flex flex-col gap-4'>
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

    <Button title={"Signup"} />
    </div>
    </div>

    
  )
}

export default Signup
