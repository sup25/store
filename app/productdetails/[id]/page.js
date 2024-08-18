"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import BtnCheckout from "@/common/btnCheckout";
import LoginPopUp from "@/common/loginPopup";
import { useAuth } from "@/context/AuthContext";
import BtnAddToCart from "@/common/btnAddToCart";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { Navigation } from "swiper/modules";
import SelectProductQuantity from "@/app/admin/dashboard/components/selectProductQuantity";
import {
  TransformWrapper,
  TransformComponent,
  useControls,
} from "react-zoom-pan-pinch";
import { GrRotateLeft } from "react-icons/gr";
const Controls = () => {
  const { resetTransform } = useControls();

  return (
    <div className="tools flex w-full justify-center cursor-pointer gap-2 mt-1 mb-1">
      <GrRotateLeft onClick={() => resetTransform()} />
    </div>
  );
};

const ProductDetailContent = () => {
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
  }, [searchParams]);

  const handleCloseLoginPopup = () => {
    setShowLoginPopup(false);
  };

  return (
    <div className="section">
      {showLoginPopup && <LoginPopUp handler={handleCloseLoginPopup} />}
      <div className="container">
        {product && (
          <div className="flex md:flex-row flex-col justify-between w-full gap-10">
            <div className=" w-2/5 flex items-start justify-center">
              <Swiper
                modules={[Navigation]}
                slidesPerView={1}
                navigation={true}
                style={{
                  border: "1px solid black",
                  padding: "10px",
                  width: "100%",
                }}
              >
                {product.images.map((image) => (
                  <SwiperSlide
                    className="w-full"
                    key={image.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <TransformWrapper
                      defaultScale={1}
                      defaultPositionX={0}
                      defaultPositionY={0}
                      minScale={1}
                      limitToBounds={true}
                    >
                      <div className="flex flex-col">
                        <TransformComponent>
                          <img
                            src={image.original_url}
                            alt={product.title}
                            className="w-full md:w-[350px] h-full bg-cover"
                          />
                        </TransformComponent>
                        <Controls />
                      </div>
                    </TransformWrapper>
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
              {/*  <p>Remaining Quantity: {product.quantity}</p> */}
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
                  quantity={quantity}
                />
                <BtnCheckout
                  items={[
                    {
                      product: product,
                      quantity: quantity,
                      admin: product.adminId,
                    },
                  ]}
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
};

function ProductDetail() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProductDetailContent />
    </Suspense>
  );
}

export default ProductDetail;
