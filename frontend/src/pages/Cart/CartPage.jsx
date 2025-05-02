import React, { useEffect, useState } from "react";
import {
  getCartItems,
  updateCartItem,
  removeFromCart,
  checkoutCart,
} from "../../api/cartApi";
import { useNavigate } from "react-router-dom";

import { Toaster, toast } from "react-hot-toast";
import {
  FaTrash,
  FaShoppingCart,
  FaMinus,
  FaPlus,
  FaSearch,
} from "react-icons/fa";

// Import  new components
import OrderSummary from "../../components/cartComponents/OrderSummary";
import OrderDetailsForm from "../../components/cartComponents/OrderDetailsForm";
import InvoicePopup from "../../components/cartComponents/InvoicePopup";
import ConfirmationModal from "../../components/Common/confirmationModal";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [itemToRemove, setItemToRemove] = useState(null);

  const [fullName, setFullName] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [mobileNo, setPhone] = useState("");
  const [deliveryAddress, setAddress] = useState("");
  const [district, setDistrict] = useState("");
  const [deliveryMethod, setDeliveryMethod] = useState("");
  const [email, setEmail] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [nameOnCard, setNameOnCard] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [showInvoice, setShowInvoice] = useState(false);
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [orderDate, setOrderDate] = useState("");

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const items = await getCartItems();
        setCartItems(items);
      } catch (err) {
        setError("Failed to load cart items");
      } finally {
        setLoading(false);
      }
    };
    fetchCartItems();
  }, []);

  const handleUpdateQty = async (productId, qty) => {
    if (qty < 1) {
      toast.error("Quantity must be at least 1.");
      return;
    }

    try {
      const updatedItem = await updateCartItem(productId, Number(qty));
      if (updatedItem) {
        setCartItems((prev) =>
          prev.map((item) =>
            item.product === productId ? { ...item, qty: Number(qty) } : item
          )
        );
        toast.success("Quantity updated!");
      } else {
        toast.error("Failed to update quantity.");
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
        // If we got the available quantity, update the cart item to the maximum available
        if (error.response.data.availableQuantity) {
          const maxQty = error.response.data.availableQuantity;
          setCartItems((prev) =>
            prev.map((item) =>
              item.product === productId ? { ...item, qty: maxQty } : item
            )
          );
        }
      } else {
        toast.error("Could not update item quantity.");
      }
    }
  };

  const handleRemoveItem = async (productId) => {
    setItemToRemove(productId);
    setShowConfirmModal(true);
  };

  const confirmRemoveItem = async (id) => {
    try {
      const response = await removeFromCart(id);
      if (response.message === "Product removed from cart") {
        setCartItems((prev) =>
          prev.filter((item) => item.product !== id)
        );
        toast.success("Item removed from cart");
      } else {
        toast.error("Failed to remove item.");
      }
    } catch (error) {
      console.error("Error removing item:", error);
      toast.error("Could not remove item.");
    } finally {
      setShowConfirmModal(false);
      setItemToRemove(null);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const generateInvoiceNumber = () => {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return `INV-${timestamp}-${random}`;
  };

  const handleConfirmOrderDetails = () => {
    if (!fullName || !email || !mobileNo || !deliveryAddress || !district || !deliveryMethod || !paymentMethod) {
      toast.error("Please fill in all required fields.");
      return;
    }
    
    if (paymentMethod === "Credit/Debit Card") {
      if (!cardNumber || !nameOnCard || !expiryDate || !cvv) {
        toast.error("Please fill in all card details.");
        return;
      }
    }
    
    setShowOrderForm(false);
    toast.success("Order details confirmed!");
  };

  const handleCheckout = async () => {
    if (!mobileNo || !deliveryAddress || !district || !deliveryMethod || !paymentMethod || !fullName || !email) {
      toast.error("Please fill in all required fields.");
      return;
    }

    if (paymentMethod === "Credit/Debit Card") {
      if (!cardNumber || !nameOnCard || !expiryDate || !cvv) {
        toast.error("Please fill in all card details.");
        return;
      }
    }

    const generatedInvoiceNumber = generateInvoiceNumber();
    setInvoiceNumber(generatedInvoiceNumber);
    setOrderDate(new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }));

    try {
      await checkoutCart(mobileNo, deliveryAddress, district, deliveryMethod, paymentMethod, generatedInvoiceNumber);
      toast.success("Order placed successfully!");
      setShowInvoice(true);
      // We'll keep the cart items available until the invoice is closed
    } catch (err) {
      toast.error("Checkout failed");
    }
  };

  const totalAmount = cartItems.reduce(
    (acc, item) => acc + item.qty * item.price,
    0
  );
  const deliveryFee =
    district === "Colombo" && deliveryMethod === "Courier" ? 0 : 500;

  const grandTotal = totalAmount + deliveryFee;

  //if (loading) return <Loader />;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div className="bg-gradient-to-r from-gray-900 to-gray-800 min-h-screen font-sans">
      <Toaster position="top-center" reverseOrder={false} />
      
      {/* Add the ConfirmationModal */}
      <ConfirmationModal
        isOpen={showConfirmModal}
        id={itemToRemove}
        onClose={() => {
          setShowConfirmModal(false);
          setItemToRemove(null);
        }}
        onConfirm={confirmRemoveItem}
        title="Remove Item"
        description="Are you sure you want to remove this item from your cart?"
      />

      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex items-center justify-center mb-10">
          <FaShoppingCart className="text-3xl mr-3 text-purple-500 mt-25" />
          <h1 className="text-4xl font-bold text-white mt-25">
            Your Cart
          </h1>
        </div>

        {cartItems.length === 0 && !showInvoice ? (
          <div className="flex flex-col items-center justify-center bg-gray-800 p-12 rounded-2xl shadow-xl">
            <FaShoppingCart className="text-6xl text-gray-600 mb-4" />
            <p className="text-center text-xl text-gray-400">
              Your cart is currently empty.
            </p>
            <button 
              onClick={() => navigate('/products')}
              className="mt-6 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition duration-300 transform hover:scale-105"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items Section */}
            <div className="lg:col-span-2 space-y-6">
              <div className="relative bg-gray-800 p-4 rounded-xl shadow-lg">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="w-full px-4 py-3 pl-12 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                  />
                  <FaSearch className="absolute top-3.5 left-4 text-gray-400" />
                </div>
              </div>

              <div className="space-y-4">
                {cartItems
                  .filter((item) => item.name.toLowerCase().includes(searchTerm))
                  .map((item) => (
                    <div
                      key={item.product}
                      className="flex flex-col sm:flex-row items-center bg-gray-800 p-6 rounded-xl shadow-lg transition-all duration-300 hover:shadow-purple-500/10 border border-gray-700"
                    >
                      <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 p-2 rounded-xl">
                      <img
                          src={`../../../public/uploads/${item.image}`}
                          alt={item.name}
                          className="w-28 h-28 object-cover rounded-lg"
                        />
                      </div>
                      
                      <div className="ml-0 sm:ml-6 flex-grow mt-4 sm:mt-0">
                        <h2 className="text-xl font-semibold text-white">
                          {item.name}
                        </h2>
                        <p className="text-gray-400 text-sm mt-1">Price: Rs.{item.price.toLocaleString()}</p>
                        
                        <div className="flex items-center mt-4 gap-3">
                          <button
                            onClick={() => handleUpdateQty(item.product, item.qty - 1)}
                            className="p-2 text-white bg-gray-700 hover:bg-gray-600 rounded-full transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={item.qty <= 1}
                          >
                            <FaMinus className="text-xs" />
                          </button>
                          
                          <span className="w-12 px-3 py-1 bg-gray-700 text-white rounded-md text-center">
                            {item.qty}
                          </span>
                          
                          <button
                            onClick={() => handleUpdateQty(item.product, item.qty + 1)}
                            className="p-2 text-white bg-gray-700 hover:bg-gray-600 rounded-full transition-all duration-300"
                          >
                            <FaPlus className="text-xs" />
                          </button>
                        </div>
                      </div>
                      
                      <div className="flex flex-col items-end justify-between h-full mt-4 sm:mt-0">
                        <p className="text-lg font-bold text-white mb-4">
                          Rs.{(item.qty * item.price).toLocaleString()}
                        </p>
                        
                        <button
                          onClick={() => handleRemoveItem(item.product)}
                          className="flex items-center text-red-400 hover:text-red-300 transition-colors duration-300"
                        >
                          <FaTrash className="mr-2" /> Remove
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Order Summary - using our new component */}
            <OrderSummary
              totalAmount={totalAmount}
              deliveryFee={deliveryFee}
              grandTotal={grandTotal}
              cartItems={cartItems}
              mobileNo={mobileNo}
              deliveryAddress={deliveryAddress}
              district={district}
              deliveryMethod={deliveryMethod}
              paymentMethod={paymentMethod}
              setShowOrderForm={setShowOrderForm}
              handleCheckout={handleCheckout}
            />
          </div>
        )}
      </div>

      {/* Order Details Form - using our new component */}
      <OrderDetailsForm
        showOrderForm={showOrderForm}
        setShowOrderForm={setShowOrderForm}
        fullName={fullName}
        setFullName={setFullName}
        email={email}
        setEmail={setEmail}
        mobileNo={mobileNo}
        setPhone={setPhone}
        deliveryAddress={deliveryAddress}
        setAddress={setAddress}
        district={district}
        setDistrict={setDistrict}
        deliveryMethod={deliveryMethod}
        setDeliveryMethod={setDeliveryMethod}
        paymentMethod={paymentMethod}
        setPaymentMethod={setPaymentMethod}
        cardNumber={cardNumber}
        setCardNumber={setCardNumber}
        nameOnCard={nameOnCard}
        setNameOnCard={setNameOnCard}
        expiryDate={expiryDate}
        setExpiryDate={setExpiryDate}
        cvv={cvv}
        setCvv={setCvv}
        handleConfirmOrderDetails={handleConfirmOrderDetails}
      />

      {/* Invoice Popup - using our new component */}
      <InvoicePopup
        showInvoice={showInvoice}
        setShowInvoice={setShowInvoice}
        invoiceNumber={invoiceNumber}
        orderDate={orderDate}
        fullName={fullName}
        email={email}
        mobileNo={mobileNo}
        deliveryAddress={deliveryAddress}
        district={district}
        deliveryMethod={deliveryMethod}
        paymentMethod={paymentMethod}
        cardNumber={cardNumber}
        cartItems={cartItems}
        totalAmount={totalAmount}
        deliveryFee={deliveryFee}
        grandTotal={grandTotal}
        setCartItems={setCartItems}
      />
    </div>
  );
};

export default CartPage;