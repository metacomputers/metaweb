import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaBars, FaTimes, FaUser, FaSignOutAlt } from "react-icons/fa";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const navigate = useNavigate();

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

  return (
    <header className="bg-gray-900 text-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src="../../../public/meta_logo.png"
              alt="Company Logo"
              className="h-20 w-auto mr-3"
            />
          </Link>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-white focus:outline-none"
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
              className="text-white hover:text-purple-400 transition duration-300"
            >
              Products
            </Link>
            <Link
              to="/repair-consultations"
              className="text-white hover:text-purple-400 transition duration-300"
            >
              Repair & Consultations
            </Link>
            <Link
              to="/about"
              className="text-white hover:text-purple-400 transition duration-300"
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
                  className="text-white hover:text-purple-400 transition duration-300 flex items-center"
                >
                  <FaUser className="mr-2" />
                  <span>{user.firstName}</span>
                </Link>
                <button
                  onClick={logoutHandler}
                  className="text-white hover:text-purple-400 transition duration-300 flex items-center"
                >
                  <FaSignOutAlt className="mr-2" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-white hover:text-purple-400 transition duration-300"
                >
                  <span>Login / Register</span>
                </Link>
              </>
            )}
            <Link
              to="/cart"
              className="relative flex items-center text-white hover:text-purple-400 transition duration-300"
            >
              <FaShoppingCart className="text-xl" />
              <span className="absolute -top-2 -right-2 bg-purple-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                0
              </span>
            </Link>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden pt-4 pb-3 border-t border-gray-700 mt-3">
            <div className="flex flex-col space-y-4">
              <Link
                to="/products"
                className="text-white hover:text-purple-400 transition duration-300"
                onClick={() => setMobileMenuOpen(false)}
              >
                Products
              </Link>
              <Link
                to="/repair-consultations"
                className="text-white hover:text-purple-400 transition duration-300"
                onClick={() => setMobileMenuOpen(false)}
              >
                Repair & Consultations
              </Link>
              <Link
                to="/about"
                className="text-white hover:text-purple-400 transition duration-300"
                onClick={() => setMobileMenuOpen(false)}
              >
                About Us
              </Link>
              <div className="pt-4 border-t border-gray-700">
                {user ? (
                  <div className="flex justify-between">
                    <Link
                      to="/profile"
                      className="flex items-center text-white hover:text-purple-400 transition duration-300"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <FaUser className="mr-2" />
                      <span>{user.firstName}</span>
                    </Link>
                    <button
                      onClick={() => {
                        logoutHandler();
                        setMobileMenuOpen(false);
                      }}
                      className="flex items-center text-white hover:text-purple-400 transition duration-300"
                    >
                      <FaSignOutAlt className="mr-2" />
                      <span>Logout</span>
                    </button>
                  </div>
                ) : (
                  <div className="flex justify-between items-center">
                    <Link
                      to="/login"
                      className="flex items-center text-white hover:text-purple-400 transition duration-300"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <FaUser className="mr-2" />
                      <span>Login / Register</span>
                    </Link>
                  </div>
                )}
                <div className="mt-4 flex justify-end">
                  <Link
                    to="/cart"
                    className="relative flex items-center text-white hover:text-purple-400 transition duration-300"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <FaShoppingCart className="text-xl" />
                    <span className="absolute -top-2 -right-2 bg-purple-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      0
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;