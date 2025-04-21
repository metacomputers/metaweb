//Packages
import path from "path";
import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";

//Utils
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
const port = process.env.PORT || 5001;

connectDB();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, // Important to allow cookies to be sent
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/api/test-cookie', (req, res) => {
    console.log(req.cookies); // see if "jwt" appears here
    res.send('Cookies checked!');
  });

console.log("React App is Running...");

app.use("/api/users", userRoutes);

app.listen(port, () => console.log(`Server running on port: ${port}`));
