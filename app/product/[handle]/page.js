"use client";
import React, { useEffect, useState } from "react";
import BtnCheckout from "@/common/btnCheckout";
import LoginPopUp from "@/common/loginPopup";
import { useAuth } from "@/context/AuthContext";
import BtnAddToCart from "@/common/btnAddToCart";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { Navigation } from "swiper/modules";
import SelectProductQuantity from "@/app/admin/dashboard/components/selectProductQuantity";
import { useParams } from "next/navigation";
import AddProductReviews from "@/app/user/product/addProductReviews";
import GetProductReviews from "@/app/products/getproductReviews";
import { getSinlgeProduct } from "@/app/utils";
import Spinner from "@/common/spinner";

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
      console.log(response);
      setProduct(response);
    } catch (error) {
      console.error("Error fetching product data:", error);
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
                        className="w-full md:h-[400px] h-auto bg-cover"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            <div className="md:w-2/5 w-full flex flex-col gap-8">
              <h1 className="font-heading capitalize">{product.title}</h1>
              <p className="text-[#BFA100] font-others text-2xl font-bold">
                {product.price.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </p>
              <div className="flex flex-col">
                <p className="font-others text-sm text-secondary">
                  {product.handle}
                </p>
                <p className="font-others">{product.short_desc}</p>
              </div>

              <SelectProductQuantity
                quantity={quantity}
                setQuantity={setQuantity}
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

export default ProductDetail;
