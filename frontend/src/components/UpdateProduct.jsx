import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

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
                alert("Product updated successfully!!");
                navigate("/");
            } else {
                console.error("Failed to update the product..");
                alert("Failed to update the product..");
            }
        } catch (error) {
            console.error("Error while updating..", error);
            alert("Error while updating..");
        }
    };

    return (
        <div className="bg-gradient-to-r from-gray-100 to-gray-200 min-h-screen flex flex-col">
            {/* Header */}
            <header className="bg-black text-white py-4">
                <h2 className="text-3xl font-semibold text-center tracking-tight">
                    Update Product Details
                </h2>
            </header>
            <div className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-2xl">

                    <form onSubmit={updateProduct} className="space-y-6">
                        <div>
                            <label
                                htmlFor="name"
                                className="block text-sm font-semibold text-gray-700"
                            >
                                Product Name
                            </label>
                            <div className="mt-1">
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    value={product.name}
                                    onChange={changedFields}
                                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-3"
                                />
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="description"
                                className="block text-sm font-semibold text-gray-700"
                            >
                                Description
                            </label>
                            <div className="mt-1">
                                <textarea
                                    name="description"
                                    id="description"
                                    value={product.description}
                                    onChange={changedFields}
                                    rows={8}
                                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                            <div>
                                <label
                                    htmlFor="brand"
                                    className="block text-sm font-semibold text-gray-700"
                                >
                                    Brand
                                </label>
                                <div className="mt-1">
                                    <input
                                        type="text"
                                        name="brand"
                                        id="brand"
                                        value={product.brand}
                                        onChange={changedFields}
                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-3"
                                    />
                                </div>
                            </div>

                            <div>
                                <label
                                    htmlFor="category"
                                    className="block text-sm font-semibold text-gray-700"
                                >
                                    Category
                                </label>
                                <div className="mt-1">
                                    <select
                                        name="category"
                                        id="category"
                                        value={product.category}
                                        onChange={changedFields}
                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-3"
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
                        </div>


                        <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                            <div>
                                <label
                                    htmlFor="price"
                                    className="block text-sm font-semibold text-gray-700"
                                >
                                    Price
                                </label>
                                <div className="mt-1">
                                    <input
                                        type="number"
                                        name="price"
                                        id="price"
                                        value={product.price}
                                        onChange={changedFields}
                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-3"
                                    />
                                </div>
                            </div>

                            <div>
                                <label
                                    htmlFor="quantity"
                                    className="block text-sm font-semibold text-gray-700"
                                >
                                    Quantity in stock:
                                </label>
                                <div className="mt-1">
                                    <input
                                        type="text"
                                        name="quantity"
                                        id="quantity"
                                        value={product.quantity}
                                        onChange={changedFields}
                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-3"
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="w-full py-3 px-4 rounded-md shadow-md text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Update Product
                            </button>
                        </div>
                    </form>
                </div>
            </div >
        </div >
    );
};

export default UpdateProduct;