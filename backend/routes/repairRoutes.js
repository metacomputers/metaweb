import express from "express";
import {
    createRepair,
    updateRepair,
    deleteRepair,
    getRepairs,
    getARepair,
    getUserRepairs
} from "../controllers/RepairController.js";
import { authenticate, authorizeAdmin } from "../middlewares/auth.js";

const repairRouter = express.Router();

// Protect all routes with authentication
repairRouter.use(authenticate);

// Admin routes
repairRouter.get("/", authorizeAdmin, getRepairs);
repairRouter.delete("/:id", authorizeAdmin, deleteRepair);

// User routes
repairRouter.post("/", createRepair);
repairRouter.get("/user", getUserRepairs);
repairRouter.get("/:id", getARepair);
repairRouter.put("/:id", updateRepair);

export default repairRouter;