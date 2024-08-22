import axios from "axios";

export const getProductAccordingToPrice = async (minPrice, maxPrice) => {
  const product = await axios.get(
    `http://localhost:3000/api/v1/user/products/price?minPrice=${minPrice}&maxPrice=${maxPrice}`
  );
  console.log(product);
  return product;
};
