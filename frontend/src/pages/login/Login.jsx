import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
    return (
        <div className="h-screen flex flex-col justify-center items-center bg-gray-900 text-white px-6">
            <h1 className="text-4xl font-semibold mb-8">Welcome</h1>
            <p className="text-gray-300 mb-6 text-center">Please select your login type</p>
            <div className="flex gap-6">
                <Link
                    to="/maintenance"
                    className="bg-blue-500 hover:bg-blue-600 transition-all duration-300 px-8 py-3 rounded-lg font-medium shadow-md"
                >
                    Customer
                </Link>
                <Link
                    to="/admin"
                    className="bg-red-500 hover:bg-red-600 transition-all duration-300 px-8 py-3 rounded-lg font-medium shadow-md"
                >
                    Admin
                </Link>
            </div>
        </div>
    );
};

export default Login;
