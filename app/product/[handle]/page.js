"use client";

import React, { useEffect, useState } from "react";
import BtnCheckout from "@/common/btnCheckout";
import LoginPopUp from "@/common/loginPopup";
import { useAuth } from "@/context/AuthContext";
import BtnAddToCart from "@/common/btnAddToCart";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { Navigation } from "swiper/modules";
import SelectProductQuantity from "@/common/selectProductQuantity";
import { useParams } from "next/navigation";
import AddProductReviews from "@/app/user/product/addProductReviews";

import { getSinlgeProduct } from "@/app/utils";
import Spinner from "@/common/spinner";
import NotFound from "@/app/not-found";
import GetProductReviews from "../getproductReviews";

const ProductDetail = () => {
  const { handle } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [refreshReview, setRefreshReview] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showFullDescription, setShowFullDescription] = useState(false);

  const { user } = useAuth();

  const getProductDetails = async () => {
    try {
      const response = await getSinlgeProduct({ handle });
      setProduct(response);
    } catch (error) {
      console.log("Error fetching product data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getProductDetails();
  }, []);

  const handleCloseLoginPopup = () => {
    setShowLoginPopup(false);
  };

  const handleReviewAdded = () => {
    setRefreshReview((prev) => !prev);
  };

  if (isLoading) {
    return <Spinner />;
  }
  if (!product) {
    return <NotFound />;
  }

  return (
    <div className="section">
      {showLoginPopup && <LoginPopUp handler={handleCloseLoginPopup} />}
      <div className="container">
        {product && (
          <div className="flex md:flex-row flex-col justify-between w-full gap-10">
            <div className="md:w-2/4 w-full flex items-start justify-center">
              <Swiper
                modules={[Navigation]}
                slidesPerView={1}
                navigation={true}
                style={{
                  border: "1px solid #d3d3d3",
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
                    <div className="flex flex-col">
                      <img
                        src={image.original_url}
                        alt={product.title}
                        className="w-full h-[400px] bg-cover"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            <div className="md:w-2/5 w-full flex flex-col gap-8">
              <h1 className="font-heading capitalize">{product.title}</h1>
              <p className="text-[#BFA100] font-others text-3xl font-bold">
                {product.price.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </p>
              <div className="flex flex-col gap-1">
                <p className="font-others text-sm text-secondary">
                  {product.handle}
                </p>
                <p className="title-heading">
                  Available Quantity:{" "}
                  <span
                    className={`${
                      product.quantity > 10
                        ? "bg-green-200 text-green-700"
                        : "bg-red-200 text-red-700 "
                    }  px-2 py-1 rounded-lg`}
                  >
                    {product.quantity}
                  </span>
                </p>
                <p className="font-others">{product.short_desc}</p>
              </div>

              <SelectProductQuantity
                quantity={quantity}
                setQuantity={setQuantity}
                maxQuantity={product.quantity}
              />

              <div className="font-others ">
                {showFullDescription
                  ? product.desc
                  : product.desc.length > 200
                  ? `${product.desc.slice(0, 200)}...`
                  : product.desc}
                {product.desc.length > 200 && (
                  <button
                    onClick={() => setShowFullDescription((prev) => !prev)}
                    className="text-secondary hover:underline ml-1"
                  >
                    {showFullDescription ? "Show less" : "Show more"}
                  </button>
                )}
              </div>

              <AddProductReviews
                productId={product.id}
                onReviewAdded={handleReviewAdded}
              />
              <GetProductReviews
                productId={product.id}
                refreshReview={refreshReview}
              />
              <div className="w-full flex flex-col md:flex-row justify-between gap-5 flex-wrap">
                <BtnAddToCart
                  product={product}
                  showLoginPopup={() => setShowLoginPopup(true)}
                  user={user}
                  quantity={quantity === 0 ? 1 : quantity}
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

export default ProductDetail;
