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

import AddProductReviews from "@/app/user/product/addProductReviews";
import GetProductReviews from "@/app/products/getproductReviews";

const ProductDetailContent = () => {
  const searchParams = useSearchParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [refreshReview, setRefreshReview] = useState(false);

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

  const handleReviewAdded = () => {
    setRefreshReview((prev) => !prev);
  };

  return (
    <div className="section">
      {showLoginPopup && <LoginPopUp handler={handleCloseLoginPopup} />}
      <div className="container">
        {product && (
          <div className="flex md:flex-row flex-col justify-between w-full gap-10">
            <div className=" md:w-2/5 w-full flex items-start justify-center">
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
                    className="w-full "
                    key={image.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <div className="flex flex-col">
                      <img
                        src={image.original_url}
                        alt={product.title}
                        className="w-full md:h-[400px]  h-auto bg-cover"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            <div className="md:w-2/5 w-full flex flex-col gap-10">
              <h1 className="font-heading capitalize">{product.title}</h1>
              <p className="text-[#BFA100] font-others text-2xl font-bold">
                {product.price.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </p>
              <p className="font-others font-medium">{product.sku}</p>
              <p className="font-others">{product.short_desc}</p>
              <SelectProductQuantity
                quantity={quantity}
                setQuantity={setQuantity}
              />
              <p className="font-others">{product.desc}</p>
              <AddProductReviews
                productId={product.id}
                onReviewAdded={handleReviewAdded}
              />
              <GetProductReviews
                productId={product.id}
                refreshReview={refreshReview}
              />
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
