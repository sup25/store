import React, { useState } from "react";
import Link from "next/link";
import { IoIosClose } from "react-icons/io";
import AuthForm from "../authForm";
import "../styles.css";
import useLogin from "./hook";

const LoginPopUp = ({ handler }) => {
  const [isVisible, setIsVisible] = useState(true);
  const { formData, isLoading, handleChange, handleSubmit } = useLogin(handler);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      handler();
    }, 300);
  };

  const handleBackgroundClick = (e) => {
    if (e.target.id === "loginPopUp") {
      handler();
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
            <div className="flex w-full px-8 items-start">
              <div className="flex flex-col gap-2 text-center items-center w-full">
                <p className="md:text-xl text-base font-medium font-others">
                  Welcome! Please Login to continue.
                </p>
                <p className="text-xs text-primary font-others">
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
