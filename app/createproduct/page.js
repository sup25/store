"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

import ProductHandlerForm from "@/components/productHandlerForm";
import fields from "@/components/productFields";

const CreateProductAdmin = () => {
  const [formData, setFormData] = useState({
    title: "",
    handle: "",
    desc: "",
    short_desc: "",
    price: "",
    quantity: "",
    sku: "",
    tags: "",
    type: "",
    images: [],
  });

  const [errors, setErrors] = useState([]);
  const [adminId, setAdminId] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const adminToken = localStorage.getItem("adminAccessToken");
    if (adminToken) {
      const decodedToken = JSON.parse(atob(adminToken.split(".")[1]));
      setAdminId(parseInt(decodedToken.id));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "tags") {
      const tagsArray = value.split(/[\s,]+/);
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: tagsArray,
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "fx78igma");

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_NAME}/image/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 200) {
        const data = response.data;
        const imageUrl = data.secure_url;
        const thumbnailUrl = imageUrl;
        setFormData((prevFormData) => ({
          ...prevFormData,
          images: [{ original_url: imageUrl, thumbnail: thumbnailUrl }],
        }));
      } else {
        console.error("Failed to upload image to Cloudinary");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post("/api/v1/admin/auth/product", {
        ...formData,

        adminId: adminId,
      });
      if (response.status === 200) {
        console.log("Product created successfully");
      } else {
        console.error("Failed to create product");
      }
    } catch (error) {
      console.error("Error:", error);
      setErrors(error.response?.data?.returnedData?.errors || []);
      const err = error.response?.data?.returnedData?.errors;
      console.log("errrrr", err);
      console.log("Validation Error");
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="section">
      <div className="container">
        <div className="">
          <ProductHandlerForm
            fields={fields}
            onSubmit={handleSubmit}
            formData={formData}
            errors={errors}
            onChange={handleChange}
            buttonText="Create Product"
            isLoading={isLoading}
            handleFileChange={handleFileChange}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateProductAdmin;
