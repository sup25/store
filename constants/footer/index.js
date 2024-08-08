import React from "react";
import Image from "next/image";

export default function Footer() {
  return (
    <div className="section bg-primary">
      <div className="container ">
        <div className="flex items-center justify-center py-4">
          <Image
            priority
            src="/logo-white.svg"
            alt="Store"
            width={80}
            height={0}
          />
        </div>
      </div>
    </div>
  );
}
