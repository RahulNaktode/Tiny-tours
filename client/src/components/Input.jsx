import React from 'react'

function Input({ type,placeholder, value, onChange, onKeyDown}) {
  return (
    <div>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        className='border bg-white border-gray-300 rounded px-2 py-1 mx-2 my-1 focus:outline-none focus:ring-1 focus:ring-red-400
        block w-full'
      />
    </div>
  )
}

export default Input
