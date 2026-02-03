import { useEffect, useState } from "react";
import { setPageTitle, getUserJwtToken } from "./../utils.jsx";
import Navbar from "../components/Navbar.jsx";
import Input from "../components/Input.jsx";
import MultiSelect from "../components/MultiSelect.jsx";
import Button from "../components/Button.jsx";
import axios from "axios";
import toast, {Toaster} from 'react-hot-toast';

function NewTours() {

  const [newTours, setNewTours] = useState({
    title : "",
    description : "",
    cities : [], 
    startDate : "", 
    endDate : "", 
    photos : [],
  });

  const addTour = async () => {
    const response = await axios.post("http://localhost:8080/tours", newTours, {
      headers: {
        Authorization: `Bearer ${getUserJwtToken()}`
      }
    });
    console.log(response.data);

    if(response.data.success){
      toast.success(response.data.message)
    }else{
      toast.error(response.data.message)
    }
  }

    useEffect(() => {
        setPageTitle("New Tours - TinyTours")
    });

  return (
    <div>
      <Navbar />
      NewTour

      <div className="w-75 block m-auto mt-10">
      <Input type={"text"} placesholder={"Enter Title"} 
      value={newTours.title}
      onChange={(e) => {
        setNewTours({...newTours, title: e.target.value})
      }}
      />
      <Input type={"text"} placesholder={"Description"} 
      value={newTours.description}
      onChange={(e) => {
        setNewTours({...newTours, description: e.target.value})
      }}
      />

      <MultiSelect selectedItem={newTours.cities}  placesholder={"Enter City"} 
      onAddItem={(val) =>{
        setNewTours({
          ...newTours, cities: [...newTours.cities, val]
        })
      }}
      onRemoveItem={(val) => {
        setNewTours({
          ...newTours, cities: newTours.cities.filter((city) => city != val)
        })
      }}
      />

      <Input type={"date"} placesholder={"Enter Start Date"} 
      value={newTours.startDate}
      onChange={(e) => {
        setNewTours({...newTours, startDate: e.target.value})
      }}
      />

      <Input type={"date"} placesholder={"Enter end Date"} 
      value={newTours.endDate}
      onChange={(e) => {
        setNewTours({...newTours, endDate: e.target.value})
      }}
      />

      <div className="w-75 block m-auto mt-10">
        <Button title="Add Tour" size="medium" varient="primary" onClick={addTour}/>
      </div>
      </div>
      <Toaster />
    </div>
  )
}

export default NewTours
