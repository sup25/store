import appConfig from "@/config";
import { getRequest, deleteRequest } from "../utils/httpClient";

export const getProductsById = async (adminId) => {
  try {
    const res = await getRequest(`/api/v1/admin/auth/product/${adminId}`);
    return res;
  } catch (error) {
    throw error;
  }
};

export const deleteProductById = async (productId) => {
  try {
    const res = await deleteRequest(`/api/v1/admin/auth/product/${productId}`);
    return res;
  } catch (error) {
    throw error;
  }
};

export const getProductSales = async () => {
  try {
    const response = await getRequest(`/api/v1/admin/auth/product/sales`);

    return response;
  } catch (error) {
    throw error;
  }
};
export const getCompletedOrder = async (adminId) => {
  try {
    const response = getRequest(`/api/v1/admin/auth/order/${adminId}`);
    return response;
  } catch (error) {
    throw error;
  }
};
