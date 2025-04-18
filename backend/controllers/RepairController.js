import { generateId } from "../config/util.js";
import Repair from "../models/Repair.js";

/**
 * Create a new repair record
 */
export const createRepair = async (repair) => {
    try {
        const newId = generateId("rep");
        const newRepair = new Repair({
            _id: newId,
            ...repair,
        });

        await newRepair.save(); // Save the document to MongoDB
        return newRepair; // Return the created repair
    } catch (e) {
        throw e;
    }
};

/**
 * Update an existing repair record
 */
export const updateRepair = async (repair, id) => {
    try {
        const updatedRepair = await Repair.findByIdAndUpdate(
            id,
            { ...repair },
            { new: true, runValidators: true }
        );

        if (!updatedRepair) {
            throw new Error("Repair record not found");
        }

        return updatedRepair;
    } catch (e) {
        throw e;
    }
};

/**
 * Delete a repair record
 */
export const deleteRepair = async (id) => {
    try {
        const deletedRepair = await Repair.findByIdAndDelete(id);

        if (!deletedRepair) {
            throw new Error("Repair record not found");
        }

        return { message: "Repair record deleted successfully" };
    } catch (e) {
        throw e;
    }
};

/**
 * Get all repair records with pagination
 */
export const getRepairs = async () => {
    try {
        const repairs = await Repair.find()
            .sort({ createdAt: -1 }) // Sort by latest

        const total = await Repair.countDocuments(); // Get total count

        return {
            total,
            repairs,
        };
    } catch (e) {
        throw e;
    }
};

/**
 * Get a single repair record by ID
 */
export const getARepair = async (id) => {
    try {
        const repair = await Repair.findById(id);

        if (!repair) {
            throw new Error("Repair record not found");
        }

        return repair;
    } catch (e) {
        throw e;
    }
};
