import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connetDB from "./db.js";
import User from './models/User.js';
import Tour from './models/Tour.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';


dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 8080;

const checkJWT = (req, res, next) => {
    const { authorization } = req.headers;
    const token = authorization && authorization.split(" ")[1];
    console.log("TOKEN : ", token);

    try{
        const decoded = jwt.verify(token, process.env.JWT_TOKEN);
        req.user= decoded;
        next();  
    }catch(err){
        return res.json({
            success: false,
            message: "Invalid 0r missing token",
            data: null,
        })
    }
};

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

app.post("/tours", checkJWT, async (req, res) => {
    const {title, description, cities, startDate, endDate, photos} = req.body;

    const newTour = new Tour({
        title,
        description,
        cities,
        startDate,
        endDate,
        photos,
        user: req.user.id,
    });

    try{
        const savedTour = await newTour.save();

        return res.json({
            success: true,
            message: "Tour created successfully",
            data: savedTour,
        });
    }
    catch(error){
        return res.json({
            success: false,
            message: `Tour created failed: ${error.message}`,
            data: null,
        })
    }
});

app.get("/tours", checkJWT, async (req, res) => {

    const tours = await Tour.find({user: req.user.id}).populate("user", "-password");

    return res.json({
        success: true,
        message: "Fetched tours successfully",
        data: tours,
    })
})

app.post("/signup", async (req, res) =>{
    const {name, email, mobile, city, country, password} = req.body;

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

    const salt = bcrypt.genSaltSync(10);
const encryptPassword = bcrypt.hashSync(password, salt);

    const newUser = new User({
        name, email, mobile, city, country, password:encryptPassword
    });

    

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

app.post("/login", async (req, res) => {

    const {email, password} = req.body;

    if(!email){
        return res.json({
            success: false,
            message: "email is required",
            data: null,
        })
    }

    if(!password){
        return  res.json({
            success: false,
            message: "password is required",
            data: null,
        })
    }

    const existingUserdata = await User.findOne({email});

    if(!existingUserdata){
        return res.json({
            success: false,
            message: "Invalid email or password",
            data: null,
        })
    }

    const isPasswordCorrect = bcrypt.compareSync(password, existingUserdata.password);

    existingUserdata.password = undefined;

    if(isPasswordCorrect){

        const jwtToken = jwt.sign(
            {
            id:existingUserdata._id,
            email:existingUserdata.email,
        },
        process.env.JWT_TOKEN,
        {
            expiresIn:"1h"
        }
    )

        return res.json({
            success: true,
            message: "Login successfully",
            data: existingUserdata,
            jwtToken:jwtToken,
        })
    }
    else{
        return res.json({
            success: false,
            message: "Invalid email or password",
            data: null,
        })
    }
})

app.listen(PORT , () => {
    console.log(`Server is running on Port: ${PORT}`);;

    connetDB();
})