"use client";
import Line from "@/common/line";
import { useState } from "react";
import { MdOutlineCancel } from "react-icons/md";
import "../../../styles.css";

const Modal = ({
  isOpen,
  onClose,
  modalData,
  excludeKeys = [],
  columnLabels = {},
}) => {
  const [isVisible, setIsVisible] = useState(isOpen);

  const closeModal = (e) => {
    if (e.target.id === "tableModal") {
      setIsVisible(false);
      setTimeout(() => {
        onClose();
      }, 300);
    }
  };

  const renderContent = () => {
    return Object.entries(modalData)
      .filter(([key]) => !excludeKeys.includes(key))
      .map(([key, value]) => {
        let displayValue;

        if (Array.isArray(value)) {
          displayValue = value
            .map((item) =>
              typeof item === "object" ? JSON.stringify(item) : item
            )
            .join(", ");
        } else if (typeof value === "object" && value !== null) {
          displayValue = JSON.stringify(value, null, 2);
        } else {
          displayValue = value?.toString() || "N/A";
        }

        return (
          <p key={key} className="mb-2 text-black font-others font-medium">
            <strong>{columnLabels[key] || key}:</strong> {displayValue}
          </p>
        );
      });
  };

  if (!isOpen && !isVisible) return null;

  return (
    <div
      id="tableModal"
      className="fixed inset-0 px-2 bg-black bg-opacity-50 flex items-center justify-center z-[99999999]"
      onClick={closeModal}
    >
      <div
        className={`bg-white p-10 rounded-lg shadow-lg max-w-screen-lg w-full relative ${
          isVisible ? "scale-in fade-in" : "scale-out fade-out"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="absolute top-2 cursor-pointer right-2 font-others"
          onClick={() => {
            setIsVisible(false);
            setTimeout(() => {
              onClose();
            }, 300);
          }}
        >
          <MdOutlineCancel size={25} />
        </div>

        <div className="flex flex-col">
          <div className="mb-4">
            <h2 className="text-2xl font-heading flex flex-col text-black">
              Details
            </h2>
            <Line className="w-full" />
          </div>

          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Modal;
