import { useEffect } from "react";
import { setPageTitle } from "./../utils.jsx";
import Navbar from "../components/Navbar.jsx";

function EditTour() {
    useEffect(() => {
        setPageTitle("Edit Tour - TinyTours")
    });

  return (
    <div>
      <Navbar />
      EditTour
    </div>
  )
}

export default EditTour
