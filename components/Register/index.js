"use client";
import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import axios from "axios";

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    console.log("formdata", {
      ...formData,
      password: "",
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/registeruser`,
        formData
      );

      if (response.status !== 201) {
        throw new Error("Failed to register user");
      }

      toast.success("User registered successfully");
      setFormData({
        fullName: "",
        email: "",
        password: "",
      });
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error("Email is already in use");
      }
      console.error("Error registering user:", error.message);
      toast.error("Error registering user");
    }
  };

  return (
    <div className="section">
      <div className="container">
        <div className="flex w-full flex-col justify-center items-center gap-10 pb-20 ">
          <h2 className="text-2xl uppercase font-bold">Register</h2>
          <form
            onSubmit={handleSubmit}
            className="bg-slate-400 py-10 px-10 md:w-1/2 w-full rounded flex flex-col gap-5  "
          >
            <div className="flex flex-col gap-2  ">
              <label htmlFor="username " className="text-lg font-semibold">
                Username:
              </label>

              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="py-2 px-2 w-full"
              />
            </div>
            <div className="flex flex-col gap-2">
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
                className="py-2 px-2 w-full"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="text-lg font-semibold">
                Password:
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="py-2 px-2 w-full"
              />
            </div>
            <button
              type="submit"
              className="bg-primary text-white font-bold flex items-center justify-center w-fit py-2 px-2"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
