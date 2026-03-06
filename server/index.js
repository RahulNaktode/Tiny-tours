import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import connectDB from "./db.js";

dotenv.config();

// Routes
import { getHome, getHealth } from "./controllers/health.js";
import { postLogin, postSignUp } from "./controllers/auth.js";
import { getTours, postTours } from "./controllers/tours.js";

// Middlewares
import { checkJWT } from "./middlewars/jwt.js";

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 8020;

app.get("/", getHome);

app.get("/health", getHealth);

app.post("/signup", postSignUp);

app.post("/login", postLogin);

app.post("/tours", checkJWT, postTours);

app.get("/tours", checkJWT, getTours);

app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
    connectDB();
})