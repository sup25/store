import appConfig from "@/config";
import axios from "axios";

export const handleAddToCart = async ({
  userId,
  productId,
  setAddedToCart,
  toast,
  updateCartItems,
}) => {
  try {
    await axios.post(`/${appConfig.basePath}/user/products`, {
      userId,
      productId,
      quantity: 1,
    });
    toast.success("product added successfully");
    setAddedToCart(true);
    const updatedCartItems = await axios.get(
      `${appConfig.baseUrl}/${appConfig.basePath}/user/products/${userId}`
    );
    updateCartItems(updatedCartItems.data.returnedData);
    if (data) {
      updateCartItems(data);
    }
  } catch (error) {
    console.error("Error adding product to cart:", error);
  }
};
