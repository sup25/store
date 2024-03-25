"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "@/context/AuthContext";

import Form from "../../components/form";
import axiosClient from "@/utils/axiosClient";

const Login = () => {
  const { setUserStore } = useAuth();
  const [errors, setErrors] = useState([]);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
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
    setIsLoading(true);
    try {
      const response = await axiosClient.post(
        "/api/v1/user/auth/login",
        formData
      );
      const { user, token } = response.data.returnedData;
      setUserStore(user, token);
      router.push("/");
    } catch (error) {
      toast.error("Email or password is incorrect");
      setErrors(error.response?.data?.returnedData?.errors || []);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
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
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
