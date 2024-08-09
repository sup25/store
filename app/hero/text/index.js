import Link from "next/link";
import React from "react";

const HeroText = () => {
  return (
    <div className=" flex flex-col gap-5 w-full">
      <h2 className="font-MG text-5xl md:text-[78px]  w-full md:leading-[1.3] leading-[1.2] ">
        Feel Luxurious with{" "}
        <span className="bg-tertiary  text-white py-1 px-1 rounded-full w-full">
          premium
        </span>{" "}
        quality Outfits
      </h2>
      <p className="text-xl  text-primary">
        Discover the elegance and comfort in every stitch. Elevate your style
        with our exclusive collection.
      </p>
      <Link
        aria-label="Explore our product collection"
        href={"/products"}
        className="py-2 px-2  text-base bg-tertiary hover:bg-primary transition duration-300 ease-in-out text-white rounded-full w-fit "
      >
        Explore Now
      </Link>
    </div>
  );
};

export default HeroText;
