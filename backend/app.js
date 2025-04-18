import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
// Import routes correctly
import repairs from "./routes/repairs.js";
import consults from "./routes/consults.js";

// Import DB connection
import connectDB from "./config/db.js";

dotenv.config();
const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

// Routes
app.use("/repairs", repairs);
app.use("/consults", consults);

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.listen(port, () => console.log(`Server running on port: ${port}`));
