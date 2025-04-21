import mongoose from "mongoose";

const orderSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    orderItems: [
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
    totalPaid: { type: Number, required: true },
    mobileNo: { type: String, required: true },
    deliveryAddress: { type: String, required: true },
    district: { type: String, required: true },
    deliveryMethod: { type: String, required: true },
    paymentMethod: { type: String, required: true },
    invoiceNumber: { type: String, required: true },
    deliveryStatus: {type: String, default: "pending"},
    isPaid: { type: Boolean, default: false },
    paidAt: { type: Date },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;