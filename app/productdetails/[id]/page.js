"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import SelectProductQuantity from "@/components/selectProductQuantity";
import BtnCheckout from "@/components/btnCheckout";
import LoginPopUp from "@/components/loginPopup";
import { useAuth } from "@/context/AuthContext";
import BtnAddToCart from "@/components/btnAddToCart";

function ProductDetail() {
  const searchParams = useSearchParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const { user } = useAuth();
  useEffect(() => {
    const productData = searchParams.get("product");
    if (productData) {
      const decodedProductData = JSON.parse(decodeURIComponent(productData));
      setProduct(decodedProductData);
    }
  }, []);

  const handleCloseLoginPopup = () => {
    setShowLoginPopup(false);
  };

  return (
    <div className="section">
      <div className="container">
        {product && (
          <div className="flex md:flex-row flex-col w-full gap-10">
            <div className="md:w-3/4 w-full flex items-center justify-center border border-solid  py-5">
              <img
                src={product.images[0].original_url}
                alt={product.title}
                className="md:w-[500px] h-[400px]"
              />
            </div>

            <div className="md:w-2/5 w-full flex flex-col gap-10">
              <h1 className="text-4xl font-bold">{product.title}</h1>
              <p className="text-[#BFA100] text-2xl font-bold">
                {product.price.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </p>
              <p className="text-base font-medium">{product.sku}</p>
              <p>{product.short_desc}</p>
              <p>{product.quantity}</p>
              <SelectProductQuantity
                quantity={quantity}
                setQuantity={setQuantity}
              />
              <p>{product.desc}</p>
              <div className="w-full flex flex-col md:flex-row justify-between gap-5">
                <BtnAddToCart
                  product={product}
                  showLoginPopup={() => setShowLoginPopup(true)}
                  user={user}
                />
                <BtnCheckout
                  product={product}
                  quantity={quantity}
                  showLoginPopup={() => setShowLoginPopup(true)}
                  user={user}
                />
              </div>
            </div>
          </div>
        )}
        {showLoginPopup && <LoginPopUp onClose={handleCloseLoginPopup} />}
      </div>
    </div>
  );
}

export default ProductDetail;
