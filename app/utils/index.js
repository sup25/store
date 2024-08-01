"use client";
import appConfig from "@/config";
import axios from "axios";

export const getAllProducts = async () => {
  const response = await axios.get(
    `${appConfig.local.baseUrl}/api/v1/admin/auth/product`
  );
  return response.data.returnedData;
};

export const fetchProductsByTag = async (tag) => {
  const response = await axios.get(
    `http://localhost:3000/api/v1/user/products`,
    {
      params: { tags: tag },
    }
  );
  return response.data.returnedData;
};

export const getPurchasedProducts = async ({ userId }) => {
  const response = await axios.get(
    `${appConfig.local.baseUrl}/api/v1/user/products/order/${userId}`
  );
  console.log("response: ", response);
  return response.data.returnedData;
};
