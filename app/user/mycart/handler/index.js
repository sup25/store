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
  itemIds,
  setLoading,
  fetchItems,
  toast,
  user,
  setItems,
  updateCartItems,
  showToast = true
) => {
  if (!Array.isArray(itemIds)) {
    itemIds = [itemIds];
  }
  try {
    setLoading(true);
    await axios.delete(
      `/${appConfig.basePath}/user/products/delete/${itemIds.join(",")}`
    );

    if (showToast) {
      toast.success("Item removed successfully");
    }
    fetchItems(user, setLoading, updateCartItems, setItems);
  } catch (error) {
    console.log(error);
    if (showToast) {
      toast.error("Error removing item");
    }
  } finally {
    setLoading(false);
  }
};
