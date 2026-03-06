import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { JWT_EXPIRATION } from './../config.js';
import dotenv from "dotenv";
dotenv.config();

const postSignUp = async (req, res) => {
    const { name, email, mobile, password, city, country } = req.body;

    if (!name) {
        return res.json({
            success: true,
            message: "Name is required",
            data: null
        })
    }

    if (!email) {
        return res.json({
            success: true,
            message: "email is required",
            data: null
        })
    }

    if (!password) {
        return res.json({
            success: true,
            message: "password is required",
            data: null
        })
    }

    const salt = bcrypt.genSaltSync(10);
    const encryptedPassword = bcrypt.hashSync(password, salt);

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        return res.json({
            success: false,
            message: "User with this email already exists",
            data: null
        })
    }

    const newUser = new User({
        name,
        email,
        mobile,
        city,
        country,
        password: encryptedPassword,
    });

    try {
        const savedUser = await newUser.save();

        return res.json({
            success: true,
            message: "User register Successfully",
            data: savedUser
        })
    } catch (error) {
        return res.json({
            success: false,
            message: `User register failed: ${error.message}`,
            data: null
        })
    }
}

const postLogin = async (req, res) => {
    const { email, password } = req.body;

    if (!email) {
        return res.json({
            success: true,
            message: "email is required",
            data: null
        })
    }

    if (!password) {
        return res.json({
            success: true,
            message: "password is required",
            data: null
        })
    }

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
        return res.json({
            success: true,
            message: "User doesn't exist with is email, please signup",
            data: null
        });
    }

    const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);

    existingUser.password = undefined;

    
    const jwtToken = jwt.sign({
            id: existingUser._id,
            email: existingUser.email,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: JWT_EXPIRATION,
        }
    );

    if (isPasswordCorrect) {
        return res.json({
            success: true,
            message: "Login Successfully",
            data: existingUser,
            jwtToken: jwtToken,
        });
    }
    else {
        return res.json({
            success: false,
            message: "Invalid email or password",
            data: null,
        });
    }
}

export { postSignUp, postLogin }