import appConfig from "@/config";
import { getProductsById } from "../API";

export const getProducts = async (adminId, setProducts, setLoading) => {
  try {
    const response = await getProductsById(adminId);
    setProducts(response.returnedData);
    setLoading(false);
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};

export const getProductByHandle = async (
  handle,
  setFormData,
  setIsUpdating
) => {
  try {
    const response = await fetch(
      `/${appConfig.basePath}/admin/auth/product/public/${handle}`
    );
    const data = await response.json();

    if (
      response.ok &&
      Array.isArray(data.returnedData) &&
      data.returnedData.length > 0
    ) {
      const product = data.returnedData[0];
      setFormData(product);
      setIsUpdating(true);
    } else {
      console.error(
        "Failed to fetch product:",
        data.message || "Unknown error"
      );
    }
  } catch (error) {
    console.error("Error fetching product:", error);
  }
};
