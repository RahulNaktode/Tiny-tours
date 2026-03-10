import { useState } from 'react'
import { Trash2 } from 'lucide-react';

function PhotoPreview({ imageUrl, show, onClose }) {
    if(!show) return null;

    return (
        <div className='fixed top-0 left-0 w-full h-full bg-gray-700 flex items-center justify-center py-10 '>
            <span onClick={onClose} className='absolute top-4 right-10 text-white text-4xl cursor-pointer '>x</span>
            <img src={imageUrl} alt="Preview" className='max-w-full max-h-full rounded-md object-cover' />
        </div>
    )
}

function PhotoViwer({ imageUrl,index, onDelete, showDelete = false }) {
    const [showPreview, setShowPreview] = useState(false);
  return (
    <div className='flex items-center justify-center relative w-fit rounded-md'>
      <img 
      src={imageUrl} 
      key={index} 
      className='w-33 h-20 mt-2 rounded-md object-cover mx-2 cursor-pointer' 
      onClick={() => {
        setShowPreview(true)
      }}
      />
      {
        showDelete ? <Trash2 className='text-red-500 absolute top-0 right-1 h-5 w-5 cursor-pointer'
        onClick={() => onDelete(imageUrl)}
        /> : null 
      }
      <PhotoPreview imageUrl={imageUrl}  show={showPreview} onClose={() => {
        setShowPreview(false);
      }}/>
    </div>
  )
}

export default PhotoViwer
