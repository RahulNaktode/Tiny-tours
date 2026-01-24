function Input({type, placesholder, value, onChange}) {
  return (
    <input
    type={type}
    placeholder={placesholder}
    value={value}
    onChange={onChange}
    className="border border-gray-300 rounded px-2 py-1 mx-2 my-1 
    focus:outline-none focus:ring-2 focus:ring-blue-500 block w-full"
    />
  )
}

export default Input
