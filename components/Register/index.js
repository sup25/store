"use client";
import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import axios from "axios";
import Form from "../form";

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState([]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    console.log("formdata", formData);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/v1/user/auth/register", formData);

      if (response.status !== 201) {
        throw new Error("Failed to register user");
      }

      toast.success("User registered successfully");
    } catch (error) {
      console.log("Error registering user:", error.response.data);
      setErrors(error.response.data.returnedData.errors);
      toast.error(error.response.data.message);
    }
  };
  const registerFields = [
    { name: "fullName", label: "Username", type: "text", required: true },
    { name: "email", label: "Email", type: "email", required: true },
    { name: "password", label: "Password", type: "password", required: true },
  ];

  return (
    <div className="section">
      <div className="container">
        <div className="flex w-full flex-col justify-center items-center gap-10 pb-20 ">
          <h2 className="text-2xl uppercase font-bold">Register</h2>
          <Form
            fields={registerFields}
            onSubmit={handleSubmit}
            formData={formData}
            onChange={handleChange}
            errors={errors}
            buttonText="Register"
          />
        </div>
      </div>
    </div>
  );
};

export default Register;
