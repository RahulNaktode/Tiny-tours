import React from 'react'
import { useEffect, useState } from 'react'
import { setPageTitle, getUserJwtToken } from '../utils'
import Navbar from '../components/Navbar'
import Input from '../components/Input'
import MultiSelect from '../components/MultiSelect'
import Button from '../components/Button'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'

function NewTour() {

  const [newTour, setNewTour] = useState({
    title: "",
    description: "",
    cities: [],
    startDate: "",
    endDate: "",
    photos: [],
  });

  const addTour = async () => {
    const response = await axios.post("http://localhost:8020/tours", newTour, {
      headers: {
        Authorization: `Bearer ${getUserJwtToken()}`,
      }
    });

    if(response.data.success) {
      toast.success(response.data.message, { id: "addTourSuccess" });
      setNewTour({
        title: "",
        description: "",
        cities: [],
        startDate: "",
        endDate: "",
        photos: [],
      });
    }else {
      toast.error(response.data.message, { id: "addTourError" });
    }
  }

  useEffect(() => {
    setPageTitle('New Tour - TinyTours');
  }, []);
  return (
    <div>
      <Navbar />
      <h1>Add New Tour</h1>

      <div className='w-75 block mx-auto mt-15'>
        <Input
          type={"text"}
          placeholder={"Title"}
          value={newTour.title}
          onChange={(e) => {
            setNewTour({ ...newTour, title: e.target.value })
          }
          }
        />

        <Input
          type={"text"}
          placeholder={"Description"}
          value={newTour.description}
          onChange={(e) => {
            setNewTour({ ...newTour, description: e.target.value })
          }}
        />

        <MultiSelect 
        selectedItems={newTour.cities}
        placeholder={"Enter City"}
        onAddItem={(val)=> {
          setNewTour({
            ...newTour,
            cities: [...newTour.cities,val]
          })
        }}
        onRemoveItem={(val) => {
          setNewTour({
            ...newTour,
            cities: newTour.cities.filter((city) => city !== val)
          })
        }}
        />

        <Input
          type={"date"}
          placeholder={"Start Date"}
          value={newTour.startDate}
          onChange={(e) => {
            setNewTour({ ...newTour, startDate: e.target.value })
          }}
        />

        <Input
          type={"date"}
          placeholder={"End Date"}
          value={newTour.endDate}
          onChange={(e) => {
            setNewTour({ ...newTour, endDate: e.target.value })
          }}
        />

        <div>
        <Button title={"Add Tour"} onClick={addTour} />
        </div>
      </div>
      <Toaster />
    </div>
  )
}

export default NewTour
