import React, { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/swiper-bundle.css";
import Card from "@/common/card";
import { CgSpinner } from "react-icons/cg";
import appConfig from "@/config";
import LoginPopUp from "@/common/loginPopup";

const RelatedProduct = ({ heading }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loginPopuupVisible, setLoginPopupVisible] = useState(false);

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
      const selectedProducts = shuffledProducts.slice(0, 8);
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

  const handleClose = () => {
    setLoginPopupVisible(false);
  };

  return (
    <>
      {loginPopuupVisible && <LoginPopUp handler={handleClose} />}
      <div className="section">
        <div className="container">
          <div className="flex flex-col">
            <h2 className="font-heading my-10">{heading}</h2>
            <div>
              <Swiper
                modules={[Pagination, Navigation]}
                slidesPerView={1}
                pagination={true}
                navigation={true}
                allowTouchMove={false}
                breakpoints={{
                  768: {
                    slidesPerView: 2,
                  },
                  960: {
                    slidesPerView: 4,
                  },
                }}
                style={{
                  padding: "30px 5px",
                  "--swiper-pagination-bottom": "0px",
                  "--swiper-pagination-bullet-horizontal-gap": "10px",
                }}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <CgSpinner
                      className="animate-spin text-gray-500"
                      size={30}
                    />
                  </div>
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
                      <Card
                        product={product}
                        setLoginPopupVisible={setLoginPopupVisible}
                      />
                    </SwiperSlide>
                  ))
                )}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RelatedProduct;
