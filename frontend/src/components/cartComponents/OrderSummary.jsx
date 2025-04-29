import React from "react";
import { FaShoppingCart, FaClipboardList, FaCreditCard } from "react-icons/fa";

const OrderSummary = ({ 
  totalAmount, 
  deliveryFee, 
  grandTotal, 
  cartItems, 
  mobileNo, 
  deliveryAddress, 
  district, 
  deliveryMethod, 
  paymentMethod, 
  setShowOrderForm, 
  handleCheckout 
}) => {
  return (
    <div className="bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-700 h-fit">
      <h2 className="text-2xl font-bold mb-6 text-white flex items-center">
        <span className="w-8 h-8 inline-flex items-center justify-center bg-purple-600 rounded-lg mr-3">
          <FaShoppingCart className="text-white text-sm" />
        </span>
        Order Summary
      </h2>

      <button
        onClick={() => setShowOrderForm(true)}
        className="mb-6 w-full bg-blue-600 hover:bg-blue-700 text-white text-lg font-medium py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center"
      >
        <FaClipboardList className="mr-2" />
        Enter Order Details
      </button>

      <div className="space-y-3 bg-gray-700 p-5 rounded-lg mb-6">
        <div className="flex justify-between text-gray-300">
          <span>Subtotal</span>
          <span>Rs.{totalAmount.toLocaleString()}</span>
        </div>
        
        <div className="flex justify-between text-gray-300">
          <span>Delivery</span>
          <span className={deliveryFee === 0 ? "text-green-500" : ""}>
            {deliveryFee === 0 ? "Free" : `Rs.${deliveryFee.toLocaleString()}`}
          </span>
        </div>
        
        <hr className="border-gray-600" />
        
        <div className="flex justify-between text-lg font-semibold text-white">
          <span>Total</span>
          <span>Rs.{grandTotal.toLocaleString()}</span>
        </div>
      </div>

      <button
        onClick={handleCheckout}
        disabled={cartItems.length === 0 || !mobileNo || !deliveryAddress || !district || !deliveryMethod || !paymentMethod}
        className={`mt-2 w-full ${
          cartItems.length === 0 || !mobileNo || !deliveryAddress || !district || !deliveryMethod || !paymentMethod
            ? "bg-gray-600 cursor-not-allowed"
            : "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
        } text-white text-lg font-medium py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center`}
      >
        <FaCreditCard className="mr-2" />
        Complete Checkout
      </button>
    </div>
  );
};

export default OrderSummary;