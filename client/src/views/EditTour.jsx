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
import { useParams } from 'react-router'


function EditTour() {

  const [existingTour, setExistingTour] = useState({
    title: "",
    description: "",
    cities: [],
    startDate: "",
    endDate: "",
    photos: [],
  });

  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef();

  const { id } = useParams();
  console.log(id);

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

                setExistingTour({
                  ...existingTour,
                  photos: [...existingTour.photos, uploadResponse.url],
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

  const editTour = async () => {
    const response = await axios.put(`${import.meta.env.VITE_API_BASE_URL}/tours/${id}`, existingTour, {
      headers: {
        Authorization: `Bearer ${getUserJwtToken()}`,
      }
    });

    if(response.data.success) {
      toast.success(response.data.message, { id: "addTourSuccess" });
      setExistingTour({
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

  const loadTourDetails = async () => {
    const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/tours/${id}`, {
      headers: {
        Authorization: `Bearer ${getUserJwtToken()}`,
      }
    });

    if(response.data.success) {
      toast.success(response.data.message, { id: "loadTourDetailsSuccess" });
    setExistingTour({
      ...response.data.data,
      startDate: response.data.data.startDate.split("T")[0],
      endDate: response.data.data.endDate.split("T")[0],
    });
    }else {
      toast.error(response.data.message, { id: "loadTourDetailsError" });
    }
  }

  useEffect(() => {
    loadTourDetails();
  }, [id])

  useEffect(() => {
    setPageTitle('New Tour - TinyTours');
  }, []);
  return (
    <div>
      <Navbar />
      

      <div className='w-95 block mx-auto mt-15 bg-white border border-gray-300 rounded px-4 py-6 shadow-md'>
        <h2 className='text-2xl text-center mb-6 poppins-semibold-italic'>Edit Tour Details {id}</h2>
        <Input
          type={"text"}
          placeholder={"Title"}
          value={existingTour.title}
          onChange={(e) => {
            setExistingTour({ ...existingTour, title: e.target.value })
          }
          }
        />

        <Input
          type={"text"}
          placeholder={"Description"}
          value={existingTour.description}
          onChange={(e) => {
            setExistingTour({ ...existingTour, description: e.target.value })
          }}
        />

        <MultiSelect 
        selectedItems={existingTour.cities}
        placeholder={"Enter City"}
        onAddItem={(val)=> {
          setExistingTour({
            ...existingTour,
            cities: [...existingTour.cities,val]
          })
        }}
        onRemoveItem={(val) => {
          setExistingTour({
            ...existingTour,
            cities: existingTour.cities.filter((city) => city !== val)
          })
        }}
        />

        <Input
          type={"date"}
          placeholder={"Start Date"}
          value={existingTour.startDate}
          onChange={(e) => {
            setExistingTour({ ...existingTour, startDate: e.target.value })
          }}
        />

        <Input
          type={"date"}
          placeholder={"End Date"}
          value={existingTour.endDate}
          onChange={(e) => {
            setExistingTour({ ...existingTour, endDate: e.target.value })
          }}
        />

<div className='flex mx-2'>
        {existingTour.photos?.map((photo, index) => (
          <PhotoViwer 
          imageUrl={photo} 
          key={index} 
          onDelete={(url) => {
            setExistingTour({
              ...existingTour,
              photos: existingTour.photos.filter((photo) => photo !== url)
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
        className='border bg-white border-gray-300 rounded px-2 py-1 mx-2 my-1 focus:outline-none focus:ring-1 focus:ring-red-400
        block w-full'
        />
        </div>
        { progress > 0 ? `Uploading... ${progress}%` : null}


        <div>
        <Button title={"Edit Tour"} onClick={editTour} />
        </div>
      </div>
      <Toaster />
    </div>
  )
}

export default EditTour
