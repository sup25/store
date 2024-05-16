import React, { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import Card from "@/components/card";
import { CgSpinnerTwo } from "react-icons/cg";

const RelatedProduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/api/v1/admin/auth/product");
        setProducts(response.data.returnedData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const getRandomProducts = () => {
    const shuffledProducts = [...products].sort(() => 0.5 - Math.random());
    return shuffledProducts.slice(0, 8);
  };

  return (
    <div className="section">
      <div className="container">
        <div className="flex flex-col">
          <p className="md:text-3xl text-base font-bold mb-10">
            Related Products
          </p>
          <div className="swiper-container">
            <Swiper
              slidesPerView={1}
              breakpoints={{
                768: {
                  slidesPerView: 3,
                },
              }}
              style={{
                padding: "15px 0",
                alignItems: "center",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              {loading ? (
                <CgSpinnerTwo size={30} className="animate-spin" />
              ) : (
                Array.isArray(products) &&
                getRandomProducts().map((product) => (
                  <SwiperSlide
                    key={product.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Card product={product} />
                  </SwiperSlide>
                ))
              )}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RelatedProduct;
