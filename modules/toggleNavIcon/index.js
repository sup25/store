import React from "react";

const ToggleNavIcon = ({ show, onClick }) => (
  <div
    className={`lg:hidden cursor-pointer transform transition-transform duration-300 ease-in-out ${
      show ? "rotate-180" : ""
    }`}
    onClick={onClick}
  >
    <svg
      className="w-6 h-6 transition-transform duration-300"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      {show ? (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M6 18L18 6M6 6l12 12"
        ></path>
      ) : (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M4 6h16M4 12h16m-7 6h7"
        ></path>
      )}
    </svg>
  </div>
);

export default ToggleNavIcon;
