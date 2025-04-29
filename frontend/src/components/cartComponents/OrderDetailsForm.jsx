import React, { useState, useEffect } from "react";
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
import { toast } from "react-hot-toast";

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
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Get user data from localStorage
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo) {
      // Set full name and email from user data
      setFullName(`${userInfo.firstName} ${userInfo.lastName}`);
      setEmail(userInfo.email);
    }
  }, []);

  if (!showOrderForm) return null;

  const validateForm = () => {
    const newErrors = {};
    
    // Phone validation
    if (!mobileNo.trim()) {
      newErrors.mobileNo = "Phone number is required";
    } else if (!/^[0-9]{10}$/.test(mobileNo.replace(/\D/g, ''))) {
      newErrors.mobileNo = "Please enter a valid 10-digit phone number";
    }

    // Address validation
    if (!deliveryAddress.trim()) {
      newErrors.deliveryAddress = "Delivery address is required";
    } else if (deliveryAddress.length < 10) {
      newErrors.deliveryAddress = "Please enter a complete address";
    }

    // District validation
    if (!district) {
      newErrors.district = "Please select a district";
    }

    // Delivery method validation
    if (!deliveryMethod) {
      newErrors.deliveryMethod = "Please select a delivery method";
    }

    // Payment method validation
    if (!paymentMethod) {
      newErrors.paymentMethod = "Please select a payment method";
    }

    // Credit card validation (only if credit card is selected)
    if (paymentMethod === "Credit/Debit Card") {
      if (!cardNumber.replace(/\s/g, '')) {
        newErrors.cardNumber = "Card number is required";
      } else if (!/^[0-9]{16}$/.test(cardNumber.replace(/\s/g, ''))) {
        newErrors.cardNumber = "Please enter a valid 16-digit card number";
      }

      if (!nameOnCard.trim()) {
        newErrors.nameOnCard = "Name on card is required";
      }

      if (!expiryDate) {
        newErrors.expiryDate = "Expiry date is required";
      } else if (!/^(0[1-9]|1[0-2])\/([0-9]{2})$/.test(expiryDate)) {
        newErrors.expiryDate = "Please enter a valid expiry date (MM/YY)";
      }

      if (!cvv) {
        newErrors.cvv = "CVV is required";
      } else if (!/^[0-9]{3}$/.test(cvv)) {
        newErrors.cvv = "Please enter a valid 3-digit CVV";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      handleConfirmOrderDetails();
    } else {
      toast.error("Please fix the errors in the form");
    }
  };

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
                readOnly
                className="w-full px-4 py-3 pl-12 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition cursor-not-allowed"
              />
              <FaUser className="absolute top-3.5 left-4 text-gray-400" />
            </div>
            
            <div className="relative">
              <input
                type="email"
                placeholder="Email *"
                value={email}
                readOnly
                className="w-full px-4 py-3 pl-12 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition cursor-not-allowed"
              />
              <FaEnvelope className="absolute top-3.5 left-4 text-gray-400" />
            </div>
          </div>
          
          <div className="relative">
            <input
              type="tel"
              placeholder="Phone No. *"
              value={mobileNo}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '');
                if (value.length <= 10) {
                  setPhone(value);
                }
              }}
              className={`w-full px-4 py-3 pl-12 rounded-lg bg-gray-700 text-white border ${
                errors.mobileNo ? 'border-red-500' : 'border-gray-600'
              } focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition`}
            />
            <FaPhone className="absolute top-3.5 left-4 text-gray-400" />
            {errors.mobileNo && (
              <p className="text-red-500 text-sm mt-1">{errors.mobileNo}</p>
            )}
          </div>

          {/* Delivery Information Section */}
          <div className="relative">
            <input
              type="text"
              placeholder="Delivery Address *"
              value={deliveryAddress}
              onChange={(e) => setAddress(e.target.value)}
              className={`w-full px-4 py-3 pl-12 rounded-lg bg-gray-700 text-white border ${
                errors.deliveryAddress ? 'border-red-500' : 'border-gray-600'
              } focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition`}
            />
            <FaAddressCard className="absolute top-3.5 left-4 text-gray-400" />
            {errors.deliveryAddress && (
              <p className="text-red-500 text-sm mt-1">{errors.deliveryAddress}</p>
            )}
          </div>

          <div className="relative">
            <select
              className={`w-full px-4 py-3 pl-12 rounded-lg bg-gray-700 text-white border ${
                errors.district ? 'border-red-500' : 'border-gray-600'
              } focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition appearance-none`}
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
            {errors.district && (
              <p className="text-red-500 text-sm mt-1">{errors.district}</p>
            )}
          </div>

          {/* Delivery Method */}
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
            {errors.deliveryMethod && (
              <p className="text-red-500 text-sm mt-1">{errors.deliveryMethod}</p>
            )}
          </div>

          {/* Payment Method */}
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
            {errors.paymentMethod && (
              <p className="text-red-500 text-sm mt-1">{errors.paymentMethod}</p>
            )}
          </div>

          {/* Credit Card Fields */}
          {paymentMethod === "Credit/Debit Card" && (
            <div className="space-y-4 mt-4 pt-4 border-t border-gray-700 animate-fadeIn">
              <h4 className="font-medium text-white">Card Details</h4>
              
              <div className="relative">
                <input
                  type="text"
                  placeholder="Card Number *"
                  value={cardNumber}
                  className={`w-full px-4 py-3 pl-12 rounded-lg bg-gray-700 text-white border ${
                    errors.cardNumber ? 'border-red-500' : 'border-gray-600'
                  } focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition`}
                  maxLength={19}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
                    const formattedValue = value.replace(/(.{4})/g, '$1 ').trim();
                    setCardNumber(formattedValue);
                  }}
                />
                <FaCreditCard className="absolute top-3.5 left-4 text-gray-400" />
                {errors.cardNumber && (
                  <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>
                )}
              </div>

              <div className="relative">
                <input
                  type="text"
                  placeholder="Name on Card *"
                  value={nameOnCard}
                  onChange={(e) => setNameOnCard(e.target.value)}
                  className={`w-full px-4 py-3 pl-12 rounded-lg bg-gray-700 text-white border ${
                    errors.nameOnCard ? 'border-red-500' : 'border-gray-600'
                  } focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition`}
                />
                <FaUser className="absolute top-3.5 left-4 text-gray-400" />
                {errors.nameOnCard && (
                  <p className="text-red-500 text-sm mt-1">{errors.nameOnCard}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Expiry Date (MM/YY) *"
                    value={expiryDate}
                    className={`w-full px-4 py-3 pl-12 rounded-lg bg-gray-700 text-white border ${
                      errors.expiryDate ? 'border-red-500' : 'border-gray-600'
                    } focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition`}
                    maxLength={5}
                    onChange={(e) => {
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
                  {errors.expiryDate && (
                    <p className="text-red-500 text-sm mt-1">{errors.expiryDate}</p>
                  )}
                </div>
                
                <div className="relative">
                  <input
                    type="text"
                    placeholder="CVC/CVV *"
                    value={cvv}
                    className={`w-full px-4 py-3 pl-12 rounded-lg bg-gray-700 text-white border ${
                      errors.cvv ? 'border-red-500' : 'border-gray-600'
                    } focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition`}
                    maxLength={3}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '');
                      setCvv(value);
                    }}
                  />
                  <span className="absolute top-3.5 left-4 text-gray-400 text-sm">
                    CVC
                  </span>
                  {errors.cvv && (
                    <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        <button
          onClick={handleSubmit}
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