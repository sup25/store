import React, { useState } from "react";
import Login from "@/app/login/page";
import Link from "next/link";
import { IoIosClose } from "react-icons/io";
import "./styles.css";

const LoginPopUp = ({ handler }) => {
  const [isVisible, setIsVisible] = useState(true);

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
      className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-30  z-[9999]"
      onClick={handleBackgroundClick}
    >
      <div
        className={`bg-white w-[1000px]  flex justify-between  ${
          isVisible ? "scale-in fade-in" : "scale-out fade-out"
        }`}
      >
        <div className="flex w-full justify-center items-center  flex-col gap-5 py-10">
          <div className="flex justify-between ">
            <div className="flex-col text-center items-center w-full px-8">
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
          </div>
          <Login isPopup={true} />
        </div>
        <IoIosClose
          size={50}
          onClick={handleClose}
          className="text-gray-400 hover:text-black transition ease-in duration-300 cursor-pointer "
        />
      </div>
    </div>
  );
};

export default LoginPopUp;
