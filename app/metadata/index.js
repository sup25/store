export async function generateMetadata({ params }) {
  const { productId } = params;

  return {
    title: productId
      ? `Product ${productId} - Store`
      : "Store | Shop Conveniently",
    description:
      "Shop stylish, affordable clothing at our marketplace. Enjoy secure payment options, fast delivery, and the latest trends. Find your perfect outfit today",
  };
}
