import React from 'react'

function Button({title, size = "medium", varient = "primary", onClick}) {

  const SIZE_CLASSES = {
    small: 'px-2 py-1 text-xs mx-2',
    medium: 'md:px-4 px-2 md:py-2 py-1 md:text-sm text-xs mx-2',
    large: 'md:px-6 px-5 py-2 text-lg mx-2',
  }

  const VARIENT_CLASSES = {
    primary: 'bg-red-700 hover:bg-red-800 text-white',
    secondary: 'bg-gray-700 hover:bg-gray-800 text-white',
    danger: 'bg-red-500 hover:bg-red-600 text-white',
  }
  return (
    <div>
      <button onClick={onClick} className={`${VARIENT_CLASSES[varient]} rounded ${SIZE_CLASSES[size]} poppins-semibold-italic block mx-auto my-2`}>
        {title}
      </button>
    </div>
  )
}

export default Button
