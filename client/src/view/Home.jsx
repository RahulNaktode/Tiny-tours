import { useEffect } from "react";
import { setPageTitle } from "./../utils.jsx";
import Navbar from "../components/Navbar.jsx";

function Home() {
    useEffect(() => {
        setPageTitle("Home - TinyTours")
    });

  return (
    <div>
      <Navbar />
      Home
    </div>
  )
}

export default Home
