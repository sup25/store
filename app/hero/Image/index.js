"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Link from "next/link";

const ClothImages = [
  { id: "1", src: "/images/c1.jpg", alt: "Cloth 1" },
  { id: "2", src: "/images/c2.jpg", alt: "Cloth 2" },
  { id: "3", src: "/images/c3.jpg", alt: "Cloth 3" },
  { id: "4", src: "/images/c4.jpg", alt: "Cloth 4" },
  { id: "5", src: "/images/c5.jpg", alt: "Cloth 5" },
];

const HeroImages = () => {
  return (
    <div className="section">
      <div className="container flex flex-col ">
        <Swiper loop={true} slidesPerView={1} className="w-full rounded">
          {ClothImages.map((clothes) => (
            <SwiperSlide key={clothes.id} className="flex justify-center">
              <Link href={"/products"}>
                <div
                  className="w-full min-h-[578px] h-full bg-cover   bg-no-repeat  bg-top"
                  style={{ backgroundImage: `url(${clothes.src})` }}
                  aria-label={clothes.alt}
                ></div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default HeroImages;
