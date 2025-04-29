import express from "express";
import {
    createRepair,
    updateRepair,
    deleteRepair,
    getRepairs,
    getARepair
} from "../controllers/RepairController.js";

const repairRouter = express.Router();

/**
 * Get all repairs with pagination
 */
repairRouter.get("/", async (req, res) => {
    try {
        console.log(`Fetching repairs`);
        const repairs = await getRepairs();
        res.status(200).send(repairs);
    } catch (e) {
        console.error("Error fetching repairs:", e);
        res.status(500).send({ error: e.message });
    }
});

/**
 * Create a new repair
 */
repairRouter.post("/", async (req, res) => {
    try {
        console.log("Creating a new repair:", req.body);
        const repair = req.body;
        const newRepair = await createRepair(repair);
        console.log("Repair created successfully:", newRepair);
        res.status(201).send({
            status: "success",
            data: newRepair
        });
    } catch (e) {
        console.error("Error creating repair:", e);
        res.status(500).send({ error: e.message });
    }
});

/**
 * Update a repair by ID
 */
repairRouter.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        console.log(`Updating repair with ID: ${id}`, req.body);
        const repairData = req.body;
        const updatedRepair = await updateRepair(repairData, id);
        console.log("Repair updated successfully:", updatedRepair);
        res.status(200).send({
            status: "success",
            data: updatedRepair
        });
    } catch (e) {
        console.error(`Error updating repair`, e);
        res.status(500).send({ error: e.message });
    }
});

/**
 * Get a single repair by ID
 */
repairRouter.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        console.log(`Fetching repair with ID: ${id}`);
        const repair = await getARepair(id);
        res.status(200).send(repair);
    } catch (e) {
        console.error(`Error fetching repair`, e);
        res.status(404).send({ error: e.message });
    }
});

/**
 * Delete a repair by ID
 */
repairRouter.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        console.log(`Deleting repair with ID: ${id}`);
        await deleteRepair(id);
        console.log("Repair deleted successfully");
        res.status(200).send({ message: "Repair deleted successfully" });
    } catch (e) {
        console.error(`Error deleting repair`, e);
        res.status(500).send({ error: e.message });
    }
});

export default repairRouter;