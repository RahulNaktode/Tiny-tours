import { useEffect } from "react";
import { setPageTitle } from "./../utils.jsx";

function NewTours() {
    useEffect(() => {
        setPageTitle("New Tours - TinyTours")
    });

  return (
    <div>
      NewTour
    </div>
  )
}

export default NewTours
