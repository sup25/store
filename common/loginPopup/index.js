import React, { useState } from "react";
import Link from "next/link";
import { IoIosClose } from "react-icons/io";
import AuthForm from "../authForm";
import "../styles.css";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosClient from "@/utils/axiosClient";
import appConfig from "@/config";

const LoginPopUp = ({ handler }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const { setUserStore } = useAuth();
  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      handler();
    }, 300);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleBackgroundClick = (e) => {
    if (e.target.id === "loginPopUp") {
      handler();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axiosClient.post(
        `/${appConfig.basePath}/user/auth/login`,
        formData
      );
      const { user, accessToken, refreshToken } = response.data.returnedData;
      setUserStore(user, accessToken, refreshToken);
      handler();
      toast.success("Login successful!");
    } catch (error) {
      console.error(
        "Login failed:",
        error.response?.data.returnedData || error.message
      );
      toast.error("Login failed. Please check your credentials and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      id="loginPopUp"
      className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-30 z-[9999]"
      onClick={handleBackgroundClick}
    >
      <div
        className={`bg-white w-[1000px] flex justify-between ${
          isVisible ? "scale-in fade-in" : "scale-out fade-out"
        }`}
      >
        <div className="flex w-full justify-center items-center  flex-col gap-5 py-10 px-2">
          <div className="flex w-full justify-between">
            <div className="flex  w-full px-8 items-start">
              <div className="flex-col text-center items-center w-full">
                <p className="text-xl font-medium">
                  Welcome! Please Login to continue.
                </p>
                <p className="text-xs text-primary">
                  New member?{" "}
                  <Link href="/register" className="text-slate-800 font-medium">
                    Register here.
                  </Link>
                </p>
              </div>
              <IoIosClose
                size={50}
                onClick={handleClose}
                className="text-gray-400 items-start hover:text-black transition ease-in duration-300 cursor-pointer"
              />
            </div>
          </div>
          <AuthForm
            fields={[
              { name: "email", label: "Email", type: "email", required: true },
              {
                name: "password",
                label: "Password",
                type: "password",
                required: true,
              },
            ]}
            onSubmit={handleSubmit}
            formData={formData}
            onChange={handleChange}
            errors={[]}
            buttonText="Login"
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPopUp;
