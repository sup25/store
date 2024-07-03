import appConfig from "@/config";
import axios from "axios";

export const handleAddToCart = async (
  userId,
  productId,
  setAddedToCart,
  toast,
  updateCartItems
) => {
  try {
    await axios.post("/api/v1/user/products", {
      userId,
      productId,
      quantity: 1,
    });
    toast.success("product added successfully");
    setAddedToCart(true);
    const updatedCartItems = await axios.get(
      `${appConfig.baseUrl}/api/v1/user/products/${userId}`
    );
    updateCartItems(updatedCartItems.data.returnedData);
    updateCartItems(data);
  } catch (error) {
    console.error("Error adding product to cart:", error);
  }
};
