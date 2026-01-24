import { useEffect, useState } from "react";
import { setPageTitle } from "./../utils.jsx";
import Input from "../components/Input.jsx";
import Button from "../components/Button.jsx";
import axios from "axios";
import toast, {Toaster} from "react-hot-toast";
import { Link } from "react-router";

function Signup() {
    const [newUser, setNewUser] = useState({
        name : "",
        email : "",
        mobile: "",
        city : "",
        country: "",
        password: "",
    });

    const createUser = async () => {
      const response = await axios.post("http://localhost:8080/signup", newUser);
      
      if(response.data.success){
        toast.success(response.data.message, {id:"singupSuccess"});
        setNewUser({
          name : "",
        email : "",
        mobile: "",
        city : "",
        country: "",
        password: "",
        });

        setTimeout(() => {
          window.location.href = "/login";
        }, 1500);
      }else{
        toast.error(response.data.message, {id: "signupError"})
      }
    }

    useEffect(() => {
        setPageTitle("Signup - TinyTours")
    });

  return (
    <div>
      Signup

    <div className="w-75 block m-auto">
      <Input
      type="text"
      placesholder="Name"
      value={newUser.name}
      onChange={(e) => {
        setNewUser({...newUser, name: e.target.value})
      }}
      />

      <Input
      type="text"
      placesholder="Email"
      value={newUser.email}
      onChange={(e) => {
        setNewUser({...newUser, email: e.target.value})
      }}
      />

      <Input
      type="number"
      placesholder="Mobile"
      value={newUser.mobile}
      onChange={(e) => {
        setNewUser({...newUser, mobile: e.target.value})
      }}
      />

      <Input
      type="text"
      placesholder="City"
      value={newUser.city}
      onChange={(e) => {
        setNewUser({...newUser, city: e.target.value})
      }}
      />

      <Input
      type="text"
      placesholder="Country"
      value={newUser.country}
      onChange={(e) => {
        setNewUser({...newUser, country: e.target.value})
      }}
      />

      <Input
      type="password"
      placesholder="Password"
      value={newUser.password}
      onChange={(e) => {
        setNewUser({...newUser, password: e.target.value})
      }}
      />

      <Button title="Signup" onClick={createUser} />

      <Link to="/login"
      className="text-blue-500"
      >Already have an account? Login</Link>

      </div>
      <Toaster />
    </div>
  )
}

export default Signup
