//Packages
import path from "path";
import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";


//Utils
import connectDB from "./config/db.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";



dotenv.config();
const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);


app.listen(port, () => console.log(`Server running on port: ${port}`));