"use client";

import appConfig from "@/config";
import axios from "axios";

export const getAllProducts = async () => {
  const response = await axios.get(`/${appConfig.basePath}/admin/auth/product`);
  return response.data.returnedData;
};

export const fetchProductsByTag = async (tag) => {
  const response = await axios.get(`/${appConfig.basePath}/user/products`, {
    params: { tags: tag },
  });
  return response.data.returnedData;
};

export const getPurchasedProducts = async ({ userId }) => {
  const response = await axios.get(
    `/${appConfig.basePath}/user/products/order/${userId}`
  );
  console.log("response: ", response);
  return response.data.returnedData;
};
