"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import Form from "../form";

const Login = () => {
  const { login } = useAuth();
  const [errors, setErrors] = useState([]);
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/v1/user/auth/login", formData);

      if (response.status === 200) {
        const { user } = response.data.returnedData;
        login(user);
        router.push("/");
      } else {
        console.error("Failed to login");
        toast.error("Failed to login");
      }
    } catch (error) {
      toast.error("Email or password is incorrect");
      setErrors(error.response?.data?.returnedData?.errors || []);
    }
  };
  const loginFields = [
    { name: "email", label: "Email", type: "email", required: true },
    { name: "password", label: "Password", type: "password", required: true },
  ];

  return (
    <div className="section">
      <div className="container">
        <div className="flex w-full flex-col justify-center items-center gap-10 pb-20 ">
          <h2 className="text-2xl uppercase font-bold">Login</h2>
          <Form
            fields={loginFields}
            onSubmit={handleSubmit}
            formData={formData}
            onChange={handleChange}
            errors={errors}
            buttonText="Login"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
