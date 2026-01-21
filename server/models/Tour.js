import {model, Schema} from "mongoose";

const tourSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    cities: {
        type: [String],
        default: [],
    },
    startDate: {
        type: Date,
    },
    endData: {
        type: Date,
    },
    photos: {
        type: [
            {
                imgUrl: String,
                title: String,
                description: String,
            },
        ],
        default: [],
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

})

const Tour = model("Tour", tourSchema);

export default Tour