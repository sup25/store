import React, { useState } from "react";
import "../../../../../common/styles.css";

const SalesStatusPopUp = ({ data, handle }) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClosePopup = () => {
    setIsVisible(false);
    setTimeout(() => {
      handle();
    }, 300);
  };

  const handleBackgroundClick = (e) => {
    if (e.target.id === "salesStatusPopup") {
      handle();
    }
  };
  const totalIncome = data ? (data.sold * data.price).toFixed(2) : 0;

  return (
    <div
      id="salesStatusPopup"
      className="popup-background p-4  "
      onClick={handleBackgroundClick}
    >
      <div
        className={`bg-white w-full max-w-[500px] rounded-lg shadow-md transform transition-transform duration-300 ${
          isVisible ? "scale-in fade-in" : "scale-out fade-out"
        }`}
      >
        <div className="p-6 flex justify-between items-start">
          <div className="flex flex-col space-y-4">
            <h2 className="md:text-3xl text-2xl font-heading font-semibold mb-2">
              Product Details
            </h2>
            {data && (
              <div className="flex flex-col space-y-3">
                <div className="flex items-center space-x-4">
                  <img
                    className="w-40 h-40 object-cover rounded-md shadow"
                    src={data.image[0]}
                    alt={data.title}
                  />
                  <div className="flex flex-col gap-1">
                    <h2 className="md:text-xl text-base font-semibold font-others text-gray-800 capitalize">
                      {data.title}
                    </h2>
                    <p
                      className={`md:text-lg text-base  font-others font-medium ${
                        data.sold > 0 ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {data.sold} units sold
                    </p>

                    <p className="text-base  font-others font-medium">
                      <span className="font-semibold text-gray-700">SKU:</span>{" "}
                      {data.sku}
                    </p>
                    <p className="text-base font-others font-medium">
                      <span className="font-semibold text-gray-700">
                        Handle:
                      </span>{" "}
                      {data.handle}
                    </p>
                    <p className="text-base font-others font-semibold">
                      Price:{" "}
                      <span className="bg-green-100 text-green-700 px-2 py-[1px] rounded-lg">
                        ${data.price}
                      </span>
                    </p>
                    <p className="text-sm font-others text-gray-600">
                      {data.short_desc}
                    </p>
                    <p className="text-base font-others font-semibold">
                      Total Revenue:{" "}
                      <span className="bg-[#f3e397] text-[#7b6c1c] px-2 py-[1px] rounded-lg">
                        ${totalIncome}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
          <button
            className="py-1 px-2 rounded-full bg-red-500 text-white text-sm hover:bg-red-600 focus:outline-none transition-transform transform hover:scale-105"
            onClick={handleClosePopup}
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
};

export default SalesStatusPopUp;
