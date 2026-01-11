import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connetDB from "./db.js";
import User from './models/User.js'

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 8080;


app.get("/", (req, res) => {
    return res.json({
        message: "Welcome to Tiny Tours"
    })
})

app.get("/health", (req, res) => {
    return res.json({
        status: "OK"
    })
});

app.post("/signup", async (req, res) =>{
    const {name, email, mobile, city, country, password} = req.body;

    const newUser = new User({
        name, email, mobile, city, country, password
    });

    if(!name){
        return res.json({
            success: false,
            message: "name is requried",
            data: null
        })
    }

    if(!email){
        return res.json({
            success: false,
            message: "email is requried",
            data: null
        })
    }

    if(!password){
        return res.json({
            success: false,
            message: "password is requried",
            data: null
        })
    }

    const existingUser = await User.findOne({email});

    if(existingUser){
        return res.json({
            success: false,
            message: "Email is already existing",
            data: null,
        })
    }

    try{
        const saveUser = await newUser.save();

        return res.json({
            success: true,
            message: "User register Successfully",
            data: saveUser
        })
    }catch(error){
        return res.json({
            success: false,
            message: `User registration failed: ${error.message}`,
            data: null,
        })
    }
})

app.listen(PORT , () => {
    console.log(`Server is running on Port: ${PORT}`);;

    connetDB();
})