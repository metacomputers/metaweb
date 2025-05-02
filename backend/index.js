//Dependencies
import path from "path";
import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";

//Utilities
import connectDB from "./config/db.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

import quotationRoutes from "./routes/quotationRoutes.js"
import productRoutes from "./routes/productRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import repairRoutes from "./routes/repairRoutes.js"
import consultsRoute from "./routes/consultRoutes.js"

dotenv.config();
const port =  5000;

//DB Connection
connectDB();

const app = express(); //Express initialization

//Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Set-Cookie']
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/api/test-cookie', (req, res) => {
    console.log(req.cookies); // see if "jwt" appears here
    res.send('Cookies checked!');
  });

app.use("/api/maintenance/repairs",repairRoutes)
app.use("/api/maintenance/consults",consultsRoute)
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/products", productRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/users", userRoutes);
app.use("/api/quotations", quotationRoutes);




const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname + "/uploads")));


app.listen(port, () => console.log(`Server running on port: ${port}`));