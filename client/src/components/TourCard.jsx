import React from 'react'
import { Building2, Footprints, LandPlot } from 'lucide-react';
import Avatar from './Avatar';
import PhotoViwer from './PhotoViwer';

function TourCard({ id, title, description, cities, photos, user, startDate, endDate, createdAt, updatedAt }) {

    const { name, email } = user;
  return (
    <div className='border border-gray-700 px-4 py-3 rounded shadow-md'>
      <h2 className='text-lg'>{title}</h2>

      <p className='text-sm text-gray-500'>{description}</p>

      <p className='flex mr-1 my-2'><Building2 />
      {cities.map((city, index) => (
        <span key={index} className='mx-2 bg-gray-300 px-4 text-md rounded-full'>{city}</span>
      ))}
      </p>

      <div className='flex items-center'>
        <span className='mr-1'>Posted By:</span><Avatar name={name} size='small'/> <strong>{name}</strong> ({email})
      </div>

      <p className='flex items-center my-2'>
        <Footprints className='mr-2 h-6 w-6'/> Started on: {new Date(startDate).toLocaleDateString()}
        <LandPlot className='mr-2 ml-4 h-6 w-6'/> Ended on: {new Date(endDate).toLocaleDateString()}
      </p>

      <div className='flex mt-2'>
        {photos.map((photo, index) => {
            return (
                <PhotoViwer imageUrl={photo} key={index} />
            )
        })}
      </div>
    </div>
  )
}

export default TourCard
