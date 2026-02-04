import { useState } from "react";
import { Trash2 } from "lucide-react";

function PhotoPreview({ imgUrl, show, onClose }) {
    if (!show) return null;

    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center py-10 bg-gray-900">
            <span onClick={onClose}
            className="text-white absolute top-5 right-5 text-3xl cursor-pointer"
            >X</span>
            <img src={imgUrl} alt="Preview"
                className="max-h-full max-w-full rounded-md"
            />
        </div>
    )
}

function PhotoViewer({ imgUrl, index, onDelete, showDelete = false }) {

    const [showPreview, setShowPreview] = useState(false);
    return (
        <div className="flex items-center justify-center relative w-fit shadow-lg rounded-md">
            <img index={index} src={imgUrl} alt={`Tours Photo ${imgUrl + 1}`}
                className="w-35 h-auto mt-2 rounded-md object-cover mx-2 cursor-pointer"
                onClick={() => setShowPreview(true)}
            />

            {showDelete ? <Trash2 className="absolute right-1 top-1 text-red-500 h-4 w-4 cursor-pointer"
            onClick={() => {
                onDelete(imgUrl)
            }}
            /> : null}

            <PhotoPreview imgUrl={imgUrl} show={showPreview} onClose={() => {
                setShowPreview(false);
            }} />
        </div>
    )
}

export default PhotoViewer
