import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connetDB from "./db.js";
import ImageKit from "@imagekit/nodejs";

import { checkJWT } from "./middlewares/jwt.js";
import { getHealth, getHome } from "./controllers/health.js";
import { postLogin, postSignup } from "./controllers/auth.js";
import { getTours, postTours, putTours } from "./controllers/tours.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 8080;

const client = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY
});

app.get("/", getHome);
app.get("/health", getHealth);

app.get('/auth', function (req, res) {
  const { token, expire, signature } = client.helper.getAuthenticationParameters();
  res.send({ token, expire, signature, publicKey: process.env.IMAGEKIT_PUBLIC_KEY });
});

app.post("/tours", checkJWT, postTours);
app.get("/tours", checkJWT, getTours);
app.put("/tours/:id", checkJWT, putTours)

app.post("/signup", postSignup);
app.post("/login", postLogin);

app.listen(PORT , () => {
    console.log(`Server is running on Port: ${PORT}`);;

    connetDB();
});