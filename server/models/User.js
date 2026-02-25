import { Schema, model } from "mongoose";

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    mobile: {
        type: String,
    },

    city: {
        type: String
    },

    country: {
        type: String
    },

    password: {
        type: String,
        required: true,
    }
})

const User = model("User", UserSchema)

export default User