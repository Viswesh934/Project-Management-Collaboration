import React from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavigationBar from "../Homepage/Navigationbar";
const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/contactus",
        formData
      );
      console.log(response.data); // Handle success response
    } catch (error) {
      console.error("Error submitting form:", error); // Handle error
    }
  };
  return (
    <div>
      <NavigationBar />
      <div>
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-4xl font-bold text-gray-800">Contact Us</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
          <p className="text-lg">
            If you have any questions or feedback, please feel free to contact
            us using the form below:
          </p>

          <form className="mt-8" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
              <div>
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="name"
                >
                  Name:
                </label>
                <input
                  className="border border-gray-200 rounded-lg py-2 px-3 w-full"
                  type="text"
                  id="name"
                  name="name"
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="email"
                >
                  Email:
                </label>
                <input
                  className="border border-gray-200 rounded-lg py-2 px-3 w-full"
                  type="email"
                  id="email"
                  name="email"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="mt-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="message"
              >
                Message:
              </label>
              <textarea
                className="border border-gray-200 rounded-lg py-2 px-3 w-full"
                id="message"
                name="message"
                onChange={handleChange}
                required
              />
            </div>

            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg mt-8"
              type="submit"
            >
              Submit
            </button>
          </form>
        </section>
      </main>
    </div>
    </div>
  );
};

export default ContactUs;
