"use client";
import React, { useEffect, useState } from "react";
import BtnCheckout from "@/common/btnCheckout";
import LoginPopUp from "@/common/loginPopup";
import { useAuth } from "@/context/AuthContext";
import BtnAddToCart from "@/common/btnAddToCart";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { Navigation, Thumbs, Zoom } from "swiper/modules";
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
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [showZoomHint, setShowZoomHint] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowZoomHint(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

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
            <div className="md:w-2/4 w-full flex flex-col items-center justify-start">
              {showZoomHint && (
                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none z-[99]">
                  <div className="bg-black bg-opacity-50 text-white text-sm p-2 font-others rounded-lg">
                    Double-click or tap to zoom
                  </div>
                </div>
              )}
              <Swiper
                modules={[Navigation, Thumbs, Zoom]}
                slidesPerView={1}
                navigation={true}
                zoom={true}
                thumbs={{ swiper: thumbsSwiper }}
                style={{
                  border: "1px solid #6575A8",
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
                    <div className="swiper-zoom-container">
                      <img
                        src={image.original_url}
                        alt={product.title}
                        className="w-full h-[400px] bg-cover"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              <Swiper
                onSwiper={setThumbsSwiper}
                spaceBetween={10}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                className="my-5"
                style={{ width: "100%" }}
              >
                {product.images.map((image) => (
                  <SwiperSlide
                    key={image.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      border: "1px solid #6575A8",
                    }}
                  >
                    <img
                      src={image.original_url}
                      alt={product.title}
                      className="h-[80px] object-contain"
                    />
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

              <div className="font-others">
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
