"use client";
import React, { Suspense, useEffect } from "react";
import CreateProductForm from "@/app/admin/dashboard/components/createProductForm";

import { handleChange } from "./handler";
import { useAdminData, useProductData } from "./hooks";
import withAuthAdmin from "../../utils/adminHoc/page";
import { getProductByHandle } from "../utils";
import { useSearchParams } from "next/navigation";

const CreateProductAdmin = () => {
  const searchParams = useSearchParams();
  const productHandle = searchParams.get("handle");

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

  const adminId = useAdminData();
  const { formData, setFormData, isUpdating, setIsUpdating } =
    useProductData(initialFormData);

  useEffect(() => {
    if (productHandle) {
      getProductByHandle(productHandle, setFormData, setIsUpdating);
    }
  }, [productHandle]);

  const resetForm = () => setFormData(initialFormData);

  const buttonText = isUpdating ? "Update Product" : "Create Product";

  return (
    <div className="section">
      <div className="container">
        <CreateProductForm
          resetForm={resetForm}
          formData={formData}
          setFormData={setFormData}
          onChange={(e) => handleChange(e, setFormData)}
          buttonText={buttonText}
          adminId={adminId}
          isUpdating={isUpdating}
        />
      </div>
    </div>
  );
};

const CreateProductAdminWrapper = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <CreateProductAdmin />
  </Suspense>
);

export default withAuthAdmin(CreateProductAdminWrapper);
