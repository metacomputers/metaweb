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
    },[id]);

    const fetchProductById = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/products/${id}`);
            const data = await response.json();
            setProduct(data);
        } catch (error) {
            console.error("Error while fetching the product...", error)
        }
    };

    const changedFields = (e) => {
        const { name, value } = e.target;
        setProduct((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const updateProduct = async (e) => {
        e.preventDefault();

        const formData = new FormData(); //form data object

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
                alert("Product updated successfully!!")
            } else {
                console.error("Failed to update the product..");
                alert("Failed to update the product..");
            }


        } catch (error) {
            console.error("Error while updating..", error)
            alert("Error while updating..");
        }
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
                Update Product
            </h2>

            <form onSubmit={updateProduct}>
                <div className="mb-4">
                    <label className="block text-gray-700">Product Name</label>
                    <input
                        type="text"
                        name="name"
                        value={product.name}
                        onChange={changedFields}
                        className="w-full px-4 py-2 border rounded-lg"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Description</label>
                    <textarea
                        name="description"
                        value={product.description}
                        onChange={changedFields}
                        className="w-full px-4 py-2 border rounded-lg"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Brand</label>
                    <input
                        type="text"
                        name="brand"
                        value={product.brand}
                        onChange={changedFields}
                        className="w-full px-4 py-2 border rounded-lg"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Category</label>
                    <input
                        type="text"
                        name="category"
                        value={product.category}
                        onChange={changedFields}
                        className="w-full px-4 py-2 border rounded-lg"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Price</label>
                    <input
                        type="number"
                        name="price"
                        value={product.price}
                        onChange={changedFields}
                        className="w-full px-4 py-2 border rounded-lg"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Quantity in stock:</label>
                    <input
                        type="text"
                        name="quantity"
                        value={product.quantity}
                        onChange={changedFields}
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