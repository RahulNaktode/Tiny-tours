import React from 'react'
import { useEffect, useState, useRef } from 'react'
import { setPageTitle, getUserJwtToken } from '../utils'
import Navbar from '../components/Navbar'
import Input from '../components/Input'
import MultiSelect from '../components/MultiSelect'
import Button from '../components/Button'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'
import {
    ImageKitAbortError,
    ImageKitInvalidRequestError,
    ImageKitServerError,
    ImageKitUploadNetworkError,
    upload,
} from "@imagekit/react";
import PhotoViwer from '../components/PhotoViwer'

function NewTour() {

  const [newTour, setNewTour] = useState({
    title: "",
    description: "",
    cities: [],
    startDate: "",
    endDate: "",
    photos: [],
  });

  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef();
  

  const authenticator = async () => {
        try {
            const response = await fetch("http://localhost:8020/auth");
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Request failed with status ${response.status}: ${errorText}`);
            }

            const data = await response.json();
            const { signature, expire, token, publicKey } = data;
            return { signature, expire, token, publicKey };
        } catch (error) {
            console.error("Authentication error:", error);
            throw new Error("Authentication request failed");
        }
    };

    const handleUpload = async () => {
            const fileInput = fileInputRef.current;
            if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
                alert("Please select a file to upload");
                return;
            }

            const file = fileInput.files[0];

            let authParams;
            try {
                authParams = await authenticator();
            } catch (authError) {
                console.error("Failed to authenticate for upload:", authError);
                return;
            }
            const { signature, expire, token, publicKey } = authParams;
    
            try {
                const uploadResponse = await upload({
                    expire,
                    token,
                    signature,
                    publicKey,
                    file,
                    fileName: file.name,
                    onProgress: (event) => {
                        setProgress((event.loaded / event.total) * 100);
                    },
                });

                setNewTour({
                  ...newTour,
                  photos: [...newTour.photos, uploadResponse.url],
                })


                setProgress(0);
                fileInput.value = "";
            } catch (error) {
                if (error instanceof ImageKitAbortError) {
                    console.error("Upload aborted:", error.reason);
                } else if (error instanceof ImageKitInvalidRequestError) {
                    console.error("Invalid request:", error.message);
                } else if (error instanceof ImageKitUploadNetworkError) {
                    console.error("Network error:", error.message);
                } else if (error instanceof ImageKitServerError) {
                    console.error("Server error:", error.message);
                } else {
                    console.error("Upload error:", error);
                }
            }
        };

  const addTour = async () => {
    const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/tours`, newTour, {
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

      <div className='w-85 block mx-auto mt-15'>
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

<div className='flex mx-2'>
        {newTour.photos?.map((photo, index) => (
          <PhotoViwer 
          imageUrl={photo} 
          key={index} 
          onDelete={(url) => {
            setNewTour({
              ...newTour,
              photos: newTour.photos.filter((photo) => photo !== url)
            })
          }}
          showDelete
          />
        ))}
        </div>

<div>
        <input type="file" 
        ref={fileInputRef}
        onChange={(e) => {
        if(e.target.files.length > 0)
          handleUpload();
        }}
        
        />
        </div>
        { progress > 0 ? `Uploading... ${progress}%` : null}


        <div>
        <Button title={"Add Tour"} onClick={addTour} />
        </div>
      </div>
      <Toaster />
    </div>
  )
}

export default NewTour
