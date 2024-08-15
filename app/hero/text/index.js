import GetProductsByTags from "@/app/getProductsByTags";
import Link from "next/link";
import React from "react";
import Search from "../components/search";

const HeroText = () => {
  return (
    <div className=" flex flex-col gap-6 w-full">
      <h1 className="font-MG text-5xl md:text-[64px]  w-full  leading-[1.3]  ">
        Feel Luxurious With{" "}
        <span className="bg-secondary  text-white py-1 px-2 rounded-full ">
          Premium
        </span>{" "}
        Quality Outfits
      </h1>
      <Search />
      <p className="text-base  text-primary w-full max-w-[400px]">
        Discover the elegance and comfort in every stitch. Elevate your style
        with our exclusive collection.
      </p>
      <Link
        aria-label="Explore our product collection"
        href={"/products"}
        className="py-2 px-2 font-bold text-sm bg-secondary hover:bg-primary transition duration-300 ease-in-out text-white rounded-full w-fit "
      >
        Explore Now
      </Link>
    </div>
  );
};

export default HeroText;
