import axios from "axios";

export const fetchItems = async (
  user,
  setLoading,
  updateCartItems,
  setItems
) => {
  if (!setLoading) {
    console.error("setLoading function is not defined.");
    return;
  }

  setLoading(true);
  try {
    if (user.id) {
      const response = await axios.get(`/api/v1/user/products/${user.id}`);
      const fetchedItems = response.data.returnedData;
      updateCartItems(fetchedItems);
      setItems(fetchedItems);
    } else {
      console.log("User is not authenticated or ID is missing.");
    }
  } catch (error) {
    console.error("Error fetching items:", error);
  } finally {
    setLoading(false);
  }
};
