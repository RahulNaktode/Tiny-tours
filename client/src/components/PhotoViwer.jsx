import { useState } from 'react'

function PhotoPreview({ imageUrl, show, onClose }) {
    if(!show) return null;

    return (
        <div className='fixed top-0 left-0 w-full h-full bg-gray-700 flex items-center justify-center py-10 '>
            <span onClick={onClose} className='absolute top-4 right-10 text-white text-4xl cursor-pointer '>x</span>
            <img src={imageUrl} alt="Preview" className='max-w-full max-h-full rounded-md object-cover' />
        </div>
    )
}

function PhotoViwer({ imageUrl,index}) {
    const [showPreview, setShowPreview] = useState(false);
  return (
    <div>
      <img 
      src={imageUrl} 
      key={index} 
      className='w-35 h-21 mt-2 rounded-md object-cover mx-2 cursor-pointer' 
      onClick={() => {
        setShowPreview(true)
      }}
      />
      <PhotoPreview imageUrl={imageUrl}  show={showPreview} onClose={() => {
        setShowPreview(false);
      }}/>
    </div>
  )
}

export default PhotoViwer
