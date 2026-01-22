import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connetDB from "./db.js";

import { checkJWT } from "./middlewares/jwt.js";
import { getHealth, getHome } from "./controllers/health.js";
import { postLogin, postSignup } from "./controllers/auth.js";
import { getTours, postTours } from "./controllers/tours.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 8080;

app.get("/", getHome);
app.get("/health", getHealth);

app.post("/tours", checkJWT, postTours);
app.get("/tours", checkJWT, getTours)

app.post("/signup", postSignup);
app.post("/login", postLogin);

app.listen(PORT , () => {
    console.log(`Server is running on Port: ${PORT}`);;

    connetDB();
});