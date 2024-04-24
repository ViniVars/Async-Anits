"use client";
import React, { useState } from "react";

// components/RegistrationForm.js

const RegistrationForm = () => {
  // State to manage input value
  const [name, setName] = useState("");

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    let uid = document.querySelector('.uid').value
    let pass = document.querySelector('.pass').value
    let cpass = document.querySelector('.cpass').value
    if(uid && pass && (pass == cpass) && name){

      try {
        console.log('Enter')
        const response = await fetch("/api/register", {
          next : {revalidate : 10},
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ input: name, uid : uid, pass : pass}),
        });
        const data = await response.json()
        if(data.work == "Done"){
          console.log('Registeration Done')
        }
        else{
          console.error("User Exists");
        }
      } catch (error) {
        console.error("Error registering:", error);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-white mb-4">Register</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="name"
              className="block text-white text-sm font-medium"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)} // Update name state on input change
              className="mt-1 block w-full rounded-md border-gray-700 bg-gray-700 text-white py-2 px-3 focus:outline-none focus:border-blue-500"
              placeholder="Enter your name"
            />
          </div>
          <br />
          <div>
            <label
              htmlFor="name"
              className="block text-white text-sm font-medium"
            >
              College ID
            </label>
            <input
              type="text"
              id="name"
              name="name"
              // value={name}
              // onChange={(e) => setName(e.target.value)} // Update name state on input change
              className="uid mt-1 block w-full rounded-md border-gray-700 bg-gray-700 text-white py-2 px-3 focus:outline-none focus:border-blue-500"
              placeholder="Enter your ID"
            />
          </div>
          <br />
          <div>
            <label
              htmlFor="name"
              className="block text-white text-sm font-medium"
            >
              Password
            </label>
            <input
              type="text"
              id="name"
              name="name"
              // value={name}
              // onChange={(e) => setName(e.target.value)} // Update name state on input change
              className="pass mt-1 block w-full rounded-md border-gray-700 bg-gray-700 text-white py-2 px-3 focus:outline-none focus:border-blue-500"
              placeholder="Set Password"
            />
          </div>
          <br />
          <div>
            <label
              htmlFor="name"
              className="block text-white text-sm font-medium"
            >
              Confirm Password
            </label>
            <input
              type="text"
              id="name"
              name="name"
              // value={name}
              // onChange={(e) => setName(e.target.value)} // Update name state on input change
              className="cpass mt-1 block w-full rounded-md border-gray-700 bg-gray-700 text-white py-2 px-3 focus:outline-none focus:border-blue-500"
              placeholder="Confirm Password"
            />
          </div>
          <br />

          <div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
