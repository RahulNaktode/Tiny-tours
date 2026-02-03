import { useEffect, useState } from "react"
import ImgLogo from "./../assets/logo.png"
import { getUserData, logoutUser } from "../utils";
import Button from "./Button";
import { Link } from "react-router";
import { Toaster } from "react-hot-toast";
import Avatar from "./Avatar";


function Navbar() {

  const [userData, setUserData] = useState({});

  const fetchUserData = () => {
    const data = getUserData();
    console.log(data);
    setUserData(data);
  }

  useEffect(() => {
    fetchUserData();
  }, [])
  return (
    <div className="bg-blue-300 px-4 py-2 flex justify-around">
      <div>
        <Link to="/">
      <img src={ImgLogo} alt="Logo" className="h-8 inline-block"/>
      <span>Tiny Tours</span>
      </Link>
      </div>

      <div>
        {userData?.name ? (
          <div className="flex items-center">
            <Avatar name={userData.name} />
            Hello, {userData.name}!
            <Button title="Logout" size="small" varient="tertiary" onClick={logoutUser} />
          </div>
        ): (
          <Link to="/login" className="bg-white text-blue-500 px-3 py-1 rounded mr-2"> Login</Link>
        )}
      </div>
      <Toaster />
    </div>
  )
}

export default Navbar
