import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

const UpdateProduct = () => {
    const { id } = useParams();

    const [product, setProduct] = useState({
        name: '',
        description: '',
        price: '',
        brand: '',
        category: '',
        quantity: '',
    });

    useEffect(() => {
        fetchProductById();
    }, [id]);

    const fetchProductById = async () => {
        const response = await fetch(`http://localhost:5000/api/products/${id}`);
        const data = await response.json();
        setProduct(data);
    };
    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
                Update Product
            </h2>

            <form onSubmit={""}>
                <div className="mb-4">
                    <label className="block text-gray-700">Product Name</label>
                    <input
                        type="text"
                        name="name"
                        value={product.name}
                        // onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Description</label>
                    <textarea
                        name="description"
                        value={product.description}
                        // onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Price</label>
                    <input
                        type="number"
                        name="price"
                        value={product.price}
                        // onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Brand</label>
                    <input
                        type="text"
                        name="brand"
                        value={product.brand}
                        // onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg"
                    />
                </div>

                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
                >
                    Update Product
                </button>
            </form>
        </div>
    );
}

export default UpdateProduct;