import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;

//Schema for user reviews
const deliverySchema = mongoose.Schema(
  {
    orderNo: { type: Number, required: true },
    deliveryDate: { type: Date, required: true },
    deliveryPrice: { type: Number, required: true, default: 0 },
    totalPrice: { type: String, required: true, default: 0 },
    status: { 
      type: String, 
      enum: ['Pending', 'In Transit', 'Delivered'],
      default: 'Pending'
    },
  },
  { timestamps: true }
);

const DeliveryData = mongoose.model("DeliveryData", deliverySchema);
export default DeliveryData;
