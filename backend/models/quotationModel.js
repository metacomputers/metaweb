import mongoose from "mongoose";

const quotationSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, 
            required: true, ref: "User" },
    quotationItems: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Product",
        },
        name: { type: String, required: true },
        qty: { type: Number, required: true },
        image: { type: String, required: false },
        price: { type: Number, required: true },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Quotation = mongoose.model("Quotation", quotationSchema);
export default Quotation;
