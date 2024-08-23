import { useState } from "react";
import { IoIosClose } from "react-icons/io";
import "../../styles.css";
import LinkWithIcon from "@/common/linkWithIcon";
import { FiArrowRight } from "react-icons/fi";
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
          <h2 className="text-lg font-others text-black">
            You need to login to continue
          </h2>
          <IoIosClose
            size={30}
            onClick={handleClose}
            className="text-gray-400 hover:text-black transition ease-in duration-300 cursor-pointer"
          />
        </div>
        <LinkWithIcon
          href="/login"
          icon={FiArrowRight}
          label="Login to continue"
          iconPosition="right"
        />
      </div>
    </div>
  );
};
