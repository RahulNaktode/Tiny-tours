import { useState } from "react"
import Input from "./Input"

function MultiSelect({selectedItem, placesholder, onRemoveItem, onAddItem}) {

    const [newTour, setNewTour] = useState("");
  return (
    <div>
      {selectedItem.map((item, index) => {
        return (
            <div className="border border-gray-600 bg-gray-200 mx-2 px-2 rounded-full inline-block my-1" key={index}>
                {item}{" "}
                <span className="text-gray-400 ml-2 cursor-pointer hover:text-gray-700" 
                onClick={() => onRemoveItem(item)}
                >x</span>
            </div>
        )
      })}
      <Input type={"text"} placesholder={placesholder}
      value={newTour} 
      onChange={(e) => {
        setNewTour(e.target.value)
      }}
      onKeyDown={(e) => {
        if(e.key === "Enter"){
            onAddItem(e.target.value);
            setNewTour("");
        }
      }}
      />
    </div>
  )
}

export default MultiSelect
