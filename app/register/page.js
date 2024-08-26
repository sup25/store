"use client";
import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { FiArrowRight } from "react-icons/fi";
import { useRouter } from "next/navigation";
import AuthForm from "@/common/authForm";
import appConfig from "@/config";
import LinkWithIcon from "@/common/linkWithIcon";

const Register = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
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
        `/${appConfig.basePath}/user/auth/register`,
        formData
      );

      if (response.status === 201) {
        toast.success("User registered successfully");
        router.push("/user/dashboard");
      } else {
        throw new Error("Failed to register user");
      }
    } catch (error) {
      console.log("Error registering user:", error.response?.data);

      const errorData = error.response?.data;
      if (errorData?.status === 409) {
        setErrors([errorData.message || "Email already in use"]);
        toast.error(errorData.message || "Email already in use");
      } else if (errorData?.returnedData?.errors) {
        const validationErrors = errorData.returnedData.errors.map(
          (err) => err.message
        );
        setErrors(validationErrors);
        toast.error(validationErrors.join(", "));
      } else {
        setErrors(["An error occurred during registration"]);
        toast.error("An error occurred during registration");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const registerFields = [
    { name: "first_name", label: "First Name", type: "text", required: true },
    { name: "last_name", label: "Last Name", type: "text", required: true },
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
          <h2 className="font-heading  text-center">Register</h2>
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
            href="/admin/auth/register"
            icon={FiArrowRight}
            label="Businees Account"
            iconPosition="right"
          />
        </div>
      </div>
    </div>
  );
};

export default Register;
