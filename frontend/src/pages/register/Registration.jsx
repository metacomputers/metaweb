import React from "react";
import { addUser } from "../../api/apiUsers";

const Registration = () => {
  const onFormSubmit = async (evt) => {
    try {
      evt.preventDefault();
      const firstName = evt.target.firstName.value;
      const lastName = evt.target.lastName.value;
      const username = evt.target.username.value;
      const email = evt.target.email.value;
      const password = evt.target.password.value;

      const data = {
        firstName,
        lastName,
        username,
        email,
        password,
        role: "Customer"
      };

      console.log(data);
      await addUser(data);
      // await axios({
      //   method: "POST",
      //   url: import.meta.env.VITE_REGISTER_URL, // Change this to your registration API endpoint
      //   headers: {
      //     "Content-Type": "application/json",
      //     Accept: "application/json",
      //   },
      //   data: JSON.stringify(data),
      // });

      evt.target.reset();
    } catch (error) {
      console.error(`Error registering user`, error.message);
    }
  };

  return (
    <main className="flex flex-col justify-center items-center gap-10 min-h-screen p-5">
      <form
        onSubmit={onFormSubmit}
        className="flex flex-col justify-center items-center gap-6 shadow-xl rounded-md p-6 w-full max-w-md "
      >
        <h3 className="text-xl font-semibold">Create an Account</h3>

        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700">
            Username
          </label>
          <input
            name="username"
            required
            type="text"
            placeholder="Enter your username"
            className="mt-1 w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700">
            First Name
          </label>
          <input
            name="firstName"
            required
            type="text"
            placeholder="Enter your first name"
            className="mt-1 w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700">
            Last Name
          </label>
          <input
            name="lastName"
            required
            type="text"
            placeholder="Enter your last name"
            className="mt-1 w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            name="email"
            required
            type="email"
            placeholder="Enter your email"
            className="mt-1 w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            name="password"
            required
            type="password"
            placeholder="Enter a secure password"
            className="mt-1 w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200 w-full"
        >
          Register
        </button>
      </form>
    </main>
  );
};

export default Registration;
