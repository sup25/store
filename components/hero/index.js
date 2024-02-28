"use client";

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";

import "swiper/css/pagination";
import axios from "axios";
import Categories from "../categories";
const Hero = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const url = "https://fakestoreapi.com/products";
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
      <div className="container flex md:flex-row md:gap-2 flex-col gap-20">
        <Categories />
        <Swiper
          modules={[Autoplay]}
          slidesPerView={1}
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          /*  autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }} */
          loop={true}
          breakpoints={{
            768: {
              slidesPerView: 3,
            },
          }}
          className="border-b border-black w-full "
        >
          {products.map((product) => (
            <SwiperSlide
              key={product.id}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <div className="flex flex-col items-center justify-center px-2 py-2 w-72 ">
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
