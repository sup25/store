"use client";

import appConfig from "@/config";
import axios from "axios";

export const sendUserComplaint = async (data) => {
  const response = await axios.post(
    `/${appConfig.basePath}/user/auth/customercomplaint`,
    data
  );
  return response.data.returnedData;
};

export const getAllProducts = async () => {
  const response = await axios.get(`/${appConfig.basePath}/admin/auth/product`);
  return response.data.returnedData;
};
export const getSinlgeProduct = async ({ handle }) => {
  const response = await axios.get(
    `/${appConfig.basePath}/admin/auth/product/public/${handle}`
  );
  return response.data.returnedData[0];
};

export const geProductsByTag = async (tag) => {
  const response = await axios.get(`/${appConfig.basePath}/user/products`, {
    params: { tags: tag },
  });
  return response.data.returnedData;
};

export const getPurchasedProducts = async ({ userId }) => {
  const response = await axios.get(
    `/${appConfig.basePath}/user/products/order/${userId}`
  );

  return response.data.returnedData;
};

export const getAllReviews = async ({ productId }) => {
  const response = await axios.get(
    `/${appConfig.basePath}/admin/auth/product/review/${productId}`
  );
  return response.data.returnedData;
};

export const addProductReviews = async (reviewData) => {
  const response = await axios.post(
    `/${appConfig.basePath}/admin/auth/product/review`,
    reviewData
  );
  return response.data.returnedData;
};
export const editProductReviews = async (reviewData) => {
  const response = await axios.put(
    `/${appConfig.basePath}/admin/auth/product/review`,
    reviewData
  );
  return response.data.returnedData;
};
export const deleteProductReviews = async (reviewData) => {
  const response = await axios.delete(
    `/${appConfig.basePath}/admin/auth/product/review`,
    { data: reviewData }
  );
  return response.data.returnedData;
};
