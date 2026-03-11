function Avatar({name, size = "medium"}) {

    const SIZE_CLASS = {
        small: "h-7 w-7 text-xs",
        medium: "md:h-8 h-7 md:w-8 w-7 text-sm",
        large: "md:h-12 h-10 md:w-12 w-10 text-lg",
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
