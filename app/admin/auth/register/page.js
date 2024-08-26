"use client";
import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useRouter } from "next/navigation";
import AuthForm from "@/common/authForm";
import appConfig from "@/config";
import LinkWithIcon from "@/common/linkWithIcon";
import { FiArrowLeft } from "react-icons/fi";

const Register = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const [errors, setErrors] = useState([]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirm_password) {
      setErrors(["Passwords do not match"]);
      toast.error("Passwords do not match");
      return;
    }
    setIsLoading(true);

    try {
      const response = await axios.post(
        `/${appConfig.basePath}/admin/auth/register`,
        formData
      );

      if (response.status !== 201) {
        throw new Error("Failed to register ");
      }
      toast.success("registered successfully");
      router.push("/admin/auth/login");
    } catch (error) {
      console.log("Error registering:", error.response.data);
      setErrors(error.response?.data?.returnedData?.errors || []);
      if (error.response?.data?.message) {
        setErrors([error.response.data.message]);
        toast.error("email already in use ");
      } else {
        setErrors(["An error occurred during registration"]);
        toast.error("An error occurred during registration");
      }
    } finally {
      setIsLoading(false);
    }
  };
  const registerFields = [
    { name: "name", label: "Name", type: "text", required: true },
    { name: "email", label: "Email", type: "email", required: true },
    { name: "password", label: "Password", type: "password", required: true },
    {
      name: "confirm_password",
      label: "Confirm Password",
      type: "password",
      required: true,
    },
  ];

  return (
    <div className="section">
      <div className="container">
        <div className="flex w-full flex-col justify-center items-center gap-10 pb-20 ">
          <h2 className="font-heading  text-center">Business Account</h2>
          <AuthForm
            fields={registerFields}
            onSubmit={handleSubmit}
            formData={formData}
            onChange={handleChange}
            errors={errors}
            buttonText="Register"
            isLoading={isLoading}
          />
          <LinkWithIcon
            href="/register"
            icon={FiArrowLeft}
            label="Customer Register"
          />
        </div>
      </div>
    </div>
  );
};

export default Register;
