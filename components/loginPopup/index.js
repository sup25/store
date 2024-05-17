import Login from "@/app/login/page";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { IoIosClose } from "react-icons/io";

const LoginPopUp = ({ onClose }) => {
  const popupRef = useRef();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 200);
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-30  z-50">
      <div
        ref={popupRef}
        className={`bg-white w-[1000px]  flex justify-between transform  transition-all duration-300 ${
          isVisible ? "scale-100 opacity-100" : "scale-0 opacity-0"
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
