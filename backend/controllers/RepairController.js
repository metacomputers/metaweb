import Repair from "../models/RepairModel.js";
import { generateId } from "../utils/createToken.js";
import asyncHandler from "../middlewares/asyncHandler.js";

/**
 * Get all repair records (admin only)
 */
export const getRepairs = asyncHandler(async (req, res) => {
    try {
        // Check if user is admin
        if (req.user.role.toLowerCase() !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to access all repairs'
            });
        }

        const repairs = await Repair.find()
            .populate('user', 'username firstName lastName email')
            .sort({ createdAt: -1 });

        const total = await Repair.countDocuments();

        res.status(200).json({
            success: true,
            count: total,
            data: repairs
        });
    } catch (error) {
        console.error('Error fetching repairs:', error);
        res.status(500).json({
            success: false,
            error: 'Server Error',
            message: error.message
        });
    }
});

/**
 * Delete a repair record (admin only)
 */
export const deleteRepair = asyncHandler(async (req, res) => {
    try {
        const repair = await Repair.findById(req.params.id);

        if (!repair) {
            return res.status(404).json({
                success: false,
                message: 'Repair not found'
            });
        }

        // Only admin can delete repairs
        if (req.user.role.toLowerCase() !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to delete repairs'
            });
        }

        await repair.deleteOne();

        res.status(200).json({
            success: true,
            message: 'Repair deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting repair:', error);
        res.status(500).json({
            success: false,
            error: 'Server Error',
            message: error.message
        });
    }
});

/**
 * Create a new repair record
 */
export const createRepair = asyncHandler(async (req, res) => {
    try {
        const newId = generateId("rep");
        const newRepair = new Repair({
            _id: newId,
            user: req.user._id,
            ...req.body,
        });

        await newRepair.save();
        
        res.status(201).json({
            success: true,
            data: newRepair
        });
    } catch (error) {
        console.error('Error creating repair:', error);
        res.status(500).json({
            success: false,
            error: 'Server Error',
            message: error.message
        });
    }
});

/**
 * Get user's repairs
 */
export const getUserRepairs = asyncHandler(async (req, res) => {
    try {
        const repairs = await Repair.find({ user: req.user._id })
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: repairs.length,
            data: repairs
        });
    } catch (error) {
        console.error('Error fetching user repairs:', error);
        res.status(500).json({
            success: false,
            error: 'Server Error',
            message: error.message
        });
    }
});

/**
 * Get a single repair record by ID
 */
export const getARepair = asyncHandler(async (req, res) => {
    try {
        const repair = await Repair.findById(req.params.id)
            .populate('user', 'username firstName lastName email');

        if (!repair) {
            return res.status(404).json({
                success: false,
                message: 'Repair not found'
            });
        }

        // Check if user is admin or the owner of the repair
        if (req.user.role.toLowerCase() !== 'admin' && repair.user._id.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to access this repair'
            });
        }

        res.status(200).json({
            success: true,
            data: repair
        });
    } catch (error) {
        console.error('Error fetching repair:', error);
        res.status(500).json({
            success: false,
            error: 'Server Error',
            message: error.message
        });
    }
});

/**
 * Update an existing repair record
 */
export const updateRepair = asyncHandler(async (req, res) => {
    try {
        const repair = await Repair.findById(req.params.id);

        if (!repair) {
            return res.status(404).json({
                success: false,
                message: 'Repair not found'
            });
        }

        // Check if user is admin or the owner of the repair
        if (req.user.role.toLowerCase() !== 'admin' && repair.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to update this repair'
            });
        }

        // Update status-specific fields
        if (req.body.status) {
            if (req.body.status === 'Completed') {
                req.body.completedAt = Date.now();
            } else if (req.body.status === 'Cancelled') {
                req.body.cancelledAt = Date.now();
            }
        }

        const updatedRepair = await Repair.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        res.status(200).json({
            success: true,
            data: updatedRepair
        });
    } catch (error) {
        console.error('Error updating repair:', error);
        res.status(500).json({
            success: false,
            error: 'Server Error',
            message: error.message
        });
    }
});
