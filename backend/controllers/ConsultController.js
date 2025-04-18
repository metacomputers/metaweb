import Consult from "../models/Consult.js";
import { generateId } from "../config/util.js";

/**
 * Create a new consult
 */
export const createConsult = async (consult) => {
    try {
        const newId = generateId("con");
        const newConsult = new Consult({
            _id: newId,
            ...consult,
        });

        await newConsult.save(); // Save the document to MongoDB
        return newConsult; // Return the created consult
    } catch (e) {
        throw e;
    }
};

/**
 * Update an existing consult
 */
export const updateConsult = async (consult, id) => {
    try {
        const updatedConsult = await Consult.findByIdAndUpdate(
            id,
            { ...consult },
            { new: true, runValidators: true }
        );

        if (!updatedConsult) {
            throw new Error("Consult not found");
        }

        return updatedConsult;
    } catch (e) {
        throw e;
    }
};

/**
 * Delete a consult
 */
export const deleteConsult = async (id) => {
    try {
        const deletedConsult = await Consult.findByIdAndDelete(id);

        if (!deletedConsult) {
            throw new Error("Consult not found");
        }

        return { message: "Consult deleted successfully" };
    } catch (e) {
        throw e;
    }
};

/**
 * Get all consults with pagination
 */
export const getConsults = async () => {
    try {
        const consults = await Consult.find()
            .sort({ createdAt: -1 })


        const total = await Consult.countDocuments(); // Get total count

        return {
            total,
            consults,
        };
    } catch (e) {
        throw e;
    }
};

/**
 * Get a single consult by ID
 */
export const getAConsult = async (id) => {
    try {
        const consult = await Consult.findById(id);

        if (!consult) {
            throw new Error("Consult not found");
        }

        return consult;
    } catch (e) {
        throw e;
    }
};
