function Button({title, size, varient, onClick}) {
  const BUTTON_SIZE = {
    small : "px-2 py-1 text-xs mx-2",
    medium: "px-4 py-2 text-sm mx-3",
    large: "px-6 py-2 text-lg mx-4"
  }

  const VARIENT_CLASS = {
    primary: "bg-blue-500 text-white hover:bg-blue-600",
    secondary: "bg-gray-500 text-white hover:bg-gray-600",
    tertiary: "bg-orange-400 text-black hover:bg-orange-500",
  }
  return (
    <button
    onClick={onClick}
    className={`${VARIENT_CLASS[varient]} cursor-pointer ${BUTTON_SIZE[size]} rounded`}>
      {title}
    </button>
  )
}

export default Button
