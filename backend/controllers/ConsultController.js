import Consult from "../models/ConsultModel.js";
import { generateId } from "../utils/createToken.js";
import asyncHandler from "../middlewares/asyncHandler.js";

/**
 * Create a new consult
 */
export const createConsult = asyncHandler(async (req, res) => {
    try {
        const newId = generateId("con");
        const newConsult = new Consult({
            _id: newId,
            user: req.user._id,
            ...req.body,
        });

        await newConsult.save();
        
        res.status(201).json({
            success: true,
            data: newConsult
        });
    } catch (error) {
        console.error('Error creating consult:', error);
        res.status(500).json({
            success: false,
            error: 'Server Error',
            message: error.message
        });
    }
});

/**
 * Update an existing consult
 */
export const updateConsult = asyncHandler(async (req, res) => {
    try {
        const consult = await Consult.findById(req.params.id);

        if (!consult) {
            return res.status(404).json({
                success: false,
                message: 'Consult not found'
            });
        }

        // Check if user is admin or the owner of the consult
        if (req.user.role.toLowerCase() !== 'admin' && consult.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to update this consult'
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

        const updatedConsult = await Consult.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        res.status(200).json({
            success: true,
            data: updatedConsult
        });
    } catch (error) {
        console.error('Error updating consult:', error);
        res.status(500).json({
            success: false,
            error: 'Server Error',
            message: error.message
        });
    }
});

/**
 * Delete a consult
 */
export const deleteConsult = asyncHandler(async (req, res) => {
    try {
        const consult = await Consult.findById(req.params.id);

        if (!consult) {
            return res.status(404).json({
                success: false,
                message: 'Consult not found'
            });
        }

        // Only admin can delete consults
        if (req.user.role.toLowerCase() !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to delete consults'
            });
        }

        await consult.deleteOne();

        res.status(200).json({
            success: true,
            message: 'Consult deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting consult:', error);
        res.status(500).json({
            success: false,
            error: 'Server Error',
            message: error.message
        });
    }
});

/**
 * Get all consults (admin only)
 */
export const getConsults = asyncHandler(async (req, res) => {
    try {
        // Check if user is admin
        if (req.user.role.toLowerCase() !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to access all consults'
            });
        }

        const consults = await Consult.find()
            .populate('user', 'username firstName lastName email')
            .sort({ createdAt: -1 });

        const total = await Consult.countDocuments();

        res.status(200).json({
            success: true,
            count: total,
            data: consults
        });
    } catch (error) {
        console.error('Error fetching consults:', error);
        res.status(500).json({
            success: false,
            error: 'Server Error',
            message: error.message
        });
    }
});

/**
 * Get user's consults
 */
export const getUserConsults = asyncHandler(async (req, res) => {
    try {
        const consults = await Consult.find({ user: req.user._id })
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: consults.length,
            data: consults
        });
    } catch (error) {
        console.error('Error fetching user consults:', error);
        res.status(500).json({
            success: false,
            error: 'Server Error',
            message: error.message
        });
    }
});

/**
 * Get a single consult by ID
 */
export const getAConsult = asyncHandler(async (req, res) => {
    try {
        const consult = await Consult.findById(req.params.id)
            .populate('user', 'username firstName lastName email');

        if (!consult) {
            return res.status(404).json({
                success: false,
                message: 'Consult not found'
            });
        }

        // Check if user is admin or the owner of the consult
        if (req.user.role.toLowerCase() !== 'admin' && consult.user._id.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to access this consult'
            });
        }

        res.status(200).json({
            success: true,
            data: consult
        });
    } catch (error) {
        console.error('Error fetching consult:', error);
        res.status(500).json({
            success: false,
            error: 'Server Error',
            message: error.message
        });
    }
});
