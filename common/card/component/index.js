import Link from "next/link";
import { useState } from "react";
import { IoIosClose } from "react-icons/io";
import "../../styles.css";
export const LoginModal = ({ handler }) => {
  const [isVisible, setIsVisible] = useState(true);
  const handleBackgroundClick = (e) => {
    if (e.target.id === "loginModal") {
      handler();
    }
  };
  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      handler();
    }, 300);
  };

  return (
    <div
      id="loginModal"
      onClick={handleBackgroundClick}
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[999999]"
    >
      <div
        className={`bg-white p-6 rounded shadow-lg w-[370px] ${
          isVisible ? "scale-in fade-in" : "scale-out fade-out"
        }`}
      >
        <div className="flex justify-between items-center">
          <h2 className="text-xl text-black">You need to login to continue</h2>
          <IoIosClose
            size={25}
            onClick={handleClose}
            className="text-gray-400 hover:text-black transition ease-in duration-300 cursor-pointer"
          />
        </div>
        <Link href="/login" className="w-fit">
          <div className="text-blue-500 w-fit">Login to continue</div>
        </Link>
      </div>
    </div>
  );
};
