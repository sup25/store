"use client";

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import axios from "axios";
const Hero = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const url = "https://fakestoreapi.com/products?limit=8";
      try {
        const res = await axios.get(url);
        console.log(res);

        if (res.status >= 200 && res.status < 300) {
          setProducts(res.data);
        } else {
          throw new Error("Failed to get the products");
        }
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="section">
      <div className="container">
        <Swiper
          modules={[Navigation]}
          spaceBetween={50}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log("slide change")}
          loop={true}
          className=""
        >
          {products.map((product) => (
            <SwiperSlide key={product.id} className="w-full   overflow-hidden">
              <div className=" flex items-center justify-center">
                <img
                  src={product.image}
                  alt={product.title}
                  className="h-[300px]"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Hero;
