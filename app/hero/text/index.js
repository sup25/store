import Link from "next/link";
import React from "react";
import Search from "../components/search";

const HeroText = () => {
  return (
    <div className=" flex flex-col gap-6 w-full">
      <h1 className="font-heading md:text-[64px] w-full max-w-[500px]">
        Feel Luxurious With
        <div className="text-orange-400  py-1 px-2 rounded-full inline-block">
          Premium
        </div>
        Quality Outfits.
      </h1>

      <Search />
      <p className="font-others text-primary w-full max-w-[450px]">
        Discover the elegance and comfort in every stitch. Elevate your style
        with our exclusive collection.
      </p>
      <Link
        aria-label="Explore our product collection"
        href={"/products"}
        className="py-2 px-2 font-others font-medium text-sm bg-secondary hover:bg-primary transition duration-300 ease-in-out text-white rounded-full w-fit "
      >
        Explore Now
      </Link>
    </div>
  );
};

export default HeroText;
