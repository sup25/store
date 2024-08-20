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

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        `/${appConfig.basePath}/admin/auth/product`
      );
      const allProducts = response.data.returnedData;
      const shuffledProducts = shuffleArray(allProducts);
      const selectedProducts = shuffledProducts.slice(0, 6);
      setProducts(selectedProducts);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="section">
      <div className="container">
        <div className="flex flex-col">
          <h2 className="font-heading my-10">Related Products</h2>
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
