import mongoose from "mongoose";

const connectDB = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGODB_URL);
        if(conn){
            console.log("Connected to MongoDB")
        }
    } catch (error){
        console.log("Error Connenting to MongoDB", error.message)
    }
}

export default connectDB