import { useEffect, useState, useRef } from "react";
import { setPageTitle, getUserJwtToken } from "./../utils.jsx";
import Navbar from "../components/Navbar.jsx";
import Input from "../components/Input.jsx";
import MultiSelect from "../components/MultiSelect.jsx";
import Button from "../components/Button.jsx";
import axios from "axios";
import toast, {Toaster} from 'react-hot-toast';
import {
    ImageKitAbortError,
    ImageKitInvalidRequestError,
    ImageKitServerError,
    ImageKitUploadNetworkError,
    upload,
} from "@imagekit/react";
import PhotoViewer from "../components/PhotoViewer.jsx";

function NewTours() {

  const [newTours, setNewTours] = useState({
    title : "",
    description : "",
    cities : [], 
    startDate : "", 
    endDate : "", 
    photos : [],
  });

  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef();

  const authenticator = async () => {
        try {
            const response = await fetch("http://localhost:8080/auth");
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

                setNewTours({
                  ...newTours, photos: [...newTours.photos, uploadResponse.url]
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

<div className="flex gap-2">
      {
        newTours.photos?.map((photo, index) => 
          (
            <PhotoViewer imgUrl={photo} index={index} key={index} 
            onDelete={() => {
              setNewTours({
                ...newTours, photos: newTours.photos.filter((p) => p !== photo)
              })
            }}
            showDelete
            />
         
          )
        )
      }
      </div>

      <input type="file" ref={fileInputRef}
      onChange={(e) => {
        if(e.target.files.length > 0){
          handleUpload();
        }
      }}
      />
      {progress ? `Upload...${progress}%` : null}

      <div className="w-75 block m-auto mt-10">
        <Button title="Add Tour" size="medium" varient="primary" onClick={addTour}/>
      </div>
      </div>
      <Toaster />
    </div>
  )
}

export default NewTours
