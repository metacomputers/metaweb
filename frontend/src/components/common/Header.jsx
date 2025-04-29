import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaBars, FaTimes, FaUser, FaSignOutAlt, FaFileAlt } from "react-icons/fa";
import { getCartItems } from "../../api/cartApi";
import { getQuotationItems } from "../../api/quotationApi";
import { toast } from "react-hot-toast";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const [quotationItemsCount, setQuotationItemsCount] = useState(0);
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const navigate = useNavigate();

  const fetchCartItems = async () => {
    try {
      const items = await getCartItems();
      setCartItemsCount(items.length);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  const fetchQuotationItems = async () => {
    try {
      const items = await getQuotationItems();
      setQuotationItemsCount(items.length);
    } catch (error) {
      console.error("Error fetching quotation items:", error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchCartItems();
      fetchQuotationItems();
    }
  }, [user]);

  // Add event listener for cart updates
  useEffect(() => {
    const handleCartUpdate = () => {
      fetchCartItems();
    };

    window.addEventListener('cartUpdated', handleCartUpdate);

    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdate);
    };
  }, []);

  // Add event listener for quotation updates
  useEffect(() => {
    const handleQuotationUpdate = () => {
      fetchQuotationItems();
    };

    window.addEventListener('quotationUpdated', handleQuotationUpdate);

    return () => {
      window.removeEventListener('quotationUpdated', handleQuotationUpdate);
    };
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const logoutHandler = async () => {
    try {
      // Call backend logout endpoint
      const response = await fetch("/api/users/logout", {
        method: "POST",
        credentials: "include", // Important for cookies
      });

      if (response.ok) {
        // Clear user from localStorage
        localStorage.removeItem("userInfo");
        
        // Redirect to home page
        navigate("/");
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleCartClick = (e) => {
    if (!user) {
      e.preventDefault();
      toast.error("Please create an account to continue shopping", {
        duration: 4000,
        position: "top-center",
        style: {
          background: "#1F2937",
          color: "#fff",
          border: "1px solid #4B5563",
        },
      });
      navigate("/login");
    }
  };

  const handleQuotationClick = (e) => {
    if (!user) {
      e.preventDefault();
      toast.error("Please create an account to request quotations", {
        duration: 4000,
        position: "top-center",
        style: {
          background: "#1F2937",
          color: "#fff",
          border: "1px solid #4B5563",
        },
      });
      navigate("/login");
    }
  };

  const displayName = user ? (user.firstName || user.username || user.email) : "";

  return (
    <header className="fixed top-0 left-0 right-0 bg-gradient-to-r from-gray-900 to-gray-800 text-white shadow-lg z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <img
              src="../../../public/meta_logo.png"
              alt="Company Logo"
              className="h-16 w-auto mr-3 transition-transform duration-300 group-hover:scale-105"
            />
          </Link>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-white focus:outline-none p-2 transition-colors duration-200 hover:text-purple-400"
            onClick={toggleMobileMenu}
          >
            {mobileMenuOpen ? (
              <FaTimes className="h-6 w-6" />
            ) : (
              <FaBars className="h-6 w-6" />
            )}
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/products"
              className="text-white hover:text-purple-400 transition duration-300 font-medium px-3 py-2 transform hover:scale-105"
            >
              Products
            </Link>
            <Link
              to="/repair-consultations"
              className="text-white hover:text-purple-400 transition duration-300 font-medium px-3 py-2 transform hover:scale-105"
            >
              Repair & Consultations
            </Link>
            <Link
              to="/about"
              className="text-white hover:text-purple-400 transition duration-300 font-medium px-3 py-2 transform hover:scale-105"
            >
              About Us
            </Link>
          </nav>

          {/* Right side items - desktop */}
          <div className="hidden md:flex items-center space-x-6">
            {user ? (
              <>
                <Link
                  to="/profile"
                  className="text-white hover:text-purple-400 transition duration-300 flex items-center px-4 py-2 transform hover:scale-105"
                >
                  <FaUser className="mr-2" />
                  <span className="font-medium">{displayName}</span>
                </Link>
                <button
                  onClick={logoutHandler}
                  className="text-white hover:text-purple-400 transition duration-300 flex items-center px-4 py-2 transform hover:scale-105"
                >
                  <FaSignOutAlt className="mr-2" />
                  <span className="font-medium">Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-white hover:text-purple-400 transition duration-300 px-4 py-2 font-medium transform hover:scale-105"
                >
                  <span>Login / Register</span>
                </Link>
              </>
            )}
            
            {/* Quotation Button */}
            <Link
              to="/quotations"
              onClick={handleQuotationClick}
              className="relative flex items-center text-white hover:text-purple-400 transition duration-300 p-2 transform hover:scale-105"
            >
              <FaFileAlt className="text-xl" />
              {quotationItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                  {quotationItemsCount}
                </span>
              )}
            </Link>
            
            {/* Cart Button */}
            <Link
              to="/cart"
              onClick={handleCartClick}
              className="relative flex items-center text-white hover:text-purple-400 transition duration-300 p-2 transform hover:scale-105"
            >
              <FaShoppingCart className="text-xl" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                  {cartItemsCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden pt-4 pb-3 border-t border-gray-700 mt-3">
            <div className="flex flex-col space-y-3">
              <Link
                to="/products"
                className="text-white hover:text-purple-400 transition duration-300 px-4 py-2 transform hover:scale-105"
                onClick={() => setMobileMenuOpen(false)}
              >
                Products
              </Link>
              <Link
                to="/repair-consultations"
                className="text-white hover:text-purple-400 transition duration-300 px-4 py-2 transform hover:scale-105"
                onClick={() => setMobileMenuOpen(false)}
              >
                Repair & Consultations
              </Link>
              <Link
                to="/about"
                className="text-white hover:text-purple-400 transition duration-300 px-4 py-2 transform hover:scale-105"
                onClick={() => setMobileMenuOpen(false)}
              >
                About Us
              </Link>
              <div className="pt-4 border-t border-gray-700">
                {user ? (
                  <>
                    <Link
                      to="/profile"
                      className="flex items-center text-white hover:text-purple-400 transition duration-300 px-4 py-2 transform hover:scale-105"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <FaUser className="mr-2" />
                      <span>{displayName}</span>
                    </Link>
                    <button
                      onClick={() => {
                        logoutHandler();
                        setMobileMenuOpen(false);
                      }}
                      className="flex items-center text-white hover:text-purple-400 transition duration-300 px-4 py-2 transform hover:scale-105 w-full"
                    >
                      <FaSignOutAlt className="mr-2" />
                      <span>Logout</span>
                    </button>
                  </>
                ) : (
                  <Link
                    to="/login"
                    className="text-white hover:text-purple-400 transition duration-300 px-4 py-2 transform hover:scale-105 block"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Login / Register
                  </Link>
                )}
                
                {/* Quotation Link */}
                <Link
                  to="/quotations"
                  onClick={(e) => {
                    handleQuotationClick(e);
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center text-white hover:text-purple-400 transition duration-300 px-4 py-2 transform hover:scale-105"
                >
                  <FaFileAlt className="mr-2" />
                  <span>Quotations</span>
                  {quotationItemsCount > 0 && (
                    <span className="ml-2 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {quotationItemsCount}
                    </span>
                  )}
                </Link>
                
                {/* Cart Link */}
                <Link
                  to="/cart"
                  onClick={(e) => {
                    handleCartClick(e);
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center text-white hover:text-purple-400 transition duration-300 px-4 py-2 transform hover:scale-105"
                >
                  <FaShoppingCart className="mr-2" />
                  <span>Cart</span>
                  {cartItemsCount > 0 && (
                    <span className="ml-2 bg-purple-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {cartItemsCount}
                    </span>
                  )}
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;