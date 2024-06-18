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
