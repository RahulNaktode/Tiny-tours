import { Link } from "react-router";
import { Facebook, Instagram, Youtube, Github, Twitter } from "lucide-react";

function Footer() {
  return (
    <div className="bg-red-400 py-2 md:px-10 px-2">
      <div className="flex justify-between">
        <div className="max-w-100">
        <h2 className=" text-gray-800 md:text-xl text-lg poppins-semibold-italic border-b mb-4 pb-2 text-center">Tiny Tours</h2>
        <p className="text-gray-800 md:text-sm text-xs poppins-regular">Record every moment with Tiny Tours. And create unforgettable memories.</p>
        </div>

        <div className="mb-4">
          <h3 className="font-semibold text-lg mb-4 text-gray-800 border-b pb-2 text-center">Contact Us</h3>
          <p className="text-gray-800 md:text-sm text-xs poppins-regular">Email: info@tinytours.com</p>
          <p className="text-gray-800 md:text-sm text-xs poppins-regular">Phone: +91 1234567890</p>
          <p className="text-gray-800 md:text-sm text-xs poppins-regular">Address: 123 Tour Street, Nagpur, Maharashtra, India</p>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-4 text-gray-800 border-b pb-2 text-center">
            Follow Us
          </h3>

          <div className="flex justify-center md:justify-start md:gap-4 gap-1 text-lg">
            <Link to="https://facebook.com" target="_blank" rel="noopener noreferrer"
              className="rounded-full hover:scale-110 hover:text-red-700 transition">
              <Facebook  className="h-4 md:h-8"/>
            </Link>

            <Link to="https://instagram.com" target="_blank" rel="noopener noreferrer"
              className="rounded-full hover:scale-110 hover:text-red-700 transition">
              <Instagram className="h-4 md:h-8"/>
            </Link>

            <Link to="https://twitter.com" target="_blank" rel="noopener noreferrer"
              className="rounded-full hover:scale-110 hover:text-red-700 transition">
              <Twitter className="h-4 md:h-8"/>
            </Link>

            <Link to="https://github.com" target="_blank" rel="noopener noreferrer"
              className=" rounded-full hover:scale-110 hover:text-red-700 transition">
              <Github className="h-4 md:h-8"/>
            </Link>

            <Link to="https://youtube.com" target="_blank" rel="noopener noreferrer"
              className=" rounded-full hover:scale-110 hover:text-red-700 transition">
              <Youtube className="h-4 md:h-8"/>
            </Link>
          </div>
        </div>
        
      </div>
      <p className="text-center text-white md:text-sm text-xs poppins-regular">
        &copy; {new Date().getFullYear()} Tiny Tours. All rights reserved.
      </p>
    </div>
  )
}

export default Footer
