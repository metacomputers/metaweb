import React, { useEffect, useState } from "react";
import { fetchAllProducts } from "../../api/productApi";

import ProductDetailsPopup from "../../components/product_management/ProductDetailsPopup";


const ProductPage = () => {
    const [products, setProducts] = useState([]);

    const [brandFilter, setBrandFilter] = useState("");
    const [priceFilter, setPriceFilter] = useState({ min: 0, max: Infinity });
    const [categoryFilter, setCategoryFilter] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        const getProducts = async () => {
            setLoading(true);
            try {
                const data = await fetchAllProducts();
                setProducts(data);
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        };
        getProducts();
    }, []);

    const filteredProducts = products.filter((product) => {
        const brandMatch = brandFilter === "" || product.brand === brandFilter;
        const categoryMatch = categoryFilter === "" || product.category === categoryFilter;
        const priceMatch = product.price >= priceFilter.min && product.price <= priceFilter.max;

        const searchMatch =
            product.name.toLowerCase().includes(searchTerm.trim().toLowerCase()) ||
            product.category.toLowerCase().includes(searchTerm.trim().toLowerCase());

        return brandMatch && priceMatch && categoryMatch && searchMatch;
    });

    const clearFilters = () => {
        setBrandFilter("");
        setCategoryFilter("");
        setPriceFilter({ min: 0, max: Infinity });
        setSearchTerm("");
    };

    const handleViewDetails = (product) => {
        setSelectedProduct(product);
        setShowPopup(true);
    };

    const handleClosePopup = () => {
        setShowPopup(false);
    };

    const handleAddToCart = async (product) => {
        // Add to cart logic here
        console.log("Adding to cart:", product);
        // You can implement your add to cart API call here
        try {
            // Example: await addToCart(product._id, 1);
            alert(`${product.name} added to cart!`);
        } catch (error) {
            console.error("Error adding to cart:", error);
            alert("Failed to add product to cart");
        }
    };

    return (
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 min-h-screen text-white">
       
            <div className="container mx-auto px-4 py-8">

                {/* Search Bar */}
                <div className="mb-6 relative">
                    <input
                        type="text"
                        placeholder="Search for products..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full p-4 pl-12 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                    />
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 absolute top-4 left-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>

                {/* Filters */}
                <div className="mb-8 bg-gray-800 p-5 rounded-xl shadow-lg border border-gray-700">
                    <h2 className="text-xl font-semibold mb-4 text-purple-400">Filter Products</h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        {/* Brand Filter */}
                        <div>
                            <label htmlFor="brand-filter" className="block text-sm text-gray-400 mb-2">Brand</label>
                            <select
                                id="brand-filter"
                                value={brandFilter}
                                onChange={(e) => setBrandFilter(e.target.value)}
                                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                            >
                                <option value="">All Brands</option>
                                <option value="Asus">Asus</option>
                                <option value="HP">HP</option>
                                <option value="Dell">Dell</option>
                                <option value="MSI">MSI</option>
                                <option value="Apple">Apple</option>
                            </select>
                        </div>

                        {/* Category Filter */}
                        <div>
                            <label htmlFor="category-filter" className="block text-sm text-gray-400 mb-2">Category</label>
                            <select
                                id="category-filter"
                                value={categoryFilter}
                                onChange={(e) => setCategoryFilter(e.target.value)}
                                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                            >
                                <option value="">All Categories</option>
                                <option value="Laptop">Laptop</option>
                                <option value="Laptop-Gaming">Gaming Laptop</option>
                                <option value="Monitor">Monitor</option>
                                <option value="Accessories">Accessories</option>
                                <option value="Software">Software</option>
                                <option value="Hardware">Hardware</option>
                            </select>
                        </div>

                        {/* Price Filter */}
                        <div>
                            <label htmlFor="price-filter" className="block text-sm text-gray-400 mb-2">Price Range</label>
                            <select
                                id="price-filter"
                                onChange={(e) => {
                                    const val = e.target.value;
                                    switch (val) {
                                        case "0-10000":
                                            setPriceFilter({ min: 0, max: 10000 });
                                            break;
                                        case "10000-25000":
                                            setPriceFilter({ min: 10000, max: 25000 });
                                            break;
                                        case "25000-50000":
                                            setPriceFilter({ min: 25000, max: 50000 });
                                            break;
                                        case "50000-100000":
                                            setPriceFilter({ min: 50000, max: 100000 });
                                            break;
                                        case "100000-200000":
                                            setPriceFilter({ min: 100000, max: 200000 });
                                            break;
                                        case "200000-300000":
                                            setPriceFilter({ min: 200000, max: 300000 });
                                            break;
                                        case "300000-500000":
                                            setPriceFilter({ min: 300000, max: 500000 });
                                            break;
                                        case "500000+":
                                            setPriceFilter({ min: 500000, max: Infinity });
                                            break;
                                        default:
                                            setPriceFilter({ min: 0, max: Infinity });
                                    }
                                }}
                                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                            >
                                <option value="">All Prices</option>
                                <option value="0-10000">Under LKR 10,000</option>
                                <option value="10000-25000">LKR 10,000 - 25,000</option>
                                <option value="25000-50000">LKR 25,000 - 50,000</option>
                                <option value="50000-100000">LKR 50,000 - 100,000</option>
                                <option value="100000-200000">LKR 100,000 - 200,000</option>
                                <option value="200000-300000">LKR 200,000 - 300,000</option>
                                <option value="300000-500000">LKR 300,000 - 500,000</option>
                                <option value="500000+">Over LKR 500,000</option>
                            </select>
                        </div>

                        {/* Clear Filters Button */}
                        <div className="flex items-end">
                            <button
                                onClick={clearFilters}
                                className="w-full px-4 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
                            >
                                Clear Filters
                            </button>
                        </div>
                    </div>
                </div>

                {/* Results Stats
                <div className="mb-6 flex justify-between items-center">
                    <p className="text-gray-300">
                        Showing <span className="text-white font-semibold">{filteredProducts.length}</span> products
                    </p>
                    <div className="text-gray-300">
                        <span className="hidden sm:inline">Sort by: </span>
                        <select className="bg-gray-700 border border-gray-600 rounded-lg text-white p-2 focus:outline-none focus:ring-2 focus:ring-purple-500">
                            <option>Featured</option>
                            <option>Price: Low to High</option>
                            <option>Price: High to Low</option>
                            <option>Newest</option>
                        </select>
                    </div>
                </div> */}

                {/* Products Grid */}
                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
                    </div>
                ) : (
                    <>
                        <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-6">
                            {filteredProducts.map((product) => (
                                <div
                                    key={product._id}
                                    className="bg-gray-800 border border-gray-700 rounded-xl overflow-hidden hover:shadow-lg hover:shadow-purple-500/10 transition duration-300"
                                >
                                    <div className="relative">
                                        <img
                                            src={`/uploads/${product.imageName}`}
                                            alt={product.name}
                                            className="w-full h-48 object-cover"
                                        />
                                        <div className="absolute top-0 right-0 bg-purple-600 text-white px-2 py-1 m-2 text-xs font-bold rounded">
                                            {product.quantity} In-stock
                                        </div>
                                    </div>
                                    <div className="p-5">
                                        <div className="flex justify-between items-center mb-2">
                                            <p className="text-sm text-gray-400">{product.brand}</p>
                                            <div className="flex items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                                <span className="text-xs text-gray-400 ml-1">4.5</span>
                                            </div>
                                        </div>
                                        <h3 className="text-lg font-semibold text-white mb-2">
                                            {product.name}
                                        </h3>
                                        {/* <p className="text-sm text-gray-400 mb-4 h-12 overflow-hidden">
                                            {product.description.slice(0, 50)}...
                                        </p> */}
                                        <div className="flex justify-between items-center">
                                            <p className="text-lg font-bold text-purple-400">
                                                LKR. {product.price.toLocaleString()}.00
                                            </p>
                                            <button
                                                className="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-white rounded-full transition"
                                                onClick={() => handleViewDetails(product)}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                                </svg>
                                            </button>
                                        </div>
                                        {/* <button
                                            className="mt-4 w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg transition duration-300 transform hover:translate-y-px"
                                            onClick={() => handleViewDetails(product)}
                                        >
                                            View Details
                                        </button> */}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {filteredProducts.length === 0 && (
                            <div className="bg-gray-800 border border-gray-700 rounded-xl p-10 text-center shadow-lg">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <h3 className="text-xl font-semibold text-gray-300 mb-2">No matching products found</h3>
                                <p className="text-gray-400 mb-6">Try changing your filters or search term</p>
                                <button
                                    onClick={clearFilters}
                                    className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition duration-300 transform hover:scale-105"
                                >
                                    Clear All Filters
                                </button>
                            </div>
                        )}

                    </>
                )}

            </div>

            {/* Product Details Popup */}
            {showPopup && (
                <ProductDetailsPopup
                    product={selectedProduct}
                    onClose={handleClosePopup}
                    onAddToCart={handleAddToCart}
                />
            )}
            
        </div>
    );
};

export default ProductPage;