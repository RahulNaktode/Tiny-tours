import User from './../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
import { JWT_EXPIRATION } from '../config.js';

dotenv.config();

const postSignup = async (req, res) =>{
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
}

const postLogin = async (req, res) => {

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
            expiresIn: JWT_EXPIRATION,
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
}

export {postLogin, postSignup}