import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

const UpdateProduct = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [product, setProduct] = useState({
        name: "",
        description: "",
        price: "",
        brand: "",
        category: "",
        quantity: "",
    });

    useEffect(() => {
        fetchProductById();
    }, [id]);

    const fetchProductById = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/products/${id}`);
            const data = await response.json();
            setProduct(data);
        } catch (error) {
            console.error("Error while fetching the product...", error);
        }
    };

    const changedFields = (e) => {
        const { name, value } = e.target;
        setProduct((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const updateProduct = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append("name", product.name);
        formData.append("description", product.description);
        formData.append("price", product.price);
        formData.append("brand", product.brand);
        formData.append("category", product.category);
        formData.append("quantity", product.quantity);

        try {
            const response = await fetch(`http://localhost:5000/api/products/${id}`, {
                method: "PUT",
                body: formData,
            });

            if (response.ok) {
                toast.success("Product updated successfully!");
                navigate("/admin/products");
            } else {
                console.error("Failed to update the product..");
                toast.error("Failed to update the product");
            }
        } catch (error) {
            console.error("Error while updating..", error);
            toast.error("Error while updating");
        }
    };

    return (
        <div className="mt-4 bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="container mx-auto px-4 py-6">
                {/* Header */}
                <div className="mb-6">
                    <h2 className="text-xl font-semibold text-gray-800">
                        Update Product
                    </h2>
                    <p className="text-sm text-gray-500">
                        Edit the product information below
                    </p>
                </div>

                {/* Form Card */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                    <form onSubmit={updateProduct}>
                        <div className="grid grid-cols-1 gap-6 mb-6">
                            <div>
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Product Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    value={product.name}
                                    onChange={changedFields}
                                    className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="description"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Description
                                </label>
                                <textarea
                                    name="description"
                                    id="description"
                                    value={product.description}
                                    onChange={changedFields}
                                    rows={4}
                                    className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <label
                                    htmlFor="brand"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Brand
                                </label>
                                <input
                                    type="text"
                                    name="brand"
                                    id="brand"
                                    value={product.brand}
                                    onChange={changedFields}
                                    className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="category"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Category
                                </label>
                                <select
                                    name="category"
                                    id="category"
                                    value={product.category}
                                    onChange={changedFields}
                                    className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                >
                                    <option value="">Select Category</option>
                                    <option value="Laptop-Gaming">Laptop-Gaming</option>
                                    <option value="Laptop">Laptop</option>
                                    <option value="Accessories">Accessories</option>
                                    <option value="Monitor">Monitor</option>
                                    <option value="Hardware">Hardware</option>
                                    <option value="Software">Software</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            <div>
                                <label
                                    htmlFor="price"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Price (LKR)
                                </label>
                                <input
                                    type="number"
                                    name="price"
                                    id="price"
                                    value={product.price}
                                    onChange={changedFields}
                                    className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="quantity"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Stock Quantity
                                </label>
                                <input
                                    type="number"
                                    name="quantity"
                                    id="quantity"
                                    value={product.quantity}
                                    onChange={changedFields}
                                    className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                        </div>

                        <div className="flex justify-end space-x-3">
                            <button
                                type="button"
                                onClick={() => navigate("/admin/products")}
                                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            >
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateProduct;