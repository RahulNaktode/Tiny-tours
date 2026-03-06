import React from 'react'

function Input({ type,placeholder, value, onChange}) {
  return (
    <div>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className='border border-gray-300 rounded px-2 py-1 mx-2 my-1 focus:outline-none focus:ring-2 focus:ring-blue-500
        block w-full'
      />
    </div>
  )
}

export default Input
