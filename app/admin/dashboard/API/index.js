import appConfig from "@/config";
import { getRequest, deleteRequest } from "../utils/httpClient";

export const getProductsById = async (adminId) => {
  try {
    const res = await getRequest(
      `${appConfig.baseUrl}/api/v1/admin/auth/product/${adminId}`
    );
    return res;
  } catch (error) {
    throw error;
  }
};

export const deleteProductById = async (productId) => {
  try {
    const res = await deleteRequest(
      `${appConfig.baseUrl}/api/v1/admin/auth/product/${productId}`
    );
    return res;
  } catch (error) {
    throw error;
  }
};
