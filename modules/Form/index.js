"use client";
import React, { useState } from "react";

const Form = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);
  };

  return (
    <div className="section">
      <div className="container">
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col bg-slate-400 rounded  gap-10 px-4 py-4"
        >
          <div className="flex  flex-col w-[300px] items-start gap-2">
            <label htmlFor="name" className="text-lg font-semibold">
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="px-2 py-2 border"
            />
          </div>
          <div className="flex flex-col w-[300px] items-start gap-2">
            <label htmlFor="email" className="text-lg font-semibold">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="px-2 py-2 border"
            />
          </div>
          <div className="flex flex-col w-[300px] items-start gap-2">
            <label htmlFor="address" className="text-lg font-semibold">
              Address:
            </label>
            <input
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              className="px-2 py-2 border"
            />
          </div>
          <button
            type="submit"
            className="bg-primary hover:bg-secondary text-white font-bold flex items-center w-24  justify-center py-2 px-2"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Form;
