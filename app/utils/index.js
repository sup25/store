"use client";
import appConfig from "@/config";
import axios from "axios";

const getBaseUrl = () => {
  if (process.env.NODE_ENV === "production") {
    return appConfig.baseUrl;
  }
  return "http://localhost:3000";
};

export const getAllProducts = async () => {
  const response = await axios.get(`${getBaseUrl()}/api/v1/admin/auth/product`);
  return response.data.returnedData;
};

export const fetchProductsByTag = async (tag) => {
  const response = await axios.get(`${getBaseUrl()}/api/v1/user/products`, {
    params: { tags: tag },
  });
  return response.data.returnedData;
};

export const getPurchasedProducts = async ({ userId }) => {
  const response = await axios.get(
    `${getBaseUrl()}/api/v1/user/products/order/${userId}`
  );
  console.log("response: ", response);
  return response.data.returnedData;
};
