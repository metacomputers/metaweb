import express from "express";
import {
    createConsult,
    updateConsult,
    deleteConsult,
    getConsults,
    getAConsult,
    getUserConsults
} from "../controllers/ConsultController.js";
import { authenticate, authorizeAdmin } from "../middlewares/auth.js";

const consultRouter = express.Router();

// Protect all routes with authentication
consultRouter.use(authenticate);

// Admin routes
consultRouter.get("/", authorizeAdmin, getConsults);
consultRouter.delete("/:id", authorizeAdmin, deleteConsult);

// User routes
consultRouter.post("/", createConsult);
consultRouter.get("/user", getUserConsults);
consultRouter.get("/:id", getAConsult);
consultRouter.put("/:id", updateConsult);

export default consultRouter;