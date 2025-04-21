import mongoose from "mongoose";

const cartSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, 
            required: true, ref: "User" },
    cartItems: [
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

const Cart = mongoose.model("Cart", cartSchema);
export default Cart;
