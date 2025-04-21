import React from "react";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaAddressCard,
  FaMapMarkerAlt,
  FaShippingFast,
  FaCreditCard,
  FaTimes,
  FaCheck
} from "react-icons/fa";

const OrderDetailsForm = ({
  showOrderForm,
  setShowOrderForm,
  fullName,
  setFullName,
  email,
  setEmail,
  mobileNo,
  setPhone,
  deliveryAddress,
  setAddress,
  district,
  setDistrict,
  deliveryMethod,
  setDeliveryMethod,
  paymentMethod,
  setPaymentMethod,
  cardNumber,
  setCardNumber,
  nameOnCard,
  setNameOnCard,
  expiryDate,
  setExpiryDate,
  cvv,
  setCvv,
  handleConfirmOrderDetails
}) => {
  if (!showOrderForm) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-xl shadow-2xl p-6 w-full max-w-2xl border border-gray-700 animate-fadeIn">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-white">Order Details</h3>
          <button 
            onClick={() => setShowOrderForm(false)}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <FaTimes />
          </button>
        </div>

        <div className="space-y-4">
          {/* Contact Information Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Full Name *"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-4 py-3 pl-12 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
              />
              <FaUser className="absolute top-3.5 left-4 text-gray-400" />
            </div>
            
            <div className="relative">
              <input
                type="email"
                placeholder="Email *"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 pl-12 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
              />
              <FaEnvelope className="absolute top-3.5 left-4 text-gray-400" />
            </div>
          </div>
          
          <div className="relative">
            <input
              type="tel"
              placeholder="Phone No. *"
              value={mobileNo}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-3 pl-12 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
            />
            <FaPhone className="absolute top-3.5 left-4 text-gray-400" />
          </div>

          {/* Delivery Information Section */}
          <div className="relative">
            <input
              type="text"
              placeholder="Delivery Address *"
              value={deliveryAddress}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-4 py-3 pl-12 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
            />
            <FaAddressCard className="absolute top-3.5 left-4 text-gray-400" />
          </div>

          <div className="relative">
            <select
              className="w-full px-4 py-3 pl-12 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition appearance-none"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
            >
              <option value="" disabled>Select District *</option>
              <option value="Ampara">Ampara</option>
              <option value="Anuradhapura">Anuradhapura</option>
              <option value="Badulla">Badulla</option>
              <option value="Batticaloa">Batticaloa</option>
              <option value="Colombo">Colombo</option>
              <option value="Galle">Galle</option>
              <option value="Gampaha">Gampaha</option>
              <option value="Hambantota">Hambantota</option>
              <option value="Jaffna">Jaffna</option>
              <option value="Kalutara">Kalutara</option>
              <option value="Kandy">Kandy</option>
              <option value="Kegalle">Kegalle</option>
              <option value="Kilinochchi">Kilinochchi</option>
              <option value="Kurunegala">Kurunegala</option>
              <option value="Mannar">Mannar</option>
              <option value="Matale">Matale</option>
              <option value="Matara">Matara</option>
              <option value="Monaragala">Monaragala</option>
              <option value="Mullaitivu">Mullaitivu</option>
              <option value="Nuwara Eliya">Nuwara Eliya</option>
              <option value="Polonnaruwa">Polonnaruwa</option>
              <option value="Puttalam">Puttalam</option>
              <option value="Ratnapura">Ratnapura</option>
              <option value="Trincomalee">Trincomalee</option>
              <option value="Vavuniya">Vavuniya</option>
            </select>
            <FaMapMarkerAlt className="absolute top-3.5 left-4 text-gray-400" />
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>

          {/* Delivery Method - Selectable Tiles */}
          <div className="space-y-2">
            <label className="block text-gray-300 text-sm font-medium mb-1">
              Delivery Method *
            </label>
            <div className="grid grid-cols-2 gap-3">
              <div
                className={`cursor-pointer rounded-lg p-3 border ${
                  deliveryMethod === "Courier"
                    ? "bg-purple-600 border-purple-500"
                    : "bg-gray-700 border-gray-600 hover:border-purple-400"
                } transition-all duration-300`}
                onClick={() => setDeliveryMethod("Courier")}
              >
                <div className="flex flex-col items-center text-center">
                  <FaShippingFast className={`text-xl mb-2 ${
                    deliveryMethod === "Courier" ? "text-white" : "text-gray-400"
                  }`} />
                  <span className={`font-medium ${
                    deliveryMethod === "Courier" ? "text-white" : "text-gray-300"
                  }`}>
                    Courier
                  </span>
                </div>
              </div>
              
              <div
                className={`cursor-pointer rounded-lg p-3 border ${
                  deliveryMethod === "PickMe Flash"
                    ? "bg-purple-600 border-purple-500"
                    : "bg-gray-700 border-gray-600 hover:border-purple-400"
                } transition-all duration-300`}
                onClick={() => setDeliveryMethod("PickMe Flash")}
              >
                <div className="flex flex-col items-center text-center">
                  <FaShippingFast className={`text-xl mb-2 ${
                    deliveryMethod === "PickMe Flash" ? "text-white" : "text-gray-400"
                  }`} />
                  <span className={`font-medium ${
                    deliveryMethod === "PickMe Flash" ? "text-white" : "text-gray-300"
                  }`}>
                    PickMe Flash
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Method - Selectable Tiles */}
          <div className="space-y-2">
            <label className="block text-gray-300 text-sm font-medium mb-1">
              Payment Method *
            </label>
            <div className="grid grid-cols-2 gap-3">
              <div
                className={`cursor-pointer rounded-lg p-3 border ${
                  paymentMethod === "Cash on Delivery"
                    ? "bg-purple-600 border-purple-500"
                    : "bg-gray-700 border-gray-600 hover:border-purple-400"
                } transition-all duration-300`}
                onClick={() => setPaymentMethod("Cash on Delivery")}
              >
                <div className="flex flex-col items-center text-center">
                  <FaCreditCard className={`text-xl mb-2 ${
                    paymentMethod === "Cash on Delivery" ? "text-white" : "text-gray-400"
                  }`} />
                  <span className={`font-medium ${
                    paymentMethod === "Cash on Delivery" ? "text-white" : "text-gray-300"
                  }`}>
                    Cash on Delivery
                  </span>
                </div>
              </div>
              
              <div
                className={`cursor-pointer rounded-lg p-3 border ${
                  paymentMethod === "Credit/Debit Card"
                    ? "bg-purple-600 border-purple-500"
                    : "bg-gray-700 border-gray-600 hover:border-purple-400"
                } transition-all duration-300`}
                onClick={() => setPaymentMethod("Credit/Debit Card")}
              >
                <div className="flex flex-col items-center text-center">
                  <FaCreditCard className={`text-xl mb-2 ${
                    paymentMethod === "Credit/Debit Card" ? "text-white" : "text-gray-400"
                  }`} />
                  <span className={`font-medium ${
                    paymentMethod === "Credit/Debit Card" ? "text-white" : "text-gray-300"
                  }`}>
                    Credit/Debit Card
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Credit Card Fields - Only shown when Credit/Debit Card is selected */}
          {paymentMethod === "Credit/Debit Card" && (
            <div className="space-y-4 mt-4 pt-4 border-t border-gray-700 animate-fadeIn">
              <h4 className="font-medium text-white">Card Details</h4>
              
              <div className="relative">
                <input
                  type="text"
                  placeholder="Card Number *"
                  value={cardNumber}
                  className="w-full px-4 py-3 pl-12 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                  maxLength={19}
                  onChange={(e) => {
                    // Format card number with spaces after every 4 digits
                    const value = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
                    const formattedValue = value.replace(/(.{4})/g, '$1 ').trim();
                    setCardNumber(formattedValue);
                  }}
                />
                <FaCreditCard className="absolute top-3.5 left-4 text-gray-400" />
              </div>

              <div className="relative">
                <input
                  type="text"
                  placeholder="Name on Card *"
                  value={nameOnCard}
                  onChange={(e) => setNameOnCard(e.target.value)}
                  className="w-full px-4 py-3 pl-12 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                />
                <FaUser className="absolute top-3.5 left-4 text-gray-400" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Expiry Date (MM/YY) *"
                    value={expiryDate}
                    className="w-full px-4 py-3 pl-12 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                    maxLength={5}
                    onChange={(e) => {
                      // Format expiry date as MM/YY
                      let value = e.target.value.replace(/\D/g, '');
                      if (value.length > 2) {
                        value = value.slice(0, 2) + '/' + value.slice(2);
                      }
                      setExpiryDate(value);
                    }}
                  />
                  <span className="absolute top-3.5 left-4 text-gray-400 text-sm">
                    MM/YY
                  </span>
                </div>
                
                <div className="relative">
                  <input
                    type="text"
                    placeholder="CVC/CVV *"
                    value={cvv}
                    className="w-full px-4 py-3 pl-12 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                    maxLength={3}
                    onChange={(e) => {
                      // Only allow numbers for CVC/CVV
                      const value = e.target.value.replace(/\D/g, '');
                      setCvv(value);
                    }}
                  />
                  <span className="absolute top-3.5 left-4 text-gray-400 text-sm">
                    CVC
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        <button
          onClick={handleConfirmOrderDetails}
          className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white text-lg font-medium py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center"
        >
          <FaCheck className="mr-2" />
          Confirm Details
        </button>
      </div>
    </div>
  );
};

export default OrderDetailsForm;