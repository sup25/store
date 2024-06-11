"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "@/context/AuthContext";
import axiosClient from "@/utils/axiosClient";
import Link from "next/link";
import AuthForm from "../../components/authForm";

const Login = ({ isPopup }) => {
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
      const { user, accessToken, refreshToken } = response.data.returnedData;
      setUserStore(user, accessToken, refreshToken);
      router.push("/userdashboard");
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
      {!isPopup && (
        <div className="container">
          <div className="flex w-full flex-col justify-center items-center gap-10">
            <h2 className="text-2xl uppercase font-bold">Login</h2>
            <AuthForm
              fields={loginFields}
              onSubmit={handleSubmit}
              formData={formData}
              onChange={handleChange}
              errors={errors}
              buttonText="Login"
              isLoading={isLoading}
            />

            <Link
              href="/adminlogin"
              className="hover:border-b border-primary transition duration-300 ease-in-out"
            >
              Administrative Login
            </Link>
          </div>
        </div>
      )}
      {isPopup && (
        <AuthForm
          fields={loginFields}
          onSubmit={handleSubmit}
          formData={formData}
          onChange={handleChange}
          errors={errors}
          buttonText="Login"
          isLoading={isLoading}
        />
      )}
    </div>
  );
};

export default Login;
