import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProductDetailsPopup = ({ product, onClose, onAddToCart }) => {
    const navigate = useNavigate();

    if (!product) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-75">
            <div className="relative bg-gray-800 rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 bg-gray-700 p-2 rounded-full hover:bg-gray-600 transition-colors duration-200"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <div className="flex flex-col md:flex-row h-full">
                    {/* Product Image Section */}
                    <div className="md:w-1/2 p-6 bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
                        <div className="relative w-full">
                            <img
                                src={`/uploads/${product.imageName}`}
                                alt={product.name}
                                className="w-full h-auto object-contain max-h-[400px] rounded-lg"
                            />
                            <div className="absolute top-0 right-0 bg-purple-600 text-white px-3 py-1 rounded-bl-lg rounded-tr-lg text-sm font-semibold">
                                {product.category}
                            </div>
                        </div>
                    </div>

                    {/* Product Details Section */}
                    <div className="md:w-1/2 p-6 overflow-y-auto max-h-[90vh]">
                        <div className="flex justify-between items-start mb-2">
                            <span className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs">
                                {product.brand}
                            </span>
                            <div className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                                {/* <span className="text-gray-300 ml-1 text-sm">4.7 (128 reviews)</span> */}
                            </div>
                        </div>

                        <h2 className="text-2xl font-bold text-white mb-2">{product.name}</h2>

                        <div className="mb-4">
                            <p className="text-3xl font-bold text-purple-400 mb-1">
                                LKR. {product.price.toLocaleString()}.00
                            </p>
                            <p className="text-green-400 text-sm">In Stock</p>
                        </div>

                        <div className="mb-6">
                            <h3 className="text-lg font-semibold text-white mb-2">Description</h3>
                            <p className="text-gray-300">
                                {product.description}
                            </p>
                        </div>

                        {/* Specifications */}
                        <div className="mb-6">
                            <h3 className="text-lg font-semibold text-white mb-2">Specifications</h3>
                            <div className="bg-gray-700 rounded-lg p-4 divide-y divide-gray-600">
                                <div className="py-2 flex">
                                    <span className="text-gray-400 w-1/3">Brand</span>
                                    <span className="text-white w-2/3">{product.brand}</span>
                                </div>
                                <div className="py-2 flex">
                                    <span className="text-gray-400 w-1/3">Category</span>
                                    <span className="text-white w-2/3">{product.category}</span>
                                </div>
                                <div className="py-2 flex">
                                    <span className="text-gray-400 w-1/3">Warranty</span>
                                    <span className="text-white w-2/3">12 Months</span>
                                </div>
                                {product.specs && Object.entries(product.specs).map(([key, value]) => (
                                    <div key={key} className="py-2 flex">
                                        <span className="text-gray-400 w-1/3">{key}</span>
                                        <span className="text-white w-2/3">{value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Quantity Selector */}
                        <div className="mb-6">
                            <h3 className="text-lg font-semibold text-white mb-2">Quantity</h3>
                            <div className="flex items-center">
                                <button className="bg-gray-700 hover:bg-gray-600 text-white w-10 h-10 rounded-l-lg flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                                    </svg>
                                </button>
                                <input
                                    type="number"
                                    min="1"
                                    defaultValue="1"
                                    className="bg-gray-700 border-none text-center text-white w-16 h-10 focus:outline-none"
                                />
                                <button className="bg-gray-700 hover:bg-gray-600 text-white w-10 h-10 rounded-r-lg flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* Add to cart button */}
                        <div className="flex flex-col sm:flex-row gap-3">
                            <button
                                onClick={() => onAddToCart(product)}
                                className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-lg font-semibold transition duration-300 flex items-center justify-center"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                                Add to Cart
                            </button>
                        </div>

                        {/* Delivery Info */}
                        <div className="mt-6 bg-gray-700 rounded-lg p-4">
                            <h3 className="text-white font-semibold mb-2 flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Delivery Information
                            </h3>
                            <p className="text-gray-300 text-sm">
                                Free delivery within Colombo city. Island-wide delivery available at a nominal fee.
                                Typically delivered in 2-3 business days.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailsPopup;