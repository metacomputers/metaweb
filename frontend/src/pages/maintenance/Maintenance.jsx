import React, { useState } from 'react';
import Button from "./components/Button.jsx";
import axios from "axios";

const Maintenance = () => {
    const [object, setObject] = useState(null);
    const [error, setError] = useState(null);
    

    const options = [
        {
            label: "PC & Laptop Repair",
            desc: "We fix hardware and software issues quickly and efficiently.",
            link: "/maintenance/repair"
        },
        {
            label: "Consultations",
            desc: "Get expert advice on tech solutions and system improvements.",
            link: "/maintenance/consult"
        },
    ];

    const onSubmit = async (evt) => {
        evt.preventDefault();
        setError(null);
        setObject(null);

        const rNumber = evt.target.rNumber.value.trim().toLowerCase();
        if (!rNumber) {
            setError("Reference number is required.");
            return;
        }

        if (rNumber<0) {
            setError("Reference number is required.");
            return;
        }
        
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/repairs/${rNumber}`);
            setObject(response.data);
        } catch (e) {
            setError(e.response?.data?.error || "An error occurred. Please try again.");
            console.error(e);
        }
    };

    return (
        <main className="w-full h-screen flex items-center justify-center bg-gray-100 p-5">
            <section className="flex flex-col gap-6 bg-white shadow-md rounded-lg p-6 w-fit">
                <h2 className="font-bold text-2xl text-gray-900 text-center">Repair & Consultation Services</h2>

                <form onSubmit={onSubmit} className="flex flex-col gap-3">
                    <input
                        name="rNumber"
                        required
                        type="text"
                        placeholder="Reference number"
                        className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <button type="submit" className="bg-blue-500 py-2 px-4 rounded-md text-white font-bold hover:bg-blue-600 transition">
                        Check Status
                    </button>
                </form>

                {error && <p className="text-red-500 text-center font-medium">{error}</p>}
                {object && (
                    <div className="bg-gray-100 w-fit rounded-md font-bold p-3 text-black text-start">
                        <p>
                            Customer: {object.customerName}
                        </p>
                        <p>
                            Status: {object.status}
                        </p>
                        <p>Created: {new Date(object.updatedAt).toLocaleString()}</p>
                    </div>
                )}

                <ul className="flex flex-col md:flex-row gap-4 mt-4">
                    {options.map((item, index) => (
                        <li key={index} className="flex-1">
                            <Button label={item.label} desc={item.desc} link={item.link} />
                        </li>
                    ))}
                </ul>
            </section>
        </main>
    );
};

export default Maintenance;