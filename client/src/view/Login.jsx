import { useEffect, useState } from "react";
import { setPageTitle } from "./../utils.jsx";
import Input from "../components/Input.jsx";
import Button from "../components/Button.jsx";
import axios from "axios";
import toast, {Toaster} from "react-hot-toast";
import {Link} from "react-router"

function Login() {
    useEffect(() => {
        setPageTitle("Login - TinyTours")
    });

    const [loginUser, setLoginUser] = useState({
      email: "",
      password: "",
    });

    const createLoginUser = async () => {
      const response = await axios.post("http://localhost:8080/login", loginUser);

      if(response.data.success){
        toast.success(response.data.message, {id : "loginSuccess"});

        setLoginUser({
          email: "",
          password: "",
        });

        const {jwtToken, data} = response.data;

        localStorage.setItem("UserJwtToken", jwtToken);
        localStorage.setItem("UserData", JSON.stringify(data));
        
      }else{
        toast.error(response.data.message, {id: "loginError"});
      }
    }

  return (
    <div>
      Login

<div className="w-75 block m-auto">
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

      <Button title="Login" onClick={createLoginUser} />

      <Link to="/signup"
      className="text-blue-500"
      >Don't have an account? Signup</Link>
    </div>
    <Toaster />
    </div>
  )
}

export default Login
