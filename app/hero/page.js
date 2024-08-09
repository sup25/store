"use client";

import HeroImages from "./Image";
import HeroText from "./text";

const Hero = () => {
  return (
    <div className="section">
      <div className="container ">
        <div className="md:flex-row flex  flex-col-reverse gap-5">
          <div className=" w-full md:w-[40%]  ">
            <HeroText />
          </div>
          <div className="w-full md:w-[60%]">
            <HeroImages />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
