import { fetchProductsByTag, getAllProducts } from "@/app/utils";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const fetchProducts = async (
  setProducts,
  setFilteredProducts,
  setLoading,
  searchParams
) => {
  setLoading(true);
  try {
    const productsData = await getAllProducts();
    setProducts(productsData);
    const urlTags = searchParams.get("tag");
    if (urlTags) {
      const tagsArray = urlTags.split(",");
      setTag(tagsArray);
      const responses = await Promise.all(
        tagsArray.map((tag) => fetchProductsByTag(tag))
      );
      const allFilteredProducts = responses.flat();
      const uniqueProducts = Array.from(
        new Map(
          allFilteredProducts.map((product) => [product.id, product])
        ).values()
      );

      setFilteredProducts(uniqueProducts);
    }
  } catch (error) {
    console.error("Error fetching all products:", error);
    toast.error("Error fetching products");
  } finally {
    setLoading(false);
  }
};

export const showProductsByTag = async (
  tag,
  setLoading,
  setFilteredProducts
) => {
  setLoading(true);
  try {
    const response = await fetchProductsByTag(tag);
    console.log("res", response);
    setFilteredProducts(response);
  } catch (err) {
    console.error("Error getting products:", err);
    toast.error("Error getting products");
  } finally {
    setLoading(false);
  }
};
