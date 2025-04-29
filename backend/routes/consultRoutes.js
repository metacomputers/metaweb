import express from "express";
import {
    createConsult,
    updateConsult,
    deleteConsult,
    getConsults,
    getAConsult
} from "../controllers/ConsultController.js";

const consultRouter = express.Router();

/**
 * Get all consults with pagination
 */
consultRouter.get("/", async (req, res) => {
    try {
        console.log(`Fetching consults`);
        const consults = await getConsults();
        res.status(200).send(consults);
    } catch (e) {
        console.error("Error fetching consults:", e);
        res.status(500).send({ error: e.message });
    }
});

/**
 * Create a new consult
 */
consultRouter.post("/", async (req, res) => {
    try {
        console.log("Creating a new consult:", req.body);
        const consult = req.body;
        const newConsult = await createConsult(consult);
        console.log("Consult created successfully:", newConsult);
        res.status(201).send({
            status: "success",
            data: newConsult
        });
    } catch (e) {
        console.error("Error creating consult:", e);
        res.status(500).send({ error: e.message });
    }
});

/**
 * Update a consult by ID
 */
consultRouter.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        console.log(`Updating consult with ID: ${id}`, req.body);
        const consultData = req.body;
        const updatedConsult = await updateConsult(consultData, id);
        console.log("Consult updated successfully:", updatedConsult);
        res.status(200).send({
            status: "success",
            data: updatedConsult
        });
    } catch (e) {
        console.error(`Error updating consult`, e);
        res.status(500).send({ error: e.message });
    }
});

/**
 * Get a single consult by ID
 */
consultRouter.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        console.log(`Fetching consult with ID: ${id}`);
        const consult = await getAConsult(id);
        res.status(200).send(consult);
    } catch (e) {
        console.error(`Error fetching consult`, e);
        res.status(404).send({ error: e.message });
    }
});

/**
 * Delete a consult by ID
 */
consultRouter.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        console.log(`Deleting consult with ID: ${id}`);
        await deleteConsult(id);
        console.log("Consult deleted successfully");
        res.status(200).send({ message: "Consult deleted successfully" });
    } catch (e) {
        console.error(`Error deleting consult`, e);
        res.status(500).send({ error: e.message });
    }
});

export default consultRouter;