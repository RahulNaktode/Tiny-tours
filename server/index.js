import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import connectDB from "./db.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 8020;

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

app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
    connectDB();
})