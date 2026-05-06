import React from 'react'
import { useEffect, useState, useRef } from 'react'
import { setPageTitle } from '../utils'
import Input from '../components/Input';
import Button from '../components/Button';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { Link } from 'react-router';
import Navbar from '../components/Navbar';
import {
  ImageKitAbortError,
  ImageKitInvalidRequestError,
  ImageKitServerError,
  ImageKitUploadNetworkError,
  upload,
} from "@imagekit/react";
import  { getUserData } from '../utils';

function ProfileUpdate() {
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    photo: [],
    mobile: "",
    city: "",
    country: "",
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

      setNewUser((prev) => {
        const updatedData = {
          ...prev,
          photo: [uploadResponse.url]
        };

        localStorage.setItem("userData", JSON.stringify(updatedData));

        return updatedData;
      });

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

  useEffect(() => {
    setPageTitle('Profile Update - TinyTours');
  }, []);

  useEffect(() => {
    const data = getUserData();
    console.log("USER DATA:", data);
    setNewUser(prev => ({ ...prev, ...data }));
  }, []);

  const handleChange = (e) => {
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value
    });
  };

  const updateProfile = async () => {
    try {
      const token = localStorage.getItem("userJwtToken");

      const response = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/profile`,
        newUser,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const updatedUser = {
        ...response.data.data,
        photo: newUser.photo
      };

      localStorage.setItem("userData", JSON.stringify(updatedUser));
      window.dispatchEvent(new Event("storage"));

      toast.success("Profile Updated Successfully");

      setNewUser(updatedUser);

      setTimeout(() => {
        window.location.href = "/";
      }, 1000);

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Navbar />

      <div className='w-95 block mx-auto mt-15 border border-gray-300 rounded px-4 py-6 shadow-md bg-white'>
        <h2 className='text-2xl text-center mb-6 poppins-semibold-italic'>Update Account</h2>
        <Input
        name="name"
          type={"text"}
          placeholder={"name"}
          value={newUser.name}
          onChange={handleChange}
        />

        <Input
        name="email"
          type={"text"}
          placeholder={"email"}
          value={newUser.email}
          onChange={handleChange}
        />

        <div className='flex items-center justify-center'>
          {
            newUser.photo.map((photo, index) => {
              return <img key={index} src={photo} alt="User Photo" className='h-15 w-15 rounded-full object-cover mx-2 my-1' />
            })
          }
        </div>

        <input
          type="file"
          ref={fileInputRef}
          onChange={(e) => {
            if (e.target.files && e.target.files.length > 0) {
              handleUpload();
            }
          }}
          className='border bg-white border-gray-300 text-gray-500 rounded px-2 py-1 mx-2 my-1 focus:outline-none focus:ring-1 focus:ring-red-400
        block w-full'
        />

        <Input
          name="mobile"
          type={"text"}
          placeholder={"mobile"}
          value={newUser.mobile}
          onChange={handleChange}
        />

        <Input
        name="city"
          type={"text"}
          placeholder={"city"}
          value={newUser.city}
          onChange={handleChange}
        />

        <Input
        name="country"
          type={"text"}
          placeholder={"country"}
          value={newUser.country}
          onChange={handleChange}
        />

        <Button title={"Update Profile"} onClick={updateProfile} />
      </div>
      <Toaster />
    </div>

  )
}

export default ProfileUpdate