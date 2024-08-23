"use client";

import HeroImages from "./Image";
import HeroText from "./text";

const Hero = () => {
  return (
    <div className="section">
      <div className="container ">
        <div className="md:flex-row flex justify-between flex-col-reverse gap-5">
          <div className=" w-full md:w-[45%]  ">
            <HeroText />
          </div>
          <div className="w-full md:w-[55%]">
            <HeroImages />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
