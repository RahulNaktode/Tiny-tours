function Avatar({name, size = "medium"}) {

    const SIZE_CLASS = {
        small: "h-7 w-7 text-xs",
        medium: "h-8 w-8 text-sm",
        large: "h-12 w-12 text-lg",
    }
  return (
    <>
      <div className={`bg-black text-white ${SIZE_CLASS[size]} flex items-center justify-center rounded-full mr-2`}>
        {name[0]}
      </div>
    </>
  )
}

export default Avatar
