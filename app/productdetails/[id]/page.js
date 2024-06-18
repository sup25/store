"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import BtnCheckout from "@/common/btnCheckout";
import LoginPopUp from "@/common/loginPopup";
import { useAuth } from "@/context/AuthContext";
import BtnAddToCart from "@/common/btnAddToCart";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { Navigation } from "swiper/modules";
import SelectProductQuantity from "@/app/admin/dashboard/components/selectProductQuantity";

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
      console.log("data", decodedProductData);
    }
  }, []);

  const handleCloseLoginPopup = () => {
    setShowLoginPopup(false);
  };

  return (
    <div className="section">
      {showLoginPopup && <LoginPopUp handler={handleCloseLoginPopup} />}
      <div className="container">
        {product && (
          <div className="flex md:flex-row flex-col w-full gap-10">
            <div className="md:w-2/3 w-full flex items-start justify-center">
              <Swiper
                modules={[Navigation]}
                slidesPerView={1}
                navigation={true}
                style={{ border: "1px solid black", padding: "10px" }}
              >
                {product.images.map((image) => (
                  <SwiperSlide
                    key={image.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "100%",
                    }}
                  >
                    <img
                      src={image.original_url}
                      alt={product.title}
                      className="md:w-[500px] md:h-[400px] h-full w-full bg-cover  justify-center items-center flex"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
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
      </div>
    </div>
  );
}

export default ProductDetail;
