import jwt from 'jsonwebtoken';
import dotenv from "dotenv";

dotenv.config();

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

export {checkJWT}