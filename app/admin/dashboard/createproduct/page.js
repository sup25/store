"use client";
import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import CreateProductForm from "@/app/admin/dashboard/components/createProductForm";
import { handleChange } from "./handler";

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
  const [adminId, setAdminId] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  const searchParams = useSearchParams();

  useEffect(() => {
    const productData = searchParams.get("product");
    if (productData) {
      const decodedProductData = JSON.parse(decodeURIComponent(productData));
      setFormData(decodedProductData);
      setIsUpdating(true);
    }

    const adminToken = sessionStorage.getItem("adminAccessToken");
    if (adminToken) {
      const decodedToken = JSON.parse(atob(adminToken.split(".")[1]));
      setAdminId(parseInt(decodedToken.id));
    }
  }, [searchParams]);

  const resetForm = () => {
    setFormData({
      ...initialFormData,
      images: [],
    });
  };

  const buttonText = isUpdating ? "Update Product" : "Create Product";

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="section">
        <div className="container">
          <CreateProductForm
            resetForm={resetForm}
            formData={formData}
            setFormData={setFormData}
            onChange={(e) => handleChange(e, setFormData)}
            buttonText={buttonText}
            adminId={adminId}
          />
        </div>
      </div>
    </Suspense>
  );
};

export default CreateProductAdmin;
