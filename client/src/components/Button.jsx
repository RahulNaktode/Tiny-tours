function Button({title, onClick}) {
  return (
    <button
    onClick={onClick}
    className="bg-blue-500 text-white cursor-pointer px-4 py-2 rounded hover:bg-blue-600">
      {title}
    </button>
  )
}

export default Button
