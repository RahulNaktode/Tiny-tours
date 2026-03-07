import React from 'react'
import Input from './Input'
import { useState } from 'react'

function MultiSelect({selectedItems, placeholder, onRemoveItem, onAddItem}) {
    const [newItem, setNewItem] = useState("");
  return (
    <div>
      {selectedItems.map((item, index) => {
        return (     
            <div className='border border-gray-500 rounded-full mx-2 px-2 bg-gray-200 inline-block'>{item}
            <span className='ml-2 text-gray-500 hover:text-gray-700 cursor-pointer'
            onClick={() => {
                onRemoveItem(item)
            }}
            >x</span>
            </div> 
        )
      })}

        <Input 
        type={"text"}
        placeholder={placeholder} 
        value={newItem}
        onChange={(e)=> {
            setNewItem(e.target.value)
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            onAddItem(e.target.value);
            setNewItem("");
          }
        }} />
    </div>
  )
}

export default MultiSelect
