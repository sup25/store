"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import ProductHandlerForm from "@/components/productHandlerForm";
import fields from "@/components/productFields";

const CreateProductAdmin = () => {
  const initialFormData = {
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
  };

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState([]);
  const [adminId, setAdminId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    const productData = searchParams.get("product");
    if (productData) {
      const decodedProductData = JSON.parse(decodeURIComponent(productData));
      setFormData(decodedProductData);
      setIsUpdating(true);
    }
  }, [searchParams]);

  useEffect(() => {
    const adminToken = sessionStorage.getItem("adminAccessToken");
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

        const images = formData.images || [];

        const index = images.length;

        setFormData((prevFormData) => ({
          ...prevFormData,
          images: [
            ...images,
            { original_url: imageUrl, thumbnail: thumbnailUrl, index: index },
          ],
        }));
      } else {
        console.error("Failed to upload image to Cloudinary");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const resetForm = () => {
    setFormData(initialFormData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let response;
      const productId = parseInt(formData.id);
      console.log("formData before submit:", formData);
      if (isUpdating) {
        response = await axios.put(
          `/api/v1/admin/auth/product/${productId}`,
          JSON.stringify(formData),
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log("updated data", response);
      } else {
        response = await axios.post("/api/v1/admin/auth/product", {
          ...formData,
          adminId: adminId,
        });
      }

      if (response.status === 200) {
        console.log(
          isUpdating
            ? "Product updated successfully"
            : "Product created successfully"
        );

        resetForm();
      } else {
        console.error(
          isUpdating ? "Failed to update product" : "Failed to create product"
        );
      }
    } catch (error) {
      console.error("Error:", error);
      setErrors(error.response?.data?.returnedData?.errors || []);
      const err = error.response?.data?.returnedData?.errors;
      console.log("errrrr", err);
      console.log("Validation Error");
    } finally {
      setIsLoading(false);
    }
  };

  const buttonText = isUpdating ? "Update Product" : "Create Product";
  return (
    <div className="section">
      <div className="container">
        <ProductHandlerForm
          fields={fields}
          onSubmit={handleSubmit}
          formData={formData}
          errors={errors}
          onChange={handleChange}
          buttonText={buttonText}
          isLoading={isLoading}
          handleFileChange={handleFileChange}
        />
      </div>
    </div>
  );
};

export default CreateProductAdmin;
