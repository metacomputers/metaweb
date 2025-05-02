import React, { useEffect, useState } from "react";
import { fetchAllProducts } from "../../api/productApi";
import toast from "react-hot-toast";
import ProductDetailsPopup from "../../components/product_management/ProductDetailsPopup";
import { addToCart } from "../../api/cartApi";

const ProductPage = () => {
    const [products, setProducts] = useState([]);

    const [brandFilter, setBrandFilter] = useState("");
    const [priceFilter, setPriceFilter] = useState({ min: 0, max: Infinity });
    const [categoryFilter, setCategoryFilter] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    
    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 12; // Fixed at 12 products per page

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

    // Pagination logic
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        // Scroll to top when changing page
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const goToNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const goToPreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const clearFilters = () => {
        setBrandFilter("");
        setCategoryFilter("");
        setPriceFilter({ min: 0, max: Infinity });
        setSearchTerm("");
        setCurrentPage(1); // Reset to first page when clearing filters
    };

    const handleViewDetails = (product) => {
        setSelectedProduct(product);
        setShowPopup(true);
    };

    const handleClosePopup = () => {
        setShowPopup(false);
    };

    const handleAddToCart = async (product, quantity) => {
        try {
            await addToCart(product._id, quantity);
            toast.success(`${product.name} added to cart!`);
            setShowPopup(false);
        } catch (error) {
            console.error("Error adding to cart:", error);
            toast.error("Failed to add product to cart");
        }
    };

    return (
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 min-h-screen text-white">
            <div className="container mx-auto px-4 py-8 pt-32">

                {/* Combined Filter Card with Search Bar */}
                <div className="mb-8 bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-700">
                    <div className="flex flex-wrap items-center justify-between">
                        {/* Filters */}
                        <div className="flex flex-wrap items-center space-x-3 flex-grow mr-4">
                            {/* Brand Filter */}
                            <div className="min-w-[120px] mb-2 md:mb-0">
                                <select
                                    id="brand-filter"
                                    value={brandFilter}
                                    onChange={(e) => setBrandFilter(e.target.value)}
                                    className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
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
                            <div className="min-w-[120px] mb-2 md:mb-0">
                                <select
                                    id="category-filter"
                                    value={categoryFilter}
                                    onChange={(e) => setCategoryFilter(e.target.value)}
                                    className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
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
                            <div className="min-w-[120px] mb-2 md:mb-0">
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
                                    className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
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
                            <div className="mb-2 md:mb-0">
                                <button
                                    onClick={clearFilters}
                                    className="px-3 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
                                >
                                    Clear Filters
                                </button>
                            </div>
                        </div>

                        {/* Search Bar */}
                        <div className="relative w-full md:w-auto md:min-w-[500px] flex-shrink-0">
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full p-2 pl-8 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                            />
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 absolute top-2.5 left-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Products Grid */}
                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
                    </div>
                ) : (
                    <>
                        <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-6">
                            {currentProducts.map((product) => (
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
                                        </div>
                                        <h3 className="text-lg font-semibold text-white mb-2">
                                            {product.name}
                                        </h3>
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

                        {/* Pagination Controls - Bottom */}
                        {!loading && filteredProducts.length > 0 && (
                            <div className="mt-8 flex flex-col md:flex-row justify-center items-center">
                                <div className="flex space-x-2 mb-4 md:mb-0">
                                    <button
                                        onClick={goToPreviousPage}
                                        disabled={currentPage === 1}
                                        className={`flex items-center justify-center px-4 py-2 rounded-lg border ${
                                            currentPage === 1 
                                                ? 'bg-gray-700 border-gray-600 text-gray-500 cursor-not-allowed' 
                                                : 'bg-gray-700 border-gray-600 hover:bg-gray-600 text-white cursor-pointer'
                                        }`}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                        </svg>
                                        Previous
                                    </button>
                                    
                                    {/* Page Numbers */}
                                    <div className="hidden md:flex">
                                        {Array.from({ length: Math.min(5, totalPages) }).map((_, idx) => {
                                            // Logic to show correct page numbers depending on current page
                                            let pageNum;
                                            if (totalPages <= 5) {
                                                pageNum = idx + 1;
                                            } else if (currentPage <= 3) {
                                                pageNum = idx + 1;
                                            } else if (currentPage >= totalPages - 2) {
                                                pageNum = totalPages - 4 + idx;
                                            } else {
                                                pageNum = currentPage - 2 + idx;
                                            }
                                            
                                            // Only render if pageNum is valid
                                            if (pageNum > 0 && pageNum <= totalPages) {
                                                return (
                                                    <button
                                                        key={pageNum}
                                                        onClick={() => paginate(pageNum)}
                                                        className={`w-10 h-10 mx-1 flex items-center justify-center rounded-lg ${
                                                            currentPage === pageNum
                                                                ? 'bg-purple-600 text-white'
                                                                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                                        }`}
                                                    >
                                                        {pageNum}
                                                    </button>
                                                );
                                            }
                                            return null;
                                        })}
                                    </div>
                                    
                                    <button
                                        onClick={goToNextPage}
                                        disabled={currentPage === totalPages}
                                        className={`flex items-center justify-center px-4 py-2 rounded-lg border ${
                                            currentPage === totalPages 
                                                ? 'bg-gray-700 border-gray-600 text-gray-500 cursor-not-allowed' 
                                                : 'bg-gray-700 border-gray-600 hover:bg-gray-600 text-white cursor-pointer'
                                        }`}
                                    >
                                        Next
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                </div>
                                
                                {/* Current Page Indicator (Mobile) */}
                                <div className="md:hidden text-gray-400 text-sm">
                                    Page {currentPage} of {totalPages}
                                </div>
                                
                                {/* Total pages indicator (Desktop) */}
                                <div className="hidden md:flex items-center ml-6">
                                    <span className="text-gray-400">Page {currentPage} of {totalPages}</span>
                                </div>
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