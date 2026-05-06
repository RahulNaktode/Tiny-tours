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

function Signup() {
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    photo: [],
    mobile: "",
    city: "",
    country: "",
    password: "",
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

      setNewUser({
        ...newUser,
        photo: [...newUser.photo, uploadResponse.url],
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

  useEffect(() => {
    setPageTitle('Signup - TinyTours');
  }, []);

  const createUser = async () => {
    const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/signup`, newUser);

    if (response.data.success) {
      toast.success(response.data.message, { id: "signupsuccess" });
      setNewUser({
        name: "",
        email: "",
        photo: [],
        mobile: "",
        city: "",
        country: "",
        password: "",
      });

      setTimeout(() => {
        window.location.href = "/login";
      }, 1000);
    } else {
      toast.error(response.data.message, { id: "signuperror" });
    }
  }

  return (
    <div>
      <Navbar />

      <div className='w-95 block mx-auto mt-15 border border-gray-300 rounded px-4 py-6 shadow-md bg-white'>
        <h2 className='text-2xl text-center mb-6 poppins-semibold-italic'>Create Your Account</h2>
        <Input
          type={"text"}
          placeholder={"name"}
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
        />

        <Input
          type={"text"}
          placeholder={"email"}
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
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
          onChange={handleUpload}
          className='border bg-white border-gray-300 text-gray-500 rounded px-2 py-1 mx-2 my-1 focus:outline-none focus:ring-1 focus:ring-red-400
        block w-full'
        />

        <Input
          type={"text"}
          placeholder={"mobile"}
          value={newUser.mobile}
          onChange={(e) => setNewUser({ ...newUser, mobile: e.target.value })}
        />

        <Input
          type={"text"}
          placeholder={"city"}
          value={newUser.city}
          onChange={(e) => setNewUser({ ...newUser, city: e.target.value })}
        />

        <Input
          type={"text"}
          placeholder={"country"}
          value={newUser.country}
          onChange={(e) => setNewUser({ ...newUser, country: e.target.value })}
        />

        <Input
          type={"password"}
          placeholder={"password"}
          value={newUser.password}
          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
        />


        <Button title={"Signup"} onClick={createUser} />

        <Link to="/login" className='text-blue-500 '>Already have an account? Login</Link>
      </div>
      <Toaster />
    </div>

  )
}

export default Signup
