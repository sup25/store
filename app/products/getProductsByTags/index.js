"use client";
import React, { useState } from "react";
import Spinner from "@/common/spinner";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const GetProductsByTags = ({ handleTagSubmit }) => {
  const [tag, setTag] = useState("");
  const [loading, setLoading] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (tag.trim()) {
      setLoading(true);
      try {
        await handleTagSubmit(tag);
      } finally {
        setLoading(false);
      }
    } else {
      toast.error("Tag cannot be empty");
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    const regex = /^[a-zA-Z\s,]*$/;

    if (regex.test(value)) {
      setTag(value);
    }
  };

  return (
    <>
      {loading && <Spinner />}
      <div className="relative flex flex-col gap-2 w-full max-w-[600px]">
        {showTooltip && (
          <div className="absolute -top-7 left-0 font-others  text-black text-sm p-1 ">
            Use commas to separate multiple tags
          </div>
        )}
        <input
          type="text"
          className="search-bar md:w-80 w-full hover:border-[#6575A8] bg-gray-100"
          value={tag}
          onChange={handleChange}
          placeholder="Enter tag"
          onMouseOver={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        />
        <button
          className="bg-secondary  hover:bg-primary transition duration-300 ease-in-out p-2 text-white"
          onClick={handleSubmit}
        >
          Search
        </button>
      </div>
    </>
  );
};

export default GetProductsByTags;
