import mongoose from "mongoose";

const consultSchema = new mongoose.Schema(
    {
        _id:{
            type: String,
            required: true,
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
        issueCategory: {
            type: String,
            required: true,
        },
        detailsOfIssue: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: ["Pending", "In Progress", "Completed", "Cancelled"],
            default: "Pending",
        },
    },
    { timestamps: true }
);

const Consult = mongoose.model("Consult", consultSchema);
export default Consult;
