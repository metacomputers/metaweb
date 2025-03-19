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
const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(cors()); // ✅ Add this


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

console.log("React App is Running...");

app.use('/api/users', userRoutes);


app.listen(port, () => console.log(`Server running on port: ${port}`));
