"use client";
import React, { useState } from "react";
import axios from "axios";
import "../../../../../common/styles.css";
import { IoIosClose } from "react-icons/io";
import Spinner from "@/common/spinner";
const InputAddressPopUp = ({ userId, handler, updateUserAddress }) => {
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [addressData, setAddressData] = useState({
    street: "",
    city: "",
    state: "",
    country: "",
    zipcode: "",
    apt: "",
  });

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      handler();
    }, 300);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddressData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        `/api/v1/user/auth/address/${userId}`,
        addressData
      );
      console.log(response.data);
      updateUserAddress(response.data.returnedData.address);
      handler();
    } catch (error) {
      console.error("Error adding address:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleBackgroundClick = (e) => {
    if (e.target.id === "inputaddresspopup") {
      handler();
    }
  };

  const inputFields = [
    { name: "street", label: "Street", required: true },
    { name: "city", label: "City", required: true },
    { name: "state", label: "State", required: true },
    { name: "country", label: "Country", required: true },
    { name: "zipcode", label: "Zipcode", required: true },
    { name: "apt", label: "Apt", required: false },
  ];

  return (
    <div
      id="inputaddresspopup"
      className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-30  z-[9999]"
      onClick={handleBackgroundClick}
    >
      <div
        className={`bg-white w-full max-w-[350px] rounded  flex justify-between px-2 py-2 ${
          isVisible ? "scale-in fade-in" : "scale-out fade-out"
        }`}
      >
        <div className="flex flex-col w-full">
          <div className="w-full flex justify-end">
            <IoIosClose
              size={50}
              onClick={handleClose}
              className="text-gray-400 hover:text-black transition ease-in duration-300 cursor-pointer "
            />
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            {inputFields.map((field) => (
              <label
                key={field.name}
                className="flex flex-col justify-between gap-2"
              >
                {field.label}:
                <input
                  className="py-2 px-2 bg-slate-300"
                  type="text"
                  name={field.name}
                  value={addressData[field.name]}
                  onChange={handleChange}
                  required={field.required}
                />
              </label>
            ))}
            <button
              className="m-2 min-h-[30px] bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              type="submit"
            >
              {loading ? <Spinner /> : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default InputAddressPopUp;
