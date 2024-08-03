import appConfig from "@/config";
import axios from "axios";

export const handleQuantityChange = (
  items,
  itemId,
  newQuantity,
  setItems,
  updateCartItems
) => {
  const updatedItems = items.map((item) =>
    item.id === itemId ? { ...item, quantity: newQuantity } : item
  );
  updateCartItems(updatedItems);
  setItems(updatedItems);
};

export const handleDeleteItem = async (
  itemId,
  setLoading,
  fetchItems,
  toast,
  user,
  setItems,
  updateCartItems,
  showToast = true
) => {
  try {
    setLoading(true);
    await axios.delete(
      `${appConfig.baseUrl}/${appConfig.basePath}/user/products/${itemId}`
    );
    if (showToast) {
      toast.success("Item removed successfully");
    }
    fetchItems(user, setLoading, updateCartItems, setItems);
  } catch (error) {
    if (showToast) {
      toast.error("Error removing item");
    }
  } finally {
    setLoading(false);
  }
};
