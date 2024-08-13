export async function generateMetadata({ params }) {
  const { productId } = params;

  return {
    title: productId
      ? `Product ${productId} - Store`
      : "Store | Shop Conveniently",
    description:
      "Discover a wide range of stylish and affordable clothing at our marketplace. Shop the latest trends and timeless classics with secure payment options and fast delivery. Find your perfect outfit today!",
    openGraph: {
      images: [
        {
          url: "/logo-no-background.svg",
          width: 1200,
          height: 630,
          alt: "Store CKMZ Logo",
        },
      ],
    },
  };
}
