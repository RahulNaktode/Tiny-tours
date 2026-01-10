import mongoose from "mongoose";

const connetDB = async () => {

    try{
        const conn = await mongoose.connect(process.env.MONGODB_URL);
    if(conn) {
        console.log("Connect to MongoDB")
    }
    }catch{
        console.error(`Error connection to MongoDB: ${error.message}`)
    }
    
}

export default connetDB