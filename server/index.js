import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import connectDB from "./db.js";
import ImageKit from "@imagekit/nodejs";
dotenv.config();

// Routes
import { getHome, getHealth } from "./controllers/health.js";
import { postLogin, postSignUp } from "./controllers/auth.js";
import { getTours, postTours, putTours, getTourById } from "./controllers/tours.js";

// Middlewares
import { checkJWT } from "./middlewars/jwt.js";

const app = express();
app.use(express.json());
app.use(cors());

const client = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY
});

const PORT = process.env.PORT || 8020;

app.get("/", getHome);
app.get('/auth', function (req, res) {
  const { token, expire, signature } = client.helper.getAuthenticationParameters();
  res.send({ token, expire, signature, publicKey: process.env.IMAGEKIT_PUBLIC_KEY });
});

app.get("/health", getHealth);

app.post("/signup", postSignUp);
app.post("/login", postLogin);

app.post("/tours", checkJWT, postTours);
app.get("/tours", checkJWT, getTours);
app.put("/tours/:id", checkJWT, putTours);
app.get("/tours/:id", checkJWT, getTourById);

app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
    connectDB();
})