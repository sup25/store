import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

export const useAdminData = () => {
  const [adminId, setAdminId] = useState("");

  useEffect(() => {
    const adminToken = sessionStorage.getItem("adminAccessToken");
    if (adminToken) {
      const decodedToken = JSON.parse(atob(adminToken.split(".")[1]));
      setAdminId(parseInt(decodedToken.id));
    }
  }, []);

  return adminId;
};

export const useProductData = (initialFormData) => {
  const [formData, setFormData] = useState(initialFormData);
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

  return { formData, setFormData, isUpdating, setIsUpdating };
};
