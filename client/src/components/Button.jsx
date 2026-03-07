import React from 'react'

function Button({title, size = "small", varient = "primary", onClick}) {

  const SIZE_CLASSES = {
    small: 'px-2 py-1 text-xs mx-2',
    medium: 'px-4 py-2 text-sm mx-2',
    large: 'px-6 py-2 text-lg mx-2',
  }

  const VARIENT_CLASSES = {
    primary: 'bg-red-700 hover:bg-red-800 text-white',
    secondary: 'bg-gray-700 hover:bg-gray-800 text-white',
    danger: 'bg-red-500 hover:bg-red-600 text-white',
  }
  return (
    <div>
      <button onClick={onClick} className={`${VARIENT_CLASSES[varient]} rounded ${SIZE_CLASSES[size]}`}>
        {title}
      </button>
    </div>
  )
}

export default Button
