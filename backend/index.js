//Dependencies
import path from "path";
import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";

//Utilities
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";

dotenv.config();
const port = process.env.PORT || 5000;

//DB Connection
connectDB();

const app = express(); //Express initialization

//Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//PI Routes
app.use("/api/products", productRoutes);
app.use("/api/upload", uploadRoutes);


const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname + "/uploads")));

//Starting the server
app.listen(port, () => console.log(`Server running on port: ${port}`));
