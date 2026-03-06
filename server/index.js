import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import connectDB from "./db.js";
import User from "./models/User.js"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Tour from "./models/Tour.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 8020;

const checkJWT = (req, res, next) => {
    const { authorization } = req.headers;
    const token = authorization && authorization.split(" ")[1];

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch(error){
        return res.json({
            success: false,
            message: "Invalid or missing token",
            data: null,
        })
    }
}

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Welcome to Tiny Tour"
    })
});

app.get("/health", (req, res) => {
    res.json({
        success: true,
        message: "OK"
    })
});

app.post("/signup", async (req, res) => {
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
});

app.post("/login", async (req, res) => {
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
            expiresIn: "1d",
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
});

app.post("/tours", checkJWT, async (req, res) => {
    const { title, description, cities, startDate, endDate, photos } = req.body;

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
            message: "Tour created Successfully",
            data: savedTour,
        })
    }
    catch(error){
        return res.json({
            success: false,
            message: `Tour creation failed: ${error.message}`,
            data: null,
        })
    }
});

app.get("/tours", checkJWT, async (req, res) => {

    const tours = await Tour.find({user: req.user.id}).populate("user", "-password");
    return res.json({
        success: true,
        message: "Tours fetched Successfully",
        data: tours,
    })
})

app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
    connectDB();
})