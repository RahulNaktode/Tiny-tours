import { Building2, Footprints, LandPlot } from "lucide-react"
import Avatar from "./Avatar";
import PhotoViewer from "./PhotoViewer";

function TourCard({ _id, title, description, cities, photos, user, startDate, endDate, createAt, updateAt }) {

    const { name, email } = user;

    return (
        <div className='border border-gray-800 p-3 rounded-md mb-4 shadow-md'>
            <h2 className='text-lg'>{title}</h2>
            <p className='text-xs text-gray-600'>{description}</p>
            <div className="my-2"><Building2 className="inline-block mr-1" />
                {cities.map((city) => {
                    return (
                        <span key={city._id} className="mr-2 text-sm bg-gray-300 px-4 py-0.5 rounded-full">{city}</span>
                    )
                })}
            </div>
            <div className="flex items-center">
                <span className="mr-2">Posted By:</span> <Avatar name={name} size="small" /> <strong>{name}</strong> ({email})
            </div>

            <div className="flex items-center text-sm my-2">
                <Footprints className="mr-2 h-6 w-6"/>Starton: {new Date(startDate).toLocaleDateString()}{" "}
            
                <LandPlot className="ml-4 mr-2 h-6 w-6"/>endon: {new Date(endDate).toLocaleDateString()}
            </div>

            <div className="flex ">
                {photos.map((photo, index) => {
                    return (
                        PhotoViewer({ imgUrl: photo, index })
                    )
                })}
            </div>
        </div>
    )
}

export default TourCard
