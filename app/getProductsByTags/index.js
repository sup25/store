"use client";
import React, { useState } from "react";
import Spinner from "@/common/spinner";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const GetProductsByTags = ({ handleTagSubmit }) => {
  const [tag, setTag] = useState("");
  const [loading, setLoading] = useState(false);

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

  return (
    <div>
      <div className="flex gap-2">
        <input
          type="text"
          className="py-1 px-1 bg-gray-100"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          placeholder="Enter tag"
        />
        <button
          className=" bg-secondary hover:bg-primary transition duration-300 ease-in-out p-2 text-white"
          onClick={handleSubmit}
        >
          Search
        </button>
      </div>
      {loading && <Spinner />}
    </div>
  );
};

export default GetProductsByTags;
