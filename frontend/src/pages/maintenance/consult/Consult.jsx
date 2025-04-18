import React from 'react';
import axios from "axios";

const Consult = () => {
    const onFormSubmit = async (evt) => {
        try {
            evt.preventDefault();

            const customerName = evt.target.name.value;
            const mobile = evt.target.mobile.value;
            const issueCategory = evt.target.category.value
            const detailsOfIssue = evt.target.description.value;
            
            if(!/^070\d{7}$/.test()){
                alert("Phone Numnber Not In Valid Format")
                return
            }
            const data = {
                customerName,
                mobile,
                issueCategory,
                detailsOfIssue,
            }
             await axios({
                 method: "POST",
                 url: `${import.meta.env.VITE_BASE_URL}/consults`,
                 headers: {
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
                <h3 className="text-xl font-semibold">Consultation Request Form</h3>

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
                    <label className="block text-sm font-medium text-gray-700">Issue Category</label>
                    <input
                        name="category"
                        required
                        type="text"
                        placeholder="E.g., Display/Battery/Hearing"
                        className="mt-1 w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                <div className="w-full">
                    <label className="block text-sm font-medium text-gray-700">Details of the Issue</label>
                    <textarea
                        name="description"
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

export default Consult;
