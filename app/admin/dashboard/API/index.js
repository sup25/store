import appConfig from "@/config";
import { getRequest, deleteRequest } from "../utils/httpClient";

export const getProductsById = async (adminId) => {
  try {
    const res = await getRequest(
      `/${appConfig.basePath}/admin/auth/product/${adminId}`
    );
    return res;
  } catch (error) {
    throw error;
  }
};

export const deleteProductById = async (productId) => {
  try {
    const res = await deleteRequest(
      `/${appConfig.basePath}/admin/auth/product/${productId}`
    );
    return res;
  } catch (error) {
    throw error;
  }
};

export const getProductSales = async (adminId) => {
  try {
    const response = await getRequest(
      `/${appConfig.basePath}/admin/auth/product/sales/${adminId}`
    );
    console.log("sales", response);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getCompletedOrder = async (adminId) => {
  try {
    const response = getRequest(
      `/${appConfig.basePath}/admin/auth/order/${adminId}`
    );
    return response;
  } catch (error) {
    throw error;
  }
};
