import React from 'react';
import axios from "axios";

const Repair = () => {
    const onFormSubmit = async (evt) => {
        try {
            evt.preventDefault();

            const customerName = evt.target.name.value;
            const mobile = evt.target.mobile.value;
            const device = evt.target.deviceName.value
            const issueDescription = evt.target.issue.value;
            if(!/^070\d{7}$/.test()){
                alert("Phone Numnber Not In Valid Format")
                return
            }
            const data = {
                customerName,
                mobile,
                device,
                issueDescription,
            }

            await axios({
                method: "POST",
                url: `${import.meta.env.VITE_BASE_URL}/repairs`,
                headers: {
                    Authorization: `Bearer ${device}`,
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
                data: JSON.stringify(data)
            })
            evt.target.reset();
        } catch (error) {
            console.error(`Error deleting repair`, error.message);
        }
    }
    return (
        <main className="flex flex-col justify-center items-center gap-10 min-h-screen p-5">
            <form onSubmit={onFormSubmit}
                  className="flex flex-col justify-center items-center gap-6 shadow-xl rounded-md p-6 w-full max-w-md ">
                <h3 className="text-xl font-semibold">Repair Request Form</h3>

                <div className="w-full">
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                        name="name"
                        required
                        type="text"
                        placeholder="Enter your name"
                        className="mt-1 w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                <div className="w-full">
                    <label className="block text-sm font-medium text-gray-700">Mobile</label>
                    <input
                        name="mobile"
                        required
                        type="tel"
                        placeholder="Enter your mobile number"
                        className="mt-1 w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                <div className="w-full">
                    <label className="block text-sm font-medium text-gray-700">Device Name</label>
                    <input
                        name="deviceName"
                        required
                        type="text"
                        placeholder="E.g., Dell Laptop, iPhone 13"
                        className="mt-1 w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                <div className="w-full">
                    <label className="block text-sm font-medium text-gray-700">Issue</label>
                    <textarea
                        name="issue"
                        required
                        placeholder="Describe the issue"
                        rows="4"
                        className="mt-1 w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                <button
                    type="submit"
                    className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200 w-full"
                >
                    Submit
                </button>
            </form>
        </main>
    );
};

export default Repair;
