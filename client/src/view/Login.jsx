import { useEffect, useState } from "react";
import { setPageTitle } from "./../utils.jsx";
import Input from "../components/Input.jsx";
import Button from "../components/Button.jsx";
import axios from "axios";
import toast, {Toaster} from "react-hot-toast";
import {Link} from "react-router"
import Navbar from "../components/Navbar.jsx";

function Login() {
    useEffect(() => {
        setPageTitle("Login - TinyTours")
    });

    const [loginUser, setLoginUser] = useState({
      email: "",
      password: "",
    });

    const createLoginUser = async () => {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/login`, loginUser);

      if(response.data.success){
        toast.success(response.data.message, {id : "loginSuccess"});

        setLoginUser({
          email: "",
          password: "",
        });

        const {jwtToken, data} = response.data;

        localStorage.setItem("userJwtToken", jwtToken);
        localStorage.setItem("userData", JSON.stringify(data));

        setTimeout(() => {
          window.location.href='/dashboard'
        }, 1500)
        
      }else{
        toast.error(response.data.message, {id: "loginError"});
      }
    }

  return (
    <div>
      <Navbar />
      

<div className="w-75 block m-auto mt-10">
      <Input
      type="text"
      placesholder="Email"
      value={loginUser.email}
      onChange={(e) => {
        setLoginUser({...loginUser, email: e.target.value})
      }}
      />

      <Input
      type="password"
      placesholder="Password"
      value={loginUser.password}
      onChange={(e) => {
        setLoginUser({...loginUser, password: e.target.value})
      }}
      />

      <Button title="Login" size="small" varient="primary" onClick={createLoginUser} />

      <Link to="/signup"
      className="text-blue-500"
      >Don't have an account? Signup</Link>
    </div>
    <Toaster />
    </div>
  )
}

export default Login
