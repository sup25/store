"use client";
import React, { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "@/context/AuthContext";
import axiosClient from "@/utils/axiosClient";
import Link from "next/link";
import AuthForm from "@/common/authForm";
import appConfig from "@/config";

const Login = ({ isPopup, redirectToVerification }) => {
  const { setUserStore } = useAuth();
  const [errors, setErrors] = useState([]);
  const router = useRouter();
  const searchParams = useSearchParams();
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
    setErrors([]);

    try {
      const response = await axiosClient.post(
        `/${appConfig.basePath}/user/auth/login`,
        formData
      );
      const { user, accessToken, refreshToken } = response.data.returnedData;
      setUserStore(user, accessToken, refreshToken);

      if (redirectToVerification) {
        const token = searchParams.get("token");
        if (token) {
          const redirectUrl = `/user/userdata/email/verifyEmail?token=${token}`;
          router.push(redirectUrl);
        } else {
          toast.error("Token missing. Please try again.");
        }
      } else {
        router.push("/user/dashboard");
      }
    } catch (error) {
      console.error("Error details:", error);
      if (error.response) {
        const apiErrors = error.response?.data?.returnedData?.errors || [];
        setErrors(apiErrors);

        if (apiErrors.length > 0) {
          apiErrors.forEach((err) => toast.error(err.message));
        } else if (error.response?.data?.message) {
          toast.error("Email or passwrod is incorrect");
        } else {
          toast.error("An error occurred during login");
        }
      } else {
        toast.error("An unexpected error occurred");
      }
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
        <div className="flex w-full flex-col justify-center items-center gap-10">
          <h2 className="text-2xl uppercase font-bold">Login</h2>
          <AuthForm
            fields={loginFields}
            onSubmit={handleSubmit}
            formData={formData}
            onChange={handleChange}
            errors={errors}
            buttonText="Continue"
            isLoading={isLoading}
          />

          <Link
            href="/admin/auth/login"
            className="hover:text-secondary transition duration-300 ease-in-out"
          >
            Administrative Login
          </Link>
        </div>
      </div>
    </div>
  );
};

const LoginWrapper = (props) => (
  <Suspense fallback={<div>Loading...</div>}>
    <Login {...props} />
  </Suspense>
);

export default LoginWrapper;
