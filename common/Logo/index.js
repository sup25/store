import React from "react";
import Image from "next/image";

const Logo = () => (
  <Image
    priority
    src="/logo-no-background.svg"
    alt="Store"
    width={60}
    height={30}
  />
);
export default Logo;
