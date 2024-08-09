export async function generateMetadata({ params }) {
  const { productId } = params;

  return {
    title: productId
      ? `Product ${productId} - Store`
      : "Store | Shope Conveniently",
    description:
      "Welcome to our marketplace where you can explore a wide range of stylish and affordable clothing. From the latest fashion trends to timeless classics, our collection offers something for everyone. Enjoy a seamless shopping experience with secure payment options and fast delivery. Shop now to find the perfect outfits that suit your style and budget.",
  };
}
