import { deleteProductById } from "../../API";

export const handleDeleteProduct = async ({
  e,
  productId,
  setProducts,
  products,
  setIsLoading,
  toast,
}) => {
  e.stopPropagation();
  setIsLoading(true);
  try {
    await deleteProductById(productId);
    const updatedProducts = products.filter(
      (product) => product.id !== productId
    );
    setProducts([...updatedProducts]);
    toast.success("Product deleted successfully");
  } catch (error) {
    console.log("Error deleting product:", error);
    toast.error("Failed to delete product");
  } finally {
    setIsLoading(false);
  }
};
