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
        <div className="bg-gray-100 min-h-screen flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
                    Update Product
                </h2>

                <form onSubmit={updateProduct} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 text-sm font-medium">
                            Product Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={product.name}
                            onChange={changedFields}
                            className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 text-sm font-medium">
                            Description
                        </label>
                        <textarea
                            name="description"
                            value={product.description}
                            onChange={changedFields}
                            className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 text-sm font-medium">
                            Brand
                        </label>
                        <input
                            type="text"
                            name="brand"
                            value={product.brand}
                            onChange={changedFields}
                            className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 text-sm font-medium">
                            Category
                        </label>
                        <input
                            type="text"
                            name="category"
                            value={product.category}
                            onChange={changedFields}
                            className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 text-sm font-medium">
                            Price
                        </label>
                        <input
                            type="number"
                            name="price"
                            value={product.price}
                            onChange={changedFields}
                            className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 text-sm font-medium">
                            Quantity in stock:
                        </label>
                        <input
                            type="text"
                            name="quantity"
                            value={product.quantity}
                            onChange={changedFields}
                            className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        Update Product
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdateProduct;