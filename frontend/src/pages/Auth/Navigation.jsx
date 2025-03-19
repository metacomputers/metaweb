import { useState } from "react";
import { AiOutlineHome, AiOutlineShopping, AiOutlineSearch, AiOutlineUser } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import "./Navigation.css";
import { useSelector, useDispatch } from "react-redux";
import { useLoginMutation } from "../../redux/api/usersApiSlice";
import { logout } from "../../redux/features/auth/authSlice";

const Navigation = () => {
    const { userInfo } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [logoutApiCall] = useLoginMutation();

    const logoutHandler = async () => {
        try {
            await logoutApiCall().unwrap();
            dispatch(logout());
            navigate("/login");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            {/* Navigation Bar */}
            <div className="w-full bg-black text-white p-4 flex justify-between items-center fixed top-0 left-0 right-0 shadow-md z-50">
                {/* Logo */}
                <div className="text-lg font-bold">META COMPUTERS</div>
                
                {/* Navigation Links */}
                <div className="flex space-x-6">
                    <Link to="/" className="flex items-center transition-transform transform hover:translate-y-1">
                        <AiOutlineHome size={24} />
                        <span className="ml-2">Home</span>
                    </Link>
                    <Link to="/products" className="flex items-center transition-transform transform hover:translate-y-1">
                        <AiOutlineShopping size={24} />
                        <span className="ml-2">Products</span>
                    </Link>
                    <Link to="/repairs" className="flex items-center transition-transform transform hover:translate-y-1">
                        <AiOutlineShopping size={24} />
                        <span className="ml-2">Repairs</span>
                    </Link>
                </div>
                
                {/* Search Bar */}
                <div className="flex items-center bg-gray-800 rounded px-3 py-1">
                    <input type="text" placeholder="Search..." className="bg-transparent focus:outline-none text-white" />
                    <AiOutlineSearch size={20} className="ml-2" />
                </div>

                {/* User Profile */}
                <div className="flex items-center space-x-4">
                    {userInfo ? (
                        <span className="text-white">{userInfo.username}</span>
                    ) : (
                        <Link to="/login" className="text-white">Login</Link>
                    )}
                    <AiOutlineUser size={24} className="cursor-pointer" />
                </div>
            </div>

            {/* Footer */}
            <footer className="w-full bg-gray-300 text-black text-center p-4 fixed bottom-0 left-0 right-0 shadow-md flex justify-between items-center border-t border-gray-400">
                {/* Company Logo */}
                <div className="ml-4 bg-gray-500 text-white px-4 py-2 rounded-full">Meta Computers</div>
                
                {/* Contact Info */}
                <div className="text-center">
                    <h3 className="font-bold">Contact Us</h3>
                    <p>📞 077 067 0436</p>
                    <p>📧 <a href="mailto:example@gmail.com" className="underline">metacomputers@gmail.com</a></p>
                    <p>📍 META COMPUTERS, Seeduwa 11410</p>
                </div>
                
                {/* Copyright */}
                <div className="mr-4 text-gray-700">&copy; 2025 Copyright META Computers</div>
            </footer>
        </>
    );
};

export default Navigation;
