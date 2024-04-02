import React, { useState, useEffect } from "react";
import axios from "axios";

const ProductDetails = ({ id }) => {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`https://fakestoreapi.com/products/${id}`);
        if (res.status >= 200 && res.status < 300) {
          setProduct(res.data);
        } else {
          throw new Error("Failed to fetch product");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  const handleAddToCart = () => {
    console.log("Product added to cart:", product);
  };

  const handleCheckout = () => {
    console.log("Initiating checkout for product:", product);
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="section">
      <div className="container">
        <div className="flex md:flex-row flex-col w-full gap-10">
          <div className="md:w-3/5  w-full flex items-center justify-center border border-solid py-5">
            <img
              src={product.image}
              alt={product.title}
              className="md:w-[200px] w-[300px]"
            />
          </div>
          <div className="md:w-2/5 w-full flex flex-col gap-10">
            <h1 className="text-4xl font-bold">{product.title}</h1>
            <p>{product.description}</p>
            <p className="text-[#BFA100] text-2xl font-bold">
              ${product.price}
            </p>
            <div className="w-full flex flex-col md:flex-row justify-between gap-5">
              <div
                className="w-full cursor-pointer flex items-center justify-center px-2 py-2 bg-btn hover:bg-primary text-white font-bold text-lg transition duration-150 ease-out hover:ease-in"
                onClick={handleAddToCart}
              >
                Add to Cart
              </div>
              <div
                className="w-full cursor-pointer flex items-center justify-center px-2 py-2 bg-tertiary hover:bg-primary hover:text-white text-black font-bold text-lg transition duration-150 ease-out hover:ease-in"
                onClick={handleCheckout}
              >
                Checkout Now
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
