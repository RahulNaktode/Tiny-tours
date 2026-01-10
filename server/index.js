import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connetDB from "./db.js";

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
})

app.listen(PORT , () => {
    console.log(`Server is running on Port: ${PORT}`);;

    connetDB();
})