import mongoose from "mongoose";

const repairSchema = new mongoose.Schema(
    {
        _id:{
            type: String,
            required: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        customerName: {
            type: String,
            required: true,
            trim: true,
        },
        mobile: {
            type: String,
            required: true,
        },
        device: {
            type: String,
            required: true,
            trim: true,
        },
        issueDescription: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: ["Pending", "In Progress", "Completed", "Cancelled"],
            default: "Pending",
        },
        estimatedCost: {
            type: Number,
            default: 0
        },
        notes: {
            type: String,
            default: ""
        },
        completedAt: {
            type: Date
        },
        cancelledAt: {
            type: Date
        }
    },
    { timestamps: true }
);

const Repair = mongoose.model("Repair", repairSchema);
export default Repair;
