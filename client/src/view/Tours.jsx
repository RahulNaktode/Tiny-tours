import { useEffect } from "react";
import { setPageTitle } from "./../utils.jsx";

function Tours() {
    useEffect(() => {
        setPageTitle("Tours - TinyTours")
    });

  return (
    <div>
      Tours
    </div>
  )
}

export default Tours
