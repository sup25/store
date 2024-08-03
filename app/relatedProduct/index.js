import React, { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import Card from "@/common/card";
import Spinner from "@/common/spinner";
import appConfig from "@/config";

const RelatedProduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `/${appConfig.basePath}/admin/auth/product`
        );
        setProducts(response.data.returnedData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="section">
      <div className="container">
        <div className="flex flex-col">
          <p className="md:text-5xl font-black text-base mb-10 font-atf ">
            Related Products
          </p>
          <div>
            <Swiper
              slidesPerView={1}
              breakpoints={{
                768: {
                  slidesPerView: 2,
                },
                960: {
                  slidesPerView: 3,
                },
              }}
              style={{
                display: "flex",
                padding: "15px 15px",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {loading ? (
                <Spinner />
              ) : (
                Array.isArray(products) &&
                products.map((product) => (
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
