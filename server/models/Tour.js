import { Schema, model } from "mongoose";

const TourSchema = new Schema({
    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    cities: {
        type:[ String],
        default: [],
    },

    startDate: {
        type: Date,
    },

    endDate: {
        type: Date,
    },

    photos: {
        type: [
            {
                imageURL: String,
                title: String,
                description: String
            }
        ],
        default: []
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, { timestamps: true })

const Tour = model("Tour", TourSchema)

export default Tour